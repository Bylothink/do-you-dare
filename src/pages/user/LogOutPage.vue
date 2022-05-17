<template>
    <span></span>
</template>

<script lang="ts" setup>
    import { useRouter } from "vue-router";

    import { HandledException } from "@/core/exceptions";

    import useUiStore from "@/stores/ui";
    import useUserStore from "@/stores/user";

    const router = useRouter();

    const ui = useUiStore();
    const user = useUserStore();

    const executeLogout = () =>
    {
        if (user.isLogged)
        {
            user.logOut()
                .then(() => ui.alert({
                    type: "success",
                    icon: "circle-check",
                    message: "Successfully logged out!",
                    timeout: 2500
                }))
                .catch((reason) =>
                {
                    HandledException.CatchUnhandled(reason);
                });
        }

        router.replace({ name: "home" });
    };

    executeLogout();
</script>
