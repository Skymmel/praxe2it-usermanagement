"use client";
import { useState } from "react";
import styles from "./page.module.css";
import UserCard from "@/component/userCard/UserCard";
import SearchBar from "@/component/searchbar/SearchBar";
import HeaderLogged from "@/component/header/HeaderLogged";

const users = [
    {
        firstname: "Wilhelm",
        lastname: "Skyba",
        role: "Admin",
        email: "wilhelmskyba@tutanota.de",
        birthDate: "2005-12-15",
        avatarUrl: "https://i.pinimg.com/736x/75/2d/34/752d3412b28c9f87a8b08a717c3e35ef.jpg",
    },
    {
        firstname: "František",
        lastname: "Šesták",
        role: "User",
        email: "@.",
        birthDate: "2005-12-15",
        avatarUrl: "",
    },
    // Add more users here
];
export default function Home() {
    const [query, setQuery] = useState("");

    const filteredUsers = users.filter((user) =>
        `${user.firstname} ${user.lastname} ${user.email} ${user.birthDate}`.toLowerCase().includes(query.toLowerCase())
    );
    return (
        <>
            <HeaderLogged />
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
        </>
    );
}
