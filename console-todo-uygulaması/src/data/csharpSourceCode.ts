export const CSHARP_SOURCE_CODE = `// ============================================================================
// PROJE-2 : 3 Kolonlu Console ToDo Uygulaması
// Geliştirici: Enes Öztürk
// Mimari: Nesne Yönelimli Programlama (OOP), C# .NET 8 / 9
// ============================================================================

using System;
using System.Collections.Generic;
using System.Linq;

namespace ConsoleToDoApp
{
    // Büyüklükler Enum olarak tanımlanmıştır.
    public enum Buyukluk
    {
        XS = 1,
        S = 2,
        M = 3,
        L = 4,
        XL = 5
    }

    // Takım Üyesi Sınıfı (Dictionary veya Liste için)
    public class TakimUyesi
    {
        public int Id { get; set; }
        public string Isim { get; set; }
        public string Unvan { get; set; }

        public TakimUyesi(int id, string isim, string unvan)
        {
            Id = id;
            Isim = isim;
            Unvan = unvan;
        }
    }

    // Kart Sınıfı
    public class Kart
    {
        public string Baslik { get; set; }
        public string Icerik { get; set; }
        public int AtananKisiId { get; set; }
        public Buyukluk Buyukluk { get; set; }

        public Kart(string baslik, string icerik, int atananKisiId, Buyukluk buyukluk)
        {
            Baslik = baslik;
            Icerik = icerik;
            AtananKisiId = atananKisiId;
            Buyukluk = buyukluk;
        }
    }

    // Board ve Kolon Yönetimi
    public class Board
    {
        public List<Kart> TodoLine { get; set; } = new List<Kart>();
        public List<Kart> InProgressLine { get; set; } = new List<Kart>();
        public List<Kart> DoneLine { get; set; } = new List<Kart>();

        public Dictionary<int, TakimUyesi> Takim { get; set; } = new Dictionary<int, TakimUyesi>();

        public Board()
        {
            // Varsayılan Takım Üyeleri
            Takim.Add(1, new TakimUyesi(1, "Enes Öztürk", "Takım Lideri"));
            Takim.Add(2, new TakimUyesi(2, "Zeynep Kaya", "Frontend Geliştirici"));
            Takim.Add(3, new TakimUyesi(3, "Burak Yılmaz", "Backend Geliştirici"));
            Takim.Add(4, new TakimUyesi(4, "Elif Çelik", "UI/UX Tasarımcı"));
            Takim.Add(5, new TakimUyesi(5, "Caner Demir", "DevOps Mühendisi"));

            // Varsayılan 3 adet Kart
            TodoLine.Add(new Kart("C# Konsol Mimarisi", "Sınıflar, Enum'lar ve Dictionary yapılarının kurgulanması.", 1, Buyukluk.L));
            InProgressLine.Add(new Kart("Kart Taşıma Algoritması", "Kullanıcı girişine göre kartın kolonlar arası transferi.", 2, Buyukluk.M));
            DoneLine.Add(new Kart("Birim Testleri ve Doğrulama", "Hatalı ID ve geçersiz büyüklük testlerinin yapılması.", 3, Buyukluk.S));
        }

        // (1) Board Listelemek
        public void BoardListele()
        {
            Console.WriteLine("\\nTODO Line");
            Console.WriteLine("************************");
            ListeleLine(TodoLine);

            Console.WriteLine("\\nIN PROGRESS Line");
            Console.WriteLine("************************");
            ListeleLine(InProgressLine);

            Console.WriteLine("\\nDONE Line");
            Console.WriteLine("************************");
            ListeleLine(DoneLine);
        }

        private void ListeleLine(List<Kart> line)
        {
            if (line.Count == 0)
            {
                Console.WriteLine("~ BOŞ ~");
                return;
            }

            for (int i = 0; i < line.Count; i++)
            {
                var kart = line[i];
                string atananKisi = Takim.ContainsKey(kart.AtananKisiId) ? Takim[kart.AtananKisiId].Isim : "Bilinmiyor";
                Console.WriteLine($"Başlık      : {kart.Baslik}");
                Console.WriteLine($"İçerik      : {kart.Icerik}");
                Console.WriteLine($"Atanan Kişi : {atananKisi}");
                Console.WriteLine($"Büyüklük    : {kart.Buyukluk}");
                if (i < line.Count - 1)
                {
                    Console.WriteLine("-");
                }
            }
        }

        // (2) Board'a Kart Eklemek
        public void KartEkle()
        {
            Console.Write("Başlık Giriniz                                  : ");
            string baslik = Console.ReadLine();

            Console.Write("İçerik Giriniz                                  : ");
            string icerik = Console.ReadLine();

            Console.Write("Büyüklük Seçiniz -> XS(1),S(2),M(3),L(4),XL(5)  : ");
            if (!int.TryParse(Console.ReadLine(), out int buyuklukVal) || !Enum.IsDefined(typeof(Buyukluk), buyuklukVal))
            {
                Console.WriteLine("Hatalı girişler yaptınız! Büyüklük geçersiz.");
                return;
            }

            Console.Write("Kişi Seçiniz (ID)                               : ");
            if (!int.TryParse(Console.ReadLine(), out int kisiId) || !Takim.ContainsKey(kisiId))
            {
                Console.WriteLine("Hatalı girişler yaptınız! Tanımlı bir takım üyesi ID'si girmediniz.");
                return;
            }

            Kart yeniKart = new Kart(baslik, icerik, kisiId, (Buyukluk)buyuklukVal);
            TodoLine.Add(yeniKart);
            Console.WriteLine("Kart başarıyla TODO kolonuna eklendi!");
        }

        // (3) Board'dan Kart Silmek
        public void KartSil()
        {
            while (true)
            {
                Console.WriteLine("Öncelikle silmek istediğiniz kartı seçmeniz gerekiyor.");
                Console.Write("Lütfen kart başlığını yazınız: ");
                string baslik = Console.ReadLine();

                var kartTodo = TodoLine.Where(k => k.Baslik.Equals(baslik, StringComparison.OrdinalIgnoreCase)).ToList();
                var kartProgress = InProgressLine.Where(k => k.Baslik.Equals(baslik, StringComparison.OrdinalIgnoreCase)).ToList();
                var kartDone = DoneLine.Where(k => k.Baslik.Equals(baslik, StringComparison.OrdinalIgnoreCase)).ToList();

                int toplamBulunan = kartTodo.Count + kartProgress.Count + kartDone.Count;

                if (toplamBulunan == 0)
                {
                    Console.WriteLine("\\nAradığınız krtiterlere uygun kart board'da bulunamadı. Lütfen bir seçim yapınız.");
                    Console.WriteLine("* Silmeyi sonlandırmak için : (1)");
                    Console.WriteLine("* Yeniden denemek için : (2)");
                    Console.Write("Seçiminiz: ");
                    string secim = Console.ReadLine();
                    if (secim == "1") return;
                    continue;
                }

                TodoLine.RemoveAll(k => k.Baslik.Equals(baslik, StringComparison.OrdinalIgnoreCase));
                InProgressLine.RemoveAll(k => k.Baslik.Equals(baslik, StringComparison.OrdinalIgnoreCase));
                DoneLine.RemoveAll(k => k.Baslik.Equals(baslik, StringComparison.OrdinalIgnoreCase));

                Console.WriteLine($"\\n'{baslik}' başlıklı {toplamBulunan} adet kart başarıyla silindi.");
                break;
            }
        }

        // (4) Kart Taşımak
        public void KartTasi()
        {
            while (true)
            {
                Console.WriteLine("Öncelikle taşımak istediğiniz kartı seçmeniz gerekiyor.");
                Console.Write("Lütfen kart başlığını yazınız: ");
                string baslik = Console.ReadLine();

                Kart bulunan = null;
                string mevcutLine = "";
                List<Kart> kaynakListe = null;

                bulunan = TodoLine.FirstOrDefault(k => k.Baslik.Equals(baslik, StringComparison.OrdinalIgnoreCase));
                if (bulunan != null) { mevcutLine = "TODO"; kaynakListe = TodoLine; }
                else
                {
                    bulunan = InProgressLine.FirstOrDefault(k => k.Baslik.Equals(baslik, StringComparison.OrdinalIgnoreCase));
                    if (bulunan != null) { mevcutLine = "IN PROGRESS"; kaynakListe = InProgressLine; }
                    else
                    {
                        bulunan = DoneLine.FirstOrDefault(k => k.Baslik.Equals(baslik, StringComparison.OrdinalIgnoreCase));
                        if (bulunan != null) { mevcutLine = "DONE"; kaynakListe = DoneLine; }
                    }
                }

                if (bulunan == null)
                {
                    Console.WriteLine("\\nAradığınız krtiterlere uygun kart board'da bulunamadı. Lütfen bir seçim yapınız.");
                    Console.WriteLine("* İşlemi sonlandırmak için : (1)");
                    Console.WriteLine("* Yeniden denemek için : (2)");
                    Console.Write("Seçiminiz: ");
                    string secim = Console.ReadLine();
                    if (secim == "1") return;
                    continue;
                }

                string atananKisi = Takim.ContainsKey(bulunan.AtananKisiId) ? Takim[bulunan.AtananKisiId].Isim : "Bilinmiyor";

                Console.WriteLine("\\nBulunan Kart Bilgileri:");
                Console.WriteLine("**************************************");
                Console.WriteLine($"Başlık      : {bulunan.Baslik}");
                Console.WriteLine($"İçerik      : {bulunan.Icerik}");
                Console.WriteLine($"Atanan Kişi : {atananKisi}");
                Console.WriteLine($"Büyüklük    : {bulunan.Buyukluk}");
                Console.WriteLine($"Line        : {mevcutLine}");

                Console.WriteLine("\\nLütfen taşımak istediğiniz Line'ı seçiniz: ");
                Console.WriteLine("(1) TODO");
                Console.WriteLine("(2) IN PROGRESS");
                Console.WriteLine("(3) DONE");
                Console.Write("Seçiminiz: ");
                string lineSecim = Console.ReadLine();

                List<Kart> hedefListe = null;
                if (lineSecim == "1") hedefListe = TodoLine;
                else if (lineSecim == "2") hedefListe = InProgressLine;
                else if (lineSecim == "3") hedefListe = DoneLine;
                else
                {
                    Console.WriteLine("Hatalı bir seçim yaptınız!");
                    return;
                }

                kaynakListe.Remove(bulunan);
                hedefListe.Add(bulunan);
                Console.WriteLine("\\nKart başarıyla taşındı! Güncel Board durumu:");
                BoardListele();
                break;
            }
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Console.Title = "Console ToDo Uygulaması - Enes Öztürk";
            Board board = new Board();

            while (true)
            {
                Console.WriteLine("\\n  Lütfen yapmak istediğiniz işlemi seçiniz :) ");
                Console.WriteLine("  *******************************************");
                Console.WriteLine("  (1) Board Listelemek");
                Console.WriteLine("  (2) Board'a Kart Eklemek");
                Console.WriteLine("  (3) Board'dan Kart Silmek");
                Console.WriteLine("  (4) Kart Taşımak");
                Console.WriteLine("  (0) Çıkış");
                Console.Write("  Seçiminiz: ");

                string secim = Console.ReadLine();

                switch (secim)
                {
                    case "1":
                        board.BoardListele();
                        break;
                    case "2":
                        board.KartEkle();
                        break;
                    case "3":
                        board.KartSil();
                        break;
                    case "4":
                        board.KartTasi();
                        break;
                    case "0":
                        Console.WriteLine("Uygulama sonlandırılıyor. İyi çalışmalar dileriz! - Enes Öztürk");
                        return;
                    default:
                        Console.WriteLine("Geçersiz seçim yaptınız. Lütfen 1-4 arasında bir sayı giriniz.");
                        break;
                }
            }
        }
    }
}
`;
