"use client";

import { Users, UserCheck, Building2, Network } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";
import type { OrganigramaNode } from "./OrganigramaAPI";

interface OrganigramaStatsProps {
  nodes: OrganigramaNode[];
  theme: 'light' | 'dark';
}

function countAllNodes(nodes: OrganigramaNode[]): number {
  let count = nodes.length;
  for (const node of nodes) {
    if (node.hijos && node.hijos.length > 0) {
      count += countAllNodes(node.hijos);
    }
  }
  return count;
}

function countLevels(nodes: OrganigramaNode[], level = 1): number {
  if (!nodes || nodes.length === 0) return 0;
  let maxLevel = level;
  for (const node of nodes) {
    if (node.hijos && node.hijos.length > 0) {
      const childLevel = countLevels(node.hijos, level + 1);
      if (childLevel > maxLevel) maxLevel = childLevel;
    }
  }
  return maxLevel;
}

function countWithImage(nodes: OrganigramaNode[]): number {
  let count = 0;
  for (const node of nodes) {
    if (node.imagen) count++;
    if (node.hijos && node.hijos.length > 0) {
      count += countWithImage(node.hijos);
    }
  }
  return count;
}

export default function OrganigramaStats({ nodes, theme }: OrganigramaStatsProps) {
  const totalDirectivos = countAllNodes(nodes);
  const niveles = countLevels(nodes);
  const conFoto = countWithImage(nodes);
  const departamentos = nodes.length;

  const stats = [
    {
      label: "Total Directivos",
      value: totalDirectivos,
      icon: Users,
      color: theme === 'dark' ? 'bg-emerald-600' : 'bg-emerald-500',
      textColor: theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600',
    },
    {
      label: "Departamentos",
      value: departamentos,
      icon: Building2,
      color: theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500',
      textColor: theme === 'dark' ? 'text-blue-400' : 'text-blue-600',
    },
    {
      label: "Niveles Jerárquicos",
      value: niveles,
      icon: Network,
      color: theme === 'dark' ? 'bg-purple-600' : 'bg-purple-500',
      textColor: theme === 'dark' ? 'text-purple-400' : 'text-purple-600',
    },
    {
      label: "Con Fotografía",
      value: `${conFoto}/${totalDirectivos}`,
      icon: UserCheck,
      color: theme === 'dark' ? 'bg-amber-600' : 'bg-amber-500',
      textColor: theme === 'dark' ? 'text-amber-400' : 'text-amber-600',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`rounded-2xl p-4 border transition-all hover:scale-[1.02] ${
            theme === 'dark' 
              ? 'bg-gray-900/80 border-gray-800' 
              : 'bg-white border-gray-100 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${stat.color}`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-semibold truncate ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <TranslateText text={stat.label} />
              </p>
              <p className={`text-xl font-bold ${stat.textColor}`}>
                {stat.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
