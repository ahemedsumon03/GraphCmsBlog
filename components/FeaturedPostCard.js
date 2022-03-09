import React from 'react'
import Link from 'next/link'
import moment from 'moment'
import Image from 'next/image'

const FeaturedPostCard = ({ post }) => {

  return (
      <div className='relative h-72'>
          <div className='absolute rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-72' style={{ backgroundImage: `url('${post.featuredImage[0].url}')` }}>
              <div className='absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black w-full h-72 '>
                  <div className='flex flex-col rounded-lg p-4 items-center justify-center absolute w-full h-full'>
                      <p className='text-white mb-4 text-shadow font-semibold text-xs'>{moment(post.createdAt).format('MMM DD,YYYY')}</p>
                      <p className='text-white text-2xl text-center font-semibold text-shadow mb-4'>{post.title}</p>
                      <div className='flex items-center absolute bottom-5 w-full justify-center'>
                          <Image
                              unoptimized
                              alt={post.title}
                              width="30px"
                              height="30px"
                              className='align-middle drop-shadow-lg rounded-full'
                              src={ post.author.photo.url }
                          />
                          <p className='text-white ml-2 inline-block align-middle font-medium'>{ post.author.name }</p>
                      </div>
                  </div>
                  <Link href={`/post/${post.slug}`} passHref><span className='cursor-pointer absolute w-full h-full'></span></Link>
              </div>
          </div>
      </div>
  )
}

export default FeaturedPostCard