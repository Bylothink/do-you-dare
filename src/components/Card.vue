<template>
    <div class="card"
         :class="classes"
         :style="styles"
         @mousedown="onMouseDown">
        <div class="spacer"></div>
        <div class="content back-face">
            <img alt="Vue logo" src="@/assets/images/logo.png" />
        </div>
        <div class="content front-face">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
    import { computed, defineComponent, onMounted, onUnmounted, reactive, ref } from "vue";

    export default defineComponent({
        name: "Card",
        props: {
            draggable: {
                default: false,
                type: Boolean
            },
            selected: {
                default: false,
                type: Boolean
            },
            shown: {
                default: false,
                type: Boolean
            }
        },

        setup: (props) =>
        {
            let initialCoords = { x: 0, y: 0 };

            const isGrabbed = ref(false);
            const offset = reactive({ x: 0, y: 0 });

            const classes = computed((): Record<string, boolean> => ({
                "draggable": props.draggable,
                "selected": props.selected,
                "shown": props.shown
            }));
            const styles = computed((): Record<string, string> =>
            {
                const _styles: Record<string, string> = { transform: "" };

                if (props.draggable)
                {
                    _styles.transform = `translateX(${offset.x}px) translateY(${offset.y}px) ` +
                        `rotateX(${offset.y / 25}deg) rotateY(${offset.x / 25}deg) rotateZ(${offset.x / 50}deg)`;
                }

                if (props.shown)
                {
                    _styles.transform += " scale(1.25) rotateY(180deg)";
                }
                else if (props.selected)
                {
                    _styles.transform += " translateX(5px) translateY(-7.5px) rotateZ(-1deg)";
                }

                return _styles;
            });

            const onMouseDown = (evt: MouseEvent) =>
            {
                if ((props.draggable) && (evt.button === 0))
                {
                    isGrabbed.value = true;
                    initialCoords = { x: evt.clientX, y: evt.clientY };
                }
            };
            const onMouseMove = (evt: MouseEvent) =>
            {
                if (isGrabbed.value)
                {
                    offset.x = evt.clientX - initialCoords.x;
                    offset.y = evt.clientY - initialCoords.y;
                }
            };
            const onMouseUp = (evt: MouseEvent) =>
            {
                if (evt.button === 0)
                {
                    isGrabbed.value = false;

                    offset.x = 0;
                    offset.y = 0;
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

            return { classes, styles, isGrabbed, onMouseDown };
        }
    });
</script>

<style lang="scss" scoped>
    .card
    {
        background-color: #FFFFFF;
        border: 1px solid #000000;
        border-radius: 1em;
        box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.25);
        cursor: pointer;
        position: relative;
        transition: box-shadow 200ms ease-in-out, transform 200ms ease-in-out;
        user-select: none;
        width: 18.75em;

        & > .spacer
        {
            padding: 70% 0px;
        }
        & > .content
        {
            align-items: center;
            bottom: 0px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            left: 0px;
            position: absolute;
            right: 0px;
            text-align: center;
            top: 0px;
            transition: opacity 0ms linear 100ms;

            & > img
            {
                pointer-events: none;
            }

            &.front-face
            {
                opacity: 0;
                padding: 0.5em 1em;
                transform: rotateY(180deg);
            }
        }

        &.draggable
        {
            cursor: grab;

            &:active
            {
                cursor: grabbing;
                transition: box-shadow 200ms ease-in-out;
            }
        }
        &.selected
        {
            box-shadow: 0px 0px 50px 1px rgba(0, 0, 0, 0.25);

            &.shown
            {
                & > .back-face
                {
                    opacity: 0;
                }
                & > .front-face
                {
                    opacity: 1;
                }
            }
        }
    }
</style>
