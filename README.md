# The Memory Palace of Stone and Light

A static, scroll-driven story website generated as an OpenAI/Codex experiment.

- Fixed full-screen stage
- Scroll-mapped scene progression
- Editable story data in `content/story.json`
- No external image/video assets; scenes are generated with HTML/CSS/SVG
- Reduced-motion static fallback

## Local checks

```bash
npm run verify
npm run serve
```


## Allowed image models

Image generation is intentionally restricted to the five OpenRouter models in
`image-generation/allowed-models.json`:

- `recraft/recraft-v4.1-flash`
- `meta/muse-image`
- `black-forest-labs/flux.2-klein-4b`
- `krea/krea-2-medium-turbo`
- `sourceful/riverflow-v2.5-fast`

Generate chapter images:

```bash
OPENROUTER_API_KEY=... python3 scripts/generate_openrouter_images.py --fallbacks
```

The site uses generated images when files exist and keeps the SVG scenes as fallback.
