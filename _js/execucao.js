
function c_disc(){//Calculo da variável Contínua
	var f = 0; var x = 0; var fi = []; var xi = [];
	var vFr = []; var vFf = []; var vFperc = [];
	var media = []; var insert = [];
	
	//recebe o Fi e o Xi
	f = document.getElementById("fi_discreta").value;
	x = document.getElementById("xi_discreta").value;
	
	//divide o que foi recebido em vetores de Fi e Xi
	fi = f.split(",");
	xi = x.split(",");
	
	//calcula soma dos Fi's
	var somaFi =0;
	for (i=0; i<xi.length; i++){
		somaFi = (fi[i]|0) + somaFi;
	}
	
	var xiRep = new Array();
	//cria um vetor xi com as devidas repetições
	for(i=0; i<fi.length; i++){
		for (j=0; j<fi[i]; j++){
		xiRep.push(xi[i]);
		}
	}
	
	//calcula o percentual de cada Fi
	for (i=0; i<xi.length; i++){
		vFr[i] = ((fi[i]|0) * 100)/somaFi;
	}
	
	//faz a soma dos F
	var somaConj = 0;
	for (i=0; i<xi.length; i++){
		somaConj = (fi[i]|0) + somaConj;
		vFf[i] = somaConj;
	} 
	
	//faz a soma dos percntuais
	var somaPerc = 0;
	for (i=0; i<xi.length; i++){
		somaPerc = vFr[i] + somaPerc;
		vFperc[i] = somaPerc;
	}
	
	//faz a soma de todas as médias
	var somaMedia = 0;
	for (i=0; i<xi.length; i++){
		media[i] = (xi[i]|0) * (fi[i]|0);
		somaMedia = somaMedia + media[i];
	}
	
	//calcula a média ponderada
	var mediaPonderada = 0;
	mediaPonderada = somaMedia/somaFi;
	
	
	//calcula a moda
	var moda = 0; var aux = (vFr[i]|0);
	for (i=0; i<xi.length; i++){
		if((vFr[i]|0)> aux){
			aux = vFr[i];
			moda = xi[i];	
		}
	}
	
	//calcular mediana
	var mod = (somaFi) % 2;
	if( mod == 0){
		var central1; var central2;
		var mediana = 0;
		
		central1 = parseInt((somaFi) / 2);
		central2 = central1 + 1;
		var x1 = parseInt(xiRep[central1]);
		var x2 = parseInt(xiRep[central2]);
		mediana = ( (x1 + x2 )/2);	
	} else{
		var central = 0; 
		central = (((somaFi) / 2) + 1);
		central = parseInt(central);
		mediana = xiRep[central];
		
	}
	
	//calculaVariancia
	var aux2 =0; var variancia = []; var varianciaFinal = 0; var somavariancia = 0;
	for(i=0; i<xi.length; i++){
		aux2 = (xi[i]|0) - mediaPonderada;
		variancia[i] = Math.pow(aux2, 2)*(fi[i]|0);
		somavariancia += variancia[i];
	}
	varianciaFinal = somavariancia/(somaFi-1);
	//desvio padrao
	var desvioPadrao = Math.sqrt(varianciaFinal);
	//coeficiente de variação
	var coefVariacao = (desvioPadrao / mediaPonderada)*100;
	
	//diminuir casas decimais na resposta
	for (i = 0; i<xi.length; i++){
		vFr[i] = vFr[i].toFixed(2);
		vFperc[i] = vFperc[i].toFixed(2);
	}
	
	
	//Coloca o cabeçalho da tabela
	var tabela= "<table class='table table-striped table-responsive table-condensed table-bordered' style='vertical-align: middle; display: table-cell; position: relative;'><thead><tr><th>xi</th><th>fi</th><th>fr%</th><th>F</th><th>F%</th></tr></thead>";
	//Escreve a tabela
	for (i=0; i<xi.length; i++){
		tabela+="<tr><td style='width: 100px;'>" +xi[i]+ "</td><td>"+fi[i]+"</td><td>"+vFr[i]+" % </td><td>"+vFf[i]+"</td><td>"+vFperc[i]+" % </td></tr>";
	}  
	//fim da tabela
	tabela+="</table>";	
	//diminuir casas decimais na resposta
	mediaPonderada = mediaPonderada.toFixed(2);
	varianciaFinal = varianciaFinal.toFixed(2);
	desvioPadrao = desvioPadrao.toFixed(2);
	coefVariacao = coefVariacao.toFixed(2);
	//escreve os resultados no HTML
	document.getElementById('tabela_disc').innerHTML = tabela;
	document.getElementById('media_disc').innerHTML = mediaPonderada;
	document.getElementById('moda_disc').innerHTML = moda;
	document.getElementById('mediana_disc').innerHTML = mediana;
	document.getElementById('variancia_disc').innerHTML = varianciaFinal;
	document.getElementById('desvpad_disc').innerHTML = desvioPadrao;
	document.getElementById('coef_disc').innerHTML = coefVariacao;
	
	//graficos
        //function montaGraficoDiscreta() {
            var titles = new Array();
            var datas = new Array();
            var bkColors = new Array();
            var bdColors = new Array();
			
			var backgroundColor = [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ];
             var borderColor =  [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ];
			
            for (var i = 0; i < xi.length; i++) {
                titles.push(xi[i]);
                datas.push(fi[i]);
                bkColors.push(backgroundColor[i]);
                bdColors.push(borderColor[i]);
            }
            //monta grafico
            var barChartData = {
                labels: titles,
                datasets: [{
                    label: '',
                    borderWidth: 1,
                    data: datas,
                    backgroundColor: bkColors,
                    borderColor: bdColors
                }]
            };

            //monta na tela
            var ctx = document.getElementById("graphic_disc").getContext("2d");
            window.myBar = new Chart(ctx, {
                type: 'bar',
                data: barChartData,
                options: {
                    responsive: true,
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Gráfico Variável Quantitativa Discreta'
                    },
                    scales: {
                        yAxes: [{
                            display: true,
                            ticks: {
                                suggestedMin: 0, // minimum will be 0, unless there is a lower value.
                                // OR //
                                beginAtZero: true // minimum value will be 0.
                            }
                        }]
                    }


                }
            });
//  }	
}
var classe_global = new Array(); var fr_global = new Array(); var tamanho_global = 0;
var maxI_global = new Array(); var minI_global = new Array();
function c_cont(){//Calculo da variável Contínua
	var f = 0; var x = 0; var fi = []; var xi = [];
	var vFr = []; var vFf = []; var vFperc = [];
	var media = []; var insert = [];
	var xmax = 0; var xmin = 0; 
	
	
	x = document.getElementById("xi_continua").value;
	
	
	xi = x.split(",");
	
	//pegar maior x e menor x
	xmax = Math.max.apply(null, xi);
	xmin = Math.min.apply(null, xi);
	
	//calcular amplitude
	var amplit = 0;
	amplit = (xmax|0) - (xmin|0);
	
	//calcula a raiz da quantidade de elementos do Array
    raiz = Math.floor(Math.sqrt(xi.length));
	
	var achou = false;
    intervaloDeClasse = 0;
    classe = 0;
    while (!achou) {
        amplit++;
        for (var i = -1; i < 2; i++) {
            if ((amplit % (raiz + i)) == 0) {
                achou = true;
                classe = (i + raiz);
                intervaloDeClasse = (amplit / classe);
                break;
            }
        }
    }
    //Array tabela
   // 0- classe
   // 1- min intervalo
   // 2- |--
   // 3- max intervalo
   // 4- frequencia (fi)
   // 5- FR%
   // 6- F
   // 7- F%
   // 8- (min + max)/2
   
    
	//Cabeçalho da tabela
	var table= "<table class='table table-striped table-responsive table-condensed table-bordered' style='vertical-align: middle; display: table-cell; position: relative;'><thead><tr><th>Classe</th><th>Intervalo de Classe</th><th>Fi</th><th>Fr%</th><th>F</th><th>F%</th><th>Ponto Médio(xi)</th></tr></thead>";
	
	
	var tabela = new Array();
    /*monta a tabela*/
    for (var i = 0; i < classe; i++) {
        /*incrementa a classe*/
        tabela.push([(i + 1)]);
        /*monta o intervalo de salários*/
        tabela[i][1] = xmin + (i * intervaloDeClasse);
        tabela[i][2] = " |-- ";
        tabela[i][3] = xmin + ((i + 1) * intervaloDeClasse);

        /*Verifica a quantidade de repetições no intervalo, e incrementa na tabela*/
        var count = 0;
        for (var j = 0; j < xi.length; j++) {
            if ((xi[j] >= tabela[i][1]) && (xi[j] < tabela[i][3])) {
                count++;
            }
        }
        tabela[i][4] = count;

        /*calcula o percentual da quantidade de repetição*/
        tabela[i][5] = ((tabela[i][4] / xi.length) * 100);
		
        /*calcula acumulado de repetição e de percentual
        primeiro indice não soma com anterior*/
        if (i == 0) {
            tabela[i][6] = tabela[i][4];
            tabela[i][7] = tabela[i][5];
			
        } else {
            tabela[i][6] = tabela[i][4] + tabela[(i - 1)][6];
            tabela[i][7] = tabela[i][5] + tabela[(i - 1)][7];
        }
        /*Calculo do ponto medio(xi)*/
        tabela[i][8] = ((tabela[i][1] + tabela[i][3]) / 2);
		
    }
	//popular variáveis globais
	tamanho_global = classe;
	for (var i = 0; i < classe; i++) {
		classe_global[i] = tabela[i][0];
		fr_global [i] = tabela[i][4];
		maxI_global[i] = tabela[i][3];
		minI_global[i] = tabela[i][1];
	}
	//calcula soma dos Fi's
	var somaFi =0;
	for (i=0; i < classe; i++){
		somaFi = (tabela[i][4]) + somaFi;
	}
	
	//calcula as médias e faz soma de todas as médias
	var somaMedia = 0; var media = [];
	for (i=0; i < classe; i++){
		media[i] = (tabela[i][8]) * (tabela[i][4]);
		somaMedia = somaMedia + media[i];
	}
	
	//calcula a média ponderada
	var mediaPonderada = 0;
	mediaPonderada = somaMedia/somaFi;
	mediaPonderada = mediaPonderada.toFixed(2);

	//calcula mediana
	var central; var mediana = 0; var classe_md; var classeAnt; var fi_md; var minClasse;
	//Cálculo do central
	central = parseInt((somaFi) / 2);

	//Índice da classe 
    for (var i = 0; i < tabela.length; i++) {
        if (central < tabela[i][6]) {
            classe_md = i;
            break;
        }
    }
	//Limite inferior da Classe mediana
    minClasse = tabela[classe_md][1];

    //achar a classe anterior 
    if (classe_md == 0) {
        classeAnt = 0;
    } else {
        classeAnt = tabela[(i - 1)][6];
    }
	//Fi da classe da mediana
    fi_md = tabela[classe_md][4];

    //Cálculo da mediana
	mediana = (minClasse + ((((somaFi / 2) - classeAnt) / fi_md) * intervaloDeClasse));
	
	//calcula a moda convencional
	var moda_conv = 0; 
	for (i=0;  i < classe; i++){
		var aux = tabela[1][5];
		if((tabela[i][5])> aux){
			aux = tabela[i][5];
			moda_conv = tabela[i][8];
			moda_conv = moda_conv.toFixed(2)
		}
	}
	
	//calcula a moda Pearson
	var moda_pear;
	moda_pear = ((3 * mediana) - (2 * mediaPonderada));
	moda_pear = moda_pear.toFixed(2);
	
	//calcula a moda King
	var moda_king;
	
	//calcula a moda Czuber
	var moda_czub;
	
	//calculaVariancia
	var aux2 =0; var variancia = []; var varianciaFinal = 0; var somavariancia = 0;
	for(i=0; i<tabela.length; i++){
		aux2 = (tabela[i][8]|0) - mediaPonderada;
		variancia[i] = Math.pow(aux2, 2)*(tabela[i][4]|0);
		somavariancia += variancia[i];
	}
	varianciaFinal = somavariancia/(somaFi-1);
	//desvio padrao
	var desvioPadrao = Math.sqrt(varianciaFinal);
	//coeficiente de variação
	var coefVariacao = (desvioPadrao / mediaPonderada)*100;
	
	//Escreve a tabela
	for (var i = 0; i < classe; i++) {
		n_classe = i+1;
		tabela[i][5] = tabela[i][5].toFixed(2);
		tabela[i][7] = tabela[i][7].toFixed(2);

		table+="<tr><td style='width: 100px;'>" + n_classe + "</td><td>"+ tabela[i][1] + tabela[i][2] + tabela[i][3] + "</td><td>"+ tabela[i][4]+"</td><td>"+tabela[i][5]+" % </td><td>"+tabela[i][6]+"</td><td>"+tabela[i][7]+" % </td><td>" + tabela[i][8] + "</td></tr>";
	}  
	//fim da tabela
	table+="</table>";	
	//diminuir casas decimais na resposta
	mediana = mediana.toFixed(2);
	varianciaFinal = varianciaFinal.toFixed(2);
	desvioPadrao = desvioPadrao.toFixed(2);
	coefVariacao = coefVariacao.toFixed(2);
	
	document.getElementById('tabela_cont').innerHTML = table;
	document.getElementById('media_cont').innerHTML = mediaPonderada;
	document.getElementById('mediana_cont').innerHTML = mediana;
	document.getElementById('modaconv_cont').innerHTML = moda_conv;
	document.getElementById('modapear_cont').innerHTML = moda_pear;
	document.getElementById('variancia_cont').innerHTML = varianciaFinal;
	document.getElementById('desvpad_cont').innerHTML = desvioPadrao;
	document.getElementById('coef_cont').innerHTML = coefVariacao;
		
	//graficos
        //function montaGraficoDiscreta() {
            var titles = new Array();
            var datas = new Array();
            var bkColors = new Array();
            var bdColors = new Array();
			
			var backgroundColor = [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ];
             var borderColor =  [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ];
			
            for (var i = 0; i < classe; i++) {//for com o tamanho do vetor FI ou XI
                titles.push(tabela[i][8]);//criar vetor TITLES e colocar todos os XI
                datas.push(tabela[i][4]);//criar vetor DATAS e colocar todos os FI
                bkColors.push(backgroundColor[i]);
                bdColors.push(borderColor[i]);
            }
            //monta grafico
            var barChartData = {
                labels: titles, // coloca o vetor TITLES como LABEL
                datasets: [{
                    label: '',
                    borderWidth: 1,
                    data: datas, //coloca o vetor DATAS como data
                    backgroundColor: bkColors,
                    borderColor: bdColors
                }]
            };

            //monta na tela
            var ctx = document.getElementById("graphic_cont").getContext("2d");
            window.myBar = new Chart(ctx, {
                type: 'bar',
                data: barChartData,
                options: {
                    responsive: true,
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Gráfico Variável Quantitativa Contínua'
                    },
                    scales: {
                        yAxes: [{
                            display: true,
                            ticks: {
                                suggestedMin: 0, // minimum will be 0, unless there is a lower value.
                                // OR //
                                beginAtZero: true // minimum value will be 0.
                            }
                        }]
                    }


                }
            });
//  }	

	modaKing();
	modaCzuber();
	}
	
function modaKing() {
	  
	  var classe = new Array(); var fr = new Array(); var tam = 0;
	  tam = tamanho_global; var max = new Array(); var min = new Array();
	  for (var i = 0; i<tam; i++){
		  classe[i] = classe_global[i];
		  fr[i] = fr_global[i];
		  max[i] = maxI_global[i];
		  min[i] = minI_global[i];
	  }
	  
    var moda = new Array();
    /*calcula a adiciona a primeira posição*/
    limInferior = classe[1];
    var qtdeClasseAnterior = 0;
    if (classe.length > 1) {
        qtdeClassePosterior = fr[1];
    } else {
        qtdeClassePosterior = 0;
    }
    intervaloDeClasse = max[0] - min[0];
    calcModa = (limInferior + (((qtdeClassePosterior / (qtdeClasseAnterior + qtdeClassePosterior)) * intervaloDeClasse)));

    moda.push([classe[0], fr[0], calcModa]);

    /*percorre tabela verificando qual repete mais*/
    for (var i = 1; i < classe.length; i++) {
        var insere = false;
        if (fr[i] > moda[0][1]) {
            /*quando acha um maior, zera o array e marca pra adicionar*/
            moda.splice(0, moda.length);
            insere = true;
        } else if (min[i] == moda[0][1]) {
            /*se for igual marca pra adicionar*/
            insere = true;
        }
        /*adiciona no array*/
        if (insere == true) {
            limInferior = min[i];
            qtdeClasseAnterior = fr[(i - 1)];
            //se for o ultimo, posterior recebe 0
            if (i == (classe.length - 1)) {
                qtdeClassePosterior = 0;
            } else {
                qtdeClassePosterior = fr[(i + 1)];
            }

            calcModa = (limInferior + (((qtdeClassePosterior / (qtdeClasseAnterior + qtdeClassePosterior)) * intervaloDeClasse)));

            moda.push([classe[i], fr[i], calcModa]);
        }
    }
    /*se a moda tiver o mesmo tamanho que a tabela e amodal*/
    if (moda.length == classe.length) {
        moda.splice(0, moda.length);
    }
    document.getElementById('modaking_cont').innerHTML = calcModa;
}

function modaCzuber() {
  
	  var classe = new Array(); var fr = new Array(); var tam = 0;
	  tam = tamanho_global; var max = new Array(); var min = new Array();
	  for (var i = 0; i<tam; i++){
		  classe[i] = classe_global[i];
		  fr[i] = fr_global[i];
		  max[i] = maxI_global[i];
		  min[i] = minI_global[i];
	  }
	  
    var moda = new Array();
	
    /*calcula a adiciona a primeira posição*/
    limInferior = classe[1];
    qtde = fr[0];
    qtdeClasseAnterior = 0;
    if (classe.length > 1) {
        qtdeClassePosterior = fr[1];
    } else {
        qtdeClassePosterior = 0;
    }
    intervaloDeClasse = max[0] - min[0];
    calcModa = (limInferior + ((qtde - qtdeClasseAnterior) / ((qtde - qtdeClasseAnterior) + (qtde - qtdeClassePosterior))) * intervaloDeClasse);

    moda.push([classe[0], fr[0], calcModa]);
	
    /*percorre tabela verificando qual repete mais*/
    for (var i = 1; i < classe.length; i++) {
        var insere = false;
        if (fr[i] > moda[0][1]) {
            /*quando acha um maior, zera o array, e marca pra adicionar*/
            moda.splice(0, moda.length);
            insere = true;
        } else if (min[i] == moda[0][1]) {
            insere = true;
        }
        /*adiciona quando estiver marcado*/
        if (insere == true) {
            limInferior = min[i];
            qtde = classe[i];
            qtdeClasseAnterior = fr[(i - 1)];
            //se for o ultimo, posterior recebe 0
            if (i == (classe.length - 1)) {
                qtdeClassePosterior = 0;
            } else {
                qtdeClassePosterior = fr[(i + 1)];
            }
            calcModa = (limInferior + ((qtde - qtdeClasseAnterior) / ((qtde - qtdeClasseAnterior) + (qtde - qtdeClassePosterior)) * intervaloDeClasse));

            moda.push([classe[i], fr[i], calcModa]);
        }
    }
    /*se a moda tiver o mesmo tamanho que a tabela e amodal*/
    if (moda.length == classe.length) {
        moda.splice(0, classe.length);
    }
    document.getElementById('modaczub_cont').innerHTML = calcModa;
}
	
	
var amostra_global = 0; var populacao_global = 0;
function c_amostra(){//calculo da amostra simples 
		//variáveis
		var v_erro; var v_pop;
		
		// Get the value of the input field with id="v_erro" and id="v_pop"
		v_erro = parseFloat(document.getElementById("v_erro").value);
		v_pop = parseFloat(document.getElementById("v_pop").value);
		
		//cálculo
		var v_erroo = (v_erro/100);
		
		var v_amostra_inicial = 1/(Math.pow(v_erroo, 2));
		var v_amostra_final = (v_pop * v_amostra_inicial)/(v_pop + v_amostra_inicial);
		
		//exibir resultado
		document.getElementById("v_amostra_f").innerHTML = parseInt(v_amostra_final);
		amostra_global = v_amostra_final;
		populacao_global = v_pop;
}

function c_amostra_aleatoria(){//calculo da amostra aleatoria
	var x; var xi = [];
	var amostra_aleatoria = parseInt(amostra_global);
	var populacao_aleatoria = populacao_global;
	var sorteio = populacao_aleatoria - amostra_aleatoria;
	
	x = document.getElementById("xi_AmostraSimp").value;
	
	xi = x.split(",");
	
	var aleatorio = 0;
	var vetorDeAleatorios = [];

		for (var i = 0; i <=sorteio-1; i++){
			for (var j=0;j<=sorteio-1;j++ ){
				aleatorio = parseInt(Math.random()*xi.length); 
				if (vetorDeAleatorios[j] != xi[aleatorio]){
					vetorDeAleatorios[j] = xi[aleatorio]; //Acrescenta o valor a array
					
				}			
			}
		}
	
	//exibir resultado
	document.getElementById("v_amostra_sorteada").innerHTML = vetorDeAleatorios;
}

function c_amostra_estratificada(){//calculo da amostra estratificada
		//variáveis
		var amostra_estratificada = parseInt(amostra_global);
		var populacao_estratificada = populacao_global;
		
		var proporcao = 0; var estratos; var vetor_estratos = [];
		//cálculo
		proporcao = (amostra_estratificada/populacao_estratificada)*100;
		
		estratos = document.getElementById("grupos_AmostraEstra").value;
		
		vetor_estratos = estratos.split(",");
		
		var vetor_perc = []; var perc=0;
		for (var i = 0; i<vetor_estratos.length; i++){
			perc = parseInt(vetor_estratos[i]) * (proporcao/100);
			vetor_perc[i] = parseInt(perc);
			
		}
		
		
		//exibir resultado
		document.getElementById("v_proporcao").innerHTML = proporcao + "%";
		document.getElementById("v_estratos").innerHTML = vetor_perc;
		
}

function c_amostra_sistematica(){//calculo da amostra sistematica
	//variáveis
		var amostra_sistematica = parseInt(amostra_global);
		var populacao_sistematica = populacao_global;
		var sistema = 0;
		
		sistema = populacao_sistematica/amostra_sistematica;
		
		//exibir resultado
		document.getElementById("v_sistema").innerHTML = "Deverá ser retirado de " + parseInt(sistema) + " em " + parseInt(sistema);
		
		
}

function c_distribuicao_binomial(){//calculo da distribuição binomial
	var n = parseInt(document.getElementById("db_n").value);
	var valor_k = []; var k_aux1 = 0; var k_aux2 = 0; var k_resultante = 0; 
	var p = document.getElementById("db_p").value|0; 
	var q = document.getElementById("db_q").value|0; 
	p = p/100; q = q/100;
	
	var Prob = []; var analise_comb = []; var soma = 0; var sub = 0
	
	var opcao = document.getElementById("cboOpcoes").value;
	
	if (opcao == 1){//exatamente o numero
		valor_k[0] = parseInt(document.getElementById("db_exatamente").value);
		
	} else if (opcao == 2){//no minimo o numero ate valor maximo da amostra
		k_aux1 = parseInt(document.getElementById("db_minimo").value);
		k_resultante = n - k_aux1;
		k_resultante = k_resultante + 1;
		for (var i=0; i<k_resultante; i++){
			valor_k[i] = k_aux1 + (i);
		}
	} else if (opcao == 3){//no minimo 0 ate valor maximo
		k_aux1 = parseInt(document.getElementById("db_maximo").value);
		k_aux1 = k_aux1 + 1;
		for (var i=0; i<k_aux1; i++){
			valor_k[i] = i ;
		}
		
	} else if (opcao == 4){//entre um numero e outro numero
		k_aux1 = parseInt(document.getElementById("db_entre").value);
		k_aux2 = parseInt(document.getElementById("db_and").value);
		k_resultante = k_aux2 - k_aux1;
		
		k_resultante = k_resultante - 1;
		k_aux1 = k_aux1 + 1;
		k_aux2 = k_aux2 - 1;
		
		for (var i=0; i<k_resultante; i++){
			valor_k[i] = k_aux1 + (i);
		}		
	} else if (opcao == 5){//de um a outro (inclui o ultimo)
		k_aux2 = parseInt(document.getElementById("db_to").value);
		k_aux1 = parseInt(document.getElementById("db_de1").value);
		k_resultante = k_aux2 - k_aux1;
		k_aux2 = k_aux2 + 1;
		
		for (var i=0; i<k_resultante; i++){
			valor_k[i] = k_aux1 + i;
			
		}		
		valor_k[k_resultante] = k_aux2 - 1;
	} else if (opcao == 6){//de um ate outro (exclui o ultimo)
		k_aux1 = parseInt(document.getElementById("db_de2").value);
		k_aux2 = parseInt(document.getElementById("db_ate").value);
		k_resultante = k_aux2 - k_aux1;
		k_aux2 = k_aux2 + 1;
		
		for (var i=0; i<k_resultante; i++){
			valor_k[i] = k_aux1 + i;
			
		}		
	} 
	
	var media = 0; var variancia = 0; var desvio = 0; var coeficiente = 0;
	media = n*p; variancia = n*p*q; desvio = Math.sqrt(variancia); coeficiente = (desvio/media)*100; coeficiente = coeficiente.toFixed(2); coeficiente = coeficiente + "%";
	media = media.toFixed(2); desvio = desvio.toFixed(2); variancia = variancia.toFixed(2);
	document.getElementById("evento").innerHTML = valor_k;
	document.getElementById("media_db").innerHTML = media;
	document.getElementById("variancia_db").innerHTML = variancia;
	document.getElementById("desvio_db").innerHTML = desvio;
	document.getElementById("coeficiente_db").innerHTML = coeficiente;
	
	for (i=0; i<valor_k.length; i++){
		analise_comb[i] = factorial (n,valor_k[i]);
		var elev1 = Math.pow(p,valor_k[i]); sub = parseFloat(n - valor_k[i]);
		var elev2 = Math.pow(q,sub);
		Prob[i] =(elev1 * elev2);
		Prob[i] = Prob[i] * analise_comb[i] * 100;
		soma = soma + Prob[i];
		Prob[i] = Prob[i].toFixed(2);
		
	}
	
	soma = soma.toFixed(2); soma = soma + "%";
	
	for (i=0; i<valor_k.length; i++){
		Prob[i] = Prob[i] + "%";
	}
	document.getElementById("probabilidade").innerHTML = Prob;
	document.getElementById("probabilidade_total").innerHTML = soma;
	
}

function factorial (n,k){
	
	var x1 = 1; var x2 = 1; var x3=1;
	var combinatoria = 1;
	var x = n - k;
	
	var j = n //fatorial n -> n!
	for (var i=1;i<j;i++){
		x1 *= n;
		n--;
	}
	
	j = k //fatorial k -> k!
	for (i=1;i<j;i++){
		x2 *= k;
		k--;
	}
	
	j = x //fatorial (n-k) -> (n-k)!
	for (i=1;i<j;i++){
		x3 *= x;
		x--;
	}
	
	x2 *= x3; //k! * (n-k)!
	combinatoria = x1/x2; //n!/[k! * (n-k)!]
	return combinatoria;
}
var evento_global; 
//1- simples (Prob = 0.5 - z_trans; Prob *= 100; )
//2- sub (Prob = z_trans2 - z_trans1; Prob *= 100; )
//3- sum (Prob = z_trans2 + z_trans1; Prob *= 100; )
function c_distribuicao_normal(){//calculo da distribuição normal
	
	var media = parseFloat(document.getElementById("dn_media").value); 
	var desvio = parseFloat(document.getElementById("dn_desvio").value); 
	var z1 = 0; var z2;
	var opcao = document.getElementById("cboOpcoes_dn").value;
	
	if (opcao == 1){
		var x = parseFloat(document.getElementById("dn_x").value);
		z1 = (x - media)/desvio;
		z1 = z1.toFixed(2);
		z2 = " ";
		evento_global = "simples";
		
	} else if (opcao == 2){
		var x1 = parseFloat(document.getElementById("dn_x_sub1").value);
		var x2 = parseFloat(document.getElementById("dn_x_sub2").value);
		z1 = (x1 - media)/desvio;
		z1 = z1.toFixed(2);
		z2 = (x2 - media)/desvio;
		z2 = z2.toFixed(2);
		evento_global = "sub";
		
	} else if (opcao == 3){
		var x1 = parseFloat(document.getElementById("dn_x_sum1").value);
		var x2 = parseFloat(document.getElementById("dn_x_sum2").value);
		z1 = (x1 - media)/desvio;
		z1 = z1.toFixed(2);
		z2 = (x2 - media)/desvio;
		z2 = z2.toFixed(2);
		evento_global = "sum";
	
	}
	
	document.getElementById("z1_dn").innerHTML = z1;
	document.getElementById("z2_dn").innerHTML = z2;
}

function c_probabilidade_normal(){
	var evento = evento_global;
	var Prob = 0;
	var opcao = document.getElementById("cboOpcoes_z").value;

	if (opcao == 1){
		var z_trans = parseFloat(document.getElementById("dn_z_t").value);
		Prob = 0.5 - z_trans;
		Prob *= 100;
		Prob = Prob.toFixed(2);
		Prob += "%";
		
	} else if (opcao == 2){
		var z_trans1 = parseFloat(document.getElementById("dn_z1_t").value);
		var z_trans2 = parseFloat(document.getElementById("dn_z2_t").value);
		var z_trans1_sum = parseFloat(document.getElementById("dn_z1_t").value);
		var z_trans2_sum = parseFloat(document.getElementById("dn_z2_t").value);
		
		z_trans1 = 0.5 - z_trans1;
		z_trans2 = 0.5 - z_trans2;
		if (evento=="sub"){
			Prob = z_trans1 - z_trans2; 
			Prob *= 100; 
			Prob = Prob.toFixed(2);
			Prob += "%";
		}else if (evento=="sum"){
			Prob = z_trans2_sum + z_trans1_sum; 
			Prob *= 100; 
			Prob = Prob.toFixed(2);
			Prob += "%";
		}
	}
	
	document.getElementById("probabilidade_dn").innerHTML = Prob;
}

var perc_global = 0;
function c_calcular_z(){
	var perc = parseFloat(document.getElementById("perc_ic").value); 
	z = perc/100; z = z/2;
	
	document.getElementById("z1_ic").innerHTML = z;
	perc_global = perc;
}

function c_intervalo_confianca(){//calculo do intervalo de confiança
	var n = parseFloat(document.getElementById("n_ic").value); 
	
	var dp = parseFloat(document.getElementById("dp_ic").value); 
	var z_trans = parseFloat(document.getElementById("ic_z_t").value);
	var media = parseFloat(document.getElementById("media_ic").value); 
	var pop = 0; pop = pop_global; var erro_padrao; var intervalo; var ic1 = 0; var ic2 = 0;
	var perc = perc_global; var aux1 = 0; var aux2 = 0; var result = 0;
	if (pop_global==1){
		//calculo pop finita
		var populacao = parseFloat(document.getElementById("populacao_ic").value); 
		aux1 = populacao - n;
		aux2 = n - 1;
		result = aux1/aux2;
		result = Math.sqrt(result);
		n = Math.sqrt(n);
		erro_padrao = z_trans * (dp / n) * result;
		ic1 = media - erro_padrao;
		ic1 = ic1.toFixed(2);
		ic2 = media + erro_padrao;
		ic2 = ic2.toFixed(2);
		erro_padrao = erro_padrao.toFixed(2);
		
	} else if (pop_global==2){
		//calculo pop infinita
		n = Math.sqrt(n);
		erro_padrao = z_trans * dp / n;
		
		ic1 = media - erro_padrao;
		ic1 = ic1.toFixed(2);
		ic2 = media + erro_padrao;
		ic2 = ic2.toFixed(2);
		erro_padrao = erro_padrao.toFixed(2);
	}
	intervalo = "O intervalo de " + perc + "% de confiança é de " + ic1 + " à " + ic2;
	
	document.getElementById("erro_ic").innerHTML = erro_padrao;
	document.getElementById("ic").innerHTML = intervalo;
	
}


var corre = []; var corre2 = []; var M = 0, M2 = 0; var maxi; var pontos = [];
function Add(n){
	var i; var acumula = ""; var x;
	switch(n){
		case 1:
			i = parseFloat(document.getElementById ("dados").value);
			corre.push(i);
			for (x=0;x < corre.length; x++){
				acumula += corre[x] + "</br>";
				if (corre[x]> M ){
					M = corre[x];
				}
			}
			document.getElementById("addcor").innerHTML = acumula ;
			document.getElementById("totalcor").innerHTML = corre.length;
		break;
		case 2:
			i = parseFloat(document.getElementById ("dados2").value);
			corre2.push(i);
			for (x=0;x < corre2.length; x++){
				acumula += corre2[x] + "</br>";
				if (corre2[x]> M2 ){
					M2 = corre2[x];
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
function correlacao(){//calculo da correlação
	var n = corre.length;
	var somaxy = 0, somax=0,somay=0;
	var somax2=0,somay2=0;
	var i,r,resposta = "";
	var y,x,escrev=" "
	for(i=0;i<n;i++){
		somaxy += corre[i] * corre2[i];
		somax += corre[i];
		somay += corre2[i];
		somax2 += corre[i]**2;
		somay2 += corre2[i]**2;
	}
	r = (n * somaxy) - (somax * somay);
	r /= (((n*somax2)-(somax**2)) * ((n*somay2)-(somay**2)))**0.5;
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
		
		acor = (n *somaxy )- (somax * somay);
		acor /= (n*somax2) - (somax**2);
		y = somay/n;
		x = somax/n;
		bcor = y - (acor * x);
		
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
	r  = (acor * x) + bcor;
	document.getElementById("sub").innerHTML = parseFloat(r.toFixed(2));
}
function a(){ 
	var i;
	var equacao=[];
	for(i=0;i<corre.length;i++){
		pontos[i] = [corre[i],corre2[i]];
		equacao[i] = (acor * corre[i]) + bcor;
	}
	
	i = corre.length -1;
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
