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
function openContactModal(side) {
    const modal = document.getElementById('contact-modal');
    const details = document.getElementById('contact-details');
    if (side === 'groom') {
        details.innerHTML = `
            <h3>신랑측</h3>
            <p>조현진: <a href="tel:010-1234-5678">📞</a> <a href="sms:010-1234-5678">💬</a></p>
            <p>조성관: <a href="tel:010-1111-2222">📞</a> <a href="sms:010-1111-2222">💬</a></p>
        `;
    } else {
        details.innerHTML = `
            <h3>신부측</h3>
            <p>김혜린: <a href="tel:010-9876-5432">📞</a> <a href="sms:010-9876-5432">💬</a></p>
            <p>김영식: <a href="tel:010-3333-4444">📞</a> <a href="sms:010-3333-4444">💬</a></p>
        `;
    }
    modal.style.display = 'block';
}

function openRsvpModal() {
    document.getElementById('rsvp-modal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// RSVP 폼
document.getElementById('rsvp-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        attendance: formData.get('attendance'),
        guest_count: parseInt(formData.get('guest_count')),
        meal: formData.get('meal'),
        message: formData.get('message')
    };
    // 로컬 스토리지에 저장 (백엔드 대신)
    let rsvps = JSON.parse(localStorage.getItem('rsvps') || '[]');
    rsvps.push(data);
    localStorage.setItem('rsvps', JSON.stringify(rsvps));
    alert('참석 의사가 전달되었습니다!');
    closeModal('rsvp-modal');
});

// 사이드 선택
function selectSide(side) {
    document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('selected'));
    event.target.classList.add('selected');
}

// 방명록 로드
function loadGuestbook() {
    const messages = JSON.parse(localStorage.getItem('guestbook') || '[]');
    const container = document.getElementById('guestbook-posts');
    container.innerHTML = '';
    messages.forEach(msg => {
        const post = document.createElement('div');
        post.className = 'post-it';
        post.style.background = ['#d8e592', '#c4d47f', '#b0c26a', '#9cb055', '#88a240'][msg.color_index];
        post.innerHTML = `<strong>${msg.author}</strong><br>${msg.content}`;
        container.appendChild(post);
    });
}

loadGuestbook();

// 방명록 제출
document.getElementById('guestbook-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = this.querySelector('input').value;
    const message = this.querySelector('textarea').value;
    const color = Math.floor(Math.random() * 5);
    const newMessage = { author: name, content: message, color_index: color };
    let messages = JSON.parse(localStorage.getItem('guestbook') || '[]');
    messages.push(newMessage);
    localStorage.setItem('guestbook', JSON.stringify(messages));
    loadGuestbook();
    this.reset();
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

// RSVP 모달 자동 팝업 (하루 한번)
if (!localStorage.getItem('rsvpShown')) {
    setTimeout(() => {
        openRsvpModal();
        localStorage.setItem('rsvpShown', 'true');
    }, 2000);
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