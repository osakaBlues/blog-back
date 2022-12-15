import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);
}
