import axios from 'axios';
import {  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  getMyProfile } from '../../redux/userSlice';
import { USER_API_END_POINT } from '../../utils/constant';

const useProfile = () => {
    const dispatch = useDispatch();
    const { profile, user } = useSelector(store => store.user)
    const [loading, setLoading] = useState(false);

    const fetchProfile = async ({ id }) => {

        try {
            const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`, {
                withCredentials: true,
            });
            console.log(res);
            dispatch(getMyProfile(res.data.user));
           

        } catch (error) {
            console.error(error);


        };


    }

    // useEffect(() => {
    //     fetchProfile();
    // }, [id,])


    return { fetchProfile };

};

export default useProfile;
