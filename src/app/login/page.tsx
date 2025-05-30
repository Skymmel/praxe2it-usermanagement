"use client";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function LoginPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.ok) {
            router.push("/panel");
        } else {
            setError("Invalid email or password");
        }
    };

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    return (
        <main>
            <header className={styles.headings}>
                <h2>{session ? "Welcome" : "Sign in"}</h2>
                <p>{session ? "You are logged in." : "Log in and view the users"}</p>
            </header>

            {session ? (
                <div className={styles.loginContainer}>
                    <p>You are logged in as {session.user?.email}</p>
                    <button onClick={() => signOut()}>Logout</button>
                </div>
            ) : (
                <form className={styles.loginContainer} onSubmit={handleLogin}>
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
            )}
        </main>
    );
}
