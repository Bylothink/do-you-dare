<template>
    <component :is="tag" class="centered-layout">
        <slot></slot>
    </component>
</template>

<script lang="ts" setup>
    defineProps({
        tag: {
            default: "main",
            type: String
        }
    });
</script>

<style lang="scss" scoped>
    .centered-layout
    {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
    }
</style>
