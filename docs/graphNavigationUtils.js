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

// updates the static information field for the current node
function focusNodeById(node_key, node_values) {

    document.getElementById("current-id").innerText = node_key
    document.getElementById("current-extensions").innerText = node_values.ext
    document.getElementById("current-payload").innerText = node_values.tpl
}

function initializeBoard(graph) {
    console.log(graph)

    // Convert object to map
    let graph_map = new Map(Object.entries(graph))

    // Update stats
    const root_node = findRootNote(graph_map)
    document.getElementById("stats-total").innerText = graph_map.size
    document.getElementById("stats-leaves").innerText = countGraphLeaves(graph_map)
    document.getElementById("stats-root").innerText = root_node

    // Focus root node
    focusNodeById(root_node, graph_map.get("1"))

}

function loadGraph() {

    fetch("minified_lattice.json")
        .then(result => result.json())
        .then(graph => initializeBoard(graph))
}

