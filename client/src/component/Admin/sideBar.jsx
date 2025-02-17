import { Sheet, SheetContent, SheetHeader, SheetTitle} from '@/components/ui/sheet'
import { BanIcon, ChartNoAxesCombined, Projector, User } from 'lucide-react'
import React, { Fragment } from 'react'
import { useNavigate } from 'react-router'


const sideBarMenu = [
    {
        id : "banner",
        label : "Banners",
        path : '/admin/banner',
        icon : <BanIcon/>
      },
      {
        id: "portfolio",
        label: "Portfolio",
        path: "/admin/portfolio",
        icon: <Projector/>,
      },
      {
        id: "users",
        label: "Users",
        path: "/admin/users",
        icon: <User/>
      }, 
]

const MenuItems = ({setOpen})=>{
   const navigate = useNavigate()
   return(
    <nav className='mt-8 flex-col flex gap-2'>
      {
        sideBarMenu.map((menuItem)=>(
          <div key={menuItem.id} onClick={()=> {
            navigate(menuItem.path)
            setOpen ? setOpen(false) : null
          }}
          className='flex cursor-pointer text-xl items-center gap-2 py-2 text-muted-foreground hover:bg-muted hover:text-foreground'
          >
            {menuItem.icon}
            <span>{menuItem.label}</span>
          </div>
        ))
      }
    </nav>
  )
}

const sideBar = ({open,setOpen}) => {
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen} >
        <SheetContent side="left" className="w-64">
            <div className='flex flex-col h-full'>
            <SheetHeader className='bordee-b'><SheetTitle><ChartNoAxesCombined size={30}/></SheetTitle><h1 className='text-2xl font-extrabold'>Admin Panel</h1></SheetHeader>
            <MenuItems setOpen={setOpen}/>
            </div>
        </SheetContent>
      </Sheet>
      <aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>
        <div className='flex cursor-pointer items-center gap2' onClick={()=>navigate('/admin/dashboard')}>
         <ChartNoAxesCombined size={30}/>
         <h1 className='text-2xl font-extrabold'>Admin Panel</h1>
        </div>
      <MenuItems/>
      </aside>
    </Fragment>
  )
}

export default sideBar
