<template>
    <div class="card">
        <div class="spacer"></div>
        <div class="content">
            <img alt="Vue logo" src="@/assets/images/logo.png" />
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vehicula.
            </p>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref } from "vue";

    export default defineComponent({
        name: "Card",

        setup: () =>
        {
            const isClicked = ref(false);
            const initialCoords = ref({ x: 0, y: 0 });

            return { isClicked, initialCoords };
        },
        mounted: function(): void
        {
            this.$el.addEventListener("mousedown", (evt: MouseEvent) =>
            {
                if (evt.button === 0)
                {
                    this.isClicked = true;
                    this.initialCoords = { x: evt.clientX, y: evt.clientY };
                }
            });

            window.addEventListener("mousemove", (evt: MouseEvent) =>
            {
                if (this.isClicked)
                {
                    const x = evt.clientX - this.initialCoords.x;
                    const y = evt.clientY - this.initialCoords.y;

                    // this.style!.transform!.rotate.set({ x: y / 25, y: x / 25, z: x / 50 });
                    this.$el.style.transform =
                        `translateX(${x}px) translateY(${y}px)` +
                        `rotateX(${y / 25}deg) rotateY(${x / 25}deg) rotateZ(${x / 50}deg)`;
                }
            });

            window.addEventListener("mouseup", (evt: MouseEvent) =>
            {
                if (evt.button === 0)
                {
                    this.isClicked = false;

                    this.$el.style.transform = `translateX(0px) translateY(0px)`;
                }
            });
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

            & > img
            {
                pointer-events: none;
            }
        }

        &:active
        {
            box-shadow: 0px 0px 50px 1px rgba(0, 0, 0, 0.25);
            cursor: grabbing;
            transition: box-shadow 200ms ease-in-out;
        }
    }
</style>
