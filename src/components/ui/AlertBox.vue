<template>
    <ThemedElement class="alert-box alert"
                   :class="classes"
                   :theme="type"
                   name="alert"
                   role="alert">
        <slot></slot>
        <button v-if="dismissable"
                type="button"
                class="btn-close"
                aria-label="Close"
                @click="$emit('dismiss', $event)">
        </button>
    </ThemedElement>
</template>

<script lang="ts" setup>
    import { computed } from "vue";

    import ThemedElement from "@/components/core/ThemedElement.vue";

    const props = defineProps({
        type: {
            default: "primary",
            type: String
        },

        dismissable: {
            default: false,
            type: Boolean
        }
    });
    defineEmits(["dismiss"]);

    const classes = computed((): Record<string, boolean> => ({ "alert-dismissible": props.dismissable }));
</script>

<style lang="scss" scoped>
    @use "@/assets/scss/variables";

    .alert-box
    {
        &.alert-primary > .btn-close:focus
        {
            box-shadow: 0px 0px 0px 0.25rem rgba(variables.$primary, 0.25);
        }
        &.alert-secondary > .btn-close:focus
        {
            box-shadow: 0px 0px 0px 0.25rem rgba(variables.$secondary, 0.25);
        }
        &.alert-danger > .btn-close:focus
        {
            box-shadow: 0px 0px 0px 0.25rem rgba(variables.$danger, 0.25);
        }
        &.alert-warning > .btn-close:focus
        {
            box-shadow: 0px 0px 0px 0.25rem rgba(variables.$warning, 0.25);
        }
        &.alert-success > .btn-close:focus
        {
            box-shadow: 0px 0px 0px 0.25rem rgba(variables.$success, 0.25);
        }
        &.alert-info > .btn-close:focus
        {
            box-shadow: 0px 0px 0px 0.25rem rgba(variables.$info, 0.25);
        }
    }
</style>
