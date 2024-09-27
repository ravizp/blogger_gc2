import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import gearLoad from "../components/assets/Gear-0.2s-264px.svg";

export default function Category({ url }) {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url}/apis/blog/categories`, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });
      setCategories(data.data);
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
    } finally {
      setLoading(false);
    }
  }

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="mt-32 flex justify-center items-center">
          <img src={gearLoad} />
        </div>
      ) : (
        <>
          <div className="relative overflow-x-auto w-full">
            <table className="table-auto w-10/12 m-auto text-sm text-left text-gray-500 dark:text-gray-400 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 text-center">
                    No
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Category Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Created At
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, i) => {
                  return (
                    <tr
                      key={category.id}
                      className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {i + 1}
                      </td>
                      <td className="px-6 py-4 text-center">{category.name}</td>
                      <td className="px-6 py-4 text-center">
                        {formatDate(category.createdAt)}
                      </td>
                      <td className="px-6 py-4 flex justify-center gap-3">
                        <button
                          className="btn btn-outline btn-success btn-sm flex items-center justify-center"
                          onClick={() =>
                            navigate(`/edit/category/${category.id}`)
                          }>
                          <i className="fa fa-edit mr-2"></i>
                          <span>Edit</span>
                        </button>
                        <button
                          className="btn btn-outline btn-success btn-sm flex items-center justify-center"
                          onClick={() => navigate(`/add/category`)}>
                          <i className="fa fa-plus mr-2"></i>
                          <span>Add New</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
