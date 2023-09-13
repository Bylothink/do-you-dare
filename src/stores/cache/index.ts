import { defineStore } from "pinia";

import { NotImplementedException } from "@byloth/exceptions";

import { jsonStorage } from "@/utils";
import Expire from "@/utils/expire";
import type { ExpireTimeout } from "@/utils/expire";

import type { CachedValue } from "./types";

const CACHE_VERSION = 1;

export default defineStore("cache", {
    state: () => ({ }),

    getters: { },
    actions: {
        clear(): void { throw new NotImplementedException(); },

        get<T>(key: string, defaultValue?: T): T | undefined
        {
            const cache = jsonStorage.recall<CachedValue<T>>(`cache:${key}`);
            if (cache?.version === CACHE_VERSION)
            {
                if (cache.expiration > Date.now())
                {
                    return cache.value;
                }
            }

            jsonStorage.forget(`cache:${key}`);

            return defaultValue;
        },
        has(key: string): boolean { throw new NotImplementedException(); },
        set<T>(key: string, value: T, timeout: number | ExpireTimeout): void
        {
            jsonStorage.remember(`cache:${key}`, {
                value: value,
                expiration: Expire.In(timeout),
                version: CACHE_VERSION
            });
        },

        touch(): void { throw new NotImplementedException(); }
    }
});
