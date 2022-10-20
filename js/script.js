const cols = document.querySelectorAll('.col');



document.addEventListener('keydown', (event) => {
    event.preventDefault();
    if (event.code.toLocaleLowerCase() === 'space') {
        setRandomColors();
    }
})

document.addEventListener('click', event => {
    const type = event.target.dataset.type
    if (type === 'lock') {
        const node = event.target.tagName.toLocaleLowerCase() === 'i' ?
            event.target :
            event.target.children[0];

        node.classList.toggle('fa-lock-open');
        node.classList.toggle('fa-lock');
    } else if (type === 'copy') {
        copyToClickboard(event.target.textContent)
    }
})



function generatetRandomColors() {
    const hexCodes = '0123456789ABCDEF';
    let color = '';

    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
    }
    return '#' + color;
}


function setRandomColors() {

    const colors = [];
    cols.forEach(col => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock');
        const text = col.querySelector('h2');
        const button = col.querySelector('button');
        const color = chroma.random();

        if (isLocked) {
            colors.push(text.textContent)
            return;
        }

        colors.push(color)

        text.textContent = color;
        col.style.background = color;
        setTextColor(text, color);
        setTextColor(button, color);
    })

    colorsHash(colors)
}

function copyToClickboard(text) {
    return navigator.clipboard.writeText(text)
}



function setTextColor(text, color) {
    const luminance = chroma(color).luminance();

    text.style.color = luminance > 0.5 ? 'black' : 'white'
}

function colorsHash(colors = []) {
    document.location.hash = colors.toString();
}

setRandomColors();