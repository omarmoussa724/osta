# OSTA — Marketing / Presentation Video Kit

**Goal:** a ~2:00 product walkthrough that sells OSTA to factory owners, operations
managers and engineering managers, plus a 0:30 cut for LinkedIn/ads.
**Tone:** calm, technical, confident. No hype, no buzzwords. Let the product move.

Everything below is keyed to the real app and its seed data, so the demo tells a true story.

---

## 1. Specs & deliverables

| Item | Spec |
|---|---|
| Master | 1920×1080, 30 fps, H.264 MP4, ~12 Mbps, audio -14 LUFS |
| Long cut | 2:00–2:10, 16:9, burned-in captions |
| Short cut | 0:30, 16:9 **and** 1:1 + 9:16 crops for social |
| Booth loop | Long cut, no CTA card, silent-friendly (captions on, music optional) |
| Frame rate | Record at 60 fps if your machine allows, deliver 30 — smoother cursor + slow-mo headroom |

---

## 2. App prep before recording

1. Run the real build, not the single file:
   ```bash
   cd C:\Users\LOQ\code\osta
   npm run dev            # http://localhost:5173
   ```
2. Chrome, **new profile / guest window**. Hide the bookmarks bar (`Ctrl+Shift+B`).
   Full-screen the window (`F11`) so there is no tab strip or address bar in frame.
3. Browser zoom **110–125%** (`Ctrl` +) so table text is readable at 1080p. Pick one zoom and keep it.
4. Display scaling 100%. Disable notifications / Focus Assist on.
5. Cursor: enable "show cursor" in OBS. Optional: a click-highlight tool (e.g. free *Mouser*, *Ka. Mouse* or OBS "cursor" filter) so taps read on screen.
6. Data is already staged for the story — **do not touch it**:
   - Dashboard KPIs: 12 projects · 486 parts in production · 74 outsourced · EGP 1.84M exposure · 18 at risk · 87% on-time
   - Bottleneck: **Cutting — 142 items, 18 delayed**
   - Risks feed: P-001245 material shortage · OUT-0261 supplier at risk · ASM-004 QC failure
   - `P-001245` Side Plate, S235JR 6 mm, ASM-001.1 — **Blocked** at Material Reserved
   - `OUT-0261` Cairo Precision Fabrication · Laser Cutting · 42 parts · 1.8 t · EGP 145,000 · **At Risk**
   - `NEST-0261` S235JR 6 mm · 1500×3000 · 24 parts · 86.4% · TRUMPF TruLaser 5030
7. **Record each scene as its own clip.** Re-takes stay cheap and the edit is just assembly.
8. Practice the click path twice per scene so the cursor moves with intent, not hunting.

### OBS settings
- Base + output resolution 1920×1080, 60 fps.
- Source: *Window Capture* (the Chrome window), not display capture.
- Encoder: x264, CRF ~18, or NVENC "Quality". Recording format `mkv` (remux to mp4 after).
- No mic on the screen clips — narration is a separate track.

---

## 3. Long-cut shot list (2:00)

> Timecodes are targets. Narration column is the exact VO for that scene (full script also in §4).
> "Caption" = on-screen text you burn in (bottom third, Archivo, white, 60–70% width).

| # | Time | Screen / route | On-camera action | Caption | Narration (spoken over) |
|---|---|---|---|---|---|
| 1 | 0:00–0:04 | Black / logo card | OSTA wordmark fades in on `#0B0D10`, accent underline wipes `#4C9AFF` | *OSTA — the operating system for modern fabrication* | *(music only)* |
| 2 | 0:04–0:20 | 3 plain title cards (or stock b-roll of a fab shop) | One line per card, hard cuts on the beat | Card A: "Where is this part?" · Card B: "Is the steel reserved?" · Card C: "Did it pass final QC?" | "Every fabrication shop runs on the same questions. Where is this part. Is the steel reserved. Did it pass final QC. What went to the subcontractor — and when does it come back." |
| 3 | 0:20–0:27 | Cut to app at `/#/` (Command Center), already loaded | Hold still, slow 4% push-in | "Today those answers live in spreadsheets and chat groups. Never in one place." | *(continues from scene 2)* |
| 4 | 0:27–0:44 | `/#/` Dashboard | Cursor drifts across the KPI row → down to Production Flow → rest on the **Cutting** card (red) | "One Command Center" | "This is OSTA. Twelve active projects. Four hundred and eighty-six parts in production. The flow shows where the work actually is — and cutting is the bottleneck, with eighteen items delayed." |
| 5 | 0:44–0:52 | `/#/` Dashboard, Operational Risks panel | Cursor moves down the risk list; brief hover on the P-001245 row | "OSTA flags the risks for you" | "On the right, OSTA is already flagging the risks. A material shortage. A supplier slipping. A rejected batch at QC." |
| 6 | 0:52–0:58 | Click risk row → lands on `/#/parts/P-001245` | Click, let page settle | — | "Follow the first one." |
| 7 | 0:58–1:14 | `/#/parts/P-001245` (Part Detail) | Scroll slowly: header → red **Blocked** banner → Manufacturing Timeline | "P-001245 · Side Plate · S235JR 6 mm" | "Part P-001245 — the Side Plate. Six-millimetre S235 steel, four off. It's blocked, and OSTA tells you why: the material is short by one-point-seven tonnes, and the mill certificate is missing." |
| 8 | 1:14–1:22 | Same page, breadcrumb bar | Cursor taps each breadcrumb crumb: `PRJ-26001` › `ASM-001.1` (don't navigate yet — just show it) | "Every object is connected" | "This part knows where it belongs — its project, its assembly, its drawing revision." |
| 9 | 1:22–1:38 | Same page, "Workflow Connections" panel | Slowly hover each connection tile (Nesting, Production, Outsourcing, QC) | "One part number. Every module." | "And it connects everything downstream. Its nesting layout. Its production job. The outsourced laser-cutting order. And its quality gate." |
| 10 | 1:38–1:46 | Click the **Outsourcing** connection → `/#/outsourcing/OUT-0261` | Click; let the stepper render | "RFQ-0261 · Cairo Precision Fabrication" | "The cut is subcontracted — RFQ 0261, forty-two parts, one-point-eight tonnes, with Cairo Precision Fabrication. Flagged at risk: two days from the need date." |
| 11 | 1:46–1:52 | Back → `/#/parts/P-001245`, scroll to **Final Gate** panel | Show "FINAL_DIM_QC · Not reached" and "Ready for Assembly · Locked" | "Final QC is a hard gate" | "Final dimensional QC is mandatory. Until it passes, this part cannot be marked ready for assembly. OSTA won't allow it." |
| 12 | 1:52–2:02 | Press `Ctrl/⌘ K` → type `P-001245` slowly → results group by module | Let the grouped results sit on screen 2 s | "Search once. See the whole part." | "One search. A part number pulls its project, B-O-M, materials, nesting, production, outsourcing and QC — the entire life of that part, in one view." |
| 13 | 2:02–2:10 | CTA card on `#0B0D10` | OSTA mark + tagline + URL/contact | "Engineering · Manufacturing · Outsourcing — one system" / "Book a walkthrough → your-domain.com" | "OSTA. Engineering, manufacturing and outsourcing — one operational system. Book a walkthrough for your shop floor." |

**Extra B-roll to grab (5–8 s each, for cutaways / the 0:30):**
- `/#/production` — drag a card from *In Production* to *QC* (the drag itself sells "live").
- `/#/nesting/NEST-0261` — the SVG sheet layout with parts nested; slow pan.
- `/#/analytics` — the on-time trend line + WIP bars.
- `/#/projects` — the project table scrolling one page.
- `/#/materials` — the shortage alert cards.

---

## 4. Full narration script — LONG CUT

> ~255 words. Read at ~125 wpm (calm, deliberate). Leave a beat at every line break.
> Total with pauses ≈ 2:00–2:10.

```
Every fabrication shop runs on the same questions.
Where is this part. Is the steel reserved. Did it pass final QC.
What went to the subcontractor — and when does it come back.
Today those answers live in spreadsheets and chat groups. Never in one place.

This is OSTA.
Twelve active projects. Four hundred and eighty-six parts in production.
The flow shows where the work actually is —
and cutting is the bottleneck, with eighteen items delayed.

On the right, OSTA is already flagging the risks.
A material shortage. A supplier slipping. A rejected batch at QC.
Follow the first one.

Part P-001245 — the Side Plate. Six-millimetre S235 steel, four off.
It's blocked, and OSTA tells you why:
the material is short by one-point-seven tonnes, and the mill certificate is missing.

This part knows where it belongs — its project, its assembly, its drawing revision.
And it connects everything downstream.
Its nesting layout. Its production job. The outsourced laser-cutting order. And its quality gate.

The cut is subcontracted — RFQ zero-two-six-one, forty-two parts, with Cairo Precision Fabrication.
Flagged at risk: two days from the need date.

Final dimensional QC is mandatory.
Until it passes, this part cannot be marked ready for assembly. OSTA won't allow it.

One search. A part number pulls its project, B-O-M, materials, nesting,
production, outsourcing and QC — the entire life of that part, in one view.

OSTA. Engineering, manufacturing and outsourcing — one operational system.
Book a walkthrough for your shop floor.
```

### Pronunciation guide (for a reader or TTS)
- **OSTA** → "OSS-tah"
- **S235** → "S two-thirty-five" (or "steel two-three-five")
- **P-001245** → "P, oh-oh-one-two-four-five"
- **RFQ-0261** → "R-F-Q, zero-two-six-one"
- **FINAL_DIM_QC** → "final dimensional Q-C"
- **BOM** → spell it: "B-O-M"
- **TRUMPF** → "Trumpf" (one syllable, as spelled)
- **tonnes** → metric ton

### VO direction
Male or female, low-mid register. Newsroom-calm, not announcer-loud. Slight downward
inflection at line ends (statements, not questions — except the three hook questions,
which stay flat and clipped). No smile in the voice. ~15% slower than you think.

---

## 5. Full narration script — SHORT CUT (0:30)

> ~70 words. One problem line, one proof beat, one CTA.

```
Your parts, your steel, your subcontractors, your QC —
in four different systems that don't talk to each other.

OSTA puts them in one.

Every part carries its own identity — from the B-O-M,
through nesting and the shop floor, to the outsourced order
and the final QC gate it can't skip.

Search one part number. See its entire life.

OSTA — the operating system for modern fabrication.
Book a walkthrough.
```

**0:30 shot order:** logo (2s) → Dashboard push-in (3s) → Part Detail blocked banner (4s) →
Workflow Connections hover (5s) → Production drag card (4s) → Final Gate "Locked" (4s) →
⌘K search resolving (5s) → CTA card (3s).

---

## 6. Using Suno for the audio

Suno makes **music with vocals**, not clean spoken narration. Two ways to use it:

### Option A — Branded track as a background bed (recommended)
Generate an instrumental / low-vocal bed, then lay the spoken VO (a real read or a TTS
like ElevenLabs) on top. Suno prompt:

- **Style box:**
  `cinematic corporate underscore, industrial ambient, warm analog synth pads, muted
  four-on-the-floor kick, subtle metallic percussion, restrained, hopeful, forward-moving,
  90 BPM, no lead vocals, leaves space for a voiceover, clean mix`
- **Lyrics box:** leave empty, or put `[instrumental]`.
- Generate 2–3 takes, pick the one with the least melodic movement in the mid-range
  (that's where the VO sits). Aim for a 2:15 track so you can trim to picture.

### Option B — Sung/spoken brand anthem (if you want OSTA to have a "sound")
Use this only for a teaser or the booth loop — it competes with narration.

- **Style box:**
  `spoken-word verses over cinematic industrial beat, one short sung hook, male narrator,
  confident, minimal, 88 BPM, Massive Attack meets corporate film score, wide stereo,
  punchy drums, no rap`
- **Lyrics box:**

```
[Intro - spoken, dry]
Where is the part. Where is the steel.
Where did it go. Nobody knows.

[Verse 1 - spoken over beat]
Twelve projects moving, four hundred parts in the line
Cutting's the bottleneck, eighteen behind
One plate is blocked — the steel came up short
Every answer scattered, nothing to report

[Hook - sung, half-time, big]
One system.
Every part knows where it's been.
O-S-T-A —
the floor, the office, everything between.

[Verse 2 - spoken]
Same number on the nest, the job, the RFQ
The supplier's running late, OSTA already knew
Final QC gate — it will not let it through
Till the part is right, there's nothing you can do

[Hook]
One system.
Every part knows where it's been.
O-S-T-A —
the floor, the office, everything between.

[Outro - spoken, dry]
OSTA. The operating system for modern fabrication.
```

> Suno tip: generate the intro+verse1+hook as one clip and verse2+hook+outro as a second
> (lyrics limit + more control), then butt-join in the edit. Ask for "no autotune,
> natural spoken delivery" in the style box if the verses come out too melodic.

### Music level
Duck the bed to **-22 to -26 LUFS** under narration; bring it up to -16 in the
title/CTA gaps. Full-mix target for web delivery: **-14 LUFS**, true peak ≤ -1 dB.

---

## 7. Edit recipe

1. **Assemble** clips in order from the shot list on a 1080p30 timeline.
2. **Trim to the VO.** Lay the narration first, then stretch/trim each screen clip to its
   line. Cursor should *arrive* on a target as the matching word is said.
3. **Punch-ins / zooms.** On every "look here" moment (Cutting card, Blocked banner,
   a Connection tile, the Final Gate, search results) add a slow 1.0→1.15 scale keyframe
   over ~1.5 s. Never snap.
4. **Speed.** Screen-record footage of typing/loading: 1.25–1.5× with smooth-motion off.
   The Production drag: keep 1.0× or 0.9×.
5. **Title cards.** `#0B0D10` bg, Archivo 600, white. Accent rule in `#4C9AFF`.
   3 hook cards + 1 CTA card. 0.3 s fade in/out.
6. **Captions.** Burn in the whole VO. Archivo/Inter, ~34 px, white, 2–4 words per line,
   bottom third, 8% margin, subtle shadow. (Most B2B video is watched muted.)
7. **Lower-thirds** (optional) on scene 7 & 10: `P-001245 · Side Plate` / `RFQ-0261 · Cairo Precision Fabrication`.
8. **Music.** Bed under everything, ducked (see §6). Optional soft *whoosh* on each title
   card and a single low *thump* on the logo reveal — nothing more.
9. **Color.** The UI is already graded. Add at most a 2–3% contrast bump and a tiny
   vignette. Don't touch hue.
10. **Export.** MP4 / H.264, 1080p30, ~12 Mbps VBR, AAC 320 kbps, -14 LUFS.
    Then make the 1:1 and 9:16 crops of the 0:30 (reframe so the active panel stays centered).

---

## 8. On-screen copy (title & CTA cards)

- **Open card:** `OSTA` / `The operating system for modern fabrication.`
- **Hook cards:** `Where is this part?` · `Is the steel reserved?` · `Did it pass final QC?`
- **Mid supers:** `One Command Center` · `One part number. Every module.` · `Final QC is a hard gate.`
- **CTA card:**
  `OSTA`
  `Engineering · Manufacturing · Outsourcing — one operational system`
  `Book a walkthrough → your-domain.com` · `hello@your-domain.com`

---

## 9. Distribution cuts

| Channel | Cut | Notes |
|---|---|---|
| Landing page hero | 2:00, muted autoplay, captions on, poster = Dashboard frame | |
| LinkedIn feed | 0:30, 1:1, captions on | tag: "for fabrication & sheet-metal shops" |
| Sales email | 2:00, hosted (not attached), thumbnail with a play button | |
| Investor deck | 0:30 embedded on one slide + live app link | |
| Trade-show loop | 2:00 booth loop, no CTA card, repeats | |

---

## 10. Optional: "presenter mode" in the app

If you want the recording to look even more deliberate, I can add a `?present=1` flag to
the app that: bumps base font ~1px, slows transitions, dims non-focused panels, and shows
a small step-highlight ring on the elements in the shot list. Say the word and I'll build it.
