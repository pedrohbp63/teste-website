const display = document.getElementById('display');
const buttons = document.getElementById('buttons');

let currentInput = '';
let operator = null;
let previousInput = null;

buttons.addEventListener('click', (event) => {
  const target = event.target;
  const value = target.textContent;

  if (target.classList.contains('digit')) {
    if (display.textContent === 'Error') {
      currentInput = value;
    } else {
      currentInput += value;
    }
    updateDisplay(currentInput);
  } else if (target.classList.contains('operator')) {
    if (display.textContent === 'Error') {
      clearCalculator(); // Resets display to '0', currentInput to '', etc.
      // If the operator pressed was '-', allow it to start a negative number
      // This re-uses the existing logic for starting with '-'
      if (value === '-') {
        currentInput = '-'; // Set currentInput to '-'
        updateDisplay(currentInput); // Update display to show '-'
      }
      return; // Stop further processing of this operator click for the error state
    }
    if (currentInput === '' && value === '-') {
      currentInput = '-';
      updateDisplay(currentInput);
      return;
    }
    if (currentInput === '' && value !== '-') return; // Return if currentInput is empty and not a '-' sign

    // If there's a pending operation and currentInput is not empty, calculate.
    if (operator !== null && previousInput !== null && currentInput !== '') {
      calculate();
      // currentInput now holds the result. This will become previousInput.
    }
    // If previousInput is null and currentInput is not empty, this is the first number.
    // Or, if a calculation just happened, currentInput has the result.
    operator = value;
    previousInput = currentInput; // The current number (or result) becomes previousInput
    currentInput = ''; // Clear currentInput for the next number
  } else if (target.id === 'equals') {
    if (operator === null || previousInput === null || currentInput === '') return;
    calculate();
    operator = null;
  } else if (target.id === 'clear') {
    clearCalculator();
  } else if (target.id === 'decimal') {
    if (!currentInput.includes('.')) {
      currentInput += '.';
      updateDisplay(currentInput);
    }
  }
});

function updateDisplay(value) {
  display.textContent = value;
}

function clearCalculator() {
  currentInput = '';
  operator = null;
  previousInput = null;
  updateDisplay('0');
}

function calculate() {
  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      if (current === 0) {
        updateDisplay('Error');
        currentInput = '';
        previousInput = null;
        operator = null;
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }
  currentInput = result.toString();
  previousInput = null;
  updateDisplay(currentInput);
}

// Initialize display
updateDisplay('0');
