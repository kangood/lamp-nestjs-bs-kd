import { Column, Entity, Index } from 'typeorm';

import { CommonEntity } from '@/common/entities/common.entity';

@Index('uk_key', ['key'], { unique: true })
@Entity('c_parameter', { schema: 'lamp_generator' })
export class ParameterEntity extends CommonEntity {
    @Column('varchar', {
        name: 'key_',
        unique: true,
        comment: '参数键',
        length: 255,
    })
    key: string;

    @Column('varchar', { name: 'value', comment: '参数值', length: 255 })
    value: string;

    @Column('varchar', { name: 'name', comment: '参数名称', length: 255 })
    name: string;

    @Column('varchar', {
        name: 'describe_',
        nullable: true,
        comment: '描述',
        length: 255,
    })
    describe: string | null;

    @Column('bit', {
        name: 'state',
        nullable: true,
        comment: '状态',
        default: () => '1',
    })
    state: boolean | null;

    @Column('bit', {
        name: 'readonly_',
        nullable: true,
        comment: '内置',
        default: () => '0',
    })
    readonly: boolean | null;
}
