import "./header.css";
import "./logged.css";

export default function HeaderLogged(){
    return (
        <header className={"header"}>
            <div>
                <h1>User Management</h1>
                <button className={"logout"}>Logout</button>
            </div>
        </header>
    );
}