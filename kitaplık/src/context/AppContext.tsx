import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, FavoriteBook, Post, BookGenre, ViewTab } from '../types';
import { INITIAL_USERS, INITIAL_FAVORITE_BOOKS, INITIAL_POSTS } from '../data/seedData';

interface Toast {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  currentUser: User | null;
  users: User[];
  posts: Post[];
  favoriteBooks: FavoriteBook[];
  currentTab: ViewTab;
  setCurrentTab: (tab: ViewTab) => void;
  selectedUserProfile: User | null;
  setSelectedUserProfile: (user: User | null) => void;
  
  // Modals
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authMode: 'login' | 'register';
  setAuthMode: (mode: 'login' | 'register') => void;
  isAddFavoriteModalOpen: boolean;
  setIsAddFavoriteModalOpen: (open: boolean) => void;
  isNewPostModalOpen: boolean;
  setIsNewPostModalOpen: (open: boolean) => void;
  
  // Actions
  login: (username: string, pass: string) => boolean;
  register: (name: string, username: string, email: string, pass: string, bio?: string) => boolean;
  logout: () => void;
  switchUser: (userId: string) => void;
  updateCurrentUserProfile: (updates: Partial<User>) => void;
  
  // Posts
  createPost: (postData: {
    bookTitle: string;
    bookAuthor: string;
    bookGenre: BookGenre;
    rating: number;
    content: string;
    quote?: string;
    pageCount?: number;
    photoUrl?: string;
    isSpoiler?: boolean;
    readStatus?: 'okudum' | 'okuyorum' | 'okuyacagim';
  }) => void;
  deletePost: (postId: string) => void;
  toggleLikePost: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  
  // Favorites
  addFavoriteBook: (bookData: {
    title: string;
    author: string;
    genre: BookGenre;
    rating: number;
    status: 'okudum' | 'okuyorum' | 'okuyacagim';
    coverColor?: string;
    coverImage?: string;
    pageCount?: number;
    reviewNote?: string;
    favoriteQuote?: string;
  }) => boolean;
  removeFavoriteBook: (bookId: string) => void;
  copyBookToMyFavorites: (book: FavoriteBook) => boolean;
  isBookInMyFavorites: (title: string, author: string) => boolean;
  
  // Navigation helper
  viewUserProfile: (user: User) => void;
  
  // Toast notifications
  toast: Toast | null;
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USERS: 'kitaplik_users_v1',
  CURRENT_USER_ID: 'kitaplik_current_user_id_v1',
  POSTS: 'kitaplik_posts_v1',
  FAVORITES: 'kitaplik_favorites_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial state from LocalStorage or fall back to seed data
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USERS);
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);
      // Default to Enes Öztürk for rich immediate user experience
      return saved || 'user_enes';
    } catch {
      return 'user_enes';
    }
  });

  const [posts, setPosts] = useState<Post[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.POSTS);
      return saved ? JSON.parse(saved) : INITIAL_POSTS;
    } catch {
      return INITIAL_POSTS;
    }
  });

  const [favoriteBooks, setFavoriteBooks] = useState<FavoriteBook[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return saved ? JSON.parse(saved) : INITIAL_FAVORITE_BOOKS;
    } catch {
      return INITIAL_FAVORITE_BOOKS;
    }
  });

  const [currentTab, setCurrentTab] = useState<ViewTab>('feed');
  const [selectedUserProfile, setSelectedUserProfile] = useState<User | null>(null);

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isAddFavoriteModalOpen, setIsAddFavoriteModalOpen] = useState(false);
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);

  // Toast
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, title, message, type });
    setTimeout(() => {
      setToast((curr) => (curr?.id === id ? null : curr));
    }, 4000);
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [users]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, currentUserId);
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [currentUserId]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [posts]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favoriteBooks));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [favoriteBooks]);

  const currentUser = users.find((u) => u.id === currentUserId) || users[0] || null;

  // Authentication
  const login = (username: string): boolean => {
    const clean = username.trim().toLowerCase().replace('@', '');
    const user = users.find(
      (u) => u.username.toLowerCase() === clean || u.email.toLowerCase() === clean
    );
    if (user) {
      setCurrentUserId(user.id);
      setIsAuthModalOpen(false);
      showToast('Hoş Geldiniz', `${user.name} olarak başarıyla giriş yapıldı!`, 'success');
      return true;
    }
    showToast('Kullanıcı Bulunamadı', 'Bu kullanıcı adı veya e-posta ile kayıt bulunamadı.', 'error');
    return false;
  };

  const register = (
    name: string,
    username: string,
    email: string,
    _pass: string,
    bio?: string
  ): boolean => {
    const cleanUsername = username.trim().toLowerCase().replace('@', '');
    if (users.some((u) => u.username.toLowerCase() === cleanUsername)) {
      showToast('Uyarı', 'Bu kullanıcı adı zaten kullanımda.', 'error');
      return false;
    }

    const newUser: User = {
      id: `user_${Date.now()}`,
      username: cleanUsername,
      name: name.trim(),
      email: email.trim(),
      avatar: `https://api.dicebear.com/7.x/lorelei/svg?seed=${cleanUsername}&backgroundColor=b6e3f4,ffd5dc,ffdfbf`,
      bio: bio || 'Kitaplık topluluğunun yeni üyesi. Okumayı ve yeni dünyalar keşfetmeyi seviyorum.',
      joinedDate: 'Şimdi',
      badge: 'Yeni Okur',
      readingGoal: {
        year: 2026,
        target: 25,
        current: 0,
      },
      stats: {
        booksRead: 0,
        reviewsCount: 0,
        followersCount: 0,
        followingCount: 1,
      },
    };

    setUsers((prev) => [newUser, ...prev]);
    setCurrentUserId(newUser.id);
    setIsAuthModalOpen(false);
    showToast('Tebrikler!', `Aramıza hoş geldin ${newUser.name}!`, 'success');
    return true;
  };

  const logout = () => {
    // If logging out, we can switch to demo visitor or ask for login
    showToast('Çıkış Yapıldı', 'Oturumunuz kapatıldı.', 'info');
    // Keep first user as fallback or leave null
  };

  const switchUser = (userId: string) => {
    const target = users.find((u) => u.id === userId);
    if (target) {
      setCurrentUserId(target.id);
      showToast('Kullanıcı Değiştirildi', `Aktif hesap: ${target.name}`, 'info');
    }
  };

  const updateCurrentUserProfile = (updates: Partial<User>) => {
    if (!currentUser) return;
    setUsers((prev) =>
      prev.map((u) => (u.id === currentUser.id ? { ...u, ...updates } : u))
    );
    showToast('Profil Güncellendi', 'Bilgileriniz başarıyla kaydedildi.', 'success');
  };

  // Posts
  const createPost = (postData: {
    bookTitle: string;
    bookAuthor: string;
    bookGenre: BookGenre;
    rating: number;
    content: string;
    quote?: string;
    pageCount?: number;
    photoUrl?: string;
    isSpoiler?: boolean;
    readStatus?: 'okudum' | 'okuyorum' | 'okuyacagim';
  }) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    const newPost: Post = {
      id: `post_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userUsername: currentUser.username,
      userAvatar: currentUser.avatar,
      userBadge: currentUser.badge,
      bookTitle: postData.bookTitle.trim(),
      bookAuthor: postData.bookAuthor.trim(),
      bookGenre: postData.bookGenre,
      rating: postData.rating,
      content: postData.content.trim(),
      quote: postData.quote?.trim() || undefined,
      pageCount: postData.pageCount,
      photoUrl: postData.photoUrl,
      likes: [],
      comments: [],
      isSpoiler: postData.isSpoiler,
      readStatus: postData.readStatus || 'okudum',
      createdAt: 'Az önce',
    };

    setPosts((prev) => [newPost, ...prev]);

    // Also update user's review count
    setUsers((prev) =>
      prev.map((u) =>
        u.id === currentUser.id
          ? {
              ...u,
              stats: {
                ...u.stats,
                reviewsCount: u.stats.reviewsCount + 1,
              },
            }
          : u
      )
    );

    setIsNewPostModalOpen(false);
    showToast('Gönderi Paylaşıldı', `"${newPost.bookTitle}" hakkındaki düşünceleriniz paylaşıldı.`);
  };

  const deletePost = (postId: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    showToast('Silindi', 'Gönderi kaldırıldı.', 'info');
  };

  const toggleLikePost = (postId: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        const alreadyLiked = post.likes.includes(currentUser.id);
        const updatedLikes = alreadyLiked
          ? post.likes.filter((id) => id !== currentUser.id)
          : [...post.likes, currentUser.id];
        return { ...post, likes: updatedLikes };
      })
    );
  };

  const addComment = (postId: string, content: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    if (!content.trim()) return;

    const newComment = {
      id: `c_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userUsername: currentUser.username,
      userAvatar: currentUser.avatar,
      content: content.trim(),
      createdAt: 'Şimdi',
    };

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        return { ...post, comments: [...post.comments, newComment] };
      })
    );
  };

  // Favorite Books
  const addFavoriteBook = (bookData: {
    title: string;
    author: string;
    genre: BookGenre;
    rating: number;
    status: 'okudum' | 'okuyorum' | 'okuyacagim';
    coverColor?: string;
    coverImage?: string;
    pageCount?: number;
    reviewNote?: string;
    favoriteQuote?: string;
  }): boolean => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return false;
    }

    if (!bookData.title.trim() || !bookData.author.trim() || !bookData.genre) {
      showToast('Eksik Bilgi', 'Kitap adı, yazar adı ve türü zorunludur.', 'error');
      return false;
    }

    // Check duplicate in current user's library
    const exists = favoriteBooks.some(
      (b) =>
        b.userId === currentUser.id &&
        b.title.trim().toLowerCase() === bookData.title.trim().toLowerCase() &&
        b.author.trim().toLowerCase() === bookData.author.trim().toLowerCase()
    );

    if (exists) {
      showToast('Kitap Zaten Ekli', `"${bookData.title}" zaten kitaplığınızda bulunuyor.`, 'info');
      return false;
    }

    const defaultColors = [
      'from-amber-900 via-stone-800 to-amber-950',
      'from-emerald-950 via-teal-900 to-stone-900',
      'from-rose-950 via-stone-900 to-black',
      'from-indigo-950 via-slate-900 to-stone-900',
      'from-stone-800 via-stone-900 to-black',
    ];
    const randomColor = defaultColors[Math.floor(Math.random() * defaultColors.length)];

    const newBook: FavoriteBook = {
      id: `fav_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userUsername: currentUser.username,
      userAvatar: currentUser.avatar,
      title: bookData.title.trim(),
      author: bookData.author.trim(),
      genre: bookData.genre,
      rating: bookData.rating,
      status: bookData.status,
      pageCount: bookData.pageCount,
      coverColor: bookData.coverColor || randomColor,
      coverImage: bookData.coverImage,
      reviewNote: bookData.reviewNote?.trim(),
      favoriteQuote: bookData.favoriteQuote?.trim(),
      addedAt: new Date().toISOString().split('T')[0],
    };

    setFavoriteBooks((prev) => [newBook, ...prev]);

    // Update user stats
    setUsers((prev) =>
      prev.map((u) =>
        u.id === currentUser.id
          ? {
              ...u,
              stats: {
                ...u.stats,
                booksRead: bookData.status === 'okudum' ? u.stats.booksRead + 1 : u.stats.booksRead,
              },
              readingGoal: {
                ...u.readingGoal,
                current: bookData.status === 'okudum' ? u.readingGoal.current + 1 : u.readingGoal.current,
              },
            }
          : u
      )
    );

    setIsAddFavoriteModalOpen(false);
    showToast('Kitaplığa Eklendi', `"${newBook.title}" favori kitaplarınıza eklendi!`);
    return true;
  };

  const removeFavoriteBook = (bookId: string) => {
    setFavoriteBooks((prev) => prev.filter((b) => b.id !== bookId));
    showToast('Kaldırıldı', 'Kitap favorilerinizden kaldırıldı.', 'info');
  };

  // Crucial Feature: "o profildeki favorilenmiş kitapları favorilere ekleyebilme"
  const copyBookToMyFavorites = (book: FavoriteBook): boolean => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return false;
    }

    if (book.userId === currentUser.id) {
      showToast('Zaten Sizde', 'Bu kitap zaten sizin kitaplığınızda ekli.', 'info');
      return false;
    }

    const alreadyInMine = favoriteBooks.some(
      (b) =>
        b.userId === currentUser.id &&
        b.title.trim().toLowerCase() === book.title.trim().toLowerCase() &&
        b.author.trim().toLowerCase() === book.author.trim().toLowerCase()
    );

    if (alreadyInMine) {
      showToast('Zaten Kitaplığınızda', `"${book.title}" zaten sizin favori listenizde var!`, 'info');
      return false;
    }

    const copiedBook: FavoriteBook = {
      id: `fav_copy_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userUsername: currentUser.username,
      userAvatar: currentUser.avatar,
      title: book.title,
      author: book.author,
      genre: book.genre,
      rating: book.rating,
      status: 'okuyacagim', // by default added as want-to-read when discovering from another user
      pageCount: book.pageCount,
      coverColor: book.coverColor,
      coverImage: book.coverImage,
      reviewNote: `${book.userName} (@${book.userUsername}) profilinden keşfedildi ve eklendi.`,
      favoriteQuote: book.favoriteQuote,
      addedAt: new Date().toISOString().split('T')[0],
    };

    setFavoriteBooks((prev) => [copiedBook, ...prev]);
    showToast(
      'Kitaplığınıza Eklendi!',
      `"${book.title}", ${book.userName}'in profilinden sizin kitaplığınıza kaydedildi!`
    );
    return true;
  };

  const isBookInMyFavorites = (title: string, author: string): boolean => {
    if (!currentUser) return false;
    return favoriteBooks.some(
      (b) =>
        b.userId === currentUser.id &&
        b.title.trim().toLowerCase() === title.trim().toLowerCase() &&
        b.author.trim().toLowerCase() === author.trim().toLowerCase()
    );
  };

  const viewUserProfile = (user: User) => {
    setSelectedUserProfile(user);
    setCurrentTab('profile');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        posts,
        favoriteBooks,
        currentTab,
        setCurrentTab,
        selectedUserProfile,
        setSelectedUserProfile,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        isAddFavoriteModalOpen,
        setIsAddFavoriteModalOpen,
        isNewPostModalOpen,
        setIsNewPostModalOpen,
        login,
        register,
        logout,
        switchUser,
        updateCurrentUserProfile,
        createPost,
        deletePost,
        toggleLikePost,
        addComment,
        addFavoriteBook,
        removeFavoriteBook,
        copyBookToMyFavorites,
        isBookInMyFavorites,
        viewUserProfile,
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
