// "use client";
//
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useParams } from "next/navigation";
// import { User } from "@/lib/users";
//
// export default function EditUserPage() {
//     const { email } = useParams();
//     const router = useRouter();
//
//     const [user, setUser] = useState<User | null>(null);
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         fetch(`/api/users/${email}`)
//             .then((res) => res.json())
//             .then((data) => {
//                 setUser(data);
//                 setLoading(false);
//             })
//             .catch(() => {
//                 alert("User not found");
//                 router.push("/");
//             });
//     }, [email]);
//
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         if (!user) return;
//         const { name, value } = e.target;
//         setUser({ ...user, [name]: value });
//     };
//
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!user) return;
//
//         const res = await fetch(`/api/users/${email}`, {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(user),
//         });
//
//         if (res.ok) {
//             alert("User updated!");
//             router.push("/");
//         } else {
//             alert("Update failed.");
//         }
//     };
//
//     if (loading || !user) return <p>Loading...</p>;
//
//     return (
//         <main style={{ padding: "2rem", maxWidth: 600, margin: "0 auto" }}>
//             <h2>Edit User</h2>
//             <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//                 <input name="firstName" value={user.firstName} onChange={handleChange} placeholder="First Name" />
//                 <input name="lastName" value={user.lastName} onChange={handleChange} placeholder="Last Name" />
//                 <input name="email" value={user.email} onChange={handleChange} placeholder="Email" />
//                 <input name="birthDate" value={user.birthDate} onChange={handleChange} placeholder="Birthdate" type="date" />
//                 <select name="role" value={user.role} onChange={handleChange}>
//                     <option value="admin">Admin</option>
//                     <option value="supervisor">Supervisor</option>
//                     <option value="user">User</option>
//                 </select>
//                 <input name="password" value={user.password} onChange={handleChange} placeholder="Password" type="password" />
//                 <button type="submit">Save</button>
//             </form>
//         </main>
//     );
// }
