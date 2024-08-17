const DataLoader = require('dataloader');
const Book = require('./models/book');

const bookLoader = new DataLoader(async (authorIds) => {
  return await Book.find({ id: { $in: authorIds } }).then((books) => {
    return authorIds.map((id) => {
      const authorsBooks = books.filter(
        (book) => JSON.stringify(book.author) === JSON.stringify(id)
      );
      return authorsBooks.length;
    });
  });
});

module.exports = bookLoader;
