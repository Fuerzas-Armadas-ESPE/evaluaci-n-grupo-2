import { Test, TestingModule } from '@nestjs/testing';
import { TemaService } from './tema.service';
import { getModelToken } from '@nestjs/mongoose';

describe('CursoService', () => {
  let service: TemaService;
  let modelMock: jest.Mocked<any>; // Mock del modelo

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TemaService,
        {
          provide: getModelToken('Tema'),
          useFactory: () => ({
            find: jest.fn(),
          }),
        },
      ],
    }).compile();

    service = module.get<TemaService>(TemaService);
    modelMock = module.get(getModelToken('Tema')); // Obtenemos el mock del modelo
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllTemas', () => {
    it('should return an array of temas', async () => {
      // Mock datos para  temas
      const mockTemas = [
        { _id: '1', titulo: 'React', createdAt: '2022-04-02T12:34:56.789Z', revisado: 'True'},
        { _id: '2', titulo: 'Optimizacion de consultas', createdAt: '2022-04-04T12:34:56.789Z', revisado:'False'},
      ];

      // Mock the execution of find() method to return mockTemas
      modelMock.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockTemas),
      });

      // Call getAllTemas method on the service
      const result = await service.getAllTemas();

      // Check if the result matches the mockTemas
      expect(result).toEqual(mockTemas);
    });

    it('should throw an error if something goes wrong', async () => {
      // Mock error for the execution of find() method
      const error = new Error('Database connection failed');

      // Mock the execution of find() method to throw an error
      modelMock.find.mockReturnValue({
        exec: jest.fn().mockRejectedValue(error),
      });

      // Call getAllTemas method on the service and expect it to throw an error
      await expect(service.getAllTemas()).rejects.toThrowError(error);
    });

    it('should throw an error if model.find() throws an exception', async () => {
      // Mock the execution of find() method to throw an exception
      modelMock.find.mockImplementation(() => {
        throw new Error('Database connection failed');
      });

      // Call getAllTemas method on the service and expect it to throw an error
      await expect(service.getAllTemas()).rejects.toThrowError(
        'Database connection failed',
      );
    });
  });
});
