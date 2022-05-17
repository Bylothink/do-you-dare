import axios, { AxiosError } from "axios";
import { DocumentNode, GraphQLError, print } from "graphql";

import config from "@/config";

import { GraphQLException, HandledException, NetworkException } from "@/core/exceptions";

import useUiStore from "@/stores/ui";

export interface GraphQLOptions
{
    jsonWebToken?: string;
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
    public static HandleError(error: unknown): unknown
    {
        if (axios.isAxiosError(error))
        {
            const axiosError = error as AxiosError<GraphQLResponse>;
            if (!axiosError.response)
            {
                const exc = new NetworkException("Unable to establish a connection to the server.", axiosError);
                const ui = useUiStore();

                ui.alert({
                    type: "danger",
                    icon: "link-slash",
                    title: "Network error!",
                    message: `${exc.message} Please, try again later.`,
                    dismissable: true
                });

                return new HandledException(exc);
            }

            return new GraphQLException(axiosError.response.data);
        }

        return error;
    }

    private readonly _endpoint: string;

    public constructor(endpoint: string)
    {
        this._endpoint = endpoint;
    }

    protected _composeConfigs(options?: GraphQLOptions): GraphQLConfigs
    {
        const configs: GraphQLConfigs = { headers: { } };

        if (options?.jsonWebToken)
        {
            configs.headers["Authorization"] = `Bearer ${options.jsonWebToken}`;
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
            throw GraphQLService.HandleError(error);
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
            throw GraphQLService.HandleError(error);
        }
    }
}

export default new GraphQLService(`${config.backendUrl}/graphql`);
