import { useEffect } from "react";
import { getOtherUsers } from "../redux/userSlice";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { useDispatch } from "react-redux";


const useGetOtherUsers = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchOtherUsers = async () => {

            try {
                const res = await axios.get(`${USER_API_END_POINT}/all/users`, {
                    withCredentials: true,
                });
                console.log("Other User ", res.data.allUsers);
                dispatch(getOtherUsers(res.data.allUsers));

            } catch (error) {
                console.error(error);
            };


        }
        fetchOtherUsers();
    }, []);
}

export default useGetOtherUsers