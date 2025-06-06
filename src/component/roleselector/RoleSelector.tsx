'use client';
import React from 'react';
import './roleselector.css';

type Props = {
    role: string;
    setRole: (role: string) => void;
    disabledRoles?: string[];
};

export default function RoleSelector({ role, setRole, disabledRoles = [] }: Props) {
    const roles = ['user', 'supervisor', 'admin'];

    return (
        <div className="role-selector">
            {roles.map(r => (
                <label key={r} className={role === r ? 'active' : ''}>
                    <input
                        type="radio"
                        name="role"
                        value={r}
                        checked={role === r}
                        onChange={() => setRole(r)}
                        disabled={disabledRoles.includes(r)}
                    />
                    {r.toUpperCase()}
                </label>
            ))}
        </div>
    );
}
