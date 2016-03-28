import AV from 'avoscloud-sdk'

AV.initialize('puVuQSL2x1iceX0V99MXST4p-gzGzoHsz', 'JezXUL3qvLQB04w5vlKbl6Q3')

export const Food = AV.Object.extend('Food')
export const Order = AV.Object.extend('Order')
export const Type = AV.Object.extend('Type')
export const OrderDetail = AV.Object.extend('OrderDetail')
export const Floor = AV.Object.extend('Floor')
export const Coupon = AV.Object.extend('Coupon')
export const TimeSlot = AV.Object.extend('TimeSlot')
export const CouponDetail = AV.Object.extend('CouponDetail')
