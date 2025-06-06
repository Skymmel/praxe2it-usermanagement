"use client";

import { useEffect, useState } from "react";
import { GetUser, User } from "./api";

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedUsername, setLoggedLoggedUsername] = useState<string | null>(null);
    const [loggedUser, setLoggedUser] = useState<User | null>(null);

    useEffect(() => {
        const loggedIn = localStorage.getItem("isLoggedIn") === "true";
        const storedUsername = localStorage.getItem("username");

        if (loggedIn && storedUsername) {
            setIsLoggedIn(true);
            setLoggedLoggedUsername(storedUsername);

            // Získání uživatele z API
            GetUser(storedUsername).then(userData => {
                if (userData) {
                    setLoggedUser(userData);
                }
            });
            console.log(`Logged in: ${loggedUser?.role}`);
        } else {
            console.log("Uživatel není přihlášen.");
        }
    }, []);

    return (
        <main>
            {isLoggedIn ? (
                <>
                    <h1>Hello <b>{`${loggedUser?.name} ${loggedUser?.surname}`}</b></h1>
                    <h2>Logged in as <b>{loggedUsername}</b> with role {loggedUser?.role}</h2>
                </>
            ) : (
                <>
                    <h1>You are not logged in.</h1>
                    <a href="/login/"></a>
                </>
                )}
        </main>
    );
}
