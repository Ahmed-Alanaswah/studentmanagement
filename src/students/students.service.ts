import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Student } from './entities/student.entity';
import { NOTFOUND } from 'dns';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-studnt.dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}
  // private students: Student[] = [
  //   { id: 1, name: 'mohammed', age: 38, address: ['iraq', 'karkuk'] },
  //   { id: 2, name: 'ahmed', age: 29, address: ['iraq', 'baghdad'] },
  // ];

  async findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async findOne(id: number): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { id },
    });
    if (!student) {
      // throw new HttpException(`this  id ${id} not found`, HttpStatus.NOT_FOUND);
      throw new NotFoundException(`this  id ${id} not found`);
    }

    return student;
  }

  async create(createStudentDto: CreateStudentDto) {
    const student = await this.studentRepository.create({
      ...createStudentDto,
    });
    return this.studentRepository.save(student);
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const updateStudent = await this.studentRepository.preload({
      id: +id,
      ...updateStudentDto,
    });
    if (!updateStudent) {
      throw new NotFoundException(`this  id ${id} not found`);
    }
    return this.studentRepository.save(updateStudent);
  }

  async remove(id: string) {
    const removeStudents = await this.studentRepository.delete(id);
  }
}
