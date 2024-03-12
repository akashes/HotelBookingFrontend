import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'
function Header() {
    const {user} =useContext(UserContext)
    console.log(user);
  return (
    <div>
          <header className=' flex justify-between'>
      <Link to='/' className="flex items-center gap-1">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6
      
       ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
</svg>
<span className='font-bold text-xl'>brand</span>

      </Link>

      <div className='flex border gap-2 border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300 '>
        <div>AnyWhere</div>
        <div className=" border-l border-gray-400" ></div>
        <div>Any Week</div>
        <div className=" border-l border-gray-400" ></div>

        <div>Add Guest</div>
        <button className='bg-primary text-white p-1 rounded-full' >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>

        </button>
      </div>
      <div className='flex items-center border gap-2 border-gray-300 rounded-full py-2 px-4 '>
        <div className='flex items-center gap-2'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>

<Link to={user? '/account' : '/login'} className='bg-gray-600  border border-gray-500 text-white rounded-full overflow-hidden'>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 relative top-1">
  <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
</svg>


</Link>
{
    user && ( <div>{user.name}</div> )
}
        </div> 
      </div>
    </header>
    </div>
  )
}

export default Header
