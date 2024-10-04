import { z } from 'zod';

export const UserFormValidation = z.object({
    email: z.string().email('Invalid email address'),
    name: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be at most 50 characters'),
    phone: z
        .string()
        .refine((phone) => /^\+\d{10,15}$/.test(phone), 'Invalid phone number'),
});

export const PatientFormValidation = z.object({
    address: z
        .string()
        .min(5, 'Address must be at least 5 characters')
        .max(500, 'Address must be at most 500 characters'),
    allergies: z.string().optional(),
    birthDate: z.coerce.date(),
    currentMedication: z.string().optional(),
    disclosureConsent: z
        .boolean()
        .default(false)
        .refine((value) => value === true, {
            message: 'You must consent to disclosure in order to proceed',
        }),
    email: z.string().email('Invalid email address'),
    emergencyContactName: z
        .string()
        .min(2, 'Contact name must be at least 2 characters')
        .max(50, 'Contact name must be at most 50 characters'),
    emergencyContactNumber: z
        .string()
        .refine(
            (emergencyContactNumber) =>
                /^\+\d{10,15}$/.test(emergencyContactNumber),
            'Invalid phone number',
        ),
    familyMedicalHistory: z.string().optional(),
    gender: z.enum(['male', 'female', 'other']),
    identificationDocument: z.custom<File[]>().optional(),
    identificationNumber: z.string().optional(),
    identificationType: z.string().optional(),
    insurancePolicyNumber: z
        .string()
        .min(2, 'Policy number must be at least 2 characters')
        .max(50, 'Policy number must be at most 50 characters'),
    insuranceProvider: z
        .string()
        .min(2, 'Insurance name must be at least 2 characters')
        .max(50, 'Insurance name must be at most 50 characters'),
    name: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be at most 50 characters'),
    occupation: z
        .string()
        .min(2, 'Occupation must be at least 2 characters')
        .max(500, 'Occupation must be at most 500 characters'),
    pastMedicalHistory: z.string().optional(),
    phone: z
        .string()
        .refine((phone) => /^\+\d{10,15}$/.test(phone), 'Invalid phone number'),
    primaryPhysician: z.string().min(2, 'Select at least one doctor'),
    privacyConsent: z
        .boolean()
        .default(false)
        .refine((value) => value === true, {
            message: 'You must consent to privacy in order to proceed',
        }),
    treatmentConsent: z
        .boolean()
        .default(false)
        .refine((value) => value === true, {
            message: 'You must consent to treatment in order to proceed',
        }),
});

export const CreateAppointmentSchema = z.object({
    cancellationReason: z.string().optional(),
    note: z.string().optional(),
    primaryPhysician: z.string().min(2, 'Select at least one doctor'),
    reason: z
        .string()
        .min(2, 'Reason must be at least 2 characters')
        .max(500, 'Reason must be at most 500 characters'),
    schedule: z.coerce.date(),
});

export const ScheduleAppointmentSchema = z.object({
    cancellationReason: z.string().optional(),
    note: z.string().optional(),
    primaryPhysician: z.string().min(2, 'Select at least one doctor'),
    reason: z.string().optional(),
    schedule: z.coerce.date(),
});

export const CancelAppointmentSchema = z.object({
    cancellationReason: z
        .string()
        .min(2, 'Reason must be at least 2 characters')
        .max(500, 'Reason must be at most 500 characters'),
    note: z.string().optional(),
    primaryPhysician: z.string().min(2, 'Select at least one doctor'),
    reason: z.string().optional(),
    schedule: z.coerce.date(),
});

export function getAppointmentSchema(type: string) {
    switch (type) {
        case 'create':
            return CreateAppointmentSchema;
        case 'cancel':
            return CancelAppointmentSchema;
        default:
            return ScheduleAppointmentSchema;
    }
}
