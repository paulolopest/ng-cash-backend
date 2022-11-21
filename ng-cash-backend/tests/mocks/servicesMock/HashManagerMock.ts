import { HashManager } from '../../../src/services/HashManager';

jest.mock('../../../src/services/HashManager');

export const HashManagerMock = HashManager as jest.Mock<HashManager>;
