import React, { useState } from 'react'
import type { Route } from './+types/login';
import Input from '~/components/input';
import { Button } from '~/components/button';
import { Link } from 'react-router';
import useAuth from '~/stores/authStore';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup
    .object({
        username: yup.string().required('Required Field')
            .test('is-email', 'The email is not valid', (value) => {
                if (value) {
                    console.log(yup.string().email().isValidSync(value))
                    return value.includes('@') ? yup.string().email().isValidSync(value) : true
                }
                return true
            }),
        password: yup.string().required(),
    })
    .required()
export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Frontlett - Login" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

interface ValidationError {
    field: string;
    message: string;
}

interface FormErrors {
    [key: string]: string | undefined;
}

type Inputs = {
    username: string,
    password: string
}
const Login = () => {
    const { signIn } = useAuth();
    const { formState: { errors }, register, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });
    const [sErrors, setSErrors] = useState<FormErrors>({
        username: undefined,
        password: undefined,
    });
    const clearErrors = () => {
        setSErrors({
            username: undefined,
            password: undefined,
        })
    }

    // const [form, setForm] = useState({
    //     username: '',
    //     password: '',
    // });
    // const handleChange = (name: string, value: string) => {
    //     setForm({ ...form, [name]: value });
    // }
    const onSubmit = async (form: Inputs) => {
        try {
            await signIn(form)
        } catch (error: any) {
            console.log(error)
            setSErrors(error)
        }
    }

    return (
        <div className="py-[50px] px-3 flex flex-col justify-center items-center gap-10 h-screen flex-1">
            <div className="w-2/3 flex flex-col gap-7 text-center">
                <h2 className="text-primary font-bold text-2xl">Login Here</h2>
                <p className="text-bold text-xl">Welcome back you’ve been missed!</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
                <Input type="text" {...register("username")} error={sErrors.username ?? errors.username?.message} inputMode='text' autoComplete='username webauthn' placeholder="Username/Email" />
                <Input type="password" {...register("password")} error={sErrors.password ?? errors.password?.message} autoComplete='new-password' placeholder="Password" />
                <Link viewTransition to="/onboarding/forgot" className="text-primary text-semibold self-end">Forgot your password?</Link>
                <Button onClick={clearErrors}>Sign In</Button>
            </form>
            <Link viewTransition to="/onboarding/register" className="text-gray-700 text-semibold self-center">Create new account</Link>
        </div>
    )
}

export default Login