let map = new Map();

async function getWords() {
    for (let i = 1; i < 46; i++) {
        const response = await (await fetch(`stories/${i}.txt`)).text();

        const words = response.toLowerCase()
            .split(' ')
            .join('$')
            .split(',')
            .join('$')
            .split('!')
            .join('$')
            .split('?')
            .join('$')
            .split('¡')
            .join('$')
            .split('“')
            .join('$')
            .split('”')
            .join('$')
            .split('.')
            .join('$')
            .split(/\r\n/)
            .join('$')
            .split(':')
            .join('$')
            .split(';')
            .join('$')
            .split('"')
            .join('$')
            .split('$')
            .filter((str) => str !== '');

        for (let i = 0; i < words.length; i++) {
            map.set(words[i], map.get(words[i]) + 1 || 1);
        }
    }
}

function updateTable() {
    const tbody = document.querySelector('tbody');
    let tData = '';
    index = 0;
    tData = Array.from(map.entries()).map(([key, value]) => {
        index++;
        return `<tr>
        <td>${index}</td>
        <td>${key}</td>
        <td>${value}</td>
        </tr>`
    }).join('');

    tbody.innerHTML = tData;
}

getWords();
setTimeout(() => {
    map = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
    updateTable();
}, 100);

