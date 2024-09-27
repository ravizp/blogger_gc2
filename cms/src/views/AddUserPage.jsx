import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const url = "https://h8-phase2-gc.vercel.app";

  async function handleAddUser(event) {
    event.preventDefault();
    try {
      const addedUser = { username, email, password, phoneNumber, address };
      const { data } = await axios.post(`${url}/apis/add-user`, addedUser, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });

      // console.log(data);
      Swal.fire({
        title: "Success Add New User",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        title: error.response.data.error,
        icon: "error",
      });
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 p-4">
        <div className="w-full max-w-xl p-6 bg-base-200 rounded-lg shadow-md animate-fadeIn transform transition-transform duration-300 ease-out hover:scale-105">
          <h1 className="text-3xl font-semibold text-center text-accent-focus mb-6">
            Add New User
          </h1>

          <form className="space-y-4" onSubmit={handleAddUser}>
            <div>
              <label className="label">
                <span className="text-base label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full input input-bordered input-accent"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full input input-bordered input-accent"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Enter Username"
                className="w-full input input-bordered input-accent"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Phone Number</span>
              </label>
              <input
                type="tel"
                placeholder="Enter Phone Number"
                className="w-full input input-bordered input-accent"
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Address</span>
              </label>
              <input
                type="text"
                placeholder="Enter Address"
                className="w-full input input-bordered input-accent"
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            {/* Tombol "Add User" dan "Back" ditaruh sebelahan */}
            <div className="flex justify-between">
              <button
                type="submit"
                className="btn btn-accent w-[48%] transition-transform duration-300 transform hover:scale-105">
                Add User
              </button>
              <button
                type="button"
                className="btn btn-secondary w-[48%] transition-transform duration-300 transform hover:scale-105"
                onClick={() => navigate("/")}>
                Cancel
              </button>
              </div>
            </form>
        </div>
      </div>
    </>
  );
}
