var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();

  request.open("GET", url);

  request.addEventListener("load", callback);

  request.send();
}

var populateList = function(beers){

  var select = document.getElementById('beer-list');
  beers.forEach(function(beer, index){

    var option = document.createElement('option');
    option.innerText = beer.name;
    option.value = index;
    select.appendChild(option);
  });

}

var requestComplete = function(){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  var beers = JSON.parse(jsonString);
  populateList(beers);
}

var app = function(){
  var url = "https://api.punkapi.com/v2/beers"
  makeRequest(url, requestComplete)
}

window.addEventListener('load', app);
