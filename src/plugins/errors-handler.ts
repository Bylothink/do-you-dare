import { App, ComponentPublicInstance, Plugin } from "vue";

import Vuert from "@byloth/vuert";
import type { DismissibleAlert } from "@byloth/vuert";

const ERROR_ALERT: DismissibleAlert = {
    type: "error",
    icon: "circle-xmark",
    title: "On, no! 😱",
    message: "A mysterious error of an unknown nature just interrupted" +
        " the Ancient Ritual of Executing the Holy JavaScript Code.\n" +
        "As you may have already guessed, whatever you were doing" +
        " may have stopped working as intended; reload the page.",

    dismissible: true
};

const errorsHandler: Plugin = {
    install(app: App, ...options: undefined[]): void
    {
        app.config.errorHandler = (error: unknown, instance: ComponentPublicInstance | null, info: string) =>
        {
            const vuert: Vuert = app.config.globalProperties.$vuert;

            vuert.emit(ERROR_ALERT);

            // eslint-disable-next-line no-console
            console.error(error);
        };

        window.addEventListener("unhandledrejection", (evt: PromiseRejectionEvent) =>
        {
            const vuert: Vuert = app.config.globalProperties.$vuert;

            vuert.emit(ERROR_ALERT);
        });
    }
};

export default errorsHandler;
