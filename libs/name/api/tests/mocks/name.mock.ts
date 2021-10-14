import * as Faker from 'faker';
import { Name } from 'libs/database/entities';

//function to create a mock name for use in a test
export function createMockName(overrides?: Partial<Name>): Name {
  const mockName = new Name();
  mockName.id = overrides?.id || Faker.datatype.number();
  mockName.name = overrides?.name || Faker.datatype.string();

  return mockName;
}

//Instance of a mock name
export const mockName1 = createMockName({
  name: 'test1',
});

//Second instance of a mock name, in case needed
export const mockName2 = createMockName({
  name: 'test2',
});

//Array of all mock names, in case needed
export const MOCK_NAMES = [mockName1, mockName2];
