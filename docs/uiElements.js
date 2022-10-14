let slider;
let slider_max_value;

function buildSliderFilter(max_value) {
    slider = document.getElementById('slider');
    slider_max_value = max_value

    noUiSlider.create(slider, {
        start: 0,  // start with full range
        connect: "upper",  // coloured bars between handles
         // step: 10000, // this one adds labeled ticks below, but unfortunately also adds snapping
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

function resetSlider() {
    slider.noUiSlider.set([0, slider_max_value])

    // TODO: also trigger reset of graph excerpt to full graph
}

/**
 * Called whenever the slider range is changed.
 */
function handleSliderChange() {
    let slider_values = slider.noUiSlider.get()
    let ext_min = Math.round( slider_values[0]);
    let ext_max = Math.round( slider_values[1]);
    console.log("Registered slider change: Min="+ext_min+", Max="+ext_max)
}

function registerElementListeners() {
    document.getElementById('children-tab').addEventListener("click", () => toggleTabs("children"));
    document.getElementById('parents-tab').addEventListener("click", () => toggleTabs("parents"));
    document.getElementById('focus-root').addEventListener("click", () => {focusNodeById(unfiltered_root_node); resetSlider()});
    document.getElementById('reset-range').addEventListener("click", () => resetSlider());
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