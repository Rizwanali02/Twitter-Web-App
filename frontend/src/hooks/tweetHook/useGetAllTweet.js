import { useEffect } from 'react'
import { TWEET_API_END_POINT } from '../../utils/constant';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getMyTweets } from '../../redux/tweetSlice';

const useGetAllTweet = ({ id }) => {
    const dispatch = useDispatch();
    const { refresh, isActiveTab } = useSelector(store => store.tweets)
    const { token } = useSelector(store => store.user)

    const fetchAllTweets = async () => {

        try {
            const res = await axios.get(`${TWEET_API_END_POINT}/allusertweets/${id}`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(getMyTweets(res.data.tweets));
        } catch (error) {
            console.error(error);


        };


    }

    const fetchFollowingTweets = async () => {

        try {
            const res = await axios.get(`${TWEET_API_END_POINT}/followingUsertweets/${id}`, {
                withCredentials: true,
            });
            console.log("following user tweets", res.data.tweets);
            dispatch(getMyTweets(res.data.tweets));
        } catch (error) {
            console.error(error);
        };
    }
    useEffect(() => {
        if (isActiveTab) {
            fetchAllTweets();
        } else {
            fetchFollowingTweets();
        }

    }, [refresh, isActiveTab]);
}

export default useGetAllTweet