import { createApp } from "vue";

import App from "./App.vue";

import router from "./router";
import pinia from "./pinia";
import vuert from "./vuert";

import errorsHandler from "./plugins/errors-handler";

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(vuert);

app.use(errorsHandler);

export default app.mount("#app");
