"use client";

import { useMemo, useState, useCallback } from "react";
import { Input, Button, Space } from "antd";
import type { TableProps } from "antd";
import type { ColumnType, ColumnGroupType } from "antd/es/table";
import type {
  FilterConfirmProps,
  FilterValue,
  SorterResult,
} from "antd/es/table/interface";
import type { PaginationProps } from "antd";
import { Search } from "lucide-react";
import BaseTable from "@/components/ui/Table/BaseTable";
import type { BaseTableProps } from "@/components/ui/Table/BaseTable";
import BasePagination from "@/components/ui/Pagination/BasePagination";

// ── Auto-align patterns ──────────────────────────────────────────────────────
const RIGHT_PATTERN =
  /amount|price|cost|total|count|qty|quantity|balance|rate/i;
const CENTER_PATTERN = /id$|^(no|num|index|seq)$|type|action/i;

function inferAlign(key?: string): "left" | "center" | "right" {
  if (!key) return "left";
  if (RIGHT_PATTERN.test(key)) return "right";
  if (CENTER_PATTERN.test(key)) return "center";
  return "left";
}

// ── Column definition (extends Ant Design ColumnType) ────────────────────────
export type DataTableColumn<T> = (
  | Omit<ColumnType<T>, "align">
  | Omit<ColumnGroupType<T>, "align">
) & {
  align?: "left" | "center" | "right";
  /** Inject default sorter based on dataIndex value */
  sortable?: boolean;
  /** Inject column-level search filter */
  searchable?: boolean;
};

// ── Search filter builder ────────────────────────────────────────────────────
function buildSearchFilter<T extends object>(
  dataIndex: keyof T,
): Partial<ColumnType<T>> {
  return {
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: {
      setSelectedKeys: (keys: React.Key[]) => void;
      selectedKeys: React.Key[];
      confirm: (param?: FilterConfirmProps) => void;
      clearFilters?: () => void;
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          placeholder="Search..."
          value={selectedKeys[0] as string}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
          style={{ display: "block", marginBottom: 8 }}
          size="small"
          autoFocus
        />
        <Space>
          <Button
            type="primary"
            onClick={() => confirm()}
            size="small"
            icon={<Search size={12} />}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              clearFilters?.();
              confirm();
            }}
            size="small"
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <Search size={14} color={filtered ? "#1677ff" : undefined} />
    ),
    onFilter: (value, record) => {
      const cellValue = record[dataIndex];
      return String(cellValue ?? "")
        .toLowerCase()
        .includes(String(value).toLowerCase());
    },
  };
}

// ── Sorter builder ───────────────────────────────────────────────────────────
function buildSorter<T extends object>(
  dataIndex: keyof T,
): Partial<ColumnType<T>> {
  return {
    sorter: (a: T, b: T) => {
      const av = a[dataIndex];
      const bv = b[dataIndex];
      if (typeof av === "number" && typeof bv === "number") return av - bv;
      return String(av ?? "").localeCompare(String(bv ?? ""));
    },
    showSorterTooltip: false,
  };
}

// ── DataTable Props ──────────────────────────────────────────────────────────
export interface DataTableProps<T extends object> extends Omit<
  BaseTableProps<T>,
  "columns" | "pagination" | "noPagination"
> {
  columns: DataTableColumn<T>[];
  /** External pagination config; omit to hide pagination */
  pagination?: PaginationProps | false;
  /** Class applied to the pagination wrapper div */
  paginationClassName?: string;
}

// ── DataTable ────────────────────────────────────────────────────────────────
export default function DataTable<T extends object>({
  columns,
  dataSource,
  loading = false,
  pagination = false,
  paginationClassName,
  ...tableProps
}: DataTableProps<T>) {
  // ── Internal filter / sort state ───────────────────────────────────────────
  const [filterState, setFilterState] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortState, setSortState] = useState<{
    columnKey?: React.Key;
    order?: "ascend" | "descend";
  }>({});

  // ── Normalized columns ─────────────────────────────────────────────────────
  const normalizedColumns = useMemo<ColumnType<T>[]>(() => {
    return columns.map((col) => {
      const { sortable, searchable, ...rest } = col as DataTableColumn<T> & {
        sortable?: boolean;
        searchable?: boolean;
      };

      const dataIndex =
        "dataIndex" in rest
          ? (rest.dataIndex as keyof T | undefined)
          : undefined;

      const key =
        typeof dataIndex === "string"
          ? dataIndex
          : typeof rest.key === "string"
            ? rest.key
            : undefined;

      const align: "left" | "center" | "right" = rest.align ?? inferAlign(key);

      const searchProps =
        searchable && dataIndex ? buildSearchFilter<T>(dataIndex) : {};

      const sortProps = sortable && dataIndex ? buildSorter<T>(dataIndex) : {};

      return {
        ...searchProps,
        ...sortProps,
        ...rest,
        align,
      } as ColumnType<T>;
    });
  }, [columns]);

  // ── Full dataset (stable reference) ───────────────────────────────────────
  const memoizedData = useMemo(() => dataSource ?? [], [dataSource]);

  // ── Apply filters + sort to full dataset, then slice for current page ──────
  const { processedData, total } = useMemo(() => {
    let result = [...memoizedData];

    // Apply each active column filter across the full dataset
    Object.entries(filterState).forEach(([colKey, filterValues]) => {
      if (!filterValues || filterValues.length === 0) return;
      const col = normalizedColumns.find(
        (c) =>
          String(c.key ?? "") === colKey ||
          String(
            (c as ColumnType<T> & { dataIndex?: unknown }).dataIndex ?? "",
          ) === colKey,
      ) as ColumnType<T> | undefined;
      if (!col?.onFilter) return;
      result = result.filter((record) =>
        (filterValues as (string | number | boolean)[]).some((fv) =>
          col.onFilter!(fv, record),
        ),
      );
    });

    // Apply sort across the filtered dataset
    if (sortState.columnKey && sortState.order) {
      const col = normalizedColumns.find(
        (c) => c.key === sortState.columnKey,
      ) as ColumnType<T> | undefined;
      if (col?.sorter && typeof col.sorter === "function") {
        const dir = sortState.order === "descend" ? -1 : 1;
        result = [...result].sort(
          (a, b) => dir * (col.sorter as (a: T, b: T) => number)(a, b),
        );
      }
    }

    return { processedData: result, total: result.length };
  }, [memoizedData, filterState, sortState, normalizedColumns]);

  // ── Slice for current page ─────────────────────────────────────────────────
  const pagedData = useMemo(() => {
    if (!pagination) return processedData;
    const current = (pagination as PaginationProps).current ?? 1;
    const pageSize = (pagination as PaginationProps).pageSize ?? 10;
    const start = (current - 1) * pageSize;
    return processedData.slice(start, start + pageSize);
  }, [processedData, pagination]);

  // ── Intercept table onChange to capture filter/sort changes ───────────────
  const handleTableChange = useCallback<NonNullable<TableProps<T>["onChange"]>>(
    (_pagination, filters, sorter) => {
      setFilterState(filters);

      const s = (Array.isArray(sorter) ? sorter[0] : sorter) as SorterResult<T>;
      setSortState({
        columnKey: s.columnKey ?? undefined,
        order: s.order ?? undefined,
      });

      // Reset to page 1 when filter/sort changes
      if (pagination && (pagination as PaginationProps).onChange) {
        const pageSize = (pagination as PaginationProps).pageSize ?? 10;
        (pagination as PaginationProps).onChange!(1, pageSize);
      }
    },
    [pagination],
  );

  return (
    <div className="flex flex-col gap-3">
      <BaseTable<T>
        {...tableProps}
        columns={normalizedColumns}
        dataSource={pagedData}
        loading={loading}
        noPagination
        onChange={handleTableChange}
      />

      {pagination !== false && (
        <div className={paginationClassName ?? "flex justify-end"}>
          <BasePagination {...pagination} total={total} />
        </div>
      )}
    </div>
  );
}
