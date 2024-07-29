import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import {
  ClickHouseClient,
  CLICKHOUSE_ASYNC_INSTANCE_TOKEN,
} from '@depyronick/nestjs-clickhouse';
import { PaginationOptionsDto } from 'src/paginate/pagination-options.dto';

@Injectable()
export class TransactionService {
  constructor(
    @Inject(CLICKHOUSE_ASYNC_INSTANCE_TOKEN)
    private transactionServer: ClickHouseClient,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const { sku, qty, amount } = createTransactionDto;

    const uuid = await this.transactionServer.queryPromise(
      'SELECT generateUUIDv4()',
    );
    await this.transactionServer.insertPromise('transactions', [
      { id: uuid[0]['generateUUIDv4()'], sku, qty, amount },
    ]);

    const rows = await this.transactionServer.queryPromise(
      `SELECT * FROM transactions WHERE id = '${uuid[0]['generateUUIDv4()']}' LIMIT 1`,
    );

    return rows;
  }

  async findAll(options: PaginationOptionsDto) {
    const rows = await this.transactionServer.queryPromise(
      `SELECT * FROM transactions LIMIT ${options.size} OFFSET ${options.page * options.size}`,
    );
    return rows;
  }

  async findOne(id: string) {
    const rows = await this.transactionServer.queryPromise(
      `SELECT * FROM transactions WHERE id = '${id}' LIMIT 1`,
    );

    if (rows.length === 0) {
      throw new NotFoundException('transaction not found');
    }

    return rows[0];
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    const { sku, qty, amount } = updateTransactionDto;
    const rows = await this.transactionServer.queryPromise(
      `SELECT * FROM transactions WHERE id = '${id}' LIMIT 1`,
    );

    if (rows.length === 0) {
      throw new NotFoundException('transaction not found');
    }

    await this.transactionServer.queryPromise(
      `ALTER TABLE transactions
      UPDATE sku = '${sku}', qty = ${qty}, amount = ${amount}
      WHERE id = '${id}'`,
    );

    return 'success';
  }

  async remove(id: string) {
    const rows = await this.transactionServer.queryPromise(
      `SELECT * FROM transactions WHERE id = '${id}' LIMIT 1`,
    );

    if (rows.length === 0) {
      throw new NotFoundException('transaction not found');
    }

    await this.transactionServer.queryPromise(
      `ALTER TABLE transactions
      DELETE WHERE id = '${id}'`,
    );

    return 'success';
  }
}
