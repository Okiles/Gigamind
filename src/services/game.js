import { ref, onMounted, onUnmounted, inject } from 'vue';

const useGame = () => {
  const gameSettings = inject('gameSettings');
  const code = ref('');
  const attempts = ref([]);
  const state = ref('en cours');

  const generateCode = () => {
    const digits = [];
    while (digits.length < gameSettings.numbers) {
      const digit = Math.floor(Math.random() * 10);
      if (!digits.includes(digit)) {
        digits.push(digit);
      }
    }
    code.value = digits.join('');
  };

  const validateAttempt = (attempt) => {
    let wellPlaced = 0;
    let misplaced = 0;
    const codeCopy = code.value.split('');
    const attemptCopy = attempt.split('');

    codeCopy.forEach((digit, index) => {
      if (attemptCopy[index] === digit) {
        wellPlaced++;
        codeCopy[index] = null;
        attemptCopy[index] = null;
      }
    });

    attemptCopy.forEach((digit, index) => {
      if (digit && codeCopy.includes(digit)) {
        misplaced++;
        codeCopy[codeCopy.indexOf(digit)] = null;
      }
    });

    attempts.value.push({ attempt, wellPlaced, misplaced });

    if (wellPlaced === gameSettings.numbers) {
      state.value = 'gagnée';
    } else if (attempts.value.length >= gameSettings.lives) {
      state.value = 'perdue';
    }

    return { wellPlaced, misplaced };
  };

  onMounted(() => {
    generateCode();
  });

  return {
    code,
    attempts,
    state,
    generateCode,
    validateAttempt
  };
};

export default useGame;
