<template>
    <CenteredLayout id="login-page" tag="main">
        <form @submit.prevent="onSubmit">
            <div class="row mb-3">
                <label for="user" class="col-sm-3 col-form-label col-form-label-lg">Username</label>
                <div class="col-sm-9">
                    <input id="user"
                           v-model="username"
                           type="text"
                           class="form-control form-control-lg"
                           required />
                </div>
            </div>
            <div class="row mb-3">
                <label for="pass" class="col-sm-3 col-form-label col-form-label-lg">Password</label>
                <div class="col-sm-9">
                    <input id="pass"
                           v-model="password"
                           type="password"
                           class="form-control form-control-lg"
                           required />
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-sm-9 offset-sm-3">
                    <div class="form-check">
                        <input id="checkbox"
                               v-model="rememberMe"
                               class="form-check-input"
                               type="checkbox" />
                        <label class="form-check-label" for="checkbox">Ricordami</label>
                    </div>
                </div>
            </div>
            <div class="row mb-3 mt-4">
                <div class="col-sm-9 offset-sm-3">
                    <button class="form control form-control-lg btn btn-primary" type="submit">
                        Accedi
                    </button>
                </div>
            </div>
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
    #login-page
    {
        .btn.btn-primary
        {
            width: 100%;
        }
        .form-check > input,
        .form-check > label
        {
            cursor: pointer;
        }
    }
</style>
