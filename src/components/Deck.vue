<template>
    <div class="deck">
        <Card :draggable="isCardDraggable"
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
            const isCardDraggable = ref(false);
            const isCardSelected = ref(false);
            const isCardShown = ref(false);

            const onClickInside = (evt: MouseEvent) =>
            {
                if (!isCardSelected.value)
                {
                    isCardSelected.value = true;
                }
                else
                {
                    isCardDraggable.value = true;
                    isCardShown.value = true;
                }
            };
            const onClickOutside = (evt: MouseEvent) =>
            {
                // TODO: Cercar di capire come gestire questa menata del cambio del target durante il click.
                //
                // Si ipotizzava di utilizzare gli eventi `mousedown` e `mouseup` anziché di ascoltare per
                //  gli eventi `click`.
                //
                if (!isCardShown.value)
                {
                    isCardSelected.value = false;
                }
                else
                {
                    isCardDraggable.value = false;
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

            return { isCardDraggable, isCardShown, isCardSelected, onClickInside };
        }
    });
</script>

<style lang="scss" scoped>
</style>
