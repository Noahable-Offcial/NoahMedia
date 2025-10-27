import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [videos] = useState([
    { id: 1, title: 'My First Video', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { id: 2, title: 'Funny Moments', url: 'https://www.youtube.com/embed/jNQXAC9IVRw' },
  ]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const channel = supabase
      .channel('public:messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
        setMessages(prev => [...prev, payload.new]);
      })
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, []);

  async function loginWithGoogle() {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  }

  async function sendMessage() {
    if (message.trim() === '') return;
    await supabase.from('messages').insert({ content: message });
    setMessage('');
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      {!user ? (
        <div>
          <h1>Welcome to NoahMedia</h1>
          <button onClick={loginWithGoogle}>Login with Google</button>
        </div>
      ) : (
        <div>
          <h2>Hello, {user.email}</h2>

          <h3>Chat</h3>
          <div style={{ border: '1px solid #ccc', padding: '10px', height: '150px', overflowY: 'scroll' }}>
            {messages.map((msg, i) => (
              <div key={i}>{msg.content}</div>
            ))}
          </div>
          <input
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage}>Send</button>

          <h3>Videos</h3>
          {videos.map(video => (
            <div key={video.id} style={{ marginBottom: '10px' }}>
              <h4>{video.title}</h4>
              <iframe
                width="300"
                height="200"
                src={video.url}
                title={video.title}
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
