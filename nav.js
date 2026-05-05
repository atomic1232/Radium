document.addEventListener("DOMContentLoaded", () => {
  const dock = document.querySelector(".nav-expanded");
  if (!dock) return;

  const links = [
    { page: "home",     label: "Home",     icon: "https://cdn.jsdelivr.net/gh/atomic1232/Radium@latest/assets/HomeIcon.png" },
    { page: "games",    label: "Games",    icon: "https://cdn.jsdelivr.net/gh/atomic1232/Radium@latest/assets/GamesIcon.png" },
    { page: "settings", label: "Settings", icon: "https://cdn.jsdelivr.net/gh/atomic1232/Radium@latest/assets/SettingIcon.png" },
    { page: "credits",  label: "Credits",  icon: "https://cdn.jsdelivr.net/gh/atomic1232/Radium@latest/assets/CreditsIcon.png" },
    { page: "cloak",    label: "Cloak",    icon: "https://cdn.jsdelivr.net/gh/atomic1232/Radium@latest/assets/CloakIcon.png" },
  ];

  links.forEach(({ page, label, icon }) => {
    const a = document.createElement("a");
    a.href = "#";
    a.dataset.page = page;
    a.innerHTML = `
      <img src="${icon}" alt="${label}" onerror="this.style.display='none'">
      <span>${label}</span>
    `;
    dock.appendChild(a);
  });
});
