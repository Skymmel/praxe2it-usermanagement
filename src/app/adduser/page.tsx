'use client';
import { useState } from 'react';
import styles from './page.module.css';
import RoleSelector from "@/component/roleselector/RoleSelector";

export default function Home() {
    const [role, setRole] = useState('user');
    const [profileImage, setProfileImage] = useState<File | null>(null); // opraveno: setProfileImage bylo odstraněno

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Form submitted with role: ${role} and profile image: ${profileImage?.name ?? 'none'}`);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProfileImage(e.target.files[0]); // chybělo
        } else {
            setProfileImage(null); // uživatel zrušil výběr
        }
    };

    return (
        <main>
            <header className={styles.headings}>
                <h2>Add user</h2>
                <p>Creating a user account</p>
            </header>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label>
                    Profile Image:
                    <input
                        type="file"
                        name="profileImage"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </label>

                <input type="text" name="firstName" placeholder="FIRSTNAME" required />
                <input type="text" name="lastName" placeholder="LASTNAME" required />
                <input type="date" name="dob" placeholder="Date of Birth" required />
                <input type="email" name="email" placeholder="E-MAIL" required />
                <input type="password" name="password" placeholder="PASSWORD" required />

                <RoleSelector role={role} setRole={setRole} />

                <input type="submit" value="Add user" />
            </form>
        </main>
    );
}
