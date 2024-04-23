
import { useDispatch, useSelector } from 'react-redux';
import { USER_API_END_POINT } from '../../utils/constant';
import axios from 'axios';
import { useState } from 'react';

const useFollowAndUnfollow = () => {
    const [loading, setLoading] = useState(false);
    const { token } = useSelector(
        (store) => store.user
    );
    const fetchFollowAndUnfollow = async ({ id }) => {
        try {
            const res = await axios.put(
                `${USER_API_END_POINT}/followandunfollow/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );
            if (res.data.success) {
                console.log(res.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    return { fetchFollowAndUnfollow, loading };

}

export { useFollowAndUnfollow }