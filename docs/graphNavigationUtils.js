function registerElementListeners() {
    document.getElementById('children-tab').addEventListener("click", () => toggleTabs("parents"));
    document.getElementById('parents-tab').addEventListener("click", () => toggleTabs("children"));
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


function logGraph(graph) {
    console.log(graph)

    // Convert object to map
    let graphMap = new Map(Object.entries(graph))

    // Update stats
    document.getElementById("stats-total").innerText = graphMap.size
    document.getElementById("stats-leaves").innerText = "100"
}

function loadGraph() {

    fetch("minified_lattice.json")
        .then(result => result.json())
        .then(graph => logGraph(graph))
}

