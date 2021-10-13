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
        <Card :drawn="drawn"
              :facedown="facedown"
              :inanimate="inanimate">
            <slot></slot>
        </Card>
    </Draggable>
</template>

<script lang="ts">
    import { computed, defineComponent, onMounted, onUnmounted } from "vue";

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
            const classes = computed((): Record<string, boolean> => ({ "inanimate": props.inanimate }));

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

            return { classes, onClick };
        }
    });
</script>

<style lang="scss" scoped>
    .interactive-card
    {
        border-radius: 1em;
        transition: left 200ms ease-in-out, top 200ms ease-in-out, transform 200ms ease-in-out;

        &.inanimate,
        &.moving
        {
            transition: none;
        }
    }
</style>
