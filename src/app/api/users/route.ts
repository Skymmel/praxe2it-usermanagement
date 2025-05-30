import {users} from "@/lib/users";

export async function POST(request: Request) {
  const user = await request.json();
  // TODO: Check if data is correct
  users.push(user);
  return new Response(JSON.stringify(user), {status: 201});
}

export async function GET() {
  return new Response(JSON.stringify(users));
}
