<script lang="ts" setup>
    import type { Component, PropType } from "vue";

    defineProps({
        is: {
            default: "main",
            type: [String, Object] as PropType<string | Component>
        }
    });
</script>

<template>
    <Component :is="is" class="centered">
        <slot></slot>
    </Component>
</template>

<style lang="scss" scoped>
    .centered
    {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
    }
</style>
