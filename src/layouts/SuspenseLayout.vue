<script lang="ts" setup>
    import type { Component, PropType } from "vue";

    defineProps({
        is: {
            default: "div",
            type: [String, Object] as PropType<string | Component>
        },

        loading: {
            default: false,
            type: Boolean
        },
        failed: {
            default: false,
            type: Boolean
        }
    });
</script>

<template>
    <Component :is="is">
        <!-- TODO: Gestire la transizione tra i vari slot. -->
        <slot v-if="loading" name="loader"></slot>
        <slot v-else-if="failed" name="error"></slot>
        <slot v-else></slot>
    </Component>
</template>

<style lang="scss" scoped></style>
