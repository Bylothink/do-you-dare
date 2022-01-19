import { App, ComponentPublicInstance, Plugin } from "vue";

import { AlertOptions } from "@/core/types";

import useUiStore from "@/stores/ui";

const ERROR_ALERT: AlertOptions = {
    type: "danger",
    icon: "times-circle",
    title: "On, no! 😱",
    message: "A mysterious error of an unknown nature just interrupted" +
        " the Ancient Ritual of Executing the Holy JavaScript Code.\n" +
        "As you may have already guessed, whatever you were doing" +
        " may have stopped working as intended; reload the page.",
    dismissable: true
};

const errorsHandler: Plugin = {
    install(app: App, ...options: undefined[]): void
    {
        app.config.errorHandler = (error: unknown, instance: ComponentPublicInstance | null, info: string) =>
        {
            const uiStore = useUiStore();

            uiStore.alert(ERROR_ALERT);

            // eslint-disable-next-line no-console
            console.error(error);
        };

        window.addEventListener("unhandledrejection", (evt: PromiseRejectionEvent) =>
        {
            const uiStore = useUiStore();

            uiStore.alert(ERROR_ALERT);
        });
    }
};

export default errorsHandler;
