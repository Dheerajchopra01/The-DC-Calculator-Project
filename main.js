const calculatorDisplayEquation = document.querySelector(
  '.calculator__display__equation'
);

const calculatorDisplayResult = document.querySelector(
  '.calculator__display__result'
);

const calculatorButton = document.querySelectorAll('.calculator__button');

let equation = '';
let eqFirstNumber;
let eqSecondNumber;
let isCalculationOver = false;
const allOperators = ['=', '+', '-', '*', '/', '+/-'];

calculatorButton.forEach(function (btn) {
  btn.addEventListener('click', function () {
    calculate(btn.textContent);
  });
});

/**
 * Driver function, which gets called when any button is clicked.
 * @param {string} btnValue
 */
function calculate(btnValue) {
  try {
    //if first input is operator, return
    let isOperator = false;
    if (equation === '') {
      allOperators.forEach(function (item) {
        if (item === btnValue) {
          isOperator = true;
        }
      });
    }
    if (isOperator && equation === '') return;

    switch (btnValue) {
      case '=':
      case '+':
      case '-':
      case '*':
      case '/':
      case '%':
        isCalculationOver = false;
        calculateResult(btnValue);
        break;

      case 'AC':
        isCalculationOver = false;
        clearDisplay();
        break;

      case '+/-':
        plusuMinusOperatorResult();
        break;

      default:
        createEquationAndDisplay(btnValue);
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * function to calculate result
 * @param {string} input
 * @returns string
 */
const calculateResult = function (btnValue) {
  try {
    if (btnValue === '=') {
      showResult(btnValue);
    } else if (
      btnValue === '+' ||
      btnValue === '-' ||
      btnValue === '/' ||
      btnValue === '*'
    ) {
      showResult(btnValue);
    } else if (btnValue === '%') {
      showPercentageResult();
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * evaluates and show result for operators : [=, + , - , * , /]
 * @param {string} btnValue
 */
function showResult(btnValue) {
  try {
    let result;
    if (isOperatorPresent()) {
      if (isSecondNumberPresent()) {
        result = eval(equation);
        calculatorDisplayResult.textContent = result;
        equation = String(result);
        if (btnValue === '=') {
          isCalculationOver = true;
        }
        if (btnValue !== '=') {
          createEquationAndDisplay(btnValue);
        }
      } else {
        // Do Nothing (actually replacement of operator)
      }
    } else {
      createEquationAndDisplay(btnValue);
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * function shows result for '%' operator
 */
const showPercentageResult = function () {
  try {
    if (isOperatorPresent()) {
      if (isSecondNumberPresent()) {
        eqSecondNumber = eqSecondNumber / 100;
        updateSecondNumber(eqSecondNumber);
      } else {
        eqSecondNumber = (eqFirstNumber / 100) * eqFirstNumber;
        updateSecondNumber(eqSecondNumber);
      }
    } else {
      equation = String(0);
      calculatorDisplayEquation.textContent = equation;
      calculatorDisplayResult.textContent = equation;
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * function shows result for '+/-' operator
 */
const plusuMinusOperatorResult = function () {
  try {
    let displayResult;
    if (calculatorDisplayResult.textContent !== '') {
      displayResult = calculatorDisplayResult.textContent;
    } else {
      displayResult = equation.slice(0);
    }

    const signvValue = Math.sign(parseInt(displayResult));
    if (signvValue === -1) {
      displayResult = displayResult.replace('-', '');
    } else if (signvValue === 1) {
      displayResult = '-' + displayResult;
    }

    // updating result display
    calculatorDisplayResult.textContent = displayResult.trim();

    //updating equation display
    if (isOperatorPresent()) {
      let operatorIndexValue = getOperatorIndexValue();

      if (operatorIndexValue === 0) {
        equation = '(' + displayResult + ')';
        calculatorDisplayEquation.textContent = displayResult.trim();
      } else {
        updateSecondNumber('(' + displayResult + ')');
      }
    } else {
      equation = '(' + displayResult + ')';
      calculatorDisplayEquation.textContent = displayResult.trim();
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * function to display the calculation on top screen
 *
 * functionalities:
 * a) display the calculation on top screen
 * b) if user entered digit instaed of operator after calculation is over, it should be fresh equation, so prev equation becomes 0.
 *
 * @param {string} input
 */
const createEquationAndDisplay = function (input) {
  try {
    //functionality (b)
    if (isCalculationOver) {
      const isOperator = false;

      allOperators.forEach(function (item) {
        if (item === input) {
          isOperator = true;
        }
      });
      if (!isOperator) {
        equation = '';
        calculatorDisplayResult.textContent = '';
      }
    }

    // functionality(a)
    if (input !== '=') {
      equation += input;
      calculatorDisplayEquation.textContent = equation;
    }

    // supports functionality (b), updates isCalculationOver for digits, it is already updated for operators in driver function
    if (isCalculationOver) {
      isCalculationOver = false;
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * Function to clear display when 'AC' button is pressed
 */
const clearDisplay = function () {
  equation = '';
  calculatorDisplayEquation.textContent = '';
  calculatorDisplayResult.textContent = '';
};

/**
 * a) function to check if Operator present
 * b) get firstnumber and update eqfirstnumber.
 * @returns boolean
 */
const isOperatorPresent = function () {
  try {
    if (
      equation.includes('+') ||
      equation.includes('-') ||
      equation.includes('*') ||
      equation.includes('/')
    ) {
      getFirstNumber();
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * function is used to retrieve index value of operator in equation
 * @returns number 'operatorIndexValue'
 */
const getOperatorIndexValue = function () {
  try {
    let operator = '';
    let operations = ['+', '-', '/', '*'];

    operations.forEach(function (item) {
      if (equation.includes(item)) {
        operator = item;
      }
    });

    const operatorIndexValue = equation.indexOf(operator);
    return operatorIndexValue;
  } catch (error) {
    console.error(error);
  }
};

/**
 * function is used to get first Num and update global variable "eqFirstNumber"
 */
const getFirstNumber = function () {
  try {
    const operatorIndexValue = getOperatorIndexValue();
    eqFirstNumber = equation.slice(0, operatorIndexValue);
  } catch (error) {
    console.error(error);
  }
};

/**
 * function to check if second number present
 * @returns boolean
 */
const isSecondNumberPresent = function () {
  try {
    const operatorIndexValue = getOperatorIndexValue();
    eqSecondNumber = equation.slice(operatorIndexValue + 1);
    return eqSecondNumber === '' ? false : true;
  } catch (error) {
    console.error(error);
  }
};

/**
 * function is used to update second number in equation
 * @param {string} input
 */
const updateSecondNumber = function (input) {
  try {
    const operatorIndexValue = getOperatorIndexValue();
    let firstPart = equation.slice(0, operatorIndexValue + 1);
    let secondPart = input;
    // update number
    equation = firstPart + secondPart;
    calculatorDisplayEquation.textContent = equation;
  } catch (error) {
    console.error(error);
  }
};
