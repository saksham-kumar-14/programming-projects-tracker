import { ArrowLeftIcon } from "@heroicons/react/solid"

const ProjectDisplay = ({ e, setEditProject, setEditing, setViewProject }) => {

    return(
        <div className="absolute top-0 bg-black bg-opacity-80 flex items-center justify-center w-[100vw] h-[100vh]">
            <div className="bg-white text-black rounded-md px-4 py-3">
                <div>
                    <button className="rounded-full" onClick={()=>{setViewProject({
                        status: false,
                        project: null
                    })}}>
                        <ArrowLeftIcon className="w-[2rem]" />
                    </button>
                </div>
                <div key={"project-"+e.id} className="cursor-pointer w-[90%] rounded-md border-white-200 border-2 mx-3">
                    <p>{e.name}</p>
                    <p>{e.note}</p>

                    <div className="my-2">
                        <label className="mx-2">Status</label>
                        {e.status==="not started" && 
                        <span className="text-white p-1 rounded-md bg-red-500">{e.status}</span> }
                        {e.status==="in progress" &&
                        <span className="text-white p-1 rounded-md bg-orange-500">{e.status}</span>}
                        {e.status==="completed" &&
                        <span className="text-white p-1 rounded-md bg-green-500">{e.status}</span>}
                    </div>
                    
                    <div>
                        <label>Date Added</label>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp; {e.dateAdded}</p>
                    </div>
                    <div>
                        <label>Date Completed</label>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp; {e.dateCompleted}</p>
                    </div>
                    <button
                    onClick={()=>{
                        setEditProject({
                            name: e.name,
                            note: e.note,
                            id: e.id,
                            dateAdded: e.dateAdded,
                            dateCompleted: e.dateCompleted,
                            status: e.status
                        })
                        setEditing(true)
                        setViewProject({
                            status: false,
                            project: null
                        })
                    }} 
                    className="rounded-md bg-yellow-400 duration-200 hover:bg-yellow-500 px-3 py-2">Edit Properties</button>
                </div>
            </div>
        </div>
)
}

export default ProjectDisplay;