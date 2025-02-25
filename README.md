# Excalidraw Library Search

Excalidraw Library Search is a browser extension that adds a search bar to the Excalidraw library. This allows users to quickly filter and locate specific items within the library by searching for text within SVG elements.

**Note:** This extension is a stopgap solution until [Excalidraw PR #8807](https://github.com/excalidraw/excalidraw/pull/8807) gets merged.

## Features

- **Search Functionality:** Quickly search through the Excalidraw library by typing a query and pressing "Enter".
- **Reset Option:** Easily reset the search results to view all library items.
- **Seamless Integration:** The search UI is injected into the Excalidraw library panel, ensuring a native look and feel.


## Installation

1. **Clone or Download the Repository:**

   ```bash
   git clone https://github.com/yourusername/benroeck-excalidraw.git
   ```

2. **Load the Extension in Your Browser:**

   - Open your Chrome (or Chromium-based) browser.
   - Navigate to `chrome://extensions/`.
   - Enable **Developer mode** (usually found at the top-right corner).
   - Click on **Load unpacked** and select the `extension` directory containing the extension files.

## Usage

1. Navigate to [Excalidraw](https://excalidraw.com/).
2. Click on the **Library** button in the sidebar.
3. The search bar will automatically appear at the top of the library panel.
4. **To Search:** Type your query into the search bar and press **Enter**. The library items will be filtered based on your query.
5. **To Reset:** Click the **Reset** button to clear the search filter and display all library items.

## Code Overview

### manifest.json

- **Manifest Version:** Uses Manifest V3.
- **Permissions:** Requires `scripting` and host permissions for `https://excalidraw.com/*`.
- **Content Script:** Injects `content.js` on Excalidraw pages when the document is idle.

### content.js

- **Element Waiting:** Uses a `MutationObserver` to wait for specific DOM elements (like the library button and container) before injecting the search UI.
- **UI Injection:** Dynamically creates and injects the search bar along with an SVG search icon and a reset button into the Excalidraw library panel.
- **Event Handling:** Listens for the "Enter" key to trigger the search function and a click event on the reset button to clear the search.

## License
Distributed under the MIT License. See `LICENSE` for more information.
