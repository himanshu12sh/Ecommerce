import Header from "./Header"

const Shopinglayout = () => {
  return (
  <div className='flex min-h-screen w-full overflow-hidden'>
         <Header/>
    <div className='flex flex-1 flex-col '>
       
        <main className='flex-1 flex bg-muted/40 p-4 '>
            <Outlet/>
        </main>

    </div>
      
    </div>
  )
}

export default Shopinglayout
