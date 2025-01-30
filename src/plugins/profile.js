import { reactive } from 'vue';

export default {
  install(app) {
    const state = reactive({
      pseudo: ''
    });

    app.provide('pseudo', state);
  }
};
