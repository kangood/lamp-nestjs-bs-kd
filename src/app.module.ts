import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SystemModule } from './modules/system/system.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '123456',
            database: 'lamp_nestjs_graphql',
            logging: 'all',
            synchronize: false,
            autoLoadEntities: true,
        }),
        GraphQLModule.forRoot({
            driver: ApolloDriver,
            autoSchemaFile: './schema.gql',
        }),
        SystemModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
