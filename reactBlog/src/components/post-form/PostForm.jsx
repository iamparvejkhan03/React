import Input from '../Input';
import Select from "../Select";
import Button from "../Button";
import { useForm } from 'react-hook-form';
import RTE from '../RTE';
import {service as appwriteService} from '../../../appwrite/config';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { useCallback, useEffect } from 'react';

function PostForm({post}){
    const {register, handleSubmit, control, setValue, watch, getValues} = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || ''
        }
    });

    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);

    const submit = async (data) => {
        if(post){
            const file = data.image[0] ? appwriteService.uploadFile(data.image[0]) : null;
            if(file){
                appwriteService.deleteFile(post.featuredImage);
            }
            const dbpost = await appwriteService.updatePost(post.$id, {...data, });

            if(dbpost){
                navigate(`/post/${post.$id}`);
            }
        }else{
            const file = await appwriteService.uploadFile(data.image[0]);
            data.featuredImage = file.$id;
            const dbpost = await appwriteService.createPost({...data, userId: userData.$id});
            if(dbpost){
                navigate(`/post/${dbpost.$id}`);
            }
        }

        useEffect(() => {
            const subscription = watch((value, {name}) => {
                if(name === 'title'){
                    setValue('slug', value.title, {shouldValidate:true})
                }
            });

            return () => subscription.unsubscribe();
        }, [watch, slugTransform, setValue])

        const slugTransform = useCallback(value => {
            if(value && typeof value === "string" ){
                return value.trim().toLocaleLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-");
            }
            return "";
        })
    }

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input type="text" label="Title:" className="mb-4" {...register("title", {required:true})} />
                <Input type="text" label="Slug:" className="mb-4" {...register("slug", {required:true})} onInput={(e) => setValue("slug", slugTransform(e.target.value), {shouldValidate:true})} />
                <RTE name="content" label="Label:" defaultValue={getValues("content")} control={control} />
            </div>
            <div className="w-1/3 px-2">
                <Input label="Featured Image:" type="file" className="mb-4" accept="image/png, image/jpg, image/jpeg, image/gif" {...register("image", {required:!post})} />

                <Select label="Status:" options={['active', 'inactive']} className="mb-4" {...register('status', {required:true})} />

                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full" >{post ? 'Update' : 'Publish'}</Button>
            </div>
        </form>
    );
}

export default PostForm;