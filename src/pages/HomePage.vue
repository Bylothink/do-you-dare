<template>
    <CenteredLayout id="home-page" tag="main">
        <h1 class="title">
            Do you dare?
        </h1>
        <ul>
            <RouterLink v-for="page in pages"
                        :key="page.id"
                        v-slot="{ href, route, navigate, isActive, isExactActive }"
                        :to="page"
                        custom>
                <li>
                    <RoundButton :href="href" @click="navigate">
                        {{ page.title }}
                    </RoundButton>
                </li>
            </RouterLink>
        </ul>
    </CenteredLayout>
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    import config, { PageOptions } from "@/config";

    import RoundButton from "@/components/ui/RoundButton.vue";
    import CenteredLayout from "@/layouts/CenteredLayout.vue";

    export default defineComponent({
        name: "HomePage",
        components: { CenteredLayout, RoundButton },

        setup: () =>
        {
            const pages: PageOptions[] = config.pages.filter((page) => page.name !== "index");

            return { pages };
        }
    });
</script>

<style lang="scss" scoped>
    #home-page
    {
        text-align: center;

        & > .title
        {
            font-size: 6.666em;
            font-weight: 100;
            margin: 0px;
            margin-top: 0.5em;
        }

        & > ul
        {
            font-size: 2em;
            list-style-type: none;
            margin: 0px;
            padding: 0px;

            & > li
            {
                margin: 1em 0px;
            }
        }
    }
</style>
