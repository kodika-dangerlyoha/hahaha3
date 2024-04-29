let form_payment = document.forms.form_buy;

function callback(val) {
    console.log(val);
}

function change_bank(bank) {
    let label_active = document.querySelector('._label_active');
    if (label_active) {
        label_active.classList.remove('_label_active');
        document.querySelector('input[type="checkbox"]').value = false;
    }
    document.querySelector(`#label_${bank}`).classList.add('_label_active');
    document.getElementsByName(`inp_${bank}`).value = true;
}

form_payment.inp_email.addEventListener('input', () => callback(form_payment.inp_email.value));

document.getElementById('label_a').addEventListener('click', () => change_bank('a'));
document.getElementById('label_b').addEventListener('click', () => change_bank('b'));
document.getElementById('label_c').addEventListener('click', () => change_bank('c'));
document.getElementById('label_d').addEventListener('click', () => change_bank('d'));
document.getElementById('label_e').addEventListener('click', () => change_bank('e'));
document.getElementById('label_f').addEventListener('click', () => change_bank('f'));