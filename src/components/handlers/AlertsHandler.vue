<template>
    <BaseHandler v-slot="{ alert, close, isOpen }" class="alerts-handler container">
        <Transition name="fade" mode="out-in">
            <AlertBox v-if="alert"
                      v-show="isOpen"
                      :theme="getTheme(alert.type)"
                      :title="alert.title"
                      :icon="alert.icon"
                      :dismissable="alert.dismissable"
                      @dismiss="close">
                <div v-if="alert.component">
                    <Component :is="alert.component" :close="close" />
                </div>
                <pre v-else>{{ alert.message }}</pre>
                <template v-if="alert.actions?.length">
                    <hr />
                    <div class="alert-actions">
                        <template v-for="action in alert.actions">
                            <AppButton v-if="action.result"
                                       :key="action.id"
                                       small
                                       :theme="action.type"
                                       @click="close(action.result!())">
                                {{ action.label }}
                            </AppButton>
                        </template>
                    </div>
                </template>
            </AlertBox>
        </Transition>
    </BaseHandler>
</template>

<script lang="ts" setup>
    import { AlertHandler as BaseHandler } from "@byloth/vuert";

    import AlertBox from "@/components/ui/AlertBox.vue";
    import AppButton from "@/components/ui/AppButton.vue";

    const getTheme = (type: string) => (type != "error") ? type : "danger";
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
