import { gql } from '@apollo/client';

export const GET_ALL_DATA = gql`
  query {
    people {
      id
      firstName
      lastName
      cars {
        id
        make
        model
        year
        price
      }
    }
  }
`;

export const GET_PERSON_WITH_CARS = gql`
  query($id: ID!) {
    personWithcars(id: $id) {
      id
      firstName
      lastName
      cars {
        id
        make
        model
        year
        price
      }
    }
  }
`;
