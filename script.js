const button = document.querySelectorAll('button')

button.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.style.transform = 'scale(0.9)'
        setTimeout(() => {
            btn.style.transform = 'scale(1)'
        }, 500);
    })
})

let links = [];

const short = async (url) => {
    try {
        const res = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);

        if(!res.ok) {
            throw new Error(`Network response was not ok ${res.status}`);
        }

        const data = await res.text();
        return data;
    } catch (error) {
        console.error('Error: ', error)
    }
}

const menu = document.querySelector('.mobile');
const list = document.querySelector('.menu');

menu.addEventListener('click', () => {
    if(list.style.display === 'none') {
        list.style.display = 'grid'
    } else {
        list.style.display = 'none'
    }
})

const form = document.querySelector('form');
const err = document.querySelector('small');
const shorten = document.querySelector('.shorten');
const input = document.querySelector('input');
const Shortend = document.querySelector('#Shortend');
let linkList = document.querySelector('#links');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if(input.value === '') {
        err.innerText = 'Please add a link';
        input.style.border = '2px solid red'
    } else {
        err.innerText = '';
        input.style.border = '';

        const url = document.querySelector('input').value;
        const shortUrl = await short(url);
        links.push({ url, data: shortUrl });

        linkList.innerHTML = links.map(l => (
            `
            <div class="link_2">
                <div class="div1">
                    <p id="link">${l.url}</p>
                </div>
                <div class="div2">
                    <p id="Shortend">${l.data}</p>
                    <button id="copy">copy</button>
                </div>
            </div>`
        ));
        input.value = '';
    }
})

const copy = document.querySelectorAll('#copy');

copy.forEach(btn => {
    btn.addEventListener('click', () => {
        console.log('Link copied to clipboard!'+ Shortend.innerHTML); 
        navigator.clipboard.writeText(Shortend.innerHTML);
        btn.innerText = 'copied!';
        btn.style.backgroundColor = 'var(--primary)'

        setTimeout(() => {
            btn.innerText = 'copy'
            btn.style.backgroundColor = 'var(--secondary)'
        }, 2000);
    })
})
