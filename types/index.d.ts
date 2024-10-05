/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string[] | string | undefined };
};

declare type Gender = 'female' | 'male' | 'other';
declare type Status = 'cancelled' | 'pending' | 'scheduled';

declare interface CreateUserParams {
    email: string;
    name: string;
    phone: string;
}
declare interface User extends CreateUserParams {
    $id: string;
}

declare interface RegisterUserParams extends CreateUserParams {
    address: string;
    allergies?: string;
    birthDate: Date;
    currentMedication?: string;
    emergencyContactName: string;
    emergencyContactNumber: string;
    familyMedicalHistory?: string;
    gender: Gender;
    identificationDocument: FormData | undefined;
    identificationNumber?: string;
    identificationType?: string;
    insurancePolicyNumber: string;
    insuranceProvider: string;
    occupation: string;
    pastMedicalHistory?: string;
    primaryPhysician: string;
    privacyConsent: boolean;
    userId: string;
}

declare type CreateAppointmentParams = {
    userId: string;
    patient: string;
    primaryPhysician: string;
    reason: string;
    schedule: Date;
    status: Status;
    note?: string;
};

declare type UpdateAppointmentParams = {
    appointmentId: string;
    userId: string;
    timeZone: string;
    appointment: Appointment;
    type: string;
};
