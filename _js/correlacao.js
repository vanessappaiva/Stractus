var corre = []
var corre2 = []
var M = 0, M2 = 0
var maxi;
var pontos = [];
function Add(n){
	var i; var acumula = ""; var x
	switch(n){
		case 1:
			i = parseFloat(document.getElementById ("dados").value);
			corre.push(i);
			for (x=0;x < corre.length; x++){
				acumula += corre[x] + "</br>"
				if (corre[x]> M ){
					M = corre[x]
				}
			}
			document.getElementById("addcor").innerHTML = acumula ;
			document.getElementById("totalcor").innerHTML = corre.length;
		break;
		case 2:
			i = parseFloat(document.getElementById ("dados2").value);
			corre2.push(i);
			for (x=0;x < corre2.length; x++){
				acumula += corre2[x] + "</br>"
				if (corre2[x]> M2 ){
					M2 = corre2[x]
				}
			}
			document.getElementById("addcor2").innerHTML = acumula ;
			document.getElementById("totalcor2").innerHTML = corre2.length;
		break;
		case 3:
			corre.pop();
			for (x=0;x < corre.length; x++){
				acumula += corre[x] + "</br>"
			}
			document.getElementById("addcor").innerHTML = acumula ;
			document.getElementById("totalcor").innerHTML = corre.length;
		break;
		case 4:
			corre2.pop();
			for (x=0;x < corre2.length; x++){
				acumula += corre2[x] + "</br>"
			}
			document.getElementById("addcor2").innerHTML = acumula ;
			document.getElementById("totalcor2").innerHTML = corre2.length;
		break;
	}
	
}
var acor,bcor;
function correlacao(){
	var n = corre.length;
	var somaxy = 0, somax=0,somay=0;
	var somax2=0,somay2=0;
	var i,r,resposta = "";
	var y,x,escrev=" "
	for(i=0;i<n;i++){
		somaxy += corre[i] * corre2[i]
		somax += corre[i]
		somay += corre2[i]
		somax2 += corre[i]**2
		somay2 += corre2[i]**2
	}
	r = (n * somaxy) - (somax * somay)
	r /= (((n*somax2)-(somax**2)) * ((n*somay2)-(somay**2)))**0.5
	if (r != 0){
		var result_correlacao = (parseFloat(r.toFixed(2)) * 100);
		if ((result_correlacao > 0) && (result_correlacao < 30)){
			var texto_cor = "Correlação é muito fraca";
			}
			else if ((result_correlacao >= 30) && (result_correlacao < 60)){
				texto_cor = "Correlação é média";
			} else if ((result_correlacao >= 60) && (result_correlacao < 100)){
					texto_cor = "Correlação é forte";
				} else if (result_correlacao == 100){
					texto_cor = "Correlação perfeita";
				}
				
			
		
		document.getElementById("correlacao_result").innerHTML = result_correlacao + "%";
		document.getElementById("correlacao_texto").innerHTML = texto_cor;
		
		acor = (n *somaxy )- (somax * somay)
		acor /= (n*somax2) - (somax**2)
		y = somay/n
		x = somax/n
		bcor = y - (acor * x)
		
		resposta += parseFloat(acor.toFixed(3)) + "x" +"+"+ "("+ parseFloat(bcor.toFixed(3)) +")";
		document.getElementById("equacao").innerHTML = resposta;
		escreve = '<div class="col-md-3 col-md-offset-5 " >'+
								'<span class="input-group-addon">X'+
								'<input style="color:#008993" type="number" id="xdaequacao" class="form-control">'+
								'<button type="button" class="btn btn-atention" onclick="substitui()" accesskey="enter"> Calcular </button>'+
								'</span>'+
								'<font style="color:#008993" size="5"><label>Y= </label><label id="sub"></label></font>'+
							'</div>';
		
		document.getElementById("mudarx").innerHTML = escreve;
		
	}
	else { texto_cor = "Correlação inexistente";}
}
function substitui(){
	var x = document.getElementById("xdaequacao").value;
	var r;
		r  = (acor * x) + bcor
	document.getElementById("sub").innerHTML = parseFloat(r.toFixed(2));
}

	 

     function a(){ 
			var i;
			var equacao=[];
			for(i=0;i<corre.length;i++){
				pontos[i] = [corre[i],corre2[i]]
				equacao[i] = (acor * corre[i]) + bcor
			}
			i = corre.length -1
			 Highcharts.chart('container', {
			  xAxis: {
				min: 0,
				max: corre[i] + 1
			  },
			  yAxis: {
				min: 0
			  },
			  title: {
				text: 'Grafico Regressão'
			  },
			  series: [{
				type: 'line',
				name: 'Regression Line',
				data: [ [corre[0],equacao[0]],[corre[i],equacao[i]]],
				marker: {
				  enabled: false
				},
				states: {
				  hover: {
					lineWidth: 0
				  }
				},
				enableMouseTracking: false
			  }, {
				type: 'scatter',
				name: 'Observations',
				data: pontos,
				marker: {
				  radius: 4
				}
			  }]
			});
} 
		