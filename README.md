# Slope Notes — independent ski coaching concept

A small, mobile-friendly React prototype exploring a single coaching cue after a ski run. This is an independent portfolio project, unaffiliated with Carv. It does not use Carv data, sensors, branding, or APIs. All session data and scores are fictional.

## Run locally

Requires Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Open the URL printed by Vite. For a production build, run `npm run build` and `npm run preview`.

## Explore

- Switch between two simulated sessions to see different coaching priorities.
- Select **Key moments** for a short timeline and **How it works** for the prototype's limits.
- Try **On-snow mode** at a narrow phone width. The primary cue becomes larger and simpler.
- Select **Listen to cue** to hear browser text-to-speech, where supported.

## Product and engineering decisions

| Decision | Why | Next validation |
| --- | --- | --- |
| One cue per run | Avoid overwhelming a skier | Ask skiers whether they remember and use it next run |
| Transparent rules | Make the prototype inspectable | Compare coaching relevance with expert review |
| Post-run feedback | Avoid distracting a skier mid-turn | Test safe moments and audio timing on snow |
| Large on-snow controls | Support quick interaction outdoors | Test gloves, glare, cold, and wet screens |
| Local static data | Keep scope small and claims honest | Define consent, offline caching, sync, and signal contracts before using real data |

## Rule logic

`src/coaching.js` chooses a cue in this order: left/right turn gap of at least 10 points; balance score under 75; otherwise rhythm. This is a demonstration rule, **not validated biomechanical advice**. `src/data.js` contains hand-authored examples. The chart is illustrative.

## Field validation plan

1. Observe a few skiers using the prototype immediately after a run, without prompting. Record whether they find the cue and can repeat it.
2. Test glare, gloves, cold, unreliable network, and audio audibility in a safe stationary setting.
3. Have a qualified ski coach review cue language and whether it is actionable and appropriate to the data.
4. Before any live sensor integration, define measurement confidence, handling for missing or delayed data, privacy and consent, safety review, and a human reviewed quality gate.
5. Measure comprehension and usefulness alongside reliability; low crash rates alone do not show that feedback helps.

## Possible architecture if extended

A mobile client could cache sessions locally and enqueue uploads; a backend could normalize sensor events and serve confidence-tagged summaries; a separate coaching service could generate and version cues. The client should show a cue only when validated data and timing allow it. This prototype intentionally implements none of those production components.

