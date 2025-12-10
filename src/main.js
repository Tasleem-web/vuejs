import { createApp } from 'vue'
import App from './App.vue'
import { inputFocus, colorChange } from './directives/custom-directives';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap'; // This imports Bootstrap's JavaScript bundle
// createApp(App).mount('#app')

const app = createApp(App);
app.directive('focus', inputFocus);
app.directive('color-change', colorChange);

app.mount('#app');