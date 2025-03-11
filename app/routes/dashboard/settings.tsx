import type { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Form from "~/components/form";
import { Modal } from "~/components/modal";
import { get } from "~/libs/axios";
import { profileForm, workForm } from "~/libs/form";
import useAuth from "~/stores/authStore";
// type Props = {
//     onSuccess: (success:string, value:string) => void
// }
export default function Settings() {
    const { user } = useAuth()
    const [works, setWorks] = useState([]);
    useEffect(() => {
        getQuery()
    }, []);

    const getQuery = async () => {
        try {
            const response: AxiosResponse = await get('/dashboard/settings')
            console.log(response.data)
            const { success, works } = response.data
            if(success){
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
    const handleOpen = (param: 'profile' | 'work') => {
        setFormType(param);
        switch (param) {
            case 'profile':
                setForm(profileForm);
                setHeader('Edit profile details');
                break;
            case 'work':
                setForm(workForm);
                setHeader('Become a Mentor');
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
    const handleFinish = () => {
        setOpen(true)
        setOpenModal(false);
    }
    return (
        <div className="container mx-auto max-w-3xl md:py-16 py-4 px-4">
            <h1 className="text-3xl font-bold mb-6">Account Settings</h1>

            <div className="space-y-6">
                {/* Profile Section */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-xl font-semibold">Profile Information</h2>
                        <button onClick={() => handleOpen('profile')} className="text-blue-600 hover:text-blue-800 cursor-pointer">Edit</button>
                    </div>
                    <hr className="mb-4" />
                    <div className="space-y-3">
                        <p><span className="font-medium">Name:</span> {user?.fullName}</p>
                        <p><span className="font-medium">Email:</span> {user?.email}</p>
                        <p><span className="font-medium">Location:</span> {user?.location}</p>
                        <p><span className="font-medium">Phone:</span> {user?.phone}</p>
                    </div>
                </div>

                {/* Job Preferences Section */}
                <div className="bg-white rounded-lg shadow p-6">
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
                </div>

                {/* Work Experience Section */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-xl font-semibold">Work Experience</h2>
                        <button onClick={() => handleOpen('work')} className="text-blue-600 hover:text-blue-800 cursor-pointer">+ Add Experience</button>
                    </div>
                    <hr className="mb-4" />
                    <div className="space-y-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-medium">Senior Developer at Tech Corp</h3>
                                <p className="text-gray-600">2020 - Present</p>
                                <p className="mt-2">Led development team of 5 engineers...</p>
                            </div>
                            <button className="text-blue-600 hover:text-blue-800 cursor-pointer">Edit</button>
                        </div>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-medium">Software Engineer at StartUp Inc</h3>
                                <p className="text-gray-600">2018 - 2020</p>
                                <p className="mt-2">Developed and maintained web applications...</p>
                            </div>
                            <button className="text-blue-600 hover:text-blue-800 cursor-pointer">Edit</button>
                        </div>
                    </div>
                </div>

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
                        <p><span className="font-medium">Account Type:</span> Professional</p>
                        <p><span className="font-medium">Member Since:</span> January 2020</p>
                        <button className="text-red-600 hover:text-red-800 cursor-pointer">Delete Account</button>
                    </div>
                </div>
            </div>
            {/* {isEditing && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold">{formConfig[activeForm].title}</h2>
                            <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-gray-700">
                                <XIcon className="h-6 w-6" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {formConfig[activeForm].fields.map((field) => (
                                <div key={field.name} className="space-y-2">
                                    <label htmlFor={field.name} className="block font-medium">
                                        {field.label}
                                    </label>
                                    {field.type === 'select' ? (
                                        <select
                                            id={field.name}
                                            name={field.name}
                                            value={formData[field.name] || ''}
                                            onChange={handleChange}
                                            className="w-full border rounded-md p-2"
                                        >
                                            {field.options?.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type={field.type}
                                            id={field.name}
                                            name={field.name}
                                            value={formData[field.name] || ''}
                                            onChange={handleChange}
                                            className="w-full border rounded-md p-2"
                                        />
                                    )}
                                </div>
                            ))}
                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 border rounded-md hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )} */}
            <Modal isOpen={openModal} onClose={handleClose} title={formType}>
                <Form form={form} header={header} onFinish={handleFinish} form_type={formType}></Form>
            </Modal>
        </div>
    );
}
