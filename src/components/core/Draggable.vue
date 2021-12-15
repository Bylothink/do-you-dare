<template>
    <div class="draggable"
         :class="classes"
         :style="styles"
         @mousedown.passive="onMouseDown"
         @touchstart.passive="onTouchStart">
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import { computed, defineComponent, reactive, ref } from "vue";
    import { useEventListener } from "@vueuse/core";

    import { DragEvent, Point } from "@/core/types";

    export default defineComponent({
        name: "Draggable",
        props: {
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
        },
        emits: [
            "drag",
            "move",
            "drop",

            "update:x",
            "update:y"
        ],

        setup: (props, { emit }) =>
        {
            const isMoving = ref(false);
            const initialCoords = reactive({ x: 0, y: 0 });

            const classes = computed((): Record<string, boolean> => ({
                "moving": isMoving.value,
                "disabled": props.disabled
            }));
            const styles = computed((): Record<string, string> => ({ left: `${props.x}px`, top: `${props.y}px` }));

            const onEventDown = (evt: Point) =>
            {
                const dragEvt: DragEvent = {
                    mouse: { x: evt.x, y: evt.y },
                    offset: { x: props.x, y: props.y }
                };

                isMoving.value = true;
                initialCoords.x = evt.x - props.x;
                initialCoords.y = evt.y - props.y;

                emit("drag", dragEvt);
            };
            const onMouseDown = (evt: MouseEvent) =>
            {
                if ((!props.disabled) && (evt.button === 0))
                {
                    onEventDown({ x: evt.clientX, y: evt.clientY });
                }
            };
            const onTouchStart = (evt: TouchEvent) =>
            {
                if ((!props.disabled) && (evt.touches.length === 1))
                {
                    const touch = evt.touches[0];

                    onEventDown({ x: touch.clientX, y: touch.clientY });
                }
            };

            const onEventMove = (evt: Point) =>
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
            };
            const onMouseMove = (evt: MouseEvent) =>
            {
                onEventMove({ x: evt.clientX, y: evt.clientY });
            };
            const onTouchMove = (evt: TouchEvent) =>
            {
                if (evt.touches.length === 1)
                {
                    const touch = evt.touches[0];

                    onEventMove({ x: touch.clientX, y: touch.clientY });
                }
            };

            const onEventUp = () =>
            {
                isMoving.value = false;

                emit("drop");
            };
            const onMouseUp = (evt: MouseEvent) =>
            {
                if ((isMoving.value) && (evt.button === 0))
                {
                    onEventUp();
                }
            };
            const onTouchEnd = (evt: TouchEvent) =>
            {
                if ((isMoving.value))
                {
                    onEventUp();
                }
            };

            useEventListener(window, "mousemove", onMouseMove, { passive: true });
            useEventListener(window, "touchmove", onTouchMove, { passive: true });

            useEventListener(window, "mouseup", onMouseUp, { passive: true });
            useEventListener(window, "touchend", onTouchEnd, { passive: true });

            return { classes, styles, onMouseDown, onTouchStart };
        }
    });
</script>

<style lang="scss" scoped>
    .draggable
    {
        cursor: grab;
        position: absolute;

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
