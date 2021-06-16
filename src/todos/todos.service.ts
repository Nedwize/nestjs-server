import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo, TodoDocument } from './schemas/todos.schema';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel('Todo') private readonly todoModel: Model<TodoDocument>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const newTodo = new this.todoModel(createTodoDto);
    await newTodo.save();
    console.log(newTodo);
    return newTodo;
  }

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  async findOne(id: string): Promise<Todo> {
    const foundTodo = await this.todoModel.findById(id);
    return foundTodo;
  }

  async deleteOne(id: string): Promise<null> {
    await this.todoModel.deleteOne({ _id: id });
    return null;
  }

  async updateOne(id: string, todo): Promise<Todo> {
    const updatedTodo = await this.todoModel.findById(id);
    if (todo.title) {
      updatedTodo.title = todo.title;
    }
    if (todo.description) {
      updatedTodo.description = todo.description;
    }
    await updatedTodo.save();
    return updatedTodo;
  }
}
