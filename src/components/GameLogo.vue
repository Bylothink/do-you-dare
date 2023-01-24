<script lang="ts" setup>
</script>

<template>
    <div class="game-logo">
        <span class="card-1"></span>
        <span class="card-2"></span>
    </div>
</template>

<style lang="scss" scoped>
    .game-logo
    {
        isolation: isolate;
    }

    .card-1
    {
        background-color: aqua;

        position: absolute;
        top: 45%;
        left: 45.5%;

        aspect-ratio: 2.5 / 3.5;
        width: 100px;

        // mix-blend-mode: multiply;
        mix-blend-mode: screen;     // *
        // mix-blend-mode: difference;
        // mix-blend-mode: exclusion;
    }
    .card-2
    {
        background-color: darkviolet;

        position: absolute;
        bottom: 45%;
        right: 45.5%;

        aspect-ratio: 2.5 / 3.5;
        width: 100px;

        // mix-blend-mode: multiply;
        mix-blend-mode: screen;     // *
        // mix-blend-mode: difference;
        // mix-blend-mode: exclusion;
    }
</style>
