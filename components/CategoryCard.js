/* eslint-disable @next/next/no-img-element */
import React from 'react'
import moment from 'moment'
import Link from 'next/link'

const CategoryCard = ({ item }) => {
    console.log([item]);
    return (

        <div>
            {[item].map((singleItem, index)=>(
                singleItem.post.map((item, index) => (
                   <div key={index} className='bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-12'>
                     <div className='relative overflow-hidden shadow-md pb-80 mb-6'>
                        <img
                        key={index}
                        src={item.featuredImage[0].url}
                        className='h-80 absolute w-full object-top object-cover shadow-lg rounded-t-lg lg:rounded-lg'
                        alt={ item.title }
                    />
                        </div>
                       <h1 className='text-center transition duration-700 mb-8 cursor-pointer hover:text-pink-600 text-3xl font-semibold'>
                         <Link href={`/post/${item.slug}`}>
                             {item.title}
                         </Link>
                        </h1>
                        {singleItem.authors.map((author, index) => (
                         <>
                               <div key={ index } className='block lg:flex text-center items-center justify-center mb-8 w-full'>
                                <div className='flex justify-center items-center mb-4 lg:mb-0 w-full lg:w-auto mr-8'>
                                <img
                                    src={author.photo.url }
                                    alt={author.name}
                                    height="30px"
                                    width='30px'
                                />
                                <p className='ml-2 inline align-middle text-gray-700 font-medium text-lg '>{author.name }</p>     
                                </div>
                            <div key={ index } className='font-medium text-gary-700'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="align-middle">{moment(item.createdAt).format('MMM DD, YYYY')}</span>
                            </div>
                        </div>
                             <p className='text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8'>
                               {item.excerpt}
                            </p>
                          <div className='text-center'>
                            <Link href={`/post/${item.slug}`} passHref>
                               <span className='cursor-pointer transition duration-50-0 ease transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3'>Continue Reading</span>
                            </Link>
                          </div>    
                     </>
                                
                    ))}
                        
                   </div>
                ))
            ))}
        </div>
  )
}

export default CategoryCard