import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getMyProfile } from '../redux/userSlice';
import { USER_API_END_POINT } from '../utils/constant';

const useProfile = ({ id }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {

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
        fetchProfile();
    }, [id]);



};

export default useProfile;
