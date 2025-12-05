//© Copyright 2018 – Urheberrechtshinweis
//Alle Inhalte dieses INTERNETANGEBOTES /  WERKES}, insbesondere Code Texte, Grafiken, Geometrien,
//sind urheberrechtlich geschützt.Das Urheberrecht liegt, soweit nicht ausdrücklich anders gekennzeichnet, 
//bei Olaf Stolle. Bitte fragen Sie MICH , falls Sie die Inhalte dieses Internetangebotes verwenden möchten.
//    Unter der „Creative Commons“-Lizenz“ veröffentlichte Inhalte, sind als solche gekennzeichnet.Sie dürfen entsprechend den angegebenen Lizenzbedingungen verwendet werden.
//    Wer gegen das Urheberrecht verstößt(z.B.Bilder oder Texte unerlaubt kopiert), macht sich gem.§§ 106 ff UrhG strafbar, wird zudem kostenpflichtig abgemahnt und muss Schadensersatz leisten(§ 97 UrhG).

/*Style for layers*/

var stylelayer = {
    defecto: {
        color: '#000099',
        opacity: 1,
        fillcolor: '#000099',
        fillOpacity: 0.1,
        weight: 0.5
    },
    reset: {
        color: '#000099',
        opacity: 0.4,
        weight: 1
    },
    highlight: {
        weight: 5,
        color: '#0D8BE7',
        dashArray: '',
        fillOpacity: 0.7
    },
    selected: {
        color: 'blue',
        opacity: 0.3,
        weight: 0.5
    }

};



var Subregionen = new Array();
var zipcodes = new Object();
var arrayBounds = [];
var popupLayer;
var featuresSelected = [];
var corner1 = L.latLng(55.011047, 5.900053),
    corner2 = L.latLng(47.189324, 14.144367);
var d = new Date();
var n = d.getFullYear();



var map = L.map('map').setView([51.381380, 7.476959], 6);
// set source for map tiles


L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    //  maxZoom: 10,
    // minZoom: 6,
    attribution: "Copyright &copy; Olaf Stolle Alle Rechte vorbehalten 2018 bis " + n + " Vers. II"
}).addTo(map);



var regionen = new L.geoJson(false, {
    onEachFeature: onEachFeature
    , style: function (feature) {
        return {
            color: '#000099',
            opacity: 1,
            fillcolor: '#000099',
            fillOpacity: 0.1,
            weight: 0.5
        };
    }
});
regionen.addTo(map),
    drawGroup = L.geoJson().addTo(map),
    drawControl = new L.Control.Draw({
        edit: {
            featureGroup: drawGroup
        },
        draw: {
            circle: false,
            marker: false
        }
    }).addTo(map);

////////////////////////////////////////////////////////////////////////////////////////////
//draw event handlers//
////////////////////////////////////////////////////////////////////////////////////////////

map.on('draw:created', function (e) {
    //check for intersections between draw layer and base geometry

    //  var checked = crossCheck(polyLayer, e.layer);
    //add intersection points to map
    L.geoJson(checked).addTo(map);
    drawGroup.addLayer(e.layer);
});

map.on('overlayadd', function () {
    drawGroup.bringToFront();
});




var SUB = getUrlParameter('sub');

var geoURL = 'geojson/ahs_sub_smal.json';
// var geoURL =  'geojson/ahs_sub_15.json',
//var geoURL =  'geojson/ahs_sub_30.json',
//var geoURL =  'geojson/ahs_sub_50.json',
//var geoURL = 'geojson/ahs_sub_70.json',
//var geoURL = 'geojson/ahs_sub.json';


$.ajax({
    dataType: 'json',
    url: geoURL,

    success: function (data) {
        $(data.features).each(function (key, data) {
            regionen.addData(data);
            var name = data.properties.Name + " " + data.properties.Description;
            Subregionen.push(name);
            zipcodes[name] = data.properties.Name;
        });
        SUB.replace(", ", ";");
        SUB.replace(" ", ";");
        SUB.replace(";;", ";");

        if (SUB.length > 0) {

            var subs = SUB.split(';');

            for (var i = 0; i < subs.length; i++) {
                redraw(subs[i]);
            }

        }
    },
    error: function (response) {
        var r = jQuery.parseJSON(response.responseText);
        alert("Message: " + r.Message);
        alert("StackTrace: " + r.StackTrace);
        alert("ExceptionType: " + r.ExceptionType);
    }
});



//$(dokument).ready(function () {



//}); 

/*show info layers*/
var info = L.control({
    position: 'bottomleft'
});

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function (properties) {
    this._div.innerHTML = "<h4>Subregion </h4>" +
        (properties ? properties.Description : 'Mit der Maus ueber die Flaeche fahren');
};

info.addTo(map);

var detailsselected = L.control();
detailsselected.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info scroler');
    this.update();
    return this._div;
};



var detailshow = function () {
    var result = '';
    var total = 0;
    featuresSelected =  featuresSelected.sort(function (a, b) {
        if (a.zipcode < b.zipcode) { return -1; }
        if (a.zipcode > b.zipcode) { return 1; }
        return 0;
    })
    for (let i = 0; i < featuresSelected.length; i++) {

        const properties = featuresSelected[i].feature.properties;
        result +=
            // SubRegion: 
            properties.Name + "<br><a href='#' onclick=dellayer('" + properties.Name + "')>Delete</a><hr>"; //   

        total = featuresSelected.length;


    }
    return {
        result: result,
        total: total
    };
};

detailsselected.update = function (arrayselected) {

    const details = detailshow();
    this._div.innerHTML = "<button type='button' class='btn btn-light' onclick='RegionToClipboard()' >to Clipboard</button>  <br><b>Waehlen Sie Ihre Einsatzgebiete :" + details.total  + "</b><br>" + details.result ;
    $('#suma', window.parent.document).val(details.total);


};

detailsselected.addTo(map);

var help = L.control({
    position: 'topleft'
});

help.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'help leaflet-control');
    this.update();
    return this._div;
};

help.update = function (properties) {

    var te = "<!-- Button trigger modal --> " +
        "        <button type = 'button' class='btn btn-primary' data-toggle='modal' data-target='#myModalCenter'>Hilfe</button >" +
        "      <!--Modal -->         " +
        "<div class='modal fade' id='myModalCenter' tabindex='-1' role='dialog' aria-labelledby='myModalCenterTitle' aria-hidden='true' style='z-index: 2'> " +
        "            <div class='modal-dialog modal-dialog-centered' role='document'>                 " +
        "<div class='modal-content'>                     " +
        "'<div class='modal-header'>                         " +
        "<h5 class='modal-title' id='exampleModalLongTitle'>Einsatzgebiete</h5>                         " +
        "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>                             " +
        "<span aria-hidden='true'>×</span>                         " +
        "</button>                     " +
        "</div>                     " +
        "<div class='modal-body'>                         " +
        "<!-- Modal body -->                         " +
        "<div class='modal-body'>                            " +
        " <img src='doc/allianz.jpg' style='width: 100px' />                             " +
        "<p>                                 Handwerker Services GmbH                             </p>" +
        " " +
        "                           " +
        " " +
        "<p>                             </p>     " +
        "                        <p>                                 diese Seite soll Sie unterst&uuml;tzen Ihr Einsatzgebiet zu &uuml;bermitteln.                             </p> " +
        "                            <p>                                 Durch ausw&#228;hlen dieser Gebiete definieren Sie Ihr Einsatzgebiet.                             </p> " +
        "                            <p>                                 gehen Sie dazu folgender weise vor:                             </p>                             " +
        "<p>                                 1. Links oben Search : suchen Sie Ihren Standort                             </p>                            " +
        " <p>                                 2. W&#228;hlen Sie durch Mausklick die Regeionen aus in denen Sie Arbeiten m&#246;chten                             </p> " +
        "                            <p>                                 3. Klicken Sie auf den Button Daten Senden                             </p>  " +
        "                           <p>                                 es sollte nun Ihr eigenes mail programm aufgehen und Sie senden die Mail an:                             </p>  " +
        "                           <p>                                 <a href='mailto:Info.dlk@allianz-handwerker.de'>Info.dlk@allianz-handwerker.de</a>                             </p> " +
        "                            <p>Mit freundlichen Gr&#252;&#223;en </p>                             <p>Olaf Stolle</p>                         </div>                        " +
        " <!--</div>-->                          " +
        "<!-- Modal footer -->                         " +
        "<div class='modal-footer'>                         " +
        "<button type='button' class='btn btn-danger' data-dismiss='modal' autofocus>Close</button> " +
        "                     </div>                  </div>             </div>         </div>";


    this._div.innerHTML = te;
};

help.addTo(map);

$('#myModalCenter').on('shown.bs.modal',
    function () {
        $('.modal-backdrop').slideUp(1500).delay(1500);

    });

var hochauflosung = L.control({
    position: 'topleft'
});

hochauflosung.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'hochaufloesend leaflet-control');
    this.update();
    return this._div;
};

hochauflosung.update = function (properties) {
    this._div.innerHTML = "<button type='button' class='btn btn-success'  onclick='hochaufloesend(0)' data-target='#myhochauflosung'>Hochaufl&ouml;sende Regionen</button >";
};

hochauflosung.addTo(map);

function hochaufloesend( val) {

    alert('dat dauert jetzt a Bissel');
    var geoURL = "";
switch (val) {
    case 1:
        // Anweisungen werden ausgeführt,
        // falls expression mit value1 übereinstimmt
          geoURL = 'geojson/Oestereich.json';
        break;
    case 2:
        // Anweisungen werden ausgeführt,
        // falls expression mit value2 übereinstimmt

          geoURL = 'geojson/Schweiz.json';
        break;
    default:
        // Anweisungen werden ausgeführt,
        // falls keine der case-Klauseln mit expression übereinstimmt
          geoURL = 'geojson/ahs_sub.json';

        break;
}

///

Subregionen = [];

regionen.clearLayers();


$.ajax({
    dataType: 'json',
    url: geoURL,

    success: function (data) {
        $(data.features).each(function (key, data) {
            regionen.addData(data);
            var name = data.properties.Name + " " + data.properties.Description;

            Subregionen.push(name);
            zipcodes[name] = data.properties.Name;
        });
        if (SUB.length > 0) {

            var subs = SUB.split(';');

            for (var i = 0; i < subs.length; i++) {
                redraw(subs[i]);
            }

        }
    },
    error: function (response) {
        var r = jQuery.parseJSON(response.responseText);
        alert("Message: " + r.Message);
        alert("StackTrace: " + r.StackTrace);
        alert("ExceptionType: " + r.ExceptionType);
    }
});





alert('fertig');
}


document.addEventListener("keydown", function (e) {

    console.log(e.altKey + "_" + e.keyCode);
    //e.preventDefault();

    if ((e.keyCode === 79 && e.which === 79) && e.altKey) {
        //console.log("das war es");
        hochaufloesend(1);

    }

    if ((e.keyCode === 83 && e.which === 83) && e.altKey) {
        //console.log("das war es");
        hochaufloesend(2);

    }



});

var kmradius = L.control({
    position: 'topleft'
});

kmradius.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'kmradius leaflet-control');
    this.update();
    return this._div;
};

kmradius.update = function () {
    this._div.innerHTML = "<label>KM Radius einstellung</label> <br/>" +
        "<select id='kmradius'>" +
        "<option selected = 'selected' value='35000'> 35 KM</option >" +
        "<option value='0'> 0 KM</option>" +
        "<option value='15000'> 15 KM</option >" +
        "<option value='45000'> 45 KM</option>" +
        "<option value='50000'> 50 KM</option >" +
        "<option value='60000'> 60 KM</option>" +
        "<option value='75000'> 75 KM</option >" +
        "<option value='100000'> 100 KM</option></select>";
};

kmradius.addTo(map);
/// Suche der adresse
var geocoder = L.Control.geocoder({
    position: 'topleft',
    placeholder: 'Suche PLZ Adresse',
    collapsed: false
}).addTo(map);




function dellayer(Name) {
    regionen.eachLayer(function (layer) {
        if (Name.includes(layer.feature.properties.Name)) {
            selectTypeaheadFeature(layer);
        }
    });
}


$('.leaflet-marker-pane').on('click',
    function (p) {
        console.log(p);

    });

var geojson = L.geoJson(Subregionen, {
    style: stylelayer.defecto,
    onEachFeature: onEachFeature
}).addTo(map);

/* regonen auswahl */
$('#places').typeahead({
    source: Subregionen,
    afterSelect: function (b) {
        redraw(b);
    }
});

function redraw(b) {
    regionen.eachLayer(function (layer) {

        if (b.includes(layer.feature.properties.Name)) {
            selectTypeaheadFeature(layer);
        }

    });
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
        //dblclick : selectFeature
    });
}

function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle(stylelayer.highlight);
    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    var layer = e.target;
    var feature = e.target.feature;
    if (checkExistsLayers(feature)) {
        setStyleLayer(layer, stylelayer.highlight);
    } else {
        setStyleLayer(layer, stylelayer.defecto);
    }
    /* Para agregar evento al la capa y mostrar detalles */
    /* popupLayer.on('mouseout', function(e) {
                this.closePopup();
            })*/
}

function zoomToFeature(e) {

    var layer = e.target;
    var feature = e.target.feature;

    if (checkExistsLayers(feature)) {
        removerlayers(feature, setStyleLayer, layer, stylelayer.defecto);
        removeBounds(layer);

    } else {
        addLayers(feature, setStyleLayer, layer, stylelayer.highlight);
        addBounds(layer);
    }
    map.fitBounds(arrayBounds);
    detailsselected.update(featuresSelected);

}

function selectTypeaheadFeature(layer) {
    // var layer = layer;
    var feature = layer.feature;

    if (checkExistsLayers(feature)) {
        removerlayers(feature, setStyleLayer, layer, stylelayer.defecto);

        removeBounds(layer);

    } else {
        addLayers(feature, setStyleLayer, layer, stylelayer.highlight);
        addBounds(layer);
    }
    map.fitBounds(arrayBounds.length !== 0 ? arrayBounds : initbounds);
    detailsselected.update(featuresSelected);

}

var initbounds = L.latLngBounds(corner1, corner2);

function addBounds(layer) {
    arrayBounds.push(layer.getBounds());
}

function removeBounds(layer) {
    arrayBounds = arrayBounds.filter(bounds => bounds !== layer.getBounds());
}

function setStyleLayer(layer, styleSelected) {
    layer.setStyle(styleSelected);
}

function removerlayers(feature, callback) {
    featuresSelected = featuresSelected.filter(obj => obj.zipcode !== feature.properties.Name);
    featuresSelected = featuresSelected.sort(function (a, b) {
        if (a.zipcode < b.zipcode) { return -1; }
        if (a.zipcode > b.zipcode) { return 1; }
        return 0;
    })
    callback(arguments[2], arguments[3]);
}

function addLayers(feature, callback) {
    featuresSelected.push({
        zipcode: feature.properties.Name,
        feature: feature
    });
    callback(arguments[2], arguments[3]);
}

function checkExistsLayers(feature) {
    var result = false;
    featuresSelected = featuresSelected.sort(function (a, b) {
        if (a.zipcode < b.zipcode) { return -1; }
        if (a.zipcode > b.zipcode) { return 1; }
        return 0;
    })

    for (var i = 0; i < featuresSelected.length; i++) {
        if (featuresSelected[i].zipcode === feature.properties.Name) {
            result = true;
            break;
        }

    }
    return result;
}


/// mailversand 
function getToMAil() {
    var linbreak = '%0D';
    //  line break in jscript escape('\n\n')

    var sLink = "mailto:Info.dlk@allianz-handwerker.de?subject=Vertragsgebiete Ihre Partnernummer: 80....... &body=Sehr geehrte Damen und Herren,%0Aanbei unser Einsatzgebiet nach Subregionen:" + escape("\n\n");

    featuresSelected = featuresSelected.sort(function (a, b) {
        if (a.zipcode < b.zipcode) { return -1; }
        if (a.zipcode > b.zipcode) { return 1; }
        return 0;
    })

    for (var item in featuresSelected) {
        sLink += featuresSelected[item].zipcode + escape('\n');
    }



    sLink += "Ihre Kontaktdaten: und Ihre Partnernummer waeren hier gut " + escape("\n\n");


    window.location.href = (sLink);

}

/// lese url aus 
function getUrlParameter(par) {

    var value = '';

    var UrlParameter = window.location.search;

    if (UrlParameter !== '') {

        var i = UrlParameter.indexOf(par + '=');

        if (i >= 0) {

            i = i + par.length + 1;

            var k = UrlParameter.indexOf('&', i);

            if (k < 0) {

                k = UrlParameter.length;

            }

            value = UrlParameter.substring(i, k);

            for (i = 0; i < value.length; i++) {

                if (value.charAt(i) === '+') {

                    value = value.substring(0, i) + " " + value.substring(i + 1, value.length);
                }
            }
            value = unescape(value);
        }
    }
    return value;

}


function RegionToClipboard() {

    var sLink = "https://sub.hwwh.eu/?sub=";
    featuresSelected = featuresSelected.sort(function (a, b) {
        if (a.zipcode < b.zipcode) { return -1; }
        if (a.zipcode > b.zipcode) { return 1; }
        return 0;
    })
    for (var item in featuresSelected) {
        sLink += featuresSelected[item].zipcode + ";";
    }
    copyTextToClipboard(sLink);
    alert("Daten ans Clipboard uebergeben \r\n  "+sLink );
}
function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";  //avoid scrolling to bottom
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function () {
        console.log('Async: Copying to clipboard was successful!');
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
    });
}

 