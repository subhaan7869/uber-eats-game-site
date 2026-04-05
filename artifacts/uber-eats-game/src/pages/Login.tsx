import { useState } from "react";
import type { DriverProfile } from "./Onboarding";

interface Props {
  profile: DriverProfile;
  onLogin: (code: string) => boolean;
}

export default function Login({ profile, onLogin }: Props) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [fadeKey] = useState(0);

  function handleSubmit() {
    const trimmed = code.trim().toUpperCase();
    const ok = onLogin(trimmed);
    if (!ok) {
      setError("Incorrect driver code. Please try again.");
      setCode("");
    }
  }

  return (
    <div key={fadeKey} style={{
      display: "flex", flexDirection: "column", height: "100vh",
      background: "#111", fontFamily: "'Inter',-apple-system,sans-serif",
      padding: "0 24px", animation: "fadeInUp 0.35s ease",
    }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: 64, marginBottom: 20, filter: "drop-shadow(0 8px 24px rgba(6,193,103,0.4))" }}>🛵</div>
        <div style={{ color: "#06C167", fontWeight: 900, fontSize: 28, letterSpacing: "-0.5px", marginBottom: 6 }}>Welcome Back</div>
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: 40, textAlign: "center" }}>
          Enter your driver code to continue
        </div>

        <div style={{ alignSelf: "stretch", background: "#1e1e1e", borderRadius: 16, padding: "20px", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#06C16722", border: "2px solid #06C167", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>
              {profile.avatar}
            </div>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>{profile.name}</div>
              <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 12 }}>{profile.vehicleEmoji} {profile.vehicle} · {profile.city}</div>
            </div>
          </div>

          <label style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Driver Code</label>
          <input
            autoFocus
            value={code}
            onChange={e => { setCode(e.target.value.toUpperCase()); setError(""); }}
            placeholder="DRV-000000"
            onKeyDown={e => e.key === "Enter" && code.trim().length > 0 && handleSubmit()}
            style={{
              width: "100%", boxSizing: "border-box",
              background: "#2a2a2a", border: error ? "1.5px solid #e53935" : "1.5px solid rgba(255,255,255,0.1)",
              borderRadius: 12, padding: "16px 14px",
              color: "#fff", fontSize: 18, fontWeight: 700,
              caretColor: "#06C167", fontFamily: "monospace",
              letterSpacing: "0.1em",
            }}
          />
          {error && <div style={{ color: "#e53935", fontSize: 12, marginTop: 8 }}>{error}</div>}
        </div>
      </div>

      <div style={{ paddingBottom: 40 }}>
        <button
          onClick={handleSubmit}
          disabled={code.trim().length < 3}
          style={{
            width: "100%", background: code.trim().length >= 3 ? "#06C167" : "#1e1e1e",
            border: "none", borderRadius: 14,
            color: code.trim().length >= 3 ? "#fff" : "rgba(255,255,255,0.2)",
            fontWeight: 800, fontSize: 17, padding: "17px", cursor: code.trim().length >= 3 ? "pointer" : "default",
          }}
        >Log In</button>
        <div style={{ color: "rgba(255,255,255,0.2)", fontSize: 12, textAlign: "center", marginTop: 14 }}>
          Your driver code was shown when you signed up
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        input:focus { outline: none; border-color: #06C167 !important; }
      `}</style>
    </div>
  );
}
