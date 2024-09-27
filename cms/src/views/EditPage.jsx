import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FormPost from "../components/FormPost";
const url = "https://h8-phase2-gc.vercel.app";
import Toastify from "toastify-js";

export default function edit() {
  const [post, setPost] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  async function fetchPost() {
    try {
      const { data } = await axios.get(`${url}/apis/blog/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setPost(data.data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error.response?.data?.error || "An error occurred!",
        icon: "error",
      });
    }
  }

  async function handleSubmit(e, title, content, imgUrl, categoryId) {
    e.preventDefault();
    try {
      const body = { title, content, imgUrl, categoryId: +categoryId };

      const { data } = await axios.put(`${url}/apis/blog/posts/${id}`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      navigate("/");
      Toastify({
        text: `Succedd edit post`,
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

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
      <FormPost
        handleSubmit={handleSubmit}
        post={post}
        titleName={"Edit Post"}
        url={url}
      />
    </>
  );
}

// import axios from "axios";
// import Swal from "sweetalert2";
// import { useNavigate, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Form from "../components/Form";
// const url = "https://phase2-aio.vercel.app"

// export default function edit() {
//   const [product, setProduct] = useState([]);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   async function fetchProduct() {
//     try {
//       const { data } = await axios.get(`${url}/apis/pub/restaurant-app/cuisines/${id}`);
//       //   console.log(data.data);
//       setProduct(data.data);
//     } catch (error) {
//       console.log(error);
//       Swal.fire({
//         title: error.response.data.error,
//         icon: "error",
//       });
//     }
//   }

//   useEffect(() => {
//     fetchProduct();
//   }, []);

//   async function handleSubmit(event, name, description, price, imgUrl, stock, categoryId) {
//     event.preventDefault();
//     try {
//       const edited = { name, description, price: +price, imgUrl, stock: +stock, categoryId: +categoryId };

//       await axios.put(`${url}/apis/restaurant-app/cuisines/${id}`, edited, {
//         headers: {
//           Authorization: `Bearer ${localStorage.access_token}`,
//         },
//       });

//       Swal.fire({
//         title: "Success Edited",
//         icon: "success",
//       });

//       navigate("/");
//     } catch (error) {
//       console.log(error);
//       Swal.fire({
//         title: error.response.data.error,
//         icon: "error",
//       });
//     }
//   }

//   return (
//     <>
//       <Form handleSubmit={handleSubmit} product={product} titleName={'Edit Page'}/>
//     </>
//   );
// }
