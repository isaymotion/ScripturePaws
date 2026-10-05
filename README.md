# Scripture Paws — Core Loop Rebuild

Scripture Paws is an offline-first Scripture typing game built around a peaceful pixel-art garden. This version removes the old collectible-object and garden-placement loop. The garden is a persistent visual world; the player's progression comes from Scripture practice, typing performance, Bloom progression, daily goals, personal records, and thematic verse practice.

## Core gameplay

- Continuous Scripture typing: completing a passage automatically prepares the next one.
- Verses can be typed repeatedly; practice counts are retained locally.
- Scripture library organized by spiritual theme.
- Live WPM, accuracy, errors, elapsed time, and typing combo.
- Bloom meter that advances with practice and triggers subtle garden reactions.
- Daily goals: passages, high accuracy, and combo.
- Personal records: best WPM, best accuracy, best combo, total passages, total characters.
- Static garden background with Miso as a visual companion.
- LocalStorage persistence and JSON export.
- Service-worker offline shell.
- Reduced-motion setting.

## Scripture themes

Peace & Stillness; Comfort & Grief; Hope; Trust & Faith; Strength & Perseverance; Guidance & Wisdom; Love & Compassion; Prayer & Gratitude; Anxiety & Worry; Forgiveness & Mercy; Courage.

The current Scripture set uses short Douay-Rheims (Challoner revision) passages already present in the project. The historical translation is public domain; verify jurisdictional requirements before wider distribution.

## Run locally

Use a local server for service-worker testing:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub Pages

Upload the contents to the repository root, then Settings → Pages → Deploy from a branch → `main` → `/ (root)`. Use the HTTPS Pages URL for offline testing.

## Attribution

This game was created by Isabella Navarro, MD. Latest version October 2026. isaymotion@gmail.com


## Gameplay Pass 2
- Continuous automatic passage transitions after completion
- Passage input is capped to the target text for safer paste handling
- Combo milestones and Bloom bonuses reward accurate flow
- Repeated verses show practice count plus best WPM/accuracy
- Local practice streak is tracked
- Optional lightweight sound cues are now functional
- Timer pauses while the page is hidden
