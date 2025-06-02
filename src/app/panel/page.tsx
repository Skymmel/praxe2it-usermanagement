"use client";
import {useEffect, useState} from "react";
import styles from "./page.module.css";
import UserCard from "@/component/usercard/UserCard";
import SearchBar from "@/component/searchbar/SearchBar";
import {User} from "@/lib/users";
import RoleSelector from "@/component/roleselector/RoleSelector";

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
                <span>Filters</span>
                <div className={styles.filters}>
                    <div className={styles.filtersByRole}>
                        <button>Admin</button>
                        <button>Supervisor</button>
                        <button>User</button>
                        <button>All</button>
                    </div>
                    <div className={styles.searchAndAddUser}>
                        <a href={"/adduser/"}>Add User</a>
                        <SearchBar value={query} onChange={setQuery}/>
                    </div>
                </div>
            </div>
            <div className={styles.userList}>
                {filteredUsers.map((user, index) => (
                    <UserCard key={index} {...user} />
                ))}
            </div>
        </main>
    );
}
