<template>
    <div class="code-field">
      <div class="guess-container">
        <div v-for="n in inputArray" :key="n">
          <input 
            ref="inputs" 
            type="text" 
            v-model="code[n-1]" 
            maxlength="1" 
            @input="handleInput($event, n)" 
            @keydown.enter.prevent="validateCode" 
          />
        </div>
      </div>
      <button @click="validateCode">Valider</button>
    </div>
  </template>
  
  <script>
  import { computed, ref, watch, nextTick } from 'vue';
  
  export default {
    name: 'CodeField',
    props: {
      length: {
        type: Number,
        required: true
      },
      modelValue: {
        type: String,
        required: true
      }
    },
    setup(props, { emit }) {
      const code = ref(Array(props.length).fill(''));
      const inputs = ref([]);
  
      const inputArray = computed(() => {
        return Array.from({ length: props.length }, (_, i) => i + 1);
      });
  
      const handleInput = (event, index) => {
        if (event.target.value) {
          if (index < props.length) {
            nextTick(() => {
              inputs.value[index].focus();
            });
          }
        }
        updateModel();
      };
  
      const updateModel = () => {
        emit('update:modelValue', code.value.join(''));
      };
  
      const validateCode = () => {
        emit('validate', code.value.join(''));
      };
  
      watch(() => props.modelValue, (newValue) => {
        code.value = newValue.split('').slice(0, props.length);
      });
  
      return { code, inputArray, updateModel, validateCode, handleInput, inputs };
    }
  };
  </script>
  
  <style scoped>
  .code-field {
      display: flex;
      flex-direction: column;
      align-items: center;
  }
  
  .guess-container {
      display: flex;
      justify-content: center;
      align-items: center;
  }
  
  input{
      padding: 10px;
      margin: 10px;
      width: 50px;
      border-radius: 24px;
      text-align: center;
  }
  
  button{
      width: 350px;
      font-size: x-large;
      background-color: #e1feff;
      color: black;
      padding: 10px 20px;
      margin: 10px;
      border: none;
      border-radius: 5px;
      transition: 0.24s;
  }
  
  button:hover{
      cursor: pointer;
      background-color: #00ff00;
  }
  </style>
  