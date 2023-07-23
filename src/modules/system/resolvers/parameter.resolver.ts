import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { CREATE_ERROR, NOT_EXIST_ERROR, SUCCESS, UPDATE_ERROR } from '@/common/constants/code';

import { Result } from '@/common/dto/result.type';

import {
    ParameterInput,
    ParameterQueryDto,
    ParameterResult,
    ParameterResults,
} from '../dtos/parameter.dto';
import { ParameterService } from '../services/parameter.service';

@Resolver()
export class ParameterResolver {
    constructor(private readonly parameterService: ParameterService) {}

    @Query(() => ParameterResults, { description: '查询所有参数' })
    async findParameterList(@Args('parameterQueryDto') parameterQueryDto: ParameterQueryDto) {
        return this.parameterService.findParameterList(parameterQueryDto);
    }

    @Query(() => ParameterResult, { description: '查询单个参数' })
    async findParameter(@Args('id') id: number) {
        const result = await this.parameterService.findOne(id);
        return {
            code: SUCCESS,
            data: result,
            message: '获取成功',
        };
    }

    @Mutation(() => ParameterResult, { description: '新建参数' })
    async createParameter(@Args('parameterInput') parameterInput: ParameterInput) {
        const res = await this.parameterService.create(parameterInput);
        if (res) {
            return {
                code: SUCCESS,
                message: '新建成功',
                data: res,
            };
        }
        return {
            code: CREATE_ERROR,
            message: '新建失败',
        };
    }

    @Mutation(() => Result, { description: '修改参数' })
    async updateParameter(
        @Args('id') id: number,
        @Args('parameterInput') parameterInput: ParameterInput,
    ) {
        const res = await this.parameterService.update(id, parameterInput);
        if (res) {
            return {
                code: SUCCESS,
                message: '修改成功',
            };
        }
        return {
            code: UPDATE_ERROR,
            message: '修改失败',
        };
    }

    @Mutation(() => Result)
    async commitParameterInfo(
        @Args('params') params: ParameterInput,
        @Args('id', { nullable: true }) id: number,
    ) {
        if (!id) {
            const res = await this.parameterService.create(params);
            if (res) {
                return {
                    code: SUCCESS,
                    message: '创建成功',
                };
            }
            return {
                code: CREATE_ERROR,
                message: '创建失败',
            };
        }
        const parameter = await this.parameterService.findOne(id);
        if (parameter) {
            const res = await this.parameterService.update(parameter.id, params);
            if (res) {
                return {
                    code: SUCCESS,
                    message: '更新成功',
                };
            }
            return {
                code: UPDATE_ERROR,
                message: '更新失败',
            };
        }
        return {
            code: NOT_EXIST_ERROR,
            message: '参数不存在',
        };
    }

    @Mutation(() => Result, { description: '删除参数' })
    async removeParameter(@Args('id') id: number) {
        const res = await this.parameterService.remove(id);
        if (res) {
            return {
                code: SUCCESS,
                message: '删除成功',
            };
        }
        return {
            code: UPDATE_ERROR,
            message: '删除失败',
        };
    }
}
