import { Component } from "vue";
import { RouterLink, RouterView } from "vue-router";

declare module "vue"
{
    interface GlobalComponents
    {
        Component: typeof Component;
        RouterLink: typeof RouterLink;
        RouterView: typeof RouterView;
    }
}
