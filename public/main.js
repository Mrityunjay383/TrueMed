

const list = document.getElementById("list");

//Functions Declaration
function setList(group){
  clearList();
  for(const component of group){
    const item = document.createElement('li');
    const text = document.createTextNode(component.tablet);
    item.appendChild(text);
    list.appendChild(item);
  }
  if(group.length == 0){
    noResult();
  }
}

function clearList(){
  while(list.firstChild){
    list.removeChild(list.firstChild);
  }
}

function noResult(){
  const item = document.createElement('li');
  const text = document.createTextNode("No Result Found!!");
  item.appendChild(text);
  list.appendChild(item);
}

function listInOrder(value, searchTerm){
  if(value == searchTerm){
    return 2;
  }else if(value.startsWith(searchTerm)){
    return 1;
  }else if(value.includes(searchTerm)){
    return 0;
  }else{
    return -1;
  }
}

const searchInput = document.getElementById('search');

searchInput.addEventListener('input', (e) => {
  let inputValue = e.target.value;
  if(inputValue && inputValue.trim().length > 0){
    inputValue = inputValue.trim().toLowerCase();
    setList(tablets.filter(component => {
      return component.tablet.toLocaleLowerCase().includes(inputValue);
    }).sort((a, b) => {
      return listInOrder(b.tablet.toLocaleLowerCase(), inputValue) - listInOrder(a.tablet.toLocaleLowerCase(), inputValue);
    }));
  }else{
    clearList();
  }
});


list.addEventListener("click", (e) => {
  const clickValue = e.target.innerHTML;
  searchInput.value = clickValue;
  clearList();
});

const resultList = document.getElementById("result");

function clearResult(){
  while(result.firstChild){
    result.removeChild(result.firstChild);
  }
}

function isPresent(group, salt){
  var match = 0;
  for(i = 0; i < group.length; i++){
    for(j = 0; j < salt.length; j++){
      if(group[i] == salt[j]){
        match += 1;
      }
    }
  }
  if(match == group.length){
    return true;
  }else{
    return false;
  }
}

function checkingSalt(group){
  if(group.length < 2){
    for(const element of group){
      for(const com of elements){
        if(com.Salt == element){
          resultList.innerHTML = `Generic Medicine Found <br><b>Salt:-</b>  ${com.Salt} <br> <b>price:- </b> Rs.${com.price} <br>`;
          break;
        }
      }
    }
  }else{
      for(const com of elements){
        if(isPresent(group, com.Salt)){
          resultList.innerHTML = `Generic Medicine Found <br><b>Salts Are:-</b>  ${com.Salt}<br> <b>price:- </b> Rs.${com.price}`;
          break;
        }
      }
  }
}

function showResult(group, value){
  for(const element of group){
    if(element.tablet == value){
      var comArr = element.composition;
      break;
    }
  }
  checkingSalt(comArr);
}

const inputBtn = document.getElementById('inputBtn');

inputBtn.addEventListener("click", () =>{
  clearResult();
  let tabletName = searchInput.value;
  showResult(tablets, tabletName);
});
