'use client';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

import AppointmentModal from '@/components/AppointmentModal';
import StatusBadge from '@/components/StatusBadge';
import { Doctors } from '@/constants';
import { formatDateTime } from '@/lib/utils';
import { Appointment } from '@/types/appwrite.types';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Appointment>[] = [
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
        cell: ({ row: { original: data } }) => {
            return (
                <div className="flex gap-1">
                    <AppointmentModal
                        type="schedule"
                        patientId={data.id}
                        userId={data.id}
                        appointment={data}
                    />
                    {/* TODO: implement later */}
                    {/* title="Schedule Appointment"
                        description="Please confirm the following details to scheduled" */}
                    <AppointmentModal
                        type="cancel"
                        patientId={data.id}
                        userId={data.id}
                        appointment={data}
                    />
                    {/* TODO: implement later */}
                    {/* title="Cancel Appointment"
                        description="Are you sure you want to cancel this appointment?" */}
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
