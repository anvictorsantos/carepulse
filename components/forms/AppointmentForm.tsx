'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { Form } from '@/components/ui/form';
import { Doctors } from '@/constants';
import { createAppointment } from '@/lib/actions/appointment.actions';
import { getAppointmentSchema } from '@/lib/validations';

import CustomFormField from '../CustomFormField';
import SubmitButton from '../SubmitButton';
import { SelectItem } from '../ui/select';

import { FormFieldType } from './PatientForm';

const AppointmentForm = ({
    userId,
    patientId,
    type,
}: {
    userId: string;
    patientId: string;
    type: 'create' | 'cancel' | 'schedule';
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const AppointmentFormValidation = getAppointmentSchema(type);

    const form = useForm<z.infer<typeof AppointmentFormValidation>>({
        defaultValues: {
            primaryPhysician: '',
            schedule: new Date(),
            reason: '',
            note: '',
            cancellationReason: '',
        },
        resolver: zodResolver(AppointmentFormValidation),
    });

    async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
        setIsLoading(true);

        let status;

        switch (type) {
            case 'schedule':
                status = 'schedule';
                break;
            case 'cancel':
                status = 'cancel';
                break;
            default:
                status = 'pending';
                break;
        }

        try {
            if (type === 'create' && patientId) {
                const appointmentData = {
                    userId,
                    patient: patientId,
                    primaryPhysician: values.primaryPhysician,
                    schedule: new Date(values.schedule),
                    reason: values.reason!,
                    note: values.note,
                    status: status as Status,
                };

                const appointment = await createAppointment(appointmentData);

                if (appointment) {
                    form.reset();
                    router.push(
                        `/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`,
                    );
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    let buttonLabel;

    switch (type) {
        case 'cancel':
            buttonLabel = 'Cancel Appointment';
            break;
        case 'create':
            buttonLabel = 'Create Appointment';
            break;
        case 'schedule':
            buttonLabel = 'Schedule Appointment';
            break;
        default:
            break;
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex-1 space-y-6"
            >
                <section className="mb-12 space-y-4">
                    <h1 className="header">New Appointment</h1>
                    <p className="text-dark-700">
                        Request a new appointment in 10 seconds
                    </p>
                </section>

                {type !== 'cancel' && (
                    <>
                        <CustomFormField
                            fieldType={FormFieldType.SELECT}
                            control={form.control}
                            name="primaryPhysician"
                            label="Doctor"
                            placeholder="Select a doctor"
                        >
                            {Doctors.map((doctor) => (
                                <SelectItem
                                    key={doctor.name}
                                    value={doctor.name}
                                >
                                    <div className="flex cursor-pointer items-center gap-2">
                                        <Image
                                            src={doctor.image}
                                            width={32}
                                            height={32}
                                            alt={doctor.name}
                                            className="bordar-dark-500 rounded-full border"
                                        />
                                        <p>{doctor.name}</p>
                                    </div>
                                </SelectItem>
                            ))}
                        </CustomFormField>

                        <CustomFormField
                            fieldType={FormFieldType.DATE_PICKER}
                            control={form.control}
                            name="schedule"
                            label="Expected appointment date"
                            showTimeSelect
                            dateFormat="MM/dd/yyyy - h:mm aa"
                        />

                        <div className="flex flex-col gap-6 xl:flex-row">
                            <CustomFormField
                                fieldType={FormFieldType.TEXTAREA}
                                control={form.control}
                                name="reason"
                                label="Reason for appointment"
                                placeholder="Enter reason for appointment"
                            />

                            <CustomFormField
                                fieldType={FormFieldType.TEXTAREA}
                                control={form.control}
                                name="note"
                                label="Note"
                                placeholder="Enter note"
                            />
                        </div>
                    </>
                )}

                {type === 'cancel' && (
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="cancellationReason"
                        label="Reason for cancellation"
                        placeholder="Enter reason for cancellation"
                    />
                )}

                <SubmitButton
                    isLoading={isLoading}
                    className={`${type === 'cancel' ? 'shad-dander-btn' : 'shad-primary-btn'} w-full`}
                >
                    {buttonLabel}
                </SubmitButton>
            </form>
        </Form>
    );
};

export default AppointmentForm;
