import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { SummaryStatistics } from './dto/return-ss.dto';
import { SalariedUser } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(SalariedUser)
    private salariedUserRepo: Repository<SalariedUser>,
  ) {}

  async create(user: CreateUserDto): Promise<any> {
    const createdUser = new SalariedUser();
    createdUser.name = user.name;
    createdUser.currency = user.currency;
    createdUser.department = user.department;
    createdUser.salary = +user.salary;
    if (user.on_contract == 'true') {
      createdUser.on_contract = true;
    }
    createdUser.sub_department = user.sub_department;

    // check if the user exists return user already exist else create the new user
    if (
      await this.salariedUserRepo.exist({
        where: {
          name: user.name,
        },
      })
    ) {
      throw new ConflictException(`${user.name} already exists`);
    }
    try {
      return await this.salariedUserRepo.save(createdUser);
    } catch (err) {
      console.log(`Error while creating the new user with info ${user}`);
      console.log(err);
    }
  }

  async createMultiple(users: CreateUserDto[]): Promise<any> {
    const allcreatedUser = [];
    for (const user of users) {
      const createdUser = new SalariedUser();
      createdUser.name = user.name;
      createdUser.currency = user.currency;
      createdUser.department = user.department;
      createdUser.salary = +user.salary;
      if (user.on_contract == 'true') {
        createdUser.on_contract = true;
      }
      createdUser.sub_department = user.sub_department;

      try {
        const lUser = await this.salariedUserRepo.save(createdUser);
        allcreatedUser.push(lUser);
      } catch (err) {
        console.log(err);
        throw new HttpException(
          `Error while creating multi user is ${err}`,
          409,
        );
      }
    }
    return allcreatedUser;
  }

  async delete(id: number) {
    try {
      return await this.salariedUserRepo.delete({ id: id });
    } catch (err) {
      console.log(`Error while deleting the id ${id}`);
      console.log(err);
    }
  }

  async deletebByName(name: string) {
    try {
      return await this.salariedUserRepo.delete({ name: name });
    } catch (err) {
      console.log(`Error while deleting the name ${name}`);
    }
  }

  async findsalaryrecords(
    filtercriteria: FindManyOptions<SalariedUser>,
  ): Promise<SalariedUser[]> {
    try {
      return this.salariedUserRepo.find(filtercriteria);
    } catch (err) {
      console.log(`Error while asking data with the filter ${filtercriteria}`);
    }
  }

  /* SS for salary over entire dataset
   * return { mean, min, max}
   */
  async getSalarySS(): Promise<any> {
    const qury = await this.salariedUserRepo
      .createQueryBuilder()
      .select('AVG(salary)', 'mean')
      .addSelect('MAX(salary)', 'max')
      .addSelect('MIN(salary)', 'min')
      .orderBy('salary', 'ASC');

    const res = await qury.execute();

    return res;
  }

  /*
   * SS for employees with on_contract as true
   * return { mean, min, max}
   */
  async getSSbyContract(): Promise<SummaryStatistics> {
    const qury = await this.salariedUserRepo
      .createQueryBuilder()
      .select('AVG(salary)', 'mean')
      .addSelect('MAX(salary)', 'max')
      .addSelect('MIN(salary)', 'min')
      .where('on_contract = :on_contract', { on_contract: true });

    const res = await qury.execute();

    return res;
  }

  /* SS by each department */
  async getSSbyDepartment(): Promise<any> {
    const qury = await this.salariedUserRepo
      .createQueryBuilder()
      .select('AVG(salary)', 'mean')
      .addSelect('MAX(salary)', 'max')
      .addSelect('MIN(salary)', 'min')
      .addSelect('department')
      .groupBy('department');

    const res = await qury.execute();

    return res;
  }

  /* SS for dept and sub-dept combination */
  async getSSbyDepartmentandSub(): Promise<any> {
    const qury = await this.salariedUserRepo
      .createQueryBuilder()
      .select('AVG(salary)', 'mean')
      .addSelect('MAX(salary)', 'max')
      .addSelect('MIN(salary)', 'min')
      .addSelect('department')
      .addSelect('sub_department')
      .groupBy('department')
      .groupBy('sub_department');

    const res = await qury.execute();

    return res;
  }
}
