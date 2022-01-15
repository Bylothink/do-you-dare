<template>
    <Component :is="tag"
               class="round-button"
               v-bind="properties">
        <span class="spacer"></span>
        <div class="content">
            <slot></slot>
        </div>
    </Component>
</template>

<script lang="ts">
    import { computed, defineComponent } from "vue";

    export default defineComponent({
        name: "RoundButton",
        props: {
            href: {
                default: "",
                type: String
            }
        },

        setup: (props) =>
        {
            const tag = computed((): string => props.href ? "a" : "button");
            const properties = computed((): Record<string, string> => props.href ? { "href": props.href } : { });

            return { tag, properties };
        }
    });
</script>

<style lang="scss" scoped>
    .round-button
    {
        border-radius: 100%;
        padding: 0px;
        position: relative;
        width: 2em;

        & > .spacer
        {
            display: block;
            padding: 50% 0px;
        }
        & > .content
        {
            align-items: center;
            bottom: 0px;
            display: flex;
            justify-content: center;
            left: 0px;
            position: absolute;
            right: 0px;
            top: 0px;
        }
    }
</style>
