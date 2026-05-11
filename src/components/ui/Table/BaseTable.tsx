"use client";

import { ConfigProvider, Table } from "antd";
import type { TableProps } from "antd";

export interface BaseTableProps<T> extends TableProps<T> {
  loading?: boolean;
  emptyText?: string;
  noPagination?: boolean;
}

export default function BaseTable<T extends object>({
  loading = false,
  emptyText = "No data",
  noPagination = true,
  pagination,
  locale,
  ...props
}: BaseTableProps<T>) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#f9fafb",
            // headerColor: "#4b5563",
            rowHoverBg: "#f9fafb",
            borderColor: "#e5e7eb",
            headerSplitColor: "transparent",
          },
        },
      }}
    >
      <Table<T>
        className="border border-gray-200 rounded-lg! [&_.ant-table-thead_th]:py-2! [&_.ant-table-tbody_td]:py-4!"
        loading={loading}
        showSorterTooltip
        pagination={noPagination ? false : pagination}
        locale={{
          emptyText,
          ...locale,
        }}
        {...props}
      />
    </ConfigProvider>
  );
}
