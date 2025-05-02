import { SideBar } from "../Components/Sidebar"


export const Layout=({children}:{children:React.ReactNode})=>{
    return (
        <div className="bg-black h-screen ">
            <div className="relative rounded-lg text-white">
            <SideBar/>
                {children}
                </div>
        </div>
    )
}