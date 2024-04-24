import axios from 'axios';
import { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { TWEET_API_END_POINT } from '../../utils/constant';
import { getRefresh } from '../../redux/tweetSlice';

const usePostTweet = () => {

    const [loading, setLoading] = useState(false)
    const { token } = useSelector(store => store.user)
    const dispatch = useDispatch();

    const postTweet = async ({ description }) => {
        setLoading(true)
        try {
            const res = await axios.post(`${TWEET_API_END_POINT}/create`, { description }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            })
            dispatch(getRefresh())
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);

        } finally {
            setLoading(false)
        }
    };

    return { postTweet, loading }



}

export default usePostTweet