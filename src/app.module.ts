import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpServerModule } from './http-server/http-server.module';
import { DataModule } from './data/data.module';
import { GameServerKcpModule } from './game-server-kcp/game-server-kcp.module';

@Module({
  imports: [HttpServerModule, DataModule, GameServerKcpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
