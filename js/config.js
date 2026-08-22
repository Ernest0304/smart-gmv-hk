/* Smart GMV HK frontend config.
   apiBase: the HK extraction/records backend (own Railway service — NEVER the
   Singapore one). A `?api=http://localhost:<port>` URL parameter overrides it
   for local development ONLY (non-localhost overrides are ignored so a crafted
   link cannot redirect staff data). */
const CONFIG = (() => {
  const params = new URLSearchParams(location.search);
  const qp = params.get('api');
  const local = qp && /^https?:\/\/localhost(:\d+)?$/.test(qp) ? qp : null;
  /* demo=1: every network call is answered by js/demo.js with canned invented
     data and roster taps log straight in — no backend, no sheet, no PIN. */
  // TODO deploy: replace with the HK Railway URL once the service exists.
  return { apiBase: local || 'https://smart-gmv-hk-server.invalid',
           demo: params.get('demo') === '1' };
})();
