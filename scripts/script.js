﻿const displayText = document.querySelector(".calc__display-text");
const buttons = document.querySelectorAll(".calc__button");

let firstOperand = "";
let secondOperand = "";
let operator = "";
let enableFirstOperatorSetting = true;

buttons.forEach((button) =>
  button.addEventListener("click", () => {
    const value = button.querySelector("p").innerHTML;
    if (
      value !== "*" &&
      value !== "/" &&
      value !== "+" &&
      value !== "-" &&
      value !== "="
    ) {
      if (enableFirstOperatorSetting) {
        firstOperand += value;
      } else {
        secondOperand += value;
      }
    } else {
      operator = value;
      if (!enableFirstOperatorSetting) {
        calc(firstOperand, secondOperand, operator);
      }
      enableFirstOperatorSetting = !enableFirstOperatorSetting;
    }
    displayText.innerText = `${firstOperand} ${operator} ${secondOperand}`;
  })
);

function calc(a, b, operator) {
  console.log(a, b, operator);
}