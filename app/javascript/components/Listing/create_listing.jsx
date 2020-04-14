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


    const { data: listingData, loading: l, error: e } = useQuery(GET_LISTING_INFO);
    const { loading, error, data } = useQuery(CURRENT_USER);
   // const [createListing, { data }] = useMutation(CREATE_LISTING);

    if (loading) return 'Loading';
    if (error) return `Error ${error.message}`;
    
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
        console.log(listingData.createNewListing);
    }

    return (
        <Link className="btn btn-secondary" onClick={handleCreateListing} canShow={canShow}> Create </Link> 
    );
};

export default CreateListing;
