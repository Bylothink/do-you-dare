<template>
    <div class="deck">
        <Card disabled />
        <Card ref="firstCard"
              class="interactive"
              :active="isCardActive"
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
            const isCardActive = ref(false);
            const isCardSelected = ref(false);

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
                    isCardActive.value = true;
                }
            };
            const onClickOutside = (evt: MouseEvent) =>
            {
                if (!isCardActive.value)
                {
                    isCardSelected.value = false;
                }
                else
                {
                    isCardActive.value = false;
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

            return { isCardActive, isCardSelected, onClickInside };
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
