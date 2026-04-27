import { Module } from "@nestjs/common"
import { transactionsController } from './transactions.controller'
import { transactionsService } from './transactions.service'


@Module({
    controllers: [transactionsController],
    providers: [transactionsService]
})
export class transactionsModule {}