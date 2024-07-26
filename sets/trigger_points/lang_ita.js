DB.set = {
	settori: {
		1: "Cuoio capelluto, faccia e collo",
		2: "Tronco e colonna vertebrale",
		3: "Spalla e arto superiore",
		4: "Avanbraccio e mano",
		5: "Anca e coscia",
		6: "Gamba e piede",
	},
	punti: {
        "epicranico": {
            NomePunto: "Epicranico",
            AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
            ChiaviPunto: "",
			punti: {
				"153": "Frontali",
				"253": "Posteriori",
			},
			settore: 1
        },
        "orbicolare_occhio": {
            NomePunto: "Orbicolare dell'occhio",
            AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
            ChiaviPunto: "",
			punti: {
				"155": "",
			},
			settore: 1
        },
		"massetere": {
			NomePunto: "Massetere",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				"157": "Alti",
				"257": "Medi",
				"357": "Bassi",
				"457": "Posteriori",
			},
			settore: 1
		},
        "temporale": {
            NomePunto: "Temporale",
            AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
            ChiaviPunto: "",
			punti: {
				"159": "Anteriori",
				"259": "Medio-anteriori",
				"359": "Medio-posteriori",
				"459": "Posteriori",
			},
			settore: 1
        },
		"pterigoideo": {
			NomePunto: "Pterigoideo esterno",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				"161": "",
			},
			settore: 1
		},
		"digastrico": {
			NomePunto: "Digastrico",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				"165": "Posteriore",
				"265": "Mediale",
			},
			settore: 1
		},
        "scaleni": {
            NomePunto: "Scaleni",
            AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
            ChiaviPunto: "",
			punti: {
				"167": "Medi, anteriori e posteriori",
				"267": "Medi",
			},
			settore: 1
        },
		"sternocleidomastoideo": {
			NomePunto: "Sternocleidomastoideo",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				"169": "Capo anteriore",
				"269": "Capo posteriore",
			},
			settore: 1
		},
        "capo_collo": {
            NomePunto: "Lunghissimo del capo e semispinale del capo/collo",
            AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
            ChiaviPunto: "",
			punti: {
				"151": "Fasci superiori",
				"251": "Fasci inferiori",
			},
			settore: 2
        },
		"sacrospinale": {
			NomePunto: "Erettore della colonna vertebrale (Sacrispinale)",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				"173": "Muscolo iliocostale dei lombi",
				"273": "Muscolo iliocostale del dorso - Parte alta",
				"373": "Muscolo iliocostale del dorso - Parte bassa",
				"152": "Muscolo lunghissimo del dorso",
			},
			settore: 2
		},
		"rotatori_multifido": {
			NomePunto: "Rotatori e multifido",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				"176": "Alti",
				"276": "Dorsali",
				"376": "Lombari",
				"476": "Sacrali",
			},
			settore: 2
		},
        "splenio_collo": {
            NomePunto: "Splenio del collo",
            AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
            ChiaviPunto: "",
			punti: {
				"179": "Fasci superiori",
				"279": "Fasci inferiori",
			},
			settore: 2
        },
		"splenio_testa": {
			NomePunto: "Splenio della testa",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				"180": "",
			},
			settore: 2
		},
	},
	protocolliTrigger: {
		"0": {
			scheda: "Trattare il punto [.179.] con il fibrolisore",
			patologie: [
				"133"
			]
		},
	},
	teoria: [
		{
			TitoloSezione: "Xxx",
			contenuti: [
				{
					OcchielloTeoria: "Xxx",
					TitoloTeoria: "Xxx",
					TestoTeoria: "<p align=\"justify\">Xxx</p>" 	
				}
			],
			noList: true
		},
		{
			TitoloSezione: "Glossario e riferimenti",
			contenuti: [
				{
					TitoloTeoria: "Glossario",
					TestoTeoria: "<p>Xxx</p>" 	
				},
				{
					TitoloTeoria: "Riferimenti bibliografici",
					TestoTeoria: "<ol><li><b>Xxx</b><br>di Xxx<br>ed. Xxx<br>Anno XXXX</li></ol>" 	
				},
				{
				 TitoloTeoria: "Crediti",
				 TestoTeoria: "Xxx test [.179.]"
				}
			],
			noList: true
		}
	]

}