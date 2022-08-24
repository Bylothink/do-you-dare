<template>
    <span></span>
</template>

<script lang="ts" setup>
    import { useRouter } from "vue-router";

    import { handle } from "@byloth/exceptions";
    import { useVuert } from "@byloth/vuert";

    import useUserStore from "@/stores/user";

    const router = useRouter();
    const vuert = useVuert();

    const user = useUserStore();

    const executeLogout = () =>
    {
        if (user.isLogged)
        {
            user.logOut()
                .then(() => vuert.emit({
                    type: "success",
                    icon: "circle-check",
                    message: "Successfully logged out!",
                    timeout: 2500
                }))
                .catch(handle);
        }

        router.replace({ name: "home" });
    };

    executeLogout();
</script>
