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
do {
    today.setDate(today.getDate() + 1);
} while (today.getDay() !== 1);

const getDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const getMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const daysDetail = {};

for (let i = 1; i <= 10; i++) {
    daysDetail[`day-${i}`] = new Day(getDay[today.getDay()], getMonth[today.getMonth()], today.getDate());
    today.setDate(today.getDate() + 1);
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
        const { day, month, date } = daysDetail[selectedDay];
        deliveryDate.innerHTML = `<strong>${day}</strong> , ${month} ${date}`;
    }
});

const days = document.querySelectorAll('.day');

days.forEach(dey => {
    let daet = dey.querySelector('.date');
    const { day, month, date } = daysDetail[dey.id];
    daet.innerHTML = `<strong>${day}</strong>, ${month} ${date}`;
    dey.addEventListener('click', function () {
        days.forEach(d => d.classList.remove('selected-day'));
        deliveryDate.innerHTML = `<strong>${day}</strong>, ${month} ${date}`;
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

// Meals Section
let totalCartItems = 0;
let totalItems = 0;
let extras = 0;
let perMealPrice = 0;

function setPrice() {
    const userPlan = localStorage.getItem('selectedPlan');
    if (userPlan) {
        selectedPlan = userPlan;
    }
    else {
        selectedPlan = 'plan-1';
    }
    const { count, price } = plansDetail[selectedPlan];
    totalItems = count;
    perMealPrice = price;
}

setPrice();

function Meal(name, desc, imgUrl, extraPrice = 0, price = perMealPrice) {
    this.name = name;
    this.desc = desc;
    this.imgUrl = imgUrl;
    this.extraPrice = extraPrice;
    this.price = price;
}

const mealsLength = 24;

let mealsCountDetail = {};

const mealsDetail = {
    'meal-1': new Meal('Mix Veggies', 'with Cabbage, Carrots & Chicken', 'assets/images/1.png'),
    'meal-2': new Meal('Protein-Packed Chicken Salad', 'with Fruits & Seeds', 'assets/images/2.png'),
    'meal-3': new Meal('Super-Grain Snacks Bowl', 'with Avocado & Veggies', 'assets/images/3.png', 11.49),
    'meal-4': new Meal('Stir Fried Rice Noodles Bowl', 'with Mushroom & Spanish Pepper', 'assets/images/4.png'),
    'meal-5': new Meal('Cauliflower Pilaf', 'with Chickpea & Cheese', 'assets/images/5.png'),
    'meal-6': new Meal('Keto-Friendly Pasta Bowl', 'with Tina & Spanish', 'assets/images/6.png'),
    'meal-7': new Meal('Vegetable Soup Bowl', 'with Chicken & Sweet Kabu', 'assets/images/7.png'),
    'meal-8': new Meal('Kashmiri Rice', 'with Chicken & Coconut', 'assets/images/8.png'),
    'meal-9': new Meal('Mix Veggies', 'with Cabbage, Carrots & Chicken', 'assets/images/1.png'),
    'meal-10': new Meal('Super-Grain Snacks Bowl', 'with Avocado & Veggies', 'assets/images/3.png', 1.49),
    'meal-11': new Meal('Protein-Packed Chicken Salad', 'with Fruits & Seeds', 'assets/images/2.png'),
    'meal-12': new Meal('Stir Fried Rice Noodles Bowl', 'with Mushroom & Spanish Pepper', 'assets/images/4.png'),
    'meal-13': new Meal('Cauliflower Pilaf', 'with Chickpea & Cheese', 'assets/images/5.png'),
    'meal-14': new Meal('Keto-Friendly Pasta Bowl', 'with Tina & Spanish', 'assets/images/6.png'),
    'meal-15': new Meal('Vegetable Soup Bowl', 'with Chicken & Sweet Kabu', 'assets/images/7.png'),
    'meal-16': new Meal('Kashmiri Rice', 'with Chicken & Coconut', 'assets/images/8.png'),
    'meal-17': new Meal('Mix Veggies', 'with Cabbage, Carrots & Chicken', 'assets/images/1.png'),
    'meal-18': new Meal('Protein-Packed Chicken Salad', 'with Fruits & Seeds', 'assets/images/2.png'),
    'meal-19': new Meal('Keto-Friendly Pasta Bowl', 'with Tina & Spanish', 'assets/images/6.png'),
    'meal-20': new Meal('Stir Fried Rice Noodles Bowl', 'with Mushroom & Spanish Pepper', 'assets/images/4.png'),
    'meal-21': new Meal('Cauliflower Pilaf', 'with Chickpea & Cheese', 'assets/images/5.png'),
    'meal-22': new Meal('Super-Grain Snacks Bowl', 'with Avocado & Veggies', 'assets/images/3.png', 1.49),
    'meal-23': new Meal('Vegetable Soup Bowl', 'with Chicken & Sweet Kabu', 'assets/images/7.png'),
    'meal-24': new Meal('Kashmiri Rice', 'with Chicken & Coconut', 'assets/images/8.png'),
}
const mealsSection = document.getElementById('meals');
const deliveryDays = document.querySelectorAll('.delivery-day');
const clearAllCart = document.querySelectorAll('.clear');
const cartContents = document.querySelectorAll('.cart-body-content');
const cartItems = document.querySelectorAll('.cart-items');
const cartMealsCounts = document.querySelectorAll('.cart-meals-count');
const cartMealsPrices = document.querySelectorAll('.cart-meals-price');
const cartSubTotals = document.querySelectorAll('.cart-sub-total');
const subTotals = document.querySelectorAll('.sub-total-text');
const cartCounts = document.querySelectorAll('.cart-count');
const mealLefts = document.querySelectorAll('.meal-left');
const cartNextBtns = document.querySelectorAll('.cart-next-btn');
const cart = document.getElementById('cart-content');
const cartDown = document.getElementById('cart-down');
const cartUp = document.getElementById('cart-up');

if (cartDown) {
    cartDown.addEventListener('click', function () {
        cart.classList.add('d-none');
    });
}
if (cartUp) {
    cartUp.addEventListener('click', function () {
        cart.classList.remove('d-none');
    });
}

document.addEventListener('DOMContentLoaded', function () {
    loadedCart();
});

function loadedMeals() {
    for (let i = 1; i <= mealsLength; i++) {
        const { name, desc, imgUrl, extraPrice } = mealsDetail[`meal-${i}`];
        let content = '';
        if (extraPrice === 0) {
            content += `
            <div class="col-12 col-md-6 col-lg-4 col-xl-3 p-1">
                <div id="meal-${i}" class="card">
                    <div class="card-img-top">
                        <img class="img-fluid w-100" src="${imgUrl}" alt="${name}">
                    </div>
                    <div class="card-body p-2">
                        <strong class="title">${name}</strong>
                        <p class="desc">${desc}</p>
                        <div class="d-flex justify-content-between desc">
                            <div class="d-flex flex-column pe-1 me-1 position-relative">
                                <div class="divider position-absolute"></div>
                                <span>Gluten</span>
                                <span>Free</span>
                            </div>
                            <div class="d-flex flex-column pe-1 me-1 position-relative">
                                <div class="divider position-absolute"></div>
                                <span>560</span>
                                <span>Cals</span>
                            </div>
                            <div class="d-flex flex-column pe-1 me-1 position-relative">
                                <div class="divider position-absolute"></div>
                                <span>35</span>
                                <span>Carbs</span>
                            </div>
                            <div class="d-flex flex-column">
                                <span>46</span>
                                <span>Protiens</span>
                            </div>

                            <button id="btn-meal-${i}"
                                class="add-btn text-white d-flex justify-content-center align-items-center ms-2 px-2 border-0 rounded flex-wrap">
                                <i class="fa-solid fa-plus fa-xs"></i>
                                <span>Add</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            `
        }
        else {
            content += `
            <div class="col-12 col-md-6 col-lg-4 col-xl-3 p-1">
                <div id="meal-${i}" class="card featured">
                    <div class="card-img-top">
                        <img class="img-fluid w-100" src="${imgUrl}" alt="${name}">
                        <span class="extra-price py-1 px-2">+ $${extraPrice}</span>
                    </div>
                    <div class="card-body p-2">
                        <strong class="title featured">${name}</strong>
                        <div class="desc featured">
                            <p>${desc}</p>
                            <div class="d-flex justify-content-between">
                                <div class="d-flex flex-column pe-1 me-1 position-relative">
                                    <div class="divider position-absolute"></div>
                                    <span>Gluten</span>
                                    <span>Free</span>
                                </div>
                                <div class="d-flex flex-column pe-1 me-1 position-relative">
                                    <div class="divider position-absolute"></div>
                                    <span>560</span>
                                    <span>Cals</span>
                                </div>
                                <div class="d-flex flex-column pe-1 me-1 position-relative">
                                    <div class="divider position-absolute"></div>
                                    <span>35</span>
                                    <span>Carbs</span>
                                </div>
                                <div class="d-flex flex-column">
                                    <span>46</span>
                                    <span>Protiens</span>
                                </div>
                                <button id="btn-meal-${i}"
                                    class="add-btn text-white d-flex justify-content-center align-items-center ms-2 px-2 border-0 rounded flex-wrap">
                                    <i class="fa-solid fa-plus fa-xs"></i>
                                    <span>Add</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        }
        if (mealsSection) {
            mealsSection.innerHTML += content;

        }
    }
}
loadedMeals();

function loadedCart() {
    const { day, month, date } = daysDetail[selectedDay];
    deliveryDays.forEach(deliveryDay => {
        deliveryDay.innerHTML = `My delivery for: <strong>${day}</strong>, ${month} ${date}`;
    });
    const total = localStorage.getItem('totalItems');
    if (total > 0) {
        const subTotalPrice = localStorage.getItem('subTotal');
        const mealPrice = localStorage.getItem('mealPrice');
        mealsCountDetail = JSON.parse(localStorage.getItem('mealsCountDetail'));
        totalCartItems = total;
        cartCounts.forEach(cartCount => {
            cartCount.innerHTML = totalCartItems;
        });
        if (totalCartItems == 1) {
            cartMealsCounts.forEach(cartMealsCount => {
                cartMealsCount.innerHTML = `${totalCartItems} Meal`;
            });
        }
        else {
            cartMealsCounts.forEach(cartMealsCount => {
                cartMealsCount.innerHTML = `${totalCartItems} Meals`;
            });
        }
        cartMealsPrices.forEach(cartMealPrice => {
            cartMealPrice.innerHTML = mealPrice;
        });
        subTotals.forEach(subTotal => {
            subTotal.innerHTML = subTotalPrice;
        });
        cartSubTotals.forEach(subTotal => {
            subTotal.innerHTML = `$${subTotalPrice}`;
        });
        mealLefts.forEach(mealLeft => {
            mealLeft.innerHTML = `Please add <strong>${totalItems - totalCartItems} </strong> more meals.`
        });

        let content = '';
        for (const key in mealsCountDetail) {
            const mealId = key;
            const count = mealsCountDetail[mealId];
            for (let i = 1; i <= count; i++) {
                const { name, imgUrl, extraPrice } = mealsDetail[mealId];
                if (extraPrice == 0) {
                    content += `
                    <div id="card-${mealId}"
                        class="card d-flex flex-row align-items-center justify-content-between gap-1 pe-2 p-1">
                        <div class="w-75 d-flex flex-row align-items-center car-img-top">
                            <img class="img-fluid w-50" src="${imgUrl}" alt="${name}">
                            <p class="my-auto ms-2"><strong class="title">${name}</strong></p>
                        </div>
                        <div class="d-flex flex-column gap-4">
                            <i id="icon-${mealId}" class="fa-solid fa-plus"></i>
                            <i id="icon-${mealId}" class="fa-solid fa-minus"></i>
                        </div>
                    </div>
            `
                }
                else {
                    content += `
                    <div id="card-${mealId}"
                        class="card d-flex flex-row align-items-center justify-content-between gap-1 pe-2 bg-dark p-1 featured">
                        <div class="w-75 d-flex flex-row align-items-center car-img-top">
                            <img class="img-fluid w-50" src="${imgUrl}" alt="${name}">
                            <span class="extra-price px-1 m-1">+ $${extraPrice}</span>
                            <p class="my-auto ms-2"><strong class="title">${name}</strong></p>
                        </div>
                        <div class="d-flex flex-column gap-4">
                            <i id="icon-${mealId}" class="fa-solid fa-plus text-white"></i>
                            <i id="icon-${mealId}" class="fa-solid fa-minus text-white"></i>
                        </div>
                    </div>
                    `
                }
            }
        }
        cartItems.forEach(cartItem => {
            cartItem.innerHTML = content;
        })
        if (totalItems - totalCartItems <= 0) {
            addBtns.forEach(addBtn => {
                addBtn.disabled = true;
                addBtn.classList.add('disabled');
            });
        }
        else {
            cartNextBtns.forEach(cartNextBtn => {
                cartNextBtn.classList.add('disabled');
                cartNextBtn.disabled = true;
            });
        }
    }
    else {
        mealLefts.forEach(mealLeft => {
            mealLeft.innerHTML = `Please add total <strong>${totalItems} items</strong> to continue.`
        });

        cartNextBtns.forEach(cartNextBtn => {
            cartNextBtn.classList.add('disabled');
            cartNextBtn.disabled = true;
        });
        clearAllCart.forEach(clearAll => {
            clearAll.classList.add('d-none');
        });
        cartContents.forEach(cartBody => {
            cartBody.classList.add('d-none');
        });
    }
}

let addBtns = '';

if (mealsSection) {
    addBtns = mealsSection.querySelectorAll('.add-btn');
}
let addIcons = '';
let removeIcons = '';

function savedCart() {
    localStorage.setItem('totalItems', totalCartItems);
    localStorage.setItem('subTotal', subTotals[0].innerHTML);
    localStorage.setItem('mealPrice', cartMealsPrices[0].innerHTML);
    localStorage.setItem('mealsCountDetail', JSON.stringify(mealsCountDetail));
}

function addToCart(addBtn) {
    clearAllCart.forEach(clearAll => {
        clearAll.classList.remove('d-none');
    });
    cartContents.forEach(cartBody => {
        cartBody.classList.remove('d-none');
    });
    const mealId = addBtn.id.split('-').slice(1).join('-');
    const { name, imgUrl, extraPrice, price } = mealsDetail[mealId];
    let content = '';
    totalCartItems++;
    if (extraPrice == 0) {
        content += `
            <div id="card-${mealId}"
                class="card d-flex flex-row align-items-center justify-content-between gap-1 pe-2 p-1">
                <div class="w-75 d-flex flex-row align-items-center car-img-top">
                    <img class="img-fluid w-50" src="${imgUrl}" alt="${name}">
                    <p class="my-auto ms-2"><strong class="title">${name}</strong></p>
                </div>
                <div class="d-flex flex-column gap-4">
                    <i id="icon-${mealId}" class="fa-solid fa-plus"></i>
                    <i id="icon-${mealId}" class="fa-solid fa-minus"></i>
                </div>
            </div>
            `
    }
    else {
        extras = (((extras * 100) + (extraPrice * 100)) / 100).toFixed(2);
        content += `
            <div id="card-${mealId}"
                class="card d-flex flex-row align-items-center justify-content-between gap-1 pe-2 bg-dark p-1 featured">
                <div class="w-75 d-flex flex-row align-items-center car-img-top">
                    <img class="img-fluid w-50" src="${imgUrl}" alt="${name}">
                    <span class="extra-price px-1 m-1">+ $${extraPrice}</span>
                    <p class="my-auto ms-2"><strong class="title">${name}</strong></p>
                </div>
                <div class="d-flex flex-column gap-4">
                    <i id="icon-${mealId}" class="fa-solid fa-plus text-white"></i>
                    <i id="icon-${mealId}" class="fa-solid fa-minus text-white"></i>
                </div>
            </div>
            `
    }
    if (mealsCountDetail[mealId]) {
        mealsCountDetail[mealId]++;
    }
    else {
        mealsCountDetail[mealId] = 1;
    }
    cartItems.forEach(cartItem => {
        cartItem.innerHTML += content;
    });
    cartItems.forEach(cartItem => {
        addIcons = cartItem.querySelectorAll('.fa-plus');
        removeIcons = cartItem.querySelectorAll('.fa-minus');
    });
    if (totalCartItems === 1) {
        cartMealsCounts.forEach(cartMealsCount => {
            cartMealsCount.innerHTML = `${totalCartItems} Meal`;
        });
    }
    else {
        cartMealsCounts.forEach(cartMealsCount => {
            cartMealsCount.innerHTML = `${totalCartItems} Meals`;
        });
    }
    cartCounts.forEach(cartCount => {
        cartCount.innerHTML = totalCartItems;
    });
    if (extras === 0) {
        cartMealsPrices.forEach(cartMealsPrice => {
            cartMealsPrice.innerHTML = `$${price * totalCartItems}`;
        });
    }
    else {
        cartMealsPrices.forEach(cartMealsPrice => {
            cartMealsPrice.innerHTML = `$${price * totalCartItems} + $${extras}`;
        });
    }

    const calculatedPrice = (price * totalCartItems * 100) + (extras * 100);
    cartSubTotals.forEach(cartSubTotal => {
        cartSubTotal.innerHTML = `$${(calculatedPrice / 100).toFixed(2)}`;
    });
    subTotals.forEach(subTotal => {
        subTotal.innerHTML = `${(calculatedPrice / 100).toFixed(2)}`;
    });
    const itemsRem = totalItems - totalCartItems;
    if (itemsRem === 0) {
        addBtns.forEach(addBtn => {
            addBtn.disabled = true;
            addBtn.classList.add('disabled');
        });
        addIcons.forEach(addIcon => {
            addIcon.disabled = true;
            addIcon.classList.add('disabled');
        });

        cartNextBtns.forEach(cartNextBtn => {
            cartNextBtn.classList.remove('disabled');
            cartNextBtn.disabled = false;
        });
        mealLefts.forEach(mealLeft => {
            mealLeft.innerHTML = `<strong>Ready to go!</strong>`
        });
    }
    else {
        cartNextBtns.forEach(cartNextBtn => {
            cartNextBtn.classList.add('disabled');
            cartNextBtn.disabled = true;
        });
        addBtns.forEach(addBtn => {
            addBtn.disabled = false;
            addBtn.classList.remove('disabled');
        });
        if (itemsRem > 1) {
            mealLefts.forEach(mealLeft => {
                mealLeft.innerHTML = `Please add <strong>${totalItems - totalCartItems} </strong> more meals.`
            });
        }
        else if (itemsRem === 1) {
            mealLefts.forEach(mealLeft => {
                mealLeft.innerHTML = `Please add <strong>${totalItems - totalCartItems} </strong> more meals.`
            });
        }
        addIcons.forEach(addIcon => {
            addIcon.addEventListener('click', function () {
                addToCart(addIcon);
            });
        });
    }
    savedCart();

}

function removeFromCart(removeIcon) {
    clearAllCart.forEach(clearAll => {
        clearAll.classList.remove('d-none');
    });
    cartContents.forEach(cartBody => {
        cartBody.classList.remove('d-none');
    });
    const mealId = removeIcon.id.split('-').slice(1).join('-');
    const cardId = `#card-${mealId}`;
    const cardToRemove = cartItems.querySelector(cardId);
    cardToRemove.classList.add('d-none');
    const { extraPrice, price } = mealsDetail[mealId];
    totalCartItems--;
    extras = (((extras * 100) - (extraPrice * 100)) / 100).toFixed(2);
    if (totalCartItems === 1) {
        cartMealsCounts.forEach(cartMealsCount => {
            cartMealsCount.innerHTML = `${totalCartItems} Meal`;
        });
    }
    else {
        cartMealsCounts.forEach(cartMealsCount => {
            cartMealsCount.innerHTML = `${totalCartItems} Meals`;
        });
    }
    cartCounts.forEach(cartCount => {
        cartCount.innerHTML = totalCartItems;
    });
    if (extras === 0) {
        cartMealsPrices.forEach(cartMealsPrice => {
            cartMealsPrice.innerHTML = `$${price * totalCartItems}`;
        });
    }
    else {
        cartMealsPrices.forEach(cartMealsPrice => {
            cartMealsPrice.innerHTML = `$${price * totalCartItems} + $${extras}`;
        });
    }
    const calculatedPrice = (price * totalCartItems * 100) + (extras * 100);
    cartSubTotals.forEach(cartSubTotal => {
        cartSubTotal.innerHTML = `$${(calculatedPrice / 100).toFixed(2)}`;
    });
    subTotals.forEach(subTotal => {
        subTotal.innerHTML = `${(calculatedPrice / 100).toFixed(2)}`;
    });
    const itemsRem = totalItems - totalCartItems;


    cartNextBtns.forEach(cartNextBtn => {
        cartNextBtn.classList.add('disabled');
        cartNextBtn.disabled = true;
    });
    addBtns.forEach(addBtn => {
        addBtn.disabled = false;
        addBtn.classList.remove('disabled');
    });
    if (itemsRem > 1) {
        mealLefts.forEach(mealLeft => {
            mealLeft.innerHTML = `Please add <strong>${totalItems - totalCartItems} </strong> more meals.`
            mealLeft.innerHTML = `Please add total <strong>${totalItems} items</strong> to continue.`
        });
    }
    else if (itemsRem === 1) {
        mealLefts.forEach(mealLeft => {
            mealLeft.innerHTML = `Please add <strong>${totalItems - totalCartItems} </strong> more meals.`
        });
    }
}

if (addBtns) {
    addBtns.forEach(addBtn => {
        addBtn.addEventListener('click', async function () {
            addToCart(addBtn);
            removeIcons.forEach(removeIcon => {
                removeIcon.addEventListener('click', function () {
                    removeFromCart(removeIcon);
                    addIcons.forEach(addIcon => {
                        addIcon.disabled = false;
                        addIcon.classList.remove('disabled');
                    });
                });
            });

        });
    });
}

function clear() {
    totalCartItems = 0;
    extras = 0;
    localStorage.setItem('totalItems', totalCartItems);
    cartItems.forEach(cartItem => {
        cartItem.innerHTML = '';
    });
    cartCounts.forEach(cartCount => {
        cartCount.innerHTML = 0;
    });
    subTotals.forEach(subTotal => {
        subTotal.innerHTML = '';
    });
    clearAllCart.forEach(clearAll => {
        clearAll.classList.add('d-none');
    });
    cartContents.forEach(cartBody => {
        cartBody.classList.add('d-none');
    });
    mealLefts.forEach(mealLeft => {
        mealLeft.innerHTML = `Please add total <strong>${totalItems} items</strong> to continue.`
    });
    addBtns.forEach(addBtn => {
        addBtn.disabled = false;
        addBtn.classList.remove('disabled');
    });
    cartNextBtns.forEach(cartNextBtn => {
        cartNextBtn.classList.add('disabled');
        cartNextBtn.disabled = true;
    });
}

clearAllCart.forEach(clearAll => {
    clearAll.addEventListener('click', function () {
        clear();
    });
});


// Checkout Section
const checkoutBtn = document.getElementById('checkout-btn');

let fName = document.getElementById('fname');
let lName = document.getElementById('lname');
let fullName = document.getElementById('name');
let line1 = document.getElementById('line1');
let city = document.getElementById('city');
let state = document.getElementById('state');
let zip = document.getElementById('zip');
let phone = document.getElementById('phone');
let email = document.getElementById('email');

const fNameReq = document.getElementById('fname-req');
const fNameError = document.getElementById('fname-error');
const lNameReq = document.getElementById('lname-req');
const lNameError = document.getElementById('lname-error');
const nameReq = document.getElementById('name-req');
const nameError = document.getElementById('name-error');
const line1Req = document.getElementById('line1-req');
const cityReq = document.getElementById('city-req');
const cityError = document.getElementById('city-error');
const stateReq = document.getElementById('state-req');
const stateError = document.getElementById('state-error');
const zipReq = document.getElementById('zip-req');
const zipError = document.getElementById('zip-error');
const phoneReq = document.getElementById('phone-req');
const phoneError = document.getElementById('phone-error');
const emailReq = document.getElementById('email-req');
const emailError = document.getElementById('email-error');

if (fName && lName && fullName && line1 && city && state && zip && phone && email) {
    fName.addEventListener('input', function () { validatefName(fName.value) });
    lName.addEventListener('input', function () { validatelName(lName.value) });
    fullName.addEventListener('input', function () { validateName(fullName.value) });
    line1.addEventListener('input', function () { validateLine1(line1.value) });
    city.addEventListener('input', function () { validateCity(city.value) });
    state.addEventListener('input', function () { validateState(state.value) });
    zip.addEventListener('input', function () { validateZip(zip.value) });
    phone.addEventListener('input', function () { validatePhone(phone.value) });
    email.addEventListener('input', function () { validateEmail(email.value) });
}

let isValidated = false;

if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function () {
        if (isValidated) {
            alert('Your order has been placed successfully!');
        }
    }
    );
}

function validatefName(name) {
    if (name) {
        if (isInvalidName(name)) {
            checkoutBtn.classList.add('disabled');
            fNameError.classList.remove('d-none');
        }
        else {
            fNameError.classList.add('d-none');
        }
        fNameReq.classList.add('d-none');
    }
    else {
        checkoutBtn.classList.add('disabled');
        fNameReq.classList.remove('d-none');
        fNameError.classList.add('d-none');
    }
}

function validatelName(name) {
    if (name) {
        if (isInvalidName(name)) {
            checkoutBtn.classList.add('disabled');
            isValidated = false;
            lNameError.classList.remove('d-none');
        }
        else {
            lNameError.classList.add('d-none');
        }
        lNameReq.classList.add('d-none');
    }
    else {
        checkoutBtn.classList.add('disabled');
        isValidated = false;
        lNameReq.classList.remove('d-none');
        lNameError.classList.add('d-none');
    }
}

function validateName(name) {
    if (name) {
        if (isInvalidName(name)) {
            checkoutBtn.classList.add('disabled');
            nameError.classList.remove('d-none');
        }
        else {
            nameError.classList.add('d-none');
        }
        nameReq.classList.add('d-none');
    }
    else {
        checkoutBtn.classList.add('disabled');
        nameReq.classList.remove('d-none');
        nameError.classList.add('d-none');
    }
}

function validateLine1(line) {
    if (line) {
        line1Req.classList.add('d-none');
    }
    else {
        line1Req.classList.remove('d-none');
    }
}

function validateCity(city) {
    if (city) {
        if (isInvalidName(city)) {
            checkoutBtn.classList.add('disabled');
            cityError.classList.remove('d-none');
        }
        else {
            cityError.classList.add('d-none');
        }
        cityReq.classList.add('d-none');
    }
    else {
        checkoutBtn.classList.add('disabled');
        cityReq.classList.remove('d-none');
        cityError.classList.add('d-none');
    }
}

function validateState(state) {
    if (state) {
        if (isInvalidName(state)) {
            checkoutBtn.classList.add('disabled');
            stateError.classList.remove('d-none');
        }
        else {
            stateError.classList.add('d-none');
        }
        stateReq.classList.add('d-none');
    }
    else {
        checkoutBtn.classList.add('disabled');
        isValidated = false;
        stateReq.classList.remove('d-none');
        stateError.classList.add('d-none');
    }
}

function validateZip(zip) {
    if (zip) {
        if (isInvalidZip(zip)) {
            checkoutBtn.classList.add('disabled');
            zipError.classList.remove('d-none');
        }
        else {
            zipError.classList.add('d-none');
        }
        zipReq.classList.add('d-none');
    }
    else {
        checkoutBtn.classList.add('disabled');
        isValidated = false;
        zipError.classList.add('d-none');
        zipReq.classList.remove('d-none');
    }
}

function validatePhone(phone) {
    if (phone) {
        if (isInvalidPhone(phone)) {
            checkoutBtn.classList.add('disabled');
            phoneError.classList.remove('d-none');
        }
        else {
            phoneError.classList.add('d-none');
        }
        phoneReq.classList.add('d-none');
    }
    else {
        checkoutBtn.classList.add('disabled');
        phoneError.classList.add('d-none');
        phoneReq.classList.remove('d-none');
    }
}

function validateEmail(email) {
    if (email) {
        if (isInvalidEmail(email)) {
            checkoutBtn.classList.add('disabled');
            emailError.classList.remove('d-none');
        }
        else {
            checkoutBtn.classList.remove('disabled');
            emailError.classList.add('d-none');
        }
        emailReq.classList.add('d-none');
        isValidated = true;
    }
    else {
        checkoutBtn.classList.add('disabled');
        emailError.classList.add('d-none');
        emailReq.classList.remove('d-none');
    }
}

function isInvalidName(name) {
    return !(/^[A-Za-z]+$/.test(name));
}

function hasAllDigits(number) {
    return /^\d+$/.test(number);
}

function isInvalidZip(zip) {
    return !hasAllDigits(zip);
}

function isInvalidPhone(phone) {
    return phone.length != 11 || !hasAllDigits(phone);
}

function isInvalidEmail(email) {
    return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidCode(code) {
    return hasAllDigits(code) && code >= 1 && code <= 50;
}

const checkoutCart = document.getElementById('checkout-cart');
const orderPrice = document.getElementById('order-price');
const orderTotal = document.getElementById('order-total');
const promoCode = document.getElementById('promo-code');
const promoInput = document.getElementById('promo-input');
const discount = document.getElementById('discount');
const shipping = 8.99;
const tax = 10.99;
let orderSubTotal = 0;
let orderTotalPrice = 0;
let discountedAmount = 0;

if (promoCode) {
    promoCode.addEventListener('click', function () {
        promoCode.classList.add('d-none');
        promoInput.classList.remove('d-none');
        promoInput.focus();
    });
    promoInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            const code = promoInput.value.trim();
            promoCode.classList.remove('d-none');
            promoInput.classList.add('d-none');
            if (code && isValidCode(code)) {
                discount.classList.remove('d-none');
                discountedAmount = (((orderSubTotal*100) * (code / 100))/100).toFixed(2);
                discount.innerHTML = `
                    <span>Discount</span>
                    <span class="fw-bold text-success">$${discountedAmount}</span>
                `
                orderTotalPrice = ((orderTotalPrice*100 - discountedAmount*100)/100).toFixed(2); 
                orderTotal.innerHTML = `$${orderTotalPrice}`;
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    if (checkoutBtn) {
        checkoutBtn.classList.add('disabled');

        orderSubTotal = localStorage.getItem('subTotal');
        orderPrice.innerHTML = `$${orderSubTotal}`;
        orderTotalPrice = ((orderSubTotal * 100 + shipping * 100 + tax * 100) / 100).toFixed(2);
        orderTotal.innerHTML = `$${orderTotalPrice}`;

        mealsCountDetail = JSON.parse(localStorage.getItem('mealsCountDetail'));
        let content = '';
        for (const key in mealsCountDetail) {
            const mealId = key;
            const count = mealsCountDetail[mealId];
            const { name, desc, imgUrl, extraPrice } = mealsDetail[mealId];
            if (extraPrice == 0) {
                content += `
                    <div class="card rounded-0 d-flex flex-row align-items-center gap-1 pe-2 p-1">
                        <div class="d-flex flex-row align-items-center">
                            <p class="d-flex px-3 my-auto fw-bold">${count}</p>
                            <div class="position-relative d-flex">
                                <img class="img-fluid" width="130" height="100" src="${imgUrl}" alt="${name}">
                            </div>
                            <div class="d-flex flex-column">
                                <p class="my-auto ms-2"><strong class="title">${name}</strong></p>
                                <p class="desc my-auto ms-2 text-secondary">${desc}</p>
                            </div>
                        </div>
                    </div>
                    `
            }
            else {
                content += `
                    <div class="card rounded-0 d-flex flex-row align-items-center gap-1 pe-2 p-1 bg-dark featured">
                        <div class="d-flex flex-row align-items-center">
                            <p class="d-flex px-3 my-auto fw-bold">${count}</p>
                            <div class="position-relative d-flex">
                                <img class="img-fluid" width="130" height="100" src="${imgUrl}" alt="${name}">
                                <span class="extra-price px-2">+$55.98</span>
                            </div>
                            <div class="d-flex flex-column">
                                <p class="my-auto ms-2"><strong class="title">${name}</strong></p>
                                <p class="desc my-auto ms-2 text-white">${desc}</p>
                            </div>
                        </div>
                    </div>
                `
            }
        }
        checkoutCart.innerHTML = content;
    }
});


