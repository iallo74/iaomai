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
			noVideo: true,
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
        "capo_collo": { // verificare se stesso video do sacrospinale !!!!!!!!!
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
		"obliquo_esterno": {
			NomePunto: "Obliquo esterno",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 2
		},
		"traverso_addome": {
			NomePunto: "Traverso dell'addome",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 2
		},
		"retto_addome": {
			NomePunto: "",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 2
		},
		"ileo_psoas": {
			NomePunto: "Iliaco e grande psoas",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 2
		},
		"trapezio": {
			NomePunto: "Trapezio",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 3
		},
		"elevatore_scapola": {
			NomePunto: "Elevatore della scapola",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 3
		},
		"romboidali": {
			NomePunto: "Romboidali",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 3
		},
		"dentato_anteriore": {
			NomePunto: "Dentato anteriore",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 3
		},
		"grande_pettorale": {
			NomePunto: "Grande pettorale",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 3
		},
		"grande_dorsale": {
			NomePunto: "Grande dorsale",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 3
		},
		"deltoide": {
			NomePunto: "Deltoide",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 3
		},
		"sovraspinato": {
			NomePunto: "Sovraspinato",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 3
		},
		"infraspinato": {
			NomePunto: "Infraspinato",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 3
		},
		"piccolo_grande_rotondo": {
			NomePunto: "Piccolo e grande rotondo",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 3
		},
		"sottoscapolare": {
			NomePunto: "Sottoscapolare",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 3
		},
		"bicipite_brachiale": {
			NomePunto: "Bicipite brachiale",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 3
		},
		"tricipite_brachiale": {
			NomePunto: "Tricipite brachiale",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 3
		},
		"pronatore_rotondo": {
			NomePunto: "Pronatore rotondo",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 4
		},
		"palmare_lungo": {
			NomePunto: "Palmare lungo",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 4
		},
		"palmare_lungo": {
			NomePunto: "Palmare lungo",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 4
		},
		"flessore_superficiale_dita": {
			NomePunto: "Flessore superficiale delle dita",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 4
		},
		"flessore_lungo_pollice": {
			NomePunto: "Flessore lungo del pollice",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 4
		},
		"flessore_radiale_carpo": {
			NomePunto: "Flessore radiale del carpo",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 4
		},
		"flessore_ulnare_carpo": {
			NomePunto: "Flessore ulnare del carpo",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 4
		},
		"brachioradiale": {
			NomePunto: "Brachioradiale",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 4
		},
		"estensore_radiale_lungo_carpo": {
			NomePunto: "Estensore radiale lungo del carpo",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 4
		},
		"estensore_radiale_breve_carpo": {
			NomePunto: "Estensore radiale breve del carpo",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 4
		},
		"estensore_ulnare_carpo": {
			NomePunto: "Estensore ulnare del carpo",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 4
		},
		"estensore_dita": {
			NomePunto: "Estensore delle dita",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 4
		},
		"supinatore": {
			NomePunto: "Supinatore",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 4
		},
		"opponente_pollice": {
			NomePunto: "Opponente del pollice",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 4
		},
		"adduttore_pollice": {
			NomePunto: "Adduttore del pollice",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 4
		},
		"interossei_dorsali_mano": {
			NomePunto: "Interossei dorsali",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 4
		},
		"lombricali": {
			NomePunto: "Lombricali",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 4
		},
		"abduttore_mignolo": {
			NomePunto: "Abduttore del mignolo",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 4
		},
		"grande_gluteo": {
			NomePunto: "Grande gluteo",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 5
		},
		"tensore_fascia_lata": {
			NomePunto: "Tensore della fascia lata",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 5
		},
		"medio_gluteo": {
			NomePunto: "Medio gluteo",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 5
		},
		"piccolo_gluteo": {
			NomePunto: "Piccolo gluteo",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 5
		},
		"piriforme": {
			NomePunto: "Piriforme",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 5
		},
		"semimembranoso_semitendinoso": {
			NomePunto: "Semimembranoso e semitendinoso",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 5
		},
		"bicipite_femorale": {
			NomePunto: "Bicipite femorale",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 5
		},
		"grande_adduttore": {
			NomePunto: "Grande adduttore",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 5
		},
		"adduttori_lungo_breve": {
			NomePunto: "Adduttori lungo e breve",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 5
		},
		"gracile": {
			NomePunto: "Gracile",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 5
		},
		"pettineo": {
			NomePunto: "Pettineo",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 5
		},
		"sartorio": {
			NomePunto: "Sartorio",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 5
		},
		"quadricipite_femorale": {
			NomePunto: "Quadricipite femorale",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 5
		},
		"tibiale_anteriore": {
			NomePunto: "Tibiale anteriore",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 6
		},
		"estensore_lungo_dita": {
			NomePunto: "Estensore lungo delle dita",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 6
		},
		"estensore_lungo_alluce": {
			NomePunto: "Estensore lungo dell'alluce",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 6
		},
		"peroniero_anteriore_terzo": {
			NomePunto: "Peroniero anteriore terzo",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 6
		},
		"peroniero_lungo": {
			NomePunto: "Peroniero lungo",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 6
		},
		"peroniero_corto": {
			NomePunto: "Peroniero corto",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 6
		},
		"gastrocnemio": {
			NomePunto: "Gastrocnemio",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 6
		},
		"plantare": {
			NomePunto: "Plantare",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 6
		},
		"soleo": {
			NomePunto: "Soleo",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 6
		},
		"popliteo": {
			NomePunto: "Popliteo",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 6
		},
		"flessore_lungo_dita": {
			NomePunto: "Flessore lungo delle dita",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 6
		},
		"flessore_lungo_alluce": {
			NomePunto: "Flessore lungo dell'alluce",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 6
		},
		"tibiale_posteriore": {
			NomePunto: "Tibiale posteriore",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 6
		},
		"abduttore_alluce": {
			NomePunto: "Abduttore dell'alluce",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 6
		},
		"flessore_breve_dita": {
			NomePunto: "Flessore breve delle dita",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 6
		},
		"estensore_breve_dita": {
			NomePunto: "Estensore breve delle dita",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 6
		},
		"abduttore_quinto_dito": {
			NomePunto: "Abduttore del 5° dito",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 6
		},
		"quadrato_pianta": {
			NomePunto: "Quadrato della pianta",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 6
		},
		"adduttore_alluce": {
			NomePunto: "Adduttore dell'alluce",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 6
		},
		"flessore_breve_alluce": {
			NomePunto: "Flessore breve dell'alluce",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 6
		},
		"interossei_dorsali_piede": {
			NomePunto: "Interossei dorsali",
			AzioniPunto: "<p><b>Azione</b><br>Xxx</p><p><b>Ubicazione</b><br>Xxx</p>",
			ChiaviPunto: "",
			punti: {
				
			},
			settore: 6
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