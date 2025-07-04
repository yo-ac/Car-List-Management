
const typeDefs = `
type Person {
  id: ID!
  firstName: String!
  lastName: String!
  cars: [Car]
}

type Car {
  id: ID!
  year: String!
  make: String!
  model: String!
  price: String!
  personId: ID!
}

type Query {
  people: [Person]
  cars: [Car]
  personWithcars(id: ID!): Person
}

type Mutation {
  addPerson(firstName: String!, lastName: String!): Person
  addCar(year: String!, make: String!, model: String!, price: String!, personId: ID!): Car
  deletePerson(id: ID!): Person
  deleteCar(id: ID!): Car
  updateCar(id: ID!, year: Int!, make: String!, model: String!, price: Float!): Car
}

`;

module.exports = typeDefs;
