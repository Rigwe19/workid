import React from 'react'
import { Button } from '~/components/button'
import Link from '~/components/link'
import type { Route } from './+types/start';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Frontlett - Get Started" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const Start = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col w-full gap-4">
        <h3 className="font-semibold text-4xl text-primary text-center">Discover Your Dream Job here</h3>
        <p className="text-sm text-center text-gray-700">Explore all the existing job roles based on your interest and study major</p>
      </div>
      <div className="flex justify-center gap-8">
        <Link to="/onboarding/login">Login</Link>
        <Link to="/onboarding/register/employee" variant='outline'>Register</Link>
      </div>
      <div className="flex flex-col gap-4 mb-4 items-center">
        <p className="text-sm text-center text-gray-700">Organisation register here</p>
        <Link to="/onboarding/register/employer" className='w-fit' variant='outline'>Register</Link>
      </div>
    </div>
  )
}

export default Start