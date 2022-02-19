<template>
    <DraggableElement :is="GameCard"
                      class="interactive"
                      :class="classes"
                      :x="x"
                      :y="y"
                      :disabled="!draggable"
                      @click.passive="onClick"
                      @drag="$emit('drag', $event)"
                      @drop="$emit('drop', $event)"
                      @mousedown.stop
                      @touchstart.prevent="onClick"
                      @update:x="$emit('update:x', $event)"
                      @update:y="$emit('update:y', $event)">
        <slot></slot>
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
        }
    });
    const emit = defineEmits([
        "click:inside",
        "click:outside",

        "drag",
        "drop",

        "update:x",
        "update:y"
    ]);

    const classes = computed((): Record<string, boolean> => ({ "drawn": props.drawn }));

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
    .interactive
    {
        border-radius: 1em;
        box-shadow: none;

        &.drawn
        {
            box-shadow: 0px 0px 50px 1px rgba(0, 0, 0, 0.25);
        }
    }
</style>
