import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, Generated, CreateDateColumn, Unique} from "typeorm";

@Entity()
@Unique(["firstname", "lastname"])
export class User {

    @PrimaryColumn()
    id: string;

    @Column("varchar", {length: 100})
    firstname: string;

    @Column("varchar", {length: 100})
    lastname: string;

    @Column("varchar", {length: 100})
    partnerName: string;

    @Column("varchar", {default: "0"})
    phoneNo: string;

    @Column("integer", {default: -1})
    quantity: number;

    @Column('datetime', {default: '2020-12-31'})
    confirmationDueDate: Date;

    @Column("integer", {default: -1})
    confirmed: number;

    @Column("integer", {default: -1})
    confirmedQty: number;

    @Column("integer", {default: -1})
    expectedAccQty: number;

    @Column("integer", {default: -1})
    accomodationQty: number;

    @Column("integer", {default: -2})
    dishesForFirstPerson: number;

    @Column("integer", {default: -2})
    dishesForSecondPerson: number;

    @Column("varchar", {length: 5000, default:""})
    comment: string;

    @Column('datetime', {nullable: true})
    @CreateDateColumn()
    insertDate: Date;

    @Column('datetime', {nullable: true})
    lastVisitDate: Date;

    @Column('datetime', {nullable: true})
    confirmationDate: Date;

    @Column('datetime', {nullable: true})
    updateDate: Date;
}
