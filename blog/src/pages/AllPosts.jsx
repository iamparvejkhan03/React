import { useEffect, useState } from "react";
import { Container, BlogCard } from "../components";
import appwritePostService from "../../appwrite/post";

function AllPosts(){
    const [allPosts, setAllPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=> {
            appwritePostService.getAllPosts().then(posts => {
                setAllPosts(posts.documents);
                setLoading(false);
            })
    }, []);

    return (
            <section className="text-gray-600 body-font">
                {
                    loading ? (
                        <Container>
                            <div className="text-4xl min-h-screen flex justify-center items-center text-black font-extrabold ">
                                <i className="fa-solid fa-spinner animate-spin spin-in text-5xl"></i>
                            </div>
                        </Container>
                    ) : (
                        <Container>
                            <h1 className="text-4xl text-black font-extrabold text-center my-10">All Posts</h1>

                            <div className="container py-12 mx-auto">
                                <div className="flex flex-wrap -m-4">
                                    {
                                        allPosts?.map(post => (
                                            <BlogCard key={post.$id} post={post} />
                                        ))
                                    }
                                </div>
                            </div>
                        </Container>
                    )
                }
            </section>
    );
}

export default AllPosts;