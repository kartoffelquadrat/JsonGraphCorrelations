// Global variable that all functions cn access anytime, e.g. to recenter on root node without reloading entire graph from disk.
let graph_map
let root_node
let current_node

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

    // get list of all children (only IDs, unsorted)
    let unsorted_child_ids = graph_map.get(current_node).sub
    console.log("Children: " + unsorted_child_ids)

    // get list of actual child node objects
    let child_nodes = []
    unsorted_child_ids.forEach(function (node_id, index) {
        child_nodes.push({"id": node_id, "node": graph_map.get(String(node_id))})
    });
    // sort the child nodes by descending ext
    let descending_ext_child_nodes = child_nodes.sort((a, b) => a.node.ext - b.node.ext).reverse();
    console.log(descending_ext_child_nodes)

    // Append a new child node to the dom tree for every instance
    for (let child_index = 0; child_index < descending_ext_child_nodes.length; child_index++) {
        cell_container.appendChild(createCellDom(descending_ext_child_nodes[child_index].id, descending_ext_child_nodes[child_index].node))
    }
}

// creates a HTML entry that is ready for integration into the DOM
function createCellDom(node_id, node) {

    // container div
    const container_div = document.createElement('div')
    container_div.setAttribute("class", "cell-container")

    // outer div
    const outer_div = document.createElement('div')
    if (isCheckedStatus('switchHeightLimit'))
        outer_div.setAttribute("class", "node-cell node-cell-selectable")
    else
        outer_div.setAttribute("class", "node-cell node-cell-selectable limit-height")

    // first inner div (ID)
    const id_div = document.createElement('div')
    if (isCheckedStatus('switchIdentifiers'))
        id_div.setAttribute("class", "id-line")
    else
        id_div.setAttribute("class", "id-line hidden-line")

    const id_p = document.createElement('p')
    id_p.innerText = "ID: " + node_id
    id_div.appendChild(id_p)
    outer_div.appendChild(id_div)

    // second inner div (Ext)
    const ext_div = document.createElement('div')
    if (isCheckedStatus('switchIdentifiers'))
        ext_div.setAttribute("class", "extension-line")
    else
        ext_div.setAttribute("class", "extension-line hidden-line")

    const ext_p = document.createElement('p')
    ext_p.innerText = "Extensions: " + node.ext
    ext_div.appendChild(ext_p)
    outer_div.appendChild(ext_div)

    // span with code
    const span = document.createElement('span')
    span.setAttribute("class", "monospaced")
    const payload_p = document.createElement('p')
    payload_p.innerText = node.tpl
    span.appendChild(payload_p)
    outer_div.appendChild(span)

    // associate click handler to element
    container_div.addEventListener("click", () => focusNodeById(String(node_id)));

    // return the full template
    container_div.appendChild(outer_div)
    return container_div
}

// updates the static information field for the current node
function focusNodeById(node_key) {

    current_node = node_key
    console.log(graph_map)

    // Update current node panel
    document.getElementById("current-id").innerText = node_key
    document.getElementById("current-extensions").innerText = graph_map.get(node_key).ext
    let node = graph_map.get(node_key)
    if (node.tpl === "")
        document.getElementById("current-payload").innerText = "- NO PAYLOAD -"
    else
        document.getElementById("current-payload").innerText = graph_map.get(node_key).tpl

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

