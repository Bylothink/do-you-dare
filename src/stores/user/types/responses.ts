import { UserData } from "@/models/user";

interface Session
{
    token: string;
    user: Partial<UserData>;
}

export interface Authenticate
{
    authenticate: Session;
}
export interface RenewSession
{
    renewSession: Session;
}

export interface Register
{
    register: Session;
}
