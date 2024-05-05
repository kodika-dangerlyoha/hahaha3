// СДЕЛАТЬ СВИТЧ КЕЙС
// Если эло больше макс автоматом ставится максимальное сзанчение
// Если эло меньше мин значение то все блокируется и повялестся вопросик

const MIN_ELO_LIMIT = 1200;
const MAX_ELO_LIMIT = 2100;

let form_calc = document.forms.form_calc;
let input_elo = form_calc.inp_elo;
let btn_raise = form_calc.btn_raise;
let btn_reduce = form_calc.btn_reduce;
let btn_order = form_calc.btn_order;
let calc_new_price = document.querySelector('#calc_new_price');
let calc_old_price = document.querySelector('#calc_old_price');
let img_lvl = document.querySelector('#img_lvl');

let price = 0;
let price_old = 0;
let percent = 0;

const prices_option = {
    'cb_verification': (price) => price + 1000,
    'cb_native_mail': (price) => price + 300,
    'cb_fplus': (price) => price + 200,
    'cb_fprem': (price) => price + 450,
    'cb_csprime': (price) => price + 1500,
    'cb_priority': (price) => price * 1.2,
}

function update_price() {
    let val = input_elo.value;
    price = Math.round(val * 4);

    const sale = 0.8;

    document.querySelectorAll(`input[type="checkbox"]`).forEach(elem => {
        if (elem.checked) {
            price = prices_option[elem.name](price);
        }
    })

    calc_new_price.textContent = `${Math.round(price * sale)}₽`;
    calc_old_price.textContent = `${price}₽`;

    btn_order.disabled = false;
    btn_order.textContent = "Заказать";

    if (val < 1351) {
        change_img_lvl(6, 'rgb(239, 187, 0)', 10, 1.02);
    }
    else if (val > 1350 && val < 1531) {
        change_img_lvl(7, 'rgb(239, 187, 0)', 10, 1.02);
    }
    else if (val > 1530 && val < 1751) {
        change_img_lvl(8, '#FF6309', 15, 1.07);
    }
    else if (val > 1750 && val < 2001) {
        change_img_lvl(9, '#FF6309', 15, 1.07);
    }
    else if (val > 2000) {
        change_img_lvl(10, 'rgb(254, 31, 0)', 20, 1.12);
    }
}

function check_elo(val) {
    if (val > MAX_ELO_LIMIT) {
        input_elo.value = MAX_ELO_LIMIT;
    }
    else if (val < MIN_ELO_LIMIT) {
        price = 0;
        btn_order.disabled = true;
        btn_order.textContent = `Эло ${MIN_ELO_LIMIT}-${MAX_ELO_LIMIT}`;
        calc_new_price.textContent = "0₽";
        calc_old_price.textContent = "";
        img_lvl.src = 'img/lvls/no.png';
        img_lvl.style.boxShadow = "0 0 0px #FF6309";
        img_lvl.style.transform = "scale(1)";
        img_lvl.style.border = "1px solid transparent";
        return
    }
    update_price();
}

function change_elo_input() {
    let val = input_elo.value;
    check_elo(val);
}

function change_elo_handler(bool) {
    let val = Number(input_elo.value);
    val += bool ? 25 : -25;
    input_elo.value = val;
    change_elo_input(val);
}

function change_img_lvl(val, color, shadow_w, scale) {
    img_lvl.src = `img/lvls/${val}.png`;
    img_lvl.style.boxShadow = `0 0 ${shadow_w}px -2px ${color}`;
    img_lvl.style.border = `1px solid ${color}`;
    img_lvl.style.transform = `scale(${scale})`;
}

input_elo.addEventListener('input', change_elo_input);

document.querySelectorAll(`input[type="checkbox"]`).forEach(elem => elem.addEventListener('click', update_price));

btn_raise.addEventListener('click', () => change_elo_handler(true));
btn_reduce.addEventListener('click', () => change_elo_handler(false));