<template>
    <a v-if="href"
       class="round-button"
       :href="href">
        <slot></slot>
    </a>
    <button v-else class="round-button">
        <slot></slot>
    </button>
</template>

<script lang="ts">
    import { defineComponent } from "vue";

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
            return { };
        }
    });
</script>

<style lang="scss" scoped>
    .round-button
    {
        background-image: linear-gradient(90deg, #e66465, #9198e5);
        border: 1px solid rgba(0, 0, 0, 0.25);
        border-radius: 1.5em;
        box-shadow: 0px 0px 0.25em 0.125em rgba(0, 0, 0, 0.25);
        color: #FFFFFF;
        display: inline-block;
        font-weight: bold;
        padding: 0.5em 1em;
        transition: box-shadow 250ms ease-in-out, border-radius 125ms ease-in-out;
        text-decoration: none;

        &:hover
        {
            border-radius: 1.5em 3em;
            box-shadow: 0px 0px 1em 0.5em rgba(0, 0, 0, 0.25);
        }
    }
</style>
