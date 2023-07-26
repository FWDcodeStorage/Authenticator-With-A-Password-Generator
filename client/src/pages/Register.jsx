import { useState } from "react";
import axios from "axios";
import Images from "../components/Images";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(Images.profile);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  //on form submission register user
  //send data to the server and there handle the rest - connect to db
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/register", { name, email, password, file })
      .then((result) => {
        console.log(result.data); // New user data or error message
        toast.success("Succesfully registered!");
        navigate("/");
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          toast.error(error.response.data.error);
          setShow(true);
        } else {
          toast.error("An error occurred. Please try again.");
        }
      });
  };

  //handle uploading file from local computer
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      //fileReader object lets web app async read the contents of files stored on the user's computer
      const fileReader = new FileReader();
      //readAsDataURL method is used to read the  contents of the specified blob or file and representing the file's dataa as a base64 encoded string
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = () => {
        reject(error);
      };
    });
  };

  //handle uploaded file and save it state
  const uploadFile = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <div className='login_page login max-w-[460px] border-2 border-gray-600 rounded-md flex flex-col justify-center items-center px-8 py-6'>
      <form
        className='flex flex-col justify-center items-center gap-4'
        onSubmit={handleSubmit}
      >
        <h1 className='text-xl tracking-widest'>
          <strong>Registration</strong>
        </h1>
        {show && (
          <p>
            <a
              href='/'
              className='text-green-400 cursor-pointer hover:underline -mt-2'
            >
              Go back ➡️
            </a>
          </p>
        )}

        <div className='img w-44 h-44 '>
          <label
            htmlFor='photo'
            className='overflow-hidden rounded-full b shadow-xl'
          >
            <img
              src={file}
              alt='profile-photo'
              className='w-full h-full cover'
            />
          </label>
          <input
            type='file'
            id='photo'
            onChange={uploadFile}
            className='hidden'
          />
        </div>

        <input
          className='w-full px-2 py-1 outline-none border-2 border-gray-500 rounded-md'
          placeholder='Username'
          type='text'
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className='w-full px-2 py-1 outline-none border-2 border-gray-500 rounded-md'
          placeholder='Email'
          type='email'
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className='w-full px-2 py-1 outline-none border-2 border-gray-500 rounded-md'
          placeholder='Password'
          type='password'
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className='w-full px-2 py-1 outline-none border-2 border-gray-500 rounded-md text-lg font-semibold tracking-wider bg-green-400 pointer hover:scale-95 transition-transform duration-75'
          type='submit'
        >
          Register
        </button>
      </form>
      <p className='text-[.5rem] mt-1'></p>
    </div>
  );
};

export default Register;
