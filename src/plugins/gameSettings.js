import { reactive } from "vue";

export default {
    install(app) {
        const state = reactive({
            gameSettings: {
                lives: 10,
                numbers: 4,
            }
        });
        app.provide('gameSettings', state.gameSettings);
    }
}