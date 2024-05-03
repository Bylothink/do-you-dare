<script lang="ts" setup>
    import { onMounted, shallowRef } from "vue";
    import { loadScript } from "@byloth/core";

    const props = defineProps({
        siteKey: {
            required: true,
            type: String
        }
    });

    const emit = defineEmits(["token:acquired", "token:expired"]);

    const $el = shallowRef<HTMLDivElement>();

    onMounted(async () =>
    {
        if (!(window.hcaptcha))
        {
            await loadScript("https://js.hcaptcha.com/1/api.js");
        }

        window.hcaptcha.render($el.value!, {
            "sitekey": props.siteKey,
            // "theme": "dark",

            "callback": (token: string) => emit("token:acquired", token),
            "expired-callback": () => emit("token:expired"),
            "chalexpired-callback": () => emit("token:expired")

            // "open-callback": (...args: unknown[]) => console.log("open-callback", args),
            // "close-callback": (...args: unknown[]) => console.log("close-callback", args),
            // "error-callback": (...args: unknown[]) => console.log("error-callback", args)
        });
    });
</script>

<template>
    <div ref="$el" class="h-captcha-box"></div>
</template>

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
