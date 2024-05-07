import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getMyUserTweets } from '../../redux/tweetSlice';
import { TWEET_API_END_POINT } from '../../utils/constant';

const useGetMyTweets = () => {
    const dispatch = useDispatch();
    const { token } = useSelector(store => store.user);

    const fetchMyTweets = async ({id}) => {
        try {
            const res = await axios.get(`${TWEET_API_END_POINT}/tweets/${id}`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(getMyUserTweets(res.data.myTweets));
        } catch (error) {
            console.error('Error fetching tweets:', error.response?.data.message);
        }
    };

   
    return {fetchMyTweets}; // Allows manual re-fetching
};

export default useGetMyTweets;