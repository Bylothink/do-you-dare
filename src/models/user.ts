export interface UserData
{
    id: number;
    isActive: boolean;
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
    public isActive: boolean;
    public username: string;
    public email: string;
    public firstName?: string;
    public lastName?: string;
    public dateJoined: string;
    public lastLogin?: string;

    public constructor({ id, isActive, username, email, firstName, lastName, dateJoined, lastLogin }: UserData)
    {
        this.id = id;
        this.isActive = isActive;
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateJoined = dateJoined;
        this.lastLogin = lastLogin;
    }
}
