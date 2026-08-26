
/* =========================================================
   LEADRESCUE AI
   Premium Sales Demo — Frontend Demo Logic
   ========================================================= */

"use strict";


/* =========================================================
   1. ELEMENTS
   ========================================================= */

const simulateLeadBtn = document.getElementById("simulateLead");
const openDemoBtn = document.getElementById("openDemo");
const salesDemoBtn = document.getElementById("salesDemo");

const demoModal = document.getElementById("demoModal");
const closeModalBtn = document.getElementById("closeModal");

const demoForm = document.getElementById("demoForm");
const successMessage = document.getElementById("successMessage");

const leadFeed = document.getElementById("leadFeed");

const totalLeadsEl = document.getElementById("totalLeads");
const atRiskEl = document.getElementById("atRisk");
const totalRecoveredEl = document.getElementById("totalRecovered");
const totalAppointmentsEl = document.getElementById("totalAppointments");

const potentialRevenueEl =
  document.getElementById("potentialRevenue");

const recoveredRevenueEl =
  document.getElementById("recoveredRevenue");


/* =========================================================
   2. DEMO DATA
   ========================================================= */

const dashboardData = {
  leads: 247,
  risk: 31,
  recovered: 86,
  appointments: 42,
  potentialRevenue: 38940,
  recoveredRevenue: 24680
};


/* =========================================================
   3. SAMPLE LEADS
   ========================================================= */

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
   4. FORMAT CURRENCY
   ========================================================= */

function formatCurrency(number) {

  return "$" + Number(number).toLocaleString("en-US");

}


/* =========================================================
   5. UPDATE DASHBOARD
   ========================================================= */

function updateDashboard() {

  totalLeadsEl.textContent =
    dashboardData.leads.toLocaleString("en-US");

  atRiskEl.textContent =
    dashboardData.risk.toLocaleString("en-US");

  totalRecoveredEl.textContent =
    dashboardData.recovered.toLocaleString("en-US");

  totalAppointmentsEl.textContent =
    dashboardData.appointments.toLocaleString("en-US");

  potentialRevenueEl.textContent =
    formatCurrency(dashboardData.potentialRevenue);

  recoveredRevenueEl.textContent =
    formatCurrency(dashboardData.recoveredRevenue);

}


/* =========================================================
   6. OPEN DEMO MODAL
   ========================================================= */

function openDemoModal() {

  demoModal.classList.add("show");

  document.body.style.overflow = "hidden";

  if (successMessage) {
    successMessage.classList.remove("show");
  }

  if (demoForm) {
    demoForm.style.display = "grid";
  }

}


/* =========================================================
   7. CLOSE DEMO MODAL
   ========================================================= */

function closeDemoModal() {

  demoModal.classList.remove("show");

  document.body.style.overflow = "";

}


/* =========================================================
   8. DEMO BUTTON EVENTS
   ========================================================= */

if (openDemoBtn) {

  openDemoBtn.addEventListener(
    "click",
    openDemoModal
  );

}


if (salesDemoBtn) {

  salesDemoBtn.addEventListener(
    "click",
    openDemoModal
  );

}


if (closeModalBtn) {

  closeModalBtn.addEventListener(
    "click",
    closeDemoModal
  );

}


/* =========================================================
   9. CLOSE MODAL BY CLICKING OUTSIDE
   ========================================================= */

if (demoModal) {

  demoModal.addEventListener(
    "click",
    function (event) {

      if (event.target === demoModal) {

        closeDemoModal();

      }

    }
  );

}


/* =========================================================
   10. CLOSE WITH ESC KEY
   ========================================================= */

document.addEventListener(
  "keydown",
  function (event) {

    if (
      event.key === "Escape" &&
      demoModal.classList.contains("show")
    ) {

      closeDemoModal();

    }

  }
);


/* =========================================================
   11. CREATE NEW LEAD
   ========================================================= */

function createLead() {

  const randomLead =
    sampleLeads[
      Math.floor(
        Math.random() * sampleLeads.length
      )
    ];

  return {

    name: randomLead.name,

    initials: randomLead.initials,

    enquiry: randomLead.enquiry,

    value:
      randomLead.value +
      Math.floor(Math.random() * 600)

  };

}


/* =========================================================
   12. ADD LEAD TO FEED
   ========================================================= */

function addLeadToFeed(lead) {

  const leadRow =
    document.createElement("div");

  leadRow.className =
    "lead-row hot";

  leadRow.innerHTML = `

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
          NEW LEAD
        </span>

        <span>
          AI REPLY SENT
        </span>

      </div>

    </div>

    <strong class="lead-value">
      ${formatCurrency(lead.value)}
    </strong>

  `;


  leadFeed.prepend(leadRow);


  /* Entry animation */

  leadRow.style.opacity = "0";

  leadRow.style.transform =
    "translateY(-12px)";


  requestAnimationFrame(function () {

    leadRow.style.transition =
      "all 0.35s ease";

    leadRow.style.opacity = "1";

    leadRow.style.transform =
      "translateY(0)";

  });


  /* Keep feed clean */

  const rows =
    leadFeed.querySelectorAll(".lead-row");

  if (rows.length > 7) {

    rows[rows.length - 1].remove();

  }

}


/* =========================================================
   13. SIMULATE LEAD
   ========================================================= */

function simulateLead() {

  const lead = createLead();


  dashboardData.leads += 1;

  dashboardData.recovered += 1;

  dashboardData.risk =
    Math.max(
      0,
      dashboardData.risk - 1
    );


  dashboardData.potentialRevenue +=
    lead.value;


  dashboardData.recoveredRevenue +=
    lead.value;


  addLeadToFeed(lead);

  updateDashboard();


  showToast(
    "AI recovered a new lead: " +
    lead.name
  );

}


if (simulateLeadBtn) {

  simulateLeadBtn.addEventListener(
    "click",
    simulateLead
  );

}


/* =========================================================
   14. DEMO FORM SUBMISSION
   ========================================================= */

if (demoForm) {

  demoForm.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();


      const formData =
        new FormData(demoForm);


      const businessName =
        formData.get(
          "business"
        );


      demoForm.style.display =
        "none";


      successMessage.classList.add(
        "show"
      );


      showToast(
        "Demo request captured successfully."
      );


      /*
        IMPORTANT:

        This is frontend demo behavior only.

        To receive real leads, connect this
        form to your backend, CRM, email,
        Formspree, Supabase, Firebase, etc.
      */

    }
  );

}


/* =========================================================
   15. TOAST NOTIFICATION
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

    toast.style.position =
      "fixed";

    toast.style.right =
      "22px";

    toast.style.bottom =
      "22px";

    toast.style.zIndex =
      "999";

    toast.style.padding =
      "12px 16px";

    toast.style.border =
      "1px solid rgba(202,255,61,.25)";

    toast.style.borderRadius =
      "9px";

    toast.style.background =
      "#0d1a21";

    toast.style.color =
      "#caff3d";

    toast.style.fontSize =
      "10px";

    toast.style.fontWeight =
      "800";

    toast.style.boxShadow =
      "0 15px 40px rgba(0,0,0,.45)";

    toast.style.transform =
      "translateY(15px)";

    toast.style.opacity =
      "0";

    toast.style.transition =
      "all .25s ease";

    document.body.appendChild(toast);

  }


  toast.textContent =
    message;


  requestAnimationFrame(
    function () {

      toast.style.opacity =
        "1";

      toast.style.transform =
        "translateY(0)";

    }
  );


  clearTimeout(
    window.leadrescueToastTimer
  );


  window.leadrescueToastTimer =
    setTimeout(
      function () {

        toast.style.opacity =
          "0";

        toast.style.transform =
          "translateY(15px)";

      },
      2800
    );

}


/* =========================================================
   16. NAVIGATION ACTIVE STATE
   ========================================================= */

const navItems =
  document.querySelectorAll(
    ".nav-item"
  );


navItems.forEach(
  function (item) {

    item.addEventListener(
      "click",
      function () {

        navItems.forEach(
          function (nav) {

            nav.classList.remove(
              "active"
            );

          }
        );


        item.classList.add(
          "active"
        );

      }
    );

  }
);


/* =========================================================
   17. LIVE AI STATUS EFFECT
   ========================================================= */

const liveLabel =
  document.querySelector(
    ".live-label"
  );


if (liveLabel) {

  setInterval(
    function () {

      liveLabel.style.opacity =
        "0.45";


      setTimeout(
        function () {

          liveLabel.style.opacity =
            "1";

        },
        350
      );

    },
    2400
  );

}


/* =========================================================
   18. AUTO AI ACTIVITY
   ========================================================= */

/*
   Every 18 seconds the demo generates
   a small simulated AI activity event.

   This makes the sales demo feel alive
   without pretending it is connected
   to a real CRM.
*/

setInterval(
  function () {

    if (
      document.visibilityState ===
      "visible"
    ) {

      const lead =
        createLead();


      /*
        Smaller automatic event.
      */

      dashboardData.leads += 1;

      dashboardData.potentialRevenue +=
        Math.floor(
          lead.value * 0.35
        );


      addLeadToFeed(
        lead
      );

      updateDashboard();

    }

  },
  18000
);


/* =========================================================
   19. INITIALIZE
   ========================================================= */

updateDashboard();


/* =========================================================
   20. CONSOLE BRANDING
   ========================================================= */

console.log(
  "%c LEADRESCUE AI ",
  "background:#caff3d;color:#071008;font-weight:900;padding:6px 10px;border-radius:5px;"
);

console.log(
  "AI Lead Recovery Command Center — Demo Environment"
);
