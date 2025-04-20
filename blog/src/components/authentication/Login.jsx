import { Link, useNavigate } from "react-router-dom";
import {Input, Button, Notification} from "../";
import appwrite_auth_service from "../../../appwrite/auth";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../features/auth/authSlice";
import { showNotification } from "../../../features/notification/notificationSlice";

function Login(){
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const notification = useSelector(state => state.notification);

    const loginSumbitHandler = async (data) => {
        try{
            const {success, loginData} = await appwrite_auth_service.login(data);
            if(success === false){
                dispatch(showNotification(loginData));
                return "";
            }
            if(success === true){
                const userData = await appwrite_auth_service.getCurrentUser();
                if(userData){
                    dispatch(login(userData));
                    navigate('/all-posts');
                }
            }else{
                console.log('No userdata received...');
            }
        }catch(error){
            throw error;
        }
    }

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

            <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-black rounded-full" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
                <span className="ml-3 text-xl font-extrabold uppercase italic">TailBlogs</span>   
            </Link>

            <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Login to your account
                    </h1>
                    {
                        notification.loginNotification && (<Notification value={notification.loginNotificationText} />)
                    }
                    <form onSubmit={handleSubmit(loginSumbitHandler)} className="space-y-4 md:space-y-6">

                        <Input type="email" label="E-mail:" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 my-2" placeholder="name@company.com" {...register("email", {required:true})} />

                        <Input type="password" label="Password:" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 my-2" placeholder="••••••••" {...register("password", {required:true})} />

                        <br />

                        <Button type="submit" className="w-full text-white bg-black hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center cursor-pointer">Log In <i className="fas fa-sign-in"></i></Button>

                        <p className="text-sm text-center font-light text-gray-500">
                            Don't have an account? <Link to="/register" className="font-medium text-primary-600 hover:underline">Register here</Link>
                        </p>

                    </form>
                </div>
            </div>
            </div>
        </section>
    );
}

export default Login;