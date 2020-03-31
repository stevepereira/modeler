import {
  defaultStartNames,
  defaultEndNames,
  defaultTaskNames,
  defaultGatewayNames,
  defaultIntermediateNames,
} from '@/components/nodes/defaultNames';

export default class Node {
  type;
  definition;
  diagram;
  pool;

  constructor(type, definition, diagram) {
    this.type = type;
    this.definition = definition;
    this.diagram = diagram;
  }

  isBpmnType(...types) {
    return types.includes(this.definition.$type);
  }

  isType(type) {
    return this.type === type;
  }

  isStartEvent() {
    return Object.keys(defaultStartNames).includes(this.type);
  }

  isEndEvent() {
    return Object.keys(defaultEndNames).includes(this.type);
  }

  isTask() {
    return Object.keys(defaultTaskNames).includes(this.type);
  }

  isGateway() {
    return Object.keys(defaultGatewayNames).includes(this.type);
  }

  isIntermediateEvent() {
    return Object.keys(defaultIntermediateNames).includes(this.type);
  }

  get id() {
    return this.definition.id;
  }

  set id(id) {
    this.definition.id = id;
  }

  setIds(nodeIdGenerator) {
    const [nodeId, diagramId] = nodeIdGenerator.generate();

    if (!this.id) {
      this.id = nodeId;
    }

    if (this.diagram) {
      this.diagram.id = diagramId;
      this.diagram.bpmnElement = this.definition;
    }
  }

  getTargetProcess(processes, processNode) {
    return this.pool
      ? processes.find(({ id }) => id === this.pool.component.node.definition.get('processRef').id)
      : processNode.definition;
  }
}
