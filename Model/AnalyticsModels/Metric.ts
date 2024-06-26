import AnalyticsBaseModel from 'Common/AnalyticsModels/BaseModel';
import AnalyticsTableColumn from 'Common/Types/AnalyticsDatabase/TableColumn';
import TableColumnType from 'Common/Types/AnalyticsDatabase/TableColumnType';
import AnalyticsTableEngine from 'Common/Types/AnalyticsDatabase/AnalyticsTableEngine';
import ObjectID from 'Common/Types/ObjectID';
import Route from 'Common/Types/API/Route';
import Permission from 'Common/Types/Permission';
import { JSONObject } from 'Common/Types/JSON';

export default class Metric extends AnalyticsBaseModel {
    public constructor() {
        super({
            tableName: 'Metric',
            tableEngine: AnalyticsTableEngine.MergeTree,
            singularName: 'Metric',
            pluralName: 'Metrics',
            crudApiPath: new Route('/metrics'),
            accessControl: {
                read: [
                    Permission.ProjectOwner,
                    Permission.ProjectAdmin,
                    Permission.ProjectMember,
                    Permission.CanReadTelemetryServiceTraces,
                ],
                create: [
                    Permission.ProjectOwner,
                    Permission.ProjectAdmin,
                    Permission.ProjectMember,
                    Permission.CanCreateTelemetryServiceTraces,
                ],
                update: [
                    Permission.ProjectOwner,
                    Permission.ProjectAdmin,
                    Permission.ProjectMember,
                    Permission.CanEditTelemetryServiceTraces,
                ],
                delete: [
                    Permission.ProjectOwner,
                    Permission.ProjectAdmin,
                    Permission.ProjectMember,
                    Permission.CanDeleteTelemetryServiceTraces,
                ],
            },
            tableColumns: [
                new AnalyticsTableColumn({
                    key: 'projectId',
                    title: 'Project ID',
                    description: 'ID of project',
                    required: true,
                    type: TableColumnType.ObjectID,
                    isTenantId: true,
                    accessControl: {
                        read: [
                            Permission.ProjectOwner,
                            Permission.ProjectAdmin,
                            Permission.ProjectMember,
                            Permission.CanReadTelemetryServiceLog,
                        ],
                        create: [
                            Permission.ProjectOwner,
                            Permission.ProjectAdmin,
                            Permission.ProjectMember,
                            Permission.CanCreateTelemetryServiceLog,
                        ],
                        update: [],
                    },
                }),

                new AnalyticsTableColumn({
                    key: 'serviceId',
                    title: 'Service ID',
                    description: 'ID of the Service which created the log',
                    required: true,
                    type: TableColumnType.ObjectID,
                    accessControl: {
                        read: [
                            Permission.ProjectOwner,
                            Permission.ProjectAdmin,
                            Permission.ProjectMember,
                            Permission.CanReadTelemetryServiceLog,
                        ],
                        create: [
                            Permission.ProjectOwner,
                            Permission.ProjectAdmin,
                            Permission.ProjectMember,
                            Permission.CanCreateTelemetryServiceLog,
                        ],
                        update: [],
                    },
                }),

                // add name and description

                new AnalyticsTableColumn({
                    key: 'name',
                    title: 'Name',
                    description: 'Name of the Metric',
                    required: true,
                    type: TableColumnType.Text,
                    accessControl: {
                        read: [
                            Permission.ProjectOwner,
                            Permission.ProjectAdmin,
                            Permission.ProjectMember,
                            Permission.CanReadTelemetryServiceLog,
                        ],
                        create: [
                            Permission.ProjectOwner,
                            Permission.ProjectAdmin,
                            Permission.ProjectMember,
                            Permission.CanCreateTelemetryServiceLog,
                        ],
                        update: [],
                    },
                }),

                new AnalyticsTableColumn({
                    key: 'description',
                    title: 'Description',
                    description: 'Description of the Metric',
                    required: false,
                    type: TableColumnType.Text,
                    accessControl: {
                        read: [
                            Permission.ProjectOwner,
                            Permission.ProjectAdmin,
                            Permission.ProjectMember,
                            Permission.CanReadTelemetryServiceLog,
                        ],
                        create: [
                            Permission.ProjectOwner,
                            Permission.ProjectAdmin,
                            Permission.ProjectMember,
                            Permission.CanCreateTelemetryServiceLog,
                        ],
                        update: [],
                    },
                }),

                // this is end time.
                new AnalyticsTableColumn({
                    key: 'time',
                    title: 'Time',
                    description: 'When did the Metric happen?',
                    required: true,
                    type: TableColumnType.Date,
                    accessControl: {
                        read: [
                            Permission.ProjectOwner,
                            Permission.ProjectAdmin,
                            Permission.ProjectMember,
                            Permission.CanReadTelemetryServiceLog,
                        ],
                        create: [
                            Permission.ProjectOwner,
                            Permission.ProjectAdmin,
                            Permission.ProjectMember,
                            Permission.CanCreateTelemetryServiceLog,
                        ],
                        update: [],
                    },
                }),

                new AnalyticsTableColumn({
                    key: 'startTime',
                    title: 'Start Time',
                    description: 'When did the Metric happen?',
                    required: false,
                    type: TableColumnType.Date,
                    accessControl: {
                        read: [
                            Permission.ProjectOwner,
                            Permission.ProjectAdmin,
                            Permission.ProjectMember,
                            Permission.CanReadTelemetryServiceLog,
                        ],
                        create: [
                            Permission.ProjectOwner,
                            Permission.ProjectAdmin,
                            Permission.ProjectMember,
                            Permission.CanCreateTelemetryServiceLog,
                        ],
                        update: [],
                    },
                }),

                // end time.
                new AnalyticsTableColumn({
                    key: 'timeUnixNano',
                    title: 'Time (in Unix Nano)',
                    description: 'When did the Metric happen?',
                    required: true,
                    type: TableColumnType.LongNumber,
                    accessControl: {
                        read: [
                            Permission.ProjectOwner,
                            Permission.ProjectAdmin,
                            Permission.ProjectMember,
                            Permission.CanReadTelemetryServiceLog,
                        ],
                        create: [
                            Permission.ProjectOwner,
                            Permission.ProjectAdmin,
                            Permission.ProjectMember,
                            Permission.CanCreateTelemetryServiceLog,
                        ],
                        update: [],
                    },
                }),

                new AnalyticsTableColumn({
                    key: 'startTimeUnixNano',
                    title: 'Start Time (in Unix Nano)',
                    description: 'When did the Metric happen?',
                    required: false,
                    type: TableColumnType.LongNumber,
                    accessControl: {
                        read: [
                            Permission.ProjectOwner,
                            Permission.ProjectAdmin,
                            Permission.ProjectMember,
                            Permission.CanReadTelemetryServiceLog,
                        ],
                        create: [
                            Permission.ProjectOwner,
                            Permission.ProjectAdmin,
                            Permission.ProjectMember,
                            Permission.CanCreateTelemetryServiceLog,
                        ],
                        update: [],
                    },
                }),

                new AnalyticsTableColumn({
                    key: 'attributes',
                    title: 'Attributes',
                    description: 'Attributes',
                    required: true,
                    type: TableColumnType.JSON,
                    defaultValue: {},
                    accessControl: {
                        read: [
                            Permission.ProjectOwner,
                            Permission.ProjectAdmin,
                            Permission.ProjectMember,
                            Permission.CanReadTelemetryServiceLog,
                        ],
                        create: [
                            Permission.ProjectOwner,
                            Permission.ProjectAdmin,
                            Permission.ProjectMember,
                            Permission.CanCreateTelemetryServiceLog,
                        ],
                        update: [],
                    },
                }),

                new AnalyticsTableColumn({
                    key: 'count',
                    title: 'Count',
                    description: 'Count',
                    required: false,
                    type: TableColumnType.Number,
                    accessControl: {
                        read: [
                            Permission.ProjectOwner,
                            Permission.ProjectAdmin,
                            Permission.ProjectMember,
                            Permission.CanReadTelemetryServiceLog,
                        ],
                        create: [
                            Permission.ProjectOwner,
                            Permission.ProjectAdmin,
                            Permission.ProjectMember,
                            Permission.CanCreateTelemetryServiceLog,
                        ],
                        update: [],
                    },
                }),

                new AnalyticsTableColumn({
                    key: 'sum',
                    title: 'Sum',
                    description: 'Sum',
                    required: false,
                    type: TableColumnType.Number,
                    accessControl: {
                        read: [
                            Permission.ProjectOwner,
                            Permission.ProjectAdmin,
                            Permission.ProjectMember,
                            Permission.CanReadTelemetryServiceLog,
                        ],
                        create: [
                            Permission.ProjectOwner,
                            Permission.ProjectAdmin,
                            Permission.ProjectMember,
                            Permission.CanCreateTelemetryServiceLog,
                        ],
                        update: [],
                    },
                }),

                new AnalyticsTableColumn({
                    key: 'value',
                    title: 'Value',
                    description: 'Value',
                    required: false,
                    type: TableColumnType.Number,
                    accessControl: {
                        read: [
                            Permission.ProjectOwner,
                            Permission.ProjectAdmin,
                            Permission.ProjectMember,
                            Permission.CanReadTelemetryServiceLog,
                        ],
                        create: [
                            Permission.ProjectOwner,
                            Permission.ProjectAdmin,
                            Permission.ProjectMember,
                            Permission.CanCreateTelemetryServiceLog,
                        ],
                        update: [],
                    },
                }),

                new AnalyticsTableColumn({
                    key: 'min',
                    title: 'Min',
                    description: 'Min',
                    required: false,
                    type: TableColumnType.Number,
                    accessControl: {
                        read: [
                            Permission.ProjectOwner,
                            Permission.ProjectAdmin,
                            Permission.ProjectMember,
                            Permission.CanReadTelemetryServiceLog,
                        ],
                        create: [
                            Permission.ProjectOwner,
                            Permission.ProjectAdmin,
                            Permission.ProjectMember,
                            Permission.CanCreateTelemetryServiceLog,
                        ],
                        update: [],
                    },
                }),

                new AnalyticsTableColumn({
                    key: 'max',
                    title: 'Max',
                    description: 'Max',
                    required: false,
                    type: TableColumnType.Number,
                    accessControl: {
                        read: [
                            Permission.ProjectOwner,
                            Permission.ProjectAdmin,
                            Permission.ProjectMember,
                            Permission.CanReadTelemetryServiceLog,
                        ],
                        create: [
                            Permission.ProjectOwner,
                            Permission.ProjectAdmin,
                            Permission.ProjectMember,
                            Permission.CanCreateTelemetryServiceLog,
                        ],
                        update: [],
                    },
                }),

                new AnalyticsTableColumn({
                    key: 'bucketCounts',
                    title: 'Bucket Counts',
                    description: 'Bucket Counts',
                    required: true,
                    defaultValue: [],
                    type: TableColumnType.ArrayNumber,
                    accessControl: {
                        read: [
                            Permission.ProjectOwner,
                            Permission.ProjectAdmin,
                            Permission.ProjectMember,
                            Permission.CanReadTelemetryServiceLog,
                        ],
                        create: [
                            Permission.ProjectOwner,
                            Permission.ProjectAdmin,
                            Permission.ProjectMember,
                            Permission.CanCreateTelemetryServiceLog,
                        ],
                        update: [],
                    },
                }),

                new AnalyticsTableColumn({
                    key: 'explicitBounds',
                    title: 'Explicit Bonds',
                    description: 'Explicit Bonds',
                    required: true,
                    defaultValue: [],
                    type: TableColumnType.ArrayNumber,
                    accessControl: {
                        read: [
                            Permission.ProjectOwner,
                            Permission.ProjectAdmin,
                            Permission.ProjectMember,
                            Permission.CanReadTelemetryServiceLog,
                        ],
                        create: [
                            Permission.ProjectOwner,
                            Permission.ProjectAdmin,
                            Permission.ProjectMember,
                            Permission.CanCreateTelemetryServiceLog,
                        ],
                        update: [],
                    },
                }),
            ],
            primaryKeys: ['projectId', 'serviceId', 'time'],
        });
    }

    public get projectId(): ObjectID | undefined {
        return this.getColumnValue('projectId') as ObjectID | undefined;
    }

    public set projectId(v: ObjectID | undefined) {
        this.setColumnValue('projectId', v);
    }

    public get serviceId(): ObjectID | undefined {
        return this.getColumnValue('serviceId') as ObjectID | undefined;
    }

    public get name(): string | undefined {
        return this.getColumnValue('name') as string | undefined;
    }

    public set name(v: string | undefined) {
        this.setColumnValue('name', v);
    }

    public get description(): string | undefined {
        return this.getColumnValue('description') as string | undefined;
    }

    public set description(v: string | undefined) {
        this.setColumnValue('description', v);
    }

    public set serviceId(v: ObjectID | undefined) {
        this.setColumnValue('serviceId', v);
    }

    public get time(): Date | undefined {
        return this.getColumnValue('time') as Date | undefined;
    }

    public set time(v: Date | undefined) {
        this.setColumnValue('time', v);
    }

    public get attributes(): JSONObject | undefined {
        return this.getColumnValue('attributes') as JSONObject | undefined;
    }

    public set attributes(v: JSONObject | undefined) {
        this.setColumnValue('attributes', v);
    }

    public get startTime(): Date | undefined {
        return this.getColumnValue('startTime') as Date | undefined;
    }

    public set startTime(v: Date | undefined) {
        this.setColumnValue('startTime', v);
    }

    public get startTimeUnixNano(): number | undefined {
        return this.getColumnValue('startTimeUnixNano') as number | undefined;
    }

    public set startTimeUnixNano(v: number | undefined) {
        this.setColumnValue('startTimeUnixNano', v);
    }

    public get timeUnixNano(): number | undefined {
        return this.getColumnValue('timeUnixNano') as number | undefined;
    }

    public set timeUnixNano(v: number | undefined) {
        this.setColumnValue('timeUnixNano', v);
    }

    public get count(): number | undefined {
        return this.getColumnValue('count') as number | undefined;
    }

    public set count(v: number | undefined) {
        this.setColumnValue('count', v);
    }

    public get sum(): number | undefined {
        return this.getColumnValue('sum') as number | undefined;
    }

    public set sum(v: number | undefined) {
        this.setColumnValue('sum', v);
    }

    public get value(): number | undefined {
        return this.getColumnValue('value') as number | undefined;
    }

    public set value(v: number | undefined) {
        this.setColumnValue('value', v);
    }

    public get min(): number | undefined {
        return this.getColumnValue('min') as number | undefined;
    }

    public set min(v: number | undefined) {
        this.setColumnValue('min', v);
    }

    public get max(): number | undefined {
        return this.getColumnValue('max') as number | undefined;
    }

    public set max(v: number | undefined) {
        this.setColumnValue('max', v);
    }

    public get bucketCounts(): Array<number> | undefined {
        return this.getColumnValue('bucketCounts') as Array<number> | undefined;
    }

    public set bucketCounts(v: Array<number> | undefined) {
        this.setColumnValue('bucketCounts', v);
    }

    public get explicitBounds(): Array<number> | undefined {
        return this.getColumnValue('explicitBounds') as
            | Array<number>
            | undefined;
    }

    public set explicitBounds(v: Array<number> | undefined) {
        this.setColumnValue('explicitBounds', v);
    }
}
