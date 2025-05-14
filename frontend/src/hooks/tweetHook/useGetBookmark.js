import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getRefresh } from '../../redux/tweetSlice';
import axios from 'axios';
import { TWEET_API_END_POINT } from '../../utils/constant';

const useGetBookmark = () => {
    const { token } = useSelector(store => store.user)
    const dispatch = useDispatch();
    const getBookmarkTweet = async () => {

        try {
            const res = await axios.get(`${TWEET_API_END_POINT}/bookmark-tweet`,{
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            // dispatch(getRefresh());
            if (res.data.success) {
                return res.data.data
                // toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };
    return { getBookmarkTweet };
}

export default useGetBookmark;
