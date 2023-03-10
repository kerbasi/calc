const display = document.querySelector(".calc__display-digits");
const buttons = document.querySelector(".calc__buttons");
const displayAbove = document.querySelector(".calc__display-above");

let firstOperand = "0";
let secondOperand = "0";
let operator = "";
let enableFirstOperatorSetting = true;
let pointUsed = false;

function calc(a, b, operator) {
  const operations = {
    "+": add,
    "-": diff,
    "*": mul,
    "/": div,
  };
  if (operator === "=") {
    return b;
  }
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
  if (display.innerText.length > 11) {
    display.style.fontSize = `${
      1.25 - Math.floor(display.innerText.length / 6) / 5
    }em`;
  } else {
    display.style.fontSize = "30px";
  }
  console.log(display.innerText.length, display.style.fontSize);
}

function setAboveDisplay(value1, value2, operator) {
  displayAbove.textContent = `${value1} ${
    !enableFirstOperatorSetting ? operator : ""
  } ${!enableFirstOperatorSetting ? value2 : ""}`;
}

function resetCalc() {
  firstOperand = "0";
  secondOperand = "0";
  operator = "";
  enableFirstOperatorSetting = true;
  pointUsed = false;
  setDisplay(firstOperand);
}

buttons.addEventListener("click", (event) => {
  if (event.target.classList.contains("calc__button")) {
    event.target.classList.add("clicked");
    setTimeout(() => event.target.classList.remove("clicked"), 50);
    const value = event.target.innerText;
    if (value === "C") {
      resetCalc();
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
        if (value === "-" && firstOperand === "0") {
          firstOperand = "-";
          setDisplay(firstOperand);
        } else {
          if (firstOperand === "-") {
            firstOperand = "0";
          }
          operator = value;
          enableFirstOperatorSetting = false;
          pointUsed = false;
          setDisplay(firstOperand);
        }
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
