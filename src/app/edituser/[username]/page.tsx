"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { GetUser, updateUser, User } from "@/app/api";

export default function EditUserPage() {
    const { username } = useParams<{ username: string }>();
    const router = useRouter();

    const [user, setUser] = useState<User>({
        name: "",
        surname: "",
        username: "",
        password: "",
        eMail: "",
        age: 0,
        role: "user",
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            if (!username) return;
            const fetchedUser = await GetUser(username);
            if (fetchedUser) {
                setUser(fetchedUser);
            } else {
                alert("Uživatel nenalezen.");
                router.push("/");
            }
            setLoading(false);
        }
        fetchUser();
    }, [username]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: name === "age" ? parseInt(value) : value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await updateUser(username, user);
        alert("Uživatel upraven!");
        router.push("/panel");
    }

    if (loading) return <p>Načítání...</p>;

    return (
        <main style={{ padding: "2rem", maxWidth: 600, margin: "0 auto" }}>
            <h2>Editace uživatele: {username}</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <input name="name" value={user.name} onChange={handleChange} placeholder="Jméno" />
                <input name="surname" value={user.surname} onChange={handleChange} placeholder="Příjmení" />
                <input name="eMail" value={user.eMail ?? ""} onChange={handleChange} placeholder="Email" />
                <input name="age" type="number" value={user.age} onChange={handleChange} placeholder="Věk" />
                <select name="role" value={user.role} onChange={handleChange}>
                    <option value="admin">Admin</option>
                    <option value="supervisor">Supervisor</option>
                    <option value="user">User</option>
                </select>
                <input name="password" value={user.password} onChange={handleChange} placeholder="Heslo" type="password" />
                <button type="submit">Uložit</button>
            </form>
        </main>
    );
}
