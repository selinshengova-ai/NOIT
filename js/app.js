// Demo timers — uses fixed demo time (10:07) so countdown always works for jury preview
(function () {
  const pageLoad = Date.now();

  // Demo "now" = 10:07:00 (during 3rd period Math 09:45–10:25)
  const demoBase = new Date();
  demoBase.setHours(10, 7, 0, 0);

  const classStart = new Date(demoBase);
  classStart.setHours(9, 45, 0, 0);

  const classEnd = new Date(demoBase);
  classEnd.setHours(10, 25, 0, 0);

  const dayEnd = new Date(demoBase);
  dayEnd.setHours(13, 45, 0, 0);

  const classTotalMs = classEnd - classStart;

  const countdownEl = document.getElementById('countdown');
  const dayEndEl = document.getElementById('day-end-left');
  const minsLeftEl = document.getElementById('mins-left');
  const progressEl = document.getElementById('progress-fill');
  const progressPctEl = document.getElementById('progress-pct');
  const syncEl = document.getElementById('sync-ago');

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function getDemoNow() {
    return new Date(demoBase.getTime() + (Date.now() - pageLoad));
  }

  function formatDayRemaining(ms) {
    if (ms <= 0) return '0м';
    const totalMin = Math.floor(ms / 60000);
    const h = Math.floor(totalMin / 60);
    const m = totalMin % 60;
    if (h > 0) return h + 'ч ' + m + 'м';
    return m + 'м';
  }

  function tick() {
    const now = getDemoNow();
    const classRemaining = classEnd - now;
    const dayRemaining = dayEnd - now;
    const classElapsed = now - classStart;

    if (classRemaining > 0) {
      const mins = Math.floor(classRemaining / 60000);
      const secs = Math.floor((classRemaining % 60000) / 1000);
      const pct = Math.min(100, Math.max(0, (classElapsed / classTotalMs) * 100));

      if (countdownEl) countdownEl.textContent = pad(mins) + ':' + pad(secs);
      if (minsLeftEl) minsLeftEl.textContent = String(Math.max(1, mins));
      if (progressEl) progressEl.style.width = pct.toFixed(0) + '%';
      if (progressPctEl) progressPctEl.textContent = Math.round(pct);
    } else {
      if (countdownEl) countdownEl.textContent = '00:00';
      if (minsLeftEl) minsLeftEl.textContent = '0';
      if (progressEl) progressEl.style.width = '100%';
      if (progressPctEl) progressPctEl.textContent = '100';
    }

    if (dayEndEl) dayEndEl.textContent = formatDayRemaining(dayRemaining);
  }

  let syncCounter = 12;
  setInterval(function () {
    tick();
    syncCounter = syncCounter >= 59 ? 5 : syncCounter + 1;
    if (syncEl) syncEl.textContent = syncCounter;
  }, 1000);

  tick();
})();
