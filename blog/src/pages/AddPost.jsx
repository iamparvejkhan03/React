import { Container, PostForm } from "../components";

function AddPost(){    
    return (
        <section className="w-full py-10 text-gray-600 body-font bg-gray-100">
            <Container>
                <h1 className="text-2xl font-bold text-center my-5">Add Post</h1>
                <PostForm />
            </Container>
        </section>
    );
}

export default AddPost;