import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import Toastify from 'toastify-js'
import loadingCycle from '../components/assets/Spinner@1x-1.0s-200px-200px.svg'

export default function HomePage({ url }) {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false)

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [searchCategory, setSearchCategory] = useState("");
  const [sortBy, setSortBy] = useState("ASC");

  // Fetch posts
  async function fetchPosts() {
    try {
      const { data } = await axios.get(
        `${url}/apis/pub/blog/posts?page=${page}&q=${search}&i=${searchCategory}&sort=${sortBy}`
      );
      setPosts(data?.data?.query);
      setPagination(data?.data?.pagination);
    } catch (error) {
        Toastify({
          text: error.response.data.error,
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
              fontWeight: "bold"
          }
        }).showToast();
    } finally {
      setLoading(false)
    }
  }

  // Fetch categories
  async function fetchCategories() {
    try {
      const { data } = await axios.get(`${url}/apis/pub/blog/categories`);
      setCategories(data?.data);
    } catch (error) {
      console.log(error);
    }
  }

  
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1); 
    fetchPosts();
  };
  
  const handleCategoryChange = (e) => {
    e.preventDefault();
    setSearchCategory(e.target.value);
    setPage(1); 
    fetchPosts();
  };

  // Fetch posts and categories when dependencies change
  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, [page, search, searchCategory, sortBy]);
  
  return (
    <>
      {/* Home */}
      <header className="w-full container mx-auto">
        <div className="flex flex-col items-center py-12">
          <a
            className="font-bold text-gray-800 uppercase hover:text-gray-700 text-5xl"
            onClick={() => setPage(1)}
          >
            <span className="text-accent">BLOGGER ARTIKEL</span>
          </a>
          <p className="text-lg text-gray-600">
            Kumpulan berbagai macam artikel tentang dunia ini
          </p>
        </div>
      </header>

      {/* Search and Filters */}
      <nav className="w-full py-4 border-t border-b bg-gray-100">
        <form onSubmit={handleSearchSubmit} method="get" className="flex justify-center items-center">
          {/* Search Input */}
          <input
            type="search"
            name="search"
            placeholder="Search"
            className="input input-bordered input-accent w-24 md:w-auto mx-1 input-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Category Filter */}
          <select
            className="select select-accent select-sm mx-2"
            value={searchCategory}
            onChange={handleCategoryChange} 
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Sort By Filter */}
          <select
            className="select select-accent select-sm mx-2"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="ASC">Sort by: Ascending</option>
            <option value="DESC">Sort by: Descending</option>
          </select>
        </form>
      </nav>

      {/* Post List */}
      {loading ? (
        <div className="mt-32 flex justify-center items-center">
          <img src={gearLoad} />
        </div>
      ) : (
        <div className="container mx-auto py-6">
          <section className="w-full grid md:grid-cols-2 gap-6 items-start px-3">
            {posts.map((post) => (
              <Card post={post} key={post.id} />
            ))}
          </section>
        </div>
      )}

      {/* Pagination */}
      <div className="join place-items-center flex justify-center" >
        <button
          className="join-item btn"
          disabled={pagination.currentPage === 1}
          onClick={() => setPage(page > 1 ? page - 1 : 1)}
        >
          Previous
        </button>

        {Array.from(Array(pagination.totalPage), (e, i) => (
          <button
            className={`join-item btn ${
              pagination.currentPage === i + 1 ? "btn-outline" : ""
            }`}
            key={i}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="join-item btn"
          disabled={pagination.currentPage === pagination.totalPage}
          onClick={() =>
            setPage(page < pagination.totalPage ? page + 1 : pagination.totalPage)
          }
        >
          Next
        </button>
      </div>
    </>
  );
}
