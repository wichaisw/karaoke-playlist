const cardsContainer = document.getElementById("cardsContainer");

function unescapeCharacters(text) {
  var escapedChars = {
    "\\n": "\n",
    "\\r": "\r",
    "\\t": "\t",
    "\\f": "\f",
    '\\"': '"',
    "\\'": "'",
    "\\\\": "\\",
  };
  return text.replace(/\\[nrtf\\"']/g, function (match) {
    return escapedChars[match];
  });
}

function createCard(song) {
  const card = document.createElement("div");
  card.classList.add("card");

  const title = document.createElement("h2");
  title.textContent = song.title;

  const link = document.createElement("p");
  link.innerHTML = `Link: <a style="word-wrap: break-word;" href="${song.link}" target="_blank">${song.link}</a>`;

  const lyrics = document.createElement("pre");
  lyrics.textContent = unescapeCharacters(song.lyrics);
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

function renderCards(searchTerm) {
  cardsContainer.innerHTML = "";
  const songs = selectPlaylist();
  songs.forEach((song) => {
    if (song.title.toLowerCase().includes(searchTerm)) {
      const card = createCard(song);
      cardsContainer.appendChild(card);
    }
  });
}

function searchCards() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const bakaImage = document.querySelector(".bg-image");
  if (searchTerm.length > 0) {
    bakaImage.style.display = "none";
  } else {
    bakaImage.style.display = "flex";
  }
  renderCards(searchTerm);
}

renderCards("");
