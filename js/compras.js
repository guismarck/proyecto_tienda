
c_name = "carrito"

container = document.getElementById("container")
products = [...document.querySelectorAll(".product")]

container.addEventListener("click", (e => {
    if(e.target.classList.contains("add-btn")){
        productId = e.target.parentNode.childNodes[1].textContent
        
        addCookie(productId)
        console.log(getCookie())
        console.log(getCookie().join(','))
    }
}))


const getCookie = () => {
    // let exdays = 15
    //     let exdate = new Date(); 
    //     exdate.setDate(exdate.getDate() + (exdays*24*60*60*1000));
    // document.cookie = `carrito=P001,; expires=${ exdate.toGMTString()}}`;
    let mycookies = document.cookie
    mycookies = mycookies.split(',')
    mycookies.pop()
    return mycookies
}

const addCookie =(product) => {
        let exdays = 15
        let exdate = new Date(); 
        exdate.setDate(exdate.getDate() + (exdays*24*60*60*1000));
    if (!document.cookie.split(',').find(row => row.startsWith(c_name))) {
        document.cookie = `${c_name}=${product},; expires=${ exdate.toGMTString()}}`;
      }else{
        p_list = getCookie()
        p_list.push(product)
        document.cookie = `${p_list.join(',')},; expires=${ exdate.toGMTString()}}`;
      } 
    
  } 