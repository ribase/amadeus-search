import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from './search.controller';
import { AppService } from '../../app.service';

describe('SearchController', () => {
  let appController: SearchController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [AppService],
    }).compile();

    appController = app.get<SearchController>(SearchController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
