import { DataSourceOptions, DataSource } from 'typeorm';
import { UserEntity } from '../user.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}/${process.env.POSTGRES_DB}`,
  entities: [UserEntity],
  migrations: ['dist/apps/auth/db/migrations/*.js'],
};

export const dataSource = new DataSource(dataSourceOptions);
