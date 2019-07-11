
// it holds the click event listeners
// it is done so that when the listeners are to be removed
// same reference of listener can be provided
// also,
// listeners in this list are bind to their respective object
let clickEventListeners = [];


function makeListInteractive() {
    
    // assign random colors to the list items
    const COLORS = ["#E16367", "#1F887E", "#275BAE"];
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
    
        // create event listener if doesn't exists
        if (clickEventListeners.length <= i) {
            
            clickEventListeners.push(
                function clickHandler() {
                    item_head = this;
                    let details = item_head.parentNode.children[1];
            
                    // console.log("display: " + details.style.display);

                    if (!details.style.display) {
                        details.style.display = "flex";
                        // console.log("no display");
                    }
                    else if (details.style.display == "none") {
                        details.style.display = "flex";
                    } 
                    else if (details.style.display == "flex") {
                        details.style.display = "none";
                    }
            });

            clickEventListeners[i].bind(item_head);
        }

        // remove if click handler already exists
        item_head.removeEventListener("click", clickEventListeners[i], true);
        item_head.addEventListener("click", clickEventListeners[i], true);
    }
    
    
    
    
    
    // handle change on delete button
    let delete_btns = document.getElementsByClassName("delete-btn");
    
    for (let i=0; i<delete_btns.length; i++) {
        let delete_btn = delete_btns[i];
    
        delete_btn.addEventListener("click", function () {
            // find the ancestor whose className is list-item
            // and remove the ancestor with its sub-tree
            let element = delete_btn;
            while(element.className != "list-item") {
                element = element.parentNode;
            }
            element.remove();
        });
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



    // handle click in item name
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


}

makeListInteractive();