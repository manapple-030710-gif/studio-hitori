/* One exhibition: { id, title, year, status: 'current' | 'past' | 'archive',
 * dates: '2026.10 — 2026.11', description, url: null, workIds: [] }.
 * Set status explicitly when a show opens or closes; no invented exhibitions.
 */
const studioExhibitions = [];

/* Historical editions / documentation, independent of active work links.
 * { title, year, series: 'ROOMS', exhibitionId: null, url: null }
 */
const studioArchiveEntries = [];
