import { Button, Container, Input, RTE, Select } from "../components";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import appwritePostService from "../../appwrite/post";
import appwriteStorageService from "../../appwrite/storage";
import appwrite_auth_service from "../../appwrite/auth";
import { useNavigate } from "react-router-dom";

function PostForm({post, id}){
    const navigate = useNavigate();

    const {register, handleSubmit, control, watch, setValue, getValues} = useForm({
        defaultValues:{
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            file: post?.featuredImage || "",
            status: post?.status || "active",
        }
    });

    const publishPost = async(data) => {
        if(post){
            if(data.image[0]){
                await appwriteStorageService.deleteFile(post.featuredImage);
                const fileId = await appwriteStorageService.uploadFile(data.image[0]);
                setValue('file', fileId, {shouldValidate:true});
            }

            const update = await appwritePostService.updatePost({...data, featuredImage: getValues('file')}, id);

            if(update){
                navigate(`/post/${id}`);
            }
            
        }else{
            if(data){
                const user = await appwrite_auth_service.getCurrentUser();
                if(user){
                    const fileId = await appwriteStorageService.uploadFile(data.image[0]);
                    if(fileId){
                        const postAdded = await appwritePostService.addPost(data, user.$id, fileId);
                        if(postAdded){
                            navigate(`/post/${data.slug}`);
                        }
                    }
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if(value && typeof value === 'string'){
            return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-");
        }
        return "";
    })

    useEffect(() => {
        const subscription = watch(({title}, {name}) => {
            if(name === 'title'){
                setValue('slug', slugTransform(title), {shouldValidate:true});
            }
        })
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);
    
    return (
        <form onSubmit={handleSubmit(publishPost)}>
            <div className="w-full flex items-start">
                <div className="w-2/3 border rounded-lg p-5">
                    <Input type="text" label="Title:" {...register('title', {required:true})} placeholder="Enter post title here..." />

                    <Input type="text" onInput={(e) => setValue('slug', slugTransform(e.target.value), {shouldValidate:true})} label="Slug:" {...register('slug', {required:true})} placeholder="Enter post slug here..." />

                    <RTE label="Content:" name="content" defaultValue={getValues("content")} control={control} />
                </div>

                <div className="w-1/3 ml-10 border rounded-lg p-5">
                    <Input type="file" accept="image/png, image/jpg, image/jpeg, image/webp" label="Featured Image:" {...register('image', {required:!post})} />


                    <Select label="Status:" options={['active', 'inactive']} {...register('status', {required:true})} />

                    <Button type="submit">Publish</Button>
                </div>
            </div>
        </form>
    );
}

export default PostForm; 