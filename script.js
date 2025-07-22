document.addEventListener('DOMContentLoaded', () => {
  const daySelect = document.getElementById('day');
  const monthSelect = document.getElementById('month');
  const yearSelect = document.getElementById('year');
  const form = document.getElementById('dob-form');
  const error = document.getElementById('error-message');

  // 1. URL-Parameter prüfen
  const encodedData = window.location.pathname.split('/').pop();
  let decodedData = "";
  try {
    decodedData = new TextDecoder().decode(Uint8Array.from(atob(encodedData), c => c.charCodeAt(0)));
  } catch (err) {
    window.location.href = "/frage1";
    return;
  }

  if (!decodedData.startsWith("**Name:**")) {
    window.location.href = "/frage1";
    return;
  }

  // 2. Dropdowns füllen
  for (let d = 1; d <= 31; d++) {
    const option = document.createElement('option');
    option.value = d;
    option.textContent = d.toString().padStart(2, '0');
    daySelect.appendChild(option);
  }

  const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
  months.forEach((month, index) => {
    const option = document.createElement('option');
    option.value = (index + 1).toString().padStart(2, '0');
    option.textContent = month;
    monthSelect.appendChild(option);
  });

  const currentYear = new Date().getFullYear();
  for (let y = currentYear; y >= 1900; y--) {
    const option = document.createElement('option');
    option.value = y;
    option.textContent = y;
    yearSelect.appendChild(option);
  }

  // 3. Formular-Handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const day = daySelect.value;
    const month = monthSelect.value;
    const year = yearSelect.value;

    if (!day || !month || !year) {
      error.textContent = "Bitte wähle ein gültiges Geburtsdatum.";
      return;
    }

    error.textContent = "";

    const birthdate = `${day}.${month}.${year}`;
    const combinedText = `${decodedData}\n**Geburtsdatum:** ${birthdate}`;
    const encodedNext = btoa(String.fromCharCode(...new TextEncoder().encode(combinedText)));

    window.location.href = `/frage3/${encodedNext}`;
  });
});
