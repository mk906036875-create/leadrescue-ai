
/* =========================================================
   LEADRESCUE AI — V2
   Interactive Sales Demo
   ========================================================= */

"use strict";

/* =========================================================
   DATA
   ========================================================= */

const state = {
  leads: 247,
  risk: 31,
  recovered: 86,
  appointments: 42,
  potentialRevenue: 38940,
  recoveredRevenue: 24680
};

const sampleLeads = [
  {
    name: "Alex Morgan",
    initials: "AM",
    enquiry: "Website enquiry",
    value: 1450
  },
  {
    name: "Taylor Reed",
    initials: "TR",
    enquiry: "Missed call recovered",
    value: 900
  },
  {
    name: "Chris Evans",
    initials: "CE",
    enquiry: "Appointment request",
    value: 2100
  },
  {
    name: "Jamie Patel",
    initials: "JP",
    enquiry: "Facebook enquiry",
    value: 750
  },
  {
    name: "Morgan Wilson",
    initials: "MW",
    enquiry: "Online consultation",
    value: 1250
  },
  {
    name: "Daniel Carter",
    initials: "DC",
    enquiry: "Missed enquiry",
    value: 1800
  }
];

/* =========================================================
   ELEMENTS
   ========================================================= */

const $ = id => document.getElementById(id);

const simulateLeadBtn = $("simulateLead");
const openDemoBtn = $("openDemo");
const salesDemoBtn = $("salesDemo");

const modal = $("demoModal");
const closeModalBtn = $("closeModal");

const demoForm = $("demoForm");
const successMessage = $("successMessage");

const leadFeed = $("leadFeed");

const totalLeads = $("totalLeads");
const atRisk = $("atRisk");
const totalRecovered = $("totalRecovered");
const totalAppointments = $("totalAppointments");

const potentialRevenue = $("potentialRevenue");
const recoveredRevenue = $("recoveredRevenue");
const heroRecovered = $("heroRecovered");

const leadSlider = $("leadSlider");
const valueSlider = $("valueSlider");
const recoverySlider = $("recoverySlider");

const leadSliderValue = $("leadSliderValue");
const valueSliderValue = $("valueSliderValue");
const recoverySliderValue = $("recoverySliderValue");

const roiRevenue = $("roiRevenue");
const roiMultiple = $("roiMultiple");

/* =========================================================
   FORMATTERS
   ========================================================= */

function money(value) {
  return "$" + Math.round(value).toLocaleString("en-US");
}

function number(value) {
  return Math.round(value).toLocaleString("en-US");
}

/* =========================================================
   DASHBOARD UPDATE
   ========================================================= */

function updateDashboard() {

  if (totalLeads) {
    totalLeads.textContent = number(state.leads);
  }

  if (atRisk) {
    atRisk.textContent = number(state.risk);
  }

  if (totalRecovered) {
    totalRecovered.textContent = number(state.recovered);
  }

  if (totalAppointments) {
    totalAppointments.textContent =
      number(state.appointments);
  }

  if (potentialRevenue) {
    potentialRevenue.textContent =
      money(state.potentialRevenue);
  }

  if (recoveredRevenue) {
    recoveredRevenue.textContent =
      money(state.recoveredRevenue);
  }

  if (heroRecovered) {
    heroRecovered.textContent =
      number(state.recovered);
  }
}

/* =========================================================
   ROI CALCULATOR
   ========================================================= */

function calculateROI() {

  if (!leadSlider || !valueSlider || !recoverySlider) {
    return;
  }

  const leads = Number(leadSlider.value);
  const customerValue = Number(valueSlider.value);
  const recoveryRate = Number(recoverySlider.value);

  const recoveredCustomers =
    leads * (recoveryRate / 100);

  const monthlyRevenue =
    recoveredCustomers * customerValue;

  const multiple =
    monthlyRevenue / 2997;

  leadSliderValue.textContent =
    number(leads);

  valueSliderValue.textContent =
    money(customerValue);

  recoverySliderValue.textContent =
    recoveryRate + "%";

  roiRevenue.textContent =
    money(monthlyRevenue);

  roiMultiple.textContent =
    multiple.toFixed(1) +
    "× potential value";
}

/* =========================================================
   ROI SLIDER EVENTS
   ========================================================= */

[
  leadSlider,
  valueSlider,
  recoverySlider
].forEach(slider => {

  if (slider) {
    slider.addEventListener(
      "input",
      calculateROI
    );
  }

});

/* =========================================================
   CREATE RANDOM LEAD
   ========================================================= */

function createLead() {

  const source =
    sampleLeads[
      Math.floor(
        Math.random() * sampleLeads.length
      )
    ];

  const variation =
    Math.floor(Math.random() * 500);

  return {
    name: source.name,
    initials: source.initials,
    enquiry: source.enquiry,
    value: source.value + variation
  };
}

/* =========================================================
   ADD LEAD TO FEED
   ========================================================= */

function addLeadToFeed(lead) {

  if (!leadFeed) {
    return;
  }

  const row =
    document.createElement("div");

  row.className =
    "lead-row hot";

  row.innerHTML = `
    <div class="lead-avatar">
      ${lead.initials}
    </div>

    <div class="lead-info">

      <strong>
        ${lead.name}
      </strong>

      <small>
        ${lead.enquiry} • just now
      </small>

      <div class="tags">

        <span class="hot-tag">
          AI RESPONDED
        </span>

        <span>
          RECOVERED
        </span>

      </div>

    </div>

    <strong class="lead-value">
      ${money(lead.value)}
    </strong>
  `;

  row.style.opacity = "0";
  row.style.transform =
    "translateY(-10px)";

  leadFeed.prepend(row);

  requestAnimationFrame(() => {

    row.style.transition =
      "all .35s ease";

    row.style.opacity = "1";

    row.style.transform =
      "translateY(0)";
  });

  const rows =
    leadFeed.querySelectorAll(".lead-row");

  if (rows.length > 6) {
    rows[rows.length - 1].remove();
  }
}

/* =========================================================
   SIMULATE LEAD
   ========================================================= */

function simulateLead() {

  const lead = createLead();

  state.leads += 1;

  state.recovered += 1;

  state.risk =
    Math.max(0, state.risk - 1);

  state.appointments += 1;

  state.potentialRevenue +=
    lead.value;

  state.recoveredRevenue +=
    lead.value;

  addLeadToFeed(lead);

  updateDashboard();

  showToast(
    "✓ AI recovered " +
    lead.name +
    " — " +
    money(lead.value)
  );
}

if (simulateLeadBtn) {

  simulateLeadBtn.addEventListener(
    "click",
    simulateLead
  );

}

/* =========================================================
   MODAL
   ========================================================= */

function openModal() {

  if (!modal) {
    return;
  }

  modal.classList.add("show");

  document.body.style.overflow =
    "hidden";

  if (demoForm) {
    demoForm.style.display =
      "grid";
  }

  if (successMessage) {
    successMessage.classList.remove(
      "show"
    );
  }
}

function closeModal() {

  if (!modal) {
    return;
  }

  modal.classList.remove("show");

  document.body.style.overflow =
    "";
}

if (openDemoBtn) {
  openDemoBtn.addEventListener(
    "click",
    openModal
  );
}

if (salesDemoBtn) {
  salesDemoBtn.addEventListener(
    "click",
    openModal
  );
}

if (closeModalBtn) {
  closeModalBtn.addEventListener(
    "click",
    closeModal
  );
}

/* =========================================================
   MODAL OUTSIDE CLICK
   ========================================================= */

if (modal) {

  modal.addEventListener(
    "click",
    event => {

      if (event.target === modal) {
        closeModal();
      }

    }
  );
}

/* =========================================================
   ESC KEY
   ========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape" &&
      modal &&
      modal.classList.contains("show")
    ) {
      closeModal();
    }

  }
);

/* =========================================================
   DEMO FORM
   ========================================================= */

if (demoForm) {

  demoForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      const button =
        demoForm.querySelector(
          "button[type='submit']"
        );

      if (button) {

        button.textContent =
          "Processing...";

        button.disabled = true;
      }

      setTimeout(() => {

        demoForm.style.display =
          "none";

        if (successMessage) {

          successMessage.classList.add(
            "show"
          );

        }

        showToast(
          "✓ Demo request captured"
        );

      }, 900);

    }
  );
}

/* =========================================================
   TOAST
   ========================================================= */

function showToast(message) {

  let toast =
    document.getElementById(
      "leadrescueToast"
    );

  if (!toast) {

    toast =
      document.createElement("div");

    toast.id =
      "leadrescueToast";

    document.body.appendChild(toast);
  }

  toast.textContent =
    message;

  toast.style.opacity =
    "1";

  toast.style.transform =
    "translateY(0)";

  clearTimeout(
    window.leadRescueToastTimer
  );

  window.leadRescueToastTimer =
    setTimeout(() => {

      toast.style.opacity =
        "0";

      toast.style.transform =
        "translateY(12px)";

    }, 2800);
}

/* =========================================================
   NAVIGATION
   ========================================================= */

const navItems =
  document.querySelectorAll(
    ".nav-item"
  );

navItems.forEach(item => {

  item.addEventListener(
    "click",
    () => {

      navItems.forEach(nav => {

        nav.classList.remove(
          "active"
        );

      });

      item.classList.add(
        "active"
      );

    }
  );

});

/* =========================================================
   LIVE STATUS
   ========================================================= */

const liveLabel =
  document.querySelector(
    ".live-label"
  );

if (liveLabel) {

  setInterval(() => {

    liveLabel.style.opacity =
      ".45";

    setTimeout(() => {

      liveLabel.style.opacity =
        "1";

    }, 300);

  }, 2400);
}

/* =========================================================
   AUTOMATIC DEMO ACTIVITY
   ========================================================= */

/*
  This is intentionally sample-data activity.
  It does NOT claim to connect to a real CRM.
*/

setInterval(() => {

  if (
    document.visibilityState !==
    "visible"
  ) {
    return;
  }

  const lead =
    createLead();

  state.leads += 1;

  state.potentialRevenue +=
    Math.round(lead.value * .25);

  addLeadToFeed(lead);

  updateDashboard();

}, 18000);

/* =========================================================
   INITIALIZE
   ========================================================= */

updateDashboard();

calculateROI();

/* =========================================================
   CONSOLE
   ========================================================= */

console.log(
  "%c LEADRESCUE AI ",
  "background:#caff3d;color:#071008;font-weight:900;padding:7px 12px;border-radius:5px;"
);

console.log(
  "AI Revenue Recovery — Demo Environment"
);
