let mouseX, mouseY
document.addEventListener('mousemove', (event) => { mouseX = event.pageX, mouseY = event.pageY })

let grid = document.getElementById('grid')
let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
let cardInHand = null
alphabet.reverse()


alphabet.forEach(l => {
    for (let i = 1; i <= 8; i++) {
        let cont = document.createElement('div')
        cont.classList.add('cont')
        cont.id = l + i

        let overlay = document.createElement('div')
        overlay.classList.add('overlay')
        overlay.classList.add(l)

        cont.appendChild(overlay)
        grid.appendChild(cont)

        grid.addEventListener('mouseover', (event) => {
            if (cardInHand == null) return
            let x = event.clientX, y = event.clientY
            let field = document.elementFromPoint(x, y);
            if (!field.classList.contains('a')&&!field.classList.contains('b')) {
                if (l == 'a' || l == 'b')
                    cont.classList.add('perm')
                else 
                    cont.classList.add('notperm')
            } else if (field.classList.contains('a')||field.classList.contains('b')) {
                cont.classList.remove('perm')
                cont.classList.remove('notperm')
            }
        })

        grid.addEventListener('mouseleave', (event) => {
            cont.classList.remove('perm')
            cont.classList.remove('notperm')
        })
    }
})

let bottom = document.getElementById('bottom')
let app = document.getElementById('app')
let cards = ['soldier', 'archer', 'trap', 'bomb', 'queen']

cards.forEach(str => {
    let card = document.createElement('div')
    card.classList.add('card')
    card.id = str
    bottom.appendChild(card)

    card.addEventListener('mousedown', (event) => {
        cardInHand = card
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

    document.addEventListener('mouseup', (event) => {
        cardInHand = null
        card.remove()
        card.classList.remove('moving')
        bottom.classList.remove('hide')
        let x = event.clientX, y = event.clientY
        let field = document.elementFromPoint(x, y);
        if (!field.classList.contains('cont'))
            bottom.appendChild(card)
    })
})