import { PlusCircleIcon } from "@heroicons/react/solid"
import { useState , useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

import AllProjectsDisplay from "./allProjectsDisplay";
import EditProps from "./editProps";
import ProjectDisplay from "./projectDisplay";

const TrackBody = ({ userInfo, setUserInfo }) => {

    // for tracking projects
    const [notStarted, setNotStarted] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [allProjects, setAllProjects] = useState([]);

    // for displaying status of the user's actions
    const [userStatus, setUserStatus] = useState("");

    // for editing the projects info
    const [editProject, setEditProject] = useState({});
    const [editing, setEditing] = useState(false);

    // tracking the project to be added
    let d = new Date();
    d = d.toString().slice(0,15);

    // for viewing a project
    const [viewProject, setViewProject] = useState({
        status: false,
        project: null
    });

    // input for project
    const [name, setName] = useState("");
    const [note, setNote] = useState("");
    const [status, setStatus] = useState("not started");
    const [dateAdded, setDateAdded] = useState(d);
    const [dateCompleted, setDateCompleted] = useState("TBD");

    useEffect(()=>{

        let allProjectsArr = [];
        let notStartedArr = [];
        let inProgressArr = [];
        let completedArr = [];


        userInfo.track.map((e)=>{
            setAllProjects([...allProjectsArr , e])
            allProjectsArr.push(e);

            if (e.status === "not started") {
                setNotStarted([...notStartedArr, e])
                notStartedArr.push(e);
            }

            if (e.status === "in progress") {
                setInProgress([...inProgressArr, e])
                inProgressArr.push(e);
            }

            if(e.status === "completed") {
                setCompleted([...completedArr, e])
                completedArr.push(e);
            }
        })
    },[])

    async function addProject(){
        let newTrack = userInfo.track;
        newTrack.push({
            name: name,
            note: note,
            status: status,
            dateAdded: dateAdded,
            dateCompleted: dateCompleted,
            id: uuidv4()
        });
        console.log(newTrack)

        const res = await axios.post("http://localhost:3001/updateUser", {
            email: userInfo.email,
            track: newTrack
        });
        const data = await res.data;
        if (data.updated){
            location.reload();
        }else{
            alert("Some problem occured in our backend");
        }
    }

    return(
        <div className="py-6">

            <div className="flex flex-col items-center justify-center">
                <h1 className="text-center font-semibold text-[2rem]">{userInfo.name}'s Projects Track</h1>
                <div className="border-2 rounded-md border-black flex flex-col items-center">
                    <input onChange={(e)=>{setName(e.target.value)}} type="text" placeholder="Project Name" className="border-md p-2 rounded-md border-4 border-black w-[50vw] focus:border-blue-500 my-2 text-[1.2rem]" />
                    <textarea onChange={(e)=>{setNote(e.target.value)}} placeholder="Note" className="border-md p-2 rounded-md border-4 border-black w-[50vw] focus:border-blue-500 my-2 " />
                    
                    <div className="flex flex-col items-center my-2">
                        <label className=" bg-black text-white rounded-md px-2">Status</label>
                        <select onChange={(e)=>{setStatus(e.target.value)}}>
                            <option>not started</option>
                            <option>in progress</option>
                            <option>completed</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 my-2 w-[100%]">
                        <div className="flex flex-col items-center justify-center my-2">
                            <label className=" bg-black text-white rounded-md px-2">Date Started</label>
                            <input onChange={(e)=>{
                                let d = new Date(e.target.value.toString());
                                d = d.toString().slice(0,15)
                                if  (d === "Invalid Date") {
                                    d = "TBD"
                                }
                                setDateAdded(d);
                            }} type="date" />
                        </div>

                        <div className="flex flex-col items-center justify-centerx my-2">
                            <label className="flex flex-col items-center bg-black text-white rounded-md px-2">Date Completed</label>
                            <input onChange={(e)=>{
                                let d = new Date(e.target.value.toString());
                                d = d.toString().slice(0,15)
                                if  (d === "Invalid Date") {
                                    d = "TBD"
                                }
                                setDateCompleted(d);
                            }} type="date" />
                        </div>
                    </div>

                    <button 
                    onClick={addProject}
                    className="flex items-center justify-center">
                        <PlusCircleIcon className="w-[2rem]" />
                        Add
                    </button>
                </div>

                <div className="grid grid-cols-3 w-[90vw] items-center">
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="font-semibold text-red-600">Not Started</h2>
                        {notStarted.map((e)=>{
                            return(
                                <div className="rounded-md cursor-pointer border-2 border-slate-200 hover:bg-slate-200" onClick={()=>{setViewProject({
                                    status: true,
                                    project: e
                                })}}>
                                    <p>{e.name}</p>
                                </div>
                            )
                        })}

                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="font-semibold text-blue-600 items-center">In Progress</h2>
                        {inProgress.map((e)=>{
                            return(
                                <div className="rounded-md cursor-pointer border-2 border-slate-200 hover:bg-slate-200" onClick={()=>{setViewProject({
                                    status: true,
                                    project: e
                                })}}>
                                    <p>{e.name}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="font-semibold text-green-600">Completed</h2>
                        {completed.map((e)=>{
                            return(
                                <div className="rounded-md cursor-pointer border-2 border-slate-200 hover:bg-slate-200" onClick={()=>{setViewProject({
                                    status: true,
                                    project: e
                                })}}>
                                    <p>{e.name}</p>
                                </div>
                            )
                        })}

                    </div>
                </div>


                <button
                onClick={()=>{
                    setUserStatus("allProjectsDisplay")
                }} 
                className="rounded-md p-4 text-white text-[1.25rem] bg-green-500 hover:bg-green-600">See All Projects</button>

            </div>

            {userStatus==="allProjectsDisplay" &&
            <AllProjectsDisplay  allProjects={allProjects} userInfo={userInfo} setUserStatus={setUserStatus} />
            }

            {editing===true &&
            <EditProps setEditing={setEditing} editProject={editProject} userInfo={userInfo} />}

            {viewProject.status &&
            <ProjectDisplay e={viewProject.project} setViewProject={setViewProject} setEditProject={setEditProject} setEditing={setEditing} /> }

        </div>
    )
}

export default TrackBody;