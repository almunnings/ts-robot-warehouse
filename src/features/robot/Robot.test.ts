import { Robot, RobotInterface } from '.'
import { Command } from '../../common'

let robot: RobotInterface
let warehouse: any

beforeEach(() => {
  warehouse = {
    getWidth: jest.fn(() => 10),
    getHeight: jest.fn(() => 10),
  } as any

  robot = new Robot()
  robot.setWarehouse(warehouse)
})

test('Robot instantiation', () => {
  expect(robot).toBeInstanceOf(Robot)
})

test('Robot good commands', () => {
  robot.move = jest.fn()

  robot.command('N' as Command)
  robot.command('S' as Command)
  robot.command('E' as Command)
  robot.command('W' as Command)

  expect(robot.move).toHaveBeenCalledWith('N' as Command)
  expect(robot.move).toHaveBeenCalledWith('S' as Command)
  expect(robot.move).toHaveBeenCalledWith('E' as Command)
  expect(robot.move).toHaveBeenCalledWith('W' as Command)
})

test('Robot bad commands', () => {
  robot.move = jest.fn()
  robot.command('BAD' as Command)
  expect(robot.move).not.toHaveBeenCalled()
})

test('Robot CLI command', () => {
  robot.setWarehouse(warehouse).setPosition({ x: 0, y: 9 })
  robot.cli('N E S W')

  expect(robot.getPosition()).toEqual({ x: 0, y: 9 })
})

test('Robot CLI stays inbounds', () => {
  robot.setPosition({ x: 0, y: 0 })
  robot.cli('E E E E E E E E E E E E E E E E E E E E')
  expect(robot.getPosition()).toEqual({ x: 9, y: 0 })
})

test('Robot CLI rejects invalid commands and issues only valid commands', () => {
  robot.setPosition({ x: 0, y: 0 })
  robot.command = jest.fn()
  robot.cli('X Y M O P E')

  expect(robot.command).toHaveBeenCalledTimes(1)
})

test('Robot CLI rejects invalid commands and triggers a valid command', () => {
  robot.setPosition({ x: 0, y: 0 })
  robot.move = jest.fn()
  robot.cli('X Y M O P E')

  expect(robot.move).toHaveBeenCalledTimes(1)
})

test('Robot move north', () => {
  robot.setPosition({ x: 5, y: 5 })
  robot.move('N' as Command)

  expect(robot.getPosition()).toEqual({ x: 5, y: 4 })
})

test('Robot move south', () => {
  robot.setPosition({ x: 5, y: 5 })
  robot.move('S' as Command)

  expect(robot.getPosition()).toEqual({ x: 5, y: 6 })
})

test('Robot move east', () => {
  robot.setPosition({ x: 5, y: 5 })
  robot.move('E' as Command)

  expect(robot.getPosition()).toEqual({ x: 6, y: 5 })
})

test('Robot move west', () => {
  robot.setPosition({ x: 5, y: 5 })
  robot.move('W' as Command)

  expect(robot.getPosition()).toEqual({ x: 4, y: 5 })
})
