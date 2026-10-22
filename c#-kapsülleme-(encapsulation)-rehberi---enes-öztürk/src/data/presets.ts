import { PresetModel } from '../types';

export const PRESETS: PresetModel[] = [
  {
    id: 'person',
    title: 'Person (Yaş Koruması)',
    subtitle: 'Kullanıcının paylaştığı negatif yaş atamasını engelleyen korumalı sınıf',
    fieldName: 'age',
    fieldType: 'int',
    initialFieldValue: 0,
    propertyName: 'Age',
    hasValidation: true,
    validationDescription: 'value > 0 (Yaş yalnızca sıfırdan büyük pozitif değerler alabilir)',
    csharpCode: `class Person
{
    private int age = 0; // Field (Gizli alan - sınıf dışından erişilemez)

    public int Age // Property (Kapsüllenen kontrollü erişim kapısı)
    {
        get 
        { 
            return age; 
        }
        set 
        {
            if (value > 0)
                age = value; // Sadece sıfırdan büyükse belleğe yaz
        }
    }
}`,
    testOptions: {
      validExamples: [
        { label: 'Geçerli Yaş (25)', value: 25, explanation: '25 > 0 koşulu DOĞRU olduğu için age belleğine 25 yazılır.' },
        { label: 'Geçerli Yaş (1)', value: 1, explanation: '1 > 0 koşulu DOĞRU olduğu için kabul edilir.' },
        { label: 'Geçerli Yaş (70)', value: 70, explanation: '70 > 0 koşulu DOĞRU olduğu için kabul edilir.' },
      ],
      invalidExamples: [
        { label: 'Negatif Değer (-5)', value: -5, explanation: '-5 > 0 koşulu YANLIŞTIR! Atama iptal edilir, eski değer korunur.' },
        { label: 'Sıfır Değeri (0)', value: 0, explanation: '0 > 0 koşulu YANLIŞTIR (eşitlik kapsanmıyor). Koruma devrededir.' },
        { label: 'Hatalı Negatif (-99)', value: -99, explanation: 'Bilinçsiz veri girişi engellendi. Nesnenin tutarlılığı güvence altındadır.' },
      ],
    },
    validate: (val: any) => {
      const num = Number(val);
      if (isNaN(num)) {
        return { success: false, errorReason: 'Geçersiz sayısal değer girildi.' };
      }
      if (num > 0) {
        return { success: true, transformedVal: num };
      }
      return {
        success: false,
        errorReason: `Koşul sağlanamadı: (${num} > 0) FALSE üretti. 'age' field'ının değeri değiştirilmedi!`,
      };
    },
  },
  {
    id: 'ogrenci',
    title: 'Ogrenci (İsim Kapsülleme)',
    subtitle: 'Kullanıcının paylaştığı temel name field & Name property yapısı',
    fieldName: 'name',
    fieldType: 'string',
    initialFieldValue: '"Tanımsız"',
    propertyName: 'Name',
    hasValidation: true,
    validationDescription: '!string.IsNullOrWhiteSpace(value) (Boş veya yalnızca boşluk girilemez)',
    csharpCode: `class Ogrenci
{
    private string name; // field: Dışarıdan doğrudan erişime kapalıdır

    public string Name // property: Güvenli okuma (get) ve atama (set) noktası
    {
        get 
        { 
            return name; 
        }
        set 
        { 
            if (!string.IsNullOrWhiteSpace(value))
                name = value.Trim(); // Boşlukları temizleyerek ata
        }
    }
}`,
    testOptions: {
      validExamples: [
        { label: 'İsim ("Enes Öztürk")', value: 'Enes Öztürk', explanation: 'Geçerli metin girişi. Trim yapılarak belleğe kaydedilir.' },
        { label: 'İsim ("Ahmet")', value: 'Ahmet', explanation: 'Geçerli isim.' },
        { label: 'Boşluklu ("  Zeynep  ")', value: '  Zeynep  ', explanation: 'Kapsülleme sayesinde baştaki ve sondaki boşluklar filtrelenir.' },
      ],
      invalidExamples: [
        { label: 'Boş Metin ("")', value: '', explanation: 'Boş isim girilemez! Validasyon atamayı durdurur.' },
        { label: 'Sadece Boşluk ("   ")', value: '   ', explanation: 'Yalnızca boşluk karakterleri geçersizdir.' },
      ],
    },
    validate: (val: any) => {
      const str = String(val ?? '');
      if (str.trim().length > 0) {
        return { success: true, transformedVal: `"${str.trim()}"` };
      }
      return {
        success: false,
        errorReason: 'İsim boş olamaz! (!string.IsNullOrWhiteSpace kontrolü başarısız oldu).',
      };
    },
  },
  {
    id: 'bank',
    title: 'BankaHesabi (Salt-Okunur Bakiye)',
    subtitle: 'Bakiye doğrudan değiştirilemez; sadece ParaYatir/ParaCek metotlarıyla güncellenebilir',
    fieldName: 'balance',
    fieldType: 'decimal',
    initialFieldValue: 1000,
    propertyName: 'Balance',
    hasValidation: true,
    validationDescription: 'Salt-Okunur (get var, set yok) - Bakiye dışarıdan keyfi değiştirilemez!',
    csharpCode: `class BankaHesabi
{
    private decimal balance = 1000m; // Gizli bakiye alanı

    // Sadece okunabilir Property (Read-Only)
    public decimal Balance 
    {
        get { return balance; }
        // set metodu YOK: Dışarıdan 'hesap.Balance = 999999;' yapılamaz!
    }

    public void ParaYatir(decimal tutar)
    {
        if (tutar > 0) balance += tutar;
    }
}`,
    testOptions: {
      validExamples: [
        { label: 'Para Yatır (+250 ₺)', value: 250, explanation: 'İş kuralı: Kontrollü metot ile pozitif para yatırma.' },
        { label: 'Para Yatır (+500 ₺)', value: 500, explanation: 'Bakiye güvenli biçimde artırılır.' },
      ],
      invalidExamples: [
        { label: 'Doğrudan Değer Atama (Balance = 500000)', value: 'direct_assign', explanation: 'HATA: Balance salt-okunurdur (get-only). Dışarıdan atama yapılamaz!' },
        { label: 'Negatif Para Yatırma (-100 ₺)', value: -100, explanation: 'HATA: Negatif tutarla bakiye manipülasyonu engellendi.' },
      ],
    },
    validate: (val: any) => {
      if (val === 'direct_assign') {
        return {
          success: false,
          errorReason: "Derleme Hatası: 'BankaHesabi.Balance' özelliği salt-okunurdur (set erişimcisi yoktur).",
        };
      }
      const num = Number(val);
      if (isNaN(num) || num <= 0) {
        return { success: false, errorReason: 'Yatırılacak tutar pozitif bir değer olmalıdır.' };
      }
      return { success: true, transformedVal: 1000 + num };
    },
  },
  {
    id: 'game',
    title: 'OyunKarakteri (Can / HP Sınırlandırma)',
    subtitle: 'Can puanı asla 0 altına inemez ve 100 üstüne çıkamaz (Math.Clamp mantığı)',
    fieldName: 'health',
    fieldType: 'int',
    initialFieldValue: 100,
    propertyName: 'Health',
    hasValidation: true,
    validationDescription: '0 <= value <= 100 (Karakter canı her zaman 0-100 aralığına kenetlenir)',
    csharpCode: `class OyunKarakteri
{
    private int health = 100; // Karakterin gerçek can değeri

    public int Health
    {
        get { return health; }
        set
        {
            if (value < 0)
                health = 0; // Can 0'ın altına düşemez (Ölüm durumu)
            else if (value > 100)
                health = 100; // Can maksimum 100 olabilir
            else
                health = value;
        }
    }
}`,
    testOptions: {
      validExamples: [
        { label: 'Hasar Al (Health = 65)', value: 65, explanation: '65 değeri [0, 100] aralığında olduğu için doğrudan uygulanır.' },
        { label: 'Aşırı İyileştirme (Health = 150)', value: 150, explanation: 'Kapsülleme sayesinde 150 yerine maksimum sınır olan 100 atanır.' },
        { label: 'Aşırı Hasar (Health = -40)', value: -40, explanation: 'Negatif can olamaz; kapsülleme mantığı bunu 0 yapar.' },
      ],
      invalidExamples: [
        { label: 'Sahte Hasar ("abc")', value: 'abc', explanation: 'Geçersiz veri tipi.' },
      ],
    },
    validate: (val: any) => {
      const num = Number(val);
      if (isNaN(num)) {
        return { success: false, errorReason: 'Geçersiz sayısal can değeri.' };
      }
      const clamped = Math.max(0, Math.min(100, num));
      return { success: true, transformedVal: clamped };
    },
  },
];
