import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ParameterInput } from '../dtos/parameter.dto';
import { ParameterEntity } from '../entities';

@Injectable()
export class ParameterService {
    constructor(
        @InjectRepository(ParameterEntity)
        private readonly parameterRepository: Repository<ParameterEntity>,
    ) {}

    async findAll() {
        return this.parameterRepository.find();
    }

    async findOne(id: number) {
        return this.parameterRepository.findOne({ where: { id } });
    }

    async create(parameterInput: ParameterInput) {
        return this.parameterRepository.save(this.parameterRepository.create(parameterInput));
    }

    async update(id: number, parameterInput: ParameterInput) {
        return (await this.parameterRepository.update(id, parameterInput)).affected > 0;
    }

    async remove(id: number) {
        return (await this.parameterRepository.delete({ id })).affected > 0;
    }
}
