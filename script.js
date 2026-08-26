 /* =========================================================
   LEADRESCUE AI V3
   COMPLETE INTERACTIVE DEMO
   ========================================================= */

"use strict";

/* =========================================================
   STATE
   ========================================================= */

const state = {

  leads: 247,

  risk: 31,

  recovered: 86,

  appointments: 42,

  potentialRevenue: 38940,

  recoveredRevenue: 24680

};


/* =========================================================
   SAMPLE LEADS
   ========================================================= */

const sampleLeads = [

  {
    name: "Alex Morgan",
    initials: "AM",
    source: "Website enquiry",
    value: 1450
  },

  {
    name: "Taylor Reed",
    initials: "TR",
    source: "Missed call",
    value: 900
  },

  {
    name: "Chris Evans",
    initials: "CE",
    source: "Appointment request",
    value: 2100
  },

  {
    name: "Jamie Patel",
    initials: "JP",
    source: "Facebook enquiry",
    value: 750
  },

  {
    name: "Morgan Wilson",
    initials: "MW",
    source: "Online enquiry",
    value: 1250
  },

  {
    name: "Daniel Carter",
    initials: "DC",
    source: "Missed enquiry",
    value: 1800

  }

];


/* =========================================================
   HELPERS
   ========================================================= */

function $(id) {
  return document.getElementById(id);
}


function money(value) {

  return "$" +
    Math.round(value)
      .toLocaleString("en-US");

}


function num(value) {

  return Math.round(value)
    .toLocaleString("en-US");

}


/* =========================================================
   ELEMENTS
   ========================================================= */

const simulateLeadBtn =
  $("simulateLead");

const openDemoBtn =
  $("openDemo");

const heroDemoBtn =
  $("heroDemo");

const roiDemoBtn =
  $("roiDemo");

const offerDemoBtn =
  $("offerDemo");

const modal =
  $("demoModal");

const closeModalBtn =
  $("closeModal");

const demoForm =
  $("demoForm");

const successMessage =
  $("successMessage");

const leadFeed =
  $("leadFeed");


/* =========================================================
   DASHBOARD ELEMENTS
   ========================================================= */

const totalLeads =
  $("totalLeads");

const atRisk =
  $("atRisk");

const totalRecovered =
  $("totalRecovered");

const totalAppointments =
  $("totalAppointments");

const potentialRevenue =
  $("potentialRevenue");

const recoveredRevenue =
  $("recoveredRevenue");

const heroRecovered =
  $("heroRecovered");


/* =========================================================
   ROI ELEMENTS
   ========================================================= */

const industry =
  $("industry");

const leadSlider =
  $("leadSlider");

const valueSlider =
  $("valueSlider");

const recoverySlider =
  $("recoverySlider");

const leadSliderValue =
  $("leadSliderValue");

const valueSliderValue =
  $("valueSliderValue");

const recoverySliderValue =
  $("recoverySliderValue");

const roiRevenue =
  $("roiRevenue");

const roiMultiple =
  $("roiMultiple");


/* =========================================================
   UPDATE DASHBOARD
   ========================================================= */

function updateDashboard() {

  if (totalLeads) {

    totalLeads.textContent =
      num(state.leads);

  }

  if (atRisk) {

    atRisk.textContent =
      num(state.risk);

  }

  if (totalRecovered) {

    totalRecovered.textContent =
      num(state.recovered);

  }

  if (totalAppointments) {

    totalAppointments.textContent =
      num(state.appointments);

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
      num(state.recovered);

  }

}


/* =========================================================
   ROI CALCULATOR
   ========================================================= */

function calculateROI() {

  if (
    !leadSlider ||
    !valueSlider ||
    !recoverySlider
  ) {

    return;

  }


  const leads =
    Number(leadSlider.value);

  const customerValue =
    Number(valueSlider.value);

  const recoveryRate =
    Number(recoverySlider.value);


  /*
    Estimated recoverable revenue.

    This is an illustrative calculation,
    not a guarantee of business results.
  */

  const recoverableCustomers =
    leads *
    (recoveryRate / 100);


  const monthlyRevenue =
    recoverableCustomers *
    customerValue;


  const multiple =
    monthlyRevenue / 2997;


  leadSliderValue.textContent =
    num(leads);


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
   ROI SLIDERS
   ========================================================= */

[
  leadSlider,
  valueSlider,
  recoverySlider,
  industry
].forEach(control => {

  if (!control) return;

  control.addEventListener(
    "input",
    calculateROI
  );

  control.addEventListener(
    "change",
    calculateROI
  );

});


/* =========================================================
   INDUSTRY PRESETS
   ========================================================= */

const industryPresets = {

  general: {
    value: 1000,
    recovery: 10
  },

  clinic: {
    value: 1200,
    recovery: 10
  },

  law: {
    value: 2500,
    recovery: 8
  },

  realestate: {
    value: 5000,
    recovery: 5
  },

  home: {
    value: 850,
    recovery: 12
  }

};


if (industry) {

  industry.addEventListener(
    "change",
    function () {

      const preset =
        industryPresets[
          industry.value
        ];

      if (!preset) return;


      valueSlider.value =
        preset.value;

      recoverySlider.value =
        preset.recovery;


      calculateROI();

    }
  );

}


/* =========================================================
   CREATE LEAD
   ========================================================= */

function createLead() {

  const base =
    sampleLeads[
      Math.floor(
        Math.random() *
        sampleLeads.length
      )
    ];


  return {

    name: base.name,

    initials: base.initials,

    source: base.source,

    value:
      base.value +
      Math.floor(
        Math.random() * 500
      )

  };

}


/* =========================================================
   ADD LEAD
   ========================================================= */

function addLead(lead) {

  if (!leadFeed) return;


  const row =
    document.createElement("div");

  row.className =
    "lead";


  row.innerHTML = `

    <div class="lead-avatar">
      ${lead.initials}
    </div>

    <div class="lead-details">

      <strong>
        ${lead.name}
      </strong>

      <small>
        ${lead.source} • just now
      </small>

      <div class="tags">

        <span class="green">
          AI RESPONDED
        </span>

        <span>
          RECOVERED
        </span>

      </div>

    </div>

    <b>
      ${money(lead.value)}
    </b>

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
    leadFeed.querySelectorAll(".lead");


  if (rows.length > 6) {

    rows[rows.length - 1].remove();

  }

}


/* =========================================================
   SIMULATE LEAD
   ========================================================= */

function simulateLead() {

  const lead =
    createLead();


  state.leads += 1;

  state.recovered += 1;

  state.appointments += 1;

  state.risk =
    Math.max(
      0,
      state.risk - 1
    );


  state.potentialRevenue +=
    lead.value;


  state.recoveredRevenue +=
    lead.value;


  addLead(lead);

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

  if (!modal) return;


  modal.classList.add("show");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );


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

  if (!modal) return;


  modal.classList.remove(
    "show"
  );


  modal.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.style.overflow =
    "";

}


/* =========================================================
   OPEN MODAL BUTTONS
   ========================================================= */

[
  openDemoBtn,
  heroDemoBtn,
  roiDemoBtn,
  offerDemoBtn
].forEach(button => {

  if (!button) return;

  button.addEventListener(
    "click",
    openModal
  );

});


/* =========================================================
   CLOSE MODAL
   ========================================================= */

if (closeModalBtn) {

  closeModalBtn.addEventListener(
    "click",
    closeModal
  );

}


if (modal) {

  modal.addEventListener(
    "click",
    function (event) {

      if (
        event.target === modal
      ) {

        closeModal();

      }

    }
  );

}


document.addEventListener(
  "keydown",
  function (event) {

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
   FORM SUBMISSION
   ========================================================= */

if (demoForm) {

  demoForm.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();


      const submitButton =
        demoForm.querySelector(
          "button[type='submit']"
        );


      if (submitButton) {

        submitButton.disabled =
          true;

        submitButton.textContent =
          "Processing...";

      }


      /*
        Frontend demo only.

        No personal data is sent anywhere.
        Connect this form to your backend,
        CRM, email service or webhook before
        using it for real leads.
      */


      setTimeout(
        function () {

          demoForm.style.display =
            "none";


          if (successMessage) {

            successMessage.classList.add(
              "show"
            );

          }


          showToast(
            "✓ Revenue audit request captured"
          );

        },
        850
      );

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
      document.createElement(
        "div"
      );


    toast.id =
      "leadrescueToast";


    Object.assign(
      toast.style,
      {

        position: "fixed",

        right: "18px",

        bottom: "18px",

        zIndex: "300",

        padding: "11px 15px",

        border:
          "1px solid rgba(202,255,61,.25)",

        borderRadius: "8px",

        background: "#0d1a21",

        color: "#caff3d",

        fontSize: "9px",

        fontWeight: "850",

        boxShadow:
          "0 15px 45px rgba(0,0,0,.55)",

        transition:
          "all .25s ease"

      }

    );


    document.body.appendChild(
      toast
    );

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
    setTimeout(
      function () {

        toast.style.opacity =
          "0";

        toast.style.transform =
          "translateY(12px)";

      },
      2800
    );

}


/* =========================================================
   NAVIGATION ACTIVE STATE
   ========================================================= */

const navLinks =
  document.querySelectorAll(
    ".nav-link"
  );


navLinks.forEach(link => {

  link.addEventListener(
    "click",
    function () {

      navLinks.forEach(item => {

        item.classList.remove(
          "active"
        );

      });


      link.classList.add(
        "active"
      );

    }
  );

});


/* =========================================================
   LIVE INDICATOR
   ========================================================= */

const live =
  document.querySelector(
    ".live"
  );


if (live) {

  setInterval(
    function () {

      live.style.opacity =
        ".45";


      setTimeout(
        function () {

          live.style.opacity =
            "1";

        },
        300
      );

    },
    2300
  );

}


/* =========================================================
   DEMO AUTO ACTIVITY
   ========================================================= */

/*
  Sample-data animation only.
*/

setInterval(
  function () {

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
      Math.round(
        lead.value * .25
      );


    addLead(lead);

    updateDashboard();

  },
  18000
);


/* =========================================================
   INITIALIZE
   ========================================================= */

updateDashboard();

calculateROI();


/* =========================================================
   CONSOLE
   ========================================================= */

console.log(
  "%c LEADRESCUE AI V3 ",
  "background:#caff3d;color:#071008;font-weight:900;padding:7px 12px;border-radius:5px;"
);

console.log(
  "Premium AI Lead Recovery Sales Demo"
);

console.log(
  "Demo uses sample data only."
);
