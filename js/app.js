// SchoolPulse — demo live timer for the student "Днес" view.
// Uses a fixed demo time (10:07) so the "Сега" card always shows a class in progress.
(function () {
  var pageLoad = Date.now();
  var base = new Date(); base.setHours(10, 7, 0, 0);
  var start = new Date(base); start.setHours(9, 45, 0, 0);
  var end = new Date(base); end.setHours(10, 25, 0, 0);
  var dayEnd = new Date(base); dayEnd.setHours(13, 45, 0, 0);
  var total = end - start;

  var countdown = document.getElementById('countdown');
  var minsLeft = document.getElementById('mins-left');
  var pct = document.getElementById('progress-pct');
  var fill = document.getElementById('progress-fill');
  var dayLeft = document.getElementById('day-end-left');
  var sync = document.getElementById('sync-ago');

  function pad(n) { return String(n).padStart(2, '0'); }
  function now() { return new Date(base.getTime() + (Date.now() - pageLoad)); }

  function fmtDay(ms) {
    if (ms <= 0) return '0м';
    var m = Math.floor(ms / 60000), h = Math.floor(m / 60);
    return h > 0 ? h + 'ч ' + (m % 60) + 'м' : m + 'м';
  }

  function tick() {
    var n = now();
    var rem = end - n, el = n - start;
    if (rem > 0) {
      if (countdown) countdown.textContent = pad(Math.floor(rem / 60000)) + ':' + pad(Math.floor((rem % 60000) / 1000));
      if (minsLeft) minsLeft.textContent = Math.max(1, Math.floor(rem / 60000));
      var p = Math.min(100, Math.max(0, (el / total) * 100));
      if (fill) fill.style.width = p.toFixed(0) + '%';
      if (pct) pct.textContent = Math.round(p);
    }
    if (dayLeft) dayLeft.textContent = fmtDay(dayEnd - n);
  }

  var s = 12;
  setInterval(function () { tick(); s = s >= 59 ? 5 : s + 1; if (sync) sync.textContent = s; }, 1000);
  tick();
})();
