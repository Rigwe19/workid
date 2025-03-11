const profileForm = {
    name: {
        type: "input",
        label: "Full Name",
        placeholder: "John Doe",
        required: true,
        inputMode: "text",
    },
    email: {
        type: "input",
        label: "Email",
        placeholder: "johndoe@gmail.com",
        required: true,
        inputMode: "email",
    },
    phone: {
        type: "input",
        label: "Phone Number",
        placeholder: "08012345678",
        required: true,
        inputMode: "tel",
    },
    linkedin: {
        type: "input",
        label: "LinkedIn Profile (optional)",
        placeholder: "https://linkedin.com...",
        required: false,
        inputMode: "url",
    },
    location: {
        type: "input",
        label: "Location",
        inputMode: "text",
        placeholder: "Lagos/Nigeria",
        required: true,
    },
};

const workForm = {
    position: {
        type: "input",
        label: "Position",
        placeholder: "Lead Web Developer",
        required: true,
        inputMode: "text",
    },
    year: {
        type: "year",
        label: "Year",
        children: {
            start: [...Array(50).keys()].map((i) => new Date().getFullYear() - i),
            end: ['Present', ...[...Array(50).keys()].map((i) => new Date().getFullYear() - i)],
        }
    },
    location: {
        type: "input",
        label: "Location",
        inputMode: "text",
        placeholder: "Lagos/Nigeria",
        required: true,
    },
};

export {
    profileForm,
    workForm
};