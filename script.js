// --------------------
// PARTICLES.JS INITIALIZATION
// --------------------
particlesJS("particles-js", {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: "#0bfc03"
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#0bfc03",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "bubble"
      },
      onclick: {
        enable: true,
        mode: "repulse"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 150,
        size: 5,
        duration: 2,
        opacity: 0.3
      },
      repulse: {
        distance: 200,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: true
});

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
      <h2 class="title">Radium</h2>
    </section>
  `,

  games: `
    <section class="hero">
      <h2>Games</h2>
      <div class="games-grid">
        <button class="c-button c-button--gooey" onclick="openGame('games/cuphead-main/cuphead-main/index.html')">
          Cuphead
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/genizy web-port main undertale-yellow/index.html')">
          Undertale Yellow
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/genizy web-port main bergentruck/BERGENTRUCK_201X.html')">
          Bergentruck
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/basketrandom/index.html')">
          Basket Random
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/bitlife/index.html')">
          Bitlife
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/btd4/index.html')">
          BTD4
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/burritobison/index.html')">
          Burrito Bison
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/circleo/index.html')">
          CircleO
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/cookie/index.html')">
          Cookie Clicker
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/cubefield/index.html')">
          cubefield
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/deepestsword/index.html')">
          Deepest Sword
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/drifthunters/index.html')">
          Drifthunters
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/drivemad/index.html')">
          Drive Mad
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/btd4/index.html')">
          Fleeing The Complex
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/mario/index.html')">
          Mario
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/moto-x3m/index.html')">
          Moto X3M
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/paperio2/index.html')">
          Paper.io 2
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/retrobowl/index.html')">
          Retro Bowl
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/sm64/index.html')">
          Super Mario 64
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/snake/index.html')">
          Snake
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/stickmanhook/index.html')">
          Stickman Hook
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/subway-surfers/index.html')">
          Subway Surfers
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/amanda-the-adventurer/index.html')">
          Amanda The Adventurer
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/andys-apple-farm/index.html')">
          Andys Apple Farm
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/Baldi Remaster/index.html')">
          Baldi Plus
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/bendy/index.html')">
          Bendy
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/bloodmoney/index.html')">
          Bloodmoney
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/buckshot-roulette/index.html')">
          Buckshot Roulette
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/class-of-09/index.html')">
          Class Of 09
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/deadseat/index.html')">
          Deadseat
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/deltatraveler/index.html')">
          Deltatraveler
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/donottakethiscathome/index.html')">
          Do Not Take This Cat Home
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/fears-to-fathom/index.html')">
          Fears To Fathom
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/getting-over-it/index.html')">
          Getting Over It
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/happy-sheepies/index.html')">
          Happy Sheepies
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/hotline-miami/index.html')">
          Hotline Miami
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/human-expenditure-program/index.html')">
          Human Expenditure Program
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/jelly-drift/index.html')">
          Jelly Drift
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/karlson/index.html')">
          Karlson
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/kindergarten/index.html')">
          Kindergarten
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/lacysflashgames/index.html')">
          Lacey's Flash Games
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/milkman-karlson/index.html')">
          Milkman Karlson
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/minesweeperplus/index.html')">
          Minesweeper Plus
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/omori-fixed/index.html')">
          Omori
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/People Playground/index.html')">
          People Playground
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/pizza-tower/index.html')">
          Pizza Tower
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/raft/index.html')">
          Raft
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button><button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/repo/index.html')">
          Repo
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/schoolboy-runaway/index.html')">
          Schoolboy Runaway
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/slender/index.html')">
          Slender
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/sonic.exe/index.html')">
          Sonic.exe
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/speed-stars/index.html')">
          Speed Stars
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/tattletail/index.html')">
          Tattle Tail
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/thats-not-my-neighbor/index.html')">
          Thats Not My Neighbor
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/the-man-in-the-window/index.html')">
          The Man In The Window
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/ultrakill/index.html')">
          Ultrakill
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/web-fishing/index.html')">
          Web Fishing
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/yandere-simulator/index.html')">
          Yandere Simulator
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
        <button class="c-button c-button--gooey" onclick="openGame('games/web-port-main/yume-nikki/index.html')">
          Yumme Nicki
          <div class="c-button__blobs">
            <div></div><div></div><div></div>
          </div>
        </button>
      </div>
    </section>
  `,

  othersites: `
    <section class="hero">
      <h2>Other Sites</h2>
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
    </section>
  `,

  settings: `
    <section class="hero">
      <h2>Settings</h2>
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

// --------------------
// GAME EMBED LOGIC
// --------------------
function openGame(gameUrl) {
  const gameContainer = document.getElementById("game-container");
  const gameIframe = document.getElementById("game-iframe");
  
  gameIframe.src = gameUrl;
  gameContainer.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeGame() {
  const gameContainer = document.getElementById("game-container");
  const gameIframe = document.getElementById("game-iframe");
  
  gameIframe.src = "";
  gameContainer.classList.add("hidden");
  document.body.style.overflow = "auto";
}

// Close game when close button is clicked
document.getElementById("close-game").addEventListener("click", closeGame);

// Close game when pressing Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeGame();
  }
});
