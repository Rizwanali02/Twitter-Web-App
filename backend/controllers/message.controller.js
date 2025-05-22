import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";



const sendMessage = async (req, res) => {
    try {
        const senderId = req.user._id;
        const receiverId = req.params.id;
        const message = req.body.message;

        let getConversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!getConversation) {
            getConversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }
        const newMessage = await Message.create({
            senderId, receiverId, message
        })

        if (newMessage) {
            getConversation.messages.push(newMessage._id)
        }

        await Promise.all([getConversation.save(), newMessage.save()])

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        return res.status(201).json({
            newMessage
        })

    } catch (error) {
        console.log(error)
    }

}
const getMessage = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.user._id;
        const conversation= await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        }).populate('messages')
        // .populate({
        //     path: "messages",
        //     populate: [
        //         { path: "senderId", select: "name email profilePic" },
        //         { path: "receiverId", select: "name email profilePic" },
        //     ],
        // });
        return res.status(200).json(conversation?.messages)
    }
    catch (err) {
        console.log(err)
    }


}
export { sendMessage, getMessage }