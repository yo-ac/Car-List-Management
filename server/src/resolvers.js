let { people, cars } = require('./peopleCarsScheme');

const resolvers = {
  Query: {
    people: () => people,
    cars: () => cars,
    personWithcars: (_, { id }) => people.find(p => p.id === id),
  },
  Person: {
    cars: (parent) => cars.filter(car => car.personId === parent.id),
  },
  Mutation: {
    addPerson: (_, { firstName, lastName }) => {
      const newPerson = {
        id: (people.length + 1).toString(),
        firstName,
        lastName
      };
      people.push(newPerson);
      return newPerson;
    },
    addCar: (_, { year, make, model, price, personId }) => {
      const newCar = {
        id: (cars.length + 1).toString(),
        year,
        make,
        model,
        price,
        personId
      };
      cars.push(newCar);
      return newCar;
    },
    deletePerson: (_, { id }) => {
      const index = people.findIndex(p => p.id === id);
      if (index === -1) return null;
      const deleted = people.splice(index, 1)[0];
      // También elimina los autos relacionados
      cars = cars.filter(c => c.personId !== id);
      return deleted;
    },
    updateCar: (_, { id, year, make, model, price }) => {
      const index = cars.findIndex(c => c.id === id);
      if (index === -1) return null;

      const updatedCar = {
        ...cars[index],
        year,
        make,
        model,
        price
      };

      cars[index] = updatedCar;
      return updatedCar;
    },

    deleteCar: (_, { id }) => {
      const index = cars.findIndex(c => c.id === id);
      if (index === -1) return null;
      return cars.splice(index, 1)[0];
    }

  }
};

module.exports = resolvers;
