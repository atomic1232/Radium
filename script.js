// --------------------
// DARK MODE (PERSISTENT)
// --------------------
if (localStorage.getItem("darkMode") !== "false") {
  document.body.classList.add("dark");
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "darkMode",
    document.body.classList.contains("dark")
  );
}

// --------------------
// GAMES LIST (EDIT THIS ONLY)
// --------------------
const gamesList = [
  { name: "pepsinitro", url: "#" },
  { name: "monkeygg", url: "#" },
  { name: "selenite", url: "#" },
  { name: "kirbygames", url: "#" },
  { name: "thereal12", url: "#" },
  { name: "whisperbridge", url: "#" }
];


// --------------------
// PAGE CONTENT
// --------------------
const pages = {
  home: `
    <section class="hero">
      <h2>Radium</h2>
      <p>Select a tab above to get started.</p>
    </section>
  `,

  games: `
    <section class="hero">
      <h2>Games</h2>
      <div class="games-grid">
        ${gamesList.map(game => `
          <button class="c-button c-button--gooey"
            onclick="window.open('${game.url}', '_blank')">
            ${game.name}
            <div class="c-button__blobs">
              <div></div><div></div><div></div>
            </div>
          </button>
        `).join("")}
      </div>
    </section>
  `,

  unblockers: `
    <section class="hero">
      <h2>Unblockers</h2>
      <p>Coming soon.</p>
    </section>
  `,

  settings: `
    <section class="hero">
      <h2>Settings</h2>
      <button onclick="toggleDarkMode()">Toggle Dark Mode</button>
    </section>
  `
};

// --------------------
// NAVIGATION LOGIC
// --------------------
const content = document.getElementById("content");

function loadPage(page) {
  content.innerHTML = pages[page] || pages.home;

  document.querySelectorAll("nav a").forEach(link => {
    link.classList.toggle("active", link.dataset.page === page);
  });
}

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const page = link.dataset.page;
    loadPage(page);
    history.pushState({ page }, "", `#${page}`);
  });
});

const startPage = location.hash.replace("#", "") || "home";
loadPage(startPage);
