import axios, { AxiosError } from "axios";
import { DocumentNode, GraphQLError, print } from "graphql";

import { GraphQLException } from "@/core/exceptions";

export type GraphQLVariables = Record<string, unknown>;
export interface GraphQLResponse<T = unknown>
{
    data?: T;
    errors?: GraphQLError[];
}

export class GraphQLService
{
    private readonly _baseUrl: string;

    public constructor(baseUrl: string)
    {
        this._baseUrl = baseUrl;
    }

    public async query<T = unknown>(name: string, query: DocumentNode, jwtToken?: string): Promise<T>
    {
        const headers: Record<string, string> = { };

        if (jwtToken)
        {
            headers.Authorization = `JWT ${jwtToken}`;
        }

        try
        {
            const response = await axios.post<GraphQLResponse<T>>(
                `${this._baseUrl}/${name}/`,
                { query: print(query) },
                { headers }
            );

            if ((response.data.errors) || (!response.data.data))
            {
                throw new GraphQLException(response.data);
            }

            return response.data.data;
        }
        catch (exc)
        {
            if (axios.isAxiosError(exc))
            {
                const axiosExc = exc as AxiosError<GraphQLResponse>;

                throw new GraphQLException(axiosExc.response!.data);
            }
            else
            {
                throw exc;
            }
        }
    }

    public async mutation<T = unknown>(name: string, query: DocumentNode, variables: GraphQLVariables, jwtToken?: string)
        : Promise<T>
    {
        const headers: Record<string, string> = { };

        if (jwtToken)
        {
            headers.Authorization = `JWT ${jwtToken}`;
        }

        try
        {
            const response = await axios.post<GraphQLResponse<T>>(
                `${this._baseUrl}/${name}/`,
                {
                    query: print(query),
                    variables: variables
                },
                { headers });

            if ((response.data.errors) || (!response.data.data))
            {
                throw new GraphQLException(response.data);
            }

            return response.data.data;
        }
        catch (exc)
        {
            if (axios.isAxiosError(exc))
            {
                const axiosExc = exc as AxiosError<GraphQLResponse>;

                throw new GraphQLException(axiosExc.response!.data);
            }
            else
            {
                throw exc;
            }
        }
    }
}

export default new GraphQLService("http://localhost:8000");
