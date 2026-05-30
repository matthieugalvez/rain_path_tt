export type WorkflowNodeType =
  | "start"
  | "delay"
  | "condition"
  | "email"
  | "sms"
  | "whatsapp"
  | "postal"
  | "end";

export interface BaseNodeData {
  label: string;
}

export interface DelayNodeData extends BaseNodeData {
  days: number;
}

export interface EmailNodeData extends BaseNodeData {
  subject: string;
  body: string;
}

export interface ConditionNodeData extends BaseNodeData {
  conditionType:
    | "email_known"
    | "has_whatsapp"
    | "email_rejected"
    | "email_opened";
}
