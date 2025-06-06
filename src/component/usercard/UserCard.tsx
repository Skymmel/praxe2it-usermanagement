import "./userCard.css";
import { deleteUser, User } from "@/app/api";
import {usePathname, useRouter} from "next/navigation";


type Props = User & {
    loggedUserRole: string | null;
};

export function UserCard({ name, surname, username, eMail, age, role, loggedUserRole }: Props) {
    const initials = `${name?.charAt(0) ?? "?"}${surname?.charAt(0) ?? "?"}`.toUpperCase();
    const router = useRouter();
    const pathname = usePathname();

    const handleRemove = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Mazání uživatele:", username);
        const result = await deleteUser(username);
        if (result) {
            console.log(`Smazán uživatel ${username}.`);
            router.push(pathname);

        } else {
            console.log("Akce se nazdařila - mazání uživatele se nezdařilo");
        }
    };

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        const page = "/edituser/" + username;
        router.push(page);
    }

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
            {loggedUserRole === "admin" && (
            <div className="actions">
                <button className="edit" title="Upravit uživatele" onClick={handleEdit}>
                    <svg
                        width="26"
                        height="26"
                        viewBox="0 0 26 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5.41667 20.5833H6.96042L17.55 9.99375L16.0063 8.45L5.41667 19.0396V20.5833ZM3.25 22.75V18.1458L17.55 3.87292C17.7667 3.67431 18.0059 3.52083 18.2677 3.4125C18.5295 3.30417 18.8049 3.25 19.0938 3.25C19.3826 3.25 19.6625 3.30417 19.9333 3.4125C20.2042 3.52083 20.4389 3.68333 20.6375 3.9L22.1271 5.41667C22.3438 5.61528 22.5017 5.85 22.601 6.12083C22.7003 6.39167 22.75 6.6625 22.75 6.93333C22.75 7.22222 22.7003 7.49757 22.601 7.75938C22.5017 8.02118 22.3438 8.26042 22.1271 8.47708L7.85417 22.75H3.25ZM16.7646 9.23542L16.0063 8.45L17.55 9.99375L16.7646 9.23542Z"
                            fill="white"
                        />
                    </svg>
                </button>
                <button className="remove" onClick={handleRemove} title="Smazat uživatele">
                    <svg
                        width="26"
                        height="26"
                        viewBox="0 0 26 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7.58301 22.75C6.98717 22.75 6.4771 22.5378 6.0528 22.1135C5.62849 21.6892 5.41634 21.1792 5.41634 20.5833V6.5H4.33301V4.33333H9.74967V3.25H16.2497V4.33333H21.6663V6.5H20.583V20.5833C20.583 21.1792 20.3709 21.6892 19.9465 22.1135C19.5222 22.5378 19.0122 22.75 18.4163 22.75H7.58301ZM18.4163 6.5H7.58301V20.5833H18.4163V6.5ZM9.74967 18.4167H11.9163V8.66667H9.74967V18.4167ZM14.083 18.4167H16.2497V8.66667H14.083V18.4167Z"
                            fill="#EBEDF0"
                        />
                    </svg>
                </button>
            </div>
            )}
        </div>
    );
}
