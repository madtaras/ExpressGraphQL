const FakeDB = {
  books: [
    {
      id: 0,
      title: "Something",
      author: "S. King"
    },
    {
      id: 1,
      title: "Martin Iden",
      author: "Jack London"
    }
  ]
};
let idCounter = FakeDB.books.length;



const resolvers = {
  Query: {
    books: () => FakeDB.books,
    book: (_, { id }) => FakeDB.books.find((elem) => elem.id === id)
  },
  Mutation: {
    addBook: (root, { title, author }) => {
      const result = {
        id: idCounter++,
        title,
        author
      };
      FakeDB.books.push(result);

      return result;
    }
  }
};

module.exports = resolvers;
