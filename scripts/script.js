const display = document.querySelector(".calc__display-digits");
const buttons = document.querySelector(".calc__buttons");
const displayAbove = document.querySelector(".calc__display-above");

let firstOperand = "0";
let secondOperand = "0";
let operator = "";
let enableFirstOperatorSetting = true;
let pointUsed = false;

buttons.addEventListener("click", (event) => {
  if (Array.from(event.target.classList).includes("calc__button")) {
    const value = event.target.querySelector("p").innerHTML;
    if (value === "C") {
      firstOperand = "0";
      secondOperand = "0";
      operator = "";
      enableFirstOperatorSetting = true;
      pointUsed = false;
      setDisplay(firstOperand);
    } else if (
      value !== "*" &&
      value !== "/" &&
      value !== "+" &&
      value !== "-" &&
      value !== "="
    ) {
      if (value === "." && pointUsed) {
        return;
      } else if (value === ".") {
        pointUsed = true;
      }
      if (enableFirstOperatorSetting) {
        if (firstOperand === "0" && value !== ".") {
          firstOperand = value;
        } else {
          firstOperand += value;
        }
        setDisplay(firstOperand);
      } else {
        if (secondOperand === "0" && value !== ".") {
          secondOperand = value;
        } else {
          secondOperand += value;
        }
        setDisplay(secondOperand);
      }
    } else {
      if (enableFirstOperatorSetting) {
        operator = value;
        enableFirstOperatorSetting = false;
        pointUsed = false;
      } else {
        let sum = calc(firstOperand, secondOperand, operator);
        setDisplay(sum);
        firstOperand = sum;
        enableFirstOperatorSetting = true;
        secondOperand = "0";
        pointUsed = false;
      }
    }
  }
});

function calc(a, b, operator) {
  const operations = {
    "+": add,
    "-": diff,
    "*": mul,
    "/": div,
  };

  return operations[operator](a, b);
}

function add(a, b) {
  return Number(a) + Number(b);
}

function diff(a, b) {
  return Number(a) - Number(b);
}

function mul(a, b) {
  return Number(a) * Number(b);
}

function div(a, b) {
  return Number(a) / Number(b);
}

function setDisplay(value) {
  display.textContent = value;
  setAboveDisplay(firstOperand, secondOperand, operator);
}

function setAboveDisplay(value1, value2, operator) {
  displayAbove.textContent = `${value1} ${
    !enableFirstOperatorSetting ? operator : ""
  } ${!enableFirstOperatorSetting ? value2 : ""}`;
}
