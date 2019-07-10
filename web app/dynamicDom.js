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
                        {"contenteditable": "true"},
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
                                {"contenteditable": "true"},
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





function buildStructure(domStructure) {

    // build the dom structure bottom up
    
}








// create list item dynamically from the given data
function createListItem(data) {
    let list_item =  document.createElement("div");
    list_item.className = "list-item";
    
    list_item = createDomNode(list_item, ["div", "div"], ["list-top", "list-details"]);
    let list_top = list_item.children[0];
    let list_details = list_item.children[1];

    list_top = createDomNode(list_top, ["div", "div", "div", "div", "div"], ["color-line", "item-name", "item-date-time", "item-source-domain", "item-current-price"]);
    let color_line = list_top.children[0];
    let item_name = list_top.children[1];
    let item_date_time = list_top.children[2];
    let item_source_domain = list_top.children[3];
}


function createDomNode(parent, childrenTags, childrenClasses) {
    for (let i=0; i<childrenTags.length; i++) {
        let child = document.createElement(childrenTags[i]);
        child.className = childrenClasses[i];
        parent.appendChild(child);
    }
    return parent;
}

function assignChildren(parent, children) {
    // remove existing children
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }

    for (let i=0; i<children.length; i++) {
        parent.appendChild(children[i]);
    }

    return parent;
}