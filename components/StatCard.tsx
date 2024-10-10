import React from 'react';

import clsx from 'clsx';
import Image from 'next/image';

interface StatCardProps {
    count: number;
    icon: string;
    label: string;
    type: 'appointments' | 'cancelled' | 'pending';
}

const StatCard = ({ count = 0, icon, label, type }: StatCardProps) => {
    return (
        <div className={clsx(`stat-card bg-${type}`)}>
            <div className="flex items-center gap-4">
                <Image
                    src={icon}
                    height={32}
                    width={32}
                    alt={label}
                    className="size-8 w-fit"
                    style={{ color: '' }}
                />
                <h2 className="text-32-bold text-white">{count}</h2>
            </div>
            <p className="text-14-regular">{label}</p>
        </div>
    );
};

export default StatCard;
