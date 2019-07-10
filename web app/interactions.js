// assign random colors to the list items
const COLORS = ["#E16367", "#F0C930", "#275BAE"];
let list_items = document.getElementsByClassName("list-item");

for (let i=0; i<list_items.length; i++) {
    let list_item = list_items[i];

    // completely traverse the sub-tree 
    // to find all the desendents
    let desendents = [];

    let stack = [list_item];
    while (stack.length != 0) {
        let node = stack.pop();
        for (let j=0; j<node.childNodes.length; j++) {
            desendents.push(node.childNodes[j]);
            stack.push(node.childNodes[j]);
        }
    }

    // color nodes according to their classes
    const color = COLORS[Math.floor(Math.random()*COLORS.length)];
    for (let j=0; j<desendents.length; j++) {

        let child = desendents[j];


        console.log(child.className);
        if (child.className && child.className == "color-line")
            child.style.backgroundColor = color;
        if (child.className && child.className == "item-name")
            child.style.color = color;
        if (child.className && child.className == "item-date-time")
            child.style.color = color;
        if (child.className && child.className == "item-source-domain")
            child.style.color = color;
        if (child.className && child.className == "item-current-price")
            child.style.backgroundColor = color;
        if (child.className && child.className == "list-details")
            child.style.backgroundColor = color;
        if (child.className && child.className == "desired-price-label")
            child.style.color = color;
        if (child.className && child.className == "delete-btn")
            child.style.color = color;
    }
}




// handle click on item head
let item_heads = document.getElementsByClassName("list-top");

for (let i=0; i<item_heads.length; i++) {
    let item_head = item_heads[i];

    // for some reason the first click had to be double click
    // but with this line of code that was fixed
    item_head.parentNode.children[1].style.display = "none";

    item_head.addEventListener("click", function () {
        let details = item_head.parentNode.children[1];

        if (details.style.display === "none") {
            details.style.display = "flex";
        } else {
            details.style.display = "none";
        }
    });
}





// handle change in item name
let item_names = document.getElementsByClassName("item-name");
let input_changed = [];
for (let i=0; i<item_names.length; i++) {
    input_changed.push(false);
}


for (let i=0; i<item_names.length; i++) {
    let item_name = item_names[i];

    item_name.addEventListener("input", function () {
        input_changed[i] = true;
    });

    item_name.addEventListener("focusout", function () {
        if (input_changed[i]) {
            console.log(i, item_name.textContent);
        }
        input_changed[i] = false;
    })
}





// handle change in desired price
let desired_prices = document.getElementsByClassName("desired-price-label");
let price_changed = [];
for (let i=0; i<desired_prices.length; i++) {
    price_changed.push(false);
}


for (let i=0; i<desired_prices.length; i++) {
    let desired_price = desired_prices[i];

    desired_price.addEventListener("input", function () {
        price_changed[i] = true;
        desired_price.parentNode.children[0].children[1].children[0].textContent = desired_price.textContent;
    });

    desired_price.addEventListener("focusout", function () {
        if (price_changed[i]) {
            console.log(i, desired_price.textContent);
        }
        price_changed[i] = false;
    })
}