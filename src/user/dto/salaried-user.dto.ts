import { SalariedUser } from '../entities/user.entity';

export class SalariedUserDto {
  name: string;
  salary: string;
  currency: string;
  department: string;
  on_contract: boolean;
  sub_department: string;

  toEntity(dto: SalariedUserDto) {
    const model = new SalariedUser();
    model.name = dto.name;
    model.salary = +dto.salary;
    model.currency = dto.currency;
    model.department = dto.department;
    model.sub_department = dto.sub_department;
    return model;
  }

  fromEntity(entity: SalariedUser) {
    const dto = new SalariedUserDto();
    dto.name = entity.name;
    dto.currency = entity.currency;
    dto.department = entity.department;
    dto.on_contract = entity.on_contract;
    dto.sub_department = entity.sub_department;

    return dto;
  }
}
