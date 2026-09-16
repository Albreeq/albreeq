// =========================================================
// شركة البريق التقني المميز — app.js v4.5 (Two-Stage OAuth Engine)
// Auth | Theme | UI | Language Toggle System
// =========================================================

// ─── STAGE 1: SYNCHRONOUS PREFLIGHT INTERCEPTOR (< 1ms Execution) ───────────
(function preflightAuthLock() {
    try {
        const rawHash = window.location.hash || '';
        if (rawHash.includes('access_token')) {
            console.log("⚡ OAuth hash detected. Freezing Guest fallback and extracting session...");
            const hashClean = rawHash.startsWith('#') ? rawHash.substring(1) : rawHash;
            const params = new URLSearchParams(hashClean);
            const accessToken = params.get('access_token');

            if (accessToken && accessToken.includes('.')) {
                const base64Url = accessToken.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(
                    window.atob(base64).split('').map(c =>
                        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                    ).join('')
                );
                const jwtData = JSON.parse(jsonPayload);
                const metadata = jwtData.user_metadata || {};
                const verifiedName = metadata.full_name || metadata.name || (jwtData.email ? jwtData.email.split('@')[0] : "مستخدم معتمد");
                const verifiedEmail = jwtData.email || metadata.email || "";
                const verifiedAvatar = metadata.avatar_url || metadata.picture || "";

                const userState = {
                    username: verifiedName,
                    email: verifiedEmail,
                    avatar: verifiedAvatar,
                    id: jwtData.sub
                };

                localStorage.setItem('currentUser', JSON.stringify(userState));
                localStorage.setItem('isLoggedIn', 'true');
                window.__AUTH_PREFLIGHT_LOCKED = true;
                console.log("✓ Preflight Lock Engaged. User permanently set to:", verifiedName);
            }
        }
    } catch (err) {
        console.error("Preflight Auth Interceptor error:", err);
    }
})();

// ─── STAGE 2: SUPABASE CLIENT & REAL-TIME AUTH LISTENER ────────────────────
const SUPABASE_URL = "https://dughjpjcaanzgclbrqtj.supabase.co";
const SUPABASE_KEY = "sb_publishable_D70rSP53C3RD8uN6-a2niA_MngyAxn0";
const GOOGLE_CLIENT_ID = "26469138120-ia1vg199gbpq1680q5qiccbk8bodmmou.apps.googleusercontent.com";
const API_URL = "http://127.0.0.1:5000";

let supabaseClient = null;
if (typeof supabase !== 'undefined' && SUPABASE_URL && SUPABASE_KEY) {
    try {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true
            }
        });
    } catch (err) {
        console.error("Supabase Client Init Error in app.js:", err);
    }
}

if (supabaseClient) {
    supabaseClient.auth.onAuthStateChange((event, session) => {
        console.log("Supabase Auth Event:", event);
        if (session && session.user) {
            const meta = session.user.user_metadata || {};
            const verifiedName = meta.full_name || meta.name || (session.user.email ? session.user.email.split('@')[0] : "مستخدم معتمد");
            
            localStorage.setItem('currentUser', JSON.stringify({
                username: verifiedName,
                email: session.user.email || "",
                avatar: meta.avatar_url || meta.picture || "",
                id: session.user.id
            }));
            localStorage.setItem('isLoggedIn', 'true');

            updateUI();

            // Delay replaceState until session is fully verified and stored
            if (window.location.hash && window.location.hash.includes('access_token')) {
                console.log("✓ Session verified by Supabase SDK. Safely clearing URL hash.");
                window.history.replaceState(null, document.title, window.location.pathname);
            }
        } else if (event === 'SIGNED_OUT') {
            localStorage.removeItem('currentUser');
            localStorage.removeItem('isLoggedIn');
            updateUI();
        }
    });
}

// ─── i18n Dictionary ──────────────────────────────────────
const i18n = {
    ar: {
        navHome:       "الرئيسية",
        navStore:      "المتجر الرقمي",
        navRealestate: "العقارات الفاخرة",
        navSecurity:   "الأنظمة الأمنية والتيار الخفيف",
        navStats:      "الإحصائيات",
        navAbout:      "من نحن",
        darkMode:      "الوضع الداكن",
        lightMode:     "الوضع الفاتح",
        cart:          "السلة",
        cartTitle:     "سلة المشتريات والخدمات",
        addToCart:     "إضافة للسلة",
        outOfStock:    "غير متوفر",
        backToStore:   "← العودة إلى قائمة المنتجات",
        checkout:      "تأكيد الطلب عبر الواتساب المباشر",
        filterTitle:   "تصفح التصنيفات",
        heroBtn:       "استكشف متجر الخدمات والمنتجات",
        heroBtnLogged: "الذهاب للمتجر الرقمي",
        guestUser:     "مستكشف البريق التقني",
    },
    en: {
        navHome:       "Home",
        navStore:      "Digital Store",
        navRealestate: "Luxury Real Estate",
        navSecurity:   "Security & Light Current",
        navStats:      "Analytics",
        navAbout:      "About Us",
        darkMode:      "Dark Mode",
        lightMode:     "Light Mode",
        cart:          "Cart",
        cartTitle:     "Shopping Cart & Services",
        addToCart:     "Add to Cart",
        outOfStock:    "Out of Stock",
        backToStore:   "← Back to Products",
        checkout:      "Confirm Order via WhatsApp",
        filterTitle:   "Browse Categories",
        heroBtn:       "Explore Products & Services",
        heroBtnLogged: "Go to Digital Store",
        guestUser:     "AlBareeq Explorer",
    }
};

let currentLang = localStorage.getItem('lang') || 'ar';

// ─── Language Toggle ──────────────────────────────────────
function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('lang', currentLang);
    applyLanguage();
}

function applyLanguage() {
    const isAr = currentLang === 'ar';
    const dict = i18n[currentLang];

    // Root dir/lang
    document.documentElement.setAttribute('lang', currentLang);
    document.documentElement.setAttribute('dir', isAr ? 'rtl' : 'ltr');

    // Lang toggle button label
    const langBtn = document.getElementById('langToggle');
    if (langBtn) langBtn.textContent = isAr ? 'EN' : 'عربي';

    // Dark mode button
    const isDark = document.body.classList.contains('dark-mode');
    const darkBtn = document.getElementById('darkModeToggle');
    if (darkBtn) darkBtn.textContent = isDark
        ? (isAr ? 'الوضع الفاتح' : 'Light Mode')
        : dict.darkMode;

    // All registered i18n nodes
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (key === 'darkMode') return; // handled above
        if (dict[key] !== undefined) {
            // For links with icons, preserve child img nodes
            const imgs = [...el.querySelectorAll('img')];
            el.textContent = dict[key];
            imgs.forEach(img => el.insertBefore(img, el.firstChild));
        }
    });

    // Hero button
    const heroBtn = document.getElementById('heroBtn');
    if (heroBtn) {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        heroBtn.textContent = user ? dict.heroBtnLogged : dict.heroBtn;
    }

    // Username placeholder
    const nameEl = document.getElementById('displayUsername');
    if (nameEl) {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (!user) nameEl.textContent = dict.guestUser;
    }

    // Notify other modules (e.g. About.js renderTeam) of language change
    window.dispatchEvent(new Event('langChanged'));
}

// ─── Google Auth ──────────────────────────────────────────
function initializeGoogleAuth() {
    const googleBtnDiv = document.getElementById('googleBtn');
    if (googleBtnDiv && typeof google === 'object' && google.accounts) {
        google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGoogleCredentialResponse
        });
        google.accounts.id.renderButton(googleBtnDiv, {
            theme: "outline", size: "large",
            width: googleBtnDiv.parentElement.offsetWidth,
            text: "signup_with", shape: "rectangular"
        });
    } else if (googleBtnDiv) {
        setTimeout(initializeGoogleAuth, 500);
    }
}

function handleGoogleCredentialResponse(response) {
    try {
        const payload = parseJwt(response.credential);
        localStorage.setItem('currentUser', JSON.stringify({
            username: payload.name,
            email: payload.email,
            google_id: payload.sub
        }));
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = "store.html";
    } catch (error) {
        console.error("Google auth error:", error);
    }
}

function parseJwt(token) {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(decodeURIComponent(
        window.atob(base64).split('').map(c =>
            '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        ).join('')
    ));
}

// ─── Auth Form Handler ────────────────────────────────────
async function handleAuth(type) {
    const statusMsg  = document.getElementById('statusMessage');
    const submitBtn  = document.getElementById('submitBtn');
    const email      = document.getElementById('email')?.value;
    const password   = document.getElementById('password')?.value;
    const username   = document.getElementById('username')?.value;

    if (!email || !password) return;

    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = type === 'register' ? "جاري إنشاء الحساب..." : "جاري الدخول...";
    }

    const endpoint = type === 'register' ? 'register' : 'login';
    const payload  = type === 'register' ? { username, email, password } : { email, password };

    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await response.json();

        if (response.ok) {
            localStorage.setItem('currentUser', JSON.stringify({
                username: result.user || username || i18n[currentLang].guestUser,
                email
            }));
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = "store.html";
        } else {
            if (statusMsg) { statusMsg.style.color = "#DC2626"; statusMsg.innerText = result.error || "حدث خطأ"; }
            resetSubmitButton(submitBtn, type);
        }
    } catch {
        if (statusMsg) { statusMsg.style.color = "#B45309"; statusMsg.innerText = "تعذر الاتصال بالخادم (Localhost)"; }
        resetSubmitButton(submitBtn, type);
    }
}

function resetSubmitButton(btn, type) {
    if (btn) { btn.disabled = false; btn.innerText = type === 'register' ? "إنشــــاء الحساب" : "دخــــــــول"; }
}

// ─── Theme ────────────────────────────────────────────────
function initTheme() {
    const isDark = localStorage.getItem('theme') === 'dark';
    if (isDark) document.body.classList.add('dark-mode');
    updateToggleButton(isDark);
}

function updateToggleButton(isDark) {
    const btn = document.getElementById('darkModeToggle');
    if (!btn) return;
    const dict = i18n[currentLang];
    btn.innerText = isDark ? dict.lightMode : dict.darkMode;
}

function toggleDropdown() {
    document.getElementById("userMenu")?.classList.toggle("show");
}

// ─── UI State ─────────────────────────────────────────────
function updateUI() {
    const user        = JSON.parse(localStorage.getItem('currentUser'));
    const dict        = (typeof i18n !== 'undefined' && i18n[currentLang]) ? i18n[currentLang] : { guestUser: "مستكشف البريق التقني", heroBtnLogged: "الذهاب للمتجر الرقمي", heroBtn: "استكشف متجر الخدمات والمنتجات" };
    const loginLink   = document.getElementById('loginLink');
    const signupLink  = document.getElementById('signupLink');
    const logoutLink  = document.getElementById('logoutLink');
    const nameDisplay = document.getElementById('displayUsername');
    const fullName    = document.getElementById('displayUserFullName');
    const emailDisp   = document.getElementById('displayEmail');
    const heroBtn     = document.getElementById('heroBtn');

    if (user && user.username) {
        if (nameDisplay) nameDisplay.innerText = user.username;
        if (fullName)    fullName.innerText    = user.username;
        if (emailDisp)   emailDisp.innerText   = user.email || 'عضو معتمد';
        if (loginLink)   loginLink.style.display  = 'none';
        if (signupLink)  signupLink.style.display  = 'none';
        if (logoutLink)  logoutLink.style.display  = 'block';
        if (heroBtn) { heroBtn.innerText = dict.heroBtnLogged; heroBtn.onclick = () => { window.location.href = "store.html"; }; }
        return;
    }

    // Critical Async Hold: If an OAuth hash exists, prevent rollback to guest
    const incomingHash = window.location.hash || '';
    if (incomingHash.includes('access_token') || window.__AUTH_PREFLIGHT_LOCKED) {
        console.log("⏳ Auth tokens present. Holding Guest rollback...");
        if (nameDisplay) nameDisplay.innerText = "جاري التحقق...";
        if (fullName)    fullName.innerText    = "جاري التحقق من الجلسة...";
        return;
    }

    if (nameDisplay) nameDisplay.innerText = dict.guestUser;
    if (fullName)    fullName.innerText    = 'ضيف';
    if (emailDisp)   emailDisp.innerText   = 'غير مسجل';
    if (loginLink)   loginLink.style.display  = 'block';
    if (signupLink)  signupLink.style.display  = 'block';
    if (logoutLink)  logoutLink.style.display  = 'none';
    if (heroBtn) { heroBtn.innerText = dict.heroBtn; heroBtn.onclick = () => { window.location.href = "createac.html"; }; }
}

async function logout() {
    if (supabaseClient) {
        try {
            await supabaseClient.auth.signOut();
        } catch (e) {
            console.warn("Supabase signout warning:", e);
        }
    }
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    window.location.href = "signin.html";
}

// ─── Scroll Reveal: Intersection Observer Engine ──────────────────────────
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    if (!revealElements.length) return;

    // If IntersectionObserver is not supported, just show everything
    if (!('IntersectionObserver' in window)) {
        revealElements.forEach(el => el.classList.add('active'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once revealed, stop watching this element
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => {
        // If element is already in view on load (e.g. very tall screens), reveal immediately
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('active');
        } else {
            observer.observe(el);
        }
    });
}

// ─── Bootstrap ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    applyLanguage();
    updateUI();
    initializeGoogleAuth();
    initScrollReveal();

    document.getElementById('darkModeToggle')?.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateToggleButton(isDark);

        // Re-render Google button on theme change
        const googleBtnDiv = document.getElementById('googleBtn');
        if (googleBtnDiv) { googleBtnDiv.innerHTML = ""; initializeGoogleAuth(); }
    });
});