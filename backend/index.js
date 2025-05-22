// import app from "./app.js"
import {server} from './socket/socket.js';

const PORT = process.env.PORT || 8080;


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})