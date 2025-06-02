"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import UserCard from "@/component/usercard/UserCard";
import SearchBar from "@/component/searchbar/SearchBar";
import { User } from "@/lib/users";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
    const { data: session, status } = useSession();

    if (status === "loading") return <p>Loading...</p>;
    if (status === "unauthenticated") {
        redirect("/login");
        return null;
    }

    const [users, setUsers] = useState<User[]>([]);
    const [query, setQuery] = useState("");
    const [selectedRole, setSelectedRole] = useState<"admin" | "supervisor" | "user" | "All">("All");
    const [confirmDeleteUser, setConfirmDeleteUser] = useState<User | null>(null);

    useEffect(() => {
        fetch("/api/users")
            .then((response) => response.json())
            .then((data) => setUsers(data));
    }, []);

    const handleDeleteUser = async (email: string) => {
        setUsers((prev) => prev.filter((user) => user.email !== email));
        setConfirmDeleteUser(null);
    };

    const filteredUsers = users.filter((user) => {
        const matchesQuery =
            `${user.firstName} ${user.lastName} ${user.email} ${user.birthDate}`
                .toLowerCase()
                .includes(query.toLowerCase());

        const matchesRole = selectedRole === "All" || user.role === selectedRole;

        return matchesQuery && matchesRole;
    });

    return (
        <main>
            <header className={styles.header}>
                <h2>Users</h2>
                <p>Management</p>
            </header>

            <div className={styles.panel}>
                <span>Filters</span>
                <div className={styles.filters}>
                    <div className={styles.filtersByRole}>
                        {["All", "admin", "supervisor", "user"].map((role) => (
                            <button
                                key={role}
                                onClick={() => setSelectedRole(role as typeof selectedRole)}
                                disabled={selectedRole === role}
                            >
                                {role.charAt(0).toUpperCase() + role.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div className={styles.searchAndAddUser}>
                        {(session?.user?.role === "admin" || session?.user?.role === "supervisor") && (
                            <a href={"/adduser/"}>Add User</a>
                        )}
                        <SearchBar value={query} onChange={setQuery} />
                    </div>
                </div>
            </div>

            <div className={styles.userList}>
                {filteredUsers.map((user, index) => (
                    <UserCard
                        key={index}
                        {...user}
                        onDelete={() => setConfirmDeleteUser(user)}
                        sessionUserRole={session?.user?.role ?? "user"} // 👈 TADY JE TO PŘIDANÉ
                    />
                ))}
            </div>

            {confirmDeleteUser && (
                <div className={styles.confirmOverlay}>
                    <div className={styles.confirmBox}>
                        <p>
                            Opravdu chcete odstranit uživatele{" "}
                            <strong>
                                {confirmDeleteUser.firstName} {confirmDeleteUser.lastName}
                            </strong>
                            ?
                        </p>
                        <div className={styles.confirmButtons}>
                            <button onClick={() => handleDeleteUser(confirmDeleteUser.email)}>Ano</button>
                            <button onClick={() => setConfirmDeleteUser(null)}>Ne</button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
