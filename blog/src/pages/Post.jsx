import { Link, useParams } from "react-router-dom";
import { Button, Container } from "../components";
import appwritePostService from "../../appwrite/post";
import { useEffect, useState } from "react";
import parse from 'html-react-parser';
import appwriteStorageService from "../../appwrite/storage";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Post(){
    const {slug} = useParams();
    const [postData, setPostData] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);
    const isAuthor = userData ? userData.$id === postData.userId : false;
    // console.log(isAuthor);
    
    useEffect(() => {
        if(slug){
            const fetchData = async() => {
                const post = await appwritePostService.getPost(slug);
                if(post){
                    setPostData(post);
                    const imagePreview = appwriteStorageService.getFilePreview(post.featuredImage);
                    if(imagePreview){
                        setImage(imagePreview);
                        setLoading(false);
                        // console.log(post);
                    }
                }
            }
            fetchData();
        }else{
            navigate('/all-posts');
        }
    }, [slug, navigate])

    const deletePost = async () => {
        const deletedPost = await appwritePostService.deletePost(postData.$id);
        if(deletePost){
            const deletedFile = await appwriteStorageService.deleteFile(postData.featuredImage);
            if(deletedFile){
                navigate('/');
            }
        }
    }
    
    return (
        <section className="w-full py-10 text-gray-600 body-font">
            {
                loading ? (
                    <Container>
                        <div className="text-4xl min-h-screen flex justify-center items-center text-black font-extrabold ">
                            <i className="fa-solid fa-spinner animate-spin spin-in text-5xl"></i>
                        </div>
                    </Container>
                ) : (
                    <Container>
                        <h1 className="text-4xl text-black font-extrabold my-10">{postData.title}</h1>
                        <div className="w-2/3">
                            {
                                isAuthor && (
                                    <div className="w-4/12 flex justify-between mb-5">
                                        <Link to={`/edit-post/${postData.$id}`}><Button className="bg-orange-500 text-white rounded-sm py-2 px-5 hover:bg-gray-950 cursor-pointer">Edit Post <i className="fas fa-edit"></i></Button></Link>
                                        <Button className="bg-red-500 text-white rounded-sm py-2 px-5 hover:bg-gray-950 cursor-pointer">Delete Post <i className="fa-solid fa-trash" onClick={deletePost}></i></Button>
                                    </div>
                                )
                            }

                            <figure>
                                <img src={image.href} className="rounded-lg shadow-lg w-full" />
                            </figure> 

                            <br />

                            <div className="prose prose-lg">{parse(postData.content)}</div>
                        </div>
                    </Container>
                )
            }
        </section>
    );
}

export default Post;