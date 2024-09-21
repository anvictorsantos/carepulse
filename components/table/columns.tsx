'use client';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

import AppointmentModal from '@/components/AppointmentModal';
import StatusBadge from '@/components/StatusBadge';
import { Doctors } from '@/constants';
import { formatDateTime } from '@/lib/utils';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Patient = {
    amount: number;
    email: string;
    patient: {
        name: string;
    };
    primaryPhysician: string;
    id: string;
    schedule: Date;
    status: 'pending' | 'scheduled' | 'cancelled';
};

export const columns: ColumnDef<Patient>[] = [
    {
        header: 'ID',
        cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
    },
    {
        accessorKey: 'patient',
        header: 'Patient',
        cell: ({ row }) => {
            return (
                <p className="text-14-medium">{row.original.patient.name}</p>
            );
        },
    },
    {
        id: 'actions',
        header: () => <div className="pl-4">Action</div>,
        cell: ({ row }) => {
            console.log(row);
            return (
                <div className="flex gap-1">
                    <AppointmentModal />
                </div>
            );
        },
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            <div className="min-w-[115px]">
                <StatusBadge status={row.original.status} />
            </div>;
        },
    },
    {
        accessorKey: 'schedule',
        header: 'Appointment',
        cell: ({ row }) => (
            <p className="text-14-regular min-w-[100px]">
                {formatDateTime(row.original.schedule).dateTime}
            </p>
        ),
    },
    {
        accessorKey: 'primaryPhysician',
        header: 'Doctor',
        cell: ({ row }) => {
            const doctor = Doctors.find(
                (doc) => doc.name === row.original.primaryPhysician,
            );

            return (
                <div className="flex items-center gap-3">
                    <Image
                        src={doctor?.image ?? '/assets/images/dr-cruz.png'}
                        alt={doctor?.name ?? 'Dr. Cruz'}
                        width={100}
                        height={100}
                        className="size-8"
                    />
                    <p className="whitespace-nowrap">
                        Dr. {doctor?.name ?? 'Cruz'}
                    </p>
                </div>
            );
        },
    },
];
