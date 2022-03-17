//configuramos nuestra validación mediante un patón de test(lo cojemos de internet)
const validationPassword = (password) => {
    const response = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/;
    //el método test devuelve true o false
    return response.test(String(password));
};

const validationEmail = (email) => {
    const response = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //toLocaleLowerCase retorna la cadena de texto en minúsculas
    return response.test(String(email).toLocaleLowerCase());
};

//exportamos
module.exports = { validationPassword, validationEmail }