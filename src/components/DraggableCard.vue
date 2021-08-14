<template>
    <Draggable class="draggable-card"
               :x="x"
               :y="y"
               :disabled="disabled"
               @update:x="$emit('update:x', $event)"
               @update:y="$emit('update:y', $event)">
        <Card>
            <slot></slot>
        </Card>
    </Draggable>
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    import Draggable from "./core/Draggable.vue";
    import Card from "./Card.vue";

    export default defineComponent({
        name: "DraggableCard",
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

            disabled: {
                default: false,
                type: Boolean
            }
        },
        emits: [
            "update:x",
            "update:y"
        ],
        setup: () =>
        {
            // TODO!
        }
    });
</script>

<style lang="scss" scoped>
</style>
