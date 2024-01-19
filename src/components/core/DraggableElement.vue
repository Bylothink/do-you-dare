<script lang="ts" setup>
    import { computed, reactive, ref } from "vue";
    import type { Component, PropType } from "vue";

    import { useEventListener } from "@vueuse/core";

    import { withFrame } from "@/utils";
    import type { DragEvent, Point } from "@/types";

    const props = defineProps({
        is: {
            default: "div",
            type: [String, Object] as PropType<string | Component>
        },

        x: {
            default: 0,
            type: Number
        },
        y: {
            default: 0,
            type: Number
        },

        disabled: {
            default: false,
            type: Boolean
        }
    });
    const emit = defineEmits([
        "drag",
        "move",
        "drop",

        "update:x",
        "update:y"
    ]);

    const isMoving = ref(false);
    const initialCoords = reactive({ x: 0, y: 0 });

    const classes = computed((): Record<string, boolean> => ({
        "moving": isMoving.value,
        "disabled": props.disabled
    }));
    const styles = computed((): Record<string, string> => ({
        left: `${props.x}px`,
        top: `${props.y}px`
    }));

    const _mergeTouches = (touches: TouchList): Point =>
    {
        const length = touches.length;

        if (length === 1)
        {
            const touch = touches[0];

            return { x: touch.clientX, y: touch.clientY };
        }

        const touch = { x: 0, y: 0 };

        for (let index = 0; index < length; index += 1)
        {
            touch.x += touches[index].clientX;
            touch.y += touches[index].clientY;
        }

        touch.x /= length;
        touch.y /= length;

        return touch;
    };

    const _onEventDrag = (evt: Point) =>
    {
        if (!(props.disabled))
        {
            const dragEvt: DragEvent = {
                mouse: { x: evt.x, y: evt.y },
                offset: { x: props.x, y: props.y }
            };

            isMoving.value = true;
            initialCoords.x = evt.x - props.x;
            initialCoords.y = evt.y - props.y;

            emit("drag", dragEvt);
        }
    };
    const onMouseDown = (evt: MouseEvent) =>
    {
        if (evt.button === 0)
        {
            _onEventDrag({ x: evt.clientX, y: evt.clientY });
        }
    };
    const onTouchStart = (evt: TouchEvent) =>
    {
        const touch = _mergeTouches(evt.touches);

        _onEventDrag(touch);
    };

    const _onEventMove = withFrame((evt: Point) =>
    {
        if (isMoving.value)
        {
            const x = evt.x - initialCoords.x;
            const y = evt.y - initialCoords.y;

            const dragEvt: DragEvent = {
                mouse: { x: evt.x, y: evt.y },
                offset: { x, y }
            };

            emit("move", dragEvt);

            emit("update:x", x);
            emit("update:y", y);
        }
    });

    const onMouseMove = (evt: MouseEvent) =>
    {
        _onEventMove({ x: evt.clientX, y: evt.clientY });
    };
    const onTouchMove = (evt: TouchEvent) =>
    {
        const touch = _mergeTouches(evt.touches);

        _onEventMove(touch);
    };

    const _onEventDrop = () =>
    {
        if ((isMoving.value))
        {
            isMoving.value = false;

            emit("drop");
        }
    };
    const onMouseUp = (evt: MouseEvent) =>
    {
        if (evt.button === 0)
        {
            _onEventDrop();
        }
    };
    const onTouchEnd = (evt: TouchEvent) =>
    {
        if (evt.touches.length)
        {
            onTouchMove(evt);
        }
        else
        {
            _onEventDrop();
        }
    };

    useEventListener(window, "mousemove", onMouseMove, { passive: true });
    useEventListener(window, "touchmove", onTouchMove, { passive: true });

    useEventListener(window, "mouseup", onMouseUp, { passive: true });
    useEventListener(window, "touchend", onTouchEnd, { passive: true });
</script>

<template>
    <Component :is="is"
               class="draggable"
               :class="classes"
               :style="styles"
               @mousedown.passive="onMouseDown"
               @touchstart.passive="onTouchStart">
        <slot></slot>
    </Component>
</template>

<style lang="scss" scoped>
    .draggable
    {
        cursor: grab;
        touch-action: none;

        &.moving
        {
            cursor: grabbing;
        }
        &.disabled
        {
            cursor: not-allowed;
        }
    }
</style>
