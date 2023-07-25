import React, {useState} from "react";
import toast from "react-hot-toast";
import axios from "axios";

const Home = () => {
  const [password, setPassword] = useState('') // this a state to display the data coming back from the server
  const [formData, setFormData] = useState({ // this the data that we send to the server to generate our passport
    includeNumbers: false,
    includeLetters: true,
    includeSymbols: false
  })


  // A function that makes easy to copy the generated password value
  function copyPassword(e) {
    console.log(e.target.innerText)
    const textToCopy = e.target.innerText // we get the password text from the h2 when we click on it

    // Use the Clipboard API to copy the text to the clipboard
    navigator.clipboard.writeText(textToCopy)
    .then(() => {
      // show that the text has been copied
      toast.success("Copied");
    })
    .catch((error) => {
      console.error('Failed to copy text: ', error);
    });
  }

  // A function that let you get the checked option from the form
  function handleChange(e) {
    const {name, checked} = e.target
    setFormData(previousValue => {
      return {
        ...previousValue,
        [name]: checked
      }
    })
    console.log(formData)
  }

  // A submit form function
  function handleSubmit(e) {
    e.preventDefault()

    axios.post('http://localhost:3000/generatepassword', formData)
    .then(res => {
      console.log(res)
      setPassword(res.data)
    })
    .catch(err => console.log(err))
  }

  return (
    <div className='w-[100vw] h-[100vh] bg-[#2b2b2b] flex justify-center items-center flex-col'>
      <h1 className='text-xl font-bold tracking-widest text-green-400  my-5'>
        Welcome
      </h1>
      <div className='border-2 border-green-400 p-4 rounded-md flex justify-center items-center flex-col'>
        <span className="text-sm text-green-100 self-start">Generated Password</span>
        <h2 className="text-xl text-center bg-green-500 text-green-100 mt-1 mb-2 rounded-sm p-2 px-8 cursor-pointer self-center" onClick={copyPassword}>{!password ? 'UFerUWhypEcwwuRx' : password}</h2>

        <form onSubmit={handleSubmit} className="self-start">
        <fieldset>
          <legend className="text-green-100">settings:</legend>

          
          <div>
            <input className="m-4" type="checkbox" id="includeLetters" name="includeLetters"  onChange={handleChange} checked={formData.includeLetters}/>
            <label className="text-green-100" htmlFor="includeLetters">Include letters</label>
          </div>

          <div>
            <input className="m-4" type="checkbox" id="includeNumbers" name="includeNumbers" onChange={handleChange} checked={formData.includeNumbers}/>
            <label className="text-green-100" htmlFor="includeNumbers">Include numbers</label>
          </div>

          <div>
            <input className="m-4" type="checkbox" id="includeSymbols" name="includeSymbols" onChange={handleChange} checked={formData.includeSymbols}/>
            <label className="text-green-100" htmlFor="includeSymbols">Include symbols</label>
          </div>
         </fieldset>

         <button className="bg-green-500 p-3 mx-auto w-[34.5vh] mt-2 text-green-900 rounded-sm">Generate Password</button>

        </form>
      </div>
    </div>
  );
};

export default Home;
