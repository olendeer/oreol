const express = require('express');
// const multer = require('multer');
// const mongoose = require('mongoose');
// const path = require('path');
// const appFolder = require('app-root-path');
const app = express();


const PORT = process.env.PORT || 3000;


async function start(){
	try{
		app.listen(PORT, () => {
			console.log('Server has been started...');
		});
		// await mongoose.connect('mongodb+srv://olendeer:1029384756qazqwertyuiop@multilanding-rqsma.gcp.mongodb.net/Multilanding?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
		// console.log('Set connetion to data base');
	}catch(e){
		console.log(e)
		console.log('Not connetion!')
	}
}

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, __dirname + '/adminfiles/customImg/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname)
//     }
// });
// const upload = multer({ storage: storage });

// app.post('/img', upload.any(), (request, response) => {
// 	response.statusCode(200);
// });
// app.post('/editImages', upload.any(), (request, response) => {
// 	response.statusCode(200);
// });
start();

// console.log(appFolder)
app.set('view engine', 'ejs');
app.use(express.static('assets'));
app.use('/catalog', express.static('assets'));
app.use('/about/:page', express.static('assets'));
app.use('/about/articles/:page', express.static('assets'));
app.use('/:categorie/product', express.static('assets'))

app.get('/', (request, response) => {
	response.render('index');
});

app.get('/catalog', (request, response) => {
	response.render('catalog')
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
			fields: ['ЕММ', 'ЕПП', 'ХКП', 'ХПП']
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

app.get('/catalog/:categorie', (request, response) => {
	let data = {
		page: '',
		filter: true,
		filterData: [],
		description: '',
		countItem: 23,
		countPage: 8,
		numberPage: 3,
		calculator: false,
		calculatorData: {},
		categorie: request.params.categorie
	}; 
	if(request.params.categorie == 'evroruberoid'){
		data.page = 'Еврорубероид'
		data.description = 'Душа моя озарена неземной радостью, как эти чудесные весенние утра, которыми я наслаждаюсь от всего сердца. Я совсем один и блаженствую в здешнем краю, словно созданном для таких, как я. Я так счастлив, мой друг, так упоен ощущением покоя, что искусство мое страдает от этого. Ни одного штриха не мог бы я сделать, а никогда не был таким большим художником, как в эти минуты. Когда от милой моей долины поднимается пар и полдневное солнце стоит над непроницаемой чащей темного леса и лишь редкий луч проскальзывает в его святая святых, а я лежу в высокой траве у быстрого ручья и, прильнув к земле, вижу тысячи всевозможных былинок и чувствую, как близок моему сердцу крошечный мирок, что снует между стебельками, наблюдаю эти неисчислимые, непостижимые разновидности червяков и мошек и чувствую близость всемогущего, создавшего нас по своему подобию, веяние вселюбящего, судившего нам парить в вечном блаженстве, когда взор мой туманится и все вокруг меня и небо надо мной запечатлены в моей душе, точно образ возлюбленной, - тогда, дорогой друг, меня часто томит мысль: "Ах! Как бы выразить, как бы вдохнуть в рисунок то, что так полно, так трепетно живет во мне, запечатлеть отражение моей души, как душа моя - отражение предвечного бога!"'
		data.filterData = filters[0];
	}
	else if(request.params.categorie == 'mastika'){
		data.page = 'Мастики, праймеры'
		data.description = 'Душа моя озарена неземной радостью, как эти чудесные весенние утра, которыми я наслаждаюсь от всего сердца. Я совсем один и блаженствую в здешнем краю, словно созданном для таких, как я. Я так счастлив, мой друг, так упоен ощущением покоя, что искусство мое страдает от этого. Ни одного штриха не мог бы я сделать, а никогда не был таким большим художником, как в эти минуты. Когда от милой моей долины поднимается пар и полдневное солнце стоит над непроницаемой чащей темного леса и лишь редкий луч проскальзывает в его святая святых, а я лежу в высокой траве у быстрого ручья и, прильнув к земле, вижу тысячи всевозможных былинок и чувствую, как близок моему сердцу крошечный мирок, что снует между стебельками, наблюдаю эти неисчислимые, непостижимые разновидности червяков и мошек и чувствую близость всемогущего, создавшего нас по своему подобию, веяние вселюбящего, судившего нам парить в вечном блаженстве, когда взор мой туманится и все вокруг меня и небо надо мной запечатлены в моей душе, точно образ возлюбленной, - тогда, дорогой друг, меня часто томит мысль: "Ах! Как бы выразить, как бы вдохнуть в рисунок то, что так полно, так трепетно живет во мне, запечатлеть отражение моей души, как душа моя - отражение предвечного бога!"'
		data.filterData = filters[1];
	}
	else if(request.params.categorie == 'germetik'){
		data.page = 'Герметики'
		data.filter = false
		data.description = 'Душа моя озарена неземной радостью, как эти чудесные весенние утра, которыми я наслаждаюсь от всего сердца. Я совсем один и блаженствую в здешнем краю, словно созданном для таких, как я. Я так счастлив, мой друг, так упоен ощущением покоя, что искусство мое страдает от этого. Ни одного штриха не мог бы я сделать, а никогда не был таким большим художником, как в эти минуты. Когда от милой моей долины поднимается пар и полдневное солнце стоит над непроницаемой чащей темного леса и лишь редкий луч проскальзывает в его святая святых, а я лежу в высокой траве у быстрого ручья и, прильнув к земле, вижу тысячи всевозможных былинок и чувствую, как близок моему сердцу крошечный мирок, что снует между стебельками, наблюдаю эти неисчислимые, непостижимые разновидности червяков и мошек и чувствую близость всемогущего, создавшего нас по своему подобию, веяние вселюбящего, судившего нам парить в вечном блаженстве, когда взор мой туманится и все вокруг меня и небо надо мной запечатлены в моей душе, точно образ возлюбленной, - тогда, дорогой друг, меня часто томит мысль: "Ах! Как бы выразить, как бы вдохнуть в рисунок то, что так полно, так трепетно живет во мне, запечатлеть отражение моей души, как душа моя - отражение предвечного бога!"'
	}
	else if(request.params.categorie == 'podkladochnyi-kover'){
		data.page = 'Подкладочный ковер'
		data.filter = false
		data.description = 'Душа моя озарена неземной радостью, как эти чудесные весенние утра, которыми я наслаждаюсь от всего сердца. Я совсем один и блаженствую в здешнем краю, словно созданном для таких, как я. Я так счастлив, мой друг, так упоен ощущением покоя, что искусство мое страдает от этого. Ни одного штриха не мог бы я сделать, а никогда не был таким большим художником, как в эти минуты. Когда от милой моей долины поднимается пар и полдневное солнце стоит над непроницаемой чащей темного леса и лишь редкий луч проскальзывает в его святая святых, а я лежу в высокой траве у быстрого ручья и, прильнув к земле, вижу тысячи всевозможных былинок и чувствую, как близок моему сердцу крошечный мирок, что снует между стебельками, наблюдаю эти неисчислимые, непостижимые разновидности червяков и мошек и чувствую близость всемогущего, создавшего нас по своему подобию, веяние вселюбящего, судившего нам парить в вечном блаженстве, когда взор мой туманится и все вокруг меня и небо надо мной запечатлены в моей душе, точно образ возлюбленной, - тогда, дорогой друг, меня часто томит мысль: "Ах! Как бы выразить, как бы вдохнуть в рисунок то, что так полно, так трепетно живет во мне, запечатлеть отражение моей души, как душа моя - отражение предвечного бога!"'
	}
	else if(request.params.categorie == 'shlakoblock'){
		data.page = 'Шлакоблок'
		data.description = 'Душа моя озарена неземной радостью, как эти чудесные весенние утра, которыми я наслаждаюсь от всего сердца. Я совсем один и блаженствую в здешнем краю, словно созданном для таких, как я. Я так счастлив, мой друг, так упоен ощущением покоя, что искусство мое страдает от этого. Ни одного штриха не мог бы я сделать, а никогда не был таким большим художником, как в эти минуты. Когда от милой моей долины поднимается пар и полдневное солнце стоит над непроницаемой чащей темного леса и лишь редкий луч проскальзывает в его святая святых, а я лежу в высокой траве у быстрого ручья и, прильнув к земле, вижу тысячи всевозможных былинок и чувствую, как близок моему сердцу крошечный мирок, что снует между стебельками, наблюдаю эти неисчислимые, непостижимые разновидности червяков и мошек и чувствую близость всемогущего, создавшего нас по своему подобию, веяние вселюбящего, судившего нам парить в вечном блаженстве, когда взор мой туманится и все вокруг меня и небо надо мной запечатлены в моей душе, точно образ возлюбленной, - тогда, дорогой друг, меня часто томит мысль: "Ах! Как бы выразить, как бы вдохнуть в рисунок то, что так полно, так трепетно живет во мне, запечатлеть отражение моей души, как душа моя - отражение предвечного бога!"'
		data.calculator = true;
		data.filter = false;
		data.calculatorData.title = 'Расчитать примерное количество и стоимость шлакоблоков можно в нашем';
		data.calculatorData.button = 'Калькуляторе для Шлакоблоков';
		data.calculatorData.link = '/calculator';
	}
	else{
		response.status(404);
	}
	response.render('categorie', {data: data});
})

app.get('/certification', (request, response) => {
	response.render('certification')
})
app.get('/about/articles', (request, response) => {
	let data = {
		countArticles: 6,
		countPage: 2,
		numberPage: 1
	}
	response.render('articles', {data: data})
})
app.get('/about/:info', (request, response) => {
	if(request.params.info == 'feedback'){
		let data = {
			countFeedbacks: 4,
			countPage: 2,
			numberPage: 1
		}
		response.render(request.params.info, {data: data})
	}
	response.render(request.params.info)
})
app.get('/faq', (request, response) => {
	response.render('faq')
})

app.get('/examples', (request, response) => {
	let data = {
		countExamples: 6,
		countPage: 2,
		numberPage: 1
	}
	response.render('examples', {data: data})
})

app.get('/about/articles/article', (request, response) => {
	let data = {
		name: 'Утепление шлакоблочного дома с отделкой сайдинга'
	}
	response.render('article', {data: data});
})

app.get('/delivery', (request, response) => {
	response.render('delivery');
})

app.get('/calculator', (request, response) => {
	let data = {}
	data.page = 'Шлакоблоки'
	data.description = 'Душа моя озарена неземной радостью, как эти чудесные весенние утра, которыми я наслаждаюсь от всего сердца. Я совсем один и блаженствую в здешнем краю, словно созданном для таких, как я. Я так счастлив, мой друг, так упоен ощущением покоя, что искусство мое страдает от этого. Ни одного штриха не мог бы я сделать, а никогда не был таким большим художником, как в эти минуты. Когда от милой моей долины поднимается пар и полдневное солнце стоит над непроницаемой чащей темного леса и лишь редкий луч проскальзывает в его святая святых, а я лежу в высокой траве у быстрого ручья и, прильнув к земле, вижу тысячи всевозможных былинок и чувствую, как близок моему сердцу крошечный мирок, что снует между стебельками, наблюдаю эти неисчислимые, непостижимые разновидности червяков и мошек и чувствую близость всемогущего, создавшего нас по своему подобию, веяние вселюбящего, судившего нам парить в вечном блаженстве, когда взор мой туманится и все вокруг меня и небо надо мной запечатлены в моей душе, точно образ возлюбленной, - тогда, дорогой друг, меня часто томит мысль: "Ах! Как бы выразить, как бы вдохнуть в рисунок то, что так полно, так трепетно живет во мне, запечатлеть отражение моей души, как душа моя - отражение предвечного бога!"'
	response.render('calculator',{ data: data})
})

app.get('/:categorie/product', (request, response) => {
	let data = {
		productName: 'Шлакоблок стеновой 390*190*188'
	};
	data.calculator = true;
	switch(request.params.categorie){
		case 'shlakoblock':
			data.categorie = 'Шлакоблок'
			break;
	}
	data.categorieLink = request.params.categorie;
	response.render('product', {data: data})
})