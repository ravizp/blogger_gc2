import FormCategory from "../components/FormCategory";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Toastify from 'toastify-js'
import { useState } from "react";

export default function Add({ url }) {
  const navigate = useNavigate();
  const [category, setCategory] = useState("")


  async function handleSubmit(e, name) {
    e.preventDefault();
    try {
      const body = { name };

      const { data } = await axios.post(`${url}/apis/blog/categories`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setCategory(data.data)
      navigate("/category")

      Toastify({
        text: `Succedd add ${category.name} for Category`,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#008000",
        },
        onClick: function () { } // Callback after click
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
            onClick: function () { } // Callback after click
        }).showToast();
    }
  }

  return (
    <>
      <FormCategory handleSubmit={handleSubmit} nameProp={"Add Category"} url={url}/>
    </>
  );
}
