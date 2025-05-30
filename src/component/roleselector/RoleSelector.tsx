'use client';
import React from 'react';
import './roleselector.css'; // nebo použij `module.css` dle struktury

type Props = {
    role: string;
    setRole: (role: string) => void;
};

export default function RoleSelector({ role, setRole }: Props) {
    return (
        <div className="role-selector">
            <label className={role === 'user' ? 'active' : ''}>
                <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={role === 'user'}
                    onChange={() => setRole('user')}
                />
                USER
            </label>

            <label className={role === 'supervisor' ? 'active' : ''}>
                <input
                    type="radio"
                    name="role"
                    value="supervisor"
                    checked={role === 'supervisor'}
                    onChange={() => setRole('supervisor')}
                />
                SUPERVISOR
            </label>

            <label className={role === 'admin' ? 'active' : ''}>
                <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={role === 'admin'}
                    onChange={() => setRole('admin')}
                />
                ADMIN
            </label>
        </div>
    );
}
