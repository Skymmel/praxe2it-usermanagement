// components/UserCard.tsx
import "./userCard.css";

interface UserCardProps {
    firstname: string;
    lastname: string;
    username: string;
    email: string; // Změněno z eMail na email
    age: number;
    role: string;
    onDelete?: () => void;
    sessionUserRole?: string;
}

export default function UserCard({
                                     firstname,
                                     lastname,
                                     username,
                                     email, // Změněno z eMail
                                     age,
                                     role,
                                     onDelete,
                                     sessionUserRole
                                 }: UserCardProps) {
    const initials = `${firstname.charAt(0)}${lastname.charAt(0)}`.toUpperCase();

    return (
        <div className="userCard">
            <div className="name">
                <b>{firstname} {lastname}</b>
                <span>{role}</span>
            </div>
            <div className="infos">
                <div className="avatar-placeholder">{initials}</div>
                <ul>
                    <li>{email}</li>
                    <li>{username}</li>
                    <li>{age} let</li>
                </ul>
            </div>

            {sessionUserRole === "admin" && (
                <div className="actions">
                    <button className="edit" title="Upravit uživatele">
                        {/* SVG ikona */}
                    </button>
                    <button className="remove" onClick={onDelete} title="Smazat uživatele">
                        {/* SVG ikona */}
                    </button>
                </div>
            )}
        </div>
    );
}