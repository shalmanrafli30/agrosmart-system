'use client';
import React, { useEffect, useState, useRef } from 'react';
import { MoreVertical, Trash2 } from 'lucide-react';
import { BsPencilSquare } from "react-icons/bs";
import { PiPencilSimpleLineFill } from "react-icons/pi";
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import Modal from './modal';

dayjs.extend(localizedFormat);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('Asia/Jakarta');

interface HistoryItem {
  id: number;
  title: string;
  created_at: string;
}

type Category = 'Hari Ini' | 'Kemarin' | 'Hari Sebelumnya';

export default function RiwayatChat({
  onSelectChat,
  onAddNewChat,
  selectedChatTitle,
  shouldRefresh,
  onRefreshDone,
  isUserLoggedIn,
}: {
  onSelectChat: (title: string) => void;
  onAddNewChat: () => void;
  selectedChatTitle: string | null;
  shouldRefresh: boolean;
  onRefreshDone: () => void;
  isUserLoggedIn: boolean;
}) {
  const [history, setHistory] = useState<Record<Category, HistoryItem[]>>({
    'Hari Ini': [],
    'Kemarin': [],
    'Hari Sebelumnya': [],
  });

  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [dropdownChatTitle, setDropdownChatTitle] = useState<string | null>(null);
  const [editingTitleId, setEditingTitleId] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState('');
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [chatToDelete, setChatToDelete] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutsideDropdown = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null);
        setDropdownChatTitle(null);
      }
    };

    const handleClickOutsideModal = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        cancelDelete();
      }
    };

    document.addEventListener('mousedown', handleClickOutsideDropdown);
    document.addEventListener('mousedown', handleClickOutsideModal);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideDropdown);
      document.removeEventListener('mousedown', handleClickOutsideModal);
    };
  }, [showDeleteConfirm]);

  const fetchHistory = async () => {
    if (!isUserLoggedIn) {
      setHistory({
        'Hari Ini': [],
        'Kemarin': [],
        'Hari Sebelumnya': [],
      });
      onRefreshDone();
      return;
    }

    try {
      // === PERUBAHAN DI SINI: Mengambil 'token' ===
      const token = localStorage.getItem('token'); // Mengubah dari 'authToken' menjadi 'token'
      const headers: HeadersInit = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch('http://localhost:8000/api/chat/names', { headers });

      if (res.status === 401) {
          console.warn('Tidak dapat memuat riwayat chat: Pengguna tidak terautentikasi (401).');
          setHistory({
            'Hari Ini': [],
            'Kemarin': [],
            'Hari Sebelumnya': [],
          });
          onRefreshDone();
          return;
      }

      const data: { name_chat: string; created_at?: string; id?: number }[] = await res.json();

      const newGroupedHistory: Record<Category, HistoryItem[]> = {
        'Hari Ini': [],
        'Kemarin': [],
        'Hari Sebelumnya': [],
      };

      const todayInTargetTimezone = dayjs().tz('Asia/Jakarta').startOf('day');
      const yesterdayInTargetTimezone = dayjs().tz('Asia/Jakarta').subtract(1, 'day').startOf('day');

      data.forEach((d, index) => {
        if (!d.name_chat || d.name_chat.trim().length === 0) return;

        const createdAt = d.created_at ? dayjs(d.created_at).tz('Asia/Jakarta', true) : dayjs().tz('Asia/Jakarta');

        let category: Category;
        if (createdAt.isSame(todayInTargetTimezone, 'day')) {
          category = 'Hari Ini';
        } else if (createdAt.isSame(yesterdayInTargetTimezone, 'day')) {
          category = 'Kemarin';
        } else {
          category = 'Hari Sebelumnya';
        }

        newGroupedHistory[category].push({
          id: d.id || index,
          title: d.name_chat,
          created_at: d.created_at || dayjs().toISOString(),
        });
      });

      Object.keys(newGroupedHistory).forEach(cat => {
        newGroupedHistory[cat as Category].sort((a, b) =>
          dayjs(b.created_at).valueOf() - dayjs(a.created_at).valueOf()
        );
      });

      setHistory(newGroupedHistory);
      setOpenDropdownId(null);
      setDropdownChatTitle(null);
      onRefreshDone();
    } catch (err) {
      console.error('Gagal memuat riwayat:', err);
      onRefreshDone();
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [isUserLoggedIn]);

  useEffect(() => {
    if (shouldRefresh) {
      fetchHistory();
    }
  }, [shouldRefresh]);

  const handleSelect = (title: string) => {
    if (dropdownChatTitle !== title) {
      onSelectChat(title);
    }
  };

  const toggleDropdown = (id: number, title: string) => {
    if (openDropdownId === id) {
      setOpenDropdownId(null);
      setDropdownChatTitle(null);
    } else {
      setOpenDropdownId(id);
      setDropdownChatTitle(title);
    }
  };

  const handleDelete = async (title: string) => {
    if (!isUserLoggedIn) {
        alert('Anda harus login untuk menghapus riwayat chat.');
        return;
    }
    try {
      // === PERUBAHAN DI SINI: Mengambil 'token' ===
      const token = localStorage.getItem('token'); // Mengubah dari 'authToken' menjadi 'token'
      const headers: HeadersInit = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(`http://localhost:8000/api/chat/history/${encodeURIComponent(title)}`, {
        method: 'DELETE',
        headers
      });
      if (!res.ok) {
        alert('Gagal menghapus riwayat chat');
        return;
      }
      await fetchHistory();
      setShowDeleteConfirm(false);
      setChatToDelete(null);
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat menghapus chat');
    }
  };

  const confirmDelete = (title: string) => {
    setChatToDelete(title);
    setShowDeleteConfirm(true);
    setOpenDropdownId(null);
    setDropdownChatTitle(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setChatToDelete(null);
  };

  const submitRename = async (oldTitle: string) => {
    if (!isUserLoggedIn) {
        alert('Anda harus login untuk mengganti nama chat.');
        setEditingTitleId(null);
        return;
    }

    const newName = editingValue.trim();
    if (!newName || newName === oldTitle) {
      setEditingTitleId(null);
      return;
    }

    try {
      // === PERUBAHAN DI SINI: Mengambil 'token' ===
      const token = localStorage.getItem('token'); // Mengubah dari 'authToken' menjadi 'token'
      const headers: HeadersInit = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(`http://localhost:8000/api/chat/rename-chat/${encodeURIComponent(oldTitle)}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({ newName }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        if (res.status === 422 && errorData.error === 'Nama chat sudah digunakan oleh Anda') {
          alert('Nama chat sudah digunakan. Mohon gunakan nama lain.');
        } else {
          alert('Gagal mengganti nama chat');
        }
        return;
      }

      await fetchHistory();

      if (selectedChatTitle === oldTitle) {
        onSelectChat(newName);
      }

      setEditingTitleId(null);
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat mengganti nama chat');
    }
  };

  return (
    <div className="flex-1 overflow-y-auto space-y-6 text-sm">
      <div className="flex items-center justify-between mb-2 pl-4 pr-4 pt-4">
        <h2 className="font-semibold text-lg">Riwayat Chat</h2>
        {isUserLoggedIn && (
          <button className="text-black" title="Chat baru" onClick={onAddNewChat}>
            <BsPencilSquare size={20} />
          </button>
        )}
      </div>

      {!isUserLoggedIn && (
        <p className="text-gray-400 pl-4 pr-4">Login untuk melihat dan menyimpan riwayat chat Anda.</p>
      )}

      {isUserLoggedIn && (
        (Object.keys(history) as Category[]).map(category => {
          const chats = history[category] || [];
          const validChats = chats.filter(chat => chat.title.trim().length > 0);

          return (
            <div key={category}>
              <div className="flex items-center justify-between mb-2 pl-4 pr-4">
                <h2 className="font-semibold text-lg">{category}</h2>
              </div>

              <div className="space-y-1">
                {validChats.length === 0 ? (
                  <p className="text-gray-400 pl-4 pr-4">Belum ada chat di kategori ini.</p>
                ) : (
                  validChats.map(chat => (
                    <div
                      key={chat.id}
                      onClick={() => handleSelect(chat.title)}
                      className={`group flex items-center justify-between py-2 rounded-lg cursor-pointer pr-4 pl-4
                        ${(selectedChatTitle === chat.title || dropdownChatTitle === chat.title)
                          ? 'bg-gray-300 font-medium'
                          : 'hover:bg-gray-200'
                        }`}
                    >
                      {editingTitleId === chat.id ? (
                        <input
                          autoFocus
                          value={editingValue}
                          onChange={(e) => setEditingValue(e.target.value)}
                          onBlur={() => submitRename(chat.title)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') submitRename(chat.title);
                            if (e.key === 'Escape') setEditingTitleId(null);
                          }}
                          className="w-full bg-white px-2 py-1 rounded border border-gray-300 text-sm"
                        />
                      ) : (
                        <span className="truncate max-w-[calc(100%-40px)]">{chat.title}</span>
                      )}

                      <div onClick={e => e.stopPropagation()} className="relative">
                        <button
                          className={`transition ${openDropdownId === chat.id
                            ? 'opacity-100'
                            : 'opacity-0 group-hover:opacity-100'
                            }`}
                          onClick={() => toggleDropdown(chat.id, chat.title)}
                          aria-label="Menu"
                        >
                          <MoreVertical size={16} />
                        </button>

                        {openDropdownId === chat.id && (
                          <div
                            ref={dropdownRef}
                            className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg text-sm z-10 p-1"
                          >
                            <button
                              onClick={() => {
                                setEditingTitleId(chat.id);
                                setEditingValue(chat.title);
                                setOpenDropdownId(null);
                                setDropdownChatTitle(null);
                              }}
                              className="flex items-center w-full px-3 py-2 text-gray-800 rounded-md hover:bg-gray-100"
                            >
                              <PiPencilSimpleLineFill size={18} className="mr-2 text-black" /> Ganti Nama
                            </button>
                            <button
                              onClick={() => confirmDelete(chat.title)}
                              className="flex items-center w-full px-3 py-2 text-red-600 rounded-md hover:bg-red-50"
                            >
                              <Trash2 size={18} className="mr-2" /> Hapus
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })
      )}
      {showDeleteConfirm && (
        <Modal>
          <div className="fixed top-0 left-0 w-screen h-screen z-[9999] bg-black bg-opacity-60 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4 relative" ref={modalRef}>
              <button
                onClick={cancelDelete}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                aria-label="Tutup"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h3 className="text-lg font-bold mb-4">Hapus Percakapan?</h3>
              <p className="text-sm text-gray-700 mb-6">Apakah Anda yakin ingin menghapus percakapan ini?</p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Tidak
                </button>
                <button
                  onClick={() => chatToDelete && handleDelete(chatToDelete)}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </Modal>

      )}
    </div>
  );
}