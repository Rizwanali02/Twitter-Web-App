import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { getRefresh } from '../../redux/tweetSlice';
import axios from 'axios';
import { TWEET_API_END_POINT } from '../../utils/constant';

const useLikeOrDislike = () => {
   
    const dispatch = useDispatch();
    const likeDisLike = async ({ id }) => {

        try {
            const res = await axios.put(`${TWEET_API_END_POINT}/like/${id}`, {}, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            dispatch(getRefresh());
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };
    return { likeDisLike };
}

export default useLikeOrDislike;
