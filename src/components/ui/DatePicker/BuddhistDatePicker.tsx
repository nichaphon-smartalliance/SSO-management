"use client";
import { ConfigProvider, DatePickerProps } from "antd";
import type { PickerLocale } from "antd/es/date-picker/generatePicker";
import type { Locale } from "antd/lib/locale";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
import thTH from "antd/lib/locale/th_TH";
import BaseDatePicker from "./BaseDatePicker";

dayjs.extend(buddhistEra);

// Thai Locale Config for Ant Design DatePicker
const thBuddhistLocale: PickerLocale = {
  lang: {
    locale: "th_TH",
    placeholder: "เลือกวันที่",
    rangePlaceholder: ["วันที่เริ่มต้น", "วันที่สิ้นสุด"],
    today: "วันนี้",
    now: "ตอนนี้",
    backToToday: "กลับไปวันนี้",
    ok: "ตกลง",
    clear: "ล้าง",
    month: "เดือน",
    year: "ปี",
    timeSelect: "เลือกเวลา",
    dateSelect: "เลือกวันที่",
    monthSelect: "เลือกเดือน",
    yearSelect: "เลือกปี",
    decadeSelect: "เลือกทศวรรษ",
    yearFormat: "BBBB",
    dateFormat: "D/M/BBBB",
    dayFormat: "D",
    dateTimeFormat: "D/M/BBBB HH:mm:ss",
    cellYearFormat: "BBBB",
    monthBeforeYear: true,
    previousMonth: "เดือนก่อนหน้า",
    nextMonth: "เดือนถัดไป",
    previousYear: "ปีก่อนหน้า",
    nextYear: "ปีถัดไป",
    previousDecade: "ทศวรรษก่อนหน้า",
    nextDecade: "ทศวรรษถัดไป",
    previousCentury: "ศตวรรษก่อนหน้า",
    nextCentury: "ศตวรรษถัดไป",
    shortWeekDays: ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"],
    week: "สัปดาห์",
    shortMonths: [
      "ม.ค.",
      "ก.พ.",
      "มี.ค.",
      "เม.ย.",
      "พ.ค.",
      "มิ.ย.",
      "ก.ค.",
      "ส.ค.",
      "ก.ย.",
      "ต.ค.",
      "พ.ย.",
      "ธ.ค.",
    ],
  },
  timePickerLocale: {
    placeholder: "เลือกเวลา",
  },
};

export default function BuddhistDatePicker({
  placeholder = "เลือกวันที่",
  format = "DD/MM/BBBB",
  locale = thBuddhistLocale,
  ...props
}: DatePickerProps) {
  return (
    <ConfigProvider locale={thTH}>
      <BaseDatePicker
        placeholder={placeholder}
        format={format}
        locale={locale}
        {...props}
      />
    </ConfigProvider>
  );
}
