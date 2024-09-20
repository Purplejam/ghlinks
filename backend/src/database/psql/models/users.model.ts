import {
    Column,
    Model,
    Table,
    DataType,
    PrimaryKey,
    AutoIncrement
} from "sequelize-typescript";

@Table({
    tableName: "users",
    timestamps: false
})

export default class UsersModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    public id: number;

    @Column(DataType.STRING(128))
    public email: string;

    @Column(DataType.STRING(128))
    public password: string;
}