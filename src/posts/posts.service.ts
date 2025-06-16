import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './entities/post.entity';
import { PostNotFoundException } from './exception/post-not-found.exception';

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
    throw new PostNotFoundException();
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postsRepository.update(id, updatePostDto);
    if (post) {
      return post;
    }
    throw new PostNotFoundException();
  }

  async remove(id: number) {
    const post = await this.postsRepository.delete(id);
    if (!post.affected) {
      throw new PostNotFoundException();
    }
    return post;
  }
}
