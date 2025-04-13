import {login as authLogin, logout as authLogout} from "../../features/auth/authSlice";
import authService from "../../appwrite/auth";
import {useForm} from 'react-hook-form';
import Logo from './Logo';
import Input from './Input';
import Button from './Button';
import { Link, useNavigate, useRouteLoaderData } from "react-router-dom";
import { useState } from "react";
import {useDispatch} from 'react-redux';

function Login(){
    const [error, setError] = useState("");
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const login = async (data) => {
        setError("");
        try{
            if(data){
                const logging = await authService.login(data);
                if(logging){
                    const userData = authService.getCurrentUser
                    ();
                    if(userData){
                        dispatch(authLogin(userData));
                        navigate("/");
                    }
                }
            }
        }catch(error){
            setError(error.message);
        }
    }
    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>

                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                Don't have an account?
                <Link to="/signup" className="font-medium text-primary transition-all duration-200 hover:underline">Sign up</Link>
                </p>

                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(login)} className="mb-8">
                    <div className='space-y-5'>
                        <Input label="E-mail:" type="email" placeholder="Enter your E-mail" {...register("email", {required: true})} />

                        <Input label="Password:" type="password" placeholder="Enter your password" {...register("password", {required:true})} />

                        <Button type="submit" className="w-full">Login</Button>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default Login;