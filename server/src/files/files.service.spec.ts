import { Test, TestingModule } from '@nestjs/testing';
import { FilesService } from './files.service';
import * as fs from 'fs'
import * as path from 'path';

describe('FilesService', () => {
  let service: FilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilesService],
    }).compile();

    service = module.get<FilesService>(FilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('creating jpg file', () => {
    it('should create jpg file', async () => {
      const filePath = path.resolve(__dirname, '..', '..', 'test', 'mock', 'images', 'image.jpg')
      const file = fs.readFileSync(filePath)
      const fileName = await service.createJpgFile(file)
      return fileName
    })
  })
  
});
