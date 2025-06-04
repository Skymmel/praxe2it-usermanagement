export async function login(username: string, password: string): Promise<void> {
    const loginResponse = async () => {
        const response = await fetch (`https://localhost:5000/api/UM/Login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
            {headers: {'Content-Type': 'application/json'},    method: 'PUT'});

        if (response.ok) {
            console.log('Přihlášení úspěšné (status:', response.status, ')');
        } else {
            console.error('Přihlášení selhalo (status:', response.status, ')');
        }
    };

    await loginResponse();
}
export async function logout(username: string): Promise<void> {
    const logoutResponse = async () => {
        const response = await fetch (`https://localhost:5000/api/UM/Logout?username=${encodeURIComponent(username)}`, {
            headers: {'Content-Type': 'application/json'},
            method: 'PUT'
        });
        if (response.ok) {
            console.log('Odlášení úspěšné (status:', response.status, ')');
        } else {
            console.error('Odlášení selhalo (status:', response.status, ')');
        }
    };

    await logoutResponse();
}
export async function deleteUser(username: string): Promise<void> {
    const deleteUserResponse = async () => {
        const response = await fetch (`https://localhost:5000/api/UM/DeleteUser?username=${encodeURIComponent(username)}`, {
                headers: {'Content-Type': 'application/json'},
                method: 'PUT'
        });
        if (response.ok) {
            console.log('Odlášení úspěšné (status:', response.status, ')');
        } else {
            console.error('Odlášení selhalo (status:', response.status, ')');
        }
    };
    await deleteUserResponse();
}
export async function createUser(firstname: string, lastname: string, username: string, password: string,eMail: string, age: number, role: string) {
    const createUserResponse = async () => {
        const response = await fetch('https://localhost:5000/api/UM/CreateUser', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PUT',
            body: JSON.stringify({
                'name': firstname,
                'surname': lastname,
                'username': username,
                'password': password,
                'eMail': eMail,
                'age': age,
                'role': role,
            })
        });
        if (response.ok) {
            console.log('Vytvoření uživatele úspěšné (status:', response.status, ')');
        } else {
            console.error('Vytvoření uživatele selhalo (status:', response.status, ')');
        }
    }
    await createUserResponse();
}

export async function updateUser(username:string, firstname:string, lastname:string, usernameEdited:string, password:string, eMail:string, age:number, role:string) {
    const updateUserResponse = async () => {
        const response = await fetch(`https://localhost:5000/api/UM/UpdateUser?username=${encodeURIComponent(username)}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PUT',
            body: JSON.stringify({
                'name': firstname,
                'surname': lastname,
                'username': usernameEdited,
                'password': password,
                'eMail': eMail,
                'age': age,
                'role': role,
            })
        });
        if (response.ok) {
            console.log('Upravení uživatele úspěšné (status:', response.status, ')');
        } else {
            console.error('Upravení uživatele selhalo (status:', response.status, ')');
        }
    }
    await updateUserResponse();
}
export async function GetUsers(){
    const response = await fetch('https://localhost:5000/api/UM/GetUsers', {
        method: 'GET', cache: 'no-store',
    });

    if (response.ok) {
        console.log(`Získání uživatelů úspěšné: ${response.status}`);
    } else {
        console.log(`Získání uživatelů selhalo: ${response.status}`);
    }

    return await response.json();
}
// Volání funkce (například v serverové komponentě nebo efektu)
// const users = await GetUsers();
// export async function GetUsers(){
//     const [users, setUsers] = useState([]);
//     useEffect(() => {
//         const fetchUsers = async () => {
//             const response = await fetch('https://localhost:5000/api/UM/GetUsers');
//             const data = await response.json();
//             setUsers(data);
//         };
//         fetchUsers();
//     }, []);
//     return users;
// }

interface User {
    firstname: string,
    lastname: string,
    username: string,
    password: string,
    eMail: string,
    age: number,
    role: string
}

export async function GetUser(username: string): Promise<User | null> {
    const response = await fetch('https://localhost:5000/api/UM/GetUsers', {
        method: 'GET',
        cache: 'no-store',
    });

    if (!response.ok) {
        console.log(`Získání uživatelů selhalo: ${response.status}`);
        return null;
    }

    const users: User[] = await response.json();
    const user = users.find(u => u.username === username);

    return user ?? null;
}


