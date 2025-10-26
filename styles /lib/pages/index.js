import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  const [videos, setVideos] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");

  // Check if user is logged in
  useEffect(() => {
    setUser(supabase.auth.user());
  }, []);

  // Sign up
  const signup = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert("Check your email to confirm signup!");
  };

  // Login
  const login = async () => {
    const { error } = await supabase.auth.signIn({ email, password });
    if (error) alert(error.message);
    else setUser(supabase.auth.user());
  };

  // Logout
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // Fetch chat messages
  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .order("created_at");
      setMessages(data);
    };
    fetchMessages();

    // Listen for new messages
    const sub = supabase
      .from("messages")
      .on("INSERT", payload => setMessages(prev => [...prev, payload.new]))
      .subscribe();

    return () => supabase.removeSubscription(sub);
  }, []);

  // Send chat message
  const sendMessage = async () => {
    if (!newMsg || !user) return;
    await supabase
      .from("messages")
      .insert([{ user_email: user.email, content: newMsg }]);
    setNewMsg("");
  };

  // Fetch videos
  useEffect(() => {
    const fetchVideos = async () => {
      const { data } = await supabase.from("videos").select("*");
      setVideos(data);
    };
    fetchVideos();
  }, []);

  // Add video
  const addVideo = async () => {
    if (!videoUrl || !videoTitle) return;
    await supabase.from("videos").insert([{ url: videoUrl, title: videoTitle }]);
    setVideos([...videos, { url: videoUrl, title: videoTitle }]);
    setVideoUrl("");
    setVideoTitle("");
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {!user ? (
        <div className="flex flex-col items-center">
          <input
            className="border p-2 m-2"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            className="border p-2 m-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div>
            <button
              className="bg-blue-500 text-white p-2 m-2"
              onClick={signup}
            >
              Sign Up
            </button>
            <button
              className="bg-green-500 text-white p-2 m-2"
              onClick={login}
            >
              Login
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <div><b>User:</b> {user.email}</div>
            <button className="bg-red-500 text-white p-2" onClick={logout}>
              Logout
            </button>
          </div>

          {/* Chat Section */}
          <div className="border p-2 mb-6">
            <h2 className="font-bold mb-2">Chat</h2>
            <div className="border h-64 overflow-y-scroll p-2 mb-2">
              {messages.map(msg => (
                <div key={msg.id}>
                  <b>{msg.user_email}:</b> {msg.content}
                </div>
              ))}
            </div>
            <div className="flex">
              <input
                className="border p-2 flex-grow"
                value={newMsg}
                onChange={e => setNewMsg(e.target.value)}
                placeholder="Type a message..."
              />
              <button
                className="bg-blue-500 text-white p-2 ml-2"
                onClick={sendMessage}
              >
                Send
              </button>
            </div>
          </div>

          {/* Video Section */}
          <div className="border p-2">
            <h2 className="font-bold mb-2">Videos</h2>
            <div className="flex mb-2">
              <input
                className="border p-2 mr-2 flex-grow"
                placeholder="YouTube URL"
                value={videoUrl}
                onChange={e => setVideoUrl(e.target.value)}
              />
              <input
                className="border p-2 mr-2 flex-grow"
                placeholder="Title"
                value={videoTitle}
                onChange={e => setVideoTitle(e.target.value)}
              />
              <button
                className="bg-green-500 text-white p-2"
                onClick={addVideo}
              >
                Add
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {videos.map((v, i) => (
                <div key={i} className="border p-2">
                  <iframe
                    className="w-full h-64"
                    src={v.url.replace("watch?v=", "embed/")}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                  <div className="mt-2 font-bold">{v.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
