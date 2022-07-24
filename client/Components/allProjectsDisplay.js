import { ArrowLeftIcon } from "@heroicons/react/solid"

const AllProjectsDisplay = ({ userInfo, allProjects, setUserStatus }) => {

    return(
        <div className="flex flex-col items-center w-[100vw] h-[100vh] absolute top-0 left-0 bg-black text-white opacity-90">
            
            <div>
                <ArrowLeftIcon
                onClick={()=>{
                    setUserStatus("")
                }} 
                className="w-[2rem] rounded-full cursor-pointer border-2" />
                <h1>{userInfo.name}'s all Programming Projects</h1>
            </div>

            <div>
                {allProjects.map((e)=>{
                    return(
                        <div className="rounded-md border-2 border-white w-[90vw]">
                            <p>{e.name}</p>
                            <p>{e.note}</p>
                            <div>
                                <label>Date Added</label>
                                <p>&nbsp;&nbsp;&nbsp;&nbsp; {e.dateAdded}</p>
                            </div>
                            <div>
                                <label>Date Completed</label>
                                <p>&nbsp;&nbsp;&nbsp;&nbsp; {e.dateCompleted}</p>
                            </div>

                            {e.status==="not started" && 
                            <span className="rounded-md p-1 bg-red-500">{e.status}</span>}
                            {e.status==="in progress" && 
                            <span className="rounded-md p-1 bg-orange-500">{e.status}</span>}
                            {e.status==="completed" && 
                            <span className="rounded-md p-1 bg-green-500">{e.status}</span>}
                            
                            <button>Edit Note</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AllProjectsDisplay;