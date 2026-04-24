// 카운트다운
function updateCountdown() {
    const weddingDate = new Date('2026-06-28T13:00:00');
    const now = new Date();
    const diff = weddingDate - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    document.getElementById('countdown').textContent = days;
}

updateCountdown();
setInterval(updateCountdown, 60000); // 1분마다 업데이트

function callOrMessage(number) {
    const normalizedNumber = String(number).replace(/[^0-9+]/g, '');
    const shouldCall = window.confirm(`${number}\n\n전화 앱으로 연결할까요?`);

    if (shouldCall) {
        window.location.href = `tel:${normalizedNumber}`;
    }
}

// 계좌 복사
function copyAccount(account) {
    navigator.clipboard.writeText(account).then(() => {
        alert("계좌번호가 복사되었습니다!");
    });
}

// 아코디언
document.querySelectorAll('.accordion-header').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
});

// 모달
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// 갤러리 뷰어
const galleryImages = Array.from(document.querySelectorAll('.gallery-grid img'));
let currentGalleryIndex = 0;

function openGalleryModal(index) {
    currentGalleryIndex = index;
    const viewer = document.getElementById('gallery-viewer-image');
    viewer.src = galleryImages[currentGalleryIndex].src;
    document.getElementById('gallery-modal').style.display = 'block';
}

function changeGalleryImage(offset) {
    if (!galleryImages.length) return;
    currentGalleryIndex = (currentGalleryIndex + offset + galleryImages.length) % galleryImages.length;
    document.getElementById('gallery-viewer-image').src = galleryImages[currentGalleryIndex].src;
}

galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => openGalleryModal(index));
});

// 카카오 공유
function shareKakao() {
    // Kakao SDK 필요
    alert('카카오톡 공유 기능 (SDK 필요)');
}

// 링크 복사
function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert('링크가 복사되었습니다!');
    });
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
