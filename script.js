const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");

menuToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.querySelector(".sr-only").textContent =
    isOpen ? "Tutup navigasi" : "Buka navigasi";
});

mainNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    if (menuToggle) menuToggle.querySelector(".sr-only").textContent = "Buka navigasi";
  });
});

const searchInput = document.querySelector("#serviceSearch");
const filterButtons = [...document.querySelectorAll(".filter-chip")];
const serviceCards = [...document.querySelectorAll(".service-card")];
const emptyState = document.querySelector("#emptyState");
let activeFilter = "semua";

function filterServices() {
  const query = (searchInput?.value || "").trim().toLocaleLowerCase("id");
  let visibleCount = 0;

  serviceCards.forEach((card) => {
    const categoryMatches = activeFilter === "semua" ||
      card.dataset.category === activeFilter;
    const searchText = `${card.dataset.search} ${card.textContent}`.toLocaleLowerCase("id");
    const searchMatches = searchText.includes(query);
    const visible = categoryMatches && searchMatches;
    card.hidden = !visible;
    if (visible) visibleCount += 1;
  });

  if (emptyState) emptyState.hidden = visibleCount !== 0;
}

searchInput?.addEventListener("input", filterServices);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("selected", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    filterServices();
  });
});

document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    const select = document.querySelector("#serviceType");
    if (select) {
      select.value = link.dataset.service;
    }
  });
});

const requestForm = document.querySelector("#requestForm");
const formMessage = document.querySelector("#formMessage");

requestForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!requestForm.reportValidity()) return;

  const formData = new FormData(requestForm);
  const name = String(formData.get("nama") || "").trim();
  const service = String(formData.get("layanan") || "");

  if (formMessage) {
    formMessage.textContent =
      `Terima kasih, ${name}. Permohonan simulasi untuk "${service}" berhasil divalidasi di browser. Data belum dikirim ke server.`;
    formMessage.hidden = false;
    formMessage.focus?.();
  }
});
