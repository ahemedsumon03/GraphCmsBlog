import React,{useState,useEffect} from 'react'
import { getCategories } from '../services/fetchData';
import Link from 'next/link'


const Categories = () => {

  const [category, setCategory] = useState([]);
  
  useEffect(() => {
    getCategories().then(result => {
      setCategory(result);
    })
  },[])


  return (
    <div className='bg-white p-8 shadow-lg rounded-lg mb-8'>
      <h3 className='text-lg mb-8 font-semibold border-b pb-4'>
        Categories
      </h3>
      {category.map((category, index) => (
        <Link href={`/post/${category.slug}`} key={index} passHref>
          <span className='block cursor-pointer pb-3 mb-3'>
             {category.name}
          </span>
        </Link>
      ))}
    </div>
  )
}

export default Categories