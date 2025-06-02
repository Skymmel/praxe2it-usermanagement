
export interface User {
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    birthDate: string; // YYYY-MM-DD
    password: string;
}

export const users: User[] = [
    {
        firstName: "Wilhelm",
        lastName: "Skyba",
        role: "admin",
        email: "wilhelmskyba@tutanota.de",
        birthDate: "2005-12-15",
        password: "admin123",
    },
    {
        firstName: "František",
        lastName: "Šesták",
        role: "user",
        email: "frantisek@example.com",
        birthDate: "2005-12-15",
        password: "userpass",
    },
    {
        firstName: "Karel",
        lastName: "Elíš",
        role: "admin",
        email: "swrpclothes@gmail.com",
        birthDate: "2008-03-01",
        password: "admin",
    },
];

export function findUserByEmail(email: string) {
    return users.find((user) => user.email === email);
}