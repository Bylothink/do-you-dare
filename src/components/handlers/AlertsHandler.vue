<template>
    <div class="alerts-handler container">
        <Transition name="fade"
                    mode="out-in"
                    @after-leave="onClosed">
            <AlertBox v-if="alert"
                      v-show="isOpen"
                      :theme="alert.type"
                      :title="alert.title"
                      :icon="alert.icon"
                      :dismissable="alert.dismissable"
                      @dismiss="close">
                <pre>{{ alert.message }}</pre>
                <template v-if="alert.actions?.length">
                    <hr />
                    <div class="alert-actions">
                        <template v-for="action, index in alert.actions">
                            <RouterLink v-if="action.location"
                                        v-slot="{ href, navigate }"
                                        :key="`lnk-${index}`"
                                        custom
                                        :to="action.location">
                                <AppButton small
                                           :href="href"
                                           :title="action.label"
                                           :theme="action.type"
                                           @click="handleNavigate.call(action, $event, navigate)">
                                    {{ action.label }}
                                </AppButton>
                            </RouterLink>
                            <AppButton v-else-if="action.callback"
                                       :key="`btn-${index}`"
                                       small
                                       :theme="action.type"
                                       @click="handleCallback.call(action, action.callback!)">
                                {{ action.label }}
                            </AppButton>
                        </template>
                    </div>
                </template>
            </AlertBox>
        </Transition>
    </div>
</template>

<script lang="ts" setup>
    import { reactive, ref, computed } from "vue";
    import { NavigationFailure } from "vue-router";

    import { onAction } from "@/core/utils/store";
    import { ActionCallback, ActionOptions, AlertOptions } from "@/core/types";

    import useUiStore from "@/stores/ui";

    import AlertBox from "@/components/ui/AlertBox.vue";
    import AppButton from "@/components/ui/AppButton.vue";

    const ui = useUiStore();

    const isOpen = ref(false);
    const alerts = reactive<AlertOptions[]>([]);

    const alert = computed((): AlertOptions | null =>
    {
        if (alerts.length)
        {
            return alerts[0];
        }

        return null;
    });

    let timeoutId: number | undefined;
    const onClosed = ref<() => void>();

    const open = () =>
    {
        isOpen.value = true;

        if (alert.value?.timeout)
        {
            timeoutId = setTimeout(close, alert.value.timeout);
        }
    };
    const close = () =>
    {
        if (timeoutId)
        {
            clearTimeout(timeoutId);

            timeoutId = undefined;
        }

        isOpen.value = false;

        return new Promise<void>((resolve, reject) =>
        {
            onClosed.value = () =>
            {
                alerts.shift();

                if (alerts.length > 0)
                {
                    open();
                }

                resolve();

                onClosed.value = undefined;
            };
        });
    };

    function handleCallback(this: ActionOptions, callback: ActionCallback): void
    {
        callback.call(alert.value!, close);

        if (this.close)
        {
            close();
        }
    }

    //
    // TODO: Rivedere e sistemare un po' tutta questa logica.
    //
    type NavigationResult = Promise<void | NavigationFailure>;

    function handleNavigate(this: ActionOptions, evt: MouseEvent, navigate: (e?: MouseEvent) => NavigationResult)
    {
        navigate(evt);

        if (this.close)
        {
            close();
        }
    }

    onAction(ui, "alert", (alert) =>
    {
        alerts.push(alert);

        if (alerts.length === 1)
        {
            open();
        }
    });
</script>

<style lang="scss" scoped>
    .alerts-handler
    {
        bottom: 0px;
        left: 0px;
        position: fixed;
        right: 0px;
        text-align: initial;
        pointer-events: none;
        top: 1em;

        & > .alert
        {
            pointer-events: auto;

            pre
            {
                font-family: inherit;
                margin: 0px;
                white-space: pre-wrap;
            }

            & > .alert-actions
            {
                display: flex;
                flex-direction: row-reverse;

                & > .btn
                {
                    margin-left: 0.5em;
                }
            }

            &.fade-enter-from,
            &.fade-leave-to
            {
                opacity: 0;
                transform: translateY(-2.5em);
            }
            &.fade-enter-active,
            &.fade-leave-active
            {
                transition: opacity 250ms ease-in-out, transform 250ms ease-in-out;
            }
            &.fade-enter-to,
            &.fade-leave-from
            {
                opacity: 1;
                transform: translateY(0px);
            }
        }
    }
</style>
