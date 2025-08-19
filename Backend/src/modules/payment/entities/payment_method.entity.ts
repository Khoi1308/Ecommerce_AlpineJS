import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity('payment_method')
export class PaymentMethod {
  @PrimaryGeneratedColumn('uuid') 
  paymentMethodId!: string;

  @Column() 
  provider!: string;

  @Column() 
  pm_type!: string;

  @Column({ nullable: true }) 
  brand?: string;

  @Column({ length: 4, nullable: true }) 
  last4?: string;

  @Column({ nullable: true }) 
  token_ref?: string;

  @CreateDateColumn({ type: 'timestamptz' }) 
  createdAt!: Date;
}

@Entity('user_payment_method')
@Index('uq_user_one_default_pm', ['user', 'is_default'], { unique: true, where: `"is_default" = true` })
export class UserPaymentMethod {
  @PrimaryGeneratedColumn('uuid') 
  upmId!: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => PaymentMethod, { eager: true, nullable: false })
  @JoinColumn({ name: 'payment_method_id' })
  paymentMethod!: PaymentMethod;

  @Column({ default: false }) is_default!: boolean;
  @CreateDateColumn({ type: 'timestamptz' }) createdAt!: Date;
}
