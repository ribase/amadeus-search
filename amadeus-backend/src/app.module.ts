import { Module } from '@nestjs/common';
import { SearchController } from './Controllers/Search/search.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [SearchController],
  providers: [AppService],
})
export class AppModule {}
