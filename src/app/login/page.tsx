"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.css";
import { users } from "../users";

export default function Home() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const handleLogin = () => {
        const user = users.find((u) => u.email === email && u.password === password);
        if (user) {
            router.push("/panel");
        } else {
            setError("Invalid email or password");
        }
    };

    return (
        <main>
            <header className={styles.headings}>
                <h2>Sign in</h2>
                <p>Log in and view the users</p>
            </header>
            <form
                className={styles.loginContainer}
                onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                }}
            >
                <input
                    type="email"
                    className="email_input"
                    id="email"
                    placeholder="E-MAIL"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    id="password"
                    className="password_input"
                    placeholder="PASSWORD"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="remember">
                    <input type="checkbox" className="checkbox_login" id="remember" name="remember" /> Remember me
                </label>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <input type="submit" value="Login" />
            </form>
        </main>
    );
}
