import { useState } from "react";
import type { DriverProfile } from "./Onboarding";

interface Props {
  profile: DriverProfile;
  onVerify: (name: string, password: string) => boolean;
}

type Step = "expired" | "form" | "checking" | "done";

export default function DocExpiry({ profile, onVerify }: Props) {
  const [step, setStep] = useState<Step>("expired");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);

  function handleSubmit() {
    const ok = onVerify(name.trim(), password);
    if (!ok) {
      setError("Name or password incorrect. Please try again.");
      return;
    }
    setStep("checking");
    setCountdown(7);
    const iv = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) {
          clearInterval(iv);
          setStep("done");
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  }

  if (step === "expired") return (
    <div style={{
      display: "flex", flexDirection: "column", height: "100vh",
      background: "#111", fontFamily: "'Inter',-apple-system,sans-serif",
      padding: "0 24px", alignItems: "center", justifyContent: "center",
      animation: "fadeInUp 0.35s ease",
    }}>
      <div style={{ fontSize: 64, marginBottom: 20 }}>📋</div>
      <div style={{ color: "#e53935", fontWeight: 900, fontSize: 24, marginBottom: 8, textAlign: "center" }}>Documents Expired</div>
      <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, textAlign: "center", marginBottom: 36, lineHeight: 1.6 }}>
        Your driver documents need to be renewed.<br />
        Please verify your identity to continue.
      </div>
      <div style={{ background: "#1e1e1e", border: "1px solid rgba(229,57,53,0.3)", borderRadius: 14, padding: "16px", alignSelf: "stretch", marginBottom: 28 }}>
        {[
          { icon: "🪪", label: "Driver Licence", status: "EXPIRED" },
          { icon: "🚗", label: "Vehicle Insurance", status: "EXPIRED" },
          { icon: "📄", label: "Right to Work", status: "EXPIRED" },
        ].map(({ icon, label, status }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <span style={{ fontSize: 20 }}>{icon}</span>
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, flex: 1 }}>{label}</span>
            <span style={{ color: "#e53935", fontSize: 11, fontWeight: 700, background: "rgba(229,57,53,0.12)", borderRadius: 5, padding: "2px 7px" }}>{status}</span>
          </div>
        ))}
      </div>
      <button
        onClick={() => setStep("form")}
        style={{ width: "100%", background: "#06C167", border: "none", borderRadius: 14, color: "#fff", fontWeight: 800, fontSize: 17, padding: "17px", cursor: "pointer" }}
      >Verify Identity →</button>
      <style>{`@keyframes fadeInUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );

  if (step === "form") return (
    <div style={{
      display: "flex", flexDirection: "column", height: "100vh",
      background: "#111", fontFamily: "'Inter',-apple-system,sans-serif",
      padding: "0 24px", animation: "fadeInUp 0.35s ease",
    }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontSize: 36, marginBottom: 16 }}>🔐</div>
        <div style={{ color: "#fff", fontWeight: 800, fontSize: 24, marginBottom: 6 }}>Re-verify Identity</div>
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: 32 }}>Enter your account details to renew your documents.</div>

        <label style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Full Name</label>
        <input
          autoFocus
          value={name}
          onChange={e => { setName(e.target.value); setError(""); }}
          placeholder={`e.g. ${profile.name}`}
          style={{
            width: "100%", boxSizing: "border-box",
            background: "#1e1e1e", border: "1.5px solid rgba(255,255,255,0.1)",
            borderRadius: 12, padding: "15px 14px", color: "#fff", fontSize: 16, fontWeight: 600,
            caretColor: "#06C167", marginBottom: 16,
          }}
        />

        <label style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => { setPassword(e.target.value); setError(""); }}
          placeholder="Enter your password"
          onKeyDown={e => e.key === "Enter" && name.trim() && password && handleSubmit()}
          style={{
            width: "100%", boxSizing: "border-box",
            background: "#1e1e1e", border: error ? "1.5px solid #e53935" : "1.5px solid rgba(255,255,255,0.1)",
            borderRadius: 12, padding: "15px 14px", color: "#fff", fontSize: 16, fontWeight: 600,
            caretColor: "#06C167",
          }}
        />
        {error && <div style={{ color: "#e53935", fontSize: 12, marginTop: 8 }}>{error}</div>}
      </div>

      <div style={{ paddingBottom: 40 }}>
        <button
          onClick={handleSubmit}
          disabled={!name.trim() || !password}
          style={{
            width: "100%", background: name.trim() && password ? "#06C167" : "#1e1e1e",
            border: "none", borderRadius: 14,
            color: name.trim() && password ? "#fff" : "rgba(255,255,255,0.2)",
            fontWeight: 800, fontSize: 17, padding: "17px",
            cursor: name.trim() && password ? "pointer" : "default",
          }}
        >Confirm Identity</button>
      </div>

      <style>{`
        @keyframes fadeInUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        input:focus{outline:none;border-color:#06C167!important}
      `}</style>
    </div>
  );

  if (step === "checking") return (
    <div style={{
      display: "flex", flexDirection: "column", height: "100vh",
      background: "#111", fontFamily: "'Inter',-apple-system,sans-serif",
      alignItems: "center", justifyContent: "center", gap: 0,
      animation: "fadeInUp 0.35s ease",
    }}>
      <div style={{ width: 72, height: 72, borderRadius: "50%", border: "3px solid rgba(255,255,255,0.06)", borderTop: "3px solid #06C167", animation: "spin 0.9s linear infinite", marginBottom: 32 }} />
      <div style={{ color: "#fff", fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Processing documents</div>
      <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: 20 }}>Please wait...</div>
      <div style={{ color: "#06C167", fontWeight: 800, fontSize: 36 }}>{countdown}</div>
      <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 12, marginTop: 4 }}>seconds remaining</div>
      <style>{`
        @keyframes fadeInUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      `}</style>
    </div>
  );

  return (
    <div style={{
      display: "flex", flexDirection: "column", height: "100vh",
      background: "#111", fontFamily: "'Inter',-apple-system,sans-serif",
      alignItems: "center", justifyContent: "center", padding: "0 24px",
      animation: "fadeInUp 0.35s ease",
    }}>
      <div style={{ fontSize: 64, marginBottom: 20 }}>✅</div>
      <div style={{ color: "#06C167", fontWeight: 900, fontSize: 24, marginBottom: 8 }}>Documents Renewed!</div>
      <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, textAlign: "center", marginBottom: 36 }}>
        Your documents have been verified and renewed successfully.
      </div>
      <div style={{ color: "rgba(255,255,255,0.2)", fontSize: 13 }}>Redirecting you back to the app...</div>
      <style>{`@keyframes fadeInUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}
