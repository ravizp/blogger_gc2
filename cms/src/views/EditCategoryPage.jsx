import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Toastify from 'toastify-js'
import FormCategory from "../components/FormCategory";
const url = "https://h8-phase2-gc.vercel.app";

export default function EditCategoryPage() {
    const [category, setCategory] = useState({})
    const { id } = useParams()
    const navigate = useNavigate()
   

    async function handleSubmit(e, name) {
        e.preventDefault()
        try {
            const body = {name}

            const { data } = await axios.put(`${url}/apis/blog/categories/${id}`, body, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`,
                  },
            })
            setCategory(data.data)
            navigate("/category")
            Toastify({
                text: `Succedd edit category`,
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

    async function fetchCategories() {
        try {
            const {data} = await axios.get(`${url}/apis/blog/categories/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`,
                },
            })

            setCategory(data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    return (
        <>
            <FormCategory url={url} category={category} handleSubmit={handleSubmit}
                nameProp={"Edit Category"}/>
        </>
    )

}