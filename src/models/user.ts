export interface UserData
{
    id: number;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    dateJoined: string;
    lastLogin?: string;
}

export default class User implements UserData
{
    public id: number;
    public username: string;
    public email: string;
    public firstName?: string;
    public lastName?: string;
    public dateJoined: string;
    public lastLogin?: string;

    public constructor({ id, username, email, firstName, lastName, dateJoined, lastLogin }: UserData)
    {
        this.id = id;
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateJoined = dateJoined;
        this.lastLogin = lastLogin;
    }
}
