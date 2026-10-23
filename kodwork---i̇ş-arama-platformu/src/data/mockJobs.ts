import { Job } from '../types/job';

export const fallbackJobs: Job[] = [
  {
    id: 101,
    name: "Senior Full Stack Developer (React & Node.js)",
    publication_date: "2026-10-22T09:30:00Z",
    short_name: "senior-full-stack-developer",
    company: {
      id: 501,
      name: "Trendyol Tech",
      short_name: "trendyol"
    },
    locations: [
      { name: "İstanbul (Hibrit)" },
      { name: "Uzaktan / Remote" }
    ],
    levels: [
      { name: "Senior Level", short_name: "senior" }
    ],
    categories: [
      { name: "Software Engineering" }
    ],
    salary_range: "95.000 ₺ - 145.000 ₺",
    refs: {
      landing_page: "https://www.themuse.com/jobs/trendyol/senior-full-stack-developer"
    },
    contents: `
      <div>
        <p><strong>Trendyol Tech Ekibi Olarak Büyüyoruz!</strong></p>
        <p>Günde milyonlarca aktif kullanıcının ziyaret ettiği, saniyede on binlerce siparişin işlendiği e-ticaret ekosistemimizde mimari kararları alacak ve yüksek ölçeklenebilir mikroservisler geliştirecek Senior Full Stack Developer arıyoruz.</p>
        
        <h3>Ne Yapacaksınız?</h3>
        <ul>
          <li>React, TypeScript ve modern frontend mimarileri ile kullanıcı dostu, yüksek performanslı web arayüzleri inşa etmek.</li>
          <li>Node.js / Go tabanlı mikroservislerin tasarım, geliştirme ve bakım süreçlerine liderlik etmek.</li>
          <li>Event-driven mimarilerde (Kafka, RabbitMQ) yüksek hacimli veri akışlarını yönetmek.</li>
          <li>Junior ve Mid-level mühendis arkadaşlara mentorluk yapmak, code review süreçlerini yönetmek.</li>
        </ul>

        <h3>Aranan Nitelikler</h3>
        <ul>
          <li>En az 5 yıl profesyonel yazılım geliştirme deneyimi.</li>
          <li>React, Redux/Zustand, Next.js ve TypeScript konularında ileri düzey yetkinlik.</li>
          <li>Node.js veya benzeri backend teknolojilerinde mikroservis geliştirme tecrübesi.</li>
          <li>PostgreSQL, Redis ve Elasticsearch konularında pratik deneyim.</li>
          <li>CI/CD süreçleri, Docker ve Kubernetes temellerine hakimiyet.</li>
        </ul>

        <h3>Sunduğumuz Ayrıcalıklar</h3>
        <ul>
          <li>Esnek ve hibrit çalışma modeli (Haftada 1 gün ofis veya tam uzaktan opsiyonu).</li>
          <li>Kişisel gelişim bütçesi ve teknik eğitim sponsorlukları.</li>
          <li>Kapsamlı özel sağlık sigortası (eş ve çocuk dahil).</li>
          <li>Yemek ve evden çalışma ekipman desteği.</li>
        </ul>
      </div>
    `
  },
  {
    id: 102,
    name: "Frontend Engineer (React 19 & Next.js)",
    publication_date: "2026-10-21T14:15:00Z",
    short_name: "frontend-engineer",
    company: {
      id: 502,
      name: "Getir",
      short_name: "getir"
    },
    locations: [
      { name: "İstanbul (Levent)" },
      { name: "Uzaktan / Remote" }
    ],
    levels: [
      { name: "Mid Level", short_name: "mid" }
    ],
    categories: [
      { name: "Software Engineering" },
      { name: "Design & UX" }
    ],
    salary_range: "65.000 ₺ - 85.000 ₺",
    refs: {
      landing_page: "https://www.themuse.com/jobs/getir/frontend-engineer"
    },
    contents: `
      <div>
        <p>Getir'in global operasyonlarında kullanılan gerçek zamanlı kurye, depo ve müşteri panellerini geliştirecek tutkulu bir <strong>Frontend Engineer</strong> arıyoruz.</p>

        <h3>Rol Hakkında</h3>
        <p>Milyonlarca kullanıcıya saniyeler içinde hizmet ulaştıran lojistik ağımızın arayüzlerini geliştirmekten sorumlu olacaksınız. Sıfır gecikme (ultra low latency), WebSockets ve micro-frontends mimarilerinde çalışacaksınız.</p>

        <h3>Beklentiler</h3>
        <ul>
          <li>Modern JavaScript (ES6+), TypeScript ve React ekosisteminde en az 3 yıl deneyim.</li>
          <li>Tailwind CSS, CSS-in-JS veya modern tasarım sistemleri oluşturma tecrübesi.</li>
          <li>State yönetimi ve gerçek zamanlı veri akışları (WebSockets, Server-Sent Events).</li>
          <li>Web performans optimizasyonu, Core Web Vitals ve erişilebilirlik (WCAG) bilgisi.</li>
        </ul>

        <h3>Bizimle Çalışmanın Avantajları</h3>
        <ul>
          <li>Global ölçekte bir Türk unicorn'unda çalışma fırsatı.</li>
          <li>Son model MacBook Pro ve dilediğiniz çalışma ekipmanları.</li>
          <li>Özel sağlık sigortası ve yemek kartı.</li>
        </ul>
      </div>
    `
  },
  {
    id: 103,
    name: "Senior Backend Engineer (Go & Distributed Systems)",
    publication_date: "2026-10-20T11:00:00Z",
    short_name: "senior-backend-engineer",
    company: {
      id: 503,
      name: "Insider",
      short_name: "insider"
    },
    locations: [
      { name: "İstanbul" },
      { name: "Uzaktan / Remote" }
    ],
    levels: [
      { name: "Senior Level", short_name: "senior" }
    ],
    categories: [
      { name: "Software Engineering" },
      { name: "Data Science" }
    ],
    salary_range: "100.000 ₺ - 160.000 ₺",
    refs: {
      landing_page: "https://www.themuse.com/jobs/insider/senior-backend-engineer"
    },
    contents: `
      <div>
        <p>Gartner Magic Quadrant lideri Insider'da yapay zeka destekli müşteri deneyimi platformumuzun kalbinde yer alacak <strong>Senior Backend Engineer</strong> arayışımız bulunuyor.</p>

        <h3>Teknoloji Yığınımız</h3>
        <p>Go (Golang), Python, Apache Kafka, AWS, Kubernetes, ScyllaDB, PostgreSQL, Redis.</p>

        <h3>Görev Tanımı</h3>
        <ul>
          <li>Günde 15 milyardan fazla dijital etkileşimi işleyen dağıtık veri işleme boru hatlarını tasarlamak.</li>
          <li>Yüksek erişilebilirlikli (99.99% uptime) REST ve gRPC servisleri geliştirmek.</li>
          <li>Veri tabanı indeksleme, sorgu optimizasyonu ve bellek yönetimi konularında derinleşmek.</li>
        </ul>

        <h3>Kimleri Arıyoruz?</h3>
        <ul>
          <li>Dağıtık sistemler ve mikromimari alanında 4+ yıl tecrübe.</li>
          <li>Go veya eşdeğer sistem dillerinde (Rust, C++, Java) güçlü backend yetkinliği.</li>
          <li>Büyük veri hacimleri ile çalışma motivasyonu ve analitik düşünme yeteneği.</li>
        </ul>
      </div>
    `
  },
  {
    id: 104,
    name: "Mobile App Developer (React Native / iOS & Android)",
    publication_date: "2026-10-19T08:45:00Z",
    short_name: "react-native-developer",
    company: {
      id: 504,
      name: "Papara",
      short_name: "papara"
    },
    locations: [
      { name: "İstanbul (Üsküdar)" },
      { name: "Hibrit" }
    ],
    levels: [
      { name: "Mid Level", short_name: "mid" }
    ],
    categories: [
      { name: "Software Engineering" }
    ],
    salary_range: "75.000 ₺ - 110.000 ₺",
    refs: {
      landing_page: "https://www.themuse.com/jobs/papara/react-native-developer"
    },
    contents: `
      <div>
        <p>Finansal özgürlüğü herkes için ulaşılabilir kılan Papara mobil uygulamasının yeni nesil modüllerini geliştirmek üzere <strong>React Native Geliştiricisi</strong> arıyoruz.</p>

        <h3>Ne Bekliyoruz?</h3>
        <ul>
          <li>React Native ve TypeScript ile en az 2 yıl ticari mobil uygulama geliştirme tecrübesi.</li>
          <li>iOS (Swift/Obj-C) ve Android (Kotlin/Java) yerel köprüleri (Native Modules / TurboModules) hakkında bilgi.</li>
          <li>Redux Toolkit, MMKV veya modern mobil state yönetimi çözümlerine hakimiyet.</li>
          <li>App Store ve Google Play yayınlama / CI/CD (Fastlane) süreçleri tecrübesi.</li>
        </ul>

        <h3>Papara Kültürü</h3>
        <p>Hiyerarşisiz, sonuç odaklı ve inovasyonu destekleyen bir ortam. İnovatif fintech çözümleri üreterek 20 milyondan fazla kullanıcının günlük finansal işlemlerine dokunacaksınız.</p>
      </div>
    `
  },
  {
    id: 105,
    name: "Staff DevOps & Cloud Platform Engineer",
    publication_date: "2026-10-18T16:20:00Z",
    short_name: "staff-devops-engineer",
    company: {
      id: 505,
      name: "Hepsiburada",
      short_name: "hepsiburada"
    },
    locations: [
      { name: "İstanbul" },
      { name: "Uzaktan / Remote" }
    ],
    levels: [
      { name: "Senior Level", short_name: "senior" }
    ],
    categories: [
      { name: "Software Engineering" },
      { name: "DevOps & Cloud" }
    ],
    salary_range: "120.000 ₺ - 180.000 ₺",
    refs: {
      landing_page: "https://www.themuse.com/jobs/hepsiburada/staff-devops-engineer"
    },
    contents: `
      <div>
        <p>Hepsiburada Bulut Altyapı ve Platform Mühendisliği ekibimize liderlik edecek, Kubernetes ve çoklu bulut (Multi-Cloud) mimarilerinde deneyimli <strong>Staff DevOps Engineer</strong> arıyoruz.</p>

        <h3>Ana Sorumluluklar</h3>
        <ul>
          <li>Kubernetes cluster'larının (EKS, GKE, On-premise) güvenliği, ölçeklenebilirliği ve otomasyonunu yönetmek.</li>
          <li>Terraform ve Ansible ile Infrastructure as Code (IaC) standartlarını belirlemek.</li>
          <li>Prometheus, Grafana ve OpenTelemetry ile gözlemlenebilirlik (observability) mimarisini güçlendirmek.</li>
          <li>Geliştirici ekiplerinin self-service dağıtım yapabilmesi için platform mühendisliği araçları inşa etmek.</li>
        </ul>

        <h3>Gereksinimler</h3>
        <ul>
          <li>7+ yıl sistem yönetimi, bulut mühendisliği ve site reliability engineering (SRE) tecrübesi.</li>
          <li>Linux çekirdek optimizasyonu ve ağ güvenliği bilgisi.</li>
        </ul>
      </div>
    `
  },
  {
    id: 106,
    name: "UI/UX Product Designer",
    publication_date: "2026-10-17T13:00:00Z",
    short_name: "product-designer",
    company: {
      id: 506,
      name: "Dream Games",
      short_name: "dream-games"
    },
    locations: [
      { name: "İstanbul (Şişli)" }
    ],
    levels: [
      { name: "Mid Level", short_name: "mid" }
    ],
    categories: [
      { name: "Design & UX" }
    ],
    salary_range: "80.000 ₺ - 120.000 ₺",
    refs: {
      landing_page: "https://www.themuse.com/jobs/dream-games/product-designer"
    },
    contents: `
      <div>
        <p>Dünya çapında yüz milyonlarca oyuncuya sahip Royal Match ve yeni projelerimizde unutulmaz kullanıcı deneyimleri tasarlamak üzere <strong>Product Designer</strong> arıyoruz.</p>

        <h3>Rolün Kapsamı</h3>
        <ul>
          <li>Figma kullanarak tasarım sistemleri, prototipler ve interaktif kullanıcı akışları oluşturmak.</li>
          <li>Kullanıcı testleri ve veri analitiği çıktılarını tasarıma dönüştürmek.</li>
          <li>Oyun içi ekonomi ve UX dengesini mükemmelleştirmek için ürün yöneticileriyle çalışmak.</li>
        </ul>

        <h3>Aranan Nitelikler</h3>
        <ul>
          <li>Mobil oyun veya B2C tüketici uygulamalarında en az 3 yıl ürün tasarımı deneyimi.</li>
          <li>Etkileyici bir portfolyo (Figma, Dribbble veya kişisel web sitesi linki rica olunur).</li>
          <li>Mikro-animasyonlar ve tipografi konusunda yüksek hassasiyet.</li>
        </ul>
      </div>
    `
  },
  {
    id: 107,
    name: "Data Scientist & AI Engineer",
    publication_date: "2026-10-16T10:15:00Z",
    short_name: "data-scientist-ai",
    company: {
      id: 507,
      name: "Peak Games",
      short_name: "peak-games"
    },
    locations: [
      { name: "İstanbul" },
      { name: "Hibrit" }
    ],
    levels: [
      { name: "Senior Level", short_name: "senior" }
    ],
    categories: [
      { name: "Data Science" },
      { name: "Software Engineering" }
    ],
    salary_range: "110.000 ₺ - 165.000 ₺",
    refs: {
      landing_page: "https://www.themuse.com/jobs/peak-games/data-scientist-ai"
    },
    contents: `
      <div>
        <p>Peak ekibinde milyarlarca log kaydı üzerinden tahminleme algoritmaları, LLM entegrasyonları ve makine öğrenimi modelleri üretecek <strong>Data Scientist</strong> arıyoruz.</p>

        <h3>Sorumluluklar</h3>
        <ul>
          <li>Oyuncu davranışlarını analiz eden LTV ve Churn tahmin modelleri eğitmek.</li>
          <li>PyTorch, TensorFlow ve Scikit-learn ile üretim seviyesinde (production-ready) ML pipeline'ları kurmak.</li>
          <li>Büyük veri altyapılarında (BigQuery, Spark) SQL sorgularını ve veri dönüşümlerini yürütmek.</li>
        </ul>

        <h3>Neler Arıyoruz?</h3>
        <ul>
          <li>Bilgisayar Mühendisliği, İstatistik veya Matematik alanında lisans/yüksek lisans derecesi.</li>
          <li>Python ve ML kütüphanelerinde 4+ yıl tecrübe.</li>
        </ul>
      </div>
    `
  },
  {
    id: 108,
    name: "Junior QA Automation Engineer",
    publication_date: "2026-10-15T15:40:00Z",
    short_name: "junior-qa-engineer",
    company: {
      id: 508,
      name: "Armut / HomeRun",
      short_name: "armut"
    },
    locations: [
      { name: "İstanbul" },
      { name: "Uzaktan / Remote" }
    ],
    levels: [
      { name: "Entry Level", short_name: "entry" }
    ],
    categories: [
      { name: "Software Engineering" }
    ],
    salary_range: "45.000 ₺ - 60.000 ₺",
    refs: {
      landing_page: "https://www.themuse.com/jobs/armut/junior-qa-engineer"
    },
    contents: `
      <div>
        <p>Armut ve Homerun global hizmet pazarında ürünlerimizin kalitesini en üst düzeyde tutacak yeni mezun veya 1 yıl deneyimli <strong>Junior QA Automation Engineer</strong> arıyoruz!</p>

        <h3>Neler Öğrenecek ve Yapacaksınız?</h3>
        <ul>
          <li>Cypress ve Playwright ile modern uçtan uca (E2E) web otomasyon testleri yazmak.</li>
          <li>Postman ile REST API test otomasyonları kurgulamak.</li>
          <li>Scrum takımı ile birlikte sprint planning ve test senaryoları hazırlığına katılmak.</li>
          <li>Hata (Bug) raporlarını detaylı şekilde Jira üzerinde belgelemek.</li>
        </ul>

        <h3>Başvuru Kriterleri</h3>
        <ul>
          <li>Yazılım test metodolojilerine ilgi ve temel JavaScript / TypeScript bilgisi.</li>
          <li>Meraklı, detaylara dikkat eden ve öğrenmeye açık kişilik.</li>
        </ul>
      </div>
    `
  },
  {
    id: 109,
    name: "Engineering Manager (Core Services)",
    publication_date: "2026-10-14T11:20:00Z",
    short_name: "engineering-manager",
    company: {
      id: 509,
      name: "Iyzico / PayU",
      short_name: "iyzico"
    },
    locations: [
      { name: "İstanbul" },
      { name: "Hibrit" }
    ],
    levels: [
      { name: "Management", short_name: "management" }
    ],
    categories: [
      { name: "Software Engineering" },
      { name: "Management" }
    ],
    salary_range: "140.000 ₺ - 210.000 ₺",
    refs: {
      landing_page: "https://www.themuse.com/jobs/iyzico/engineering-manager"
    },
    contents: `
      <div>
        <p>Türkiye'nin önde gelen ödeme teknolojileri şirketi Iyzico'da 8 kişilik çekirdek mühendislik takımını yönetecek <strong>Engineering Manager</strong> arıyoruz.</p>

        <h3>Rolün Detayları</h3>
        <ul>
          <li>Yüksek güvenlik standartları (PCI-DSS) gerektiren finansal sistemlerin mimarisini yönlendirmek.</li>
          <li>Mühendislerin kariyer gelişim planlarını, 1-on-1 görüşmelerini ve teknik hedeflerini yönetmek.</li>
          <li>Ürün ve iş geliştirme departmanlarıyla birlikte teknoloji yol haritasını (roadmap) oluşturmak.</li>
        </ul>

        <h3>Profil</h3>
        <ul>
          <li>En az 8 yıl yazılım deneyimi ve en az 2 yıl teknik ekip liderliği / yöneticilik deneyimi.</li>
          <li>Fintech, e-ticaret veya yüksek işlem hacimli sistemlerde geçmiş tecrübe.</li>
        </ul>
      </div>
    `
  },
  {
    id: 110,
    name: "Cyber Security Analyst & SOC Specialist",
    publication_date: "2026-10-13T09:10:00Z",
    short_name: "cyber-security-analyst",
    company: {
      id: 510,
      name: "Turkcell Tech",
      short_name: "turkcell"
    },
    locations: [
      { name: "İstanbul (Maltepe Plaza)" }
    ],
    levels: [
      { name: "Mid Level", short_name: "mid" }
    ],
    categories: [
      { name: "DevOps & Cloud" },
      { name: "IT & Systems" }
    ],
    salary_range: "70.000 ₺ - 95.000 ₺",
    refs: {
      landing_page: "https://www.themuse.com/jobs/turkcell/cyber-security-analyst"
    },
    contents: `
      <div>
        <p>Turkcell Güvenlik Operasyonları Merkezi (SOC) bünyesinde kritik telekom altyapılarının güvenliğini sağlayacak <strong>Siber Güvenlik Analisti</strong> arıyoruz.</p>

        <h3>Görevler</h3>
        <ul>
          <li>SIEM sistemleri (Splunk, QRadar) üzerinden güvenlik alarmlarını izlemek ve analiz etmek.</li>
          <li>Olay müdahale (Incident Response) adımlarını yönetmek ve kök neden analizleri hazırlamak.</li>
          <li>Sızma testi ve zafiyet tarama sonuçlarını değerlendirerek aksiyon aldırmak.</li>
        </ul>

        <h3>Yetkinlikler</h3>
        <ul>
          <li>Siber güvenlik alanında 2-4 yıl deneyim.</li>
          <li>CEH, OSCP, CompTIA Security+ vb. sertifikalar artı değer sağlayacaktır.</li>
        </ul>
      </div>
    `
  }
];
