import StartNode from "./StartNode";
import DelayNode from "./DelayNode";
import ConditionNode from "./ConditionNode";
import EmailNode from "./EmailNode";
import SmsNode from "./SmsNode";
import WhatsappNode from "./WhatsappNode";
import PostalNode from "./PostalNode";
import EndNode from "./EndNode";

export const nodeTypes = {
  start: StartNode,
  delay: DelayNode,
  condition: ConditionNode,
  email: EmailNode,
  sms: SmsNode,
  whatsapp: WhatsappNode,
  postal: PostalNode,
  end: EndNode,
};
