<template>
    <div class="deck">
        <Card hole />
        <InteractiveCard v-model:x="cardPosition.x"
                         v-model:y="cardPosition.y"
                         :class="classes"
                         :draggable="isCardDraggable"
                         :drawn="hasCardBeenDrawn"
                         :hole="isCardHole"
                         :style="styles"
                         @click:inside="onClickInside"
                         @click:outside="onClickOutside"
                         @drag="onDrag"
                         @drop="onDrop">
            <div class="content">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vehicula.</p>
            </div>
        </InteractiveCard>
    </div>
</template>

<script lang="ts">
    import { computed, defineComponent, reactive, ref } from "vue";

    import { DragEvent, Point } from "@/core/types";

    import Card from "./Card.vue";
    import InteractiveCard from "./InteractiveCard.vue";

    export default defineComponent({
        name: "Deck",
        components: { Card, InteractiveCard },

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
                    console.log("Sei fuori!");

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

            return {
                cardPosition,
                classes,
                isCardDraggable,
                isCardHole,
                hasCardBeenDrawn,
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
