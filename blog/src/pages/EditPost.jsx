import { useParams } from "react-router-dom";
import { Container, PostForm } from "../components";
import appwritePostService from "../../appwrite/post";
import { useState, useEffect } from "react";

function EditPost(){
    const {slug} = useParams();
    const [postData, setPostData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        if(slug){
            const fetchData = async () => {
                const getPost = await appwritePostService.getPost(slug);
                if(getPost){
                    setPostData(getPost);
                    setLoading(false);
                }
            }
            fetchData();
        }
    }, [slug, setPostData]) 

    return (
        <section className="w-full py-10 text-black body-font bg-gray-100">
            {
                loading ? (
                    <Container>
                        <div className="text-4xl min-h-screen flex justify-center items-center text-black font-extrabold ">
                            <i className="fa-solid fa-spinner animate-spin spin-in text-5xl"></i>
                        </div>
                    </Container>
                ) : (
                    <Container>
                        <h1 className="text-2xl font-bold text-center">Edit Post</h1>
                        <PostForm post={postData} id={slug} />
                    </Container>
                )
            }
        </section>
    );
}

export default EditPost;