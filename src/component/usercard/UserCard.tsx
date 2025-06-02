import "./userCard.css";
import {User} from "@/lib/users";

function getAge(birthDate: string) {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

export default function UserCard({
                                     firstName,
                                     lastName,
                                     role,
                                     email,
                                     birthDate,
                                 }: User) {
    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    return (
        <div className={"userCard"}>
            <div className={"name"}>
                <b>
                    {firstName} {lastName}
                </b>{" "}
                <span>{role}</span>
            </div>
            <div className={"infos"}>
                <div className="avatar-placeholder">{initials}</div>
                <ul>
                    <li>{email}</li>
                    <li>
                        {birthDate} – {getAge(birthDate)} y.o.
                    </li>
                </ul>
            </div>
            <button className={"edit"}></button>
            <button className={"remove"}></button>
        </div>
    );
}
