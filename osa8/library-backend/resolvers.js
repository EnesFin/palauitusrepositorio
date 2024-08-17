const { GraphQLError } = require('graphql');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');

const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

/*TODO Clean this*/

const resolvers = {
  Query: {
    me: async (root, args, context) => {
      return await context.currentUser;
    },
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    allAuthors: async (root, args) => await Author.find({}),
    favoriteBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      const favoriteGenre = currentUser.favoriteGenre;
      return Book.find({ genres: { $in: favoriteGenre } }).populate('author');
    },
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author });
        return Book.find({
          $and: [{ author: { $in: author.id } }, { genres: { $in: args.genre } }],
        }).populate('author');
      } else if (args.author) {
        const author = await Author.findOne({ name: args.author });
        return Book.find({ author: { $in: author.id } }).populate('author');
      } else if (args.genre) {
        return Book.find({ genres: { $in: args.genre } }).populate('author');
      }
      return Book.find({}).populate('author');
    },
  },
  Author: {
    bookCount: (root, args, context) => {
      return context.bookLoader.load(root._id);
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError('Authentication error', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        });
      }

      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({ name: args.author });

        try {
          await author.save();
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error,
            },
          });
        }
      }
      console.log(author);
      const newBook = new Book({ ...args, author: author });
      console.log(newBook);
      try {
        await newBook.save();
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        });
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: newBook });

      return newBook;
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError('Authentication error', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        });
      }
      const author = await Author.findOne({ name: args.name });

      if (!author) {
        return null;
      }
      author.born = args.setBornTo;

      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError('Editing author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        });
      }
      return author;
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre });

      return user.save().catch((error) => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'foobar') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
};
module.exports = resolvers;
