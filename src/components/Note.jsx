import {useState,React} from 'react'

export default function Note({note,deleteNote,updateNote,setError,error}) {
    const [modeEdit,setModeEdit] = useState(false); 
    const [item, setItem] = useState(note);

    const toggle = (e)=>{
        e.preventDefault();
        setModeEdit(!modeEdit);
        setItem(note);
        setError({
            "title": "",
            "body": ""
        })
    }

    const edit = async (e)=>{
        e.preventDefault();
        if( await updateNote(item)){
            setModeEdit(false); 
            setError({
                "title": "",
                "body": ""
            })
        }
        // updateNote(item);
        // setModeEdit(false);
    }

    return (
        <div className="column is-one-quarter">
            <div className="card">
                <header className="card-header">
                    <p className="card-header">
                        ID: {note.id}
                    </p>
                </header>
                <div className="card-content">
                    {/* <p className="card-content"> */}
                    {
                        modeEdit ?
                        <div className="field">
                            <label className="label" htmlFor="titulo_edit">Titulo</label>
                            <div className="control">
                                <input className="input" name="titulo_edit" type="text" value={item.title} onChange={(ev) => setItem({ ...item, title: ev.target.value })}/>
                            </div>
                            <span className="help is-danger">{error.title}</span>
                        </div>
                        :
                        <div>Title: {note.title}</div>
                    }

                    {
                        modeEdit ?
                        <div className="field">
                            <label className="label" htmlFor="cuerpo_edit">Cuerpo</label>
                            <div className="control">
                                <textarea className="textarea" name="cuerpo_edit" type="text" value={item.body} onChange={(ev) => setItem({ ...item, body: ev.target.value })}></textarea>
                            </div>
                            <span className="help is-danger">{error.body}</span>
                        </div>
                        :
                        <div>Body: {note.body}</div>
                    }
                    {/* </p> */}
            
                </div>
                <footer className="card-footer">
                    <a href={'/'} onClick={(e)=>toggle(e)} className="card-footer-item">{modeEdit ? 'Cancelar':'Editar'}</a>
                    {
                        modeEdit ?
                        <a href={'/'} className="card-footer-item" onClick={(e)=>edit(e)}>Guardar</a>
                        :
                        <a href={'/'} className="card-footer-item" onClick={(e)=>deleteNote(note.id,e)}>Eliminar</a>
                    }
                </footer>
            </div>
{/* 
            <div>ID: {note.id} </div>
            
            <button onClick={() => toggle()}>
                {modeEdit ? 'Cancelar':'Editar'}
            </button>
            {
                modeEdit && 
                <button onClick={()=>edit()}>Guardar</button>
            }
            {
                !modeEdit &&
                <button onClick={() => deleteNote(note.id)}>X</button>
            } */}
        </div>
    )
}
