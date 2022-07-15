import { useState,React} from 'react'
import Note from './Note'
import axios from 'axios'

export default function Notes({notes, setNotes}) {

    const [error, setError] = useState({
        "title" : "",
        "body" : ""
    })

    const deleteNote = (id,e) => {
        e.preventDefault();

        axios.delete(`http://notes-api.v/api/notes/${id}`)
            .then((payload)=>{
                alert(payload.data.message)
                setNotes(notes.filter(note => id !== note.id));
            })
            .catch((error) =>{
                alert(error.response)
            })
    }
    
    const updateNote = (newNote)=>{
        let response = axios.put(`http://notes-api.v/api/notes/${newNote.id}`, newNote)
                .then((payload)=>{
                    let {id} = payload.data.data;
                    setNotes(
                        notes.map(note => note.id === id ? payload.data.data : note)
                    );
                    return true;
                })
                .catch((error)=>{
                    setError(error.response.data.messages);
                    return false;
                })  
                // console.log(newNote);
        return response;
    }

    return (
        notes.length > 0 ?
            <div className="columns is-multiline">
                {
                    notes.map(note => {
                        return <Note setError={setError} error={error} key={note.id} updateNote={updateNote} note={note} deleteNote={deleteNote}></Note>;
                    })
                }
            </div>
        :
            <p className="has-text-centered subtitle">No existen notas</p>
    )
}
