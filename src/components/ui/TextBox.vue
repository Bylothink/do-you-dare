<template>
    <div class="text-box">
        <div class="form-floating" :class="validationClasses">
            <input :id="id"
                   :class="inputClasses"
                   :disabled="disabled"
                   :readonly="readonly"
                   :required="required"
                   :autocomplete="autocomplete"
                   :placeholder="label"
                   :type="type"
                   :value="value"
                   @input="onInput" />
            <label :for="id">
                {{ label }}
            </label>
        </div>
        <div v-if="valid" class="valid-feedback">
            {{ validMessage }}
        </div>
        <div v-if="invalid" class="invalid-feedback">
            {{ invalidMessage }}
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { computed } from "vue";

    const props = defineProps({
        id: {
            required: true,
            type: String
        },
        label: {
            required: true,
            type: String
        },
        autocomplete: {
            default: "",
            type: String
        },

        value: {
            default: "",
            type: String
        },
        type: {
            default: "text",
            type: String
        },

        disabled: {
            default: false,
            type: Boolean
        },
        plaintext: {
            default: false,
            type: Boolean
        },
        readonly: {
            default: false,
            type: Boolean
        },
        required: {
            default: false,
            type: Boolean
        },

        small: {
            default: false,
            type: Boolean
        },
        large: {
            default: false,
            type: Boolean
        },

        valid: {
            default: false,
            type: Boolean
        },
        validMessage: {
            default: "Looks good!",
            type: String
        },
        invalid: {
            default: false,
            type: Boolean
        },
        invalidMessage: {
            default: "Can't be blank!",
            type: String
        }
    });

    const emit = defineEmits(["update:value"]);

    const validationClasses = computed((): Record<string, boolean> => ({
        "is-valid": props.valid,
        "is-invalid": props.invalid
    }));
    const inputClasses = computed((): Record<string, boolean> => ({
        "form-control": !props.plaintext,
        "form-control-plaintext": props.plaintext,

        "form-control-sm": props.small,
        "form-control-lg": props.large,

        ...validationClasses.value
    }));

    const onInput = (evt: Event) =>
    {
        const input = evt.target as HTMLInputElement;

        emit("update:value", input.value);
    };
</script>

<style lang="scss" scoped>
    .text-box > .form-floating
    {
        text-align: left;

        & > label
        {
            color: var(--bs-body-color);
        }

        & > .form-control-plaintext
        {
            color: inherit;

            & ~ label
            {
                color: inherit;
            }
        }

        .input-group > &
        {
            & > label
            {
                z-index: 4;
            }

            & > .form-control
            {
                position: relative;
                z-index: 3;

                &:not(:first-child)
                {
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                }
                &:not(:last-child)
                {
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;
                }
            }
        }
    }
</style>
