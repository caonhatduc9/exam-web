import {
    BeforeInsert,
    Column,
    Entity,
    Index,
    PrimaryGeneratedColumn,
} from "typeorm";
import bcrypt from 'bcryptjs';


@Index("email", ["email"], { unique: true })
@Entity("user", { schema: "ats_affiliate" })
export class User {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    userId: number;

    @Column("varchar", { name: "email",  length: 50 })
    email: string;

    @Column("varchar", { name: "password", length: 100 })
    password: string;

    @Column("char", { name: "phone_number", nullable: true, length: 10 })
    phoneNumber: string | null;

    @Column("date", { name: "date_of_birth", nullable: true })
    dateOfBirth: string | null;

    @Column("enum", { name: "auth_provider", enum: ["local", "google"] })
    authProvider: "local" | "google";

    @Column("text", { name: "refresh_token", nullable: true })
    refreshToken: string | null;

    @Column({
        default: true,
    })
    verified: boolean;

    @Column({
        name: "verification_code",
        type: 'text',
        nullable: true,
    })
    verificationCode!: string | null;

    @Column("timestamp", {
        name: "created_at",
        default: () => "CURRENT_TIMESTAMP",
    })
    createdAt: Date;

    @Column("timestamp", {
        name: "modified_at",
        default: () => "CURRENT_TIMESTAMP",
    })
    modifiedAt: Date;

    @BeforeInsert()
    async hashPassword() {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
    }
}
