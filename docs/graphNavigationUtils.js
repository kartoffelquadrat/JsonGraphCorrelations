function registerElementListeners() {
    document.getElementById('children-tab').addEventListener("click", () => toggleTabs("parents"));
    document.getElementById('parents-tab').addEventListener("click", () => toggleTabs("children"));
}

function toggleTabs(target) {
    console.log("switching to: " + target)
    if(target === "children") {
        document.getElementById('children-tab').classList.remove("active")
        document.getElementById('parents-tab').classList.add("active")
    }
    else
    {
        document.getElementById('children-tab').classList.add("active")
        document.getElementById('parents-tab').classList.remove("active")

    }
}

