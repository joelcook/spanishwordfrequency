let map = new Map();

async function getWords() {
    for (let i = 1; i < 46; i++) {
        try {
            const response = await fetch(`stories/${i}.txt`);
            const text = await response.text();

            const words = text.toLowerCase()
                .split(/[^a-záéíóúüñ]+/i)
                .filter((str) => str !== '');

            for (const word of words) {
                map.set(word, (map.get(word) || 0) + 1);
            }
        } catch (error) {
            console.error(`Failed to fetch stories/${i}.txt: `, error);
        }
    }
}

function updateTable() {
    const tbody = document.querySelector('tbody');
    let index = 0;
    const tData = Array.from(map.entries()).map(([key, value]) => {
        index++;
        return `<tr>
            <td>${index}</td>
            <td>${key}</td>
            <td>${value}</td>
        </tr>`;
    }).join('');

    tbody.innerHTML = tData;
}

async function init() {
    await getWords();
    map = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
    updateTable();
}

init();
