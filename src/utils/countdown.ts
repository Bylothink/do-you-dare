import { onScopeDispose, ref } from "vue";
import type { Ref } from "vue";

import { DeferredPromise } from "@byloth/core";

const MULTIPLIER = 1000;

export default class Countdown
{
    protected _intervalId?: number;
    protected _deferrer?: DeferredPromise<void>;

    public readonly duration: number;
    public readonly step: number;

    public readonly remainingTime: Ref<number>;
    public readonly isRunning: Ref<boolean>;

    public constructor(duration: number, step = 1.0)
    {
        this.duration = duration;
        this.step = step;

        this.remainingTime = ref(0);
        this.isRunning = ref(false);

        onScopeDispose(() => this.stop());
    }

    public start(remainingTime?: number): Promise<void>
    {
        this.remainingTime.value = remainingTime ?? this.duration;
        this.isRunning.value = true;

        this._deferrer = new DeferredPromise(() =>
        {
            this._intervalId = setInterval(() =>
            {
                this.remainingTime.value -= this.step;
                if (this.remainingTime.value <= 0)
                {
                    this.stop();
                }

            }, this.step * MULTIPLIER);
        });

        return this._deferrer;
    }
    public stop(reason?: unknown): void
    {
        this.isRunning.value = false;

        if (this._intervalId)
        {
            clearInterval(this._intervalId);

            if (reason)
            {
                this._deferrer!.reject(reason);
            }
            else
            {
                this._deferrer!.resolve();
            }

            this._intervalId = undefined;
            this._deferrer = undefined;
        }
    }
}
