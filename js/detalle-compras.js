const addRow = (fragment, product) => {
    const tdId = document.createElement('td')
    tdId.textContent = product.id

    const tdNombre = document.createElement('td')
    tdNombre.textContent = product.name

    const tdPrecio = document.createElement('td')
    tdPrecio.textContent = product.price

    const a = document.createElement('p')
    a.classList.add('btn', 'btn-primary')
    a.textContent = "Quitar"

    const tdRm = document.createElement('td')
    tdRm.appendChild(a)


    const tr = document.createElement('tr')
    tr.appendChild(tdId)
    tr.appendChild(tdNombre)
    tr.appendChild(tdPrecio)
    tr.appendChild(tdRm)
    fragment.appendChild(tr)
}

const addRowTotal = (fragment, price) => {
    const tdId = document.createElement('td')
    tdId.textContent = ''

    const tdNombre = document.createElement('td')
    tdNombre.textContent = 'TOTAL'
    tdNombre.style = 'font-weight: bold; color: #169BD5; font-size: 1.1em;';

    const tdPrecio = document.createElement('td')
    tdPrecio.textContent = "C$ " + price
    tdPrecio.style = 'font-weight: bold; color: #169BD5; font-size: 1.1em;';

    const tr = document.createElement('tr')
    tr.appendChild(tdId)
    tr.appendChild(tdNombre)
    tr.appendChild(tdPrecio)

    fragment.appendChild(tr)
}

c_name = "carrito"
const getCookie = () => {
    let mycookies = document.cookie
    mycookies = mycookies.
        replace('login_tienda=true,', '').replace('; ', '').
        replace(c_name + '=', '').split(',')
    // mycookies.shift()
    mycookies.pop()
    // console.log(mycookies)
    return mycookies
}


const removeCookie = (cookie) => {
    let exdays = 15
    let exdate = new Date();
    exdate.setDate(exdate.getDate() + (exdays * 24 * 60 * 60 * 1000));
    let mycookies = document.cookie
    mycookies = mycookies.
        replace('login_tienda=true,', '').replace('; ', '').split(',')
    mycookies.pop()

    if (mycookies.find(row => row.startsWith(c_name))) {
        // row => row.startsWith(c_name)
        p_list = getCookie()
        p_list = p_list.filter(function (value) { return (value != cookie); })

        // console.log(p_list)
        document.cookie = `${c_name}=${p_list.join(',')},; expires=${exdate.toGMTString()}}`;
        document.location.reload()
    } else {
        alert('No se pueder remover el elemento')
    }
}

container = document.getElementById("row-container")
const fragment = document.createDocumentFragment()


function readTextFile(callback) {
    let xhr = new XMLHttpRequest()
    xhr.overrideMimeType("application/json");
    xhr.open("GET", "js/products.json", true)
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status == "200") {
            callback(xhr.responseText);
        }
    }
    xhr.send(null);
}

let total = 0.0

const loadRows = () => {
    readTextFile(function (text) {
        const storedCookies = getCookie()
        // console.log(storedCookies)
        if (storedCookies.length > 0) {
            const dataJson = JSON.parse(text);

            storedCookies.find(function (elemento) {
                for (product of dataJson) {
                    if (product.id === elemento) {
                        let vanalPrice = product.price.replace('C$', '').replace(' ', '');
                        total += parseInt(vanalPrice)
                        addRow(fragment, product)
                    }
                }
            })

            if (total != 0) {
                addRowTotal(fragment, total)
            }

            container.appendChild(fragment)
        }

    });
}

loadRows()


container.addEventListener("click", (e => {
    if (e.target.classList.contains("btn-primary")) {
        productId = e.target.parentNode.parentNode.childNodes[0].textContent
        removeCookie(productId)
        // addCookie(productId)
        // console.log(getCookie())
        // console.log(getCookie().join(','))
    }
}))


const login = (e) => {
    e.preventDefault()
    const c_name = 'login_tienda'
    if (document.cookie.includes(c_name)) {
        if (total != 0) {
            alert('Muchas gracias, se ha efectuado su compra por C$ ' + total)
            let exdays = 15
            let exdate = new Date();
            exdate.setDate(exdate.getDate() + (exdays * 24 * 60 * 60 * 1000));
            document.cookie = `carrito=,; expires=${exdate.toGMTString()}}`;
            document.location.reload()
        } else {
            alert('Aun no se agrega nada al carrito!');
        }
    } else {
        document.location = 'login.html'
    }
}

const btnCompra = document.querySelector('.btncompra')
btnCompra.addEventListener('click', login);