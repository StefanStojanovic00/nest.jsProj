import { Category } from "src/category/category/entities/category.entity";
import { User } from "src/User/user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class LightingAd {
    @PrimaryGeneratedColumn()
    public id:number;

    @Column({type:'text',nullable:false})
    public title:string;
    
    @Column({type:'text'})
    public description: string;

    @Column({type:'text',nullable:false})
    public brand: string;

    @Column({type:'text',nullable:false})
    public price: number;

    @Column({type:'text'})
    public gallery: string[];

    @ManyToOne(()=> User, (user:User)=>user.myAds)
    public createdBy: User;
    
    @ManyToOne(()=>Category,(category: Category)=>category.LightingAd)
    public category:Category;

    @ManyToMany(()=>User,(user:User)=>user.favourites)
    @JoinTable({name:'adFavourites'})
    public users:User[];
}
