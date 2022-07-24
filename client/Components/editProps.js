import { ArrowLeftIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import axios from "axios";

const EditProps = ({ setEditing, editProject, userInfo }) => {

    const [editedName, setEditedName] = useState(editProject.name);
    const [editedNote, setEditedNote] = useState(editProject.note);
    const [editedStatus, setEditedStatus] = useState(editProject.status);
    const [editedDateAdded, setEditedDateAdded] = useState(editProject.dateAdded);
    const [editedDateCompleted, setEditedDateCompleted] = useState(editProject.dateCompleted);

    useEffect(()=>{
        document.getElementById("edit-project-name-input").value = editProject.name;
        document.getElementById("edit-project-note-input").value = editProject.note;
        document.getElementById("edit-project-status-input").value = editProject.status;
    },[])

    async function edit(e){
        e.preventDefault();

        let newTrack = []
        userInfo.track.map((e)=>{
            if(e.id === editProject.id){
                newTrack.push({
                    id: e.id,
                    name: editedName,
                    note: editedNote,
                    status: editedStatus,
                    dateAdded: editedDateAdded,
                    dateCompleted: editedDateCompleted
                })
            }else{
                newTrack.push(e)
            }
        })
        console.log(newTrack)

        const res = await axios.post("http://localhost:3001/updateUser", {
            email: userInfo.email,
            track: newTrack
        });
        const data = await res.data;
        if(data.updated) {
            location.reload();
        }else{
            alert("Some problem occured at our backend!")
        }
    }

    return(
        <div className="flex justify-center items-center w-[100vw] h-[100vh] absolute top-0 left-0 bg-black text-white bg-opacity-80">
            <div className="rounded-md p-3 bg-white text-black">
                <ArrowLeftIcon className="w-[3rem] cursor-pointer rounded-full p-2 bg-white text-black" onClick={()=>{setEditing(false)}} />
                <div>
                    <div>
                        <label>Name</label>
                        <input onChange={(e)=>{setEditedName(e.target.value)}} className="rounded-md p-2 border-black border-2 my-2 w-[40rem]" id="edit-project-name-input" type="text" placeholder="name" />
                    </div>

                    <div>
                        <label>Note</label>
                        <textarea onChange={(e)=>{setEditedNote(e.target.value)}} className="rounded-md p-2 border-black border-2 my-2 w-[40rem]" id="edit-project-note-input" placeholder="Note" />
                    </div>

                    <div>
                        <label>Status</label>
                        <select onChange={(e)=>{setEditedStatus(e.target.value)}} className="rounded-md p-2 border-black border-2 my-2" id="edit-project-status-input">
                            <option>not started</option>
                            <option>in progress</option>
                            <option>completed</option>
                        </select>
                    </div>
                    
                    <div className="grid grid-cols-2 items-center">
                        <div>
                            <label>Date Added</label>
                            <input
                            onChange={(e)=>{
                                let d = new Date(e.target.value.toString())
                                d = d.toString().slice(0,15)
                                setEditedDateAdded(d)
                            }}
                            className="rounded-md p-2 border-black border-2 my-2" type="date" />
                        </div>

                        <div>
                            <label>Date Completed</label>
                            <input
                            onChange={(e)=>{
                                let d = new Date(e.target.value.toString())
                                d = d.toString().slice(0,15) 
                                setEditedDateCompleted(d)
                            }}
                            className="rounded-md p-2 border-black border-2 my-2" type="date"/>
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        <button className="rounded-md py-2 px-3 bg-green-500 duration-100 hover:bg-green-600 text-white" onClick={edit}>Submit</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default EditProps;