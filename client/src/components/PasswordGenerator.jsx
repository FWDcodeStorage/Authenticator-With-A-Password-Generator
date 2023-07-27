const PasswordGenerator = () => {
  return (
    <div className='pg max-w-[450px] max-h-[600px] border-2 border-gray-600 rounded-md flex flex-col justify-center items-center px-8 py-10'>
      <form
        className='flex flex-col justify-center items-center gap-6'
        
      >
        <h1 className='text-xl tracking-widest text-center'>
          <strong>Strong Password Generator</strong>
        </h1>

        <div className='flex flex-col justify-center items-center gap-4'>
          <input
            className='w-full px-2 py-1 outline-none border-2 border-gray-500 rounded-md'
            placeholder='Your new password'
            required
          />

        </div>
        <button
          className='w-full px-2 py-1 outline-none border-2 border-gray-500 rounded-md text-lg font-semibold tracking-wider bg-green-400 pointer hover:scale-95 transition-transform duration-75'
         
        >
          Generate now
        </button>
      </form>
    </div>
  );
};

export default PasswordGenerator;
