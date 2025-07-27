import { useDispatch, useSelector } from "react-redux"
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";
import axios from "axios";

const Feed = () => {
    const feed = useSelector((store) => store.feed);
    const dispatch = useDispatch();

    const getFeed = async () => {
        if (feed) return;
        try {
            const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
            console.log("Response ", res);
            dispatch(addFeed(res?.data?.data));
        } catch (err) {

        }
    }

    useEffect(() => {
        getFeed();
    }, []);

    if(!feed) return;
    if(feed.length <= 0) {
        return <h1>No New Users Found</h1>
    }

    return (
        feed && (
            <div className="flex justify-center my-10">
                <UserCard user={feed[0]} />
            </div>
        )
    )
}

export default Feed