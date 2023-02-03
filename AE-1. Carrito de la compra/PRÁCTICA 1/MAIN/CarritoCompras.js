var nombArt;
var precArt;
var Uni;
var error1;
var error2;
var listado="";
var precTotal=0;
var formaPago;
var botonCheck;
var botonImprimir;
var titularTarjeta;
var numerTarjeta;
var cvv;
var error3;
var error4;
var error5;
//Expresiones regulares JavaScript: \d digitos (0-9), \s espacio
//+ aparece 1 o más veces
//[] para especificar un caracter o rango de caracteres
//* aparece 0 o más veces
var numero=/^\d+([.]\d+)*$/; //números con o sin decimales 1.25 \d=1 [.]=. \d=25
var texto=/^[a-zA-Z]+(\s[a-zA-Z]+)*$/; //Debe empezar con una cadena de texto y puede continuar con espacio + texto
var numeroInt=/^\d$/; // 16 dígitos
window.addEventListener("load", init);

function inicializar(){
	//nombArt=document.form_list.nombreArt;
	nombArt=document.getElementById("nombreArt");
	precArt=document.form_list.precioArt;
	Uni=document.form_list.unidades;
	error1=document.getElementById("mensajeError1");
	error2=document.getElementById("mensajeError2");
	nombArt.focus();
	formaPago=document.getElementById("formaPago");
	capaTarjeta.style.display="none";
	capaEfectivo.style.display="none";
	botonCheck=document.getElementById("botonCheck");
	botonImprimir=document.getElementById("botonImprimir");
	botonImprimir.disabled=true;
	titularTarjeta=document.getElementById("titular");
	numerTarjeta=document.getElementById("numTarjeta");
	cvv=document.getElementById("cvv");
	error3=document.getElementById("mensajeError3");
	error4=document.getElementById("mensajeError4");
	error5=document.getElementById("mensajeError5");
}
function eventosBotones(){
	document.getElementById("botonAnadir").addEventListener("click", listaArticulos);
	formaPago.addEventListener("change", cambioPago);
	botonCheck.addEventListener("change",imprimirCondiciones);
	botonImprimir.addEventListener("click", mostrarAlertas);
	botonRestablecer.addEventListener("click",restablecer);
	//document.form_list.botonAnadir.addEventListener("click",listaArticulos);	
}
function escribirListaPrecio(){
	if (listado==""){ //para que no empiece el texto con ,
		listado=nombArt.value;
		
	}
	else{
		listado=listado+", "+nombArt.value;
	}	
	precTotal=precTotal+(parseFloat(precArt.value)*Uni.value);//actualizamos el precio total con el precio articulo

}
function listaArticulos(){
	var articuloOk=true;
	var precioOk=true;
	//compruebo que el precio se ha introducido bien
	if(precArt.value==""){//si el precio está vacio
		error2.textContent="⚠️ falta precio";
		precArt.focus();
		precioOk=false;
	}else if(!numero.test(parseFloat(precArt.value))){//si el precio convertido en float no coincide con el formato
		error2.textContent ="⚠️ tipo de dato incorrecto";	
		precArt.focus();		
		precioOk=false;
	}else{//si está bien
		error2.textContent="";//borrar mensajes de error si hubiera
	}
	//Compruebo que el artículo se ha introducido bien:
	if(nombArt.value==""){//está vacío
		error1.textContent ="⚠️ falta articulo";
		nombArt.focus();
		articuloOk=false;
	}else if(!texto.test(nombArt.value)){//si mi articulo no es un texto:
		error1.textContent ="⚠️ tipo de dato incorrecto";	
		nombArt.focus();
		articuloOk=false;
	}else{//en caso de que no haya error:
		error1.textContent="";//borraria el error en caso de que lo hubiera antes
	}
	if (articuloOk && precioOk){//si los dos están bien
		escribirListaPrecio();	//Actualizo el listado de articulos y el precio total
		document.getElementById("listCarr").value= listado; //Muestra el listado en html
		document.getElementById("preciototal").value=precTotal.toFixed(2); //Muestra el precio total en html
		reset();
	}

}
function reset(){
	//Para resetear los campos una vez que el dato introducido sea valido
	document.form_list.nombreArt.value=""; //borra el nombre del articulo
	document.form_list.precioArt.value="";//borra el precio
	error1.textContent="";//borra los errores (si los hubiera)
	error2.textContent="";
	document.form_list.unidades.value=1;
	formaPago.value="seleccione";
	nombArt.focus();
}

function cambioPago(){
	if(formaPago.value=="seleccione"){
		capaTarjeta.style.display="none";
		capaEfectivo.style.display="none";
	}else if(formaPago.value=="tarjeta"){
		capaTarjeta.style.display="block";
		capaEfectivo.style.display="none";
	}else if(formaPago.value=="efectivo"){
		capaTarjeta.style.display="none";
		capaEfectivo.style.display="block";
		document.getElementById("importe").value=precTotal;
	}
}

function imprimirCondiciones() {
	if (botonCheck.checked){
		botonImprimir.disabled=false;
	}
	else{
		botonImprimir.disabled=true;
	}
}

function mostrarAlertas(){
	var titularOk=true;
	var ntarjetaOk=true;
	var cvvOk=true;

	if (formaPago.value=="seleccione"){
		window.alert("Selecione una forma de pago");
	}
	else if(formaPago.value=="tarjeta"){
		if(titularTarjeta.value==""){
			error3.textContent="⚠️ falta Titular";
			titularTarjeta.focus();
			titularOk=false;
		}else if(!texto.test(titularTarjeta.value)){
			error3.textContent="⚠️ formato incorrecto";
			titularTarjeta.focus();
			titularOk=false;
		}
		else{
			error3.textContent="";
			titularOk=true;
		}
		if(numerTarjeta.value==""){
			error4.textContent="⚠️ falta numero de tarjeta";
			numerTarjeta.focus();
			ntarjetaOk=false;
		}else if(!numeroInt.test(parseInt(numerTarjeta.value)) && numerTarjeta.value.length!=16){
			//compruebo que el n de tarjeta tiene 16 digitos
			error4.textContent="⚠️ formato incorrecto";
			numerTarjeta.focus();
			ntarjetaOk=false;
		}
		else{
			error4.textContent="";
			titularOk=true;
		}
		if(cvv.value==""){
			error5.textContent="⚠️ falta cvv";
			cvv.focus();
			cvvOk=false;
		}else if(!numeroInt.test(parseInt(cvv.value)) && cvv.value.length!=3){
			//compruebo que el n de cvv tiene 3 digitos
			error5.textContent="⚠️ formato incorrecto";
			cvv.focus();
			cvvOk=false;
		}
		else{
			error5.textContent="";
			cvvOk=true;

		}
		if (titularOk && ntarjetaOk && cvvOk){
			window.alert("Los articulos de mi carrito son: "+ listado + "\n y el precio total es: "+precTotal + "\n forma de pago: "+ formaPago.value);
		}

	}
	else{
		window.alert("Los articulos de mi carrito son: "+ listado + "\n y el precio total es: "+precTotal + "\n forma de pago: "+ formaPago.value);
	}
}
function restablecer(){
	listado="";
	precTotal=0;
	document.getElementById("listCarr").value= listado; //Muestra el listado en html
	document.getElementById("preciototal").value=""; //Muestra el precio total en html
	reset();
	botonImprimir.disabled=true;
	botonCheck.checked=false;
	capaTarjeta.style.display="none";
	capaEfectivo.style.display="none";
}

function init(){
	  inicializar(); // inicio
	  eventosBotones(); // manejador de eventos
}