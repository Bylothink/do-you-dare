<template>
    <CenteredLayout id="login-page" tag="main">
        <form @submit.prevent="say">
            <input v-model="user"
                   name="username"
                   placeholder="USERNAME"
                   required />
            <p>Lo user è: {{ user }}</p>
            <input v-model="pw"
                   name="password"
                   placeholder="PASSWORD"
                   type="password"
                   required />
            <br />
            <input id="1"
                   v-model="box"
                   name="checkbox"
                   type="checkbox"
                   @click="check(box)" />
            <label for="1">{{ box }}</label>
            <br />
            <br />
            <button type="submit">
                SUBMIT
            </button>
        </form>
    </CenteredLayout>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import axios from "axios";

    import CenteredLayout from "@/layouts/CenteredLayout.vue";

    const LoginQuery = `mutation tokenAuth($username: String!, $password: String!) {
        tokenAuth(username: $username, password: $password) {
            token
        }
    }`;

    export default defineComponent({
        name: "LoginPage",
        components: { CenteredLayout },
        data: function()
        {
            return {
                user: "",
                pw: "",
                box: false
            };
        },
        methods: {
            async say(payload: Event)
            {
                try
                {
                    const response = await axios.post("http://localhost:8000/auth/", {
                        query: LoginQuery,
                        variables: {
                            username: this.user,
                            password: this.pw
                        }
                    });
                    if (response.data.data.tokenAuth == null)
                    {
                        // console.debug(response.data.errors[0].message);
                        // console.log(response.data.errors[0].message);
                        console.error(response.data.errors[0].message);
                        // console.info(response.data.errors[0].message);
                        // console.warn(response.data.errors[0].message);
                        alert(response.data.errors[0].message);
                    }
                    else
                    {
                        // console.debug(response.data.data.tokenAuth.token);
                        console.log(response.data.data.tokenAuth.token);
                        // console.error(response.data.data.tokenAuth.token);
                        // console.info(response.data.data.tokenAuth.token);
                        // console.warn(response.data.data.tokenAuth.token);

                        if (this.box)
                        {
                            localStorage.setItem("token", response.data.data.tokenAuth.token);
                        }
                        else
                        {
                            sessionStorage.setItem("token", response.data.data.tokenAuth.token);
                        }
                    }
                }
                catch (exc)
                {
                    console.log((exc as Error).message);
                    alert("Si è verificato un problema, riprovare più tardi");
                }
            }
        }
    });
</script>

<style lang="scss" scoped>
</style>
