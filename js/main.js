"use strict";

const MONTH = 30;
let buttonStart = document.querySelector('#start');
let budgetValue = document.querySelector('.budget-value');
let dayBudgetValue = document.querySelector('.daybudget-value');
let levelValue = document.querySelector('.level-value');
let expensesValue = document.querySelector('.expenses-value');
let optionalExpensesValue = document.querySelector('.optionalexpenses-value');
let incomeValue = document.querySelector('.income-value');
let monthSavingsValue = document.querySelector('.monthsavings-value');
let yearSavingsValue = document.querySelector('.yearsavings-value');

let expensesList = document.querySelectorAll('.expenses-item');

let expensesItemBtn = document.getElementsByTagName('button')[0];

let optionalExpensesBtn = document.getElementsByTagName('button')[1];

let countBudgetBtn = document.getElementsByTagName('button')[2];

let optionalExpensesItems = document.querySelectorAll('.optionalexpenses-item');

let incomeItem = document.querySelector('.choose-income');
let checkSavings = document.querySelector('#savings');
let sumValue = document.querySelector('.choose-sum');
let percentValue = document.querySelector('.choose-percent');
let yearValue = document.querySelector('.year-value');
let monthValue = document.querySelector('.month-value');
let dayValue = document.querySelector('.day-value');

let money, time;

let appData = {
  budget: money,
  timeData: time,
  expenses: {},
  income: [],
  savings: false,
  optionalExpenses: {}
};

expensesItemBtn.disabled = true;
optionalExpensesBtn.disabled = true;
countBudgetBtn.disabled = true;

buttonStart.addEventListener('click', function () {
  money = +prompt('Ваш бюджет на месяц?', '');
  time = prompt('Введите дату в формате YYYY-MM-DD', '');

  while (isNaN(money) || money == '' || money == null) {
    money = +prompt('Ваш бюджет на месяц?', '');
  }

  appData.budget = money;
  appData.timeData = time;
  budgetValue.textContent = money.toFixed();
  yearValue.value = new Date(Date.parse(time)).getFullYear();
  monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
  dayValue.value = new Date(Date.parse(time)).getDate();

  expensesItemBtn.disabled = false;
  optionalExpensesBtn.disabled = false;
  countBudgetBtn.disabled = false;
});


expensesItemBtn.addEventListener('click', function () {
  let sum = 0;

  for (let i=0; i < expensesList.length; i++) {
    let a = expensesList[i].value;
    let b = expensesList[++i].value;

    if ( (typeof(a)) === 'string' && (typeof(b)) === 'string' && 
    (typeof(a)) != null && (typeof(b)) != null && a != '' && b != '' && a.length < 50) {
      appData.expenses[a] = b; 
      sum += +b;
    } else {
      i--;
    }
  };

  expensesValue.textContent = sum;
})

optionalExpensesBtn.addEventListener('click', function () {
  for (let i = 0; i < optionalExpensesItems.length; i++) {
    let opt = optionalExpensesItems[i].value;
    appData.optionalExpenses[i] = opt;
    optionalExpensesValue.textContent += optionalExpensesItems[i].value + ' ';
  };
});

countBudgetBtn.addEventListener('click', function () {
  if (appData.budget != undefined) {
    appData.moneyPerDay = ((appData.budget - +expensesValue.textContent)/MONTH).toFixed();
    dayBudgetValue.textContent = appData.moneyPerDay;

    if (appData.moneyPerDay <= 100) {
      levelValue.textContent = 'Минимальный уровень достатка';
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay <= 2000) {
      levelValue.textContent = 'Cредний уровень достатка';
    } else if (appData.moneyPerDay > 2000) {
      levelValue.textContent = 'Высокий уровень достатка';
    } else {
     levelValue.textContent = 'Произошла какая-то ошибка';
    };
  } else {
    dayBudgetValue.textContent = 'Произошла ошибка';
  }

})

incomeItem.addEventListener('input', function () {
    let items = incomeItem.value;
    if (isNaN(items) || items != '') {
      appData.income = items.split(', ');
      incomeValue.textContent = appData.income;
    };
});

checkSavings.addEventListener('click', function () {
  if (appData.savings) {
    appData.savings = false;
  } else {
    appData.savings = true;
  };
});


let onSavingsInput = function () {
  if (appData.savings) {
    let sum = +sumValue.value;
    let percent = +percentValue.value;

    appData.monthinCome = sum/100/12*percent;
    appData.yearinCome = sum/100*percent;
 
    monthSavingsValue.textContent = appData.monthinCome.toFixed(1);
    yearSavingsValue.textContent = appData.yearinCome.toFixed(1);
  };
};


sumValue.addEventListener('input', onSavingsInput);

percentValue.addEventListener('input', onSavingsInput);
