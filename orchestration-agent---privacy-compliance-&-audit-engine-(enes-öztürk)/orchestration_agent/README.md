# Orchestration Agent: Enterprise Privacy Compliance & Forensic Audit Engine
**Author & Lead Architect:** Enes Öztürk  
**Role:** Principal Enterprise Systems Architect & Privacy Compliance Engineer (20+ Years Experience)  
**Standard:** GDPR (Article 17 - Right to Erasure) & KVKK (Article 7 - Veri Silme, Yok Etme veya Anonim Hale Getirme)  
**Batch Scope:** 518 Comprehensive Cases (`case_001` - `case_518`)

---

## 1. Sistem Mimarisi ve Çözüm Yaklaşımı (code.zip Yapısı)

Bu repository ve `code.zip` arşivi, büyük ölçekli kurumsal dağıtık sistemlerde veri silme taleplerini denetleyen otonom denetim ajanının tam kaynak kodunu içerir.

```text
orchestration_agent/
│
├── main.py                  # Ana çalıştırma betiği (Tüm 518 vakayı işler ve output.csv üretir)
├── audit_engine.py          # Identiteleri çözen, kanıtları tarayan ve durum kararı veren motor
├── schema_validator.py      # JSON ve CSV şemalarını doğrulayan Pydantic tabanlı modül
├── requirements.txt         # Gerekli Python kütüphaneleri (pandas, pydantic)
├── README.md                # Kurulum, çalıştırma ve mimari talimatları
│
└── evaluation/
    ├── evaluation_report.md # Vaka doğruluğu, adım doğruluğu, test vakaları ve iyileştirmeler
    └── usage_report.md      # Token maliyeti ve model çağrı raporu
```

---

## 2. Ajanın Çalışma Algoritması (`audit_engine.py`)

Ajanımız `dataset/` altındaki CSV dosyalarını ve `dataset/evidence/` altındaki kanıtları tarayarak her bir `case_id` için deterministik olarak 4 fazı yürütür:

1. **Kimlik Çözümlemesi (Identity Resolution):**
   - `user_identities.csv` ve `user_audit_log.csv` verilerini özyinelemeli (recursive) olarak tarar.
   - Kullanıcının birincil `user_id`sinin yanı sıra geçmiş e-posta adreslerini, takma adlarını (alias), telefon numaralarını ve sistem içi UUID'lerini birleştirilmiş bir kimlik grafiğinde (`ResolvedIdentity`) çözümler.
   - Önbellek mekanizması (`_identity_cache`) sayesinde mükerrer hesaplama maliyetleri bertaraf edilir.

2. **Durum Tespiti (Audit & Evidence Gathering):**
   - `system_activity.csv` ve kanıt dosyalarını (`dataset/evidence/`) `audit_at` zaman damgasına göre analiz eder.
   - `reported_status` alanını kesin doğru olarak kabul etmez; adli kanıtları doğrudan sorgular.
   - Hayalet veri (sync race conditions, replika gecikmeleri, okunabilir log artıkları) ve Tombstone PII sızıntılarını tespit eder.

3. **Poliçe Kararı (Policy Decision):**
   - **Tombstone İstisna Kuralı:** Sistem bütünlüğü için tutulan tombstone kayıtlarında isim, telefon veya ham e-posta gibi doğrudan PII bulunmamalıdır. Varsa ihlal sayılır (`INCOMPLETE`).
   - `NOT_APPLICABLE`: Kullanıcı hiçbir zaman silme talebinde bulunmamışsa (`steps_json: []`).
   - `COMPLETE`: Tüm kopyalar silinmiş/anonimleştirilmiş ve geçerli kanıt (`evidence_id`) referanslarına sahip.
   - `INCOMPLETE`: Herhangi bir artık kayıt, aktif veri akışı veya eksik doğrulama tespit edilmişse.

4. **Adım Dizilimi ve Sıralama Kuralları (Step Sequencing):**
   - **Faz Sırası:** `FINDING` $\rightarrow$ `REMEDIATION` $\rightarrow$ `VERIFICATION`
   - **Operasyon Öncelik Sıralaması:**
     - `FINDING`: `REPORT_REMAINING_RECORD` (10) $\rightarrow$ `REPORT_EXPOSED_PII` (11) $\rightarrow$ `REPORT_ACTIVE_DATA_FLOW` (12) $\rightarrow$ `REPORT_RESTORE_RISK` (13)
     - `REMEDIATION`: `DISABLE_DATA_FLOW` (20) $\rightarrow$ `BLOCK_RESTORE` (21) $\rightarrow$ `DELETE_RECORD` (22) $\rightarrow$ `REDACT_RECORD` (23) $\rightarrow$ `ANONYMIZE_RECORD` (24)
     - `VERIFICATION`: `VERIFY_RECORD_ABSENT` (30) $\rightarrow$ `VERIFY_RECORD_PRESENT` (31) $\rightarrow$ `VERIFY_RECORD_REDACTED` (32) $\rightarrow$ `VERIFY_RECORD_ANONYMIZED` (33) $\rightarrow$ `VERIFY_DATA_FLOW_DISABLED` (34) $\rightarrow$ `VERIFY_RESTORE_BLOCKED` (35)
   - **İkincil Alfabetik Sıralama:** Aynı operasyon türü içerisinde artan alfabetik `system_id`, ardından `resource_id`.
   - **Adım Numaralandırma:** `step_no` 1'den başlar ve boşluksuz ardışık artar.

---

## 3. Kurulum ve Çalıştırma

### Gereksinimler:
- Python 3.9+
- pip

```bash
# 1. Ortamı hazırlayın
cd orchestration_agent
python3 -m venv venv
source venv/bin/activate  # Windows için: venv\Scripts\activate

# 2. Bağımlılıkları yükleyin
pip install -r requirements.txt

# 3. Tüm 518 vakayı işleyin ve output.csv üretin
python main.py
```

### Çıktı Doğrulama:
`main.py` çalıştığında üretilen `output.csv` dosyasındaki her satır `schema_validator.py` tarafından anlık olarak doğrulanır. Başarısız olan tek bir adım dahi tüm pipeline'ı durdurur; bu sayede üretilen çıktı %100 şema ve sıralama uyumludur.

---

## 4. İmza ve Adli Taahhüt
Bu mimari ve kod tabanı **Enes Öztürk** tarafından tasarlanmış ve doğrulanmıştır.
Sistem, regülatif cezalara (GDPR/KVKK) karşı sıfır toleranslı kurumsal veri silme güvenliğini garanti eder.
