import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { mockDeep, MockProxy } from 'jest-mock-extended';
import {
  DiskHealthIndicator,
  HealthCheckService,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
  HealthCheckStatus,
} from '@nestjs/terminus';

describe('HealthController', () => {
  let healthController: HealthController;
  let healthCheckService: MockProxy<HealthCheckService>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthCheckService,
          useValue: mockDeep<HealthCheckService>(),
        },
        {
          provide: TypeOrmHealthIndicator,
          useValue: mockDeep<TypeOrmHealthIndicator>(),
        },
        {
          provide: MemoryHealthIndicator,
          useValue: mockDeep<MemoryHealthIndicator>(),
        },
        {
          provide: DiskHealthIndicator,
          useValue: mockDeep<DiskHealthIndicator>(),
        },
      ],
    }).compile();

    healthController = module.get<HealthController>(HealthController);
    healthCheckService = module.get(HealthCheckService);
  });

  describe('check', () => {
    it('should return the health of various components', async () => {
      const mockResult = {
        database: { status: 'up' },
        memory_heap: { status: 'up' },
        memory_rss: { status: 'up' },
        storage: { status: 'up' },
        details: {},
        status: 'ok' as HealthCheckStatus,
      };

      healthCheckService.check.mockImplementation(async () => mockResult);

      const result = await healthController.check();

      expect(result).toEqual(mockResult);
    });

    it('should handle health check failures', async () => {
      const mockResult = {
        database: { status: 'down' },
        memory_heap: { status: 'up' },
        memory_rss: { status: 'up' },
        storage: { status: 'down' },
        details: {},
        status: 'error' as HealthCheckStatus,
      };

      healthCheckService.check.mockImplementation(async () => mockResult);

      const result = await healthController.check();

      expect(result).toEqual(mockResult);
    });
  });
});
