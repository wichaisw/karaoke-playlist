const cardsContainer = document.getElementById("cardsContainer");
let currentPlaylist = "wanwan";

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
  title.textContent = `[${song.id}] ${song.title}
  `;

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
  switch (currentPlaylist) {
    case "wanwan":
      return wanwanSongs;
    case "noom":
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
  const heroImageElem = document.querySelector(".image-container");
  if (searchTerm.length > 0) {
    heroImageElem.style.display = "none";
  } else {
    heroImageElem.style.display = "flex";
  }
  renderCards(searchTerm);
}

function changePlaylist(playListName) {
  currentPlaylist = playListName;
  setHeroImage();
  renderCards("");
}

function setHeroImage() {
  const heroImageElem = document.querySelector(".image-container");
  const heroImage = currentPlaylist === "wanwan" ? "image-wanwan" : "image-me";
  heroImageElem.classList.remove("image-wanwan");
  heroImageElem.classList.remove("image-me");
  heroImageElem.classList.add(heroImage);
}

setHeroImage();
renderCards("");
