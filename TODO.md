## TODO
- [x] Inspect current `CarListing.tsx`, `AdminCarForm.tsx`, and `supabase.ts` for image/tag usage
- [ ] Update `src/components/CarListing.tsx`:
  - [x] Implement URL normalization + Supabase absolute URL handling
  - [x] Add `onError` fallback to `car.image` then `/placeholder.svg`
  - [x] Ensure badge uses `car.tag` with fallback to `car.tag_category`
- [x] Run dev/typecheck/build (if scripts exist) and verify images render



