import StartNode from './StartNode'
import DelayNode from './DelayNode'
import ConditionNode from './ConditionNode'
import EmailNode from './EmailNode'

export const nodeTypes = {
  start: StartNode,
  delay: DelayNode,
  condition: ConditionNode,
  email: EmailNode,
}
