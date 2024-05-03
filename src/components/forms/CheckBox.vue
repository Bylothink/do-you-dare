<script lang="ts" setup>
    import { computed, useAttrs } from "vue";
    import type { PropType } from "vue";

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

        modelValue: {
            default: false,
            type: [Boolean, null] as PropType<boolean | null>
        }
    });

    const properties = computed(() =>
    {
        const { "class": _c, "style": _s, ...rest } = $attrs;

        return rest;
    });

    const checked = computed((): boolean => (props.modelValue === true));
    const indeterminate = computed((): boolean => (props.modelValue === null));

    const emit = defineEmits(["update:modelValue"]);
    const onCheck = (evt: Event) =>
    {
        const input = evt.target as HTMLInputElement;

        emit("update:modelValue", input.checked);
    };
</script>

<template>
    <div class="check-box form-check">
        <input :id="id"
               :checked="checked"
               :indeterminate="indeterminate"
               class="form-check-input"
               type="checkbox"
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
