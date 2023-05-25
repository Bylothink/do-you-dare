import axios, { AxiosError, isAxiosError } from "axios";

import { GraphQLError, print } from "graphql";
import type { DocumentNode } from "graphql";

import { NetworkException } from "@byloth/exceptions";
import Vuert, { VuertAlertInterrupt } from "@byloth/vuert";

import config from "@/config.js";

import { GraphQLException } from "./exceptions/index.js";

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
    public static HandleError<R = unknown>(error: unknown): Promise<R>
    {
        if (isAxiosError(error))
        {
            const axiosError = error as AxiosError<GraphQLResponse>;
            if (!axiosError.response)
            {
                const exc = new NetworkException("Unable to establish a connection to the server.", axiosError);

                throw new VuertAlertInterrupt({
                    type: "error",
                    icon: "link-slash",
                    title: "Network error!",
                    message: `${exc.message} Please, try again later.`,
                    dismissible: true
                }, exc);
            }

            throw new GraphQLException(axiosError.response.data);
        }

        throw error;
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
            return GraphQLRequest.HandleError<R>(error);
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
            return GraphQLRequest.HandleError<R>(error);
        }
    }
}
