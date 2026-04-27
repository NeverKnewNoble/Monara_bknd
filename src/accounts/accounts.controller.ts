import { BadRequestException, Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AccountsService } from "./accounts.service";
import { Account } from "./entities/account.entity";

@Controller('accounts')
export class AccountsController {
    constructor(private accountsService: AccountsService) {}

    // Fetch an account by id
    @Get(':id')
    async GetAccount(@Param('id') id: string) {
        return this.accountsService.fetchAccount(id);
    }

    // Create a new account
    @Post()
    async createAccount(@Body() data: Account) {
        try {
            return this.accountsService.createAccount(data);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}