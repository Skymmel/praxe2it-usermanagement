// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import UserCard from "@/component/usercard/UserCard";
import SearchBar from "@/component/searchbar/SearchBar";
import { User } from "../api"; // Importujte User rozhraní

export default function Home() {
    const [users, setUsers] = useState<User[]>([]);
    const [query, setQuery] = useState("");
    const [selectedRole, setSelectedRole] = useState<"admin" | "supervisor" | "user" | "All">("All");
    const [confirmDeleteUser, setConfirmDeleteUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("/api/users");
                if (!response.ok) throw new Error("Chyba při načítání uživatelů");
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDeleteUser = async (email: string) => {
        try {
            await fetch(`/api/users?email=${encodeURIComponent(email)}`, {
                method: "DELETE"
            });
            setUsers(prev => prev.filter(user => user.eMail !== email));
        } catch (error) {
            console.error("Chyba při mazání uživatele:", error);
        }
        setConfirmDeleteUser(null);
    };

    const filteredUsers = users.filter(user => {
        const matchesQuery = `${user.firstname} ${user.lastname} ${user.eMail} ${user.age}`
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
                                onClick={() => setSelectedRole}
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
                        firstname={user.firstname}
                        lastname={user.lastname}
                        username={user.username}
                        eMail={user.eMail} // Předáváme eMail jako email
                        age={user.age}
                        role={user.role}
                        onDelete={() => setConfirmDeleteUser(user)}
                        sessionUserRole="admin" // Mělo by být dynamické
                    />
                ))}
            </div>

            {confirmDeleteUser && (
                <div className={styles.confirmOverlay}>
                    <div className={styles.confirmBox}>
                        <p>
                            Opravdu chcete odstranit uživatele{" "}
                            <strong>
                                {confirmDeleteUser.firstname} {confirmDeleteUser.lastname}
                            </strong>
                            ?
                        </p>
                        <div className={styles.confirmButtons}>
                            <button onClick={() => handleDeleteUser(confirmDeleteUser.eMail)}>
                                Ano
                            </button>
                            <button onClick={() => setConfirmDeleteUser(null)}>
                                Ne
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}