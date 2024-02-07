<script lang="ts" setup>
    defineProps({
        id: {
            required: true,
            type: String
        },
        label: {
            required: true,
            type: String
        },

        group: {
            required: true,
            type: String
        },
        value: {
            default: false,
            type: Boolean
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

    const emit = defineEmits(["update:value"]);
    const onCheck = (evt: Event) =>
    {
        const input = evt.target as HTMLInputElement;

        emit("update:value", input.checked);
    };
</script>

<template>
    <div class="radio-button form-check">
        <input :id="id"
               :name="group"
               :disabled="disabled"
               :required="required"
               class="form-check-input"
               type="radio"
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
