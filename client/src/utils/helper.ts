export const categoryProduct = [
  { value: "آرایشی", label: "آرایشی" },
  { value: "مراقبت پوست", label: "مراقبت پوست" },
  { value: "مراقبت مو", label: "مراقبت مو" },
  { value: "عطر و ادکلن", label: "عطر و ادکلن" },
  { value: "بهداشت شخصی", label: "بهداشت شخصی" },
];

export const brandProduct = [
  { value: "لافارر", label: "لافارر" },
  { value: "هیدرودرم", label: "هیدرودرم" },
  { value: "سریتا", label: "سریتا" },
  { value: "پرایم", label: "پرایم" },
  { value: "آردن", label: "آردن" },
  { value: "کالیستا", label: "کالیستا" },
  { value: "سان سیف", label: "سان سیف" },
  { value: "درماتیپیک", label: "درماتیپیک" },
  { value: "فولیکا", label: "فولیکا" },
  { value: "هات لاو", label: "هات لاو" },
  { value: "پرمیر نوت", label: "پرمیر نوت" },
];

export const filterOptions = {
  category: [
    { value: "آرایشی", label: "آرایشی" },
    { value: "مراقبت پوست", label: "مراقبت پوست" },
    { value: "مراقبت مو", label: "مراقبت مو" },
    { value: "عطر و ادکلن", label: "عطر و ادکلن" },
    { value: "بهداشت شخصی", label: "بهداشت شخصی" },
  ],
  brand: [
    { value: "لافارر", label: "لافارر" },
    { value: "هیدرودرم", label: "هیدرودرم" },
    { value: "سریتا", label: "سریتا" },
    { value: "پرایم", label: "پرایم" },
    { value: "آردن", label: "آردن" },
    { value: "کالیستا", label: "کالیستا" },
    { value: "سان سیف", label: "سان سیف" },
    { value: "درماتیپیک", label: "درماتیپیک" },
    { value: "آردن", label: "آردن" },
    { value: "فولیکا", label: "فولیکا" },
    { value: "هات لاو", label: "هات لاو" },
    { value: "پرمیر نوت", label: "پرمیر نوت" },
  ],
};

export const menuItems = [
  { name: "خانه", link: "/shop/shoppinghome", id: 1 },
  { name: "آرایشی", link: "/shop/listing", id: 2 },
  { name: "مراقبت مو", link: "/shop/listing", id: 3 },
  { name: "عطروادکلن", link: "/shop/listing", id: 4 },
  { name: "بهداشت شخصی", link: "/shop/listing", id: 5 },
];
export function convertToPersianNumber(englishNumber: number | string) {
  // نقشه‌ی تبدیل ارقام انگلیسی به فارسی
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  // تبدیل عدد به رشته و جایگزینی ارقام
  return englishNumber
    .toString() // تبدیل به رشته
    .replace(/[0-9]/g, (digit: any) => persianDigits[digit]);
}

export function calculateDiscount(
  originalPrice: number,
  discountedPrice: number
) {
  if (
    originalPrice <= 0 ||
    discountedPrice < 0 ||
    discountedPrice > originalPrice
  ) {
    return "مقادیر ورودی معتبر نیستند.";
  }

  const discountPercentage =
    ((originalPrice - discountedPrice) / originalPrice) * 100;
  return convertToPersianNumber(discountPercentage.toFixed(2));
}
