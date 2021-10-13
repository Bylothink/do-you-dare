<template>
    <button class="round-button">
        <span class="spacer"></span>
        <div class="content">
            <p>
                <span class="pippo">
                    <div class="content">
                    </div>
                </span>
            </p>
            <slot></slot>
        </div>
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
            bottom: 0px;
            left: 0px;
            position: absolute;
            right: 0px;
            top: 0px;
        }
    }
</style>
