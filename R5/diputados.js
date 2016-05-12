//Global variables

var width_dip = parseFloat(d3.select("#divHemi_dip").node().parentElement.clientWidth);
var height_dip = width_dip * 0.5208333333333333;
var radius_dip = width_dip / 2 - 16; //Math.min(width, height)/2;

var svg_dip = d3.select("#divHemi_dip")
    .append("svg")
    .attr("width", width_dip)
    .attr("height", height_dip)
    .attr("id", "hemi_dip")
    .attr("viewBox", function() {
        var currentWidth = d3.select(".tab-content").node().clientWidth;
        width_dip = parseFloat(currentWidth);
        height_dip = parseFloat(currentWidth * (parseFloat(height_dip) / parseFloat(width_dip)));
        return "0 0" + " " + width_dip + " " + height_dip;
    })
    .attr("preserveAspectRatio", "")
    .append("g")
    .attr("transform", "translate(" + width_dip / 2 + "," + (height_dip - 10) + ")");

//scroll
function scrollaTo_dip(h) {
    'use strict';
    var top = document.getElementById(h).offsetTop;
    window.scrollTo(0, top);
}

//DATA
//Fuerza is a constructor function.
var Fuerza_dip = function Fuerza_dip(AFIRMATIVO, NEGATIVO, ABSTENCION, AUSENTE) {
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
var CAMBIEMOS = new Fuerza_dip(0, 0, 0, 0);
var FPV_y_aliados = new Fuerza_dip(0, 0, 0, 0);
var OTROS = new Fuerza_dip(0, 0, 0, 0);
//var OTROS = new Fuerza_dip(0, 0, 0, 0);
var PJ_DISIDENTE = new Fuerza_dip(0, 0, 0, 0);
var FAP = new Fuerza_dip(0, 0, 0, 0);
var UNA = new Fuerza_dip(0, 0, 0, 0);

// Combinar en objeto
var FUERZAS_dip = {
    CAMBIEMOS: CAMBIEMOS,
    FPV_y_aliados: FPV_y_aliados,
    OTROS: OTROS,
    //OTROS: OTROS,
    PJ_DISIDENTE: PJ_DISIDENTE,
    FAP: FAP,
    UNA: UNA
};

var totAfirmativos_dip = 0;
var totNegativos_dip = 0;
var totAusentes_dip = 0;
var totAbstenciones_dip = 0;
var totVotaron_dip = 0;

//Toggle
/*function toggleHidden_dip(id) {
    'use strict';
    var elem = document.getElementById(id);
    if (elem.hasAttribute("hidden")) {
        elem.removeAttribute("hidden");
        setTimeout(function() {
            elem.setAttribute("hidden", "hidden");
        }, 60000);
    } else {
        elem.setAttribute("hidden", "hidden");
    }
}*/

//Formatear con ceros
function pad_with_zeroes(number, length) {
    'use strict';
    var my_string = '' + number;
    while (my_string.length < length) {
        my_string = '0' + my_string;
    }
    return my_string;

}

function changeElements_dip(id) {
    'use strict';
    $(".AFIRMATIVO").css("fill", "url(#diagonalHatch_dip)");
    $(".NEGATIVO").css("fill", "url(#diagonalHatch2_dip)");
    $(".ABSTENCION").css("fill", "url(#diagonalHatch3_dip)");
    $(".AUSENTE").css("fill", "url(#diagonalHatch4_dip)");
    $(".AFIRMATIVO").css("stroke", "#FFF");
    $(".NEGATIVO").css("stroke", "#FFF");
    $(".ABSTENCION").css("stroke", "#FFF");
    $(".AUSENTE").css("stroke", "#FFF");

    var af = document.getElementById(id + "_AFIRMATIVO_dip");
    af.style.fill = '#009BDB';
    var neg = document.getElementById(id + "_NEGATIVO_dip");
    neg.style.fill = '#DB002E';
    var ab = document.getElementById(id + "_ABSTENCION_dip");
    ab.style.fill = 'black';
    var au = document.getElementById(id + "_AUSENTE_dip");
    //if (au.style.fill!== undefined){ au.style.fill  = "red"};
    au.style.fill = '#808080';
    document.getElementById("afirma_dip").innerHTML = FUERZAS_dip[id].AFIRMATIVO;
    document.getElementById("negat_dip").innerHTML = FUERZAS_dip[id].NEGATIVO;
    document.getElementById("absten_dip").innerHTML = FUERZAS_dip[id].ABSTENCION;
    document.getElementById("ausen_dip").innerHTML = FUERZAS_dip[id].AUSENTE;
    var FUERZSUM = FUERZAS_dip[id].AFIRMATIVO + FUERZAS_dip[id].NEGATIVO + FUERZAS_dip[id].ABSTENCION + FUERZAS_dip[id].AUSENTE
    d3.select("#tot_dip").text(FUERZSUM);

    var id_tex = "Total"

    //Texto del total
    switch (id) {
        case "CAMBIEMOS":
            id_tex = "Cambiemos";
            break;
        case "FPV_y_aliados":
            id_tex = "FPV y aliados";
            break;
        case "UNA":
            id_tex = "UNA";
            break;
        case "PJ_DISIDENTE":
            id_tex = "PJ disidente";
            break;
        case "FAP":
            id_tex = "FAP";
            break;
        case "OTROS":
            id_tex = "Otros";
            break;
        default:
            id_tex = "Total";
    }



    d3.select("#tot_tex_dip").text(id_tex);
    //document.getElementById("hemi_dip").getElementById("tot_dip").innerHTML = FUERZSUM;
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
        document.getElementById("afirma_dip").innerHTML = totAfirmativos_dip;
        document.getElementById("negat_dip").innerHTML = totNegativos_dip;
        document.getElementById("absten_dip").innerHTML = totAbstenciones_dip;
        document.getElementById("ausen_dip").innerHTML = totAusentes_dip;
        d3.select("#tot_dip").text(totVotaron_dip);
        d3.select("#tot_tex_dip").text("Total");
        //document.getElementById("hemi_dip").getElementById("tot_dip").innerHTML = totVotaron_dip;
    }, 10000);
}

function changeElementsOut_dip(id) {
    'use strict';
    $(".AFIRMATIVO").css("fill", "#009BDB");
    $(".NEGATIVO").css("fill", "#DB002E");
    $(".ABSTENCION").css("fill", "black");
    $(".AUSENTE").css("fill", "#808080");
    $(".AFIRMATIVO").css("stroke", "#009BDB");
    $(".NEGATIVO").css("stroke", "#DB002E");
    $(".ABSTENCION").css("stroke", "black");
    $(".AUSENTE").css("stroke", "#808080");
    var af = document.getElementById(id + "_AFIRMATIVO_dip");
    var neg = document.getElementById(id + "_NEGATIVO_dip");
    var ab = document.getElementById(id + "_ABSTENCION_dip");
    var au = document.getElementById(id + "_AUSENTE_dip");
    af.style.fill = "#009BDB";
    neg.style.fill = "#DB002E";
    ab.style.fill = "black";
    au.style.fill = "#808080";
    document.getElementById("afirma_dip").innerHTML = totAfirmativos_dip;
    document.getElementById("negat_dip").innerHTML = totNegativos_dip;
    document.getElementById("absten_dip").innerHTML = totAbstenciones_dip;
    document.getElementById("ausen_dip").innerHTML = totAusentes_dip;
    d3.select("#tot_dip").text(totVotaron_dip);
    d3.select("#tot_tex_dip").text("Total");
    //document.getElementById("hemi_dip").getElementById("tot_dip").innerHTML = totVotaron_dip;

}

//DEFER 
queue()
    .defer(d3.csv, "senadores_crudo.csv")
    .await(
        function(error, dataFromCSV_dip) {

            //var FUERZAS = {};
            'use strict';
            dataFromCSV_dip.forEach(function(sourceItem) {
                FUERZAS_dip[sourceItem.fuerza][sourceItem.voto] = FUERZAS_dip[sourceItem.fuerza][sourceItem.voto] + 1;
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
                //console.log(tot);
                return tot;
            }

            //Agrupar resultados
            var afirmativos_dip = resultObject(FUERZAS_dip, "AFIRMATIVO");

            var negativos_dip = resultObject(FUERZAS_dip, "NEGATIVO");

            var abstenciones_dip = resultObject(FUERZAS_dip, "ABSTENCION");

            var ausentes_dip = resultObject(FUERZAS_dip, "AUSENTE");



            //Ordenar
            afirmativos_dip = afirmativos_dip.sort(function(a, b) {
                return d3.descending(a.value, b.value);
            });

            negativos_dip = negativos_dip.sort(function(a, b) {
                return d3.descending(a.value, b.value);
            });
            abstenciones_dip = abstenciones_dip.sort(function(a, b) {
                return d3.descending(a.value, b.value);
            });
            ausentes_dip = ausentes_dip.sort(function(a, b) {
                return d3.descending(+a.value, +b.value);
            });
            //Unificar
            var votaron_dip = afirmativos_dip.concat(negativos_dip).concat(abstenciones_dip).concat(ausentes_dip);



            //Totales
            totAfirmativos_dip = resultSumador(afirmativos_dip);
            totNegativos_dip = resultSumador(negativos_dip);
            totAusentes_dip = resultSumador(ausentes_dip);
            totAbstenciones_dip = resultSumador(abstenciones_dip);
            totVotaron_dip = resultSumador(votaron_dip);
            //console.log(totVotaron_dip);



            //ORDENAR DATOS CASE INSENSITIVE
            dataFromCSV_dip.sort(function(a, b) {
                return d3.ascending(a.senador.toLowerCase(), b.senador.toLowerCase());
            });

            var tabl_dip = d3.select("#div3_dip").append("table").attr('id', 'laLista_dip').attr('class', 'tablaLista nu').append("thead");
            tabl_dip.append("tr");
            tabl_dip.append("td").attr('class', 'listaHead nu').html("Nº");
            tabl_dip.append("td").attr('class', 'listaHead').html("Senador");
            tabl_dip.append("td").attr('class', 'listaHead').html("Fuerza");
            //tabl_dip.append("td").attr('class', 'listaHead').html("Partido/Bloque");
            tabl_dip.append("td").attr('class', 'listaHead').html("Provincia");
            tabl_dip.append("td").attr('class', 'listaHead').html("Voto");


            var tabl2_dip = d3.select("#div3_dip").select("table").append("tbody");

            var tr_dip = tabl2_dip.selectAll('tr').data(dataFromCSV_dip).enter().append("tr").attr('class', 'trLista_dip');


            tr_dip.append("td").attr('class', 'index lista nu').html(function(d, i) {
                return pad_with_zeroes(i + 1, 2);
            });
            tr_dip.append("td").attr('class', 'diput lista').html(function(d, i) {
                return d.senador;
            });
            tr_dip.append("td").attr('class', 'fuer lista').html(function(d, i) {
                return d.fuerza;
            });
            /*tr_dip.append("td").attr('class', 'bloqu lista').html(function(d, i) {
                return d.partidoBloque;
            });*/
            tr_dip.append("td").attr('class', 'prov lista').html(function(d, i) {
                return d.provincia;
            });
            tr_dip.append("td").attr('class', 'vot lista').html(function(d, i) {
                return d.voto;
            });




            var color_dip = d3.scale.ordinal();
            //.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

            var arc_dip = d3.svg.arc()
                .outerRadius(radius_dip)
                .innerRadius(radius_dip / 3 + 10);

            var labelArc_dip = d3.svg.arc()
                .outerRadius(radius_dip - 40)
                .innerRadius(radius_dip - 40);

            var pie_dip = d3.layout.pie()
                .sort(null)
                .startAngle(-Math.PI / 2)
                .endAngle(Math.PI / 2)
                .value(function(d) {
                    return d.value;
                });

            var svg_dip = d3.select("svg#hemi_dip").select("g");


            svg_dip.append('defs')
                .append('pattern')
                .attr('id', 'diagonalHatch_dip')
                .attr('patternUnits', 'userSpaceOnUse')
                .attr('width', 4)
                .attr('height', 4)
                .append('path')
                .attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
                .attr('stroke', '#009BDB')
                .attr('stroke-width', 1);

            svg_dip.append('defs')
                .append('pattern')
                .attr('id', 'diagonalHatch2_dip')
                .attr('patternUnits', 'userSpaceOnUse')
                .attr('width', 4)
                .attr('height', 4)
                .append('path')
                .attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
                .attr('stroke', '#DB002E')
                .attr('stroke-width', 1);

            svg_dip.append('defs')
                .append('pattern')
                .attr('id', 'diagonalHatch3_dip')
                .attr('patternUnits', 'userSpaceOnUse')
                .attr('width', 4)
                .attr('height', 4)
                .append('path')
                .attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
                .attr('stroke', 'black')
                .attr('stroke-width', 1);

            svg_dip.append('defs')
                .append('pattern')
                .attr('id', 'diagonalHatch4_dip')
                .attr('patternUnits', 'userSpaceOnUse')
                .attr('width', 4)
                .attr('height', 4)
                .append('path')
                .attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
                .attr('stroke', '#808080')
                .attr('stroke-width', 1);


            var g_dip = svg_dip.selectAll(".arc")
                .data(pie_dip(votaron_dip))
                .enter().append("g")
                .attr("class", function(d) {
                    return "arc" + " " + d.data.tVoto + " " + d.data.forza;
                })
                .attr("id", function(d) {
                    return d.data.forza + "_" + d.data.tVoto + "_dip";
                });


            g_dip.append("path")
                .attr("d", arc_dip);

            g_dip.append("text")
                .attr("class", "svgText")
                .attr("id", "tot_tex_dip")
                .attr("transform", "translate(" + -0 + "," + -30 + ")")
                .text("");

            g_dip.append("text")
                .attr("class", "svgText2")
                .attr("id", "tot_dip")
                .attr("transform", "translate(" + -30 + "," + -0 + ")")
                .text("")

            g_dip.append("text")
                .attr("class", "svgText3")
                .attr("transform", "translate(" + 28 + "," + -0 + ")")
                .text("/ 257")


            g_dip.append("line")
                .attr("x1", "0")
                .attr("y1", "-30%")
                .attr("x2", "0%")
                .attr("y2", "-50%")
                .attr("stroke", "white")
                .attr("stroke-width", "1")
                .attr("stroke-dasharray", "5,5");



            document.getElementById("afirma_dip").innerHTML = totAfirmativos_dip;
            document.getElementById("negat_dip").innerHTML = totNegativos_dip;
            document.getElementById("absten_dip").innerHTML = totAbstenciones_dip;
            document.getElementById("ausen_dip").innerHTML = totAusentes_dip;
            d3.select("#tot_dip").text(totVotaron_dip);
            d3.select("#tot_tex_dip").text("Total");
            //document.getElementById("hemi_dip").getElementById("tot_dip").innerHTML = totVotaron_dip;


            //Botones
            //Cambiemos
            d3.select("#cam_dip")
                .on("click", function() {
                    //filter
                    var dataB = dataFromCSV_dip.filter(function(d) {
                        if (d.fuerza === "CAMBIEMOS") {
                            return d;
                        }
                    })
                    renderTabla(dataB);
                });
            //FPV
            d3.select("#fpv_dip")
                .on("click", function() {
                    //filter
                    var dataB = dataFromCSV_dip.filter(function(d) {
                        if (d.fuerza === "FPV_y_aliados") {
                            return d;
                        }
                    });
                    renderTabla(dataB);
                });
            //UNA
            d3.select("#una_dip")
                .on("click", function() {
                    //filter
                    var dataB = dataFromCSV_dip.filter(function(d) {
                        if (d.fuerza === "UNA") {
                            return d;
                        }
                    });
                    renderTabla(dataB);
                });
            //PJ disidente
            d3.select("#pjd_dip")
                .on("click", function() {
                    //filter
                    var dataB = dataFromCSV_dip.filter(function(d) {
                        if (d.fuerza === "PJ_DISIDENTE") {
                            return d;
                        }
                    });
                    renderTabla(dataB);
                });
            //FAP
            d3.select("#prg_dip")
                .on("click", function() {
                    //filter
                    var dataB = dataFromCSV_dip.filter(function(d) {
                        if (d.fuerza === "FAP") {
                            return d;
                        }
                    });
                    renderTabla(dataB);
                });
            //Otros
            d3.select("#izq_dip")
                .on("click", function() {
                    //filter
                    var dataB = dataFromCSV_dip.filter(function(d) {
                        if (d.fuerza === "OTROS") {
                            return d;
                        }
                    });
                    renderTabla(dataB);
                });
            //Otros
            d3.select("#otr_dip")
                .on("click", function() {
                    //filter
                    var dataB = dataFromCSV_dip.filter(function(d) {
                        if (d.fuerza === "OTROS") {
                            return d;
                        }
                    });
                    renderTabla(dataB);
                });

            //Todos
            d3.select("#all_dip")
                .on("click", function() {

                    renderTabla(dataFromCSV_dip);
                });
            //Todos2
            d3.select("#all2_dip")
                .on("click", function() {

                    renderTabla(dataFromCSV_dip);
                    //scrollaTo_dip('ancla_bottom_dip');
                });

            //Afirmativos
            d3.select("#afi_dip")
                .on("click", function() {
                    //filter
                    var dataB = dataFromCSV_dip.filter(function(d) {
                        if (d.voto === "AFIRMATIVO") {
                            return d;
                        }
                    });
                    renderTabla(dataB);
                    //scrollaTo_dip('ancla_bottom_dip');
                });


            //Negat
            d3.select("#neg_dip")
                .on("click", function() {

                    //filter
                    var dataB = dataFromCSV_dip.filter(function(d) {
                        if (d.voto === "NEGATIVO") {
                            return d;
                        }
                    });
                    renderTabla(dataB);
                    //scrollaTo_dip('ancla_bottom_dip');
                });


            //Ausente
            d3.select("#aus_dip")
                .on("click", function() {
                    //filter
                    var dataB = dataFromCSV_dip.filter(function(d) {
                        if (d.voto === "AUSENTE") {
                            return d;
                        }
                    });

                    renderTabla(dataB);
                    //scrollaTo_dip('ancla_bottom_dip');
                });

            //Abstencion
            d3.select("#abs_dip").on("click", function() {
                //filter
                var dataB = dataFromCSV_dip.filter(function(d) {
                    if (d.voto === "ABSTENCION") {
                        return d;
                    }
                });

                renderTabla(dataB);
                //scrollaTo('ancla_bottom_dip');
            });



            function renderTabla(dataB) {

                tabl_dip = d3.select("#div3_dip").select("table").remove();
                tabl_dip = d3.select("#pagination_dip").selectAll("*").remove();


                //UPDATE
                var tabl_dip = d3.select("#div3_dip").append("table").attr('id', 'laLista_dip').attr('class', 'tablaLista nu').append("thead");
                tabl_dip.append("tr");
                tabl_dip.append("td").attr('class', 'listaHead nu').html("Nº");
                tabl_dip.append("td").attr('class', 'listaHead').html("Senador");
                tabl_dip.append("td").attr('class', 'listaHead').html("Fuerza");
                //tabl_dip.append("td").attr('class', 'listaHead').html("Partido/Bloque");
                tabl_dip.append("td").attr('class', 'listaHead').html("Provincia");
                tabl_dip.append("td").attr('class', 'listaHead').html("Voto");


                var tabl2_dip = d3.select("#div3_dip").select("table").append("tbody");

                var tr_dip = tabl2_dip.selectAll('tr').data(dataB).enter().append("tr").attr('class', 'trLista_dip');


                tr_dip.append("td").attr('class', 'index lista nu').html(function(d, i) {
                    return pad_with_zeroes(i + 1, 2);
                });
                tr_dip.append("td").attr('class', 'diput lista').html(function(d, i) {
                    return d.senador;
                });
                tr_dip.append("td").attr('class', 'fuer lista').html(function(d, i) {
                    return d.fuerza;
                });
                /*tr_dip.append("td").attr('class', 'bloqu lista').html(function(d, i) {
                    return d.partidoBloque;
                });*/
                tr_dip.append("td").attr('class', 'prov lista').html(function(d, i) {
                    return d.provincia;
                });
                tr_dip.append("td").attr('class', 'vot lista').html(function(d, i) {
                    return d.voto;
                });
                //EXIT
                //d3.selectAll('tr').data(dataNegat).exit().remove();
                if (dataB.length === 0) {
                    tabl_dip.attr('style', 'width:478px;height:40em').append("tr").attr('class', 'trLista_dip').append("td").attr('style', 'width:475px;text-align:center').html("Sin datos");
                }



            }

            window.addEventListener('load', function() {
                d3.select("svg#hemi_dip")
                    .attr({
                        "width": function() {
                            var currentWidth = d3.select(".tab-content").node().clientWidth;
                            width_dip = parseFloat(currentWidth);
                            return width_dip;
                        },
                        "height": function() {
                            var currentWidth = d3.select(".tab-content").node().clientWidth;
                            height_dip = parseFloat(currentWidth * (parseFloat(height_dip) / parseFloat(width_dip)));
                            return height_dip;
                        },
                        "viewBox": function() {
                            var currentWidth = d3.select(".tab-content").node().clientWidth;
                            width_dip = parseFloat(currentWidth);
                            height_dip = parseFloat(currentWidth * (parseFloat(height_dip) / parseFloat(width_dip)));
                            console.log("dip " +"0 0" + " " + width_dip + " " + height_dip);
                            return "0 0" + " " + width_dip + " " + height_dip;
                        },
                        "preserveAspectRatio": ""
                    });
            });

            window.addEventListener('resize', function() {
                d3.select("svg#hemi_dip")
                    .attr({
                        "width": function() {
                            var currentWidth = d3.select(".tab-content").node().clientWidth;
                            width_dip = parseFloat(currentWidth);
                            return width_dip;
                        },
                        "height": function() {
                            var currentWidth = d3.select(".tab-content").node().clientWidth;
                            height_dip = parseFloat(currentWidth * 0.5208333333333333);
                            return height_dip;
                        },
                        "preserveAspectRatio": ""
                    });
            });

            
        }
        
    );
$('#sena_tab').click();
$('#dipu_tab').click();
