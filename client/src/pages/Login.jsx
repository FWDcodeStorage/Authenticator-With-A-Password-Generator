import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  //when we want to send a user to a particular page based on an action (after a form submit)
  const navigate = useNavigate();

  //states /for saving users input values
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  //after a form submit, send data to server and there we handled the rest - saving data to our db
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/login", { name, password })
      .then((result) => {
        console.log(result.data);
        if (result.data === "success") {
          toast.success("Welcome");
          navigate("/home");
        } else {
          toast.error("An error occurred. Please try again.");
        }
      })
      //double check
      //By handling specific error scenarios on the server side and responding with appropriate status codes and error messages, you can have more control over error handling on the client side and provide users with more meaningful feedback when something goes wrong during their interactions with your application.
      .catch((error) => {
        console.log("Error:", error);

        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          console.log("Server response error:", error.response.data.error);
          toast.error(error.response.data.error);
        } else if (error.request) {
          console.log("Request error:", error.request);
          toast.error("Error making the request. Please try again.");
        } else {
          console.log("Unhandled error:", error);
          toast.error("An unknown error occurred. Please try again.");
        }
      });
  };

  return (
    <div className='login max-w-[450px] max-h-[600px] border-2 border-gray-600 rounded-md flex flex-col justify-center items-center px-8 py-10'>
      <form
        className='flex flex-col justify-center items-center gap-6'
        onSubmit={handleSubmit}
      >
        <h1 className='text-xl tracking-widest'>
          <strong>Welcome ! 🖐️</strong>
        </h1>

        <div className='flex flex-col justify-center items-center gap-4'>
          <input
            className='w-full px-2 py-1 outline-none border-2 border-gray-500 rounded-md'
            type='text'
            value={name}
            placeholder='Username'
            required
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className='w-full px-2 py-1 outline-none border-2 border-gray-500 rounded-md'
            type='password'
            value={password}
            placeholder='Password'
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className='w-full px-2 py-1 outline-none border-2 border-gray-500 rounded-md text-lg font-semibold tracking-wider bg-green-400 pointer hover:scale-95 transition-transform duration-75'
          type='submit'
        >
          Sign in
        </button>
      </form>
      <p className='text-[.5rem] mt-1'>
        You don't have an account?
        <a href='/register' className='text-red-400 ml-1'>
          Register now!
        </a>
      </p>
    </div>
  );
};

export default Login;
