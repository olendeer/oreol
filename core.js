const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
// const path = require('path');
const app = express();


const PORT = process.env.PORT || 3000;


async function start(){
	try{
		app.listen(PORT, () => {
			console.log('Server has been started...');
		});
		await mongoose.connect('mongodb+srv://olendeer:1029384756qazqwertyuiop@oreol-pqhp8.mongodb.net/oreol?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
		console.log('Set connetion to data base');
	}catch(e){
		console.log(e)
		console.log('Not connetion!')
	}
}

start();

app.set('view engine', 'ejs');
app.use(express.static('assets'));
app.use('/catalog', express.static('assets'));
app.use('/about/:page', express.static('assets'));
app.use('/about/articles/:page', express.static('assets'));
app.use('/:categorie/:product', express.static('assets'))
app.use('/admin/:url', express.static('assets'))
app.use('/admin/products/:section/:id', express.static('assets'));


app.get('/', async (request, response) => {
	let links = LinkItem.find();
	let charts = ChartsItem.findOne();
	let slides = SlideItem.find();
	let interesting = ProductItem.find().limit(4)
	Promise.all([links, charts, slides, interesting]).then(data => {
		response.render('index', {links : data[0], charts : data[1], slides: data[2], interesting: data[3]});
	})
});

app.get('/catalog', async (request, response) => {
	let links = LinkItem.find();
	let charts = ChartsItem.findOne();
	let description = await DescriptionItem.findOne({name : 'Каталог'}).then(data => data.description)
	Promise.all([links, charts, description]).then(data => {
		response.render('catalog', {links : data[0], charts : data[1], description : data[2]});
	})
})

let filters = [
	[
		{
			name : 'Класс:',
			fields: ['Субэконом', 'Эконом', 'Стандарт', 'Бизнес', 'Премиум']
		},
		{
			name : 'Тип:',
			fields : ['Гидроизоляционный', 'Кровельный']
		},
		{
			name: 'Бренд:',
			fields: ['Битумакс', 'Еврорубероид', 'Пластобит', 'Пластобит Мост', 'Пластобит Про', 'Пластобит Эласт']
		},
		{
			name: 'Вес кг/м2:',
			fields: ['1,5', '2,0', '2,5', '3,0', '3,5', '3,9', '4,0', '5,0', '5,4', '6,3', '6,5']
		},
		{
			name: 'Основа:', 
			fields: ['Полиэстер', 'Стеклохолст']
		},
		{
			name: 'Длина руллона, м:', 
			fields: ['8', '10', '15']
		},
		{
			name: 'Маркировка:', 
			fields: ['ЕКП', 'ЕПП', 'ХКП', 'ХПП']
		}
	],
	[
		{
			name: 'Продукция:',
			fields: ['Мастика', 'Праймер'] 
		},
		{
			name: 'Сфера применения:',
			fields: ['Антикоррозийная защита', 'Герметизация', 'Гидроизоляция', 'Подготовка поверхностей', 'Приклеивание', 'Устройство и ремонт кровель', 'Устройство кровель']
		},
		{
			name: 'Тип растворителя:',
			fields: ['Водная эмульсия', 'Органический растворитель']
		}
	]
]

app.get('/catalog/:categorie', async (request, response) => {
	let data = {
		page: '',
		filter: true,
		filterData: [],
		description: '',
		countItem: Array.from(await ProductItem.find({categorie: request.params.categorie})).length,
		countPage: 1,
		numberPage: 1,
		calculator: false,
		calculatorData: {},
		categorie: request.params.categorie
	};
	if(request.query.page){
		if(request.query.page <= 0){
			data.numberPage = 1;
		}
		else{
			data.numberPage = +request.query.page;
		}
	}
	data.countPage = Math.ceil(data.countItem / 12);
	if(request.query.page > data.countPage){
		data.numberPage = data.countPage;
	}
	if(request.params.categorie == 'evroruberoid'){
		data.page = 'Еврорубероид'
		data.description = await DescriptionItem.findOne({name : 'Еврорубероид'}).then(data => data.description)
		data.filterData = filters[0];
	}
	else if(request.params.categorie == 'mastika'){
		data.page = 'Мастики, праймеры'
		data.description = await DescriptionItem.findOne({name : 'Мастики, праймеры'}).then(data => data.description)
		data.filterData = filters[1];
	}
	else if(request.params.categorie == 'germetik'){
		data.page = 'Герметики'
		data.filter = false
		data.description = await DescriptionItem.findOne({name : 'Герметики'}).then(data => data.description)
	}
	else if(request.params.categorie == 'podkladochnyi-kover'){
		data.page = 'Подкладочный ковер'
		data.filter = false
		data.description =  await DescriptionItem.findOne({name : 'Подкладочный ковер'}).then(data => data.description)
	}
	else if(request.params.categorie == 'shlakoblock'){
		data.page = 'Шлакоблок'
		data.description = await DescriptionItem.findOne({name : 'Шлакоблоки'}).then(data => data.description)
		data.calculator = true;
		data.filter = false;
		data.calculatorData.title = 'Расчитать примерное количество и стоимость шлакоблоков можно в нашем';
		data.calculatorData.button = 'Калькуляторе для Шлакоблоков';
		data.calculatorData.link = '/calculator';
	}
	else{
		response.status(404);
	}
	let links = LinkItem.find();
	let charts = ChartsItem.findOne();
	let products = ProductItem.find({categorie: request.params.categorie}).sort({ $natural: -1 }).skip(data.numberPage * 12 - 12).limit(12)
	Promise.all([links, charts, products]).then(items => {
		response.render('categorie', {data: data, links : items[0], charts : items[1], products: items[2]});
	});
})

app.get('/certification', async (request, response) => {
	let links = LinkItem.find();
	let charts = ChartsItem.findOne();
	let certificats = MarkItem.find({type : 'certification'})
	let description =  await DescriptionItem.findOne({name : 'Сертификаты соответствия'}).then(data => data.description)
	Promise.all([links, charts, certificats, description]).then(items => {
		response.render('certification', { links : items[0], charts : items[1], certificats : items[2], description: items[3]});
	});
})
app.get('/about/articles', async (request, response) => {
	let data = {
		countArticles: 6,
		countPage: 2,
		numberPage: 1
	}
	let links = LinkItem.find();
	let charts = ChartsItem.findOne();
	Promise.all([links, charts]).then(items => {
		console.log(data)
		response.render('articles', {data: data, links : items[0], charts : items[1]});
	});
})
app.get('/about/:info', async (request, response) => {
	let links = LinkItem.find();
	let charts = ChartsItem.findOne();
	if(request.params.info == 'feedback'){
		let data = {
			countFeedbacks: 5,
			countPage: 2,
			numberPage: 1
		}
		Promise.all([links, charts]).then(items => {
			response.render(request.params.info, {data: data, links : items[0], charts : items[1]});
		});
	}
	else{
		Promise.all([links, charts]).then(items => {
			response.render(request.params.info ,{ links : items[0], charts : items[1]});
		});
	}
})
app.get('/faq', async (request, response) => {
	let links = LinkItem.find();
	let charts = ChartsItem.findOne();
	let marks1 = MarkItem.find({categorie : 'Еврорубероид'})
	let marks2 = MarkItem.find({categorie : 'Мастики, праймеры'})
	let marks3 = MarkItem.find({categorie : 'Герметики'})
	let marks4 = MarkItem.find({categorie : 'Подкладочный ковер'})
	let marks5 = MarkItem.find({categorie : 'Шлакоблок'})
	
	Promise.all([links, charts, marks1, marks2, marks3, marks4, marks5]).then(items => {
		response.render('faq', { links : items[0], charts : items[1], marks: [items[2], items[3], items[4], items[5], items[6]]});
	})
})

app.get('/examples', async (request, response) => {
	let links = LinkItem.find();
	let charts = ChartsItem.findOne();
	let marks = MarkItem.find({type : 'examples'}).limit(4)
	Promise.all([links, charts, marks]).then(items => {
		let data = {
			countExamples: items[2].length,
			countPage: Math.ceil(items[2].length / 4),
			numberPage: 1
		}
		response.render('examples', {data: data, links : items[0], charts : items[1], marks: items[2]});
	})
})

app.get('/about/articles/article', async (request, response) => {
	let data = {
		name: 'Утепление шлакоблочного дома с отделкой сайдинга'
	}
	let links = LinkItem.find();
	let charts = ChartsItem.findOne();
	Promise.all([links, charts]).then(items => {
		response.render('article', {data: data, links : items[0], charts : items[1]});
	})
})

app.get('/delivery', async (request, response) => {
	let links = LinkItem.find();
	let charts = ChartsItem.findOne();
	let marks = MarkItem.find({type : 'delivery'});
	Promise.all([links, charts, marks]).then(items => {
		response.render('delivery', { links : items[0], charts : items[1], marks: items[2]});
	})
})

app.get('/calculator', async (request, response) => {
	let data = {}
	data.page = 'Шлакоблоки'
	data.description = await DescriptionItem.findOne({name : 'Калькулятор'}).then(data => data.description)
	let links = LinkItem.find();
	let charts = ChartsItem.findOne();
	Promise.all([links, charts]).then(items => {
		response.render('calculator',{ data: data, links : items[0], charts : items[1]});
	});
})


//Admin Panel
const jsonParser = express.json();

let Link = mongoose.Schema({
	name: Array,
	url: String,
	sublink: String,
})
const LinkItem = mongoose.model('Link', Link);

let Charts = mongoose.Schema({
	phone1: String,
	phone2: String,
	phone3: String,
	chart : String,
	email : String,
	address1: Object,
	address2: Object,

})
const ChartsItem = mongoose.model('Charts', Charts);

let Mark = mongoose.Schema({
	type : String,
	typeName: String,
	name : String,
	imgs : Array,
	title: String,
	price  : String,
	categorie: String
})
const MarkItem = mongoose.model('Mark', Mark);

let Slide = mongoose.Schema({
	img: String,
	name: String,
	price: String,
	url: String
})
const SlideItem = mongoose.model('Slide', Slide)

let Product = mongoose.Schema({
	categorieName: String,
	categorie: String,
	name: String,
	description : String,
	price: String,
	typePrice: String,
	label: String,
	rating: Number,
	img: String,
	characteristics: Array,
	classEvroruberoid: String,
	typeEvroruberoid: String,
	brendEvroruberoid: String,
	weightEvroruberoid: String,
	baseEvroruberoid: String,
	widthEvroruberoid: String,
	marksEvroruberoid: String,
	typeMastika: String,
	areaMastika: String,
	solventMastika: String
})
const ProductItem = mongoose.model('Product', Product)

let Description = mongoose.Schema({
	description : String,
	name : String,
})
const DescriptionItem = mongoose.model('Description', Description);

app.get('/admin', (request, response) => {
	response.redirect('/admin/main')
})

app.get('/admin/:url', async (request, response) => {
	let data;
	switch(request.params.url){
		case 'main':
			data = await LinkItem.find();
			break;
		case 'charts':
			data = await ChartsItem.findOne();
			break;
		case 'marks':
			data = undefined;
			break;
		case 'slider':
			data = await SlideItem.find();
			break;
		case 'products':
			data = undefined;
			break;
		case 'description':
			data = await DescriptionItem.find();
			break;
	}
	response.render('admin/admin', {url : request.params.url, data: data, section: undefined, product: undefined});
})
app.get('/admin/:template/:section', async (request, response) => {
	let data = await LinkItem.find();
	let link;
	switch(request.params.template){
		case 'main':
			link = await LinkItem.findOne({_id: request.params.section})
			.then(data => data)
			.catch(() => {
				return {
					name : [
						'Новая ссылка'
					],
					sublink: 'Нет',
					url: ''
				}
			});
			response.render('admin/admin', {url : 'main', section: request.params.section, data: data, link: link});
			break;
		case 'marks':
			let marks = await MarkItem.find({type: request.params.section})
			.then(data => {
				if(data.length == 0){
					return [{
						typeName : 'Новая запись'
					}]
				}
				else{
					return data;
				}
			})
			response.render('admin/admin', {url : 'marks', section: request.params.section, marks: marks});
			break;
		case 'slider':
			response.render('admin/admin', {url : 'slider', section: request.params.section});
			break;
		case 'products':
				ProductItem.find({categorie: request.params.section})
				.then(data => {
					if(data.length == 0){
						response.render('admin/admin', {url : 'products', section: 'new', product: undefined,  products:  [{categorieName : 'Новый товар' }]});
					}
					else{
						response.render('admin/admin', {url : 'products', section: request.params.section, product: undefined, products: data});
					}
				})
			break;
	}
})

app.get('/admin/products/:section/:id', async (request, response) => {
	response.render('admin/admin', {url : 'products', section: undefined, product: await ProductItem.findOne({_id: request.params.id})});
})

app.post('/saveDescription', jsonParser, async (request, response) => {
	await DescriptionItem.updateOne({_id : request.body.id}, {description : request.body.description})
	response.json({ok: 'ok'});
})

app.post('/saveLink', jsonParser, async (request, response) => {
	await LinkItem.updateOne({_id : request.body.id}, request.body,  (error, coincidence) => {
		if(coincidence == undefined){
			new LinkItem(request.body).save();
		}
	})
	response.json({ok: 'ok'});
})

app.post('/saveCharts', jsonParser, async (request, response) => {
	await ChartsItem.updateOne({_id: request.body.id}, request.body);
	response.json({ok: 'ok'});
})
let storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, __dirname + '/assets/img/custom/')
		},
		filename: function (req, file, cb) {
			cb(null,  Date.now() + file.originalname)
		}
	});

let upload = multer({ storage: storage});

app.post('/uploadPhoto', upload.single('image'), async (request, response) => {
	await MarkItem.updateOne({_id : request.body.id}, {$set : {imgs: ['img/custom/' + request.file.filename]}})
	response.json({
		url : 'img/custom/' + request.file.filename
	});
});

app.post('/saveMark', jsonParser, async (request, response) => {
	switch(request.body.type){
		case 'certification':
			await MarkItem.updateOne({_id: request.body.id}, {$set : {title: request.body.title}});
			break;
		case 'examples':
			await MarkItem.updateOne({_id: request.body.id}, {$set : {title: request.body.title, name: request.body.name}});
			break;
		case 'delivery':
			await MarkItem.updateOne({_id: request.body.id}, {$set : {title: request.body.title, name: request.body.name, price: request.body.price}});
			break;
		case 'faq':
			await MarkItem.updateOne({_id: request.body.id}, {$set : {title: request.body.title, name: request.body.name, categorie : request.body.categorie}});
			break;
	}
	response.json({ok: 'ok'});
})

app.post('/createMark',  upload.single('image'), async (request, response) => {
	await new MarkItem({
		type: request.body.type,
		typeName : request.body.typeName,
		name: request.body.name,
		imgs: ['img/custom/' + (request.file ? request.file.filename : '')],
		title : request.body.title,
		price : request.body.price,
		categorie: request.body.categorie
	}).save()
	response.json({ok: 'ok'});
})

app.post('/deleteMark', jsonParser, async (request, response) => {
	await MarkItem.deleteOne({_id: request.body.id})
	response.json({ok: 'ok'});
})

app.post('/uploadPhotoSlide', upload.single('image'), async (request, response) => {
	await SlideItem.updateOne({_id : request.body.id}, {$set : {img: 'img/custom/' + request.file.filename}})	
	response.json({
		url : 'img/custom/' + request.file.filename
	});
});
app.post('/saveSlide', jsonParser, async (request, response) => {
	await SlideItem.updateOne({_id: request.body.id}, {$set : {url: request.body.url, name: request.body.name, price: request.body.price}})
	response.json({ok: 'ok'});
})

app.post('/createSlide',  upload.single('image'), async (request, response) => {
	await new SlideItem({
		name: request.body.name,
		img: 'img/custom/' + (request.file ? request.file.filename : ''),
		price : request.body.price,
		url: request.body.url
	}).save()
	response.json({ok: 'ok'});
})

app.post('/deleteSlide', jsonParser, async (request, response) => {
	await SlideItem.deleteOne({_id: request.body.id})
	response.json({ok: 'ok'});
})

app.post('/uploadPhotoProduct', upload.single('image'), async (request, response) => {
	await ProductItem.updateOne({_id : request.body.id}, {$set : {img: 'img/custom/' + request.file.filename}})
	response.json({
		url : 'img/custom/' + request.file.filename
	});
});

app.post('/createProduct',  upload.single('image'), async (request, response) => {
	await new ProductItem({
		categorieName: request.body.categorieName,
		categorie: request.body.categorie,
		name: request.body.name,
		description : request.body.description,
		price: request.body.price,
		typePrice: request.body.typePrice,
		label: request.body.label,
		rating: (typeof +request.body.rating != 'number') ? '' : +request.body.rating,
		img: 'img/custom/' + request.file.filename,
		characteristics: JSON.parse(request.body.characteristics),
		classEvroruberoid: request.body.classEvroruberoid,
		typeEvroruberoid: request.body.typeEvroruberoid,
		brendEvroruberoid: request.body.brendEvroruberoid,
		weightEvroruberoid: request.body.weightEvroruberoid,
		baseEvroruberoid: request.body.baseEvroruberoid,
		widthEvroruberoid: request.body.widthEvroruberoid,
		marksEvroruberoid: request.body.marksEvroruberoid,
		typeMastika: request.body.typeMastika,
		areaMastika: request.body.areaMastika,
		solventMastika: request.body.solventMastika
	}).save();
	response.json({ok: 'ok'});
})

app.post('/saveProduct', jsonParser, async (request, response) => {
	await ProductItem.updateOne({
		_id: request.body.id
	}, 
	{
		$set : {
			name: request.body.name,
			description : request.body.description,
			price: request.body.price,
			typePrice: request.body.typePrice,
			label: request.body.label,
			rating: (typeof +request.body.rating != 'number') ? '' : +request.body.rating,
			characteristics: JSON.parse(request.body.characteristics),
			classEvroruberoid: request.body.classEvroruberoid,
			typeEvroruberoid: request.body.typeEvroruberoid,
			brendEvroruberoid: request.body.brendEvroruberoid,
			weightEvroruberoid: request.body.weightEvroruberoid,
			baseEvroruberoid: request.body.baseEvroruberoid,
			widthEvroruberoid: request.body.widthEvroruberoid,
			marksEvroruberoid: request.body.marksEvroruberoid,
			typeMastika: request.body.typeMastika,
			areaMastika: request.body.areaMastika,
			solventMastika: request.body.solventMastika
		}
	});
	response.json({ok: 'ok'});
})

app.post('/deleteProduct', jsonParser, async (request, response) => {
	await ProductItem.deleteOne({_id: request.body.id})
	response.json({ok: 'ok'});
})


app.get('/:categorie/:product', async (request, response) => {
	let data = {
		productName: 'Шлакоблок стеновой 390*190*188'
	};
	data.calculator = true;
	switch(request.params.categorie){
		case 'evroruberoid':
			data.categorie = 'Еврорубероид'
			break;
		case 'mastika':
			data.categorie = 'Мастики, праймеры'
			break;
		case 'germetik':
			data.categorie = 'Герметики'
			break;
		case 'podkladochnyi-kover':
			data.categorie = 'Подкладочный ковер'
			break;
		case 'shlakoblock':
			data.categorie = 'Шлакоблок'
			break;
	}
	let links = LinkItem.find();
	let charts = ChartsItem.findOne();
	let product = ProductItem.findOne({_id : request.params.product})
	let interesting = ProductItem.find({_id: {$ne: request.params.product}, categorie: request.params.categorie}).limit(4)
	data.categorieLink = request.params.categorie;
	Promise.all([links, charts, product, interesting]).then(items => {
		response.render('product', {data: data, links : items[0], charts : items[1], product: items[2], interesting: items[3]});
	});
})