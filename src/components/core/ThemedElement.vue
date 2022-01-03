<template>
    <Component :is="tag" :class="classes">
        <slot></slot>
    </Component>
</template>

<script lang="ts" setup>
    import { defineProps, computed } from "vue";

    const props = defineProps({
        tag: {
            default: "div",
            type: String
        },

        name: {
            default: "",
            type: String
        },
        theme: {
            default: "primary",
            type: String
        }
    });

    const classes = computed((): string[] =>
    {
        if (props.name)
        {
            return [`${props.name}-${props.theme}`];
        }

        return [`${props.theme}`];
    });
</script>
