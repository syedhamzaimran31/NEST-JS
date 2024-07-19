import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BooksService } from './app.service';
import { Books } from './booksDatabase';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getAllBooks(): Books[] {
    return this.booksService.getAllBooks();
  }
  @Get('/:id')
  getBookById(@Param('id') id: string): Books[] | undefined {
    const bookID = +id;
    return this.booksService.getBookById(bookID);
  }

  @Post('addBook')
  addBook(@Body() book: Partial<Books>): Books | undefined {
    return this.booksService.addBook(book);
  }
  @Put('/:id')
  updateBook(
    @Param('id') id: string,
    @Body() book: Partial<Books>,
  ): Books | undefined {
    return this.booksService.updateBook(+id, book);
  }

  @Delete('/:id')
  deleteBook(@Param('id') id: string): Books[] | undefined {
    return this.booksService.deleteBook(+id);
  }
}
