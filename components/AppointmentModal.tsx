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
    title,
    description,
}: {
    type: 'create' | 'cancelled' | 'schedule';
    patientId: string;
    userId: string;
    appointment?: Appointment;
    title: string;
    description: string;
}) => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    className={`capitalize ${type === 'schedule' && 'text-green-500'}`}
                >
                    {type}
                </Button>
            </DialogTrigger>
            <DialogContent className="shad-dialog sm:max-w-md">
                <DialogHeader className="mb-4 space-y-3">
                    <DialogTitle className="capitalize" title={title}>
                        {title}
                    </DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
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
