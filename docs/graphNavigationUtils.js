// Global variable that all functions cn access anytime, e.g. to recenter on root node without reloading entire graph from disk.
let graph_map
let root_node
let current_node
let current_children = []
let current_parents = []

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

function buildChildGrid(current_node) {

    // clear all cells
    let cell_container = document.getElementById("cell-container")
    cell_container.innerHTML = ""

    const map1 = new Map();

    map1.set('a', 1);
    map1.set('a', 2);
    map1.set('c', 3);
    console.log(map1)

    // get list of all children (only IDs, unsorted)
    let unsorted_child_ids = graph_map.get(current_node).sub
    console.log("Children: " + unsorted_child_ids)

    // get list of actual child node objects
    let child_nodes = []
    unsorted_child_ids.forEach(function (item, index) {
        child_nodes.push(graph_map.get(String(item)))
    });
    // sort the child nodes by descending ext
    let descending_ext_child_nodes = child_nodes.sort((a, b) => a.ext - b.ext).reverse();
    console.log(descending_ext_child_nodes)

    // sort children by extensions (calue is ext, key is child id - if other way round the nodes could erase one another if same ext)
    // let ext_children = new Map()
    // unsorted_children.forEach(function (item, index) {
    //     ext_children.set(item, graph_map.get(String(item)).ext)
    // });
    //
    //
    // console.log(ext_children)
    // let mapAsc = new Map([ext_children.entries()].sort());
    //


    // append a cell for each child
    // children.forEach(function (item, index) {
    //     console.log(item, index);
    // });
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
    // FOR NOW: only children
    buildChildGrid(current_node)
}

function initializeBoard(graph) {
    console.log(graph)

    // Convert object to map
    graph_map = new Map(Object.entries(graph))

    // Update stats
    root_node = findRootNote(graph_map)
    current_node = root_node
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

