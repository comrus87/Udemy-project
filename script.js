"use strict";

let money = +prompt('Ваш бюджет на месяц?', '');
let time = prompt('Введите дату в формате YYYY-MM-DD', '');
let necessarilyPart = prompt('Введите обязательную статью расходов в этом месяце', '');
let necessarilyCoint = prompt('Во сколько обойдется?', '');
const MONTH = 30;

let appData = {
	budget: money,
	timeData: time,
    expenses: {
      necessarilyPart: necessarilyCoint
    },
    income: [],
    savings: false
};


alert(appData.budget/MONTH);