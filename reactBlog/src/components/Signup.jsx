import { useState } from "react";
import Input from './Input';
import Logo from './Logo';
import Button from './Button';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { login } from "../../features/auth/authSlice";
import { useForm } from "react-hook-form";

function Signup(){
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();

    const signup = async (data) => {
        try{
            setError("");
            const signingup = await authService.register(data);
            if(signingup){
                const userData = authService.getCurrentUser();
                if(userData){
                    dispatch(login(userData));
                    navigate("/")
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

                <h2 className="text-center text-2xl font-bold leading-tight">Sign up for your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                Already have an account?
                <Link to="/login" className="font-medium text-primary transition-all duration-200 hover:underline">Sign in</Link>
                </p>

                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(signup)} className="mb-8">
                    <div className='space-y-5'>
                        <Input label="Full Name:" type="text" placeholder="Enter your full name" {...register("name", {required: true})} />

                        <Input label="E-mail:" type="email" placeholder="Enter your E-mail" {...register("email", {required: true})} />

                        <Input label="Password:" type="password" placeholder="Enter your password" {...register("password", {required:true})} />

                        <Button type="submit" className="w-full">Sign up</Button>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default Signup;