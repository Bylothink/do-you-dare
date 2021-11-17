import axios, { AxiosError } from "axios";
import { DocumentNode, GraphQLError, print } from "graphql";

import { GraphQLException } from "@/core/exceptions";

export interface GraphQLOptions
{
    jwtToken?: string;
}
export interface GraphQLConfigs
{
    headers: Record<string, string>;
}

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

    protected _composeConfigs(options?: GraphQLOptions): GraphQLConfigs
    {
        const configs: GraphQLConfigs = { headers: { } };

        if (options?.jwtToken)
        {
            configs.headers.Authorization = `JWT ${options.jwtToken}`;
        }

        return configs;
    }

    public async query<T = unknown>(name: string, query: DocumentNode, options?: GraphQLOptions): Promise<T>
    {
        const url = `${this._baseUrl}/${name}/`;
        const data = { query: print(query) };
        const configs = this._composeConfigs(options);

        try
        {
            const response = await axios.post<GraphQLResponse<T>>(url, data, configs);

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

    public async mutation<T = unknown>(
        name: string,
        query: DocumentNode,
        variables: GraphQLVariables,
        options?: GraphQLOptions
    ) : Promise<T>
    {
        const url = `${this._baseUrl}/${name}/`;
        const data = { query: print(query), variables: variables };
        const configs = this._composeConfigs(options);

        try
        {
            const response = await axios.post<GraphQLResponse<T>>(url, data, configs);

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
