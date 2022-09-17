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

// Iterates over map and increases counter for every entry that cas no children.
function countGraphLeaves(graphMap) {
    let leaf_counter = 0

    for (let [key, value] of graphMap) {
        if (value.sub.length == 0) {
            leaf_counter += 1
        }
    }
    return leaf_counter
}

// Returns the first node found without any parent.
function findRootNote(graphMap) {
    for (let [key, value] of graphMap) {
        if (value.sup.length == 0) {
            return key
        }
    }
}

function logGraph(graph) {
    console.log(graph)

    // Convert object to map
    let graphMap = new Map(Object.entries(graph))

    // Update stats
    document.getElementById("stats-total").innerText = graphMap.size
    document.getElementById("stats-leaves").innerText = countGraphLeaves(graphMap)
    document.getElementById("stats-root").innerText = findRootNote(graphMap)

}

function loadGraph() {

    fetch("minified_lattice.json")
        .then(result => result.json())
        .then(graph => logGraph(graph))
}

