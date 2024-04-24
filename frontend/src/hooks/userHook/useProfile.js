import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyProfile } from '../../redux/userSlice';
import { USER_API_END_POINT } from '../../utils/constant';

const useProfile = () => {
    const dispatch = useDispatch();
    const [loadingProfile, setLoading] = useState(false);
    const { token } = useSelector(store => store.user)
    const fetchProfile = async ({ id }) => {
        setLoading(true);
        try {
            const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(getMyProfile(res.data.user));
        } catch (error) {
            console.error(error);


        } finally {
            setLoading(false);
        }


    }

    return { fetchProfile, loadingProfile };

};

export default useProfile;
