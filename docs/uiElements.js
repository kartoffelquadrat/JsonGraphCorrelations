function buildSliderFilter(max_value) {
    let slider = document.getElementById('slider');

    noUiSlider.create(slider, {
        start: [0, max_value],  // start with full range
        connect: true,  // coloured bars between handles
        range: {
            'min': 0,
            'max': max_value
        },
        pips: {
            mode: 'steps',
            stepped: true,
            density: 4
        }
    });

    // Associate handlers to changed ranges. Gets called no matter which end was touched.
    slider.noUiSlider.on('set', handleSliderChange)
}

/**
 * Called whenever the slider range is changed.
 */
function handleSliderChange() {
    console.log("Registered slider change.")
}

function registerElementListeners() {
    document.getElementById('children-tab').addEventListener("click", () => toggleTabs("children"));
    document.getElementById('parents-tab').addEventListener("click", () => toggleTabs("parents"));
    document.getElementById('focus-root').addEventListener("click", () => focusNodeById(root_node));
    document.getElementById('switchExtensions').addEventListener("click", () => refreshSettingsState('switchExtensions', 'extension-line', 'hidden-line'));
    document.getElementById('switchIdentifiers').addEventListener("click", () => refreshSettingsState('switchIdentifiers', 'id-line', 'hidden-line'));
    document.getElementById('switchHeightLimit').addEventListener("click", () => refreshSettingsState('switchHeightLimit', 'node-cell', 'limit-height'));
}

function toggleTabs(target) {
    console.log("switching to: " + target)
    if (target === "children") {
        child_mode = true
        document.getElementById('children-tab').classList.add("active")
        document.getElementById('parents-tab').classList.remove("active")
        buildGrid()
    } else {
        child_mode = false
        document.getElementById('children-tab').classList.remove("active")
        document.getElementById('parents-tab').classList.add("active")
        buildGrid()
    }
}

function refreshSettingsState(checkbox_name, class_search_name, toggle_class) {
    let all_identifier_lines = document.getElementsByClassName(class_search_name)
    for (let i = 0; i < all_identifier_lines.length; i++) {
        if (isCheckedStatus(checkbox_name))
            all_identifier_lines[i].classList.remove(toggle_class)
        else
            all_identifier_lines[i].classList.add(toggle_class)

    }
}

function isCheckedStatus(checkbox_name) {
    let checkbox = document.getElementById(checkbox_name)
    let status = checkbox.checked == true
    return status
}