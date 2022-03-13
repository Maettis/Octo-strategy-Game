let grid = document.getElementById('grid')
let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
alphabet.reverse()

alphabet.forEach(l => {
    for (let i = 1; i <= 8; i++) {
        let cont = document.createElement('div')
        cont.classList.add('cont')
        cont.id = l + i

        let overlay = document.createElement('div')
        overlay.classList.add('overlay')
        cont.appendChild(overlay)

        grid.appendChild(cont)
    }
})

let mouseX, mouseY
document.addEventListener('mousemove', (event) => { mouseX = event.pageX, mouseY = event.pageY })

let bottom = document.getElementById('bottom')
let app = document.getElementById('app')
let cards = ['soldier', 'archer', 'trap', 'bomb', 'queen']

cards.forEach(str => {
    let card = document.createElement('div')
    card.classList.add('card')
    card.id = str
    bottom.appendChild(card)

    card.addEventListener('mousedown', (event) => {
        card.remove()
        card.classList.add('moving')
        app.appendChild(card)
        bottom.classList.add('hide')

        myLoop()
        function myLoop() {
            setTimeout(function() {
                if (!card.classList.contains('moving')) return;
                card.style.top = mouseY + 'px'
                card.style.left = mouseX + 'px'
                myLoop()
            }, 1)
        }
    })

    card.addEventListener('mouseup', (event) => {
        card.remove()
        card.classList.remove('moving')
        bottom.classList.remove('hide')
        let x = event.clientX, y = event.clientY
        let field = document.elementFromPoint(x, y);
        if (!field.classList.contains('cont'))
            bottom.appendChild(card)
    })
})