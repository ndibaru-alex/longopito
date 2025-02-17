import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from '@/components/ui/button'
import {AlignJustify,LogOut} from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { logOut } from '@/store/auth-slice'


const header = ({setOpen}) => {
 
    const dispatch = useDispatch()
    const navigate = useNavigate()

const logout = ()=>{
    dispatch(logOut())
    .then(()=>{
      navigate('/auth-login')
    })
}

  return (
    <header className='flex items-center justify-between px-4 py-3 bg-background border-b'>
    <Button onClick={()=> setOpen(true)}
      className="lg:hidden sm:block">
     <AlignJustify />
     <span className='sr-only'>Toggle Menu</span>
     </Button>
     <div className='flex flex-1 justify-end'>
     <Button onClick={logout} className='inline-flex gap-2 rounded-md px-4 py-2 text-sm font-medium shadow'><LogOut />Logout</Button>  
     </div>
    </header>
  )
}

export default header
