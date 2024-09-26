import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';

function SingUp(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState("")
    const { register, handleSubmit } = useForm()

    const signup = async (data) => {
        setError("")
        console.log(data);
        try {
            const { name, email, password } = data;
            const usercrete = await authService.creatAccount(email, name, password)
            console.log("creatAccount is called")
            navigate('/login')
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sinup to crete account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Do have any account?&nbsp;
                    <Link
                        to="/signin"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                {/* data in the form is handle by  hook form */}
                <form onSubmit={handleSubmit(signup)}>
                    <div className='space-y-5'>
                        <Input
                            label="Full Name:"
                            placeholder="Enter Your Full Name:"
                            type="text"
                            {...register("name", {
                                required: true
                            })}
                        />
                        <Input
                            label="email"
                            placeholder="Enter email address"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address",
                                }
                            })}
                        />

                        {/* in react hook form password is required... */}
                        <Input
                            label="Password"
                            placeholder="Enter Password"
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters long"
                                },

                            })}
                        />

                        <Button
                            type='submit'
                        >CreateAccount</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SingUp;
