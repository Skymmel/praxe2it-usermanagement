'use client';

import { useState } from 'react';
import './page.module.css';

export default function AdminCreatorPage() {
    const [role, setRole] = useState('user');
    const [profileImage, setProfileImage] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Form submitted with role: ${role} and profile image: ${profileImage?.name ?? 'none'}`);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProfileImage(e.target.files[0]);
        }
    };

    return (
        <div>
            <div>
                <h1>Admin Creator</h1>
            </div>

            <h2>Add user</h2>
            <p>Creating a user account</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Profile Image:</label>
                    <input type="file" name="profileImage" accept="image/*" onChange={handleFileChange} />
                </div>

                <div>
                    <input type="text" name="firstName" placeholder="User First Name" required />
                </div>
                <div>
                    <input type="text" name="lastName" placeholder="User Last Name" required />
                </div>
                <div>
                    <input type="date" name="dob" placeholder="Date of Birth" required />
                </div>
                <div>
                    <input type="email" name="email" placeholder="E-mail" required />
                </div>
                <div>
                    <input type="password" name="password" placeholder="Password" required />
                </div>

                <div>
                    <label>
                        <input
                            type="radio"
                            name="role"
                            value="user"
                            checked={role === 'user'}
                            onChange={() => setRole('user')}
                        />
                        User
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="role"
                            value="supervisor"
                            checked={role === 'supervisor'}
                            onChange={() => setRole('supervisor')}
                        />
                        Supervisor
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="role"
                            value="admin"
                            checked={role === 'admin'}
                            onChange={() => setRole('admin')}
                        />
                        Admin
                    </label>
                </div>

                <button type="submit">Create</button>
            </form>
        </div>
    );
}
