import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Toastify from "toastify-js";
import loadingCycle from "../components/assets/Spinner@1x-1.0s-200px-200px.svg";

export default function Detail({ url }) {
  const [post, setPost] = useState(null); // Ubah dari string menjadi null
  const [loading, setLoading] = useState(false);
  const { id } = useParams(); // Dapatkan ID dari URL

  async function fetchPost() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url}/apis/pub/blog/posts/${id}`);
      setPost(data.data); // Mengupdate state dengan data dari response
    } catch (error) {
      Toastify({
        text: error.response?.data?.error || "An error occurred",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    } finally {
      setLoading(false);
    }
  }

  function convertToDate(createdAt) {
    const date = new Date(createdAt);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    fetchPost(); // Memanggil fetchPost saat komponen dimuat
  }, [id]);

  if (loading) {
    return (
      <div className="mt-32 flex justify-center items-center">
        <img src={loadingCycle} alt="Loading" />
      </div>
    );
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mx-auto flex flex-wrap py-6">
      {/* Post Section */}
      <section className="w-full md:w-2/3 flex flex-col items-center px-3">
        <article className="flex flex-col shadow my-4">
          {/* Article Image */}
          <p className="hover:opacity-75">
            <img src={post.imgUrl} alt="Post" />
          </p>
          <div className="bg-white flex flex-col justify-start p-6">
            <p className="text-blue-700 text-m font-bold uppercase pb-5">
              {post.Category?.name}
            </p>
            <p className="text-3xl font-bold hover:text-gray-700 pb-4">
              {post.title}
            </p>
            <p className="text-sm pb-8">
              By{" "}
                {post.User?.username || "Anonymous"}
              , Published on {convertToDate(post.createdAt)}
            </p>
            <h1 className="text-2xl font-bold pb-3">Content</h1>
            <p className="pb-3">{post.content}</p>
          </div>
        </article>
      </section>
    </div>
  );
}
