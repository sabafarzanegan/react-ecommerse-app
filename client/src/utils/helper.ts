import slider1 from "../../public/images/slider/1.jpeg";
import slider2 from "../../public/images/slider/2.jpeg";
import slider3 from "../../public/images/slider/3.jpeg";
import slider4 from "../../public/images/slider/4.jpeg";
import slider5 from "../../public/images/slider/5.jpeg";
import cat1 from "../../public/images/category/1.jpeg";
import cat2 from "../../public/images/category/2.jpeg";
import cat3 from "../../public/images/category/3.jpeg";
import cat4 from "../../public/images/category/4.jpeg";
import cat5 from "../../public/images/category/5.jpeg";
import brand1 from "../../public/images/brands/1.png";
import brand2 from "../../public/images/brands/2.png";
import brand3 from "../../public/images/brands/3.png";
import brand4 from "../../public/images/brands/4.png";
import brand5 from "../../public/images/brands/5.png";
import brand6 from "../../public/images/brands/6.png";
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
  { name: "مراقبت بوست", link: "/shop/listing", id: 6 },
];
export function convertToPersianNumber(englishNumber: number | string) {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  return englishNumber
    .toString()
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

export const imgSlider = [
  { src: slider1, id: 1 },
  { src: slider2, id: 2 },
  { src: slider3, id: 3 },
  { src: slider4, id: 4 },
  { src: slider5, id: 5 },
];

export const imgCategory = [
  { src: cat1, title: "آرایشی", id: 1 },
  { src: cat2, title: "مراقبت مو", id: 2 },
  { src: cat3, title: "مراقبت پوست", id: 3 },
  { src: cat4, title: "عطر و ادکلن", id: 4 },
  { src: cat5, title: "بهداشت شخصی", id: 5 },
];

export const imgBrand = [
  { src: brand1, id: 1 },
  { src: brand2, id: 2 },
  { src: brand3, id: 3 },
  { src: brand4, id: 4 },
  { src: brand5, id: 5 },
  { src: brand6, id: 6 },
];
