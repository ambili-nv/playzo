export interface WalletEntity {
    userId: string;
    balance: number;
    transactions: Transaction[];
}

export interface Transaction {
    amount: number;
    type: 'credit' | 'debit';
    description: string;
    createdAt: Date;
}

export const createWalletEntity = (
    userId: string,
    balance: number = 0,
    transactions: Transaction[] = []
): WalletEntity => ({
    userId,
    balance,
    transactions
});

export const createTransaction = (
    amount: number,
    type: 'credit' | 'debit',
    description: string,
    createdAt: Date = new Date()
): Transaction => ({
    amount,
    type,
    description,
    createdAt
});
