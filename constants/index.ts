export const GenderOptions = ['male', 'female', 'other'];

export const PatientFormDefaultValues = {
    address: '',
    allergies: '',
    birthDate: new Date(Date.now()),
    currentMedication: '',
    disclosureConsent: false,
    email: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    familyMedicalHistory: '',
    firstName: '',
    gender: 'male' as Gender,
    identificationDocument: [],
    identificationNumber: '',
    identificationType: 'Birth Certificate',
    insurancePolicyNumber: '',
    insuranceProvider: '',
    lastName: '',
    occupation: '',
    pastMedicalHistory: '',
    phone: '',
    primaryPhysician: '',
    privacyConsent: false,
    treatmentConsent: false,
};

export const IdentificationTypes = [
    'Birth Certificate',
    "Driver's License",
    'Medical Insurance Card/Policy',
    'Military ID Card',
    'National Identity Card',
    'Passport',
    'Resident Alien Card (Green Card)',
    'Social Security Card',
    'State ID Card',
    'Student ID Card',
    'Voter ID Card',
];

export const Doctors = [
    {
        image: '/assets/images/dr-green.png',
        name: 'John Green',
    },
    {
        image: '/assets/images/dr-cameron.png',
        name: 'Leila Cameron',
    },
    {
        image: '/assets/images/dr-livingston.png',
        name: 'David Livingston',
    },
    {
        image: '/assets/images/dr-peter.png',
        name: 'Evan Peter',
    },
    {
        image: '/assets/images/dr-powell.png',
        name: 'Jane Powell',
    },
    {
        image: '/assets/images/dr-remirez.png',
        name: 'Alex Ramirez',
    },
    {
        image: '/assets/images/dr-lee.png',
        name: 'Jasmine Lee',
    },
    {
        image: '/assets/images/dr-cruz.png',
        name: 'Alyana Cruz',
    },
    {
        image: '/assets/images/dr-sharma.png',
        name: 'Hardik Sharma',
    },
];

export const StatusIcon = {
    cancelled: '/assets/icons/cancelled.svg',
    pending: '/assets/icons/pending.svg',
    scheduled: '/assets/icons/check.svg',
};
