# Fix Car Images Not Displaying on Vercel

## Plan Steps:
- [x] Move `src/data/inventory.json` → `public/data/inventory.json` (data now served at `/data/inventory.json` in prod)
- [x] Update `FeaturedVehicles.tsx`: `fetch('/src/data/inventory.json')` → `fetch('/data/inventory.json')`
- [ ] Git commit & push: `git add . && git rm src/data/inventory.json && git commit -m "Fix inventory fetch for Vercel: move to public/data + update path" && git push` (triggers Vercel rebuild)
- [ ] Test prod: Visit Vercel URL, check Network tab (fetch `/data/inventory.json` 200, images load), Console (no fetch errors)
- [ ] Local verify: `npm run build && npm run preview` → visit http://localhost:4173, confirm cars/images show

## Next:
Run the git command above to deploy the fix to Vercel.
