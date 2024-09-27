import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import gearLoad from "../components/assets/Gear-0.2s-264px.svg"

export default function Home({ url }) {
  const [posts, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function fetchData() {
    try {
      setLoading(true)
      const { data } = await axios.get(`${url}/apis/blog/posts`, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });
      setProducts(data.data);
      // console.log(data.data);
    } catch (error) {
      Toastify({
        text: error.response.data.error,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#FF0000",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    }finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (date) => {
    // console.log(date);
    let newDate = new Date(date);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return newDate.toLocaleDateString("id-ID", options);
  };

  function handleEdit(id) {
    navigate(`/edit/${id}`);
  }

  function handleChangeImage(id) {
    navigate(`/patch/${id}`);
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`${url}/apis/blog/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      Toastify({
        text: `Succedd delete`,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#008000",
        },
        onClick: function () {}, // Callback after click
      }).showToast();

      fetchData();
    } catch (error) {
      Toastify({
        text: error.response.data.error,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#FF0000",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    }
  }

  return (
    <>
      {loading ? (
        <div className="mt-32 flex justify-center items-center">
          <img src={gearLoad} />
        </div>
      ) : (
      <div className="overflow-x-auto bg-gray-800 text-white">
        <table className="table table-fixed bg-gray-700 text-white w-full">
          <thead>
            <tr>
              <th className="w-12 text-white text-center">No</th>
              <th className="w-32 text-white text-center">Image</th>
              <th className="w-48 text-white text-center">Title</th>
              <th className="w-64 text-white text-center">Content</th>
              <th className="w-32 text-white text-center">Writer</th>
              <th className="w-48 text-white text-center">Published</th>
              <th className="w-64 text-white text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, i) => (
              <tr key={post.id} className="border-b border-gray-600">
                <td className="text-center w-12">{i + 1}</td>
                <td className="w-32">
                  <div className="flex items-center justify-center">
                    <div className="avatar">
                      <div className="mask mask-squircle w-20 h-20">
                        <img src={post.imgUrl} alt="Post Image" />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="text-center font-bold w-48">{post.title}</td>
                <td className="text-left w-64 truncate">
                  {post.content.length > 100
                    ? `${post.content.substring(0, 100)}...`
                    : post.content}
                </td>
                <td className="text-center w-32">{post.User.username}</td>
                <td className="text-center w-48">
                  {formatDate(post.updatedAt)}
                </td>
                <td className="flex justify-center gap-3 w-64">
                  <button
                    className="btn btn-outline btn-success btn-md flex items-center justify-center"
                    onClick={() => navigate(`/edit/${post.id}`)}>
                    <i className="fa fa-edit mr-2"></i>
                    <span>Edit</span>
                  </button>
                  <button
                    className="btn btn-outline btn-error btn-md flex items-center justify-center"
                    onClick={() => handleDelete(post.id)}>
                    <i className="fa fa-trash mr-2"></i>
                    <span>Delete</span>
                  </button>
                  <button
                    className="btn btn-outline btn-primary btn-md flex items-center justify-center"
                    onClick={() => handleChangeImage(post.id)}>
                    <i className="fa fa-image mr-2"></i>
                    <span>Change Image</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </>
  );
}
