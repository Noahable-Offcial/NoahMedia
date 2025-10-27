import React from "react";

export default function Home() {
  // Discord Login (Supabase-ready)
  const discordLogin = () => {
    const oauthUrl =
      "https://discord.com/oauth2/authorize?client_id=1432404124602732675&response_type=code&redirect_uri=https%3A%2F%2Ftohpkqtsqfjypkbzlyez.supabase.co%2Fauth%2Fv1%2Fcallback&scope=email+identify";
    window.location.href = oauthUrl;
  };

  // Google Login
  const googleLogin = () => {
    const oauthUrl =
      "https://accounts.google.com/o/oauth2/v2/auth?client_id=774479974995-7j35a744l6ll6pq4rejmkdb3edp4de1t.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fgoogle%2Fcallback&response_type=code&scope=openid%20email%20profile";
    window.location.href = oauthUrl;
  };

  // GitHub Login
  const githubLogin = () => {
    const oauthUrl =
      "https://github.com/login/oauth/authorize?client_id=Ov23lidoYXQfnnmKOv4Z&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fgithub%2Fcallback&scope=user:email";
    window.location.href = oauthUrl;
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontFamily: "'Press Start 2P', cursive",
        background:
          "linear-gradient(-45deg, #ff6ec4, #7873f5, #42e695, #f9d423)",
        backgroundSize: "400% 400%",
        animation: "gradientBG 15s ease infinite",
        color: "white",
      }}
    >
      <h1 style={{ fontSize: "48px", marginBottom: "50px", textShadow: "2px 2px #00000088" }}>
        Welcome to NoahMedia
      </h1>

      <button onClick={discordLogin} style={buttonStyle("#7289DA", "#5b6eae")}>
        Sign in with Discord
      </button>

      <button onClick={googleLogin} style={buttonStyle("#DB4437", "#c1351d")}>
        Sign in with Google
      </button>

      <button onClick={githubLogin} style={buttonStyle("#333", "#555")}>
        Sign in with GitHub
      </button>

      <p style={{ marginTop: "40px", fontSize: "14px", color: "#ffffffaa" }}>
        All logins are safe and free! 🎉
      </p>

      <style jsx>{`
        @keyframes gradientBG {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}

// Button style helper
const buttonStyle = (bgColor, hoverColor) => ({
  padding: "15px 40px",
  margin: "15px",
  fontSize: "16px",
  borderRadius: "12px",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
  textShadow: "1px 1px #00000066",
  backgroundColor: bgColor,
  color: "white",
  transition: "all 0.3s ease",
});
