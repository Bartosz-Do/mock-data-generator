# Mock Data Generator (Next.js + API)

## Opis projektu

Aplikacja webowa oparta o Next.js sluzaca do generowania mockowych danych do baz danych i projektow developerskich.

Uzytkownik moze:
- definiowac wlasne pola (np. `username`, `email_address`)
- wybierac typ danych dla kazdego pola (np. email, username, password)
- okreslac liczbe rekordow (limit ~300)
- generowac dane poprzez API
- wyswietlac dane:
  - wizualnie (preview)
  - jako JSON (do kopiowania)
  - jako zapytania SQL (do wklejenia do bazy)

---

## Zalozenia architektoniczne

### Backend (API)
- odpowiada tylko za generowanie surowych danych
- brak logiki prezentacji i formatowania
- brak bazy danych

### Frontend
- buduje strukture danych wedlug pol uzytkownika
- generuje JSON i SQL
- renderuje podglad danych i obsluguje UI

---

## API

### Endpoint

```http
POST /api/generate
```

### Request (body)

```json
{
  "count": 100,
  "fields": [
    { "type": "username" },
    { "type": "email" }
  ],
  "seed": 123
}
```

### Response

```json
{
  "meta": {
    "count": 100,
    "generatedAt": "2026-03-18T12:00:00Z"
  },
  "data": [
    {
      "username": "exampleUser",
      "email": "example@email.com"
    }
  ]
}
```

---

## Seed (deterministyczne dane)

Seed pozwala generowac powtarzalne dane.  
Ten sam seed + ten sam request = identyczne dane.

### Przyklad

```json
{
  "count": 3,
  "fields": [{ "type": "username" }],
  "seed": 123
}
```

### Zastosowania

- testy
- debugowanie
- odtwarzanie danych
- share config

---

## Funkcjonalnosci

- Generator danych:
  - username, email, password, avatar, data, liczby (rozszerzalne)
- Dynamiczne pola:
  - dodawanie wlasnych nazw pol
  - przypisywanie typow danych
- Preview danych:
  - wizualne wyswietlanie rekordow (limit 5-10)
- Export:
  - JSON i SQL do kopiowania
- Copy to clipboard:
  - przycisk "Copy code" z feedbackiem ("Copied ✅")

---

## Ograniczenia

- maksymalnie ~300 rekordow
- brak bazy danych
- brak autoryzacji na start
- brak cache

---

## Walidacja

API powinno sprawdzac:

- poprawnosc `count` (1-300)
- poprawnosc `fields` i typow danych
- obecnosc body w request

---

## Performance

- wszystkie dane w jednym request
- brak wielu requestow
- limit zapobiega przeciazeniu

---

## Struktura projektu (high-level)

```txt
/app
/components
/lib
  /generator
  /formatters
/types
```

---

## UI (Figma + SCSS)

Sekcje:

1. Generator (fields + count)
2. Preview danych
3. Export (JSON / SQL)

---

## Mozliwe rozszerzenia

- Presety (np. e-commerce)
- Zaleznosci miedzy polami
- Custom wartosci (np. `user_{index}`)
- Rozne locale
- CSV export
- Relacje miedzy tabelami
- Share link z seedem i configiem
- Publiczne API

---

## Cel projektu

- uniwersalne narzedzie do generowania danych
- rozwoj umiejetnosci fullstack (API + frontend)
- projekt portfolio z realnym zastosowaniem

---

## Kluczowe decyzje

- POST zamiast GET
- API zwraca tylko surowe dane
- JSON/SQL generowane po stronie klienta
- seed jako opcjonalna funkcja
- prostota w MVP

---

## Status

MVP w planowaniu 🚧
