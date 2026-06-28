// Demo countdown timer for current class (ends at 10:25)
(function () {
  const endTime = new Date();
  endTime.setHours(10, 25, 0, 0);

  const countdownEl = document.getElementById('countdown');
  const syncEl = document.getElementById('sync-ago');

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function tick() {
    const now = new Date();
    const diff = endTime - now;

    if (countdownEl) {
      if (diff <= 0) {
        countdownEl.textContent = '00:00';
      } else {
        const mins = Math.floor(diff / 60000);
        const secs = Math.floor((diff % 60000) / 1000);
        countdownEl.textContent = pad(mins) + ':' + pad(secs);
      }
    }
  }

  let syncCounter = 12;
  setInterval(function () {
    tick();
    syncCounter = syncCounter >= 59 ? 5 : syncCounter + 1;
    if (syncEl) syncEl.textContent = syncCounter;
  }, 1000);

  tick();
})();
