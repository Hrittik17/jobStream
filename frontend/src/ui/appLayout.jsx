import SideNav from './sideNav'
import Header from './header'
import { Outlet } from 'react-router-dom'

export default function AppLayout() {
  return (
    // appLayout so the header will be in the top and the sideNav will be in the left and outlet because we want the sideNavs to display their content   

    <div className='grid grid-cols-[18rem_1fr] grid-rows-[auto_1fr] gap-2 h-[100vh]'>
      <Header />
      <SideNav />
      <main className='bg-slate-50 py-10 px-10 overflow-scroll'>
        <Outlet />
      </main>
    </div>
  )
}

