<template>
  <div class="container">
    <div class="play">
      <h2>Deviendrez-vous le nouveau Gigamind ?</h2>
      <div class="animation-container">
        <div class="animation">{{ animatedCode }}</div>
      </div>
      <input v-model="pseudo.pseudo" placeholder="Entrez votre pseudo" class="text-input"/>
      <div class="settings">
        <div>
          <p>Nombre de chiffres</p>
          <input type="number" v-model="gameSettings.numbers" placeholder="Longueur" class="setting-input" min="1" max="10" @input="validateNumber"/>
        </div>
        <div>
          <p>Nombre de tentatives</p>
          <input type="number" v-model="gameSettings.lives" placeholder="Essais" class="setting-input"/>
        </div>
      </div>
      <div class="buttons">
        <button @click="play" id="play">Jouer</button>
        <button @click="stats" id="stats">Historique des parties</button>
      </div>
    </div>
    <div class="rules">
      <h2>Règles du jeu</h2>
      <div class="rules-list">
        <h3>Comment jouer ?</h3>
        <ul>
          <li>Un code aléatoire du nombre de chiffres choisis est généré aléatoirement</li>
          <li>Vous devez deviner ce code en un minimum de coups</li>
          <li>Vous avez le nombre choisi de tentatives maximum</li>
          <li>Un indice sur les chiffres renseignés apparaîtra, indiquant si leur position est correcte ou non</li>
        </ul>
      </div>
      <h2>Bonne chance !</h2>
    </div>
  </div>
</template>

<script>
import { inject, ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import useGame from '@/services/game';

export default {
  setup() {
    const pseudo = inject('pseudo');
    const gameSettings = inject('gameSettings');
    const router = useRouter();
    const { generateCode, code } = useGame();
    
    const animatedCode = ref('');

    const play = () => {
      if (pseudo.pseudo !== '') {
        router.push('/game');
      } else {
        alert("Veuillez entrer un pseudo avant de jouer !");
      }
    };

    const stats = () => {
      router.push('/stats');
    };

    let interval;
    
    const updateCodeAnimation = () => {
      generateCode(); // Génère un nouveau code
      animatedCode.value = code.value; // Met à jour l'affichage
    };

    onMounted(() => {
      updateCodeAnimation(); // Affiche un premier code dès le montage
      interval = setInterval(updateCodeAnimation, 2000);
    });

    onUnmounted(() => {
      clearInterval(interval);
    });

    return { pseudo, gameSettings, play, stats, animatedCode };
  },
  methods: {
  validateNumber() {
    if (this.gameSettings.numbers < 1) {
      this.gameSettings.numbers = 1;
    } else if (this.gameSettings.numbers > 10) {
      this.gameSettings.numbers = 10;
    }
  }
}

};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 92vh;
}

.rules {
  background-color: rgba(50, 50, 50, 0.5);
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: larger;
}

.rules h2 {
  font-size: 2rem;
  background-color: rgba(50, 50, 50, 0.5);
  width: 100%;
  margin: 0;
  padding: 10px 0;
  text-align: center;
}

.rules-list {
  margin: 10px;
  padding: 10px;
}

.rules ul li {
  margin: 10px;
}

button {
  width: 300px;
  font-size: x-large;
  background-color: #e1feff;
  color: black;
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  transition: 0.24s;
}

button:hover {
  cursor: pointer;
}

.settings {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 15px;
}

.settings p {
  text-align: center;
  font-size: larger;
  margin: 0;
}

#play:hover {
  background-color: #41ff51;
}

#stats:hover {
  background-color: #4441ff;
}

.play {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.text-input {
  width: 300px;
  font-size: x-large;
  padding: 10px;
  margin: 20px;
  border-radius: 5px;
  border: none;
  text-align: center;
  transition: 0.24s;
}

.setting-input {
  width: 250px;
  font-size: x-large;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  border: none;
  text-align: center;
  transition: 0.24s;
}

.animation {
  font-size: 2rem;
  margin: 20px;
  padding: 20px;
  background-color: #1a1a1a;
  border-radius: 24px;
  border: 1px solid white;
  text-align: center;
  transition: opacity 0.5s ease-in-out;
}

.animation-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
}

.play h2 {
  font-size: 2rem;
  margin: 0;
  padding: 10px;
}
</style>
