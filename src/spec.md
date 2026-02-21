# Specification

## Summary
**Goal:** Fix the certificate display issue in the MediaGallery component so that uploaded certificates render correctly in the certificates tab.

**Planned changes:**
- Debug certificate data fetching and blob URL generation in the frontend hooks
- Verify useCertificates and useCertificate hooks handle blob data correctly using the same pattern as photo hooks
- Fix MediaGallery certificates tab rendering to display certificate images in the grid
- Ensure backend getAllCertificates and getCertificate methods return data in the same format as photo methods

**User-visible outcome:** Users can view their uploaded certificates in the MediaGallery's certificates tab, displayed in a grid with titles and dates, and can click to open them in a modal viewer.
