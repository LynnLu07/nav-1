const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last');
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo: 'B', url: 'https://www.bilibili.com' },
    { logo: 'M', url: 'https://developer.mozilla.org/zh-CN/' },
    { logo: 'G', url: 'https://github.com/' },
    { logo: 'S', url: 'https://shimo.im/welcome' },
    { logo: 'L', url: 'http://lynnlu.xyz/' },
]

const removeX = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')
}


const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
                <div class="site">
                   <div class="logo">${node.logo}</div>
                   <div class="link">${removeX(node.url)}</div>
                   <div class="close">
                     <svg class="icon" width="80%" >
                       <use xlink:href="#icon-close"></use>
                     </svg>
                   </div>
               </div>        
        <li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation() //阻止冒泡
            hashMap.splice(index, deleteCount = 1)
            render()
        })
    })
}

render()

$('.addButton')
    .on('click', () => {
        let url = window.prompt('你又想加什么啦？')
        if (url.indexOf('http') !== 0) {
            url = 'http://' + url
        }
        console.log(url)
        hashMap.push({
            logo: removeX(url)[0].toUpperCase(),
            url: url
        });
        render()
    });

window.onbeforeunload = () => {
    console.log('页面要关闭了')
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}


// $(document).on('keypress', (e) => {
//     const { key } = e
//     for (let i = 0; i < hashMap.length; i++) {
//         if (hashMap[i].logo.toLowerCase() === key) {
//             window.open(hashMap[i].url)
//         }
//     }
// })



