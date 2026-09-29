---
name: Apply a mixdown2 rubric
description: Build or restyle a site from a mixdown2 rubric file, at whatever scope the user names
---

# Applying a mixdown2 rubric

A rubric file describes one source — a site or a design — in enough detail
to rebuild it. You are given the path to one in the prompt. It is a brush:
apply all of it, part of it, or a fraction of it, to a new site or an
existing one, as the user asks.

You are the intelligence. The user tells you what to do in plain language;
your job is to read the rubric, find the parts of it that answer what was
asked, and apply them. The rubric is the palette, not a procedure.

## Step 1 — read the file

Read the rubric before writing anything. Everything you need is in it. It
carries these layers, and each does a different job:

- `source` — what was captured, when, how, and the honest gaps. Tells you
  how much the file can be trusted and where it is thin.
- `element_inventory` — every element the source has, and which aspects
  cover each. The map of what exists.
- `parts` — the structural units: moves (distinctive gestures) and
  components (buildable things). Each has a `recipe` telling you how to
  build it and `checks` telling you what must be true when it is built.
- `aspects` — seven, each with:
  - `values` — concrete settings. A font family, a hex, a pixel width, a
    spacing unit. These are the most directly applicable layer: set them.
    `kind: identity` (a font, an exact hex) cannot be averaged; it either
    becomes the source's value or takes an explicit substitute.
  - `rules` — always/never gates. These define the design and hold at any
    scope.
  - `directives` — imperative build lines. Read them as instructions.
  - `scales` — a position between two poles, 0 to 10, with the measurements
    behind it. Not a value to copy: a direction to hit. Read the poles and
    the evidence, then judge where the thing you are building sits.
- `limitations` — what the file does not cover. Do not invent past these.

## Step 2 — scope what was asked

The user's sentence decides scope. Common shapes:

- **The whole thing** — "build this site", "rebuild this page from the
  rubric". All layers apply: structure from `parts`, settings from
  `values`, gates from `rules`, build lines from `directives`.
- **A layer only** — "use only the colours", "just the type", "apply the
  spacing". Take that aspect's values and rules and leave everything else
  as it is.
- **One part** — "recode this section like their hero". Find the matching
  part, follow its `recipe`, satisfy its `checks`.
- **A fraction** — "make our site 20% more like this". Move the current
  site toward the rubric's values rather than jumping to them: interpolate
  each setting by the stated amount, and report what moved.
- **A comparison with no change** — "how does ours differ". Read both,
  report the readouts, change nothing.

When the sentence is clear, act. Do not ask for confirmation of scope you
have already been told.

## Step 3 — build

- Follow the `recipe` for each part you take on. It is written as how to
  build it, not as what it looks like.
- Set `values` exactly when the rubric gives a concrete setting. Interpolate
  only when the user asked for a fraction.
- Honour `rules` absolutely; they are the always/never lines.
- Hit `scales` by measurement, not by copying a number. A rubric reading of
  density 3 means airy — evidence: 80px section padding, a 1120px container
  on a 1440px viewport. Reproduce the measurements, and the reading follows.
- When the rubric names imagery, fonts, or assets you do not have, substitute
  something that keeps the same role and register, and say what you
  substituted.
- When the user asked to change only part of an existing site, change that
  part and leave the rest untouched. Do not improve things nobody named.
- Content that the rubric does not specify is yours to invent so that it
  fits the structure, the register and the rules.

## Step 4 — check against the rubric

The rubric's own `checks` are the acceptance test. For every part you built,
walk its checks and confirm each is true of what you built. A `critical`
check that fails means the part is not done.

Where the rubric gives `evidence` — measured values from the source — that is
the standard the check is against. Compare your build to those numbers.

Then read the aspect `scales` back off what you built and report where it
landed. A scale where you landed two or more points from the rubric's reading
is a mismatch worth fixing or naming.

## What not to do

- Do not grade or score unless the user asked for a score.
- Do not treat the rubric as a checklist to complete when the user asked for
  one layer or one part.
- Do not invent a value where the rubric is silent; either leave it to the
  content or state the choice you made.
- Do not average two rubrics. Applying two means applying one, then the
  other.
- Do not change anything the user did not name when applying a layer or a
  part.
- Do not let a failed critical check pass silently.
