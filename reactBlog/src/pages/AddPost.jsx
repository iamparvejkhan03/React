import PostForm from "../components/post-form/PostForm";
import Container from "../components/container/Container";
import { Navigate } from "react-router-dom";
import service from "../../appwrite/config";

function AddPost(){
    return (
        <div className="py-8">
            <Container>
                <PostForm />
            </Container>
        </div>
    );
}

export default AddPost;