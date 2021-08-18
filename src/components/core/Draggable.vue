<template>
    <div class="draggable"
         :class="classes"
         :style="styles"
         @mousedown.passive="onMouseDown">
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import { computed, defineComponent, onMounted, onUnmounted, reactive, ref } from "vue";

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
            const initialCoords = reactive(new Point());

            const classes = computed((): Record<string, boolean> => ({
                "moving": isMoving.value,
                "disabled": props.disabled
            }));
            const styles = computed((): Record<string, string> => ({ left: `${props.x}px`, top: `${props.y}px` }));

            const onMouseDown = (evt: MouseEvent) =>
            {
                if ((!props.disabled) && (evt.button === 0))
                {
                    const dragEvt: DragEvent = {
                        mouse: new Point(evt.clientX, evt.clientY),
                        offset: new Point(props.x, props.y)
                    };

                    isMoving.value = true;
                    initialCoords.x = evt.clientX - props.x;
                    initialCoords.y = evt.clientY - props.y;

                    emit("drag", dragEvt);
                }
            };

            const onMouseMove = (evt: MouseEvent) =>
            {
                if (isMoving.value)
                {
                    const x = evt.clientX - initialCoords.x;
                    const y = evt.clientY - initialCoords.y;

                    const dragEvt: DragEvent = {
                        mouse: new Point(evt.clientX, evt.clientY),
                        offset: new Point(x, y)
                    };

                    emit("move", dragEvt);

                    emit("update:x", x);
                    emit("update:y", y);
                }
            };
            const onMouseUp = (evt: MouseEvent) =>
            {
                if ((isMoving.value) && (evt.button === 0))
                {
                    const dragEvt: DragEvent = {
                        mouse: new Point(evt.clientX, evt.clientY),
                        offset: new Point(props.x, props.y)
                    };

                    isMoving.value = false;

                    emit("drop", dragEvt);
                }
            };

            onMounted(() =>
            {
                window.addEventListener("mousemove", onMouseMove, { passive: true });
                window.addEventListener("mouseup", onMouseUp, { passive: true });
            });
            onUnmounted(() =>
            {
                window.removeEventListener("mouseup", onMouseUp);
                window.removeEventListener("mousemove", onMouseMove);
            });

            return { classes, styles, onMouseDown };
        }
    });
</script>

<style lang="scss" scoped>
    .draggable
    {
        cursor: grab;
        position: absolute;

        &.active
        {
            cursor: grabbing;
        }
        &.disabled
        {
            cursor: not-allowed;
        }
    }
</style>
