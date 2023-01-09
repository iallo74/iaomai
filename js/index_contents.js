// IMPOSTAZIONE DEI SETS

var sets = {
	anatomy_full: {
		nome: TXT("Anatomy"),
		sottotitolo: TXT("AnatomyST"),
		descrizione: TXT("AnatomyDESCR"),
		locked: false,
		opening: false,
		dataPubblicazione: ''
	},
	meridiani_cinesi: {
		nome: TXT("TsuboMap"),
		sottotitolo: TXT("TsuboMapST"),
		descrizione: TXT("TsuboMapDESCR"),
		modelli: [
			"donna",
			"uomo"
		],
		imports: [
			'sets/common/mtc/mtc.js',
			'TXT.js',
			'geometrie.js',
			'set.js',
			'modulo_tsubo.js',
			'modulo_patologie.js',
			'modulo_meridiani.js',
			'modulo_teoria.js',
			'sets/common/modulo_procedure.js',
			'materiali.js',
			'stili.css',
			'sets/common/stili_procedure.css',
			'stili_tsubo.css'
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
			53,
			8,
			18,
			8,
			2
		],
		txtLoading: TXT("CaricamentoMeridiani"),
		auth: false,
		locked: false,
		lastVer: 1,
		opening: true,
		dataPubblicazione: '',
		siglaProc: ''
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
			'modulo_tsubo.js',
			'modulo_patologie.js',
			'modulo_meridiani.js',
			'modulo_teoria.js',
			'sets/common/modulo_procedure.js',
			'materiali.js',
			'stili.css',
			'sets/common/stili_procedure.css',
			'stili_tsubo.css'
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
			53,
			9,
			20,
			8,
			2
		],
		txtLoading: TXT("CaricamentoMeridiani"),
		auth: false,
		locked: false,
		lastVer: 1,
		opening: true,
		dataPubblicazione: '',
		siglaProc: ''
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
			'modulo_tsubo.js',
			'modulo_patologie.js',
			'modulo_punti.js',
			'modulo_teoria.js',
			'sets/common/modulo_procedure.js',
			'materiali.js',
			'stili.css',
			'sets/common/stili_procedure.css',
			'stili_tsubo.css'
		],
		dims: [
			16,
			4250,
			35,
			11,
			4,
			20,
			6,
			48,
			10,
			28,
			8,
			2
		],
		txtLoading: TXT("CaricamentoMappe"),
		auth: false,
		locked: false,
		opening: true,
		dataPubblicazione: '',
		siglaProc: 'AUR'
	},
	reflessologia_plantare: {
		nome: TXT("ReflessologiaPlantare"),
		sottotitolo: TXT("ReflessologiaPlantareST"),
		descrizione: TXT("ReflessologiaPlantareDESCR"),
		modelli: [
			"piedi"
		],
		imports: [
		
		],
		txtLoading: TXT("CaricamentoMappe"),
		auth: false,
		locked: true,
		opening: true,
		dataPubblicazione: '2023-06',
		siglaProc: 'RLF'
	},
	trigger_points: {
		nome: TXT("TriggerPoints"),
		sottotitolo: TXT("TriggerPointsST"),
		descrizione: TXT("TriggerPointsDESCR"),
		modelli: [
			"donna",
			"uomo"
		],
		imports: [
		
		],
		txtLoading: TXT("CaricamentoMappe"),
		auth: false,
		locked: true,
		opening: true,
		dataPubblicazione: '2023-10',
		siglaProc: 'TRP'
	},
	clients_full: {
		nome: TXT("MedicalFiles"),
		sottotitolo: TXT("MedicalFilesST"),
		descrizione: TXT("MedicalFilesDESCR"),
		locked: false,
		opening: false,
		dataPubblicazione: ''
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
			'muscoli',
			'ossa',
			'visceri'
		],
		rifletti: false,
		txtLoading: TXT("CaricamentoModelloDonna"),
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
			'muscoli',
			'ossa',
			'visceri'
		],
		rifletti: false,
		txtLoading: TXT("CaricamentoModelloUomo"),
		lastVer: 1
	},
	piedi: {
		nome: TXT("ModelloPiede"),
		imports: [
			'pelle_compr.js',
			'ossa_compr.js',
			'guide_compr.js'
		],
		dims: [
			404,
			87
		],
		livelli: [
			'pelle',
			'ossa'
		],
		rifletti: false,
		txtLoading: TXT("CaricamentoModelloPiede"),
		lastVer: 1
	},
	orecchio: {
		nome: TXT("ModelloOrecchio"),
		imports: [
			'Areas_Ear.js',
			'mappa_aree.js',
			'pelle_compr.js',
			'ossa_compr.js',
			'visceri_compr.js',
			'guide_compr.js'
		],
		dims: [
			69,
			11,
			2620,
			937,
			227,
			12
		],
		livelli: [
			'pelle',
			'ossa',
			'muscoli', // usati come aree
			'visceri' // usati come nervi
		],
		centro: {
			x: -0.005833541848817953,
			y: -0.0013587267383341226,
			z: 7.394938985463911
		},
		areaName: 'Area',
		rifletti: true,
		txtLoading: TXT("CaricamentoModelloOrecchio"),
		lastVer: 1
	}
};