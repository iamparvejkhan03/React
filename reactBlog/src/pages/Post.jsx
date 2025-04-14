import { useEffect, useState } from "react";
import service from "../../appwrite/config";
import Container from "../components/container/Container";
import { useParams, Link, useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux';
import Button from '../components/Button';
import parse from 'html-react-parser';

function Post(){
    const [post, setPost] = useState(null);
    console.log(post);
    const {slug} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        service.getPost(slug).then(post => setPost(post));
    }, [slug, navigate])

    const userData = useSelector(state => state.auth.userData);
    const isAuthor = userData && post ? userData.$id === post.userId : false;

    const deletePost = () => {
        service.deletePost(slug).then((status) => {
            if(status){
                service.deleteFile(post.featuredImage);
                navigate('/');
            }
        });
    }

    return (
        post ? (
            <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img src={service.getFilePreview(post.featuredImage)} alt={post.title} className="rounded-xl" />
                    {
                        isAuthor && (
                            <div className="absolute right-6 top-6">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500" className="mr-3">Edit</Button>
                                </Link>
                                <Button bgColor="bg-red-500 text-white" onClick={deletePost}>Delete</Button>
                            </div>
                        )
                    }
                </div>

                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>

                <div className="browser-css">
                    {
                       parse(post.content) 
                    }
                </div>
            </Container>
        </div>
        ) : null
    );
}

export default Post;