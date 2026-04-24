// 계좌번호 복사 기능
function copyAccount() {
    const account = "신한은행 123-456-789012 김혜린";
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

// 부드러운 스크롤 (옵션)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});