<template>
    <label :for="id">
        <input :id="id"
               :disabled="disabled"
               :required="required"
               type="checkbox"
               @input="onCheck" />
        <slot></slot>
    </label>
</template>

<script lang="ts" setup>
    defineProps({
        id: {
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

<style lang="scss" scoped>
</style>
