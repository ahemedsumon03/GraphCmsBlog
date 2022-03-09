/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import moment from 'moment'
import { RecentPost,SimilarPost } from '../services/fetchData';

const postWidget = ({ slug }) => {


  const [relatedPost,setRelatedPost] = useState([]);
  useEffect(() => {
    if (slug) {
      SimilarPost(slug).then(result => {
        setRelatedPost(result);
      })
    } else {
      RecentPost().then(result => {
        setRelatedPost(result);
      })
    }

  }, [slug]);


  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
      <h3 className='text-lg font-semibold border-b mb-8'>{slug ? 'Related Post' : 'Recent Post'}</h3>
      {relatedPost?.map((post, index) => (
        <div key={index} className='flex items-center w-full mb-4'>
          <div className='w-16 flex-none'>
            <img
              src={post.featuredImage[0].url}
              alt={post.title}
              width="60px"
              height="60px"
              className='align-middle rounded-full'
            />
          </div>
          <div className='flex-grow ml-4'>
            <p className="text-gray-500 font-xs">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
            <Link href={`/post/${post.slug}`} className='text-md' key={ index }>{ post.title }</Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default postWidget