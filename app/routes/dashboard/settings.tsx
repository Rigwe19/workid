import type { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Form from "~/components/form";
import { Modal } from "~/components/modal";
import { get } from "~/libs/axios";
import { profileForm, workForm } from "~/libs/form";
import useAuth from "~/stores/authStore";
import Case from 'case'
import type { Route } from "./+types/settings";
// type Props = {
//     onSuccess: (success:string, value:string) => void
// }
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Frontlett - Settings" },
    { name: "description", content: "Customize your account" },
  ];
}

export default function Settings() {
    const { user, updateUser } = useAuth()
    const [url, setUrl] = useState('');
    const [works, setWorks] = useState<{
        id: number;
        position: string;
        location: string;
        start: string;
        end: string;
        company: string;
    }[]>([]);
    useEffect(() => {
        getQuery()
    }, []);

    const getQuery = async () => {
        try {
            const response: AxiosResponse = await get('/dashboard/settings')
            console.log(response.data)
            const { success, works } = response.data
            if (success) {
                setWorks(works);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const [openModal, setOpenModal] = useState(false);
    const [open, setOpen] = useState(false);
    const [formType, setFormType] = useState<'profile' | 'work'>('profile');
    const [form, setForm] = useState<any>(profileForm);
    const [header, setHeader] = useState('');
    const [defaultValues, setDefaultValues] = useState<any>({})
    const handleOpen = (param: 'profile' | 'work', defaultValues?: any) => {
        setFormType(param);
        setDefaultValues(defaultValues)
        switch (param) {
            case 'profile':
                setForm(profileForm);
                setUrl("/dashboard/profile")
                setHeader('Edit profile details');
                break;
            case 'work':
                setForm(workForm);
                setUrl("/dashboard/settings")
                setHeader('Add your work experience');
                break;
            // case 'facilitator':
            //     form = facilitatorForm;
            //     header = 'Become a Facilitator';
            //     break;
            // case 'support':
            //     form = supportForm;
            //     header = 'Join our support team';
            //     break;
            // case 'advocacy':
            //     form = advocacyForm;
            //     header = 'Engage in Advocacy';
            //     break;
            default:
                break;
        }
        setOpenModal(true);
    }
    const handleClose = () => {
        setOpenModal(false);
    }
    const handleFinish = (response: any) => {
        setOpen(false)
        setOpenModal(false);
        if (formType === 'work') {
            if (response.success) {
                setWorks(response.works)
            }
        } else if (formType === 'profile') {
            if (response.success) {
                updateUser(response.user)
            }
        }
    }
    return (
        <div className="container mx-auto max-w-3xl md:py-16 py-4 px-4">
            <h1 className="text-3xl font-bold mb-6">Account Settings</h1>

            <div className="space-y-6">
                {/* Profile Section */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-xl font-semibold">Profile Information</h2>
                        <button onClick={() => handleOpen('profile', user)} className="text-blue-600 hover:text-blue-800 cursor-pointer">Edit</button>
                    </div>
                    <hr className="mb-4" />
                    <div className="space-y-3">
                        <p><span className="font-medium">Name:</span> {user?.fullName}</p>
                        <p><span className="font-medium">Email:</span> {user?.email}</p>
                        <p><span className="font-medium">Location:</span> {user?.location}</p>
                        <p><span className="font-medium">Phone:</span> {user?.phone}</p>
                        <p><span className="font-medium">LinkedIn Profile:</span> <a href={user?.linkedIn} target="_blank" className="text-primary underline">{user?.linkedIn}</a></p>
                    </div>
                </div>

                {/* Job Preferences Section */}
                {/* <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-xl font-semibold">Job Preferences</h2>
                        <button className="text-blue-600 hover:text-blue-800 cursor-pointer">Edit</button>
                    </div>
                    <hr className="mb-4" />
                    <div className="space-y-3">
                        <p><span className="font-medium">Desired Role:</span> Software Engineer</p>
                        <p><span className="font-medium">Experience Level:</span> Senior</p>
                        <p><span className="font-medium">Preferred Location:</span> Remote</p>
                        <p><span className="font-medium">Salary Range:</span> $120,000 - $150,000</p>
                    </div>
                </div> */}

                {/* Work Experience Section */}
                {user?.role === 'employee' && <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-xl font-semibold">Work Experience</h2>
                        <button onClick={() => handleOpen('work')} className="text-blue-600 hover:text-blue-800 cursor-pointer">+ Add Experience</button>
                    </div>
                    <hr className="mb-4" />
                    <div className="space-y-6">
                        <p className="text-gray-500">No Work Experience Added</p>
                        {works.map(work => <div key={work.id} className="flex justify-between items-start">
                            <div>
                                <h3 className="font-medium">{work.position}</h3>
                                <p className="text-gray-600">{work.start} - {work.end}</p>
                                <p className="mt-2">{work.company} at {work.location}</p>
                            </div>
                            <button onClick={() => handleOpen('work', work)} className="text-blue-600 hover:text-blue-800 cursor-pointer">Edit</button>

                            <hr className="mb-2" />
                        </div>)}
                    </div>
                </div>}

                {/* Notification Settings */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-xl font-semibold">Notification Settings</h2>
                        <button className="text-blue-600 hover:text-blue-800 cursor-pointer">Edit</button>
                    </div>
                    <hr className="mb-4" />
                    <div className="space-y-3">
                        <p><span className="font-medium">Job Alerts:</span> Enabled</p>
                        <p><span className="font-medium">Email Notifications:</span> Daily Digest</p>
                        <p><span className="font-medium">Message Notifications:</span> Enabled</p>
                    </div>
                </div>

                {/* Privacy Settings */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-xl font-semibold">Privacy & Security</h2>
                        <button className="text-blue-600 hover:text-blue-800 cursor-pointer">Edit</button>
                    </div>
                    <hr className="mb-4" />
                    <div className="space-y-3">
                        <p><span className="font-medium">Profile Visibility:</span> Public</p>
                        <p><span className="font-medium">Two-Factor Auth:</span> Enabled</p>
                        <p><span className="font-medium">Connected Accounts:</span> 2</p>
                    </div>
                </div>

                {/* Account Management */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-xl font-semibold">Account Management</h2>
                        <button className="text-blue-600 hover:text-blue-800 cursor-pointer">Edit</button>
                    </div>
                    <hr className="mb-4" />
                    <div className="space-y-3">
                        <p><span className="font-medium">Account Type:</span> {Case.title(user?.role ?? '')}</p>
                        <p><span className="font-medium">Member Since:</span> {new Date(user?.createdAt??'').toString()} January 2020</p>
                        <button className="text-red-600 hover:text-red-800 cursor-pointer">Delete Account</button>
                    </div>
                </div>
            </div>
            <Modal isOpen={openModal} onClose={handleClose} title={formType}>
                <Form url={url} form={form} defaultValues={defaultValues} header={header} onFinish={handleFinish} form_type={formType}></Form>
            </Modal>
        </div>
    );
}
