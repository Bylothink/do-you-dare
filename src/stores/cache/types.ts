export interface CachedValue<T>
{
    value: T;
    expiration: number;
    version: number;
}
