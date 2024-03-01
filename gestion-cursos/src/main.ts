import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Configuración de CORS
    const corsOptions: CorsOptions = {
        origin: 'http://localhost:5173', 
        optionsSuccessStatus: 200, 
    };
    app.enableCors(corsOptions);

    await app.listen(3000);
}
bootstrap();
