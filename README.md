# Scripture Paws — Core Loop Rebuild

Scripture Paws is an offline-first Scripture typing game built around a peaceful pixel-art garden. This version removes the old collectible-object and garden-placement loop. The garden is a persistent visual world; the player's progression comes from Scripture practice, typing performance, Bloom progression, daily goals, personal records, and thematic verse practice.

## Core gameplay

- Continuous Scripture typing: completing a passage automatically prepares the next one.
- Verses can be typed repeatedly; practice counts are retained locally.
- Scripture library organized by spiritual theme, with 55 passages across 15 themes.
- Live WPM, accuracy, errors, elapsed time, and typing combo.
- Bloom meter that advances with practice and triggers subtle garden reactions.
- Daily goals: passages, high accuracy, combo, and at least one complete prayer.
- Personal records: best WPM, best accuracy, best combo, total passages, total characters.
- Static garden background with Miso as a visual companion.
- LocalStorage persistence and JSON export.
- Service-worker offline shell.
- Reduced-motion setting.
- Prayer mode with traditional Catholic prayers presented phrase-by-phrase in strict order.
- **Structured Prayer mode — Holy Rosary:** a complete five-decade Rosary is built automatically from the current day’s Mystery set, with the standard sequence of opening prayers, five Mysteries, 50 decade Hail Marys, Glory Be prayers, the Fátima Prayer after each decade, and the Hail, Holy Queen conclusion.
- Rosary Mystery schedule follows the contemporary EWTN/John Paul II pattern: Monday & Saturday Joyful; Tuesday & Friday Sorrowful; Wednesday & Sunday Glorious; Thursday Luminous. The app displays the selected Mystery set and individual Mystery before each decade.
- Every completed Rosary prayer advances the garden scene, while each Mystery creates a dedicated quiet meditation step before its decade.
- 10-prayer collection: Our Father, Hail Mary, Glory Be, Fátima Prayer, St. Michael, Hail Holy Queen, Apostles’ Creed, Angelus, Memorare to Mary, Memorare to St. Joseph, and Morning Offering.
- Prayer completion changes the garden background when a new garden scene is available.
- Reaching Bloom 100% in Scripture mode also advances to the next available garden scene.
- Garden-scene system prepared for Autumn, Winter, Summer, Scottish, Mushroom, and future scenes; unavailable scenes are skipped until their artwork is added.

## Scripture themes

Peace & Stillness; Comfort & Grief; Hope; Trust & Faith; Strength & Perseverance; Guidance & Wisdom; Love & Compassion; Prayer & Gratitude; Anxiety & Worry; Forgiveness & Mercy; Courage; Protection & Refuge; Patience & Waiting; Humility & Service; Light & Creation.

The Scripture set uses the Douay-Rheims 1899 American Edition (Challoner revision), a public-domain translation. The verse references are kept in the app as typed practice passages; Psalm references include modern-numbering equivalents where useful.

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

## Verse selection
- The game uses a shuffled deck rather than independent random selection.
- A deck is exhausted before its verses are reshuffled, greatly reducing immediate repeats.
- Recently practiced verses are deprioritized when a new deck is built.
- Unpracticed verses naturally rise earlier in a fresh deck.
- Theme-filtered practice uses the same no-repeat deck logic within that theme.


## Prayer mode

Prayer mode is separate from shuffled Scripture practice. Each prayer is presented as an ordered sequence of phrases; the player must complete phrase 1 before phrase 2 appears, continuing through the complete prayer. The prayer collection uses the EWTN versions of the Our Father, Hail Mary, Glory Be, Fátima Prayer, Prayer to St. Michael, Hail Holy Queen, Apostles' Creed, Angelus, Memorare to the Blessed Virgin Mary, Memorare to St. Joseph, and Morning Offering. Prayer text is kept ordered and is not paraphrased.

## Prayer sources

The prayer text used in the app is restricted to the EWTN versions of these prayers:

- The Angelus — EWTN, “Angelus Prayer”
- The Memorare — EWTN, “Memorare”
- Memorare to St. Joseph — EWTN, “Memorare to St. Joseph & Act of Consecration to St. Joseph”
- The Morning Offering — EWTN, “The Morning Offering”
- The existing prayer collection likewise uses EWTN prayer pages identified in the app source.

The app keeps the selected source wording ordered for typing practice and does not paraphrase it.

## Garden progression

Completing a prayer changes the garden scene. In Scripture mode, reaching Bloom 100% also changes the garden. The current build includes Morning Garden and Autumn Garden artwork; additional scenes are intentionally staged one at a time so each background can be quality-checked before being added.

## Structured Prayer — Holy Rosary

Structured Prayer is separate from ordinary Prayer practice. The first structured devotion is the Holy Rosary. The app automatically determines the Mystery set from the current weekday using the contemporary schedule documented by EWTN. It does not shuffle the Rosary sequence.

The Rosary sequence used in the app is based on EWTN's Rosary instructions: Sign of the Cross, Apostles' Creed, Our Father, three Hail Marys, Glory Be; then five decades, each consisting of the announced Mystery, Our Father, ten Hail Marys, Glory Be, and the customary Fátima Prayer; followed by Hail, Holy Queen and the Sign of the Cross. EWTN notes that the Fátima Prayer is customary rather than a formal required part of the Rosary.

Source: EWTN, *Rosary Prayers* and *How to Say the Rosary*.

### Rosary bead progress and liturgical-season handling

Structured Prayer currently includes the Holy Rosary. The Rosary is modeled as an ordered five-decade session using EWTN's published prayer structure. Each decade contains an Our Father, ten Hail Marys, a Glory Be, and the optional Fátima Prayer; the app also includes the customary opening and concluding prayers.

The Rosary UI now shows a compact five-decade bead tracker. Each small bead corresponds to one of the ten Hail Marys in that decade. The current decade and current bead are highlighted, and completed beads remain filled as the player advances. Mystery meditation steps sit between decades and do not count as typed prayer steps.

The weekly Mystery schedule follows the current pattern described by EWTN and the Vatican: Joyful on Monday/Saturday, Sorrowful on Tuesday/Friday, Luminous on Thursday, and Glorious on Wednesday/Sunday. The app additionally handles the seasonal Sunday exceptions explicitly described by EWTN: Sundays of Advent and Christmas use the Joyful Mysteries, while Sundays of Lent use the Sorrowful Mysteries. The app determines these seasons locally, without an external calendar service, using Gregorian Easter computus and the relevant seasonal date ranges.

The app labels the active liturgical season and explains a seasonal override when one is being used. This pass intentionally does not attempt to encode every individual feast-day exception; EWTN notes that the weekly distribution is customary and may be adapted for particular liturgical celebrations.

Sources: EWTN, *The Holy Rosary* / *Rosary Prayers*; Vatican, *The Mysteries of the Rosary* and *Rosarium Virginis Mariae*.

## Structured Prayer — Rosary Pass 3

The Holy Rosary is implemented as an ordered, offline structured-prayer journey. The app selects the day's Mystery set using the weekly pattern, seasonal Sunday handling, and a conservative liturgical-feast override layer. Feast overrides currently cover Christmas, Epiphany (Jan. 6 Roman-calendar anchor), Annunciation, Easter Sunday, Pentecost, and the Assumption; the app does not attempt to encode every local-calendar transfer or every saint's feast.

Mystery cards now include a Scripture reference and a short contemplative prompt, followed by an explicit quiet pause before the decade begins. This follows the contemplative method emphasized in Vatican's *Rosarium Virginis Mariae*, especially the recommendation to announce the mystery, proclaim a related Scripture passage, and pause in silence before the vocal prayer. Sources: Vatican, *Rosarium Virginis Mariae* §§29–31; EWTN Rosary Confraternity.

### Rosary Meditation Mode / Prayer Companion

Structured Prayer now has two Rosary play styles:

- **Typing** — the existing Scripture Paws typing-game experience. Each prayer is typed in strict order and contributes typing statistics.
- **Meditation Mode** — a prayer-companion experience for users who want to pray aloud rather than type. The current prayer is displayed in full, the user prays it aloud, then taps the rosary-bead control to advance to the next prayer. The current bead in the decade tracker is also tappable during prayer steps.

Mystery meditation remains a separate pause before each decade. The user reads the Mystery card and Scripture reference, contemplates it, and then chooses **Continue to prayer**. Meditation Mode does not require keyboard input and does not count spoken prayer as typed characters.

The Rosary's structural order, Mystery selection, feast overrides, and contemplative Mystery cards are shared by both play styles; only the interaction model changes.
