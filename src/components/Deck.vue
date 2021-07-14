<template>
    <div class="deck">
        <Card disabled />
        <Card ref="firstCard"
              class="interactive"
              :selected="isCardSelected"
              :shown="isCardShown"
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
            const isCardShown = ref(false);

            // SMELLS: 'sta cosa, probabilmente, dovrebbe essere gestita direttamente all'interno
            //          del componente Card...
            //         Da capire se lasciarla qui o spostarla al suo interno.
            //
            const onClickInside = (evt: MouseEvent) =>
            {
                if (!isCardSelected.value)
                {
                    isCardSelected.value = true;
                }
                else
                {
                    isCardShown.value = true;
                }
            };
            const onClickOutside = (evt: MouseEvent) =>
            {
                if (!isCardShown.value)
                {
                    isCardSelected.value = false;
                }
                else
                {
                    isCardShown.value = false;
                }
            };

            onMounted(() =>
            {
                window.addEventListener("click", onClickOutside);
            });
            onUnmounted(() =>
            {
                window.removeEventListener("click", onClickOutside);
            });

            return { isCardShown, isCardSelected, onClickInside };
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
