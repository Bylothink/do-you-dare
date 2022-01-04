<template>
    <div class="alerts-handler container">
        <Transition name="fade" mode="out-in">
            <AlertBox v-if="alert"
                      :type="alert.type"
                      :dismissable="alert.dismissable">
                {{ alert.message }}
            </AlertBox>
        </Transition>
    </div>
</template>

<script lang="ts" setup>
    import { ref, computed } from "vue";

    import { onAction } from "@/core/utils/store";
    import { AlertOptions } from "@/core/types";
    import useUiStore from "@/stores/ui";

    import AlertBox from "@/components/ui/AlertBox.vue";

    const uiStore = useUiStore();
    const alerts = ref<AlertOptions[]>([]);

    const alert = computed((): AlertOptions | null =>
    {
        if (alerts.value.length)
        {
            return alerts.value[0];
        }

        return null;
    });

    onAction(uiStore, "alert", (alert) => alerts.value.push(alert));
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
        top: 0px;

        & > .alert-box
        {
            pointer-events: auto;

            &.fade-enter-from,
            &.fade-leave-to
            {
                opacity: 0;
            }
            &.fade-enter-active,
            &.fade-leave-active
            {
                transition: opacity 250ms;
            }
            &.fade-enter-to,
            &.fade-leave-from
            {
                opacity: 1;
            }
        }
    }
</style>
