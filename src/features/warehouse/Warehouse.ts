import { RobotInterface } from '../robot'
import { log } from '../../common'

/**
 * Interface for the Warehouse class.
 */
interface WarehouseInterface {
  /**
   * Get the width of the warehouse.
   * @returns The width of the warehouse.
   */
  getWidth(): number

  /**
   * Get the height of the warehouse.
   * @returns The height of the warehouse.
   */
  getHeight(): number

  /**
   * Adds a robot to the warehouse.
   * @param robot - The robot to be added.
   */
  addRobot(robot: RobotInterface): void

  /**
   * Removes a robot from the warehouse.
   * @param robot - The robot to be removed.
   */
  removeRobot(robot: RobotInterface): void
}

/**
 * Represents a warehouse.
 */
class Warehouse implements WarehouseInterface {
  private robots: RobotInterface[]

  /**
   * Creates a new instance of the Warehouse class.
   * @param width - The width of the warehouse.
   * @param height - The height of the warehouse.
   */
  constructor(
    private readonly width: number,
    private readonly height: number
  ) {
    this.robots = []
  }

  getWidth() {
    return this.width
  }

  getHeight() {
    return this.height
  }

  addRobot(robot: RobotInterface) {
    robot.setWarehouse(this)
    this.robots.push(robot)
    log('Warehouse: Robot added', robot.getId())
  }

  removeRobot(robot: RobotInterface) {
    this.robots = this.robots.filter((r) => r.getId() !== robot.getId())
  }
}

export { WarehouseInterface, Warehouse }
