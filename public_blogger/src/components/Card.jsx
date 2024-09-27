import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Card({ post }) {
  const navigate = useNavigate();

  function handleClick(id) {
    navigate(`/detail/${id}`); // Pindah ke halaman detail berdasarkan ID post
  }

  function convertToDate(createdAt) {
    const date = new Date(createdAt);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return (
    <>
      {/* Posts Section */}
      <article className="shadow my-4">
        <img
          src={post.imgUrl}
          alt="Post"
          className="w-full h-48 object-cover hover:opacity-75"
        />
        <div className="bg-white p-6">
          <p className="text-3xl font-bold hover:text-gray-700 pb-4">
            {post.title}
          </p>
          <p className="text-blue-700 text-sm font-bold uppercase pb-4">
            By {post.User?.username || "Anonymous"}, Published On {convertToDate(post.createdAt)}
          </p>
          <p className="text-sm pb-3">{post.Category.name}</p>
          <p className="pb-6">{post.content}</p>
          <button
            className="btn btn-accent btn-sm"
            onClick={() => handleClick(post.id)} // Gunakan post.id di sini
          >
            Continue Reading <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </article>
    </>
  );
}
