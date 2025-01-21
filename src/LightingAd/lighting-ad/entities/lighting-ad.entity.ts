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

    @Column('simple-array')
    public gallery: string[];

    @Column({type:'boolean',default:false })
    public deleted:boolean;

    @ManyToOne(()=> User, (user:User)=>user.myAds, { onDelete: 'CASCADE' })
    public createdBy: User;
    
    @ManyToOne(()=>Category,(category: Category)=>category.LightingAd, { onDelete: 'CASCADE' }) 
    public category:Category;



    @ManyToMany(()=>User,(user:User)=>user.favourites)
    @JoinTable({name:'adFavourites'})
    public users:User[];
    
}
