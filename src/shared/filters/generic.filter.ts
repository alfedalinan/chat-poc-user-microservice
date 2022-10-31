import { ArgumentsHost, Catch, ExceptionFilter, HttpAdapterHost, HttpException, HttpStatus } from "@nestjs/common";

@Catch()
export class GenericFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: any, host: ArgumentsHost) {
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();
        let statusCode, message

        const detail = exception.detail;
        if (typeof detail === 'string' && detail.includes('already exists')) {
            const messageStart = exception.table.split('_').join(' ') + ' with';
            message = exception.detail.replace('Key', messageStart)
            statusCode = HttpStatus.BAD_REQUEST
        }
        else {
            statusCode = exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR
            message = exception.message
        }

        const responseBody = {
            statusCode,
            message
        }

        httpAdapter.reply(ctx.getResponse(), responseBody, statusCode)
        
    }

}