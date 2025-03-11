import React, { useState } from 'react'
import type { Route } from './+types/register';
import Input from '~/components/input';
import { Button } from '~/components/button';
import { Link } from 'react-router';
import useAuth from '~/stores/authStore';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Frontlett - Employer Register" },
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
const EmployerRegister = () => {
    const { token, register } = useAuth();
    const [errors, setErrors] = useState<FormErrors>({
        full_name: '',
        username: '',
        phone: '',
        email: '',
        location: '',
        password: '',
        confirm: ''
    });
    const [form, setForm] = useState({
        full_name: '',
        username: '',
        phone: '',
        location: '',
        email: '',
        password: '',
        confirm: '',
        role: 'employer'
    });
    const handleChange = (name: string, value: string) => {
        setForm({ ...form, [name]: value });
    }

    const handleRegister = async () => {
        try {
            await register(form).then(res => {
                console.log(res)
            })
        } catch (error: any) {
            setErrors(error)
            // if (error.status === 422) {
            //     const validationErrors: FormErrors = {};
            //     error.validationErrors?.forEach((err: ValidationError) => {
            //       validationErrors[err.field] = err.message;
            //     });
            //     setErrors(validationErrors);
            //     console.log(validationErrors)
            //     // setErrors(validationErrors);
            //   }
        }
 
    }

    return (
        <div className="py-[50px] px-3 flex flex-col justify-center items-center gap-10 h-screen flex-1">
            <div className="flex flex-col gap-7 text-center">
                <h2 className="text-primary font-bold text-2xl">Employer Register Here</h2>
                <p className="text-bold text-xl">Create an account to us our service</p>
            </div>
            <div className="w-full flex flex-col gap-6">
                <Input type="text" value={form.full_name} onChange={e=>handleChange('full_name', e.target.value)} error={errors.full_name} inputMode='text' autoComplete='name webauthn' placeholder="Company Name" />
                <Input type="text" value={form.username} onChange={e=>handleChange('username', e.target.value)} error={errors.username} inputMode='text' autoComplete='username webauthn' placeholder="Username" />
                <Input type="email" value={form.email} onChange={e=>handleChange('email', e.target.value)} error={errors.email} inputMode='email' autoComplete='email webauthn' placeholder="Company Email" />
                <Input type="text" value={form.phone} onChange={e=>handleChange('phone', e.target.value)} error={errors.phone} inputMode='numeric' autoComplete='mobile tel webauthn' placeholder="Company Phone" />
                <Input type="text" value={form.location} onChange={e=>handleChange('location', e.target.value)} error={errors.location} inputMode='text' autoComplete='address-level1 webauthn' placeholder="Company Location" />
                <Input type="password" value={form.password} onChange={e=>handleChange('password', e.target.value)} error={errors.password} autoComplete='new-password' placeholder="Password" />
                <Input type="password" value={form.confirm} onChange={e=>handleChange('confirm', e.target.value)} error={errors.confirm} placeholder="Confirm Password" />
                <Button onClick={handleRegister}>Sign Up</Button>
            </div>
            <Link viewTransition to="/onboarding/login" className="text-gray-700 text-semibold self-center text-primary">Already have an account</Link>
        </div>
    )
}

export default EmployerRegister