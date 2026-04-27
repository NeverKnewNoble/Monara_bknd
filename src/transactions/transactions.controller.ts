import { BadRequestException, Body, Controller, Get, Param, Post } from "@nestjs/common"
import { transactionsService } from "./transactions.service"
import { Transaction } from "./entities/transactions.entity"

@Controller('transactions')
export class transactionsController {
    constructor(private transactionsService: transactionsService) {}

    // Get a transaction by id
    @Get(':id')
    async getTransaction(@Param('id') id: string) {
        return this.transactionsService.getTransaction(id)
    }

    // Create a new transaction
    @Post()
    async createTransaction(@Body() data: Transaction) {
        try {
            return this.transactionsService.createTransaction(data)
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
