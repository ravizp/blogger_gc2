import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function TablePosts({ post, i }) {
  const navigate = useNavigate();

  // Format date
  const formatDate = (date) => {
    let newDate = new Date(date);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return newDate.toLocaleDateString("id-ID", options);
  };

    // Handle edit, delete, and change image
    function handleEdit(id) {
      navigate(`/edit/${id}`);
    }
  
    function handleChangeImage(id) {
      navigate(`/patch/${id}`);
    }
  
    async function handleDelete(id) {
      try {
        await axios.delete(`${url}/apis/restaurant-app/cuisines/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });
  
        Swal.fire({
          title: "Delete success",
          icon: "success",
        });
  
        fetchPosts();
      } catch (error) {
        Swal.fire({
          title: error.response.data.error,
          icon: "error",
        });
      }
    }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-xs text-white bg-opacity-90 dark:bg-opacity-50 bg-black backdrop-blur-md rounded-lg shadow-lg w-full">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Description</th>
              <th>Created By</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              key={post.id}
              className="hover:bg-opacity-30 hover:bg-gray-700 transition-all duration-300 ease-in-out">
              <th>{i + 1}</th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-20 h-20">
                      <img src={post.imgUrl} alt={post.name} />
                    </div>
                  </div>
                  <div>
                    <p className="font-bold">{post.name}</p>
                  </div>
                </div>
              </td>
              <td>{post.description}</td>
              <td>{post.User.username}</td>
              <td>{formatDate(post.createdAt)}</td>
              <td>
                <div className="flex gap-2">
                  <button
                    className="btn btn-success rounded-full hover:bg-green-600 transition-all duration-300"
                    onClick={() => handleEdit(post.id)}>
                    Edit
                  </button>
                  <button
                    className="btn btn-error rounded-full hover:bg-red-600 transition-all duration-300"
                    onClick={() => handleDelete(post.id)}>
                    Delete
                  </button>
                  <button
                    className="btn btn-primary rounded-full hover:bg-blue-600 transition-all duration-300"
                    onClick={() => handleChangeImage(post.id)}>
                    Change Image
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Description</th>
              <th>Created By</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
