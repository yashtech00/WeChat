import { SideBar } from "../Components/Sidebar"


export const Layout=({children}:{children:React.ReactNode})=>{
    return (
        <div className="bg-black ">
            
            <SideBar/>
                {children}
                
        </div>
    )
}