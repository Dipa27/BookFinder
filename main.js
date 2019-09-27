//https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20&key=yourAPIKey
//AIzaSyDRc32B1eToM1JbmW53jl0ErHLEqaz4nxU
//const api = "AIzaSyDRc32B1eToM1JbmW53jl0ErHLEqaz4nxU";

var query = document.getElementById("input");
var button = document.getElementById("search");
var result = document.getElementById('content');
const api =  config.api;
 let thumb = '';


button.addEventListener("click",search);
query.addEventListener("keydown", (e) => {
    if(e.keyCode === 13)
        search();
});

function search(){
    const value = query.value;
    if(value === ""){
        alert("please enter a search value");
    }else{
        //const query = value.replace(/\s/,"+");
        //console.log(query);
        getData(value);
    }
}

async function getData(query){
    await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20&key=${api}`)
            .then(function(response){
                return response.json();
            })
            .then(function(myjson){
                //console.log(myjson);
                displayData(myjson);
            });
			

}

function displayData(data){
    if(data.totalItems === 0){
        content.innerHTML = "Sorry,No Books found!";
        return;
    }

    content.innerHTML = "";
    var array = data.items;
	
	
    for(let i = 0; i < array.length; i++){

	
		if ( typeof array[i].volumeInfo.imageLinks != "undefined") {
                        
                        thumb = array[i].volumeInfo.imageLinks.smallThumbnail;
                    } else {
    
                        thumb = 'images.jpg';
                    }
		 const ele = `
        
				<div class="cols">
				<figure>
				  <img  src="${thumb}" alt="Book">
				  <figcaption class="indigo-text text-darken-4">Title:  ${array[i].volumeInfo.title}</figcaption>
				  <p class="deep-orange-text text-darken-4">Author:  ${array[i].volumeInfo.authors}</p>
				  <p class="light-green-text text-darken-4">Published By:  ${array[i].volumeInfo.publisher}</p><br>
				  <button class="waves-effect waves-light btn yellow darken-1"><a href="${array[i].volumeInfo.previewLink}">Preview</a></button>
				</figure>
			</div></div>
			`;
			result.insertAdjacentHTML('beforeend', ele);
	}
}