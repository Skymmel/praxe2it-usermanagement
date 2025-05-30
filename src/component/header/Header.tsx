"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import "./header.css";

export default function Header() {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") return null;

    return (
        <header className={"header"}>
            <div>
                <h1>User Management</h1>
                {session ? (
                    <button className="logout" onClick={() => signOut()}>
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
