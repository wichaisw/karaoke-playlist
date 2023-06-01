const wanwanSongs = [
  {
    title: "Song 1",
    link: "https://example.com/song1",
    lyrics: "Lyrics for Song 1",
  },
  {
    title: "Song 2",
    link: "https://example.com/song2",
    lyrics: "Lyrics for Song 2",
  },
  {
    title: "Song 3",
    link: "https://example.com/song3",
    lyrics: "Lyrics for Song 3",
  },
];

const mySongs = [
  {
    title: "MCR 1",
    link: "https://example.com/song1",
    lyrics: "Lyrics for Song 1",
  },
  {
    title: "Keane 1",
    link: "https://example.com/song1",
    lyrics: "Lyrics for Song 1",
  },
];

const cardsContainer = document.getElementById("cardsContainer");

function createCard(song) {
  const card = document.createElement("div");
  card.classList.add("card");

  const title = document.createElement("h2");
  title.textContent = song.title;

  const link = document.createElement("p");
  link.innerHTML = `Link: <a href="${song.link}" target="_blank">${song.link}</a>`;

  const lyrics = document.createElement("p");
  lyrics.textContent = song.lyrics;
  lyrics.classList.add("lyrics");

  card.appendChild(title);
  card.appendChild(link);
  card.appendChild(lyrics);

  card.addEventListener("click", () => {
    lyrics.classList.toggle("show");
  });

  return card;
}

function selectPlaylist() {
  const currentPage = window.location.pathname.split("/")[1];
  switch (currentPage) {
    case "index.html":
      return wanwanSongs;
    case "noom.html":
      return mySongs;
    default:
      return wanwanSongs;
  }
}

function renderCards() {
  cardsContainer.innerHTML = "";
  const songs = selectPlaylist();
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  songs.forEach((song) => {
    if (song.title.toLowerCase().includes(searchTerm)) {
      const card = createCard(song);
      cardsContainer.appendChild(card);
    }
  });
}

function searchCards() {
  renderCards();
}

renderCards();
