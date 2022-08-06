import { Logger } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { NestExpressApplication } from "@nestjs/platform-express"
import { AppModule } from "./app.module"


async function start() {
    const logger: Logger = new Logger('Server')
    const PORT = process.env.PORT || 5000
    const app = await NestFactory.create<NestExpressApplication>(AppModule)

    await app.listen(PORT, () => logger.log(`started on ${PORT}`))
}

start()