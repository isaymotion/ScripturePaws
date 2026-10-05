# Scripture Paws — Release 1: First Sprout

A GitHub Pages-ready, responsive, offline-first Scripture typing game with original pixel cats, plants, and creatures. Complete a passage to discover a random collectible, then arrange discoveries in saved isometric garden worlds.

## Bible text and rights

This pass uses a small selection of the **Douay-Rheims Bible, Challoner revision**. The historical translation is public domain; Project Gutenberg identifies its complete Challoner-revised edition as public domain in the USA, and The Original Douay-Rheims project publishes the 1582/1609–1610 original text under CC0. See:
- Project Gutenberg, *The Bible, Douay-Rheims, Complete*: https://www.gutenberg.org/ebooks/8300
- The Original Douay-Rheims downloads and public-domain notice: https://thedouayrheims.com/download

Public-domain status can vary by jurisdiction and by specific modern edition, transcription, annotations, and formatting. This app uses short Scripture excerpts and does not bundle modern annotations. Confirm local requirements before wider distribution. References use traditional Douay-Rheims numbering where applicable (for example, Psalm 22 in the Vulgate numbering corresponds to Psalm 23 in many modern Bibles).

## Run locally

Use a local server for service-worker testing:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`. Browsers treat localhost as a secure context for service-worker development.

## Deploy to GitHub Pages

1. Create a repository, e.g. `scripture-paws`.
2. Upload the contents of this folder to the repository root.
3. Open **Settings → Pages**.
4. Choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
5. Open the HTTPS Pages URL and wait for the first load and service-worker installation.
6. Reload once, then test offline by disabling network access.

All asset URLs are relative (`./`) so the app works from a project Pages path.

## Attribution

This game was created by Isabella Navarro, MD. Latest version October 2026. isaymotion@gmail.com

## Included

- Quick phrase and longer passage modes
- Douay-Rheims starter passages with references
- Character-by-character highlighting and strict completion
- Live WPM, accuracy, elapsed time, error count, and plant growth
- Rarity-based random discoveries including flowers, trees, vines, cats, and small wildlife
- Isometric garden builder with random open-cell placement and reserved footprints to prevent overlap
- Up to 50 placed elements per garden and multiple locally saved gardens in a gallery
- Recent results, personal bests, and a collectible inventory
- Local persistence using `localStorage`
- JSON export and reset controls
- Service-worker cache for the app shell
- In-app **What’s New?** changelog covering Release 1, Pass 1 and Pass 2
- Creator attribution and contact email in the footer
- Pixel-inspired garden scene and responsive dark garden palette
- Four original transparent SVG pixel-cat sprites (Miso, Luna, Clover, and Pip)
- Cat idle motion and typing/error/completion reactions, with reduced-motion support
- Local sprite caching for offline play
- Eight original local flower sprites with Recent Blooms and Flower Varieties views

## Release 1, Pass 7 — Isometric garden worlds

- Replaced visitor milestone progression with random rarity-based plant, tree, vine, cat, and creature discoveries. Current design weights: Common 55%, Uncommon 27%, Rare 13%, Very Rare 4%, Legendary 1%. These are gameplay odds, not ecological abundance estimates.
- Added a 10×8 isometric placement grid. Large trees reserve a 2×3 footprint, cats 2×2, vines 2×1, and small flowers/creatures 1×1. Placement searches for unoccupied cells before adding an element; depth sorting helps preserve a natural isometric order.
- Gardens support up to 50 placed elements each; multiple gardens can be named, saved, reopened, and renamed in a local gallery.
- Inventory, layouts, typing progress, and records are stored in localStorage on the current device. Export remains available for a JSON backup.
- Styling now uses a GBA-inspired limited palette, sharp pixel borders, pixelated sprite rendering, and an isometric grid. Existing SVG sprites were retained and styled for crisp edges; individual sprites are not yet all redrawn as true isometric voxel assets.

## Known limitations / next pass

- The sound setting is stored but sound effects are not yet implemented.
- The cat companions use small original SVG pixel-art sprites; the garden scene remains CSS-based.
- Personal scores are local to this browser/device. A global leaderboard requires a backend and identity/anti-cheat considerations.
- Offline mode must be tested on the deployed HTTPS origin; a first visit requires a network connection.


## Release 1, Pass 4

- Animated seedling growth, leaves, bloom pop, and gentle glow.
- Four cat companions: Miso, Luna, Clover, and Pip. New cats unlock after 0, 3, 6, and 10 completed prompts.
- More named flower rewards, with hover titles showing flower type and result.
- In-app What's New entry for this pass.


## Release 1, Pass 5

- Added original transparent pixel-cat sprites for Miso, Luna, Clover, and Pip.
- Added idle bobbing plus curious, error, and completion reactions.
- Replaced text/emoji placeholders in the hero garden, buddy panel, and companion collection.
- Added cat sprites to the service-worker app-shell cache and honored reduced-motion settings.


## Release 1, Pass 5 sprite refinement

- Reworked all four cat sprites on a larger 96px pixel-art canvas for better detail when scaled up.
- Added more individual markings and accessories: Miso's tabby stripes and flower scarf, Luna's charcoal coat and moon charm, Clover's calico patches and leafy collar, and Pip's cream-and-peach coat with a blue flower collar.
- Enlarged cat art in the garden, buddy panel, top companion pill, and collection grid with responsive sizing for smaller screens.
- Updated the service-worker cache version to `scripture-paws-r1-v5`.


## Release 1, Pass 6 — Garden Scene and Collection Presentation

- Added layered garden details: flower beds, stepping stones, and distinct flower sprites in the hero garden.
- Added eight original local SVG flower sprites: Cosmos, Daisy, Tulip, Rose, Sunflower, Lavender, Lily, and Marigold.
- Reworked the collection into two views: Recent Blooms and Flower Varieties, with counts for each variety.
- Improved spacing, labels, responsive collection tiles, and offline asset caching.



### Release 1, Pass 6 update — Expanded botanical collection

- Expanded the journal from eight flower varieties to fourteen botanical finds: eight flowers, three trees (oak, cherry, willow), and three vines (ivy, flowering vine, grapevine).
- Added six original, locally stored SVG pixel-art sprites for trees and vines.
- Typing rewards rotate through all fourteen botanical varieties. Existing saved flower records remain readable and count toward their original varieties.
- Renamed the collection view to Botanical Collection and included category labels and collected counts.
- Added all new assets to the service-worker cache for offline use.


## Sprite expansion — October 2026
This pass adds five flower discoveries (Bluebells, Poppy, Stargazer Lily, Petunia, Dandelion) and seven creature discoveries (Unicorn, Phoenix, Horse, Fox, Wolf, Deer/Fawn, Owl). New sprites are original transparent SVG pixel-art assets with crisp edges and isometric garden tiles. They are included in the discovery pool and precached by the service worker for offline use after the app shell is cached.

The rarity labels and weights are game mechanics, not claims about real-world abundance. Progress remains local to the browser.
