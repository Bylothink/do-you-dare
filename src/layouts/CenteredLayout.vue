<template>
    <component :is="tag" class="centered-layout">
        <slot></slot>
    </component>
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    export default defineComponent({
        name: "CenteredLayout",
        props: {
            tag: {
                default: "div",
                type: String
            }
        }
    });
</script>

<style>
    .centered-layout
    {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
    }
</style>
