const ACTION_DESCRIPTIONS = {
	//staff
	'staff/many-findMany-get': `Xodimlarning to'liq ro'yxatini olish`,
	'staff/many-createMany-post': `Bir nechta xodimlarni yaratish`,
	'staff/many-updateMany-patch': `Bir nechta xodimlarni yangilash`,
	'staff/many-deleteMany-delete': `Bir nechta xodimlarni o'chirish`,
	'staff/one-findOne-get': `Bitta xodimni olish`,
	'staff/one-createOne-post': `Yangi xodim yaratish`,
	'staff/one-updateOne-patch': `Xodimni yangilash`,
	'staff/one-deleteOne-delete': `Xodimni o'chirish`,

	//product
	'product-storehouse/many-findMany-get': `Ombordagi mahsulotlar ro'yxatini olish`,
	'product-storehouse/one-createOne-post': `Bitta mahsulotni omborga qo'shish`,
	'product-storehouse/one-deleteOne-delete': `Bitta mahsulotni ombordan o'chirish`,

	//payment
	'payment/many-findMany-get': `To'lovlar ro'yxatini olish`,
	'payment/excel-downloanExcel-get': `To'lovlarni Excel formatida yuklab olish`,
	'payment/one-getOne-get': `Bitta to'lovni olish`,
	'payment/one-createOne-post': `Yangi to'lov yaratish`,
	'payment/one-updateOne-patch': `Bitta to'lovni yangilash`,

	//action
	'action/many-findMany-get': `Harakatlar ro'yxatini olish`,
	'action/one-findOne-get': `Bitta harakatni olish`,
	'action/one-updateOne-patch': `Harakatni yangilash`,

	//client
	'client/many-findMany-get': `Mijozlar ro'yxatini olish`,
	'client/excel-downloanExcel-get': `Mijozlarni Excel formatida yuklab olish`,
	'client/one-getOne-get': `Bitta mijozni olish`,
	'client/one-createOne-post': `Yangi mijoz yaratish`,
	'client/one-updateOne-patch': `Mijoz ma'lumotlarini yangilash`,
	'client/one-deleteOne-delete': `Mijozni o'chirish`,

	//role
	'role/many-findMany-get': `Rollar ro'yxatini olish`,
	'role/one-getOne-get': `Bitta rolni olish`,
	'role/one-createOne-post': `Yangi rol yaratish`,
	'role/one-updateOne-patch': `Rolni yangilash`,
	'role/one-deleteOne-delete': `Rolni o'chirish`,

	//storehouse
	'storehouse/many-findMany-get': `Omborlar ro'yxatini olish`,
	'storehouse/one-getOne-get': `Bitta omborni olish`,
	'storehouse/one-createOne-post': `Yangi ombor yaratish`,
	'storehouse/one-updateOne-patch': `Omborni yangilash`,
	'storehouse/one-deleteOne-delete': `Omborni o'chirish`,

	//product
	'product/many-findMany-get': `Mahsulotlar ro'yxatini olish`,
	'product/excel-downloanExcel-get': `Mahsulotlarni Excel formatida yuklab olish`,
	'product/one-getOne-get': `Bitta mahsulotni olish`,
	'product/one-createOne-post': `Yangi mahsulot yaratish`,
	'product/one-updateOne-patch': `Mahsulotni yangilash`,
	'product/one-deleteOne-delete': `Mahsulotni o'chirish`,

	//selling
	'selling/many-findMany-get': `Sotuvlar ro'yxatini olish`,
	'selling/excel-downloanExcel-get': `Sotuvlarni Excel formatida yuklab olish`,
	'selling/one-getOne-get': `Bitta sotuvni olish`,
	'selling/one-createOne-post': `Yangi sotuv yaratish`,
	'selling/one-updateOne-patch': `Sotuvni yangilash`,
	'selling/one-deleteOne-delete': `Sotuvni o'chirish`,
}

export function actionDescriptionConverter(action: string) {
	return ACTION_DESCRIPTIONS[action] ?? `Noma'lum harakat. Siz uni nima ekanligini bilib yangilab qo'ysangiz bo'ladi!`
}
