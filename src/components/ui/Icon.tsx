import type { CSSProperties, SVGProps } from 'react';
import {
  ArrowDown, ArrowRight, ArrowUpRight, Bot, ChevronDown, CircleCheck, CircleX, Database, Github, Info,
  Instagram, LayoutDashboard, Linkedin, Mail, Menu, MessageCircle, Plus, Send, Slack, Sparkles,
  TriangleAlert, Webhook, Workflow, X, Zap, type LucideIcon,
} from 'lucide-react';

const ICONS = {
  'arrow-down': ArrowDown, 'arrow-right': ArrowRight, 'arrow-up-right': ArrowUpRight, bot: Bot,
  'chevron-down': ChevronDown, 'circle-check': CircleCheck, 'circle-x': CircleX, database: Database,
  github: Github, info: Info, instagram: Instagram, 'layout-dashboard': LayoutDashboard, linkedin: Linkedin, mail: Mail,
  menu: Menu, 'message-circle': MessageCircle, plus: Plus, send: Send, slack: Slack, sparkles: Sparkles,
  'triangle-alert': TriangleAlert, webhook: Webhook, workflow: Workflow, x: X, zap: Zap,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;

type IconProps = Omit<SVGProps<SVGSVGElement>, 'name' | 'ref'> & {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  color?: string;
  style?: CSSProperties;
};

export function Icon({ name, size = 18, strokeWidth = 1.75, color = 'currentColor', style, ...rest }: IconProps) {
  const Cmp = ICONS[name];
  return (
    <Cmp
      size={size}
      strokeWidth={strokeWidth}
      color={color}
      aria-hidden="true"
      data-icon={name}
      style={{ display: 'inline-block', flexShrink: 0, verticalAlign: 'middle', ...style }}
      {...rest}
    />
  );
}
