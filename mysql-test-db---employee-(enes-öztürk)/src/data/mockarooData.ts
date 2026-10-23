import { Employee, SqlOperation } from '../types/database';

export const INITIAL_EMPLOYEES: Employee[] = [
  { id: 1, name: 'Ahmet Yılmaz', birthday: '1988-04-12', email: 'ahmet.yilmaz@mockmail.com' },
  { id: 2, name: 'Ayşe Kaya', birthday: '1992-09-23', email: 'ayse.kaya@workgroup.org' },
  { id: 3, name: 'Mehmet Demir', birthday: '1984-11-03', email: 'mehmet.demir@corpnet.net' },
  { id: 4, name: 'Fatma Şahin', birthday: '1995-02-17', email: 'fatma.sahin@digitalpulse.io' },
  { id: 5, name: 'Can Özkan', birthday: '1991-07-30', email: 'can.ozkan@mockmail.com' },
  { id: 6, name: 'Zeynep Aydın', birthday: '1989-12-14', email: 'zeynep.aydin@samplemail.org' },
  { id: 7, name: 'Mustafa Çelik', birthday: '1974-05-19', email: 'mustafa.celik@techforce.com' },
  { id: 8, name: 'Elif Yıldız', birthday: '1996-08-08', email: 'elif.yildiz@cloudhub.co' },
  { id: 9, name: 'Emre Arslan', birthday: '1986-03-27', email: 'emre.arslan@mockmail.com' },
  { id: 10, name: 'Gamze Doğan', birthday: '1994-10-05', email: 'gamze.dogan@enterprisepath.net' },
  { id: 11, name: 'Burak Kılıç', birthday: '1990-01-22', email: 'burak.kilic@nexusgroup.com' },
  { id: 12, name: 'Barış Aksoy', birthday: '1971-06-11', email: 'baris.aksoy@vanguard.org' },
  { id: 13, name: 'Selin Koç', birthday: '1997-11-19', email: 'selin.koc@mockmail.com' },
  { id: 14, name: 'Deniz Öztürk', birthday: '1985-04-02', email: 'deniz.ozturk@innoworks.io' },
  { id: 15, name: 'Onur Kurt', birthday: '1993-02-28', email: 'onur.kurt@cyberflux.com' },
  { id: 16, name: 'Büşra Polat', birthday: '1998-09-15', email: 'busra.polat@mockdata.net' },
  { id: 17, name: 'Serkan Güneş', birthday: '1982-12-08', email: 'serkan.gunes@synergytech.org' },
  { id: 18, name: 'Gizem Korkmaz', birthday: '1990-05-24', email: 'gizem.korkmaz@globalcore.com' },
  { id: 19, name: 'Hakan Yavuz', birthday: '1973-08-16', email: 'hakan.yavuz@tempmail.com' },
  { id: 20, name: 'Derya Özdemir', birthday: '1987-10-31', email: 'derya.ozdemir@dataspark.io' },
  { id: 21, name: 'Kaan Erdem', birthday: '1994-04-18', email: 'kaan.erdem@mockmail.com' },
  { id: 22, name: 'Ceren Avcı', birthday: '1995-12-03', email: 'ceren.avci@apexsystems.com' },
  { id: 23, name: 'Tolga Taş', birthday: '1983-06-25', email: 'tolga.tas@infraflow.net' },
  { id: 24, name: 'Seda Bulut', birthday: '1992-01-14', email: 'seda.bulut@solarnet.org' },
  { id: 25, name: 'Murat Erdoğan', birthday: '1988-07-09', email: 'murat.erdogan@mockmail.com' },
  { id: 26, name: 'Ebru Keskin', birthday: '1993-11-27', email: 'ebru.keskin@matrixsoft.co' },
  { id: 27, name: 'Gökhan Çetin', birthday: '1981-03-05', email: 'gokhan.cetin@tempmail.com' },
  { id: 28, name: 'Aslıhan Aktaş', birthday: '1996-05-12', email: 'aslihan.aktas@horizonview.io' },
  { id: 29, name: 'Alperen Şen', birthday: '1999-02-09', email: 'alperen.sen@mockmail.com' },
  { id: 30, name: 'Tuğba Karaca', birthday: '1991-08-22', email: 'tugba.karaca@nexustech.org' },
  { id: 31, name: 'Oğuzhan Tekin', birthday: '1986-10-17', email: 'oguzhan.tekin@vertexgroup.net' },
  { id: 32, name: 'İrem Bozkurt', birthday: '1997-04-06', email: 'irem.bozkurt@primeinfra.com' },
  { id: 33, name: 'Yasin Coşkun', birthday: '1980-09-30', email: 'yasin.coskun@mockmail.com' },
  { id: 34, name: 'Merve Karahan', birthday: '1994-03-15', email: 'merve.karahan@cloudscale.io' },
  { id: 35, name: 'Fatih Yaman', birthday: '1989-12-29', email: 'fatih.yaman@novanet.org' },
  { id: 36, name: 'Ezgi Kaplan', birthday: '1995-07-04', email: 'ezgi.kaplan@datacrafters.net' },
  { id: 37, name: 'Kerem Tunç', birthday: '1992-10-11', email: 'kerem.tunc@mockmail.com' },
  { id: 38, name: 'Simge Akın', birthday: '1998-01-20', email: 'simge.akin@bluehorizon.co' },
  { id: 39, name: 'Cem Gül', birthday: '1972-02-14', email: 'cem.gul@orbitallabs.com' },
  { id: 40, name: 'Pınar Eren', birthday: '1987-06-07', email: 'pinar.eren@synapsework.org' },
  { id: 41, name: 'Volkan Şimşek', birthday: '1993-08-19', email: 'volkan.simsek@mockmail.com' },
  { id: 42, name: 'Melis Toprak', birthday: '1996-12-25', email: 'melis.toprak@zenithenterprise.io' },
  { id: 43, name: 'Umut Kara', birthday: '1985-05-31', email: 'umut.kara@tempmail.com' },
  { id: 44, name: 'Yasemin Durmaz', birthday: '1990-09-08', email: 'yasemin.durmaz@strataflow.net' },
  { id: 45, name: 'İsmail Çakır', birthday: '1979-11-16', email: 'ismail.cakir@mockmail.com' },
  { id: 46, name: 'Beyza Güler', birthday: '1997-08-01', email: 'beyza.guler@alphaventures.org' },
  { id: 47, name: 'Koray Yalçın', birthday: '1984-01-28', email: 'koray.yalcin@omnicorp.com' },
  { id: 48, name: 'Hande Sevim', birthday: '1991-04-10', email: 'hande.sevim@tempmail.com' },
  { id: 49, name: 'Berk Özdemir', birthday: '1995-06-21', email: 'berk.ozdemir@mockmail.com' },
  { id: 50, name: 'Rüya Bilgin', birthday: '1999-10-02', email: 'ruya.bilgin@futuredatasync.io' }
];

export const UPDATE_OPERATIONS: SqlOperation[] = [
  {
    id: 'update-1',
    number: 1,
    title: "1. 'id' Sütununa Göre Güncelleme",
    targetColumn: 'id',
    targetColumnLabel: 'id (INTEGER)',
    description: "id = 1 olan çalışanın 'name' ve 'email' sütunları güncellenir.",
    sql: `-- 1. id sütununa göre name ve email güncellemesi
UPDATE employee
SET name = 'Enes Öztürk (Kıdemli Mimar)',
    email = 'enes.ozturk@enes-enterprise.com'
WHERE id = 1;`,
    expectedEffect: "id = 1 olan satırın adı 'Enes Öztürk (Kıdemli Mimar)' ve e-postası 'enes.ozturk@enes-enterprise.com' olarak güncellenir."
  },
  {
    id: 'update-2',
    number: 2,
    title: "2. 'name' Sütununa Göre Güncelleme",
    targetColumn: 'name',
    targetColumnLabel: 'name VARCHAR(50)',
    description: "name = 'Can Özkan' olan çalışanın 'birthday' ve 'email' bilgileri güncellenir.",
    sql: `-- 2. name sütununa göre birthday ve email güncellemesi
UPDATE employee
SET birthday = '1990-08-15',
    email = 'can.ozkan.lead@techforce.com'
WHERE name = 'Can Özkan';`,
    expectedEffect: "Adı 'Can Özkan' olan çalışanın doğum günü '1990-08-15', e-postası 'can.ozkan.lead@techforce.com' yapılır."
  },
  {
    id: 'update-3',
    number: 3,
    title: "3. 'birthday' Sütununa Göre Güncelleme",
    targetColumn: 'birthday',
    targetColumnLabel: 'birthday DATE',
    description: "birthday = '1984-11-03' olan çalışanın 'name' ve 'email' bilgileri güncellenir.",
    sql: `-- 3. birthday sütununa göre name ve email güncellemesi
UPDATE employee
SET name = 'Mehmet Demir (Yönetici)',
    email = 'mehmet.demir.yonetici@corpnet.net'
WHERE birthday = '1984-11-03';`,
    expectedEffect: "Doğum günü '1984-11-03' olan kaydın adı 'Mehmet Demir (Yönetici)' ve e-postası 'mehmet.demir.yonetici@corpnet.net' olur."
  },
  {
    id: 'update-4',
    number: 4,
    title: "4. 'email' Sütununa Göre Güncelleme",
    targetColumn: 'email',
    targetColumnLabel: 'email VARCHAR(100)',
    description: "email = 'zeynep.aydin@samplemail.org' olan çalışanın 'name' ve 'birthday' bilgileri güncellenir.",
    sql: `-- 4. email sütununa göre name ve birthday güncellemesi
UPDATE employee
SET name = 'Zeynep Aydın Kaya',
    birthday = '1989-12-20'
WHERE email = 'zeynep.aydin@samplemail.org';`,
    expectedEffect: "E-postası 'zeynep.aydin@samplemail.org' olan çalışanın soyadı 'Aydın Kaya', doğum günü '1989-12-20' olarak değiştirilir."
  },
  {
    id: 'update-5',
    number: 5,
    title: "5. Belirli 'id' Aralığına Göre Güncelleme",
    targetColumn: 'composite',
    targetColumnLabel: 'id BETWEEN 8 AND 10',
    description: "id değeri 8 ile 10 arasında olan çalışanların e-posta adresleri kurumsal etki alanına dönüştürülür.",
    sql: `-- 5. id aralığı koşuluna göre birden fazla satırın email sütununu güncelleme
UPDATE employee
SET email = 'kurumsal.personel@enes-group.com'
WHERE id BETWEEN 8 AND 10;`,
    expectedEffect: "id'si 8, 9 ve 10 olan 3 çalışanın e-posta adresi tek seferde kurumsal etki alanına güncellenir."
  }
];

export const DELETE_OPERATIONS: SqlOperation[] = [
  {
    id: 'delete-1',
    number: 1,
    title: "1. 'id' Sütununa Göre Satır Silme",
    targetColumn: 'id',
    targetColumnLabel: 'id (INTEGER)',
    description: "id = 15 olan çalışanın satırı tablodan silinir.",
    sql: `-- 1. id sütununa göre tekil satır silme işlemi
DELETE FROM employee
WHERE id = 15;`,
    expectedEffect: "id'si 15 olan 'Onur Kurt' kaydı tablodan kalıcı olarak silinir (1 satır etkilenir)."
  },
  {
    id: 'delete-2',
    number: 2,
    title: "2. 'name' Sütununa Göre Satır Silme",
    targetColumn: 'name',
    targetColumnLabel: 'name VARCHAR(50)',
    description: "name = 'Barış Aksoy' olan çalışan kaydı tablodan silinir.",
    sql: `-- 2. name sütununa göre ilgili satırı silme işlemi
DELETE FROM employee
WHERE name = 'Barış Aksoy';`,
    expectedEffect: "Adı 'Barış Aksoy' (id: 12) olan kayıt tablodan silinir."
  },
  {
    id: 'delete-3',
    number: 3,
    title: "3. 'birthday' Sütununa Göre Satır Silme",
    targetColumn: 'birthday',
    targetColumnLabel: 'birthday DATE',
    description: "Doğum tarihi '1973-08-16' olan çalışan (veya emeklilik yaşı gelenler) tablodan silinir.",
    sql: `-- 3. birthday sütununa göre satır silme işlemi
DELETE FROM employee
WHERE birthday = '1973-08-16';`,
    expectedEffect: "Doğum günü '1973-08-16' olan 'Hakan Yavuz' (id: 19) çalışan kaydı silinir."
  },
  {
    id: 'delete-4',
    number: 4,
    title: "4. 'email' Sütununa Göre Satır Silme",
    targetColumn: 'email',
    targetColumnLabel: 'email VARCHAR(100)',
    description: "email = 'gokhan.cetin@tempmail.com' olan geçici hesap sahibi çalışan silinir.",
    sql: `-- 4. email sütununa göre ilgili satırı silme işlemi
DELETE FROM employee
WHERE email = 'gokhan.cetin@tempmail.com';`,
    expectedEffect: "E-posta adresi 'gokhan.cetin@tempmail.com' olan 27 numaralı satır tablodan silinir."
  },
  {
    id: 'delete-5',
    number: 5,
    title: "5. Koşullu / Domain / ID Filtresine Göre Silme",
    targetColumn: 'composite',
    targetColumnLabel: 'email LIKE veya id = 48',
    description: "email sütununda 'tempmail.com' uzantısı geçen veya id = 48 olan geçici satırlar silinir.",
    sql: `-- 5. Belirli e-posta desenine (LIKE) veya id değerine göre satır silme
DELETE FROM employee
WHERE email LIKE '%@tempmail.com' OR id = 48;`,
    expectedEffect: "tempmail.com uzantılı veya id=48 olan kayıtlar temizlenir."
  }
];

export function generateFullSqlScript(author: string = 'Enes Öztürk'): string {
  const insertStatements = INITIAL_EMPLOYEES.map(
    (emp) =>
      `  (${emp.id}, '${emp.name.replace(/'/g, "''")}', '${emp.birthday}', '${emp.email.replace(/'/g, "''")}')`
  ).join(',\n');

  return `-- ====================================================================
-- PROJE: MySQL Test Veritabanı ve Employee Tablosu Çalışması
-- HAZIRLAYAN / GELİŞTİRİCİ: ${author}
-- TARİH: ${new Date().toISOString().split('T')[0]}
-- VERİTABANI MOTORU: MySQL 8.0+ / InnoDB / utf8mb4
-- ====================================================================

-- --------------------------------------------------------------------
-- 1. ADIM: test Veritabanı ve employee Tablosunun Oluşturulması
-- Sütunlar:
--   - id: INTEGER (PRIMARY KEY, AUTO_INCREMENT)
--   - name: VARCHAR(50) NOT NULL
--   - birthday: DATE NOT NULL
--   - email: VARCHAR(100) NOT NULL UNIQUE
-- --------------------------------------------------------------------

CREATE DATABASE IF NOT EXISTS test
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE test;

DROP TABLE IF EXISTS employee;

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  birthday DATE NOT NULL,
  email VARCHAR(100) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_employee_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- 2. ADIM: Mockaroo Servisi ile 50 Adet Veri Eklenmesi (INSERT)
-- --------------------------------------------------------------------

INSERT INTO employee (id, name, birthday, email) VALUES
${insertStatements};

-- Eklenen verileri kontrol etme
SELECT COUNT(*) AS toplam_calisan_sayisi FROM employee;
SELECT * FROM employee LIMIT 10;

-- --------------------------------------------------------------------
-- 3. ADIM: Sütunların Her Birine Göre Diğer Sütunları Güncelleyen
--          5 Adet UPDATE İşlemi
-- --------------------------------------------------------------------

-- [UPDATE 1] 'id' sütununa göre 'name' ve 'email' sütunlarını güncelleme
UPDATE employee
SET name = 'Enes Öztürk (Kıdemli Mimar)',
    email = 'enes.ozturk@enes-enterprise.com'
WHERE id = 1;

-- [UPDATE 2] 'name' sütununa göre 'birthday' ve 'email' sütunlarını güncelleme
UPDATE employee
SET birthday = '1990-08-15',
    email = 'can.ozkan.lead@techforce.com'
WHERE name = 'Can Özkan';

-- [UPDATE 3] 'birthday' sütununa göre 'name' ve 'email' sütunlarını güncelleme
UPDATE employee
SET name = 'Mehmet Demir (Yönetici)',
    email = 'mehmet.demir.yonetici@corpnet.net'
WHERE birthday = '1984-11-03';

-- [UPDATE 4] 'email' sütununa göre 'name' ve 'birthday' sütunlarını güncelleme
UPDATE employee
SET name = 'Zeynep Aydın Kaya',
    birthday = '1989-12-20'
WHERE email = 'zeynep.aydin@samplemail.org';

-- [UPDATE 5] Belirli 'id' aralığına göre 'email' sütununu güncelleme
UPDATE employee
SET email = 'kurumsal.personel@enes-group.com'
WHERE id BETWEEN 8 AND 10;

-- Güncellemeler sonrası kontrol sorgusu
SELECT * FROM employee WHERE id IN (1, 3, 5, 6, 8, 9, 10);

-- --------------------------------------------------------------------
-- 4. ADIM: Sütunların Her Birine Göre İlgili Satırı Silecek
--          5 Adet DELETE İşlemi
-- --------------------------------------------------------------------

-- [DELETE 1] 'id' sütununa göre tek bir satırı silme
DELETE FROM employee
WHERE id = 15;

-- [DELETE 2] 'name' sütununa göre satır silme
DELETE FROM employee
WHERE name = 'Barış Aksoy';

-- [DELETE 3] 'birthday' sütununa göre satır silme
DELETE FROM employee
WHERE birthday = '1973-08-16';

-- [DELETE 4] 'email' sütununa göre satır silme
DELETE FROM employee
WHERE email = 'gokhan.cetin@tempmail.com';

-- [DELETE 5] Belirli desen veya koşula göre satır silme
DELETE FROM employee
WHERE email LIKE '%@tempmail.com' OR id = 48;

-- Silme işlemleri sonrası kalan çalışan sayısı ve son durum
SELECT COUNT(*) AS guncel_kalan_calisan FROM employee;
SELECT * FROM employee ORDER BY id ASC;

-- ====================================================================
-- İMZA: Hazırlayan - ${author}
-- MySQL Veritabanı ve Tablo Yönetimi Başarıyla Tamamlandı.
-- ====================================================================
`;
}
