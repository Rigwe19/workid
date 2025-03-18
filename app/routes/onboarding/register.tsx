import React, { useState } from 'react'
import type { Route } from './+types/register';
import Input from '~/components/input';
import { Button } from '~/components/button';
import { Link, useLocation, useParams } from 'react-router';
import useAuth from '~/stores/authStore';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Frontlett - Register" },
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
    full_name: string,
    username: string,
    phone: string,
    email: string,
    location: string,
    password: string,
    confirm?: string,
    role: string
}
const schema = yup
    .object({
        full_name: yup.string().required(),
        username: yup.string().required(),
        phone: yup.string().length(11).required(),
        password: yup.string().required().min(8),
        email: yup.string().email().required(),
        location: yup.string().required(),
        confirm: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
        role: yup.string().required(),
    })
    .required()
const Register = () => {
    const { signUp } = useAuth();
    const location = useLocation();
    const { type } = useParams();
    const isEmployer = type === 'employer';
    const { formState: { errors }, register, handleSubmit } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            role: isEmployer ? 'employer' : 'employee'
        }
    });
    const [sErrors, setSErrors] = useState<FormErrors>({
        full_name: undefined,
        username: undefined,
        phone: undefined,
        email: undefined,
        password: undefined,
        location: undefined,
        confirm: undefined
    });
    // const [form, setForm] = useState({
    //     full_name: '',
    //     username: '',
    //     phone: '',
    //     email: '',
    //     location: '',
    //     password: '',
    //     confirm: '',
    //     role: 'employee'
    // });
    // const handleChange = (name: string, value: string) => {
    //     setForm({ ...form, [name]: value });
    // }

    const onSubmit = async (form: Inputs) => {
        try {
            await signUp(form)
        } catch (error: any) {
            setSErrors(error)
        }

    }

    return (
        <div className="px-3 flex flex-col justify-center items-center gap-10 flex-1">
            <div className="w-2/3 flex flex-col gap-7 text-center">
                <h2 className="text-primary font-bold text-2xl">Employee Register Here</h2>
                <p className="text-bold text-xl">Register and start using our service!</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
                <Input type="text" {...register("full_name")} error={sErrors.full_name ?? errors.full_name?.message} inputMode='text' autoComplete='name webauthn' placeholder={isEmployer ? "Company Name" : "Full Name"} />
                <Input type="text" {...register("username")} error={sErrors.username ?? errors.username?.message} inputMode='text' autoComplete='username webauthn' placeholder={isEmployer ? "Company Username" : "Username"} />
                <Input type="email" {...register("email")} error={sErrors.email ?? errors.email?.message} inputMode='email' autoComplete='email webauthn' placeholder={isEmployer ? "Company Email Address" : "Email Address"} />
                <Input type="text" {...register("phone")} error={sErrors.phone ?? errors.phone?.message} inputMode='numeric' autoComplete='mobile tel webauthn' placeholder={isEmployer ? "Company Phone Number" : "Phone Number"} />
                <Input type="text" {...register("location")} error={sErrors.location ?? errors.location?.message} inputMode='text' autoComplete='address-level1 webauthn' placeholder={isEmployer ? "Company Location" : "Location"} />
                <Input type="password" {...register("password")} error={sErrors.password ?? errors.password?.message} autoComplete='new-password' placeholder="Password" />
                <Input type="password" {...register("confirm")} error={sErrors.confirm ?? errors.confirm?.message} placeholder="Confirm Password" />
                <Button>Sign Up</Button>
            </form>
            <div className="flex flex-col gap-2">
                <Link viewTransition to="/onboarding/login" className="text-gray-700 text-semibold self-center">Already have an account</Link>
                <Link viewTransition to={`/onboarding/register/${isEmployer ? 'employee' : 'employer'}`} className="text-primary text-semibold self-center">Not an Employe{isEmployer ? 'r' : 'e'} Register Here</Link>
            </div>

        </div>
    )
}

export default Register