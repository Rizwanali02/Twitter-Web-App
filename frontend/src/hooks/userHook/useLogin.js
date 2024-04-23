import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { USER_API_END_POINT } from '../../utils/constant';
import { useDispatch } from 'react-redux';
import { getToken, getUser } from "../../redux/userSlice"

const useLogin = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();

    const login = async ({ email, password }) => {
        setLoading(true)
        try {
            const res = await axios.post(`${USER_API_END_POINT}/login`, { email, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        
                    },
                    withCredentials: true
                });
            console.log(res);
            dispatch(getUser(res?.data?.user))
            dispatch(getToken(res?.data?.token))
            if (res.data.success) {
                navigate("/");
                toast.success(res.data.message);
            }

        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);

        } finally {
            setLoading(false)
        }
    }
    return { login, loading }
}


export default useLogin