import { IdGenerator } from '../../../src/services/IdGenerator';

jest.mock('../../../src/services/IdGenerator');

export const IdGeneratorMock = IdGenerator as jest.Mock<IdGenerator>;
