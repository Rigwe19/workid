import type { AxiosResponse } from 'axios';
import { Children, useState } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { BiError } from 'react-icons/bi';
import { post } from '~/libs/axios';
import { Button } from './button';
import Input from './input';
import Select from './select';
import Textarea from './textarea';

type Props = Readonly<{
    form: any;
    header: string;
    onFinish: CallableFunction;
    form_type: 'profile' | 'work';
    url: string;
    defaultValues?: any
}>
interface FormFields {
    [key: string]: {
        defaultValue?: string | number;
        type: string;
        required: boolean;
        label: string;
        placeholder?: string;
        inputMode?: string;
        children?: any[];
        options?: any[];
        width?: boolean;
    };
}
interface ValidationError {
  field: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function Form({ form, header, onFinish, form_type, url, defaultValues }: Props) {
    const { register, handleSubmit, control, getValues, formState: { errors } } = useForm<any>(
         {defaultValues}
    );
    const [serverErrors, setServerErrors] = useState<any>({});
    // console.log(watch())
    const onSubmit: SubmitHandler<any> = async (data) => {
        console.log(errors);
        try {
            const response: AxiosResponse = await post(url, data)
            const { success } = response.data
            if (success) {
                onFinish(response.data)
            }
        } catch (error:any) {
            if (error.status === 422) {
                const validationErrors: FormErrors = {};
                error.validationErrors?.forEach((err: ValidationError) => {
                  validationErrors[err.field] = err.message;
                });
                // return Promise.reject(validationErrors);
                setServerErrors(validationErrors)
                console.log(validationErrors)
                // setErrors(validationErrors);
              }
        }
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
            {/* <pre>{JSON.stringify(serverErrors?.phone, null, 2)}</pre> */}
            <div className="grid grid-cols-1 gap-2 my-2 px-2">
                {Children.toArray(Object.keys(form).map(field => <div className={`${form[field]?.width ? 'col-span-full' : ''}`}>
                    {form[field].type === 'input' && <Input
                        {...register(field, { required: { value: form[field].required, message: `The ${form[field].label} cannot be empty` }, pattern: { value: form[field].type === 'email' ? /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i : /^.*$/i, message: `The ${form[field].label} provided is Invalid` } })}
                        // labelProps={{ className: 'peer-focus:after:border-primary-500 peer-focus:text-primary-400' }}
                        label={form[field].label}
                        // variant="standard"
                        inputMode={form[field]?.inputMode}
                        error={serverErrors[field] ?? undefined}
                        placeholder={form[field].placeholder} />}
                    {form[field].type === 'textarea' && <Textarea
                        // variant='standard'
                        {...register(field, { required: { value: form[field].required, message: `The ${form[field].label} cannot be empty` } })}
                        // labelProps={{ className: 'peer-focus:after:border-primary-500 peer-focus:text-primary-400' }}
                        label={form[field].label}
                        error={serverErrors[field] ?? undefined}></Textarea>}
                    {form[field].type === 'select' && <Controller render={(props) => (<Select
                        options={form[field].children}
                        {...props.field}
                        error={serverErrors[field] ?? undefined}
                        // variant='standard'
                        // labelProps={{ className: 'peer-focus:after:border-primary-500 peer-focus:text-primary-400' }}
                        {...register((field), { required: { value: true, message: `The ${form[field].label} cannot be empty` } })}                            // labelProps={{ className: 'peer-focus:after:border-primary-500 peer-focus:text-primary-400' }}
                    >
                        {/* {Children.toArray(form[field].options.map(({ label, value }: { label: string; value: string; }) => <Option value={value}>{label}</Option>))} */}
                    </Select>)} rules={{ required: { value: form[field].required, message: `The ${form[field].label} cannot be empty` } }} control={control} name={field} />}
                    <div className="flex justify-between gap-4 items-center">
                        {field === 'year_start' && <Controller render={(props) => (<Select options={form[field].options} {...props.field}
                            {...register((field), { required: { value: true, message: `The ${form[field].label} cannot be empty` } })}
                            label="Start"
                            error={serverErrors[field] && undefined} />)}
                            rules={{ required: { value: form[field].required, message: `The ${form[field].label} cannot be empty` } }} control={control} name={field} />}
                        {/* {form[field].type === 'year' && } */}
                        {field === 'year_end' && <>
                            <span>-</span>
                            <Controller render={(props) => (<Select options={form[field].options} {...props.field}
                                {...register((field), { required: { value: true, message: `The ${form[field].label} cannot be empty` } })}
                                label="End"
                                error={serverErrors[field] && undefined} />)}
                                rules={{ required: { value: form[field].required, message: `The ${form[field].label} cannot be empty` } }} control={control} name={field} />
                        </>}
                    </div>
                    {errors[field] && <span className='flex items-center text-red-500 gap-x-2 text-xs'>
                        <BiError />
                        <span>{(errors[field]?.message as string) ?? ''}</span>
                    </span>}
                </div>))}
                {form.hasOwnProperty('year') && <div className="flex justify-between gap-4 items-center">
                    <Controller render={(props) => (<Select options={form.year.children.start} {...props.field}
                        {...register(('start'), { required: { value: true, message: `The ${form.year.label} cannot be empty` } })}
                        label="Start"
                        error={errors.year && undefined} />)}
                        rules={{
                            required: {
                                value: form.year.required,
                                message: `The start year cannot be empty`
                            }
                        }} control={control} name={'start'} />


                    <span>-</span>
                    <Controller render={(props) => (<Select options={form.year.children.end} disable_from={getValues('start')} {...props.field}
                        {...register(('end'), { required: { value: true, message: `The ${form.year.label} cannot be empty` } })}
                        label="End"
                        error={errors.year?.root && undefined} />)}
                        rules={{
                            required: {
                                value: form.year.required,
                                message: `The end year cannot be empty`
                            }
                        }}
                        control={control} name={'end'} />
                </div>}
            </div>
            <Button type='submit' className="rounded-none bg-primary">Save</Button>
        </form>
    )
}
