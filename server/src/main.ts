import { Logger } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { NestExpressApplication } from "@nestjs/platform-express"
import { AppModule } from "./app.module"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"


async function start() {
    const logger: Logger = new Logger('Server')
    const PORT = process.env.PORT || 5000
    const app = await NestFactory.create<NestExpressApplication>(AppModule)

    const config = new DocumentBuilder()
        .setTitle('Chat application')
        .setDescription('REST API documentation')
        .setVersion('1.0.0')
        // .addTag('')
        .build()
    
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);
     
    await app.listen(PORT, () => logger.log(`started on ${PORT}`))
}

start()