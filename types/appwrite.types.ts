import { Models } from 'node-appwrite';

export interface Patient extends Models.Document {
    address: string;
    allergies?: string;
    birthDate: Date;
    currentMedication?: string;
    email: string;
    emergencyContactName: string;
    emergencyContactNumber: string;
    familyMedicalHistory?: string;
    gender: Gender;
    identificationDocument?: FormData;
    identificationNumber?: string;
    identificationType?: string;
    insurancePolicyNumber: string;
    insuranceProvider: string;
    name: string;
    occupation: string;
    pastMedicalHistory?: string;
    phone: string;
    primaryPhysician: string;
    privacyConsent: boolean;
    userId: string;
}

export interface Appointment extends Models.Document {
    cancellationReason: string | null;
    note: string;
    patient: Patient;
    primaryPhysician: string;
    reason: string;
    schedule: Date;
    status: Status;
    userId: string;
}
