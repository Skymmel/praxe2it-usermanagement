"use client";
import { useState } from "react";
import styles from "./page.module.css";
import UserCard from "@/component/userCard/UserCard";
import SearchBar from "@/component/searchbar/SearchBar";
import HeaderLogged from "@/component/header/HeaderLogged";
import { users } from "../users";

export default function Home() {
    const [query, setQuery] = useState("");

    const filteredUsers = users.filter((user) =>
        `${user.firstname} ${user.lastname} ${user.email} ${user.birthDate}`.toLowerCase().includes(query.toLowerCase())
    );
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
