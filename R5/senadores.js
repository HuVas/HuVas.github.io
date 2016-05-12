//Global variables

var width_sen = parseFloat(d3.select("#divHemi_sen").node().parentElement.clientWidth);
var height_sen = width_sen * 0.5208333333333333;
var radius_sen = width_sen / 2 - 16; //Math.min(width, height)/2;

var svg_sen = d3.select("#divHemi_sen")
    .append("svg")
    .attr("width", width_sen)
    .attr("height", height_sen)
    .attr("id", "hemi_sen")
    .attr("viewBox", function() {
        var currentWidth = d3.select(".tab-content").node().clientWidth;
        width_sen = parseFloat(currentWidth);
        height_sen = parseFloat(currentWidth * (parseFloat(height_sen) / parseFloat(width_sen)));
        return "0 0" + " " + width_sen + " " + height_sen;
    })
    .attr("preserveAspectRatio", "")
    .append("g")
    .attr("transform", "translate(" + width_sen / 2 + "," + (height_sen - 10) + ")");

//scroll
function scrollaTo_sen(h) {
    'use strict';
    var top = document.getElementById(h).offsetTop;
    window.scrollTo(0, top);
}



//DATA
//Fuerza is a constructor function.
var Fuerza_sen = function Fuerza_sen(AFIRMATIVO, NEGATIVO, ABSTENCION, AUSENTE) {
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
var CAMBIEMOS = new Fuerza_sen(0, 0, 0, 0);
var FPV_y_aliados = new Fuerza_sen(0, 0, 0, 0);
var OTROS = new Fuerza_sen(0, 0, 0, 0);
//var OTROS = new Fuerza_sen(0, 0, 0, 0);
var PJ_DISIDENTE = new Fuerza_sen(0, 0, 0, 0);
var FAP = new Fuerza_sen(0, 0, 0, 0);
var UNA = new Fuerza_sen(0, 0, 0, 0);

// Combinar en objeto
var FUERZAS_sen = {
    CAMBIEMOS: CAMBIEMOS,
    FPV_y_aliados: FPV_y_aliados,
    OTROS: OTROS,
    //OTROS: OTROS,
    PJ_DISIDENTE: PJ_DISIDENTE,
    FAP: FAP,
    UNA: UNA
};

var totAfirmativos_sen = 0;
var totNegativos_sen = 0;
var totAusentes_sen = 0;
var totAbstenciones_sen = 0;
var totVotaron_sen = 0;

//Toggle
/*function toggleHidden_sen(id) {
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

function changeElements_sen(id) {
    'use strict';
    $(".AFIRMATIVO").css("fill", "url(#diagonalHatch_sen)");
    $(".NEGATIVO").css("fill", "url(#diagonalHatch2_sen)");
    $(".ABSTENCION").css("fill", "url(#diagonalHatch3_sen)");
    $(".AUSENTE").css("fill", "url(#diagonalHatch4_sen)");
    $(".AFIRMATIVO").css("stroke", "#FFF");
    $(".NEGATIVO").css("stroke", "#FFF");
    $(".ABSTENCION").css("stroke", "#FFF");
    $(".AUSENTE").css("stroke", "#FFF");

    var af = document.getElementById(id + "_AFIRMATIVO_sen");
    af.style.fill = '#009BDB';
    var neg = document.getElementById(id + "_NEGATIVO_sen");
    neg.style.fill = '#DB002E';
    var ab = document.getElementById(id + "_ABSTENCION_sen");
    ab.style.fill = 'black';
    var au = document.getElementById(id + "_AUSENTE_sen");
    //if (au.style.fill!== undefined){ au.style.fill  = "red"};
    au.style.fill = '#808080';
    document.getElementById("afirma_sen").innerHTML = FUERZAS_sen[id].AFIRMATIVO;
    document.getElementById("negat_sen").innerHTML = FUERZAS_sen[id].NEGATIVO;
    document.getElementById("absten_sen").innerHTML = FUERZAS_sen[id].ABSTENCION;
    document.getElementById("ausen_sen").innerHTML = FUERZAS_sen[id].AUSENTE;
    var FUERZSUM = FUERZAS_sen[id].AFIRMATIVO + FUERZAS_sen[id].NEGATIVO + FUERZAS_sen[id].ABSTENCION + FUERZAS_sen[id].AUSENTE
    d3.select("#tot_sen").text(FUERZSUM);

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



    d3.select("#tot_tex_sen").text(id_tex);
    //document.getElementById("hemi_sen").getElementById("tot_sen").innerHTML = FUERZSUM;
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
        document.getElementById("afirma_sen").innerHTML = totAfirmativos_sen;
        document.getElementById("negat_sen").innerHTML = totNegativos_sen;
        document.getElementById("absten_sen").innerHTML = totAbstenciones_sen;
        document.getElementById("ausen_sen").innerHTML = totAusentes_sen;
        d3.select("#tot_sen").text(totVotaron_sen);
        d3.select("#tot_tex_sen").text("Total");
        //document.getElementById("hemi_sen").getElementById("tot_sen").innerHTML = totVotaron_sen;
    }, 10000);
}

function changeElementsOut_sen(id) {
    'use strict';
    $(".AFIRMATIVO").css("fill", "#009BDB");
    $(".NEGATIVO").css("fill", "#DB002E");
    $(".ABSTENCION").css("fill", "black");
    $(".AUSENTE").css("fill", "#808080");
    $(".AFIRMATIVO").css("stroke", "#009BDB");
    $(".NEGATIVO").css("stroke", "#DB002E");
    $(".ABSTENCION").css("stroke", "black");
    $(".AUSENTE").css("stroke", "#808080");
    var af = document.getElementById(id + "_AFIRMATIVO_sen");
    var neg = document.getElementById(id + "_NEGATIVO_sen");
    var ab = document.getElementById(id + "_ABSTENCION_sen");
    var au = document.getElementById(id + "_AUSENTE_sen");
    af.style.fill = "#009BDB";
    neg.style.fill = "#DB002E";
    ab.style.fill = "black";
    au.style.fill = "#808080";
    document.getElementById("afirma_sen").innerHTML = totAfirmativos_sen;
    document.getElementById("negat_sen").innerHTML = totNegativos_sen;
    document.getElementById("absten_sen").innerHTML = totAbstenciones_sen;
    document.getElementById("ausen_sen").innerHTML = totAusentes_sen;
    d3.select("#tot_sen").text(totVotaron_sen);
    d3.select("#tot_tex_sen").text("Total");
    //document.getElementById("hemi_sen").getElementById("tot_sen").innerHTML = totVotaron_sen;

}

//DEFER 
queue()
    .defer(d3.csv, "senadores_crudo.csv")
    .await(
        function(error, dataFromCSV_sen) {

            //var FUERZAS = {};
            'use strict';
            dataFromCSV_sen.forEach(function(sourceItem) {
                FUERZAS_sen[sourceItem.fuerza][sourceItem.voto] = FUERZAS_sen[sourceItem.fuerza][sourceItem.voto] + 1;
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
            var afirmativos_sen = resultObject(FUERZAS_sen, "AFIRMATIVO");

            var negativos_sen = resultObject(FUERZAS_sen, "NEGATIVO");

            var abstenciones_sen = resultObject(FUERZAS_sen, "ABSTENCION");

            var ausentes_sen = resultObject(FUERZAS_sen, "AUSENTE");



            //Ordenar
            afirmativos_sen = afirmativos_sen.sort(function(a, b) {
                return d3.descending(a.value, b.value);
            });

            negativos_sen = negativos_sen.sort(function(a, b) {
                return d3.descending(a.value, b.value);
            });
            abstenciones_sen = abstenciones_sen.sort(function(a, b) {
                return d3.descending(a.value, b.value);
            });
            ausentes_sen = ausentes_sen.sort(function(a, b) {
                return d3.descending(+a.value, +b.value);
            });
            //Unificar
            var votaron_sen = afirmativos_sen.concat(negativos_sen).concat(abstenciones_sen).concat(ausentes_sen);



            //Totales
            totAfirmativos_sen = resultSumador(afirmativos_sen);
            totNegativos_sen = resultSumador(negativos_sen);
            totAusentes_sen = resultSumador(ausentes_sen);
            totAbstenciones_sen = resultSumador(abstenciones_sen);
            totVotaron_sen = resultSumador(votaron_sen);
            //console.log(totVotaron_sen);



            //ORDENAR DATOS CASE INSENSITIVE
            dataFromCSV_sen.sort(function(a, b) {
                return d3.ascending(a.senador.toLowerCase(), b.senador.toLowerCase());
            });

            var tabl_sen = d3.select("#div3_sen").append("table").attr('id', 'laLista_sen').attr('class', 'tablaLista nu').append("thead");
            tabl_sen.append("tr");
            tabl_sen.append("td").attr('class', 'listaHead nu').html("Nº");
            tabl_sen.append("td").attr('class', 'listaHead').html("Senador");
            tabl_sen.append("td").attr('class', 'listaHead').html("Fuerza");
            //tabl_sen.append("td").attr('class', 'listaHead').html("Partido/Bloque");
            tabl_sen.append("td").attr('class', 'listaHead').html("Provincia");
            tabl_sen.append("td").attr('class', 'listaHead').html("Voto");


            var tabl2_sen = d3.select("#div3_sen").select("table").append("tbody");

            var tr_sen = tabl2_sen.selectAll('tr').data(dataFromCSV_sen).enter().append("tr").attr('class', 'trLista_sen');


            tr_sen.append("td").attr('class', 'index lista nu').html(function(d, i) {
                return pad_with_zeroes(i + 1, 2);
            });
            tr_sen.append("td").attr('class', 'diput lista').html(function(d, i) {
                return d.senador;
            });
            tr_sen.append("td").attr('class', 'fuer lista').html(function(d, i) {
                return d.fuerza;
            });
            /*tr_sen.append("td").attr('class', 'bloqu lista').html(function(d, i) {
                return d.partidoBloque;
            });*/
            tr_sen.append("td").attr('class', 'prov lista').html(function(d, i) {
                return d.provincia;
            });
            tr_sen.append("td").attr('class', 'vot lista').html(function(d, i) {
                return d.voto;
            });




            var color_sen = d3.scale.ordinal();
            //.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

            var arc_sen = d3.svg.arc()
                .outerRadius(radius_sen)
                .innerRadius(radius_sen / 3 + 10);

            var labelArc_sen = d3.svg.arc()
                .outerRadius(radius_sen - 40)
                .innerRadius(radius_sen - 40);

            var pie_sen = d3.layout.pie()
                .sort(null)
                .startAngle(-Math.PI / 2)
                .endAngle(Math.PI / 2)
                .value(function(d) {
                    return d.value;
                });

            var svg_sen = d3.select("svg#hemi_sen").select("g");


            svg_sen.append('defs')
                .append('pattern')
                .attr('id', 'diagonalHatch_sen')
                .attr('patternUnits', 'userSpaceOnUse')
                .attr('width', 4)
                .attr('height', 4)
                .append('path')
                .attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
                .attr('stroke', '#009BDB')
                .attr('stroke-width', 1);

            svg_sen.append('defs')
                .append('pattern')
                .attr('id', 'diagonalHatch2_sen')
                .attr('patternUnits', 'userSpaceOnUse')
                .attr('width', 4)
                .attr('height', 4)
                .append('path')
                .attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
                .attr('stroke', '#DB002E')
                .attr('stroke-width', 1);

            svg_sen.append('defs')
                .append('pattern')
                .attr('id', 'diagonalHatch3_sen')
                .attr('patternUnits', 'userSpaceOnUse')
                .attr('width', 4)
                .attr('height', 4)
                .append('path')
                .attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
                .attr('stroke', 'black')
                .attr('stroke-width', 1);

            svg_sen.append('defs')
                .append('pattern')
                .attr('id', 'diagonalHatch4_sen')
                .attr('patternUnits', 'userSpaceOnUse')
                .attr('width', 4)
                .attr('height', 4)
                .append('path')
                .attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
                .attr('stroke', '#808080')
                .attr('stroke-width', 1);


            var g_sen = svg_sen.selectAll(".arc")
                .data(pie_sen(votaron_sen))
                .enter().append("g")
                .attr("class", function(d) {
                    return "arc" + " " + d.data.tVoto + " " + d.data.forza;
                })
                .attr("id", function(d) {
                    return d.data.forza + "_" + d.data.tVoto + "_sen";
                });


            g_sen.append("path")
                .attr("d", arc_sen);

            g_sen.append("text")
                .attr("class", "svgText")
                .attr("id", "tot_tex_sen")
                .attr("transform", "translate(" + -0 + "," + -30 + ")")
                .text("");

            g_sen.append("text")
                .attr("class", "svgText2")
                .attr("id", "tot_sen")
                .attr("transform", "translate(" + -30 + "," + -0 + ")")
                .text("")

            g_sen.append("text")
                .attr("class", "svgText3")
                .attr("transform", "translate(" + 28 + "," + -0 + ")")
                .text("/ 72")


            g_dip.append("line")
                .attr("x1", "0")
                .attr("y1", "-30%")
                .attr("x2", "0%")
                .attr("y2", "-50%")
                .attr("stroke", "white")
                .attr("stroke-width", "1")
                .attr("stroke-dasharray", "5,5");



            document.getElementById("afirma_sen").innerHTML = totAfirmativos_sen;
            document.getElementById("negat_sen").innerHTML = totNegativos_sen;
            document.getElementById("absten_sen").innerHTML = totAbstenciones_sen;
            document.getElementById("ausen_sen").innerHTML = totAusentes_sen;
            d3.select("#tot_sen").text(totVotaron_sen);
            d3.select("#tot_tex_sen").text("Total");
            //document.getElementById("hemi_sen").getElementById("tot_sen").innerHTML = totVotaron_sen;


            //Botones
            //Cambiemos
            d3.select("#cam_sen")
                .on("click", function() {
                    //filter
                    var dataB = dataFromCSV_sen.filter(function(d) {
                        if (d.fuerza === "CAMBIEMOS") {
                            return d;
                        }
                    })
                    renderTabla(dataB);
                });
            //FPV
            d3.select("#fpv_sen")
                .on("click", function() {
                    //filter
                    var dataB = dataFromCSV_sen.filter(function(d) {
                        if (d.fuerza === "FPV_y_aliados") {
                            return d;
                        }
                    });
                    renderTabla(dataB);
                });
            //UNA
            d3.select("#una_sen")
                .on("click", function() {
                    //filter
                    var dataB = dataFromCSV_sen.filter(function(d) {
                        if (d.fuerza === "UNA") {
                            return d;
                        }
                    });
                    renderTabla(dataB);
                });
            //PJ disidente
            d3.select("#pjd_sen")
                .on("click", function() {
                    //filter
                    var dataB = dataFromCSV_sen.filter(function(d) {
                        if (d.fuerza === "PJ_DISIDENTE") {
                            return d;
                        }
                    });
                    renderTabla(dataB);
                });
            //FAP
            d3.select("#prg_sen")
                .on("click", function() {
                    //filter
                    var dataB = dataFromCSV_sen.filter(function(d) {
                        if (d.fuerza === "FAP") {
                            return d;
                        }
                    });
                    renderTabla(dataB);
                });
            //Otros
            d3.select("#izq_sen")
                .on("click", function() {
                    //filter
                    var dataB = dataFromCSV_sen.filter(function(d) {
                        if (d.fuerza === "OTROS") {
                            return d;
                        }
                    });
                    renderTabla(dataB);
                });
            //Otros
            d3.select("#otr_sen")
                .on("click", function() {
                    //filter
                    var dataB = dataFromCSV_sen.filter(function(d) {
                        if (d.fuerza === "OTROS") {
                            return d;
                        }
                    });
                    renderTabla(dataB);
                });

            //Todos
            d3.select("#all_sen")
                .on("click", function() {

                    renderTabla(dataFromCSV_sen);
                });
            //Todos2
            d3.select("#all2_sen")
                .on("click", function() {

                    renderTabla(dataFromCSV_sen);
                    //scrollaTo_sen('ancla_bottom_sen');
                });

            //Afirmativos
            d3.select("#afi_sen")
                .on("click", function() {
                    //filter
                    var dataB = dataFromCSV_sen.filter(function(d) {
                        if (d.voto === "AFIRMATIVO") {
                            return d;
                        }
                    });
                    renderTabla(dataB);
                    //scrollaTo_sen('ancla_bottom_sen');
                });


            //Negat
            d3.select("#neg_sen")
                .on("click", function() {

                    //filter
                    var dataB = dataFromCSV_sen.filter(function(d) {
                        if (d.voto === "NEGATIVO") {
                            return d;
                        }
                    });
                    renderTabla(dataB);
                    //scrollaTo_sen('ancla_bottom_sen');
                });


            //Ausente
            d3.select("#aus_sen")
                .on("click", function() {
                    //filter
                    var dataB = dataFromCSV_sen.filter(function(d) {
                        if (d.voto === "AUSENTE") {
                            return d;
                        }
                    });

                    renderTabla(dataB);
                    //scrollaTo_sen('ancla_bottom_sen');
                });

            //Abstencion
            d3.select("#abs_sen").on("click", function() {
                //filter
                var dataB = dataFromCSV_sen.filter(function(d) {
                    if (d.voto === "ABSTENCION") {
                        return d;
                    }
                });

                renderTabla(dataB);
                //scrollaTo('ancla_bottom_sen');
            });



            function renderTabla(dataB) {

                tabl_sen = d3.select("#div3_sen").select("table").remove();
                tabl_sen = d3.select("#pagination_sen").selectAll("*").remove();


                //UPDATE
                var tabl_sen = d3.select("#div3_sen").append("table").attr('id', 'laLista_sen').attr('class', 'tablaLista nu').append("thead");
                tabl_sen.append("tr");
                tabl_sen.append("td").attr('class', 'listaHead nu').html("Nº");
                tabl_sen.append("td").attr('class', 'listaHead').html("Senador");
                tabl_sen.append("td").attr('class', 'listaHead').html("Fuerza");
                //tabl_sen.append("td").attr('class', 'listaHead').html("Partido/Bloque");
                tabl_sen.append("td").attr('class', 'listaHead').html("Provincia");
                tabl_sen.append("td").attr('class', 'listaHead').html("Voto");


                var tabl2_sen = d3.select("#div3_sen").select("table").append("tbody");

                var tr_sen = tabl2_sen.selectAll('tr').data(dataB).enter().append("tr").attr('class', 'trLista_sen');


                tr_sen.append("td").attr('class', 'index lista nu').html(function(d, i) {
                    return pad_with_zeroes(i + 1, 2);
                });
                tr_sen.append("td").attr('class', 'diput lista').html(function(d, i) {
                    return d.senador;
                });
                tr_sen.append("td").attr('class', 'fuer lista').html(function(d, i) {
                    return d.fuerza;
                });
                /*tr_sen.append("td").attr('class', 'bloqu lista').html(function(d, i) {
                    return d.partidoBloque;
                });*/
                tr_sen.append("td").attr('class', 'prov lista').html(function(d, i) {
                    return d.provincia;
                });
                tr_sen.append("td").attr('class', 'vot lista').html(function(d, i) {
                    return d.voto;
                });
                //EXIT
                //d3.selectAll('tr').data(dataNegat).exit().remove();
                if (dataB.length === 0) {
                    tabl_sen.attr('style', 'width:478px;height:40em').append("tr").attr('class', 'trLista_sen').append("td").attr('style', 'width:475px;text-align:center').html("Sin datos");
                }



            }

            window.addEventListener('load', function() {
                d3.select("svg#hemi_sen")
                    .attr({
                        "width": function() {
                            var currentWidth = d3.select(".tab-content").node().clientWidth;
                            width_sen = parseFloat(currentWidth);
                            return width_sen;
                        },
                        "height": function() {
                            var currentWidth = d3.select(".tab-content").node().clientWidth;
                            height_sen = parseFloat(currentWidth * (parseFloat(height_sen) / parseFloat(width_sen)));
                            return height_sen;
                        },
                        "viewBox": function() {
                            var currentWidth = d3.select(".tab-content").node().clientWidth;
                            width_sen = parseFloat(currentWidth);
                            height_sen = parseFloat(currentWidth * (parseFloat(height_sen) / parseFloat(width_sen)));
                            return "0 0" + " " + width_sen + " " + height_sen;
                        },
                        "preserveAspectRatio": ""
                    });
            });

            window.addEventListener('resize', function() {
                d3.select("svg#hemi_sen")
                    .attr({
                        "width": function() {
                            var currentWidth = d3.select(".tab-content").node().clientWidth;
                            width_sen = parseFloat(currentWidth);
                            return width_sen;
                        },
                        "height": function() {
                            var currentWidth = d3.select(".tab-content").node().clientWidth;
                            height_sen = parseFloat(currentWidth * 0.5208333333333333);
                            return height_sen;
                        },
                        "preserveAspectRatio": ""
                    });
            });



        }
    );
