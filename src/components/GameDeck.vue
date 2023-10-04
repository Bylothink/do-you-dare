<template>
    <div class="deck">
        <GameCard facedown />
        <InteractiveCard v-model:x="cardPosition.x"
                         v-model:y="cardPosition.y"
                         :class="classes"
                         :draggable="isCardDraggable"
                         :drawn="hasCardBeenDrawn"
                         :facedown="isCardFacedown"
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

<script lang="ts" setup>
    import { computed, reactive, ref } from "vue";
    import { delay, nextAnimationFrame } from "@byloth/core";

    import { Card } from "@/models";
    import type { DragEvent } from "@/types";

    import GameCard from "./GameCard.vue";
    import InteractiveCard from "./InteractiveCard.vue";

    defineProps({
        card: {
            default: () => Card.Empty,
            type: Card
        }
    });
    const emit = defineEmits(["draw", "fold"]);

    const hasCardBeenDrawn = ref(false);
    const isCardDraggable = ref(false);
    const isCardFacedown = ref(true);
    const isCardInanimate = ref(false);

    const isCardBeingDragged = ref(false);

    const cardPosition = reactive({ x: 0, y: 0 });

    const classes = computed((): Record<string, boolean> => ({ "inanimate": isCardInanimate.value }));
    const styles = computed((): Record<string, string> =>
    {
        if (!isCardFacedown.value)
        {
            let transform = `scale(1.25)`;

            if (isCardBeingDragged.value)
            {
                const filter = `brightness(${(cardPosition.y / 12.5) + 100}%)`;

                transform += `rotateX(${cardPosition.y / 25}deg) ` +
                    `rotateY(${-cardPosition.x / 25}deg)` +
                    `rotateZ(${cardPosition.x / 50}deg)`;

                return { filter, transform };
            }

            return { transform };
        }

        return { };
    });

    const reset = async () =>
    {
        emit("fold");

        isCardInanimate.value = true;

        await nextAnimationFrame();

        hasCardBeenDrawn.value = false;
        isCardDraggable.value = false;
        isCardFacedown.value = true;

        cardPosition.x = 0;
        cardPosition.y = 0;

        await nextAnimationFrame();

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
    const onDrop = () =>
    {
        const x = cardPosition.x;
        const y = cardPosition.y;

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

            delay(200)
                .then(reset);
        }
        else
        {
            cardPosition.x = 0;
            cardPosition.y = 0;
        }

        isCardBeingDragged.value = false;
    };
</script>

<style lang="scss" scoped>
    @use "@/assets/scss/variables";

    .deck
    {
        perspective: 1024px;
        position: relative;

        & > .game-card
        {
            width: variables.$card-width;
            &.interactive
            {
                position: absolute;
                transition: box-shadow 200ms ease-in-out,
                            left 200ms ease-in-out,
                            top 200ms ease-in-out,
                            filter 200ms ease-in-out,
                            transform 200ms ease-in-out;

                .content
                {
                    padding: 0.5em 1em;
                }

                &.disabled
                {
                    cursor: pointer;
                }
                &.drawn
                {
                    transform: translateX(5px) translateY(-7.5px) rotateZ(-1deg) rotateY(180deg);
                }
                &.moving,
                &.inanimate
                {
                    transition: none;

                    &:deep(.face)
                    {
                        transition: none;
                    }
                }
            }
        }
    }
</style>
