
// build the dom structure from the structure object
function buildStructure(domStructure) {

    // build the dom structure
    let root = document.createElement(domStructure.tag);
    root.className = domStructure.class;
    if (domStructure.hasOwnProperty("properties")) {
        for (let i=0; i<domStructure.properties.length; i++) {
            let propName = Object.getOwnPropertyNames(domStructure.properties[i])[0];
            let propValue = domStructure.properties[i][propName];
            root[propName] = propValue;
        }
    }

    if (domStructure.hasOwnProperty("children")) {
        // build the structures of children and assign them
        // as children of the root
        let children = [];
        for (let i=0; i<domStructure.children.length; i++) {
            children.push(buildStructure(domStructure.children[i]));
        } 

        for (let i=0; i<domStructure.children.length; i++) {
            root.appendChild(children[i]);
        }
    }

    return root;
}




// create list item dynamically from the given data
function createListItem(data) {
    data = {
        itemName: "RTX 2080 Ti" + (Math.floor(Math.random()*100)),
        creationDate: "10 May 2019",
        creationTime: "11:21 PM",
        domain: "Daraz",
        currentPrice: "Rs. 1200",
        desiredPrice: "Rs. 1000",
        sourceUrl: "https://www.daraz.com.np/products/lace-up-solid-oxford-shoes-for-women-i100800793-s1021298274.html?spm=a2a0e.11779170.flashSale.3.287d2d2b5Oey1n&search=1&mp=1&c=fs"
    };

    html = buildStructure(ITEM_STRUCTURE);

    // completely traverse the sub-tree 
    // to find all the desendents
    let desendents = [];

    let stack = [html];
    while (stack.length != 0) {
        let node = stack.pop();
        for (let j=0; j<node.childNodes.length; j++) {
            desendents.push(node.childNodes[j]);
            stack.push(node.childNodes[j]);
        }
    }

    for (let j=0; j<desendents.length; j++) {

        let child = desendents[j];
        if (child.className && child.className == "item-name") {
            let txt = document.createTextNode(data.itemName);
            child.appendChild(txt);
        }
        if (child.className && child.className == "item-date") {
            let txt = document.createTextNode(data.creationDate);
            child.appendChild(txt);
        }
        if (child.className && child.className == "item-time") {
            let txt = document.createTextNode(data.creationTime);
            child.appendChild(txt);
        }
        if (child.className && child.className == "item-source-domain") {
            let txt = document.createTextNode(data.domain);
            child.appendChild(txt);
        }
        if (child.className && child.className == "item-current-price") {
            let txt = document.createTextNode(data.currentPrice);
            child.appendChild(txt);
        }
        if (child.className && child.className == "current-price") {
            let txt = document.createTextNode(data.currentPrice);
            child.appendChild(txt);
        }
        if (child.className && child.className == "desired-price") {
            let txt = document.createTextNode(data.desiredPrice);
            child.appendChild(txt);
        }
        if (child.className && child.className == "desired-price-label") {
            let txt = document.createTextNode(data.desiredPrice);
            child.appendChild(txt);
        }
        if (child.className && child.className == "source-url") {
            let txt = document.createTextNode(data.sourceUrl);
            child.appendChild(txt);
        }
    }

    return html;
}


function addListItem() {
    document.getElementsByClassName("list-view")[0].appendChild(createListItem({}));

    // rerun the interactions javascript
    // to make new elements interactable
    makeListInteractive();
}


const ITEM_STRUCTURE = {
    "tag": "div",
    "class": "list-item",
    "children": [
        {
            "tag": "div",
            "class": "list-top",
            "children": [
                {
                    "tag": "div",
                    "class": "color-line"
                },
                {
                    "tag": "div",
                    "class": "item-name",
                    "properties": [
                        {"contentEditable": "true"},
                        {"spellcheck": "false"}
                    ]
                },
                {
                    "tag": "div",
                    "class": "item-date-time",
                    "children": [
                        {
                            "tag": "div",
                            "class": "item-date"
                        },
                        {
                            "tag": "div",
                            "class": "item-time"
                        }
                    ]
                },
                {
                    "tag": "div",
                    "class": "item-source-domain"
                },
                {
                    "tag": "div",
                    "class": "item-current-price"
                },
            ]
        }, 
        {
            "tag": "div",
            "class": "list-details",
            "children": [
                {
                    "tag": "div",
                    "class": "list-details-prices",
                    "children": [
                        {
                            "tag": "div",
                            "class": "actual-desired-prices",
                            "children": [
                                {
                                    "tag": "h3",
                                    "class": "detail-price",
                                    "children": [
                                        {
                                            "tag": "span",
                                            "class": "current-price",
                                        }
                                    ]
                                },
                                {
                                    "tag": "h3",
                                    "class": "detail-price",
                                    "children": [
                                        {
                                            "tag": "span",
                                            "class": "desired-price",
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "tag": "div",
                            "class": "desired-price-label",
                            "properties": [
                                {"contentEditable": "true"},
                                {"spellcheck": "false"}
                            ]
                        },
                    ]
                },
                {
                    "tag": "div",
                    "class": "list-source-and-delete-btn",
                    "children": [
                        {
                            "tag": "div",
                            "class": "source-area",
                            "children": [
                                {
                                    "tag": "p",
                                    "class": "source-url"
                                }
                            ]
                        },
                        {
                            "tag": "div",
                            "class": "delete-area",
                            "children": [
                                {
                                    "tag": "div",
                                    "class": "delete-btn"
                                }
                            ]
                        }
                    ]
                },
            ]
        }
    ]
};

