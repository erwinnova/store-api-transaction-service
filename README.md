How to run:

- Install and run docker locally (see: https://docs.docker.com/desktop/install/windows-install/)
- Run Clickhouse on docker using command:
  docker run --rm -e CLICKHOUSE_DB=transaction_database -e CLICKHOUSE_USER=user-transaction -e CLICKHOUSE_PASSWORD=password-transaction -p 8123:8123 -p 9000:9000/tcp clickhouse/clickhouse-server
- Run command 'npm install' on project folder to install dependencies
- Create .env file on project folder
- Fill .env file with following variables:
  - DB_NAME=transaction_database
    DB_USERNAME=user-transaction
    DB_PASSWORD=password-transaction
    DB_HOST=localhost
- Run command 'npm run db:exec' on project folder to run migrations
- Run command 'npm run start' on project folder
- See endpoints on Postman collection file on project folder
- Enjoy

Clickhouse command:
docker run --rm -e CLICKHOUSE_DB=transaction_database -e CLICKHOUSE_USER=user-transaction -e CLICKHOUSE_PASSWORD=password-transaction -p 8123:8123 -p 9000:9000/tcp clickhouse/clickhouse-server
