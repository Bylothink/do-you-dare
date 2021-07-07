<template>
    <div class="deck">
        <Card disabled />
        <Card ref="firstCard"
              class="interactive"
              :selected="isCardSelected"
              @click.stop="onClickInside">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vehicula.</p>
        </Card>
    </div>
</template>

<script lang="ts">
    import { defineComponent, onMounted, onUnmounted, ref } from "vue";

    import Card from "./Card.vue";

    export default defineComponent({
        name: "Deck",
        components: { Card },

        setup: () =>
        {
            const isCardSelected = ref(false);

            const onClickInside = (evt: MouseEvent) => { isCardSelected.value = true; };
            const onClickOutside = (evt: MouseEvent) => { isCardSelected.value = false; };

            onMounted(() =>
            {
                window.addEventListener("click", onClickOutside);
            });
            onUnmounted(() =>
            {
                window.removeEventListener("click", onClickOutside);
            });

            return { isCardSelected, onClickInside };
        }
    });
</script>

<style lang="scss" scoped>
    .deck
    {
        position: relative;

        & > .card.interactive
        {
            position: absolute;
            top: 0px;
        }
    }
</style>
