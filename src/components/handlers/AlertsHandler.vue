<template>
    <div class="alert-handler container">
        <AlertBox v-if="alert"
                  :type="alert.type"
                  :dismissable="alert.dismissable">
            {{ alert.message }}
        </AlertBox>
    </div>
</template>

<script lang="ts" setup>
    import { ref, computed } from "vue";

    import { AlertOptions } from "@/core/types";
    // import { useStore } from "@/store";

    import AlertBox from "@/components/ui/AlertBox.vue";

    // const store = useStore();
    const alerts = ref<AlertOptions[]>([]);

    const alert = computed((): AlertOptions | null =>
    {
        if (alerts.value.length)
        {
            return alerts.value[0];
        }

        return null;
    });

    // store.onAction("alert", (alert) => alerts.value.push(alert));
</script>

<style lang="scss" scoped>
    .alert-handler
    {
        position: fixed;
        text-align: initial;
    }
</style>
