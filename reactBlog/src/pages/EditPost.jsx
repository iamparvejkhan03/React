import PostForm from '../components/post-form/PostForm';
import Container from '../components/container/Container';
import { useParams, useNavigate } from 'react-router-dom';
import service from '../../appwrite/config';
import { use, useEffect, useState } from 'react';

function EditPost(){
    const [post, setPost] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(slug){
            service.getPost(slug).then(post => setPost(post)).catch(error => {throw error});
        }else{
            navigate('/');
        }
    }, [slug, navigate])

    return (
        post ? (<div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>) : null
    );
}

export default EditPost;