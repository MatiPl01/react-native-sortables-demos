import AppleIconSort from './AppleIconSort';
import TaskPlanner from './TaskPlanner';

export interface ExampleConfig {
  component: React.ComponentType;
  description: string;
  route: string;
  title: string;
}

export const EXAMPLES: Array<ExampleConfig> = [
  {
    component: TaskPlanner,
    description:
      'A task planning interface with draggable tasks and time slots',
    route: 'task-planner',
    title: 'Task Planner'
  },
  {
    component: AppleIconSort,
    description: 'A sortable grid of Apple icons',
    route: 'apple-icon-sort',
    title: 'Apple Icon Sort'
  }
];
