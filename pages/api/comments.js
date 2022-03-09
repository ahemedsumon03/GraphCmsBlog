import { GraphQLClient,gql } from 'graphql-request'

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const graphqlApi = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default async function handler(req, res) {
  
  const graphClient = new GraphQLClient(graphqlApi, {
    headers: {
      authorization:`Bearer ${process.env.GRAPHCMS_TOKEN}`
    }
  });

  const query = gql`
      mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
        createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) { id }
      }
    `;

  const result = await graphClient.request(query, req.body);

  return res.status(200).send(result);

}
