import "./header.css";
import "./login.css";
import icon from "./userIcon.svg";
import Image from "next/image";
export default function HeaderLogin(){
    return (
        <header className={"header"}>
            <div>
                <Image src={icon} height={37} width={37} alt={""}/>
                <h1>Login</h1>
            </div>
        </header>
    );
}