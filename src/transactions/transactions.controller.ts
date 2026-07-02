import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { transactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transactions')
export class transactionsController {
  constructor(private transactionsService: transactionsService) {}

  @Get(':id')
  async getTransaction(@Param('id') id: string) {
    return this.transactionsService.getTransaction(id);
  }

  @Post()
  async createTransaction(@Body() dto: CreateTransactionDto) {
    return this.transactionsService.createTransaction(dto);
  }
}
