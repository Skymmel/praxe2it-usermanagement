"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { login } from "./../api";

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const submitLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log ("volám login");
        const result = await login (username, password);
        if (result) {
            router.refresh()
            router.push("/panel");
        } else {
            setError("Invalid username or password");
            console.log(`Chyba: ${e}.`)
        }
    };
    return (
        <main>
            <header className={styles.headings}>
                <h2>Sign in</h2>
                <p>Log in and view the users</p>
            </header>
            <form className={styles.loginContainer} onSubmit={submitLogin}>
                <input
                    type="text"
                    className="email_input"
                    id="user"
                    placeholder="USERNAME"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    id="password"
                    className="password_input"
                    placeholder="PASSWORD"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <input type="submit" value="Login" />
            </form>
        </main>
    );
}