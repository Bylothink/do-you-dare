<script lang="ts" setup>
    import { computed } from "vue";
    import type { PropType } from "vue";

    const props = defineProps({
        id: {
            required: true,
            type: String
        },
        label: {
            required: true,
            type: String
        },

        value: {
            default: false,
            type: [Boolean, null] as PropType<boolean | null>
        },

        disabled: {
            default: false,
            type: Boolean
        },
        required: {
            default: false,
            type: Boolean
        }
    });

    const indeterminate = computed((): boolean => (props.value === null));

    const emit = defineEmits(["update:value"]);
    const onCheck = (evt: Event) =>
    {
        const input = evt.target as HTMLInputElement;

        emit("update:value", input.checked);
    };
</script>

<template>
    <div class="check-box form-check">
        <input :id="id"
               :disabled="disabled"
               :indeterminate="indeterminate"
               :required="required"
               class="form-check-input"
               type="checkbox"
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
