// Plans Section
function Plan(count, planPrice, price) {
    this.count = count;
    this.planPrice = planPrice;
    this.price = price
}

const plansDetail = {
    'plan-1': new Plan(4, 56, 11.49),
    'plan-2': new Plan(6, 84, 9.49),
    'plan-3': new Plan(10, 140, 8.99),
    'plan-4': new Plan(12, 168, 8.49)
}

let selectedPlan = '';

document.addEventListener('DOMContentLoaded', function () {
    const userPlan = localStorage.getItem('selectedPlan');
    if (userPlan) {
        selectedPlan = userPlan;
    }
    else {
        selectedPlan = 'plan-1';
    }
    const planId = document.getElementById(selectedPlan);
    if (planId) {
        planId.classList.add('selected-plan');
    }
});

const plans = document.querySelectorAll('.plan');
plans.forEach(plan => {
    const { count, planPrice, price } = plansDetail[plan.id];
    plan.querySelector('.count').textContent = count;
    plan.querySelector('.price').textContent = '$' + planPrice;
    plan.querySelector('.per-price').textContent = price;
    plan.addEventListener('click', () => {
        plans.forEach(p => p.classList.remove('selected-plan'));
        plan.classList.add('selected-plan');
        selectedPlan = plan.id;
    });
});

const getStarted = document.getElementById('start-btn');
if (getStarted) {
    getStarted.addEventListener('click', function () {
        //const { count, planPrice, price } = plansDetail[selectedPlan];
        //alert(`${selectedPlan} is selected: ${count} Meals (per week), Plan Price: $${planPrice}, Price Per Meal: $${price}/meal`);
        localStorage.setItem('selectedPlan', selectedPlan);
    });
}

// Day Section
function Day(day, month, date) {
    this.day = day;
    this.month = month;
    this.date = date
}

let today = new Date();

// get the first day is monday
do{
    today.setDate(today.getDate() +1);
}while(today.getDay()!==1);

const getDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const getMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const daysDetail = {};

for (let i = 1; i<= 10; i++){
    daysDetail[`day-${i}`] = new Day(getDay[today.getDay()], getMonth[today.getMonth()], today.getDate());
    today.setDate(today.getDate() +1);
}

let selectedDay = '';
let deliveryDate = document.getElementById('delivery-date');

document.addEventListener('DOMContentLoaded', function () {
    const userDay = localStorage.getItem('selectedDay');
    if (userDay) {
        selectedDay = userDay;
    }
    else {
        selectedDay = 'day-1';
    }
    const dayId = document.getElementById(selectedDay);
    if (dayId) {
        dayId.classList.add('selected-day');
        const {day, month, date} = daysDetail[selectedDay]; 
        deliveryDate.innerHTML = `<strong>${day}</strong> , ${month} ${date}`;
    }
});

const days = document.querySelectorAll('.day');

days.forEach(dey => {
    let daet = dey.querySelector('.date');
    const {day, month, date} = daysDetail[dey.id]; 
    daet.innerHTML = `<strong>${day}</strong> , ${month} ${date}`;
    dey.addEventListener('click', function(){
        days.forEach(d => d.classList.remove('selected-day'));
        deliveryDate.innerHTML = `<strong>${day}</strong> , ${month} ${date}`;
        dey.classList.add('selected-day');
        selectedDay = dey.id;
    });
});

const nextBtn = document.getElementById('next-btn');
if (nextBtn) {
    nextBtn.addEventListener('click', function () {
        localStorage.setItem('selectedDay', selectedDay);
    });
}