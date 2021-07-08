<template>
    <div ref="element"
         class="card"
         :class="classes">
        <div class="spacer"></div>
        <div class="back content">
            <img alt="Vue logo" src="@/assets/images/logo.png" />
        </div>
        <div class="front content">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
    import { computed, defineComponent, onMounted, onUnmounted, ref } from "vue";

    export default defineComponent({
        name: "Card",
        props: {
            active: {
                default: false,
                type: Boolean
            },
            disabled: {
                default: false,
                type: Boolean
            },
            selected: {
                default: false,
                type: Boolean
            }
        },

        setup: (props) =>
        {
            const element = ref<HTMLDivElement>();

            const isClicked = ref(false);
            const initialCoords = ref({ x: 0, y: 0 });

            const classes = computed((): Record<string, boolean> => ({
                "active": props.active,
                "selected": props.selected
            }));

            if (!props.disabled)
            {
                const onMouseDown = (evt: MouseEvent) =>
                {
                    if (evt.button === 0)
                    {
                        isClicked.value = true;
                        initialCoords.value = { x: evt.clientX, y: evt.clientY };
                    }
                };
                const onMouseMove = (evt: MouseEvent) =>
                {
                    // if (isClicked.value)
                    // {
                    //     const x = evt.clientX - initialCoords.value.x;
                    //     const y = evt.clientY - initialCoords.value.y;

                    //     element.value!.style.transform =
                    //         `translateX(${x}px) translateY(${y}px)` +
                    //         `rotateX(${y / 25}deg) rotateY(${x / 25}deg) rotateZ(${x / 50}deg)`;
                    // }
                };
                const onMouseUp = (evt: MouseEvent) =>
                {
                    if (evt.button === 0)
                    {
                        isClicked.value = false;

                        // element.value!.style.transform = `translateX(0px) translateY(0px)`;
                    }
                };

                onMounted(() =>
                {
                    element.value!.addEventListener("mousedown", onMouseDown, { passive: true });

                    window.addEventListener("mousemove", onMouseMove, { passive: true });
                    window.addEventListener("mouseup", onMouseUp, { passive: true });
                });
                onUnmounted(() =>
                {
                    window.removeEventListener("mouseup", onMouseUp);
                    window.removeEventListener("mousemove", onMouseMove);

                    // eslint-disable-next-line no-unused-expressions
                    element.value?.removeEventListener("mousedown", onMouseDown);
                });
            }

            return { classes, element, isClicked, initialCoords };
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
        cursor: grab;
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

            &.front
            {
                opacity: 0;
                padding: 0.5em 1em;
                transform: rotateY(180deg);
            }
        }

        &.selected
        {
            box-shadow: 0px 0px 50px 1px rgba(0, 0, 0, 0.25);
            transform: translateX(5px) translateY(-7.5px) rotateZ(-1deg);

            &.active
            {
                transform: scale(1.25) rotateY(180deg);

                & > .back
                {
                    opacity: 0;
                }
                & > .front
                {
                    opacity: 1;
                }
            }
        }

        &:active
        {
            // box-shadow: 0px 0px 50px 1px rgba(0, 0, 0, 0.25);
            cursor: grabbing;
            transition: box-shadow 200ms ease-in-out;
        }
    }
</style>
