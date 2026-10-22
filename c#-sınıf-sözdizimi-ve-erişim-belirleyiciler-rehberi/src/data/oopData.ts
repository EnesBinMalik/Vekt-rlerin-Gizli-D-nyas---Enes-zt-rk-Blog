/**
 * C# OOP Rehberi İçerik ve Simülasyon Verileri
 * Hazırlayan / İmza: Enes Öztürk
 */

export interface FieldItem {
  id: string;
  name: string;
  accessModifier: 'public' | 'private' | 'protected' | 'internal';
  dataType: string;
  defaultValue?: string;
  description: string;
}

export interface MethodItem {
  id: string;
  name: string;
  accessModifier: 'public' | 'private' | 'protected' | 'internal';
  returnType: string;
  parameters: string;
  body: string;
  description: string;
}

export interface AccessModifierInfo {
  name: 'public' | 'private' | 'internal' | 'protected';
  displayName: string;
  shortDesc: string;
  analogy: string;
  detail: string;
  color: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  scopeRules: {
    sameClass: boolean;
    sameAssemblyDerived: boolean;
    sameAssemblyOther: boolean;
    diffAssemblyDerived: boolean;
    diffAssemblyOther: boolean;
  };
}

export const ACCESS_MODIFIERS: AccessModifierInfo[] = [
  {
    name: 'public',
    displayName: 'Public (Genel)',
    shortDesc: 'Her yerden erişilebilir.',
    analogy: 'Halka açık kütüphane veya bina girişi. İzin veya kimlik kontrolü gerekmez.',
    detail: 'Öğeye aynı sınıf içinden, aynı projedeki diğer sınıflardan ve referans verilen harici projelerden (farklı assembly) doğrudan erişilebilir. Dış dünyaya sunulan servis ve metotlar genellikle public yapılır.',
    color: 'emerald',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    scopeRules: {
      sameClass: true,
      sameAssemblyDerived: true,
      sameAssemblyOther: true,
      diffAssemblyDerived: true,
      diffAssemblyOther: true,
    },
  },
  {
    name: 'private',
    displayName: 'Private (Gizli / Özel)',
    shortDesc: 'Sadece tanımlandığı sınıf içerisinden erişilebilir.',
    analogy: 'Kişisel cüzdanınız veya evinizin yatak odası. Sadece sahibi erişebilir.',
    detail: 'C# dilinde sınıf üyelerinin (field, metot) varsayılan erişim belirleyicisidir. Dışarıdan doğrudan değiştirilmemesi gereken veriler (field\'lar) private tanımlanarak Kapsülleme (Encapsulation) ilkesi korunur.',
    color: 'rose',
    badgeBg: 'bg-rose-50 dark:bg-rose-950/40',
    badgeText: 'text-rose-700 dark:text-rose-300',
    borderColor: 'border-rose-200 dark:border-rose-800',
    scopeRules: {
      sameClass: true,
      sameAssemblyDerived: false,
      sameAssemblyOther: false,
      diffAssemblyDerived: false,
      diffAssemblyOther: false,
    },
  },
  {
    name: 'internal',
    displayName: 'Internal (Dahili)',
    shortDesc: 'Sadece bulunduğu proje (assembly) içerisinden erişilebilir.',
    analogy: 'Şirket personeline özel bina kartı. Şirket çalışanları kullanabilir, dış müşteriler giremez.',
    detail: 'Sadece aynı derleme (assembly/.dll/.exe) içindeki sınıflar erişebilir. Proje dışına (referans veren başka projelere) kapalıdır. Modül içi yardımcı araçlar ve altyapı sınıfları için idealdir.',
    color: 'amber',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/40',
    badgeText: 'text-amber-700 dark:text-amber-300',
    borderColor: 'border-amber-200 dark:border-amber-800',
    scopeRules: {
      sameClass: true,
      sameAssemblyDerived: true,
      sameAssemblyOther: true,
      diffAssemblyDerived: false,
      diffAssemblyOther: false,
    },
  },
  {
    name: 'protected',
    displayName: 'Protected (Korumalı)',
    shortDesc: 'Sadece tanımlandığı sınıfta ya da o sınıfı miras alan sınıflardan erişilebilir.',
    analogy: 'Aile yadigârı saat. Sadece ebeveyn ve miras bıraktığı çocukları kullanabilir, komşu kullanamaz.',
    detail: 'Kalıtım (Inheritance) mekanizmasında kilit rol oynar. Sınıfın kendisi ve ondan türeyen alt sınıflar (subclass) erişebilir; miras ilişkisi olmayan sınıflar ve dış projeler erişemez.',
    color: 'indigo',
    badgeBg: 'bg-indigo-50 dark:bg-indigo-950/40',
    badgeText: 'text-indigo-700 dark:text-indigo-300',
    borderColor: 'border-indigo-200 dark:border-indigo-800',
    scopeRules: {
      sameClass: true,
      sameAssemblyDerived: true,
      sameAssemblyOther: false,
      diffAssemblyDerived: true,
      diffAssemblyOther: false,
    },
  },
];

export const ACCESS_SCENARIOS = [
  {
    id: 'sameClass',
    title: 'Aynı Sınıf İçi',
    description: 'BankaHesabi sınıfı içerisindeki başka bir metottan çağırma',
    callerCode: `class BankaHesabi {
    void TestMetodu() {
        // [HEDEF_CAGRI]
    }
}`,
  },
  {
    id: 'sameAssemblyOther',
    title: 'Aynı Projede Başka Sınıf',
    description: 'Aynı projedeki Program.cs veya MusteriServisi sınıfından çağırma',
    callerCode: `class Program {
    static void Main() {
        BankaHesabi hesap = new BankaHesabi();
        // [HEDEF_CAGRI]
    }
}`,
  },
  {
    id: 'sameAssemblyDerived',
    title: 'Aynı Projede Miras Alan Sınıf (Türemiş)',
    description: 'Aynı projede BankaHesabi\'ndan türeyen VadeliHesap sınıfı içinden çağırma',
    callerCode: `class VadeliHesap : BankaHesabi {
    void FaizHesapla() {
        // [HEDEF_CAGRI]
    }
}`,
  },
  {
    id: 'diffAssemblyOther',
    title: 'Farklı Projedeki Dış Sınıf (DLL)',
    description: 'BankaHesabi\'nı referans alan farklı bir Web/API projesinden çağırma',
    callerCode: `// BankaProjesi.dll referans alındı
class WebRaporlayici {
    void RaporAl() {
        BankaHesabi hesap = new BankaHesabi();
        // [HEDEF_CAGRI]
    }
}`,
  },
  {
    id: 'diffAssemblyDerived',
    title: 'Farklı Projedeki Miras Alan Sınıf',
    description: 'Farklı bir projede tanımlanmış ve BankaHesabi\'ndan miras alan sınıf',
    callerCode: `// BankaProjesi.dll referans alındı
class KurumsalHesap : BankaHesabi {
    void Islem() {
        // [HEDEF_CAGRI]
    }
}`,
  },
];

export interface QuizQuestion {
  id: number;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  conceptKey: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "C# dilinde bir sınıfın (class) içinde hiçbir erişim belirleyici yazılmazsa, field veya metot için varsayılan (default) erişim belirleyici hangisidir?",
    codeSnippet: `class Musteri {
    string adSoyad; // Hangi erişim belirleyiciye sahiptir?
}`,
    options: [
      "public",
      "private",
      "protected",
      "internal"
    ],
    correctAnswer: 1,
    explanation: "C#'ta sınıf içi üyelerde (field ve metotlar) hiçbir belirleyici yazılmazsa varsayılan olarak 'private' kabul edilir. Sınıf seviyesinde ise (class Musteri) varsayılan 'internal'dır.",
    conceptKey: "Varsayılan Erişim",
  },
  {
    id: 2,
    question: "Aşağıdaki senaryoda hangi erişim belirleyici kullanılmalıdır? 'Bir değişkeni sadece tanımlandığı sınıf ve o sınıfı miras alan alt sınıflar görebilsin, ancak dışarıdaki diğer sınıflara kapalı olsun.'",
    options: [
      "internal",
      "private",
      "protected",
      "public"
    ],
    correctAnswer: 2,
    explanation: "Kalıtım (inheritance) senaryolarında, alt sınıflara erişim izni verip dış sınıflardan gizlemek için 'protected' kullanılır.",
    conceptKey: "Kalıtım & Kapsülleme",
  },
  {
    id: 3,
    question: "Bir field'ın sadece aynı proje (assembly) içindeki sınıflar tarafından okunabilmesi, dışarıdan referans alan projelere ise gizlenmesi için hangisi seçilmelidir?",
    options: [
      "public",
      "protected",
      "internal",
      "private"
    ],
    correctAnswer: 2,
    explanation: "'internal' anahtar kelimesi, öğenin yalnızca derlendiği assembly (.dll veya .exe) sınırları içinde görünür olmasını sağlar.",
    conceptKey: "Assembly Sınırları",
  },
  {
    id: 4,
    question: "Neden tüm kodları tek bir devasa metotta veya tek bir sınıfta yazmak yerine sınıflara böleriz?",
    options: [
      "C# derleyicisi 100 satırdan uzun metotları derleyemediği için",
      "Kod tekrarını azaltmak, okunabilirliği ve yeniden kullanılabilirliği artırmak ve projeyi kolayca genişletebilmek için",
      "Sadece değişken isimleri çakışmasın diye",
      "Metotlar hafızada sınıflardan daha çok yer kapladığı için"
    ],
    correctAnswer: 1,
    explanation: "Metotları ve sınıfları parçalamak; Single Responsibility (Tek Sorumluluk) ilkesi gereği kod tekrarını önler, okunabilirliği yükseltir, bakım ve genişletmeyi kolaylaştırır.",
    conceptKey: "OOP Felsefesi",
  },
  {
    id: 5,
    question: "Aşağıdaki kod parçası derlenirken nasıl bir sonuç üretir?",
    codeSnippet: `class Araba {
    private int motorHacmi = 1600;
}

class Program {
    static void Main() {
        Araba a = new Araba();
        Console.WriteLine(a.motorHacmi);
    }
}`,
    options: [
      "Ekrana '1600' yazar, sorunsuz çalışır.",
      "Derleme Hatası (CS0122: 'motorHacmi' koruma düzeyi nedeniyle erişilemez).",
      "Çalışma zamanında NullReferenceException fırlatır.",
      "Motor hacmini 0 olarak ekrana basar."
    ],
    correctAnswer: 1,
    explanation: "'motorHacmi' private olarak tanımlandığı için sadece Araba sınıfının kendi gövdesinden erişilebilir. Program sınıfından doğrudan 'a.motorHacmi' şeklinde erişilemez ve CS0122 derleme hatası alınır.",
    conceptKey: "Derleyici Koruması",
  },
];
