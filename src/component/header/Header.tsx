"use client";

import "./header.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GetUser, User, logout } from "@/app/api";

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedUsername, setLoggedUsername] = useState<string | null>(null);
    const [loggedUser, setLoggedUser] = useState<User | null>(null);

    const router = useRouter();

    useEffect(() => {
        const checkLogin = () => {
            const loggedIn = localStorage.getItem("isLoggedIn") === "true";
            const storedUsername = localStorage.getItem("username");

            if (loggedIn && storedUsername) {
                setIsLoggedIn(true);
                setLoggedUsername(storedUsername);

                GetUser(storedUsername).then(userData => {
                    if (userData) {
                        setLoggedUser(userData);
                        console.log(`Přihlášen jako: ${userData.username}, role: ${userData.role}`);
                    } else {
                        console.log("Uživatel nebyl nalezen.");
                    }
                });
            } else {
                setIsLoggedIn(false);
                setLoggedUsername(null);
                setLoggedUser(null);
            }
        };

        checkLogin();

        const handleStorage = () => {
            checkLogin();
        };
        window.addEventListener("storage", handleStorage);

        return () => {
            window.removeEventListener("storage", handleStorage);
        };
    }, []);


    const handleLogout = () => {
        if (loggedUsername) {
            logout(loggedUsername);
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("username");
            setIsLoggedIn(false);
            setLoggedUsername(null);
            setLoggedUser(null);
            router.refresh();
        }
    };


    return (
        <header className="header">
            <div>
                <h1>User Management</h1>
                {isLoggedIn ? (
                    <button className="logout" onClick={handleLogout}>
                        Logout
                    </button>
                ) : (
                    <button className="login" onClick={() => router.push("/login")}>
                        Login
                    </button>
                )}
            </div>
        </header>
    );
}
