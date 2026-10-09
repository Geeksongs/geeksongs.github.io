document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".publication-filters").forEach((controls) => {
    const scope = controls.closest(".home-section-card") || controls.parentElement;
    const entries = [...scope.querySelectorAll(".publication-entry")];
    const search = scope.querySelector(".publication-search");
    let category = "all";
    const applyFilter = () => {
      const query = search.value.trim().toLowerCase();
      let count = 0;
      entries.forEach((entry) => {
        const matchesCategory = category === "all" || entry.dataset.publicationCategory.split(" ").includes(category);
        const visible = matchesCategory && entry.textContent.toLowerCase().includes(query);
        entry.closest("li").hidden = !visible;
        if (visible) {
          count++;
          entry.closest("li").classList.remove("reveal-pending");
        }
      });
      scope.querySelectorAll(".publications:not(.manuscripts-in-preparation) ol.bibliography").forEach((list) => {
        const visible = [...list.children].some((item) => !item.hidden);
        list.hidden = !visible;
        if (list.previousElementSibling?.matches("h2.bibliography, h3.bibliography")) list.previousElementSibling.hidden = !visible;
      });
      const manuscripts = scope.querySelector(".manuscripts-in-preparation");
      if (manuscripts) {
        let manuscriptCount = 0;
        manuscripts.querySelectorAll("ol > li").forEach((item) => {
          item.hidden = category !== "all" || !item.textContent.toLowerCase().includes(query);
          if (!item.hidden) manuscriptCount++;
        });
        manuscripts.hidden = manuscriptCount === 0;
        count += manuscriptCount;
      }
      scope.querySelector(".publication-filter-empty").hidden = count > 0;
    };
    controls.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-publication-filter]");
      if (!button) return;
      category = button.dataset.publicationFilter;
      controls.querySelectorAll("button").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
      applyFilter();
    });
    search.addEventListener("input", applyFilter);
  });
});
