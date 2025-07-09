/**
 * 动态生成瀑布流内容
 * @param {Array} items - 每项为 {title: string, content: string}
 */
function loadWaterfall(items) {
    const section = document.getElementById('waterfall');
    if (!section) return;
    section.innerHTML = '';
    items.forEach((item, idx) => {
        const div = document.createElement('div');
        div.className = 'waterfall-item';
        div.style.animationDelay = (idx * 0.08) + 's';
        div.innerHTML = `<h4>${item.title}</h4><p>${item.content}</p>`;
        section.appendChild(div);
    });
}

let allItems = [];
let loadedCount = 0;
const PAGE_SIZE = 10; // 首次加载数量，可调整

function renderWaterfall(items) {
    const section = document.getElementById('waterfall');
    if (!section) return;
    items.forEach((item, idx) => {
        const div = document.createElement('div');
        div.className = 'waterfall-item';
        div.style.animationDelay = ((loadedCount + idx) * 0.08) + 's';
        div.innerHTML = `<h4>${item.title}</h4><p>${item.content}</p>`;
        section.appendChild(div);
    });
    loadedCount += items.length;
}

function loadMoreWaterfall() {
    if (loadedCount >= allItems.length) return;
    const nextItems = allItems.slice(loadedCount, loadedCount + PAGE_SIZE);
    renderWaterfall(nextItems);
}

// 页面加载时从后端获取数据
document.addEventListener('DOMContentLoaded', function() {
    fetch('https://data.casarx.top:3000/waterfall')
        .then(res => res.json())
        .then(data => {
            allItems = data;
            loadedCount = 0;
            document.getElementById('waterfall').innerHTML = '';
            renderWaterfall(allItems.slice(0, PAGE_SIZE));
        })
        .catch(() => {
            allItems = [
                { title: '还没开发完啦', content: '什么都还没有哦' },
                { title: '还没开发完啦', content: '什么都还没有哦' },
                { title: '还没开发完啦', content: '什么都还没有哦' },
                { title: '还没开发完啦', content: '什么都还没有哦' },
                { title: '还没开发完啦', content: '什么都还没有哦' },
                { title: '还没开发完啦', content: '什么都还没有哦' },
                { title: '还没开发完啦', content: '什么都还没有哦' },
                { title: '还没开发完啦', content: '什么都还没有哦' },
                { title: '还没开发完啦', content: '什么都还没有哦' },
                { title: '还没开发完啦', content: '什么都还没有哦' },
                { title: '还没开发完啦', content: '什么都还没有哦' },
                { title: '还没开发完啦', content: '什么都还没有哦' },
                { title: '还没开发完啦', content: '什么都还没有哦' },
                { title: '还没开发完啦', content: '什么都还没有哦' },
                { title: '还没开发完啦', content: '什么都还没有哦' },
                { title: '还没开发完啦', content: '什么都还没有哦' },
                { title: '还没开发完啦', content: '什么都还没有哦' },
                { title: '还没开发完啦', content: '什么都还没有哦' },
                { title: '还没开发完啦', content: '什么都还没有哦' },
                { title: '还没开发完啦', content: '什么都还没有哦' }
            ];
            loadedCount = 0;
            document.getElementById('waterfall').innerHTML = '';
            renderWaterfall(allItems.slice(0, PAGE_SIZE));
        });
});

// 暴露加载更多方法
window.loadMoreWaterfall = loadMoreWaterfall;