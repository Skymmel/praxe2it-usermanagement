"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import UserCard from "@/component/usercard/UserCard";
import SearchBar from "@/component/searchbar/SearchBar";
import { GetUsers, User } from "../api";

export default function Home() {
    const [users, setUsers] = useState<User[]>([]);
    const [query, setQuery] = useState("");
    const [selectedRole, setSelectedRole] = useState<"admin" | "supervisor" | "user" | "All">("All");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await GetUsers();
                setUsers(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user => {
        const matchesQuery = `${user.name} ${user.surname} ${user.eMail} ${user.age}`
            .toLowerCase()
            .includes(query.toLowerCase());

        const matchesRole = selectedRole === "All" || user.role === selectedRole;

        return matchesQuery && matchesRole;
    });

    if (loading) return <div className={styles.loading}>Načítám uživatele...</div>;

    return (
        <main>
            <header className={styles.header}>
                <h2>Uživatelé</h2>
                <p>Správa uživatelů</p>
            </header>

            <div className={styles.panel}>
                <span>Filtry</span>
                <div className={styles.filters}>
                    <div className={styles.filtersByRole}>
                        {["All", "admin", "supervisor", "user"].map(role => (
                            <button
                                key={role}
                                onClick={() => setSelectedRole(role as "admin" | "supervisor" | "user" | "All")}
                                disabled={selectedRole === role}
                            >
                                {role.charAt(0).toUpperCase() + role.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div className={styles.searchAndAddUser}>
                        <a href="/adduser/">Přidat uživatele</a>
                        <SearchBar value={query} onChange={setQuery} />
                    </div>
                </div>
            </div>

            <div className={styles.userList}>
                {filteredUsers.map(user => (
                    <UserCard
                        key={user.username}
                        name={user.name}
                        surname={user.surname}
                        username={user.username}
                        eMail={user.eMail ?? "N/A"}
                        age={user.age}
                        role={user.role}
                    />
                ))}
            </div>
        </main>
    );
}
