

let sorteados = [];
let carga = '';

window.addEventListener('load', function() {
    console.log('se cargo')
    if (  document.getElementById('sorteador')  !== null){
       const precarga = document.getElementById('sorteador').addEventListener('click', sortear);
    } 
   
})

const sortear = async() => {

    let participantes = [];
    
    const response = await fetch('http://localhost:8080/all');
    const data = await response.json();
    let uno = JSON.stringify(data)
    let pepe = JSON.parse(uno)
    
    for (let i in pepe) {participantes.push(pepe[i])}
    
    console.log(participantes.length)
    if (participantes.length == 0) {
        let carga = document.getElementById('textoGanador');
        carga.innerText = `No hay participantes`
    } else{
        let random = Math.floor(Math.random() * participantes.length);
        let carga = document.getElementById('textoGanador');

        let nombre = participantes[random].firstname;
        let apellido = participantes[random].lastname;
        let id = participantes[random]._id;
        let email = participantes[random].email;
        let dni = participantes[random].dni;

        carga.innerText = `${nombre} ${apellido}`;
        guardarSorteado(id, nombre, apellido, email, dni);
        console.log('esto va quedando',participantes.length)
    }

    // if(participantes.length == 0) {

    //     
    // } else {
    //     let carga = document.getElementById('textoGanador');
    //     carga.innerText = `No hay participantes`
    // }

    

    
   
}

const borrarSorteado = async (id) => {
    const response = await fetch(`http://localhost:8080/delete-contact/${id}`, {
        method: 'DELETE'
    })
    console.log(response)
}

const guardarSorteado = async (id, nombre, apellido, email, dni) => {
    const cuerpo = JSON.stringify({id: id, firstname: nombre, lastname: apellido, email: email, dni: dni})
    console.log(cuerpo)
    try {
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: cuerpo
        }
        const response = await fetch(`http://localhost:8080/sorteado`, config)
        if (response) {
            console.log('se guardo', id)
            borrarSorteado(id)
        }
    } catch (error) {
        console.log(error)
    }
    // try {
    //     const actualizarSorteado = await fetch(`http://localhost:8080/sorteado`, {
    //     method: 'POST',
        
    //     headers: {'Content-type': 'application/json; charset=UTF-8'}
    //     })

    //     console.log('se realizo')
    // } catch (error) {
    //     console.log('algo paso')
    // }
    
}