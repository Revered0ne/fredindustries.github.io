// Username setup
const username = localStorage.getItem("fred_username") || "Employee";
const welcomeText = document.getElementById("welcomeText");
const systemInfo = document.getElementById("systemInfo");
const contentFrame = document.getElementById("contentFrame");

// Typewriter welcome message
let i = 0;
const message = `Welcome, ${username}`;
function typeWriter() {
  if (i < message.length) {
    welcomeText.textContent += message.charAt(i);
    i++;
    setTimeout(typeWriter, 60);
  } else {
    startSessionTimer();
    loadSystemFeed();
  }
}
typeWriter();

// -------------------------
// SESSION TIMER
// -------------------------
let seconds = 0;
function startSessionTimer() {
  setInterval(() => {
    seconds++;
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    systemInfo.textContent = `SESSION TIME: ${hrs}:${mins}:${secs}`;
  }, 1000);
}

// -------------------------
// SYSTEM STATUS FEED
// -------------------------
const baseSystemUpdates = [
  "{terminal}status[STABLE]",
  "{core}temperature[400K]",
  "{reactor}output[99.8%]",
  "{life_support}oxygen[97%]",
  "{network}latency[2.1ms]",
  "{ai_core}mood[NEUTRAL]",
  "{containment}field[SECURE]",
  "{power_grid}integrity[100%]",
  "{storage_cluster}capacity[74%]",
  "{security}clearance[VERIFIED]",
  "{navigation}pathfinding[OPTIMAL]",
  "{biosphere}pressure[1.02 atm]",
  "{communications}uplink[ACTIVE]",
  "{memory_bank}fragmentation[0.3%]",
  "{employee_registry}checksum[VALID]",
  "{simulation}runtime[OK]",
  "{quantum_node}stability[FIXED]",
  "{coolant_system}flow[93%]",
  "{ventilation}cycle[STABLE]",
  "{gravity_control}field[0.99G]",
  "{hydroponics}yield[112%]",
  "{server_cluster}temp[291K]",
  "{fusion_array}efficiency[98%]",
  "{reactor}coolant_flow[NORMAL]",
  "{sensor_grid}accuracy[99.7%]",
  "{archive}indexing[COMPLETE]",
  "{data_pipeline}latency[LOW]",
  "{biohazard_containers}seal[GREEN]",
  "{terraforming}progress[37%]",
  "{shipyard}queue[ON SCHEDULE]",
  "{android_division}uptime[99.9%]",
  "{docking_bay}traffic[REGULATED]",
  "{research_logs}backup[OK]",
  "{nanofabricator}precision[99.4%]",
  "{genetics_lab}samples[STABLE]",
  "{cognitive_network}signal[CLEAR]",
  "{drone_fleet}status[ONLINE]",
  "{weather_control}output[CALM]",
  "{transport_system}flow[UNOBSTRUCTED]",
  "{resource_monitor}input[STEADY]",
  "{waste_recycling}efficiency[96%]",
  "{timekeeping_unit}sync[ATOMIC]",
  "{biometric_scanner}readings[NORMAL]",
  "{firewall}integrity[MAXIMUM]",
  "{structural_integrity}reading[EXCELLENT]",
  "{audit_log}entries[ZERO ANOMALIES]",
  "{communications_array}bandwidth[GREEN]",
  "{solar_array}output[104%]",
  "{system_core}pulse[STEADY]",
  "{protocol}revision[CURRENT]",
  "{simulation}integrity[STABLE]",
  "{terminal}heartbeat[OK]"
];

// Random number helper
function rand(min, max, decimals = 0) {
  const val = Math.random() * (max - min) + min;
  return decimals > 0 ? val.toFixed(decimals) : Math.round(val);
}

// Generate fluctuating updates dynamically
function generateDynamicUpdate(entry) {
  if (entry.includes("{core}temperature")) return `{core}temperature[${rand(395, 410)}K]`;
  if (entry.includes("{reactor}output")) return `{reactor}output[${rand(98, 100, 1)}%]`;
  if (entry.includes("{life_support}oxygen")) return `{life_support}oxygen[${rand(95, 100)}%]`;
  if (entry.includes("{network}latency")) return `{network}latency[${rand(1, 3, 1)}ms]`;
  if (entry.includes("{storage_cluster}capacity")) return `{storage_cluster}capacity[${rand(70, 80)}%]`;
  if (entry.includes("{coolant_system}flow")) return `{coolant_system}flow[${rand(90, 95)}%]`;
  if (entry.includes("{hydroponics}yield")) return `{hydroponics}yield[${rand(110, 115)}%]`;
  if (entry.includes("{fusion_array}efficiency")) return `{fusion_array}efficiency[${rand(97, 99)}%]`;
  if (entry.includes("{sensor_grid}accuracy")) return `{sensor_grid}accuracy[${rand(99.5, 99.9, 1)}%]`;
  if (entry.includes("{waste_recycling}efficiency")) return `{waste_recycling}efficiency[${rand(95, 97)}%]`;
  if (entry.includes("{server_cluster}temp")) return `{server_cluster}temp[${rand(288, 295)}K]`;
  return entry;
}

// Map system types to color classes
function getSystemClass(entry) {
  if (entry.startsWith("{reactor}")) return "sys-reactor";
  if (entry.startsWith("{core}")) return "sys-core";
  if (entry.startsWith("{network}")) return "sys-network";
  if (entry.startsWith("{security}")) return "sys-security";
  if (entry.startsWith("{ai_core}")) return "sys-ai";
  if (entry.startsWith("{power_grid}")) return "sys-power";
  if (entry.startsWith("{storage_cluster}")) return "sys-storage";
  if (entry.startsWith("{communications}") || entry.startsWith("{communications_array}")) return "sys-comm";
  if (entry.startsWith("{biosphere}")) return "sys-bio";
  return "sys-generic";
}

// Feed generator
function loadSystemFeed() {
  let index = 0;

  const interval = setInterval(() => {
    if (index < baseSystemUpdates.length) {
      appendLine(generateDynamicUpdate(baseSystemUpdates[index]));
      index++;
    } else {
      clearInterval(interval);
      // endless loop of random updates
      setInterval(() => {
        const randEntry = generateDynamicUpdate(
          baseSystemUpdates[Math.floor(Math.random() * baseSystemUpdates.length)]
        );
        appendLine(randEntry);
      }, 4000);
    }
  }, 200);
}

function appendLine(text) {
  const line = document.createElement("p");
  line.className = getSystemClass(text);
  line.textContent = text;
  contentFrame.appendChild(line);
  contentFrame.scrollTop = contentFrame.scrollHeight;
}

// -------------------------
// NAVIGATION
// -------------------------
document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-target");
    const frame = document.getElementById("contentFrame");
    frame.innerHTML = `<p>Loading ${btn.textContent}...</p>`;
    setTimeout(() => {
      window.location.href = target;
    }, 700);
  });
});