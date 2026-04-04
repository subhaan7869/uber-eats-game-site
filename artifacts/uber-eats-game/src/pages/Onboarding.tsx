import { useState, useEffect } from "react";

export interface DriverProfile {
  name: string;
  avatar: string;
  vehicle: string;
  vehicleEmoji: string;
  city: string;
}

interface Props { onComplete: (profile: DriverProfile) => void; }

const AVATARS = ["😊","😎","🧑","👨‍💼","👩‍💼","🧔","👱","🧑‍🦱","👨‍🦰","👩‍🦰","🧑‍🦳","🥷"];
const VEHICLES = [
  { label: "Car",      emoji: "🚗", desc: "Earn more per order" },
  { label: "Scooter",  emoji: "🛵", desc: "Fast in city traffic" },
  { label: "E-Bike",   emoji: "⚡🚲", desc: "Eco-friendly option" },
  { label: "Bicycle",  emoji: "🚲", desc: "Stay fit while earning" },
];
const CITIES = [
  { name: "Nottingham", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { name: "London",     flag: "🇬🇧" },
  { name: "Manchester", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { name: "Birmingham", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
];

type Screen = "splash" | "name" | "avatar" | "vehicle" | "city" | "verify" | "welcome";

export default function Onboarding({ onComplete }: Props) {
  const [screen, setScreen] = useState<Screen>("splash");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [vehicle, setVehicle] = useState<typeof VEHICLES[0] | null>(null);
  const [city, setCity] = useState(CITIES[0]);
  const [verifyStep, setVerifyStep] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);

  function go(s: Screen) {
    setFadeKey(k => k + 1);
    setScreen(s);
  }

  useEffect(() => {
    if (screen !== "verify") return;
    const steps = [
      "Checking identity...",
      "Verifying vehicle details...",
      "Running background check...",
      "Activating driver account...",
    ];
    let i = 0;
    setVerifyStep(0);
    const t = setInterval(() => {
      i++;
      if (i >= steps.length) {
        clearInterval(t);
        setTimeout(() => go("welcome"), 600);
      } else {
        setVerifyStep(i);
      }
    }, 900);
    return () => clearInterval(t);
  }, [screen]);

  const verifySteps = [
    "Checking identity...",
    "Verifying vehicle details...",
    "Running background check...",
    "Activating driver account...",
  ];

  const wrap = (children: React.ReactNode, padded = true) => (
    <div key={fadeKey} style={{
      display: "flex", flexDirection: "column", height: "100vh",
      background: "#111", fontFamily: "'Inter',-apple-system,sans-serif",
      animation: "fadeInUp 0.35s ease",
      ...(padded ? { padding: "0 24px" } : {}),
    }}>
      {children}
      <style>{`
        @keyframes fadeInUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.35} }
        @keyframes badgePop { 0%{transform:scale(0.6);opacity:0}70%{transform:scale(1.08)}100%{transform:scale(1);opacity:1} }
        input:focus{outline:none}
        .chip:hover{filter:brightness(1.1)}
        .chip:active{transform:scale(0.97)}
      `}</style>
    </div>
  );

  // ── Splash ──────────────────────────────────────────────────────────────────
  if (screen === "splash") return wrap(
    <>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0 }}>
        <div style={{ fontSize: 72, marginBottom: 20, filter: "drop-shadow(0 8px 24px rgba(6,193,103,0.4))" }}>🛵</div>
        <div style={{ color: "#06C167", fontWeight: 900, fontSize: 32, letterSpacing: "-0.5px", marginBottom: 6 }}>Uber Eats</div>
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, fontWeight: 400, marginBottom: 48, textAlign: "center", lineHeight: 1.5 }}>
          Deliver food. Earn money.<br />Be your own boss.
        </div>
        {/* Stats row */}
        <div style={{ display: "flex", gap: 12, marginBottom: 40 }}>
          {[["£15+", "Avg/hr"], ["4.9★", "Driver rating"], ["1M+", "UK drivers"]].map(([val, lbl]) => (
            <div key={lbl} style={{ background: "#1e1e1e", borderRadius: 12, padding: "14px 16px", textAlign: "center", flex: 1 }}>
              <div style={{ color: "#06C167", fontWeight: 800, fontSize: 18 }}>{val}</div>
              <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, marginTop: 3 }}>{lbl}</div>
            </div>
          ))}
        </div>
        {/* Perks */}
        {["Work whenever you want", "Get paid weekly", "Keep 100% of tips"].map(p => (
          <div key={p} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, alignSelf: "stretch" }}>
            <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#06C16722", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ color: "#06C167", fontSize: 12, fontWeight: 700 }}>✓</span>
            </div>
            <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 14 }}>{p}</span>
          </div>
        ))}
      </div>
      <div style={{ paddingBottom: 40 }}>
        <button onClick={() => go("name")} style={{ width: "100%", background: "#06C167", border: "none", borderRadius: 14, color: "#fff", fontWeight: 800, fontSize: 17, padding: "17px", cursor: "pointer", marginBottom: 12 }}>
          Get Started →
        </button>
        <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 12, textAlign: "center" }}>
          By continuing you agree to our Terms of Service
        </div>
      </div>
    </>
  );

  // ── Name ────────────────────────────────────────────────────────────────────
  if (screen === "name") return wrap(
    <>
      <div style={{ paddingTop: 60, flex: 1 }}>
        <ProgressBar step={1} total={4} />
        <div style={{ marginTop: 36 }}>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, fontWeight: 600, letterSpacing: "0.6px", textTransform: "uppercase", marginBottom: 8 }}>Step 1 of 4</div>
          <div style={{ color: "#fff", fontWeight: 800, fontSize: 26, marginBottom: 6 }}>What's your name?</div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: 32 }}>This will appear on your driver profile and receipts.</div>

          <label style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Full Name</label>
          <input
            autoFocus
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. James Williams"
            onKeyDown={e => e.key === "Enter" && name.trim().length >= 2 && go("avatar")}
            style={{
              width: "100%", boxSizing: "border-box",
              background: "#1e1e1e", border: "1.5px solid rgba(255,255,255,0.1)",
              borderRadius: 12, padding: "16px 14px",
              color: "#fff", fontSize: 18, fontWeight: 600,
              caretColor: "#06C167",
            }}
          />
          {name.trim().length > 0 && name.trim().length < 2 && (
            <div style={{ color: "#e53935", fontSize: 12, marginTop: 8 }}>Please enter your full name</div>
          )}
        </div>
      </div>
      <div style={{ paddingBottom: 40 }}>
        <button
          onClick={() => go("avatar")}
          disabled={name.trim().length < 2}
          style={{ width: "100%", background: name.trim().length >= 2 ? "#06C167" : "#1e1e1e", border: "none", borderRadius: 14, color: name.trim().length >= 2 ? "#fff" : "rgba(255,255,255,0.2)", fontWeight: 800, fontSize: 17, padding: "17px", cursor: name.trim().length >= 2 ? "pointer" : "default" }}
        >Continue</button>
      </div>
    </>
  );

  // ── Avatar ──────────────────────────────────────────────────────────────────
  if (screen === "avatar") return wrap(
    <>
      <div style={{ paddingTop: 60, flex: 1 }}>
        <ProgressBar step={2} total={4} />
        <div style={{ marginTop: 36 }}>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, fontWeight: 600, letterSpacing: "0.6px", textTransform: "uppercase", marginBottom: 8 }}>Step 2 of 4</div>
          <div style={{ color: "#fff", fontWeight: 800, fontSize: 26, marginBottom: 6 }}>Choose your avatar</div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: 28 }}>Pick how you appear in the app.</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {AVATARS.map(a => (
              <button key={a} className="chip" onClick={() => setAvatar(a)} style={{
                background: avatar === a ? "#06C16722" : "#1e1e1e",
                border: avatar === a ? "2px solid #06C167" : "2px solid transparent",
                borderRadius: 14, padding: "14px 0", fontSize: 30,
                cursor: "pointer", transition: "all 0.15s",
                boxShadow: avatar === a ? "0 0 12px #06C16744" : "none",
              }}>{a}</button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ paddingBottom: 40 }}>
        <button onClick={() => go("vehicle")} disabled={!avatar} style={{ width: "100%", background: avatar ? "#06C167" : "#1e1e1e", border: "none", borderRadius: 14, color: avatar ? "#fff" : "rgba(255,255,255,0.2)", fontWeight: 800, fontSize: 17, padding: "17px", cursor: avatar ? "pointer" : "default" }}>
          Continue
        </button>
      </div>
    </>
  );

  // ── Vehicle ─────────────────────────────────────────────────────────────────
  if (screen === "vehicle") return wrap(
    <>
      <div style={{ paddingTop: 60, flex: 1 }}>
        <ProgressBar step={3} total={4} />
        <div style={{ marginTop: 36 }}>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, fontWeight: 600, letterSpacing: "0.6px", textTransform: "uppercase", marginBottom: 8 }}>Step 3 of 4</div>
          <div style={{ color: "#fff", fontWeight: 800, fontSize: 26, marginBottom: 6 }}>Your delivery vehicle</div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: 28 }}>Choose how you'll make deliveries.</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {VEHICLES.map(v => {
              const sel = vehicle?.label === v.label;
              return (
                <button key={v.label} className="chip" onClick={() => setVehicle(v)} style={{
                  background: sel ? "#06C16714" : "#1e1e1e",
                  border: sel ? "2px solid #06C167" : "2px solid rgba(255,255,255,0.06)",
                  borderRadius: 14, padding: "14px 16px",
                  display: "flex", alignItems: "center", gap: 14,
                  cursor: "pointer", transition: "all 0.15s", textAlign: "left",
                }}>
                  <span style={{ fontSize: 32, lineHeight: 1, minWidth: 40, textAlign: "center" }}>{v.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>{v.label}</div>
                    <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, marginTop: 2 }}>{v.desc}</div>
                  </div>
                  <div style={{
                    width: 22, height: 22, borderRadius: "50%",
                    border: `2px solid ${sel ? "#06C167" : "rgba(255,255,255,0.15)"}`,
                    background: sel ? "#06C167" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    {sel && <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>✓</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div style={{ paddingBottom: 40 }}>
        <button onClick={() => go("city")} disabled={!vehicle} style={{ width: "100%", background: vehicle ? "#06C167" : "#1e1e1e", border: "none", borderRadius: 14, color: vehicle ? "#fff" : "rgba(255,255,255,0.2)", fontWeight: 800, fontSize: 17, padding: "17px", cursor: vehicle ? "pointer" : "default" }}>
          Continue
        </button>
      </div>
    </>
  );

  // ── City ────────────────────────────────────────────────────────────────────
  if (screen === "city") return wrap(
    <>
      <div style={{ paddingTop: 60, flex: 1 }}>
        <ProgressBar step={4} total={4} />
        <div style={{ marginTop: 36 }}>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, fontWeight: 600, letterSpacing: "0.6px", textTransform: "uppercase", marginBottom: 8 }}>Step 4 of 4</div>
          <div style={{ color: "#fff", fontWeight: 800, fontSize: 26, marginBottom: 6 }}>Select your city</div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: 28 }}>We'll match you with orders in your area.</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {CITIES.map(c => {
              const sel = city.name === c.name;
              return (
                <button key={c.name} className="chip" onClick={() => setCity(c)} style={{
                  background: sel ? "#06C16714" : "#1e1e1e",
                  border: sel ? "2px solid #06C167" : "2px solid rgba(255,255,255,0.06)",
                  borderRadius: 13, padding: "14px 16px",
                  display: "flex", alignItems: "center", gap: 12,
                  cursor: "pointer", transition: "all 0.15s", textAlign: "left",
                }}>
                  <span style={{ fontSize: 24 }}>{c.flag}</span>
                  <span style={{ color: "#fff", fontWeight: 600, fontSize: 16, flex: 1 }}>{c.name}</span>
                  <div style={{
                    width: 22, height: 22, borderRadius: "50%",
                    border: `2px solid ${sel ? "#06C167" : "rgba(255,255,255,0.15)"}`,
                    background: sel ? "#06C167" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    {sel && <span style={{ color: "#fff", fontSize: 12 }}>✓</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div style={{ paddingBottom: 40 }}>
        <button onClick={() => go("verify")} style={{ width: "100%", background: "#06C167", border: "none", borderRadius: 14, color: "#fff", fontWeight: 800, fontSize: 17, padding: "17px", cursor: "pointer" }}>
          Submit Application
        </button>
      </div>
    </>
  );

  // ── Verify ──────────────────────────────────────────────────────────────────
  if (screen === "verify") return wrap(
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0 }}>
      {/* Spinner */}
      <div style={{ width: 72, height: 72, borderRadius: "50%", border: "3px solid rgba(255,255,255,0.06)", borderTop: "3px solid #06C167", animation: "spin 0.9s linear infinite", marginBottom: 32 }} />
      <div style={{ color: "#fff", fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Verifying your account</div>
      <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: 40 }}>This only takes a moment...</div>

      <div style={{ alignSelf: "stretch", display: "flex", flexDirection: "column", gap: 12 }}>
        {verifySteps.map((step, i) => {
          const done = i < verifyStep;
          const active = i === verifyStep;
          return (
            <div key={step} style={{ display: "flex", alignItems: "center", gap: 12, opacity: i > verifyStep ? 0.2 : 1, transition: "opacity 0.4s" }}>
              <div style={{
                width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
                background: done ? "#06C167" : active ? "#06C16733" : "rgba(255,255,255,0.05)",
                border: active ? "2px solid #06C167" : "2px solid transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                animation: active ? "pulse 1s ease-in-out infinite" : "none",
              }}>
                {done && <span style={{ color: "#fff", fontSize: 13 }}>✓</span>}
                {active && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#06C167" }} />}
              </div>
              <span style={{ color: done ? "#06C167" : active ? "#fff" : "rgba(255,255,255,0.4)", fontWeight: done || active ? 600 : 400, fontSize: 14, transition: "color 0.3s" }}>{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ── Welcome ─────────────────────────────────────────────────────────────────
  if (screen === "welcome") return wrap(
    <>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: 16, color: "#06C167", fontWeight: 700, marginBottom: 24, letterSpacing: "0.5px" }}>APPLICATION APPROVED ✓</div>

        {/* Profile card */}
        <div style={{
          background: "linear-gradient(135deg,#1a1a1a,#222)",
          border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "28px 24px",
          alignSelf: "stretch", marginBottom: 28,
          animation: "badgePop 0.5s ease",
        }}>
          {/* Avatar + name */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#06C16722", border: "2px solid #06C167", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34 }}>
              {avatar}
            </div>
            <div>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: 22 }}>{name}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#06C167" }} />
                <span style={{ color: "#06C167", fontWeight: 600, fontSize: 12 }}>Active Driver</span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { label: "Vehicle", value: `${vehicle?.emoji} ${vehicle?.label}` },
              { label: "City",    value: `${city.flag} ${city.name}` },
              { label: "Rank",    value: "🔵 Blue (Starter)" },
              { label: "Status",  value: "✅ Verified & Active" },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>{label}</span>
                <span style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rank badge */}
        <div style={{ background: "linear-gradient(135deg,#0277BD,#4FC3F7)", borderRadius: 14, padding: "14px 20px", alignSelf: "stretch", display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 28 }}>🔵</span>
          <div>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 15 }}>Blue Rank — Start earning your way up</div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, marginTop: 2 }}>Complete 10 trips to reach Gold</div>
          </div>
        </div>
      </div>

      <div style={{ paddingBottom: 40 }}>
        <button
          onClick={() => onComplete({ name: name.trim(), avatar, vehicle: vehicle!.label, vehicleEmoji: vehicle!.emoji, city: city.name })}
          style={{ width: "100%", background: "#06C167", border: "none", borderRadius: 14, color: "#fff", fontWeight: 800, fontSize: 18, padding: "18px", cursor: "pointer" }}
        >
          Start Driving 🚗
        </button>
      </div>
    </>
  );

  return null;
}

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i < step ? "#06C167" : "rgba(255,255,255,0.1)", transition: "background 0.3s" }} />
      ))}
    </div>
  );
}
