document.addEventListener("DOMContentLoaded", () => {
  const routeLinks = document.querySelectorAll("[data-route]");
  const pageViews = document.querySelectorAll(".page-view");
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileDrawer = document.getElementById("mobileDrawer");

  function closeMenu() {
    if (!mobileMenuBtn || !mobileDrawer) return;
    mobileMenuBtn.classList.remove("open");
    mobileDrawer.classList.remove("open");
    mobileMenuBtn.setAttribute("aria-expanded", "false");
    mobileDrawer.setAttribute("aria-hidden", "true");
  }

  function navigateTo(route, updateHash = true) {
    const target = document.getElementById(`view-${route}`);
    if (!target) return;

    pageViews.forEach((v) => v.classList.remove("active"));
    target.classList.add("active");

    document.querySelectorAll(".nav-link, .mobile-nav-link").forEach((link) => {
      link.classList.toggle("active", link.dataset.route === route);
    });

    if (updateHash) {
      history.replaceState(null, "", `#${route}`);
    }

    closeMenu();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener("click", () => {
      const open = mobileDrawer.classList.toggle("open");
      mobileMenuBtn.classList.toggle("open", open);
      mobileMenuBtn.setAttribute("aria-expanded", String(open));
      mobileDrawer.setAttribute("aria-hidden", String(!open));
    });
  }

  routeLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const route = link.dataset.route;
      if (route) {
        e.preventDefault();
        navigateTo(route);
      }
    });
  });

  const initialHash = window.location.hash.replace("#", "");
  if (initialHash && document.getElementById(`view-${initialHash}`)) {
    navigateTo(initialHash, false);
  }

  document.querySelectorAll(".accordion-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const box = btn.closest(".accordion-box");
      const sym = btn.querySelector(".acc-symbol");
      const open = box.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
      if (sym) sym.textContent = open ? "−" : "+";
    });
  });

  const homeConnectForm = document.getElementById("homeConnectForm");
  const homeConnectStatus = document.getElementById("homeConnectStatus");
  if (homeConnectForm && homeConnectStatus) {
    homeConnectForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fn = document.getElementById("hFirstName").value.trim();
      const ln = document.getElementById("hLastName").value.trim();
      const em = document.getElementById("hEmail").value.trim();

      if (!fn || !ln || !em || !em.includes("@")) {
        homeConnectStatus.textContent = "Please fill in First Name, Last Name, and a valid Email.";
        homeConnectStatus.className = "form-status err";
        return;
      }

      homeConnectStatus.textContent = `Thank you, ${fn} ${ln}! You're subscribed for NARF updates.`;
      homeConnectStatus.className = "form-status ok";
      homeConnectForm.reset();
    });
  }

  const involvedForm = document.getElementById("involvedForm");
  const involvedStatus = document.getElementById("involvedStatus");
  if (involvedForm && involvedStatus) {
    involvedForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fn = document.getElementById("iFirstName").value.trim();
      const ln = document.getElementById("iLastName").value.trim();
      const em = document.getElementById("iEmail").value.trim();
      const msg = document.getElementById("iMessage").value.trim();

      if (!fn || !ln || !em || !em.includes("@") || !msg) {
        involvedStatus.textContent = "Please complete all required fields (First Name, Last Name, Email, Message).";
        involvedStatus.className = "form-status err";
        return;
      }

      involvedStatus.textContent = `Thank you, ${fn} ${ln}! Your message has been sent.`;
      involvedStatus.className = "form-status ok";
      involvedForm.reset();
    });
  }
});
