"use client";

import * as React from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { TEXT_LABEL } from "@/constant/text";

export interface ColumnDef<T> {
  key: keyof T | string;
  title: string;
  sortable?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
  width?: string;
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  loading?: boolean;
  rowKey: keyof T | ((row: T) => string);
  emptyText?: string;
}

type SortDir = "asc" | "desc" | null;

export function DataTable<T>({
  columns,
  data,
  loading = false,
  rowKey,
  emptyText = TEXT_LABEL.NO_DATA,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = React.useState<string | null>(null);
  const [sortDir, setSortDir] = React.useState<SortDir>(null);

  const handleSort = (key: string) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir("asc");
    } else if (sortDir === "asc") {
      setSortDir("desc");
    } else {
      setSortKey(null);
      setSortDir(null);
    }
  };

  const sorted = React.useMemo(() => {
    if (!sortKey || !sortDir) return data;
    return [...data].sort((a, b) => {
      const av = (a as any)[sortKey];
      const bv = (b as any)[sortKey];
      if (av === bv) return 0;
      const cmp = av > bv ? 1 : -1;
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  const getKey = (row: T, i: number): string => {
    if (typeof rowKey === "function") return rowKey(row);
    return String((row as any)[rowKey] ?? i);
  };

  const SortIcon = ({ col }: { col: ColumnDef<T> }) => {
    if (!col.sortable) return null;
    const key = String(col.key);
    if (sortKey !== key) return <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400 inline ml-1" />;
    if (sortDir === "asc") return <ChevronUp className="w-3.5 h-3.5 text-indigo-600 inline ml-1" />;
    return <ChevronDown className="w-3.5 h-3.5 text-indigo-600 inline ml-1" />;
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={`text-left py-3 px-4 text-sm font-medium text-slate-600 select-none ${col.sortable ? "cursor-pointer hover:text-slate-900" : ""}`}
                style={col.width ? { width: col.width } : undefined}
                onClick={col.sortable ? () => handleSort(String(col.key)) : undefined}
              >
                {col.title}
                <SortIcon col={col} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="py-12 text-center text-slate-500 text-sm">
                {TEXT_LABEL.LOADING}
              </td>
            </tr>
          ) : sorted.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="py-12 text-center text-slate-500 text-sm">
                {emptyText}
              </td>
            </tr>
          ) : (
            sorted.map((row, i) => (
              <tr key={getKey(row, i)} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                {columns.map((col) => {
                  const value = (row as any)[col.key as string];
                  return (
                    <td key={String(col.key)} className="py-3 px-4 text-sm text-slate-900">
                      {col.render ? col.render(value, row) : String(value ?? "")}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
