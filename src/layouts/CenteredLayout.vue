<template>
    <Component :is="is" class="centered-layout">
        <slot></slot>
    </Component>
</template>

<script lang="ts" setup>
    defineProps({
        is: {
            default: "main",
            type: [String, Object]
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
