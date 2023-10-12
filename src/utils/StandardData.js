const columns = [
    { name: '#', uid: 'id', sortable: true },
    { name: 'ESTÁNDAR', uid: 'name', sortable: true },
    { name: 'ENCARGADOS', uid: 'managers', sortable: true },
    { name: 'VALORACION ESTANDAR', uid: 'valoration' },
    { name: 'ACCIONES', uid: 'actions' }
]

const valorationOptions = [
    { label: 'Completado', uid: 'completed' },
    { label: 'No Completado', uid: 'not completed' },
    { label: 'Completado Plenamente', uid: 'plenamente completado' }
]

// const users = []

const standarsManagement =
    [{
        "id": 1,
        "name": "South Africa",
        "managers": [
            {
                "fullname": "Rock McCaghan",
                "email": "rmccaghan0@geocities.jp"
            }, {
                "fullname": "Hyman Luddy",
                "email": "hluddy1@bigcartel.com"
            }, {
                "fullname": "Odetta Hiskey",
                "email": "ohiskey2@oaic.gov.au"
            },
        ],
        "valoration": "no completado"
    }, {
        "id": 2,
        "name": "Indonesia",
        "managers": [
            {
                "fullname": "Xena Warlawe",
                "email": "xwarlawe3@clickbank.net"
            }, {
                "fullname": "Wade Grinvalds",
                "email": "wgrinvalds4@wsj.com"
            }, {
                "fullname": "Ava Dungay",
                "email": "adungay5@cafepress.com"
            },
        ],
        "valoration": "plenamente completado"
    }, {
        "id": 3,
        "name": "Indonesia",
        "managers": [
            {
                "fullname": "Kipper Murkin",
                "email": "kmurkin6@reference.com"
            }, {
                "fullname": "Ramsay Potebury",
                "email": "rpotebury7@usatoday.com"
            },
        ],
        "valoration": "completado"
    }, {
        "id": 4,
        "name": "Ukraine",
        "managers": [
            {
                "fullname": "Dud Woollin",
                "email": "dwoollin8@people.com.cn"
            }, {
                "fullname": "Olivia Gieves",
                "email": "ogieves9@yandex.ru"
            },
        ],
        "valoration": "no completado"
    }, {
        "id": 5,
        "name": "Argentina",
        "managers": [
            {
                "fullname": "Zulema Gaucher",
                "email": "zgauchera@elpais.com"
            }, {
                "fullname": "Culley Maus",
                "email": "cmausb@163.com"
            }, {
                "fullname": "Dmitri Dresche",
                "email": "ddreschec@psu.edu"
            },
        ],
        "valoration": "plenamente completado"
    }, {
        "id": 6,
        "name": "Portugal",
        "managers": [
            {
                "fullname": "Marlin Sawter",
                "email": "msawterd@scribd.com"
            }, {
                "fullname": "Valdemar Roscrigg",
                "email": "vroscrigge@spotify.com"
            },
        ],
        "valoration": "plenamente completado"
    }, {
        "id": 7,
        "name": "Russia",
        "managers": [
            {
                "fullname": "Sandra Beswetherick",
                "email": "sbeswetherickf@telegraph.co.uk"
            }
        ],
        "valoration": "plenamente completado"
    }, {
        "id": 8,
        "name": "Sweden",
        "managers": [
            {
                "fullname": "Tiebout Petow",
                "email": "tpetowg@paginegialle.it"
            },
        ],
        "valoration": "completado"
    }, {
        "id": 9,
        "name": "Morocco",
        "managers": [
            {
                "fullname": "Drake Rumke",
                "email": "drumkeh@xing.com"
            }, {
                "fullname": "Rachele Harnes",
                "email": "rharnesi@ft.com"
            }, {
                "fullname": "Mariya Clements",
                "email": "mclementsj@amazon.com"
            }
        ],
        "valoration": "plenamente completado"
    }, {
        "id": 10,
        "name": "Bahamas",
        "managers": [
            {
                "fullname": "Dianemarie Marcroft",
                "email": "dmarcrofta@aol.com"
            }, {
                "fullname": "Conny Anstead",
                "email": "cansteadb@zimbio.com"
            },
        ],
        "valoration": "no completado"
    }, {
        "id": 11,
        "name": "Sri Lanka",
        "managers": [
            {
                "fullname": "Heriberto Benyan",
                "email": "hbenyanc@microsoft.com"
            },
        ],
        "valoration": "plenamente completado"
    }, {
        "id": 12,
        "name": "Poland",
        "managers": [
            {
                "fullname": "Beatrix Leitche",
                "email": "bleitched@scientificamerican.com"
            }, {
                "fullname": "Creight Le Gassick",
                "email": "clee@smh.com.au"
            }, {
                "fullname": "Burlie Gonnard",
                "email": "bgonnardf@printfriendly.com"
            },
        ],
        "valoration": "plenamente completado"
    }, {
        "id": 13,
        "name": "Indonesia",
        "managers": [
            {
                "fullname": "Nikki Garoghan",
                "email": "ngaroghang@census.gov"
            }, {
                "fullname": "Myrtice Piddick",
                "email": "mpiddickh@spotify.com"
            },
        ],
        "valoration": "plenamente completado"
    }, {
        "id": 14,
        "name": "Indonesia",
        "managers": [
            {
                "fullname": "Perrine Strelitz",
                "email": "pstrelitzi@theglobeandmail.com"
            }, {
                "fullname": "Eada Clark",
                "email": "eclarkj@google.com.hk"
            }, {
                "fullname": "Mufinella Koene",
                "email": "mkoenek@multiply.com"
            },
        ],
        "valoration": "plenamente completado"
    }, {
        "id": 15,
        "name": "Netherlands",
        "managers": [
            {
                "fullname": "Karlotte Antonucci",
                "email": "kantonuccil@people.com.cn"
            },
        ],
        "valoration": "completado"
    }]

export { columns, standarsManagement, valorationOptions }
