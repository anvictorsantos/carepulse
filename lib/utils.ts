import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

// FORMAT DATE TIME
export const formatDateTime = (
    dateString: Date | string,
    timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone,
) => {
    const dateTimeOptions: Intl.DateTimeFormatOptions = {
        day: 'numeric', // numeric day of the month (e.g., '25')
        hour: 'numeric', // numeric hour (e.g., '8')
        hour12: true, // use 12-hour clock (true) or 24-hour clock (false),
        minute: 'numeric', // numeric minute (e.g., '30')
        // weekday: "short", // abbreviated weekday name (e.g., 'Mon')
        month: 'short', // abbreviated month name (e.g., 'Oct')
        timeZone, // use the provided timezone
        year: 'numeric', // numeric year (e.g., '2023')
    };

    const dateDayOptions: Intl.DateTimeFormatOptions = {
        day: '2-digit', // numeric day of the month (e.g., '25')
        month: '2-digit', // abbreviated month name (e.g., 'Oct')
        timeZone, // use the provided timezone
        weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
        year: 'numeric', // numeric year (e.g., '2023')
    };

    const dateOptions: Intl.DateTimeFormatOptions = {
        day: 'numeric', // numeric day of the month (e.g., '25')
        month: 'short', // abbreviated month name (e.g., 'Oct')
        timeZone, // use the provided timezone
        year: 'numeric', // numeric year (e.g., '2023')
    };

    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: 'numeric', // numeric hour (e.g., '8')
        hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
        minute: 'numeric', // numeric minute (e.g., '30')
        timeZone, // use the provided timezone
    };

    const formattedDateTime: string = new Date(dateString).toLocaleString(
        'en-US',
        dateTimeOptions,
    );

    const formattedDateDay: string = new Date(dateString).toLocaleString(
        'en-US',
        dateDayOptions,
    );

    const formattedDate: string = new Date(dateString).toLocaleString(
        'en-US',
        dateOptions,
    );

    const formattedTime: string = new Date(dateString).toLocaleString(
        'en-US',
        timeOptions,
    );

    return {
        dateDay: formattedDateDay,
        dateOnly: formattedDate,
        dateTime: formattedDateTime,
        timeOnly: formattedTime,
    };
};

export function encryptKey(passkey: string) {
    return btoa(passkey);
}

export function decryptKey(passkey: string) {
    return atob(passkey);
}
