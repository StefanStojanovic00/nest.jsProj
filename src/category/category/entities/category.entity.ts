import { LightingAd } from "src/LightingAd/lighting-ad/entities/lighting-ad.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    public id:number;

    @Column({type:'text',nullable:false})
    public name:string;

    @OneToMany(()=>LightingAd, (ad: LightingAd)=> ad.category)
    public LightingAd: LightingAd[];
}
