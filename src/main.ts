import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { Quasar } from "quasar";

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";

// A few examples for animations from Animate.css:
// import @quasar/extras/animate/fadeIn.css
// import @quasar/extras/animate/fadeOut.css

// Import Quasar css
import "quasar/src/css/index.sass";

createApp(App)
  .use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
  })
  .mount("#app");
