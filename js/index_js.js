document.addEventListener('DOMContentLoaded', function () {

    // 스크롤 애니메이션
    const fadeElements = document.querySelectorAll('.fade-up, .container, .tab-menu');

    function checkScroll() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });

        // 이미지 그리드의 각 아이템에 순차적 애니메이션 적용
        const imageItems = document.querySelectorAll('.image-item');
        imageItems.forEach((item, index) => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (itemTop < windowHeight - 100) {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 200); // 0.2초 간격으로 순차적 애니메이션
            }
        });
    }

    // 초기 로드 시 체크
    checkScroll();

    // 스크롤 이벤트 리스너
    window.addEventListener('scroll', checkScroll);

    // 탭 메뉴 기능
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-images');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 모든 탭 비활성화
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // 선택한 탭 활성화
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
});


// 문의하기 토글 함수
function toggleContact() {
    const options = document.querySelectorAll('.contact-option');
    options.forEach(option => {
        option.style.display = option.style.display === 'block' ? 'none' : 'block';
    });
}

// 카카오톡 문의
function openKakao() {
    window.open('http://pf.kakao.com/_LIqxbn/chat', '_blank');
}

// 전화 문의
function makeCall() {
    window.location.href = 'tel:01040102363';
}

// 문의 폼 페이지
function openSubmit() {
    window.open('submit.html', '_blank');
}

// 모바일에서 터치 이벤트 최적화
document.querySelectorAll('.contact-option, .contact-toggle').forEach(btn => {
    btn.addEventListener('touchstart', function () {
        this.style.transform = 'scale(0.95)';
    });
    btn.addEventListener('touchend', function () {
        this.style.transform = '';
    });
});




// 메인 배너 숫자 카운트 애니메이션
// 모든 카운터 요소에 애니메이션 적용
function animateAllCounters() {
    const counterElements = document.querySelectorAll('.counter');
    
    counterElements.forEach(counter => {
        animateCounter(counter);
    });
}

// 개별 카운터 애니메이션 함수
function animateCounter(counterElement) {
    const target = parseInt(counterElement.getAttribute('data-target'));
    const duration = 5000; // 5초
    const start = 0;
    const increment = target / (duration / 16); // 60fps 기준

    let current = start;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            clearInterval(timer);
            current = target;
        }
        counterElement.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// 화면에 들어왔을 때 애니메이션 시작
function initCounters() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.counter').forEach(counter => {
        observer.observe(counter);
    });
}

// DOM 로드 완료 후 초기화
document.addEventListener('DOMContentLoaded', initCounters);

// 슬라이드가 활성화될 때 카운트 애니메이션 실행
document.addEventListener('DOMContentLoaded', function () {
    // 첫 번째 슬라이드가 활성화될 때 실행
    const firstSlide = document.querySelector('.slide.active');
    if (firstSlide) {
        animateCounter();
    }

    // 슬라이드 전환 시 관찰자 설정 (옵션)
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.attributeName === 'class') {
                const slide = mutation.target;
                if (slide.classList.contains('active')) {
                    const counter = slide.querySelector('.counter');
                    if (counter) {
                        animateCounter();
                    }
                }
            }
        });
    });

    // 모든 슬라이드 관찰
    document.querySelectorAll('.slide').forEach(slide => {
        observer.observe(slide, { attributes: true });
    });
});