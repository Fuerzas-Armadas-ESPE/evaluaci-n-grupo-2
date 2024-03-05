import { Test, TestingModule } from '@nestjs/testing';
import { CursoService } from './curso.service';
import { getModelToken } from '@nestjs/mongoose';

describe('CursoService', () => {
  let service: CursoService;
  let modelMock: jest.Mocked<any>; // Mock del modelo

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CursoService,
        {
          provide: getModelToken('Curso'),
          useFactory: () => ({
            find: jest.fn(),
          }),
        },
      ],
    }).compile();

    service = module.get<CursoService>(CursoService);
    modelMock = module.get(getModelToken('Curso')); // Obtenemos el mock del modelo
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllCursos', () => {
    it('should return an array of cursos', async () => {
      // Mock datos para  cursos
      const mockCursos = [
        { _id: '1', titulo: 'Desarrollo Web', createdAt: '2022-06-02T12:34:56.789Z', temas: 'React'},
        { _id: '2', titulo: 'Bases de datos relacionales', createdAt: '2022-06-05T12:34:56.789Z', temas:'Optimizacion de consultas'},
      ];

      // Mock the execution of find() method to return mockCursos
      modelMock.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockCursos),
      });

      // Call getAllCursos method on the service
      const result = await service.getAllCursos();

      // Check if the result matches the mockCursos
      expect(result).toEqual(mockCursos);
    });

    it('should throw an error if something goes wrong', async () => {
      // Mock error for the execution of find() method
      const error = new Error('Database connection failed');

      // Mock the execution of find() method to throw an error
      modelMock.find.mockReturnValue({
        exec: jest.fn().mockRejectedValue(error),
      });

      // Call getAllCursos method on the service and expect it to throw an error
      await expect(service.getAllCursos()).rejects.toThrowError(error);
    });

    it('should throw an error if model.find() throws an exception', async () => {
      // Mock the execution of find() method to throw an exception
      modelMock.find.mockImplementation(() => {
        throw new Error('Database connection failed');
      });

      // Call getAllCursos method on the service and expect it to throw an error
      await expect(service.getAllCursos()).rejects.toThrowError(
        'Database connection failed',
      );
    });
  });
});
