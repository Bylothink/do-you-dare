<script lang="ts" setup>
    import { computed, useAttrs } from "vue";

    const $attrs = useAttrs();

    const props = defineProps({
        id: {
            required: true,
            type: String
        },
        label: {
            required: true,
            type: String
        },

        name: {
            default: "",
            type: String
        },
        modelValue: {
            required: true,
            type: String
        },
        value: {
            required: true,
            type: String
        }
    });

    const properties = computed(() =>
    {
        const { "class": _c, "style": _s, ...rest } = $attrs;

        return rest;
    });

    const checked = computed((): boolean => (props.modelValue === props.value));

    const emit = defineEmits(["update:modelValue"]);
    const onCheck = (evt: Event) => emit("update:modelValue", props.value);
</script>

<template>
    <div class="radio-button form-check">
        <input :id="id"
               :name="name"
               :checked="checked"
               :value="value"
               class="form-check-input"
               type="radio"
               v-bind="properties"
               @input="onCheck" />
        <label class="form-check-label" :for="id">
            {{ label }}
        </label>
    </div>
</template>

<style lang="scss" scoped>
    .form-check-input,
    .form-check-label
    {
        cursor: pointer;
    }
</style>
