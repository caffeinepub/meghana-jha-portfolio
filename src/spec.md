# Specification

## Summary
**Goal:** Add authentication and access control to the MediaGallery to prevent unauthorized users from uploading or deleting photos.

**Planned changes:**
- Require Internet Identity authentication for photo upload functionality in the frontend
- Require Internet Identity authentication for photo delete functionality in the frontend
- Add backend access control to the addPhoto function to reject anonymous callers
- Add backend access control to the deletePhoto function to reject anonymous callers
- Keep photo viewing publicly accessible without authentication

**User-visible outcome:** Visitors can view photos in the gallery without logging in, but only authenticated users (logged in via Internet Identity) can upload new photos or delete existing photos. Unauthenticated visitors will see a login prompt if they attempt to upload or delete.
