import { AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import UsersModel from "./users.model";

@Table({
    tableName: "public_repos",
    timestamps: false 
})

export default class ReposModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;
  
    @ForeignKey(() => UsersModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    user_id: number;
  
    @Column({
        type: DataType.STRING(255),
        allowNull: false
    })
    owner: string;
  
    @Column({
        type: DataType.STRING(255),
        allowNull: false
    })
    project_name: string;
  
    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    project_url: string;
  
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0
    })
    stars: number;
  
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0
    })
    forks: number;
  
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0
    })
    open_issues: number;
  
    @Column({
        type: DataType.BIGINT,
        allowNull: false
    })
    created_at: number;
}