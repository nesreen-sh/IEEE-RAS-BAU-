/* ==========================================================================
   1. تأثيرات الحركة عند فتح الصفحة (Hero Section Animation)
   ========================================================================== */
window.addEventListener('DOMContentLoaded', () => {
    // جلب عناصر الواجهة الرئيسية
    const heroTitle = document.querySelector('.hero h1');
    const heroText = document.querySelector('.hero p');
    const heroBtn = document.querySelector('.btn-link');

    // نتحقق أولاً إذا كانت العناصر موجودة بالصفحة الحالية
    if (heroTitle && heroText && heroBtn) {
        // إخفاء العناصر مبدئياً وتجهيزها للحركة الإنسيابية
        [heroTitle, heroText, heroBtn].forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 1s cubic-bezier(0.25, 1, 0.5, 1)';
        });

        // إظهار العنوان أولاً بعد 300 مللي ثانية
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);

        // إظهار النص الفرعي بعد 600 مللي ثانية
        setTimeout(() => {
            heroText.style.opacity = '1';
            heroText.style.transform = 'translateY(0)';
        }, 600);

        // إظهار زر التفاعل بعد 900 مللي ثانية
        setTimeout(() => {
            heroBtn.style.opacity = '1';
            heroBtn.style.transform = 'translateY(0)';
        }, 900);
    }
});


/* ==========================================================================
   2. تأثير ظهور العناصر عند التمرير لأسفل (Scroll Reveal Animation)
   ========================================================================== */
function revealElements() {
    // جلب جميع العناصر التي تحمل كلاس reveal في أي صفحة
    const reveals = document.querySelectorAll('.reveal');

    reveals.forEach(element => {
        const windowHeight = window.innerHeight; // ارتفاع شاشة المتصفح
        const elementTop = element.getBoundingClientRect().top; // مسافة العنصر من أعلى الشاشة
        const elementVisible = 100; // المسافة بالبكسل التي يبدأ عندها التأثير بالظهور

        // إذا اقترب العنصر ودخل في نطاق الرؤية، قم بتفعيل الحركة
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// تشغيل الدالة فوراً عند التمرير (Scroll) أو تحميل الصفحة
window.addEventListener('scroll', revealElements);
window.addEventListener('load', revealElements);


/* ==========================================================================
   3. السلايدر ثلاثي الأبعاد والـ Blur لـ IEEE RAS BAU (المطور والمصحح)
   ========================================================================== */
const track = document.getElementById('sliderTrack');

// نتحقق أولاً من وجود السلايدر بالصفحة لتفادي أي أخطاء في الصفحات الأخرى
if (track) {
    const slides = Array.from(track.children);
    const nextButton = document.getElementById('nextBtn');
    const prevButton = document.getElementById('prevBtn');

    let currentIndex = 0;

    function updateSlider() {
        const gap = 30; // نفس قيمة الـ gap المحددة بالـ CSS
        
        // الحسبة الذهبية الدقيقة لـ RTL لكي يتحرك كرت واحد فقط بالملي
        const amountToMove = `calc((${currentIndex} * 100%) + (${currentIndex * gap}px))`;
        track.style.transform = `translateX(${amountToMove})`;

        // تحديث كلاس active لإزالة التغبيش عن الكرت النشط بالمنتصف وتغبيش البقية
        slides.forEach((slide, index) => {
            if (index === currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }

    // تشغيل الحسبة لأول مرة لتفعيل الكرت الأول عند تحميل الصفحة
    updateSlider();

    nextButton.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // العودة للكرت الأول بسلاسة عند النهاية
        }
        updateSlider();
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = slides.length - 1; // الانتقال لآخر كرت
        }
        updateSlider();
    });
}


// فتح الكرت المنبثق وعمل غباش للخلفية
function openPopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.classList.add('show');
        document.body.style.overflow = 'hidden'; // منع سكرول الصفحة أثناء فتح الكرت
    }
}

// إغلاق الكرت المنبثق عند الضغط على الـ X أو خارج الكرت
function closePopup(event, popupId) {
    // نغلق فقط إذا تم الضغط على الأوفرلاي بالخارج أو زر الإغلاق
    if (event.target.classList.contains('popup-overlay') || event.target.classList.contains('close-btn')) {
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.classList.remove('show');
            document.body.style.overflow = 'auto'; // إعادة تفعيل السكرول
        }
    }
}




// فتح كرت الاهتمام مع منع التمرير في الخلفية
function openInterestPopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

// إغلاق كرت الاهتمام عند النقر على (X) أو النقر بالخارج
function closeInterestPopup(event, popupId) {
    if (event.target.classList.contains('interest-popup-overlay') || event.target.classList.contains('interest-close-btn')) {
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    }
}





// فتح نافذة المودال المخصصة للقسم المطلوب بالتحديد
function openModal(modalId) {
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
        targetModal.classList.add('active');
    }
}

// إغلاق نافذة المودال المخصصة
function closeModal(modalId) {
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
        targetModal.classList.remove('active');
    }
}

// إغلاق المودال تلقائياً عند الضغط في أي مساحة فارغة من الخلفية التغبيشية
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.classList.remove('active');
    }
});


// فتح نافذة مودال مجال الاهتمام المحدد
function openInterestModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // إيقاف تمرير الصفحة الرئيسية عند فتح المودال
    }
}

// إغلاق المودال
function closeInterestModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // إعادة تفعيل تمرير الصفحة عند الإغلاق
    }
}

// إغلاق المودال تلقائياً في حال الضغط في أي منطقة خارجية فارغة
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('interest-modal-overlay')) {
        event.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});