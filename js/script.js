// 계좌번호 복사 기능
function copyAccount() {
    const account = "신한은행 123-456-789012 김혜린"; // 수정: 실제 계좌 정보
    navigator.clipboard.writeText(account).then(() => {
        alert("계좌번호가 복사되었습니다!");
    }).catch(err => {
        console.error('복사 실패:', err);
        // 폴백: 텍스트 선택
        const textArea = document.createElement("textarea");
        textArea.value = account;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert("계좌번호가 복사되었습니다!");
    });
}

// 갤러리 슬라이더 (간단 버전)
let currentSlide = 0;
const slides = document.querySelectorAll('.gallery img');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// 초기 슬라이드 표시
if (slides.length > 0) {
    showSlide(currentSlide);
    // 자동 슬라이드 (옵션)
    setInterval(nextSlide, 3000);
}

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});