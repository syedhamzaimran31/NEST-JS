import { Injectable } from '@nestjs/common';
import { Books, books } from './booksDatabase';

@Injectable()
export class BooksService {
  getAllBooks(): Books[] {
    return books;
  }
  getBookById(bookID: number): Books[] | undefined {
    return books.filter((book) => book.id === bookID);
  }
  addBook(book: Partial<Books>): Books {
    if (!book.title || !book.author || !book.publicationYear) {
      throw new Error('Title, author, and publication year are required.');
    }
    const bookID = books[books.length - 1].id;
    const newBook: Books = {
      id: bookID + 1,
      author: book.author ?? '',
      title: book.title ?? '',
      publicationYear: book.publicationYear ?? 0,
    };
    books.push(newBook);
    return newBook;
  }
  updateBook(
    bookId: number,
    updateBookFields: Partial<Books>,
  ): Books | undefined {
    const currentBook = books.find((book) => book.id === bookId);
    const updatedBook = {
      id: bookId,
      title: updateBookFields.title ?? currentBook.title,
      author: updateBookFields.author ?? currentBook.author,
      publicationYear:
        updateBookFields.publicationYear ?? currentBook.publicationYear,
    };
    books[bookId - 1] = updatedBook;
    return updatedBook;
  }
  deleteBook(bookId: number): Books[] {
    books.splice(bookId - 1, 1);
    return books;
  }
}
