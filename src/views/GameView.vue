<template>
    <div class="container">
        <div class="gigamind">
            <img src="../assets/gigamind2.png" alt="Gigamind" srcset="">
            <p id="gigamind-dialog">(Nothing to say)</p>
        </div>
        <div class="game">
            <div class="guess">
                <h2>Votre proposition - Nombre d'essais restants : {{ remainingAttempts }}</h2>
                <CodeField :length="gameSettings.numbers" v-model="userAttempt" @validate="submitGuess" />
                <div></div>
            </div>
            <div class="history">
                <h2>Historique</h2>
                <ul>
                    <li v-for="(attempt, index) in attempts" :key="index">
                        {{ attempt.attempt }} - Bien placés: {{ attempt.wellPlaced }}, Mal placés: {{ attempt.misplaced }}
                    </li>
                </ul>
                <div></div>
            </div>
        </div>
        <Popup v-if="showPopup" :show="showPopup" :message="popupMessage" @close="closePopup" />
    </div>
</template>

<script>
import { inject, onMounted, ref, computed } from 'vue';
import useGame from '@/services/game';
import CodeField from '@/components/CodeField.vue';
import Popup from '@/components/PopUp.vue';
import gameSettings from '@/plugins/gameSettings';

export default {
    components: { CodeField, Popup },
    setup() {
        const { code, attempts, state, generateCode, validateAttempt } = useGame();
        const pseudo = inject('pseudo');
        const gameSettings = inject('gameSettings');
        const userAttempt = ref('');
        const maxAttempts = gameSettings.lives;
        const showPopup = ref(false);
        const popupMessage = ref('');


        const remainingAttempts = computed(() => {
            return maxAttempts - attempts.value.length;
        });

        const updateDialog = (text) => {
            document.getElementById('gigamind-dialog').innerText = text;
        };

        onMounted(() => {
            const playerName = pseudo.pseudo || 'joueur';
            updateDialog(`Bonjour ${playerName}, sauras-tu me battre ?`);
        });

        const submitGuess = (guess) => {
        if (guess.length === gameSettings.numbers) {
        const { wellPlaced, misplaced } = validateAttempt(guess);
        userAttempt.value = '';
        let result = '';

        switch (wellPlaced) {
            case gameSettings.numbers:
                updateDialog(`Tu m'as battu, ${pseudo.pseudo}. Je reviendrai !`);
                popupMessage.value = 'Bravo, vous êtes le nouveau Gigamind !';
                showPopup.value = true;
                result = 'Succès';
                break;
            default:
                updateDialog(`Tu en as placé ${wellPlaced}, tu me déçois, ${pseudo.pseudo} !`);
                result = 'Échec';
                break;
        }

        // Vérifier si la partie est terminée
        if (wellPlaced === gameSettings.numbers || remainingAttempts.value === 0) {
            // Sauvegarde dans le localStorage uniquement à la fin
            const gameResult = {
                pseudo: pseudo.pseudo,
                code: code.value,
                result,
                lastAttempt: guess,
                wellPlaced,
                misplaced,
                date: new Date().toLocaleString(),
            };

            const previousResults = JSON.parse(localStorage.getItem('gameResults')) || [];
            previousResults.push(gameResult);
            localStorage.setItem('gameResults', JSON.stringify(previousResults));
        }

        // Afficher le message de fin de partie si perdue
        if (state.value === 'perdue') {
            popupMessage.value = 'Le Gigamind a gagné ! Code secret: ' + code.value;
            showPopup.value = true;
        }
    } else {
        alert("Veuillez entrer un code de "+ gameSettings.numbers +" chiffres.");
    }
};



        const closePopup = () => {
            showPopup.value = false;
        };

        return { pseudo, gameSettings, code, attempts, state, userAttempt, submitGuess, remainingAttempts, showPopup, popupMessage, closePopup };
    },
};
</script>

<style scoped>
*{
    overflow: hidden;
}
.gigamind{
    text-align: center;
    margin: 0;
    background-color: rgb(31, 31, 31);
    overflow: hidden;
    height: 40vh;
    position: relative;
}

.gigamind img{
    transform: translateY(-25%);
}

.gigamind p{
    font-size: 1.5rem;
    margin: 0;
    padding: 10px;
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
}

.game{
    display: flex;
    justify-content: space-around;
    align-items: stretch;
    height: 60vh;
}

.guess, .history{
    width: 50%;
    
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-size: larger;
}

.history{
    background-color: rgba(50, 50, 50, 0.5);
}

.history ul{
    margin: 10px;
    padding: 10px;
    list-style-type: none;
}

h2{
    margin: 0;
    padding: 10px;
    width: 100%;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.5);
}
</style>
