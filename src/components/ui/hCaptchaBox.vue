<template>
    <div ref="$element" class="h-captcha-box"></div>
</template>

<script lang="ts" setup>
    import { onMounted, ref } from "vue";

    import { loadScript } from "@/utils";

    const props = defineProps({
        siteKey: {
            required: true,
            type: String
        },

        value: {
            default: "",
            type: String
        }
    });

    const emit = defineEmits(["update:value"]);

    const $element = ref<HTMLDivElement>();

    onMounted(async () =>
    {
        if (!window.hcaptcha)
        {
            await loadScript("https://js.hcaptcha.com/1/api.js");
        }

        window.hcaptcha.render($element.value!, {
            "sitekey": props.siteKey,
            // "theme": "dark",

            "callback": (token: string) => emit("update:value", token),
            "expired-callback": () => emit("update:value", ""),
            "chalexpired-callback": () => emit("update:value", "")

            // "open-callback": (...args: unknown[]) => console.log("open-callback", args),
            // "close-callback": (...args: unknown[]) => console.log("close-callback", args),
            // "error-callback": (...args: unknown[]) => console.log("error-callback", args)
        });
    });
</script>

<style lang="scss" scoped>
    .h-captcha-box
    {
        :deep(iframe)
        {
            border-radius: 4px;
            height: 76px !important;
            width: 302px !important;
        }
    }
</style>
