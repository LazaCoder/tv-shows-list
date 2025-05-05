# JuniorDev NEXT.js završni projekt - Showmania

[Poveznica na deployment na Vercelu](https://tv-shows-list.vercel.app/)

## Zahtjevi i opis projekta:

Ova aplikacija omogućuje korisnicima istraživanje popularnih TV serija koristeći TV Maze API. Glavne funkcionalnosti uključuju:

- Pregled najpopularnijih serija (naslovnica)
- Detaljni prikaz serije (poster, opis, žanrovi, ocjena itd.)
- Popis epizoda i detalji pojedine epizode
- Prikaz glumačke postave
- Dodavanje i uklanjanje serija iz omiljenih (favorites) uz vlastitu API rutu (GET, POST, DELETE)
- Favoriti prikazani kao grid s posterima
- SEO optimizacija i prilagođene loading/not-found stranice
- Deployment na Vercel
- Opcionalno: pretraga, filtriranje po žanru, infinite scroll, integracija s NextAuth.

[Poveznica na detaljni opis](https://edit-react-docs.vercel.app/next_03/zadatak)

## Lokalna instalacija i pokretanje stranice (Windows)

1. Pokrenuti Windows CMD i pozicionirati se u direktorij (`cd /put/do/direktorija`) gdje se žele spremiti kod projekta <br>
2. Klonirati repozitorij:

   ```cmd
   git clone https://github.com/LazaCoder/tv-shows-list
   ```

   

3. Pozicionirati se u direktorij unutar CMD-a i pokrenuti iduće naredbe:
   ```cmd
   npm install
   npm run dev
   ```
   
4. Ući na https://localhost:3000 gdje će biti prikazana početna stranica

<br>

> [!NOTE]
> Ako nemate instaliran Node.JS na računalu trebate ga preuzeti i instalirati a to možete napraviti [ovdje](https://nodejs.org/en)

## Dnevnik rada

### 2025-05-01

- Kreirana Next.js template aplikacija
- Napravljena početna stranica sa prikazom serija filtriranih po ratingu
- Napravljen osnovni layout stranice ( Header, globals.css i sl.)

### 2025-05-02

- Dodana stranica s detaljima pojedine serije
- Implementiran dio prikaza svih epizoda

### 2025-05-03

- U potpunosti implementiran prikaz svih epizoda jedne serije po sezonama
- Prikaz stranice sa više detalja pojedinačne epizode

### 2025-05-04

- Prijenos i sinkronizacija koda sa Github repozitorijem
- Prikaz stranice sa svim glumcima serije + load more button komponenta

### 2025-05-05

- Prvi deploy na Vercel u kontekstu provjeravanja i postavljanja env varijabli
- Optimizacija fontova
