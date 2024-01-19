<script lang="ts" setup>
    import { computed } from "vue";

    import GameLogo from "./GameLogo.vue";

    const props = defineProps({
        facedown: {
            default: false,
            type: Boolean
        }
    });

    const classes = computed((): Record<string, boolean> => ({ "facedown": props.facedown }));
</script>

<template>
    <div class="game-card" :class="classes">
        <div class="face back">
            <GameLogo />
        </div>
        <div class="face front">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @use "@/assets/scss/variables";

    .game-card
    {
        aspect-ratio: 5 / 7;
        background-color: variables.$not-quite-black;
        border: 1px solid rgba(0, 0, 0, 0.5);
        border-radius: 1em;
        box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.25);
        position: relative;
        transform-style: preserve-3d;
        user-select: none;

        & > .face
        {
            align-items: center;
            bottom: 0px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            left: 0px;
            position: absolute;
            right: 0px;
            text-align: center;
            top: 0px;
            transition: opacity 0ms linear 100ms;

            & > img
            {
                pointer-events: none;
            }

            &.back
            {
                opacity: 0;
                transform: rotateY(180deg);
            }
        }

        &.facedown
        {
            transform: rotateY(180deg);

            & > .face.back
            {
                opacity: 1;
            }
            & > .face.front
            {
                opacity: 0;
            }
        }
    }
</style>
