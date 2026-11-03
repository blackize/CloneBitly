# Статус проєкту Shortnow (`shortnow.site`) — Checkpoint

**Останнє оновлення:** 3 листопада 2026
**Продакшен URL:** [https://shortnow.site](https://shortnow.site)
**Деплой:** Автоматичний на Vercel при пуші в гілку `main` (`github.com:blackize/CloneBitly.git`).

---

## ✅ Що вже реалізовано і працює в продакшені

### 1. Брендинг, UI та Інфраструктура
- Очищено фірмовий логотип синього ланцюга «S» від шахового фону (`frontend/public/logo.png`, `favicon.png`, `favicon.ico`, `icon.png`, `apple-icon.png`), зменшено вагу іконок з 548 KB до 7–31 KB.
- Налаштовано маршрутизацію монорепозиторію в `vercel.json`, щоб клієнтські маршрути `/tools/*`, `/stats/*` та іконки віддавалися Next.js, а короткі посилання `/:slug` — бекендом NestJS.

### 2. Programmatic SEO (pSEO) — 22 сторінки в індексі (`sitemap.xml`)
- Головна сторінка `/` переведена на Server-Side Rendering (SSR) із повною розміткою **JSON-LD (`WebApplication` + `FAQPage`)**.
- Створено каталог `/tools` та **20 спеціалізованих посадкових сторінок** у `frontend/src/data/seo-tools.ts`:
  - **Інструменти з окремими режимами роботи віджета:**
    - `/tools/qr-code-generator` (режим `qr`)
    - `/tools/utm-link-shortener` (режим `utm` — поля `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`)
    - `/tools/whatsapp-link-generator` (режим `whatsapp` — генерація `wa.me` за номером телефону і текстом повідомлення + короткий лінк і QR)
    - `/tools/link-click-tracker` (режим `tracker` — миттєвий перехід до статистики існуючого лінка або створення нового)
    - `/tools/custom-url-shortener`, `/tools/shopify-link-shortener`, `/tools/google-forms-link-shortener`
  - **Платформні та порівняльні лендінги:**
    - `/tools/amazon-link-shortener`, `/tools/discord-link-shortener`, `/tools/instagram-bio-link-shortener`, `/tools/google-drive-link-shortener`, `/tools/youtube-link-shortener`, `/tools/telegram-link-shortener`, `/tools/tiktok-link-shortener`, `/tools/linkedin-url-shortener`, `/tools/notion-link-shortener`, `/tools/canva-link-shortener`, `/tools/podcast-link-shortener`, `/tools/bitly-alternative`, `/tools/tinyurl-alternative`.

### 3. Локальний дашборд без реєстрації та Віральні петлі (PLG)
- **My Recent Links (`localStorage`):** Користувач без реєстрації бачить під формою свої останні 8 створених посилань із живим підтягуванням кількості кліків та кнопкою `↻ Refresh Clicks`.
- **Перехоплення вільних посилань (`/?claim=slug`):** Якщо хтось переходить за неіснуючим коротким посиланням (`shortnow.site/my-brand`), бекенд перенаправляє на `/?claim=my-brand`, де поле Custom Alias автоматично заповнюється цим слагом.
- **Сторінка статистики (`/stats/[slug]`):** Додано кнопку живого оновлення кліків, тизер платних Pro-функцій (`✏️ Edit Destination (Pro)`, `🔒 Unlock Pro Workspace`) та віральний банер для створення власних посилань.

### 4. Безпека та захист домену від спаму (`backend/src/links.service.ts`)
- Сувора перевірка URL: дозволені лише публічні `http://` та `https://` домени.
- Заблоковано циклічні редіректи (`shortnow.site`) та вкладені URL-шортенери (`bit.ly`, `tinyurl.com`, `t.co`, `cutt.ly` тощо).
- Заблоковано прямі посилання на виконувані файли (`.exe`, `.bat`, `.scr`, `.msi`, `.vbs`, `.ps1`, `.jar`).
- Захищено список системних маршрутів (`RESERVED_SLUGS`: `api`, `stats`, `tools`, `admin`, `dashboard`, `login`, `pricing`, `pro` тощо).
- Виправлено `RateLimitGuard` для точного зчитування клієнтського IP на Vercel через `x-forwarded-for` (10 запитів/хв).

---

## 💰 Поточна модель: Free vs Pro

| Функція | Free (Працює зараз без логіну) | Pro ($5–$9/міс — Наступний етап) |
| :--- | :--- | :--- |
| Скорочення посилань + кастомний слаг | ✅ Безлімітно (до 10/хв з IP) | ✅ + Ультракороткі слаги (2–3 символи) |
| QR-код для кожного посилання | ✅ PNG 240×240 | 🔒 Векторний SVG для друку + брендовані кольори/лого |
| Статистика кліків (`/stats/slug`) | ✅ Загальний лічильник кліків | 🔒 Країни, міста, пристрої (iOS/Android), джерела (Referrers) та графік по днях |
| Зміна цільового URL (`Edit Destination`) | ❌ Недоступно | 🔒 Можливість змінити куди веде існуючий короткий лінк і QR-код |
| Збереження історії посилань | ✅ Локально в браузері (`localStorage`) | 🔒 Хмарний кабінет з синхронізацією між пристроями |

---

## 🎯 Точка відновлення розробки (Що робити наступним кроком)

Коли повернетеся до розробки, починаємо звідси:

1. **Крок 1: Збір Email-лідів у блоці Pro на `/stats/[slug]` + фоновий збір Geo/Device телеметрії**
   - Почати записувати країну (`x-vercel-ip-country`), пристрій (`User-Agent` → iOS/Android/Desktop) та джерело (`Referer` → Telegram/Instagram/Direct) під час кожного редіректу.
   - Показувати на `/stats/[slug]` тизер реальних даних під замком (наприклад, топ-1 країну видно, решта заблюрені під кнопкою `Unlock Pro`).
   - Додати поле вводу Email у блок `Edit Destination (Pro)` / `Unlock Pro Workspace`, щоб збирати контакти маркетологів, готових платити.
2. **Крок 2: Мультимовне pSEO (UA, PL, ES, DE, PT)**
   - Локалізувати 5 головних інструментів на мови з низькою конкуренцією у видачі Google.
3. **Крок 3: Особистий кабінет (`/dashboard`) + Google Auth + Stripe**
   - Вхід у 1 клік з автоматичним перенесенням посилань із `localStorage` у хмарний акаунт користувача та підключенням оплати.
