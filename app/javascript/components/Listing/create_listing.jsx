import React, { useState, useEffect } from 'react';

import { useQuery, useApolloClient, getDataFromTree } from 'react-apollo';
import gql from 'graphql-tag';

import Link from '../link';

// const CREATE_LISTING = gql`
// mutation createListing($title: String!, $description: String!, $imgUrl: String!){
//     createListing(title:$title, description:$description, imageUrl:$imgUrl){
//       listing{
//         id
//       }
//     }
//   }
// `;

const CURRENT_USER = gql`
  {
    currentUser {
        id,
        email
    }
  }
`;

const GET_LISTING_INFO = gql`
  {
    selectedListingId @client
    edit @client
    createNewListing @client
  }
`;

const CreateListing = () => {

    const client = useApolloClient();

    const[canShow, setCanShow] = useState(false);

    const { loading, error, data } = useQuery(CURRENT_USER);
   // const [createListing, { data }] = useMutation(CREATE_LISTING);

    
    useEffect(()=>{
        if (data && data.currentUser) {
            setCanShow(true);
        }
    },[data]);


    const handleCreateListing = (e) => {
        if (e) {
            e.preventDefault();
        }

        client.writeData({ data: { createNewListing: true } });
    }

    if (loading) return 'Loading';
    if (error) return `Error ${error.message}`;
    
    return (
        <Link className="btn btn-secondary" onClick={handleCreateListing} canShow={canShow}> Create </Link> 
    );
};

export default CreateListing;
