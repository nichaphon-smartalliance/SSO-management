"use client";

import { Pagination } from "antd";
import type { PaginationProps } from "antd";

export default function BasePagination({ ...props }: PaginationProps) {
  return <Pagination {...props} />;
}
