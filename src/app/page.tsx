export default async function Home()

{process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
    return (
        <main>
            Hello!
        </main>
    );
}