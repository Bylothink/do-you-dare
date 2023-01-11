import axios, { AxiosError } from "axios";
import { DocumentNode, GraphQLError, print } from "graphql";

import { HandledException } from "@byloth/exceptions";
import { useVuert } from "@byloth/vuert";

import config from "@/config";

import { GraphQLException, NetworkException } from "./exceptions";

export interface GraphQLConfigs
{
    headers: Record<string, string>;
}
export interface GraphQLOptions
{
    jsonWebToken?: string;
}

export interface GraphQLResponse<T = unknown>
{
    data?: T;
    errors?: GraphQLError[];
}

export default abstract class GraphQLRequest<R = unknown, A = unknown>
{
    protected static _HandleError(error: unknown): unknown
    {
        if (axios.isAxiosError(error))
        {
            const axiosError = error as AxiosError<GraphQLResponse>;
            if (!axiosError.response)
            {
                const exc = new NetworkException("Unable to establish a connection to the server.", axiosError);
                const vuert = useVuert();

                vuert.emit({
                    type: "error",
                    icon: "link-slash",
                    title: "Network error!",
                    message: `${exc.message} Please, try again later.`,
                    dismissible: true
                });

                return new HandledException(exc);
            }

            return new GraphQLException(axiosError.response.data);
        }

        return error;
    }

    private readonly _endpoint: string;

    protected constructor(schema: string)
    {
        this._endpoint = `${config.backendUrl}/graphql/${schema}/`;
    }

    private _composeConfigs(options?: GraphQLOptions): GraphQLConfigs
    {
        const configs: GraphQLConfigs = { headers: { } };

        if (options?.jsonWebToken)
        {
            configs.headers["Authorization"] = `Bearer ${options.jsonWebToken}`;
        }

        return configs;
    }

    protected async _query(query: DocumentNode, options?: GraphQLOptions): Promise<R>
    {
        const data = { query: print(query) };
        const configs = this._composeConfigs(options);

        try
        {
            const response = await axios.post<GraphQLResponse<R>>(this._endpoint, data, configs);

            if ((response.data.errors) || (!response.data.data))
            {
                throw new GraphQLException(response.data);
            }

            return response.data.data;
        }
        catch (error)
        {
            throw GraphQLRequest._HandleError(error);
        }
    }

    protected async _mutation(query: DocumentNode, variables: A, options?: GraphQLOptions) : Promise<R>
    {
        const data = { query: print(query), variables: variables };
        const configs = this._composeConfigs(options);

        try
        {
            const response = await axios.post<GraphQLResponse<R>>(this._endpoint, data, configs);

            if ((response.data.errors) || (!response.data.data))
            {
                throw new GraphQLException(response.data);
            }

            return response.data.data;
        }
        catch (error)
        {
            throw GraphQLRequest._HandleError(error);
        }
    }
}
