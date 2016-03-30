function ocultar() {
        var hid = document.getElementById("diputados");
        hid.setAttribute("hidden", "hidden")
    }

//scroll
function scrollaTo(h) {
    'use strict';
    var top = document.getElementById(h).offsetTop;
    window.scrollTo(0, top);
}
//pagination
function pagination() {
    'use strict';
    var req_num_row = 8;
    var $tr = jQuery(".trLista");
    var total_num_row = $tr.length;
    var num_pages = 0;
    if (total_num_row % req_num_row === 0) {
        num_pages = total_num_row / req_num_row;
    }
    if (total_num_row % req_num_row >= 1) {
        num_pages = total_num_row / req_num_row;
        num_pages++;
        num_pages = Math.floor(num_pages++);
    }
    for (var i = 1; i <= num_pages; i++) {
        jQuery('#pagination').append(" " + "<a>" + i + "</a>" + " ");
    }
    $tr.each(function(i) {
        jQuery(this).hide();
        if (i + 1 <= req_num_row) {
            $tr.eq(i).show();
        }

    });
    jQuery('#pagination a').click(function(e) {
        e.preventDefault();
        $tr.hide();
        var page = jQuery(this).text();
        var temp = page - 1;
        var start = temp * req_num_row;
        //alert(start);
        var i;
        for (i = 0; i < req_num_row; i++) {

            $tr.eq(start + i).show();

        }
        scrollaTo('ancla_bottom');
    });
}
//end pagination

//DATA
//Fuerza is a constructor function.
var Fuerza = function Fuerza(AFIRMATIVO, NEGATIVO, ABSTENCION, AUSENTE) {
    /* "this" below is the new object that is being created (i.e., this = new Object();) */
    'use strict';
    this.AFIRMATIVO = AFIRMATIVO;
    this.NEGATIVO = NEGATIVO;
    this.ABSTENCION = ABSTENCION;
    this.AUSENTE = AUSENTE;
    /* when the function is called with the new keyword "this" is returned
    instead of undefined */
};
// instantiate a Fuerza object named cambiemos
var CAMBIEMOS = new Fuerza(0, 0, 0, 0);
var FPV_y_aliados = new Fuerza(0, 0, 0, 0);
var IZQUIERDA = new Fuerza(0, 0, 0, 0);
var OTROS = new Fuerza(0, 0, 0, 0);
var PJ_DISIDENTE = new Fuerza(0, 0, 0, 0);
var PROGRESISTAS = new Fuerza(0, 0, 0, 0);
var UNA = new Fuerza(0, 0, 0, 0);

// Combinar en objeto
var FUERZAS = {
    CAMBIEMOS: CAMBIEMOS,
    FPV_y_aliados: FPV_y_aliados,
    IZQUIERDA: IZQUIERDA,
    OTROS: OTROS,
    PJ_DISIDENTE: PJ_DISIDENTE,
    PROGRESISTAS: PROGRESISTAS,
    UNA: UNA
};

var totAfirmativos = 0;
var totNegativos = 0;
var totAusentes = 0;
var totAbstenciones = 0;
var totVotaron = 0;

//Toggle
function toggleHidden(id) {
    'use strict';
    var elem = document.getElementById(id);
    if (elem.hasAttribute("hidden")) {
        elem.removeAttribute("hidden");
        setTimeout(function() {
            elem.setAttribute("hidden", "hidden");
        }, 20000);
    } else {
        elem.setAttribute("hidden", "hidden");
    }
}

//Formatear con ceros
function pad_with_zeroes(number, length) {
    'use strict';
    var my_string = '' + number;
    while (my_string.length < length) {
        my_string = '0' + my_string;
    }
    return my_string;

}

function changeElements(id) {
    'use strict';
    $(".AFIRMATIVO").css("fill", "url(#diagonalHatch_sen)");
    $(".NEGATIVO").css("fill", "url(#diagonalHatch2_sen)");
    $(".ABSTENCION").css("fill", "url(#diagonalHatch3_sen)");
    $(".AUSENTE").css("fill", "url(#diagonalHatch4_sen)");
    $(".AFIRMATIVO").css("stroke", "#FFF");
    $(".NEGATIVO").css("stroke", "#FFF");
    $(".ABSTENCION").css("stroke", "#FFF");
    $(".AUSENTE").css("stroke", "#FFF");

    var af = document.getElementById(id + "_AFIRMATIVO");
    af.style.fill = '#009BDB';
    var neg = document.getElementById(id + "_NEGATIVO");
    neg.style.fill = '#DB002E';
    var ab = document.getElementById(id + "_ABSTENCION");
    ab.style.fill = 'black';
    var au = document.getElementById(id + "_AUSENTE");
    //if (au.style.fill!== undefined){ au.style.fill  = "red"};
    au.style.fill = '#808080';
    document.getElementById("afirma").innerHTML = FUERZAS[id].AFIRMATIVO;
    document.getElementById("negat").innerHTML = FUERZAS[id].NEGATIVO;
    document.getElementById("absten").innerHTML = FUERZAS[id].ABSTENCION;
    document.getElementById("ausen").innerHTML = FUERZAS[id].AUSENTE;
    document.getElementById("tot").innerHTML = FUERZAS[id].AFIRMATIVO + FUERZAS[id].NEGATIVO + FUERZAS[id].ABSTENCION + FUERZAS[id].AUSENTE;
    setTimeout(function() {
        $(".AFIRMATIVO").css("fill", "#009BDB");
        $(".NEGATIVO").css("fill", "#DB002E");
        $(".ABSTENCION").css("fill", "black");
        $(".AUSENTE").css("fill", "#808080");
        $(".AFIRMATIVO").css("stroke", "#009BDB");
        $(".NEGATIVO").css("stroke", "#DB002E");
        $(".ABSTENCION").css("stroke", "black");
        $(".AUSENTE").css("stroke", "#808080");
        af.style.fill = "#009BDB";
        neg.style.fill = "#DB002E";
        ab.style.fill = "black";
        au.style.fill = "#808080";
        document.getElementById("afirma").innerHTML = totAfirmativos;
        document.getElementById("negat").innerHTML = totNegativos;
        document.getElementById("absten").innerHTML = totAbstenciones;
        document.getElementById("ausen").innerHTML = totAusentes;
        document.getElementById("tot").innerHTML = totVotaron;
    }, 20000);
}


function changeElementsOut(id) {
    'use strict';
    $(".AFIRMATIVO").css("fill", "#009BDB");
    $(".NEGATIVO").css("fill", "#DB002E");
    $(".ABSTENCION").css("fill", "black");
    $(".AUSENTE").css("fill", "#808080");
    $(".AFIRMATIVO").css("stroke", "#009BDB");
    $(".NEGATIVO").css("stroke", "#DB002E");
    $(".ABSTENCION").css("stroke", "black");
    $(".AUSENTE").css("stroke", "#808080");
    var af = document.getElementById(id + "_AFIRMATIVO");
    var neg = document.getElementById(id + "_NEGATIVO");
    var ab = document.getElementById(id + "_ABSTENCION");
    var au = document.getElementById(id + "_AUSENTE");
    af.style.fill = "#009BDB";
    neg.style.fill = "#DB002E";
    ab.style.fill = "black";
    au.style.fill = "#808080";
    document.getElementById("afirma").innerHTML = totAfirmativos;
    document.getElementById("negat").innerHTML = totNegativos;
    document.getElementById("absten").innerHTML = totAbstenciones;
    document.getElementById("ausen").innerHTML = totAusentes;
    document.getElementById("tot").innerHTML = totVotaron;

}

//Request con d3

var archivo = d3.csv("datos_diputados_16_03_2016.csv", function(dataFromCSV) {






    //var FUERZAS = {};
    'use strict';
    dataFromCSV.forEach(function(sourceItem) {
        FUERZAS[sourceItem.fuerza][sourceItem.voto] = FUERZAS[sourceItem.fuerza][sourceItem.voto] + 1;
    });

    //Arrays
    function resultObject(obj, tvoto) {
        var arr = [];
        var prop;
        for (prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                arr.push({
                    forza: prop,
                    tVoto: tvoto,
                    value: obj[prop][tvoto]
                });
            }
        }
        return arr; // returns array
    }
    //Sumador de resultados
    function resultSumador(obj) {
        var tot = 0;
        var i;
        for (i = 0; i < obj.length; i++) {
            tot = tot + parseFloat(obj[i].value);
        }
        //tot       value: obj[prop][tvoto]
        return tot;
    }

    //Agrupar resultados
    var afirmativos = resultObject(FUERZAS, "AFIRMATIVO");

    var negativos = resultObject(FUERZAS, "NEGATIVO");

    var abstenciones = resultObject(FUERZAS, "ABSTENCION");

    var ausentes = resultObject(FUERZAS, "AUSENTE");

    //Ordenar
    afirmativos = afirmativos.sort(function(a, b) {
        return d3.descending(a.value, b.value);
    });

    negativos = negativos.sort(function(a, b) {
        return d3.descending(a.value, b.value);
    });
    abstenciones = abstenciones.sort(function(a, b) {
        return d3.descending(a.value, b.value);
    });
    ausentes = ausentes.sort(function(a, b) {
        return d3.descending(+a.value, +b.value);
    });
    //Unificar
    var votaron = afirmativos.concat(negativos).concat(abstenciones).concat(ausentes);

    //Totales
    totAfirmativos = resultSumador(afirmativos);
    totNegativos = resultSumador(negativos);
    totAusentes = resultSumador(ausentes);
    totAbstenciones = resultSumador(abstenciones);
    totVotaron = resultSumador(votaron);


    //ORDENAR DATOS CASE INSENSITIVE
    dataFromCSV.sort(function(a, b) {
        return d3.ascending(a.diputado.toLowerCase(), b.diputado.toLowerCase());
    });

    var tabl = d3.select("#div3").append("table").attr('id', 'laLista').attr('class', 'tablaLista').append("thead");
    tabl.append("tr").attr('id', 'listaHeadTr');
    tabl.append("td").attr('class', 'listaHead').html("Nº");
    tabl.append("td").attr('class', 'listaHead').html("Diputado");
    tabl.append("td").attr('class', 'listaHead').html("Fuerza");
    tabl.append("td").attr('class', 'listaHead').html("Partido/Bloque");
    tabl.append("td").attr('class', 'listaHead').html("Provincia");
    tabl.append("td").attr('class', 'listaHead').html("Voto");


    var tabl2 = d3.select("#div3").select("table").append("tbody");

    var tr = tabl2.selectAll('tr').data(dataFromCSV).enter().append("tr").attr('class', 'trLista');


    tr.append("td").attr('class', 'index lista').html(function(d, i) {
        return pad_with_zeroes(i + 1, 2);
    });
    tr.append("td").attr('class', 'diput lista').html(function(d, i) {
        return d.diputado;
    });
    tr.append("td").attr('class', 'fuer lista').html(function(d, i) {
        return d.fuerza;
    });
    tr.append("td").attr('class', 'bloqu lista').html(function(d, i) {
        return d.partidoBloque;
    });
    tr.append("td").attr('class', 'prov lista').html(function(d, i) {
        return d.provincia;
    });
    tr.append("td").attr('class', 'vot lista').html(function(d, i) {
        return d.voto;
    });


    var width = 480,
        height = 250,
        radius = width / 2 - 16; //Math.min(width, height)/2;

    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var arc = d3.svg.arc()
        .outerRadius(radius + 5)
        .innerRadius(radius / 3 + 10);

    var labelArc = d3.svg.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

    var pie = d3.layout.pie()
        .sort(null)
        .startAngle(-Math.PI / 2)
        .endAngle(Math.PI / 2)
        .value(function(d) {
            return d.value;
        });



    var svg = d3.select("#divHemi")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("id", "hemi")
        //.attr("viewBox", "750 0 2500 2500")
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + (height - 10) + ")");

    svg.append('defs')
        .append('pattern')
        .attr('id', 'diagonalHatch')
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 4)
        .attr('height', 4)
        .append('path')
        .attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
        .attr('stroke', '#009BDB')
        .attr('stroke-width', 1);

    svg.append('defs')
        .append('pattern')
        .attr('id', 'diagonalHatch2')
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 4)
        .attr('height', 4)
        .append('path')
        .attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
        .attr('stroke', '#DB002E')
        .attr('stroke-width', 1);

    svg.append('defs')
        .append('pattern')
        .attr('id', 'diagonalHatch3')
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 4)
        .attr('height', 4)
        .append('path')
        .attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
        .attr('stroke', 'black')
        .attr('stroke-width', 1);

    svg.append('defs')
        .append('pattern')
        .attr('id', 'diagonalHatch4')
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 4)
        .attr('height', 4)
        .append('path')
        .attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
        .attr('stroke', '#808080')
        .attr('stroke-width', 1);


    var g = svg.selectAll(".arc")
        .data(pie(votaron))
        .enter().append("g")
        .attr("class", function(d) {
            return "arc" + " " + d.data.tVoto + " " + d.data.forza;
        })
        .attr("id", function(d) {
            return d.data.forza + "_" + d.data.tVoto;
        });


    g.append("path")
        .attr("d", arc);

    g.append("text")
        .attr("class", "svgText")
        .attr("transform", "translate(" + -0 + "," + -30 + ")")
        .text("Total");

    g.append("text")
        .attr("class", "svgText2")
        .attr("id", "tot")
        .attr("transform", "translate(" + -30 + "," + -0 + ")")
        .text("")

    g.append("text")
        .attr("class", "svgText3")
        .attr("transform", "translate(" + 30 + "," + -0 + ")")
        .text("/ 257")

    g.append("line")
        .attr("x1", "0")
        .attr("y1", "-83")
        .attr("x2", "0")
        .attr("y2", "-120")
        .attr("stroke", "white")
        .attr("stroke-width", "1")
        .attr("stroke-dasharray", "5,5");



    document.getElementById("afirma").innerHTML = totAfirmativos;
    document.getElementById("negat").innerHTML = totNegativos;
    document.getElementById("absten").innerHTML = totAbstenciones;
    document.getElementById("ausen").innerHTML = totAusentes;
    document.getElementById("tot").innerHTML = totVotaron;



    /*<line x1="0" y1="0" x2="200" y2="200" style="stroke:rgb(255,0,0);stroke-width:2" /> stroke-dasharray="5,5"*/


    /*g.append("text")
        //.attr("transform", "translate(" + -radius + "," + -radius + ")")
        .attr("dx", "-30px")
        .attr("dy", "0")
        .attr("class","result")
        .text("270");*/

    //pagination request
    /*jQuery('document').ready(function() {
        pagination();
    });*/

    //Botones
    //Cambiemos
    d3.select("#cam")
        .on("click", function() {
            //filter
            var dataB = dataFromCSV.filter(function(d) {
                if (d.fuerza === "CAMBIEMOS") {
                    return d;
                }
            })
            renderTabla(dataB);
        });
    //FPV
    d3.select("#fpv")
        .on("click", function() {
            //filter
            var dataB = dataFromCSV.filter(function(d) {
                if (d.fuerza === "FPV_y_aliados") {
                    return d;
                }
            });
            renderTabla(dataB);
        });
    //UNA
    d3.select("#una")
        .on("click", function() {
            //filter
            var dataB = dataFromCSV.filter(function(d) {
                if (d.fuerza === "UNA") {
                    return d;
                }
            });
            renderTabla(dataB);
        });
    //PJ disidente
    d3.select("#pjd")
        .on("click", function() {
            //filter
            var dataB = dataFromCSV.filter(function(d) {
                if (d.fuerza === "PJ_DISIDENTE") {
                    return d;
                }
            });
            renderTabla(dataB);
        });
    //Progresistas
    d3.select("#prg")
        .on("click", function() {
            //filter
            var dataB = dataFromCSV.filter(function(d) {
                if (d.fuerza === "PROGRESISTAS") {
                    return d;
                }
            });
            renderTabla(dataB);
        });
    //Izquierda
    d3.select("#izq")
        .on("click", function() {
            //filter
            var dataB = dataFromCSV.filter(function(d) {
                if (d.fuerza === "IZQUIERDA") {
                    return d;
                }
            });
            renderTabla(dataB);
        });
    //Otros
    d3.select("#otr")
        .on("click", function() {
            //filter
            var dataB = dataFromCSV.filter(function(d) {
                if (d.fuerza === "OTROS") {
                    return d;
                }
            });
            renderTabla(dataB);
        });

    //Todos
    d3.select("#all")
        .on("click", function() {

            renderTabla(dataFromCSV);
        });
    //Todos2
    d3.select("#all2")
        .on("click", function() {

            renderTabla(dataFromCSV);
            //scrollaTo('ancla_bottom');
        });

    //Afirmativos
    d3.select("#afi")
        .on("click", function() {
            //filter
            var dataB = dataFromCSV.filter(function(d) {
                if (d.voto === "AFIRMATIVO") {
                    return d;
                }
            });
            renderTabla(dataB);
            //scrollaTo('ancla_bottom');
        });


    //Negat
    d3.select("#neg")
        .on("click", function() {

            //filter
            var dataB = dataFromCSV.filter(function(d) {
                if (d.voto === "NEGATIVO") {
                    return d;
                }
            });
            renderTabla(dataB);
            //scrollaTo('ancla_bottom');
        });


    //Ausente
    d3.select("#aus")
        .on("click", function() {
            //filter
            var dataB = dataFromCSV.filter(function(d) {
                if (d.voto === "AUSENTE") {
                    return d;
                }
            });

            renderTabla(dataB);
            //scrollaTo('ancla_bottom');
        });

    //Abstencion
    d3.select("#abs").on("click", function() {
        //filter
        var dataB = dataFromCSV.filter(function(d) {
            if (d.voto === "ABSTENCION") {
                return d;
            }
        });

        renderTabla(dataB);
        //scrollaTo('ancla_bottom');
    });



    function renderTabla(dataB) {

        tabl = d3.select("#div3").select("table").remove();
        tabl = d3.select("#pagination").selectAll("*").remove();


        //UPDATE
        var tabl = d3.select("#div3").append("table").attr('id', 'laLista').attr('class', 'tablaLista').append("thead");
        tabl.append("tr");
        tabl.append("td").attr('class', 'listaHead').html("Nº");
        tabl.append("td").attr('class', 'listaHead').html("Diputado");
        tabl.append("td").attr('class', 'listaHead').html("Fuerza");
        tabl.append("td").attr('class', 'listaHead').html("Partido/Bloque");
        tabl.append("td").attr('class', 'listaHead').html("Provincia");
        tabl.append("td").attr('class', 'listaHead').html("Voto");


        var tabl2 = d3.select("#div3").select("table").append("tbody");

        var tr = tabl2.selectAll('tr').data(dataB).enter().append("tr").attr('class', 'trLista');


        tr.append("td").attr('class', 'index lista').html(function(d, i) {
            return pad_with_zeroes(i + 1, 2);
        });
        tr.append("td").attr('class', 'diput lista').html(function(d, i) {
            return d.diputado;
        });
        tr.append("td").attr('class', 'fuer lista').html(function(d, i) {
            return d.fuerza;
        });
        tr.append("td").attr('class', 'bloqu lista').html(function(d, i) {
            return d.partidoBloque;
        });
        tr.append("td").attr('class', 'prov lista').html(function(d, i) {
            return d.provincia;
        });
        tr.append("td").attr('class', 'vot lista').html(function(d, i) {
            return d.voto;
        });
        //EXIT
        //d3.selectAll('tr').data(dataNegat).exit().remove();
        if (dataB.length === 0) {
            tabl.attr('style', 'width:478px;height:40em').append("tr").attr('class', 'trLista').append("td").attr('style', 'width:475px;text-align:center').html("Sin datos");
        }


        /*jQuery('document').ready(function() {
            pagination();
        });
        tabl = d3.select("#pagination").append("a").attr('id', 'ancla_bottom');*/



    } //END renderTabla
    //Resize svg * Juan Pablo Kutianski
    var svg = d3.select("svg#hemi").attr({

            "width": function() {
                return this.clientWidth || this.parentElement.clientWidth;
            },
            "height": function() {
                return this.clientHeight || this.parentElement.clientHeight;
            },
            "viewBox": function() {

                return "0 0 " +
                    (this.clientWidth || this.parentElement.clientWidth) + " " +
                    (this.clientHeight || this.parentElement.clientHeight);
            }
        }),
        width = parseFloat(svg.attr("width")),
        height = parseFloat(svg.attr("height"));

    window.addEventListener('load', function() {
        svg.attr({
            "width": function() {
                return this.parentElement.clientWidth;
            },
            "height": function() {

                var currentWidth = this.parentElement.clientWidth
                console.log("1 " + " " + currentWidth + " " + height + " " + width);
                return parseFloat(currentWidth * (parseFloat(height) / parseFloat(width)));
            }
        });
        width = parseFloat(svg.attr("width"));
        height = parseFloat(svg.attr("height"));
    });

    window.addEventListener('resize', function() {
        svg.attr({
            "width": function() {

                return this.parentElement.clientWidth;
            },
            "height": function() {

                var currentWidth = this.parentElement.clientWidth

                return parseFloat(currentWidth * (parseFloat(height) / parseFloat(width)));
            }
        });
        width = parseFloat(svg.attr("width"));
        height = parseFloat(svg.attr("height"));
    });
    
});
ocultar();