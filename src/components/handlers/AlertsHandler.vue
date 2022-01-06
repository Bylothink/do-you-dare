<template>
    <div class="alerts-handler container">
        <Transition name="fade"
                    mode="out-in"
                    @after-leave="onClosed">
            <AlertBox v-if="alert"
                      v-show="isOpen"
                      :type="alert.type"
                      :dismissable="alert.dismissable"
                      @dismiss="onDismiss">
                {{ alert.message }}
            </AlertBox>
        </Transition>
    </div>
</template>

<script lang="ts" setup>
    import { reactive, ref, computed } from "vue";

    import { onAction } from "@/core/utils/store";
    import { AlertOptions } from "@/core/types";

    import useUiStore from "@/stores/ui";

    import AlertBox from "@/components/ui/AlertBox.vue";

    const uiStore = useUiStore();

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

    const onDismiss = () => { isOpen.value = false; };
    const onClosed = () =>
    {
        alerts.shift();

        isOpen.value = alerts.length > 0;
    };

    onAction(uiStore, "alert", (alert) =>
    {
        alerts.push(alert);

        if (alerts.length === 1)
        {
            isOpen.value = true;
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
