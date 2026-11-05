// Suche und "ohne ..."-Filter für /allergene. Ohne JavaScript bleibt die vollständige Liste sichtbar.
(function () {
  var root = document.documentElement;
  root.classList.add('js');

  var suche = document.getElementById('suche');
  var chips = Array.prototype.slice.call(document.querySelectorAll('.chip'));
  var eintraege = Array.prototype.slice.call(document.querySelectorAll('.eintrag'));
  var kategorien = Array.prototype.slice.call(document.querySelectorAll('.agkat'));
  var status = document.getElementById('treffer');
  var leer = document.getElementById('leer');
  var zuruecksetzen = document.getElementById('zuruecksetzen');
  if (!suche || !status) return;

  function normal(text) {
    return text.toLowerCase()
      .replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/ß/g, 'ss')
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, ' ').trim();
  }

  eintraege.forEach(function (el) {
    el._name = normal(el.getAttribute('data-name'));
    el._nr = el.getAttribute('data-nr') || '';
  });

  function aktualisieren() {
    var begriff = normal(suche.value);
    var ohne = chips.filter(function (c) { return c.getAttribute('aria-pressed') === 'true'; })
      .map(function (c) { return c.getAttribute('data-allergen'); });
    var sichtbar = 0;

    eintraege.forEach(function (el) {
      var allergene = (el.getAttribute('data-allergene') || '').split(' ');
      // Zahlen suchen nach der Gerichtsnummer: "40" findet 401 bis 406
      var treffer = /^\d+$/.test(begriff) ? el._nr.indexOf(begriff) === 0 : el._name.indexOf(begriff) !== -1;
      var passt = (!begriff || treffer) &&
        !ohne.some(function (a) { return allergene.indexOf(a) !== -1; });
      el.hidden = !passt;
      if (passt) sichtbar++;
    });

    kategorien.forEach(function (kat) {
      kat.hidden = !kat.querySelector('.eintrag:not([hidden])');
    });

    status.textContent = sichtbar + ' von ' + eintraege.length + ' Gerichten und Getränken';
    leer.hidden = sichtbar !== 0;
    zuruecksetzen.hidden = !begriff && !ohne.length;
  }

  suche.addEventListener('input', aktualisieren);
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chip.setAttribute('aria-pressed', chip.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
      aktualisieren();
    });
  });
  zuruecksetzen.addEventListener('click', function () {
    suche.value = '';
    chips.forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
    aktualisieren();
    suche.focus();
  });

  aktualisieren();
})();
