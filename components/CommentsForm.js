import React, { useRef, useEffect, useState } from 'react'
import { submitComment } from '../services/fetchData';

const CommentsForm = ({ slug }) => {

  const [error, setError] = useState(false);
  const [showSuccessMsg,setShowSuccessMsg] = useState(false);
  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem('name');
    emailEl.current.value = window.localStorage.getItem('email');
  },[]);

  const handleSubmission = () =>{
    setError(false);

    const { value: comment } = commentEl.current;
    const { value: name } = nameEl.current; 
    const { value: email } = emailEl.current;
    const { checked:storeData } = storeDataEl.current;

    if (!comment && !name && !email) {
      setError(true);
      return;
    }

    const commentObj = { name, email, comment, slug }
    
    if (storeData) {
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('name');
      localStorage.removeItem('email');
    }

    submitComment(commentObj).then((res) => {
      setShowSuccessMsg(true);
      setTimeout(() => {
        setShowSuccessMsg(false);
      }, 3000);
    })

  }


  return (
    <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>Leave a Reply</h3>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <textarea
          ref={commentEl}
          className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder='Comment'
          name='comment'
        /> 
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
        <input
          ref={nameEl}
          type="text"
          placeholder='Name'
          name='name'
          className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
        />
        <input
          ref={emailEl}
          type='email'
          placeholder='Email'
          name='email'
          className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
        />
      </div>

      <div className='grid grid-cols-1 gap-4 mb-4'>
        <div>
          <input
            ref={storeDataEl}
            type='checkbox'
            name='storeData'
          />
          <label className='text-gray-500 cursor-pointer ml-2' htmlFor='storeData'>
             Save my name, email in this browser for the next time I comment.
          </label>
        </div>
      </div>

      {error && <p className='text-xs text-red-500'>All Fields are required</p>}
      <div className='mt-8'>
        <button
          type='button'
          onClick={handleSubmission}
          className='transition duration-500 ease hover:bg-indigo-900 hover:text-white inline-block bg-pink-600 px-8 py-3 text-white font-medium text-lg cursor-pointer'
        >
          Post Comment
        </button>
        {showSuccessMsg && <span className='text-lg float-right font-semibold mt-3 text-green-300'>comment submitted for review</span>}
      </div>
    </div>
  )
}

export default CommentsForm