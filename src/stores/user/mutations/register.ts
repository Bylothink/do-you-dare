/* eslint-disable max-len */

import { gql } from "graphql-tag";

import type { UserData } from "@/models/user";
import { GraphQLRequest } from "@/services";

export interface RegisterData
{
    username: string;
    password: string;
    email: string;
    token: string;

    firstName?: string;
    lastName?: string;
}
export interface RegisterResponse
{
    token: string;
    user: UserData;
}
export default class Register
    extends GraphQLRequest<{ register: RegisterResponse }, RegisterData>
    implements RegisterData
{
    public static readonly Mutation = gql`mutation register($username: String!, $password: String!, $email: String!, $token: String!, $firstName: String, $lastName: String) {
        register(username: $username, password: $password, email: $email, token: $token, firstName: $firstName, lastName: $lastName) {
            token,
            user {
                id,
                isActive,
                username,
                email,
                firstName,
                lastName,
                dateJoined,
                lastLogin
            }
        }
    }`;

    public username: string;
    public password: string;
    public email: string;
    public token: string;

    public firstName?: string | undefined;
    public lastName?: string | undefined;

    public constructor({ username, password, email, token, firstName, lastName }: RegisterData)
    {
        super("user");

        this.username = username;
        this.password = password;
        this.email = email;
        this.token = token;

        this.firstName = firstName;
        this.lastName = lastName;
    }

    public async execute(): Promise<RegisterResponse>
    {
        const response = await this._mutation(Register.Mutation, {
            username: this.username,
            password: this.password,
            email: this.email,
            token: this.token,

            firstName: this.firstName,
            lastName: this.lastName
        });

        return response.register;
    }
}
