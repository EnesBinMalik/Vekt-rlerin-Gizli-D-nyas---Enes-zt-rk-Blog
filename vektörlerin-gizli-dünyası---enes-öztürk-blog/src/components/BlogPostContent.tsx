import React from 'react';
import { OrangePeelSimulation } from './simulations/OrangePeelSimulation';
import { DistanceConcentrationSimulation } from './simulations/DistanceConcentrationSimulation';
import { VectorSemanticSpace } from './simulations/VectorSemanticSpace';
import { InteractiveQuizCard } from './InteractiveQuizCard';
import { CodePlayground } from './CodePlayground';
import { PYTHON_EXPERIMENT_CODE } from '../data/blogPost';
import { FontSize } from '../types/blog';
import { Sparkles, Compass, Lightbulb, Quote, ChevronRight, Eye, ShieldCheck } from 'lucide-react';

interface BlogPostContentProps {
  fontSize: FontSize;
}

export const BlogPostContent: React.FC<BlogPostContentProps> = ({ fontSize }) => {
  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'sm':
        return 'text-[16px] leading-[1.75]';
      case 'lg':
        return 'text-[20px] leading-[1.9]';
      case 'xl':
        return 'text-[22px] leading-[2.0]';
      case 'base':
      default:
        return 'text-[18px] leading-[1.85]';
    }
  };

  return (
    <article className={`font-reading text-stone-800 dark:text-stone-200 transition-all ${getFontSizeClass()}`}>
      {/* SECTION 1: GİRİŞ */}
      <section id="giris" className="scroll-mt-24 pt-4">
        <p className="drop-cap mb-6">
          Bir veri bilimi dersine ya da makine öğrenmesi kursuna ilk başladığınız anı hatırlıyor musunuz? 
          Büyük ihtimalle beyaz tahtaya ya da slayta ilk yazılan şeylerden biri, lise yıllarından beri peşimizi bırakmayan Pisagor teoreminin kılık değiştirmiş haliydi: 
          Öklid mesafe formülü.
        </p>

        <div className="my-6 rounded-xl bg-stone-100 dark:bg-stone-800/60 p-4 border-l-4 border-amber-600 font-mono text-center text-sm md:text-base text-stone-900 dark:text-stone-100 shadow-2xs">
          d(p, q) = √( ∑ᵢ₌₁ᴰ (pᵢ − qᵢ)² )
        </div>

        <p className="mb-6">
          Eğitmen bu formülü yazar, ardından iki nokta arasındaki mesafeyi bulduğumuzu söyler ve hızla bir sonraki konuya geçer. 
          Biz de başımızı sallarız; çünkü iki boyutlu bir defter yaprağında ya da üç boyutlu bir odada bu formül kusursuz işler. 
          İki nokta birbirine yakınsa "benzerdir", uzaksa "farklıdır". Basit, net, sezgisel.
        </p>

        <p className="mb-6">
          <strong>Fakat burada devasa, üzeri örtülen bir tuzak var.</strong>
        </p>

        <p className="mb-6">
          Bizim biyolojik beynimiz; avcı-toplayıcı atalarımızın ağaçların yüksekliğini, avın mesafesini ve nehir yataklarını kestirebilmesi için 
          yalnızca <strong>üç boyutta</strong> hayatta kalacak şekilde evrimleşti. Dördüncü boyutu bile gözümüzde canlandıramazken; 
          günümüz veri biliminde 100 boyutlu müşteri profilleriyle, 768 boyutlu BERT modelleriyle ve 1536 boyutlu GPT embedding uzaylarıyla çalışıyoruz.
        </p>

        {/* Intuition Callout */}
        <div className="my-8 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 p-6 border border-amber-200/80 dark:border-amber-800/40 text-stone-800 dark:text-stone-200 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold font-sans-ui text-amber-800 dark:text-amber-400 uppercase tracking-wider mb-2">
            <Lightbulb className="h-4 w-4 text-amber-600" />
            Sezgisel Çarpışma
          </div>
          <p className="font-reading italic text-base md:text-lg text-stone-900 dark:text-stone-100 leading-relaxed">
            "Boyut sayısı 3'ten 100'e çıktığında uzay sadece 'biraz daha genişlemez'; geometrinin tüm temel kuralları tersyüz olur. 
            Hacim ortadan kaybolur, mesafeler erir ve uzay neredeyse bomboş bir çöl haline gelir."
          </p>
        </div>

        <p className="mb-6">
          Bu yazıda hiçbir formülü ezberletmeyeceğim. Birlikte zihnimizin üç boyutlu hapishanesinden dışarı adım atacak; 
          100 boyutlu bir portakalı soyacak, neden herkesin herkesten eşit uzaklıkta kaldığını hissedecek ve modern yapay zekanın 
          bu tuhaf geometriden nasıl olağanüstü bir güç devşirdiğini adım adım keşfedeceğiz.
        </p>
      </section>

      {/* SECTION 2: PORTAKAL PARADOKSU */}
      <section id="portakal" className="scroll-mt-24 pt-10">
        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-sans-ui text-xs font-bold tracking-widest uppercase mb-1">
          Bölüm 01
        </div>
        <h2 className="font-sans-ui text-2xl md:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight mb-4">
          100 Boyutlu Portakalın %99’u Neden Sadece Kabuktur?
        </h2>

        <p className="mb-6">
          Masamızın üzerinde sulu, taze bir portakal hayal edelim. Portakalın toplam yarıçapı 1 birim olsun. 
          Kabuğunun kalınlığı ise yarıçapının yalnızca yüzde 5'i kadar, yani <strong>t = 0.05</strong> birim olsun. 
          Geriye kalan 0.95 birimlik kısım ise tatlı, etli iç meyvedir.
        </p>

        <p className="mb-6">
          Bunu mutfakta soyduğunuzda ne hissedersiniz? Kabuk inceciktir, portakalın neredeyse tamamı yenebilir meyvedir, öyle değil mi? 
          Hadi 3 boyuttaki hacim oranını matematiksel olarak görelim:
        </p>

        <div className="my-5 p-4 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-mono text-center text-sm">
          İç Meyve Hacmi = (0.95)³ ≈ 0.857  →  <strong>%85.7 İç Meyve, sadece %14.3 Kabuk</strong>
        </div>

        <p className="mb-6">
          Buraya kadar her şey harika. Şimdi manavdan değil, teorik fizikten bir portakal alalım ve bu portakalı <strong>100 boyutlu</strong> yapalım. 
          Yine yarıçapı 1 birim, kabuk kalınlığı yine sadece ve sadece %5 olsun.
        </p>

        <p className="mb-6">
          Sizce 100 boyutlu portakalın içindeki meyvenin hacmi ne kadardır? Zihnimiz hemen "E yine %80 civarıdır, kabuk sadece %5 kalınlığında ya!" diyerek bize fısıldar. 
          Fakat gelin aşağıdaki interaktif laboratuvarda boyut kaydırıcısını adım adım artırarak gerçeğe tanıklık edelim:
        </p>

        {/* SIMULATION 1: ORANGE PEEL */}
        <OrangePeelSimulation />

        <p className="mb-6">
          Gördüğünüz oran bir yazım hatası değildir:
        </p>

        <div className="my-5 p-4 rounded-xl bg-amber-100/70 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200 font-mono text-center text-sm md:text-base">
          (0.95)¹⁰⁰ ≈ 0.0059  →  <strong>İç Meyve: %0.59 | Kabuk: %99.41!</strong>
        </div>

        <p className="mb-6">
          İnanılmaz ama gerçek: <strong>100 boyutlu bir portakalın %99.4'ü sadece kabuktur!</strong> 
          Portakalın içine bir bıçak saplasanız, meyvenin kalbinde hiçbir şey bulamazsınız. 
          Eğer boyutu 768'e (küçük bir dil modelinin boyutu) çıkarırsanız, iç meyvenin hacmi sıfır virgül bilmem kaç tane sıfırdan sonra gelen bir sayıya düşer.
        </p>

        {/* Thought experiment card */}
        <InteractiveQuizCard
          riddleId="cube-spheres"
          question="Kafaları Daha da Karıştıralım: 100 Boyutlu Bir Küpün Köşelerindeki Küreler"
          options={[
            {
              id: 'a',
              text: 'A) Merkezdeki boşluk küçüktür, içine küre sığmaz veya minik bir küre sığar.',
              isCorrect: false,
              explanation: '3 boyutta öyle görünür ama 100 boyutta köşelerin merkezden uzaklığı o kadar büyür ki merkezdeki küre ana küpün dışına taşar!',
            },
            {
              id: 'b',
              text: 'B) Merkezdeki küre, dışındaki küpün sınırlarını delip DIŞARIYA taşar!',
              isCorrect: true,
              explanation: 'Tebrikler! D boyutta köşegen uzunluğu √D ile büyür. D > 9 olduğunda, merkezdeki kürenin yarıçapı küpün kenarını aşar. Yüksek boyutlu küplerin "diken gibi" fırlayan devasa köşeleri vardır!',
            },
            {
              id: 'c',
              text: 'C) Küpün hacmi ile kürenin hacmi her boyutta birebir aynı kalır.',
              isCorrect: false,
              explanation: 'Hayır, boyut arttıkça hiperkürenin hacmi köşelerde toplanır; hiperkürenin içine yerleştirilen küre köşelere kıyasla devede kulak kalır.',
            },
          ]}
          hint="Pisagor teoremini düşünün: 1D'de köşe mesafesi 1, 2D'de √2, 3D'de √3... 100D'de √100 = 10 katına çıkar!"
        />

        <div className="my-6">
          <h3 className="font-sans-ui text-xl font-bold text-stone-900 dark:text-white mb-2">
            Peki Bu Veri Biliminde Ne Anlama Geliyor?
          </h3>
          <p className="mb-4">
            Bu bir portakal fantezisi değil; makine öğrenmesindeki en can alıcı gerçeklerden biridir:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>
              <strong>Veriler merkeze yerleşmez:</strong> Yüksek boyutlu bir veri kümesinde, noktaların neredeyse tamamı uzayın "dış kabuğunda" (yüzeyinde) yaşar.
            </li>
            <li>
              <strong>Uzayın içi boştur:</strong> Merkez bölge tamamen ıssızdır. Veri kümeniz ne kadar büyük olursa olsun, uzayın iç hacmi o kadar devasadır ki veriniz bu uzayı dolduramaz.
            </li>
            <li>
              <strong>Örneklem Açlığı:</strong> 2 boyutta bir alanı taramak için 100 nokta yetiyorsa, 100 boyutta aynı yoğunluğu elde etmek için evrendeki tüm atomların sayısından daha fazla veriye ihtiyacınız olur!
            </li>
          </ul>
        </div>
      </section>

      {/* SECTION 3: MESAFE YOĞUNLAŞMASI */}
      <section id="mesafe" className="scroll-mt-24 pt-10">
        <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-sans-ui text-xs font-bold tracking-widest uppercase mb-1">
          Bölüm 02
        </div>
        <h2 className="font-sans-ui text-2xl md:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight mb-4">
          Mesafe Yoğunlaşması: Herkes Herkesten Eşit Uzakta!
        </h2>

        <p className="mb-6">
          Şimdi daha da sarsıcı bir fenomene gelelim: <strong>Mesafe Yoğunlaşması (Distance Concentration Phenomenon)</strong>.
        </p>

        <p className="mb-6">
          Diyelim ki bir sınıfta 100 öğrenci var. 2 boyuttaki bir sınıfta herkesin sıraları bellidir: 
          Yanınızdaki arkadaşınız size 50 cm mesafededir ("en yakın komşunuz"). 
          Arka çaprazdaki öğrenci ise 10 metre uzaktadır ("en uzak komşunuz"). 
          Yani en uzak öğrenci, en yakın öğrenciden tam 20 kat daha uzaktadır. Ayrım gayet nettir.
        </p>

        <p className="mb-6">
          Peki ya bu öğrencileri 100 boyutlu bir sınıfa yerleştirseydik?
        </p>

        <p className="mb-6">
          Merkezi Limit Teoremi'nin bir cilvesi olarak; her boyut bağımsız bir rastgele değişken ekledikçe, 
          mesafelerin varyansı ortalamanın yanında küçücük kalır. 
          Sonuçta ne olur? <strong>En yakın komşunuz ile en uzak komşunuz arasındaki mesafe neredeyse birbirine eşitlenir!</strong>
        </p>

        {/* SIMULATION 2: DISTANCE CONCENTRATION */}
        <DistanceConcentrationSimulation />

        <p className="mb-6">
          Yukarıdaki simülatörde boyut sayısını 2'den 100'e ve 300'e getirdiğinizde histogramın nasıl incecik bir iğneye dönüştüğünü gördünüz mü?
        </p>

        <p className="mb-6">
          Maksimum mesafe ile minimum mesafe arasındaki fark sıfıra yaklaşıyor:
        </p>

        <div className="my-5 p-4 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-mono text-center text-sm">
          lim (D → ∞)  [ (d_max − d_min) / d_min ] = 0
        </div>

        <blockquote className="my-8 border-l-4 border-blue-600 pl-4 py-2 font-reading italic text-lg text-stone-800 dark:text-stone-200 bg-blue-50/40 dark:bg-blue-950/20 rounded-r-xl">
          "100 boyutta kime 'yakın', kime 'uzak' diyeceksiniz? Algoritmalar için her veri noktası, diğer tüm veri noktalarından tamı tamına aynı uzaklıkta görünmeye başlar. 
          Klasik Öklid mesafesi tüm ayırt edici gücünü kaybeder."
        </blockquote>

        <p className="mb-6">
          İşte K-Nearest Neighbors (KNN) algoritmasının veya K-Means kümelemesinin yüksek boyutlarda çuvallamasının sebebi bir kod hatası değil; 
          bizzat <strong>yüksek boyutlu geometrinin doğasıdır.</strong>
        </p>
      </section>

      {/* SECTION 4: DİK AÇILAR ÜLKESİ */}
      <section id="dik-acilar" className="scroll-mt-24 pt-10">
        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-sans-ui text-xs font-bold tracking-widest uppercase mb-1">
          Bölüm 03
        </div>
        <h2 className="font-sans-ui text-2xl md:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight mb-4">
          Dik Açılar Ülkesi: Neden Tüm Vektörler Birbirine Dik?
        </h2>

        <p className="mb-6">
          Bir an durun ve masanızın üzerine gelişigüzel iki kurşun kalem fırlatın. 
          Bu iki kalemin birbirine tam 90 derecelik dik açıyla durma olasılığı nedir? Neredeyse sıfır. 
          3 boyutta da rastgele seçilen iki çizgi pek nadiren birbirine diktir.
        </p>

        <p className="mb-6">
          Peki ya 1000 boyutlu bir uzayda rastgele iki vektör seçerseniz ne olur?
        </p>

        <p className="mb-6">
          Cevap ağızları açık bırakır: <strong>Seçeceğiniz hemen hemen HER İKİ VEKTÖR birbirine neredeyse kusursuz bir dik açıyla (90°) bakar!</strong>
        </p>

        <div className="my-6 rounded-2xl bg-stone-100 dark:bg-stone-800/80 p-5 border border-stone-200 dark:border-stone-700">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-2">
            <Compass className="h-4 w-4" /> Matematiksel Sezgi: Kosinüs Neden Sıfır Olur?
          </div>
          <p className="text-sm font-sans-ui text-stone-700 dark:text-stone-300 leading-relaxed mb-3">
            İki birim vektörün iç çarpımı: <code className="font-mono bg-stone-200 dark:bg-stone-700 px-1.5 py-0.5 rounded">u · v = ∑ uᵢ · vᵢ</code>.
            D tane bağımsız boyutta bu çarpımların ortalaması sıfır etrafında toplanır. 
            Standart sapması ise <code className="font-mono bg-stone-200 dark:bg-stone-700 px-1.5 py-0.5 rounded">1 / √D</code> kadardır.
          </p>
          <div className="text-xs font-mono text-stone-600 dark:text-stone-400">
            D = 1000 iken: cos(θ) ≈ 0 ± 0.031  →  θ ≈ 90° ± 1.8° !
          </div>
        </div>

        <p className="mb-6">
          Bu olağanüstü özellik ne anlama gelir biliyor musunuz? 
          Düşük boyutlu bir odada 10 kişiyseniz birbirinize çarparsınız. 
          Fakat 1000 boyutlu bir uzayda binlerce farklı kavram, birbirinin alanına zerre kadar girmeden, 
          birbirine dik kalarak barış içinde bir arada yaşayabilir!
        </p>
      </section>

      {/* SECTION 5: VEKTÖR ARİTMETİĞİ */}
      <section id="vektor-cebiri" className="scroll-mt-24 pt-10">
        <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400 font-sans-ui text-xs font-bold tracking-widest uppercase mb-1">
          Bölüm 04
        </div>
        <h2 className="font-sans-ui text-2xl md:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight mb-4">
          Kral − Erkek + Kadın = Kraliçe: Anlamın Geometrisi
        </h2>

        <p className="mb-6">
          2013 yılında Tomas Mikolov ve ekibi Word2Vec makalesini yayınladığında, tüm yapay zeka dünyası sarsılmıştı. 
          Kelimeleri yüzlerce boyutlu sayılar dizisine (vektörlere) dönüştürdüklerinde, kelimelerin sözlük tanımlarını değil, 
          <strong>kavramsal yönlerini</strong> yakaladıklarını fark ettiler.
        </p>

        <p className="mb-6">
          Meşhur formülü hatırlayalım:
        </p>

        <div className="my-5 p-4 rounded-xl bg-purple-900 text-white font-mono text-center text-sm md:text-base shadow-md">
          v(Kral) − v(Erkek) + v(Kadın) ≈ v(Kraliçe)
        </div>

        <p className="mb-6">
          Bu formül bir büyücü büyüsü değildir. Bu, çok boyutlu uzayda paralel kaydırma (translation) işlemidir. 
          Aşağıdaki interaktif laboratuvarda latent uzaydaki bu yön vektörlerinin nasıl hareket ettiğini kendi ellerinizle deneyin:
        </p>

        {/* SIMULATION 3: VECTOR SEMANTIC SPACE */}
        <VectorSemanticSpace />

        <p className="mb-6">
          Buradaki derin sezgi şudur: <strong>Yapay zeka dili sözlüklerle değil, yönlerle öğrenir.</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>
            "Erkek"ten "Kral"a giden vektör, aslında <em>"Hükümdarlık / Asalet"</em> yönüdür.
          </li>
          <li>
            Aynı vektörü "Kadın" noktasına eklediğinizde, otomatik olarak "Kraliçe"nin kapısına varırsınız.
          </li>
          <li>
            "Türkiye"den "Ankara"ya giden vektör <em>"Başkent Olma"</em> yönüdür. Aynısını "Fransa"ya uygularsanız "Paris"i bulursunuz.
          </li>
        </ul>
      </section>

      {/* SECTION 6: LANETTEN NİMETE */}
      <section id="nimet" className="scroll-mt-24 pt-10">
        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-sans-ui text-xs font-bold tracking-widest uppercase mb-1">
          Bölüm 05
        </div>
        <h2 className="font-sans-ui text-2xl md:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight mb-4">
          Lanetten Nimete: Yüksek Boyut Neden Bir Süper Güçtür?
        </h2>

        <p className="mb-6">
          Buraya kadar yüksek boyutların felaketlerinden bahsettik: Portakallar sadece kabuktan ibaret kalıyor, 
          mesafeler çöküyor, uzay bomboş bir çöle dönüyor. 
          Peki o zaman modern derin öğrenme mühendisleri neden modelleri 128 boyutta bırakmak yerine 
          4096 veya 8192 boyutlu devasa latent uzaylara fırlatıyorlar?
        </p>

        <p className="mb-6">
          Çünkü yüksek boyutların bir laneti olduğu gibi, devasa bir <strong>nimeti (Blessing of Dimensionality)</strong> de vardır:
        </p>

        {/* Cover Theorem Intuition */}
        <div className="my-6 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 p-6">
          <h4 className="font-sans-ui text-base font-bold text-stone-900 dark:text-white mb-2 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            Cover Teoremi & Doğrusal Ayrılabilirlik
          </h4>
          <p className="text-sm text-stone-600 dark:text-stone-300 font-sans-ui leading-relaxed">
            Düşük boyutta birbirinin içine geçmiş, karmaşık, iç içe geçmiş iki halka şeklinde veri noktaları düşünün. 
            2 boyutta bunları düz bir çizgiyle ikiye bölmek imkansızdır. 
            Fakat bu noktaları 100 boyutlu bir uzaya fırlattığınızda (örneğin Kernel Trick veya Multi-Layer Perceptron ile), 
            uzay o kadar geniştir ki bu iki küme çocuk oyuncağı gibi düz bir hiper-düzlemle birbirinden ayrılabilir!
          </p>
        </div>

        <p className="mb-6">
          Kısacası: Düşük boyutta birbirine düğüm olan problemler, yüksek boyutta ferahlar ve çözülür. 
          Yüksek boyut, karmaşık ilişkileri düzleştiren sihirli bir mercektir.
        </p>
      </section>

      {/* SECTION 7: KOD LABORATUVARI */}
      <section id="kod-lab" className="scroll-mt-24 pt-10">
        <div className="flex items-center gap-2 text-stone-500 font-sans-ui text-xs font-bold tracking-widest uppercase mb-1">
          Bölüm 06
        </div>
        <h2 className="font-sans-ui text-2xl md:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight mb-4">
          NumPy ile Kendi Bilgisayarında Kanıtla
        </h2>

        <p className="mb-6">
          Bana inanmak zorunda değilsiniz. Veri bilimcinin tek bir amentüsü vardır: <em>"Bana kanıtla ve kodu göster."</em>
        </p>

        <p className="mb-6">
          Aşağıdaki interaktif Python kod bloğunu tek tıkla çalıştırabilir ya da kopyalayıp kendi Jupyter Notebook'unuza yapıştırabilirsiniz. 
          100 boyuttaki portakalın kabuk oranını ve mesafe yoğunlaşmasını kendi gözlerinizle doğrulayın:
        </p>

        {/* CODE PLAYGROUND */}
        <CodePlayground
          title="portakal_ve_mesafe_deneyi.py"
          description="100 Boyutlu Hiperkürede Mesafe Dağılımı ve Kabuk Hacmi Simülasyonu"
          code={PYTHON_EXPERIMENT_CODE}
          defaultOutput={`>>> python portakal_deneyi.py
[100 Boyut] İç Meyve Oranı: %0.59
[100 Boyut] Kabuk Oranı    : %99.41
En Yakın Mesafe: 12.184 | En Uzak: 14.302
Tezat Oranı (Max-Min)/Min: 0.1738  # Noktalar arasındaki fark %17'ye indi!`}
        />
      </section>

      {/* SECTION 8: SONUÇ & ENES ÖZTÜRK İMZASI */}
      <section id="sonuc" className="scroll-mt-24 pt-10">
        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-sans-ui text-xs font-bold tracking-widest uppercase mb-1">
          Kapanış & Felsefe
        </div>
        <h2 className="font-sans-ui text-2xl md:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight mb-4">
          Enes Öztürk’ün Defterinden: Sezgiyi Kodlamak
        </h2>

        <p className="mb-6">
          Veri bilimi ve makine öğrenmesi eğitimlerinde öğrencilere çoğu zaman birer kütüphane operatörü gibi davranılıyor: 
          <code className="font-mono text-sm bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded">model.fit(X, y)</code> yaz, 
          metrik tablosuna bak ve geç. 
        </p>

        <p className="mb-6">
          Oysa gerçek bir mühendis ile kütüphane operatörü arasındaki fark tam olarak bu yazıda konuştuğumuz şeydir: 
          <strong>Verinin içinde yüzdüğü uzayı hissedebilmek.</strong>
        </p>

        <p className="mb-6">
          Bir sonraki sefere bir embedding modeli çalıştırdığınızda, bir vektör veritabanında (Pinecone, Chroma, Qdrant) kosinüs benzerliği aradığınızda 
          ya da derin bir sinir ağını eğitirken loss değerinin düşüşünü izlediğinizde şu sahneyi hatırlayın:
        </p>

        <blockquote className="my-8 border-l-4 border-amber-600 pl-4 py-2 font-reading italic text-lg text-stone-900 dark:text-stone-100 bg-amber-50/50 dark:bg-amber-950/20 rounded-r-xl">
          "Siz sadece kod yazmıyorsunuz. İnsan zihninin asla hayal edemeyeceği 1000 boyutlu ıssız bir uzayda; 
          tüm meyvesi dış kabuğunda toplanmış, tüm doğruları birbirine dik duran ve kelimelerin birer pusula gibi yön gösterdiği 
          büyüleyici bir geometrik evrene rehberlik ediyorsunuz."
        </blockquote>

        <p className="mb-6">
          Ezberlemeyin; zihninizde o portakalı soyun.
        </p>

        {/* Handcrafted Signature */}
        <div className="mt-8 pt-6 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div>
            <div className="font-reading text-2xl font-bold text-stone-900 dark:text-white italic tracking-wide">
              Enes Öztürk
            </div>
            <div className="text-xs text-stone-500 font-sans-ui mt-0.5">
              Veri Bilimi & Yapay Zeka Notları
            </div>
          </div>
          <div className="text-right text-xs text-stone-400 font-mono">
            22 Ekim 2026 • İstanbul
          </div>
        </div>
      </section>
    </article>
  );
};
