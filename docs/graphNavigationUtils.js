// Global variable that all functions cn access anytime, e.g. to recenter on root node without reloading entire graph from disk.
let graph_map
let root_node

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
        document.getElementById('extension-line-line').classList.add("hidden-line")

    // alert("Exts")
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
function focusNodeById(node_key) {

    console.log(graph_map)
    // Update current node panel
    document.getElementById("current-id").innerText = node_key
    document.getElementById("current-extensions").innerText = graph_map.get("2").ext
    let node = graph_map.get(node_key)
    if (node.tpl === "")
        document.getElementById("current-payload").innerText = "- NO PAYLOAD -"
    else
        document.getElementById("current-payload").innerText = graph_map.get("2").tpl

    // update specialization / generalization panel
    // ...
}

function initializeBoard(graph) {
    console.log(graph)

    // Convert object to map
    graph_map = new Map(Object.entries(graph))

    // Update stats
    root_node = findRootNote(graph_map)
    document.getElementById("stats-total").innerText = graph_map.size
    document.getElementById("stats-leaves").innerText = countGraphLeaves(graph_map)
    document.getElementById("stats-root").innerText = root_node

    // Focus root node
    focusNodeById(root_node, graph_map.get(root_node))
}

function loadGraph() {

    fetch("minified_lattice.json")
        .then(result => result.json())
        .then(graph => initializeBoard(graph))
}

