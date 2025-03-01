import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Quasar } from 'quasar';
import App from './App.vue';

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(Quasar);

app.mount('#app');
