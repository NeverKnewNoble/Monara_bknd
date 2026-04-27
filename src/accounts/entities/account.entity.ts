import { AccountType } from "@prisma/client";

export class Account {
    id: string;
    name: string;
    type: AccountType;
    balance: number;
    createdAt: Date;
    updatedAt: Date;
}