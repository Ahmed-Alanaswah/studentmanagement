import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-studnt.dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto/update-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentService: StudentsService) {}
  //   @Get()
  //   findAllStudents() {
  //     return 'all students info ';
  //   }

  @Get()
  findAllStudents() {
    return this.studentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    // return `This action returns a #${id} cat`;
    return this.studentService.findOne(id);
  }

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDato: UpdateStudentDto) {
    return this.studentService.update(id, updateStudentDato);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
