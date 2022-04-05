
var menu_trigger = document.querySelectorAll("[data-card-menu]");
var back_trigger = document.querySelectorAll("[data-card-back]");
let card = document.querySelectorAll('.card');
menu_trigger.forEach((item,i )=> {
    item.addEventListener('click' ,()=>{
        card[i].classList.toggle("show-menu");
    })
});
back_trigger.forEach((item,i )=> {
    item.addEventListener('click' ,()=>{
        card[i].classList.toggle("show-menu");
    })
});

