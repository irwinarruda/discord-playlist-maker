import { Exclude, Expose } from 'class-transformer';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
class User {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column()
    public name: string;

    @Column()
    public email: string;

    @Column()
    @Exclude()
    public password: string;

    @Column()
    public is_active: boolean;

    @Column()
    public avatar: string;

    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn()
    public updated_at: Date;

    @Expose({ name: 'avatar_url' })
    getAvatarUrl(): string | null {
        return this.avatar
            ? `${process.env.APP_API_URL}/files/${this.avatar}`
            : null;
    }
}

export { User };
