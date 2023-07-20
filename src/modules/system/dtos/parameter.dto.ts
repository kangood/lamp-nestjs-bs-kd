import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

import { createResult, createResults } from '@/common/dto/result.type';

@InputType()
export class ParameterInput {
    @Field({ description: '状态' })
    @IsNotEmpty({ groups: ['create', 'update'], message: '状态值必须传递' })
    state!: boolean;

    @Field({ description: '内置值' })
    @IsNotEmpty({ groups: ['create', 'update'], message: '内置值必须传递' })
    readonly!: boolean;

    @Field({ description: '参数键' })
    @IsNotEmpty({ groups: ['create'], message: '参数键不能为空' })
    @IsOptional({ groups: ['update'] })
    key!: string;

    @Field({ description: '参数名称' })
    @IsNotEmpty({ groups: ['create', 'update'], message: '参数名称不能为空' })
    name!: string;

    @Field({ description: '参数值' })
    @IsNotEmpty({ groups: ['create', 'update'], message: '参数值不能为空' })
    value!: string;

    @Field({ description: '描述' })
    @IsOptional()
    describe?: string;
}

@ObjectType()
export class ParameterOutPut {
    @Field({ description: 'id' })
    id: number;

    @Field({ description: '参数键' })
    key: string;

    @Field({ description: '参数值' })
    value: string;

    @Field({ description: '参数名称' })
    name: string;

    @Field({ description: '描述' })
    describe: string | null;

    @Field({ description: '状态' })
    state: boolean | null;

    @Field({ description: '内置' })
    readonly: boolean | null;
}

@ObjectType()
export class ParameterResult extends createResult(ParameterOutPut) {}

@ObjectType()
export class ParameterResults extends createResults(ParameterOutPut) {}
