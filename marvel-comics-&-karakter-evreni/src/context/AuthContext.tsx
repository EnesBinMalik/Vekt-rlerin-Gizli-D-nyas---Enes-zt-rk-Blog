import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, ReadingStatus, ReadingItem } from '../types/marvel';

interface AuthContextType {
  user: UserProfile | null;
  login: (email: string, pass: string) => { success: boolean; message?: string };
  register: (name: string, email: string, pass: string, avatar: string) => { success: boolean; message?: string };
  logout: () => void;
  toggleFavorite: (characterId: string) => void;
  isFavorite: (characterId: string) => boolean;
  updateReadingList: (comicId: string, status: ReadingStatus, userRating?: number) => void;
  removeFromReadingList: (comicId: string) => void;
  getReadingItem: (comicId: string) => ReadingItem | undefined;
  loginAsDemo: (profileName: 'enes' | 'peter' | 'wanda') => void;
  allUsers: UserProfile[];
}

const STORAGE_KEY_USER = 'marvel_auth_current_user_v1';
const STORAGE_KEY_ALL_USERS = 'marvel_auth_registered_users_v1';

const INITIAL_DEMO_USERS: UserProfile[] = [
  {
    id: 'user-enes-ozturk',
    name: 'Enes Öztürk',
    email: 'enes@marvel.app',
    avatar: 'ironman',
    favorites: ['char-ironman', 'char-spiderman', 'char-thor', 'char-wolverine'],
    readingList: [
      { comicId: 'comic-infinity-gauntlet-1', status: 'completed', addedAt: '2026-03-15', userRating: 5 },
      { comicId: 'comic-civil-war-1', status: 'completed', addedAt: '2026-03-18', userRating: 5 },
      { comicId: 'comic-secret-wars-8', status: 'reading', addedAt: '2026-04-01' },
      { comicId: 'comic-thor-god-of-thunder-1', status: 'to-read', addedAt: '2026-04-10' },
    ],
    joinedAt: '2025-01-10',
  },
  {
    id: 'user-peter-p',
    name: 'Peter Parker',
    email: 'spidey@dailybugle.com',
    avatar: 'spiderman',
    favorites: ['char-spiderman', 'char-daredevil', 'char-captain-america'],
    readingList: [
      { comicId: 'comic-amazing-fantasy-15', status: 'completed', addedAt: '2026-02-01', userRating: 5 },
      { comicId: 'comic-spider-verse-1', status: 'reading', addedAt: '2026-03-20' },
    ],
    joinedAt: '2025-06-01',
  },
  {
    id: 'user-wanda-m',
    name: 'Wanda Maximoff',
    email: 'wanda@westview.org',
    avatar: 'scarlet',
    favorites: ['char-scarlet-witch', 'char-doctor-strange', 'char-magneto'],
    readingList: [
      { comicId: 'comic-house-of-m-1', status: 'completed', addedAt: '2026-01-20', userRating: 5 },
    ],
    joinedAt: '2025-08-15',
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      if (saved) return JSON.parse(saved);
      // Default to Enes Öztürk logged-in for immediate out-of-the-box rich experience
      return INITIAL_DEMO_USERS[0];
    } catch {
      return INITIAL_DEMO_USERS[0];
    }
  });

  const [allUsers, setAllUsers] = useState<UserProfile[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ALL_USERS);
      if (saved) return JSON.parse(saved);
      return INITIAL_DEMO_USERS;
    } catch {
      return INITIAL_DEMO_USERS;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
        // Also update in allUsers list
        setAllUsers((prev) => {
          const idx = prev.findIndex((u) => u.id === user.id);
          const updated = idx >= 0 ? [...prev.slice(0, idx), user, ...prev.slice(idx + 1)] : [...prev, user];
          localStorage.setItem(STORAGE_KEY_ALL_USERS, JSON.stringify(updated));
          return updated;
        });
      } else {
        localStorage.removeItem(STORAGE_KEY_USER);
      }
    } catch {
      // storage unavailable
    }
  }, [user]);

  const login = (email: string, pass: string): { success: boolean; message?: string } => {
    if (!email || !pass) {
      return { success: false, message: 'Lütfen e-posta ve şifrenizi giriniz.' };
    }
    const normalizedEmail = email.trim().toLowerCase();
    const found = allUsers.find((u) => u.email.toLowerCase() === normalizedEmail);

    if (found) {
      setUser(found);
      return { success: true };
    }

    // If not found, create a profile automatically or prompt register
    const newProfile: UserProfile = {
      id: `user-${Date.now()}`,
      name: email.split('@')[0],
      email: normalizedEmail,
      avatar: 'spiderman',
      favorites: ['char-spiderman'],
      readingList: [],
      joinedAt: new Date().toISOString().split('T')[0],
    };
    setUser(newProfile);
    return { success: true };
  };

  const register = (name: string, email: string, pass: string, avatar: string): { success: boolean; message?: string } => {
    if (!name.trim() || !email.trim() || !pass) {
      return { success: false, message: 'Tüm alanları doldurmanız gerekmektedir.' };
    }
    const normalizedEmail = email.trim().toLowerCase();
    const existing = allUsers.find((u) => u.email.toLowerCase() === normalizedEmail);
    if (existing) {
      return { success: false, message: 'Bu e-posta adresiyle kayıtlı bir hesap zaten var.' };
    }

    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: normalizedEmail,
      avatar: avatar || 'spiderman',
      favorites: [],
      readingList: [],
      joinedAt: new Date().toISOString().split('T')[0],
    };

    setUser(newUser);
    setAllUsers((prev) => [...prev, newUser]);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const loginAsDemo = (profileName: 'enes' | 'peter' | 'wanda') => {
    const demo = INITIAL_DEMO_USERS.find((u) =>
      profileName === 'enes' ? u.id === 'user-enes-ozturk' :
      profileName === 'peter' ? u.id === 'user-peter-p' :
      u.id === 'user-wanda-m'
    );
    if (demo) {
      setUser(demo);
    }
  };

  const toggleFavorite = (characterId: string) => {
    if (!user) return;
    const exists = user.favorites.includes(characterId);
    const newFavorites = exists
      ? user.favorites.filter((id) => id !== characterId)
      : [...user.favorites, characterId];

    setUser({
      ...user,
      favorites: newFavorites,
    });
  };

  const isFavorite = (characterId: string): boolean => {
    if (!user) return false;
    return user.favorites.includes(characterId);
  };

  const updateReadingList = (comicId: string, status: ReadingStatus, userRating?: number) => {
    if (!user) return;
    const existingIdx = user.readingList.findIndex((item) => item.comicId === comicId);
    let updatedList: ReadingItem[];

    if (existingIdx >= 0) {
      updatedList = [...user.readingList];
      updatedList[existingIdx] = {
        ...updatedList[existingIdx],
        status,
        userRating: userRating !== undefined ? userRating : updatedList[existingIdx].userRating,
      };
    } else {
      updatedList = [
        ...user.readingList,
        {
          comicId,
          status,
          addedAt: new Date().toISOString().split('T')[0],
          userRating,
        },
      ];
    }

    setUser({
      ...user,
      readingList: updatedList,
    });
  };

  const removeFromReadingList = (comicId: string) => {
    if (!user) return;
    setUser({
      ...user,
      readingList: user.readingList.filter((item) => item.comicId !== comicId),
    });
  };

  const getReadingItem = (comicId: string): ReadingItem | undefined => {
    if (!user) return undefined;
    return user.readingList.find((item) => item.comicId === comicId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        toggleFavorite,
        isFavorite,
        updateReadingList,
        removeFromReadingList,
        getReadingItem,
        loginAsDemo,
        allUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
