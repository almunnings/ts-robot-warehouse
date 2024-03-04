import { log, Command, Position } from '../../common'
import { WarehouseInterface } from '../warehouse'

/**
 * Represents a robot in a warehouse.
 */
interface RobotInterface {
  /**
   * Get the ID of the robot.
   * @returns The ID of the robot.
   */
  getId(): string

  /**
   * Set the position of the robot.
   * @param position - The position to set.
   * @returns The updated robot interface.
   */
  setPosition(position: Position): RobotInterface

  /**
   * Get the current position of the robot.
   * @returns The current position of the robot.
   */
  getPosition(): Position

  /**
   * Set the warehouse for the robot.
   * @param warehouse - The warehouse to set.
   * @returns The updated robot interface.
   */
  setWarehouse(warehouse: WarehouseInterface): RobotInterface

  /**
   * Get the warehouse associated with the robot.
   * @returns The warehouse associated with the robot.
   */
  getWarehouse(): WarehouseInterface

  /**
   * Process a command from the command line interface.
   * @param command - The command to process.
   */
  cli(command: string): void

  /**
   * Process a command.
   * @param command - The command to process.
   */
  command(command: Command): void

  /**
   * Move the robot based on the given command.
   * @param command - The command to move the robot.
   */
  move(command: Command): void
}

/**
 * Represents a robot.
 */

/**
 * Represents a robot.
 */
class Robot implements RobotInterface {
  /**
   * Represents the ID of the robot.
   */
  private readonly id: string

  /**
   * Represents the position of the robot.
   */
  private position: Position

  /**
   * Represents the warehouse the robot is in.
   */
  private warehouse: WarehouseInterface

  constructor() {
    this.id = `robot-${Math.floor(Math.random() * 100000)}`
  }

  getId() {
    return this.id
  }

  setPosition(position: Position) {
    log('Robot: Positioned', position)
    this.position = position
    return this
  }

  getPosition() {
    return this.position
  }

  setWarehouse(warehouse: WarehouseInterface) {
    this.warehouse = warehouse
    return this
  }

  getWarehouse() {
    return this.warehouse
  }

  move(command: Command) {
    log('Robot: Moving', command)
    const position = this.getPosition()
    const warehouse = this.getWarehouse()

    switch (command) {
      case Command.NORTH:
        if (position.y > 0) {
          this.setPosition({ ...position, y: position.y - 1 })
        }
        break
      case Command.SOUTH:
        if (position.y < warehouse.getHeight() - 1) {
          this.setPosition({ ...position, y: position.y + 1 })
        }
        break
      case Command.EAST:
        if (position.x < warehouse.getWidth() - 1) {
          this.setPosition({ ...position, x: position.x + 1 })
        }
        break
      case Command.WEST:
        if (position.x > 0) {
          this.setPosition({ ...position, x: position.x - 1 })
        }
        break
    }
  }

  cli(command: string) {
    command
      .split(' ')
      .filter((c) => Object.values(Command).includes(c as Command))
      .map((c) => this.command(c as Command))
  }

  command(command: Command) {
    log('Robot: Processing', command)
    switch (command) {
      case Command.NORTH:
      case Command.SOUTH:
      case Command.EAST:
      case Command.WEST:
        this.move(command)
        break
    }
  }
}

export { RobotInterface, Robot }
