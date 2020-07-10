txtBuqueda = document.getElementById("searcher");
btn = document.getElementById("busca")

list = ['telefonos','login','crear cuenta', 'compras', 'detalle telefono', 'contacto']

const evtBtn = (e) => {
    e.preventDefault()
    let text = txtBuqueda.value
    text = text.toLowerCase()
    const result = list.find((elemento) => elemento.toLowerCase().includes(text))
    
    if(result != undefined){
        if(result == 'telefonos'){
            document.location = 'telefonos.html'
        }else if(result == 'login'){
            document.location = 'login.html'
        }else if(result == 'crear cuenta'){
            document.location = 'create-account.html'
        }else if(result == 'compras'){
            document.location = 'compras.html'
        }else if(result == 'detalle telefono'){
            document.location = 'DetalleTelefonos.html'
        }else if(result == 'contacto'){
            document.location = 'contacto.html'
        }
    }
    
} 

btn.addEventListener('click', evtBtn)