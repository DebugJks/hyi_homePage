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



//  글 5개 불러오기
document.addEventListener('DOMContentLoaded', function () {
    const latestPostsTable = document.getElementById('latestPostsTable');
    if (!latestPostsTable) return;

    const scriptURL = 'https://script.google.com/macros/s/AKfycbzZpxFxSbgN4ylGicJUsUb-UyNXzTcdJnMSfb2Nf4p9ioY8JRyMeNSwOPPt5mwHypFXCw/exec';

    function fetchLatestPosts() {
        fetch(`${scriptURL}?boardType=inquiry`)
            .then(response => response.json())
            .then(data => {
                if (!Array.isArray(data)) throw new Error("데이터 형식 오류");

                const latestPosts = data.slice().reverse().slice(0, 5);
                latestPostsTable.innerHTML = '';

                latestPosts.forEach((post, index) => {
                    const row = document.createElement('tr');
                    row.className = 'post-title';

                    const titleCell = document.createElement('td');
                    titleCell.className = 'title';
                    titleCell.textContent = post["제목"] || '제목 없음';

                    const dateCell = document.createElement('td');
                    dateCell.className = 'date';
                    dateCell.textContent = post["작성일"] ? formatDate(post["작성일"]) : '날짜 없음';

                    row.appendChild(titleCell);
                    row.appendChild(dateCell);

                    const contentRow = document.createElement('tr');
                    contentRow.className = 'post-content';
                    contentRow.style.display = 'none';

                    const contentCell = document.createElement('td');
                    contentCell.colSpan = 2;
                    contentCell.innerHTML = `
                            <div style="margin-bottom: 10px; font-weight: 500;">내용</div>
                            <div style="white-space: pre-line;">${post["내용"] || '내용 없음'}</div>
                        `;

                    contentRow.appendChild(contentCell);

                    row.addEventListener('click', () => {
                        const isHidden = contentRow.style.display === 'none';
                        document.querySelectorAll('.post-content').forEach(item => item.style.display = 'none');
                        contentRow.style.display = isHidden ? 'table-row' : 'none';
                    });

                    latestPostsTable.appendChild(row);
                    latestPostsTable.appendChild(contentRow);
                });
            })
            .catch(error => {
                latestPostsTable.innerHTML = `
                        <tr>
                            <td colspan="2" style="text-align: center; padding: 20px;">
                                게시글을 불러오는 데 실패했습니다.<br>
                                ${error.message}
                            </td>
                        </tr>`;
            });
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return '날짜 오류';
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    }

    fetchLatestPosts();
});


// 탭 코드
// URL에서 'tab' 파라미터를 추출하는 함수
function getTabFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('tab'); // 'tab' 파라미터 값 반환
}

// 모든 라디오 버튼과 탭 콘텐츠를 가져옴
const tabs = document.querySelectorAll('input[name="tabs"]');
const contents = document.querySelectorAll('.tab-content');

// 페이지 로드 시 URL의 'tab' 파라미터에 따라 탭 활성화
window.onload = function() {
    const tab = getTabFromUrl(); // URL에서 탭 번호 가져오기
    if (tab) {
        const targetTab = document.getElementById('tab' + tab); // 해당 탭 버튼 찾기
        if (targetTab) {
            targetTab.checked = true; // 해당 탭 버튼을 체크
            // 탭 콘텐츠 활성화
            contents.forEach(content => content.classList.remove('active'));
            document.getElementById('content' + tab).classList.add('active');
        }
    }
};


// 라디오 버튼이 변경될 때마다 실행되는 함수
tabs.forEach(tab => {
    tab.addEventListener('change', function() {
        // 모든 콘텐츠를 숨기고
        contents.forEach(content => {
            content.classList.remove('active');
        });
        // 선택된 탭에 해당하는 콘텐츠만 표시
        const contentId = 'content' + this.id.slice(-1);
        document.getElementById(contentId).classList.add('active');
    });
});


// 스크롤되면서 이동
function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}