import { Author, TableOfContentItem } from '../types/blog';

export const BLOG_AUTHOR: Author = {
  name: 'Enes Öztürk',
  title: 'Kıdemli Veri Bilimci & Yapay Zeka Araştırmacısı',
  bio: 'Enes Öztürk; yüksek boyutlu geometri, makine öğrenmesi ve yapay zeka modellerinin latent uzay mimarileri üzerine çalışan bir veri bilimcidir. Soğuk formül yığınlarını bir kenara bırakıp, matematiğin ardındaki sezgisel ve görsel estetiği ortaya çıkarmayı amaçlar.',
  avatarUrl: '',
  location: 'İstanbul & Londra',
  socials: {
    twitter: 'https://twitter.com',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
};

export const TABLE_OF_CONTENTS: TableOfContentItem[] = [
  { id: 'giris', title: 'Üç Boyutlu Zihnimizin Aldatmacası', readTime: '2 dk', level: 1 },
  { id: 'portakal', title: '100 Boyutlu Portakalın %99’u Neden Kabuktur?', readTime: '3 dk', level: 1 },
  { id: 'mesafe', title: 'Mesafe Yoğunlaşması: Herkes Herkesten Eşit Uzakta!', readTime: '3 dk', level: 1 },
  { id: 'dik-acilar', title: 'Dik Açılar Ülkesi: Neden Tüm Vektörler Birbirine Dik?', readTime: '2 dk', level: 1 },
  { id: 'vektor-cebiri', title: 'Kral - Erkek + Kadın = Kraliçe: Anlamın Geometrisi', readTime: '3 dk', level: 1 },
  { id: 'nimet', title: 'Lanetten Nimete: Yüksek Boyut Neden Bir Süper Güçtür?', readTime: '2 dk', level: 1 },
  { id: 'kod-lab', title: 'NumPy ile Kendi Bilgisayarında Kanıtla', readTime: '2 dk', level: 1 },
  { id: 'sonuc', title: 'Enes Öztürk’ün Defterinden: Sezgiyi Kodlamak', readTime: '1 dk', level: 1 },
];

export const PYTHON_EXPERIMENT_CODE = `import numpy as np

# 1. 100 Boyutlu Uzayda Portakal Simülasyonu
dimensions = 100
peel_thickness = 0.05  # %5 kalınlığında bir kabuk
inner_ratio = (1 - peel_thickness) ** dimensions

print(f"[100 Boyut] İç Meyve Oranı: %{inner_ratio * 100:.2f}")
print(f"[100 Boyut] Kabuk Oranı    : %{(1 - inner_ratio) * 100:.2f}")

# 2. Mesafe Yoğunlaşması (Distance Concentration)
num_points = 500
points = np.random.uniform(0, 1, size=(num_points, dimensions))

# Tüm çiftler arası Öklid mesafeleri
diff = points[:, np.newaxis, :] - points[np.newaxis, :, :]
distances = np.sqrt(np.sum(diff**2, axis=-1))
i_upper = np.triu_indices(num_points, k=1)
dists = distances[i_upper]

contrast = (dists.max() - dists.min()) / dists.min()
print(f"En Yakın Mesafe: {dists.min():.3f} | En Uzak: {dists.max():.3f}")
print(f"Tezat Oranı (Max-Min)/Min: {contrast:.4f}  # Sıfıra yaklaştı!")`;
