import { useState } from "react";
import Onboarding, { type DriverProfile } from "@/pages/Onboarding";
import Game from "@/pages/Game";

export default function App() {
  const [profile, setProfile] = useState<DriverProfile | null>(null);

  if (!profile) return <Onboarding onComplete={setProfile} />;
  return <Game profile={profile} />;
}
