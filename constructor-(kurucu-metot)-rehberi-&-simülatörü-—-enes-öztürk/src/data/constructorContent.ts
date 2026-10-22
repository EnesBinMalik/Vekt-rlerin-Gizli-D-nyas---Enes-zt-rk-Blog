import { ConstructorOverload, PitfallItem, QuizQuestion, SimulationStep } from '../types';

export const AUTHOR_NAME = "Enes Öztürk";
export const AUTHOR_TITLE = "Yazılım Mühendisi & Eğitmen";

export const OVERLOAD_PRESETS: ConstructorOverload[] = [
  {
    id: "default",
    name: "Varsayılan / Parametresiz Kurucu",
    signature: "Ogrenci()",
    description: "Hiçbir argüman gönderilmez. Derleyicinin sağladığı ya da açıkça yazdığımız parametresiz kurucu çalışır. Tüm alanlar varsayılan sistem değerlerine (null, 0, false) ayarlanır.",
    params: [],
    codeExample: {
      csharp: `public class Ogrenci
{
    public string Ad;
    public int Yas;
    public bool KayitliMi;

    // Parametresiz (Varsayılan) Kurucu Metot
    public Ogrenci()
    {
        // Alanlar varsayılan değerleri alır:
        // Ad = null; Yas = 0; KayitliMi = false;
    }
}

// Kullanım:
Ogrenci ogr = new Ogrenci();`,
      java: `public class Ogrenci {
    public String ad;
    public int yas;
    public boolean kayitliMi;

    // Parametresiz Kurucu
    public Ogrenci() {
        // Varsayılan: ad = null, yas = 0, kayitliMi = false
    }
}

// Kullanım:
Ogrenci ogr = new Ogrenci();`,
      typescript: `class Ogrenci {
    public ad: string | null;
    public yas: number;
    public kayitliMi: boolean;

    constructor() {
        this.ad = null;
        this.yas = 0;
        this.kayitliMi = false;
    }
}

const ogr = new Ogrenci();`,
      cpp: `class Ogrenci {
public:
    std::string* ad;
    int yas;
    bool kayitliMi;

    // Default Constructor
    Ogrenci() : ad(nullptr), yas(0), kayitliMi(false) {}
};

Ogrenci ogr;`
    },
    resultState: {
      ad: null,
      yas: 0,
      kayitliMi: false,
      bakiye: 0.0
    }
  },
  {
    id: "single_param",
    name: "Tek Parametreli Kurucu",
    signature: "Ogrenci(string ad)",
    description: "Sadece öğrencinin adını alır. Diğer sayısal ve mantıksal özellikler ilk değer ataması yapılmadığı için varsayılan (default) değerlerini (0, false) korur.",
    params: [
      { name: "ad", type: "string", defaultVal: "Ali Veli", description: "Öğrencinin adı" }
    ],
    codeExample: {
      csharp: `public class Ogrenci
{
    public string Ad;
    public int Yas;
    public bool KayitliMi;

    // Tek Parametreli Kurucu
    public Ogrenci(string ad)
    {
        this.Ad = ad;
        // Yas = 0, KayitliMi = false (varsayılan kaldı)
    }
}

// Kullanım:
Ogrenci ogr = new Ogrenci("Ali Veli");`,
      java: `public class Ogrenci {
    public String ad;
    public int yas;
    public boolean kayitliMi;

    public Ogrenci(String ad) {
        this.ad = ad;
    }
}

Ogrenci ogr = new Ogrenci("Ali Veli");`,
      typescript: `class Ogrenci {
    public ad: string;
    public yas: number = 0;
    public kayitliMi: boolean = false;

    constructor(ad: string) {
        this.ad = ad;
    }
}

const ogr = new Ogrenci("Ali Veli");`,
      cpp: `class Ogrenci {
public:
    std::string ad;
    int yas;
    bool kayitliMi;

    Ogrenci(std::string ad) : ad(ad), yas(0), kayitliMi(false) {}
};

Ogrenci ogr("Ali Veli");`
    },
    resultState: {
      ad: "Ali Veli",
      yas: 0,
      kayitliMi: false,
      bakiye: 0.0
    }
  },
  {
    id: "two_params",
    name: "İki Parametreli Kurucu",
    signature: "Ogrenci(string ad, int yas)",
    description: "Hem ad hem de yaş bilgisi başlangıçta atanır. Mantıksal durum (kayitliMi) varsayılan olarak 'false' kalır.",
    params: [
      { name: "ad", type: "string", defaultVal: "Zeynep Kaya", description: "Öğrencinin adı" },
      { name: "yas", type: "int", defaultVal: "21", description: "Öğrencinin yaşı" }
    ],
    codeExample: {
      csharp: `public class Ogrenci
{
    public string Ad;
    public int Yas;
    public bool KayitliMi;

    // İki Parametreli Kurucu
    public Ogrenci(string ad, int yas)
    {
        this.Ad = ad;
        this.Yas = yas;
        // KayitliMi = false varsayılan kaldı
    }
}

// Kullanım:
Ogrenci ogr = new Ogrenci("Zeynep Kaya", 21);`,
      java: `public class Ogrenci {
    public String ad;
    public int yas;
    public boolean kayitliMi;

    public Ogrenci(String ad, int yas) {
        this.ad = ad;
        this.yas = yas;
    }
}

Ogrenci ogr = new Ogrenci("Zeynep Kaya", 21);`,
      typescript: `class Ogrenci {
    public ad: string;
    public yas: number;
    public kayitliMi: boolean = false;

    constructor(ad: string, yas: number) {
        this.ad = ad;
        this.yas = yas;
    }
}

const ogr = new Ogrenci("Zeynep Kaya", 21);`,
      cpp: `class Ogrenci {
public:
    std::string ad;
    int yas;
    bool kayitliMi;

    Ogrenci(std::string ad, int yas) : ad(ad), yas(yas), kayitliMi(false) {}
};

Ogrenci ogr("Zeynep Kaya", 21);`
    },
    resultState: {
      ad: "Zeynep Kaya",
      yas: 21,
      kayitliMi: false,
      bakiye: 0.0
    }
  },
  {
    id: "full_params",
    name: "Tam Parametreli Kurucu",
    signature: "Ogrenci(string ad, int yas, bool kayitliMi, double bakiye)",
    description: "Tüm alanlar ilk oluşturma anında belirlenen argümanlarla initialize edilir. Nesne belleğe tam doldurulmuş olarak yerleşir.",
    params: [
      { name: "ad", type: "string", defaultVal: "Mehmet Demir", description: "Öğrencinin adı" },
      { name: "yas", type: "int", defaultVal: "23", description: "Öğrencinin yaşı" },
      { name: "kayitliMi", type: "bool", defaultVal: "true", description: "Kayıt durumu" },
      { name: "bakiye", type: "double", defaultVal: "450.50", description: "Bakiye" }
    ],
    codeExample: {
      csharp: `public class Ogrenci
{
    public string Ad;
    public int Yas;
    public bool KayitliMi;
    public double Bakiye;

    // Tam Parametreli Kurucu
    public Ogrenci(string ad, int yas, bool kayitliMi, double bakiye)
    {
        this.Ad = ad;
        this.Yas = yas;
        this.KayitliMi = kayitliMi;
        this.Bakiye = bakiye;
    }
}

// Kullanım:
Ogrenci ogr = new Ogrenci("Mehmet Demir", 23, true, 450.50);`,
      java: `public class Ogrenci {
    public String ad;
    public int yas;
    public boolean kayitliMi;
    public double bakiye;

    public Ogrenci(String ad, int yas, boolean kayitliMi, double bakiye) {
        this.ad = ad;
        this.yas = yas;
        this.kayitliMi = kayitliMi;
        this.bakiye = bakiye;
    }
}

Ogrenci ogr = new Ogrenci("Mehmet Demir", 23, true, 450.50);`,
      typescript: `class Ogrenci {
    constructor(
        public ad: string,
        public yas: number,
        public kayitliMi: boolean,
        public bakiye: number
    ) {}
}

const ogr = new Ogrenci("Mehmet Demir", 23, true, 450.50);`,
      cpp: `class Ogrenci {
public:
    std::string ad;
    int yas;
    bool kayitliMi;
    double bakiye;

    Ogrenci(std::string ad, int yas, bool kayitli, double bakiye)
        : ad(ad), yas(yas), kayitliMi(kayitli), bakiye(bakiye) {}
};

Ogrenci ogr("Mehmet Demir", 23, true, 450.50);`
    },
    resultState: {
      ad: "Mehmet Demir",
      yas: 23,
      kayitliMi: true,
      bakiye: 450.50
    }
  }
];

export const SIMULATION_STEPS: SimulationStep[] = [
  {
    stepNumber: 1,
    title: "1. Stack Değişkeni Tahsisi",
    subtitle: "Referans tanımlanır ancak henüz bir adrese bağlanmamıştır.",
    codeLine: "Ogrenci ogr1;",
    explanation: "İşletim sistemi / çalışma ortamı (CLR/JVM), fonksiyon çağrı yığını (Stack) üzerinde 'ogr1' adında 64-bitlik (8 byte) bir referans pointer yuvası ayırır. Bu pointer henüz bellek adresine sahip değildir (unassigned / null).",
    stackState: {
      variableName: "ogr1",
      pointerAddress: null,
      status: "allocated"
    },
    heapState: {
      address: "0x7FFEE4A0",
      allocated: false,
      fields: []
    },
    phase: "stack"
  },
  {
    stepNumber: 2,
    title: "2. 'new' Operatörü & Heap Tahsisi",
    subtitle: "Dinamik bellek yöneticisi Heap'te ham bir nesne bloğu ayırır.",
    codeLine: "new Ogrenci(\"Enes\", 25); // Heap ayrımı",
    explanation: "'new' anahtar sözcüğü devreye girer. Ogrenci sınıfının boyutuna göre (string referansı + int 4 byte + bool 1 byte + hizalama payı) Heap üzerinde benzersiz bir bellek bloğu (0x7FFEE4A0) ayrılır.",
    stackState: {
      variableName: "ogr1",
      pointerAddress: null,
      status: "allocated"
    },
    heapState: {
      address: "0x7FFEE4A0",
      allocated: true,
      fields: [
        { key: "ad", label: "Ad (string)", type: "string", value: "??? (unallocated)", isDefault: false, isHighlighted: true },
        { key: "yas", label: "Yas (int)", type: "int", value: "??? (unallocated)", isDefault: false, isHighlighted: true },
        { key: "kayitliMi", label: "KayitliMi (bool)", type: "bool", value: "??? (unallocated)", isDefault: false, isHighlighted: true }
      ]
    },
    phase: "heap_alloc"
  },
  {
    stepNumber: 3,
    title: "3. Varsayılan Değerlerin Atanması (Zero-Init)",
    subtitle: "Constructor gövdesi çalışmadan önce CPU tüm alanları sıfırlar.",
    codeLine: "// Arka planda: string = null, int = 0, bool = false",
    explanation: "Enes Öztürk'ün de dersinde vurguladığı gibi: 'Default constructor'ın görevi sınıf içerisindeki özelliklere ilk değer ataması yapılmadığında onların default değerlerini set etmektir. String için null, int için 0 atanır.'",
    stackState: {
      variableName: "ogr1",
      pointerAddress: null,
      status: "allocated"
    },
    heapState: {
      address: "0x7FFEE4A0",
      allocated: true,
      fields: [
        { key: "ad", label: "Ad (string)", type: "string", value: "null", isDefault: true, isHighlighted: true },
        { key: "yas", label: "Yas (int)", type: "int", value: "0", isDefault: true, isHighlighted: true },
        { key: "kayitliMi", label: "KayitliMi (bool)", type: "bool", value: "false", isDefault: true, isHighlighted: true }
      ]
    },
    phase: "defaults"
  },
  {
    stepNumber: 4,
    title: "4. Kurucu Metot Gövdesinin Yürütülmesi",
    subtitle: "Parametreler okunur ve 'this' referansı ile alanlara aktarılır.",
    codeLine: "public Ogrenci(string ad, int yas) { this.Ad = ad; this.Yas = yas; }",
    explanation: "Constructor metodu tetiklenir. Gönderdiğimiz \"Enes\" parametresi 'Ad' alanına, 25 değeri 'Yas' alanına yazılır. 'KayitliMi' için parametre verilmediğinden o varsayılan 'false' değerini korur.",
    stackState: {
      variableName: "ogr1",
      pointerAddress: null,
      status: "allocated"
    },
    heapState: {
      address: "0x7FFEE4A0",
      allocated: true,
      fields: [
        { key: "ad", label: "Ad (string)", type: "string", value: "\"Enes\"", isDefault: false, isHighlighted: true },
        { key: "yas", label: "Yas (int)", type: "int", value: "25", isDefault: false, isHighlighted: true },
        { key: "kayitliMi", label: "KayitliMi (bool)", type: "bool", value: "false", isDefault: true, isHighlighted: false }
      ]
    },
    phase: "constructor_body"
  },
  {
    stepNumber: 5,
    title: "5. Pointer Bağlantısı (Stack'e Referansın Verilmesi)",
    subtitle: "Heap adresi Stack değişkenine yazılır, nesne kullanıma hazır hale gelir.",
    codeLine: "ogr1 = [0x7FFEE4A0]; // Atama tamamlandı",
    explanation: "'new' işlemi oluşturulan nesnenin Heap bellek adresini (0x7FFEE4A0) döndürür ve Stack'teki 'ogr1' referansına yazar. Artık 'ogr1.Ad' diyerek nesneye doğrudan erişebiliriz!",
    stackState: {
      variableName: "ogr1",
      pointerAddress: "0x7FFEE4A0",
      status: "assigned"
    },
    heapState: {
      address: "0x7FFEE4A0",
      allocated: true,
      fields: [
        { key: "ad", label: "Ad (string)", type: "string", value: "\"Enes\"", isDefault: false, isHighlighted: false },
        { key: "yas", label: "Yas (int)", type: "int", value: "25", isDefault: false, isHighlighted: false },
        { key: "kayitliMi", label: "KayitliMi (bool)", type: "bool", value: "false", isDefault: true, isHighlighted: false }
      ]
    },
    phase: "pointer_bind"
  }
];

export const PITFALLS: PitfallItem[] = [
  {
    id: "pitfall_void",
    title: "Tuzak 1: Constructor Başına 'void' Eklemek",
    description: "Acemi yazılımcıların en sık yaptığı hata kurucu metodun önüne geri dönüş tipi olarak 'void' koymaktır.",
    badCode: `public class Musteri
{
    // HATA: void yazdığımız için artık kurucu metot DEĞİLDİR!
    // Derleyici bunu sıradan bir metot olarak algılar.
    public void Musteri()
    {
        Console.WriteLine("Müşteri nesnesi oluşturuldu.");
    }
}

Musteri m = new Musteri(); // Çıktı vermez! Kurucu çalışmaz.`,
    badReason: "Geri dönüş değeri (`void` dahil) belirtilen bir metot asla constructor olamaz; derleyici onu nesne örneği oluştuktan sonra elle çağrılabilecek sıradan bir metot sayar.",
    goodCode: `public class Musteri
{
    // DOĞRU: Asla geri dönüş tipi yazılmaz!
    public Musteri()
    {
        Console.WriteLine("Müşteri nesnesi başarıyla oluşturuldu.");
    }
}

Musteri m = new Musteri(); // Konsola anında yazar!`,
    goodReason: "Kurucu metotların geri dönüş tipi kesinlikle olamaz. İsimleri sınıf ile birebir aynı olmalı ve hiçbir tür bildirilmemelidir."
  },
  {
    id: "pitfall_missing_default",
    title: "Tuzak 2: Parametreli Kurucu Yazınca Varsayılanın Kaybolması",
    description: "Herhangi bir parametreli constructor tanımlandığında, derleyici otomatik varsayılan parametresiz constructor'ı derhal imha eder.",
    badCode: `public class Kitap
{
    public string Baslik;

    // Tek bir parametreli constructor tanımlandı:
    public Kitap(string baslik)
    {
        this.Baslik = baslik;
    }
}

// DERLEME HATASI! (CS7036 / Cannot find constructor Kitap())
Kitap k = new Kitap();`,
    badReason: "Geliştirici kendi yapıcı metodunu tanımladığı anda, derleyicinin varsayılan kurucu üretme sorumluluğu sona erer. Dolayısıyla `new Kitap()` çağrısı için kurucu bulunamaz.",
    goodCode: `public class Kitap
{
    public string Baslik;

    // ÇÖZÜM: Hem parametresiz hem parametreli kurucuyu overload edin!
    public Kitap() 
    {
        this.Baslik = "İsimsiz Kitap";
    }

    public Kitap(string baslik)
    {
        this.Baslik = baslik;
    }
}

Kitap k1 = new Kitap();           // Sorunsuz çalışır!
Kitap k2 = new Kitap("Suç ve Ceza"); // Sorunsuz çalışır!`,
    goodReason: "Parametresiz kullanımı desteklemek istiyorsanız, onu da aşırı yükleme (overload) ile açıkça kodlamalısınız."
  },
  {
    id: "pitfall_shadowing",
    title: "Tuzak 3: 'this' Kullanımını Unutmak (Değişken Gölgeleme)",
    description: "Parametre adı ile sınıf alanı aynı olduğunda 'this' belirtilmezse alan hiçbir zaman güncellenmez.",
    badCode: `public class Calisan
{
    public string Ad;

    public Calisan(string Ad)
    {
        // HATA: Parametreyi parametrenin kendisine atar!
        // Sınıfın 'this.Ad' alanına dokunulmaz.
        Ad = Ad; 
    }
}

Calisan c = new Calisan("Kemal");
Console.WriteLine(c.Ad); // Çıktı: null! (Hala varsayılan değer)`,
    badReason: "Yerel parametre, sınıf seviyesindeki alanı gölgeler (shadowing). `Ad = Ad;` ifadesi yerel değişkeni kendisine atayarak no-op (işlevsiz) hale gelir.",
    goodCode: `public class Calisan
{
    public string Ad;

    public Calisan(string Ad)
    {
        // DOĞRU: 'this' nesne örneğinin kendi alanını temsil eder
        this.Ad = Ad; 
    }
}

Calisan c = new Calisan("Kemal");
Console.WriteLine(c.Ad); // Çıktı: "Kemal"`,
    goodReason: "`this.Ad` ifadesi açıkça sınıf örneğindeki üye değişkeni işaret eder ve çakışmayı önler."
  },
  {
    id: "pitfall_infinite_chain",
    title: "Tuzak 4: Kurucular Arası Sonsuz Çağrı Döngüsü (Stack Overflow)",
    description: "Kurucuları `this()` ile birbirine bağlarken karşılıklı döngü oluşturmak sistemi kilitler.",
    badCode: `public class Nokta
{
    public int X, Y;

    // Kurucu 1, Kurucu 2'yi çağırıyor
    public Nokta() : this(0, 0) {}

    // Kurucu 2, tekrar Kurucu 1'i çağırıyor!
    public Nokta(int x, int y) : this() 
    {
        this.X = x; this.Y = y;
    }
}
// Sonuç: Derleme hatası veya sonsuz StackOverflowException!`,
    badReason: "Kurucu zincirinde sonlandırıcı bir ana kurucu olmalıdır. Döngüsel referanslar yığını tüketir.",
    goodCode: `public class Nokta
{
    public int X, Y;

    // Parametresiz kurucu, parametreli ana kurucuyu çağırır:
    public Nokta() : this(0, 0) {}

    // Ana kurucu bağımsızdır ve gerçek atamayı yapar:
    public Nokta(int x, int y)
    {
        this.X = x;
        this.Y = y;
    }
}`,
    goodReason: "Tüm yardımcı kurucular en kapsamlı ana kurucuya (designated initializer) delege edilmeli, zincir tek yönlü olmalıdır."
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Aşağıdakilerden hangisi bir kurucu (constructor) metodun zorunlu kurallarından biri DEĞİLDİR?",
    options: [
      { id: "A", text: "İsmi mutlaka sınıf ismiyle birebir aynı olmalıdır.", isCorrect: false },
      { id: "B", text: "Geri dönüş değeri (void dahil) asla yazılamaz.", isCorrect: false },
      { id: "C", text: "Her kurucu metot en az bir parametre almak zorundadır.", isCorrect: true },
      { id: "D", text: "Genel nesne üretiminde 'public' olarak bildirilmelidir.", isCorrect: false }
    ],
    explanation: "Kurucu metotlar parametresiz (default constructor) de olabilir, parametre almak zorunda değildir. İsmi sınıfla aynı olmalı ve geri dönüş tipi olmamalıdır."
  },
  {
    id: 2,
    question: "Bir sınıfta string tipinde 'Ad' ve int tipinde 'Yas' özellikleri vardır. Parametresiz varsayılan kurucu çalıştığında bu özelliklerin değerleri ne olur?",
    options: [
      { id: "A", text: "Ad = \"\", Yas = 0", isCorrect: false },
      { id: "B", text: "Ad = null, Yas = 0", isCorrect: true },
      { id: "C", text: "Ad = null, Yas = null", isCorrect: false },
      { id: "D", text: "Ad = \"Tanımsız\", Yas = -1", isCorrect: false }
    ],
    explanation: "Enes Öztürk'ün notunda belirtildiği gibi: Varsayılan kurucu sınıf özelliklerine ilk değer ataması yapılmadığında string referans tipine 'null', int değer tipine ise '0' değerini arka planda otomatik atar."
  },
  {
    id: 3,
    question: "Bir sınıfa aşağıdaki metot yazılmıştır:\npublic void Araba() { ... }\nBu kod hakkında hangisi doğrudur?",
    options: [
      { id: "A", text: "Geçerli bir parametresiz kurucu (constructor) metodudur.", isCorrect: false },
      { id: "B", text: "Geri dönüş tipi 'void' yazıldığı için artık kurucu metot değildir, sıradan bir metottur.", isCorrect: true },
      { id: "C", text: "Derleme zamanında derleyici syntax hatası verir ve kodu derlemez.", isCorrect: false },
      { id: "D", text: "Yalnızca statik olarak çağrılabilen bir kurucu olur.", isCorrect: false }
    ],
    explanation: "Constructor metotların geri dönüş tipi kesinlikle olamaz. Önüne 'void' yazıldığında derleyici syntax hatası vermez; onu sıradan bir metot sayar ve nesne `new Araba()` ile üretilirken bu metot ÇALIŞMAZ!"
  },
  {
    id: 4,
    question: "Geliştirici bir sınıfa 'public Ogrenci(string ad)' kurucusunu yazdı fakat parametresiz kurucu yazmadı. Sonrasında 'Ogrenci o = new Ogrenci();' çağrısı yaparsa ne gerçekleşir?",
    options: [
      { id: "A", text: "Derleyici varsayılan kurucuyu hala arka planda koruduğu için kod hatasız çalışır.", isCorrect: false },
      { id: "B", text: "Derleyici nesneyi üretir fakat ad özelliğini otomatik olarak 'Bilinmeyen' yapar.", isCorrect: false },
      { id: "C", text: "Derleme hatası (Compile Error) verir; çünkü parametreli kurucu yazılınca otomatik varsayılan kurucu iptal olur.", isCorrect: true },
      { id: "D", text: "Çalışma zamanında NullReferenceException fırlatılır.", isCorrect: false }
    ],
    explanation: "Eğer bir sınıfa en az bir adet parametreli kurucu tanımlarsanız, derleyici otomatik ürettiği parametresiz varsayılan kurucuyu artık sağlamaz. Parametresiz kullanım için onu da açıkça yazmanız gerekir."
  },
  {
    id: 5,
    question: "Kurucu metotların aşırı yüklenmesi (Constructor Overloading) ne anlama gelir?",
    options: [
      { id: "A", text: "Bir sınıfın RAM'de çok fazla bellek tüketerek sistemi yavaşlatması.", isCorrect: false },
      { id: "B", text: "Aynı sınıfta farklı parametre sayısı ya da tiplerine sahip birden fazla kurucu metot tanımlayabilmek.", isCorrect: true },
      { id: "C", text: "Bir kurucunun alt sınıflar tarafından override (ezilmesi) edilmesi.", isCorrect: false },
      { id: "D", text: "Kurucu metodun aynı anda birden fazla nesneye işaret edebilmesi.", isCorrect: false }
    ],
    explanation: "Aşırı yükleme (overloading); aynı isimli kurucu metodun farklı imzalara (parametre listelerine) sahip birden çok versiyonunun yazılabilmesidir (Örn: Ogrenci(), Ogrenci(ad), Ogrenci(ad, yas))."
  }
];
