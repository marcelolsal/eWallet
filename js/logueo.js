var nombres = (document.getElementById("Nombres")) ? document.getElementById("Nombres") : null;
var email = (document.getElementById("email")) ? document.getElementById("email") : null;
var contra = (document.getElementById("password")) ? document.getElementById("password") : null;
var contraC = (document.getElementById("passwordC")) ? document.getElementById("passwordC") : null;
var nacimiento = (document.getElementById("FN")) ? document.getElementById("FN") : null;
var numero = (document.getElementById("numero")) ? document.getElementById("numero") : null;
var nit = (document.getElementById("nit")) ? document.getElementById("nit") : null;
var direc = (document.getElementById("direc")) ? document.getElementById("direc") : null;
var dui = (document.getElementById("dui")) ? document.getElementById("dui") : null;
var out = (document.getElementById("out")) ? document.getElementById("out") : null;
var btn = document.getElementById("btn") ? document.getElementById("btn") : null;
var btn2 = (document.getElementById("btn2")) ? document.getElementById("btn2") : null;
var username = (document.getElementById("username")) ? document.getElementById("username") : null;
var pass = (document.getElementById("pass")) ? document.getElementById("pass") : null;

document.getElementById("form").addEventListener("submit",function(event){
    event.preventDefault();
    var obj = new Usuario();
    var state = true;
    var errors = "Listado de errores:\n";
    if(!obj.setNombres(nombres)){
        errors+="   ->Nombres ingresados no válidos\n";
        state=false;
    }
    if(!obj.setEmail(email)){
        errors+="   ->Correo ingresado no válido\n";
        state=false;
    }
    if(!obj.setContrasena(contra,contraC)){
        errors+="   ->Contraseñas ingresadas no válidas\n";
        state=false;
    }
    if(!obj.setNacimiento(nacimiento)){
        errors+="   ->Fecha de nacimiento no válida\n";
        state=false;
    }
    if(!obj.setDireccion(direc)){
        errors+="   ->Dirección ingresada no válida\n";
        state=false;
    }
    if(!obj.setTelefono(numero)){
        errors+="   ->Teléfono ingresado no válido\n";
        state=false;
    }
    if(!obj.setNit(nit)){
        errors+="   ->Nit ingresado no válido\n";
        state=false;
    }
    if(!obj.setDui(dui)){
        errors+="   ->Dui ingresado no válido\n";
        state=false;
    }
    if(state){
        obj.setFirst(true);
        if(storeUsuario(obj)){
            alert("Ingresado con éxito, Inicia Sesión");
            location.reload();
        } else {
            errors+="   ->Error guardando el usuario\n";
            alert(errors);
        }
    } else {
        alert(errors);
    }
});

document.getElementById("login").addEventListener("submit",function(event){
    event.preventDefault();
    var obj = new Usuario();
    var state = true;
    var errors = "Listado de errores:\n";
    if(!obj.setEmail(username)){
        errors+="   ->Correo Ingresado no válido\n";
        state = false;
    }
    if(pass.value == null || pass.value == ""){
        pass.style.border="2px solid red";
        errors+="   ->La contraseña ingresada no es válida\n";
        state = false;
    }
    if(state){
        var res = searchUsuario(obj);
        if(res.success){
            obj = res.data;
            if(obj.contrasena!=pass.value){
                errors+="   ->Las contraseñas no coinciden\n";
                alert(errors);
            } else {
                setSession(obj);
            }
        } else {
            errors+="   ->No se ha encontrado ningún registro\n";
            alert(errors);
        }
    } else {
        alert(errors);
    }
});

window.onload=function(){
    if(getSession()){
        window.location = "index.html";
    }
}