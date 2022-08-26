import Head from 'next/head';
import Link from 'next/link';
import {gql, useQuery} from '@apollo/client'
import { AwesomeLink } from '../components/AwesomeLink';

const AllLinksQuery = gql`
  query AllLinksQuery($first: Int, $after: String) {
    links(first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node{
          id
          url
          description
          title
          imageUrl
          category
        }
      }
    }
  }
`;

export default function Home() {
  const {loading, error, data, fetchMore} = useQuery(AllLinksQuery,{
    variables: {first: 2}
  });

  if(loading) return <p className='text-center'>Loading...</p>
  if(error) return <p className='text-center'>Error: {error.message}</p>

  const {endCursor, hasNextPage} = data.links.pageInfo;


  return (
    <>
      <Head>
        <title>Links FS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto max-w-5xl my-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data?.links.edges.map(({node}) => (
             <AwesomeLink
             title={node.title}
             category={node.category}
             url={node.url}
             id={node.id}
             description={node.description}
             imageUrl={node.imageUrl}
            />
          ))}
        </div>
        {hasNextPage ? (
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded my-10" 
            onClick={() => { fetchMore({
              variables: {after: endCursor},
              updateQuery: (prevResutl, {fetchMoreResult}) => {
                fetchMoreResult.links.edges = [
                  ...prevResutl.links.edges,
                  ...fetchMoreResult.links.edges
                ];
                return fetchMoreResult;
              }
            })}
            }>
            Load More
          </button>
          )
          : (
            <p className="my-10 text-center font-medium">
              You've reached the end.
            </p>
          )
        }
      </main>
    </>
  );
}
