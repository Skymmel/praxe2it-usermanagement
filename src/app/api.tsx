export async function login(email: string, password: string): Promise<void> {
    const loginResponse = async () => {
        const response = await fetch (`https://localhost:5000/api/UM/Login?username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
            {headers: {'Content-Type': 'application/json'},    method: 'PUT'});

        if (response.ok) {
            console.log('✅ Přihlášení úspěšné (status:', response.status, ')');
        } else {
            console.error('❌ Přihlášení selhalo (status:', response.status, ')');
        }
    };

    await loginResponse(); // zavolání funkce
}