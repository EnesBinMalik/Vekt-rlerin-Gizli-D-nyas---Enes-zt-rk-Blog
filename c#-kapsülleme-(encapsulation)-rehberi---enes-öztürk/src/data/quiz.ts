import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Kapsülleme (Encapsulation) kavramının temel amacı aşağıdakilerden hangisidir?",
    options: [
      "Bir sınıfın tüm verilerini her yerden serbestçe değiştirilebilir kılmak",
      "Bir özelliği başka sınıflardan saklamak, korumak ve kontrollü erişim sağlamak",
      "Kodun derlenme süresini sıfıra indirmek",
      "Tüm değişkenleri public yaparak erişimi kolaylaştırmak",
    ],
    correctIndex: 1,
    explanation:
      "Kapsülleme, nesne yönelimli programlamanın (OOP) temel direklerinden biridir. Amacı, nesnenin iç durumunu (field'ları) dış müdahalelerden ve bilinçsiz atamalardan korumak, erişimi ise Property'ler (get/set) aracılığıyla kontrollü hale getirmektir.",
  },
  {
    id: 2,
    question: "Bir Property'nin 'set' bloğunda dışarıdan gelen yeni değeri temsil eden C# anahtar kelimesi hangisidir?",
    codeSnippet: `public int Age
{
    get { return age; }
    set {
        if (value > 0)
            age = value;
    }
}`,
    options: ["input", "newValue", "value", "target"],
    correctIndex: 2,
    explanation:
      "C#'ta property set bloğu içerisinde dışarıdan gönderilen veri otomatik olarak 'value' örtük (implicit) parametresiyle temsil edilir.",
  },
  {
    id: 3,
    question: "Aşağıdaki kod parçasında 'age = -15;' ataması yapıldığında ne gerçekleşir?",
    codeSnippet: `Person p = new Person(); // Varsayılan age = 0
p.Age = -15; // Age property'si çağrılıyor
Console.WriteLine(p.Age);`,
    options: [
      "Program çalışma zamanı hatası (Runtime Exception) fırlatır",
      "age değişkeni -15 değerini alır",
      "if (value > 0) koşulu sağlanamadığı için atama yapılmaz, age 0 olarak kalır",
      "age değişkeni otomatik olarak 15 yapılır",
    ],
    correctIndex: 2,
    explanation:
      "Person sınıfındaki set bloğu 'if (value > 0)' kontrolü yapmaktadır. -15 değeri sıfırdan büyük olmadığı için şart sağlanmaz ve 'age = value;' satırı çalıştırılmaz. Böylece age önceki değeri olan 0'da kalır.",
  },
  {
    id: 4,
    question: "Bir field'ın sadece okunabilmesini (Read-Only) ama dışarıdan değiştirilememesini sağlamak için ne yapılmalıdır?",
    options: [
      "Property'de sadece 'get' bloğu tanımlanmalı, 'set' bloğu yazılmamalıdır",
      "Field'ı 'public' olarak işaretlemek yeterlidir",
      "Property'de sadece 'set' bloğu tanımlanmalıdır",
      "get bloğu içine 'throw new Exception()' yazılmalıdır",
    ],
    correctIndex: 0,
    explanation:
      "Bir property'de yalnızca 'get' erişimcisi tanımlanıp 'set' erişimcisi çıkarıldığında, bu property salt-okunur (read-only) hale gelir. Dış sınıflar değeri okuyabilir ancak 'nesne.Ozellik = x;' şeklinde değer atayamaz.",
  },
  {
    id: 5,
    question: "Field ile Property arasındaki fark hakkında hangisi DOĞRUDUR?",
    options: [
      "Field bir metottur, Property ise bellekte doğrudan yer tutan değişkendir",
      "Field doğrudan veriyi tutan değişkendir (genelde private); Property ise bu veriye kontrollü erişim sağlayan akıllı sarmalayıcıdır",
      "C#'ta field kullanmak yasaktır, sadece property kullanılmalıdır",
      "Property'lerin içine if/else gibi doğrulama kuralları yazılamaz",
    ],
    correctIndex: 1,
    explanation:
      "Field (alan), sınıf içinde veriyi doğrudan depolayan bellektir (genellikle 'private' yapılır). Property (özellik) ise get ve set metotları gibi davranarak bu field'a erişirken doğrulama, filtreleme veya hesaplama yapılmasına imkan tanır.",
  },
];
