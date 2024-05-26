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

// Uncomment if you want to edit the code and save a new word frequency file
// async function sendDataToServer(data) {
//     try {
//         const response = await fetch('/save-words', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         });
//         if (response.ok) {
//             console.log('Data successfully sent to the server');
//         } else {
//             console.error('Failed to send data to the server');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

async function init() {
    await getWords();
    map = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
    updateTable();
    // Uncomment if you want to edit the code and save a new word frequency file
    // sendDataToServer(Object.fromEntries(map));
}

init();
