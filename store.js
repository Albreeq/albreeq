// =========================================================
// شركة البريق التقني المميز — store.js v3.1
// Product Grid | Detail View | Cart | Particles | i18n
// =========================================================

// ─── i18n bridge (reads from app.js dictionary) ──────────
function t(key) {
    return (typeof i18n !== 'undefined' && i18n[currentLang])
        ? (i18n[currentLang][key] || key)
        : key;
}

// ─── Products Data ────────────────────────────────────────
const productsData = [
    {
        id: 1,
        title: "كاميرا مراقبة ذكية 4K UHD",
        titleEn: "Smart 4K UHD Security Camera",
        price: 49.99,
        desc: "كاميرا مراقبة خارجية فائقة الوضوح بدقة 4K مع نظام رؤية ليلية ملونة، تتبع حركي متقدم بالذكاء الاصطناعي، وتخزين سحابي مشفر مع الربط المباشر بالهاتف المحمول.",
        descEn: "Outdoor 4K UHD security camera with AI-powered motion tracking, color night vision, encrypted cloud storage, and direct mobile connectivity.",
        specs: ["دقة التصوير: 4K Ultra HD (3840 x 2160)", "مقاومة العوامل الجوية: IP67 Weatherproof", "نظام التخزين: سحابي + بطاقة SD حتى 256GB", "التوصيل: Wi-Fi / Ethernet PoE"],
        specsEn: ["Resolution: 4K Ultra HD (3840×2160)", "Weatherproof: IP67 rated", "Storage: Cloud + SD up to 256GB", "Connectivity: Wi-Fi / Ethernet PoE"],
        iconSrc: "icns/lock.png", category: "cameras", tag: "موصى به", tagEn: "Recommended", isOutOfStock: false
    },

    {
        id: 2,
        title: "وحدة سكنية فاخرة - برج البريق",
        titleEn: "Luxury Residential Unit – AlBareeq Tower",
        price: 2850.00,
        desc: "شقة سكنية ذكية بتصميم عصري مجهزة بالكامل بنظام تيار خفيف، شبكات داخلية عالية السرعة، وتحكم لاسلكي كامل في الإضاءة والتكييف ودخول البصمة.",
        descEn: "Smart residential apartment with full light-current infrastructure, high-speed internal networks, and wireless control over lighting, AC, and biometric access.",
        specs: ["المساحة: 185 متر مربع", "التجهيزات: بنية تحتية تيار خفيف + أتمتة كاملة", "عدد الغرف: 3 غرف نوم + صالة واسعة", "الضمان: ضمان إنشائي وتقني شامل 10 سنوات"],
        specsEn: ["Area: 185 m²", "Fit-out: Full light-current + full automation", "Rooms: 3 bedrooms + spacious living", "Warranty: 10-year structural & technical warranty"],
        iconSrc: "icns/home.png", category: "realestate", tag: "عقار متميز", tagEn: "Premium Property", isOutOfStock: false
    },
    {
        id: 3,
        title: "قفل ذكي بيومتري ثلاثي الأمان",
        titleEn: "Triple-Mode Biometric Smart Lock",
        price: 89.99,
        desc: "قفل أمان ذكي للأبواب والمكاتب يدعم الفتح عبر بصمة الإصبع السرية، التعرف على الوجه، الكارت الذكي، وتطبيق الهاتف المحمول مع كود طوارئ مؤقت.",
        descEn: "Smart security lock supporting fingerprint, face recognition, smart card, mobile app, and emergency PIN code access.",
        specs: ["طرق الفتح: بصمة / وجه / كارت / تطبيق / مفتاح", "سعة البصمات: 100 بصمة معتمدة", "البطارية: تعمل حتى 12 شهراً مستمراً", "التوافق: جميع الأبواب الخشبية والألمنيوم"],
        specsEn: ["Access: Fingerprint / Face / Card / App / Key", "Capacity: 100 fingerprint records", "Battery: Up to 12 months continuous", "Compatibility: Wood & aluminium doors"],
        iconSrc: "icns/lock.png", category: "security", tag: "جديد", tagEn: "New", isOutOfStock: false
    },
    {
        id: 4,
        title: "جهاز ربط وتتبع التيار الخفيف (NVR Hub)",
        titleEn: "Light-Current NVR Hub",
        price: 35.00,
        desc: "وحدة تسجيل وربط مركزية لكاميرات المراقبة وأنظمة إنذار الحريق والسرقة، تدعم ربط حتى 16 كاميرا UHD بنظام توزيع النطاق الترددي المستمر.",
        descEn: "Central NVR recording unit for cameras and alarm systems, supporting 16 UHD channels with continuous bandwidth distribution.",
        specs: ["عدد القنوات: 16 Channel NVR", "سعة التخزين: تدعم القرص الصلب حتى 10TB", "مخرج العرض: HDMI 4K / VGA", "الأمان: تشفير البيانات المتداول"],
        specsEn: ["Channels: 16 Channel NVR", "Storage: HDD up to 10TB", "Output: HDMI 4K / VGA", "Security: Data encryption"],
        iconSrc: "icns/thunder.png", category: "hardware", tag: "نفذت الكمية", tagEn: "Sold Out", isOutOfStock: true
    },
    {
        id: 5,
        title: "باقة الأمان الذكي المتكاملة للمنازل",
        titleEn: "Integrated Home Smart Security Bundle",
        price: 119.00,
        desc: "منظومة أمان متكاملة تشمل كاميرتين 4K، قفل بيومتري ذكي، حساسات فتح الأبواب والنوافذ، ولوحة إنذار مركزية متصلة بغرفة المراقبة.",
        descEn: "Complete security bundle: 2× 4K cameras, smart biometric lock, door/window sensors, and a central alarm panel.",
        specs: ["المكونات: 2 كاميرا + قفل + 4 حساسات + لوحة تحكم", "الربط: لاسلكي ميمو طويل المدى", "الإنذار: صوتي ذاتي + تنبيه فوري للهاتف", "التركيب: شامل البرمجة والتشغيل"],
        specsEn: ["Components: 2 cameras + lock + 4 sensors + panel", "Connectivity: Long-range MIMO wireless", "Alarm: Audio siren + instant mobile alert", "Installation: Full programming & commissioning"],
        iconSrc: "icns/lock.png", category: "security", tag: "خصم 20%", tagEn: "20% Off", isOutOfStock: false
    },
    {
        id: 6,
        title: "جلسة استشارة وتثمين عقاري تقني",
        titleEn: "Real Estate & Technical Appraisal Session",
        price: 35.99,
        desc: "جلسة استشارية متخصصة يقدمها خبراء البريق التقني لتثمين المنشآت وتحديد احتياجات التيار الخفيف والتطوير العقاري الأنسب لرفع قيمة الأصول.",
        descEn: "Specialist advisory session by AlBareeq experts for facility appraisal, light-current planning, and real estate development recommendations.",
        specs: ["المدة: 60 دقيقة جلسة فنية مكثفة", "المخرجات: تقرير تثمين وتوصيات أنظمة شامل", "الخبرة: فريق استشاري أكثر من 15 عاماً", "التقديم: حضوري أو عبر الاجتماع المرئي"],
        specsEn: ["Duration: 60-min intensive technical session", "Deliverables: Full appraisal report + system recommendations", "Experience: 15+ year advisory team", "Format: In-person or video call"],
        iconSrc: "icns/home.png", category: "realestate", tag: "خدمة استشارية", tagEn: "Advisory Service", isOutOfStock: false
    },
    {
        id: 7,
        title: "إســتشارة تـــقنية شاملة",
        titleEn: "Comprehensive Technical Consultation",
        price: 59.99,
        desc: "خدمة إستشارية تقنية ممـــيزة من خبــــراء تقنييــــن",
        descEn: "Distinguished technical consulting service from technical experts.",
        specs: ["المدة: 60 دقيقة جلسة فنية مكثفة", "المخرجات: تقرير تثمين وتوصيات أنظمة شامل", "الخبرة: فريق استشاري أكثر من 15 عاماً", "التقديم: حضوري أو عبر الاجتماع المرئي"],
        specsEn: ["Duration: 60-min intensive technical session", "Deliverables: Full appraisal report + system recommendations", "Experience: 15+ year advisory team", "Format: In-person or video call"],
        iconSrc: "icns/thunder.png",
        category: "hardware",
        tag: "موصى به",
        tagEn: "recommended",
        isOutOfStock: false
    },
];

let cart = [];
let currentCategory = "all";

// ─── Inject particle keyframe once ───────────────────────
(function injectParticleCSS() {
    if (document.getElementById('particle-style')) return;
    const s = document.createElement('style');
    s.id = 'particle-style';
    s.textContent = `
        @keyframes particle-burst {
            0%   { transform: translate(0,0) scale(1); opacity: 1; }
            100% { transform: translate(var(--px), var(--py)) scale(0); opacity: 0; }
        }
        .particle {
            position: fixed;
            width: 8px; height: 8px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: particle-burst 0.65s cubic-bezier(.25,.46,.45,.94) forwards;
        }
    `;
    document.head.appendChild(s);
})();

// ─── Particle Blast ───────────────────────────────────────
function spawnParticles(btn) {
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const colors = ['#D4AF37', '#C5A028', '#3B82F6', '#60A5FA', '#D4AF37', '#1D4ED8'];
    const count = 12;

    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const angle = (i / count) * 360;
        const dist = 55 + Math.random() * 45;
        const rad = (angle * Math.PI) / 180;
        const px = Math.cos(rad) * dist;
        const py = Math.sin(rad) * dist - 20; // slight upward bias
        p.style.cssText = `
            left:${cx - 4}px; top:${cy - 4}px;
            background:${colors[i % colors.length]};
            --px:${px}px; --py:${py}px;
            animation-delay:${i * 18}ms;
        `;
        document.body.appendChild(p);
        p.addEventListener('animationend', () => p.remove(), { once: true });
    }
}

// ─── 1. Grid Rendering ────────────────────────────────────
function renderProducts(filterCat = "all") {
    currentCategory = filterCat;
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
    let html = "", count = 0;

    productsData.forEach(prod => {
        if (filterCat !== "all" && prod.category !== filterCat) return;
        count++;

        const isOut = prod.isOutOfStock;
        const cardClass = isOut ? "product-card out-of-stock fade-in" : "product-card fade-in";
        const btnText = isOut ? t('outOfStock') : t('addToCart');
        const title = isEn && prod.titleEn ? prod.titleEn : prod.title;
        const desc = isEn && prod.descEn ? prod.descEn : prod.desc;
        const tag = isEn && prod.tagEn ? prod.tagEn : prod.tag;

        html += `
        <div class="${cardClass}" onclick="showProductDetail(${prod.id})">
            <div class="image-container">
                ${tag ? `<span class="tag">${tag}</span>` : ''}
                <img src="${prod.iconSrc}" alt="${title}" class="ui-icon ui-icon-lg icon-black">
            </div>
            <div class="product-info">
                <h4 class="prod-title">${title}</h4>
                <p class="prod-desc">${desc}</p>
                <div class="price-row">
                    <span class="price">${prod.price.toFixed(2)} $</span>
                    <button class="add-to-cart-btn" ${isOut ? 'disabled' : ''}
                        onclick="event.stopPropagation(); addToCartById(${prod.id}, event);">${btnText}</button>
                </div>
            </div>
        </div>`;
    });

    grid.innerHTML = html;
    const countSpan = document.querySelector('.results-count');
    if (countSpan) countSpan.innerText = isEn
        ? `${count} item${count !== 1 ? 's' : ''} found`
        : `تم العثور على ${count} عناصر`;
}

function filterCategory(cat, element) {
    if (element) {
        document.querySelectorAll('.category-list li').forEach(li => li.classList.remove('active'));
        element.classList.add('active');
    }
    backToStoreGrid();
    renderProducts(cat);
}

// ─── 2. Single Product Detail View ───────────────────────
function showProductDetail(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;

    const gridSection = document.getElementById('productsGridSection');
    const detailSection = document.getElementById('productDetailSection');
    if (!gridSection || !detailSection) return;

    const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
    const title = isEn && product.titleEn ? product.titleEn : product.title;
    const desc = isEn && product.descEn ? product.descEn : product.desc;
    const tag = isEn && product.tagEn ? product.tagEn : product.tag;
    const specs = isEn && product.specsEn ? product.specsEn : product.specs;
    const specsHtml = specs.map(s => `<li>• ${s}</li>`).join('');
    const isOut = product.isOutOfStock;

    detailSection.innerHTML = `
        <div class="product-detail-view fade-in">
            <button class="back-to-store-btn" onclick="backToStoreGrid()">${t('backToStore')}</button>
            <div class="detail-content-grid">
                <div class="detail-image-box">
                    <img src="${product.iconSrc}" alt="${title}" class="ui-icon icon-black" style="width:120px;height:120px;">
                </div>
                <div class="detail-info-box">
                    ${tag ? `<span class="detail-tag">${tag}</span>` : ''}
                    <h1 class="detail-title">${title}</h1>
                    <div class="detail-price">${product.price.toFixed(2)} $</div>
                    <p class="detail-description">${desc}</p>
                    <h4 style="font-size:1rem;font-weight:800;margin-top:4px;">${isEn ? 'Technical Specifications:' : 'المواصفات الفنية والتفاصيل:'}</h4>
                    <ul class="detail-specs-list">${specsHtml}</ul>
                    <div class="detail-actions-row">
                        <button class="detail-btn-primary" id="detailAddBtn" ${isOut ? 'disabled' : ''}
                            onclick="detailAddToCart(${product.id}, this)">
                            ${isOut ? t('outOfStock') : t('addToCart')}
                        </button>
                        <button class="detail-btn-secondary" onclick="orderProductDirect(${product.id})">
                            ${isEn ? 'Direct WhatsApp Order' : 'طلب مباشر عبر الواتساب'}
                        </button>
                    </div>
                </div>
            </div>
        </div>`;

    gridSection.style.display = "none";
    detailSection.style.display = "block";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Detail-view add-to-cart: particles + auto-return
function detailAddToCart(productId, btn) {
    const product = productsData.find(p => p.id === productId);
    if (!product || product.isOutOfStock) return;

    // A) Particle blast
    spawnParticles(btn);

    // B) Add to cart data
    addToCart(product.title, product.price);

    // C) Auto-return to grid after particle completes (650ms)
    btn.disabled = true;
    btn.style.background = '#16A34A';
    btn.textContent = typeof currentLang !== 'undefined' && currentLang === 'en' ? '✓ Added!' : '✓ تمت الإضافة!';

    setTimeout(backToStoreGrid, 750);
}

function backToStoreGrid() {
    const gridSection = document.getElementById('productsGridSection');
    const detailSection = document.getElementById('productDetailSection');
    if (gridSection && detailSection) {
        detailSection.style.display = "none";
        gridSection.style.display = "block";
    }
}

// ─── 3. Cart Operations ───────────────────────────────────
function addToCartById(productId, event) {
    const product = productsData.find(p => p.id === productId);
    if (!product || product.isOutOfStock) return;

    // Particle blast from grid card button
    if (event?.currentTarget || event?.target) {
        spawnParticles(event.target);
    }
    addToCart(product.title, product.price);
}

function addToCart(name, price) {
    const existing = cart.find(i => i.name === name);
    if (existing) { existing.quantity += 1; }
    else { cart.push({ name, price: parseFloat(price), quantity: 1 }); }
    updateCartUI();
}

function updateCartUI() {
    const cartBadge = document.getElementById('cartBadge');
    const container = document.getElementById('cartItemsContainer');
    const totalSpan = document.getElementById('cartTotalSum');
    const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
    if (cartBadge) cartBadge.innerText = totalItems;

    if (cart.length === 0) {
        if (container) container.innerHTML = `
            <div class="empty-cart-msg">
                <img src="icns/grocery-store.png" alt="Empty" class="ui-icon ui-icon-lg icon-black" style="opacity:0.3;margin-bottom:12px;">
                <p>${typeof currentLang !== 'undefined' && currentLang === 'en' ? 'Your cart is empty' : 'السلة فارغة حالياً'}</p>
            </div>`;
        if (totalSpan) totalSpan.innerText = "0.00$";
        return;
    }

    let html = "", totalCost = 0;
    cart.forEach((item, index) => {
        const lineTotal = item.price * item.quantity;
        totalCost += lineTotal;
        html += `
        <div class="cart-item-row">
            <div class="item-details">
                <h5>${item.name}</h5>
                <span>${item.price.toFixed(2)}$ × ${item.quantity}</span>
            </div>
            <button onclick="removeFromCart(${index})" class="remove-item-btn">
                ${typeof currentLang !== 'undefined' && currentLang === 'en' ? 'Remove' : 'حذف'}
            </button>
        </div>`;
    });

    if (container) container.innerHTML = html;
    if (totalSpan) totalSpan.innerText = totalCost.toFixed(2) + "$";
}

function removeFromCart(index) {
    if (cart[index].quantity > 1) { cart[index].quantity -= 1; }
    else { cart.splice(index, 1); }
    updateCartUI();
}

function toggleCartSidebar() {
    document.getElementById('cartSidebar')?.classList.toggle('open');
}

// ─── 4. WhatsApp Checkout ─────────────────────────────────
function goToCheckout() {
    const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
    if (cart.length === 0) {
        alert(isEn ? 'Your cart is empty. Add products first!' : 'السلة فارغة، أضف منتجات أولاً!');
        return;
    }

    let msg = isEn
        ? "AlBareeq AlTeqani AlMomayaz — New Order\n\nOrder Details:\n────────────────\n"
        : "شركة البريق التقني المميز - طلب جديد من الموقع\n\nتفاصيل الطلب:\n────────────────\n";

    cart.forEach(item => {
        const lineTotal = (item.price * item.quantity).toFixed(2);
        msg += `- ${item.name}\n  ${isEn ? 'Qty' : 'الكمية'}: ${item.quantity} | ${isEn ? 'Price' : 'السعر'}: ${item.price.toFixed(2)}$ | ${isEn ? 'Total' : 'الإجمالي'}: ${lineTotal}$\n`;
    });

    const total = document.getElementById('cartTotalSum').innerText;
    msg += `────────────────\n${isEn ? 'Grand Total' : 'المجموع الكلي'}: ${total}\n\n${isEn ? 'Please confirm and follow up. Thank you.' : 'يرجى تأكيد الطلب والتواصل لمتابعة التفاصيل. وشكراً لكم.'}`;

    window.open(`https://wa.me/00201025717429?text=${encodeURIComponent(msg)}`, '_blank');
}

function orderProductDirect(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;
    const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
    const title = isEn && product.titleEn ? product.titleEn : product.title;
    const msg = isEn
        ? `AlBareeq AlTeqani AlMomayaz — Direct Order\n\nRequested: ${title}\nPrice: ${product.price.toFixed(2)}$\n────────────────\nPlease provide shipping/execution details and available dates.`
        : `شركة البريق التقني المميز - طلب مباشر\n\nالخدمة المطلوبة: ${title}\nالسعر: ${product.price.toFixed(2)}$\n────────────────\nيرجى تزويدي بتفاصيل الشحن/التنفيذ والمواعيد المتاحة.`;
    window.open(`https://wa.me/00201025717429?text=${encodeURIComponent(msg)}`, '_blank');
}

// ─── Init ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat');
    const validCats = ['realestate', 'cameras', 'security', 'hardware'];
    renderProducts(validCats.includes(catParam) ? catParam : 'all');
});