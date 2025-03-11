import { Navigate, Outlet } from 'react-router'
import useAuth from '~/stores/authStore'

type Props = {}

const Onboarding = (props: Props) => {
    const { token } = useAuth()
    if(token) return <Navigate to="/" />
    return (

        <div className="w-full h-screen flex justify-center items-center">
            <div className="relative h-full md:max-w-md w-full">
            <div className="absolute -z-10 w-full h-full inset-0">
                <div className="absolute w-[635px] h-[635px] bg-[#F8F9FF] rounded-full translate-y-[-327px] translate-x-[148px]"></div>
                <div className="absolute w-[496px] h-[496px] border-3 border-[#F1F4FF] rounded-full translate-y-[-142px] translate-x-[57px]"></div>
                <div className="absolute w-[372px] h-[372px] border-2 border-[#F1F4FF] bottom-[-182px] left-[-264px]"></div>
                <div className="absolute w-[372px] h-[372px] border-2 border-[#F1F4FF] bottom-0 left-[-264px] rotate-[-27deg]"></div>
            </div>
                <Outlet />
            </div>
        </div>

    )
}

export default Onboarding