<template>
    <div class="stats">
      <h2>Stats globales</h2>
        <div class="played"><strong>Parties jouées :</strong> {{ gameResults.length }}</div>
        <div class="ratio">
            <div><strong>Gagnées :</strong> {{ gameResults.filter(game => game.result === 'Succès').length }}</div>
            <div><strong>Perdues :</strong> {{ gameResults.filter(game => game.result === 'Échec').length }}</div>
            <div><strong>Ratio V/D :</strong> {{ (gameResults.filter(game => game.result === 'Succès').length / gameResults.filter(game => game.result === 'Échec').length).toFixed(2) }}</div>
        </div>
      <h2>Historique des parties</h2>
      <div v-if="gameResults.length === 0">
        <p>Aucune partie jouée pour le moment.</p>
      </div>
      <ul v-else>
        <li v-for="(game, index) in gameResults" :key="index">
          <div><strong>Pseudo:</strong> {{ game.pseudo }}</div>
          <div><strong>Code:</strong> {{ game.code }}</div>
          <div><strong>Résultat:</strong> {{ game.result }}</div>
          <div v-if="game.result === 'Échec'">
            <strong>Dernière tentative:</strong> {{ game.lastAttempt }} - Bien placés: {{ game.wellPlaced }}, Mal placés: {{ game.misplaced }}
          </div>
          <div><strong>Date:</strong> {{ game.date }}</div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        gameResults: [],
      };
    },
    mounted() {
      this.loadGameResults();
    },
    methods: {
      loadGameResults() {
        const savedResults = JSON.parse(localStorage.getItem('gameResults')) || [];
        this.gameResults = savedResults.reverse();
      },
    },
  };
  </script>
  
  <style scoped>
  .stats {
    padding: 20px;
  }
  
  h2 {
    margin: 0;
    padding: 10px;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    border-bottom: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
  }
  
  strong {
    font-weight: bold;
  }

  .played {
    margin: 20px;
    text-align: center;
    font-size: x-large;
    border: 1px solid white;
    padding: 20px;
  }

  .ratio {
    display: flex;
    justify-content: center;
    gap: 20px;
    align-items: center;
    font-size: x-large;
    margin: 10px;
  }

  .ratio div {
    text-align: center;
    padding: 20px;
    border: 1px solid white;
  }
  </style>
  