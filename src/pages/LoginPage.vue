<template>
    <CenteredLayout id="login-page" tag="main">
        <form @submit.prevent="onSubmit">
            <div class="input-group">
                <span id="basic-addon1" class="input-group-text">@</span>
                <input v-model="username"
                       placeholder="Nome utente"
                       name="username"
                       class="form-control form-control-lg"
                       required />
            </div>
            <input v-model="password"
                   name="password"
                   class="form-control form-control-lg"
                   placeholder="Password"
                   type="password"
                   required />
            <br />
            <input id="1"
                   v-model="rememberMe"
                   name="checkbox"
                   type="checkbox" />
            <label for="1">Ricordami</label>
            <br />
            <br />
            <button class="form-control form-control-lg" type="submit">
                Accedi
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
                username: "",
                password: "",
                rememberMe: false
            };
        },
        methods: {
            async onSubmit(payload: Event)
            {
                try
                {
                    const response: any = await axios.post("http://localhost:8000/auth/", {
                        query: LoginQuery,
                        variables: {
                            username: this.username,
                            password: this.password
                        }
                    });
                    if (response.data.data.tokenAuth == null)
                    {
                        console.error(response.data.errors[0].message);
                        alert(response.data.errors[0].message);
                    }
                    else
                    {
                        console.log(response.data.data.tokenAuth.token);

                        if (this.rememberMe)
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
