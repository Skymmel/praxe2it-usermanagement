"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import {UserCard} from "@/component/usercard/UserCard";
import SearchBar from "@/component/searchbar/SearchBar";
import {GetUser, GetUsers, User} from "../api";
import { useRouter } from "next/navigation";

export default function Home() {
    const [users, setUsers] = useState<User[]>([]);
    const [query, setQuery] = useState("");
    const [selectedRole, setSelectedRole] = useState<"admin" | "supervisor" | "user" | "All">("All");
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedUser, setLoggedUser] = useState<User | null>(null);

    useEffect(() => {
        const loggedIn = localStorage.getItem("isLoggedIn") === "true";
        const storedUsername = localStorage.getItem("username");

        if (loggedIn && storedUsername) {
            setIsLoggedIn(true);
            GetUser(storedUsername).then(userData => {
                if (userData) {
                    setLoggedUser(userData);
                }
            });
        } else {
            console.log("Uživatel není přihlášen.");
            router.push("/");
        }
    }, [router]);

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
                <h2>Users</h2>
                <p>User management</p>
            </header>

            <div className={styles.panel}>
                <span>Filters</span>
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
                        {loggedUser ? (
                            loggedUser.role !== "user" && (
                                <a href="/adduser/">Add user</a>
                            )
                        ) : null}
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
                        password={""}
                        loggedUserRole={loggedUser?.role ?? null}
                    />
                ))}
            </div>
        </main>
    );
}
