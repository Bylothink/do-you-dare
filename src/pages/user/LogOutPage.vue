<template>
    <span></span>
</template>

<script lang="ts" setup>
    import { useRouter } from "vue-router";
    import { useVuert } from "@byloth/vuert";

    import useUserStore from "@/stores/user";

    const $router = useRouter();
    const $vuert = useVuert();
    const $user = useUserStore();

    const executeLogout = async () =>
    {
        if ($user.isLogged)
        {
            await $user.logOut();

            $vuert.emit({
                type: "success",
                icon: "circle-check",
                message: "Successfully logged out!",
                timeout: 2500
            });
        }

        $router.replace({ name: "home" });
    };

    executeLogout();
</script>
