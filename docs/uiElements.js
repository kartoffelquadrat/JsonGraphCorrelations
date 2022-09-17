function registerElementListeners() {
    document.getElementById('children-tab').addEventListener("click", () => toggleTabs("parents"));
    document.getElementById('parents-tab').addEventListener("click", () => toggleTabs("children"));
    document.getElementById('focus-root').addEventListener("click", () => focusNodeById(root_node));
    document.getElementById('switchExtensions').addEventListener("click", () => toggleExtensionLines());
    document.getElementById('switchIdentifiers').addEventListener("click", () => toggleIdentifierLines());
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

function toggleIdentifierLines() {
    if (document.getElementById('switchIdentifiers').checked == true)
        document.getElementById('id-line').classList.remove("hidden-line")
    else
        document.getElementById('id-line').classList.add("hidden-line")
}

function toggleExtensionLines() {
    if (document.getElementById('switchExtensions').checked == true)
        document.getElementById('extension-line').classList.remove("hidden-line")
    else
        document.getElementById('extension-line').classList.add("hidden-line")
}