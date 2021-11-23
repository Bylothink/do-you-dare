<template>
    <div class="deck">
        <CardElement facedown />
        <InteractiveCard v-model:x="cardPosition.x"
                         v-model:y="cardPosition.y"
                         :draggable="isCardDraggable"
                         :drawn="hasCardBeenDrawn"
                         :facedown="isCardFacedown"
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

    import { Card } from "@/models";

    import CardElement from "./Card.vue";
    import InteractiveCard from "./InteractiveCard.vue";

    export default defineComponent({
        name: "Deck",
        components: { CardElement, InteractiveCard },
        props: {
            card: {
                default: () => Card.Empty,
                type: Card
            }
        },
        emits: ["draw", "fold"],

        setup: (props, { emit }) =>
        {
            const hasCardBeenDrawn = ref(false);
            const isCardDraggable = ref(false);
            const isCardFacedown = ref(true);
            const isCardInanimate = ref(false);

            const isCardBeingDragged = ref(false);

            const cardPosition = reactive({ x: 0, y: 0 });

            const styles = computed((): Record<string, string> =>
            {
                let transform = "";

                if (!isCardFacedown.value)
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
                isCardFacedown.value = true;

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
                    if (isCardFacedown.value)
                    {
                        emit("draw");
                    }

                    isCardDraggable.value = true;
                    isCardFacedown.value = false;
                }
            };
            const onClickOutside = (evt: MouseEvent) =>
            {
                if (isCardFacedown.value)
                {
                    hasCardBeenDrawn.value = false;
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
                hasCardBeenDrawn,
                isCardDraggable,
                isCardFacedown,
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
    @use "@/assets/scss/variables";

    .deck
    {
        position: relative;

        & > .card,
        & > .interactive-card
        {
            width: variables.$card-width;
        }

        & > .interactive-card
        {
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
