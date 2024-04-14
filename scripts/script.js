const full_height_screen_block = document.querySelector('#banner');
const windowWidth = window.innerWidth;

if (full_height_screen_block) {
    let windowInnerHeight = window.innerHeight;
    if (windowWidth > 480) {
        full_height_screen_block.style.minHeight = `${windowInnerHeight - 120}px`;
    }
    else full_height_screen_block.style.minHeight = `${windowInnerHeight}px`;
}

const backgrounds = document.querySelectorAll('.bg');

const purchase = document.querySelector('#purchase');
const purchase__inner = document.querySelector('.purchaseBlock__inner');
const information = document.querySelector('#information');
let button_scroll = document.querySelector('#button_scroll');

function open_purchase(bool) {
    if (bool) {
        purchase.style.display = "flex";
        information.classList.add('information_hide');
        setTimeout(() => {
            purchase__inner.classList.add('purchaseBlock__inner_show');
        }, 1)
        // setTimeout(() => {
        //     information.style.display = "none";
        // }, 210)
        return
    }
    // information.style.display = "block";
    purchase__inner.classList.remove('purchaseBlock__inner_show');
    setTimeout(() => {
        information.classList.remove('information_hide');
    }, 1)
    setTimeout(() => {
        purchase.style.display = "none";
    }, 200)
}

function open_category(title) {
    button_scroll.className = button_scroll.className.replace('banner__arrowBlock_ready' , '');
    button_scroll.className = button_scroll.className.replace('banner__arrowBlock_preOrder', '');
    button_scroll.className = button_scroll.className.replace('banner__arrowBlock_calculator' , '');
    button_scroll.classList.add(`banner__arrowBlock_${title}`);
    document.querySelectorAll('.bg').forEach(elem => elem.classList.remove('bg_active'));
    document.querySelector(`.bg_${title}`).classList.add('bg_active');

    document.querySelectorAll('.categories__point').forEach(elem => elem.classList.remove('categories__point_active'));
    document.querySelector(`.categories__point_${title}`).classList.add('categories__point_active');

    document.querySelectorAll('.products').forEach(elem => elem.classList.remove('products_active'));
    document.querySelector(`.products_${title}`).classList.add('products_active');

    document.body.classList = "";
    document.body.classList.add(`body_product_${title}`);
}

if (windowWidth > 500) {
    window.addEventListener("scroll", function(){

        backgrounds.forEach(elem => elem.style.top = `${(this.scrollY) / 3}px`);
        document.querySelectorAll('.scroll_show').forEach(elem => elem.style.opacity = "1");
    
        // document.querySelector('.bigImgBlock').style.transform = "translateY(" + (this.scrollY) / 2 + "px)";
        // for_scroll.style.opacity = (this.scrollY) / 300;
        // for_scroll.style.transform = "translateY(" + (this.scrollY) / 2 + "px)";
    });
}

else if (windowWidth < 481) {
    window.addEventListener("scroll", function(){
        document.querySelector('#banner').style.transform = `translateY(${(this.scrollY) / 6}px)`;
        let s = 1 - (this.scrollY) / 500;
        if (s >= 0) {
            button_scroll.style.transform = `scale(${s})`;
        }
    });
}
