
c_name = "carrito"

container = document.getElementById("container")
products = [...document.querySelectorAll(".product")]


container.addEventListener("click", (e => {
    // e.preventDefault()
    // console.log(e.target.classList)
    if(e.target.classList.contains("add-btn")){
        
        productId = e.target.parentNode.parentNode.childNodes[1].textContent
        console.log(productId)
        addCookie(productId)
        console.log(getCookie())
        console.log(getCookie().join(','))
        alert('Se ha agregado al carrito!')
        e.preventDefault()
    }
}))


const getCookie = () => {
    // let exdays = 15
    //     let exdate = new Date(); 
    //     exdate.setDate(exdate.getDate() + (exdays*24*60*60*1000));
    // document.cookie = `carrito=P001,; expires=${ exdate.toGMTString()}}`;
    let mycookies = document.cookie
    mycookies = mycookies.replace('login_tienda=true,', '').replace('; ', '').split(',')
    mycookies.pop()
    return mycookies
}

const addCookie =(product) => {
        let exdays = 15
        let exdate = new Date(); 
        exdate.setDate(exdate.getDate() + (exdays*24*60*60*1000));
    if (!getCookie().find(row => row.startsWith(c_name))) {
        document.cookie = `${c_name}=${product},; expires=${ exdate.toGMTString()}}`;
        // console.log('Solo esta entrando aqui!')
      }else{
        p_list = getCookie()
        p_list.push(product)
        document.cookie = `${p_list.join(',')},; expires=${ exdate.toGMTString()}}`;
      } 
    
  } 