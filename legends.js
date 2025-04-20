const legends = [
  {
    name: "Jacek Bayer",
    position: "Napastnik",
    years: "1982-1989",
    photo: "https://ocdn.eu/sport-images-transforms/1/gXEk9lBaHR0cHM6Ly9vY2RuLmV1L3B1bHNjbXMvTURBXy9hYTI1YjYyODBmMmFmNTI2NzYxMjY5OTBjZThkMzM1OS5qcGeTlQMAzQFFzQZwzQOflQLNA7AAwsOTCaZlMzk0N2UG3gACoTAGoTEB/jacek-bayer.avif",
    description: "Kapitan drużyny,główny zawodnik awansu do ekstraklasy ",
    highlights: "Trzykrotny król strzelców"
  },
  {
    name: "Tomasz Frankowski",
    position: "Napastnik",
    years: "1990-1993, 2009-2013",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Tomasz_Frankowski_2010.jpg/330px-Tomasz_Frankowski_2010.jpg",
    description: "Najskuteczniejszy napastnik w historii polskiej Ekstraklasy.",
    highlights: "102 gole w Ekstraklasie, król strzelców ligi"
  },
  {
    name: "Dariusz Czykier",
    position: "Pomocnik",
    years: "1982-1989, 1994-1996, 1999-2000, 2001-2002",
    photo: "https://d-art.ppstatic.pl/kadry/k/r/1/30/a4/55c455491f043_o_medium.jpg",
    description: "Filar pomocy przez dekadę, symbol wierności klubowi.",
    highlights: "Ponad 250 meczów, lider XX wieku"
  },
  {
    name: "Rafał Grzyb",
    position: "Pomocnik",
    years: "2010-2018",
    photo: "https://img.a.transfermarkt.technology/portrait/big/54648-1448283278.jpg?lm=1",
    description: "Kluczowy zawodnik w największych sukcesach klubu.",
    highlights: "Zdobywca Pucharu Polski 2010, kapitan drużyny"
  },
  {
    name: "Hermes",
    position: "Pomocnik",
    years: "2008–2012",
    photo: "https://img.a.transfermarkt.technology/portrait/header/s_32267_7153_2013_09_10_1.jpg?lm=1",
    description: "Brazylijski motor napędowy środka pola.",
    highlights: "Zwycięstwo w Pucharze Polski i Superpucharze"
  },
  {
    name: "Michał Probierz",
    position: "Trener",
    years: "2008–2011, 2014–2017",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Probierz_%28cropped%29.jpg/330px-Probierz_%28cropped%29.jpg",
    description: "Architekt największych sukcesów Jagiellonii jako trener.",
    highlights: "Zdobycie Pucharu Polski i Superpucharu, wicemistrzostwo"
  },
  {
    name: "Marian Kelemen",
    position: "Bramkarz",
    years: "2016–2019",
    photo: "https://img.a.transfermarkt.technology/portrait/header/s_6114_759_2013_09_09_1.jpg?lm=1",
    description: "Doświadczony bramkarz, kluczowy w walce o mistrzostwo.",
    highlights: "Najlepszy sezon Jagiellonii w historii – 2. miejsce w 2017"
  },
  {
    name: "Fedor Černych",
    position: "Napastnik",
    years: "2015–2018, 2020–2023",
    photo: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Fiodor_Cernych_2014.jpg",
    description: "Wszechstronny napastnik i reprezentant Litwy.",
    highlights: "Bramki w europejskich pucharach, lider ofensywy"
  },
  {
    name: "Andrius Škerla",
    position: "Obrońca",
    years: "2008–2011",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Andrius_Skerla_2011.jpg/330px-Andrius_Skerla_2011.jpg",
    description: "Solidny litewski stoper, ważne ogniwo defensywy.",
    highlights: "Stabilizacja linii obrony w europejskich rozgrywkach"
  }
];

function displayLegends() {
  const legendsList = document.getElementById('legendsList');

  legends.forEach(legend => {
    const card = document.createElement('div');
    card.className = 'card legend-card';
    card.innerHTML = `
      <img src="${legend.photo}" alt="${legend.name}">
      <h3>${legend.name}</h3>
      <p><strong>Pozycja:</strong> ${legend.position}</p>
      <p><strong>Lata w klubie:</strong> ${legend.years}</p>
      <p class="legend-description">${legend.description}</p>
      <div class="highlights">
        <strong>Najważniejsze osiągnięcia:</strong>
        <p>${legend.highlights}</p>
      </div>
    `;
    legendsList.appendChild(card);
  });
}

displayLegends();
