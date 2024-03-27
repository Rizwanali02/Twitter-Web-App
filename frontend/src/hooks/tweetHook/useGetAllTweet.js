import { useEffect } from 'react'
import { TWEET_API_END_POINT } from '../../utils/constant';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getMyTweets } from '../../redux/tweetSlice';

const useGetAllTweet = ({ id }) => {
    const dispatch = useDispatch();
    const { refresh } = useSelector(store => store.tweets)
    useEffect(() => {
        const fetchAllTweets = async () => {

            try {
                const res = await axios.get(`${TWEET_API_END_POINT}/allusertweets/${id}`, {
                    withCredentials: true,
                });
                console.log("tweets", res.data.tweets);
                dispatch(getMyTweets(res.data.tweets));

            } catch (error) {
                console.error(error);


            };


        }
        fetchAllTweets();
    }, [refresh]);
}

export default useGetAllTweet