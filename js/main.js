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
});


expensesItemBtn.addEventListener('click', function () {
  let sum = 0;

  for (let i=0; i < expensesList.length; i++) {
    let a = expensesList[i].value;
    let b = expensesList[++i].value;

    if ( (typeof(a)) === 'string' && (typeof(b)) === 'string' && 
    (typeof(a)) != null && (typeof(b)) != null && a != '' && b != '' && a.length < 50) {
      console.log('done');
      appData.expenses[a] = b; 
      sum += +b;
    } else {
      console.log('error');
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
    appData.moneyPerDay = (appData.budget/MONTH).toFixed();
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
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;

});

checkSavings.addEventListener('click', function () {
  if (appData.savings) {
    appData.savings = false;
  } else {
    appData.savings = true;
  };
});


sumValue.addEventListener('input', function () {
  if (appData.savings) {
    let sum = +sumValue.value;
    let percent = +percentValue.value;

    appData.monthinCome = sum/100/12*percent;
    appData.yearinCome = sum/100*percent;
   
    monthSavingsValue.textContent = appData.monthinCome.toFixed(1);
    yearSavingsValue.textContent = appData.yearinCome.toFixed(1);
  }
});


percentValue.addEventListener('input', function () {
  if (appData.savings) {
    let sum = +sumValue.value;
    let percent = +percentValue.value;

    appData.monthinCome = sum/100/12*percent;
    appData.yearinCome = sum/100*percent;
   
    monthSavingsValue.textContent = appData.monthinCome.toFixed(1);
    yearSavingsValue.textContent = appData.yearinCome.toFixed(1);
  }
});




let appData = {
  budget: money,
  timeData: time,
  expenses: {},
  income: [],
  savings: false,
  optionalExpenses: {},
  chooseExpenses: function () {
    for (let i=0; i < 2; i++) {
      let a = prompt('Введите обязательную статью расходов в этом месяце', '');
      let b = prompt('Во сколько обойдется?', '');
      if ( (typeof(a)) === 'string' && (typeof(b)) === 'string' && 
        (typeof(a)) != null && (typeof(b)) != null && a != '' && b != '' && a.length < 50) {
        console.log('done');
        appData.expenses[a] = b; 
      } else {
      console.log('error');
        i--;
      }
    };
  },

  detectDayBudget: function () {
    appData.moneyPerDay = (appData.budget/MONTH).toFixed();
    alert('Ежедневный бюджет: ' + appData.moneyPerDay);
  },

  detectLevel: function () {
    if (appData.moneyPerDay < 100) {
      console.log('Минимальный уровень достатка');
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
      console.log('Cредний уровень достатка');
    } else if (appData.moneyPerDay > 2000) {
      console.log('Высокий уровень достатка');
    } else {
      console.log('Произошла какая-то ошибка');
    };
  },

  checkSavings: function () {
    if (appData.savings) {
    let save = +prompt('Какова сумма накоплений?', '');
    let percent = +prompt('Под какой процент?', '');

    appData.monthinCome = percent/100/12*percent;
    alert('Доход в месяц с вашего депозита: ' + appData.monthinCome);
    }
  },
  
  chooseOptExpenses: function () {
    for (let i = 1; i < 4; i++) {
      let article = prompt('Статья необязательных расходов?', '');
      appData.optionalExpenses[i] = article;
     };
  },

  chooseIncome: function () {
    let items = prompt('Что принесет дополнительный доход? (Перечислите через запятую)', '');
    if (typeof (items) != 'string' || items == '' || items == null) {
      console.log('Неверный формат');
    } else {
      appData.income = items.split(', ');
      appData.income.push(prompt('Может что-то еще?', ''));
      appData.income.sort();
    }
    appData.income.forEach(function (value, i) {
      alert('Способы доп. заработка: ' + (i+1) + ' ' + value);
    })
  }

};

  // for (let key in appData) {
  //   console.log('Наша программа включает в себя данные: ' + key + ' - ' + appData[key]);
  // }


