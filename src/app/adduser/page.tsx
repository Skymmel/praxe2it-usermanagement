'use client';
import { useState } from 'react';
import styles from './page.module.css';
import RoleSelector from "@/component/roleselector/RoleSelector";
import {useRouter} from "next/navigation";
import {createUser} from "@/app/api";

class User {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    eMail: string;
    age: number;
    role: string;

    constructor(firstName: string, lastName: string, username: string, password: string, eMail: string, age: number, role: string) {
        this.firstname = firstName;
        this.lastname = lastName;
        this.username = username;
        this.password = password;
        this.eMail = eMail;
        this.age = age;
        this.role = role;
    }
}

export default function Home() {
    const router = useRouter();
    const [role, setRole] = useState('user');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [eMail, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("volám create user");
        const user = new User(firstName, lastName, username, password, eMail, Number(age), role);
        const result = await createUser(user);
        if (result) {
            console.log(`Přidán nový uživatel ${username}.`);
            router.push("/panel");
        } else {
            setError("Akce se nazdařila");
        }
    };

    return (
        <main>
            <header className={styles.headings}>
                <h2>Add user</h2>
                <p>Creating a user account</p>
            </header>

            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    name="username"
                    placeholder="USERNAME"
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                    required
                />
                <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={firstName}
                    onChange={event => setFirstName(event.target.value)}
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={lastName}
                    onChange={event => setLastName(event.target.value)}
                    required
                />
                <input
                    type="number"
                    name="dob"
                    placeholder="Age"
                    value={age}
                    onChange={event => setAge(event.target.value)}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={eMail}
                    onChange={event => setEmail(event.target.value)}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    required
                />
                <RoleSelector role={role} setRole={setRole}/>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <input type="submit" value="Add user"/>
            </form>
        </main>
    );
}
