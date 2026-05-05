document.addEventListener("DOMContentLoaded", () => {
  const dock = document.querySelector(".nav-expanded");
  if (!dock) return;

  const links = [
    { page: "home",     label: "Home",     icon: "https://cdn.jsdelivr.net/gh/atomic1232/Radium@latest/assets/HomeIcon.png" },
    { page: "games",    label: "Games",    icon: "https://cdn.jsdelivr.net/gh/atomic1232/Radium@latest/assets/GamesIcon.png" },
    { page: "settings", label: "Settings", icon: "https://cdn.jsdelivr.net/gh/atomic1232/Radium@latest/assets/SettingIcon.png" },
    { page: "credits",  label: "Credits",  icon: "https://cdn.jsdelivr.net/gh/atomic1232/Radium@latest/assets/CreditsIcon.png" },
  ];

  links.forEach(({ page, label, icon }) => {
    const a = document.createElement("a");
    a.href = "#";
    a.dataset.page = page;
    a.innerHTML = `<img src="${icon}" alt="${label}"><span>${label}</span>`;
    dock.appendChild(a);
  });

  // Cloak is a special action, not a page
  const cloakA = document.createElement("a");
  cloakA.href = "#";
  cloakA.innerHTML = `<img src="https://cdn.jsdelivr.net/gh/atomic1232/Radium@latest/assets/CloakIcon.png" alt="Cloak"><span>Cloak</span>`;
  cloakA.addEventListener("click", e => {
    e.preventDefault();
    openCloaked();
  });
  dock.appendChild(cloakA);
});
