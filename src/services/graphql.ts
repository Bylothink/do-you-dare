import axios, { AxiosError } from "axios";
import { DocumentNode, GraphQLError, print } from "graphql";

import config from "@/config";

import { GraphQLException } from "@/core/exceptions";

export interface GraphQLOptions
{
    authorization?: string;
}
export interface GraphQLConfigs
{
    headers: Record<string, string>;
}

export interface GraphQLResponse<T = unknown>
{
    data?: T;
    errors?: GraphQLError[];
}

export class GraphQLService
{
    private readonly _endpoint: string;

    public constructor(endpopint: string)
    {
        this._endpoint = endpopint;
    }

    protected _composeConfigs(options?: GraphQLOptions): GraphQLConfigs
    {
        const configs: GraphQLConfigs = { headers: { } };

        if (options?.authorization)
        {
            configs.headers.Authorization = `Bearer ${options.authorization}`;
        }

        return configs;
    }

    public async query<R = unknown>(name: string, query: DocumentNode, options?: GraphQLOptions): Promise<R>
    {
        const url = `${this._endpoint}/${name}/`;
        const data = { query: print(query) };
        const configs = this._composeConfigs(options);

        try
        {
            const response = await axios.post<GraphQLResponse<R>>(url, data, configs);

            if ((response.data.errors) || (!response.data.data))
            {
                throw new GraphQLException(response.data);
            }

            return response.data.data;
        }
        catch (error)
        {
            if (axios.isAxiosError(error))
            {
                const axiosError = error as AxiosError<GraphQLResponse>;

                throw new GraphQLException(axiosError.response!.data);
            }
            else
            {
                throw error;
            }
        }
    }

    // eslint-disable-next-line max-len
    public async mutation<R = unknown, V = unknown>(name: string, query: DocumentNode, variables: V, options?: GraphQLOptions) : Promise<R>
    {
        const url = `${this._endpoint}/${name}/`;
        const data = { query: print(query), variables: variables };
        const configs = this._composeConfigs(options);

        try
        {
            const response = await axios.post<GraphQLResponse<R>>(url, data, configs);

            if ((response.data.errors) || (!response.data.data))
            {
                throw new GraphQLException(response.data);
            }

            return response.data.data;
        }
        catch (error)
        {
            if (axios.isAxiosError(error))
            {
                const axiosError = error as AxiosError<GraphQLResponse>;

                throw new GraphQLException(axiosError.response!.data);
            }
            else
            {
                throw error;
            }
        }
    }
}

export default new GraphQLService(`${config.backendUrl}/graphql`);
