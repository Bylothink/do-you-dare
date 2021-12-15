<template>
    <Draggable class="interactive-card"
               :class="classes"
               :x="x"
               :y="y"
               :disabled="!draggable"
               @click.passive="onClick"
               @mousedown.stop
               @update:x="$emit('update:x', $event)"
               @update:y="$emit('update:y', $event)">
        <Card :facedown="facedown">
            <slot></slot>
        </Card>
    </Draggable>
</template>

<script lang="ts">
    import { computed, defineComponent } from "vue";
    import { useEventListener } from "@vueuse/core";

    import Draggable from "./core/Draggable.vue";
    import Card from "./Card.vue";

    export default defineComponent({
        name: "InteractiveCard",
        components: { Card, Draggable },
        props: {
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
        },
        emits: [
            "click:inside",
            "click:outside",

            "update:x",
            "update:y"
        ],

        setup: (props, { emit }) =>
        {
            const classes = computed((): Record<string, boolean> => ({
                "drawn": props.drawn,
                "inanimate": props.inanimate
            }));

            const onClick = (evt: MouseEvent) =>
            {
                emit("click:inside", evt);
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
                        emit("click:outside", evt);
                    }

                    mouseTarget = null;
                }
            };

            useEventListener(window, "mousedown", onMouseDown, { passive: true });
            useEventListener(window, "mouseup", onMouseUp, { passive: true });

            return { classes, onClick };
        }
    });
</script>

<style lang="scss" scoped>
    .interactive-card
    {
        border-radius: 1em;
        transition: left 200ms ease-in-out, top 200ms ease-in-out, transform 200ms ease-in-out;

        .card
        {
            box-shadow: none;
            transition: box-shadow 200ms ease-in-out, transform 200ms ease-in-out;
        }

        &.drawn
        {
            .card
            {
                box-shadow: 0px 0px 50px 1px rgba(0, 0, 0, 0.25);
            }
        }
        &.inanimate
        {
            .card
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
