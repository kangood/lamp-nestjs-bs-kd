import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { SUCCESS } from '@/common/constants/code';

import { ParameterInput, ParameterQueryDto } from '../dtos/parameter.dto';
import { ParameterEntity } from '../entities';

@Injectable()
export class ParameterService {
    constructor(
        @InjectRepository(ParameterEntity)
        private readonly parameterRepository: Repository<ParameterEntity>,
    ) {}

    /**
     * 分页查询参数集
     */
    async findParameterList(parameterQueryDto: ParameterQueryDto) {
        // 计算分页值
        const { pageNum, pageSize, name, key, value } = parameterQueryDto;
        const skip = pageNum === 1 ? 0 : (pageNum - 1) * pageSize;
        const take = pageSize;
        // 添加条件查询
        const where: FindOptionsWhere<ParameterEntity> = {};
        if (name) {
            where.name = name;
        }
        if (key) {
            where.key = key;
        }
        if (value) {
            where.value = value;
        }
        // 查询数据
        const [results, total] = await this.parameterRepository.findAndCount({
            skip,
            take,
            order: {
                createdAt: 'DESC',
            },
            where,
        });
        // 返回
        return {
            code: SUCCESS,
            data: results,
            page: {
                pageNum,
                pageSize,
                total,
            },
            message: '获取成功',
        };
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
