'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import CustomFormField from '@/components/CustomFormField';
import { FormFieldType } from '@/components/forms/PatientForm';
import SubmitButton from '@/components/SubmitButton';
import { Form } from '@/components/ui/form';
import { SelectItem } from '@/components/ui/select';
import { Doctors } from '@/constants';
import {
    createAppointment,
    updateAppointment,
} from '@/lib/actions/appointment.actions';
import { getAppointmentSchema } from '@/lib/validations';
import { Appointment } from '@/types/appwrite.types';

const AppointmentForm = ({
    userId,
    patientId,
    type,
    appointment,
    setOpen,
}: {
    userId: string;
    patientId: string;
    type: 'create' | 'cancelled' | 'schedule';
    appointment?: Appointment;
    setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const AppointmentFormValidation = getAppointmentSchema(type);

    const form = useForm<z.infer<typeof AppointmentFormValidation>>({
        defaultValues: {
            primaryPhysician: appointment ? appointment.primaryPhysician : '',
            schedule: appointment ? new Date(appointment.schedule) : new Date(),
            reason: appointment ? appointment.reason : '',
            note: appointment ? appointment.note : '',
            cancellationReason: appointment?.cancellationReason ?? '',
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
            case 'cancelled':
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
            } else {
                const appointmentToUpdate = {
                    userId,
                    appointmentId: appointment!.$id,
                    appointment: {
                        primaryPhysician: values.primaryPhysician,
                        schedule: new Date(values.schedule),
                        status: status as Status,
                        cancellationReason: values.cancellationReason,
                    },
                    type,
                };

                const updatedAppointment =
                    await updateAppointment(appointmentToUpdate);

                if (updatedAppointment) {
                    if (setOpen) setOpen(false);
                    form.reset();
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    let buttonLabel;

    switch (type) {
        case 'cancelled':
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
                {type === 'create' && (
                    <section className="mb-12 space-y-4">
                        <h1 className="header">New Appointment</h1>
                        <p className="text-dark-700">
                            Request a new appointment in 10 seconds
                        </p>
                    </section>
                )}

                {type !== 'cancelled' && (
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

                {type === 'cancelled' && (
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="cancellationReason"
                        label="Reason for cancellation"
                        placeholder="Urgent meeting came up"
                    />
                )}

                <SubmitButton
                    isLoading={isLoading}
                    className={`${type === 'cancelled' ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`}
                >
                    {buttonLabel}
                </SubmitButton>
            </form>
        </Form>
    );
};

export default AppointmentForm;
