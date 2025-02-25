"use strict";

console.log("✅ Excalidraw Search Extension Loaded!");

// Utility function to wait for an element using MutationObserver
const waitForElement = (selector, callback, timeout = 3000) => {
    const element = document.querySelector(selector);
    if (element) {
        callback(element);
        return;
    }

    const observer = new MutationObserver((mutations, obs) => {
        const el = document.querySelector(selector);
        if (el) {
            obs.disconnect();
            callback(el);
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

    // Optional timeout to stop observing after a period
    setTimeout(() => {
        const element = document.querySelector(selector);
        if (element) {
            //swallow message, it's there
            return;
        } else {
            observer.disconnect();
            console.warn(`Timed out waiting for element: ${selector}`);
        }
    }, timeout);
};

// Function to inject search UI into the library panel
const injectSearchUI = () => {
    const searchPanel = document.querySelector("div.layer-ui__library");
    if (!searchPanel || document.getElementById("library-search")) return;

    // Create a search section container
    const searchSection = document.createElement("div");
    searchSection.classList.add("layer-ui__search-header");
    Object.assign(searchSection.style, {
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
    });

    // Create search bar container
    const searchWrapper = document.createElement("div");
    searchWrapper.classList.add("ExcTextField", "layer-ui__search-inputWrapper", "ExcTextField--hasIcon");

    // Create search icon using SVG
    const searchIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    Object.entries({
        "aria-hidden": "true",
        focusable: "false",
        viewBox: "0 0 24 24",
        fill: "none",
        "stroke-width": "2",
        stroke: "currentColor",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
    }).forEach(([key, value]) => searchIcon.setAttribute(key, value));

    const searchIconGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    searchIconGroup.setAttribute("stroke-width", "1.5");

    const searchCircle = document.createElementNS("http://www.w3.org/2000/svg", "path");
    searchCircle.setAttribute("d", "M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0");

    const searchHandle = document.createElementNS("http://www.w3.org/2000/svg", "path");
    searchHandle.setAttribute("d", "M21 21l-6 -6");

    searchIconGroup.append(searchCircle, searchHandle);
    searchIcon.appendChild(searchIconGroup);

    // Create input field container
    const searchInputContainer = document.createElement("div");
    searchInputContainer.classList.add("ExcTextField__input");

    const searchBar = document.createElement("input");
    searchBar.id = "library-search";
    searchBar.type = "text";
    searchBar.placeholder = "Search Library...";
    searchBar.classList.add("ExcTextField__input");

    searchInputContainer.appendChild(searchBar);
    searchWrapper.append(searchIcon, searchInputContainer);

    // Create reset button
    const resetButtonWrapper = document.createElement("div");
    resetButtonWrapper.style.marginTop = "10px";

    const resetButton = document.createElement("button");
    resetButton.id = "library-search-reset";
    resetButton.textContent = "Reset";
    resetButton.classList.add("library-menu-browse-button");
    Object.assign(resetButton.style, {
        width: "100%",
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        cursor: "pointer",
    });

    resetButtonWrapper.appendChild(resetButton);
    searchSection.append(searchWrapper, resetButtonWrapper);

    // Insert search section at the top of the library panel
    searchPanel.prepend(searchSection);

    // Search function to filter SVGs
    const searchSVGs = () => {
        const query = searchBar.value.toLowerCase();
        const allSVGUnits = document.querySelectorAll(".library-unit");

        allSVGUnits.forEach(unit => {
            const textElements = unit.querySelectorAll("svg text");
            const matchFound = Array.from(textElements).some(text =>
                text.textContent.toLowerCase().includes(query)
            );
            unit.style.display = matchFound ? "block" : "none";
        });
    };

    // Reset function to show all SVGs
    const resetSVGs = () => {
        document.querySelectorAll(".library-unit").forEach(unit => {
            unit.style.display = "block";
        });
        searchBar.value = "";
    };

    // Listen for "Enter" key to trigger search
    searchBar.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            searchSVGs();
        }
    });

    resetButton.addEventListener("click", resetSVGs);
};

// Wait for the Library Button and attach the click event listener
waitForElement('.sidebar-trigger__label-element[title="Library"]', (libraryButton) => {
    console.log("✅ Library Button Found! Adding event listener...");
    libraryButton.addEventListener("click", () => {
        console.log("📂 Library Button Clicked! Running custom code...");
        // Delay to ensure Excalidraw’s native code runs first
        setTimeout(() => {
            console.log("Now running our custom code after Excalidraw!");
            waitForElement("div.library-menu-items-container", () => {
                console.log("Library Container Found! Adding search bar...");
                injectSearchUI();
            });
        }, 500);
    });
    waitForElement("div.library-menu-items-container", () => {
        console.log("Library Container Found! Adding search bar...");
        injectSearchUI();
    });
});
