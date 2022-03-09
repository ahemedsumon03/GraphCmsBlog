import React, { useState, useEffect } from 'react'
import { getComments } from '../services/fetchData';
import moment from 'moment';
import parse from 'html-react-parser'

const Comments = ({ slug }) => {

  const [comments, setComments] = useState([]);
  
  useEffect(() => {
    getComments(slug).then((result) => {
      setComments(result);
    }).catch(error => {
      console.log(error);
    });
  }, [slug]);

  return (
    <>
      {comments.length > 0 && (
        <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
          <h3 className='font-semibold text-xl mb-8 border-b pb-4'>
            {comments.length}
            {" "}
            Comments
          </h3>
          {comments.map((comment, index) => (
            <div key={index} className='border-b border-gray-100 mb-4 pb-4'>
              <p className='pb-4'>
                <span className='font-semibold'>{comment.name}</span>
                {' '}
                 on
                {' '}
                {moment(comment.createdAt).format('MMM DD,YYYY')}
              </p>
              <p className='w-full whitespace-pre-line text-gray-600'>{ parse(comment.comment)}</p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Comments