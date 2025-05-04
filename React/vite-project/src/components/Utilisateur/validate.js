function Validate(values){
    let error={}
    const nom_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if(values.userName===""){
        error.userName="Saisir votre nom d'utilisateur !"
    }
    //else if(!nom_pattern.test(values.nom)){
       // error.nom="Nom incorrect"}
    else{
        error.userName=""
    }
    
    if (values.email==="") {
        error.email="Saisir votre email !"
    } else {
        error.email=""
    }

    if(values.password===""){
        error.password="Saisir mot de passe !"
    }//else if(!password_pattern.test(values.password)){
    //    error.password="Mot de passe incorrect"}
    else{
        error.password=""
    }
    
    return error
}
export default Validate