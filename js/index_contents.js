// IMPOSTAZIONE DEI SETS

var sets = {
	anatomy_full: {
		nome: Lingua(TXT_Anatomy),
		sottotitolo: Lingua(TXT_AnatomyST),
		descrizione: Lingua(TXT_AnatomyDESCR),
		locked: false,
		opening: false,
		dataPubblicazione: ''
	},
	meridiani_cinesi: {
		nome: Lingua(TXT_TsuboMap),
		sottotitolo: Lingua(TXT_TsuboMapST),
		descrizione: Lingua(TXT_TsuboMapDESCR),
		modelli: [
			"donna",
			"uomo"
		],
		imports: [
			'sets/common/mtc/mtc.js',
			'frasi.js',
			'geometrie.js',
			'set.js',
			'modulo_tsubo.js',
			'modulo_patologie.js',
			'modulo_meridiani.js',
			'modulo_teoria.js',
			'modulo_procedure.js',
			'materiali.js',
			'stili.css',
			'stili_procedure.css',
			'stili_tsubo.css'
		],
		dims: [
			43,
			6,
			4830,
			40,
			11,
			3,
			8,
			5,
			50,
			8,
			18,
			8,
			2
		],
		txtLoading: Lingua(TXT_CaricamentoMeridiani),
		auth: false,
		locked: false,
		lastVer: 1,
		opening: true,
		dataPubblicazione: ''
	},
	meridiani_shiatsu: {
		nome: Lingua(TXT_ShiatsuMap),
		sottotitolo: Lingua(TXT_ShiatsuMapST),
		descrizione: Lingua(TXT_ShiatsuMapDESCR),
		modelli: [
			"donna",
			"uomo"
		],
		imports: [
			'sets/common/mtc/mtc.js',
			'frasi.js',
			'geometrie.js',
			'set.js',
			'modulo_tsubo.js',
			'modulo_patologie.js',
			'modulo_meridiani.js',
			'modulo_teoria.js',
			'modulo_procedure.js',
			'materiali.js',
			'stili.css',
			'stili_procedure.css',
			'stili_tsubo.css'
		],
		dims: [
			43,
			7,
			2740,
			39,
			11,
			3,
			8,
			4,
			50,
			9,
			16,
			8,
			2
		],
		txtLoading: Lingua(TXT_CaricamentoMeridiani),
		auth: false,
		locked: false,
		lastVer: 1,
		opening: true,
		dataPubblicazione: ''
	},
	reflessologia_plantare: {
		nome: Lingua(TXT_ReflessologiaPlantare),
		sottotitolo: Lingua(TXT_ReflessologiaPlantareST),
		descrizione: Lingua(TXT_ReflessologiaPlantareDESCR),
		modelli: [
			"piedi"
		],
		imports: [
		
		],
		txtLoading: Lingua(TXT_CaricamentoMappe),
		auth: false,
		locked: true,
		opening: true,
		dataPubblicazione: '2022-04'
	},
	auricologia: {
		nome: Lingua(TXT_Auricologia),
		sottotitolo: Lingua(TXT_AuricologiaST),
		descrizione: Lingua(TXT_AuricologiaDESCR),
		modelli: [
			"orecchio"
		],
		imports: [
		
		],
		txtLoading: Lingua(TXT_CaricamentoMappe),
		auth: false,
		locked: true,
		opening: true,
		dataPubblicazione: '2022-01'
	},
	trigger_points: {
		nome: Lingua(TXT_TriggerPoints),
		sottotitolo: Lingua(TXT_TriggerPointsST),
		descrizione: Lingua(TXT_TriggerPointsDESCR),
		modelli: [
			"donna",
			"uomo"
		],
		imports: [
		
		],
		txtLoading: Lingua(TXT_CaricamentoMappe),
		auth: false,
		locked: true,
		opening: true,
		dataPubblicazione: '2022-06'
	},
	clients_full: {
		nome: Lingua(TXT_MedicalFiles),
		sottotitolo: Lingua(TXT_MedicalFilesST),
		descrizione: Lingua(TXT_MedicalFilesDESCR),
		locked: false,
		opening: false,
		dataPubblicazione: ''
	}
};


var modelli = {
	donna: {
		nome: Lingua(TXT_ModelloDonna),
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
			2590,
			65
		],
		livelli: [
			'pelle',
			'muscoli',
			'ossa',
			'visceri'
		],
		rifletti: false,
		txtLoading: Lingua(TXT_CaricamentoModelloDonna),
		lastVer: 1
	},
	uomo: {
		nome: Lingua(TXT_ModelloUomo),
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
			1880,
			65
		],
		livelli: [
			'pelle',
			'muscoli',
			'ossa',
			'visceri'
		],
		rifletti: false,
		txtLoading: Lingua(TXT_CaricamentoModelloUomo),
		lastVer: 1
	},
	piedi: {
		nome: Lingua(TXT_ModelloPiede),
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
		txtLoading: Lingua(TXT_CaricamentoModelloPiede),
		lastVer: 1
	},
	orecchio: {
		nome: Lingua(TXT_ModelloOrecchio),
		imports: [
			'pelle_compr.js'
		],
		dims: [
			67
		],
		livelli: [
			'pelle'
		],
		rifletti: true,
		txtLoading: Lingua(TXT_CaricamentoModelloOrecchio),
		lastVer: 1
	}
};