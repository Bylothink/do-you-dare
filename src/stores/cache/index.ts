import { defineStore } from "pinia";

import { jsonLocalStorage } from "@/utils";
import Expire from "@/utils/expire";
import type { ExpireTimeout } from "@/utils/expire";

import type { CachedValue } from "./types";

const CACHE_VERSION = 1;

export default defineStore("cache", {
    state: () => ({ }),

    getters: { },
    actions: {
        // clear(): void { /* ... */ },

        get<T>(key: string, defaultValue?: T): T | undefined
        {
            const cache = jsonLocalStorage.get<CachedValue<T>>(`cache:${key}`);
            if (cache?.version === CACHE_VERSION)
            {
                if (cache.expiration > Date.now())
                {
                    return cache.value;
                }
            }

            jsonLocalStorage.remove(`cache:${key}`);

            return defaultValue;
        },
        // has<T = unknown>(key: string): boolean { /* ... */ },
        set<T>(key: string, value: T, timeout: number | ExpireTimeout): void
        {
            jsonLocalStorage.set(`cache:${key}`, {
                value: value,
                expiration: Expire.In(timeout),
                version: CACHE_VERSION
            });
        },

        // touch(): void { /* ... */ }
    }
});
