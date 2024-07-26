import { Test, TestingModule } from '@nestjs/testing';
import { ContentController } from './content.controller';
import { ContentManagementService } from '@src/core/service/content-management.service';

describe('ContentController', () => {
  let appController: ContentController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ContentController],
      providers: [ContentManagementService],
    }).compile();

    appController = app.get<ContentController>(ContentController);
  });

  describe('root', () => {
   
  });
});
