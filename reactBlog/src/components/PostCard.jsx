import service from "../../appwrite/config";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function PostCard({$id, title, featuredImage}){
    useEffect(() => {

    }, []);
    return (
        <Link to={`/post/${$id}`}>
            <div className="bg-gray-100 w-full rounded-xl p-4">
                <div className="w-full justify-center mb-4 ">
                    <img src={service.getFilePreview(featuredImage)} alt={title} className="rounded-xl" />
                </div>
                <h2 className="text-xl font-bold">{title}</h2>
            </div>
        </Link>
    );
}

export default PostCard;