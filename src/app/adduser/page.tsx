'use client';
import { useState } from 'react';
import styles from './page.module.css';
import RoleSelector from "@/component/roleselector/RoleSelector";
import {useRouter} from "next/navigation";
import {getSession} from "next-auth/react";

export default function Home() {
    const router = useRouter();

    getSession().then(session => {
        if (session?.user?.role !== 'admin') {
            router.replace("/panel");
        }
    })

    const [role, setRole] = useState('user');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                role: role,
                email: email,
                birthDate: dob,
                password: password,
            }),
        })
        router.push('/panel');
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
                    type="date"
                    name="dob"
                    placeholder="Date of Birth"
                    value={dob}
                    onChange={event => setDob(event.target.value)}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={email}
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

                <RoleSelector role={role} setRole={setRole} />

                <input type="submit" value="Add user" />
            </form>
        </main>
    );
}
