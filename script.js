// ฟังก์ชันสร้างดาวตก
function createStars() {
    const star = document.createElement('div');
    star.innerHTML = '✨';
    star.style.position = 'fixed';
    star.style.left = Math.random() * window.innerWidth + 'px';
    star.style.top = '-20px';
    star.style.fontSize = '16px';
    star.style.color = 'rgba(255, 255, 255, 0.8)';
    star.style.pointerEvents = 'none';
    star.style.zIndex = '1';
    star.style.animation = 'starFall 4s linear forwards';

    document.body.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 4000);
}

// เพิ่ม CSS สำหรับดาวตก
const starStyle = document.createElement('style');
starStyle.textContent = `
    @keyframes starFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;// ฟังก์ชันเปิดจดหมาย
function openLetter() {
    const envelope = document.querySelector('.envelope');
    const envelopeContainer = document.getElementById('envelopeContainer');
    const letterContainer = document.getElementById('letterContainer');

    // เพิ่มคลาสแอนิเมชันการเปิด
    envelope.classList.add('opening');

    // สร้างเอฟเฟกต์หัวใจออกจากซอง
    createOpeningHearts();

    // ซ่อนซองและแสดงจดหมายหลังแอนิเมชันเสร็จ
    setTimeout(() => {
        envelopeContainer.style.display = 'none';
        letterContainer.style.display = 'block';

        // แอนิเมชันข้อความทีละบรรทัด
        const paragraphs = document.querySelectorAll('.main-message p');
        paragraphs.forEach((p, index) => {
            p.style.opacity = '0';
            p.style.transform = 'translateY(20px)';

            setTimeout(() => {
                p.style.transition = 'all 0.6s ease';
                p.style.opacity = '1';
                p.style.transform = 'translateY(0)';
            }, index * 300 + 500);
        });
    }, 1500);
}

// ฟังก์ชันสร้างหัวใจที่ออกจากซอง
function createOpeningHearts() {
    const hearts = ['💕', '💖', '💗', '💓', '💝'];

    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.transform = 'translate(-50%, -50%)';
            heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
            heart.style.color = `hsl(${Math.random() * 60 + 300}, 70%, 60%)`;
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1000';

            // สุ่มทิศทางการบิน
            const angle = (Math.random() * 360) * Math.PI / 180;
            const distance = Math.random() * 200 + 100;
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;

            heart.style.animation = `heartExplode 2s ease-out forwards`;
            heart.style.setProperty('--endX', endX + 'px');
            heart.style.setProperty('--endY', endY + 'px');

            document.body.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 2000);
        }, i * 100);
    }
}

// เพิ่ม CSS animation สำหรับหัวใจที่ระเบิดออกจากซอง
const openingStyle = document.createElement('style');
openingStyle.textContent = `
    @keyframes heartExplode {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        50% {
            transform: translate(calc(-50% + var(--endX)), calc(-50% + var(--endY))) scale(1.2);
            opacity: 1;
        }
        100% {
            transform: translate(calc(-50% + var(--endX)), calc(-50% + var(--endY))) scale(0.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(openingStyle);

// ฟังก์ชันสำหรับแสดงการตอบกลับ
function showResponse(type) {
    const responseDiv = document.getElementById('responseMessage');
    const buttons = document.querySelector('.action-buttons');

    // ซ่อนปุ่มหลังจากกด
    buttons.style.display = 'none';

    // แสดงข้อความตอบกลับ
    responseDiv.style.display = 'block';

    if (type === 'accept') {
        responseDiv.innerHTML = `
            <div class="response-accept">
                <h3>💕 Yes!!!! 💕</h3>
                <p>ขอบคุณนะที่พี่ให้โอกาส ผมสัญญานะว่าจะทำให้ดีที่สุด 💖</p>
                <div style="margin-top: 15px;">
                    <button class="btn accept" onclick="showHearts()" style="margin-right: 10px;">
                        🎉 อุโวโอ้ว
                    </button>
                </div>
            </div>
<audio autoplay loop>
  <source src="assets/music/song.mp3" type="audio/mp3">
</audio>


        `;
        responseDiv.className = 'response-message response-accept';
        createFloatingHearts();
    } else {
        responseDiv.innerHTML = `
            <div class="response-decline">
                <h3>💙 No!!! 💙</h3>
                <p> ไม่รู้สึกเหมือนกันก็ไม่เป็นไรนะ แต่ยังไงผมก็ยังเป็นพี่น้องให้พี่ได้เหมือนเดิมนะ 😊</p>
                <div style="margin-top: 15px;">
                    <button class="btn decline" onclick="resetPage()">
                        อย่าไปคิดมาก
                    </button>
                </div>
            </div>
        `;
        responseDiv.className = 'response-message response-decline';
    }

    // เลื่อนลงไปดูข้อความตอบกลับ
    responseDiv.scrollIntoView({ behavior: 'smooth' });
}

// ฟังก์ชันสำหรับสร้างหัวใจลอย
function createFloatingHearts() {
    const hearts = ['💖', '💕', '💗', '💓', '💝', '💘', '💞', '💟'];

    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = window.innerHeight + 'px';
            heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
            heart.style.color = `hsl(${Math.random() * 60 + 300}, 70%, 60%)`;
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1000';
            heart.style.animation = `floatUp 3s ease-out forwards`;

            document.body.appendChild(heart);

            // ลบหัวใจหลังจากแอนิเมชันเสร็จ
            setTimeout(() => {
                heart.remove();
            }, 3000);
        }, i * 200);
    }
}

// เพิ่ม CSS animation สำหรับหัวใจลอย
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-150vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ฟังก์ชันแสดงหัวใจเพิ่มเติม
function showHearts() {
    createFloatingHearts();

    // เปลี่ยนพื้นหลังชั่วคราว
    document.body.style.background = 'linear-gradient(45deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)';

    setTimeout(() => {
        document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }, 3000);
}

// ฟังก์ชันรีเซ็ตหน้าเพจ
function resetPage() {
    const responseDiv = document.getElementById('responseMessage');
    const buttons = document.querySelector('.action-buttons');

    responseDiv.style.display = 'none';
    buttons.style.display = 'flex';

    // เลื่อนกลับขึ้นไปด้านบน
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// เอฟเฟกต์พิเศษเมื่อโหลดหน้าเว็บ
document.addEventListener('DOMContentLoaded', function () {
    // เอฟเฟกต์ดาวตกเล็กๆ
    setInterval(createStars, 2000);

    // เพิ่มเอฟเฟกต์ hover สำหรับข้อความ (จะทำงานหลังจากเปิดจดหมาย)
    setTimeout(() => {
        document.querySelectorAll('.main-message p').forEach(p => {
            p.addEventListener('mouseenter', function () {
                this.style.textShadow = '2px 2px 4px rgba(102, 126, 234, 0.3)';
            });

            p.addEventListener('mouseleave', function () {
                this.style.textShadow = 'none';
            });
        });
    }, 2000);
});