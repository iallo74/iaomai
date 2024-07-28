// IMPOSTAZIONE DEI SETS

var sets = {
	anatomy_full: {
		nome: TXT("Anatomy"),
		sottotitolo: TXT("AnatomyST"),
		descrizione: TXT("AnatomyDESCR"),
		locked: false,
		opening: false,
		dataPubblicazione: '',
		modls: [],
		lingueCont: [
			"ita",
			"eng",
			"esp",
			"fra",
			"por",
			"deu"
		],
		lingueAI: [
			"por"
		]
	},
	meridiani_cinesi: {
		nome: TXT("AcupointsMap"),
		sottotitolo: TXT("AcupointsMapST"),
		descrizione: TXT("AcupointsMapDESCR"),
		modelli: [
			"donna",
			"uomo"
		],
		imports: [
			'sets/common/mtc/mtc.js',
			'TXT.js',
			'geometrie.js',
			'set.js',
			'modulo_punto.js',
			'modulo_patologie.js',
			'modulo_meridiani.js',
			'modulo_teoria.js',
			'sets/common/modulo_procedure.js',
			'sets/common/modulo_procedure_community.js',
			'materiali.js',
			'stili.css',
			'sets/common/stili_procedure.css',
			'stili_punto.css',
			'stili_punto.css',
			'lang_[lang].js',
			'sets/common/mtc/lang_[lang].js',
			'sets/common/patologie/lang_[lang].js'
		],
		dims: [
			65,
			7,
			8600,
			44,
			12,
			4,
			4,
			6,
			48,
			17,
			8,
			18,
			8,
			2,
			369,
			513,
			322
		],
		txtLoading: stripslashes(TXT("CaricamentoMeridiani")),
		auth: false,
		locked: false,
		lastVer: 1,
		opening: true,
		dataPubblicazione: '',
		siglaProc: '',
		modls: [
			{
				idApple: 'TM22',
				idGoogle: 'tm22',
				pageStore: 'acupointsmap',
			}
		],
		lingueCont: [
			"ita",
			"eng",
			"esp",
			"fra",
			"deu",
			"por"
		],
		lingueAI: [
			"por"
		]
	},
	meridiani_shiatsu: {
		nome: TXT("ShiatsuMap"),
		sottotitolo: TXT("ShiatsuMapST"),
		descrizione: TXT("ShiatsuMapDESCR"),
		modelli: [
			"donna",
			"uomo"
		],
		imports: [
			'sets/common/mtc/mtc.js',
			'TXT.js',
			'geometrie.js',
			'set.js',
			'modulo_punto.js',
			'modulo_patologie.js',
			'modulo_meridiani.js',
			'modulo_teoria.js',
			'sets/common/modulo_procedure.js',
			'sets/common/modulo_procedure_community.js',
			'materiali.js',
			'stili.css',
			'sets/common/stili_procedure.css',
			'stili_punto.css',
			'lang_[lang].js',
			'sets/common/mtc/lang_[lang].js',
			'sets/common/patologie/lang_[lang].js'
		],
		dims: [
			65,
			7,
			8160,
			42,
			12,
			4,
			5,
			5,
			48,
			17,
			9,
			20,
			8,
			2,
			369,
			513,
			322
		],
		txtLoading: stripslashes(TXT("CaricamentoMappa")),
		auth: false,
		locked: false,
		lastVer: 1,
		opening: true,
		dataPubblicazione: '',
		siglaProc: '',
		modls: [
			{
				name: " PRO "+TXT("Modulo_CIN"),
				code: "CIN",
				idApple: 'SMCIN24',
				idGoogle: 'smcin24',
				pageStore: 'shiatsumap'
			},
			{
				name: " PRO Masunaga",
				code: "MAS",
				idApple: 'SMMAS24',
				idGoogle: 'smmas24',
				pageStore: 'shiatsumap'
			},
			{
				name: " PRO Namikoshi",
				code: "NMK",
				idApple: 'SMNMK24',
				idGoogle: 'smnmk24',
				pageStore: 'shiatsumap'
			},
			{
				name: " Light",
				code: "light",
				idApple: 'SMlight24',
				idGoogle: 'smlight24',
				pageStore: 'shiatsumap'
			}
		],
		lingueCont: [
			"ita",
			"eng",
			"esp",
			"fra",
			"deu",
			"por"
		],
		lingueAI: [
			"por"
		]
	},
	auricologia: {
		nome: TXT("AuriculoMap"),
		sottotitolo: TXT("AuriculoMapST"),
		descrizione: TXT("AuriculoMapDESCR"),
		modelli: [
			"orecchio"
		],
		imports: [
			'TXT.js',
			'geometrie.js',
			'set.js',
			'modulo_punti.js',
			'modulo_patologie.js',
			'modulo_punto.js',
			'modulo_teoria.js',
			'sets/common/modulo_procedure.js',
			'sets/common/modulo_procedure_community.js',
			'materiali.js',
			'stili.css',
			'sets/common/stili_procedure.css',
			'stili_punto.css',
			'lang_[lang].js',
			'sets/common/patologie/lang_[lang].js'
		],
		dims: [
			19,
			3460,
			44,
			12,
			12,
			21,
			15,
			48,
			17,
			11,
			37,
			8,
			3,
			462,
			322
		],
		txtLoading: stripslashes(TXT("CaricamentoMappe")),
		auth: false,
		locked: false,
		opening: true,
		dataPubblicazione: '',
		siglaProc: 'AUR',
		modls: [
			{
				idApple: 'AU23',
				idGoogle: 'au23',
				pageStore: 'auriculomap',
			}
		],
		lingueCont: [
			"ita",
			"eng",
			"esp",
			"fra",
			"deu",
			"por"
		],
		lingueAI: [
			"por"
		]
	},
	reflessologia_plantare: {
		nome: TXT("ReflessologiaPlantare"),
		sottotitolo: TXT("ReflessologiaPlantareST"),
		descrizione: TXT("ReflessologiaPlantareDESCR"),
		modelli: [
			"piedi"
		],
		imports: [
			'TXT.js',
			'geometrie.js',
			'set.js',
			'modulo_punti.js',
			'modulo_patologie.js',
			'modulo_punto.js',
			'modulo_teoria.js',
			'sets/common/modulo_procedure.js',
			'sets/common/modulo_procedure_community.js',
			'materiali.js',
			'stili.css',
			'sets/common/stili_procedure.css',
			'stili_punto.css',
			'lang_[lang].js'
		],
		dims: [
			13,
			3480,
			22,
			5,
			5,
			8,
			8,
			48,
			17,
			7,
			23,
			8,
			3,
			290
		],
		txtLoading: stripslashes(TXT("CaricamentoMappe")),
		auth: false,
		locked: false,
		lastVer: 1,
		opening: true,
		dataPubblicazione: '',
		siglaProc: 'RFX',
		modls: [
			{
				idApple: 'RM24',
				idGoogle: 'rm24',
				pageStore: 'reflexologymap',
			}
		],
		lingueCont: [
			"ita",
			"eng",
			"esp",
			"fra",
			"deu",
			"por"
		],
		lingueAI: [
			"eng",
			"esp",
			"fra",
			"por"
		]
	},
	trigger_points: {
		nome: TXT("TriggerPoints"),
		sottotitolo: TXT("TriggerPointsST"),
		descrizione: TXT("TriggerPointsDESCR"),
		modelli: [
			"donna"/* ,
			"uomo" */
		],
		imports: [
			'TXT.js',
			'geometrie.js',
			'set.js',
			'modulo_punti.js',
			'modulo_patologie.js',
			'modulo_punto.js',
			'modulo_teoria.js',
			'sets/common/modulo_procedure.js',
			'sets/common/modulo_procedure_community.js',
			'materiali.js',
			'stili.css',
			'sets/common/stili_procedure.css',
			'stili_punto.css',
			'lang_[lang].js',
			'sets/common/patologie/lang_[lang].js'
		],
		dims: [
			13,
			3480,
			22,
			5,
			5,
			8,
			8,
			48,
			17,
			7,
			23,
			8,
			3,
			290
		],
		txtLoading: stripslashes(TXT("CaricamentoMappe")),
		auth: false,
		locked: false,
		lastVer: 1,
		opening: true,
		dataPubblicazione: '',
		siglaProc: 'TRP',
		modls: [
			{
				idApple: 'TP24',
				idGoogle: 'tp24',
				pageStore: 'triggerpointsmap',
			}
		],
		lingueCont: [
			"ita"
		],
		lingueAI: [
		]
	},
	clients_full: {
		nome: TXT("MedicalFiles"),
		sottotitolo: TXT("MedicalFilesST"),
		descrizione: TXT("MedicalFilesDESCR"),
		locked: false,
		opening: false,
		dataPubblicazione: '',
		modls: [
			{
				idApple: 'SP22',
				idGoogle: 'sp22',
				pageStore: 'medicalfile',
			}
		]
	}
};


var modelli = {
	donna: {
		nome: TXT("ModelloDonna"),
		imports: [
			'Muscle_Head.js',
			'Muscle_Head_bump.js',
			'Muscle_Limbs.js',
			'Muscle_Limbs_bump.js',
			'Muscle_Torso.js',
			'Muscle_Torso_bump.js',
			'mappa_muscoli.js',
			'pelle_compr.js',
			'ossa_compr.js',
			'visceri_compr.js',
			'guide_compr.js'
		],
		dims: [
			251,
			152,
			666,
			661,
			556,
			590,
			480,
			2590,
			908,
			3180,
			65
		],
		livelli: [
			'pelle',
			'aree',
			'ossa',
			'visceri'
		],
		areaName: 'Muscles', // area come muscoli
		rifletti: false,
		txtLoading: stripslashes(TXT("CaricamentoModelloDonna")),
		lastVer: 1
	},
	uomo: {
		nome: TXT("ModelloUomo"),
		imports: [
			'Muscle_Head.js',
			'Muscle_Head_bump.js',
			'Muscle_Limbs.js',
			'Muscle_Limbs_bump.js',
			'Muscle_Torso.js',
			'Muscle_Torso_bump.js',
			'mappa_muscoli.js',
			'pelle_compr.js',
			'ossa_compr.js',
			'visceri_compr.js',
			'guide_compr.js'
		],
		dims: [
			220,
			138,
			616,
			618,
			890,
			530,
			479,
			2620,
			1440,
			2510,
			65
		],
		livelli: [
			'pelle',
			'aree',
			'ossa',
			'visceri'
		],
		areaName: 'Muscles', // area come muscoli
		rifletti: false,
		txtLoading: stripslashes(TXT("CaricamentoModelloUomo")),
		lastVer: 1
	},
	piedi: {
		nome: TXT("ModelloPiede"),
		imports: [
			'Muscle_Foot.js',
			'Muscle_Leg.js',
			'mappa_muscoli3d.js',
			'pelle_compr.js',
			'vasi_compr.js',
			'muscoli3d_compr.js',
			'ossa_compr.js',
			'legamenti_compr.js',
			'guide_compr.js'
		],
		dims: [
			635,
			290,
			1,
			3187,
			2283,
			2555,
			3710,
			1344,
			57
		],
		livelli: [
			'pelle',
			'muscoli3d',
			'ossa',
			'legamenti',
			'vasi'
		],
		centro: {
			"x": 0.15168973204903138,
			"y": -0.2381679067910409,
			"z": 10.835390371711297
		},
		areaName: '', // per le icone
		rifletti: false,
		muscles3d: true,
		minZoom: 13,
		txtLoading: stripslashes(TXT("CaricamentoModelloPiede")),
		lastVer: 1
	},
	orecchio: {
		nome: TXT("ModelloOrecchio"),
		imports: [
			'Areas_Ear.js',
			'mappa_aree.js',
			'pelle_compr.js',
			'ossa_compr.js',
			'vasi_compr.js',
			'guide_compr.js'
		],
		dims: [
			69,
			11,
			2620,
			937,
			279,
			12
		],
		livelli: [
			'pelle',
			'ossa',
			'aree',
			'vasi'
		],
		centro: {
			x: -0.005833541848817953,
			y: -0.0013587267383341226,
			z: 7.394938985463911
		},
		areaName: 'Aree',
		rifletti: true,
		minZoom: 6,
		txtLoading: stripslashes(TXT("CaricamentoModelloOrecchio")),
		lastVer: 1
	}
};