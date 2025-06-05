import "./userCard.css";

interface UserCardProps {
    name: string;
    surname: string;
    username: string;
    eMail: string;
    age: number;
    role: string;
}

export default function UserCard({ name, surname, username, eMail, age, role }: UserCardProps) {
    const initials = `${name?.charAt(0) ?? "?"}${surname?.charAt(0) ?? "?"}`.toUpperCase();

    return (
        <div className="userCard">
            <div className="name">
                <b>{name} {surname}</b>
                <span>{role}</span>
            </div>

            <div className="infos">
                <div className="avatar-placeholder">{initials}</div>
                <ul>
                    <li>{username}</li>
                    <li>{eMail}</li>
                    <li>{age}</li>
                </ul>
            </div>
        </div>
    );
}
