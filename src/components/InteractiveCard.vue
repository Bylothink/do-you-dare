<template>
    <DraggableElement class="interactive-card"
                      :class="classes"
                      :x="x"
                      :y="y"
                      :disabled="!draggable"
                      @click.passive="onClick"
                      @mousedown.stop
                      @update:x="$emit('update:x', $event)"
                      @update:y="$emit('update:y', $event)">
        <GameCard :facedown="facedown">
            <slot></slot>
        </GameCard>
    </DraggableElement>
</template>

<script lang="ts" setup>
    import { computed } from "vue";
    import { useEventListener } from "@vueuse/core";

    import DraggableElement from "./core/DraggableElement.vue";
    import GameCard from "./GameCard.vue";

    const props = defineProps({
        x: {
            default: 0,
            type: Number
        },
        y: {
            default: 0,
            type: Number
        },

        draggable: {
            default: false,
            type: Boolean
        },
        drawn: {
            default: false,
            type: Boolean
        },
        facedown: {
            default: false,
            type: Boolean
        },
        inanimate: {
            default: false,
            type: Boolean
        }
    });
    const emit = defineEmits([
        "click:inside",
        "click:outside",

        "update:x",
        "update:y"
    ]);

    const classes = computed((): Record<string, boolean> => ({
        "drawn": props.drawn,
        "inanimate": props.inanimate
    }));

    const onClick = (evt: MouseEvent) => emit("click:inside", evt);

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
                emit("click:outside", evt);
            }

            mouseTarget = null;
        }
    };

    useEventListener(window, "mousedown", onMouseDown, { passive: true });
    useEventListener(window, "mouseup", onMouseUp, { passive: true });
</script>

<style lang="scss" scoped>
    .interactive-card
    {
        border-radius: 1em;
        transition: left 200ms ease-in-out, top 200ms ease-in-out, transform 200ms ease-in-out;

        .game-card
        {
            box-shadow: none;
            transition: box-shadow 200ms ease-in-out, transform 200ms ease-in-out;
        }

        &.drawn
        {
            .game-card
            {
                box-shadow: 0px 0px 50px 1px rgba(0, 0, 0, 0.25);
            }
        }
        &.inanimate
        {
            .game-card
            {
                transition: none;

                &:deep(.face)
                {
                    transition: none;
                }
            }
        }
        &.inanimate,
        &.moving
        {
            transition: none;
        }
    }
</style>
