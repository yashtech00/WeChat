import { SideBar } from "../Components/Sidebar"


export const Layout=({children}:{children:React.ReactNode})=>{
    return (
        <div className="bg-black ">
            <div className="m-2 rounded-lg bg-stone-900">
            <SideBar/>
                {children}
                </div>
        </div>
    )
}