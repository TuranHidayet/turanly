# Turanly.com - Texniki Tapşırıq

## 1. Layihə Haqqında
- **Sayt:** turanly.com (Turan Hidayetov - Portfolio)
- **Tip:** Tam statik (SSG) - database yoxdur
- **Domain:** turanly.com (alınıb)

## 2. Texnologiya Stack
| Komponent | Texnologiya |
|-----------|-------------|
| Framework | Next.js 15 (App Router) |
| Dil | TypeScript |
| Styling | Tailwind CSS |
| İ18n | next-intl (çoxdilli dəstək) |
| Deployment | Vercel (və ya Cloudflare Pages) |
| Domain | turanly.com (Vercel DNS) |
| Blog | MDX faylları (local) |

## 3. Dillər
- Azərbaycan (az) - default
- İngilis (en)
- Rus (ru)

## 4. Səhifələr və Struktur
```
/
├── [about]          # /haqqimda, /about, /about-ru
├── [work]           # /islerim, /work, /work-ru
├── [blog]           # /blog, /blog/en, /blog/ru
│   └── [slug]       # Blog post (MDX)
├── [contact]        # /elaqe, /contact, /contact-ru
```

### 4.1 Ana Səhifə (/)
- Hero section: ad, title, qısa təsvir
- Featured işlər (3-4 ədəd)
- Son blog yazıları
- Contact CTA

### 4.2 About (/haqqimda | /about)
- Şəkil + bio
- Təhsil / iş təcrübəsi timeline
- Skills (texnologiyalar)
- CV yükləmə linki

### 4.3 Work (/islerim | /work)
- Project cards (şəkil, ad, texnologiya, link)
- Filter (Frontend, Fullstack, UI/UX)
- Hər bir project üçün ayrı səhifə (opsional)

### 4.4 Blog (/blog | /blog/en | /blog/ru)
- Blog listing (card view)
- MDX ilə yazılar
- Tag filter
- Search (basic)

### 4.5 Contact (/elaqe | /contact)
- Kontakt forması (EmailJS / Formspree
- Social media linkləri (GitHub, LinkedIn, Email)
- Location / saat qurşağı

## 5. Dizayn Xüsusiyyətləri
- **Dark/Light Mode** - next-themes ilə
- **Responsive** - mobile-first
- **Animasiyalar** - Framer Motion
- **Font:** Inter (sans-serif)
- **Rəng palitrası:**
  - Light: ağ fon, tünd boz text, mavi accent
  - Dark: tünd fon, ağ text, açıq mavi accent

## 6. Komponentlər
- `Navbar` - responsive, language switcher, theme toggle
- `Footer` - sosial linklər, copyright
- `ProjectCard` - iş kartı
- `BlogCard` - blog kartı
- `Timeline` - təcrübə timeline
- `ThemeToggle` - dark/light keçid
- `LanguageSwitcher` - dil dəyişmə
- `ContactForm` - əlaqə forması
- `SkillBadge` - texnologiya badge

## 7. Məlumat Mənbələri
- **İşlər:** `/data/projects.json`
- **Təcrübə:** `/data/experience.json`
- **Skills:** `/data/skills.json`
- **Blog:** `/content/blog/` (MDX faylları)
- **Şəxsi məlumat:** `/data/profile.json`

## 8. SEO
- next-seo / built-in metadata
- Open Graph şəkillər
- Sitemap (next-sitemap)
- robots.txt

## 9. Performans Hədəfləri
- Lighthouse 95+ (bütün kateqoriyalar)
- First Contentful Paint < 1s
- Total bundle size < 100KB (initial)

## 10. Deploy Pipeline
1. `git push` → Vercel auto-deploy
2. Custom domain: turanly.com
3. SSL auto (Vercel)
4. CDN auto

---

## İcra Planı (Sprint 1)
1. Next.js layihə setup + Tailwind + TypeScript
2. Dark/light mode + i18n setup
3. Navbar + Footer + Layout
4. Ana səhifə (Hero)
5. About səhifəsi
6. Work səhifəsi
7. Blog sistemi (MDX)
8. Contact səhifəsi
9. Deploy + domain bağlantısı
