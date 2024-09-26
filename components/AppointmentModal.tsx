import React, { useState } from 'react';

import AppointmentForm from '@/components/forms/AppointmentForm';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Appointment } from '@/types/appwrite.types';

const AppointmentModal = ({
    type,
    patientId,
    userId,
    appointment,
}: {
    type: 'create' | 'cancel' | 'schedule';
    patientId: string;
    userId: string;
    appointment?: Appointment;
}) => {
    const [open, setOpen] = useState(false);

    console.log(patientId);
    console.log(userId);
    console.log(appointment);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    className={`&& capitalize ${type === 'schedule' && 'text-green-500'}`}
                >
                    {type}
                </Button>
            </DialogTrigger>
            <DialogContent className="shad-dialog sm:max-w-md">
                <DialogHeader className="mb-4 space-y-3">
                    <DialogTitle className="capitalize">
                        {type} Appointment
                    </DialogTitle>
                    <DialogDescription>
                        Please fill in the following details to {type} an
                        appointment
                    </DialogDescription>
                </DialogHeader>

                <AppointmentForm
                    userId={userId}
                    patientId={patientId}
                    type={type}
                    appointment={appointment}
                    setOpen={setOpen}
                ></AppointmentForm>
            </DialogContent>
        </Dialog>
    );
};

export default AppointmentModal;
