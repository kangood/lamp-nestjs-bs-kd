import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ParameterEntity } from './entities';
import { ParameterResolver } from './resolvers/parameter.resolver';
import { ParameterService } from './services/parameter.service';

@Module({
    imports: [TypeOrmModule.forFeature([ParameterEntity])],
    providers: [ParameterService, ParameterResolver],
    exports: [ParameterService],
})
export class SystemModule {}
