// chatbot/page.tsx
'use client';
import { useState, useRef, useEffect } from 'react';
import Bot from '../assets/profil-chatbot.svg';
import User from '../assets/photo-user.svg';
import { BsSend } from "react-icons/bs";
import RiwayatChat from './riwayat-chat/riwayatChat';
import { useRouter } from 'next/navigation';

export default function ChatbotPage() {
  type Message = { role: 'user' | 'bot'; text: string };

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [selectedChatTitle, setSelectedChatTitle] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [shouldRefreshHistory, setShouldRefreshHistory] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // State untuk status login
  const router = useRouter(); // Inisialisasi router

  // Cek status login saat komponen di-mount
  useEffect(() => {
    // === PERUBAHAN DI SINI: Mengambil 'token' ===
    const token = localStorage.getItem('token'); // Mengubah dari 'authToken' menjadi 'token'
    if (!token) {
      router.push('/login');
    } else {
      setIsUserLoggedIn(true);
    }
  }, [router]);

  const handleSelectChatFromSidebar = (title: string) => {
    setSelectedChatTitle(title);
  };

  useEffect(() => {
    if (!selectedChatTitle || !isUserLoggedIn) return;

    (async () => {
      try {
        // === PERUBAHAN DI SINI: Mengambil 'token' ===
        const token = localStorage.getItem('token'); // Mengubah dari 'authToken' menjadi 'token'
        const headers: HeadersInit = { 'Content-Type': 'application/json' };
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const res = await fetch(
          `http://localhost:8000/api/chat/history/${encodeURIComponent(selectedChatTitle)}`,
          { headers }
        );

        if (res.status === 401) {
            console.warn('Sesi habis atau tidak terautentikasi, mengarahkan ke login.');
            // === PERUBAHAN DI SINI: Menghapus 'token' ===
            localStorage.removeItem('token'); // Mengubah dari 'authToken' menjadi 'token'
            localStorage.removeItem('user');
            router.push('/login');
            return;
        }

        if (!res.ok) {
            const errorText = await res.text();
            console.error('Gagal mengambil isi chat:', res.status, errorText);
            throw new Error(`Gagal mengambil isi chat: ${res.statusText}`);
        }
        const data = await res.json();

        const hydrated: Message[] = data.flatMap((item: any) => [
          { role: 'user', text: item.message },
          { role: 'bot', text: item.response },
        ]);

        setMessages(hydrated);
      } catch (err) {
        console.error(err);
        setMessages([{ role: 'bot', text: 'Gagal memuat isi chat. Pastikan Anda login atau API publik.' }]);
      }
    })();
  }, [selectedChatTitle, isUserLoggedIn, router]);

  const handleSend = async () => {
    if (!input.trim() || !isUserLoggedIn) return;

    const currentInput = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: currentInput }]);

    try {
      const isNewChat = !selectedChatTitle;
      const endpoint = isNewChat
        ? 'http://localhost:8000/api/chat/new'
        : 'http://localhost:8000/api/chat/send';

      // === PERUBAHAN DI SINI: Mengambil 'token' ===
      const token = localStorage.getItem('token'); // Mengubah dari 'authToken' menjadi 'token'
      const headers: HeadersInit = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          message: currentInput,
          name_chat: selectedChatTitle,
        }),
      });

      // Tangani kasus UNAUTHENTICATED (401)
      if (res.status === 401) {
          console.warn('Sesi habis atau tidak terautentikasi, mengarahkan ke login.');
          // === PERUBAHAN DI SINI: Menghapus 'token' ===
          localStorage.removeItem('token'); // Mengubah dari 'authToken' menjadi 'token'
          localStorage.removeItem('user');
          router.push('/login');
          return;
      }

      if (!res.ok) {
          const errorData = await res.json();
          console.error('API Error:', errorData);
          throw new Error(errorData.message || 'Terjadi kesalahan pada server.');
      }

      const data = await res.json();

      const newChatName = data.name_chat || selectedChatTitle;

      if (!selectedChatTitle && newChatName) {
        setSelectedChatTitle(newChatName);
        setShouldRefreshHistory(true);
      }

      setMessages(prev => [...prev, { role: 'bot', text: data.response }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        { role: 'bot', text: 'Terjadi kesalahan saat memproses jawaban. Cek konsol untuk detail.' },
      ]);
    }
  };


  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const handleAddNewChat = () => {
    if (!isUserLoggedIn) return;
    setMessages([]);
    setSelectedChatTitle(null);
    setShouldRefreshHistory(true);
  };

  const handleRefreshHistoryDone = () => {
    setShouldRefreshHistory(false);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Container Sidebar */}
      <div className="flex-none w-[300px] flex flex-col h-full bg-gray-100 border-r border-gray-300">
        <RiwayatChat
          onSelectChat={handleSelectChatFromSidebar}
          onAddNewChat={handleAddNewChat}
          selectedChatTitle={selectedChatTitle}
          shouldRefresh={shouldRefreshHistory}
          onRefreshDone={handleRefreshHistoryDone}
          isUserLoggedIn={isUserLoggedIn}
        />
      </div>

      {/* Area Chat Utama */}
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 min-h-0" ref={chatContainerRef}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className="flex items-start max-w-lg gap-2">
                {msg.role === 'bot' && <div className="text-teal-500 pt-1"><Bot /></div>}
                <div
                  className={`rounded-xl p-4 text-sm shadow ${msg.role === 'user'
                    ? 'bg-gray-200 text-black'
                    : 'bg-gray-100 text-gray-800 border border-gray-200'
                    }`}
                >
                  {msg.text}
                </div>
                {msg.role === 'user' && <div className="text-black pt-1"><User /></div>}
              </div>
            </div>
          ))}
        </div>

        {/* Input area chat */}
        <div className="p-4 border-t border-gray-300 bg-white flex-shrink-0">
          <div className="flex items-center gap-2 border-2 border-teal-400 rounded-xl px-4 py-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 outline-none bg-transparent text-sm"
              placeholder={isUserLoggedIn ? "Tulis Pesan Disini..." : "Login untuk chat..."}
              disabled={!isUserLoggedIn}
            />
            <button
              onClick={handleSend}
              className={`p-2 rounded-md ${isUserLoggedIn ? 'bg-teal-500 hover:bg-teal-600 text-white' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
              disabled={!isUserLoggedIn}
            >
              <BsSend size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}