import { createVuert } from "@byloth/vuert";
import type { AlertOptions } from "@byloth/vuert";

const ERROR_ALERT: AlertOptions = {
    type: "error",
    icon: "circle-xmark",
    title: "On, no! 😱",
    message: "A mysterious error of an unknown nature just interrupted" +
        " the Ancient Ritual of Executing the Holy JavaScript Code.\n" +
        "As you may have already guessed, whatever you were doing" +
        " may have stopped working as intended; reload the page.",

    dismissible: true
};

export default createVuert({
    enableErrorsHandling: true,
    defaultAlertOptions: ERROR_ALERT
});
