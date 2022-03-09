import React, { useContext,useState,useEffect } from 'react'
import Link from 'next/link'
import { getCategories } from '../services/fetchData';


const Header = () => {

    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        getCategories().then((result) => {
            setCategories(result);
        }).catch(error => {
            console.log(error);
        });
    }, []);

  return (
      <div className='container mx-auto px-10 mb-8'>
          <div className='border-b w-full inline-block border-blue-400 py-8'>
              <div className='lg:float-left block'>
                  <Link href="/" passHref>
                      <span className='text-white cursor-pointer font-bold text-4xl'>
                          GraphCms
                      </span>
                  </Link>
              </div>
              <div className='hidden md:float-right md:contents'>
                  {categories.map((category) => (
                      <Link key={category.slug} href={`/category/${category.slug}`} passHref>
                          <span className='md:float-right cursor-pointer align-middle text-white ml-4 font-semibold'>
                              { category.name }
                          </span>
                      </Link>
                  ))}
              </div>
          </div>
      </div>
  )
}

export default Header