/* Smart GMV HK frontend config.
   apiBase: the HK extraction/records backend (own Railway service — NEVER the
   Singapore one). A `?api=http://localhost:<port>` URL parameter overrides it
   for local development ONLY (non-localhost overrides are ignored so a crafted
   link cannot redirect staff data). */
const CONFIG = (() => {
  const params = new URLSearchParams(location.search);
  const qp = params.get('api');
  /* Any loopback spelling, but the scheme is required: 127.0.0.1:8092 without
     http:// used to be rejected SILENTLY and the page ran against production —
     a developer typed a test PIN into the live system that way (SG, 1 Sep).
     The rejection is exposed so boot can say so on screen. */
  const local = qp && /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/.test(qp) ? qp : null;
  /* demo=1: every network call is answered by js/demo.js with canned invented
     data and roster taps log straight in — no backend, no sheet, no PIN. */
  return { apiBase: local || 'https://smart-gmv-hk-production.up.railway.app',
           apiOverrideRejected: qp && !local ? qp : null,
           demo: params.get('demo') === '1' };
})();
