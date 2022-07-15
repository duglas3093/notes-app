import {useState,React} from 'react'
import axios from 'axios'

export default function Form({notes,setNotes}) {
    const initialNotes = {
        id:'',
        title:'',
        body:''
    };

    const [note,setNote] = useState(initialNotes);
    const [error,setError] = useState({
        'body':'',
        'title':'',
    });

    const addNote = (ev) =>{
        ev.preventDefault();
        
        axios.post('http://notes-api.v/api/notes',note)
            .then((payload) =>{
                setNotes([
                    ...notes,
                    payload.data.data
                ]);
                setNote(initialNotes);
            })
            .catch((error)=>{
                setError(error.response.data.messages);
            });

        // if (note.title.trim() === "" || note.body.trim() === ""){return}

        // setNotes([
        //     ...notes,
        //     {
        //         ...note,
        //         id: notes.length > 0 ? Math.max(...notes.map(note =>note.id))+1 : 1
        //     }
        // ])
        
        // setNote(initialNotes);
    }

    return (
        <div className="has-background-success-light p-3">
            <form onSubmit={(ev)=>addNote(ev)}>
                <div className="field">
                    <label className="label" htmlFor="title">Titulo</label>
                    <div className="control">
                        <input className="input" id="title" type="text" value={note.title} onChange={(ev) => setNote({...note,title: ev.target.value})}/>
                    </div>
                    <span className="help is-danger">{error.title}</span>
                </div>
                <br/>
                <div className="field">
                    <label className="label" htmlFor="body">Cuerpo</label>
                    <div className="control">
                        <textarea className="textarea" id="body" type="text" value={note.body} onChange={(ev) => setNote({...note,body: ev.target.value})}></textarea>
                    </div>
                    <span className="help is-danger">{error.body}</span>
                </div>
                <br/>
                <button className="button is-primary">Agregar</button>
            </form>
        </div>
    )
}
