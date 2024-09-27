import FormPost from "../components/FormPost";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

export default function Add({ url }) {
  const navigate = useNavigate();

  async function handleSubmit(e, title, content, imgUrl, categoryId) {
    e.preventDefault();
    try {
      const body = { title, content, imgUrl, categoryId: +categoryId };

      const { data } = await axios.post(`${url}/apis/blog/posts`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      navigate("/")
      //   console.log(data);
      Swal.fire({
        title: "Success Add New Posts",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error.response.data.error,
        icon: "error",
      });
    }
  }

  return (
    <>
      <FormPost handleSubmit={handleSubmit} titleName={"Add Post"} url={url}/>
    </>
  );
}
