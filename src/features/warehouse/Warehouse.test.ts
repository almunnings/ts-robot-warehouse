import { Warehouse, WarehouseInterface } from '.'

let robot: any
let warehouse: WarehouseInterface

beforeEach(() => {
  robot = { setWarehouse: jest.fn(), getId: jest.fn() } as any
  warehouse = new Warehouse(10, 10)
})

test('Warehouse width and height', () => {
  expect(warehouse).toBeInstanceOf(Warehouse)
  expect(warehouse).toHaveProperty('width', 10)
  expect(warehouse).toHaveProperty('height', 10)
})

test('Adds a robot to the warehouse', () => {
  warehouse.addRobot(robot)
  expect(robot.setWarehouse).toHaveBeenCalledWith(warehouse)
  expect(robot.getId).toHaveBeenCalled()
  expect(warehouse).toHaveProperty('robots', [robot])
})

test('Removes a robot from the warehouse', () => {
  const robot = { setWarehouse: jest.fn(), getId: jest.fn() } as any
  warehouse.addRobot(robot)
  warehouse.removeRobot(robot)
  expect(warehouse).toHaveProperty('robots', [])
})
