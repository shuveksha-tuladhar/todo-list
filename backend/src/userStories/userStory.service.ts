import { Injectable } from '@nestjs/common';
import { UserStory } from './entities/userStory.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class UserStoriesService {
    constructor(
        @InjectRepository(UserStory)
        private userStoriesRepository: Repository<UserStory>,
      ) {}

      async getFeatureUserStories(id: number) {
        return await this.userStoriesRepository.find({ where: { feature: { id } } });
      }
      async createUserStory(name: string, description: string, featureId: number){
         await this.userStoriesRepository.save({
          name,
          description,
          feature: {
            id: featureId,
          },
        });
        return await this.getFeatureUserStories(featureId);
      }
}