
chrome.runtime.onMessage.addListener(
    function (req, sender, sendResponse) {
        console.log("tabs");
        console.log(req.tabs);
        if (req.message == "browser-action-btn-clicked") {
            console.log(req.message);
            console.log(req.url);

            // chrome.runtime.sendMessage({"message": "open-youtube"});
            tracePath(locatePathInDOM(select()));
        }
    } 
);








function select() {
    if (window.getSelection) {
        let sel = window.getSelection();
        if (sel.rangeCount > 0) {
            let element = sel.getRangeAt(0).startContainer;
            return element;
        }
    }
}


function whichChild(element) {
    // which child is the element of its parent
    // return the child index
    return Array.prototype.indexOf.call(element.parentNode.children, element);
    // The call() allows for a function/method belonging to one object
    //  to be assigned and called for a different object.
    // call() provides a new value of this to the function/method. 
    // With call, you can write a method once and then inherit it in another object,
    //  without having to rewrite the method for the new object.
}

function locatePathInDOM(element) {
    let familyTree = []; 

    let foundByClassName = false;
    let foundById = false;

    while (true) {
        if (element.id || (element.className && document.getElementsByClassName(element.className).length === 1)) {
            // unique ancestor found
            if (element.id) {
                foundById = true;
                break;
            }
            foundByClassName = true;
            break;
        }
        familyTree.push(whichChild(element));
        element = element.parentNode;

        // no need to go any higher if it reaches <body> tag
        if (element.tagName == "BODY") 
            break;
    }

    familyTree = familyTree.reverse();
    familyTree.pop(); // which child of just a text selection is always -1

    return {
        "ancestor_tag": element.tagName,
        "ancestor_id": element.id,
        "ancestor_classname": element.className,
        "found_by_id": foundById,
        "found_by_classname": foundByClassName,
        "family_tree": familyTree
    };
}


function tracePath(path) {
    let element = document.getElementsByTagName(path.ancestor_tag)[0];
    if (path.found_by_id) 
        element = document.getElementById(path.ancestor_id);
    if (path.found_by_classname)
        element = document.getElementsByClassName(path.ancestor_classname)[0];
    
    for (let i = 0; i<path.family_tree.length; i++) {
        element = element.children[path.family_tree[i]];
    }

    // change text to confirm things
    element.innerText = "Captured";
}