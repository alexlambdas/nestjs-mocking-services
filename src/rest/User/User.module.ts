import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MiddlewareService } from "./Middleware.service";
import { ConfigAppService } from "./ConfigApp.service";
import { UserController } from "./User.controller";

@Module({
  providers:[ ConfigAppService ],
  controllers: [ UserController ],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MiddlewareService)
      .forRoutes(UserController)
  }
}