 //if user adds a notes to the local storage
console.log("Welcome to notes app. This is app.js");
showNotes();

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");   //if we reload the page the notes get disappers to avoid the problem we will call the shownotes() at the starting 

addBtn.addEventListener("click", function(e) {
  let addTxt = document.getElementById("addTxt");
  let addtitle = document.getElementById("addtitle");// agar notes localstorage mein present ho toh usko dedo
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];   //agar notes null hai toh usko blank array assign kardo
  } else {
    notesObj = JSON.parse(notes);
  }
let myobj={
  title:addtitle.value,
  text:addTxt.value
}

  notesObj.push(myobj);  // agar koi add notes pe click kata hai toh notes add hp gayega
  // localStorage ko update kardo
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addtitle.value = "";   // note add karne ke baad uss textarea ko blank kardo jisse dosra note likh sake
//   console.log(notesObj);
  showNotes();
});

// Function to show elements from localStorage
function showNotes() {     // notes add karne ke baad notes show karne ke liye
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function(element, index) {
    html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title"> ${element.title}</h5>
                        <p class="card-text"> ${element.text}</p>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" to add notes.`;
  }
}

// Function to delete a note
function deleteNote(index) {
//   console.log("I am deleting", index);

  let notes = localStorage.getItem("notes");  // agar notes localstorage mein present ho toh usko dedo
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);  //The splice() method adds/removes items to/from an array, and returns the removed item(s).
  localStorage.setItem("notes", JSON.stringify(notesObj)); //note delete ho gayegi splice() se phir localstorage update hogayegi phir shownotes kar dena jisse bache hue notes show hogayenge
  showNotes();
}


let search = document.getElementById('searchTxt');  // yeh search purpose ke liye hai.agar hum ko koi note search karna ho toh apan search mein jakar type karenge or phir jo bhi word note se match karega vo note display ho gayega.
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})
