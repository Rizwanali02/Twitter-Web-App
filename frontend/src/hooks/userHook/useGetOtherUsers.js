import { useState } from "react";
import { getOtherUsers } from "../../redux/userSlice";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { useDispatch } from "react-redux";


const useGetOtherUsers = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { token } = useSelector(store => store.user)

    const fetchOtherUsers = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${USER_API_END_POINT}/all/users`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(getOtherUsers(res.data.allUsers));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }


    }

    return { fetchOtherUsers, loading }
}

export default useGetOtherUsers