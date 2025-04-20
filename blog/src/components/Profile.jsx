import { useEffect, useState } from 'react';
import {Input, Button} from './index'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import appwrite_auth_service from '../../appwrite/auth';
import { updateAuth } from '../../features/auth/authSlice';
import appwriteStorageService from '../../appwrite/storage';


function Profile(){
    const userData = useSelector(state => state.auth.userData);
    const [shouldUpdateName, setShouldUpdateName] = useState(false);
    const [shouldUpdatePhone, setShouldUpdatePhone] = useState(false);
    const [shouldUpdateEmail, setShouldUpdateEmail] = useState(false);
    const [hasProfilePic, setHasProfilePic] = useState(false);
    const dispatch = useDispatch();
    // console.log(userData);

    const {register, handleSubmit, watch, getValues} = useForm({
        defaultValues: {
            name: userData?.name || "",
            email: userData?.email || "",
            phone: userData?.phone || "",
            image: userData?.image || "",
        }
    });

    useEffect(() => {
        appwriteStorageService.getFile(userData.$id).then(data => setHasProfilePic(data));
        const subscription = watch((value, {name}) => {
            if(name === 'name'){
                setShouldUpdateName(true);
            }
            
            if(name === 'phone'){
                setShouldUpdatePhone(true);
            }

            if(name === 'email'){
                setShouldUpdateEmail(true);
            }

            if(name === 'image'){
                const image = getValues('image')[0];

                appwriteStorageService.getFile(userData.$id).then(success => {
                    if(success){
                        appwriteStorageService.deleteFile(userData.$id).then(data => {
                            appwriteStorageService.uploadProfilePic(userData.$id, image).then(success => {
                                if(success){
                                    setHasProfilePic(true);
                                }
                            })
                        })
                    }else{
                        appwriteStorageService.uploadProfilePic(userData.$id, image).then(success => {
                            if(success){
                                setHasProfilePic(true);
                            }
                        })
                    }
                })                
            }
        })
        return () => subscription.unsubscribe();
    }, [watch, setShouldUpdateName, setShouldUpdateEmail, setShouldUpdatePhone])

    const handleUpdate = async({name, email, phone, password}) => {
        if(shouldUpdateName || shouldUpdateEmail || shouldUpdatePhone){
            const updated = await appwrite_auth_service.updateProfile({name, email, phone, password});
            if(updated.success === true){
                const userUpdatedData = await appwrite_auth_service.getCurrentUser();
                if(userUpdatedData){
                    dispatch(updateAuth(userUpdatedData));
                    console.log(updatedData);
                }
            }
        }
    }

    const uploadImage = () => {
        document.getElementById('upload_image').click();
    }
    
    return (
        <div className="w-1/3 border rounded-lg p-5">
            <figure className="w-32 h-32 h- mx-auto mb-5 rounded-full overflow-hidden cursor-pointer">
                <img src={hasProfilePic ? appwriteStorageService.getFilePreview(userData.$id) : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="user_image" id="user_image" className="object-cover" onClick={uploadImage} />
            </figure>

            <form onSubmit={handleSubmit(handleUpdate)}>
                <Input type="text" label="Full Name:" placeholder="Your full name..." {...register('name', {required:false})} />

                <Input type="file" hidden id="upload_image" {...register('image', {required:false})} />

                <Input type="email" label="E-mail:" placeholder="Your e-mail..." {...register('email', {required:false})} />

                <Input type="text" label="Phone No:" placeholder="Your phone no..." {...register('phone', {required:false})} />

                <hr className='my-2' />

                <Input type="password" label="Password needed to update above info:" placeholder="Your password..." {...register('password', {required:true})} />

                <Button type="submit" className="bg-black text-white rounded-sm py-2 px-5 hover:bg-gray-950 cursor-pointer w-full mt-3">Update Profile <i className="fas fa-edit"></i></Button>
            </form>
        </div>
    );
}

export default Profile;