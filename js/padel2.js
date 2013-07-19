$(document).ready(function(){

	/* Llama a la función encargada de dibujar el mapa, en el archivo map.js*/
	initialize();
	
	/* Activa los link de las noticias */
	activaLinksNoticias();

	/* A la espera de carga de noticias, se muestra el funcionamiento general */
	function activaLinksNoticias(){
		$('#collapseOne').on('hidden', function () {
			$("#contenedor_noticias").html($("#noticia_11").html());
			$("#collapseOne").collapse("show");
		})
	
		$("#noticia_1").click(function(){
			$("#collapseOne").collapse("hide");			
		});
		
		$("#noticia_1").click(function(){
			$("#collapseOne").collapse("show");
		});
	}

	/* Despliega las noticias *
	$("#ultimas_noticias").click(function(event){
		event.preventDefault();
		var n = $("#myCarousel").height();
		$('html, body').animate({ scrollTop: n }, 500);
		activaLinksNoticias();
	});*/
			
	/* Función encargada de resaltar los enlaces en función a la sección a la que se llegue mediante scroll */
	$(window).scroll(function(){		
		var seccionClub = "#elclub";
		var seccionNoticias = "#noticias";
		var seccionContacto = "#contacto";
		var resaltadoClub = 0;
		var resaltadoContacto = 0;
		var resaltadoNoticias = 0;
		if($("body").scrollTop() > 0 && $("body").scrollTop() < 350){
			resaltadoNoticias = 0;
			resaltadoContacto = 0;
			resaltadoClub = 0;
			
		}else if($("body").scrollTop() > 350 && $("body").scrollTop() < 950){
			resaltadoNoticias = 1;
			resaltadoContacto = 0;
			resaltadoClub = 0;
			
		}else if($("body").scrollTop() > 950 && $("body").scrollTop() < 1300){
			resaltadoClub = 1;
			resaltadoNoticias = 0;
			resaltadoContacto = 0;
			
		}else if($("body").scrollTop() > 1300){
			resaltadoContacto = 1;
			resaltadoNoticias = 0;
			resaltadoClub = 0;
			
		}
		
		/* Resaltamos el enlace de la sección visualizada */
		/* Restauramos los enlaces que no están siendo visualizados */
		if(resaltadoNoticias == 1){					
			$("a[href='" + seccionNoticias + "']").attr('style', 'color: #1c666c');
			$("a[href='" + seccionClub + "']").attr('style', 'color: #ffffff');
			$("a[href='" + seccionContacto + "']").attr('style', 'color: #ffffff');
		}else if(resaltadoClub == 1){					
			$("a[href='" + seccionClub + "']").attr('style', 'color: #1c666c');
			$("a[href='" + seccionNoticias + "']").attr('style', 'color: #ffffff');
			$("a[href='" + seccionContacto + "']").attr('style', 'color: #ffffff');
		}else if(resaltadoContacto == 1){					
			$("a[href='" + seccionContacto + "']").attr('style', 'color: #1c666c');
			$("a[href='" + seccionClub + "']").attr('style', 'color: #ffffff');
			$("a[href='" + seccionNoticias + "']").attr('style', 'color: #ffffff');
		}else{
			$("a[href='" + seccionContacto + "']").attr('style', 'color: #ffffff');
			$("a[href='" + seccionClub + "']").attr('style', 'color: #ffffff');
			$("a[href='" + seccionNoticias + "']").attr('style', 'color: #ffffff');
		}	
	});
	

})   