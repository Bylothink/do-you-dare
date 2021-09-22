export default class JsonStorage
{
    protected _storage: Storage;

    public constructor(storage: Storage)
    {
        this._storage = storage;
    }

    public get<T>(propertyName: string, defaultValue?: T): T | undefined
    {
        const propertyValue = this._storage.getItem(propertyName) || undefined;

        if (propertyValue)
        {
            try
            {
                return JSON.parse(propertyValue);
            }
            catch (err)
            {
                if (process.env.NODE_ENV !== "production")
                {
                    // eslint-disable-next-line no-console
                    console.warn(`The "${propertyValue}" value for "${propertyName}" property cannot be parsed. Cleaning the storage...`);
                }

                this._storage.removeItem(propertyName);
            }
        }

        return defaultValue;
    }
    public set<T>(propertyName: string, newValue?: T): void
    {
        const encodedValue = JSON.stringify(newValue);

        if (encodedValue)
        {
            this._storage.setItem(propertyName, encodedValue);
        }
        else
        {
            this.remove(propertyName);
        }
    }

    public remove(propertyName: string): void
    {
        this._storage.removeItem(propertyName);
    }
}
