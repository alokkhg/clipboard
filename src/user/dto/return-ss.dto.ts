import { IsOptional } from 'class-validator';

export class SummaryStatistics {
  mean: number;
  min: number;
  max: number;

  @IsOptional()
  department: string;

  @IsOptional()
  sub_department: string;
}
