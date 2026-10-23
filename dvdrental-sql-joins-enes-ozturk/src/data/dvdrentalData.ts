import { TableSchema } from '../types/sql';

export interface CountryRow {
  country_id: number;
  country: string;
  last_update: string;
}

export interface CityRow {
  city_id: number;
  city: string;
  country_id: number | null;
  last_update: string;
}

export interface CustomerRow {
  customer_id: number;
  store_id: number;
  first_name: string;
  last_name: string;
  email: string;
  address_id: number;
  active: number;
  create_date: string;
}

export interface PaymentRow {
  payment_id: number;
  customer_id: number | null;
  staff_id: number;
  rental_id: number | null;
  amount: number;
  payment_date: string;
}

export interface RentalRow {
  rental_id: number;
  rental_date: string;
  inventory_id: number;
  customer_id: number | null;
  return_date: string | null;
  staff_id: number;
}

// 1. Country Tablosu (dvdrental örnek verileri)
export const initialCountries: CountryRow[] = [
  { country_id: 1, country: 'Afghanistan', last_update: '2026-02-15 04:44:00' },
  { country_id: 2, country: 'Algeria', last_update: '2026-02-15 04:44:00' },
  { country_id: 3, country: 'American Samoa', last_update: '2026-02-15 04:44:00' },
  { country_id: 4, country: 'Angola', last_update: '2026-02-15 04:44:00' },
  { country_id: 5, country: 'Anguilla', last_update: '2026-02-15 04:44:00' },
  { country_id: 6, country: 'Argentina', last_update: '2026-02-15 04:44:00' },
  { country_id: 7, country: 'Armenia', last_update: '2026-02-15 04:44:00' },
  { country_id: 8, country: 'Australia', last_update: '2026-02-15 04:44:00' },
  { country_id: 9, country: 'Austria', last_update: '2026-02-15 04:44:00' },
  { country_id: 10, country: 'Azerbaijan', last_update: '2026-02-15 04:44:00' },
  { country_id: 14, country: 'Brazil', last_update: '2026-02-15 04:44:00' },
  { country_id: 20, country: 'Canada', last_update: '2026-02-15 04:44:00' },
  { country_id: 34, country: 'France', last_update: '2026-02-15 04:44:00' },
  { country_id: 38, country: 'Germany', last_update: '2026-02-15 04:44:00' },
  { country_id: 49, country: 'Italy', last_update: '2026-02-15 04:44:00' },
  { country_id: 50, country: 'Japan', last_update: '2026-02-15 04:44:00' },
  { country_id: 97, country: 'Turkey', last_update: '2026-02-15 04:44:00' },
  { country_id: 102, country: 'United Kingdom', last_update: '2026-02-15 04:44:00' },
  { country_id: 103, country: 'United States', last_update: '2026-02-15 04:44:00' },
  { country_id: 104, country: 'Vatican City', last_update: '2026-02-15 04:44:00' }, // Eşleşen şehri olmayan ülke (JOIN karşılaştırması için)
];

// 2. City Tablosu (dvdrental örnek verileri)
export const initialCities: CityRow[] = [
  { city_id: 1, city: 'A Coruña (La Coruña)', country_id: 87, last_update: '2026-02-15 04:45:25' },
  { city_id: 2, city: 'Abha', country_id: 82, last_update: '2026-02-15 04:45:25' },
  { city_id: 3, city: 'Abu Dhabi', country_id: 101, last_update: '2026-02-15 04:45:25' },
  { city_id: 4, city: 'Acua', country_id: 60, last_update: '2026-02-15 04:45:25' },
  { city_id: 5, city: 'Adana', country_id: 97, last_update: '2026-02-15 04:45:25' },
  { city_id: 6, city: 'Adapazari', country_id: 97, last_update: '2026-02-15 04:45:25' },
  { city_id: 7, city: 'Adoni', country_id: 44, last_update: '2026-02-15 04:45:25' },
  { city_id: 8, city: 'Ahmadnagar', country_id: 44, last_update: '2026-02-15 04:45:25' },
  { city_id: 9, city: 'Akishima', country_id: 50, last_update: '2026-02-15 04:45:25' },
  { city_id: 10, city: 'Akron', country_id: 103, last_update: '2026-02-15 04:45:25' },
  { city_id: 11, city: 'al-Ayn', country_id: 101, last_update: '2026-02-15 04:45:25' },
  { city_id: 12, city: 'al-Hawiya', country_id: 82, last_update: '2026-02-15 04:45:25' },
  { city_id: 13, city: 'al-Manama', country_id: 11, last_update: '2026-02-15 04:45:25' },
  { city_id: 14, city: 'al-Qadarif', country_id: 90, last_update: '2026-02-15 04:45:25' },
  { city_id: 15, city: 'al-Qatif', country_id: 82, last_update: '2026-02-15 04:45:25' },
  { city_id: 16, city: 'Albuquerque', country_id: 103, last_update: '2026-02-15 04:45:25' },
  { city_id: 17, city: 'Algiers', country_id: 2, last_update: '2026-02-15 04:45:25' },
  { city_id: 18, city: 'Allentown', country_id: 103, last_update: '2026-02-15 04:45:25' },
  { city_id: 19, city: 'Ankara', country_id: 97, last_update: '2026-02-15 04:45:25' },
  { city_id: 20, city: 'Antalya', country_id: 97, last_update: '2026-02-15 04:45:25' },
  { city_id: 21, city: 'Berlin', country_id: 38, last_update: '2026-02-15 04:45:25' },
  { city_id: 22, city: 'London', country_id: 102, last_update: '2026-02-15 04:45:25' },
  { city_id: 23, city: 'Paris', country_id: 34, last_update: '2026-02-15 04:45:25' },
  { city_id: 24, city: 'Istanbul', country_id: 97, last_update: '2026-02-15 04:45:25' },
  { city_id: 25, city: 'Izmir', country_id: 97, last_update: '2026-02-15 04:45:25' },
  { city_id: 999, city: 'Atlantis (Kayıtsız Bölge)', country_id: null, last_update: '2026-02-15 04:45:25' }, // LEFT JOIN NULL gösterimi için
];

// 3. Customer Tablosu (dvdrental örnek verileri)
export const initialCustomers: CustomerRow[] = [
  { customer_id: 1, store_id: 1, first_name: 'Mary', last_name: 'Smith', email: 'mary.smith@sakilacustomer.org', address_id: 5, active: 1, create_date: '2026-02-14' },
  { customer_id: 2, store_id: 1, first_name: 'Patricia', last_name: 'Johnson', email: 'patricia.johnson@sakilacustomer.org', address_id: 6, active: 1, create_date: '2026-02-14' },
  { customer_id: 3, store_id: 1, first_name: 'Linda', last_name: 'Williams', email: 'linda.williams@sakilacustomer.org', address_id: 7, active: 1, create_date: '2026-02-14' },
  { customer_id: 4, store_id: 2, first_name: 'Barbara', last_name: 'Jones', email: 'barbara.jones@sakilacustomer.org', address_id: 8, active: 1, create_date: '2026-02-14' },
  { customer_id: 5, store_id: 1, first_name: 'Elizabeth', last_name: 'Brown', email: 'elizabeth.brown@sakilacustomer.org', address_id: 9, active: 1, create_date: '2026-02-14' },
  { customer_id: 6, store_id: 2, first_name: 'Jennifer', last_name: 'Davis', email: 'jennifer.davis@sakilacustomer.org', address_id: 10, active: 1, create_date: '2026-02-14' },
  { customer_id: 7, store_id: 1, first_name: 'Maria', last_name: 'Miller', email: 'maria.miller@sakilacustomer.org', address_id: 11, active: 1, create_date: '2026-02-14' },
  { customer_id: 8, store_id: 2, first_name: 'Susan', last_name: 'Wilson', email: 'susan.wilson@sakilacustomer.org', address_id: 12, active: 1, create_date: '2026-02-14' },
  { customer_id: 9, store_id: 1, first_name: 'Margaret', last_name: 'Moore', email: 'margaret.moore@sakilacustomer.org', address_id: 13, active: 1, create_date: '2026-02-14' },
  { customer_id: 10, store_id: 1, first_name: 'Dorothy', last_name: 'Taylor', email: 'dorothy.taylor@sakilacustomer.org', address_id: 14, active: 1, create_date: '2026-02-14' },
  { customer_id: 11, store_id: 2, first_name: 'Lisa', last_name: 'Anderson', email: 'lisa.anderson@sakilacustomer.org', address_id: 15, active: 1, create_date: '2026-02-14' },
  { customer_id: 12, store_id: 1, first_name: 'Nancy', last_name: 'Thomas', email: 'nancy.thomas@sakilacustomer.org', address_id: 16, active: 1, create_date: '2026-02-14' },
  { customer_id: 13, store_id: 2, first_name: 'Karen', last_name: 'Jackson', email: 'karen.jackson@sakilacustomer.org', address_id: 17, active: 1, create_date: '2026-02-14' },
  { customer_id: 14, store_id: 2, first_name: 'Betty', last_name: 'White', email: 'betty.white@sakilacustomer.org', address_id: 18, active: 1, create_date: '2026-02-14' },
  { customer_id: 15, store_id: 1, first_name: 'Helen', last_name: 'Harris', email: 'helen.harris@sakilacustomer.org', address_id: 19, active: 1, create_date: '2026-02-14' },
  { customer_id: 99, store_id: 1, first_name: 'Enes', last_name: 'Öztürk (Henüz Kiralaması Yok)', email: 'enes.ozturk@example.com', address_id: 20, active: 1, create_date: '2026-10-23' }, // FULL JOIN'de sol tarafta olup sağda olmayan kayıt
];

// 4. Payment Tablosu (dvdrental örnek verileri)
export const initialPayments: PaymentRow[] = [
  { payment_id: 17503, customer_id: 1, staff_id: 1, rental_id: 1520, amount: 2.99, payment_date: '2026-05-15 09:12:00' },
  { payment_id: 17504, customer_id: 1, staff_id: 2, rental_id: 1711, amount: 0.99, payment_date: '2026-05-16 11:45:00' },
  { payment_id: 17505, customer_id: 1, staff_id: 1, rental_id: 2118, amount: 3.99, payment_date: '2026-05-18 16:20:00' },
  { payment_id: 17506, customer_id: 2, staff_id: 2, rental_id: 1790, amount: 4.99, payment_date: '2026-05-16 13:00:00' },
  { payment_id: 17507, customer_id: 2, staff_id: 1, rental_id: 2320, amount: 0.99, payment_date: '2026-05-19 14:15:00' },
  { payment_id: 17508, customer_id: 3, staff_id: 1, rental_id: 1950, amount: 1.99, payment_date: '2026-05-17 10:30:00' },
  { payment_id: 17509, customer_id: 3, staff_id: 2, rental_id: 2450, amount: 4.99, payment_date: '2026-05-20 17:50:00' },
  { payment_id: 17510, customer_id: 4, staff_id: 1, rental_id: 1820, amount: 2.99, payment_date: '2026-05-16 15:40:00' },
  { payment_id: 17511, customer_id: 5, staff_id: 2, rental_id: 2010, amount: 5.99, payment_date: '2026-05-18 09:10:00' },
  { payment_id: 17512, customer_id: 6, staff_id: 1, rental_id: 2205, amount: 2.99, payment_date: '2026-05-19 12:25:00' },
  { payment_id: 17513, customer_id: 7, staff_id: 2, rental_id: 2411, amount: 4.99, payment_date: '2026-05-20 14:05:00' },
  { payment_id: 17514, customer_id: 8, staff_id: 1, rental_id: 2590, amount: 1.99, payment_date: '2026-05-21 16:40:00' },
  { payment_id: 17515, customer_id: 9, staff_id: 2, rental_id: 2715, amount: 3.99, payment_date: '2026-05-22 18:30:00' },
  { payment_id: 17516, customer_id: 10, staff_id: 1, rental_id: 2880, amount: 2.99, payment_date: '2026-05-23 10:15:00' },
  { payment_id: 17517, customer_id: 11, staff_id: 2, rental_id: 3012, amount: 4.99, payment_date: '2026-05-24 13:40:00' },
  { payment_id: 17518, customer_id: 12, staff_id: 1, rental_id: 3150, amount: 0.99, payment_date: '2026-05-25 15:20:00' },
  { payment_id: 17519, customer_id: 13, staff_id: 2, rental_id: 3290, amount: 6.99, payment_date: '2026-05-26 11:00:00' },
  { payment_id: 17520, customer_id: 14, staff_id: 1, rental_id: 3410, amount: 2.99, payment_date: '2026-05-27 16:30:00' },
  { payment_id: 99999, customer_id: null, staff_id: 2, rental_id: null, amount: 15.00, payment_date: '2026-05-28 20:00:00' }, // RIGHT JOIN farkını gösteren anonim ödeme (müşteri silinmiş/tanımsız)
];

// 5. Rental Tablosu (dvdrental örnek verileri)
export const initialRentals: RentalRow[] = [
  { rental_id: 1, rental_date: '2026-05-24 22:53:30', inventory_id: 367, customer_id: 130, return_date: '2026-05-26 22:04:30', staff_id: 1 },
  { rental_id: 2, rental_date: '2026-05-24 22:54:33', inventory_id: 1525, customer_id: 459, return_date: '2026-05-28 19:40:33', staff_id: 1 },
  { rental_id: 1520, rental_date: '2026-05-15 09:12:00', inventory_id: 101, customer_id: 1, return_date: '2026-05-19 12:00:00', staff_id: 1 },
  { rental_id: 1711, rental_date: '2026-05-16 11:45:00', inventory_id: 102, customer_id: 1, return_date: '2026-05-20 15:30:00', staff_id: 2 },
  { rental_id: 1790, rental_date: '2026-05-16 13:00:00', inventory_id: 204, customer_id: 2, return_date: '2026-05-21 17:00:00', staff_id: 2 },
  { rental_id: 1820, rental_date: '2026-05-16 15:40:00', inventory_id: 305, customer_id: 4, return_date: '2026-05-22 10:15:00', staff_id: 1 },
  { rental_id: 1950, rental_date: '2026-05-17 10:30:00', inventory_id: 406, customer_id: 3, return_date: '2026-05-23 18:20:00', staff_id: 1 },
  { rental_id: 2010, rental_date: '2026-05-18 09:10:00', inventory_id: 507, customer_id: 5, return_date: '2026-05-24 14:40:00', staff_id: 2 },
  { rental_id: 2118, rental_date: '2026-05-18 16:20:00', inventory_id: 608, customer_id: 1, return_date: '2026-05-25 11:10:00', staff_id: 1 },
  { rental_id: 2205, rental_date: '2026-05-19 12:25:00', inventory_id: 709, customer_id: 6, return_date: '2026-05-26 13:00:00', staff_id: 1 },
  { rental_id: 2320, rental_date: '2026-05-19 14:15:00', inventory_id: 810, customer_id: 2, return_date: '2026-05-27 16:45:00', staff_id: 1 },
  { rental_id: 2411, rental_date: '2026-05-20 14:05:00', inventory_id: 911, customer_id: 7, return_date: '2026-05-28 10:30:00', staff_id: 2 },
  { rental_id: 2450, rental_date: '2026-05-20 17:50:00', inventory_id: 1012, customer_id: 3, return_date: '2026-05-29 19:15:00', staff_id: 2 },
  { rental_id: 2590, rental_date: '2026-05-21 16:40:00', inventory_id: 1113, customer_id: 8, return_date: '2026-05-30 11:20:00', staff_id: 1 },
  { rental_id: 8888, rental_date: '2026-05-22 18:00:00', inventory_id: 1214, customer_id: 777, return_date: '2026-05-31 09:00:00', staff_id: 2 }, // customer_id 777 müşteriler tablomuzda yok -> FULL JOIN sağ taraf NULL testi!
];

// DVD Rental Tablo Şemaları
export const dvdrentalSchemas: Record<string, TableSchema> = {
  country: {
    name: 'country',
    description: 'Ülke tanımlamaları ve ülke ID bilgileri',
    rowCount: initialCountries.length,
    columns: [
      { name: 'country_id', type: 'integer', isPk: true, description: 'Ülke tekil anahtarı (PK)' },
      { name: 'country', type: 'varchar(50)', description: 'Ülke adı' },
      { name: 'last_update', type: 'timestamp', description: 'Son güncellenme zamanı' },
    ],
  },
  city: {
    name: 'city',
    description: 'Şehir bilgileri ve bağlı oldukları ülke ID referansı',
    rowCount: initialCities.length,
    columns: [
      { name: 'city_id', type: 'integer', isPk: true, description: 'Şehir tekil anahtarı (PK)' },
      { name: 'city', type: 'varchar(50)', description: 'Şehir adı' },
      { name: 'country_id', type: 'smallint', isFk: true, fkTarget: 'country.country_id', description: 'Bağlı olduğu ülke ID (FK)' },
      { name: 'last_update', type: 'timestamp', description: 'Son güncellenme zamanı' },
    ],
  },
  customer: {
    name: 'customer',
    description: 'Müşteri kimlik, isim, soyisim ve iletişim bilgileri',
    rowCount: initialCustomers.length,
    columns: [
      { name: 'customer_id', type: 'integer', isPk: true, description: 'Müşteri tekil anahtarı (PK)' },
      { name: 'store_id', type: 'smallint', description: 'Kayıtlı olduğu mağaza ID' },
      { name: 'first_name', type: 'varchar(45)', description: 'Müşteri ilk adı' },
      { name: 'last_name', type: 'varchar(45)', description: 'Müşteri soyadı' },
      { name: 'email', type: 'varchar(50)', description: 'E-posta adresi' },
      { name: 'address_id', type: 'smallint', description: 'Adres ID' },
      { name: 'active', type: 'integer', description: 'Aktiflik durumu' },
    ],
  },
  payment: {
    name: 'payment',
    description: 'Müşteriler tarafından yapılan film kiralama ödemeleri',
    rowCount: initialPayments.length,
    columns: [
      { name: 'payment_id', type: 'integer', isPk: true, description: 'Ödeme tekil anahtarı (PK)' },
      { name: 'customer_id', type: 'smallint', isFk: true, fkTarget: 'customer.customer_id', description: 'Ödemeyi yapan müşteri ID (FK)' },
      { name: 'staff_id', type: 'smallint', description: 'İşlemi alan personel ID' },
      { name: 'rental_id', type: 'integer', isFk: true, fkTarget: 'rental.rental_id', description: 'İlgili kiralama ID' },
      { name: 'amount', type: 'numeric(5,2)', description: 'Ödenen tutar ($)' },
      { name: 'payment_date', type: 'timestamp', description: 'Ödeme tarihi ve saati' },
    ],
  },
  rental: {
    name: 'rental',
    description: 'DVD kiralama hareketleri ve teslim tarihleri',
    rowCount: initialRentals.length,
    columns: [
      { name: 'rental_id', type: 'integer', isPk: true, description: 'Kiralama işlem anahtarı (PK)' },
      { name: 'rental_date', type: 'timestamp', description: 'Kiralama tarihi' },
      { name: 'inventory_id', type: 'integer', description: 'Envanterdeki DVD ID' },
      { name: 'customer_id', type: 'smallint', isFk: true, fkTarget: 'customer.customer_id', description: 'Kiralayan müşteri ID (FK)' },
      { name: 'return_date', type: 'timestamp', description: 'Geri getirilme tarihi' },
      { name: 'staff_id', type: 'smallint', description: 'İşlemi yapan personel ID' },
    ],
  },
};
