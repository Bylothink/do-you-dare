import { createApp } from "vue";

import App from "./App.vue";

import router from "./router.js";
import pinia from "./pinia.js";
import vuert from "./vuert.js";

import errorsHandler from "./plugins/errors-handler.js";

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(vuert);

app.use(errorsHandler);

export default app.mount("#app");
