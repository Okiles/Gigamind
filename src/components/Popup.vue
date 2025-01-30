<template>
    <div class="overlay" v-if="show">
      <div class="popup">
        <h2>{{ message }}</h2>
        <button @click="closePopup">Fermer</button>
        <button @click="goHome">Retour à l'accueil</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'Popup',
    props: {
      show: {
        type: Boolean,
        required: true
      },
      message: {
        type: String,
        required: true
      }
    },
    setup(props, { emit }) {
      const router = useRouter();
  
      const closePopup = () => {
        emit('close');
      };
  
      const goHome = () => {
        router.push('/');
      };
  
      return { closePopup, goHome };
    }
  };
  </script>
  
  <style scoped>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .popup {
    background: rgb(0, 0, 0);
    padding: 20px;
    border-radius: 10px;
    text-align: center;
  }
  
  button {
    margin: 10px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.2s;
  }
  
  button:hover {
    background-color: #00ff00;
  }
  </style>
  