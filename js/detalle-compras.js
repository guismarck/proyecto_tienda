const addRow = (fragment, product) => {
    const tdId = document.createElement('td')
    tdId.textContent = product.id

    const tdNombre= document.createElement('td')
    tdNombre.textContent = product.name

    const tdPrecio= document.createElement('td')
    tdPrecio.textContent = product.price

    const a= document.createElement('p')
    a.classList.add('btn','btn-primary')
    a.textContent = "Quitar"
    
    const tdRm= document.createElement('td')
    tdRm.appendChild(a)


    const tr = document.createElement('tr')
    tr.appendChild(tdId)
    tr.appendChild(tdNombre)
    tr.appendChild(tdPrecio)
    tr.appendChild(tdRm)
    fragment.appendChild(tr)
}

c_name = "carrito"
const getCookie = () => {
    let mycookies = document.cookie
    mycookies = mycookies.replace(c_name+'=','').split(',')
    mycookies.pop()
    console.log(mycookies)
    return mycookies
}

const removeCookie = (cookie) => {
    let exdays = 15
    let exdate = new Date(); 
    exdate.setDate(exdate.getDate() + (exdays*24*60*60*1000));
    if (document.cookie.split(',').find(row => row.startsWith(c_name))) {
        
        p_list = getCookie()
        p_list = p_list.filter(function(value){ return (value != cookie);})

        // console.log(p_list)
        document.cookie = `${c_name}=${p_list.join(',')},; expires=${ exdate.toGMTString()}}`;
        document.location.reload()
    }else{
        alert('No se pueder remover el elemento')
    } 
}

container = document.getElementById("row-container")
const fragment = document.createDocumentFragment()


function readTextFile(callback) {
    let xhr = new XMLHttpRequest()
    xhr.overrideMimeType("application/json");
    xhr.open("GET", "js/products.json", true)
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status == "200") {
            callback(xhr.responseText);
        }
    }
    xhr.send(null);
}

const loadRows =() => {
    readTextFile(function(text){
        const storedCookies = getCookie()
        
        if(storedCookies.length > 0){
            const dataJson = JSON.parse(text);
            
            storedCookies.find(function(elemento){
                for(product of dataJson){
                    if(product.id === elemento){
                        addRow(fragment, product)
                    }
                }
            })
            container.appendChild(fragment) 
        }
           
    });
}

loadRows()


container.addEventListener("click", (e => {
    if(e.target.classList.contains("btn-primary")){
        productId = e.target.parentNode.parentNode.childNodes[0].textContent
        removeCookie(productId)
        // addCookie(productId)
        // console.log(getCookie())
        // console.log(getCookie().join(','))
    }
}))


