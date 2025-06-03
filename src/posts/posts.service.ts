import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './entities/post.entity';
import { Post } from './post.interface';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const newPost = await this.postsRepository.create(createPostDto);
    await this.postsRepository.save(newPost);
    return newPost;
  }

  findAll() {
    return this.postsRepository.find();
  }

  async findOne(id: number) {
    const post = await this.postsRepository.findOne({
      where: { id },
    });
    if (post) {
      return post;
    }
    throw new NotFoundException('Post not found');
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postsRepository.update(id, updatePostDto);
    if (post) {
      return post;
    }

    throw new NotFoundException('Post not found');
  }

  async remove(id: number) {
    const post = await this.postsRepository.delete(id);
    if (!post.affected) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }
}
