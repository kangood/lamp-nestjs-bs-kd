import { Exclude, Expose } from 'class-transformer';
import { Column, Entity, Index } from 'typeorm';

import { CommonEntity } from '@/common/entities/common.entity';

@Exclude()
@Index('uk_type_code', ['type', 'code'], { unique: true })
@Entity('c_dictionary', { schema: 'lamp_generator' })
export class DictionaryEntity extends CommonEntity {
    @Expose()
    @Column('varchar', { name: 'type', comment: '类型', length: 255 })
    type: string;

    @Expose()
    @Column('varchar', { name: 'label', comment: '类型标签', length: 255 })
    label: string;

    @Expose()
    @Column('varchar', { name: 'code', comment: '编码', length: 64 })
    code: string;

    @Expose()
    @Column('varchar', { name: 'name', comment: '名称', length: 64 })
    name: string;

    @Expose()
    @Column('bit', {
        name: 'state',
        nullable: true,
        comment: '状态',
        default: () => "'b'1''",
    })
    state: boolean | null;

    @Expose()
    @Column('varchar', {
        name: 'describe_',
        nullable: true,
        comment: '描述',
        length: 255,
    })
    describe: string | null;

    @Expose({ groups: ['dict-list'] })
    @Column('int', {
        name: 'sort_value',
        nullable: true,
        comment: '排序',
        default: () => "'1'",
    })
    sortValue: number | null;

    @Expose()
    @Column('varchar', {
        name: 'icon',
        nullable: true,
        comment: '图标',
        length: 255,
    })
    icon: string | null;

    @Expose()
    @Column('varchar', {
        name: 'css_style',
        nullable: true,
        comment: 'css样式',
        length: 255,
    })
    cssStyle: string | null;

    @Expose()
    @Column('varchar', {
        name: 'css_class',
        nullable: true,
        comment: 'css class',
        length: 255,
    })
    cssClass: string | null;

    @Expose()
    @Column('bit', {
        name: 'readonly_',
        nullable: true,
        comment: '内置',
        default: () => "'b'0''",
    })
    readonly: boolean | null;
}
