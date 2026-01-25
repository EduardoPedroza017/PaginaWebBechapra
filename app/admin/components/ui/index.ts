// Barrel export for admin UI primitives (wraps existing shared components)
export { Button as AdminButton } from '../shared/Button';
export { Card as AdminCard, CardHeader, CardBody, CardFooter } from '../shared/Card';
export { Table as AdminTable, TableHead, TableBody, TableRow, TableHeaderCell, TableCell, TableEmptyState } from '../shared/Table';
export { FormInput as AdminFormInput } from '../shared/FormInput';
export { StatCard as AdminStatCard } from '../shared/StatCard';

// New unified UI components
export { default as AdminPageHeader } from './AdminPageHeader';
export { default as AdminSection, SectionHeader, SectionBody, SectionFooter } from './AdminSection';
export { default as AdminTabs, type TabItem } from './AdminTabs';
export { default as AdminFilterBar, FilterChip, FilterGroup, SearchInput, StatusFilterBar, CommonFilterBar } from './AdminFilterBar';

// Responsive components
export { default as ResponsiveTable, type ResponsiveTableColumn, type ResponsiveTableAction, type ResponsiveTableProps, TableSkeleton } from './ResponsiveTable';
export { default as ResponsiveCardGrid, ResponsiveStatGrid, InfoCard, ActionCard, EmptyState, type StatCardData } from './ResponsiveCardGrid';
export { default as DynamicBreadcrumbs, createBreadcrumbs, BREADCRUMB_CONFIGS } from './DynamicBreadcrumbs';

// Loading & skeleton components
export { 
  Skeleton, 
  SkeletonText, 
  SkeletonCard, 
  SkeletonTable, 
  SkeletonList, 
  SkeletonForm,
  PageSkeleton,
  LoadingSpinner,
  FullPageLoading,
  DotsLoader
} from './SkeletonLoader';

// Design system utilities
export * from '../../design-system';
// Note: Use responsive-design-system.ts for responsive-specific utilities

