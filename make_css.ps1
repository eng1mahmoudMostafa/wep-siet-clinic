 = '/* NileCare Stylesheet */

:root { --teal-600: #0d9488; --teal-50: #f0fdfa; --blue-600: #2563eb; --blue-100: #dbeafe; --white: #ffffff; --gray-900: #111827; --gray-800: #1f2937; --gray-700: #374151; --gray-600: #4b5563; --gray-500: #6b7280; --gray-400: #9ca3af; --gray-200: #e5e7eb; --gray-100: #f3f4f6; --space-xs: 0.25rem; --space-sm: 0.5rem; --space-md: 1rem; --space-lg: 1.5rem; --space-xl: 2rem; --font-heading: Segoe UI, system-ui, sans-serif; --font-body: Segoe UI, system-ui, sans-serif; --transition-fast: 0.2s ease; --radius-md: 0.5rem; --radius-lg: 0.75rem; }

* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--font-body); font-size: 1rem; line-height: 1.6; color: var(--gray-800); background: var(--white); }
.container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
.site-header { position: sticky; top: 0; z-index: 1000; background: var(--white); box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.header-wrapper { display: flex; align-items: center; justify-content: space-between; height: 72px; }
.brand { display: flex; align-items: center; gap: 0.5rem; }
.brand-logo { width: 40px; height: 40px; background: var(--teal-600); border-radius: 50%; color: #fff; font-weight: 700; font-size: 1.1rem; text-transform: uppercase; display: flex; align-items: center; justify-content: center; }
.brand-name { font-size: 1.5rem; font-weight: 800; color: var(--teal-800); }
.brand-name span { color: var(--blue-600); }
.nav-toggle { display: none; }
.nav-links { display: flex; align-items: center; gap: 2rem; }
.nav-links a { font-size: 0.95rem; font-weight: 600; color: var(--gray-700); }
.nav-links a:hover, .nav-links a.active { color: var(--teal-600); }
.nav-cta { padding: 0.6rem 1.2rem; background: var(--teal-600); color: #fff; border-radius: 0.5rem; font-weight: 700; }
.nav-cta:hover { background: #0f766e; }
.hero { padding: 4rem 1.5rem 5rem; background: linear-gradient(135deg, var(--teal-50), var(--blue-100)); }
.hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: center; }
.hero-content h1 { font-size: 2.75rem; font-weight: 800; color: var(--gray-900); line-height: 1.15; margin-bottom: 1rem; }
.hero-content h1 .highlight { color: var(--teal-600); }
.hero-content p { font-size: 1.1rem; color: var(--gray-600); margin-bottom: 1.5rem; }
.hero-buttons { display: flex; gap: 1rem; }
.btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; border-radius: 0.5rem; font-weight: 700; border: none; cursor: pointer; }
.btn-primary { background: var(--teal-600); color: #fff; }
.btn-primary:hover { background: #0f766e; }
.btn-outline { background: transparent; color: var(--teal-600); border: 2px solid var(--teal-600); }
.features { padding: 3rem 1.5rem; background: var(--white); }
.section-header { text-align: center; max-width: 600px; margin: 0 auto 1.5rem; }
.section-header h2 { font-size: 2rem; font-weight: 800; color: var(--gray-900); }
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; }
.stat-item { text-align: center; padding: 1.5rem; background: var(--gray-50); border-radius: 0.75rem; border: 1px solid var(--gray-100); }
.stat-number { font-size: 2rem; font-weight: 800; color: var(--teal-600); display: block; }
.services { padding: 3rem 1.5rem; background: linear-gradient(135deg, var(--teal-50), var(--blue-100)); }
.services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
.service-card { padding: 1.5rem; border-radius: 0.75rem; background: var(--white); border: 1px solid var(--gray-100); }
.service-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.06); transform: translateY(-4px); }
.service-icon { width: 60px; height: 60px; border-radius: 0.75rem; background: var(--teal-100); color: var(--teal-700); display: flex; align-items: center; justify-content: center; font-size: 1.8rem; margin-bottom: 1rem; }
.service-card h3 { font-size: 1.2rem; font-weight: 700; color: var(--gray-900); }
.service-card p { font-size: 0.95rem; color: var(--gray-600); margin-bottom: 1rem; }
.service-link { font-size: 0.9rem; font-weight: 700; color: var(--teal-600); }
.contact { padding: 3rem 1.5rem; background: var(--white); }
.contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
.contact-info, .contact-form-wrap { padding: 1.5rem; background: var(--gray-50); border-radius: 0.75rem; border: 1px solid var(--gray-100); }
.form-group { margin-bottom: 1rem; }
.form-group label { display: block; font-size: 0.9rem; font-weight: 600; color: var(--gray-700); margin-bottom: 0.25rem; }
.form-group input, .form-group select, .form-group textarea { width: 100%; padding: 0.75rem 1rem; border: 2px solid var(--gray-200); border-radius: 0.5rem; font-family: inherit; font-size: 1rem; }
.form-actions { display: flex; gap: 1rem; margin-top: 1.5rem; }
.booking { padding: 3rem 1.5rem; background: var(--teal-50); }
.booking-grid { max-width: 720px; margin: 0 auto; }
.booking-form { padding: 1.5rem; background: var(--white); border-radius: 0.75rem; border: 1px solid var(--gray-100); }
.booking-form .btn { width: 100%; justify-content: center; }
.site-footer { background: var(--gray-900); color: var(--gray-400); padding: 3rem 1.5rem 2rem; }
.footer-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 1.5rem; }
.footer-brand p { color: var(--gray-400); line-height: 1.7; }
.footer-col h4 { color: #fff; font-weight: 700; margin-bottom: 0.5rem; }
.footer-col a { color: var(--gray-400); }
.footer-col a:hover { color: #fff; }
.footer-bottom { text-align: center; padding-top: 1.5rem; border-top: 1px solid var(--gray-800); font-size: 0.85rem; }
@media (max-width: 768px) { .hero-grid { grid-template-columns: 1fr; } }
@media (max-width: 480px) { .hero-content h1 { font-size: 1.5rem; } .contact-grid { grid-template-columns: 1fr; } }
'; Set-Content -Path 'C:/Users/Elhamd/OneDrive/Desktop/task 2/wep siet/css/style.css' -Value 
