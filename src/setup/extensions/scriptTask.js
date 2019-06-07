import {
  task,
} from '@/components/nodes';

window.ProcessMaker.EventBus.$on('modeler-init', ({ registerNode }) => {
  /* Add a custom node example */

  const implementation = 'processmaker-script-task-test';
  const nodeId = 'processmaker-script-task-test';

  const component = {
    extends: task.component,
  };

  const nodeType = {
    id: nodeId,
    component,
    bpmnType: 'bpmn:ScriptTask',
    control: true,
    category: 'Other',
    icon: require('@/assets/toolpanel/task.svg'),
    label: 'Script',
    definition(moddle) {
      return moddle.create('bpmn:ScriptTask', {
        name: 'Script',
        implementation,
        config: JSON.stringify({}),
      });
    },
    diagram(moddle) {
      return moddle.create('bpmndi:BPMNShape', {
        bounds: moddle.create('dc:Bounds', {
          height: 76,
          width: 116,
        }),
      });
    },
    inspectorConfig: [
      {
        name: 'Send Tweet',
        items: [
          {
            component: 'FormText',
            config: {
              label: 'Send Tweet',
              fontSize: '2em',
            },
          },
          {
            component: 'FormInput',
            config: {
              label: 'Identifier',
              helper: 'The id field should be unique across all elements in the diagram',
              name: 'id',
              validation: ['required', 'regex:/^[a-zA-Z][^\\s][a-zA-Z0-9_]+$/'],
            },
          },
          {
            component: 'FormTextArea',
            config: {
              label: 'Config',
              helper: 'Script configuration',
              name: 'config',
            },
          },
        ],
      },
    ],
  };

  registerNode(nodeType, definition => {
    if (definition.get('implementation') === implementation) {
      return nodeId;
    }
  });
});
