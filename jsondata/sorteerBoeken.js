// JSON importeren

let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    sorteerBoekObj.data = JSON.parse(this.responseText);
    sorteerBoekObj.sorteren();
  }
}
xmlhttp.open('GET', "boeken.json", true);
xmlhttp.send();

// een tabelkop in markup uitvoeren uit een array
const maakTabelKop = (arr) => {
  let kop = "<table class='boekSelectie'><tr>";
  arr.forEach((item) => {
    kop += "<th>" + item + "</th>";
  });
  kop += "</tr>";
  return kop;
}
const maakTabelRij = (arr, accent) => {
  let rij = "<tr class='boekSelectie__rij'>";
  arr.forEach((item) => {
    rij += "<td class='boekSelectie__data-cel'>" + item + "</td>";
  });
  rij += "</tr>";
  return rij;
}

// object dat de boeken uitvoert en sorteert en data bevat
let sorteerBoekObj = {
  data: "", // komt van xmlhttp.onreadystatechange

  // data sorteren
  sorteren: function() {
    this.data.sort( (a,b) => a.titel > b.titel ? 1 : -1 );
    this.uitvoeren(this.data);
  },

  // de data in een tabel uitvoeren
  uitvoeren: function(data) {
    let uitvoer = maakTabelKop(
      ["titel",
      "auteur(s)",
      "cover",
      "uitgave",
      "bladzijden",
      "taal",
      "EAN"]);
    for( let i=0; i<data.length; i++) {
      let imgElement = "<img src='" + data[i].cover +"' class='boekSelectie__cover' alt='" +data[i].titel+ "'>";
      uitvoer += maakTabelRij(
        [data[i].titel,
        data[i].auteur[0],
        imgElement ,
        data[i].uitgave,
        data[i].paginas,
        data[i].taal,
        data[i].ean]);
    }
    document.getElementById('uitvoer').innerHTML = uitvoer;
  }
}
