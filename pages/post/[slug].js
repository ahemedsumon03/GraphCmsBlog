import React from 'react'
import { PostWidget, Categories, Author, Comments, CommentsForm, PostDetails } from '../../components/index';
import { getPostDetails } from '../../services/fetchData';

const BlogDetails = ({ post }) => {

  return (
      <>
          <div className='container mx-auto px-10 mb-8'>
              <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
                  <div className='col-span-1 lg:col-span-8'>
                      <PostDetails posts={ post }/>
                      <Author author={ post.author }/>
                      <CommentsForm slug={ post.slug }/>
                      <Comments slug={ post.slug }/>
                  </div>
                  <div className='col-span-1 lg:col-span-4'>
                      <div className='relative lg:sticky top-8'>
                          <PostWidget slug={post.slug}/>
                          <Categories/>
                      </div>
                  </div>
              </div>
          </div>
      </>
  )
}

export default BlogDetails

export async function getServerSideProps({ params }) {
    const data = await getPostDetails(params.slug);
    return {
      props: {
        post: data
      },
    };
  }
  
