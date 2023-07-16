<template>
    <div ref="$element" class="h-captcha-box"></div>
</template>

<script lang="ts" setup>
    import { onMounted, ref } from "vue";

    import { loadScript } from "@/utils";

    const props = defineProps({
        sitekey: {
            required: true,
            type: String
        },

        value: {
            default: "",
            type: String
        }
    });

    const emit = defineEmits(["update:value"]);

    let widgetId: string;
    const $element = ref<HTMLDivElement>();

    onMounted(async () =>
    {
        if (!window.hcaptcha)
        {
            await loadScript("https://js.hcaptcha.com/1/api.js");
        }

        widgetId = window.hcaptcha.render($element.value!, {
            "sitekey": props.sitekey,

            "callback": (token: string) => emit("update:value", token),
            "expired-callback": () => emit("update:value", ""),

            "chalexpired-callback": (...args: unknown[]) => console.log("chalexpired-callback", args),
            "open-callback": (...args: unknown[]) => console.log("open-callback", args),
            "close-callback": (...args: unknown[]) => console.log("close-callback", args),
            "error-callback": (...args: unknown[]) => console.log("error-callback", args)
        });

        const hCaptcha = $element.value!.children[0] as HTMLIFrameElement;
        hCaptcha.style.width = "301px";
        hCaptcha.style.height = "75px";
        hCaptcha.style.borderRadius = "4px";

        console.log(widgetId);
    });
</script>