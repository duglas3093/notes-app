import {useState, useEffect, react} from 'react';
import Form from './components/Form';
import Notes from './components/Notes';
import axios from 'axios';

export default function Dashboard(){
    // hook nativo de react para que cambien los estados cuando cambien los datos
    // const [state, setstate] = useState();
    
    useEffect(() =>{
        // axios.get('https://jsonplaceholder.typicode.com/posts')//url de donde traeremos los datos
        axios.get('http://notes-api.v/api/notes')//url de donde traeremos los datos
        .then((payload)=>{//en caso de obtener los datos
            // console.log(payload)
            setNotes(payload.data)
        })
        .catch((error)=>{//en caso de algun error
            console.log(error)
        })
    },[]);
    
    const [notes, setNotes] = useState([]); 
    // const [notes, setNotes] = useState([
    //     {id:1,title:'nota1',body:'ipsum'},
    //     {id:2,title:'nota2',body:'ipsum'},
    //     {id:3,title:'nota3',body:'ipsum'},
    //     {id:4,title:'nota4',body:'ipsum'},
    //     {id:5,title:'nota5',body:'ipsum'},
    // ]);


    
    // const changeState = () => {
    //     const reg = {id:6,title:'nota6',body:'ipsum'};
    //     setnotes(notes.concat(reg));
    // }

    // const notes = ;
    // {/* <pre>{JSON.stringify(notes)}</pre> */}
    return (
        <div className="container">
            <h1 className="title has-text-centered mt-5">Listado de notas</h1>
            <Notes notes={notes} setNotes={setNotes}></Notes>
            <Form notes={notes} setNotes={setNotes}></Form>
        </div>
    );
}