import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodoDTO } from 'todo-dto';
import { Todo } from './schemas/todos.schema';

@Controller('api/todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  async create(@Body() createTodoDto: TodoDTO) {
    const newTodo = await this.todosService.create(createTodoDto);
    return newTodo;
  }

  @Get()
  async findAll(): Promise<Todo[]> {
    return this.todosService.findAll();
  }

  @Get(':id')
  async getTodo(@Param('id') todoId: string) {
    const todo = await this.todosService.findOne(todoId);
    return todo;
  }

  @Put(':id')
  async updateTodo(@Param('id') todoId: string, @Body() todoDto: TodoDTO) {
    let res = await this.todosService.updateOne(todoId, todoDto);
    return res;
  }

  @Delete(':id')
  async removeTodo(@Param('id') todoId: string) {
    await this.todosService.deleteOne(todoId);
    return null;
  }
}
