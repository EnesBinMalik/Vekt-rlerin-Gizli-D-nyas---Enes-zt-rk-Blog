import React, { useState } from 'react';
import { Header } from './components/Header';
import { ReadingProgress } from './components/ReadingProgress';
import { ThemeAndFontControls } from './components/ThemeAndFontControls';
import { TableOfContents } from './components/TableOfContents';
import { ReaderScratchpad } from './components/ReaderScratchpad';
import { CircleAreaUnroller } from './components/simulations/CircleAreaUnroller';
import { DerivativeMagnifier } from './components/simulations/DerivativeMagnifier';
import { ContinuousGrowthEuler } from './components/simulations/ContinuousGrowthEuler';
import { PythagorasAreaShift } from './components/simulations/PythagorasAreaShift';
import { RiemannAccumulation } from './components/simulations/RiemannAccumulation';
import { IntuitionQuiz } from './components/IntuitionQuiz';
import { AuthorProfile } from './components/AuthorProfile';
import { CopyrightModal } from './components/CopyrightModal';
import { CitationModal } from './components/CitationModal';
import { ShareModal } from './components/ShareModal';
import { Footer } from './components/Footer';
import { ReadingTheme, FontSize, SectionItem } from './types';
import { Share2, Clock, Calendar } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState<ReadingTheme>('paper');
  const [fontSize, setFontSize] = useState<FontSize>('normal');
  const [isCopyrightOpen, setIsCopyrightOpen] = useState<boolean>(false);
  const [isCitationOpen, setIsCitationOpen] = useState<boolean>(false);
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);

  const sections: SectionItem[] = [
    {
      id: 'giris-ezberin-mezarligi',
      number: '01',
      title: 'Ezberin Mezarlığı ve Zihnin Gözü',
      subtitle: 'Notaları ezberlemek ile müziği duymak arasındaki fark',
    },
    {
      id: 'cember-alani',
      number: '02',
      title: 'Çemberin Alanı Neden πr²?',
      subtitle: 'Soğan katmanlarını açarak üçgen inşa etmek',
    },
    {
      id: 'pisagor-teoremi',
      number: '03',
      title: 'Pisagor Karelerden İbaret Değildir',
      subtitle: 'Einstein’ın benzer üçgenler ve alan korunum keşfi',
    },
    {
      id: 'turev-mikroskobu',
      number: '04',
      title: 'Türev: Yaklaştıkça Düzleşen Evren',
      subtitle: 'Lokal doğrusallık ve anlık eğimin geometrik felsefesi',
    },
    {
      id: 'euler-sabiti',
      number: '05',
      title: 'Doğanın Büyüme Sabiti: e Sayısı',
      subtitle: 'Sonsuz bölünmelerin durduğu dengeli kalp atışı',
    },
    {
      id: 'kalkulus-baglantisi',
      number: '06',
      title: 'İntegral ve Türevin Gizli Akrabalığı',
      subtitle: 'Hız göstergesi, kilometre sayacı ve birikim',
    },
    {
      id: 'dusunce-deneyleri',
      number: '07',
      title: 'Sezgisel Düşünce Egzersizleri',
      subtitle: 'Formülsüz akıl yürütme denemeleri',
    },
  ];

  // Map theme styles
  const themeBgClasses = {
    paper: 'bg-[#FBF9F5] text-[#1C1917]',
    clean: 'bg-white text-stone-900',
    dark: 'bg-[#14171A] text-[#F3F4F6]',
  };

  const proseThemeClasses = {
    paper: 'text-stone-800 selection:bg-amber-800/15 selection:text-amber-900',
    clean: 'text-stone-900 selection:bg-stone-200',
    dark: 'text-stone-200 selection:bg-stone-700 selection:text-white',
  };

  // Map font size
  const fontSizeClasses = {
    normal: 'text-[1.0625rem] leading-[1.82]',
    large: 'text-[1.1875rem] leading-[1.88]',
    larger: 'text-[1.3125rem] leading-[1.92]',
  };

  return (
    <div id="top" className={`min-h-screen transition-colors duration-200 ${themeBgClasses[theme]}`}>
      <ReadingProgress />
      <Header onOpenShare={() => setIsShareOpen(true)} />

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-16">
        {/* Editorial Masthead & Kicker */}
        <div className="max-w-3xl mx-auto text-center pt-8 pb-10">
          {/* Metadata line without pills (clean typography with separators) */}
          <div className="flex items-center justify-center flex-wrap gap-2 text-xs uppercase tracking-widest text-stone-500 font-sans mb-4">
            <span className="font-semibold text-amber-900">Temel Matematik Modülü</span>
            <span aria-hidden="true">·</span>
            <span>Bitirme Projesi</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3 h-3 text-stone-400" /> 22 Ekim 2026
            </span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3 text-stone-400" /> 14 dk Okuma
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight text-stone-950 leading-[1.12]">
            Formülsüz Matematik: Doğayı Ezberlemeden Görmek
          </h1>

          <p className="mt-5 text-base sm:text-xl text-stone-600 font-serif italic max-w-2xl mx-auto leading-relaxed">
            Ders kitaplarında formül ezberletilerek dondurulan matematiğin; hareket, simetri ve sezgisel geometriyle yeniden canlandırılması.
          </p>

          {/* Author Byline */}
          <div className="mt-8 pt-6 border-t border-stone-200/80 inline-flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-sans text-stone-600">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-stone-900 text-stone-100 flex items-center justify-center font-serif font-bold text-xs">
                EÖ
              </span>
              <div className="text-left">
                <div className="font-semibold text-stone-900 text-sm">
                  Enes Öztürk
                </div>
                <div className="text-[11px] text-stone-500">
                  Matematik Araştırmacısı & Eğitimci
                </div>
              </div>
            </div>

            <span className="hidden sm:inline text-stone-300">|</span>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsCopyrightOpen(true)}
                className="text-amber-900 hover:underline font-medium"
              >
                © 2026 Telif Hakları
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => setIsCitationOpen(true)}
                className="text-stone-700 hover:underline font-medium"
              >
                Kaynak Göster
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => setIsShareOpen(true)}
                className="text-stone-700 hover:underline font-medium inline-flex items-center gap-1"
              >
                <Share2 className="w-3 h-3" /> Paylaş
              </button>
            </div>
          </div>
        </div>

        {/* Floating Utility Controls (Font size & theme) */}
        <div className="max-w-3xl mx-auto mb-10 no-print">
          <ThemeAndFontControls
            theme={theme}
            setTheme={setTheme}
            fontSize={fontSize}
            setFontSize={setFontSize}
          />
        </div>

        {/* 2-Column Asymmetric Editorial Layout: Sidebar on desktop + Main Prose */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Sticky Table of Contents & Scratchpad (Desktop) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-20 space-y-4 no-print">
            <TableOfContents sections={sections} />
            <ReaderScratchpad />
          </aside>

          {/* Main Column: Rich Long-Form Article (max-w-prose / 65-75ch measure) */}
          <article className={`lg:col-span-9 max-w-3xl ${proseThemeClasses[theme]} ${fontSizeClasses[fontSize]}`}>
            {/* Opening Drop-Cap Paragraph */}
            <section id="giris-ezberin-mezarligi" className="mb-14 scroll-mt-24">
              <div className="text-xs uppercase tracking-widest text-amber-900 font-semibold mb-2 font-sans">
                Giriş Manifestosu
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-950 tracking-tight mb-5">
                Ezberin Mezarlığı ve Zihnin Gözü
              </h2>

              <p className="first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-stone-900">
                Bir piyano öğrencisine Johann Sebastian Bach'ın tüm bestelerinin nota kağıtlarını ezberlettiğinizi,
                ancak hayatında tek bir tuşa dokunmasına veya o müziği kendi kulaklarıyla duymasına asla izin vermediğinizi hayal edin.
                Sınavlarda notaların isimlerini hatasız söyleyebilir, diyez ve bemol kurallarını kusursuz kağıda dökebilir.
                Fakat o öğrenciye müziğin ne olduğunu sorduğunuzda hissedeceği tek duygu derin bir can sıkıntısı ve anlamsızlıktır.
              </p>

              <p>
                İşte modern eğitim sisteminin nesiller boyu matematiğe yaptığı kötülük tam olarak budur.
                Matematik; birer sihirbaz formülü gibi gökten inmiş x'lerin, y'lerin, d/dx sembollerinin veya
                havada uçuşan kök işaretlerinin ezber mekaniği değildir.
                Matematik, evrenin arkasında işleyen canlı desenleri, simetrileri ve hareketleri zihnin gözüyle görme sanatıdır.
              </p>

              <div className="my-8 py-5 px-6 border-y border-stone-300/80 bg-stone-100/50 text-stone-900 font-serif italic text-lg sm:text-xl text-center">
                "Matematikte hiçbir şeyi ezberlemek zorunda değilsiniz; çünkü formüller keşiflerin kendisi değil, sadece ardında bıraktıkları ayak izleridir."
              </div>

              <p>
                Bu blog yazısında, Temel Matematik modülünde öğrendiğimiz sezgisel felsefeyi beş kritik kavram üzerinden test edeceğiz:
                Çemberin alanının neden πr² olduğundan, Pisagor'un karelerden bağımsız derin gerçeğine;
                türevin mikroskop altındaki lokal doğrusallığından doğanın büyüme sabiti olan e sayısına ve kalkülüsün temel teoremine kadar...
                Hiçbir kuru kuralı kabul etmeyeceğiz. Her şeyi gözlerimizle inşa edeceğiz.
              </p>
            </section>

            {/* Section 2: Circle Area */}
            <section id="cember-alani" className="mb-16 scroll-mt-24">
              <div className="text-xs uppercase tracking-widest text-amber-900 font-semibold mb-2 font-sans">
                Bölüm 01
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-950 tracking-tight mb-4">
                Çemberin Alanı Neden πr²? (Soğanın Katmanları)
              </h2>

              <p>
                İlkokuldan beri hepimize öğretilen ilk ezberlerden biri: <em>"Çemberin çevresi 2πr, alanı ise πr²'dir."</em>
                Peki neden? Çevresindeki 2 katsayısı nereye kayboldu? r'nin üzerine gelen o kare üssü nereden fırladı?
                Bunu anlamak için Arşimet'in 2300 yıl önce kurduğu muazzam düşünce deneyine dönmemiz gerekir.
              </p>

              <p>
                Bir çemberi sert bir madeni para gibi değil; iç içe geçmiş sonsuz ince halkalardan oluşan bir soğan gibi hayal edin.
                Merkezdeki halka bir nokta kadar küçüktür; en dıştaki halkanın uzunluğu ise tamı tamına çemberin tüm çevresi kadardır: 2πr.
              </p>

              <p>
                Şimdi zihninizde bir makas alın ve bu soğanı merkezden dışarıya doğru, yani yarıçap çizgisi boyunca düz bir hatla kesin.
                Her bir halkayı dikkatlice açıp düz bir şerit haline getirin ve zemine yan yana dizin.
                En dıştaki en uzun şerit tabanda durur (2πr). Üst üste koyduğunuz her şerit, yarıçap içeri doğru küçüldükçe lineer olarak kısalır.
                En tepeye vardığınızda ise uzunluk sıfıra iner.
              </p>

              {/* Interactive Simulation 01 */}
              <CircleAreaUnroller />

              <p>
                Gözlerinizin önünde beliren bu yeni şekil nedir?
                Tabanı 2πr, yüksekliği ise tam olarak açtığımız yarıçap (r) olan bir <strong>dik üçgen!</strong>
                Bir soğanı sadece kestik ve açtık; tek bir atomunu dahi yok etmedik. Alan tamamen korundu.
                Peki bir üçgenin alanı nedir?
              </p>

              <div className="my-6 p-4 rounded-xl bg-stone-100 border border-stone-200 text-center font-serif text-lg">
                <span className="text-stone-600">Alan</span> = ½ × Taban × Yükseklik = ½ × (2πr) × (r) = <strong>πr²</strong>
              </div>

              <p>
                Gördünüz mü? Tek bir karmaşık integral formülü, tek bir soyut cebir işlemi bilmeden kalkülüs yaptık.
                Diferansiyel elemanlara (dr) böldük, açtık ve topladık.
                Matematik formül değil, biçim değiştirme sanatıdır.
              </p>
            </section>

            {/* Section 3: Pythagoras Theorem */}
            <section id="pisagor-teoremi" className="mb-16 scroll-mt-24">
              <div className="text-xs uppercase tracking-widest text-amber-900 font-semibold mb-2 font-sans">
                Bölüm 02
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-950 tracking-tight mb-4">
                Pisagor Karelerden İbaret Değildir: Benzerlik ve Enerji Korunumu
              </h2>

              <p>
                Hemen herkes Pisagor teoremini duymuştur: a² + b² = c².
                Bunu okulda kenarların üzerine oturtulmuş üç tane kare çizerek öğretirler.
                Ancak insanların yüzde 99'unun bilmediği büyüleyici bir hakikat vardır:
                <strong> Pisagor'un karelerle hiçbir özel bağı yoktur!</strong>
              </p>

              <p>
                Geometride iki boyutlu herhangi bir şekli k kat büyüttüğünüzde, o şeklin alanı k² katına çıkar.
                Bir kedi silüetini iki kat büyütürseniz, kapladığı alan dört katına çıkar.
                Bu yüzden kenarların üzerine kare yerine yarım daireler koysanız da, eşkenar üçgenler koysanız da,
                hatta o kenarları taban alan Mona Lisa tabloları çizseniz de denklem asla bozulmaz:
              </p>

              <div className="my-6 p-4 rounded-xl bg-stone-100 border border-stone-200 text-center font-serif text-base sm:text-lg">
                <span className="font-semibold text-stone-800">Kenar A Üzerindeki Alan</span> + <span className="font-semibold text-stone-800">Kenar B Üzerindeki Alan</span> = <span className="font-semibold text-stone-900">Hipotenüs Üzerindeki Alan</span>
              </div>

              {/* Interactive Simulation 04 */}
              <PythagorasAreaShift />

              <p>
                Albert Einstein 12 yaşındayken amcasından bu teoremi duyduğunda, dışarıya kareler çizmek yerine çok daha zarif bir şey düşündü:
                <em>"Peki ya kenarların üzerine üçgenin kendisini koysaydık?"</em>
              </p>

              <p>
                Bir dik üçgenin dik köşesinden hipotenüse bir dikme indirin.
                O koca üçgen, anında kendisinin iki küçük benzer kopyasına ayrılır.
                Büyük üçgenin tüm alanı, zaten bu iki küçük üçgenin toplamından ibarettir!
                Ekstra hiçbir şekle, hiçbir hesap makinesine ihtiyaç yoktur.
                Pisagor; iki boyutlu uzayda benzerliğin ve alan korunumunun kaçınılmaz geometrisidir.
              </p>
            </section>

            {/* Section 4: Derivative */}
            <section id="turev-mikroskobu" className="mb-16 scroll-mt-24">
              <div className="text-xs uppercase tracking-widest text-amber-900 font-semibold mb-2 font-sans">
                Bölüm 03
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-950 tracking-tight mb-4">
                Türev: Yaklaştıkça Düzleşen Evren (Lokal Doğrusallık)
              </h2>

              <p>
                Kalkülüs dersine giren öğrencilerin gözü neden korkar?
                Çünkü tahtaya birdenbire <em>lim<sub>h→0</sub> [f(x+h) - f(x)] / h</em> yazılır.
                Sembollerin altında boğulan zihin, gerçeği göremez.
              </p>

              <p>
                Oysa türevin ardındaki tek sezgisel ilke şudur:
                <strong> Evrende pürüzsüz olan her eğriye yeterince yakından bakarsanız, eğriliğini kaybeder ve bir doğruya dönüşür.</strong>
              </p>

              <p>
                Bunu her gün yaşarsınız. Dünyamızın yuvarlak bir küre olduğunu uzay fotoğraflarından biliyoruz.
                Peki sabah evden çıkıp caddeye adım attığınızda neden ufuk dümdüz görünür?
                Çünkü devasa bir yarıçapa küçücük bir pencereden bakmaktayız.
                İşte türev, bir fonksiyona mikroskopla bakmaktır.
                Aşağıdaki simülatörde büyütme faktörünü (zoom) artırın ve gözlerinizle görün:
              </p>

              {/* Interactive Simulation 02 */}
              <DerivativeMagnifier />

              <p>
                Gördünüz mü? 15x ve 30x büyütmeye ulaştığınızda o kıvrımlı parabol veya sinüs dalgası,
                tıpkı cetvelle çizilmiş gibi düz bir hat haline geldi.
                İşte bu mikroskobik düz çizginin ufka göre eğimi (yani Δy / Δx oranı),
                bizim <strong>türev</strong> dediğimiz şeydir.
                Türev bir gelecek tahmini değil; o mikro saniyede evrenin hangi yöne doğru yöneldiğinin anlık pusulasıdır.
              </p>
            </section>

            {/* Section 5: Euler Number e */}
            <section id="euler-sabiti" className="mb-16 scroll-mt-24">
              <div className="text-xs uppercase tracking-widest text-amber-900 font-semibold mb-2 font-sans">
                Bölüm 04
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-950 tracking-tight mb-4">
                Doğanın Büyüme Sabiti: e ≈ 2.718 (Sonsuz Bölünmenin Dengesi)
              </h2>

              <p>
                Lisede ln(x) fonksiyonunu ve e tabanını görürüz. Çoğu öğrenci için e, π gibi egzotik ama ezberlenmesi gereken rastgele bir ondalıktır (2.718...).
                Oysa e, evrendeki <strong>kesintisiz büyümenin</strong> doğal birimidir.
              </p>

              <p>
                Klasik bir düşünce deneyi yapalım:
                Cebinizde 1 liranız var ve size yılda %100 faiz veren hayali bir bankaya yatırdınız.
                Eğer banka faizi yıl sonunda tek seferde öderse, yıl sonunda 1 + 1 = 2 liranız olur.
              </p>

              <p>
                Peki bankacıya deseniz ki: <em>"Bana faizimi yılda bir kere %100 verme; 6 ayda bir %50 ver."</em>
                6. ayda paranız 1.50 lira olur. İkinci 6 ayda bu 1.50 liranın tamamı %50 kazanır.
                Yıl sonunda paranız: (1 + 0.50)² = 2.25 lira olur! 25 kuruş fazladan kazandınız; çünkü kazancınız da faiz kazandı.
              </p>

              <p>
                Bu sıklığı artıralım: Her ay (%8.33) faiz alırsanız (1 + 1/12)¹² ≈ 2.61 lira.
                Her gün alırsanız (1 + 1/365)³⁶⁵ ≈ 2.714 lira.
                Peki her saniye, her mikro saniye, yani kesintisiz olarak anbean büyürseniz zengin olup sonsuz liraya ulaşabilir misiniz?
              </p>

              {/* Interactive Simulation 03 */}
              <ContinuousGrowthEuler />

              <p>
                Hayır, sonsuza gidemezsiniz! Çünkü faiz ödeme sıklığı arttıkça, o dilimde gelen büyüme de aynı oranda minicikleşir (1/n).
                Bu iki kuvvet tam olarak <strong>2.71828...</strong> sayısında kilitlenir.
                Doğada hiçbir ağaç ay başını beklemez; hiçbir bakteri yıllık bilançoyla bölünmez; fincandaki kahve yıl sonu gelince soğumaz.
                Doğa <strong>kesintisiz (sürekli)</strong> büyür ve soğur. Bu yüzden doğanın tüm denklemlerinde taban e'dir.
              </p>
            </section>

            {/* Section 6: Fundamental Theorem of Calculus */}
            <section id="kalkulus-baglantisi" className="mb-16 scroll-mt-24">
              <div className="text-xs uppercase tracking-widest text-amber-900 font-semibold mb-2 font-sans">
                Bölüm 05
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-950 tracking-tight mb-4">
                İntegral ve Türevin Gizli Akrabalığı: Birikim ve Değişim
              </h2>

              <p>
                Tarih boyunca iki ayrı matematik dalı birbirinden bağımsız gelişti:
                Biri eğrilerin eğimini bulmakla ilgilenen <em>türev</em> (Newton ve Leibniz),
                diğeri ise eğrilerin altındaki alanı dilimleyip toplayan <em>integral</em> (Arşimet ve Riemann).
                Yüzyıllar boyunca bu iki kavramın birbiriyle hiçbir ilişkisi olmadığı düşünüldü.
                Ta ki Kalkülüsün Temel Teoremi keşfedilene kadar.
              </p>

              <p>
                Bu ilişkiyi anlamanın en sezgisel yolu bir otomobil yolculuğudur:
                Arabanızın ön panelinde iki temel gösterge vardır:
                Biri anlık hızınızı gösteren ibre (v(t)), diğeri ise toplam gittiğiniz kilometreyi sayan sayaç (x(t)).
              </p>

              {/* Interactive Simulation 05 */}
              <RiemannAccumulation />

              <p>
                Eğer hızınızı her an kaydedip o minik zaman aralıklarıyla çarpar ve uç uca eklerseniz (<strong>İntegral</strong>),
                arabanın ne kadar yol gittiğini, yani kilometre sayacındaki artışı bulursunuz!
                Tersine; kilometre sayacındaki sayının zamana göre ne kadar hızlı değiştiğine (türevine) bakarsanız,
                hız ibresinin o anda nereyi gösterdiğini bulursunuz.
              </p>

              <div className="my-6 p-4 rounded-xl bg-stone-100 border border-stone-200 text-center font-serif text-base sm:text-lg">
                <span className="font-semibold text-rose-900">İntegral</span> = Toplamak & Biriktirmek <br />
                <span className="font-semibold text-blue-900">Türev</span> = Anlık Dilimlemek & Değişim Hızını Ölçmek
              </div>

              <p>
                İntegral ve türev, bir paranın iki yüzüdür. Biri suyu kovaya doldurur, diğeri kovadaki suyun akış debisini ölçer.
              </p>
            </section>

            {/* Section 7: Thought Experiments Quiz */}
            <section id="dusunce-deneyleri" className="mb-16 scroll-mt-24">
              <IntuitionQuiz />
            </section>

            {/* Epilogue */}
            <section className="mb-16 pt-8 border-t border-stone-200">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-950 mb-4">
                Son Söz: Ezber Korkuyu, Sezgi İse Merakı Besler
              </h3>
              <p>
                Matematikten korkan milyonlarca insanın ortak bir travması vardır:
                Anlamını bilmedikleri yüzlerce formülü bir gecede ezberleyip ertesi gün sınav kağıdına kusmak ve bir hafta sonra tamamen unutmak.
                Oysa insan beyni anlamsız sembol dizilerini taşımak için değil, desenleri sezmek, analoglar kurmak ve zihninde canlandırmak için evrimleşmiştir.
              </p>
              <p>
                Temel Matematik modülünün sonuna geldiğimiz bu noktada vardığımız nihai menzil şudur:
                Bir formülle karşılaştığınızda kendinize asla <em>"Bunu nasıl ezberlerim?"</em> diye sormayın.
                Kendinize şu soruyu sorun: <em>"Bu formülü ilk keşfeden insan, doğada veya geometride tam olarak neyi görüyordu?"</em>
                Cevabı gördüğünüz an, formülün kendisi gereksizleşir; çünkü hakikat artık zihninizin ayrılmaz bir parçası olmuştur.
              </p>
            </section>

            {/* Author Profile & Rights Section */}
            <AuthorProfile
              onOpenCopyright={() => setIsCopyrightOpen(true)}
              onOpenCitation={() => setIsCitationOpen(true)}
              onOpenShare={() => setIsShareOpen(true)}
            />
          </article>
        </div>
      </main>

      <Footer
        onOpenCopyright={() => setIsCopyrightOpen(true)}
        onOpenCitation={() => setIsCitationOpen(true)}
        onOpenShare={() => setIsShareOpen(true)}
      />

      {/* Modals */}
      <CopyrightModal
        isOpen={isCopyrightOpen}
        onClose={() => setIsCopyrightOpen(false)}
      />

      <CitationModal
        isOpen={isCitationOpen}
        onClose={() => setIsCitationOpen(false)}
      />

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />
    </div>
  );
}
