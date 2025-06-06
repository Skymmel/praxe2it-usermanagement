export async function login(username: string, password: string): Promise<boolean> {
    try {
        const url = `https://localhost:5000/api/UM/Login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
            console.log('Přihlášení úspěšné (status:', response.status, ')');
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("username", username); // volitelné
            return true;
        } else {
            console.error('Přihlášení selhalo (status:', response.status, ')');
            localStorage.setItem("isLoggedIn", "false");
            return false;
        }
    } catch (error) {
        console.error('Chyba při přihlašování:', error);
        localStorage.setItem("isLoggedIn", "false");
        return false;
    }
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
export async function deleteUser(username: string): Promise<boolean> {
    try {
        const response = await fetch(`https://localhost:5000/api/UM/DeleteUser?username=${encodeURIComponent(username)}`, {
            method: 'PUT',
        });

        if (response.ok) {
            console.log('Uživatel úspěšně smazán (status:', response.status, ')');
            return true;
        } else {
            console.error('Mazání uživatele selhalo (status:', response.status, ')');
            return false;
        }
    } catch (error) {
        console.error('Chyba při mazání uživatele:', error);
        return false;
    }
}

export interface User {
    name: string;
    surname: string;
    username: string;
    password: string;
    eMail: string;
    age: number;
    role: string;
}

export async function createUser(
    user: User
): Promise<boolean> {
    try {
        const response = await fetch('https://localhost:5000/api/UM/CreateUser', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: user.name,
                surname: user.surname,
                username: user.username,
                password: user.password,
                eMail: user.eMail,
                age: user.age,
                role: user.role
            })
        });
        return response.ok;
    } catch (error) {
        console.error('Chyba:', error);
        return false;
    }
}

export async function updateUser(username:string, user: User) {
    const updateUserResponse = async () => {
        const response = await fetch(`https://localhost:5000/api/UM/UpdateUser?username=${encodeURIComponent(username)}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'name': user.name,
                'surname': user.surname,
                'username': user.username,
                'password': user.password,
                'eMail': user.eMail,
                'age': user.age,
                'role': user.role,
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


export async function GetUsers(): Promise<User[]> {
    try {
        const response = await fetch('https://localhost:5000/api/UM/GetUsers', {
            method: 'GET',
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error('Expected an array of users');
        }

        return data as User[];
    } catch (error) {
        console.error('Chyba při získávání uživatelů:', error);
        throw error;
    }
}
export async function GetUser(username: string): Promise<User | null> {
    try {
        const users: User[] = await GetUsers();
        const user = users.find(u => u.username === username);
        return user ?? null;
    } catch (error) {
        console.error("Chyba při získávání uživatele:", error);
        return null;
    }
}
export async function IsLoggedIn(): Promise<boolean> {
    return localStorage.getItem("isLoggedIn") === "true";
}


