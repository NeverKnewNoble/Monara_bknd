import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoriesModule } from './categories/categories.module';
import { AccountsModule } from './accounts/accounts.module';
import { BudgetsModule } from './budgets/budgets.module';
import { GoalsModule } from './goals/goals.module';
import { transactionsModule } from './transactions/transactions.module';

@Module({
  imports: [UsersModule, AuthModule, transactionsModule, PrismaModule, GoalsModule, CategoriesModule, AccountsModule, BudgetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
