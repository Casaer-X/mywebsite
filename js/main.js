// 更新时间显示
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    document.getElementById('current-time').textContent = timeString;
}
setInterval(updateTime, 1000);
updateTime();

// 简单的 Cookie 工具函数
function setSQCookie(name, value, hours) {
    let d = new Date();
    d.setTime(d.getTime() + (hours * 60 * 60 * 1000));
    document.cookie = name + "=" + encodeURIComponent(JSON.stringify(value)) + ";expires=" + d.toUTCString() + ";path=/";
}
function getSQCookie(name) {
    let arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return JSON.parse(decodeURIComponent(arr[2]));
    return null;
}

// 弹出留言对话框
document.getElementById('chat-link').addEventListener('click', function(e) {
    e.preventDefault();
    const popup = document.getElementById('chat-popup');
    const content = document.getElementById('chat-popup-content');
    popup.style.display = 'flex';
    content.classList.remove('popup-out');
    // 触发重绘以保证动画能重新播放
    void content.offsetWidth;
    content.classList.add('popup-in');
});

// 关闭对话框
function closePopup() {
    const popup = document.getElementById('chat-popup');
    const content = document.getElementById('chat-popup-content');
    content.classList.remove('popup-in');
    content.classList.add('popup-out');
    // 动画结束后隐藏
    content.addEventListener('animationend', function handler(e) {
        if (e.animationName === 'popup-fade-out') {
            popup.style.display = 'none';
            content.classList.remove('popup-out');
            content.removeEventListener('animationend', handler);
        }
    });
}
document.getElementById('chat-popup-close').onclick = closePopup;
document.getElementById('chat-popup').addEventListener('click', function(e) {
    if (e.target === this) closePopup();
});

window.addEventListener('load', function() {
    const mask = document.getElementById('loading-mask');
    if(mask){
        mask.style.opacity = '0';
        setTimeout(() => mask.style.display = 'none', 400);
    }
});

(function() {
    const hour = new Date().getHours();
    const loadingMask = document.getElementById('loading-mask');
    if (loadingMask && (hour >= 18 || hour < 5)) {
        loadingMask.classList.add('dark');
    }
})();

let lastScrollTop = 0;
let footerHidden = false;

window.addEventListener('scroll', function() {
    const footer = document.querySelector('footer');
    const st = window.pageYOffset || document.documentElement.scrollTop;
    // 向下滑动时隐藏footer并加载更多
    if (st > lastScrollTop + 10 && !footerHidden) {
        footer.style.transform = 'translateY(100%)';
        footerHidden = true;
        // 加载剩余瀑布流
        if (typeof window.loadMoreWaterfall === 'function') {
            window.loadMoreWaterfall();
        }
    }
    // 向上滑动时显示footer
    if (st < lastScrollTop - 10 && footerHidden) {
        footer.style.transform = 'translateY(0)';
        footerHidden = false;
    }
    lastScrollTop = st <= 0 ? 0 : st;
});