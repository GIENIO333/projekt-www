// State Manager - spójny interfejs do zarządzania danymi
const StateManager = {
  set: (key, value, persistent = true) => {
    try {
      const storage = persistent ? localStorage : sessionStorage;
      storage.setItem(`jagiellonia_${key}`, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Error saving state:', e);
      return false;
    }
  },

  get: (key, persistent = true) => {
    try {
      const storage = persistent ? localStorage : sessionStorage;
      const value = storage.getItem(`jagiellonia_${key}`);
      return value ? JSON.parse(value) : null;
    } catch (e) {
      console.error('Error loading state:', e);
      return null;
    }
  },

  remove: (key, persistent = true) => {
    const storage = persistent ? localStorage : sessionStorage;
    storage.removeItem(`jagiellonia_${key}`);
  },

  clearAll: (persistent = true) => {
    const storage = persistent ? localStorage : sessionStorage;
    Object.keys(storage).forEach(key => {
      if (key.startsWith('jagiellonia_')) {
        storage.removeItem(key);
      }
    });
  },

  safeSet: (key, value, schema = null, persistent = true) => {
    // Walidacja zgodnie ze schematem
    if (schema && !StateManager.validateAgainstSchema(value, schema)) {
      console.error('Invalid data format for key:', key);
      return false;
    }

    // Czyszczenie danych
    const cleanedValue = StateManager.cleanData(value);
    return StateManager.set(key, cleanedValue, persistent);
  },

  validateAgainstSchema: (data, schema) => {
    if (typeof schema === 'object' && schema !== null) {
      return Object.keys(schema).every(k => {
        return typeof data[k] === schema[k];
      });
    }
    return true;
  },

  cleanData: (data) => {
    if (typeof data === 'string') {
      return data.replace(/<[^>]*>/g, ''); // Usuń tagi HTML
    } else if (Array.isArray(data)) {
      return data.map(item => StateManager.cleanData(item));
    } else if (typeof data === 'object' && data !== null) {
      return Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, StateManager.cleanData(value)])
      );
    }
    return data;
  }
};
const players = [
    {
        name: "Maksymilian Stryjek",
        position: "Bramkarz",
        number: 1,
        wiek: 28,
        photo: "https://img.a.transfermarkt.technology/portrait/medium/240457-1624629884.jpg?lm=1",
        wzrost: "1,88 m",
        kluby: "Wycombe Wand.",
        narodowosc: "Polska, Anglia",
        wartosc: 0.35
    },
       {
    name: "Sławomir Abramowicz",
    position: "Bramkarz",
    number: 50,
    wiek: 20,
    photo: "https://img.a.transfermarkt.technology/portrait/medium/805834-1718374699.jpg?lm=1",
    wzrost: "1,89 m",
    kluby: "Polonia Warszawa",
    narodowosc: "Polska",
    wartosc: 4
},
      {
        name: "Joao Moutinho",
        position: "Lewy obrońca",
        number: 44,
        wiek:27,
        photo: "https://img.a.transfermarkt.technology/portrait/medium/461906-1675245011.jpg?lm=1",
        wzrost: "1,83 m",
        kluby: "Spezia Calzio",
        narodowosc: "Portugalia",
        wartosc: 1.5,
      },
      {
        name: "Cezary Polak",
        position: "Lewy obrońca, Prawy obrońca",
        number: 5,
        wiek:21,
        photo: "https://img.a.transfermarkt.technology/portrait/medium/705826-1698869857.png?lm=1",
        wzrost: "1,85 m",
        kluby: "Kotwica Kołobrzeg",
        narodowosc: "Polska",
        wartosc: 0.4,
      },
      {
        name: "Michal Sacek",
        position: "Prawy obrońca",
        number: 16,
        wiek:28,
        photo: "https://img.a.transfermarkt.technology/portrait/medium/430054-1718375936.jpg?lm=1",
        wzrost: "1,8 m",
        kluby: "Sparta Praga",
        narodowosc: "Czechy",
        wartosc: 1.5,
      },
      {
        name: "Norbert Wojtuszek",
        position: "Prawy obrońca",
        number: 15,
        wiek:23,
        photo: "https://img.a.transfermarkt.technology/portrait/medium/607435-1670769138.png?lm=1",
        wzrost: "1,84 m",
        kluby: "Górnik Zabrze",
        narodowosc: "Polska",
        wartosc: 0.6,
      },
      {
        name: "Tomas Silva",
        position: "Prawy obrońca, Ofensywny pomocnik",
        number: 82,
        wiek:25,
        photo: "https://img.a.transfermarkt.technology/portrait/medium/461939-1571745944.jpg?lm=1",
        wzrost: "1,72 m",
        kluby: "Vizela",
        narodowosc: "Portugalia",
        wartosc: 0.5,
      },
      {
        name: "Mateusz Skrzypczak",
        position: "Środkowy obrońca",
        number: 72,
        wiek:24,
        photo: "https://img.a.transfermarkt.technology/portrait/medium/345454-1718375896.jpg?lm=1",
        wzrost: "1,89 m",
        kluby: "Lech Poznań",
        narodowosc: "Polska",
        wartosc: 2.5,
      },
      {
        name: "Enzo Ebosse",
        position: "Środkowy obrońca",
        number: 23,
        wiek:26,
        photo: "https://img.a.transfermarkt.technology/portrait/medium/342877-1659337327.jpg?lm=1",
        wzrost: "1,85 m",
        kluby: "Udinesse",
        narodowosc: "Kamerun",
        wartosc: 2,
      },
      {
        name: "Adrian Dieguez",
        position: "Środkowy obrońca",
        number: 17,
        wiek:29,
        photo: "https://img.a.transfermarkt.technology/portrait/medium/355335-1718375974.jpg?lm=1",
        wzrost: "1,88 m",
        kluby: "Ponferradina",
        narodowosc: "Hiszpania",
        wartosc: 1,
      },
      {
        name: "Dusan Stojinovic",
        position: "Środkowy obrońca, Prawy obrońca",
        number: 3,
        wiek:24,
        photo: "https://img.a.transfermarkt.technology/portrait/medium/469688-1718376175.jpg?lm=1",
        wzrost: "1,87 m",
        kluby: "NK Celje",
        narodowosc: "Słowenia",
        wartosc: 0.7,
      },
    {
      name: "Jesús Imaz",
      position: "Pomocnik ofensywny, Napastnik",
      number: 11,
      wiek:34,
      photo: "https://img.a.transfermarkt.technology/portrait/medium/176423-1718376545.jpg?lm=1",
      wzrost: "1,74 m",
      kluby: "Wisła Kraków",
      narodowosc: "Hiszpania",
      wartosc: 0.5,
    },
    {
      name: "Taras Romanczuk",
      position: "Pomocnik Defensywny",
      number: 6,
      wiek:33,
      photo: "https://img.a.transfermarkt.technology/portrait/medium/280939-1718376604.jpg?lm=1",
      wzrost: "1,86 m",
      kluby: "Legionovia",
      narodowosc: "Ukraina, Polska",
      wartosc: 0.4,
    },
    {
        name: "Leon Flach",
        position: "Pomocnik Defensywny",
        number: 31,
        wiek:24,
        photo: "https://img.a.transfermarkt.technology/portrait/medium/391929-1711203907.jpg?lm=1",
        wzrost: "1,83 m",
        kluby: "Philadelphia",
        narodowosc: "Usa, Niemcy",
        wartosc: 3,
      },
      {
        name: "Jarosław Kubicki",
        position: "Pomocnik Defensywny, Ofensywny pomocnik",
        number: 14,
        wiek:29,
        photo: "https://img.a.transfermarkt.technology/portrait/medium/327756-1718376497.jpg?lm=1",
        wzrost: "1,80 m",
        kluby: "Lechia Gdańsk",
        narodowosc: "Polska",
        wartosc: 0.7,
      },
      {
        name: "Oskar Pietuszewski",
        position: "Skrzydłowy, Ofensywny pomocnik",
        number: 80,
        wiek:16,
        photo: "https://img.a.transfermarkt.technology/portrait/medium/1162012-1739794410.jpg?lm=1",
        wzrost: "1,79 m",
        kluby: " Jagiellonia Białystok U19",
        narodowosc: "Polska",
        wartosc: 1,
      },
      {
        name: "Darko Churlinov",
        position: "Skrzydłowy",
        number: 21,
        wiek:24,
        photo: "https://img.a.transfermarkt.technology/portrait/medium/386786-1657182282.jpg?lm=1",
        wzrost: "1,80 m",
        kluby: "FC Burnley ",
        narodowosc: "Macedonia Północna",
        wartosc: 1.5,
      },
      {
        name: "Krisoffer Hansen",
        position: "Skrzydłowy",
        number: 99,
        wiek:30,
        photo: "https://img.a.transfermarkt.technology/portrait/medium/180215-1718376997.jpg?lm=1",
        wzrost: "1,8 m",
        kluby: " Widzew Łódź",
        narodowosc: "Norwegia",
        wartosc: 0.7,
      },
      {
        name: "Miki Villar",
        position: "Skrzydłowy",
        number: 20,
        wiek:28,
        photo: "https://img.a.transfermarkt.technology/portrait/medium/382970-1676231942.png?lm=1",
        wzrost: "1,73",
        kluby: " Wisła Kraków",
        narodowosc: "Hiszpania",
        wartosc: 0.55,
      },
      {
        name: "Edi Semedo",
        position: "Skrzydłowy",
        number: 7,
        wiek:25,
        photo: "https://img.a.transfermarkt.technology/portrait/medium/504107-1732988873.png?lm=1",
        wzrost: "1,81 m",
        kluby: "Aris Limassol",
        narodowosc: "Republika Zielonego Przylądka, Portugalia",
        wartosc: 0.4,
      },
    {
      name: "Afimico Pululu",
      position: "Napastnik",
      number: 10,
      wiek:26,
      photo: "https://img.a.transfermarkt.technology/portrait/medium/410649-1718376843.jpg?lm=1",
      wzrost: "1,75 m",
      kluby: "Greuther Furth",
      narodowosc: "Angola, Francja",
      wartosc: 5,
    },

  ];
  // Inicjalizacja po załadowaniu DOM
document.addEventListener('DOMContentLoaded', function() {
  initializeTheme();
  restoreSearchState();
  restoreFormState();
  trackPageVisit();
  displayPlayers();
  setupEventListeners();
});

// Funkcje tematyczne
function initializeTheme() {
  const savedTheme = StateManager.get('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  
  applyTheme(theme);
  
  if (!savedTheme) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      applyTheme(e.matches ? 'dark' : 'light');
    });
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  StateManager.safeSet('theme', theme);
  updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

// Funkcje wyszukiwania i sortowania
function restoreSearchState() {
  const state = StateManager.get('players_filter');
  if (state) {
    document.getElementById('search').value = state.searchTerm || '';
    document.getElementById('sort-by').value = state.sortBy || 'name-asc';
    filterPlayers();
  }
}

function saveSearchState() {
  const state = {
    searchTerm: document.getElementById('search').value,
    sortBy: document.getElementById('sort-by').value
  };
  StateManager.safeSet('players_filter', state);
}

const positionOrder = {
  'Bramkarz': 1,
  'Prawy obrońca': 2,
  'Lewy obrońca': 4,
  'Środkowy obrońca': 3,
  'Pomocnik Defensywny': 5,
  'Pomocnik ofensywny': 6,
  'Skrzydłowy': 7,
  'Napastnik': 8
};

function getPositionRank(position) {
  const found = Object.entries(positionOrder).find(([key]) => 
    position.includes(key)
  );
  return found ? found[1] : 9;
}

function filterPlayers() {
  const searchTerm = document.getElementById('search').value.toLowerCase();
  currentPlayers = preparedPlayers.filter(p => 
    p.name.toLowerCase().includes(searchTerm) ||
    p.position.toLowerCase().includes(searchTerm) ||
    (p.narodowosc && p.narodowosc.toLowerCase().includes(searchTerm)) ||
    (p.kluby && p.kluby.toLowerCase().includes(searchTerm))
  );
  displayPlayers();
}

function displayPlayers() {
  const playerList = document.getElementById("playerList");
  if (!playerList) return;
  
  playerList.innerHTML = "";
  
  const sortValue = document.getElementById('sort-by').value;
  const sortedPlayers = [...currentPlayers].sort((a, b) => {
    switch(sortValue) {
      case 'name-asc': return a.name.localeCompare(b.name);
      case 'name-desc': return b.name.localeCompare(a.name);
      case 'position':
        const rankA = getPositionRank(a.position);
        const rankB = getPositionRank(b.position);
        return rankA === rankB ? a.position.localeCompare(b.position) : rankA - rankB;
      case 'age-asc': return a.wiek - b.wiek;
      case 'age-desc': return b.wiek - a.wiek;
      case 'value-desc': return b.wartosc - a.wartosc;
      case 'value-asc': return a.wartosc - b.wartosc;
      default: return 0;
    }
  });

  sortedPlayers.forEach(player => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${player.photo}" alt="${player.name}" onerror="this.src='https://via.placeholder.com/100'">
      <h3>${player.name}</h3>
      <p><strong>Pozycja:</strong> ${player.position}</p>
      <p><strong>Numer:</strong> ${player.number}</p>
      <p>📏 <strong>Wzrost:</strong> ${player.wzrost}</p>
      <p>💰 <strong>Wartość:</strong> ${player.wartosc.toFixed(2)} mln €</p>
      <p>🎂 <strong>Wiek:</strong> ${player.wiek} lat</p>
      <p>🌍 <strong>Narodowość:</strong> ${player.narodowosc}</p>
      <p>🏟️ <strong>Poprzedni klub:</strong> ${player.kluby}</p>
    `;
    playerList.appendChild(card);
  });
}

// Funkcje formularza
function restoreFormState() {
  const formData = StateManager.get('form_data', false); // sessionStorage
  if (formData) {
    document.getElementById('playerName').value = formData.playerName || '';
    document.getElementById('reason').value = formData.reason || '';
    document.getElementById('favoriteMoment').value = formData.favoriteMoment || '';
    document.getElementById('email').value = formData.email || '';
  }
}

function saveFormState() {
  const formData = {
    playerName: document.getElementById('playerName').value,
    reason: document.getElementById('reason').value,
    favoriteMoment: document.getElementById('favoriteMoment').value,
    email: document.getElementById('email').value
  };
  StateManager.safeSet('form_data', formData, false); // sessionStorage
}

function validateName() {
  const nameInput = document.getElementById('playerName');
  const errorElement = document.getElementById('nameError');
  const value = nameInput.value.trim();
  
  if (!value) {
    showValidationError(errorElement, 'To pole jest wymagane');
    return false;
  } else if (value.length < 3) {
    showValidationError(errorElement, 'Nazwa musi mieć co najmniej 3 znaki');
    return false;
  } else if (!/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-]+$/.test(value)) {
    showValidationError(errorElement, 'Nazwa może zawierać tylko litery, spacje i myślniki');
    return false;
  } else {
    hideValidationError(errorElement);
    return true;
  }
}

function validateReason() {
  const reasonInput = document.getElementById('reason');
  const errorElement = document.getElementById('reasonError');
  const value = reasonInput.value.trim();
  
  if (!value) {
    showValidationError(errorElement, 'Prosimy podać powód wyboru');
    return false;
  } else if (value.length < 10) {
    showValidationError(errorElement, 'Opis musi mieć co najmniej 10 znaków');
    return false;
  } else {
    hideValidationError(errorElement);
    return true;
  }
}

function validateEmail() {
  const emailInput = document.getElementById('email');
  const errorElement = document.getElementById('emailError');
  const value = emailInput.value.trim();
  
  if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    showValidationError(errorElement, 'Proszę podać poprawny adres email');
    return false;
  } else {
    hideValidationError(errorElement);
    return true;
  }
}

function showValidationError(element, message) {
  if (!element) return;
  element.textContent = message;
  element.style.display = 'block';
  element.style.animation = 'fadeIn 0.3s ease-in';
}

function hideValidationError(element) {
  if (!element) return;
  element.style.display = 'none';
}

// Historia nawigacji
function trackPageVisit() {
  const history = StateManager.get('nav_history', false) || [];
  const page = {
    url: window.location.pathname,
    title: document.title,
    timestamp: new Date().toISOString()
  };
  
  history.unshift(page);
  if (history.length > 10) history.pop();
  
  StateManager.safeSet('nav_history', history, false);
}

// Obsługa formularza
function setupEventListeners() {
  // Formularz
  const formFields = ['playerName', 'reason', 'favoriteMoment', 'email'];
  formFields.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field) {
      field.addEventListener('input', debounce(saveFormState, 500));
    }
  });

  // Wyszukiwanie
  document.getElementById('search')?.addEventListener('input', debounce(() => {
    filterPlayers();
    saveSearchState();
  }, 300));

  document.getElementById('sort-by')?.addEventListener('change', () => {
    displayPlayers();
    saveSearchState();
  });

  // Przycisk motywu
  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  });

  // Formularz submit
  document.getElementById('playerForm')?.addEventListener('submit', handleFormSubmit);
}

async function handleFormSubmit(e) {
  e.preventDefault();
  hideErrorMessages();
  
  const isNameValid = validateName();
  const isReasonValid = validateReason();
  const isEmailValid = validateEmail();
  
  if (!isNameValid || !isReasonValid || !isEmailValid) return;

  const formData = {
    playerName: document.getElementById('playerName').value.trim(),
    reason: document.getElementById('reason').value.trim(),
    favoriteMoment: document.getElementById('favoriteMoment').value.trim(),
    email: document.getElementById('email').value.trim(),
    timestamp: new Date().toISOString()
  };

  // Zapisz lokalnie
  saveFavoritePlayer(formData);
  showLoader();

  try {
    const res = await fetchWithTimeout("http://localhost:3000/ulubieniPilkarze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    }, 5000);

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const json = await res.json();
    showSuccessMessage(json);
    StateManager.remove('form_data', false); // Wyczyść sessionStorage
  } catch (err) {
    handleFormError(err);
  } finally {
    hideLoader();
  }
}

function saveFavoritePlayer(playerData) {
  const favorites = StateManager.get('favorite_players') || [];
  const existingIndex = favorites.findIndex(p => 
    p.playerName === playerData.playerName && p.email === playerData.email
  );
  
  if (existingIndex >= 0) {
    favorites[existingIndex] = playerData;
  } else {
    favorites.push(playerData);
  }
  
  StateManager.safeSet('favorite_players', favorites);
}

async function fetchWithTimeout(resource, options = {}, timeout = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal
  });
  
  clearTimeout(id);
  return response;
}

function handleFormError(err) {
  let errorMessage = "Wystąpił błąd podczas wysyłania formularza";
  
  if (err.name === 'AbortError') {
    errorMessage = "Przekroczono czas oczekiwania na odpowiedź serwera";
  } else if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
    errorMessage = "Brak połączenia z serwerem. Twoje dane zostały zapisane lokalnie.";
  } else {
    errorMessage = `Wystąpił błąd: ${err.message}`;
  }
  
  showErrorMessage(errorMessage);
  console.error("Błąd formularza:", err);
}

function showLoader() {
  const submitBtn = document.querySelector('.btn-submit');
  if (!submitBtn) return;
  
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="loader"></span> Wysyłanie...';
}

function hideLoader() {
  const submitBtn = document.querySelector('.btn-submit');
  if (!submitBtn) return;
  
  submitBtn.disabled = false;
  submitBtn.textContent = 'Wyślij odpowiedź';
}

function showSuccessMessage(data) {
  const form = document.getElementById("playerForm");
  const successMessage = document.getElementById("successMessage");
  
  if (!form || !successMessage) return;
  
  form.style.display = "none";
  successMessage.style.display = "block";
  
  let responseHTML = `
    <p><strong>Twój ulubiony piłkarz:</strong> ${data.playerName || 'Nie podano'}</p>
    <p><strong>Powód wyboru:</strong> ${data.reason || 'Nie podano'}</p>
  `;
  
  if (data.favoriteMoment) {
    responseHTML += `<p><strong>Ulubiony moment:</strong> ${data.favoriteMoment}</p>`;
  }
  
  if (data.email) {
    responseHTML += `<p>Potwierdzenie zostanie wysłane na: ${data.email}</p>`;
  }
  
  document.getElementById("responseDetails").innerHTML = responseHTML;
  successMessage.scrollIntoView({ behavior: 'smooth' });
}

function showErrorMessage(message) {
  const errorElement = document.createElement('div');
  errorElement.className = 'error-message server-error';
  errorElement.textContent = message;
  
  const form = document.getElementById("playerForm");
  if (form) {
    form.insertBefore(errorElement, form.firstChild);
    setTimeout(() => errorElement.remove(), 5000);
  }
}

function hideErrorMessages() {
  document.querySelectorAll('.error-message').forEach(el => {
    el.style.display = 'none';
  });
}

// Funkcje pomocnicze
function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

// Przygotowanie danych piłkarzy
const preparedPlayers = players.map(player => ({
  ...player,
  wartosc: parseFloat(player.wartosc.toString().replace(',', '.'))
}));

let currentPlayers = [...preparedPlayers];
