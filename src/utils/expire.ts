export interface ExpireTimeout
{
    years?: number;
    months?: number;
    weeks?: number;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    milliseconds?: number;
}

export enum TimeUnit
{
    Milliseconds = 1,
    Seconds = 1000,
    Minutes = 60 * 1000,
    Hours = 60 * 60 * 1000,
    Days = 24 * 60 * 60 * 1000,
    Weeks = 7 * 24 * 60 * 60 * 1000,
    Months = 30 * 24 * 60 * 60 * 1000,
    Years = 365 * 24 * 60 * 60 * 1000
}

export default class Expire
{
    public static Parse(timeout: number | ExpireTimeout): number
    {
        if (typeof timeout === "number")
        {
            return timeout;
        }

        const years = (timeout.years ?? 0) * 365;
        const months = (timeout.months ?? 0) * 30;
        const weeks = (timeout.weeks ?? 0) * 7;

        let expiringTime = years + months + weeks;

        expiringTime += (timeout.days ?? 0) * 24;
        expiringTime += (timeout.hours ?? 0) * 60;
        expiringTime += (timeout.minutes ?? 0) * 60;
        expiringTime += (timeout.seconds ?? 0) * 1000;
        expiringTime += timeout.milliseconds ?? 0;

        return expiringTime;
    }

    public static In(timeout: number | ExpireTimeout): number
    {
        const expiringTime = Expire.Parse(timeout);

        return Date.now() + expiringTime;
    }
    public static On(expiration: number | Date, unit: TimeUnit = TimeUnit.Milliseconds): number
    {
        let remainingTime;
        if (expiration instanceof Date)
        {
            remainingTime = expiration.getTime() - Date.now();
        }
        else
        {
            remainingTime = expiration - Date.now();
        }

        return remainingTime / unit;
    }
}
