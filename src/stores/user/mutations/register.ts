import gql from "graphql-tag";

import { GraphQLRequest } from "@/core";

export interface RegisterData
{
    username: string;
    password: string;
    email: string;
    firstName?: string;
    lastName?: string;
}
export interface RegisterResponse
{
    token: string;
    user: {
        id: number;
        isActive: boolean;
        username: string;
        email: string;
    };
}
export default class Register
    extends GraphQLRequest<{ register: RegisterResponse }, RegisterData>
    implements RegisterData
{
    // eslint-disable-next-line max-len
    public static readonly Query = gql`mutation register($username: String!, $password: String!, $email: String!, $firstName: String, $lastName: String) {
        register(username: $username, password: $password, email: $email, firstName: $firstName, lastName: $lastName) {
            token,
            user {
                id,
                isActive,
                username,
                email
            }
        }
    }`;

    public username: string;
    public password: string;
    public email: string;
    public firstName?: string | undefined;
    public lastName?: string | undefined;

    public constructor({ username, password, email, firstName, lastName }: RegisterData)
    {
        super("user");

        this.username = username;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public async execute(): Promise<RegisterResponse>
    {
        const response = await this._mutation(Register.Query, {
            username: this.username,
            password: this.password,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName
        });

        return response.register;
    }
}
