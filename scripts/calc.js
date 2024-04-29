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

function update_price() {
    let val = input_elo.value;
    price = Math.round(val * 3);
    price_old = Math.round(val * 4);
    percent = (price / 100) * 20;
    if (form_calc.cb_verification.checked) {
        price += 1000;
        price_old += 1000;
    }
    if (form_calc.cb_native_mail.checked) {
        price += 300;
        price_old += 300;
    }
    if (form_calc.cb_fplus.checked) {
        price += 200;
        price_old += 200;
    }
    if (form_calc.cb_fprem.checked) {
        price += 450;
        price_old += 450;
    }
    if (form_calc.cb_csprime.checked) {
        price += 1500;
        price_old += 1500;
    }
    if (form_calc.cb_priority.checked) {
        price += percent;
        price_old += percent;
    }

    calc_new_price.textContent = `${price}₽`;
    calc_old_price.textContent = `${price_old}₽`;
}

function change_img_lvl(val) {
    img_lvl.src = `img/lvls/${val}.png`;
    img_lvl.style.animation = '';
    setTimeout(() =>  {
        img_lvl.style.animation = 'show_img_lvl 0.2s ease-in-out 1';
    }, 0)
}

function check_elo() {
    let val = input_elo.value;
    if (val < 2501 && val > 1199) {
        update_price();
        calc_new_price.textContent = `${price}₽`;
        calc_old_price.textContent = `${price_old}₽`;

        btn_order.disabled = false;
        btn_order.textContent = "Заказать";
        if (val < 1351) {
            change_img_lvl(6);
        }
        else if (val > 1350 && val < 1531) {
            change_img_lvl(7);
        }
        else if (val > 1530 && val < 1751) {
            change_img_lvl(8);
        }
        else if (val > 1750 && val < 2001) {
            change_img_lvl(9);
        }
        else if (val > 2000) {
            change_img_lvl(10);
        }
    }
    else {
        price = 0;
        price_old = 0;
        btn_order.disabled = true;
        btn_order.textContent = "Эло 1200-2500";
        calc_new_price.textContent = "0₽";
        calc_old_price.textContent = "";
        img_lvl.src = 'img/lvls/no.png';
    }
}

function change_elo(bool) {
    let val = Number(input_elo.value);
    val += bool ? 25 : -25;
    input_elo.value = val;
    check_elo();
}

function cb(val, name) {
    if (document.querySelector(`input[name="cb_${name}"]`).checked) {
        price += val;
        price_old += val;
    }
    else {
        price -= val;
        price_old -= val;
    }
    if (input_elo.value < 2501 && input_elo.value > 1199) {
        calc_new_price.textContent = `${price}₽`;
        calc_old_price.textContent = `${price_old}₽`;
    }
}

input_elo.addEventListener('input', check_elo);

form_calc.cb_verification.addEventListener('click', () => cb(1000, 'verification'));
form_calc.cb_fplus.addEventListener('click', () => cb(200, 'fplus'));
form_calc.cb_fprem.addEventListener('click', () => cb(450, 'fprem'));
form_calc.cb_csprime.addEventListener('click', () => cb(1500, 'csprime'));
form_calc.cb_native_mail.addEventListener('click', () => cb(300, 'csprime'));
form_calc.cb_priority.addEventListener('click', () => cb(percent, 'priority'));

btn_raise.addEventListener('click', () => change_elo(true));
btn_reduce.addEventListener('click', () => change_elo(false));