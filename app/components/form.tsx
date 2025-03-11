import { Children } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { BiError } from 'react-icons/bi';
import { toast } from 'react-toastify';
import Input from './input';
import Textarea from './textarea';
import Select from './select';
import { Button } from './button';

type Props = Readonly<{
    form: any;
    header: string;
    onFinish: VoidFunction;
    form_type: 'profile' | 'work';
}>

export default function Form({ form, header, onFinish, form_type }: Props) {
    const { register, handleSubmit, control, formState: { errors } } = useForm<any>({
    });

    const onSubmit: SubmitHandler<any> = (data) => {
        console.log(errors);
        // router.post(route('form.create'), { form_type, data }, {
        //     onSuccess: (page) => {
        //         onFinish();
        //     },
        //     onError: (page) => {
        //         toast.error(page.errors, {
        //             position: 'top-center',
        //             closeButton: false
        //         })
        //     }
        // });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="flex justify-center">
                <h4 className="">{header}</h4>
            </div>

            <div className="grid grid-cols-1 gap-2 my-2 px-2">
                {Children.toArray(Object.keys(form).map(field => <div className={`${form[field]?.width ? 'col-span-full' : ''}`}>
                    {form[field].type === 'input' && <Input
                        {...register(field, { required: { value: form[field].required, message: `The ${form[field].label} cannot be empty` }, pattern: { value: form[field].type === 'email' ? /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i : /^.*$/i, message: `The ${form[field].label} provided is Invalid` } })}
                        // labelProps={{ className: 'peer-focus:after:border-primary-500 peer-focus:text-primary-400' }}
                        label={form[field].label}
                        // variant="standard"
                        inputMode={form[field]?.inputMode}
                        error={errors[field]?.root && undefined}
                        placeholder={form[field].placeholder} />}
                    {form[field].type === 'textarea' && <Textarea
                        // variant='standard'
                        {...register(field, { required: { value: form[field].required, message: `The ${form[field].label} cannot be empty` } })}
                        // labelProps={{ className: 'peer-focus:after:border-primary-500 peer-focus:text-primary-400' }}
                        label={form[field].label}
                        error={errors[field]?.root && undefined}></Textarea>}
                    {form[field].type === 'select' && <Controller render={(props) => (<Select
                        options={form[field].children}
                        {...props.field}
                        // variant='standard'
                        // labelProps={{ className: 'peer-focus:after:border-primary-500 peer-focus:text-primary-400' }}
                        {...register((field), { required: { value: true, message: `The ${form[field].label} cannot be empty` } })}                            // labelProps={{ className: 'peer-focus:after:border-primary-500 peer-focus:text-primary-400' }}
                        label={form[field].label}
                        error={errors[field]?.root && undefined}
                    >
                        {/* {Children.toArray(form[field].options.map(({ label, value }: { label: string; value: string; }) => <Option value={value}>{label}</Option>))} */}
                    </Select>)} rules={{ required: { value: form[field].required, message: `The ${form[field].label} cannot be empty` } }} control={control} name={field} />}
                    {form[field].type === 'year' && <div className="flex justify-between gap-4 items-center">
                        <Select options={form[field].children.start} />
                        <span>-</span>
                        <Select options={form[field].children.end} />
                    </div>}
                    {errors[field] && <span className='flex items-center text-red-500 gap-x-2 text-xs'>
                        <BiError />
                        <span>{(errors[field]?.message as string) ?? ''}</span>
                    </span>}
                </div>))}
            </div>
            <Button type='submit' className="rounded-none bg-primary">Save</Button>
        </form>
    )
}
