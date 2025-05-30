import "./userCard.css";
interface UserProfileProps {
    firstname: string;
    lastname: string;
    role: string;
    email: string;
    birthDate: string; // YYYY-MM-DD
    avatarUrl: string;
}
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
                                     firstname,
                                     lastname,
                                     role,
                                     email,
                                     birthDate,
                                     avatarUrl,
                                 }: UserProfileProps) {
    const initials = `${firstname.charAt(0)}${lastname.charAt(0)}`.toUpperCase();
    return (
        <div className={"userCard"}>
            <div className={"name"}>
                <b>
                    {firstname} {lastname}
                </b>{" "}
                <span>{role}</span>
            </div>
            <div className={"infos"}>
                {avatarUrl ? (
                    <img height={40} width={40} src={avatarUrl} alt={initials} />
                ) : (
                    <div className="avatar-placeholder">{initials}</div>
                )}
                <ul>
                    <li>{email}</li>
                    <li>
                        {birthDate} – {getAge(birthDate)} y.o.
                    </li>
                </ul>
            </div>
        </div>
    );
}
