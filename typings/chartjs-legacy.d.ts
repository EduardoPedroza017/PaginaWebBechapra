// Temporary module declarations to keep TypeScript happy
// Remove this file after legacy Chart.js files are deleted or fully migrated

declare module 'chart.js' {
	// Minimal shims for commonly-used types in legacy files
	export type ChartOptions<T extends string = any> = any;
	export type TooltipItem<T extends string = any> = any;
	export type ScriptableContext<T extends string = any> = any;
	export const Chart: any;
	export default Chart;
	// Common named exports used in legacy code
	export const ArcElement: any;
	export const Tooltip: any;
	export const Legend: any;
	export const CategoryScale: any;
	export const LinearScale: any;
	export const BarElement: any;
	export const PointElement: any;
	export const LineElement: any;
	export const Filler: any;
	export const Title: any;
	export type ChartTypeRegistry = any;
}

declare module 'react-chartjs-2' {
	import { ComponentType } from 'react';
	export const Bar: ComponentType<any>;
	export const Doughnut: ComponentType<any>;
	export const Line: ComponentType<any>;
	const _default: { Bar: ComponentType<any>; Doughnut: ComponentType<any>; Line: ComponentType<any> };
	export default _default;
}
