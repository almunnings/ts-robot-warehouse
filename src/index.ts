// Robot Warehouse main.
import { read } from './common'
import { Robot } from './features/robot'
import { Warehouse } from './features/warehouse'

const warehouse = new Warehouse(10, 10)
const robot = new Robot()

// Add the robot to the warehouse at position bottom left.
warehouse.addRobot(robot)
robot.setPosition({ x: 0, y: 9 })

// Move in a circle.
robot.cli('N E S W')

// Output the logs
read()
