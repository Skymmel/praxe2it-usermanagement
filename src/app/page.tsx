export default async function Home()

{process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
    const response = await fetch('https://localhost:5000/api/UM/CreateUser', {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify({
            'name': 'vojtech',
            'surname': 'skyba',
            'username': 'skymmel',
            'password': 'wilhelm',
            'eMail': 'skymmel@contact.eu',
            'age': 18,
            'role': 'admin',
        })
    });
    return (
        <main>
            Hello!
        </main>
    );
}