<template>
    <div class="deck">
        <Card hole />
        <InteractiveCard v-model:x="cardPosition.x"
                         v-model:y="cardPosition.y"
                         :class="classes"
                         :draggable="isCardDraggable"
                         :drawn="hasCardBeenDrawn"
                         :hole="isCardHole"
                         :inanimate="isCardInanimate"
                         :style="styles"
                         @click:inside="onClickInside"
                         @click:outside="onClickOutside"
                         @drag="onDrag"
                         @drop="onDrop">
            <div class="content">
                <p>{{ card.text }}</p>
            </div>
        </InteractiveCard>
    </div>
</template>

<script lang="ts">
    import { computed, defineComponent, reactive, ref } from "vue";

    import { nextFrame, waitTimeout } from "@/core/utils";
    import { DragEvent } from "@/core/types";

    import { Card as CardModel } from "@/models";

    import Card from "./Card.vue";
    import InteractiveCard from "./InteractiveCard.vue";

    export default defineComponent({
        name: "Deck",
        components: { Card, InteractiveCard },
        props: {
            card: {
                default: () => new CardModel("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vehicula."),
                type: CardModel
            }
        },
        emits: ["fold"],

        setup: (props, { emit }) =>
        {
            const hasCardBeenDrawn = ref(false);
            const isCardDraggable = ref(false);
            const isCardHole = ref(true);
            const isCardInanimate = ref(false);

            const isCardBeingDragged = ref(false);

            const cardPosition = reactive({ x: 0, y: 0 });

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

            const reset = async () =>
            {
                emit("fold");

                isCardInanimate.value = true;

                await nextFrame();

                hasCardBeenDrawn.value = false;
                isCardDraggable.value = false;
                isCardHole.value = true;

                cardPosition.x = 0;
                cardPosition.y = 0;

                await nextFrame();

                isCardInanimate.value = false;
            };

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
            const onClickOutside = (evt: MouseEvent) =>
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
            };

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
                    // SMELLS: Questi valori "a caso" non vanno bene!
                    //         Trovare una logica migliore per impostare i valori di "uscita" della `Card`.
                    //
                    cardPosition.x = x * 3;
                    cardPosition.y = y * 3;

                    waitTimeout(200)
                        .then(reset);
                }
                else
                {
                    cardPosition.x = 0;
                    cardPosition.y = 0;
                }

                isCardBeingDragged.value = false;
            };

            return {
                cardPosition,
                classes,
                hasCardBeenDrawn,
                isCardDraggable,
                isCardHole,
                isCardInanimate,
                styles,

                onClickInside,
                onClickOutside,
                onDrag,
                onDrop
            };
        }
    });
</script>

<style lang="scss" scoped>
    .deck
    {
        position: relative;

        & > .card
        {
            width: 298px;
        }
        & > .interactive-card
        {
            width: 300px;

            &.disabled
            {
                cursor: pointer;
            }
            &.drawn
            {
                transform: translateX(5px) translateY(-7.5px) rotateZ(-1deg);
            }

            .content
            {
                padding: 0.5em 1em;
            }
        }
    }
</style>
