import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function PostsForm({ url, post, handleSubmit, titleName }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  // console.log(post);
  async function fetchCategories() {
    try {
      const { data } = await axios.get(`${url}/apis/blog/categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      // console.log(url);
      
      setCategories(data.data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error.response?.data?.error || 'An error occurred!',
        icon: 'error',
      });
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (post) {
      setTitle(post?.title || '');  // Tambahkan nilai default jika undefined
      setContent(post?.content || '');
      setImgUrl(post?.imgUrl || '');
      setCategoryId(post?.categoryId || '');
    }
  }, [post]);

  return (
    <>
      <div className="relative flex flex-col justify-center h-screen overflow-hidden m-2 p-2">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
          <h1 className="text-3xl font-semibold text-center text-gray-700">
            {titleName}
          </h1>
          <form
            className="space-y-4"
            onSubmit={(e) =>
              handleSubmit(e, title, content, imgUrl, categoryId)
            }>
            <div>
              <label className="label">
                <span className="text-base label-text">Title</span>
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                className="w-full input input-bordered"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Content</span>
              </label>
              <input
                type="text"
                placeholder=" Enter Description"
                className="w-full input input-bordered"
                onChange={(e) => setContent(e.target.value)}
                value={content}
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Image (URL)</span>
              </label>
              <input
                type="text"
                placeholder="Enter Image URL"
                className="w-full input input-bordered"
                onChange={(e) => setImgUrl(e.target.value)}
                value={imgUrl}
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Category</span>
              </label>
              <select
                className="w-full input input-bordered input-primary"
                onChange={(e) => setCategoryId(e.target.value)}
                title="category"
                id=""
                value={categoryId}>
                <option value="">Choose</option>
                {categories.map((c) => {
                  return (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <br />
            <div>
              <button className="btn btn-block" type="submit">
                {titleName}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}


// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// export default function Form({
//   url,
//   post,
//   handleSubmit,
//   nameProp,
//   btnNameProp,
// }) {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [imgUrl, setImgUrl] = useState("");
//   const [categoryId, setCategoryId] = useState(0);
//   const [categories, setCategories] = useState([]);

//   async function fetchCategories() {
//     try {
//       const { data } = await axios.get(`${url}/apis/blog/categories`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.access_token}`,
//         },
//       });

//       setCategories(data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     if (post) {
//       setTitle(post.title);
//       setContent(post.content);
//       setImgUrl(post.imgUrl);
//       setCategoryId(post.categoryId);
//     }
//   }, [post]);

//   return (
//     <>
//       <section
//         className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
//         id="new-product-section"
//       >
//         <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
//           <h1 className="display-2">{nameProp}</h1>
//         </div>
//         <div className="row">
//           <div className="col-12 col-md-6">
//             <form
//               onSubmit={(e) =>
//                 handleSubmit(e, title, content, imgUrl, categoryId)
//               }
//               id="product-form"
//             >
//               <div className="mb-3">
//                 <label htmlFor="product-name">
//                   Title <span className="text-danger fw-bold">*</span>
//                 </label>
//                 <input
//                   onChange={(e) => setTitle(e.target.value)}
//                   value={title}
//                   type="text"
//                   className="form-control"
//                   id="product-name"
//                   placeholder="Enter post title"
//                   autoComplete="off"
//                   required=""
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="product-category">
//                   Category <span className="text-danger fw-bold">*</span>
//                 </label>
//                 <select
//                   id="post-category"
//                   name="category"
//                   className="form-select"
//                   onChange={(e) => setCategoryId(e.target.value)}
//                   value={categoryId}
//                 >
//                   <option>-- Select Category --</option>
//                   {categories?.map((category) => {
//                     return (
//                       <option key={category.id} value={category.id}>
//                         {category.name}
//                       </option>
//                     );
//                   })}
//                 </select>
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="product-desc">
//                   Content <span className="text-danger fw-bold">*</span>
//                 </label>
//                 <textarea
//                   onChange={(e) => setContent(e.target.value)}
//                   value={content}
//                   className="form-control"
//                   name="post-content"
//                   id="post-content"
//                   placeholder="Enter post content"
//                 ></textarea>
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="product-image">Image</label>
//                 <input
//                   onChange={(e) => setImgUrl(e.target.value)}
//                   value={imgUrl}
//                   type="text"
//                   className="form-control"
//                   id="product-image"
//                   placeholder="Enter product image url"
//                   autoComplete="off"
//                 />
//               </div>
//               <div>
//                 <button
//                   className="btn btn-lg btn-warning rounded-pill w-100 p-2"
//                   type="submit"
//                   href=""
//                 >
//                   {btnNameProp}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }