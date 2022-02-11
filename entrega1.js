
class Libro {
  constructor(nombre, valor){
    this.nombre = nombre;
    this.valor = valor;
  }
}

const libro1 = new Libro("La Iliada", 250);
const libro2 = new Libro("Crimen y Castigo", 200);
const libro3 = new Libro("El Proceso", 150);
const libro4 = new Libro("Divina Comedia", 220);



let libros_Libreria = [libro1, libro2, libro3, libro4];
let carrito = [];

const login = () => {
  alert("Bienvenido a la libreria de Babel");
};

const libros = () => {
   
    let n_Libro;
    let libros_Mostrar = ""; 
   
   for (let i=0; i< libros_Libreria.length; i++){
    libros_Mostrar += (i+1) +") " +  libros_Libreria[i].nombre + "\n";
    
   }


   do {
        n_Libro = parseInt(prompt("Libros disponibles:" + "\n" + libros_Mostrar));
        if (n_Libro < 1 || n_Libro > libros_Libreria.length || isNaN(n_Libro)){
          alert(`Debe elegir entre 1 y ${libros_Libreria.length}`);
        }
      } while (n_Libro < 1 || n_Libro > libros_Libreria.length|| isNaN(n_Libro));

      return libros_Libreria[n_Libro-1];         //retorna un objeto
 
    }

      
    const seleccion = () => {
      let libro_Elegido; 

      do{
          libro_Elegido = libros();
          carrito.push(libro_Elegido);
        

          var seguir = confirm("Desea comprar otro libro? "); 
      }while(seguir === true);

    }



    const finalizar_Compra = () => {
      let repetir_finalizar_Compra = false;
      let finalizar;

      do {
          let compras ="";
          let opcion;        
               
          for (let i=0; i< carrito.length; i++){
            compras += (i+1) +") " +  carrito[i].nombre + "  $" + carrito[i].valor + "\n";        
            }

          do {
            opcion = parseInt(prompt("Usted ha comprado:\n" + compras + "-*-*-*-*-*-*-*-*-*-*-*-*-*-*\n " + "Gasto total de: $" + gasto_Total()  + "\n\n\n\nPresione:\n 1-Para aceptar\n 2-Para cancelar\n 3-Para elminiar algun Libro"));
            if (opcion  < 1 || opcion > 3 || isNaN(opcion)){
              alert("Debe elegir entre 1 y 3");
            }
          } while (opcion  < 1 || opcion > 3 || isNaN(opcion));

          switch (opcion) 
            {
                case 1: 
                    finalizar = true;
                    repetir_finalizar_Compra = false;
                    break;

                case 2: 
                    carrito.splice(0, carrito.length); 
                    finalizar = false;
                    repetir_finalizar_Compra = false;
                    break;

                case 3:             
                    finalizar = eliminarde_Carrito(compras);
                    if (finalizar == false){
                      repetir_finalizar_Compra = false; 
                    } else {

                      repetir_finalizar_Compra = true;
                    }
                    break;
            }
  } while(repetir_finalizar_Compra);
  return finalizar;

}

const eliminarde_Carrito = (compras) => {
          do {
              n_libro = parseInt(prompt("Seleccione el libro a eliminar:\n" + compras));
              if (n_libro  < 1 || n_libro > carrito.length || isNaN(n_libro)){
                alert(`Debe elegir entre 1 y ${carrito.length}`);
                }
            } while (n_libro  < 1 || n_libro > carrito.length || isNaN(n_libro));
            carrito.splice(n_libro-1,1);
            if (carrito.length > 0){
          
                return true;
            } else {
                alert("Ha vaciado su carrito de compras!"); 
               return false;
               
            }


}




const pagar = (gasto_Total) => {
  let dinero;
  let vuelto;
  do {
    dinero = parseFloat(prompt("Inserte la suma a pagar"));
    if (dinero < gasto_Total){
      alert("Debe elegir una suma superior o igual a " + gasto_Total );
    } else if (isNaN(dinero)){
      alert("Debe elegir un numero");
    }
  } while ((dinero < gasto_Total) || isNaN(dinero) );

  vuelto = dinero - gasto_Total; 
  return vuelto;

}

const gasto_Total = () => {
  let gasto_Total =0;
  for (let item of carrito){
    
      gasto_Total += parseInt(item.valor);
     }
  return gasto_Total;    

}



const main = () => {
  let finaliza;
  let gastos;
  let iva;
  let total_Iva;
  let vuelto;
  do {
      seleccion(); 
         
      finaliza = finalizar_Compra();
      gastos = gasto_Total();
      iva = Iva(gastos);
      total_Iva = gastos + iva;
  } while (!finaliza);

      alert("El valor a pagar es " + gastos + " mas IVA:\n " + total_Iva);
      vuelto = pagar(total_Iva);
  if (vuelto == 0){
      alert("Gracias por su compra!");
  } else {
      alert("Gracias por su compra!\nSu vuelto es: " + vuelto );
  }
  
}    



const Iva = (total) => (total * 21) / 100;




login();

main();