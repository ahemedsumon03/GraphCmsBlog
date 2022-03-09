import { request, gql } from 'graphql-request'

const graphqlApi = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const fetchPost = async () => {
    const query = gql`
        query MyQuery {
            postsConnection {
            edges {
                node {
                author {
                    bio
                    name
                    id
                    photo {
                    url
                    }
                }
                createdAt
                slug
                title
                excerpt
                featuredImage {
                    url
                }
                category {
                    name
                    slug
                }
                }
            }
            }
        }
`
    const result = await request(graphqlApi, query);
    return result.postsConnection.edges;
}

export const RecentPost = async () => {
    const query = gql`
        query MyQuery {
            posts(orderBy: id_ASC, last: 3) {
            title
            featuredImage {
                url
                createdAt
            }
            slug
            }
        }
            
    `
    const result = await request(graphqlApi, query);
    return result.posts;
}

export const SimilarPost = async (slug) => {
    const query = gql`
            query GetSimilarPost($slug: String!) {
            posts(
                where: {slug_not: $slug}
                last: 3
            ) {
                title
                featuredImage {
                   url
                }
                createdAt
                slug
            }
            }
  `;
  const result = await request(graphqlApi, query, { slug });

  return result.posts;
}

export const getPostDetails = async (slug) => {
    const query = gql`
    query GetPostDetails($slug : String!) {
        post(where: {slug: $slug}) {
          title
          excerpt
          featuredImage {
            url
          }
          author{
            name
            bio
            photo {
              url
            }
          }
          createdAt
          slug
          content {
            raw
          }
          category {
            name
            slug
          }
        }
      }
    `;

    const result = await request(graphqlApi, query, { slug });
    return result.post;
}

export const getCategories = async () => {
    const query = gql`
        query getCategories{
            categories{
                name
                slug
            }
        }
    `

    const result = await request(graphqlApi, query);
    return result.categories;
}

export const getFeaturedPost = async () => {
    const query = gql`
      query GetFeaturedPost{
          posts(where:{featuredPost:true}){
              author{
                  name
                  photo{
                      url
                  }
              }
              featuredImage{
                  url
              }
              title
              slug
              createdAt
          }
      }
    `;

    const result = await request(graphqlApi, query);
    return result.posts;

}

export const getComments = async (slug) => {
    
    const query = gql`
       query GetComments($slug:String!){
        comments(where:{post:{slug:$slug}}){
               name
               createdAt
               comment
           }
       }
    `;

    const result = await request(graphqlApi, query, { slug });
    return result.comments;
}

export const getCategoryPost = async (slug) => {
    const query = gql`
    query GetCategoryPost($slug: String!) {
    
        category(where:{slug:$slug}){
            name
            slug
          authors {
            name
            bio
            id
            photo{
              url
            }
          }
        post{
          createdAt
          slug
          title
          excerpt
          featuredImage{
            url
        }
        }
       
        
        }
    }
  `;

  const result = await request(graphqlApi, query, { slug });

  return result.category;
}

export const submitComment = async (Obj) => {
    
    const result = await fetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(Obj)
    })

    return result.json();
}
