document.addEventListener("DOMContentLoaded", () => {
  const dock = document.querySelector(".nav-expanded");
  if (!dock) return;

  const links = [
    { page: "home",     label: "Home" },
    { page: "games",    label: "Games" },
    { page: "settings", label: "Settings" },
    { page: "credits",  label: "Credits" },
    { page: "cloak", label: "Cloak"},
  ];

  links.forEach(({ page, label }) => {
    const a = document.createElement("a");
    a.href = "#";
    a.dataset.page = page;
    a.textContent = label;
    dock.appendChild(a);
  });
});
