const noteContainer = document.querySelector('.note-container');
const form = document.querySelector('form');
const titleInput = document.querySelector('#title');
class Note {
    constructor(title, body) {
        this.title = title;
        this.body = body;
        this.id = Math.random();
        this.originaltitle=title;
      }
}
function getNotes(){
    let notes;
    if(localStorage.getItem('noteApp.notes') === null){
      notes = [];
    } else {
      notes = JSON.parse(localStorage.getItem('noteApp.notes'));
    }
    return notes;
  }
  
  function addNotesToLocalStorage(note){
    const notes = getNotes();
    notes.push(note);
    localStorage.setItem('noteApp.notes', JSON.stringify(notes));
  }
  
  function removeNote(id){
    const notes = getNotes();
    notes.forEach((note, index) => {
      if (note.id === id){
        notes.splice(index, 1);
      }
      localStorage.setItem('noteApp.notes', JSON.stringify(notes));
    })
  }

function addtolist(note){
    var current = new Date();
    var c2 = current.toLocaleString();
    
    const newWrittennote = document.createElement('div');
    newWrittennote.classList.add('notes');
    newWrittennote.innerHTML = `
    <span hidden>${note.id}</span>
    <h2 class="title">${note.title+ " ("+c2+ ")"}</h2>
    <p class="body">${note.body}</p>
    <div class="options">
      <button class="option edit">edit note details</button>
      <button class="option delete">Delete note details</button>
    </div>`;
  noteContainer.appendChild(newWrittennote);
}
function EditNote(title,body,ortitle)
{
document.querySelector('#title').value = ortitle;
document.querySelector('#notes').value = body;


}
noteContainer.addEventListener('click', (e) => {
    if(e.target.classList.contains('edit')){
      const currentNote = e.target.closest('.notes');
      const currentTitle = currentNote.querySelector('.title').textContent;
      const currentBody = currentNote.querySelector('.body').textContent;
      const savetitle = currentNote.title;
      EditNote(currentTitle, currentBody,savetitle);
      currentNote.remove();
      const id = currentNote.querySelector('span').textContent;
      removeNote(Number(id));
    }
    if(e.target.classList.contains('delete')){
      const currentNote = e.target.closest('.notes');
      currentNote.remove();
      const id = currentNote.querySelector('span').textContent;
      removeNote(Number(id));
    }
  })



form.addEventListener('submit',(e)=>{
e.preventDefault();
const titleInput = document.querySelector('#title');
const noteInput = document.querySelector('#notes');
const saveTitle =  document.querySelector('#title');

if(titleInput.value.length > 0 && noteInput.value.length > 0){
    const newNote = new Note(titleInput.value,noteInput.value,saveTitle.value);
    addtolist(newNote);
    addNotesToLocalStorage(newNote);
    titleInput.value = '';
    noteInput.value = '';
    titleInput.focus();
}
});
document.addEventListener('DOMContentLoaded', updateUI);
function updateUI()
{
    const notes = getNotes();
    notes.forEach (note=> {
        addtolist(note);
    })
}

