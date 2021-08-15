<template>
    <div class="deck">
        <Card hole />
        <Draggable v-model:x="cardPosition.x"
                   v-model:y="cardPosition.y"
                   :class="classes"
                   :disabled="!isCardDraggable"
                   :style="styles"
                   @drag="onDrag"
                   @mousedown.stop
                   @drop="onDrop">
            <Card :drawn="hasCardBeenDrawn"
                  :hole="isCardHole"
                  @click.passive="onClickInside">
                <div class="content">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vehicula.</p>
                </div>
            </Card>
        </Draggable>
    </div>
</template>

<script lang="ts">
    import { computed, defineComponent, onMounted, onUnmounted, reactive, ref } from "vue";

    import { DragEvent, Point } from "@/core/types";

    import Draggable from "./core/Draggable.vue";
    import Card from "./Card.vue";

    export default defineComponent({
        name: "Deck",
        components: { Card, Draggable },

        setup: () =>
        {
            const isCardDraggable = ref(false);
            const hasCardBeenDrawn = ref(false);
            const isCardHole = ref(true);

            const isCardBeingDragged = ref(false);

            const cardPosition = reactive(new Point());

            const classes = computed((): Record<string, boolean> => ({ "drawn": hasCardBeenDrawn.value }));
            const styles = computed((): Record<string, string> =>
            {
                let transform = "";

                if (!isCardHole.value)
                {
                    transform += `scale(1.25)`;
                }

                if (isCardBeingDragged.value)
                {
                    transform += `rotateX(${cardPosition.y / 25}deg) ` +
                        `rotateY(${cardPosition.x / 25}deg)` +
                        `rotateZ(${cardPosition.x / 50}deg)`;
                }

                return { transform };
            });

            const onClickInside = (evt: MouseEvent) =>
            {
                if (!hasCardBeenDrawn.value)
                {
                    hasCardBeenDrawn.value = true;
                }
                else
                {
                    isCardDraggable.value = true;
                    isCardHole.value = false;
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
                        if (isCardHole.value)
                        {
                            hasCardBeenDrawn.value = false;
                        }
                        else
                        {
                            isCardDraggable.value = false;
                            isCardHole.value = true;
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

            const onDrag = (evt: DragEvent) =>
            {
                isCardBeingDragged.value = true;
            };
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

                isCardBeingDragged.value = false;
            };

            return { cardPosition, classes, isCardDraggable, isCardHole, hasCardBeenDrawn, onClickInside, onDrag, onDrop, styles };
        }
    });
</script>

<style lang="scss" scoped>
    .deck
    {
        position: relative;

        & > .draggable
        {
            border-radius: 1em;
            transition: left 200ms ease-in-out, top 200ms ease-in-out, transform 200ms ease-in-out;

            &.active
            {
                transition: none;
            }
            &.disabled
            {
                cursor: pointer;
            }
            &.drawn
            {
                transform: translateX(5px) translateY(-7.5px) rotateZ(-1deg);
            }

            & > .card
            {
                .content
                {
                    padding: 0.5em 1em;
                }
            }
        }

        .card
        {
            width: 18.75em;
        }
    }
</style>
