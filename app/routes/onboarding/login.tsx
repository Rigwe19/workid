import React, { useState } from 'react'
import type { Route } from './+types/login';
import Input from '~/components/input';
import { Button } from '~/components/button';
import { Link } from 'react-router';
import useAuth from '~/stores/authStore';

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

const Login = () => {
    const { signIn } = useAuth();
    const [errors, setErrors] = useState<FormErrors>({
        username: '',
        password: '',
    });
    const [form, setForm] = useState({
        username: '',
        password: '',
    });
    const handleChange = (name: string, value: string) => {
        setForm({ ...form, [name]: value });
    }
    const handleLogin = async() => {
        try {
            await signIn(form)
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
                <Input type="email" value={form.username} onChange={e=>handleChange('username', e.target.value)} error={errors.username} inputMode='text' autoComplete='username webauthn' placeholder="Username" />
                <Input type="password" value={form.password} onChange={e=>handleChange('password', e.target.value)} error={errors.password} autoComplete='new-password' placeholder="Password" />
                <Link viewTransition to="/onboarding/forgot" className="text-primary text-semibold self-end">Forgot your password?</Link>
                <Button onClick={handleLogin}>Sign In</Button>
            </div>
            <Link viewTransition to="/onboarding/register" className="text-gray-700 text-semibold self-center">Create new account</Link>
        </div>
    )
}

export default Login