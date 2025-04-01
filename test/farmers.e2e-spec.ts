import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { DataSource } from 'typeorm';
import { AppModule } from './../src/app.module';
import { Farmer } from 'src/domain/entities/farmer.entity';

describe('FarmersController (e2e)', () => {
  let app: INestApplication<App>;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    dataSource = moduleFixture.get(DataSource);
  });

  afterAll(async () => {
    await dataSource.destroy();
    await app.close();
  });

  beforeEach(async () => {
    await dataSource.query('DELETE FROM farmers;');
  });

  it('POST /farmers', async () => {
    const farmerDto = {
      document: '12345678901',
      name: 'João da Silva',
      farmName: 'Fazenda Boa Esperança',
      city: 'Goiânia',
      state: 'GO',
      totalArea: 1000,
      arableArea: 600,
      vegetationArea: 400,
      crops: ['Soja', 'Milho'],
    };

    const response = await request(app.getHttpServer())
      .post('/farmers')
      .send(farmerDto)
      .expect(201);

    const data = response.body as Farmer;

    expect(data).toHaveProperty('id');
    expect(data.name).toBe(farmerDto.name);
  });

  it('GET /farmers', async () => {
    const farmerDto = {
      document: '98765432000199',
      name: 'Maria Oliveira',
      farmName: 'Sítio Recanto Feliz',
      city: 'Brasília',
      state: 'DF',
      totalArea: 500,
      arableArea: 300,
      vegetationArea: 200,
      crops: ['Café'],
    };

    await request(app.getHttpServer()).post('/farmers').send(farmerDto);

    const response = await request(app.getHttpServer())
      .get('/farmers')
      .expect(200);

    const data = response.body as Farmer[];

    expect(data).toHaveLength(1);
    expect(data[0].name).toBe(farmerDto.name);
  });

  it('POST /farmers 404 Bad Request', async () => {
    const invalidFarmerDto = {
      document: '11122233344',
      name: 'Carlos Mendes',
      farmName: 'Fazenda Santa Fé',
      city: 'Uberlândia',
      state: 'MG',
      totalArea: 1000,
      arableArea: 800,
      vegetationArea: 300,
      crops: ['Cana de Açúcar'],
    };

    const response = await request(app.getHttpServer())
      .post('/farmers')
      .send(invalidFarmerDto)
      .expect(400);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(response.body.message).toContain(
      'Arable and vegetation area cannot exceed total area',
    );
  });

  it('GET /insights', async () => {
    const firstFarmer = {
      document: '12345678901',
      name: 'João da Silva',
      farmName: 'Fazenda Boa Esperança',
      city: 'Goiânia',
      state: 'GO',
      totalArea: 1000,
      arableArea: 600,
      vegetationArea: 400,
      crops: ['Soja', 'Milho'],
    };

    const secondFarmer = {
      document: '98765432000199',
      name: 'Maria Oliveira',
      farmName: 'Sítio Recanto Feliz',
      city: 'Brasília',
      state: 'DF',
      totalArea: 500,
      arableArea: 300,
      vegetationArea: 200,
      crops: ['Café'],
    };

    await request(app.getHttpServer()).post('/farmers').send(firstFarmer);
    await request(app.getHttpServer()).post('/farmers').send(secondFarmer);

    const response = await request(app.getHttpServer())
      .get('/insights')
      .expect(200);

    expect(response.body).toHaveProperty('cropsByState');
    expect(response.body).toHaveProperty('totalFarms');
    expect(response.body).toHaveProperty('totalHectares');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(response.body.totalFarms).toBe(2);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(response.body.totalHectares).toBe(1500);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(response.body.cropsByState).toEqual([
      { count: '1', crop: 'Soja', farmer_state: 'GO' },
      { count: '1', crop: 'Milho', farmer_state: 'GO' },
      { count: '1', crop: 'Café', farmer_state: 'DF' },
    ]);
  });
});
