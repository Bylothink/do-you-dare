<script lang="ts" setup>
</script>

<template>
    <div class="game-logo">
        <span class="piece piece--bottom"></span>
        <span class="piece piece--top"></span>
    </div>
</template>

<style lang="scss" scoped>
    .game-logo
    {
        align-items: center;
        display: flex;
        isolation: isolate;
        justify-content: center;
        position: relative;

        & > .piece
        {
            aspect-ratio: 5 / 7;
            border-radius: 0.5em;
            margin: auto;

            // mix-blend-mode: multiply;
            mix-blend-mode: screen;     // *

            pointer-events: all;
            position: absolute;
            width: 100px;

            &.piece--bottom
            {
                background-color: #00FFFF;
                background-image: linear-gradient(-5deg, rgba(0, 0, 255, 0.5),
                                                         rgba(0, 255, 255, 0),
                                                         rgba(0, 255, 0, 0.5));

                box-shadow: inset 0px 0px 0px 1px rgba(0, 0, 0, 0.2);
                transform: rotate(5deg) translateX(0.5em) translateY(-0.5em);
                z-index: -1;
            }
            &.piece--top
            {
                background-color: #FF00FF;
                background-image: linear-gradient(185deg, rgba(0, 0, 255, 0.5),
                                                          rgba(255, 0, 255, 0),
                                                          rgba(255, 0, 0, 0.5));

                box-shadow: inset 0px 0px 0px 1px rgba(0, 0, 0, 0.2);
                transform: rotate(-5deg) translateX(-0.5em) translateY(0.5em);
                z-index: 1;
            }
        }
    }
</style>
