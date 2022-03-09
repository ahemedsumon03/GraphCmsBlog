import React from 'react'
import { getCategoryPost } from '../../services/fetchData';
import { Categories,CategoryCard } from '../../components/index';

const CategoryDetails = ({ posts }) => {
    
    // const keyValue = Object.keys(posts);
    // const newObj = keyValue.map((key) => {
    //     return { keyValue:posts[key] }
    // })


  return (
    <div className="container mx-auto px-10 mb-8">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="col-span-1 lg:col-span-8">  
          <CategoryCard item={ posts }/>
      </div>
      <div className="col-span-1 lg:col-span-4">
        <div className="relative lg:sticky top-8">
          <Categories />
        </div>
      </div>
    </div>
  </div>
  )
}

export default CategoryDetails

export async function getServerSideProps({ params }) {
    const posts = await getCategoryPost(params.slug);
    return {
        props: {
            posts:posts
        }
    }
}