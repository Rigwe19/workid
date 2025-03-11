import React, { useState } from 'react'
import type { Route } from './+types/register';
import Input from '~/components/input';
import { Button } from '~/components/button';
import { Link } from 'react-router';
import useAuth from '~/stores/authStore';

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
const Register = () => {
    const { token, register } = useAuth();
    const [errors, setErrors] = useState<FormErrors>({
        full_name: '',
        username: '',
        phone: '',
        email: '',
        password: '',
        confirm: ''
    });
    const [form, setForm] = useState({
        full_name: '',
        username: '',
        phone: '',
        email: '',
        password: '',
        confirm: '',
        role: 'employee'
    });
    const handleChange = (name: string, value: string) => {
        setForm({ ...form, [name]: value });
    }

    const handleRegister = async () => {
        try {
            await register(form)
        } catch (error: any) {
            setErrors(error)
        }
 
    }

    return (
        <div className="py-[50px] px-3 flex flex-col justify-center items-center gap-10 h-screen flex-1">
            <div className="w-2/3 flex flex-col gap-7 text-center">
                <h2 className="text-primary font-bold text-2xl">Login Here</h2>
                <p className="text-bold text-xl">Welcome back you’ve been missed!</p>
            </div>
            <div className="w-full flex flex-col gap-6">
                <Input type="text" value={form.full_name} onChange={e=>handleChange('full_name', e.target.value)} error={errors.full_name} inputMode='text' autoComplete='name webauthn' placeholder="Full Name" />
                <Input type="text" value={form.username} onChange={e=>handleChange('username', e.target.value)} error={errors.username} inputMode='text' autoComplete='username webauthn' placeholder="Username" />
                <Input type="email" value={form.email} onChange={e=>handleChange('email', e.target.value)} error={errors.email} inputMode='email' autoComplete='email webauthn' placeholder="Email" />
                <Input type="text" value={form.phone} onChange={e=>handleChange('phone', e.target.value)} error={errors.phone} inputMode='numeric' autoComplete='mobile tel webauthn' placeholder="Phone" />
                <Input type="password" value={form.password} onChange={e=>handleChange('password', e.target.value)} error={errors.password} autoComplete='new-password' placeholder="Password" />
                <Input type="password" value={form.confirm} onChange={e=>handleChange('confirm', e.target.value)} error={errors.confirm} placeholder="Confirm Password" />
                <Button onClick={handleRegister}>Sign Up</Button>
            </div>
            <Link viewTransition to="/onboarding/login" className="text-gray-700 text-semibold self-center">Already have an account</Link>
        </div>
    )
}

export default Register