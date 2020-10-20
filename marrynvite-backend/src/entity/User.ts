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

    @Column("integer", {default: 0})
    quantity: number;

    @Column("integer", {default: 0})
    confirmed: number;

    @Column("integer", {default: 0})
    confirmedQty: number;

    @Column("integer", {default: 0})
    expectedAccQty: number;

    @Column("integer", {default: 0})
    accomodationQty: number;

    @Column("varchar", {length: 5000, default:""})
    comment: string;

    @Column('datetime', {nullable: true})
    @CreateDateColumn()
    insertDate: Date;

    @Column('datetime', {nullable: true})
    lastVisitDate: Date;

    @Column('datetime', {nullable: true})
    confirmationDate: Date;

}
