"use client";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "../../../../../Desktop/t/te/page.module.css";
import { login } from "../api.tsx";

export default function LoginPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        //const result = await signIn("credentials", {
        //    email,
        //    password,
        //    redirect: false,
        //});

        console.log ("volám login");

        const result = await login (email, password);

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
                    <h3>{session.user?.email}</h3>
                    <button onClick={() => signOut()}>Logout</button>
                </div>
            ) : (
                <form className={styles.loginContainer} onSubmit={handleLogin}>
                    <input
                        type="text"
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
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <input type="submit" value="Login" />
                </form>
            )}
        </main>
    );
}