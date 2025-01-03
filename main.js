/* Elementlere ulaşım */
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");
const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("play");
const playListButton = document.getElementById("playlist");
const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");
const progressBar = document.getElementById("progress-bar");
const playListContainer = document.getElementById("playlist-container");
const closeButton = document.getElementById("close-button");
const playListSongs = document.getElementById("playlist-songs");
const currentProgress = document.getElementById("current-progress");

// Şarkı listesi
let index = 0;
let loop = true;

const songsList = [
  {
    name: "Gelo Ew Ki Bu",
    link: "assets/gelo-ew-ki-bu.mp3",
    artist: "Aram Tigran",
    image: "assets/aram-tigran.jpeg",
  },
  {
    name: "Gitme Kal",
    link: "assets/yara-bere-icindeyim.mp3",
    artist: "Hira-i Zerdust",
    image: "assets/hirai.jpeg",
  },
  {
    name: "Aramam",
    link: "assets/aramam.mp3",
    artist: "Ibrahim Tatlises",
    image: "assets/ibrahim-tatlises.jpeg",
  },
  {
    name: "Ax Eman",
    link: "assets/ax-eman.mp3",
    artist: "Rewsan Celiker",
    image: "assets/rewsan-celiker.jpeg",
  },
  {
    name: "Dinle",
    link: "assets/dinle.mp3",
    artist: "Mahsun Kirmizigul",
    image: "assets/mahsun.jpeg",
  },
];

// Şarkı atama fonksiyonu
const setSong = (arrayIndex) => {
  const { name, link, artist, image } = songsList[arrayIndex];
  audio.src = link;
  songName.textContent = name;
  songArtist.textContent = artist;
  songImage.src = image;

  audio.onloadedmetadata = () => {
    maxDuration.textContent = timeFormatter(audio.duration);
  };

  playListContainer.classList.add("hide");
  playAudio();
};

// Şarkıyı oynatma
const playAudio = () => {
  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
};

// Şarkıyı durdurma
const pauseAudio = () => {
  audio.pause();
  pauseButton.classList.add("hide");
  playButton.classList.remove("hide");
};

// Bir sonraki şarkıya geç
const nextSong = () => {
  index = loop
    ? (index + 1) % songsList.length
    : Math.floor(Math.random() * songsList.length);
  setSong(index);
};

// Bir önceki şarkıya geç
const previousSong = () => {
  index = index > 0 ? index - 1 : songsList.length - 1;
  setSong(index);
};

// Zaman formatlama
const timeFormatter = (timeInput) => {
  const minute = String(Math.floor(timeInput / 60)).padStart(2, "0");
  const second = String(Math.floor(timeInput % 60)).padStart(2, "0");
  return `${minute}:${second}`;
};

// Çalma listesi oluşturma
const initializePlaylist = () => {
  songsList.forEach((song, i) => {
    playListSongs.innerHTML += `<li class="playlistSong" onclick="setSong(${i})">
      <div class="playlist-image-container">
        <img src="${song.image}" />
      </div>
      <div class="playlist-song-details">
        <span id="playlist-song-name">${song.name}</span>
        <span id="playlist-song-artist-album">${song.artist}</span>
      </div>
    </li>`;
  });
};

// Progress bar kontrolü
progressBar.addEventListener("click", (event) => {
  const progress =
    (event.clientX - progressBar.getBoundingClientRect().left) /
    progressBar.offsetWidth;
  currentProgress.style.width = `${progress * 100}%`;
  audio.currentTime = progress * audio.duration;
  playAudio();
});

// Zaman güncelleme
audio.addEventListener("timeupdate", () => {
  currentTimeRef.textContent = timeFormatter(audio.currentTime);
  currentProgress.style.width = `${
    (audio.currentTime / audio.duration) * 100
  }%`;
});

audio.onended = nextSong;

// Buton event listener'ları
repeatButton.addEventListener("click", () => {
  repeatButton.classList.toggle("active");
  audio.loop = !audio.loop;
});

shuffleButton.addEventListener("click", () => {
  shuffleButton.classList.toggle("active");
  loop = !loop;
});

playListButton.addEventListener("click", () => {
  playListContainer.classList.remove("hide");
});

closeButton.addEventListener("click", () => {
  playListContainer.classList.add("hide");
});

nextButton.addEventListener("click", nextSong);
pauseButton.addEventListener("click", pauseAudio);
playButton.addEventListener("click", playAudio);
prevButton.addEventListener("click", previousSong);

// Sayfa yüklendiğinde
window.onload = () => {
  setSong(index);
  pauseAudio();
  initializePlaylist();
};

// Tema değiştirici buton
const themeToggleButton = document.getElementById("theme-toggle");

// Tema değiştirme fonksiyonu
const toggleTheme = () => {
  document.body.classList.toggle("light-mode");

  // Tema durumu kaydet
  const isLightMode = document.body.classList.contains("light-mode");
  localStorage.setItem("theme", isLightMode ? "light" : "dark");

  // Düğme metnini güncelle
  themeToggleButton.textContent = isLightMode ? "Dark Mode" : "Light Mode";
};

// Sayfa yüklendiğinde tema durumu kontrol et
window.onload = () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeToggleButton.textContent = "Dark Mode";
  } else {
    themeToggleButton.textContent = "Light Mode";
  }

  // Diğer başlangıç işlevlerini çağır
  setSong(index);
  pauseAudio();
  initializePlaylist();
};

// Butona tıklama olayı
themeToggleButton.addEventListener("click", toggleTheme);
