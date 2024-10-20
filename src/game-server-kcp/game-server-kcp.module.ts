import { Module } from '@nestjs/common';
import { GameServerKcpService } from './game-server-kcp.service';
import { DataModule } from '@/data/data.module';
@Module({
  imports:[DataModule],

  providers: [GameServerKcpService]
})
export class GameServerKcpModule {}
