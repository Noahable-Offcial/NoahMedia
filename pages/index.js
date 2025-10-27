import { supabase } from '../lib/supabase';

export default function Home() {

  const handleEmailLogin = async () => {
    const email = prompt("Enter your email:");
    if (!email) return;
    const { data, error } = await supabase.auth.signInWithOtp({ email });
    if (error) alert(error.message);
    else alert("Check your email for the login link!");
  };

  const handlePhoneLogin = async () => {
    const phone = prompt("Enter your phone number (+countrycode):");
    if (!phone) return;
    const { data, error } = await supabase.auth.signInWithOtp({ phone });
    if (error) alert(error.message);
    else alert("Check your phone for the login link!");
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  };

  const handleGitHubLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'github' });
  };

  const unavailableProviders = [
    "Discord", "Apple", "Twitch", "Spotify", "Azure", "Bitbucket",
    "Facebook", "LinkedIn", "Notion", "WorkOS", "Zoom"
  ];

  return (
    <div style={{ fontFamily: "sans-serif", textAlign: "center", padding: "50px", background: "#f0f4f8", minHeight: "100vh" }}>
      
      <h1 style={{ fontSize: "3rem", marginBottom: "10px", color: "#1e40af" }}>Welcome to NoahTube!</h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "40px", color: "#374151" }}>
        Sign up or log in using one of the options below:
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
        {/* Available login buttons */}
        <div>
          <button onClick={handleEmailLogin} style={buttonStyle("#4ade80")}>Login with Email</button>
        </div>
        <div>
          <button onClick={handlePhoneLogin} style={buttonStyle("#facc15")}>Login with Phone</button>
        </div>
        <div>
          <button onClick={handleGoogleLogin} style={buttonStyle("#4285F4")}>Login with Google</button>
        </div>
        <div>
          <button onClick={handleGitHubLogin} style={buttonStyle("#333")}>Login with GitHub</button>
        </div>
      </div>

      {/* Unavailable login methods */}
      <div style={{ marginTop: "50px", display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {unavailableProviders.map(provider => (
          <div key={provider} style={{ background: "#ddd", padding: "15px", borderRadius: "10px", width: "220px" }}>
            <strong>{provider}</strong>
            <p style={{ color: "#666", marginTop: "5px", fontSize: "0.9rem" }}>
              Sorry This Sign In Way Is Unavailable Right Now
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}

// Helper style function
const buttonStyle = (bgColor) => ({
  backgroundColor: bgColor,
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  padding: "15px 25px",
  fontSize: "1rem",
  cursor: "pointer",
  minWidth: "180px",
  transition: "all 0.2s",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
});

