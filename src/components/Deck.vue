<template>
    <div class="deck">
        <Card :draggable="isCardDraggable"
              :selected="isCardSelected"
              :shown="isCardShown"
              @click.passive="onClickInside"
              @mousedown.stop>
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

            let mouseTarget: EventTarget | null = null;

            const onMouseDown = (evt: MouseEvent) =>
            {
                if (evt.button === 0)
                {
                    mouseTarget = evt.target;
                }
            };
            const onMouseUp = (evt: MouseEvent) =>
            {
                if (evt.button === 0)
                {
                    if (mouseTarget === evt.target)
                    {
                        if (!isCardShown.value)
                        {
                            isCardSelected.value = false;
                        }
                        else
                        {
                            isCardDraggable.value = false;
                            isCardShown.value = false;
                        }
                    }

                    mouseTarget = null;
                }
            };

            onMounted(() =>
            {
                window.addEventListener("mousedown", onMouseDown, { passive: true });
                window.addEventListener("mouseup", onMouseUp, { passive: true });
            });
            onUnmounted(() =>
            {
                window.removeEventListener("mouseup", onMouseUp);
                window.removeEventListener("mousedown", onMouseDown);
            });

            return { isCardDraggable, isCardShown, isCardSelected, onClickInside };
        }
    });
</script>

<style lang="scss" scoped>
</style>
