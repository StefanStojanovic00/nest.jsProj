import { LightingAd } from "src/LightingAd/lighting-ad/entities/lighting-ad.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProfileType } from "src/enum/profileType.enum";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id: number;
  
    @Column({ type: 'text', nullable: false })
    public firstName: string;
  
    @Column({ type: 'text', nullable: false })
    public lastName: string;
  
    @Column({ type: 'text', nullable: false, unique: true })
    public email: string;
  
    @Column({ type: 'text', nullable: false })
    public password: string;
  
    @Column({ type: 'text', nullable: false })
    public phone: string;
  
    @Column({ type: 'text', nullable: false, default: ProfileType.user })
    public type: string;

    @Column({type:'text',nullable:true})
    public imagePath:string;
  

    @OneToMany(() => LightingAd, (ad: LightingAd) => ad.createdBy)
    public myAds: LightingAd[];
  

    @ManyToMany(() => LightingAd, (ad: LightingAd) => ad.users, { onDelete: 'CASCADE'})
    public favourites: LightingAd[];
}
