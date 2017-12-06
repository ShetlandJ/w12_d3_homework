var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();

  request.open("GET", url);

  request.addEventListener("load", callback);

  request.send();
}

var requestComplete = function(){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  var beers = JSON.parse(jsonString);
  populateList(beers);
}

// Beer Select populator

var populateList = function(beers){
  beers.forEach(function(beer, index){
    this.createElementAndSetContent('beer-list', beer.name, index, 'option');
  });

  var dropDown = document.querySelector('select');

  dropDown.addEventListener("change", function(){
    var selectedBeer = beers[this.value]
    beerInfo(selectedBeer);
  });
}

var beerInfo = function(beer){
  this.setElementAndSetContent('beer-details', beer.name, 0, 'beer-name')
  this.setImage('beer-details', "<img src=" + beer.image_url + " style='height: 250px'>", 0, 'beer-image')
    this.setElementAndSetContent('beer-details', "Malts: " + beerIngredientsMalt(beer), 0, 'malt')
    this.setElementAndSetContent('beer-details', "Hops: " + beerIngredientsHops(beer), 0, 'hops')
    this.setElementAndSetContent('beer-details', "Yeast: " +beer.ingredients.yeast, 0, 'yeast')

};

var beerIngredientsMalt = function(beer){
  maltIngredients = [];
  for (var ingredient of beer.ingredients.malt) {
    maltIngredients.push(" " + ingredient.name);
  }
  return maltIngredients
}

var beerIngredientsHops = function(beer){
  hopsIngredients = [];
  for (var ingredient of beer.ingredients.hops) {
    hopsIngredients.push(" " + ingredient.name + "(" + ingredient.attribute + ")");
  }
  return hopsIngredients
}

// DRY catch-all element creator and setter
var createElementAndSetContent = function(parentElement, content, index, elementType){
  var parent = document.getElementById(parentElement);
  var element = document.createElement(elementType);
  element.innerText = content;
  element.value = index;
  parent.appendChild(element);
}

var setElementAndSetContent = function(parentElement, content, index, elementId){
  var parent = document.getElementById(parentElement);
  var element = document.getElementById(elementId);
  element.innerText = content;
  element.value = index;
  parent.appendChild(element);
}

var setImage = function(parentElement, content, index, elementId){
  var parent = document.getElementById(parentElement);
  var element = document.getElementById(elementId);
  element.innerHTML = content;
  element.value = index;
  parent.appendChild(element);
}

var app = function(){
  var url = "https://api.punkapi.com/v2/beers"
  makeRequest(url, requestComplete)
}

window.addEventListener('load', app);
