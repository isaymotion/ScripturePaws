# Scripture Paws — Core Loop Rebuild

Scripture Paws is an offline-first Scripture typing game built around a peaceful pixel-art garden. This version removes the old collectible-object and garden-placement loop. The garden is a persistent visual world; the player's progression comes from Scripture practice, typing performance, Bloom progression, daily goals, personal records, and thematic verse practice.

## Release 2 Pass 3 — Phase 1: Core garden feedback

- Live combo milestones at 5, 10, 20, 30, 50 and later 25-combo intervals.
- Gentle garden particle bursts and a subtle garden pulse at combo milestones.
- Flow multiplier from 1.0× up to 2.0× increases Bloom reward at passage completion.
- Live combo is reflected in the garden HUD while typing.
- Status messages explain flow and combo resets without interrupting typing.
- A **What's New** section sits below the main garden/progression area so players can review recent changes.

## Core gameplay

- Continuous Scripture typing: completing a passage automatically prepares the next one.
- Verses can be typed repeatedly; practice counts are retained locally.
- Scripture library organized by spiritual theme, with 121 passages across 15 themes, including a major Psalm expansion with 44 additional Douay-Rheims passages plus 22 prayer-oriented Psalm passages in a dedicated Prayer Psalms deck.
- Live WPM, accuracy, errors, elapsed time, and typing combo.
- Bloom meter that advances with practice and triggers subtle garden reactions.
- Daily goals: passages, high accuracy, combo, and at least one complete prayer.
- Personal records: best WPM, best accuracy, best combo, total passages, total characters.
- Static garden backgrounds are the primary visual world; legacy botanical, creature, flower, and cat asset collections have been removed.
- LocalStorage persistence and JSON export.
- Service-worker offline shell.
- Reduced-motion setting.
- Prayer mode with traditional Catholic prayers presented phrase-by-phrase in strict order.
- **Structured Prayer mode — Holy Rosary:** a complete five-decade Rosary is built automatically from the current day’s Mystery set, with the standard sequence of opening prayers, five Mysteries, 50 decade Hail Marys, Glory Be prayers, the Fátima Prayer after each decade, and the Hail, Holy Queen conclusion.
- Rosary Mystery schedule follows the contemporary EWTN/John Paul II pattern: Monday & Saturday Joyful; Tuesday & Friday Sorrowful; Wednesday & Sunday Glorious; Thursday Luminous. The app displays the selected Mystery set and individual Mystery before each decade.
- Every completed Rosary prayer advances the garden scene, while each Mystery creates a dedicated quiet meditation step before its decade.
- 11-prayer collection: Our Father, Hail Mary, Glory Be, Fátima Prayer, St. Michael, Hail Holy Queen, Apostles’ Creed, Angelus, Memorare to Mary, Memorare to St. Joseph, and Morning Offering.
- Prayer completion changes the garden background when a new garden scene is available.
- Reaching Bloom 100% in Scripture mode also advances to the next available garden scene.
- Garden-scene system prepared for Afternoon, Autumn, Winter, Summer, Scottish, Mushroom, and future scenes; unavailable scenes are skipped until their artwork is added. The Afternoon Garden is bundled in this build and joins Morning and Autumn as an available progression scene.

## Scripture themes

Peace & Stillness; Comfort & Grief; Hope; Trust & Faith; Strength & Perseverance; Guidance & Wisdom; Love & Compassion; Prayer & Gratitude; Anxiety & Worry; Forgiveness & Mercy; Courage; Protection & Refuge; Patience & Waiting; Humility & Service; Light & Creation.

The Scripture set uses the Douay-Rheims 1899 American Edition (Challoner revision), a public-domain translation. The expanded Psalm selection adds 44 passages, including several longer Psalm challenges. Verse references are kept in the app as typed practice passages; Psalm references include modern-numbering equivalents where useful.

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



## Meditation Mode

Scripture and Prayer each have a separate **Meditation Mode**, independent of Structured Prayer's Rosary/Chaplet Meditation Mode. In Scripture Meditation, the full verse is displayed for quiet reading; tapping the passage (or pressing Enter/Space while it is focused) moves to the next passage from the shuffled Scripture deck. In Prayer Meditation, the complete prayer is displayed; tapping the prayer moves to the next prayer from the shuffled prayer deck. Meditation Mode does not generate WPM, accuracy, combo, or typing errors.

Returning from Structured Prayer Meditation to Scripture or Prayer restores the normal typing controls when those modes are in Typing Mode.

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

Completing a prayer changes the garden scene. In Scripture mode, reaching Bloom 100% also changes the garden. The current build includes Starter, Morning, Afternoon, Autumn, Winter, and Church Garden artwork; additional scenes are intentionally staged one at a time so each background can be quality-checked before being added.

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


### Divine Mercy Chaplet — dedicated bead tracker

The Divine Mercy Chaplet has its own progress visualization rather than reusing the Rosary's decade bar. It shows the four opening prayers, five decades with one larger Eternal Father bead plus ten smaller mercy beads per decade, and the three concluding Holy God repetitions followed by the Sign of the Cross. This mirrors EWTN's published Chaplet sequence.

In Meditation Mode, the current Divine Mercy bead can be pressed after the prayer is spoken aloud. The tracker is a progress/companion aid only; it does not add extra prayers to the Chaplet. Optional Three O'Clock Hour prayers remain outside the core Chaplet.

Primary source: EWTN, *The Chaplet of the Divine Mercy*: https://www.ewtn.com/catholicism/devotions/chaplet-of-the-divine-mercy-387
Additional EWTN source: *How do you recite the Divine Mercy Chaplet?*: https://www.ewtn.com/catholicism/seasons-and-feast-days/how-do-you-recite-the-divine-mercy-chaplet-21612

### Divine Mercy Chaplet — Structured Prayer

The Structured Prayer system now includes the **Divine Mercy Chaplet** alongside the Holy Rosary. Its core sequence is based on EWTN's *Chaplet of the Divine Mercy*: Sign of the Cross, Our Father, Hail Mary, Apostles' Creed; five decades with the Eternal Father prayer on the large bead and the Divine Mercy invocation on each of ten small beads; three repetitions of the Holy God prayer; and the Sign of the Cross. EWTN notes that additional prayers at the Three O'Clock Hour are optional and are not included in this core Chaplet sequence.

The Chaplet supports the same two interaction styles as the Rosary:
- **Typing** — type each prayer exactly.
- **Meditation Mode** — pray each displayed prayer aloud, then tap the bead/continue control when ready.

Each decade receives a quiet transition card encouraging the user to entrust themselves and the whole world to Divine Mercy before beginning the decade. This is an educational/contemplative UI treatment, not an additional liturgical prayer.

Primary source: EWTN, *The Chaplet of the Divine Mercy*: https://www.ewtn.com/catholicism/devotions/chaplet-of-the-divine-mercy-387
Secondary EWTN source: https://www.ewtn.com/catholicism/seasons-and-feast-days/how-do-you-recite-the-divine-mercy-chaplet-21612

### Divine Mercy Structured Prayer — Pass 3

The Structured Prayer area now includes a **Divine Mercy Novena** companion in addition to the Divine Mercy Chaplet. The Novena is represented as nine selectable intention days, followed by the existing Divine Mercy Chaplet. The app uses the current calendar to default to the appropriate day when the Novena falls between Good Friday and the Saturday before Divine Mercy Sunday; outside that window, Day 1 is the default and the user may choose any day manually.

The nine intention groups are paraphrased from EWTN's *Divine Mercy Novena*. The app does not reproduce the full EWTN Novena prayers; instead, it provides a contemplative intention card and then launches the full in-app Chaplet sequence. This keeps the app's devotional guidance source-based while avoiding unnecessary duplication of the longer source text.

Source: EWTN, *Divine Mercy Novena*: https://www.ewtn.com/catholicism/library/divine-mercy-novena-9119

EWTN states that the Novena begins on Good Friday, has a different group of souls/intention for each of nine days, and is prayed along with the Divine Mercy Chaplet.


## Release 2 · Pass 3 · Phase 2

This phase deepens garden progression without adding currencies, lives, ads, or leaderboards. Bloom now advances persistent garden levels and five visual growth stages: Seedling, Growing Garden, Flowering Garden, Flourishing Garden, and Garden Sanctuary. Level-up celebrations include a gentle garden reaction and the background advances through the garden images that are actually bundled.

Winter Garden is now bundled as a progression scene with a snow-covered cottage terrace, frozen lake, snowy mountains, and a rabbit companion. Summer, Scottish, and Mushroom remain prepared slots until their artwork is added.


## Release 2 · Pass 3 · Phase 4 — Mastery
- Perfect Passage recognition at 98%+ accuracy with no errors.
- Accuracy-based Bloom reward includes a Perfect Passage bonus.
- Persistent perfect-passage count and best WPM.
- Theme mastery tracks unique verses practiced within each of the 15 Scripture themes.
- 50% and 100% theme-completion milestones are recorded locally.
- No new external dependencies or server requirements.


## Phase 4 — Garden Moments
- Added occasional, non-collectible Garden Moments (butterfly, bird, firefly, flower, breeze, sunlight).
- Moments use a calm opacity transition only; no shaking, zooming, or blur.
- What's New is now an expandable panel with larger, readable text.
- Fixed long Apostles' Creed display in Structured Prayer typing mode so it stays contained within the garden practice area.
- Preserved the subtle garden background fade transition.


## Latest Scripture expansion

This build expands the Scripture library from 55 to 99 passages. The 44 additional Psalm selections are distributed across the existing 15 spiritual themes so the expanded library strengthens the existing progression and mastery system rather than creating a separate Psalm-only progression. A dedicated Prayer Psalms deck now adds 22 prayer-oriented Psalm selections for petition, mercy, guidance, protection, peace, trust, hope, and praise. Several longer selections, including Psalm 22 (23), Psalm 26 (27), and Psalm 120 (121), provide more substantial typing challenges.


## Starter Garden
The app now opens in **Starter Garden** every time. It is intentionally the quiet starting scene: a more open garden with a Virgin Mary statue, one cat, and a vine-covered cottage. Persistent practice progress is retained, but the active garden scene resets to Starter Garden on a fresh app opening so changing gardens feels intentional.

A **Change garden** control selects a random different bundled garden, excluding Starter Garden and the garden currently shown.


## Garden backgrounds

Active bundled scenes include Starter Garden, Morning Garden, Afternoon Garden, Autumn Garden, Winter Garden, and Church Garden.
## App icon

The GitHub Pages/PWA icon is a GBA-style pixel-art devotional portrait of Mama Mary surrounded by cherry blossoms. The icon is bundled locally so the app remains fully offline-capable.

- `assets/icons/icon-512.png` — PWA icon
- `assets/icons/icon-192.png` — PWA icon
- `assets/icons/apple-touch-icon.png` — iOS/iPadOS home-screen icon
- `assets/icons/favicon.ico` / `favicon-32.png` — browser favicon


### Meditation interaction
In Scripture, Prayer, and Structured Prayer Meditation Mode, the meditation text is actionable: tap/click the prayer or passage text to advance. Structured Prayer also retains the dedicated bead action.


## Phase 7 QA — Meditation contrast fix
- Strengthened contrast for Rosary and Divine Mercy contemplative/mystery meditation cards.
- Added an opaque dark reading surface, high-contrast text, internal scrolling, and mobile sizing so meditation text remains readable over all garden backgrounds.
- Service-worker cache bumped for deployment.
