import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'


export default function Navbar () {
  const url = 'https://phase2-aio.vercel.app'
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.clear()
    navigate('/login')
    Swal.fire({
      title: 'Logged Out',
      icon: 'success',
      showConfirmButton: false,
      timer: 1000
  });
}
  return (<>
  <div className="w-full">
    <div className="navbar bg-base-100">
        <div className="navbar-start">
        <div className="btn btn-ghost text-xl">
          <Link to='/add-user'><button className="text-green-400 ">Add User</button></Link>
          
        </div>
      </div>
      <div className="navbar-center">
      <div className="btn btn-ghost text-xl mx-2 bg-green-600 font-sans text-white-400">
        <Link to='/category'><button >Category List</button></Link>
        </div>
        <div className="btn btn-ghost text-xl mx-2 bg-green-600 font-sans text-white-400">
          <Link to='/'><button >Blogger Hacktiv8</button></Link>
        </div>
        <div  className="btn btn-ghost text-xl mx-2 bg-green-600 font-sans text-white-400">
        <Link to='/add'><button >Add New Post</button></Link>

        </div>
  
      
      </div>
      <div className="navbar-end">
          <div className="btn btn-ghost text-xl mx-2">
              <button className="text-red-500" onClick={handleLogout}>Logout</button>
          </div>
      </div>
    </div>
  </div>
    </>)
}
