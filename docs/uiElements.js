function registerElementListeners() {
    document.getElementById('children-tab').addEventListener("click", () => toggleTabs("parents"));
    document.getElementById('parents-tab').addEventListener("click", () => toggleTabs("children"));
    document.getElementById('focus-root').addEventListener("click", () => focusNodeById(root_node));
    document.getElementById('switchExtensions').addEventListener("click", () => toggleLines('switchExtensions', 'extension-line', 'hidden-line'));
    document.getElementById('switchIdentifiers').addEventListener("click", () => toggleLines('switchIdentifiers', 'id-line', 'hidden-line'));
    document.getElementById('switchHeightLimit').addEventListener("click", () => toggleLines('switchHeightLimit', 'node-cell', 'limit-height'));
}

function toggleTabs(target) {
    console.log("switching to: " + target)
    if (target === "children") {
        document.getElementById('children-tab').classList.remove("active")
        document.getElementById('parents-tab').classList.add("active")
    } else {
        document.getElementById('children-tab').classList.add("active")
        document.getElementById('parents-tab').classList.remove("active")
    }
}

function toggleLines(checkbox_name, class_search_name, toggle_class) {
    let all_identifier_lines = document.getElementsByClassName(class_search_name)
    for (let i = 0; i < all_identifier_lines.length; i++) {
        if (document.getElementById(checkbox_name).checked == true)
            all_identifier_lines[i].classList.remove(toggle_class)
        else
            all_identifier_lines[i].classList.add(toggle_class)

    }
}