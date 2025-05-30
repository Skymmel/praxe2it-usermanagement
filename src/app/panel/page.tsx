"use client";
import {useEffect, useState} from "react";
import styles from "./page.module.css";
import UserCard from "@/component/usercard/UserCard";
import SearchBar from "@/component/searchbar/SearchBar";
import {User} from "@/lib/users";

export default function Home() {
    const [users, setUsers] = useState<User[]>([]);
    const [query, setQuery] = useState("");

    const filteredUsers = users.filter((user) =>
        `${user.firstName} ${user.lastName} ${user.email} ${user.birthDate}`.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        fetch("/api/users")
            .then(response => response.json())
            .then(data => setUsers(data));
    }, []);

    return (
        <main>
            <header className={styles.header}>
                <h2>Users</h2>
                <p>Management</p>
            </header>
            <div className={styles.panel}>
                <SearchBar value={query} onChange={setQuery}/>
            </div>
            <div className={styles.userList}>
                {filteredUsers.map((user, index) => (
                    <UserCard key={index} {...user} />
                ))}
            </div>
        </main>
    );
}
