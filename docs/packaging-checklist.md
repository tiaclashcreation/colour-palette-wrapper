# Chrome Web Store Packaging Checklist

## Manifest and permissions
- Confirm extension version is bumped in `manifest.json`.
- Keep permissions minimal (`storage`, `activeTab`, `scripting`).
- Keep host permissions limited to intended domains.

## Quality gates
- Run `npm test` and ensure all tests pass.
- Manual test on ASOS listing pages:
  - scan,
  - filtering,
  - clear highlights,
  - infinite scroll rescan.
- Verify graceful behavior on non-supported sites.

## Store listing assets
- Add icon assets (`16`, `32`, `48`, `128`).
- Prepare screenshots of popup + in-page badges.
- Write privacy details for local storage usage.

## Release hygiene
- Exclude local build artifacts and `node_modules`.
- Tag release with changelog notes.
- Smoke-test the exact uploaded zip in a fresh Chrome profile.
