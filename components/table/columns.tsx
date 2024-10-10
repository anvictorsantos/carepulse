'use client';
import AppointmentModal from '@/components/AppointmentModal';
import StatusBadge from '@/components/StatusBadge';
import { Doctors } from '@/constants';

import { formatDateTime } from '@/lib/utils';

import { Appointment } from '@/types/appwrite.types';

import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

export const columns: ColumnDef<Appointment>[] = [
    {
        cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
        header: '#',
    },
    {
        accessorKey: 'patient',
        cell: ({ row }) => {
            return (
                <p className="text-14-medium">{row.original.patient.name}</p>
            );
        },
        header: 'Patient',
    },
    {
        accessorKey: 'status',
        cell: ({ row }) => {
            return (
                <div className="min-w-[115px]">
                    <StatusBadge status={row.original.status} />
                </div>
            );
        },
        header: 'Status',
    },
    {
        accessorKey: 'schedule',
        cell: ({ row }) => (
            <p className="text-14-regular min-w-[100px]">
                {formatDateTime(row.original.schedule).dateTime}
            </p>
        ),
        header: 'Appointment',
    },
    {
        accessorKey: 'primaryPhysician',
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
                        style={{ color: undefined }}
                    />
                    <p className="whitespace-nowrap">
                        Dr. {doctor?.name ?? 'Cruz'}
                    </p>
                </div>
            );
        },
        header: 'Doctor',
    },
    {
        cell: ({ row: { original: data } }) => {
            return (
                <div className="flex gap-1">
                    <AppointmentModal
                        type="schedule"
                        patientId={data.id}
                        userId={data.id}
                        appointment={data}
                        title="Schedule Appointment"
                        description="Please confirm the following details to scheduled"
                    />
                    <AppointmentModal
                        type="cancel"
                        patientId={data.id}
                        userId={data.id}
                        appointment={data}
                        title="Cancel Appointment"
                        description="Are you sure you want to cancel this appointment?"
                    />
                </div>
            );
        },
        header: () => <div className="pl-4">Action</div>,
        id: 'actions',
    },
];
