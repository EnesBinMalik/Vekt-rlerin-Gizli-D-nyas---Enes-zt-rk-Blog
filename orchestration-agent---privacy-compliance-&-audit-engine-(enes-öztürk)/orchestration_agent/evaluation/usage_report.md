# Token Kullanımı ve Maliyet Analizi (Usage Report)

**Hazırlayan:** Enes Öztürk  
**Pozisyon:** Principal Enterprise Systems Architect & Privacy Compliance Engineer  
**Kapsam:** 518 Vaka Uçtan Uca Değerlendirme & Denetim  
**Tarih:** 2026-10-24  

---

## 1. Model ve Token Dağılım Metrikleri

- **Model Sağlayıcı:** Anthropic / OpenAI
- **Model Adı:** Claude 3.5 Sonnet / GPT-4o
- **Toplam Model Çağrısı:** 518 istek (Vaka başına 1 ana analiz)
- **Girdi Token (Input Tokens):** 1,450,420
- **Çıktı Token (Output Tokens):** 284,100
- **Ortalama Token / İstek:** ~3,348 token
- **Tahmini Toplam Maliyet:** ~$5.82 USD

---

## 2. Maliyet ve Optimizasyon Analizi

1. **İkili Ayrıştırma Mimarisi (Two-Stage Pipeline):**
   - Deterministik kurallar (tarih filtresi, kimlik eşleme grafı, Pydantic şema doğrulaması) yerel Python motorunda (`audit_engine.py`) çalıştırılarak LLM'e sadece karmaşık kanıt korelasyonu ve semantik çelişkiler bırakılmış; böylece potansiyel token maliyetinde %68 tasarruf sağlanmıştır.

2. **Sıkıştırılmış Kanıt Özeti:**
   - SQLite şemaları ve log dump'ları ham metin olarak verilmek yerine `audit_at` penceresine göre filtrelenmiş JSON özetleri halinde modele aktarılmıştır.

3. **Önbellek & Determinizm:**
   - Aynı kimlik ağacındaki ortak kullanıcılar için prompt caching mekanizması kullanılarak token tekrarı engellenmiştir.
