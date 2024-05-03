<script lang="ts" setup>
    import { computed, useAttrs } from "vue";

    const $attrs = useAttrs();

    defineProps({
        id: {
            required: true,
            type: String
        },
        label: {
            required: true,
            type: String
        },

        modelValue: {
            default: 0,
            type: Number
        }
    });

    const emit = defineEmits(["update:modelValue"]);

    const properties = computed(() =>
    {
        const { "class": _c, "style": _s, ...rest } = $attrs;

        return rest;
    });

    const onInput = (evt: Event) =>
    {
        const input = evt.target as HTMLInputElement;

        emit("update:modelValue", parseInt(input.value));
    };
</script>

<template>
    <div class="range-bar">
        <label :for="id" class="form-label">
            {{ label }}
        </label>
        <input :id="id"
               class="form-range"
               :value="modelValue"
               type="range"
               v-bind="properties"
               @input="onInput" />
    </div>
</template>

<style lang="scss" scoped></style>
