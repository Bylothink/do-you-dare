<template>
    <div class="draggable-element"
         :class="classes"
         :style="styles"
         @mousedown.passive="onMouseDown"
         @touchstart.passive="onTouchStart">
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
    import { computed, reactive, ref, onUnmounted } from "vue";
    import { useEventListener } from "@vueuse/core";

    import { DragEvent, Point } from "@/core/types";

    const props = defineProps({
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

    const onEventDown = (evt: Point) =>
    {
        if (!props.disabled)
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
            onEventDown({ x: evt.clientX, y: evt.clientY });
        }
    };
    const onTouchStart = (evt: TouchEvent) =>
    {
        if (evt.touches.length === 1)
        {
            const touch = evt.touches[0];

            onEventDown({ x: touch.clientX, y: touch.clientY });
        }
    };

    //
    // TODO: Creare un helper / debouncer per gestire
    //        correttamente il movimento della carta.
    //
    let _requestId: number | null = null;
    let _mousePosition: Point = { x: 0, y: 0 };

    const _requestCallback = () =>
    {
        if (_requestId)
        {
            const x = _mousePosition.x - initialCoords.x;
            const y = _mousePosition.y - initialCoords.y;

            const dragEvt: DragEvent = {
                mouse: { x: _mousePosition.x, y: _mousePosition.y },
                offset: { x, y }
            };

            emit("move", dragEvt);

            emit("update:x", x);
            emit("update:y", y);

            _requestId = null;
        }
    };
    const onEventMove = (evt: Point) =>
    {
        if (isMoving.value)
        {
            _mousePosition = evt;

            if (!_requestId)
            {
                _requestId = requestAnimationFrame(_requestCallback);
            }
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
        if ((isMoving.value))
        {
            isMoving.value = false;

            if (_requestId)
            {
                cancelAnimationFrame(_requestId);
            }

            _requestId = null;

            emit("drop");
        }
    };
    const onMouseUp = (evt: MouseEvent) =>
    {
        if (evt.button === 0)
        {
            onEventUp();
        }
    };
    const onTouchEnd = (evt: TouchEvent) =>
    {
        // TODO: Cosa succede se ho sollevato un dito diverso dal primo?
        //
        onEventUp();
    };

    useEventListener(window, "mousemove", onMouseMove, { passive: true });
    useEventListener(window, "touchmove", onTouchMove, { passive: true });

    useEventListener(window, "mouseup", onMouseUp, { passive: true });
    useEventListener(window, "touchend", onTouchEnd, { passive: true });

    onUnmounted(() =>
    {
        if (_requestId)
        {
            cancelAnimationFrame(_requestId);
        }

        _requestId = null;
    });
</script>

<style lang="scss" scoped>
    .draggable-element
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
