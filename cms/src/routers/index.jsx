import { createBrowserRouter, redirect } from "react-router-dom";
import BaseLayout from "../views/BaseLayout";
import LoginPage from "../views/LoginPage";
import HomePage from "../views/HomePage";
import Swal from "sweetalert2";
import CategoryPage from "../views/CategoryPage";
import AddPage from "../views/AddPage";
import EditPage from "../views/EditPage";
import AddUserPage from "../views/AddUserPage";
import ChangeImage from "../views/ChangeImage";
import EditCategoryPage from "../views/EditCategoryPage";
import AddCategory from "../views/AddCategory"

const url = "https://h8-phase2-gc.vercel.app";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage url={url} />,
    loader: () => {
      if (localStorage.access_token) {
        Swal.fire({
          title: "You are Logged In",
          icon: "question",
        });
        return redirect("/");
      }

      return null;
    },
  },
  {
    element: <BaseLayout />,
    loader: () => {
      // console.log(localStorage.access_token);
      if (!localStorage.access_token) {
        Swal.fire({
          title: "Please Login First",
          icon: "warning",
        });
        return redirect("/login");
      }

      return null;
    },
    children: [
      {
        path: "/",
        element: <HomePage url={url} />,
      },
      {
        path: "/add",
        element: <AddPage url={url} />,
      },
      {
        path: "/edit/:id",
        element: <EditPage url={url} />,
      },
      {
        path: "/patch/:id",
        element: <ChangeImage url={url} />,
      },
      {
        path: "/category",
        element: <CategoryPage url={url} />,
      },
      {
        path: "/edit/category/:id",
        element: <EditCategoryPage url={url} />,
      },
      {
        path: "/add/category",
        element: <AddCategory url={url} />,
      },
    ],
  },
  {
    path: "/add-user",
    element: <AddUserPage url={url} />,
  },
]);
export default router;
