<template>
    <div class="deck">
        <Card />
        <Draggable v-model:x="cardPosition.x"
                   v-model:y="cardPosition.y"
                   :disabled="!isCardDraggable"
                   @mousedown.stop
                   @drop="onDrop">
            <Card :selected="isCardSelected"
                  :shown="isCardShown"
                  @click.passive="onClickInside">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vehicula.</p>
            </Card>
        </Draggable>
    </div>
</template>

<script lang="ts">
    import { defineComponent, onMounted, onUnmounted, reactive, ref } from "vue";

    import { DragEvent, Point } from "@/core/types";

    import Draggable from "./core/Draggable.vue";
    import Card from "./Card.vue";

    export default defineComponent({
        name: "Deck",
        components: { Card, Draggable },

        setup: () =>
        {
            const isCardDraggable = ref(false);
            const isCardSelected = ref(false);
            const isCardShown = ref(false);

            const cardPosition = reactive(new Point());

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

            const onDrop = (evt: DragEvent) =>
            {
                const x = evt.offset.x;
                const y = evt.offset.y;

                const absX = Math.abs(x);
                const absY = Math.abs(y);

                const maxX = window.innerWidth / 4;
                const maxY = window.innerHeight / 4;

                if ((absX > maxX) || (absY > maxY))
                {
                    console.log("Sei fuori!");
                    console.log("X:", evt.offset.x, "Y:", evt.offset.y);

                    cardPosition.x = 0; // x * 2;
                    cardPosition.y = 0; // y * 2;
                }
                else
                {
                    console.log("Torna al tuo posto!");

                    cardPosition.x = 0; // x * 2;
                    cardPosition.y = 0; // y * 2;
                }
            };

            return { cardPosition, isCardDraggable, isCardShown, isCardSelected, onClickInside, onDrop };
        }
    });
</script>

<style lang="scss" scoped>
    .deck
    {
        position: relative;

        & > .draggable
        {
            transition: left 200ms ease-in-out, top 200ms ease-in-out;

            &.active
            {
                transition: none;
            }
            &.disabled
            {
                cursor: pointer;
            }
        }
    }
</style>
