const c_name = "login_tienda"


const getCookie = () => {
    let mycookies = document.cookie
    mycookies = mycookies.split(',')
    mycookies.pop()
    return mycookies
}

const login = (isLogin) => {
    console.log("en un bocles!!!!")
    let exdays = 1
    let exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    if (document.cookie.includes(c_name)) {
        // document.cookie = `${c_name}=true,; expires=${exdate.toGMTString()}}`;
        document.location = 'compras.html'
    } else if (isLogin){
        document.cookie = `${c_name}=true,; expires=${exdate.toGMTString()}}`;
        login(true)
        // p_list = getCookie()
        // p_list.push(product)
        // document.cookie = `${p_list.join(',')},; expires=${exdate.toGMTString()}}`;
    }
}

login(false)

const txtImail = document.getElementById("imail");
const txtPass = document.getElementById("pass");

const event = (e) => {
    // alert('hola')
    e.preventDefault();
    const txt1 = txtImail.value;
    const txt2 = txtPass.value;
    if (txt1 == "guismarck01@gmail.com" && txt2 == "1234") {
        // document.location = 'compras.html'
        login(true)

    } else {
        alert('Usuario o contrasenha invalidos')
    }

}

const btn = document.getElementById("logueo")
btn.addEventListener('click', event)

