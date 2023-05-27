import { createApp } from "vue";

import App from "./App.vue";

import router from "./router.js";
import pinia from "./pinia.js";
import vuert from "./vuert.js";

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(vuert);

export default app.mount("#app");
