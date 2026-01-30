$(document).ready(function () {

    /* jQuery-steps */
    const wizard = $("#wizard").steps({
        headerTag: "h3",
        bodyTag: "section",
        transitionEffect: "slideLeft",
        autoFocus: true,
        enablePagination: false
    });
    $("#wizard .steps li").removeClass("current");
    $("#wizard .steps li:first").addClass("current");

    /* Local Storage */
    const STORAGE_KEY = 'freshlyOrderState';

    let STATE = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
        planId: null,
        dayId: null,
        meals: {},
        promoCode: null
    };

    function saveState() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(STATE));
    }

    function resetMeals() {
        STATE.meals = {};
        STATE.promoCode = null;
        saveState();
    }

    function resetPromoCode() {
        STATE.promoCode = null;
        saveState();
    }

    function resetState() {
        STATE.planId = null;
        STATE.dayId = null;
        STATE.meals = {};
        STATE.promoCode = null;
        saveState();
    }

    /* Plans Section */
    const plansDetail = {
        'plan-1': { count: 4, planPrice: 56, price: 11.49, imgUrl: 'assets/images/4-meals.webp' },
        'plan-2': { count: 6, planPrice: 84, price: 9.49, imgUrl: 'assets/images/6-meals.webp' },
        'plan-3': { count: 10, planPrice: 140, price: 8.99, imgUrl: 'assets/images/10-meals.webp' },
        'plan-4': { count: 12, planPrice: 168, price: 8.49, imgUrl: 'assets/images/12-meals.webp' }
    };

    function renderPlan() {
        let content = '';
        for (let i = 1; i <= 4; i++) {
            const planId = `plan-${i}`
            const { count, planPrice, price, imgUrl } = plansDetail[planId];
            content += `
            <div id="${planId}" class="col-5 col-md-4 col-xl-auto px-0 plan">
                <div class="d-flex flex-column gap-3 px-0">
                    <div class="meals-img position-relative">
                        ${i === 1 ? `<span class="rounded-pill text-dark bg-white px-2 p-0 position-absolute">Save
                            upto 10$</span>`: ''}
                        <img src="${imgUrl}" alt="4-meals" class="img-fluid w-100">
                    </div>
                    <div>
                        <p class="m-0 p-0">
                            <strong class="meals"><span class="count">${count}</span> Meals</strong>
                            <span class="per-week">(per week)</span>
                        </p>
                        <p class="m-0 p-0 plan-price">Plan Price: <span class="price">$${planPrice}</span>
                        </p>
                        <p class="m-0 p-0 per-meal">$<span class="per-price">${price}</span>/meal</p>
                    </div>
                </div>
            </div>
        `
        }
        $('#plan').html(content);
    }
    renderPlan();

    if (STATE.planId) {
        $('#' + STATE.planId).addClass('selected-plan');
        $('#start-btn').removeClass('disabled');
    }
    else {
        $("#start-btn").addClass('disabled');
    }

    $('.plan').on('click', function () {
        const newPlan = this.id;

        if (STATE.planId && STATE.planId !== newPlan) {
            resetMeals();
        }

        $('.plan').removeClass('selected-plan');
        $(this).addClass('selected-plan');

        STATE.planId = newPlan;
        saveState();
        renderCart();
        renderCheckout();
        $('#start-btn').removeClass('disabled');
    });

    $('#start-btn').on('click', () => wizard.steps('next'));

    /* Day Section */
    const daysDetail = {};
    let today = new Date();
    do {
        today.setDate(today.getDate() + 1);
    } while (today.getDay() !== 1);

    const dNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const mNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    if (!STATE.dayId) STATE.dayId = 'day-1';

    function renderDay() {
        let content = '';
        for (let i = 1; i <= 10; i++) {
            const dayId = `day-${i}`;
            daysDetail[dayId] = {
                day: dNames[today.getDay()],
                month: mNames[today.getMonth()],
                date: today.getDate()
            };
            today.setDate(today.getDate() + 1);
            const { day, month, date } = daysDetail[dayId];
            content += `
                <div class="day" id="${dayId}">
                    ${i===1? `
                    <div class="day-text ps-3 d-flex justify-content-between align-items-center popular">
                        <span class="date"><strong class="pe-0 me-0">${day}</strong>, ${month} ${date}</span>
                        <span class="pe-3 popular-text">Most Popular</span>
                    </div>
                    `:
                    `
                    <div class="day-text ps-3 date">
                        <strong class="pe-0 me-0">${day}</strong>, ${month} ${date}`}
                    </div>
                </div>
            `
        }
        $('#day').html(content);
    }
    renderDay();

    const { day, month, date } = daysDetail[STATE.dayId];
    $('#delivery-date').html(`<strong>${day}</strong>, ${month} ${date}`);
    $(`#${STATE.dayId}`).addClass('selected-day');

    $('.day').on('click', function () {
        $('.day').removeClass('selected-day');
        const { day, month, date } = daysDetail[this.id];
        $('#delivery-date').html(`<strong>${day}</strong>, ${month} ${date}`);
        $(this).addClass('selected-day');
        STATE.dayId = this.id;
        renderCart();
        renderCheckout();
        saveState();
    });

    $('#next-btn').on('click', () => wizard.steps('next'));

    /* Accordion Section */
    $(`.accordion`).html(
        `
        <hr>
        <h1 id="accordion-heading" class="text-center pt-5 pb-2">Common Questions</h1>
        <div class="row mx-auto d-flex flex-column justify-content-center align-items-center">
            <div class="col-12 col-md-10">
                <div class="accordion" id="common-questions">
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button"
                                data-bs-toggle="collapse" data-bs-target="#question-1">
                                How many servings are your meals?
                            </button>
                        </h2>
                        <div id="question-1" class="collapse" data-bs-parent="#common-questions">
                            <div class="accordion-body">
                                <p>The majority of our meals are single serving and meant to feed an average
                                    adult.
                                    We also offer multi-serve proteins and sides, which are designed to feed
                                    multiple people
                                    for extra mealtime flexibility. These delicious, ready-to-heat options
                                    can
                                    help
                                    you
                                    bulk up existing meals, simplify home cooking, or even build an entire
                                    meal—the
                                    choice
                                    is yours!
                                </p>
                                <p>Our 6-meal plan is perfect for a person looking for 6 dinners (or
                                    lunches!) a
                                    week. On average, our meals weigh in at about 13 ounces and range from
                                    300
                                    to
                                    650
                                    calories. If you have a larger household, we do offer a 12 meal per week
                                    subscription (it's
                                    perfect for couples or a family of 4 looking for 3 meals per week).
                                    Plus,
                                    you
                                    can always
                                    order multiple subscriptions.</p>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button"
                                data-bs-toggle="collapse" data-bs-target="#question-2">
                                Do you accommodate dietary preferences?
                            </button>
                        </h2>
                        <div id="question-2" class="collapse" data-bs-parent="#common-questions">
                            <div class="accordion-body">
                                <p>The majority of our meals are single serving and meant to feed an average
                                    adult.
                                    We also offer multi-serve proteins and sides, which are designed to feed
                                    multiple people
                                    for extra mealtime flexibility. These delicious, ready-to-heat options
                                    can
                                    help
                                    you
                                    bulk up existing meals, simplify home cooking, or even build an entire
                                    meal—the
                                    choice
                                    is yours!
                                </p>
                                <p>Our 6-meal plan is perfect for a person looking for 6 dinners (or
                                    lunches!) a
                                    week. On average, our meals weigh in at about 13 ounces and range from
                                    300
                                    to
                                    650
                                    calories. If you have a larger household, we do offer a 12 meal per week
                                    subscription (it's
                                    perfect for couples or a family of 4 looking for 3 meals per week).
                                    Plus,
                                    you
                                    can always
                                    order multiple subscriptions.</p>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button"
                                data-bs-toggle="collapse" data-bs-target="#question-3">
                                How long do the meals last?
                            </button>
                        </h2>
                        <div id="question-3" class="collapse" data-bs-parent="#common-questions">
                            <div class="accordion-body">
                                <p>The majority of our meals are single serving and meant to feed an average
                                    adult.
                                    We also offer multi-serve proteins and sides, which are designed to feed
                                    multiple people
                                    for extra mealtime flexibility. These delicious, ready-to-heat options
                                    can
                                    help
                                    you
                                    bulk up existing meals, simplify home cooking, or even build an entire
                                    meal—the
                                    choice
                                    is yours!
                                </p>
                                <p>Our 6-meal plan is perfect for a person looking for 6 dinners (or
                                    lunches!) a
                                    week. On average, our meals weigh in at about 13 ounces and range from
                                    300
                                    to
                                    650
                                    calories. If you have a larger household, we do offer a 12 meal per week
                                    subscription (it's
                                    perfect for couples or a family of 4 looking for 3 meals per week).
                                    Plus,
                                    you
                                    can always
                                    order multiple subscriptions.</p>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button"
                                data-bs-toggle="collapse" data-bs-target="#question-4">
                                How do I heat up my meals?
                            </button>
                        </h2>
                        <div id="question-4" class="collapse" data-bs-parent="#common-questions">
                            <div class="accordion-body">
                                <p>The majority of our meals are single serving and meant to feed an average
                                    adult.
                                    We also offer multi-serve proteins and sides, which are designed to feed
                                    multiple people
                                    for extra mealtime flexibility. These delicious, ready-to-heat options
                                    can
                                    help
                                    you
                                    bulk up existing meals, simplify home cooking, or even build an entire
                                    meal—the
                                    choice
                                    is yours!
                                </p>
                                <p>Our 6-meal plan is perfect for a person looking for 6 dinners (or
                                    lunches!) a
                                    week. On average, our meals weigh in at about 13 ounces and range from
                                    300
                                    to
                                    650
                                    calories. If you have a larger household, we do offer a 12 meal per week
                                    subscription (it's
                                    perfect for couples or a family of 4 looking for 3 meals per week).
                                    Plus,
                                    you
                                    can always
                                    order multiple subscriptions.</p>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button"
                                data-bs-toggle="collapse" data-bs-target="#question-5">
                                How does shipping work?
                            </button>
                        </h2>
                        <div id="question-5" class="collapse" data-bs-parent="#common-questions">
                            <div class="accordion-body">
                                <p>The majority of our meals are single serving and meant to feed an average
                                    adult.
                                    We also offer multi-serve proteins and sides, which are designed to feed
                                    multiple people
                                    for extra mealtime flexibility. These delicious, ready-to-heat options
                                    can
                                    help
                                    you
                                    bulk up existing meals, simplify home cooking, or even build an entire
                                    meal—the
                                    choice
                                    is yours!
                                </p>
                                <p>Our 6-meal plan is perfect for a person looking for 6 dinners (or
                                    lunches!) a
                                    week. On average, our meals weigh in at about 13 ounces and range from
                                    300
                                    to
                                    650
                                    calories. If you have a larger household, we do offer a 12 meal per week
                                    subscription (it's
                                    perfect for couples or a family of 4 looking for 3 meals per week).
                                    Plus,
                                    you
                                    can always
                                    order multiple subscriptions.</p>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button"
                                data-bs-toggle="collapse" data-bs-target="#question-6">
                                How does the subscription work?
                            </button>
                        </h2>
                        <div id="question-6" class="collapse" data-bs-parent="#common-questions">
                            <div class="accordion-body">
                                <p>The majority of our meals are single serving and meant to feed an average
                                    adult.
                                    We also offer multi-serve proteins and sides, which are designed to feed
                                    multiple people
                                    for extra mealtime flexibility. These delicious, ready-to-heat options
                                    can
                                    help
                                    you
                                    bulk up existing meals, simplify home cooking, or even build an entire
                                    meal—the
                                    choice
                                    is yours!
                                </p>
                                <p>Our 6-meal plan is perfect for a person looking for 6 dinners (or
                                    lunches!) a
                                    week. On average, our meals weigh in at about 13 ounces and range from
                                    300
                                    to
                                    650
                                    calories. If you have a larger household, we do offer a 12 meal per week
                                    subscription (it's
                                    perfect for couples or a family of 4 looking for 3 meals per week).
                                    Plus,
                                    you
                                    can always
                                    order multiple subscriptions.</p>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button"
                                data-bs-toggle="collapse" data-bs-target="#question-7">
                                How does shipping work?
                            </button>
                        </h2>
                        <div id="question-7" class="collapse" data-bs-parent="#common-questions">
                            <div class="accordion-body">
                                <p>The majority of our meals are single serving and meant to feed an average
                                    adult.
                                    We also offer multi-serve proteins and sides, which are designed to feed
                                    multiple people
                                    for extra mealtime flexibility. These delicious, ready-to-heat options
                                    can
                                    help
                                    you
                                    bulk up existing meals, simplify home cooking, or even build an entire
                                    meal—the
                                    choice
                                    is yours!
                                </p>
                                <p>Our 6-meal plan is perfect for a person looking for 6 dinners (or
                                    lunches!) a
                                    week. On average, our meals weigh in at about 13 ounces and range from
                                    300
                                    to
                                    650
                                    calories. If you have a larger household, we do offer a 12 meal per week
                                    subscription (it's
                                    perfect for couples or a family of 4 looking for 3 meals per week).
                                    Plus,
                                    you
                                    can always
                                    order multiple subscriptions.</p>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button"
                                data-bs-toggle="collapse" data-bs-target="#question-8">
                                How does the subscription work?
                            </button>
                        </h2>
                        <div id="question-8" class="collapse" data-bs-parent="#common-questions">
                            <div class="accordion-body">
                                <p>The majority of our meals are single serving and meant to feed an average
                                    adult.
                                    We also offer multi-serve proteins and sides, which are designed to feed
                                    multiple people
                                    for extra mealtime flexibility. These delicious, ready-to-heat options
                                    can
                                    help
                                    you
                                    bulk up existing meals, simplify home cooking, or even build an entire
                                    meal—the
                                    choice
                                    is yours!
                                </p>
                                <p>Our 6-meal plan is perfect for a person looking for 6 dinners (or
                                    lunches!) a
                                    week. On average, our meals weigh in at about 13 ounces and range from
                                    300
                                    to
                                    650
                                    calories. If you have a larger household, we do offer a 12 meal per week
                                    subscription (it's
                                    perfect for couples or a family of 4 looking for 3 meals per week).
                                    Plus,
                                    you
                                    can always
                                    order multiple subscriptions.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    );

    /* Meals Section */
    let price = 0;
    if (STATE.planId) {
        price = plansDetail[STATE.planId];
    }
    const mealsDetail = {
        'meal-1': {
            name: 'Mix Veggies',
            desc: 'with Cabbage, Carrots & Chicken',
            imgUrl: 'assets/images/1.webp',
            extraPrice: 0,
            price: price,
        },
        'meal-2': {
            name: 'Protein-Packed Chicken Salad',
            desc: 'with Fruits & Seeds',
            imgUrl: 'assets/images/2.webp',
            extraPrice: 0,
            price: price,
        },
        'meal-3': {
            name: 'Super-Grain Snacks Bowl',
            desc: 'with Avocado & Veggies',
            imgUrl: 'assets/images/3.webp',
            extraPrice: 11.49,
            price: price,
        },
        'meal-4': {
            name: 'Stir Fried Rice Noodles Bowl',
            desc: 'with Mushroom & Spanish Pepper',
            imgUrl: 'assets/images/4.webp',
            extraPrice: 0,
            price: price,
        },
        'meal-5': {
            name: 'Cauliflower Pilaf',
            desc: 'with Chickpea & Cheese',
            imgUrl: 'assets/images/5.webp',
            extraPrice: 0,
            price: price,
        },
        'meal-6': {
            name: 'Keto-Friendly Pasta Bowl',
            desc: 'with Tina & Spanish',
            imgUrl: 'assets/images/6.webp',
            extraPrice: 0,
            price: price,
        },
        'meal-7': {
            name: 'Vegetable Soup Bowl',
            desc: 'with Chicken & Sweet Kabu',
            imgUrl: 'assets/images/7.webp',
            extraPrice: 0,
            price: price,
        },
        'meal-8': {
            name: 'Kashmiri Rice',
            desc: 'with Chicken & Coconut',
            imgUrl: 'assets/images/8.webp',
            extraPrice: 0,
            price: price,
        },
        'meal-9': {
            name: 'Mix Veggies',
            desc: 'with Cabbage, Carrots & Chicken',
            imgUrl: 'assets/images/1.webp',
            extraPrice: 0,
            price: price,
        },
        'meal-10': {
            name: 'Super-Grain Snacks Bowl',
            desc: 'with Avocado & Veggies',
            imgUrl: 'assets/images/3.webp',
            extraPrice: 1.49,
            price: price,
        },
        'meal-11': {
            name: 'Protein-Packed Chicken Salad',
            desc: 'with Fruits & Seeds',
            imgUrl: 'assets/images/2.webp',
            extraPrice: 0,
            price: price,
        },
        'meal-12': {
            name: 'Stir Fried Rice Noodles Bowl',
            desc: 'with Mushroom & Spanish Pepper',
            imgUrl: 'assets/images/4.webp',
            extraPrice: 0,
            price: price,
        },
        'meal-13': {
            name: 'Cauliflower Pilaf',
            desc: 'with Chickpea & Cheese',
            imgUrl: 'assets/images/5.webp',
            extraPrice: 0,
            price: price,
        },
        'meal-14': {
            name: 'Keto-Friendly Pasta Bowl',
            desc: 'with Tina & Spanish',
            imgUrl: 'assets/images/6.webp',
            extraPrice: 0,
            price: price,
        },
        'meal-15': {
            name: 'Vegetable Soup Bowl',
            desc: 'with Chicken & Sweet Kabu',
            imgUrl: 'assets/images/7.webp',
            extraPrice: 0,
            price: price,
        },
        'meal-16': {
            name: 'Kashmiri Rice',
            desc: 'with Chicken & Coconut',
            imgUrl: 'assets/images/8.webp',
            extraPrice: 0,
            price: price,
        },
        'meal-17': {
            name: 'Mix Veggies',
            desc: 'with Cabbage, Carrots & Chicken',
            imgUrl: 'assets/images/1.webp',
            extraPrice: 0,
            price: price,
        },
        'meal-18': {
            name: 'Protein-Packed Chicken Salad',
            desc: 'with Fruits & Seeds',
            imgUrl: 'assets/images/2.webp',
            extraPrice: 0,
            price: price,
        },
        'meal-19': {
            name: 'Keto-Friendly Pasta Bowl',
            desc: 'with Tina & Spanish',
            imgUrl: 'assets/images/6.webp',
            extraPrice: 0,
            price: price,
        },
        'meal-20': {
            name: 'Stir Fried Rice Noodles Bowl',
            desc: 'with Mushroom & Spanish Pepper',
            imgUrl: 'assets/images/4.webp',
            extraPrice: 0,
            price: price,
        },
        'meal-21': {
            name: 'Cauliflower Pilaf',
            desc: 'with Chickpea & Cheese',
            imgUrl: 'assets/images/5.webp',
            extraPrice: 0,
            price: price,
        },
        'meal-22': {
            name: 'Super-Grain Snacks Bowl',
            desc: 'with Avocado & Veggies',
            imgUrl: 'assets/images/3.webp',
            extraPrice: 1.49,
            price: price,
        },
        'meal-23': {
            name: 'Vegetable Soup Bowl',
            desc: 'with Chicken & Sweet Kabu',
            imgUrl: 'assets/images/7.webp',
            extraPrice: 0,
            price: price,
        },
        'meal-24': {
            name: 'Kashmiri Rice',
            desc: 'with Chicken & Coconut',
            imgUrl: 'assets/images/8.webp',
            extraPrice: 0,
            price: price,
        },
    };

    function renderMeals() {
        let content = '';
        for (let i = 1; i <= 24; i++) {
            const { name, desc, imgUrl, extraPrice } = mealsDetail[`meal-${i}`];
            content += `
            <div class="col-12 col-md-6 col-lg-4 col-xl-3 p-1">
                <div id="meal-${i}" class = "card ${extraPrice ? 'featured' : ''}">
                    <div class="card-img-top">
                        <img class="img-fluid w-100" src="${imgUrl}" alt="${name}">
                        ${extraPrice ? `<span class="extra-price py-1 px-2">+ $${extraPrice}</span>` : ''}
                    </div>
                    <div class="card-body p-2">
                        <strong class="title ${extraPrice ? 'featured' : ''}">${name}</strong>
                        <p class="desc ${extraPrice ? 'featured' : ''}">${desc}</p>
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
        $('#meals').append(content);
    }
    renderMeals();

    $("#cart-up").on("click", function () {
        $("#cart-content").removeClass('d-none');
    });
    $("#cart-down").on("click", function () {
        $("#cart-content").addClass('d-none');
    });

    function totalMeals() {
        return Object.values(STATE.meals).reduce((a, b) => a + b, 0);
    }

    function calculateMealsTotal() {
        const plan = plansDetail[STATE.planId];
        let extras = 0;
        for (let id in STATE.meals) {
            extras += mealsDetail[id].extraPrice;
        }
        if (extras == 0) {
            return `$${totalMeals() * plan.price}`;
        }
        else {
            return `$${totalMeals() * plan.price} + $${extras}`;
        }
    }

    function calculateTotal() {
        const plan = plansDetail[STATE.planId];
        let extras = 0;
        for (let id in STATE.meals) {
            extras += mealsDetail[id].extraPrice;
        }
        return (totalMeals() * plan.price) + extras;
    }

    function renderCart() {
        if (STATE.dayId) {
            const { day, month, date } = daysDetail[STATE.dayId];
            $('.delivery-day').html(`My delivery for: <strong>${day}</strong>, ${month} ${date}`);
        }
        else {
            const { day, month, date } = daysDetail['day-1'];
            $('.delivery-day').html(`My delivery for: <strong>${day}</strong>, ${month} ${date}`);
        }

        const plan = plansDetail[STATE.planId];
        const cartCount = totalMeals();

        $('.cart-items').empty();
        if (cartCount > 0) {
            let content = '';
            for (let id in STATE.meals) {
                const mealCount = STATE.meals[id];
                for (let i = 1; i <= mealCount; i++) {
                    content += `
                    <div id="card-${STATE.meals[id]}"
                        class="card d-flex flex-row align-items-center justify-content-between gap-1 pe-2 p-1 ${mealsDetail[id].extraPrice ? 'bg-dark featured' : ''}">
                        <div class="d-flex flex-row align-items-center car-img-top">
                            <img class="img-fluid" width="92" height="60" src="${mealsDetail[id].imgUrl}" alt="${mealsDetail[id].name}">
                            ${mealsDetail[id].extraPrice ? `
                            <span class="extra-price px-1 m-1">+ $${mealsDetail[id].extraPrice}</span>
                                `: ''}
                            <p class="my-auto ms-2"><strong class="title">${mealsDetail[id].name}</strong></p>
                        </div>
                        <div class="d-flex flex-column gap-4">
                            <i class="plus fa-solid fa-plus" data-id="${id}"></i>
                            <i class="minus fa-solid fa-minus" data-id="${id}"></i>
                        </div>
                    </div>
                    `
                }
            }
            $('.cart-items').html(content);
            $('.cart-count').text(cartCount);
            $('.cart-meals-price').html(calculateMealsTotal());
            $('.sub-total-text').text(`${calculateTotal().toFixed(2)}`);
            $('.cart-sub-total').text(`$${calculateTotal().toFixed(2)}`);
            if (cartCount == 1) {
                $('.cart-meals-count').text(`${cartCount} Meal`);
            }
            else {
                $('.cart-meals-count').text(`${cartCount} Meals`);
            }
            if (cartCount === plan.count) {
                $('.meal-left').html(`<strong>Ready to go!</strong>`);
                $('.add-btn').disabled = true;
                $('.add-btn').addClass('disabled');
                $('.cart-next-btn').removeClass('disabled');
            } else {
                let count = 0;
                if (STATE.planId) {
                    count = plansDetail[STATE.planId].count;
                }
                $('.meal-left').html(`Please add <strong>${count - cartCount} </strong> more meals.`);
                $('.add-btn').disabled = false;
                $('.add-btn').removeClass('disabled');
                $('.cart-next-btn').addClass('disabled');
            }
        } else {
            let count = 0;
            if (STATE.planId) {
                count = plansDetail[STATE.planId].count;
            }
            $('.meal-left').html(`Please add total <strong>${count} items</strong> to continue.`);
            $('.clear').addClass('d-none');
            $('.cart-body-content').addClass('d-none');
            $('.cart-next-btn').addClass('disabled');
            $('.cart-count').text(0);
            $('.sub-total-text').text('');
            $('.add-btn').disabled = false;
            $('.add-btn').removeClass('disabled');
        }
    }
    renderCart();

    $(document).on('click', '.add-btn, .plus', function () {
        $('.clear').removeClass('d-none');
        $('.cart-body-content').removeClass('d-none');
        const id = $(this).data('id') || this.id.replace('btn-', '');
        if (!STATE.meals[id]) STATE.meals[id] = 0;
        if (totalMeals() < plansDetail[STATE.planId].count) {
            STATE.meals[id]++;
            saveState();
            renderCart();
            renderCheckout();
        }
    });

    $(document).on('click', '.minus', function () {
        const id = $(this).data('id');
        STATE.meals[id]--;
        if (STATE.meals[id] <= 0) delete STATE.meals[id];
        saveState();
        renderCart();
        renderCheckout();
    });

    $('.clear').on('click', () => {
        resetMeals();
        renderCart();
        renderCheckout();
    });

    $('.cart-next-btn').on('click', function () {
        renderCheckout();
        wizard.steps('next');
    });

    /* Checkout Section */
    let isValidated = false;
    $("#fname").on("input", function () { validatefName($('#fname').val()); toggleDisable() });
    $("#lname").on("input", function () { validatelName($('#lname').val()); toggleDisable() });
    $("#name").on("input", function () { validateName($('#name').val()); toggleDisable() });
    $("#line1").on("input", function () { validateLine1($('#line1').val()); toggleDisable() });
    $("#city").on("input", function () { validateCity($('#city').val()); toggleDisable() });
    $("#state").on("input", function () { validateState($('#state').val()); toggleDisable() });
    $("#zip").on("input", function () { validateZip($('#zip').val()); toggleDisable() });
    $("#change-zip").on("click", function () { $('#zip').focus() });
    $("#phone").on("input", function () { validatePhone($('#phone').val()); toggleDisable() });
    $("#email").on("input", function () { validateEmail($('#email').val()); toggleDisable() });

    $("#checkout-btn").addClass('disabled');

    function toggleDisable() {
        isValidated = (validatefName($('#fname').val()) &&
            validatelName($('#lname').val()) &&
            validateName($('#name').val()) &&
            validateLine1($('#line1').val()) &&
            validateCity($('#city').val()) &&
            validateState($('#state').val()) &&
            validateZip($('#zip').val()) &&
            validatePhone($('#phone').val()) &&
            validateEmail($('#email').val()));
        if (isValidated) {
            $("#checkout-btn").removeClass('disabled');
        }
        else {
            $("#checkout-btn").addClass('disabled');
        }
    }

    function validatefName(name) {
        if (name) {
            if (isInvalidName(name)) {
                $('#fname-error').removeClass('d-none');
                isValidated = false;
            }
            else {
                $('#fname-error').addClass('d-none');
                isValidated = true;
            }
            $('#fname-req').addClass('d-none');
        }
        else {
            isValidated = false;
            $('#fname-req').removeClass('d-none');
            $('#fname-error').addClass('d-none');
        }
        return isValidated;
    }

    function validatelName(name) {
        if (name) {
            if (isInvalidName(name)) {
                isValidated = false;
                $('#lname-error').removeClass('d-none');
            }
            else {
                isValidated = true;
                $('#lname-error').addClass('d-none');
            }
            $('#lname-req').addClass('d-none');
        }
        else {
            isValidated = false;
            $('#lname-req').removeClass('d-none');
            $('#lname-error').addClass('d-none');
        }
        return isValidated;
    }

    function validateName(name) {
        if (name) {
            if (isInvalidFullName(name)) {
                isValidated = false;

                $('#name-error').removeClass('d-none');
            }
            else {
                isValidated = true;
                $('#name-error').addClass('d-none');
            }
            $('#name-req').addClass('d-none');
        }
        else {
            isValidated = false;

            $('#name-req').removeClass('d-none');
            $('#name-error').addClass('d-none');
        }
        return isValidated;
    }

    function validateLine1(line) {
        if (line) {
            isValidated = true;
            $('#line1-req').addClass('d-none');
        }
        else {
            isValidated = false;
            $('#line1-req').removeClass('d-none');
        }
        return isValidated;
    }

    function validateCity(city) {
        if (city) {
            if (isInvalidName(city)) {

                isValidated = false;
                $('#city-error').removeClass('d-none');
            }
            else {
                isValidated = true;
                $('#city-error').addClass('d-none');
            }
            $('#city-req').addClass('d-none');
        }
        else {

            isValidated = false;
            $('#city-req').removeClass('d-none');
            $('#city-error').addClass('d-none');
        }
        return isValidated;
    }

    function validateState(state) {
        if (state) {
            if (isInvalidName(state)) {
                isValidated = false;

                $('#state-error').removeClass('d-none');
            }
            else {
                isValidated = true;
                $('#state-error').addClass('d-none');
            }
            $('#state-req').addClass('d-none');
        }
        else {
            isValidated = false;
            $('#state-req').removeClass('d-none');
            $('#state-error').addClass('d-none');
        }
        return isValidated;
    }

    function validateZip(zip) {
        if (zip) {
            if (isInvalidZip(zip)) {
                isValidated = false;

                $('#zip-error').removeClass('d-none');
            }
            else {
                isValidated = true;
                $('#zip-error').addClass('d-none');
            }
            $('#zip-req').addClass('d-none');
        }
        else {
            isValidated = false;
            $('#zip-error').addClass('d-none');
            $('#zip-req').removeClass('d-none');
        }
        return isValidated;
    }

    function validatePhone(phone) {
        if (phone) {
            if (isInvalidPhone(phone)) {
                isValidated = false;
                $('#phone-error').removeClass('d-none');
            }
            else {
                isValidated = true;
                $('#phone-error').addClass('d-none');
            }
            $('#phone-req').addClass('d-none');
        }
        else {
            isValidated = false;

            $('#phone-error').addClass('d-none');
            $('#phone-req').removeClass('d-none');
        }
        return isValidated;
    }

    function validateEmail(email) {
        if (email) {
            if (isInvalidEmail(email)) {
                isValidated = false;
                $('#email-error').removeClass('d-none');
            }
            else {
                isValidated = true;
                $('#email-error').addClass('d-none');
            }
            $('#email-req').addClass('d-none');
        }
        else {
            isValidated = false;
            $('#email-error').addClass('d-none');
            $('#email-req').removeClass('d-none');
        }
        return isValidated;
    }

    function isInvalidName(name) {
        return !(/^[A-Za-z]+$/.test(name));
    }

    function isInvalidFullName(name) {
        return !(/^[A-Za-z ]+$/.test(name));
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

    const shipping = 8.99;
    const tax = 10.99;

    function calculateDiscount(promoCode) {
        return calculateTotal() * promoCode / 100;
    }

    $('#promo-code').on("click", function () {
        $('#promo-code').addClass('d-none');
        $('#promo-input').removeClass('d-none');
        $('#promo-input').focus();
    });

    $('#reset-promo').on("click", function () {
        resetPromoCode();
        renderCheckout();
    });

    $('#promo-input').on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            const promoCode = $('#promo-input').val();
            if (promoCode && isValidCode(promoCode)) {
                STATE.promoCode = promoCode;
                saveState();
            }
            else {
                resetPromoCode();
            }
            renderCheckout();
        }
    });

    function renderCheckout() {
        let total = 0;
        if (STATE.planId) {
            total = calculateTotal();
        }
        let discount = 0;
        if (STATE.promoCode) {
            discount = calculateDiscount(STATE.promoCode).toFixed(2);
            const content =
                `
                <span>Discount</span>
                <span class="fw-bold text-success">-$${discount}</span>
            `
            $('#promo-code').addClass('d-none');
            $('#promo-applied').removeClass('d-none');
            $('#promo-value').text(STATE.promoCode);
            $('#discount').removeClass('d-none');
            $('#discount').html(content);
        }
        else {
            $('#promo-code').removeClass('d-none');
            $('#promo-applied').addClass('d-none');
            $('#discount').addClass('d-none');
        }
        $('#promo-input').addClass('d-none');
        $('#order-price').text(`$${total.toFixed(2)}`);
        $('#order-total').text(`$${(total + shipping + tax - discount).toFixed(2)}`);

        if (STATE.dayId) {
            const { day, month, date } = daysDetail[STATE.dayId];
            $('#checkout-delivery').html(`${day}, ${month} ${date}`);
        }
        else {
            const { day, month, date } = daysDetail['day-1'];
            $('#checkout-delivery').html(`${day}, ${month} ${date}`);
        }

        let content = '';
        for (let id in STATE.meals) {
            const mealId = id;
            const count = STATE.meals[id];
            const { name, desc, imgUrl, extraPrice } = mealsDetail[mealId];
            content += `
            <div class="card rounded-0 d-flex flex-row align-items-center gap-1 pe-2 p-1 ${extraPrice ? 'bg-dark featured' : ''}">
                <div class="d-flex flex-row align-items-center">
                    <p class="d-flex px-3 my-auto fw-bold">${count}</p>
                    <div class="position-relative d-flex">
                        <img class="img-fluid" width="130" height="100" src="${imgUrl}" alt="${name}">
                        ${extraPrice ? `
                        <span class="extra-price px-2">+$${extraPrice}</span>
                            `: ''}
                    </div>
                    <div class="d-flex flex-column">
                        <p class="my-auto ms-2"><strong class="title">${name}</strong></p>
                        <p class="desc my-auto ms-2">${desc}</p>
                    </div>
                </div>
            </div>
            `
        }
        $('#checkout-cart').html(content);
    }
    renderCheckout();

    function confirmOrder() {
        const { day, month, date } = daysDetail[STATE.dayId];
        const price = calculateTotal();
        const mealPrice = price.toFixed(2);
        const tax = 10.99;
        const shipping = 8.99;
        let discount = 0;
        const promoCode = STATE.promoCode;
        if (promoCode) {
            discount = calculateDiscount(STATE.promoCode).toFixed(2);
        }
        const totalPrice = (price + tax + shipping - discount).toFixed(2);

        alert(`
        Order placed successfully!

        ---------Delivery Address---------
        First Name: ${$('#fname').val()}
        Last Name: ${$('#lname').val()}
        Full Name: ${$('#name').val()}
        Address : ${$('#line1').val()}
        City: ${$('#city').val()}
        State: ${$('#state').val()}
        Zip: ${$('#zip').val()}
        Phone: ${$('#phone').val()}
        Email: ${$('#email').val()}
        
        ----------Order Summary----------
        Delivery Date: ${day}, ${month} ${date}
        Meals Price: $${mealPrice}
        Shipping Price: $${shipping}
        Tax Price: $${tax} ${(discount == 0 ? '' : `
        Discount Applied: ${promoCode}%
        Discount: -$${discount}`)}
        Total Price: $${totalPrice}
        `);
    }

    $("#checkout-btn").on("click", function () {
        confirmOrder();
        resetState();
        location.reload();
    });
});