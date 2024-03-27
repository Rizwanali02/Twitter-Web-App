import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { USER_API_END_POINT } from '../utils/constant';

const useRegister = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const signUp = async ({ name, username, email, password }) => {
        setLoading(true)
        try {
            const res = await axios.post(`${USER_API_END_POINT}/register`, { name, username, email, password },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
            console.log(res);

            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }

        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);

        } finally {
            setLoading(false)
        }
    }
    return { signUp, loading }
}

export default useRegister
