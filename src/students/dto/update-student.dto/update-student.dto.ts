import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from '../create-studnt.dto/create-student.dto';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {}
