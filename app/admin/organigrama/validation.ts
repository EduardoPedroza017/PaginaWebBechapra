import type { OrganigramaNode, NivelOrganigrafico } from './OrganigramaAPI';

export interface ValidationError {
  nodeId: string;
  nodeName: string;
  error: string;
}

const NIVEL_HIERARCHY: Record<NivelOrganigrafico, number> = {
  CEO: 0,
  Director: 1,
  Gerente: 2,
  Supervisor: 3,
  Empleado: 4,
};

/**
 * Flatten and build node map
 */
function buildNodeMap(nodes: OrganigramaNode[]): Map<string, OrganigramaNode> {
  const nodeMap = new Map<string, OrganigramaNode>();
  
  function flattenNodes(nodeList: OrganigramaNode[], parentId?: string) {
    nodeList.forEach(node => {
      nodeMap.set(node.id, { ...node, padreid: parentId });
      if (node.hijos && node.hijos.length > 0) {
        flattenNodes(node.hijos, node.id);
      }
    });
  }
  
  flattenNodes(nodes);
  return nodeMap;
}

/**
 * Find node by ID in hierarchy
 */
function findNodeById(nodes: OrganigramaNode[], id: string): OrganigramaNode | undefined {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.hijos) {
      const found = findNodeById(node.hijos, id);
      if (found) return found;
    }
  }
  return undefined;
}

/**
 * Validates parent-child relationships in the organigrama
 * - Each node (except root) must have exactly one parent
 * - Parent must have higher rank than child (CEO > Director > Gerente > Supervisor > Empleado)
 * - No circular relationships allowed
 */
export function validateOrganigramaStructure(nodes: OrganigramaNode[]): ValidationError[] {
  const errors: ValidationError[] = [];
  const nodeMap = buildNodeMap(nodes);

  // Validate each node
  nodeMap.forEach((node, nodeId) => {
    // Check if node has both nivel and padreid fields (unless it's a root/CEO)
    if (node.padreid && !node.nivel) {
      errors.push({
        nodeId,
        nodeName: node.nombre || 'Sin nombre',
        error: 'Asigna un nivel jerárquico a este nodo',
      });
    }

    // Check parent-child level relationship
    if (node.padreid) {
      const parent = nodeMap.get(node.padreid);
      if (parent && node.nivel && parent.nivel) {
        const parentLevel = NIVEL_HIERARCHY[parent.nivel];
        const childLevel = NIVEL_HIERARCHY[node.nivel];
        
        if (parentLevel >= childLevel) {
          errors.push({
            nodeId,
            nodeName: node.nombre || 'Sin nombre',
            error: `${parent.nombre} (${parent.nivel}) no puede ser padre de ${node.nombre} (${node.nivel}) - El padre debe tener mayor rango`,
          });
        }
      }
    }
  });

  return errors;
}

/**
 * Validates that no node is assigned as parent of itself (circular reference)
 */
export function detectCircularReferences(nodes: OrganigramaNode[]): ValidationError[] {
  const errors: ValidationError[] = [];
  const nodeMap = buildNodeMap(nodes);

  function hasCircularReference(nodeId: string, parentId: string | undefined, visited = new Set<string>()): boolean {
    if (!parentId) return false;
    if (visited.has(parentId)) return true;
    
    visited.add(parentId);
    
    const parent = nodeMap.get(parentId);
    if (!parent) return false;
    
    return hasCircularReference(nodeId, parent.padreid, visited);
  }

  nodeMap.forEach((node, nodeId) => {
    if (nodeId === node.padreid) {
      errors.push({
        nodeId,
        nodeName: node.nombre || 'Sin nombre',
        error: 'Un nodo no puede ser su propio padre',
      });
    } else if (node.padreid && hasCircularReference(nodeId, node.padreid)) {
      errors.push({
        nodeId,
        nodeName: node.nombre || 'Sin nombre',
        error: 'Referencia circular detectada - el árbol de padres forma un bucle',
      });
    }
  });

  return errors;
}

/**
 * Get validation summary
 */
export function getValidationSummary(nodes: OrganigramaNode[]): {
  isValid: boolean;
  errors: ValidationError[];
  warnings: string[];
} {
  const errors = [...validateOrganigramaStructure(nodes), ...detectCircularReferences(nodes)];
  const warnings: string[] = [];

  // Check for missing levels
  const nodesWithoutLevel = nodes.filter(n => !n.nivel);
  if (nodesWithoutLevel.length > 0) {
    warnings.push(`${nodesWithoutLevel.length} nodo(s) sin nivel jerárquico asignado`);
  }

  // Check for orphaned nodes (non-root nodes without parent)
  function checkOrphans(nodeList: OrganigramaNode[], isRoot = true) {
    nodeList.forEach(node => {
      if (!isRoot && !node.padreid && node.nivel !== 'CEO') {
        warnings.push(`${node.nombre || 'Sin nombre'} es un nodo sin padre`);
      }
      if (node.hijos) {
        checkOrphans(node.hijos, false);
      }
    });
  }
  checkOrphans(nodes);

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}
