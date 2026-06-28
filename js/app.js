// Demo: live countdown + progress bar for current class (09:45 – 10:25)
(function () {
  const startTime = new Date();
  startTime.setHours(9, 45, 0, 0);

  const endTime = new Date();
  endTime.setHours(10, 25, 0, 0);

  const totalMs = endTime - startTime;

  const countdownEl = document.getElementById('countdown');
  const timeLeftEl = document.getElementById('time-left');
  const minsLeftEl = document.getElementById('mins-left');
  const progressEl = document.getElementById('progress-fill');
  const syncEl = document.getElementById('sync-ago');

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function tick() {
    const now = new Date();
    const remaining = endTime - now;
    const elapsed = now - startTime;

    if (remaining <= 0) {
      if (countdownEl) countdownEl.textContent = '00:00';
      if (timeLeftEl) timeLeftEl.textContent = '00:00';
      if (minsLeftEl) minsLeftEl.textContent = '0';
      if (progressEl) progressEl.style.width = '100%';
      return;
    }

    const mins = Math.floor(remaining / 60000);
    const secs = Math.floor((remaining % 60000) / 1000);
    const pct = Math.min(100, Math.max(0, (elapsed / totalMs) * 100));

    if (countdownEl) countdownEl.textContent = pad(mins) + ':' + pad(secs);
    if (timeLeftEl) timeLeftEl.textContent = pad(mins) + ':' + pad(secs);
    if (minsLeftEl) minsLeftEl.textContent = String(mins);
    if (progressEl) progressEl.style.width = pct.toFixed(1) + '%';
  }

  let syncCounter = 12;
  setInterval(function () {
    tick();
    syncCounter = syncCounter >= 59 ? 5 : syncCounter + 1;
    if (syncEl) syncEl.textContent = syncCounter;
  }, 1000);

  tick();
})();
