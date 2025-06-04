"use client";
import "./header.css";
import {useRouter} from "next/navigation";

export default function Header() {
    const router = useRouter();
    return (
        <header className={"header"}>
            <div>
                <h1>User Management</h1>
                    {/*<button className="logout" onClick={() => }>*/}
                    {/*    Logout*/}
                    {/*</button>*/}
                    <button className="login" onClick={() => router.push("/login")}>
                        Login
                    </button>
            </div>
        </header>
    );
}
