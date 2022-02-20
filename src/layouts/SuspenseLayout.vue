<template>
    <Component :is="is">
        <!-- TODO: Gestire la transizione tra i vari slot. -->
        <slot v-if="loading" name="loader"></slot>
        <slot v-else-if="failed" name="error"></slot>
        <slot v-else></slot>
    </Component>
</template>

<script lang="ts" setup>
    defineProps({
        is: {
            default: "div",
            type: [String, Object]
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
