<template>
    <ThemedElement class="alert flex"
                   :class="classes"
                   name="alert"
                   role="alert">
        <h3 v-if="title" class="alert-heading">
            <span v-if="icon"
                  class="fa-solid"
                  :class="`fa-${icon}`">
            </span>
            {{ title }}
        </h3>
        <span v-else-if="icon"
              class="fa-solid"
              :class="`fa-${icon}`">
        </span>
        <slot></slot>
        <button v-if="dismissable"
                class="btn btn-close"
                aria-label="Close"
                type="button"
                @click="$emit('dismiss', $event)">
        </button>
    </ThemedElement>
</template>

<script lang="ts" setup>
    import { computed } from "vue";

    import ThemedElement from "@/components/core/ThemedElement.vue";

    const props = defineProps({
        title: {
            default: "",
            type: String
        },
        icon: {
            default: "",
            type: String
        },

        dismissable: {
            default: false,
            type: Boolean
        }
    });
    defineEmits(["dismiss"]);

    const classes = computed((): Record<string, boolean> => ({
        "alert-dismissible": props.dismissable,
        "flex-horizontal": !props.title,
        "flex-vertical": !!props.title
    }));
</script>

<style lang="scss" scoped>
    @use "@/assets/scss/variables";

    .alert
    {
        & > .alert-heading > .fa-solid
        {
            margin-right: 0.25em;
        }
        & > .fa-solid
        {
            margin-right: 0.5em;
            margin-top: 0.15em;
        }

        &.flex
        {
            display: flex;

            &.flex-horizontal
            {
                flex-direction: row;
            }
            &.flex-vertical
            {
                flex-direction: column;
            }
        }
    }
</style>
