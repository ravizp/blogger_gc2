import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Toastify from "toastify-js";

export default function patchImage({ url }) {
  const [product, setProduct] = useState([]);
  const [image, setImage] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  async function fetchProduct() {
    try {
      const { data } = await axios.get(`${url}/apis/blog/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      //   console.log(data.data);
      setProduct(data.data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error.response.data.error,
        icon: "error",
      });
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  async function handlePatchImage(event) {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", image);
      await axios.patch(`${url}/apis/blog/posts/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      navigate("/");

      Toastify({
        text: `Succedd upload image`,
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
  return (
    <>
      <div className="relative flex flex-col justify-center h-[85dvh] overflow-hidden bg-base-100">
        <div className="w-full p-6 m-auto rounded-lg shadow-md lg:max-w-lg bg-base-200">
          <h1 className="text-3xl font-semibold text-center text-accent-focus">
            Change Image
          </h1>
          <img src={product.imgUrl} alt="" />

          <form className="space-y-4" onSubmit={handlePatchImage}>
            <div>
              <label className="label">
                <span className="text-base label-text">Select File</span>
              </label>
              <input
                type="file"
                className="w-full input input-bordered input-accent"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
            </div>

            <div>
              <button type="submit" className="btn btn-accent">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
