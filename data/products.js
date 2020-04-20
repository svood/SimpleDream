const prckalPrice = [
    { size: '60*120', price: 450 },
    { size: '70*140', price: 540 },
    { size: '80*160', price: 640 },
    { size: '70*160', price: 499 },
    { size: '65*125', price: 435 },
    { size: '60*125', price: 415 },
    { size: '60*140', price: 429 },
    { size: '90*180', price: 640 },
    { size: '80*180', price: 579 },
    { size: '80*150', price: 529 },
]

const satinPrice = [
    { size: '60*120', price: 390 },
    { size: '70*140', price: 440 },
    { size: '80*160', price: 540 },
    { size: '70*160', price: 499 },
    { size: '65*125', price: 435 },
    { size: '60*125', price: 415 },
    { size: '60*140', price: 429 },
    { size: '140*200', price: 779 },
    { size: '130*195', price: 759 },
    { size: '120*190', price: 729 },
    { size: '110*190', price: 729 },
    { size: '100*190', price: 709 },
    { size: '90*190', price: 699 },
    { size: '90*180', price: 640 },
    { size: '80*180', price: 579 },
    { size: '80*150', price: 529 },
]

const data = [
    {
        id: 1,
        type: 3,
        title: 'Простынь Sky',
        inStock: true,
        hot: true,
        article: "00003Прост",
        price: satinPrice[0].price,
        material: "Сатин",
        startWidth: 60,
        startHeight: 120,
        maxWidth: 200,
        maxHeight: 200,
        sizes: satinPrice,
        text: "Простынка  пошита из натурального 100% хлопка сатин.Резинка надёжно фиксирует её с двух сторон матраса.Такое изделие не сминается во время сна малыша, не создает складок, экономит ваши силы.",
        img: [
            {
                src: "/products/prostynka_sky",
                altText: 'Простынь детская Sky',
                caption: 'Slide 2'
            },
            {
                src: "/products/DSC_1916",
                altText: 'Slide 3',
                caption: 'Slide 3'
            }
        ]
    },
    {
        id: 2,
        type: 3,
        title: 'Простынь белая',
        inStock: true,
        hot: false,
        article: "00006Прост",
        price: satinPrice[0].price,
        material: "Сатин",
        startWidth: 60,
        startHeight: 120,
        maxWidth: 200,
        maxHeight: 200,
        sizes: satinPrice,
        text: "Простынка  пошита из натурального 100% хлопка сатин.Резинка надёжно фиксирует её с двух сторон матраса.Такое изделие не сминается во время сна малыша, не создает складок, экономит ваши силы.Утюжить удобно такую простынь на гладильной доске, зацепив уголок.",
        img: [
            {
                src: "/products/DSC_5299-2",
                altText: 'Простынь белая',
                caption: 'Slide 2'
            },
            {
                src: "/products/sheet_white",
                altText: 'Простынь белая',
                caption: 'Slide 3'
            },
            {
                src: "/products/IMG_8267",
                altText: 'Простынь белая',
                caption: 'Slide 3'
            }
        ]
    },

    {
        id: 3,
        type: 3,
        title: 'Простынь Алфавит',
        inStock: true,
        hot: false,
        article: "00010Прост",
        price: prckalPrice[0].price,
        material: "Перкаль",
        startWidth: 60,
        startHeight: 120,
        maxWidth: 200,
        maxHeight: 200,
        sizes: prckalPrice,
        text: "Простынка  пошита из европейского 100% натурального хлопка перкаль.Резинка надёжно фиксирует её с двух сторон матраса.Такое изделие не сминается во время сна малыша, не создает складок, экономит ваши силы. Утюжить удобно такую простынь на гладильной доске, зацепив уголок.",
        img: [
            {
                src: "/products/prostynka-alfavit",
                altText: 'Простынь детская Sky',
                caption: 'Slide 2'
            },
            {
                src: "/products/DSC_8720",
                altText: 'Slide 3',
                caption: 'Slide 3'
            }
        ]
    },
    {
        id: 4,
        type: 3,
        title: 'Простынь Беж',
        inStock: true,
        hot: false,
        article: "00007Прост",
        price: satinPrice[0].price,
        material: "Сатин",
        startWidth: 60,
        startHeight: 120,
        maxWidth: 200,
        maxHeight: 200,
        sizes: satinPrice,
        text: "Простынка  пошита из натурального 100% хлопка сатин. Резинка надёжно фиксирует её с двух сторон матраса. Такое изделие не сминается во время сна малыша, не создает складок, экономит ваши силы. Утюжить удобно такую простынь на гладильной доске, зацепив уголок",
        img: [
            {
                src: "/products/DSC_5299-3",
                altText: 'Простынь детская Sky',
                caption: 'Slide 2'
            },
            {
                src: "/products/IMG_8141",
                altText: 'Slide 3',
                caption: 'Slide 3'
            },
            {
                src: "/products/begyvaya",
                altText: 'Slide 3',
                caption: 'Slide 3'
            }
        ]
    },
    {
        id: 5,
        type: 1,
        title: 'Простынь Бетмен',
        inStock: true,
        hot: false,
        article: "00004Прост",
        price: satinPrice[0].price,
        material: "Сатин",
        startWidth: 60,
        startHeight: 120,
        maxWidth: 200,
        maxHeight: 200,
        sizes: satinPrice,
        text: "Простынка  пошита из натурального 100% хлопка сатин. Резинка надёжно фиксирует её с двух сторон матраса. Такое изделие не сминается во время сна малыша, не создает складок, экономит ваши силы. Утюжить удобно такую простынь на гладильной доске, зацепив уголок.",
        img: [
            {
                src: "/products/DSC_5079",
                altText: 'Простынь детская Sky',
                caption: 'Slide 2'
            },
            {
                src: "/products/DSC_5077",
                altText: 'Slide 3',
                caption: 'Slide 3'
            }
        ]
    },
    {
        id: 6,
        type: 3,
        title: 'Простынь Воздушные шары',
        inStock: true,
        hot: false,
        article: "00003Прост",
        price: satinPrice[0].price,
        material: "Сатин",
        startWidth: 60,
        startHeight: 120,
        maxWidth: 200,
        maxHeight: 200,
        sizes: prckalPrice,
        text: "Простынка  пошита из европейского 100% натурального хлопка перкаль. Резинка надёжно фиксирует её с двух сторон матраса. Такое изделие не сминается во время сна малыша, не создает складок, экономит ваши силы. Утюжить удобно такую простынь на гладильной доске, зацепив уголок.",
        img: [
            {
                src: "/products/DSC_8795",
                altText: 'Простынь детская Sky',
                caption: 'Slide 2'
            },
            {
                src: "/products/DSC_8811",
                altText: 'Slide 3',
                caption: 'Slide 3'
            },
            {
                src: "/products/IMG_8254",
                altText: 'Slide 3',
                caption: 'Slide 3'
            }
        ]
    },
    {
        id: 7,
        type: 0,
        title: 'Простынь Геометрия',
        inStock: true,
        hot: false,
        article: "00008Прост",
        price: satinPrice[0].price,
        material: "Сатин",
        startWidth: 60,
        startHeight: 120,
        maxWidth: 200,
        maxHeight: 200,
        sizes: satinPrice,
        text: "Простынка  пошита из натурального 100% хлопка сатин. Резинка надёжно фиксирует её с двух сторон матраса. Такое изделие не сминается во время сна малыша, не создает складок, экономит ваши силы. Утюжить удобно такую простынь на гладильной доске, зацепив уголок",
        img: [
            {
                src: "/products/DSC_5364",
                altText: 'Простынь детская Sky',
                caption: 'Slide 2'
            }
        ]
    },
    {
        id: 8,
        type: 1,
        title: 'Простынь Голубая',
        inStock: true,
        hot: false,
        article: "00015Прост",
        price: satinPrice[0].price,
        material: "Сатин",
        startWidth: 60,
        startHeight: 120,
        maxWidth: 200,
        maxHeight: 200,
        sizes: satinPrice,
        text: "Простынка  пошита из натурального 100% хлопка сатин. Резинка надёжно фиксирует её с двух сторон матраса. Такое изделие не сминается во время сна малыша, не создает складок, экономит ваши силы. Утюжить удобно такую простынь на гладильной доске, зацепив уголок.",
        img: [
            {
                src: "/products/IMG_4326",
                altText: 'Простынь детская Sky',
                caption: 'Slide 2'
            },
            {
                src: "/products/IMG_4328",
                altText: 'Slide 3',
                caption: 'Slide 3'
            },
            {
                src: "/products/IMG_8258_v2",
                altText: 'Slide 3',
                caption: 'Slide 3'
            }
        ]
    }
    ,
    {
        id: 9,
        type: 1,
        title: 'Простынь Городок',
        inStock: true,
        hot: false,
        article: "00017Прост",
        price: prckalPrice[0].price,
        material: "Перкаль",
        startWidth: 60,
        startHeight: 120,
        maxWidth: 200,
        maxHeight: 200,
        sizes: prckalPrice,
        text: "Простынка  пошита из натурального 100% хлопка сатин. Резинка надёжно фиксирует её с двух сторон матраса. Такое изделие не сминается во время сна малыша, не создает складок, экономит ваши силы.",
        img:
            [
                {
                    src: "/products/prostynki_gorod",
                    altText: 'Slide 3',
                    caption: 'Slide 3'
                },
                {
                    src: "/products/IMG_8199",
                    altText: 'Простынь детская Sky',
                    caption: 'Slide 2'
                },
            ]
    },

    {
        id: 10,
        type: 1,
        title: 'Простынь желтая',
        inStock: true,
        hot: false,
        article: "00001Прост",
        price: satinPrice[0].price,
        material: "Сатин",
        startWidth: 60,
        startHeight: 120,
        maxWidth: 200,
        maxHeight: 200,
        sizes: satinPrice,
        text: "Простынка  пошита из натурального 100% хлопка сатин. Резинка надёжно фиксирует её с двух сторон матраса. Такое изделие не сминается во время сна малыша, не создает складок, экономит ваши силы. Утюжить удобно такую простынь на гладильной доске, зацепив уголок.",
        img: [
            {
                src: "/products/20190816-T87_0072",
                altText: 'Простынь детская Sky',
                caption: 'Slide 2'
            },
            {
                src: "/products/20190816-T87_0073",
                altText: 'Slide 3',
                caption: 'Slide 3'
            },
            {
                src: "/products/20190816-T87_0080",
                altText: 'Slide 3',
                caption: 'Slide 3'
            },
            {
                src: "/products/IMG_8170",
                altText: 'Slide 3',
                caption: 'Slide 3'
            }
        ]
    },

    {
        id: 11,
        type: 1,
        title: 'Простынь Лес',
        inStock: true,
        hot: false,
        article: "00011Прост",
        price: prckalPrice[0].price,
        material: "Перкаль",
        startWidth: 60,
        startHeight: 120,
        maxWidth: 200,
        maxHeight: 200,
        sizes: prckalPrice,
        text: "Простынка  пошита из европейского 100% натурального хлопка перкаль. Резинка надёжно фиксирует её с двух сторон матраса. Такое изделие не сминается во время сна малыша, не создает складок, экономит ваши силы. Утюжить удобно такую простынь на гладильной доске, зацепив уголок.",
        img: [
            {
                src: "/products/DSC_8751",
                altText: 'Простынь детская Sky',
                caption: 'Slide 2'
            },
            {
                src: "/products/DSC_8760",
                altText: 'Slide 3',
                caption: 'Slide 3'
            },
            {
                src: "/products/DSC_8819",
                altText: 'Slide 3',
                caption: 'Slide 3'
            },
            {
                src: "/products/IMG_8249",
                altText: 'Slide 3',
                caption: 'Slide 3'
            }
        ]
    },
    {
        id: 12,
        type: 1,
        title: 'Простынь Машинки',
        inStock: true,
        hot: false,
        article: "00018Прост",
        price: prckalPrice[0].price,
        material: "Перкаль",
        startWidth: 60,
        startHeight: 120,
        maxWidth: 200,
        maxHeight: 200,
        sizes: prckalPrice,
        text: "Простынка  пошита из европейского 100% натурального хлопка перкаль. Резинка надёжно фиксирует её с двух сторон матраса. Такое изделие не сминается во время сна малыша, не создает складок, экономит ваши силы. Утюжить удобно такую простынь на гладильной доске, зацепив уголок.",
        img: [
            {
                src: "/products/prostynki_mashinki2",
                altText: 'Slide 3',
                caption: 'Slide 3'
            },
            {
                src: "/products/IMG_8205",
                altText: 'Простынь детская Sky',
                caption: 'Slide 2'
            },
            {
                src: "/products/prostynki_mashinki3",
                altText: 'Slide 3',
                caption: 'Slide 3'
            },
            {
                src: "/products/Простынь на резинке  Машинки премиум хлопок Simple Dreams",
                altText: 'Slide 3',
                caption: 'Slide 3'
            }
        ]
    },
    {
        id: 13,
        type: 1,
        title: 'Простынь Серая',
        inStock: true,
        hot: false,
        article: "00002Прост",
        price: satinPrice[0].price,
        material: "Сатин",
        startWidth: 60,
        startHeight: 120,
        maxWidth: 200,
        maxHeight: 200,
        sizes: satinPrice,
        text: "Простынка  пошита из натурального 100% хлопка сатин. Резинка надёжно фиксирует её с двух сторон матраса. Такое изделие не сминается во время сна малыша, не создает складок, экономит ваши силы. Утюжить удобно такую простынь на гладильной доске, зацепив уголок.",
        img: [
            {
                src: "/products/20190816-T87_0086",
                altText: 'Простынь детская Sky',
                caption: 'Slide 2'
            },
            {
                src: "/products/20190816-T87_0087",
                altText: 'Slide 3',
                caption: 'Slide 3'
            },
            {
                src: "/products/20190816-T87_0088",
                altText: 'Slide 3',
                caption: 'Slide 3'
            },
            {
                src: "/products/IMG_8165",
                altText: 'Slide 3',
                caption: 'Slide 3'
            }
        ]
    },
    {
        id: 14,
        type: 1,
        title: 'Простынь Овечки',
        inStock: true,
        hot: false,
        article: "00012Прост",
        price: prckalPrice[0].price,
        material: "Перкаль",
        startWidth: 60,
        startHeight: 120,
        maxWidth: 200,
        maxHeight: 200,
        sizes: prckalPrice,
        text: "Простынка  пошита из европейского 100% натурального хлопка перкаль. Резинка надёжно фиксирует её с двух сторон матраса. Такое изделие не сминается во время сна малыша, не создает складок, экономит ваши силы. Утюжить удобно такую простынь на гладильной доске, зацепив уголок.",
        img: [
            {
                src: "/products/DSC_8772",
                altText: 'Простынь детская Sky',
                caption: 'Slide 2'
            },
            {
                src: "/products/DSC_8792",
                altText: 'Slide 3',
                caption: 'Slide 3'
            },
            {
                src: "/products/IMG_8246",
                altText: 'Slide 3',
                caption: 'Slide 3'
            },
            {
                src: "/products/Простынь на резинке  Овечки премиум хлопок Simple Dreams",
                altText: 'Slide 3',
                caption: 'Slide 3'
            }
        ]
    },
    {
        id: 15,
        type: 1,
        title: 'Простынь Персик',
        inStock: true,
        hot: false,
        article: "00016Прост",
        price: satinPrice[0].price,
        material: "Сатин",
        startWidth: 60,
        startHeight: 120,
        maxWidth: 200,
        maxHeight: 200,
        sizes: satinPrice,
        text: "Простынка  пошита из натурального 100% хлопка сатин. Резинка надёжно фиксирует её с двух сторон матраса. Такое изделие не сминается во время сна малыша, не создает складок, экономит ваши силы. Утюжить удобно такую простынь на гладильной доске, зацепив уголок.",
        img: [
            {
                src: "/products/IMG_4475",
                altText: 'Простынь детская Sky',
                caption: 'Slide 2'
            },
            {
                src: "/products/IMG_4477",
                altText: 'Slide 3',
                caption: 'Slide 3'
            },
            {
                src: "/products/IMG_4479",
                altText: 'Slide 3',
                caption: 'Slide 3'
            },
            {
                src: "/products/IMG_8106",
                altText: 'Slide 3',
                caption: 'Slide 3'
            }
        ]
    },
    {
        id: 16,
        type: 1,
        title: 'Простынь Экспедиция',
        inStock: true,
        hot: false,
        article: "00009Прост",
        price: prckalPrice[0].price,
        material: "Перкаль",
        startWidth: 60,
        startHeight: 120,
        maxWidth: 200,
        maxHeight: 200,
        sizes: prckalPrice,
        text: "Простынка  пошита из европейского 100% натурального хлопка перкаль. Резинка надёжно фиксирует её с двух сторон матраса. Такое изделие не сминается во время сна малыша, не создает складок, экономит ваши силы. Утюжить удобно такую простынь на гладильной доске, зацепив уголок.",
        img: [
            {
                src: "/products/DSC_8690",
                altText: 'Простынь детская Sky',
                caption: 'Slide 2'
            },
            {
                src: "/products/DSC_8701",
                altText: 'Slide 3',
                caption: 'Slide 3'
            }
        ]
    },
    {
        id: 17,
        type: 1,
        title: 'Простынь Я космонавт',
        inStock: true,
        hot: false,
        article: "00015Прост",
        price: prckalPrice[0].price,
        material: "Перкаль",
        startWidth: 60,
        startHeight: 120,
        maxWidth: 200,
        maxHeight: 200,
        sizes: prckalPrice,
        text: "Простынка  пошита из европейского 100% натурального хлопка перкаль. Резинка надёжно фиксирует её с двух сторон матраса. Такое изделие не сминается во время сна малыша, не создает складок, экономит ваши силы. Утюжить удобно такую простынь на гладильной доске, зацепив уголок.",
        img: [
            {
                src: "/products/Простынь на резинке  Космос премиум хлопок Simple Dreams",
                altText: 'Slide 3',
                caption: 'Slide 3'
            },
            {
                src: "/products/IMG_8257",
                altText: 'Простынь детская Sky',
                caption: 'Slide 2'
            }
        ]
    },
    {
        id: 18,
        type: 1,
        title: 'Простынь ярко-голубая',
        inStock: true,
        hot: false,
        article: "00014Прост",
        price: satinPrice[0].price,
        material: "Сатин",
        startWidth: 60,
        startHeight: 120,
        maxWidth: 200,
        maxHeight: 200,
        sizes: satinPrice,
        text: "Простынка  пошита из натурального 100% хлопка сатин. Резинка надёжно фиксирует её с двух сторон матраса. Такое изделие не сминается во время сна малыша, не создает складок, экономит ваши силы. Утюжить удобно такую простынь на гладильной доске, зацепив уголок.",
        img: [
            {
                src: "/products/Простынь на резинке  ярко-голубая сатин хлопок Simple Dreams",
                altText: 'Slide 3',
                caption: 'Slide 3'
            },
            {
                src: "/products/IMG_8258 v2",
                altText: 'Простынь детская Sky',
                caption: 'Slide 2'
            }
        ]
    },
    {
        id: 19,
        type: 1,
        title: 'Простынь Графит',
        inStock: true,
        hot: false,
        article: "00019Прост",
        price: satinPrice[0].price,
        material: "Сатин",
        startWidth: 60,
        startHeight: 120,
        maxWidth: 200,
        maxHeight: 200,
        sizes: satinPrice,
        text: "Простынка  пошита из натурального 100% хлопка сатин. Резинка надёжно фиксирует её с двух сторон матраса. Такое изделие не сминается во время сна малыша, не создает складок, экономит ваши силы. Утюжить удобно такую простынь на гладильной доске, зацепив уголок.",
        img: [
            {
                src: "/products/Простынь на резинке  графит сатин хлопок Simple Dreams",
                altText: 'Slide 3',
                caption: 'Slide 3'
            },
            {
                src: "/products/IMG_8242",
                altText: 'Простынь детская Sky',
                caption: 'Slide 2'
            },
        ]
    },
    {
        id: 20,
        type: 3,
        title: 'Простынь оранжевая',
        inStock: true,
        hot: false,
        article: "00025Прост",
        price: satinPrice[0].price,
        material: "Сатин",
        startWidth: 60,
        startHeight: 120,
        maxWidth: 200,
        maxHeight: 200,
        sizes: satinPrice,
        text: "Простынка  пошита из натурального 100% хлопка сатин.Резинка надёжно фиксирует её с двух сторон матраса.Такое изделие не сминается во время сна малыша, не создает складок, экономит ваши силы.Утюжить удобно такую простынь на гладильной доске, зацепив уголок.",
        img: [
            {
                src: "/products/or1",
                altText: 'Простынь детская Sky',
                caption: 'Slide 2'
            },
            {
                src: "/products/IMG_8192",
                altText: 'Slide 3',
                caption: 'Slide 3'
            }
        ]
    },
    {
        id: 21,
        type: 1,
        title: 'Простынь Звезды',
        inStock: true,
        hot: false,
        article: "00026Прост",
        price: satinPrice[0].price,
        material: "Сатин",
        startWidth: 60,
        startHeight: 120,
        maxWidth: 200,
        maxHeight: 200,
        sizes: satinPrice,
        text: "Простынка  пошита из натурального 100% хлопка сатин. Резинка надёжно фиксирует её с двух сторон матраса. Такое изделие не сминается во время сна малыша, не создает складок, экономит ваши силы. Утюжить удобно такую простынь на гладильной доске, зацепив уголок.",
        img: [
            {
                src: "/products/Простынь на резинке  Парад звезд сатин хлопок Simple Dreams",
                altText: 'Slide 3',
                caption: 'Slide 3'
            },
            {
                src: "/products/IMG_8247",
                altText: 'Простынь детская Sky',
                caption: 'Slide 2'
            },
            {
                src: "/products/Ткань хлопок сатин Simple Dreams Парад звезд",
                altText: 'Slide 3',
                caption: 'Slide 3'
            }
        ]
    },
    {
        id: 22,
        type: 1,
        title: 'Простынь Китики',
        inStock: true,
        hot: false,
        article: "00021Прост",
        price: prckalPrice[0].price,
        material: "Перкаль",
        startWidth: 60,
        startHeight: 120,
        maxWidth: 200,
        maxHeight: 200,
        sizes: prckalPrice,
        text: "Простынка  пошита из европейского 100% натурального хлопка перкаль. Резинка надёжно фиксирует её с двух сторон матраса. Такое изделие не сминается во время сна малыша, не создает складок, экономит ваши силы. Утюжить удобно такую простынь на гладильной доске, зацепив уголок.",
        img: [
            {
                src: "/products/Простынь на резинке  Китики премиум хлопок Simple Dreams",
                altText: 'Slide 3',
                caption: 'Slide 3'
            },
            {
                src: "/products/IMG_8212",
                altText: 'Простынь детская Sky',
                caption: 'Slide 2'
            },
            {
                src: "/products/Ткань хлопок сатин Simple Dreams Китики премиум линия",
                altText: 'Slide 3',
                caption: 'Slide 3'
            }
        ]
    },
    {
        id: 23,
        type: 1,
        title: 'Простынь Морской мир',
        inStock: true,
        hot: false,
        article: "00020Прост",
        price: prckalPrice[0].price,
        material: "Перкаль",
        startWidth: 60,
        startHeight: 120,
        maxWidth: 200,
        maxHeight: 200,
        sizes: prckalPrice,
        text: "Простынка  пошита из европейского 100% натурального хлопка перкаль. Резинка надёжно фиксирует её с двух сторон матраса. Такое изделие не сминается во время сна малыша, не создает складок, экономит ваши силы. Утюжить удобно такую простынь на гладильной доске, зацепив уголок.",
        img: [
            {
                src: "/products/Простынь на резинке  Водный мир премиум хлопок Simple Dreams",
                altText: 'Slide 3',
                caption: 'Slide 3'
            },
            {
                src: "/products/IMG_8252",
                altText: 'Простынь детская Sky',
                caption: 'Slide 2'
            }
        ]
    },
    
    {
        id: 24,
        type: 1,
        title: 'Простынь Мятная',
        inStock: true,
        hot: false,
        article: "00023Прост",
        price: satinPrice[0].price,
        material: "Сатин",
        startWidth: 60,
        startHeight: 120,
        maxWidth: 200,
        maxHeight: 200,
        sizes: satinPrice,
        text: "Простынка  пошита из натурального 100% хлопка сатин. Резинка надёжно фиксирует её с двух сторон матраса. Такое изделие не сминается во время сна малыша, не создает складок, экономит ваши силы. Утюжить удобно такую простынь на гладильной доске, зацепив уголок.",
        img: [
            {
                src: "/products/Простынь на резинке  мятная сатин хлопок Simple Dreams",
                altText: 'Slide 3',
                caption: 'Slide 3'
            },
            {
                src: "/products/IMG_8266",
                altText: 'Простынь детская Sky',
                caption: 'Slide 2'
            }
        ]
    },
    {
        id: 25,
        type: 1,
        title: 'Простынь Ночное небо',
        inStock: true,
        hot: false,
        article: "00024Прост",
        price: satinPrice[0].price,
        material: "Сатин",
        startWidth: 60,
        startHeight: 120,
        maxWidth: 200,
        maxHeight: 200,
        sizes: satinPrice,
        text: "Простынка  пошита из натурального 100% хлопка сатин. Резинка надёжно фиксирует её с двух сторон матраса. Такое изделие не сминается во время сна малыша, не создает складок, экономит ваши силы. Утюжить удобно такую простынь на гладильной доске, зацепив уголок.",
        img: [
            {
                src: "/products/Простынь на резинке  Ночное небо сатин хлопок Simple Dreams",
                altText: 'Slide 3',
                caption: 'Slide 3'
            },
            {
                src: "/products/IMG_8244",
                altText: 'Простынь детская Sky',
                caption: 'Slide 2'
            },
            {
                src: "/products/Ткань хлопок сатин Simple Dreams Ночное небо",
                altText: 'Slide 3',
                caption: 'Slide 3'
            }
        ]
    },
    {
        id: 26,
        type: 1,
        title: 'Простынь Розовая',
        inStock: true,
        hot: false,
        article: "00015Прост",
        price: satinPrice[0].price,
        material: "Сатин",
        startWidth: 60,
        startHeight: 120,
        maxWidth: 200,
        maxHeight: 200,
        sizes: satinPrice,
        text: "Простынка  пошита из натурального 100% хлопка сатин. Резинка надёжно фиксирует её с двух сторон матраса. Такое изделие не сминается во время сна малыша, не создает складок, экономит ваши силы.",
        img: [
            {
                src: "/products/Простынь на резинке  розовый сатин хлопок Simple Dreams",
                altText: 'Slide 3',
                caption: 'Slide 3'
            },
            {
                src: "/products/IMG_8251",
                altText: 'Простынь детская Sky',
                caption: 'Slide 2'
            }
        ]
    },
    {
        id: 27,
        type: 1,
        title: 'Простынь Салатовая',
        inStock: true,
        hot: false,
        article: "00029Прост",
        price: satinPrice[0].price,
        material: "Сатин",
        startWidth: 60,
        startHeight: 120,
        maxWidth: 200,
        maxHeight: 200,
        sizes: satinPrice,
        text: "Простынка  пошита из натурального 100% хлопка сатин. Резинка надёжно фиксирует её с двух сторон матраса. Такое изделие не сминается во время сна малыша, не создает складок, экономит ваши силы.",
        img: [
            {
                src: "/products/Простынь на резинке  салатовая сатин хлопок Simple Dreams",
                altText: 'Slide 3',
                caption: 'Slide 3'
            },
            {
                src: "/products/IMG_8185",
                altText: 'Простынь детская Sky',
                caption: 'Slide 2'
            }
        ]
    },
    {
        id: 28,
        type: 1,
        title: 'Простынь Чайная роза',
        inStock: true,
        hot: false,
        article: "00030Прост",
        price: satinPrice[0].price,
        material: "Сатин",
        startWidth: 60,
        startHeight: 120,
        maxWidth: 200,
        maxHeight: 200,
        sizes: satinPrice,
        text: "Простынка  пошита из натурального 100% хлопка сатин. Резинка надёжно фиксирует её с двух сторон матраса. Такое изделие не сминается во время сна малыша, не создает складок, экономит ваши силы. Утюжить удобно такую простынь на гладильной доске, зацепив уголок.",
        img: [
            {
                src: "/products/Простынь на резинке  чайная роза сатин хлопок Simple Dreams",
                altText: 'Slide 3',
                caption: 'Slide 3'
            },
            {
                src: "/products/IMG_8269",
                altText: 'Простынь детская Sky',
                caption: 'Slide 2'
            }
        ]
    },
]

export default data;