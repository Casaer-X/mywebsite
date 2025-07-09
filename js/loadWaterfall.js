/**
 * 动态生成瀑布流内容
 * @param {Array} items - 每项为 {title: string, content: string}
 */
function loadWaterfall(items) {
    const section = document.getElementById('waterfall');
    if (!section) return;
    section.innerHTML = ''; // 清空原有内容
    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'waterfall-item';
        div.innerHTML = `<h4>${item.title}</h4><p>${item.content}</p>`;
        section.appendChild(div);
    });
}

// 示例：页面加载时自动填充
document.addEventListener('DOMContentLoaded', function() {
    const demoItems = [
        { title: '还没开发完啦', content: '什么都还没有哦' },
        { title: '还没开发完啦', content: '支持多条动态，自动排列。支持多条动态，自动排列。支持多条动态，自动排列。支持多条动态，自动排列。支持多条动态，自动排列。支持多条动态，自动排列。支持多条动态，自动排列。' },
        { title: '还没开发完啦', content: '你可以继续添加更多内容。' },
        { title: '还没开发完啦', content: '你可以继续添加更多内容。' },
        { title: '还没开发完啦', content: '你可以继续添加更多内容。你可以继续添加更多内容。你可以继续添加更多内容。你可以继续添加更多内容。你可以继续添加更多内容。你可以继续添加更多内容。你可以继续添加更多内容。' }
    ];
    loadWaterfall(demoItems);
});