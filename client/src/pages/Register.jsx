import { useState } from "react";
import './Login.css'
import axios from "axios";
//import { API } from "../config";
import toast from "react-hot-toast";
import { FaUser, FaLock } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // hooks
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(email, password);
      setLoading(true);
      const { data } = await axios.post(`/pre-register`, {
        email,
        password,
      });
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        toast.success("Please check your email to complete registration");
        setLoading(false);
        navigate("/");
      }
      console.log(data);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="center-content">
    <div className="wrapper">
            <form onSubmit={handleSubmit}>
            <br></br><br></br><br></br>
            <h1>Register</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Enter your email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FaUser className="icon"/>
              </div>

              <div className="input-box">
              <input
                type="password"
                placeholder="Choose your password"
                required
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FaLock className="icon"/>
              </div>
           
              <button      
              disabled={loading}
              type="submit">
              {loading ? "Waiting..." : "Register"}
              </button>

              <div className="register-link">
              <br></br>
              <p>already have an account?</p>

              <Link className="text-gray-500" to="/login">
                Go to Login
              </Link>
              </div>
            </form>
    </div>
    </div>
  );
}