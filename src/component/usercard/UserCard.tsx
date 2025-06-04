import "./userCard.css";

interface UserCardProps {
    firstname: string;
    lastname: string;
    username: string;
    eMail: string;
    age: number;
    role: string;
    onDelete?: () => void;
    sessionUserRole?: string;
}

export default function UserCard({
                                     firstname,
                                     lastname,
                                     role,
                                     username,
                                     eMail,
                                     age,
                                     onDelete,
                                     sessionUserRole,
                                 }: UserCardProps) {
    // Ochrana proti nedefinovaným hodnotám
    if (!firstname || !lastname || !username || !eMail || typeof age !== "number" || !role) {
        return null;
    }

    const initials = `${firstname?.charAt(0) ?? "?"}${lastname?.charAt(0) ?? "?"}`.toUpperCase();

    return (
        <div className="userCard">
            <div className="name">
                <b>{firstname} {lastname}</b>
                <span>{role}</span>
            </div>

            <div className="infos">
                <div className="avatar-placeholder">{initials}</div>
                <ul>
                    <li>{eMail}</li>
                    <li>{username}</li>
                    <li>{age}</li>
                </ul>
            </div>

            {sessionUserRole === "admin" && (
                <div className="actions">
                    <button className="edit" title="Upravit uživatele">
                        ✏️
                    </button>
                    <button className="remove" onClick={onDelete} title="Smazat uživatele">
                        🗑️
                    </button>
                </div>
            )}
        </div>
    );
}
