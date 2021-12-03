import shortId from 'shortid';
import faker, { commerce } from 'faker';

export const itemDummy = {
	id: shortId.generate(),
	User: {
		id: shortId.generate(),
		nickname: faker.name.findName(),
	},
	content: '',
	Images: [{
		src: faker.image.image(),
	}]
};

export const generateDummyItem = (number) => Array(number).fill().map(()=>({
	id: shortId.generate(),		// 상품 id
	User: {
		id: shortId.generate(),
		nickname: faker.name.findName(),
	},
	title: faker.lorem.sentence(),
	content: faker.lorem.paragraph(),
	Images: [{
		src: faker.image.image(),
	}],
	price: faker.commerce.price(),
}));