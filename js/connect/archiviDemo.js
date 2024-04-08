var archiviDemo = {	
	ita: {
		pazienti: [
			{
				"idPaziente": 0,
				"Nome": "Cliente Demo",
				"Cognome": "IAOMAI",
				"Indirizzo": "Via Roma 123",
				"CAP": "12345",
				"Citta": "Roma",
				"Provincia": "Roma",
				"Stato": "it",
				"Telefono": "",
				"Cellulare": "3486851418",
				"paeseCellulare": "it",
				"Email": "app@iaomai.app",
				"sesso": "m",
				"NotePaziente": "E' stato ricoverato nel 23 gennaio 20xx per un principio di infarto.\nAtteggiamento semi-cifotico.\nViaggia molto per lavoro, e questo provoca spesso stati di stress acuto. \nTendenza ipocondriaca ",
				"DataNascita": "1984-10-16",
				"LuogoNascita": "Cuneo",
				"tags": [
					{
						"idTag": 0,
						"NomeTag": "1ª SHIATSU",
						"colore": "d7dafb"
					},
					{
						"idTag": 0,
						"NomeTag": "AGOPUNTURA",
						"colore": "fbd7d7"
					},
					{
						"idTag": 0,
						"NomeTag": "AURICOLOTERAPIA",
						"colore": "d7f5fb"
					}
				],
				"etichette": [
					{
						"idEtichetta": 0,
						"NomeEtichetta": "Sport praticato:",
						"ValoreEtichetta": "Nuoto",
						"sezione": "aggiuntive"
					},
					{
						"idEtichetta": 0,
						"NomeEtichetta": "Contattare preferibilmente:",
						"ValoreEtichetta": "Dopo le ore 17.",
						"sezione": "aggiuntive"
					},
					{
						"idEtichetta": 0,
						"NomeEtichetta": "Sito",
						"ValoreEtichetta": "www.iaomai.app",
						"sezione": "contatti"
					},
					{
						"idEtichetta": 0,
						"NomeEtichetta": "Link social:",
						"ValoreEtichetta": "https://www.facebook.com/profile.php?id=100089849462315",
						"sezione": "contatti"
					}
				],
				"medicine": [
					{
						"idMedicina": 0,
						"NomeMedicina": "ibuprofene"
					},
					{
						"idMedicina": 0,
						"NomeMedicina": "ketoprofene"
					},
					{
						"idMedicina": 0,
						"NomeMedicina": "naprossene"
					}
				],
				"allergie": [
					{
						"idAllergia": 0,
						"NomeAllergia": "Intollerante glutine"
					},
					{
						"idAllergia": 0,
						"NomeAllergia": "Nichel alimentare"
					},
					{
						"idAllergia": 0,
						"NomeAllergia": "Pelo del gatto"
					}
				],
				"patologie": [
					{
						"idPatologia": 0,
						"NomePatologia": "ANSIA"
					},
					{
						"idPatologia": 0,
						"NomePatologia": "Protuzione  L4-L5"
					},
					{
						"idPatologia": 0,
						"NomePatologia": "Ipertensione"
					},
					{
						"idPatologia": 0,
						"NomePatologia": "Artrite reumatoide"
					},
					{
						"idPatologia": 0,
						"NomePatologia": "Allergia"
					},
					{
						"idPatologia": 0,
						"NomePatologia": "Asma bronchiale"
					}
				],
				"interventi": [
					{
						"idIntervento": 0,
						"NomeIntervento": "MENISCO E LEGAMENTI SX"
					},
					{
						"idIntervento": 0,
						"NomeIntervento": "MASTOPLASTICA ADDITIVA"
					},
					{
						"idIntervento": 0,
						"NomeIntervento": "In attesa operazione ernia L4-L5"
					}
				],
				"gallery": [
					{
						"idFile": "file_2674427029613",
						"Dida": ""
					},
					{
						"idFile": "file_2674427069354",
						"Dida": ""
					}
				],
				"Provenienza": "PASSAPAROLA",
				"Professione": "Impiegata",
				"Intestazione": "",
				"CodiceFiscale": "",
				"PartitaIva": "",
				"Social": "Facebook",
				"avatar": "data:image/jpeg;base64,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",
				"Altezza": "175",
				"Peso": "65",
				"DataModifica": 1694960504,
				"trattamenti": [
					{
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Trattamento Shiatsu - Rigidità arti inferiori",
						"TestoTrattamento": "Arrivato in struttura, CLIENTE DEMO sceglie di fare un trattamento Shiatsu per alleviare i dolori agli arti inferiori.\n\nDopo colloquio iniziale, emergono molti aspetti interessanti della personalità di CLIENTE. \nLa cosa che mi colpisce di più è la sopportazione al dolore. La soglia di dolore è ben superiore alla media.\n\nValutazione parziale dei meridiani Tendino Muscolari evidenziano:\nvuoto di VU;\nvuoto di R;\nVB dolorante su gamba dx.\n\nValutazione zone Shu:\nvuoto P;\npieno F;\nzona Rene dura;\ndolore su VU\n\n---------------\nConcluso il trattamento, CLIENTE DEMO si sente decisamente meglio al punto che non sente la necessità di dover replicare un nuovo trattamento. Rimaniamo in contatto eventualmente per una ricaduta.\n",
						"Prescrizione": "Possibilità di lavoro per una conoscenza personale del corpo e delle sue dinamiche in chiave MTC",
						"puntiMTC": [
							{
								"n": 13,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "PuntoShu di Polmone",
								"s": "13.BL"
							},
							{
								"n": 14,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "PuntoShu di Mastro del cuore",
								"s": "14.BL"
							},
							{
								"n": 15,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "PuntoShu di Cuore",
								"s": "15.BL"
							},
							{
								"n": 18,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "PuntoShu di Fegato",
								"s": "18.BL"
							},
							{
								"n": 19,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "PuntoShu di Cistifellea",
								"s": "19.BL"
							},
							{
								"n": 20,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "PuntoShu di Milza",
								"s": "20.BL"
							},
							{
								"n": 21,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "PuntoShu di Stomaco",
								"s": "21.BL"
							},
							{
								"n": 22,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "PuntoShu di Triplo riscaldatore",
								"s": "22.BL"
							},
							{
								"n": 23,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "PuntoShu di Rene",
								"s": "23.BL"
							},
							{
								"n": 25,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "PuntoShu di Intestino crasso",
								"s": "25.BL"
							},
							{
								"n": 27,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "PuntoShu di Intestino tenue",
								"s": "27.BL"
							},
							{
								"n": 28,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "PuntoShu di Vescica",
								"s": "28.BL"
							},
							{
								"n": 1,
								"m": "LU",
								"e": "",
								"z": "",
								"t": "Punto BO di Polmone",
								"s": "1.LU"
							},
							{
								"n": 17,
								"m": "CV",
								"e": "",
								"z": "",
								"t": "Punto BO di Mastro del cuore",
								"s": "17.CV"
							},
							{
								"n": 14,
								"m": "LR",
								"e": "",
								"z": "",
								"t": "Punto BO di Fegato",
								"s": "14.LR"
							},
							{
								"n": 24,
								"m": "GB",
								"e": "D",
								"z": "",
								"t": "Punto BO di Cistifellea",
								"s": "24.GB"
							},
							{
								"n": 14,
								"m": "CV",
								"e": "",
								"z": "",
								"t": "Punto BO di Cuore",
								"s": "14.CV"
							},
							{
								"n": 12,
								"m": "CV",
								"e": "",
								"z": "",
								"t": "Punto BO di Stomaco",
								"s": "12.CV"
							},
							{
								"n": 13,
								"m": "LR",
								"e": "P",
								"z": "",
								"t": "Punto BO di Milza",
								"s": "13.LR"
							},
							{
								"n": 25,
								"m": "GB",
								"e": "",
								"z": "",
								"t": "Punto BO di Rene",
								"s": "25.GB"
							},
							{
								"n": 25,
								"m": "ST",
								"e": "P",
								"z": "",
								"t": "PUNTO DX PIÙ IPERATTIVO",
								"s": "25.ST"
							},
							{
								"n": 5,
								"m": "CV",
								"e": "V",
								"z": "",
								"t": "Punto BO di Triplice riscaldatore",
								"s": "5.CV"
							},
							{
								"n": 4,
								"m": "CV",
								"e": "",
								"z": "",
								"t": "Punto BO di Intestino tenue",
								"s": "4.CV"
							},
							{
								"n": 3,
								"m": "CV",
								"e": "V",
								"z": "",
								"t": "Punto BO di Vescica",
								"s": "3.CV"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "KI",
								"NomeMeridiano": "Rene",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Cistifellea",
								"valEnergetica": "D"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "IRRIGIDIMENTO ARTI INFERIORI",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "MANI FREDDE ",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "STRESS",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "IPOCONDRIA",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "CEFALEA",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "QUALITÀ DEL SONNO",
								"score": 4
							}
						],
						"gallery": [
							{
								"idFile": "file_2674467779004",
								"Dida": ""
							},
							{
								"idFile": "file_2674467791995",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1672527600,
						"oraInizio": 120,
						"oraFine": 144,
						"DataModifica": 1691909111,
						"LabelCiclo": "",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Anamnesi",
						"TestoTrattamento": "{\"AnamnesiMotivo\":\"Il Cliente Demo Iaomai, si rivolge a me per iniziare un ciclo di trattamenti shiatsu per provare a risolvere una serie di disturbi correlati all'ansia di cui soffre da anni.\\n\\nLamenta la difficoltà ad addormentarsi da tempo, al mattino si sveglia molto stanco.\\nI sintomi peggiorano in proporzione allo stress derivante dal lavoro. \\nSi presentano spesso, durante la notte, sudorazioni, pensieri ricorrenti e ossessivi, rimuginazioni.\\n\\nDi giorno l'accumulo di stress si riversa a livello somatico nella zona lombare in particolare all'altezza dei reni. \\nDa qualche settimana le urine sono scarse e scure, lamenta secchezza in bocca e sensazione di pesantezza a livello del capo; di tanto in tanto compaiono lievi acufeni.\\n\\nRicorrente il sapore amaro in bocca\\n\",\"AnamnesiDiagnosiOccidentale\":\"L'emotività di ogni persona  è soggettiva e si manifesta nei modi più inverosimili, una scarsa autostima di fondo può indurre una persona a pensare di non farcela a superare prove che la vita ci pone davanti. Uno stress accentuato che va a ledere la nostra calma e ci può portare ad andare in \\\"tilt\\\" ed ecco apparire l'ansia, la paura, il famoso attacco di panico. Come sintomo in fase acuta si possono avere tachicardia, respirazione affannosa, paura con conseguente scarica di adrenalina, una sensazione molto sgradevole anche perché le crisi a volte arrivano improvvise, senza preavviso, e chi ne è colpito vive nel terrore di entrare nella fase di \\\" Terrore\\\".\\nSe lo stato di angoscia è profondo, grave e permanente allora necessita dell'intervento di uno specialista.\",\"AnamnesiDiagnosiMTC\":\"M.T.C.\\nAnsia, paura, angoscia e iperemotività sono considerati un eccesso di Qi nei meridiani di Cuore e del Mastro del cuore, che deve regolare il tono del plesso cardiaco. \\nSe la patologia è cronica può essere in relazione anche con altri meridiani.\\n\\n\"}",
						"Prescrizione": "Terapia\nDisperdere e regolare il Qi nei meridiani del Cuore e di Mastro del cuore, \nRistabilire la comunicazione tra Cuore e Rene -  Livello Energetico Shao Yin -  \nCalmare lo Shen",
						"puntiMTC": [
							{
								"n": "03",
								"m": "KI",
								"e": "V",
								"z": "",
								"t": "",
								"s": "3.KI"
							},
							{
								"n": "36",
								"m": "ST",
								"e": "P",
								"z": "",
								"t": "su gamba dx più interattivo della gamba sx. ",
								"s": "36.ST"
							},
							{
								"n": "04",
								"m": "LI",
								"e": "D",
								"z": "coppetta",
								"t": "",
								"s": "04.LI"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "KI",
								"NomeMeridiano": "Rene",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "ST",
								"NomeMeridiano": "Stomaco",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Vescica urinaria",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Cistifellea",
								"valEnergetica": "V"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "IPOCONDRIA",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "STRESS",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "MANI FREDDE ",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "CEFALEA",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "INSONNIA",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANSIA",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "BOCCA ASCIUTTA",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "SAPORE AMARO IN BOCCA",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "INCUBI E PENSIERI RICORRENTI",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "DOLORE AD URINARE",
								"score": 7
							}
						],
						"gallery": [
							{
								"idFile": "file_2674478724650",
								"Dida": ""
							},
							{
								"idFile": "file_2674478728149",
								"Dida": ""
							},
							{
								"idFile": "file_2674478731260",
								"Dida": ""
							}
						],
						"TimeTrattamento": 0,
						"oraInizio": -1,
						"oraFine": -1,
						"DataModifica": 1694960504,
						"LabelCiclo": "Es. Ciclo Shiatsu - Ansia ",
						"TipoTrattamento": "A",
						"CostoTrattamento": 0,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Anamnesi",
						"TestoTrattamento": "{\"AnamnesiMotivo\":\"Storia clinica:\\n\\n-Sintomi attuali:\\n\\nIl paziente ha riportato sintomi di lombosciatalgia, inclusi dolore lancinante nella zona lombare e formicolio lungo la gamba destra.\\nI sintomi sono iniziati circa 6 settimane fa.\\n\\n- Eventi scatenanti:\\n\\nIl paziente ha segnalato un sollevamento improprio di oggetti pesanti come possibile causa dei sintomi.\\n\\n-Storia medica:\\n\\nIl paziente ha riportato problemi spinali preesistenti, come una lieve ernia del disco nella zona lombare.\\nHa ricevuto trattamenti chiropratici nel passato per gestire i sintomi.\\n\\n- Farmaci e integratori:\\n\\nIl paziente sta attualmente assumendo ibuprofene per alleviare il dolore.\\n\\n- Storia chirurgica:\\n\\nIl paziente non ha subito interventi chirurgici alla schiena o alla zona lombare in passato.\\n\\n- Allergie e intolleranze:\\n\\nIl paziente ha dichiarato di essere allergico alla penicillina.\\n\\n>Stile di vita e fattori di rischio:\\n\\n- Attività fisica:\\n\\nIl paziente ha descritto il suo livello di attività fisica come moderato, con passeggiate regolari.\\n\\n- Postura e abitudini quotidiane:\\n\\nIl paziente lavora principalmente al computer ed è consapevole di avere una postura non ottimale durante il lavoro.\\n\\n- Stress e fattori psicologici:\\n\\nIl paziente ha menzionato livelli di stress legati al lavoro che potrebbero influire sulla lombosciatalgia.\\n\\n- Obiettivi di trattamento:\\n\\nIl paziente ha espresso il desiderio di ridurre il dolore nella zona lombare e migliorare la mobilità.\\n\\n- Note aggiuntive:\\n\\nDurante la consultazione, il paziente ha sottolineato l'importanza di trovare un trattamento che abbia un approccio più naturale rispetto all'assunzione di farmaci a lungo termine.\\n\",\"AnamnesiDiagnosiOccidentale\":\"Il CLIENTE DEMO IAOMAI presenta una condizione di lombosciatalgia, caratterizzata da dolore nella zona lombare e formicolio lungo il decorso del nervo sciatico. La condizione sembra essere correlata a una possibile irritazione del nervo sciatico, probabilmente scatenata da un sollevamento improprio e accentuata dalla presenza di un'ernia del disco lombare.\",\"AnamnesiDiagnosiMTC\":\"In base all'analisi dei sintomi e dei fattori di rischio, la lombosciatalgia di CLIENTE DEMO IAOMAI potrebbe essere correlata a un'\\\"Ostruzione di Qi e Sangue nella Zona Lombare\\\" secondo i principi della Medicina Tradizionale Cinese. L'accumulo di stress, la postura non corretta e il sollevamento improprio potrebbero aver contribuito a questa condizione, ostacolando il flusso armonioso di Qi e Sangue lungo i meridiani della zona lombare.\\n\\nNell'ottica della MTC, l'obiettivo del trattamento sarà quello di rimuovere l'ostacolo, promuovere la circolazione di Qi e Sangue e ristabilire l'equilibrio energetico nei meridiani coinvolti.\\n\"}",
						"Prescrizione": "• Si evidenzia una stasi nel  meridiano della vescica biliare perchè mette in movimento il QI essendo il livello shaoyang che permette la messa in movimento dell'energia sia yang che yin. \n• Moxa su 25VB punto Mu del Rene che permette la nascita dello yang.\n• Moxa su 31VB punto vento indicato per i ristagni.\n• 34VB punto hui dei muscoli, secondo Leung KwokPo tratta il muscolo in quanto capace di indurre \"movimento\"\n• Importanti i punti che mobilizzano il sangue sul meridiano di vescica 17BL,40BL,  32 BL e 53BL\n• LV3 punto shu terra e yuan che muove il sangue.\n• Yao fa per mobilizzare la zona lombare. ",
						"puntiMTC": [
							{
								"n": 31,
								"m": "GB",
								"e": "D",
								"z": "",
								"t": "Dolente alla palpazione",
								"s": "31.GB"
							},
							{
								"n": 25,
								"m": "KI",
								"e": "D",
								"z": "",
								"t": "Dolente alla palpazione",
								"s": "25.KI"
							},
							{
								"n": 21,
								"m": "GB",
								"e": "P",
								"z": "",
								"t": "",
								"s": "21.GB.."
							},
							{
								"n": 30,
								"m": "GB",
								"e": "P",
								"z": "",
								"t": "",
								"s": "30.GB.."
							},
							{
								"n": 34,
								"m": "GB",
								"e": "D",
								"z": "",
								"t": "Dolente alla palpazione",
								"s": "34.GB"
							},
							{
								"n": 43,
								"m": "GB",
								"e": "D",
								"z": "",
								"t": "Dolente alla palpazione",
								"s": "43.GB"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Cistifellea",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "KI",
								"NomeMeridiano": "Rene",
								"valEnergetica": "D"
							},
							{
								"siglaMeridiano": "ST",
								"NomeMeridiano": "Stomaco",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Dolore Lombare",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Formicolio e Intorpidimento",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Debolezza muscolare",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Peggioramento con il movimento",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Limitazione al movimento",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Dolore durante la seduta",
								"score": 8
							}
						],
						"gallery": [
							{
								"idFile": "file_2674469901174",
								"Dida": ""
							},
							{
								"idFile": "file_2674469904750",
								"Dida": ""
							},
							{
								"idFile": "file_2674469909751",
								"Dida": ""
							}
						],
						"TimeTrattamento": 0,
						"oraInizio": -1,
						"oraFine": -1,
						"DataModifica": 1692183228,
						"LabelCiclo": "Es. Ciclo Agopuntura  per Lombosciatalgia",
						"TipoTrattamento": "A",
						"CostoTrattamento": 0,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Seduta 1: Valutazione iniziale e rilassamento",
						"TestoTrattamento": "Durata: 45 minuti\n\nDurante la prima seduta, il paziente viene accolto e sottoposto a una valutazione dettagliata della sua storia clinica e dei sintomi associati alla lombosciatalgia. L'agopunturista spiega il processo di trattamento e identifica i punti di agopuntura chiave da trattare. L'agopunturista inserisce aghi sottili in punti specifici lungo i meridiani correlati alla lombosciatalgia. Il paziente viene poi lasciato a rilassarsi per circa 20-30 minuti.",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 23,
								"m": "BL",
								"e": "D",
								"z": "ago",
								"t": "PuntoShu di Rene",
								"s": "23.BL"
							},
							{
								"n": 32,
								"m": "BL",
								"e": "P",
								"z": "ago",
								"t": "",
								"s": "32.BL"
							},
							{
								"n": 8,
								"m": "BL",
								"e": "D",
								"z": "ago",
								"t": "",
								"s": "8.BL"
							},
							{
								"n": 30,
								"m": "BL",
								"e": "P",
								"z": "ago",
								"t": "",
								"s": "30.BL"
							},
							{
								"n": 4,
								"m": "CV",
								"e": "V",
								"z": "ago",
								"t": "Punto BO di Intestino tenue",
								"s": "4.CV"
							},
							{
								"n": 4,
								"m": "SP",
								"e": "V",
								"z": "ago",
								"t": "",
								"s": "4.SP"
							},
							{
								"n": 31,
								"m": "GB",
								"e": "D",
								"z": "ago",
								"t": "",
								"s": "31.GB"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Vescica urinaria",
								"valEnergetica": "D",
								"descrizione": "Dolente alla palpazione"
							},
							{
								"siglaMeridiano": "KI",
								"NomeMeridiano": "Rene",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Cistifellea",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Dolore Lombare",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Formicolio e Intorpidimento",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Debolezza muscolare",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Peggioramento con il movimento",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Limitazione al movimento",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Dolore durante la seduta",
								"score": 10
							}
						],
						"gallery": [
							{
								"idFile": "file_2674427029613",
								"Dida": ""
							},
							{
								"idFile": "file_2674427069354",
								"Dida": ""
							},
							{
								"idFile": "file_2674469909751",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1674428400,
						"oraInizio": 132,
						"oraFine": 144,
						"DataModifica": 1692183278,
						"LabelCiclo": "Es. Ciclo Agopuntura  per Lombosciatalgia",
						"TipoTrattamento": "B",
						"CostoTrattamento": 150,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Seduta 2: Riduzione dell'infiammazione e del dolore",
						"TestoTrattamento": "Durata: 40 minuti\n\nNella seconda seduta, l'agopunturista valuta i progressi del paziente dalla seduta precedente e si concentra sulla riduzione dell'infiammazione e del dolore associati alla lombosciatalgia. Gli aghi vengono posizionati in modo da stimolare i punti che possono aiutare ad alleviare l'infiammazione dei nervi sciatici e il dolore associato. Il paziente viene nuovamente lasciato a rilassarsi mentre gli aghi agiscono.",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 23,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "PuntoShu di Rene",
								"s": "23.BL"
							},
							{
								"n": 32,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "32.BL"
							},
							{
								"n": 8,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "8.BL"
							},
							{
								"n": 30,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "30.BL"
							},
							{
								"n": 4,
								"m": "CV",
								"e": "",
								"z": "ago",
								"t": "Punto BO di Intestino tenue",
								"s": "4.CV"
							},
							{
								"n": 4,
								"m": "SP",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "4.SP"
							},
							{
								"n": 31,
								"m": "GB",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "31.GB"
							},
							{
								"n": 12,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "12.BL"
							},
							{
								"n": 40,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "40.BL"
							},
							{
								"n": 60,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "60.BL"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Vescica urinaria",
								"valEnergetica": "D"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Cistifellea",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "ST",
								"NomeMeridiano": "Stomaco",
								"valEnergetica": "P",
								"descrizione": "Trattamento palmare per pensieri ossessivi"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Dolore Lombare",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Formicolio e Intorpidimento",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Debolezza muscolare",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Peggioramento con il movimento",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Limitazione al movimento",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Dolore durante la seduta",
								"score": 9
							}
						],
						"gallery": [
							{
								"idFile": "file_2674467779004",
								"Dida": ""
							},
							{
								"idFile": "file_2674469909751",
								"Dida": ""
							},
							{
								"idFile": "file_2674475331170",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1675033200,
						"oraInizio": 132,
						"oraFine": 144,
						"DataModifica": 1692183307,
						"LabelCiclo": "Es. Ciclo Agopuntura  per Lombosciatalgia",
						"TipoTrattamento": "B",
						"CostoTrattamento": 150,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Seduta 3: Miglioramento della circolazione e del flusso energetico",
						"TestoTrattamento": "Durata: 50 minuti\n\nNella terza seduta, l'agopunturista continua a lavorare sulla riduzione del dolore e dell'infiammazione, ma si concentra anche sull'aumento della circolazione sanguigna e del flusso energetico nella zona colpita. Gli aghi vengono posizionati in modo da stimolare il flusso energetico lungo i meridiani collegati alla zona lombare e sciatica.",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 8,
								"m": "GB",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "8.GB"
							},
							{
								"n": 20,
								"m": "GB",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "20.GB"
							},
							{
								"n": 22,
								"m": "GV",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "22.GV"
							},
							{
								"n": 10,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "10.BL"
							},
							{
								"n": 30,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "30.BL"
							},
							{
								"n": 23,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "PuntoShu di Rene",
								"s": "23.BL"
							},
							{
								"n": 32,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "32.BL"
							},
							{
								"n": 4,
								"m": "SP",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "4.SP"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Vescica urinaria",
								"valEnergetica": "D"
							},
							{
								"siglaMeridiano": "ST",
								"NomeMeridiano": "Stomaco",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Dolore Lombare",
								"score": 5
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Formicolio e Intorpidimento",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Debolezza muscolare",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Peggioramento con il movimento",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Limitazione al movimento",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Dolore durante la seduta",
								"score": 7
							}
						],
						"gallery": [
							{
								"idFile": "file_2674469904750",
								"Dida": ""
							},
							{
								"idFile": "file_2674475331170",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1675638000,
						"oraInizio": 132,
						"oraFine": 144,
						"DataModifica": 1692183339,
						"LabelCiclo": "Es. Ciclo Agopuntura  per Lombosciatalgia",
						"TipoTrattamento": "B",
						"CostoTrattamento": 150,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Seduta 4: Riequilibrio muscolare e posturale",
						"TestoTrattamento": "Durata: 45 minuti\n\nNella quarta seduta, l'agopunturista valuta la postura e i muscoli del paziente, cercando di individuare eventuali squilibri che possano contribuire alla lombosciatalgia. Gli aghi vengono inseriti in punti che aiutano a riequilibrare i muscoli e a migliorare la postura. Il paziente potrebbe anche ricevere consigli su esercizi di stretching o rafforzamento da fare a casa.",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 20,
								"m": "GV",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "20.GV"
							},
							{
								"n": 7,
								"m": "HT",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "7.HT"
							},
							{
								"n": 20,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "PuntoShu di Milza",
								"s": "20.BL"
							},
							{
								"n": 40,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "40.BL"
							},
							{
								"n": 60,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "60.BL"
							},
							{
								"n": 37,
								"m": "BL",
								"e": "",
								"z": "coppetta",
								"t": "",
								"s": "37.BL"
							},
							{
								"n": 38,
								"m": "BL",
								"e": "",
								"z": "coppetta",
								"t": "",
								"s": "38.BL"
							},
							{
								"n": 41,
								"m": "BL",
								"e": "",
								"z": "coppetta",
								"t": "",
								"s": "41.BL"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Vescica urinaria",
								"valEnergetica": "D"
							},
							{
								"siglaMeridiano": "ST",
								"NomeMeridiano": "Stomaco",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "CV",
								"NomeMeridiano": "Vaso concezione",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Dolore Lombare",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Formicolio e Intorpidimento",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Debolezza muscolare",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Peggioramento con il movimento",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Limitazione al movimento",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Dolore durante la seduta",
								"score": 3
							}
						],
						"gallery": [
							{
								"idFile": "file_2674427069354",
								"Dida": ""
							},
							{
								"idFile": "file_2674469901174",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1676242800,
						"oraInizio": 132,
						"oraFine": 144,
						"DataModifica": 1692183366,
						"LabelCiclo": "Es. Ciclo Agopuntura  per Lombosciatalgia",
						"TipoTrattamento": "B",
						"CostoTrattamento": 150,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Seduta 5: Mantenimento e pianificazione futura",
						"TestoTrattamento": "Durata: 40 minuti\n\nNell'ultima seduta del ciclo, l'agopunturista discute con il paziente i progressi ottenuti durante il trattamento. Si concentra sul mantenimento dei risultati e potrebbe proporre un piano di trattamento a lungo termine, con visite periodiche per gestire i sintomi della lombosciatalgia nel tempo. Il paziente viene incoraggiato a continuare a seguire consigli di postura, esercizi e abitudini salutari.",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 23,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "PuntoShu di Rene",
								"s": "23.BL"
							},
							{
								"n": 32,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "32.BL"
							},
							{
								"n": 30,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "30.BL"
							},
							{
								"n": 31,
								"m": "GB",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "31.GB"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Vescica urinaria",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Cistifellea",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "ST",
								"NomeMeridiano": "Stomaco",
								"valEnergetica": "D"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Dolore Lombare",
								"score": 2
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Formicolio e Intorpidimento",
								"score": 1
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Debolezza muscolare",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Peggioramento con il movimento",
								"score": 2
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Limitazione al movimento",
								"score": 5
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Dolore durante la seduta",
								"score": 3
							}
						],
						"gallery": [
							{
								"idFile": "file_2674475391556",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1676847600,
						"oraInizio": 132,
						"oraFine": 144,
						"DataModifica": 1692183387,
						"LabelCiclo": "Es. Ciclo Agopuntura  per Lombosciatalgia",
						"TipoTrattamento": "B",
						"CostoTrattamento": 150,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Primo trattamento Ansia",
						"TestoTrattamento": "Il paziente si presenta nervoso e diffidente.\nNon dorme da due notti ed è molto preoccupato per le conseguenze della pandemia da COVID 19.\n\nPressione Shiatsu sul meridiano della Vescica da 11BL a 28BL, tonificando i punti 15BL e 20BL rispettivamente punti Shu di Cuore e Milza.\n\n- Pressione Shiatsu su tutto il  meridiano della Milza soffermandosi sul punto 6SP e 10SP proseguendo poi lungo tutto il meridiano fino al torace.\n\n- Pressione Shiatsu sul tutto il meridiano del Cuore soffermandosi al punto 7HT proseguendo fino al punto  9HT \n\n-Pressione Shiatsu sul Meridiano del Mastro di Cuore. ",
						"Prescrizione": "Pressione Shiatsu sul meridiano della Vescica da 11BL a 28BL, tonificando i punti 15BL e 20BL rispettivamente punti Shu di Cuore e Milza.\n\n- Pressione Shiatsu su tutto il  meridiano della Milza soffermandosi sul punto 6SP e 10SP proseguendo poi lungo tutto il meridiano fino al torace.\n\n- Pressione Shiatsu sul tutto il meridiano del Cuore soffermandosi al punto 7HT proseguendo fino al punto  9HT \n\n-Pressione Shiatsu sul Meridiano del Mastro di Cuore. ",
						"puntiMTC": [
							{
								"n": 7,
								"m": "HT",
								"e": "",
								"z": "dito",
								"t": "",
								"s": "7.HT"
							},
							{
								"n": 6,
								"m": "PC",
								"e": "",
								"z": "dito",
								"t": "",
								"s": "6.PC"
							},
							{
								"n": 7,
								"m": "PC",
								"e": "",
								"z": "dito",
								"t": "",
								"s": "7.PC"
							},
							{
								"n": 20,
								"m": "GV",
								"e": "",
								"z": "coppetta",
								"t": "",
								"s": "20.GV"
							},
							{
								"n": 1,
								"m": "SP",
								"e": "",
								"z": "dito",
								"t": "",
								"s": "1.SP"
							},
							{
								"n": 11,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "11.BL"
							},
							{
								"n": 28,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "PuntoShu di Vescica",
								"s": "28.BL"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Vescica urinaria",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "SP",
								"NomeMeridiano": "Milza-pancreas",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "HT",
								"NomeMeridiano": "Cuore",
								"valEnergetica": "V"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "IPOCONDRIA",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "STRESS",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "MANI FREDDE ",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "CEFALEA",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "INSONNIA",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANSIA",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "BOCCA ASCIUTTA",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "SAPORE AMARO IN BOCCA",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "INCUBI E PENSIERI RICORRENTI",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "DOLORE AD URINARE",
								"score": 6
							}
						],
						"gallery": [
							{
								"idFile": "file_2674478724650",
								"Dida": ""
							},
							{
								"idFile": "file_2674478728149",
								"Dida": ""
							},
							{
								"idFile": "file_2674478731260",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1674514800,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692049984,
						"LabelCiclo": "Es. Ciclo Shiatsu - Ansia ",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Secondo trattamento Ansia",
						"TestoTrattamento": "Il cliente dice si aver avvertito un cambiamento emotivo rispetto alla settimana prima, tuttavia i sintomi indicati in anamnesi restano persistenti. \nLamenta fastidiose e frequenti palpitazioni notturne, precedute da incubi e pensieri ossessivi.\n\nDecido di inserire anche tecniche di stretching e riequilibrio del Qi.\n\nTrattamento:\nPalpazione Shiatsu sul meridiano della Vescica da 11BL a 28BL, tonificando i punti 15BL e 20BL rispettivamente punti Shu di Cuore e Milza.\n\nPressione Shiatsu su tutto il meridiano del Rene soffermandosi su 1KI e 3KI. \n\nPressione Shiatsu su tutto il meridiano del Cuore e Mastro di Cuore soffermandosi su 8PC\n\nTrattato anche il meridiano del Grosso Intestino per la regola Mezzogiorno Mezzanotte e per la tonificazione dei Liquidi Jin. ",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 7,
								"m": "HT",
								"e": "P",
								"z": "dito",
								"t": "",
								"s": "7.HT"
							},
							{
								"n": 6,
								"m": "PC",
								"e": "D",
								"z": "dito",
								"t": "",
								"s": "6.PC"
							},
							{
								"n": 7,
								"m": "PC",
								"e": "D",
								"z": "dito",
								"t": "",
								"s": "7.PC"
							},
							{
								"n": 20,
								"m": "GV",
								"e": "V",
								"z": "moxa",
								"t": "",
								"s": "20.GV"
							},
							{
								"n": 6,
								"m": "SP",
								"e": "V",
								"z": "moxa",
								"t": "",
								"s": "6.SP"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Vescica urinaria",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "SP",
								"NomeMeridiano": "Milza-pancreas",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "HT",
								"NomeMeridiano": "Cuore",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "IPOCONDRIA",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "STRESS",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "MANI FREDDE ",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "CEFALEA",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "INSONNIA",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANSIA",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "BOCCA ASCIUTTA",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "SAPORE AMARO IN BOCCA",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "INCUBI E PENSIERI RICORRENTI",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "DOLORE AD URINARE",
								"score": 4
							}
						],
						"gallery": [
							{
								"idFile": "file_2674478724650",
								"Dida": ""
							},
							{
								"idFile": "file_2674478728149",
								"Dida": ""
							},
							{
								"idFile": "file_2674478731260",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1675119600,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692049984,
						"LabelCiclo": "Es. Ciclo Shiatsu - Ansia ",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Terzo trattamento Ansia",
						"TestoTrattamento": "Il Cliente Demo Iaomai riferisce di aver avuto dei miglioramenti sostanziali.  \nOra riesce ad addormentarsi tranquillamente e non si sveglia più durante la notte. \nI sogni sonno nettamente diminuiti ed il sonno è tranquillo e riposante.  \nI dolori lombari sono scomparsi. \nAnche gli altri sintomi sono migliorati",
						"Prescrizione": "Trattamento:\n\nDisperdere il fuoco del Fegato e della Vescica Biliare e tonificare i rispettivi organi. \nPressione Shiatsu sul meridiano della Vescica da 11BL a 28BL soffermandosi su 18BL e 19BL  quali punti SHU di Fegato e Vescica Biliare. \n\nPressione Shiatsu lungo tutto il meridiano della Vescica Biliare soffermandosi su GB20 e GB21.\nPressione Shiatsu su tutto il meridiano del Fegato. Per la regola Mezzogiorno-Mezzanotte, trattato anche il meridiano del Cuore. ",
						"puntiMTC": [
							{
								"n": 11,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "",
								"s": "11.BL"
							},
							{
								"n": 18,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "PuntoShu di Fegato",
								"s": "18.BL"
							},
							{
								"n": 19,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "PuntoShu di Cistifellea",
								"s": "19.BL"
							},
							{
								"n": 28,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "PuntoShu di Vescica",
								"s": "28.BL"
							},
							{
								"n": 20,
								"m": "GB",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "20.GB"
							},
							{
								"n": 21,
								"m": "GB",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "21.GB"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Vescica urinaria",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Cistifellea",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "LR",
								"NomeMeridiano": "Fegato",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "IPOCONDRIA",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "STRESS",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "MANI FREDDE ",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "CEFALEA",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "INSONNIA",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANSIA",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "BOCCA ASCIUTTA",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "SAPORE AMARO IN BOCCA",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "INCUBI E PENSIERI RICORRENTI",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "DOLORE AD URINARE",
								"score": 3
							}
						],
						"gallery": [
							{
								"idFile": "file_2674478724650",
								"Dida": ""
							},
							{
								"idFile": "file_2674478728149",
								"Dida": ""
							},
							{
								"idFile": "file_2674478731260",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1676329200,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692049984,
						"LabelCiclo": "Es. Ciclo Shiatsu - Ansia ",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Quarto trattamento Ansia",
						"TestoTrattamento": "Il ricevente  riferisce di  non svegliarsi più la notte, il sonno è tranquillo e riposante, gli incubi sono scomparsi.   \nRiferisce inoltre di essere meno irritabile e nessun episodio  di cefalea. Ha recuperato energia fisica ed in generale il tuono dell'umore è migliorato. \n\nResta marcato l'aspetto ansioso che ad ogni modo sembra essere diminuito dal primo incontro. \nLamenta ancora una sensazione di gusto amaro in bocca, in particolare nelle prime ore del giorno.\n\nTrattamento:\nDisperdere il fuoco del Fegato e della Vescica Biliare e tonificare i rispettivi organi. Pressione Shiatsu sul meridiano della Vescica da 11BL a 28BL soffermandosi su 18BL e 19BL  quali punti SHU di Fegato e Vescica Biliare. ",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 11,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "",
								"s": "11.BL"
							},
							{
								"n": 18,
								"m": "BL",
								"e": "V",
								"z": "moxa",
								"t": "PuntoShu di Fegato",
								"s": "18.BL"
							},
							{
								"n": 19,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "PuntoShu di Cistifellea",
								"s": "19.BL"
							},
							{
								"n": 28,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "PuntoShu di Vescica",
								"s": "28.BL"
							},
							{
								"n": 13,
								"m": "LR",
								"e": "V",
								"z": "moxa",
								"t": "Punto BO di Milza",
								"s": "13.LR"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Vescica urinaria",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Cistifellea",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "LR",
								"NomeMeridiano": "Fegato",
								"valEnergetica": "P",
								"descrizione": ""
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "IPOCONDRIA",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "STRESS",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "MANI FREDDE ",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "CEFALEA",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "INSONNIA",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANSIA",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "BOCCA ASCIUTTA",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "SAPORE AMARO IN BOCCA",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "INCUBI E PENSIERI RICORRENTI",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "DOLORE AD URINARE",
								"score": 5
							}
						],
						"gallery": [
							{
								"idFile": "file_2674478724650",
								"Dida": ""
							},
							{
								"idFile": "file_2674478728149",
								"Dida": ""
							},
							{
								"idFile": "file_2674478731260",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1676934000,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692049984,
						"LabelCiclo": "Es. Ciclo Shiatsu - Ansia ",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Quinto trattamento Ansia",
						"TestoTrattamento": "Il ricevente riferisce non solo di sentirsi meglio, ma di sentirsi cambiato dentro.\nSi addormenta facilmente ed i pensieri ossessivi si sono trasformati in una lezione di vita. \nLa stanchezza al mattino è quasi sparita e si sveglia con molta più energia fisica e mentale. \nQuesto anche in concomitanza alla scelta di riprendere l'abitudine persa da tempo di andare a fare una passeggiata dopo cena.\n\nLo stress è ancora presente, ma lui stesso afferma di saperlo gestire meglio e scaricare prima di tornare a casa.\n\nSi concorda assieme di procedere ad un trattamento di sostenimento ACQUA - LEGNO associato a tecniche di stretching. ",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "KI",
								"NomeMeridiano": "Rene",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Cistifellea",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "LR",
								"NomeMeridiano": "Fegato",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "IPOCONDRIA",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "STRESS",
								"score": 5
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "MANI FREDDE ",
								"score": 1
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "CEFALEA",
								"score": 2
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "INSONNIA",
								"score": 1
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANSIA",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "BOCCA ASCIUTTA",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "SAPORE AMARO IN BOCCA",
								"score": 2
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "INCUBI E PENSIERI RICORRENTI",
								"score": 1
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "DOLORE AD URINARE",
								"score": 0
							}
						],
						"gallery": [
							{
								"idFile": "file_2674478724650",
								"Dida": ""
							},
							{
								"idFile": "file_2674478728149",
								"Dida": ""
							},
							{
								"idFile": "file_2674478731260",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1677452400,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692049984,
						"LabelCiclo": "Es. Ciclo Shiatsu - Ansia ",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Guida alla sessione singola",
						"TestoTrattamento": "In questa sezione hai la possibilità di inserire nella cartella del tuo paziente / ricevente una seduta singola.\nQuesto ti permetterà conservare nell'archivio la traccia del trattamento sia dal punto di vista clinico, sia economico.\n\nPotrai inoltre aggiungere una prescrizione, i sintomi, i punti o i meridiani trattati.\n",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [],
						"gallery": [],
						"TimeTrattamento": 1674601200,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1693846663,
						"LabelCiclo": "",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Anamnesi",
						"TestoTrattamento": "{\"AnamnesiMotivo\":\"QUESTIONARIO DI ANAMNESI (a scopo dimostrativo)\\n\\nDa quanto tempo sperimenta problemi di insonnia? Circa 6 mesi.\\nQuali sono i sintomi principali dell'insonnia che sta vivendo? Difficoltà ad addormentarsi la sera e risvegli notturni frequenti.\\nHa notato fattori specifici che scatenano o peggiorano l'insonnia? Soprattutto stress legato al lavoro e ansia.\\n\\nStoria Medica Precedente:\\nHa mai avuto problemi di salute mentale o disturbi dell'umore? Nessuna diagnosi pregressa di disturbi dell'umore. Ha avuto episodi sporadici di ansia.\\nSta assumendo farmaci o integratori che potrebbero influenzare il sonno? Non sta assumendo farmaci attualmente.\\nHa mai sottoposto a trattamenti precedenti per l'insonnia? Ha provato tecniche di rilassamento e tisane calmanti, ma senza successo duraturo.\\n\\nStile di Vita e Abitudini:\\nDescriva il suo stile di vita generale. Maria lavora a tempo pieno e spesso si sente stressata a causa delle scadenze e delle responsabilità lavorative. Consuma caffè al mattino e occasionalmente una tazza nel pomeriggio.\\nCome gestisce lo stress nella vita quotidiana? Pratica yoga e meditazione, ma ultimamente ha avuto difficoltà a trovare il tempo.\\nQuali sono le sue abitudini prima di coricarsi? Spesso guarda la televisione o usa il telefono poco prima di andare a letto.\\n\\nObiettivi del Trattamento:\\nQual è l'obiettivo principale che desidera raggiungere attraverso l'auricoloterapia per l'insonnia?\\nMaria desidera migliorare la qualità del sonno, ridurre l'ansia e imparare tecniche per gestire lo stress in modo più efficace.\\n\\nNote Aggiuntive:\\nMaria è particolarmente interessata a trattamenti naturali e vuole esplorare l'auricoloterapia come opzione.\",\"AnamnesiDiagnosiOccidentale\":\"Diagnosi in Medicina Occidentale: Disturbo dell'Insonnia Primario\\n\\nSpiegazione:\\nIl disturbo dell'insonnia primario è una condizione in cui il paziente ha difficoltà a iniziare o a mantenere il sonno, nonostante le opportunità di farlo. Questo può essere causato da fattori come ansia, stress, depressione, cattive abitudini di sonno, eccessivo consumo di caffeina o alcol, e disturbi della ritmicità circadiana.\\n\\nSintomi Associati:\\n\\nDifficoltà ad addormentarsi\\nRisvegli notturni frequenti\\nSensazione di sonno non riposante al risveglio\\nStanchezza durante il giorno\\nIrritabilità e difficoltà a concentrarsi\\nTrattamento in Medicina Occidentale:\\nIl trattamento in medicina occidentale per il disturbo dell'insonnia può variare a seconda della causa sottostante. Potrebbe includere interventi comportamentali, come la terapia cognitivo-comportamentale per l'insonnia (CBT-I), che mira a migliorare l'igiene del sonno e a cambiare abitudini dannose. In alcuni casi, possono essere prescritti farmaci ipnotici a breve termine per aiutare a stabilizzare il sonno.\\n\\nPiano di Cura:\\nUn piano di cura potrebbe coinvolgere la combinazione di terapie comportamentali, come la CBT-I, il controllo dell'ambiente di sonno, l'educazione sulla riduzione dell'ansia e dello stress, e l'adozione di strategie di rilassamento. In casi selezionati, il medico potrebbe considerare la prescrizione di farmaci a breve termine, ma con attenzione a potenziali effetti collaterali e dipendenza.\",\"AnamnesiDiagnosiMTC\":\"Stasi di Qi e Sangue con Deficit di Shen (Mente)\\n\\nSpiegazione:\\nNella prospettiva della MTC, l'insonnia potrebbe essere vista come il risultato di un blocco dell'energia (Qi) e della circolazione del sangue, che può causare tensione e inquietudine. Il \\\"Shen\\\", che rappresenta l'aspetto mentale e spirituale, può essere indebolito a causa di stress e ansia e può influenzare la capacità di addormentarsi e di mantenere un sonno riposante.\\n\\nSintomi Associati:\\n\\nDifficoltà ad addormentarsi\\nRisvegli notturni frequenti\\nInquietudine e agitazione mentale\\nStanchezza al risveglio\\nAnsia\\nTrattamento in MTC:\\nL'obiettivo del trattamento in MTC sarebbe di ristabilire il flusso armonioso di Qi e Sangue, ridurre la tensione mentale e rafforzare il Shen. Questo potrebbe essere ottenuto attraverso l'auricoloterapia, l'uso di agopuntura e fitoterapia specifica. La terapia mirerebbe a sbloccare l'energia stagnante, promuovere il rilassamento e migliorare la qualità del sonno.\\n\\nPiano di Cura:\\nUn piano di trattamento potrebbe includere sessioni regolari di auricoloterapia, trattamenti di agopuntura mirati, consigli sulla gestione dello stress come la meditazione e il rilassamento, nonché prescrizioni di erbe cinesi personalizzate per rafforzare il Qi, il Sangue e il Shen.\"}",
						"Prescrizione": "Auricoloterapia:\nSottoporsi a sessioni settimanali di auricoloterapia per un totale di 6-8 settimane. Durante queste sessioni, verranno stimolati i punti auricolari correlati al rilassamento, al sonno e alla riduzione dell'ansia. L'auricoloterapeuta valuterà la risposta del corpo e regolerà il trattamento di conseguenza.\n\nTerapia Cognitivo-Comportamentale per l'Insonnia (CBT-I):\nPartecipare a un programma di terapia cognitivo-comportamentale per l'insonnia. Questo programma prevede sessioni settimanali durante le prime 4-6 settimane, seguite da sessioni di follow-up a cadenza quindicinale. La CBT-I mira a migliorare l'igiene del sonno, ad affrontare i pensieri negativi legati al sonno e a stabilire un regime regolare di sonno-veglia.\n\nStrategie di Gestione dello Stress:\nPraticare tecniche di rilassamento come la meditazione e la respirazione profonda almeno 10-15 minuti al giorno, preferibilmente prima di coricarsi. Queste pratiche possono aiutare a ridurre l'ansia e a preparare il corpo per il sonno.\n\nRaccomandazioni per lo Stile di Vita:\n\nEvitare il consumo di caffeina e alcol nel pomeriggio e alla sera.\nLimitare l'uso di dispositivi elettronici prima di coricarsi.\nMantenere un ambiente di sonno confortevole, con luce tenue e temperatura adeguata.\nEvitare pasti pesanti poco prima di andare a letto.\nFollow-up:\nSarà programmato un follow-up a distanza di 8 settimane per valutare la risposta al trattamento e apportare eventuali modifiche. Si prega di tenere un diario del sonno e annotare eventuali miglioramenti o cambiamenti.\n\nNote Aggiuntive:\nSi prega di seguire le indicazioni fornite dal terapeuta auricoloterapista e dal terapeuta CBT-I. In caso di effetti collaterali o preoccupazioni, contattare immediatamente il medico.",
						"puntiMTC": [],
						"puntiAuricolari": [
							{
								"s": "003",
								"n": "Apice del padiglione auricolare",
								"z": "",
								"e": "",
								"t": ""
							},
							{
								"s": "013",
								"n": "Ansia di Romoli",
								"z": "",
								"e": "",
								"t": ""
							},
							{
								"s": "230",
								"n": "Master Cerebral Point",
								"z": "",
								"e": "",
								"t": ""
							},
							{
								"s": "195",
								"n": "Epifisi",
								"z": "",
								"e": "",
								"t": ""
							}
						],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Difficoltà ad addormentarsi",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Risvegli notturni frequenti",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Inquietudine e agitazione mentale",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Stanchezza al risveglio",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANSIA",
								"score": 10
							}
						],
						"gallery": [
							{
								"idFile": "file_1692134504542",
								"Dida": ""
							}
						],
						"TimeTrattamento": 0,
						"oraInizio": -1,
						"oraFine": -1,
						"DataModifica": 1692134508,
						"LabelCiclo": "Es Ciclo Auricolo terapia per Insonnia",
						"TipoTrattamento": "A",
						"CostoTrattamento": 0,
						"ordine": 2,
						"Cancellato": 0,
						"frv": true
					},
					{
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Seduta 1: Valutazione iniziale e rilassamento",
						"TestoTrattamento": "Durata: 45 minuti\n\nDurante la prima seduta, il paziente viene accolto e sottoposto a una breve valutazione della sua storia clinica e dei sintomi legati all'insonnia. L'auricoloterapeuta spiega il processo di trattamento e posiziona delicatamente piccoli aghi o semi sulla mappa auricolare corrispondente ai punti che possono influenzare il sonno e il rilassamento. \nIl paziente viene quindi lasciato a rilassarsi per 20-30 minuti, durante i quali viene incoraggiato a concentrarsi sulla respirazione profonda e a svuotare la mente.",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [
							{
								"s": "045",
								"n": "Insomnie 1",
								"z": "ago",
								"e": "D",
								"t": ""
							},
							{
								"s": "245",
								"n": "Insonnia 2",
								"z": "ago",
								"e": "D",
								"t": ""
							}
						],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Difficoltà ad addormentarsi",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Risvegli notturni frequenti",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Inquietudine e agitazione mentale",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Stanchezza al risveglio",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANSIA",
								"score": 9
							}
						],
						"gallery": [],
						"TimeTrattamento": 1692050400,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692177913,
						"LabelCiclo": "Es Ciclo Auricolo terapia per Insonnia",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Seduta 2: Stimolazione dei punti del sonno",
						"TestoTrattamento": "Nella seconda seduta, l'auricoloterapeuta esamina l'evoluzione del paziente dalla seduta precedente e procede con una stimolazione più mirata dei punti auricolari correlati al sonno. Gli aghi o i semi vengono posizionati con maggiore precisione, concentrandosi su punti specifici associati al miglioramento dell'insonnia. Il paziente viene nuovamente lasciato a rilassarsi mentre gli aghi agiscono.",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [
							{
								"s": "045",
								"n": "Insomnie 1",
								"z": "ago",
								"e": "",
								"t": ""
							},
							{
								"s": "245",
								"n": "Insonnia 2",
								"z": "ago",
								"e": "",
								"t": ""
							}
						],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Difficoltà ad addormentarsi",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Risvegli notturni frequenti",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Inquietudine e agitazione mentale",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Stanchezza al risveglio",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANSIA",
								"score": 9
							}
						],
						"gallery": [],
						"TimeTrattamento": 1692568800,
						"oraInizio": 132,
						"oraFine": 144,
						"DataModifica": 1692177897,
						"LabelCiclo": "Es Ciclo Auricolo terapia per Insonnia",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": " Seduta 3: Equilibrio energetico",
						"TestoTrattamento": "Durata: 50 minuti\n\nNella terza seduta, l'auricoloterapeuta continua a regolare la stimolazione dei punti auricolari, concentrandosi sull'equilibrio energetico del paziente. Vengono considerati anche fattori di stress o ansia che possono contribuire all'insonnia. Durante questa seduta, il paziente potrebbe anche ricevere consigli su tecniche di gestione dello stress e del rilassamento da applicare anche a casa.",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [
							{
								"s": "045",
								"n": "Insomnie 1",
								"z": "ago",
								"e": "D",
								"t": ""
							},
							{
								"s": "245",
								"n": "Insonnia 2",
								"z": "ago",
								"e": "D",
								"t": ""
							},
							{
								"s": "000",
								"n": "Punto Zero",
								"z": "seme_vaccaria",
								"e": "",
								"t": ""
							}
						],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Difficoltà ad addormentarsi",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Risvegli notturni frequenti",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Inquietudine e agitazione mentale",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Stanchezza al risveglio",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANSIA",
								"score": 7
							}
						],
						"gallery": [],
						"TimeTrattamento": 1692914400,
						"oraInizio": 126,
						"oraFine": 144,
						"DataModifica": 1692177857,
						"LabelCiclo": "Es Ciclo Auricolo terapia per Insonnia",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Seduta 4: Consolidamento del progresso",
						"TestoTrattamento": "Durata: 45 minuti\n\nNella quarta seduta, il paziente e l'auricoloterapeuta valutano insieme i progressi finora ottenuti. Il paziente potrebbe riportare un miglioramento della qualità del sonno, una maggiore durata del sonno o una minore frequenza dei risvegli notturni. L'auricoloterapeuta adatta il trattamento in base a questi risultati e continua a stimolare i punti auricolari coinvolti nel miglioramento del sonno.",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [
							{
								"s": "045",
								"n": "Insomnie 1",
								"z": "ago",
								"e": "",
								"t": ""
							},
							{
								"s": "245",
								"n": "Insonnia 2",
								"z": "ago",
								"e": "",
								"t": ""
							},
							{
								"s": "000",
								"n": "Punto Zero",
								"z": "seme_vaccaria",
								"e": "",
								"t": ""
							}
						],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Difficoltà ad addormentarsi",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Risvegli notturni frequenti",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Inquietudine e agitazione mentale",
								"score": 5
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Stanchezza al risveglio",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANSIA",
								"score": 7
							}
						],
						"gallery": [],
						"TimeTrattamento": 1693432800,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692178254,
						"LabelCiclo": "Es Ciclo Auricolo terapia per Insonnia",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Seduta 5: Mantenimento e conclusioni",
						"TestoTrattamento": "Nell'ultima seduta del ciclo, l'attenzione si sposta sul mantenimento dei progressi ottenuti. L'auricoloterapeuta potrebbe suggerire un piano di trattamento a lungo termine, che potrebbe includere visite periodiche per mantenere i benefici ottenuti. Il paziente viene incoraggiato a continuare a praticare tecniche di rilassamento e a gestire lo stress nella vita quotidiana.",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [
							{
								"s": "045",
								"n": "Insomnie 1",
								"z": "ago",
								"e": "",
								"t": ""
							},
							{
								"s": "245",
								"n": "Insonnia 2",
								"z": "dito",
								"e": "",
								"t": ""
							},
							{
								"s": "000",
								"n": "Punto Zero",
								"z": "seme_vaccaria",
								"e": "",
								"t": ""
							}
						],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Difficoltà ad addormentarsi",
								"score": 2
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Risvegli notturni frequenti",
								"score": 0
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Inquietudine e agitazione mentale",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Stanchezza al risveglio",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANSIA",
								"score": 5
							}
						],
						"gallery": [],
						"TimeTrattamento": 1693864800,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692178379,
						"LabelCiclo": "Es Ciclo Auricolo terapia per Insonnia",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					}
				],
				"saldi": [
					{
						"idSaldo": 0,
						"idPaziente": 0,
						"MotivoSaldo": "Trattamento Agopuntura",
						"RicevutaSaldo": "2",
						"ValoreSaldo": 150,
						"DataSaldo": 1674860400,
						"DataModifica": 1691909111,
						"Cancellato": 0,
						"frv": true
					},
					{
						"idSaldo": 0,
						"idPaziente": 0,
						"MotivoSaldo": "Trattamento Shiatsu",
						"RicevutaSaldo": "1",
						"ValoreSaldo": 50,
						"DataSaldo": 1674428400,
						"DataModifica": 1691909111,
						"Cancellato": 0,
						"frv": true
					},
					{
						"idSaldo": 0,
						"idPaziente": 0,
						"MotivoSaldo": "Trattamento agopuntura, anticipo",
						"RicevutaSaldo": "3",
						"ValoreSaldo": 150,
						"DataSaldo": 1675119600,
						"DataModifica": 1691909111,
						"Cancellato": 0,
						"frv": true
					},
					{
						"idSaldo": 0,
						"idPaziente": 0,
						"MotivoSaldo": "Saldo trattamento",
						"RicevutaSaldo": "5",
						"ValoreSaldo": 150,
						"DataSaldo": 1692136800,
						"DataModifica": 1692183527,
						"Cancellato": 0,
						"frv": true
					}
				],
				"Cancellato": 0,
				"frv": true
			}
		],
		servizi: [
			{
				"idServizio": 0,
				"NomeServizio": "Ciclo di Auricoloterapia per smettere di fumare",
				"DescrizioneServizio": "L'agopuntura è efficace nell'interrompere la dipendenza da nicotina.\n\nIl trattamento si basa sull'analisi completa dei sintomi di astinenza e mira a bilanciare le energie del corpo per migliorare la salute.\n\nL'agopuntura può aiutare chi desidera smettere di fumare, riducendo il desiderio della sigaretta, l'ansia e la necessità del rituale associato alla sigaretta. Il trattamento permette di determinare una sensazione di disgusto del sapore e dell'odore della sigaretta.\n\nSe il soggetto è intenzionato a smettere di fumare, già al terzo o quarto trattamento si vedono gli effetti benefici.\n\nIl protocollo classico, messo a punto da P. Nogier è della durata di 15-20 minuti in un'unica seduta e richiede l'astinenza di almeno 6 ore prima del trattamento.\n",
				"CostoServizio": 150,
				"NumeroSedute": 5,
				"DataModifica": 1674490894,
				"DataCreazione": 1674490810,
				"Cancellato": 0,
				"frv": true
			},
			{
				"idServizio": 0,
				"NomeServizio": "Ciclo Shiatsu per l'ansia",
				"DescrizioneServizio": "L'emotività di ogni persona è soggettiva e si manifesta nei modi più inverosimili, una scarsa autostima di fondo può indurre una persona a pensare di non farcela a superare prove che la vita ci pone davanti. Uno stress accentuato che va a ledere la nostra calma e ci può portare ad andare in \"tilt\" ed ecco apparire l'ansia, la paura, il famoso attacco di panico. Come sintomo in fase acuta si possono avere tachicardia, respirazione affannosa, paura con conseguente scarica di adrenalina, una sensazione molto sgradevole anche perché le crisi a volte arrivano improvvise, senza preavviso, e chi ne è colpito vive nel terrore di entrare nella fase di \"Terrore\".\n\nSe lo stato di angoscia è profondo, grave e permanente allora necessita dell'intervento di uno specialista.\n",
				"CostoServizio": 50,
				"NumeroSedute": 5,
				"DataModifica": 1674490934,
				"DataCreazione": 1674490895,
				"Cancellato": 0,
				"frv": true
			},
			{
				"idServizio": 0,
				"NomeServizio": "Ciclo Agopuntura per Bruxismo",
				"DescrizioneServizio": "Il bruxismo si riferisce a una condizione in cui si digrignano i denti, strofinando l'arcata superiore contro quella inferiore mentre si stringono le mascelle con una certa forza.\n\nIl bruxismo è una condizione abbastanza comune che dipende dalla contrazione involontaria dei muscoli masticatori.\n\nSi verifica principalmente di notte e può causare una serie di conseguenze: usura dei denti, dolore alla mascella, mal di testa.",
				"CostoServizio": 100,
				"NumeroSedute": 5,
				"DataModifica": 1674491088,
				"DataCreazione": 1674490935,
				"Cancellato": 0,
				"frv": true
			},
			{
				"idServizio": 0,
				"NomeServizio": "Guida al Servizio",
				"DescrizioneServizio": "In questa sezione hai la possibilità di pre-caricare i servizi che proponi abitualmente ai tuoi clienti/pazienti.\n\nAggiungendo il prezzo ed il numero di sedute del servizio, velocizzerai l'operazione di inserimento.\n\nAd esempio il \"Pacchetto\"  anti tabacco, insonnia, allergia, riequilibrio del Qi....\nCosto a seduta 150€\nNumero sedute: 5\n\n",
				"CostoServizio": 1,
				"NumeroSedute": 1,
				"DataModifica": 1674491592,
				"DataCreazione": 1674491089,
				"Cancellato": 0,
				"frv": true
			}
		],
		fornitori: [
			{
				"idFornitore": 0,
				"RagioneSociale": "Aghi & Punti",
				"Intestazione": "Aghi&Aghi Srl\nvia Italia 96\nRoma",
				"PartitaIva": "0698765432",
				"CodiceFiscale": "ghagha84r16d200r",
				"Indirizzo": "via Italia 96",
				"CAP": "10000",
				"Citta": "Roma",
				"Provincia": "Roma",
				"Stato": "it",
				"Telefono": "06123456",
				"Email": "aghi@mail.com",
				"NoteFornitore": "Fornitore Aghi per agopuntura.\nConsulente per gli ordini Sig. Angelo Spinoso\nOrdini superiori a 100€, sconto 20%",
				"etichette": [],
				"DataModifica": 1629780089,
				"DataCreazione": 1629779932,
				"Cancellato": 0,
				"frv": true
			},
			{
				"idFornitore": 0,
				"RagioneSociale": "Arredamenti Ambulatori Srl",
				"Intestazione": "Spett. Arredamenti Ambulatori srl\nVia Milano 113\nMilano",
				"PartitaIva": "06987653245",
				"CodiceFiscale": "RRDMBL84R16D111A",
				"Indirizzo": "Via Milano 113",
				"CAP": "10000",
				"Citta": "Milano",
				"Provincia": "MI",
				"Stato": "it",
				"Telefono": "3486851418",
				"Email": "arredamentiambulatori@mail.com",
				"NoteFornitore": "Fornitore all'ingrosso di materiale per ambulatori.\nContatto agente Sig. Rossi Mario\nFattura 90gg\nOttimi prezzi e qualità",
				"etichette": [
					{
						"idEtichetta": 0,
						"NomeEtichetta": "Facebook",
						"ValoreEtichetta": "@arredamentiambulatori",
						"sezione": "contatti"
					},
					{
						"idEtichetta": 0,
						"NomeEtichetta": "Instagram",
						"ValoreEtichetta": "@arreda_abulatori",
						"sezione": "contatti"
					}
				],
				"DataModifica": 1629780672,
				"DataCreazione": 1629780090,
				"Cancellato": 0,
				"frv": true
			}
		]
	},	
	eng: {
		pazienti: [
			{
				"idPaziente": 0,
				"Nome": "Demo Client",
				"Cognome": "IAOMAI",
				"Indirizzo": "1 Market St.",
				"CAP": "94105-1420",
				"Citta": "San Francisco",
				"Provincia": "CA",
				"Stato": "us",
				"Telefono": "",
				"Cellulare": "3486851418",
				"paeseCellulare": "us",
				"Email": "app@iaomai.app",
				"sesso": "m",
				"NotePaziente": "He was admitted on January 23, 20xx for an initial heart attack.\nSemi-kyphotic posture.\nTravels extensively for work, often leading to acute stress states.\nHypochondriac tendency.",
				"DataNascita": "1984-10-16",
				"LuogoNascita": "San Francisco",
				"tags": [
					{
						"idTag": 0,
						"NomeTag": "1ª Shiatsu",
						"colore": "d7dafb"
					},
					{
						"idTag": 0,
						"NomeTag": "Acupuncture",
						"colore": "fbd7d7"
					},
					{
						"idTag": 0,
						"NomeTag": "Auriculotherapy",
						"colore": "d7f5fb"
					}
				],
				"etichette": [
					{
						"idEtichetta": 0,
						"NomeEtichetta": "Practiced sport:",
						"ValoreEtichetta": "Nuoto",
						"sezione": "aggiuntive"
					},
					{
						"idEtichetta": 0,
						"NomeEtichetta": "Contact preferably:",
						"ValoreEtichetta": "Dopo le ore 17.",
						"sezione": "aggiuntive"
					},
					{
						"idEtichetta": 0,
						"NomeEtichetta": "Website",
						"ValoreEtichetta": "www.iaomai.app",
						"sezione": "contatti"
					},
					{
						"idEtichetta": 0,
						"NomeEtichetta": "Social network:",
						"ValoreEtichetta": "https://www.facebook.com/profile.php?id=100089849462315",
						"sezione": "contatti"
					}
				],
				"medicine": [
					{
						"idMedicina": 0,
						"NomeMedicina": "Ibuprofen"
					},
					{
						"idMedicina": 0,
						"NomeMedicina": "Ketoprofen"
					},
					{
						"idMedicina": 0,
						"NomeMedicina": "Naproxen"
					}
				],
				"allergie": [
					{
						"idAllergia": 0,
						"NomeAllergia": "Gluten intolerant"
					},
					{
						"idAllergia": 0,
						"NomeAllergia": "Nickel food"
					},
					{
						"idAllergia": 0,
						"NomeAllergia": "Cat hair"
					}
				],
				"patologie": [
					{
						"idPatologia": 0,
						"NomePatologia": "ANXIETY"
					},
					{
						"idPatologia": 0,
						"NomePatologia": "L4-L5 Prolapse"
					},
					{
						"idPatologia": 0,
						"NomePatologia": "Hypertension"
					},
					{
						"idPatologia": 0,
						"NomePatologia": "Rheumatoid arthritis"
					},
					{
						"idPatologia": 0,
						"NomePatologia": "Allergy"
					},
					{
						"idPatologia": 0,
						"NomePatologia": "Bronchial asthma"
					}
				],
				"interventi": [
					{
						"idIntervento": 0,
						"NomeIntervento": "MENISCUS AND LIGAMENTS LEFT"
					},
					{
						"idIntervento": 0,
						"NomeIntervento": "ADDITIVE MAMMOPLASTY"
					},
					{
						"idIntervento": 0,
						"NomeIntervento": "Pending L4-L5 hernia surgery"
					}
				],
				"gallery": [
					{
						"idFile": "file_2674427029613",
						"Dida": ""
					},
					{
						"idFile": "file_2674427069354",
						"Dida": ""
					}
				],
				"Provenienza": "Word of mouth",
				"Professione": "Employee",
				"Intestazione": "",
				"CodiceFiscale": "",
				"PartitaIva": "",
				"Social": "Facebook",
				"avatar": "data:image/jpeg;base64,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",
				"Altezza": "175",
				"Peso": "65",
				"DataModifica": 1694960504,
				"trattamenti": [
					{//*1
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Shiatsu Treatment - Lower Limb Stiffness",
						"TestoTrattamento": "Arrived at the facility, CLIENT DEMO chooses to undergo a Shiatsu treatment to alleviate pain in the lower limbs.\n\nAfter an initial interview, many interesting aspects of the CLIENT's personality emerge. \nThe thing that strikes me the most is their pain tolerance. The pain threshold is well above average.\n\nPartial evaluation of the Tendino-Muscular Meridians highlights:\nEmpty VU;\nEmpty R;\nPainful VB on the right leg.\n\nShu zone evaluation shows:\nEmpty P;\nFull F;\nHard kidney area;\nPain on VU.\n\n---------------\n\nAfter the treatment, CLIENT DEMO feels significantly better to the point that they do not feel the need to replicate a new treatment. We will stay in touch for any possible relapse.\n",
						"Prescrizione": "Possibility of work for a personal understanding of the body and its dynamics in terms of TCM.",
						"puntiMTC": [
							{
								"n": 13,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Lung Shu Point",
								"s": "13.BL"
							},
							{
								"n": 14,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Paricardium Shu Point",
								"s": "14.BL"
							},
							{
								"n": 15,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Heart Shu Point",
								"s": "15.BL"
							},
							{
								"n": 18,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Liver Shu Point",
								"s": "18.BL"
							},
							{
								"n": 19,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Gallbladder Shu Point",
								"s": "19.BL"
							},
							{
								"n": 20,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Spleen Shu Point",
								"s": "20.BL"
							},
							{
								"n": 21,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Stomach Shu Point",
								"s": "21.BL"
							},
							{
								"n": 22,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Triple Burner Shu Point",
								"s": "22.BL"
							},
							{
								"n": 23,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Kidney Shu Point",
								"s": "23.BL"
							},
							{
								"n": 25,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Large Intestine Shu Point",
								"s": "25.BL"
							},
							{
								"n": 27,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Small Intestine Shu Point",
								"s": "27.BL"
							},
							{
								"n": 28,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Bladder Shu Point",
								"s": "28.BL"
							},
							{
								"n": 1,
								"m": "LU",
								"e": "",
								"z": "",
								"t": "Lung BO Point",
								"s": "1.LU"
							},
							{
								"n": 17,
								"m": "CV",
								"e": "",
								"z": "",
								"t": "Heart Master BO Point",
								"s": "17.CV"
							},
							{
								"n": 14,
								"m": "LR",
								"e": "",
								"z": "",
								"t": "Liver BO Point",
								"s": "14.LR"
							},
							{
								"n": 24,
								"m": "GB",
								"e": "D",
								"z": "",
								"t": "Gallbladder BO Point",
								"s": "24.GB"
							},
							{
								"n": 14,
								"m": "CV",
								"e": "",
								"z": "",
								"t": "Heart BO Point",
								"s": "14.CV"
							},
							{
								"n": 12,
								"m": "CV",
								"e": "",
								"z": "",
								"t": "Stomach BO Point",
								"s": "12.CV"
							},
							{
								"n": 13,
								"m": "LR",
								"e": "P",
								"z": "",
								"t": "Spleen BO Point",
								"s": "13.LR"
							},
							{
								"n": 25,
								"m": "GB",
								"e": "",
								"z": "",
								"t": "Kidney BO Point",
								"s": "25.GB"
							},
							{
								"n": 25,
								"m": "ST",
								"e": "P",
								"z": "",
								"t": "MORE HYPERACTIVE RIGHT POINT",
								"s": "25.ST"
							},
							{
								"n": 5,
								"m": "CV",
								"e": "V",
								"z": "",
								"t": "Triple Burner BO Point",
								"s": "5.CV"
							},
							{
								"n": 4,
								"m": "CV",
								"e": "",
								"z": "",
								"t": "Small Intestine BO Point",
								"s": "4.CV"
							},
							{
								"n": 3,
								"m": "CV",
								"e": "V",
								"z": "",
								"t": "Bladder BO Point",
								"s": "3.CV"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "KI",
								"NomeMeridiano": "Kidney",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Gallbladder",
								"valEnergetica": "D"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "LOWER LIMB STIFFNESS",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "COLD HANDS ",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "STRESS",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "HYPOCHONDRIA",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "HEADACHE",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "SLEEP QUALITY",
								"score": 4
							}
						],
						"gallery": [
							{
								"idFile": "file_2674467779004",
								"Dida": ""
							},
							{
								"idFile": "file_2674467791995",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1672527600,
						"oraInizio": 120,
						"oraFine": 144,
						"DataModifica": 1691909111,
						"LabelCiclo": "",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*2
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Anamnesis",
						"TestoTrattamento": "{\"AnamnesiMotivo\":\"The Client Demo Iaomai, comes to me to start a cycle of shiatsu treatments to try to solve a series of anxiety-related disorders that he has been suffering from for years.\\n\\nHe complains of difficulty falling asleep for some time, and wakes up very tired in the morning.\\nThe symptoms worsen in proportion to the work-related stress.\\nSweating, recurring and obsessive thoughts, and rumination often occur during the night.\\n\\nDuring the day, the accumulation of stress is somatically manifested in the lower back area, particularly at the level of the kidneys.\\nFor a few weeks now, the urine has been scant and dark, he complains of dryness in the mouth and a feeling of heaviness in the head; occasionally, slight tinnitus appears.\\n\\nBitter taste in the mouth is recurrent\\n\",\"AnamnesiDiagnosiOccidentale\":\"The emotional state of each person is subjective and manifests itself in the most unlikely ways, a basic lack of self-esteem can lead a person to think that they cannot overcome the trials that life puts in front of us. Pronounced stress that damages our calm can lead us to go into \\\"tilt\\\" and here comes anxiety, fear, the famous panic attack. As a symptom in the acute phase, tachycardia, labored breathing, fear with consequent adrenaline rush, a very unpleasant sensation also because the crises sometimes come suddenly, without warning, and those who are affected live in terror of entering the \\\"Terror\\\" phase.\\nIf the state of anguish is deep, severe, and permanent, then the intervention of a specialist is necessary.\",\"AnamnesiDiagnosiMTC\":\"T.C.M.\\nAnxiety, fear, anguish, and hyperemotivity are considered an excess of Qi in the Heart and Master of the heart meridians, which must regulate the tone of the cardiac plexus.\\nIf the pathology is chronic, it may also be related to other meridians.\\n\\n\"}",
						"Prescrizione": "Therapy\nDisperse and regulate the Qi in the Heart and Master of the heart meridians,\nRestore communication between Heart and Kidney - Shao Yin Energetic Level -\nCalm the Shen",
						"puntiMTC": [
							{
								"n": "03",
								"m": "KI",
								"e": "V",
								"z": "",
								"t": "",
								"s": "3.KI"
							},
							{
								"n": "36",
								"m": "ST",
								"e": "P",
								"z": "",
								"t": "on the right leg more interactive than the left leg. ",
								"s": "36.ST"
							},
							{
								"n": "04",
								"m": "LI",
								"e": "D",
								"z": "coppetta",
								"t": "",
								"s": "04.LI"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "KI",
								"NomeMeridiano": "Kidney",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "ST",
								"NomeMeridiano": "Stomach",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Urinary bladder",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Gallbladder",
								"valEnergetica": "V"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "HYPOCHONDRIA",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "STRESS",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "COLD HANDS ",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "HEADACHE",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "INSOMNIA",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANXIETY",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "DRY MOUTH",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "BITTER TASTE IN THE MOUTH",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "RECURRING NIGHTMARES AND THOUGHTS",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "PAIN WHILE URINATING",
								"score": 7
							}
						],
						"gallery": [
							{
								"idFile": "file_2674478724650",
								"Dida": ""
							},
							{
								"idFile": "file_2674478728149",
								"Dida": ""
							},
							{
								"idFile": "file_2674478731260",
								"Dida": ""
							}
						],
						"TimeTrattamento": 0,
						"oraInizio": -1,
						"oraFine": -1,
						"DataModifica": 1694960504,
						"LabelCiclo": "Shiatsu Cycle - Anxiety ",
						"TipoTrattamento": "A",
						"CostoTrattamento": 0,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*3
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Anamnesis",
						"TestoTrattamento": "{\"AnamnesiMotivo\":\"Medical History:\\n\\n-Current Symptoms:\\n\\nThe patient has reported symptoms of lumbosciatica, including stabbing pain in the lumbar region and tingling down the right leg.\\nThe symptoms began about 6 weeks ago.\\n\\n-Triggering Events:\\n\\nThe patient indicated improper lifting of heavy objects as a possible cause of the symptoms.\\n\\n-Medical History:\\n\\nThe patient has a history of pre-existing spinal issues, such as a mild disc herniation in the lumbar area.\\nHe has received chiropractic treatments in the past to manage the symptoms.\\n\\n-Medications and Supplements:\\n\\nThe patient is currently taking ibuprofen to relieve pain.\\n\\n-Surgical History:\\n\\nThe patient has not undergone any back or lumbar surgeries in the past.\\n\\n-Allergies and Intolerances:\\n\\nThe patient has declared an allergy to penicillin.\\n\\n>Lifestyle and Risk Factors:\\n\\n-Physical Activity:\\n\\nThe patient has described his level of physical activity as moderate, with regular walks.\\n\\n-Posture and Daily Habits:\\n\\nThe patient primarily works on the computer and is aware of having a suboptimal posture during work.\\n\\n-Stress and Psychological Factors:\\n\\nThe patient mentioned work-related stress levels that could impact lumbosciatica.\\n\\n-Treatment Goals:\\n\\nThe patient has expressed a desire to reduce pain in the lumbar region and improve mobility.\\n\\n-Additional Notes:\\n\\nDuring the consultation, the patient emphasized the importance of finding a treatment with a more natural approach than long-term medication use.\\n\",\"AnamnesiDiagnosiOccidentale\":\"The CLIENTE DEMO IAOMAI presents a condition of lumbosciatica, characterized by pain in the lumbar area and tingling along the course of the sciatic nerve. The condition seems to be related to a possible irritation of the sciatic nerve, likely triggered by improper lifting and exacerbated by the presence of a lumbar disc herniation.\",\"AnamnesiDiagnosiMTC\":\"Based on the analysis of symptoms and risk factors, the lumbosciatica of CLIENTE DEMO IAOMAI may be related to 'Obstruction of Qi and Blood in the Lumbar Region' according to the principles of Traditional Chinese Medicine. The accumulation of stress, incorrect posture, and improper lifting may have contributed to this condition, hindering the harmonious flow of Qi and Blood along the meridians of the lumbar area.\\n\\nFrom the perspective of TCM, the goal of the treatment will be to remove the obstacle, promote the circulation of Qi and Blood, and restore the energetic balance in the involved meridians.\\n\"}",
						"Prescrizione": "• A stagnation is evident in the gallbladder meridian because it mobilizes the Qi being the shaoyang level that allows the movement of both yang and yin energy. \n• Moxa on 25VB, Ren Mu point that allows the birth of yang. \n• Moxa on 31VB, wind point indicated for stagnation. \n• 34VB, muscle meeting point, according to Leung KwokPo treats the muscle as capable of inducing 'movement'. \n• Important points that mobilize blood on the bladder meridian 17BL, 40BL, 32 BL, and 53BL \n• LV3, earth and yuan shu point that moves the blood. \n• Yao fa to mobilize the lumbar area.",
						"puntiMTC": [
							{
								"n": 31,
								"m": "GB",
								"e": "D",
								"z": "",
								"t": "Tender to the touch",
								"s": "31.GB"
							},
							{
								"n": 25,
								"m": "KI",
								"e": "D",
								"z": "",
								"t": "Tender to the touch",
								"s": "25.KI"
							},
							{
								"n": 21,
								"m": "GB",
								"e": "P",
								"z": "",
								"t": "",
								"s": "21.GB.."
							},
							{
								"n": 30,
								"m": "GB",
								"e": "P",
								"z": "",
								"t": "",
								"s": "30.GB.."
							},
							{
								"n": 34,
								"m": "GB",
								"e": "D",
								"z": "",
								"t": "Tender to the touch",
								"s": "34.GB"
							},
							{
								"n": 43,
								"m": "GB",
								"e": "D",
								"z": "",
								"t": "Tender to the touch",
								"s": "43.GB"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Gallbladder",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "KI",
								"NomeMeridiano": "Kidney",
								"valEnergetica": "D"
							},
							{
								"siglaMeridiano": "ST",
								"NomeMeridiano": "Stomach",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Lower back pain",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Tingling and numbness",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Muscle weakness",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Worsening with movement",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Limited movement",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Pain during the session",
								"score": 8
							}
						],
						"gallery": [
							{
								"idFile": "file_2674469901174",
								"Dida": ""
							},
							{
								"idFile": "file_2674469904750",
								"Dida": ""
							},
							{
								"idFile": "file_2674469909751",
								"Dida": ""
							}
						],
						"TimeTrattamento": 0,
						"oraInizio": -1,
						"oraFine": -1,
						"DataModifica": 1692183228,
						"LabelCiclo": "Acupuncture Cycle for Sciatica",
						"TipoTrattamento": "A",
						"CostoTrattamento": 0,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*4
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Session 1: Initial Assessment and Relaxation",
						"TestoTrattamento": "Duration: 45 minutes\n\nDuring the first session, the patient is welcomed and undergoes a detailed assessment of their medical history and symptoms associated with sciatica. The acupuncturist explains the treatment process and identifies key acupuncture points to address. The acupuncturist inserts fine needles into specific points along the meridians related to sciatica. The patient is then left to relax for approximately 20-30 minutes.",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 23,
								"m": "BL",
								"e": "D",
								"z": "ago",
								"t": "Kidney Shu Point",
								"s": "23.BL"
							},
							{
								"n": 32,
								"m": "BL",
								"e": "P",
								"z": "ago",
								"t": "",
								"s": "32.BL"
							},
							{
								"n": 8,
								"m": "BL",
								"e": "D",
								"z": "ago",
								"t": "",
								"s": "8.BL"
							},
							{
								"n": 30,
								"m": "BL",
								"e": "P",
								"z": "ago",
								"t": "",
								"s": "30.BL"
							},
							{
								"n": 4,
								"m": "CV",
								"e": "V",
								"z": "ago",
								"t": "Small Intestine BO Point",
								"s": "4.CV"
							},
							{
								"n": 4,
								"m": "SP",
								"e": "V",
								"z": "ago",
								"t": "",
								"s": "4.SP"
							},
							{
								"n": 31,
								"m": "GB",
								"e": "D",
								"z": "ago",
								"t": "",
								"s": "31.GB"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Urinary bladder",
								"valEnergetica": "D",
								"descrizione": "Tender to the touch"
							},
							{
								"siglaMeridiano": "KI",
								"NomeMeridiano": "Kidney",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Gallbladder",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Lower back pain",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Tingling and numbness",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Muscle weakness",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Worsening with movement",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Limitation of movement",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Pain during the session",
								"score": 10
							}
						],
						"gallery": [
							{
								"idFile": "file_2674427029613",
								"Dida": ""
							},
							{
								"idFile": "file_2674427069354",
								"Dida": ""
							},
							{
								"idFile": "file_2674469909751",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1674428400,
						"oraInizio": 132,
						"oraFine": 144,
						"DataModifica": 1692183278,
						"LabelCiclo": "Acupuncture Cycle for Sciatica",
						"TipoTrattamento": "B",
						"CostoTrattamento": 150,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*5
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Session 2: Reducing Inflammation and Pain",
						"TestoTrattamento": "Duration: 40 minutes\n\nIn the second session, the acupuncturist assesses the patient's progress from the previous session and focuses on reducing the inflammation and pain associated with sciatica. The needles are placed to stimulate points that can help alleviate inflammation of the sciatic nerves and associated pain. The patient is once again left to relax while the needles take effect.",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 23,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "Kidney Shu Point",
								"s": "23.BL"
							},
							{
								"n": 32,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "32.BL"
							},
							{
								"n": 8,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "8.BL"
							},
							{
								"n": 30,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "30.BL"
							},
							{
								"n": 4,
								"m": "CV",
								"e": "",
								"z": "ago",
								"t": "Small Intestine BO Point",
								"s": "4.CV"
							},
							{
								"n": 4,
								"m": "SP",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "4.SP"
							},
							{
								"n": 31,
								"m": "GB",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "31.GB"
							},
							{
								"n": 12,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "12.BL"
							},
							{
								"n": 40,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "40.BL"
							},
							{
								"n": 60,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "60.BL"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Urinary bladder",
								"valEnergetica": "D"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Gallbladder",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "ST",
								"NomeMeridiano": "Stomach",
								"valEnergetica": "P",
								"descrizione": "Palm treatment for obsessive thoughts"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Lower back pain",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Tingling and numbness",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Muscle weakness",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Worsening with movement",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Limitation of movement",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Pain during the session",
								"score": 9
							}
						],
						"gallery": [
							{
								"idFile": "file_2674467779004",
								"Dida": ""
							},
							{
								"idFile": "file_2674469909751",
								"Dida": ""
							},
							{
								"idFile": "file_2674475331170",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1675033200,
						"oraInizio": 132,
						"oraFine": 144,
						"DataModifica": 1692183307,
						"LabelCiclo": "Acupuncture Cycle for Sciatica",
						"TipoTrattamento": "B",
						"CostoTrattamento": 150,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*6
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Session 3: Improving Circulation and Energy Flow",
						"TestoTrattamento": "Duration: 50 minutes\n\nIn the third session, the acupuncturist continues to work on reducing pain and inflammation but also focuses on increasing blood circulation and energy flow in the affected area. Needles are placed to stimulate the energy flow along the meridians connected to the lower back and sciatic area.",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 8,
								"m": "GB",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "8.GB"
							},
							{
								"n": 20,
								"m": "GB",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "20.GB"
							},
							{
								"n": 22,
								"m": "GV",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "22.GV"
							},
							{
								"n": 10,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "10.BL"
							},
							{
								"n": 30,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "30.BL"
							},
							{
								"n": 23,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "PuntoShu di Rene",
								"s": "23.BL"
							},
							{
								"n": 32,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "32.BL"
							},
							{
								"n": 4,
								"m": "SP",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "4.SP"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Urinary bladder",
								"valEnergetica": "D"
							},
							{
								"siglaMeridiano": "ST",
								"NomeMeridiano": "Stomach",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Lower back pain",
								"score": 5
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Tingling and numbness",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Muscle weakness",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Worsening with movement",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Limitation of movement",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Pain during the session",
								"score": 7
							}
						],
						"gallery": [
							{
								"idFile": "file_2674469904750",
								"Dida": ""
							},
							{
								"idFile": "file_2674475331170",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1675638000,
						"oraInizio": 132,
						"oraFine": 144,
						"DataModifica": 1692183339,
						"LabelCiclo": "Acupuncture Cycle for Sciatica",
						"TipoTrattamento": "B",
						"CostoTrattamento": 150,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*7
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Session 4: Muscular and Postural Rebalancing",
						"TestoTrattamento": "Duration: 45 minutes\n\nIn the fourth session, the acupuncturist evaluates the patient's posture and muscles, seeking to identify any imbalances that may contribute to the lumbosciatalgia. Needles are inserted into points that help rebalance the muscles and improve posture. The patient may also receive advice on stretching or strengthening exercises to do at home.",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 20,
								"m": "GV",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "20.GV"
							},
							{
								"n": 7,
								"m": "HT",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "7.HT"
							},
							{
								"n": 20,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "Spleen Shu Point",
								"s": "20.BL"
							},
							{
								"n": 40,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "40.BL"
							},
							{
								"n": 60,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "60.BL"
							},
							{
								"n": 37,
								"m": "BL",
								"e": "",
								"z": "coppetta",
								"t": "",
								"s": "37.BL"
							},
							{
								"n": 38,
								"m": "BL",
								"e": "",
								"z": "coppetta",
								"t": "",
								"s": "38.BL"
							},
							{
								"n": 41,
								"m": "BL",
								"e": "",
								"z": "coppetta",
								"t": "",
								"s": "41.BL"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Urinary bladder",
								"valEnergetica": "D"
							},
							{
								"siglaMeridiano": "ST",
								"NomeMeridiano": "Stomach",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "CV",
								"NomeMeridiano": "Vaso concezione",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Lower back pain",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Tingling and numbness",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Muscle weakness",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Worsening with movement",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Limitation of movement",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Pain during the session",
								"score": 3
							}
						],
						"gallery": [
							{
								"idFile": "file_2674427069354",
								"Dida": ""
							},
							{
								"idFile": "file_2674469901174",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1676242800,
						"oraInizio": 132,
						"oraFine": 144,
						"DataModifica": 1692183366,
						"LabelCiclo": "Acupuncture Cycle for Sciatica",
						"TipoTrattamento": "B",
						"CostoTrattamento": 150,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*8
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Session 5: Maintenance and Future Planning",
						"TestoTrattamento": "Duration: 40 minutes\n\nIn the final session of the cycle, the acupuncturist discusses with the patient the progress made during the treatment. Focus is on maintaining the results and may propose a long-term treatment plan, with periodic visits to manage lumbosciatalgia symptoms over time. The patient is encouraged to continue following posture advice, exercises, and healthy habits.",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 23,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "Kidney Shu Point",
								"s": "23.BL"
							},
							{
								"n": 32,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "32.BL"
							},
							{
								"n": 30,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "30.BL"
							},
							{
								"n": 31,
								"m": "GB",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "31.GB"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Urinary bladder",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Gallbladder",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "ST",
								"NomeMeridiano": "Stomach",
								"valEnergetica": "D"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Lower back pain",
								"score": 2
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Tingling and numbness",
								"score": 1
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Muscle weakness",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Worsening with movement",
								"score": 2
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Limitation of movement",
								"score": 5
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Pain during the session",
								"score": 3
							}
						],
						"gallery": [
							{
								"idFile": "file_2674475391556",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1676847600,
						"oraInizio": 132,
						"oraFine": 144,
						"DataModifica": 1692183387,
						"LabelCiclo": "Acupuncture Cycle for Sciatica",
						"TipoTrattamento": "B",
						"CostoTrattamento": 150,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*9
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "First Anxiety Treatment",
						"TestoTrattamento": "The patient appears nervous and distrustful.\nHas not slept for two nights and is very concerned about the consequences of the COVID-19 pandemic.\n\nShiatsu pressure on the Urinary Bladder meridian from 11BL to 28BL, tonifying points 15BL and 20BL, respectively Heart and Spleen Shu points.\n\n- Shiatsu pressure on the entire Spleen meridian, pausing at points 6SP and 10SP, then continuing along the entire meridian to the chest.\n\n- Shiatsu pressure on the entire Heart meridian, pausing at point 7HT and continuing to point 9HT.\n\n- Shiatsu pressure on the Pericardium meridian.",
						"Prescrizione": "Shiatsu pressure on the Urinary Bladder meridian from 11BL to 28BL, tonifying points 15BL and 20BL, respectively Heart and Spleen Shu points.\n\n- Shiatsu pressure on the entire Spleen meridian, pausing at points 6SP and 10SP, then continuing along the entire meridian to the chest.\n\n- Shiatsu pressure on the entire Heart meridian, pausing at point 7HT and continuing to point 9HT.\n\n- Shiatsu pressure on the Pericardium meridian.",
						"puntiMTC": [
							{
								"n": 7,
								"m": "HT",
								"e": "",
								"z": "dito",
								"t": "",
								"s": "7.HT"
							},
							{
								"n": 6,
								"m": "PC",
								"e": "",
								"z": "dito",
								"t": "",
								"s": "6.PC"
							},
							{
								"n": 7,
								"m": "PC",
								"e": "",
								"z": "dito",
								"t": "",
								"s": "7.PC"
							},
							{
								"n": 20,
								"m": "GV",
								"e": "",
								"z": "coppetta",
								"t": "",
								"s": "20.GV"
							},
							{
								"n": 1,
								"m": "SP",
								"e": "",
								"z": "dito",
								"t": "",
								"s": "1.SP"
							},
							{
								"n": 11,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "11.BL"
							},
							{
								"n": 28,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "Bladder Shu Point",
								"s": "28.BL"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Urinary bladder",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "SP",
								"NomeMeridiano": "Spleen",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "HT",
								"NomeMeridiano": "Heart",
								"valEnergetica": "V"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "HYPOCHONDRIA",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "STRESS",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "COLD HANDS ",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "HEADACHE",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "INSOMNIA",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANXIETY",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "DRY MOUTH",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "BITTER TASTE IN THE MOUTH",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "RECURRING NIGHTMARES AND THOUGHTS",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "PAIN WHILE URINATING",
								"score": 6
							}
						],
						"gallery": [
							{
								"idFile": "file_2674478724650",
								"Dida": ""
							},
							{
								"idFile": "file_2674478728149",
								"Dida": ""
							},
							{
								"idFile": "file_2674478731260",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1674514800,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692049984,
						"LabelCiclo": "Shiatsu Cycle - Anxiety",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*10
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Second Anxiety Treatment",
						"TestoTrattamento": "IThe client reports experiencing an emotional shift compared to the previous week, however, the symptoms indicated in the medical history remain persistent. They complain of troublesome and frequent nocturnal palpitations, preceded by nightmares and obsessive thoughts.\n\nI decide to also incorporate stretching and Qi rebalancing techniques.\n\nTreatment:\nShiatsu palpation on the Urinary Bladder meridian from 11BL to 28BL, tonifying points 15BL and 20BL, respectively Heart and Spleen Shu points.\n\nShiatsu pressure on the entire Kidney meridian, pausing at 1KI and 3KI.\n\nShiatsu pressure on the entire Heart and Pericardium meridians, pausing at 8PC.\n\nAlso treated the Large Intestine meridian for the Noon Midnight regulation and for the tonification of Jin Fluids.",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 7,
								"m": "HT",
								"e": "P",
								"z": "dito",
								"t": "",
								"s": "7.HT"
							},
							{
								"n": 6,
								"m": "PC",
								"e": "D",
								"z": "dito",
								"t": "",
								"s": "6.PC"
							},
							{
								"n": 7,
								"m": "PC",
								"e": "D",
								"z": "dito",
								"t": "",
								"s": "7.PC"
							},
							{
								"n": 20,
								"m": "GV",
								"e": "V",
								"z": "moxa",
								"t": "",
								"s": "20.GV"
							},
							{
								"n": 6,
								"m": "SP",
								"e": "V",
								"z": "moxa",
								"t": "",
								"s": "6.SP"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Urinary bladder",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "SP",
								"NomeMeridiano": "Spleen",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "HT",
								"NomeMeridiano": "Heart",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "HYPOCHONDRIA",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "STRESS",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "COLD HANDS ",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "HEADACHE",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "INSOMNIA",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANXIETY",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "DRY MOUTH",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "BITTER TASTE IN THE MOUTH",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "RECURRING NIGHTMARES AND THOUGHTS",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "PAIN WHILE URINATING",
								"score": 4
							}
						],
						"gallery": [
							{
								"idFile": "file_2674478724650",
								"Dida": ""
							},
							{
								"idFile": "file_2674478728149",
								"Dida": ""
							},
							{
								"idFile": "file_2674478731260",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1675119600,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692049984,
						"LabelCiclo": "Shiatsu Cycle - Anxiety",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*11
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Third Anxiety Treatment",
						"TestoTrattamento": "he Demo Client Iaomai reports having made substantial improvements. They are now able to fall asleep peacefully and no longer wake up during the night. The dreams have significantly decreased, and the sleep is peaceful and restful. The lower back pain has disappeared. The other symptoms have also improved.",
						"Prescrizione": "Treatment:\n\nDisperse the Fire of the Liver and Gallbladder and tonify the respective organs. Shiatsu pressure on the Bladder meridian from 11BL to 28BL, pausing at 18BL and 19BL as the Liver and Gallbladder Shu points.\n\nShiatsu pressure along the entire Gallbladder meridian, pausing at GB20 and GB21.\nShiatsu pressure on the entire Liver meridian. Also treated the Heart meridian for the Noon-Midnight regulation. ",
						"puntiMTC": [
							{
								"n": 11,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "",
								"s": "11.BL"
							},
							{
								"n": 18,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "Liver Shu Point",
								"s": "18.BL"
							},
							{
								"n": 19,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "Gallbladder Shu Point",
								"s": "19.BL"
							},
							{
								"n": 28,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "Bladder Shu Point",
								"s": "28.BL"
							},
							{
								"n": 20,
								"m": "GB",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "20.GB"
							},
							{
								"n": 21,
								"m": "GB",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "21.GB"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Urinary bladder",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Gallbladder",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "LR",
								"NomeMeridiano": "Liver",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "HYPOCHONDRIA",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "STRESS",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "COLD HANDS ",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "HEADACHE",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "INSOMNIA",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANXIETY",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "DRY MOUTH",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "BITTER TASTE IN THE MOUTH",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "RECURRING NIGHTMARES AND THOUGHTS",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "PAIN WHILE URINATING",
								"score": 3
							}
						],
						"gallery": [
							{
								"idFile": "file_2674478724650",
								"Dida": ""
							},
							{
								"idFile": "file_2674478728149",
								"Dida": ""
							},
							{
								"idFile": "file_2674478731260",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1676329200,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692049984,
						"LabelCiclo": "Shiatsu Cycle - Anxiety",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*12
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Fourth Anxiety Treatment",
						"TestoTrattamento": "The recipient reports no longer waking up at night, the sleep is peaceful and restful, and the nightmares have disappeared. They also report being less irritable and no episodes of headaches. They have regained physical energy, and overall mood tone has improved. The anxious aspect remains, although it seems to have decreased since the first meeting. They still complain of a bitter taste in the mouth, particularly in the early hours of the day. Treatment:\nDisperse the Fire of the Liver and Gallbladder and tonify the respective organs. Shiatsu pressure on the Bladder meridian from 11BL to 28BL, pausing at 18BL and 19BL as the Liver and Gallbladder Shu points.",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 11,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "",
								"s": "11.BL"
							},
							{
								"n": 18,
								"m": "BL",
								"e": "V",
								"z": "moxa",
								"t": "Liver Shu Point",
								"s": "18.BL"
							},
							{
								"n": 19,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "Gallbladder Shu Point",
								"s": "19.BL"
							},
							{
								"n": 28,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "Bladder Shu Point",
								"s": "28.BL"
							},
							{
								"n": 13,
								"m": "LR",
								"e": "V",
								"z": "moxa",
								"t": "Spleen BO Point",
								"s": "13.LR"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Urinary bladder",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Gallbladder",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "LR",
								"NomeMeridiano": "Liver",
								"valEnergetica": "P",
								"descrizione": ""
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "HYPOCHONDRIA",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "STRESS",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "COLD HANDS ",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "HEADACHE",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "INSOMNIA",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANXIETY",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "DRY MOUTH",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "BITTER TASTE IN THE MOUTH",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "RECURRING NIGHTMARES AND THOUGHTS",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "PAIN WHILE URINATING",
								"score": 5
							}
						],
						"gallery": [
							{
								"idFile": "file_2674478724650",
								"Dida": ""
							},
							{
								"idFile": "file_2674478728149",
								"Dida": ""
							},
							{
								"idFile": "file_2674478731260",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1676934000,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692049984,
						"LabelCiclo": "Shiatsu Cycle - Anxiety",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*13
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Fifth Anxiety Treatment",
						"TestoTrattamento": "The recipient reports not only feeling better but also feeling changed inside. They fall asleep easily, and the obsessive thoughts have turned into a life lesson. The morning tiredness has almost disappeared, and they wake up with much more physical and mental energy. This is also in conjunction with the choice to resume the long-lost habit of taking a walk after dinner. The stress is still present, but they themselves claim to be better at managing it and releasing it before returning home. It is agreed to proceed with a WATER-WOOD maintenance treatment along with stretching techniques.",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "KI",
								"NomeMeridiano": "Kidney",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Gallbladder",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "LR",
								"NomeMeridiano": "Liver",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "HYPOCHONDRIA",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "STRESS",
								"score": 5
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "COLD HANDS ",
								"score": 1
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "HEADACHE",
								"score": 2
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "INSOMNIA",
								"score": 1
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANXIETY",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "DRY MOUTH",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "BITTER TASTE IN THE MOUTH",
								"score": 2
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "RECURRING NIGHTMARES AND THOUGHTS",
								"score": 1
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "PAIN WHILE URINATING",
								"score": 0
							}
						],
						"gallery": [
							{
								"idFile": "file_2674478724650",
								"Dida": ""
							},
							{
								"idFile": "file_2674478728149",
								"Dida": ""
							},
							{
								"idFile": "file_2674478731260",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1677452400,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692049984,
						"LabelCiclo": "Shiatsu Cycle - Anxiety",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*14
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Guide to the single session",
						"TestoTrattamento": "In this section, you have the possibility to add a single session to your patient's / recipient's folder.\nThis will allow you to keep a record of the treatment in both clinical and economic terms.\n\nYou can also add a prescription, symptoms, points, or treated meridians.",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [],
						"gallery": [],
						"TimeTrattamento": 1674601200,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1693846663,
						"LabelCiclo": "",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*15
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Anamnesis",
						"TestoTrattamento": "{\"AnamnesiMotivo\":\"ANAMNESIS QUESTIONNAIRE (for demonstrative purposes)\\n\\nHow long have you been experiencing insomnia problems? About 6 months.\\nWhat are the main symptoms of the insomnia you are experiencing? Difficulty falling asleep in the evening and frequent nighttime awakenings.\\nHave you noticed specific factors that trigger or worsen your insomnia? Mainly work-related stress and anxiety.\\n\\nPrevious Medical History:\\nHave you ever had any mental health problems or mood disorders? No previous diagnosis of mood disorders. Have had sporadic episodes of anxiety.\\nAre you taking any medications or supplements that may affect your sleep? Not currently taking any medications.\\nHave you undergone any previous treatments for insomnia? Have tried relaxation techniques and calming herbal teas, but without lasting success.\\n\\nLifestyle and Habits:\\nDescribe your general lifestyle. Maria works full time and often feels stressed due to deadlines and work responsibilities. She drinks coffee in the morning and occasionally a cup in the afternoon.\\nHow do you manage stress in daily life? Practices yoga and meditation, but lately has had difficulty finding the time.\\nWhat are your bedtime habits? Often watches TV or uses the phone just before going to bed.\\n\\nTreatment Goals:\\nWhat is the main goal you want to achieve through auriculotherapy for insomnia?\\nMaria wants to improve sleep quality, reduce anxiety, and learn techniques to manage stress more effectively.\\n\\nAdditional Notes:\\nMaria is particularly interested in natural treatments and wants to explore auriculotherapy as an option.\",\"AnamnesiDiagnosiOccidentale\":\"Diagnosis in Western Medicine: Primary Insomnia Disorder\\n\\nExplanation:\\nPrimary insomnia disorder is a condition in which the patient has difficulty initiating or maintaining sleep despite having the opportunity to do so. This can be caused by factors such as anxiety, stress, depression, poor sleep habits, excessive caffeine or alcohol consumption, and disturbances in circadian rhythm.\\n\\nAssociated Symptoms:\\n\\nDifficulty falling asleep\\nFrequent nighttime awakenings\\nFeeling of non-restorative sleep upon awakening\\nDaytime fatigue\\nIrritability and difficulty concentrating\\nTreatment in Western Medicine:\\nTreatment in Western medicine for insomnia disorder can vary depending on the underlying cause. It may include behavioral interventions, such as cognitive-behavioral therapy for insomnia (CBT-I), which aims to improve sleep hygiene and change harmful habits. In some cases, short-term hypnotic medications may be prescribed to help stabilize sleep.\\n\\nTreatment Plan:\\nA treatment plan may involve a combination of behavioral therapies, such as CBT-I, sleep environment control, education on reducing anxiety and stress, and adoption of relaxation strategies. In selected cases, the physician may consider prescribing short-term medications, but with caution regarding potential side effects and dependence.\",\"AnamnesiDiagnosiMTC\":\"Stagnation of Qi and Blood with Shen (Mind) Deficiency\\n\\nExplanation:\\nIn the perspective of TCM, insomnia can be seen as a result of blocked energy (Qi) and blood circulation, which can cause tension and restlessness. The \\\"Shen\\\", which represents the mental and spiritual aspect, can be weakened due to stress and anxiety and can affect the ability to fall asleep and maintain restful sleep.\\n\\nAssociated Symptoms:\\n\\nDifficulty falling asleep\\nFrequent nighttime awakenings\\nRestlessness and mental agitation\\nMorning fatigue\\nAnxiety\\nTreatment in TCM:\\nThe goal of treatment in TCM would be to restore the harmonious flow of Qi and Blood, reduce mental tension, and strengthen the Shen. This could be achieved through auriculotherapy, the use of acupuncture, and specific herbal therapy. The therapy would aim to unblock stagnant energy, promote relaxation, and improve sleep quality.\\n\\nTreatment Plan:\\nA treatment plan may include regular auriculotherapy sessions, targeted acupuncture treatments, advice on stress management such as meditation and relaxation, as well as personalized Chinese herbal prescriptions to strengthen Qi, Blood, and Shen.\"}",
						"Prescrizione": "Auriculotherapy:\nUndergo weekly auriculotherapy sessions for a total of 6-8 weeks. During these sessions, auricular points related to relaxation, sleep, and anxiety reduction will be stimulated. The auriculotherapist will assess the body's response and adjust the treatment accordingly.\n\nCognitive-Behavioral Therapy for Insomnia (CBT-I):\nParticipate in a cognitive-behavioral therapy program for insomnia. This program involves weekly sessions for the first 4-6 weeks, followed by biweekly follow-up sessions. CBT-I aims to improve sleep hygiene, address negative sleep-related thoughts, and establish a regular sleep-wake schedule.\n\nStress Management Strategies:\nPractice relaxation techniques such as meditation and deep breathing for at least 10-15 minutes daily, preferably before bedtime. These practices can help reduce anxiety and prepare the body for sleep.\n\nLifestyle Recommendations:\n\nAvoid consuming caffeine and alcohol in the afternoon and evening.\nLimit the use of electronic devices before bedtime.\nMaintain a comfortable sleep environment, with dim lighting and appropriate temperature.\nAvoid heavy meals just before bedtime.\nFollow-up:\nA follow-up will be scheduled after 8 weeks to assess the response to treatment and make any necessary adjustments. Please keep a sleep diary and note any improvements or changes.\n\nAdditional Notes:\nPlease follow the instructions provided by the auriculotherapy therapist and the CBT-I therapist. In case of side effects or concerns, please contact the doctor immediately.",
						"puntiMTC": [],
						"puntiAuricolari": [
							{
								"s": "003",
								"n": "Apex of the Auricular Pavilion",
								"z": "",
								"e": "",
								"t": ""
							},
							{
								"s": "013",
								"n": "Romoli's Anxiety",
								"z": "",
								"e": "",
								"t": ""
							},
							{
								"s": "230",
								"n": "Master Cerebral Point",
								"z": "",
								"e": "",
								"t": ""
							},
							{
								"s": "195",
								"n": "Epiphysis",
								"z": "",
								"e": "",
								"t": ""
							}
						],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Difficulty Falling Asleep",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Frequent Night Awakenings",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Restlessness and Mental Agitation",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Tiredness upon Waking",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANXIETY",
								"score": 10
							}
						],
						"gallery": [
							{
								"idFile": "file_1692134504542",
								"Dida": ""
							}
						],
						"TimeTrattamento": 0,
						"oraInizio": -1,
						"oraFine": -1,
						"DataModifica": 1692134508,
						"LabelCiclo": "Ear Therapy Cycle for Insomnia",
						"TipoTrattamento": "A",
						"CostoTrattamento": 0,
						"ordine": 2,
						"Cancellato": 0,
						"frv": true
					},
					{//*16
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Session 1: Initial Assessment and Relaxation",
						"TestoTrattamento": "Duration: 45 minutes\n\nDuring the first session, the patient is welcomed and undergoes a brief assessment of their medical history and symptoms related to insomnia. The auriculotherapist explains the treatment process and gently places small needles or seeds on the corresponding ear map points that can influence sleep and relaxation. The patient is then left to relax for 20-30 minutes, during which they are encouraged to focus on deep breathing and clearing the mind.",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [
							{
								"s": "045",
								"n": "Insomnia 1",
								"z": "ago",
								"e": "D",
								"t": ""
							},
							{
								"s": "245",
								"n": "Insomnia 2",
								"z": "ago",
								"e": "D",
								"t": ""
							}
						],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Difficulty Falling Asleep",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Frequent Night Awakenings",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Restlessness and Mental Agitation",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Tiredness upon Waking",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANXIETY",
								"score": 9
							}
						],
						"gallery": [],
						"TimeTrattamento": 1692050400,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692177913,
						"LabelCiclo": "Ear Therapy Cycle for Insomnia",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*17
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Session 2: Stimulation of Sleep Points",
						"TestoTrattamento": "In the second session, the auriculotherapist examines the patient's progress since the previous session and proceeds with a more targeted stimulation of the ear points related to sleep. Needles or seeds are placed more precisely, focusing on specific points associated with improving insomnia. The patient is again left to relax while the needles take effect.",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [
							{
								"s": "045",
								"n": "Insomnia 1",
								"z": "ago",
								"e": "",
								"t": ""
							},
							{
								"s": "245",
								"n": "Insomnia 2",
								"z": "ago",
								"e": "",
								"t": ""
							}
						],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Difficulty Falling Asleep",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Frequent Night Awakenings",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Restlessness and Mental Agitation",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Tiredness upon Waking",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANXIETY",
								"score": 9
							}
						],
						"gallery": [],
						"TimeTrattamento": 1692568800,
						"oraInizio": 132,
						"oraFine": 144,
						"DataModifica": 1692177897,
						"LabelCiclo": "Ear Therapy Cycle for Insomnia",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*18
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Session 3: Energy Balance",
						"TestoTrattamento": "Duration: 50 minutes\n\nIn the third session, the auriculotherapist continues to adjust the stimulation of the ear points, focusing on the patient's energy balance. Stress or anxiety factors that may contribute to insomnia are also considered. During this session, the patient may also receive advice on stress management and relaxation techniques to apply at home.",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [
							{
								"s": "045",
								"n": "Insomnia 1",
								"z": "ago",
								"e": "D",
								"t": ""
							},
							{
								"s": "245",
								"n": "Insomnia 2",
								"z": "ago",
								"e": "D",
								"t": ""
							},
							{
								"s": "000",
								"n": "Zero Point",
								"z": "seme_vaccaria",
								"e": "",
								"t": ""
							}
						],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Difficulty Falling Asleep",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Frequent Night Awakenings",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Restlessness and Mental Agitation",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Tiredness upon Waking",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANXIETY",
								"score": 7
							}
						],
						"gallery": [],
						"TimeTrattamento": 1692914400,
						"oraInizio": 126,
						"oraFine": 144,
						"DataModifica": 1692177857,
						"LabelCiclo": "Ear Therapy Cycle for Insomnia",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*19
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Session 4: Consolidation of Progress",
						"TestoTrattamento": "Duration: 45 minutes\n\nIn the fourth session, the patient and the auriculotherapist assess the progress made so far together. The patient may report an improvement in sleep quality, longer sleep duration, or reduced frequency of nighttime awakenings. The auriculotherapist adjusts the treatment based on these results and continues to stimulate the auricular points involved in improving sleep.",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [
							{
								"s": "045",
								"n": "Insomnia 1",
								"z": "ago",
								"e": "",
								"t": ""
							},
							{
								"s": "245",
								"n": "Insomnia 2",
								"z": "ago",
								"e": "",
								"t": ""
							},
							{
								"s": "000",
								"n": "Zero Point",
								"z": "seme_vaccaria",
								"e": "",
								"t": ""
							}
						],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Difficulty Falling Asleep",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Frequent Night Awakenings",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Restlessness and Mental Agitation",
								"score": 5
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Tiredness upon Waking",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANXIETY",
								"score": 7
							}
						],
						"gallery": [],
						"TimeTrattamento": 1693432800,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692178254,
						"LabelCiclo": "Ear Therapy Cycle for Insomnia",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*20
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Session 5: Maintenance and Conclusion",
						"TestoTrattamento": "In the final session of the cycle, the focus shifts to maintaining the progress made. The auriculotherapist may suggest a long-term treatment plan, which could involve periodic visits to maintain the benefits achieved. The patient is encouraged to continue practicing relaxation techniques and managing stress in daily life.",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [
							{
								"s": "045",
								"n": "Insomnia 1",
								"z": "ago",
								"e": "",
								"t": ""
							},
							{
								"s": "245",
								"n": "Insomnia 2",
								"z": "dito",
								"e": "",
								"t": ""
							},
							{
								"s": "000",
								"n": "Zero Point",
								"z": "seme_vaccaria",
								"e": "",
								"t": ""
							}
						],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Difficulty Falling Asleep",
								"score": 2
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Frequent Night Awakenings",
								"score": 0
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Restlessness and Mental Agitation",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Tiredness upon Waking",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANXIETY",
								"score": 5
							}
						],
						"gallery": [],
						"TimeTrattamento": 1693864800,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692178379,
						"LabelCiclo": "Ear Therapy Cycle for Insomnia",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					}
				],
				"saldi": [
					{
						"idSaldo": 0,
						"idPaziente": 0,
						"MotivoSaldo": "Acupuncture Treatment",
						"RicevutaSaldo": "2",
						"ValoreSaldo": 150,
						"DataSaldo": 1674860400,
						"DataModifica": 1691909111,
						"Cancellato": 0,
						"frv": true
					},
					{
						"idSaldo": 0,
						"idPaziente": 0,
						"MotivoSaldo": "Shiatsu Treatment",
						"RicevutaSaldo": "1",
						"ValoreSaldo": 50,
						"DataSaldo": 1674428400,
						"DataModifica": 1691909111,
						"Cancellato": 0,
						"frv": true
					},
					{
						"idSaldo": 0,
						"idPaziente": 0,
						"MotivoSaldo": "Acupuncture Treatment, Advance",
						"RicevutaSaldo": "3",
						"ValoreSaldo": 150,
						"DataSaldo": 1675119600,
						"DataModifica": 1691909111,
						"Cancellato": 0,
						"frv": true
					},
					{
						"idSaldo": 0,
						"idPaziente": 0,
						"MotivoSaldo": "Balance Treatment",
						"RicevutaSaldo": "5",
						"ValoreSaldo": 150,
						"DataSaldo": 1692136800,
						"DataModifica": 1692183527,
						"Cancellato": 0,
						"frv": true
					}
				],
				"Cancellato": 0,
				"frv": true
			}
		],
		servizi: [
			{//*
				"idServizio": 0,
				"NomeServizio": "Auriculotherapy Cycle to Quit Smoking",
				"DescrizioneServizio": "Acupuncture is effective in breaking nicotine addiction.\n\nThe treatment is based on a comprehensive analysis of withdrawal symptoms and aims to balance the body's energies to improve health.\n\nAcupuncture can help those who want to quit smoking by reducing cigarette cravings, anxiety, and the need for the smoking ritual. The treatment can also lead to a feeling of disgust for the taste and smell of cigarettes.\n\nIf the individual is determined to quit smoking, the beneficial effects can be seen as early as the third or fourth treatment.\n\nThe classic protocol, developed by P. Nogier, lasts 15-20 minutes in a single session and requires abstinence of at least 6 hours before treatment.\n",
				"CostoServizio": 150,
				"NumeroSedute": 5,
				"DataModifica": 1674490894,
				"DataCreazione": 1674490810,
				"Cancellato": 0,
				"frv": true
			},
			{//*
				"idServizio": 0,
				"NomeServizio": "Shiatsu Cycle for Anxiety",
				"DescrizioneServizio": "The emotional state of each person is subjective and manifests itself in the most unlikely ways; underlying low self-esteem can lead a person to believe they cannot overcome the challenges that life presents. Heightened stress that undermines our peace can cause us to go into overdrive, giving rise to anxiety, fear, and the infamous panic attack. Acute symptoms can include tachycardia, labored breathing, fear accompanied by a surge of adrenaline, a very unpleasant sensation especially because the crises sometimes come on suddenly, without warning, and those affected live in terror of entering the 'Terror' phase.\n\nIf the state of anguish is deep, severe, and enduring, it requires the intervention of a specialist.\n",
				"CostoServizio": 50,
				"NumeroSedute": 5,
				"DataModifica": 1674490934,
				"DataCreazione": 1674490895,
				"Cancellato": 0,
				"frv": true
			},
			{//*
				"idServizio": 0,
				"NomeServizio": "Acupuncture Cycle for Bruxism",
				"DescrizioneServizio": "Bruxism refers to a condition where the teeth are clenched and ground, rubbing the upper arch against the lower one while the jaws are clenched with a certain force.\n\nBruxism is a fairly common condition that depends on the involuntary contraction of the chewing muscles.\n\nIt mainly occurs at night and can cause a series of consequences: teeth wear, jaw pain, headaches.",
				"CostoServizio": 100,
				"NumeroSedute": 5,
				"DataModifica": 1674491088,
				"DataCreazione": 1674490935,
				"Cancellato": 0,
				"frv": true
			},
			{//*
				"idServizio": 0,
				"NomeServizio": "Service Guide",
				"DescrizioneServizio": "In this section, you have the option to pre-load the services you commonly offer to your clients/patients.\n\nBy adding the price and the number of sessions for the service, you will speed up the insertion process.\n\nFor example, the \"Anti-Smoking\" package, insomnia, allergy, Qi rebalancing....\nSession cost: 150€\nNumber of sessions: 5\n\n",
				"CostoServizio": 1,
				"NumeroSedute": 1,
				"DataModifica": 1674491592,
				"DataCreazione": 1674491089,
				"Cancellato": 0,
				"frv": true
			}
		],
		fornitori: [
			{
				"idFornitore": 0,
				"RagioneSociale": "Needles & Points",
				"Intestazione": "Needles & Points Ltd.\nvia Italia 96\nRoma",
				"PartitaIva": "0698765432",
				"CodiceFiscale": "ghagha84r16d200r",
				"Indirizzo": "via Italia 96",
				"CAP": "10000",
				"Citta": "Roma",
				"Provincia": "Roma",
				"Stato": "it",
				"Telefono": "06123456",
				"Email": "aghi@mail.com",
				"NoteFornitore": "Supplier of acupuncture needles.\nContact person for orders: Mr. Angelo Spinoso.\nOrders over €100, 20% discount.",
				"etichette": [],
				"DataModifica": 1629780089,
				"DataCreazione": 1629779932,
				"Cancellato": 0,
				"frv": true
			},
			{
				"idFornitore": 0,
				"RagioneSociale": "Medical Office Furnishings Ltd.",
				"Intestazione": "To the Attention of Medical Office Furnishings Ltd.\nVia Milano 113\nMilan",
				"PartitaIva": "06987653245",
				"CodiceFiscale": "RRDMBL84R16D111A",
				"Indirizzo": "Via Milano 113",
				"CAP": "10000",
				"Citta": "Milano",
				"Provincia": "MI",
				"Stato": "it",
				"Telefono": "3486851418",
				"Email": "arredamentiambulatori@mail.com",
				"NoteFornitore": "Wholesale supplier of medical office materials.\nContact agent Mr. Rossi Mario.\nInvoice 90 days.\nGreat prices and quality.",
				"etichette": [
					{
						"idEtichetta": 0,
						"NomeEtichetta": "Facebook",
						"ValoreEtichetta": "@arredamentiambulatori",
						"sezione": "contatti"
					},
					{
						"idEtichetta": 0,
						"NomeEtichetta": "Instagram",
						"ValoreEtichetta": "@arreda_abulatori",
						"sezione": "contatti"
					}
				],
				"DataModifica": 1629780672,
				"DataCreazione": 1629780090,
				"Cancellato": 0,
				"frv": true
			}
		]
	},	
	esp: {
		pazienti: [
			{
				"idPaziente": 0,
				"Nome": "Cliente de demostración",
				"Cognome": "IAOMAI",
				"Indirizzo": "Plaza de la Puerta del Sol, 2",
				"CAP": "28012",
				"Citta": "Madrid",
				"Provincia": "M",
				"Stato": "es",
				"Telefono": "",
				"Cellulare": "3486851418",
				"paeseCellulare": "es",
				"Email": "app@iaomai.app",
				"sesso": "m",
				"NotePaziente": "Fue ingresado el 23 de enero de 20xx por un principio de infarto.\nPostura semi-cifótica.\nViaja mucho por trabajo, lo que a menudo provoca estados de estrés agudo.\nTendencia hipcondríaca.",
				"DataNascita": "1984-10-16",
				"LuogoNascita": "Madrid",
				"tags": [
					{
						"idTag": 0,
						"NomeTag": "1ª Shiatsu",
						"colore": "d7dafb"
					},
					{
						"idTag": 0,
						"NomeTag": "Acupuntura",
						"colore": "fbd7d7"
					},
					{
						"idTag": 0,
						"NomeTag": "Auriculoterapia",
						"colore": "d7f5fb"
					}
				],
				"etichette": [
					{
						"idEtichetta": 0,
						"NomeEtichetta": "Deporte practicado:",
						"ValoreEtichetta": "Nuoto",
						"sezione": "aggiuntive"
					},
					{
						"idEtichetta": 0,
						"NomeEtichetta": "Contactar preferiblemente:",
						"ValoreEtichetta": "Dopo le ore 17.",
						"sezione": "aggiuntive"
					},
					{
						"idEtichetta": 0,
						"NomeEtichetta": "Sitio web",
						"ValoreEtichetta": "www.iaomai.app",
						"sezione": "contatti"
					},
					{
						"idEtichetta": 0,
						"NomeEtichetta": "Socialnetwork:",
						"ValoreEtichetta": "https://www.facebook.com/profile.php?id=100089849462315",
						"sezione": "contatti"
					}
				],
				"medicine": [
					{
						"idMedicina": 0,
						"NomeMedicina": "Ibuprofeno"
					},
					{
						"idMedicina": 0,
						"NomeMedicina": "Ketoprofeno"
					},
					{
						"idMedicina": 0,
						"NomeMedicina": "Ketoprofeno"
					}
				],
				"allergie": [
					{
						"idAllergia": 0,
						"NomeAllergia": "Intolerante al gluten"
					},
					{
						"idAllergia": 0,
						"NomeAllergia": "Alimentos con níquel"
					},
					{
						"idAllergia": 0,
						"NomeAllergia": "Pelo de gato"
					}
				],
				"patologie": [
					{
						"idPatologia": 0,
						"NomePatologia": "ANSIEDAD"
					},
					{
						"idPatologia": 0,
						"NomePatologia": "Protusión L4-L5"
					},
					{
						"idPatologia": 0,
						"NomePatologia": "Hipertensión"
					},
					{
						"idPatologia": 0,
						"NomePatologia": "Artritis reumatoide"
					},
					{
						"idPatologia": 0,
						"NomePatologia": "Alergia"
					},
					{
						"idPatologia": 0,
						"NomePatologia": "Asma bronquial"
					}
				],
				"interventi": [
					{
						"idIntervento": 0,
						"NomeIntervento": "MENISCO Y LIGAMENTOS IZQUIERDOS"
					},
					{
						"idIntervento": 0,
						"NomeIntervento": "MASTOPLASTIA ADITIVA"
					},
					{
						"idIntervento": 0,
						"NomeIntervento": "En espera de cirugía de hernia L4-L5"
					}
				],
				"gallery": [
					{
						"idFile": "file_2674427029613",
						"Dida": ""
					},
					{
						"idFile": "file_2674427069354",
						"Dida": ""
					}
				],
				"Provenienza": "Boca a boca",
				"Professione": "Empleada",
				"Intestazione": "",
				"CodiceFiscale": "",
				"PartitaIva": "",
				"Social": "Facebook",
				"avatar": "data:image/jpeg;base64,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",
				"Altezza": "175",
				"Peso": "65",
				"DataModifica": 1694960504,
				"trattamenti": [
					{//*1
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Tratamiento Shiatsu - Rigidez de extremidades inferiores",
						"TestoTrattamento": "Al llegar a la instalación, el CLIENTE DEMO elige someterse a un tratamiento de Shiatsu para aliviar el dolor en las extremidades inferiores.\n\nDespués de una entrevista inicial, surgen muchos aspectos interesantes de la personalidad del CLIENTE. \nLo que más me sorprende es su tolerancia al dolor. El umbral del dolor está muy por encima del promedio.\n\nLa evaluación parcial de los meridianos Tendino-Musculares destaca:\nVacío de VU;\nVacío de R;\nVB doloroso en la pierna derecha.\n\nLa evaluación de la zona Shu muestra:\nVacío de P;\nLleno de F;\nÁrea renal dura;\nDolor en VU.\n\n---------------\n\nDespués del tratamiento, CLIENTE DEMO se siente notablemente mejor hasta el punto de que no siente la necesidad de replicar un nuevo tratamiento. Nos mantendremos en contacto para cualquier posible recaída.\n",
						"Prescrizione": "Posibilidad de trabajo para comprender personalmente el cuerpo y sus dinámicas en términos de MTC.",
						"puntiMTC": [
							{
								"n": 13,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Punto Shu de Pulmón",
								"s": "13.BL"
							},
							{
								"n": 14,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Punto Shu del Mastro del corazón",
								"s": "14.BL"
							},
							{
								"n": 15,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Punto Shu de Corazón",
								"s": "15.BL"
							},
							{
								"n": 18,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Punto Shu de Hígado",
								"s": "18.BL"
							},
							{
								"n": 19,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Punto Shu de Vesícula biliar",
								"s": "19.BL"
							},
							{
								"n": 20,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Punto Shu de Bazo",
								"s": "20.BL"
							},
							{
								"n": 21,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Punto Shu de Estómago",
								"s": "21.BL"
							},
							{
								"n": 22,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Punto Shu de Triple calentador",
								"s": "22.BL"
							},
							{
								"n": 23,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Punto Shu de Riñón",
								"s": "23.BL"
							},
							{
								"n": 25,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Punto Shu de Intestino grueso",
								"s": "25.BL"
							},
							{
								"n": 27,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Punto Shu de Intestino delgado",
								"s": "27.BL"
							},
							{
								"n": 28,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Punto Shu de Vejiga",
								"s": "28.BL"
							},
							{
								"n": 1,
								"m": "LU",
								"e": "",
								"z": "",
								"t": "Punto BO de Pulmón",
								"s": "1.LU"
							},
							{
								"n": 17,
								"m": "CV",
								"e": "",
								"z": "",
								"t": "Punto BO del Mastro del corazón",
								"s": "17.CV"
							},
							{
								"n": 14,
								"m": "LR",
								"e": "",
								"z": "",
								"t": "Punto BO de Hígado",
								"s": "14.LR"
							},
							{
								"n": 24,
								"m": "GB",
								"e": "D",
								"z": "",
								"t": "Punto BO de Vesícula biliar",
								"s": "24.GB"
							},
							{
								"n": 14,
								"m": "CV",
								"e": "",
								"z": "",
								"t": "Punto BO de Corazón",
								"s": "14.CV"
							},
							{
								"n": 12,
								"m": "CV",
								"e": "",
								"z": "",
								"t": "Punto BO de Estómago",
								"s": "12.CV"
							},
							{
								"n": 13,
								"m": "LR",
								"e": "P",
								"z": "",
								"t": "Punto BO de Bazo",
								"s": "13.LR"
							},
							{
								"n": 25,
								"m": "GB",
								"e": "",
								"z": "",
								"t": "Punto BO de Riñón",
								"s": "25.GB"
							},
							{
								"n": 25,
								"m": "ST",
								"e": "P",
								"z": "",
								"t": "PUNTO MÁS HIPERACTIVO DERECHO",
								"s": "25.ST"
							},
							{
								"n": 5,
								"m": "CV",
								"e": "V",
								"z": "",
								"t": "Punto BO de Triple calentador",
								"s": "5.CV"
							},
							{
								"n": 4,
								"m": "CV",
								"e": "",
								"z": "",
								"t": "Punto BO de Intestino delgado",
								"s": "4.CV"
							},
							{
								"n": 3,
								"m": "CV",
								"e": "V",
								"z": "",
								"t": "Punto BO de Vejiga",
								"s": "3.CV"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "KI",
								"NomeMeridiano": "Riñón",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Vesícula biliar",
								"valEnergetica": "D"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "RIGIDEZ EN LAS EXTREMIDADES INFERIORES",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "MANOS FRÍAS ",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ESTRÉS",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "HIPCONDRIA",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "CEFALEA",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "CALIDAD DEL SUEÑO								",
								"score": 4
							}
						],
						"gallery": [
							{
								"idFile": "file_2674467779004",
								"Dida": ""
							},
							{
								"idFile": "file_2674467791995",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1672527600,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1691909111,
						"LabelCiclo": "",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*2
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Anamnesis",
						"TestoTrattamento": "{\"AnamnesiMotivo\": \"El Cliente Demo Iaomai, viene a mí para comenzar un ciclo de tratamientos de shiatsu para intentar resolver una serie de trastornos relacionados con la ansiedad que ha estado sufriendo durante años.\\n\\nSe queja de dificultad para conciliar el sueño desde hace un tiempo y se despierta muy cansado por la mañana.\\nLos síntomas empeoran en proporción al estrés relacionado con el trabajo.\\nSudoraciones, pensamientos recurrentes y obsesivos, y rumiación a menudo ocurren durante la noche.\\n\\nDurante el día, la acumulación de estrés se manifiesta somáticamente en la zona lumbar, particularmente a nivel de los riñones.\\nDesde hace unas semanas, la orina es escasa y oscura, se queja de sequedad en la boca y una sensación de pesadez en la cabeza; ocasionalmente, aparecen leves zumbidos en los oídos.\\n\\nEl sabor amargo en la boca es recurrente\\n\",\"AnamnesiDiagnosiOccidentale\": \"El estado emocional de cada persona es subjetivo y se manifiesta de las maneras más inverosímiles, una falta básica de autoestima puede llevar a una persona a pensar que no puede superar las pruebas que la vida nos pone por delante. El estrés pronunciado que daña nuestra calma puede llevarnos a entrar en \\\"tilt\\\" y aquí llega la ansiedad, el miedo, el famoso ataque de pánico. Como síntoma en la fase aguda, pueden aparecer taquicardia, dificultad para respirar, miedo con consecuente descarga de adrenalina, una sensación muy desagradable también porque las crisis a veces llegan de repente, sin previo aviso, y quienes las sufren viven aterrorizados de entrar en la fase de \\\"terror\\\".\\nSi el estado de angustia es profundo, grave y permanente, entonces es necesaria la intervención de un especialista. \",\"AnamnesiDiagnosiMTC\": \"T.C.M.\\nLa ansiedad, el miedo, la angustia y la hiperemotividad se consideran un exceso de Qi en los meridianos del Corazón y del Maestro del corazón, que deben regular el tono del plexo cardíaco.\\nSi la patología es crónica, también puede estar relacionada con otros meridianos.\\n\\n\"}",
						"Prescrizione": "Terapia\nDispersar y regular el Qi en los meridianos del Corazón y del Maestro del corazón,\nRestaurar la comunicación entre Corazón y Riñón - Nivel Energético Shao Yin -\nCalmar el Shen",
						"puntiMTC": [
							{
								"n": "03",
								"m": "KI",
								"e": "V",
								"z": "",
								"t": "",
								"s": "3.KI"
							},
							{
								"n": "36",
								"m": "ST",
								"e": "P",
								"z": "",
								"t": "en la pierna derecha más interactivo que en la pierna izquierda. ",
								"s": "36.ST"
							},
							{
								"n": "04",
								"m": "LI",
								"e": "D",
								"z": "coppetta",
								"t": "",
								"s": "04.LI"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "KI",
								"NomeMeridiano": "Riñón",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "ST",
								"NomeMeridiano": "Estómago",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Vejiga urinaria",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Vesícula biliar",
								"valEnergetica": "V"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "HIPCONDRIA",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ESTRES",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "MANOS FRÍAS ",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "CEFALEA",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "INSOMNIO",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANSIEDAD",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "BOCA SECA",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "SABOR AMARGO EN LA BOCA",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "PESADILLAS Y PENSAMIENTOS RECURRENTES",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "DOLOR AL ORINAR",
								"score": 7
							}
						],
						"gallery": [
							{
								"idFile": "file_2674478724650",
								"Dida": ""
							},
							{
								"idFile": "file_2674478728149",
								"Dida": ""
							},
							{
								"idFile": "file_2674478731260",
								"Dida": ""
							}
						],
						"TimeTrattamento": 0,
						"oraInizio": -1,
						"oraFine": -1,
						"DataModifica": 1694960504,
						"LabelCiclo": "Ciclo de Shiatsu - Ansiedad ",
						"TipoTrattamento": "A",
						"CostoTrattamento": 0,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*3
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Anamnesis",
						"TestoTrattamento": "{\"AnamnesiMotivo\":\"Historia clínica:\\n\\n-Síntomas actuales:\\n\\nEl paciente ha reportado síntomas de lumbociática, incluyendo dolor punzante en la región lumbar y hormigueo en la pierna derecha.\\nLos síntomas comenzaron hace aproximadamente 6 semanas.\\n\\n-Eventos desencadenantes:\\n\\nEl paciente indicó que levantar objetos pesados de manera inapropiada podría ser la causa de los síntomas.\\n\\n-Historia médica:\\n\\nEl paciente tiene antecedentes de problemas espinales preexistentes, como una hernia de disco leve en la zona lumbar.\\nHa recibido tratamientos quiroprácticos en el pasado para controlar los síntomas.\\n\\n-Medicamentos y suplementos:\\n\\nActualmente, el paciente está tomando ibuprofeno para aliviar el dolor.\\n\\n-Historia quirúrgica:\\n\\nEl paciente no ha sido sometido a cirugías de espalda o zona lumbar en el pasado.\\n\\n-Alergias e intolerancias:\\n\\nEl paciente ha declarado ser alérgico a la penicilina.\\n\\n>Estilo de vida y factores de riesgo:\\n\\n-Actividad física:\\n\\nEl paciente ha descrito su nivel de actividad física como moderado, con caminatas regulares.\\n\\n-Postura y hábitos diarios:\\n\\nEl paciente trabaja principalmente en la computadora y es consciente de tener una postura no óptima durante el trabajo.\\n\\n-Estrés y factores psicológicos:\\n\\nEl paciente mencionó niveles de estrés relacionados con el trabajo que podrían afectar la lumbociática.\\n\\n-Objetivos de tratamiento:\\n\\nEl paciente ha expresado el deseo de reducir el dolor en la región lumbar y mejorar la movilidad.\\n\\n-Notas adicionales:\\n\\nDurante la consulta, el paciente enfatizó la importancia de encontrar un tratamiento con un enfoque más natural que el uso de medicamentos a largo plazo.\\n\",\"AnamnesiDiagnosiOccidentale\":\"El CLIENTE DEMO IAOMAI presenta una condición de lumbociática, caracterizada por dolor en la zona lumbar y hormigueo a lo largo del recorrido del nervio ciático. La condición parece estar relacionada con una posible irritación del nervio ciático, probablemente desencadenada por un levantamiento inadecuado y agravada por la presencia de una hernia de disco lumbar.\",\"AnamnesiDiagnosiMTC\":\"Según el análisis de síntomas y factores de riesgo, la lumbociática de CLIENTE DEMO IAOMAI puede estar relacionada con una 'Obstrucción de Qi y Sangre en la Región Lumbar' según los principios de la Medicina Tradicional China. La acumulación de estrés, la postura incorrecta y el levantamiento inadecuado pueden haber contribuido a esta condición, obstaculizando el flujo armonioso de Qi y Sangre a lo largo de los meridianos de la zona lumbar.\\n\\nDesde la perspectiva de la MTC, el objetivo del tratamiento será eliminar el obstáculo, promover la circulación de Qi y Sangre y restaurar el equilibrio energético en los meridianos involucrados.\\n\"}",
						"Prescrizione": "• Se evidencia una estasis en el meridiano de la vesícula biliar porque pone en movimiento el Qi al ser el nivel shaoyang que permite el movimiento de la energía tanto yang como yin. \n• Moxa en 25VB, punto Mu de Ren que permite el nacimiento de yang. \n• Moxa en 31VB, punto del viento indicado para la estasis. \n• 34VB, punto de encuentro muscular, según Leung KwokPo trata el músculo como capaz de inducir 'movimiento'. \n• Puntos importantes que movilizan la sangre en el meridiano de la vesícula biliar 17BL, 40BL, 32 BL y 53BL \n• LV3, punto shu de tierra y yuan que mueve la sangre. \n• Yao fa para movilizar la zona lumbar.",
						"puntiMTC": [
							{
								"n": 31,
								"m": "GB",
								"e": "D",
								"z": "",
								"t": "Doloroso al tacto",
								"s": "31.GB"
							},
							{
								"n": 25,
								"m": "KI",
								"e": "D",
								"z": "",
								"t": "Doloroso al tacto",
								"s": "25.KI"
							},
							{
								"n": 21,
								"m": "GB",
								"e": "P",
								"z": "",
								"t": "",
								"s": "21.GB.."
							},
							{
								"n": 30,
								"m": "GB",
								"e": "P",
								"z": "",
								"t": "",
								"s": "30.GB.."
							},
							{
								"n": 34,
								"m": "GB",
								"e": "D",
								"z": "",
								"t": "Doloroso al tacto",
								"s": "34.GB"
							},
							{
								"n": 43,
								"m": "GB",
								"e": "D",
								"z": "",
								"t": "Doloroso al tacto",
								"s": "43.GB"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Vesícula biliar",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "KI",
								"NomeMeridiano": "Riñón",
								"valEnergetica": "D"
							},
							{
								"siglaMeridiano": "ST",
								"NomeMeridiano": "Estómago",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Dolor lumbar",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Hormigueo y entumecimiento",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Debilidad muscular",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Empeoramiento con el movimiento",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Movimiento limitado",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Dolor durante la sesión",
								"score": 8
							}
						],
						"gallery": [
							{
								"idFile": "file_2674469901174",
								"Dida": ""
							},
							{
								"idFile": "file_2674469904750",
								"Dida": ""
							},
							{
								"idFile": "file_2674469909751",
								"Dida": ""
							}
						],
						"TimeTrattamento": 0,
						"oraInizio": -1,
						"oraFine": -1,
						"DataModifica": 1692183228,
						"LabelCiclo": "Ciclo de Acupuntura para la Ciática",
						"TipoTrattamento": "A",
						"CostoTrattamento": 0,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*4
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Sesión 1: Evaluación inicial y relajación",
						"TestoTrattamento": "Duración: 45 minutos\n\nDurante la primera sesión, el paciente es recibido y sometido a una evaluación detallada de su historial clínico y los síntomas asociados con la ciática. El acupunturista explica el proceso de tratamiento e identifica los puntos clave de acupuntura a tratar. El acupunturista inserta agujas finas en puntos específicos a lo largo de los meridianos relacionados con la ciática. Luego se deja al paciente relajarse durante aproximadamente 20-30 minutos.",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 23,
								"m": "BL",
								"e": "D",
								"z": "ago",
								"t": "Punto Shu del Riñón",
								"s": "23.BL"
							},
							{
								"n": 32,
								"m": "BL",
								"e": "P",
								"z": "ago",
								"t": "",
								"s": "32.BL"
							},
							{
								"n": 8,
								"m": "BL",
								"e": "D",
								"z": "ago",
								"t": "",
								"s": "8.BL"
							},
							{
								"n": 30,
								"m": "BL",
								"e": "P",
								"z": "ago",
								"t": "",
								"s": "30.BL"
							},
							{
								"n": 4,
								"m": "CV",
								"e": "V",
								"z": "ago",
								"t": "Punto BO del Intestino Delgado",
								"s": "4.CV"
							},
							{
								"n": 4,
								"m": "SP",
								"e": "V",
								"z": "ago",
								"t": "",
								"s": "4.SP"
							},
							{
								"n": 31,
								"m": "GB",
								"e": "D",
								"z": "ago",
								"t": "",
								"s": "31.GB"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Vejiga urinaria",
								"valEnergetica": "D",
								"descrizione": "Doloroso al tacto"
							},
							{
								"siglaMeridiano": "KI",
								"NomeMeridiano": "Riñón",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Vesícula biliar",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Dolor lumbar",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Hormigueo y entumecimiento",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Debilidad muscular",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Empeoramiento con el movimiento",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Limitación del movimiento",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Dolor durante la sesión",
								"score": 10
							}
						],
						"gallery": [
							{
								"idFile": "file_2674427029613",
								"Dida": ""
							},
							{
								"idFile": "file_2674427069354",
								"Dida": ""
							},
							{
								"idFile": "file_2674469909751",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1674428400,
						"oraInizio": 132,
						"oraFine": 144,
						"DataModifica": 1692183278,
						"LabelCiclo": "Ciclo de Acupuntura para la Ciática",
						"TipoTrattamento": "B",
						"CostoTrattamento": 150,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*5
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Sesión 2: Reducción de la inflamación y el dolor",
						"TestoTrattamento": "Duración: 40 minutos\n\nEn la segunda sesión, el acupunturista evalúa el progreso del paciente desde la sesión anterior y se centra en reducir la inflamación y el dolor asociados con la ciática. Las agujas se colocan para estimular puntos que pueden ayudar a aliviar la inflamación de los nervios ciáticos y el dolor asociado. Se deja nuevamente al paciente para relajarse mientras las agujas hacen efecto.",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 23,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "Punto Shu del Riñón",
								"s": "23.BL"
							},
							{
								"n": 32,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "32.BL"
							},
							{
								"n": 8,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "8.BL"
							},
							{
								"n": 30,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "30.BL"
							},
							{
								"n": 4,
								"m": "CV",
								"e": "",
								"z": "ago",
								"t": "Punto BO del Intestino Delgado",
								"s": "4.CV"
							},
							{
								"n": 4,
								"m": "SP",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "4.SP"
							},
							{
								"n": 31,
								"m": "GB",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "31.GB"
							},
							{
								"n": 12,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "12.BL"
							},
							{
								"n": 40,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "40.BL"
							},
							{
								"n": 60,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "60.BL"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Vejiga urinaria",
								"valEnergetica": "D"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Vesícula biliar",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "ST",
								"NomeMeridiano": "Estómago",
								"valEnergetica": "P",
								"descrizione": "Tratamiento palmar para pensamientos obsesivos"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Dolor lumbar",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Hormigueo y entumecimiento",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Debilidad muscular",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Empeoramiento con el movimiento",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Limitación del movimiento",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Dolor durante la sesión",
								"score": 9
							}
						],
						"gallery": [
							{
								"idFile": "file_2674467779004",
								"Dida": ""
							},
							{
								"idFile": "file_2674469909751",
								"Dida": ""
							},
							{
								"idFile": "file_2674475331170",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1675033200,
						"oraInizio": 132,
						"oraFine": 144,
						"DataModifica": 1692183307,
						"LabelCiclo": "Ciclo de Acupuntura para la Ciática",
						"TipoTrattamento": "B",
						"CostoTrattamento": 150,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*6
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Sesión 3: Mejora de la circulación y del flujo de energía",
						"TestoTrattamento": "Duración: 50 minutos\n\nEn la tercera sesión, el acupunturista continúa trabajando en la reducción del dolor y la inflamación, pero también se enfoca en aumentar la circulación sanguínea y el flujo de energía en el área afectada. Se colocan agujas para estimular el flujo de energía a lo largo de los meridianos conectados a la zona lumbar y ciática.",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 8,
								"m": "GB",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "8.GB"
							},
							{
								"n": 20,
								"m": "GB",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "20.GB"
							},
							{
								"n": 22,
								"m": "GV",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "22.GV"
							},
							{
								"n": 10,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "10.BL"
							},
							{
								"n": 30,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "30.BL"
							},
							{
								"n": 23,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "Punto Shu del Riñón",
								"s": "23.BL"
							},
							{
								"n": 32,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "32.BL"
							},
							{
								"n": 4,
								"m": "SP",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "4.SP"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Vescica urinaria",
								"valEnergetica": "D"
							},
							{
								"siglaMeridiano": "ST",
								"NomeMeridiano": "Estómago",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Dolor lumbar",
								"score": 5
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Hormigueo y entumecimiento",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Debilidad muscular",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Empeoramiento con el movimiento",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Limitación del movimiento",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Dolor durante la sesión",
								"score": 7
							}
						],
						"gallery": [
							{
								"idFile": "file_2674469904750",
								"Dida": ""
							},
							{
								"idFile": "file_2674475331170",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1675638000,
						"oraInizio": 132,
						"oraFine": 144,
						"DataModifica": 1692183339,
						"LabelCiclo": "Ciclo de Acupuntura para la Ciática",
						"TipoTrattamento": "B",
						"CostoTrattamento": 150,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*7
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Sesión 4: Reequilibrio Muscular y Postural",
						"TestoTrattamento": "Duración: 45 minutos\n\nEn la cuarta sesión, el acupunturista evalúa la postura y los músculos del paciente, tratando de identificar desequilibrios que puedan contribuir a la lumbociatalgia. Se insertan agujas en puntos que ayudan a reequilibrar los músculos y mejorar la postura. El paciente también puede recibir consejos sobre ejercicios de estiramiento o fortalecimiento para hacer en casa.",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 20,
								"m": "GV",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "20.GV"
							},
							{
								"n": 7,
								"m": "HT",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "7.HT"
							},
							{
								"n": 20,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "Punto Shu de Bazo",
								"s": "20.BL"
							},
							{
								"n": 40,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "40.BL"
							},
							{
								"n": 60,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "60.BL"
							},
							{
								"n": 37,
								"m": "BL",
								"e": "",
								"z": "coppetta",
								"t": "",
								"s": "37.BL"
							},
							{
								"n": 38,
								"m": "BL",
								"e": "",
								"z": "coppetta",
								"t": "",
								"s": "38.BL"
							},
							{
								"n": 41,
								"m": "BL",
								"e": "",
								"z": "coppetta",
								"t": "",
								"s": "41.BL"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Vejiga urinaria",
								"valEnergetica": "D"
							},
							{
								"siglaMeridiano": "ST",
								"NomeMeridiano": "Estómago",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "CV",
								"NomeMeridiano": "Vaso concepción",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Dolor lumbar",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Hormigueo y entumecimiento",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Debilidad muscular",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Empeoramiento con el movimiento",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Limitación del movimiento",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Dolor durante la sesión",
								"score": 3
							}
						],
						"gallery": [
							{
								"idFile": "file_2674427069354",
								"Dida": ""
							},
							{
								"idFile": "file_2674469901174",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1676242800,
						"oraInizio": 132,
						"oraFine": 144,
						"DataModifica": 1692183366,
						"LabelCiclo": "Ciclo de Acupuntura para la Ciática",
						"TipoTrattamento": "B",
						"CostoTrattamento": 150,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*8
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Sesión 5: Mantenimiento y Planificación Futura",
						"TestoTrattamento": "Duración: 40 minutos\n\nEn la última sesión del ciclo, el acupunturista discute con el paciente los avances logrados durante el tratamiento. Se centra en el mantenimiento de los resultados y puede proponer un plan de tratamiento a largo plazo, con visitas periódicas para controlar los síntomas de la lumbociatalgia con el tiempo. Se anima al paciente a seguir los consejos de postura, ejercicios y hábitos saludables.",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 23,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "Punto Shu del Riñón",
								"s": "23.BL"
							},
							{
								"n": 32,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "32.BL"
							},
							{
								"n": 30,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "30.BL"
							},
							{
								"n": 31,
								"m": "GB",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "31.GB"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Vescica urinaria",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Vesícula biliar",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "ST",
								"NomeMeridiano": "Estómago",
								"valEnergetica": "D"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Dolor lumbar",
								"score": 2
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Hormigueo y entumecimiento",
								"score": 1
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Debilidad muscular",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Empeoramiento con el movimiento",
								"score": 2
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Limitación del movimiento",
								"score": 5
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Dolor durante la sesión",
								"score": 3
							}
						],
						"gallery": [
							{
								"idFile": "file_2674475391556",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1676847600,
						"oraInizio": 132,
						"oraFine": 144,
						"DataModifica": 1692183387,
						"LabelCiclo": "Ciclo de Acupuntura para la Ciática",
						"TipoTrattamento": "B",
						"CostoTrattamento": 150,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*9
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Primer Tratamiento de Ansiedad",
						"TestoTrattamento": "El paciente parece nervioso y desconfiado.\nNo ha dormido durante dos noches y está muy preocupado por las consecuencias de la pandemia de COVID-19.\n\nPresión de Shiatsu en el meridiano de la Vejiga de 11BL a 28BL, tonificando los puntos 15BL y 20BL, respectivamente puntos Shu del Corazón y del Bazo.\n\n- Presión de Shiatsu en todo el meridiano del Bazo, deteniéndose en los puntos 6SP y 10SP, y luego continuando a lo largo de todo el meridiano hasta el pecho.\n\n- Presión de Shiatsu en todo el meridiano del Corazón, deteniéndose en el punto 7HT y continuando hasta el punto 9HT.\n\n- Presión de Shiatsu en el meridiano del Pericardio. ",
						"Prescrizione": "Presión de Shiatsu en el meridiano de la Vejiga de 11BL a 28BL, tonificando los puntos 15BL y 20BL, respectivamente puntos Shu del Corazón y del Bazo.\n\n- Presión de Shiatsu en todo el meridiano del Bazo, deteniéndose en los puntos 6SP y 10SP, y luego continuando a lo largo de todo el meridiano hasta el pecho.\n\n- Presión de Shiatsu en todo el meridiano del Corazón, deteniéndose en el punto 7HT y continuando hasta el punto 9HT.\n\n- Presión de Shiatsu en el meridiano del Pericardio.",
						"puntiMTC": [
							{
								"n": 7,
								"m": "HT",
								"e": "",
								"z": "dito",
								"t": "",
								"s": "7.HT"
							},
							{
								"n": 6,
								"m": "PC",
								"e": "",
								"z": "dito",
								"t": "",
								"s": "6.PC"
							},
							{
								"n": 7,
								"m": "PC",
								"e": "",
								"z": "dito",
								"t": "",
								"s": "7.PC"
							},
							{
								"n": 20,
								"m": "GV",
								"e": "",
								"z": "coppetta",
								"t": "",
								"s": "20.GV"
							},
							{
								"n": 1,
								"m": "SP",
								"e": "",
								"z": "dito",
								"t": "",
								"s": "1.SP"
							},
							{
								"n": 11,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "11.BL"
							},
							{
								"n": 28,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "Punto Shu de Vejiga",
								"s": "28.BL"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Vejiga urinaria",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "SP",
								"NomeMeridiano": "Bazo",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "HT",
								"NomeMeridiano": "Corazón",
								"valEnergetica": "V"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "HIPCONDRIA",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ESTRES",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "MANOS FRÍAS ",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "CEFALEA",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "INSOMNIO",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANSIEDAD",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "BOCA SECA",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "SABOR AMARGO EN LA BOCA",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "PESADILLAS Y PENSAMIENTOS RECURRENTES",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "DOLOR AL ORINAR",
								"score": 6
							}
						],
						"gallery": [
							{
								"idFile": "file_2674478724650",
								"Dida": ""
							},
							{
								"idFile": "file_2674478728149",
								"Dida": ""
							},
							{
								"idFile": "file_2674478731260",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1674514800,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692049984,
						"LabelCiclo": "Ciclo de Shiatsu - Ansiedad",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*10
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Segundo Tratamiento de Ansiedad",
						"TestoTrattamento": "El cliente informa haber experimentado un cambio emocional en comparación con la semana anterior, sin embargo, los síntomas indicados en la anamnesis persisten. Se queja de palpitaciones nocturnas molestas y frecuentes, precedidas por pesadillas y pensamientos obsesivos.\n\nDecido también incorporar técnicas de estiramiento y reequilibrio del Qi.\n\nTratamiento:\nPalpación de Shiatsu en el meridiano de la Vejiga de 11BL a 28BL, tonificando los puntos 15BL y 20BL, respectivamente puntos Shu del Corazón y del Bazo.\n\nPresión de Shiatsu en todo el meridiano del Riñón, deteniéndose en 1KI y 3KI.\n\nPresión de Shiatsu en todo el meridiano del Corazón y el Mastro del Corazón, deteniéndose en 8PC.\n\nTambién se trató el meridiano del Intestino Grueso para la regulación del Mediodía Medianoche y para la tonificación de los Fluidos Jin.",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 7,
								"m": "HT",
								"e": "P",
								"z": "dito",
								"t": "",
								"s": "7.HT"
							},
							{
								"n": 6,
								"m": "PC",
								"e": "D",
								"z": "dito",
								"t": "",
								"s": "6.PC"
							},
							{
								"n": 7,
								"m": "PC",
								"e": "D",
								"z": "dito",
								"t": "",
								"s": "7.PC"
							},
							{
								"n": 20,
								"m": "GV",
								"e": "V",
								"z": "moxa",
								"t": "",
								"s": "20.GV"
							},
							{
								"n": 6,
								"m": "SP",
								"e": "V",
								"z": "moxa",
								"t": "",
								"s": "6.SP"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Vescica urinaria",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "SP",
								"NomeMeridiano": "Milza-pancreas",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "HT",
								"NomeMeridiano": "Cuore",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "HIPCONDRIA",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ESTRES",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "MANOS FRÍAS ",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "CEFALEA",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "INSOMNIO",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANSIEDAD",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "BOCA SECA",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "SABOR AMARGO EN LA BOCA",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "PESADILLAS Y PENSAMIENTOS RECURRENTES",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "DOLOR AL ORINAR",
								"score": 4
							}
						],
						"gallery": [
							{
								"idFile": "file_2674478724650",
								"Dida": ""
							},
							{
								"idFile": "file_2674478728149",
								"Dida": ""
							},
							{
								"idFile": "file_2674478731260",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1675119600,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692049984,
						"LabelCiclo": "Ciclo de Shiatsu - Ansiedad",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*11
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Tercer Tratamiento de Ansiedad",
						"TestoTrattamento": "El Cliente Demo Iaomai informa haber experimentado mejoras sustanciales. Ahora puede conciliar el sueño pacíficamente y ya no se despierta durante la noche. Los sueños han disminuido significativamente y el sueño es tranquilo y reparador. El dolor de espalda ha desaparecido. Los demás síntomas también han mejorado.",
						"Prescrizione": "Tratamiento:\n\nDispersar el Fuego del Hígado y la Vesícula Biliar y tonificar los órganos respectivos. Presión de Shiatsu en el meridiano de la Vejiga de 11BL a 28BL, deteniéndose en 18BL y 19BL como los puntos Shu del Hígado y la Vesícula Biliar.\n\nPresión de Shiatsu a lo largo de todo el meridiano de la Vesícula Biliar, deteniéndose en GB20 y GB21.\nPresión de Shiatsu en todo el meridiano del Hígado. También se trató el meridiano del Corazón para la regulación del Mediodía-Medianoche.",
						"puntiMTC": [
							{
								"n": 11,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "",
								"s": "11.BL"
							},
							{
								"n": 18,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "Punto Shu de Hígado",
								"s": "18.BL"
							},
							{
								"n": 19,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "PuntoShu de Vesícula biliar",
								"s": "19.BL"
							},
							{
								"n": 28,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "PuntoShu de Vejiga",
								"s": "28.BL"
							},
							{
								"n": 20,
								"m": "GB",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "20.GB"
							},
							{
								"n": 21,
								"m": "GB",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "21.GB"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Vejiga urinaria",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Vesícula biliar",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "LR",
								"NomeMeridiano": "Hígado",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "HIPCONDRIA",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ESTRES",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "MANOS FRÍAS ",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "CEFALEA",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "INSOMNIO",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANSIEDAD",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "BOCA SECA",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "SABOR AMARGO EN LA BOCA",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "PESADILLAS Y PENSAMIENTOS RECURRENTES",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "DOLOR AL ORINAR",
								"score": 3
							}
						],
						"gallery": [
							{
								"idFile": "file_2674478724650",
								"Dida": ""
							},
							{
								"idFile": "file_2674478728149",
								"Dida": ""
							},
							{
								"idFile": "file_2674478731260",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1676329200,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692049984,
						"LabelCiclo": "Ciclo de Shiatsu - Ansiedad",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*12
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Cuarto Tratamiento de Ansiedad",
						"TestoTrattamento": "El receptor informa que ya no se despierta por la noche, el sueño es tranquilo y reparador, y las pesadillas han desaparecido. También informa que está menos irritable y no tiene episodios de dolor de cabeza. Ha recuperado energía física y en general ha mejorado el tono del estado de ánimo. El aspecto ansioso sigue presente, aunque parece haber disminuido desde el primer encuentro. Todavía se queja de un sabor amargo en la boca, especialmente en las primeras horas del día. Tratamiento:\nDispersar el Fuego del Hígado y la Vesícula Biliar y tonificar los órganos respectivos. Presión Shiatsu en el meridiano de la Vejiga de 11BL a 28BL, deteniéndose en 18BL y 19BL como los puntos Shu del Hígado y la Vesícula Biliar.",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 11,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "",
								"s": "11.BL"
							},
							{
								"n": 18,
								"m": "BL",
								"e": "V",
								"z": "moxa",
								"t": "Punto Shu de Hígado",
								"s": "18.BL"
							},
							{
								"n": 19,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "Punto Shu de Vesícula biliar",
								"s": "19.BL"
							},
							{
								"n": 28,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "Punto Shu de Vejiga",
								"s": "28.BL"
							},
							{
								"n": 13,
								"m": "LR",
								"e": "V",
								"z": "moxa",
								"t": "Punto BO de Bazo",
								"s": "13.LR"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Vejiga urinaria",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Vesícula biliar",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "LR",
								"NomeMeridiano": "Hígado",
								"valEnergetica": "P",
								"descrizione": ""
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "HIPCONDRIA",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ESTRES",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "MANOS FRÍAS ",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "CEFALEA",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "INSOMNIO",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANSIEDAD",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "BOCA SECA",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "SABOR AMARGO EN LA BOCA",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "PESADILLAS Y PENSAMIENTOS RECURRENTES",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "DOLOR AL ORINAR",
								"score": 5
							}
						],
						"gallery": [
							{
								"idFile": "file_2674478724650",
								"Dida": ""
							},
							{
								"idFile": "file_2674478728149",
								"Dida": ""
							},
							{
								"idFile": "file_2674478731260",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1676934000,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692049984,
						"LabelCiclo": "Ciclo de Shiatsu - Ansiedad",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*13
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Quinto Tratamiento de Ansiedad",
						"TestoTrattamento": "El receptor informa no solo de sentirse mejor, sino también de sentirse cambiado internamente. Se duerme fácilmente y los pensamientos obsesivos se han convertido en una lección de vida. El cansancio matutino casi ha desaparecido y se despierta con mucha más energía física y mental. Esto también en conjunto con la elección de retomar el hábito perdido desde hace tiempo de dar un paseo después de cenar. El estrés sigue presente, pero afirman saber manejarlo mejor y liberarlo antes de regresar a casa. Se acuerda proceder con un tratamiento de mantenimiento AGUA-MADERA junto con técnicas de estiramiento.",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "KI",
								"NomeMeridiano": "Riñón",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Vesícula biliar",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "LR",
								"NomeMeridiano": "Hígado",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "HIPCONDRIA",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ESTRES",
								"score": 5
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "MANOS FRÍAS ",
								"score": 1
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "CEFALEA",
								"score": 2
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "INSOMNIO",
								"score": 1
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANSIEDAD",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "BOCA SECA",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "SABOR AMARGO EN LA BOCA",
								"score": 2
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "PESADILLAS Y PENSAMIENTOS RECURRENTES",
								"score": 1
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "DOLOR AL ORINAR",
								"score": 0
							}
						],
						"gallery": [
							{
								"idFile": "file_2674478724650",
								"Dida": ""
							},
							{
								"idFile": "file_2674478728149",
								"Dida": ""
							},
							{
								"idFile": "file_2674478731260",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1677452400,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692049984,
						"LabelCiclo": "Ciclo de Shiatsu - Ansiedad",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*14
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Guía para la sesión individual",
						"TestoTrattamento": "En esta sección tienes la posibilidad de agregar una sesión individual a la carpeta de tu paciente / receptor.\nEsto te permitirá mantener un registro del tratamiento tanto desde el punto de vista clínico como económico.\n\nTambién puedes agregar una prescripción, síntomas, puntos o meridianos tratados.",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [],
						"gallery": [],
						"TimeTrattamento": 1674601200,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1693846663,
						"LabelCiclo": "",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*15
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Anamnesis",
						"TestoTrattamento": "{\"AnamnesiMotivo\":\"CUESTIONARIO DE ANAMNESIS (con fines demostrativos)\\n\\n¿Desde cuándo tiene problemas de insomnio? Aproximadamente 6 meses.\\n¿Cuáles son los principales síntomas del insomnio que experimenta? Dificultad para conciliar el sueño por la noche y despertares nocturnos frecuentes.\\n¿Ha notado factores específicos que desencadenen o empeoren su insomnio? Principalmente estrés relacionado con el trabajo y ansiedad.\\n\\nHistorial Médico Previo:\\n¿Ha tenido alguna vez problemas de salud mental o trastornos del estado de ánimo? No se ha diagnosticado ningún trastorno del estado de ánimo anteriormente. Ha tenido episodios esporádicos de ansiedad.\\n¿Está tomando algún medicamento o suplemento que pueda afectar su sueño? Actualmente no está tomando ningún medicamento.\\n¿Ha recibido algún tratamiento anterior para el insomnio? Ha probado técnicas de relajación y tés calmantes, pero sin éxito duradero.\\n\\nEstilo de Vida y Hábitos:\\nDescriba su estilo de vida general. María trabaja a tiempo completo y a menudo se siente estresada debido a plazos y responsabilidades laborales. Toma café por la mañana y ocasionalmente una taza por la tarde.\\n¿Cómo maneja el estrés en su vida diaria? Practica yoga y meditación, pero últimamente ha tenido dificultades para encontrar tiempo.\\n¿Cuáles son sus hábitos antes de acostarse? A menudo mira la televisión o usa el teléfono justo antes de irse a la cama.\\n\\nObjetivos del Tratamiento:\\n¿Cuál es el objetivo principal que desea lograr a través de la auriculoterapia para el insomnio?\\nMaría desea mejorar la calidad del sueño, reducir la ansiedad y aprender técnicas para manejar el estrés de manera más efectiva.\\n\\nNotas Adicionales:\\nMaría está especialmente interesada en los tratamientos naturales y quiere explorar la auriculoterapia como opción.\",\"AnamnesiDiagnosiOccidentale\":\"Diagnóstico en Medicina Occidental: Trastorno de Insomnio Primario\\n\\nExplicación:\\nEl trastorno de insomnio primario es una condición en la que el paciente tiene dificultades para iniciar o mantener el sueño a pesar de tener la oportunidad de hacerlo. Esto puede ser causado por factores como ansiedad, estrés, depresión, malos hábitos de sueño, consumo excesivo de cafeína o alcohol y trastornos en el ritmo circadiano.\\n\\nSíntomas Asociados:\\n\\nDificultad para conciliar el sueño\\nDespertares nocturnos frecuentes\\nSensación de sueño no reparador al despertar\\nFatiga durante el día\\nIrritabilidad y dificultad para concentrarse\\nTratamiento en Medicina Occidental:\\nEl tratamiento en la medicina occidental para el trastorno de insomnio puede variar según la causa subyacente. Puede incluir intervenciones conductuales, como terapia cognitivo-conductual para el insomnio (CBT-I), que tiene como objetivo mejorar la higiene del sueño y cambiar hábitos perjudiciales. En algunos casos, se pueden recetar medicamentos hipnóticos a corto plazo para ayudar a estabilizar el sueño.\\n\\nPlan de Tratamiento:\\nUn plan de tratamiento puede involucrar una combinación de terapias conductuales, como CBT-I, control del entorno del sueño, educación sobre la reducción de la ansiedad y el estrés, y adopción de estrategias de relajación. En casos seleccionados, el médico puede considerar la prescripción de medicamentos a corto plazo, pero con precaución en cuanto a posibles efectos secundarios y dependencia.\",\"AnamnesiDiagnosiMTC\":\"Estancamiento de Qi y Sangre con Deficiencia de Shen (Mente)\\n\\nExplicación:\\nDesde la perspectiva de la MTC, el insomnio puede ser visto como el resultado de un bloqueo de la energía (Qi) y la circulación sanguínea, que puede causar tensión e inquietud. El \\\"Shen\\\", que representa el aspecto mental y espiritual, puede debilitarse debido al estrés y la ansiedad y puede afectar la capacidad para conciliar el sueño y mantener un sueño reparador.\\n\\nSíntomas Asociados:\\n\\nDificultad para conciliar el sueño\\nDespertares nocturnos frecuentes\\nInquietud y agitación mental\\nFatiga matutina\\nAnsiedad\\nTratamiento en MTC:\\nEl objetivo del tratamiento en MTC sería restablecer el flujo armónico de Qi y Sangre, reducir la tensión mental y fortalecer el Shen. Esto se podría lograr a través de la auriculoterapia, el uso de acupuntura y terapia herbal específica. La terapia tendría como objetivo desbloquear la energía estancada, promover la relajación y mejorar la calidad del sueño.\\n\\nPlan de Tratamiento:\\nUn plan de tratamiento puede incluir sesiones regulares de auriculoterapia, tratamientos de acupuntura específicos, consejos sobre manejo del estrés como meditación y relajación, así como prescripciones personalizadas de hierbas chinas para fortalecer el Qi, la Sangre y el Shen.\"}",
						"Prescrizione": "Auriculoterapia:\nSometerse a sesiones semanales de auriculoterapia durante un total de 6-8 semanas. Durante estas sesiones, se estimularán los puntos auriculares relacionados con la relajación, el sueño y la reducción de la ansiedad. El auriculoterapeuta evaluará la respuesta del cuerpo y ajustará el tratamiento en consecuencia.\n\nTerapia Cognitivo-Conductual para el Insomnio (CBT-I):\nParticipar en un programa de terapia cognitivo-conductual para el insomnio. Este programa incluye sesiones semanales durante las primeras 4-6 semanas, seguidas de sesiones de seguimiento quincenales. La CBT-I tiene como objetivo mejorar la higiene del sueño, abordar los pensamientos negativos relacionados con el sueño y establecer un horario regular de sueño-vigilia.\n\nEstrategias de Manejo del Estrés:\nPracticar técnicas de relajación como la meditación y la respiración profunda durante al menos 10-15 minutos al día, preferiblemente antes de acostarse. Estas prácticas pueden ayudar a reducir la ansiedad y preparar el cuerpo para dormir.\n\nRecomendaciones de Estilo de Vida:\n\nEvitar el consumo de cafeína y alcohol por la tarde y por la noche.\nLimitar el uso de dispositivos electrónicos antes de acostarse.\nMantener un entorno de sueño cómodo, con una iluminación tenue y una temperatura adecuada.\nEvitar comidas pesadas justo antes de acostarse.\nSeguimiento:\nSe programará un seguimiento después de 8 semanas para evaluar la respuesta al tratamiento y realizar los ajustes necesarios. Por favor, lleve un diario del sueño y anote cualquier mejora o cambio.\n\nNotas Adicionales:\nSiga las instrucciones proporcionadas por el terapeuta auriculoterapeuta y el terapeuta de CBT-I. En caso de efectos secundarios o preocupaciones, comuníquese con el médico de inmediato.",
						"puntiMTC": [],
						"puntiAuricolari": [
							{
								"s": "003",
								"n": "Ápice del Pabellón Auricular",
								"z": "",
								"e": "",
								"t": ""
							},
							{
								"s": "013",
								"n": "Ansiedad de Romoli",
								"z": "",
								"e": "",
								"t": ""
							},
							{
								"s": "230",
								"n": "Master Cerebral Point",
								"z": "",
								"e": "",
								"t": ""
							},
							{
								"s": "195",
								"n": "Epífisis",
								"z": "",
								"e": "",
								"t": ""
							}
						],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Dificultad para Conciliar el Sueño",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Despertares Nocturnos Frecuentes",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Inquietud y Agitación Mental",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Cansancio al Despertar",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANSIEDAD",
								"score": 10
							}
						],
						"gallery": [
							{
								"idFile": "file_1692134504542",
								"Dida": ""
							}
						],
						"TimeTrattamento": 0,
						"oraInizio": -1,
						"oraFine": -1,
						"DataModifica": 1692134508,
						"LabelCiclo": "Ciclo de Terapia Auricular para el Insomnio",
						"TipoTrattamento": "A",
						"CostoTrattamento": 0,
						"ordine": 2,
						"Cancellato": 0,
						"frv": true
					},
					{//*16
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Sesión 1: Evaluación inicial y relajación",
						"TestoTrattamento": "Duración: 45 minutos\n\nDurante la primera sesión, se da la bienvenida al paciente y se somete a una breve evaluación de su historial clínico y los síntomas relacionados con el insomnio. El auriculoterapeuta explica el proceso de tratamiento y coloca suavemente pequeñas agujas o semillas en el mapa auricular correspondiente a los puntos que pueden influir en el sueño y la relajación. Luego, se deja al paciente para que se relaje durante 20-30 minutos, durante los cuales se le anima a concentrarse en la respiración profunda y a despejar la mente.",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [
							{
								"s": "045",
								"n": "Insomnio 1",
								"z": "ago",
								"e": "D",
								"t": ""
							},
							{
								"s": "245",
								"n": "Insomnio 2",
								"z": "ago",
								"e": "D",
								"t": ""
							}
						],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Dificultad para Conciliar el Sueño",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Despertares Nocturnos Frecuentes",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Inquietud y Agitación Mental",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Cansancio al Despertar",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANSIEDAD",
								"score": 9
							}
						],
						"gallery": [],
						"TimeTrattamento": 1692050400,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692177913,
						"LabelCiclo": "Ciclo de Terapia Auricular para el Insomnio",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*17
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Sesión 2: Estimulación de los Puntos de Sueño",
						"TestoTrattamento": "En la segunda sesión, el auriculoterapeuta examina la evolución del paciente desde la sesión anterior y procede con una estimulación más específica de los puntos auriculares relacionados con el sueño. Las agujas o semillas se colocan con mayor precisión, centrándose en puntos específicos asociados a la mejora del insomnio. Se deja al paciente nuevamente para que se relaje mientras las agujas actúan.",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [
							{
								"s": "045",
								"n": "Insomnio 1",
								"z": "ago",
								"e": "",
								"t": ""
							},
							{
								"s": "245",
								"n": "Insomnio 2",
								"z": "ago",
								"e": "",
								"t": ""
							}
						],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Dificultad para Conciliar el Sueño",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Despertares Nocturnos Frecuentes",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Inquietud y Agitación Mental",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Cansancio al Despertar",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANSIEDAD",
								"score": 9
							}
						],
						"gallery": [],
						"TimeTrattamento": 1692568800,
						"oraInizio": 132,
						"oraFine": 144,
						"DataModifica": 1692177897,
						"LabelCiclo": "Ciclo de Terapia Auricular para el Insomnio",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*18
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": " Sesión 3: Equilibrio Energético",
						"TestoTrattamento": "Duración: 50 minutos\n\nEn la tercera sesión, el auriculoterapeuta continúa ajustando la estimulación de los puntos auriculares, centrándose en el equilibrio energético del paciente. También se consideran los factores de estrés o ansiedad que pueden contribuir al insomnio. Durante esta sesión, el paciente también puede recibir consejos sobre técnicas de manejo del estrés y de relajación para aplicar en casa.",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [
							{
								"s": "045",
								"n": "Insomnio 1",
								"z": "ago",
								"e": "D",
								"t": ""
							},
							{
								"s": "245",
								"n": "Insomnio 2",
								"z": "ago",
								"e": "D",
								"t": ""
							},
							{
								"s": "000",
								"n": "Punto Cero",
								"z": "seme_vaccaria",
								"e": "",
								"t": ""
							}
						],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Dificultad para Conciliar el Sueño",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Despertares Nocturnos Frecuentes",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Inquietud y Agitación Mental",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Cansancio al Despertar",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANSIEDAD",
								"score": 7
							}
						],
						"gallery": [],
						"TimeTrattamento": 1692914400,
						"oraInizio": 126,
						"oraFine": 144,
						"DataModifica": 1692177857,
						"LabelCiclo": "Ciclo de Terapia Auricular para el Insomnio",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*19
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Sesión 4: Consolidación del progreso",
						"TestoTrattamento": "Duración: 45 minutos\n\nEn la cuarta sesión, el paciente y el terapeuta auricular evalúan juntos los progresos logrados hasta ahora. El paciente puede informar una mejora en la calidad del sueño, una mayor duración del mismo o una menor frecuencia de despertares nocturnos. El terapeuta auricular adapta el tratamiento en función de estos resultados y continúa estimulando los puntos auriculares involucrados en la mejora del sueño.",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [
							{
								"s": "045",
								"n": "Insomnio 1",
								"z": "ago",
								"e": "",
								"t": ""
							},
							{
								"s": "245",
								"n": "Insomnio 2",
								"z": "ago",
								"e": "",
								"t": ""
							},
							{
								"s": "000",
								"n": "Punto Cero",
								"z": "seme_vaccaria",
								"e": "",
								"t": ""
							}
						],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Dificultad para Conciliar el Sueño",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Despertares Nocturnos Frecuentes",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Inquietud y Agitación Mental",
								"score": 5
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Cansancio al Despertar",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANSIEDAD",
								"score": 7
							}
						],
						"gallery": [],
						"TimeTrattamento": 1693432800,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692178254,
						"LabelCiclo": "Ciclo de Terapia Auricular para el Insomnio",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*20
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Sesión 5: Mantenimiento y Conclusiones",
						"TestoTrattamento": "En la última sesión del ciclo, la atención se centra en mantener los progresos logrados. El auriculoterapeuta podría sugerir un plan de tratamiento a largo plazo, que podría incluir visitas periódicas para mantener los beneficios obtenidos. Se alienta al paciente a continuar practicando técnicas de relajación y a manejar el estrés en la vida diaria.",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [
							{
								"s": "045",
								"n": "Insomnio 1",
								"z": "ago",
								"e": "",
								"t": ""
							},
							{
								"s": "245",
								"n": "Insomnio 2",
								"z": "dito",
								"e": "",
								"t": ""
							},
							{
								"s": "000",
								"n": "Punto Cero",
								"z": "seme_vaccaria",
								"e": "",
								"t": ""
							}
						],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Dificultad para Conciliar el Sueño",
								"score": 2
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Despertares Nocturnos Frecuentes",
								"score": 0
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Inquietud y Agitación Mental",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Cansancio al Despertar",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANSIEDAD",
								"score": 5
							}
						],
						"gallery": [],
						"TimeTrattamento": 1693864800,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692178379,
						"LabelCiclo": "Ciclo de Terapia Auricular para el Insomnio",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					}
				],
				"saldi": [
					{
						"idSaldo": 0,
						"idPaziente": 0,
						"MotivoSaldo": "Tratamiento de Acupuntura",
						"RicevutaSaldo": "2",
						"ValoreSaldo": 150,
						"DataSaldo": 1674860400,
						"DataModifica": 1691909111,
						"Cancellato": 0,
						"frv": true
					},
					{
						"idSaldo": 0,
						"idPaziente": 0,
						"MotivoSaldo": "Tratamiento Shiatsu",
						"RicevutaSaldo": "1",
						"ValoreSaldo": 50,
						"DataSaldo": 1674428400,
						"DataModifica": 1691909111,
						"Cancellato": 0,
						"frv": true
					},
					{
						"idSaldo": 0,
						"idPaziente": 0,
						"MotivoSaldo": "Tratamiento de Acupuntura, Anticipado",
						"RicevutaSaldo": "3",
						"ValoreSaldo": 150,
						"DataSaldo": 1675119600,
						"DataModifica": 1691909111,
						"Cancellato": 0,
						"frv": true
					},
					{
						"idSaldo": 0,
						"idPaziente": 0,
						"MotivoSaldo": "Tratamiento de Equilibrio",
						"RicevutaSaldo": "5",
						"ValoreSaldo": 150,
						"DataSaldo": 1692136800,
						"DataModifica": 1692183527,
						"Cancellato": 0,
						"frv": true
					}
				],
				"Cancellato": 0,
				"frv": true
			}
		],
		servizi: [
			{//*
				"idServizio": 0,
				"NomeServizio": "Ciclo de Auriculoterapia para dejar de fumar",
				"DescrizioneServizio": "La acupuntura es efectiva para romper la adicción a la nicotina.\n\nEl tratamiento se basa en un análisis exhaustivo de los síntomas de abstinencia y tiene como objetivo equilibrar las energías del cuerpo para mejorar la salud.\n\nLa acupuntura puede ayudar a aquellos que desean dejar de fumar reduciendo el deseo de cigarrillos, la ansiedad y la necesidad del ritual de fumar. El tratamiento también puede provocar una sensación de repulsión por el sabor y el olor de los cigarrillos.\n\nSi la persona está decidida a dejar de fumar, los efectos beneficiosos pueden verse tan pronto como en la tercera o cuarta sesión.\n\nEl protocolo clásico, desarrollado por P. Nogier, dura de 15 a 20 minutos en una sola sesión y requiere abstinencia de al menos 6 horas antes del tratamiento.\n",
				"CostoServizio": 150,
				"NumeroSedute": 5,
				"DataModifica": 1674490894,
				"DataCreazione": 1674490810,
				"Cancellato": 0,
				"frv": true
			},
			{//*
				"idServizio": 0,
				"NomeServizio": "Ciclo de Shiatsu para la Ansiedad",
				"DescrizioneServizio": "El estado emocional de cada persona es subjetivo y se manifiesta de las formas más inverosímiles; una baja autoestima subyacente puede llevar a una persona a creer que no puede superar los desafíos que la vida le presenta. El estrés acentuado que socava nuestra paz puede llevarnos a un estado de emergencia, dando lugar a la ansiedad, el miedo y el famoso ataque de pánico. Los síntomas agudos pueden incluir taquicardia, respiración dificultosa, miedo acompañado de una oleada de adrenalina, una sensación muy desagradable especialmente porque las crisis a veces aparecen de repente, sin previo aviso, y quienes las padecen viven aterrorizados de entrar en la fase de 'Terro'.\n\nSi el estado de angustia es profundo, grave y duradero, requiere la intervención de un especialista.\n",
				"CostoServizio": 50,
				"NumeroSedute": 5,
				"DataModifica": 1674490934,
				"DataCreazione": 1674490895,
				"Cancellato": 0,
				"frv": true
			},
			{//*
				"idServizio": 0,
				"NomeServizio": "Ciclo de Acupuntura para el Bruxismo",
				"DescrizioneServizio": "El bruxismo se refiere a una condición en la que los dientes se aprietan y se muelen, frotando el arco superior contra el inferior mientras se aprietan las mandíbulas con cierta fuerza.\n\nEl bruxismo es una condición bastante común que depende de la contracción involuntaria de los músculos de la masticación.\n\nOcurre principalmente por la noche y puede causar una serie de consecuencias: desgaste de los dientes, dolor de mandíbula, dolores de cabeza.",
				"CostoServizio": 100,
				"NumeroSedute": 5,
				"DataModifica": 1674491088,
				"DataCreazione": 1674490935,
				"Cancellato": 0,
				"frv": true
			},
			{//*
				"idServizio": 0,
				"NomeServizio": "Guía de Servicio",
				"DescrizioneServizio": "En esta sección tienes la opción de precargar los servicios que ofreces habitualmente a tus clientes/pacientes.\n\nAl agregar el precio y el número de sesiones del servicio, acelerarás el proceso de inserción.\n\nPor ejemplo, el paquete \"Anti-Tabaco\", insomnio, alergias, reequilibrio de Qi....\nCosto por sesión: 150€\nNúmero de sesiones: 5\n\n",
				"CostoServizio": 1,
				"NumeroSedute": 1,
				"DataModifica": 1674491592,
				"DataCreazione": 1674491089,
				"Cancellato": 0,
				"frv": true
			}
		],
		fornitori: [
			{
				"idFornitore": 0,
				"RagioneSociale": "Agujas y Puntos",
				"Intestazione": "Agujas y Puntos Srl\nvia Italia 96\nRoma",
				"PartitaIva": "0698765432",
				"CodiceFiscale": "ghagha84r16d200r",
				"Indirizzo": "via Italia 96",
				"CAP": "10000",
				"Citta": "Roma",
				"Provincia": "Roma",
				"Stato": "it",
				"Telefono": "06123456",
				"Email": "aghi@mail.com",
				"NoteFornitore": "Proveedor de agujas para acupuntura.\nConsultor para pedidos Sr. Angelo Spinoso\nPedidos superiores a 100€, descuento del 20%",
				"etichette": [],
				"DataModifica": 1629780089,
				"DataCreazione": 1629779932,
				"Cancellato": 0,
				"frv": true
			},
			{
				"idFornitore": 0,
				"RagioneSociale": "Mobiliario para Consultorios Srl",
				"Intestazione": "A la Atención de Mobiliario para Consultorios Srl\nVia Milano 113\nMilán",
				"PartitaIva": "06987653245",
				"CodiceFiscale": "RRDMBL84R16D111A",
				"Indirizzo": "Via Milano 113",
				"CAP": "10000",
				"Citta": "Milano",
				"Provincia": "MI",
				"Stato": "it",
				"Telefono": "3486851418",
				"Email": "arredamentiambulatori@mail.com",
				"NoteFornitore": "Proveedor mayorista de material para consultorios médicos.\nContacto agente Sr. Rossi Mario\nFactura a 90 días.\nExcelentes precios y calidad",
				"etichette": [
					{
						"idEtichetta": 0,
						"NomeEtichetta": "Facebook",
						"ValoreEtichetta": "@arredamentiambulatori",
						"sezione": "contatti"
					},
					{
						"idEtichetta": 0,
						"NomeEtichetta": "Instagram",
						"ValoreEtichetta": "@arreda_abulatori",
						"sezione": "contatti"
					}
				],
				"DataModifica": 1629780672,
				"DataCreazione": 1629780090,
				"Cancellato": 0,
				"frv": true
			}
		]
	},	
	fra: {
		pazienti: [
			{
				"idPaziente": 0,
				"Nome": "Client de démonstration",
				"Cognome": "IAOMAI",
				"Indirizzo": "25 Rue de Lobau",
				"CAP": "75004",
				"Citta": "Paris",
				"Provincia": "Île-de-France",
				"Stato": "fr",
				"Telefono": "",
				"Cellulare": "3486851418",
				"paeseCellulare": "fr",
				"Email": "app@iaomai.app",
				"sesso": "m",
				"NotePaziente": "Il a été admis le 23 janvier 20xx pour un début de crise cardiaque.\nPosture semi-cyphotique.\nVoyage beaucoup pour le travail, ce qui entraîne souvent des états de stress aigu.\nTendance hypocondriaque.",
				"DataNascita": "1984-10-16",
				"LuogoNascita": "Paris",
				"tags": [
					{
						"idTag": 0,
						"NomeTag": "1ª Shiatsu",
						"colore": "d7dafb"
					},
					{
						"idTag": 0,
						"NomeTag": "Acupuncture",
						"colore": "fbd7d7"
					},
					{
						"idTag": 0,
						"NomeTag": "Auriculothérapie",
						"colore": "d7f5fb"
					}
				],
				"etichette": [
					{
						"idEtichetta": 0,
						"NomeEtichetta": "Sport pratiqué:",
						"ValoreEtichetta": "Nuoto",
						"sezione": "aggiuntive"
					},
					{
						"idEtichetta": 0,
						"NomeEtichetta": "Contacter de préférence:",
						"ValoreEtichetta": "Dopo le ore 17.",
						"sezione": "aggiuntive"
					},
					{
						"idEtichetta": 0,
						"NomeEtichetta": "Site web",
						"ValoreEtichetta": "www.iaomai.app",
						"sezione": "contatti"
					},
					{
						"idEtichetta": 0,
						"NomeEtichetta": "Socialnetwork:",
						"ValoreEtichetta": "https://www.facebook.com/profile.php?id=100089849462315",
						"sezione": "contatti"
					}
				],
				"medicine": [
					{
						"idMedicina": 0,
						"NomeMedicina": "Ibuprofène"
					},
					{
						"idMedicina": 0,
						"NomeMedicina": "Kétoprofène"
					},
					{
						"idMedicina": 0,
						"NomeMedicina": "Naproxène"
					}
				],
				"allergie": [
					{
						"idAllergia": 0,
						"NomeAllergia": "Intolérant au gluten"
					},
					{
						"idAllergia": 0,
						"NomeAllergia": "Aliments au nickel"
					},
					{
						"idAllergia": 0,
						"NomeAllergia": "Poil de chat"
					}
				],
				"patologie": [
					{
						"idPatologia": 0,
						"NomePatologia": "ANXIÉTÉ"
					},
					{
						"idPatologia": 0,
						"NomePatologia": "Protrusion L4-L5"
					},
					{
						"idPatologia": 0,
						"NomePatologia": "Hypertension"
					},
					{
						"idPatologia": 0,
						"NomePatologia": "Arthrite rhumatoïde"
					},
					{
						"idPatologia": 0,
						"NomePatologia": "Allergie"
					},
					{
						"idPatologia": 0,
						"NomePatologia": "Asthme bronchique"
					}
				],
				"interventi": [
					{
						"idIntervento": 0,
						"NomeIntervento": "MÉNISQUE ET LIGAMENTS GAUCHE"
					},
					{
						"idIntervento": 0,
						"NomeIntervento": "MASTOPLASTIE ADDITIVE"
					},
					{
						"idIntervento": 0,
						"NomeIntervento": "En attente de chirurgie de hernie L4-L5"
					}
				],
				"gallery": [
					{
						"idFile": "file_2674427029613",
						"Dida": ""
					},
					{
						"idFile": "file_2674427069354",
						"Dida": ""
					}
				],
				"Provenienza": "Bouche à oreille",
				"Professione": "Employée",
				"Intestazione": "",
				"CodiceFiscale": "",
				"PartitaIva": "",
				"Social": "Facebook",
				"avatar": "data:image/jpeg;base64,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",
				"Altezza": "175",
				"Peso": "65",
				"DataModifica": 1694960504,
				"trattamenti": [
					{//*1
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Traitement Shiatsu - Raideur des membres inférieurs",
						"TestoTrattamento": "Arrivé à l'établissement, CLIENT DEMO choisit de suivre un traitement Shiatsu pour soulager les douleurs dans les membres inférieurs.\n\nAprès un entretien initial, de nombreux aspects intéressants de la personnalité du CLIENT émergent. \nCe qui me frappe le plus, c'est sa tolérance à la douleur. Le seuil de douleur est bien supérieur à la moyenne.\n\nL'évaluation partielle des méridiens Tendino-Musculaires met en évidence :\nVide de VU;\nVide de R;\nVB douloureux sur la jambe droite.\n\nL'évaluation de la zone Shu montre :\nVide de P;\nPlein de F;\nZone rénale dure;\nDouleur sur VU.\n\n---------------\n\nAprès le traitement, CLIENT DEMO se sent nettement mieux au point de ne pas ressentir le besoin de reproduire un nouveau traitement. Nous resterons en contact pour toute éventuelle rechute.\n",
						"Prescrizione": "Possibilité de travail pour une compréhension personnelle du corps et de ses dynamiques en termes de MTC.",
						"puntiMTC": [
							{
								"n": 13,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Point Shu du Poumon",
								"s": "13.BL"
							},
							{
								"n": 14,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Point Shu du Maître du cœur",
								"s": "14.BL"
							},
							{
								"n": 15,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Point Shu du Cœur",
								"s": "15.BL"
							},
							{
								"n": 18,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Point Shu du Foie",
								"s": "18.BL"
							},
							{
								"n": 19,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Point Shu de la Vésicule biliaire",
								"s": "19.BL"
							},
							{
								"n": 20,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Point Shu de la Rate",
								"s": "20.BL"
							},
							{
								"n": 21,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Point Shu de l'Estomac",
								"s": "21.BL"
							},
							{
								"n": 22,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Point Shu du Triple réchauffeur",
								"s": "22.BL"
							},
							{
								"n": 23,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Point Shu du Rein",
								"s": "23.BL"
							},
							{
								"n": 25,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Point Shu du Gros intestin",
								"s": "25.BL"
							},
							{
								"n": 27,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Point Shu de l'Intestin grêle",
								"s": "27.BL"
							},
							{
								"n": 28,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Point Shu de la Vessie",
								"s": "28.BL"
							},
							{
								"n": 1,
								"m": "LU",
								"e": "",
								"z": "",
								"t": "Point BO du Poumon",
								"s": "1.LU"
							},
							{
								"n": 17,
								"m": "CV",
								"e": "",
								"z": "",
								"t": "Point BO du Maître du cœur",
								"s": "17.CV"
							},
							{
								"n": 14,
								"m": "LR",
								"e": "",
								"z": "",
								"t": "Point BO du Foie",
								"s": "14.LR"
							},
							{
								"n": 24,
								"m": "GB",
								"e": "D",
								"z": "",
								"t": "Point BO de la Vésicule biliaire",
								"s": "24.GB"
							},
							{
								"n": 14,
								"m": "CV",
								"e": "",
								"z": "",
								"t": "Point BO du Cœur",
								"s": "14.CV"
							},
							{
								"n": 12,
								"m": "CV",
								"e": "",
								"z": "",
								"t": "Point BO de l'Estomac",
								"s": "12.CV"
							},
							{
								"n": 13,
								"m": "LR",
								"e": "P",
								"z": "",
								"t": "Point BO de la Rate",
								"s": "13.LR"
							},
							{
								"n": 25,
								"m": "GB",
								"e": "",
								"z": "",
								"t": "Point BO du Rein",
								"s": "25.GB"
							},
							{
								"n": 25,
								"m": "ST",
								"e": "P",
								"z": "",
								"t": "POINT DROIT PLUS HYPERACTIF",
								"s": "25.ST"
							},
							{
								"n": 5,
								"m": "CV",
								"e": "V",
								"z": "",
								"t": "Point BO du Triple réchauffeur",
								"s": "5.CV"
							},
							{
								"n": 4,
								"m": "CV",
								"e": "",
								"z": "",
								"t": "Point BO de l'Intestin grêle",
								"s": "4.CV"
							},
							{
								"n": 3,
								"m": "CV",
								"e": "V",
								"z": "",
								"t": "Point BO de la Vessie",
								"s": "3.CV"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "KI",
								"NomeMeridiano": "Rein",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Vésicule biliaire",
								"valEnergetica": "D"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "RAIDEUR DES MEMBRES INFÉRIEURS",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "MAIN FROIDE ",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "STRESS",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "HYPOCHONDRIE",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "MAUX DE TÊTE",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "QUALITÉ DU SOMMEIL",
								"score": 4
							}
						],
						"gallery": [
							{
								"idFile": "file_2674467779004",
								"Dida": ""
							},
							{
								"idFile": "file_2674467791995",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1672527600,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1691909111,
						"LabelCiclo": "",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*2
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Anamnèse",
						"TestoTrattamento": "{\"AnamnesiMotivo\": \"Le Client Demo Iaomai vient me voir pour commencer un cycle de traitements de shiatsu afin d'essayer de résoudre une série de troubles liés à l'anxiété dont il souffre depuis des années.\\n\\nIl se plaint de difficultés à s'endormir depuis un certain temps et se réveille très fatigué le matin.\\nLes symptômes s'aggravent en proportion du stress lié au travail.\\nSueurs, pensées récurrentes et obsessionnelles, et rumination surviennent souvent pendant la nuit.\\n\\nPendant la journée, l'accumulation de stress se manifeste somatiquement dans la région lombaire, particulièrement au niveau des reins.\\nDepuis quelques semaines, l'urine est rare et foncée, il se plaint de sécheresse buccale et d'une sensation de lourdeur à la tête ; de temps en temps, des acouphènes légers apparaissent.\\n\\nLe goût amer dans la bouche est récurrent\\n\",\"AnamnesiDiagnosiOccidentale\": \"L'état émotionnel de chaque personne est subjectif et se manifeste de la manière la plus improbable, un manque de confiance en soi fondamental peut amener une personne à penser qu'elle ne peut pas surmonter les épreuves que la vie nous met devant. Un stress prononcé qui nuit à notre calme peut nous amener à basculer et c'est ainsi que surviennent l'anxiété, la peur, la fameuse crise de panique. Comme symptôme en phase aiguë, on peut avoir une tachycardie, une respiration laborieuse, la peur avec une montée d'adrénaline consécutive, une sensation très désagréable également car les crises surviennent parfois soudainement, sans avertissement, et ceux qui en souffrent vivent dans la terreur d'entrer dans la phase de \\\"Terreur\\\".\\nSi l'état d'angoisse est profond, sévère et permanent, alors l'intervention d'un spécialiste est nécessaire. \",\"AnamnesiDiagnosiMTC\": \"T.C.M.\\nL'anxiété, la peur, l'angoisse et l'hyperémotivité sont considérées comme un excès de Qi dans les méridiens du Cœur et du Maître du cœur, qui doivent réguler le tonus du plexus cardiaque.\\nSi la pathologie est chronique, elle peut également être liée à d'autres méridiens.\\n\\n\"}",
						"Prescrizione": "Thérapie\nDisperser et réguler le Qi dans les méridiens du Cœur et du Maître du cœur,\nRestaurer la communication entre le Cœur et le Rein - Niveau énergétique Shao Yin -\nCalmer le Shen",
						"puntiMTC": [
							{
								"n": "03",
								"m": "KI",
								"e": "V",
								"z": "",
								"t": "",
								"s": "3.KI"
							},
							{
								"n": "36",
								"m": "ST",
								"e": "P",
								"z": "",
								"t": "sur la jambe droite plus interactif que sur la jambe gauche. ",
								"s": "36.ST"
							},
							{
								"n": "04",
								"m": "LI",
								"e": "D",
								"z": "coppetta",
								"t": "",
								"s": "04.LI"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "KI",
								"NomeMeridiano": "ReReinne",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "ST",
								"NomeMeridiano": "Estomac",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Vessie urinaire",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Vésicule biliaire",
								"valEnergetica": "V"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "HYPOCHONDRIE",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "STRESS",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "MAIN FROIDES ",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "MAUX DE TÊTE",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "INSOMNIE",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANXIÉTÉ",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "BOUCHE SÈCHE",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "GOÛT AMER DANS LA BOUCHE",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "CAUCHEMARS ET PENSÉES RÉCURRENTES",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "DOULEUR EN URINANT",
								"score": 7
							}
						],
						"gallery": [
							{
								"idFile": "file_2674478724650",
								"Dida": ""
							},
							{
								"idFile": "file_2674478728149",
								"Dida": ""
							},
							{
								"idFile": "file_2674478731260",
								"Dida": ""
							}
						],
						"TimeTrattamento": 0,
						"oraInizio": -1,
						"oraFine": -1,
						"DataModifica": 1694960504,
						"LabelCiclo": "Cycle Shiatsu - Anxiété ",
						"TipoTrattamento": "A",
						"CostoTrattamento": 0,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*3
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Anamnèse",
						"TestoTrattamento": "{\"AnamnesiMotivo\":\"Antécédents médicaux :\\n\\n-Symptômes actuels :\\n\\nLe patient a signalé des symptômes de lombosciatique, y compris des douleurs lancinantes dans la région lombaire et des picotements le long de la jambe droite.\\nLes symptômes ont commencé il y a environ 6 semaines.\\n\\n-Événements déclencheurs :\\n\\nLe patient a indiqué un soulèvement inapproprié d'objets lourds comme cause possible des symptômes.\\n\\n-Antécédents médicaux :\\n\\nLe patient a signalé des problèmes vertébraux préexistants, tels qu'une légère hernie discale dans la région lombaire.\\nIl a reçu des traitements chiropratiques par le passé pour gérer les symptômes.\\n\\n-Médicaments et compléments alimentaires :\\n\\nLe patient prend actuellement de l'ibuprofène pour soulager la douleur.\\n\\n-Antécédents chirurgicaux :\\n\\nLe patient n'a pas subi d'interventions chirurgicales au dos ou dans la région lombaire par le passé.\\n\\n-Allergies et intolérances :\\n\\nLe patient a déclaré être allergique à la pénicilline.\\n\\n>Mode de vie et facteurs de risque :\\n\\n-Activité physique :\\n\\nLe patient a décrit son niveau d'activité physique comme modéré, avec des promenades régulières.\\n\\n-Posture et habitudes quotidiennes :\\n\\nLe patient travaille principalement sur ordinateur et est conscient d'avoir une posture non optimale pendant le travail.\\n\\n-Stress et facteurs psychologiques :\\n\\nLe patient a mentionné des niveaux de stress liés au travail qui pourraient avoir un impact sur la lombosciatique.\\n\\n-Objectifs de traitement :\\n\\nLe patient a exprimé le désir de réduire la douleur dans la région lombaire et d'améliorer la mobilité.\\n\\n-Notes supplémentaires :\\n\\nLors de la consultation, le patient a souligné l'importance de trouver un traitement avec une approche plus naturelle que l'utilisation à long terme de médicaments.\\n\",\"AnamnesiDiagnosiOccidentale\":\"Le CLIENTE DEMO IAOMAI présente une lombosciatique, caractérisée par des douleurs dans la région lombaire et des picotements le long du trajet du nerf sciatique. La condition semble être liée à une possible irritation du nerf sciatique, probablement déclenchée par un soulèvement inapproprié et exacerbée par la présence d'une hernie discale lombaire.\",\"AnamnesiDiagnosiMTC\":\"D'après l'analyse des symptômes et des facteurs de risque, la lombosciatique de CLIENTE DEMO IAOMAI pourrait être liée à une 'Obstruction du Qi et du Sang dans la Région Lombaire' selon les principes de la Médecine Traditionnelle Chinoise. L'accumulation de stress, la posture incorrecte et le soulèvement inapproprié pourraient avoir contribué à cette condition, entravant le flux harmonieux du Qi et du Sang le long des méridiens de la région lombaire.\\n\\nDu point de vue de la MTC, l'objectif du traitement sera d'éliminer l'obstacle, de favoriser la circulation du Qi et du Sang et de rétablir l'équilibre énergétique dans les méridiens impliqués.\\n\"}",
						"Prescrizione": "• Une stagnation est évidente dans le méridien de la vésicule biliaire car elle mobilise le Qi étant le niveau shaoyang qui permet le mouvement à la fois de l'énergie yang et yin. \n• Moxa sur 25VB, point Mu de Ren qui permet la naissance du yang. \n• Moxa sur 31VB, point du vent indiqué pour la stagnation. \n• 34VB, point de rencontre musculaire, selon Leung KwokPo traite le muscle capable d'induire le 'mouvement'. \n• Points importants qui mobilisent le sang sur le méridien de la vésicule biliaire 17BL, 40BL, 32 BL et 53BL \n• LV3, point shu de terre et yuan qui déplace le sang. \n• Yao fa pour mobiliser la région lombaire.",
						"puntiMTC": [
							{
								"n": 31,
								"m": "GB",
								"e": "D",
								"z": "",
								"t": "Douloureux à la palpation",
								"s": "31.GB"
							},
							{
								"n": 25,
								"m": "KI",
								"e": "D",
								"z": "",
								"t": "Douloureux à la palpation",
								"s": "25.KI"
							},
							{
								"n": 21,
								"m": "GB",
								"e": "P",
								"z": "",
								"t": "",
								"s": "21.GB.."
							},
							{
								"n": 30,
								"m": "GB",
								"e": "P",
								"z": "",
								"t": "",
								"s": "30.GB.."
							},
							{
								"n": 34,
								"m": "GB",
								"e": "D",
								"z": "",
								"t": "Douloureux à la palpation",
								"s": "34.GB"
							},
							{
								"n": 43,
								"m": "GB",
								"e": "D",
								"z": "",
								"t": "Douloureux à la palpation",
								"s": "43.GB"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Vésicule biliaire",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "KI",
								"NomeMeridiano": "Rein",
								"valEnergetica": "D"
							},
							{
								"siglaMeridiano": "ST",
								"NomeMeridiano": "Estomac",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Douleur lombaire",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Picotements et engourdissements",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Faiblesse musculaire",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Aggravation avec le mouvement",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Mouvement limité",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Douleur pendant la session",
								"score": 8
							}
						],
						"gallery": [
							{
								"idFile": "file_2674469901174",
								"Dida": ""
							},
							{
								"idFile": "file_2674469904750",
								"Dida": ""
							},
							{
								"idFile": "file_2674469909751",
								"Dida": ""
							}
						],
						"TimeTrattamento": 0,
						"oraInizio": -1,
						"oraFine": -1,
						"DataModifica": 1692183228,
						"LabelCiclo": "Cycle d'acupuncture pour la sciatique",
						"TipoTrattamento": "A",
						"CostoTrattamento": 0,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*4
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Séance 1 : Évaluation initiale et relaxation",
						"TestoTrattamento": "Durée : 45 minutes\n\nPendant la première séance, le patient est accueilli et fait l'objet d'une évaluation détaillée de son historique médical et des symptômes associés à la sciatique. L'acupuncteur explique le processus de traitement et identifie les points d'acupuncture clés à traiter. L'acupuncteur insère de fines aiguilles dans des points spécifiques le long des méridiens liés à la sciatique. Le patient est ensuite invité à se détendre pendant environ 20 à 30 minutes.",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 23,
								"m": "BL",
								"e": "D",
								"z": "ago",
								"t": "Point Shu du Rein",
								"s": "23.BL"
							},
							{
								"n": 32,
								"m": "BL",
								"e": "P",
								"z": "ago",
								"t": "",
								"s": "32.BL"
							},
							{
								"n": 8,
								"m": "BL",
								"e": "D",
								"z": "ago",
								"t": "",
								"s": "8.BL"
							},
							{
								"n": 30,
								"m": "BL",
								"e": "P",
								"z": "ago",
								"t": "",
								"s": "30.BL"
							},
							{
								"n": 4,
								"m": "CV",
								"e": "V",
								"z": "ago",
								"t": "Point BO de l'Intestin grêle",
								"s": "4.CV"
							},
							{
								"n": 4,
								"m": "SP",
								"e": "V",
								"z": "ago",
								"t": "",
								"s": "4.SP"
							},
							{
								"n": 31,
								"m": "GB",
								"e": "D",
								"z": "ago",
								"t": "",
								"s": "31.GB"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Vessie urinaire",
								"valEnergetica": "D",
								"descrizione": "Douloureux à la palpation"
							},
							{
								"siglaMeridiano": "KI",
								"NomeMeridiano": "Rein",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Vésicule biliaire",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Douleur lombaire",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Picotements et engourdissements",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Faiblesse musculaire",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Aggravation avec le mouvement",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Limitation du mouvement",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Douleur pendant la séance",
								"score": 10
							}
						],
						"gallery": [
							{
								"idFile": "file_2674427029613",
								"Dida": ""
							},
							{
								"idFile": "file_2674427069354",
								"Dida": ""
							},
							{
								"idFile": "file_2674469909751",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1674428400,
						"oraInizio": 132,
						"oraFine": 144,
						"DataModifica": 1692183278,
						"LabelCiclo": "Cycle d'acupuncture pour la sciatique",
						"TipoTrattamento": "B",
						"CostoTrattamento": 150,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*5
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Séance 2 : Réduction de l'inflammation et de la douleur",
						"TestoTrattamento": "Durée : 40 minutes\n\nLors de la deuxième séance, l'acupuncteur évalue les progrès du patient depuis la séance précédente et se concentre sur la réduction de l'inflammation et de la douleur associées à la sciatique. Les aiguilles sont placées pour stimuler des points qui peuvent aider à soulager l'inflammation des nerfs sciatiques et la douleur associée. Le patient est une fois de plus laissé pour se détendre pendant que les aiguilles agissent.",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 23,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "Point Shu du Rein",
								"s": "23.BL"
							},
							{
								"n": 32,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "32.BL"
							},
							{
								"n": 8,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "8.BL"
							},
							{
								"n": 30,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "30.BL"
							},
							{
								"n": 4,
								"m": "CV",
								"e": "",
								"z": "ago",
								"t": "Point BO de l'Intestin grêle",
								"s": "4.CV"
							},
							{
								"n": 4,
								"m": "SP",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "4.SP"
							},
							{
								"n": 31,
								"m": "GB",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "31.GB"
							},
							{
								"n": 12,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "12.BL"
							},
							{
								"n": 40,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "40.BL"
							},
							{
								"n": 60,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "60.BL"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Vessie urinaire",
								"valEnergetica": "D"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Vésicule biliaire",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "ST",
								"NomeMeridiano": "Estomac",
								"valEnergetica": "P",
								"descrizione": "Traitement palmaire pour les pensées obsessionnelles"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Douleur lombaire",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Picotements et engourdissements",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Faiblesse musculaire",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Aggravation avec le mouvement",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Limitation du mouvement",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Douleur pendant la séance",
								"score": 9
							}
						],
						"gallery": [
							{
								"idFile": "file_2674467779004",
								"Dida": ""
							},
							{
								"idFile": "file_2674469909751",
								"Dida": ""
							},
							{
								"idFile": "file_2674475331170",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1675033200,
						"oraInizio": 132,
						"oraFine": 144,
						"DataModifica": 1692183307,
						"LabelCiclo": "Cycle d'acupuncture pour la sciatique",
						"TipoTrattamento": "B",
						"CostoTrattamento": 150,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*6
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Séance 3 : Amélioration de la circulation et du flux énergétique",
						"TestoTrattamento": "Durée : 50 minutes\n\nLors de la troisième séance, l'acupuncteur continue à travailler sur la réduction de la douleur et de l'inflammation, mais se concentre également sur l'augmentation de la circulation sanguine et du flux énergétique dans la zone touchée. Les aiguilles sont placées pour stimuler le flux énergétique le long des méridiens reliés au bas du dos et à la zone sciatique.",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 8,
								"m": "GB",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "8.GB"
							},
							{
								"n": 20,
								"m": "GB",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "20.GB"
							},
							{
								"n": 22,
								"m": "GV",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "22.GV"
							},
							{
								"n": 10,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "10.BL"
							},
							{
								"n": 30,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "30.BL"
							},
							{
								"n": 23,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "Point Shu du Rein",
								"s": "23.BL"
							},
							{
								"n": 32,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "32.BL"
							},
							{
								"n": 4,
								"m": "SP",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "4.SP"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Vessie urinaire",
								"valEnergetica": "D"
							},
							{
								"siglaMeridiano": "ST",
								"NomeMeridiano": "Estomac",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Douleur lombaire",
								"score": 5
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Picotements et engourdissements",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Faiblesse musculaire",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Aggravation avec le mouvement",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Limitation du mouvement",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Douleur pendant la séance",
								"score": 7
							}
						],
						"gallery": [
							{
								"idFile": "file_2674469904750",
								"Dida": ""
							},
							{
								"idFile": "file_2674475331170",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1675638000,
						"oraInizio": 132,
						"oraFine": 144,
						"DataModifica": 1692183339,
						"LabelCiclo": "Cycle d'acupuncture pour la sciatique",
						"TipoTrattamento": "B",
						"CostoTrattamento": 150,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*7
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Séance 4 : Rééquilibrage musculaire et postural",
						"TestoTrattamento": "Durée : 45 minutes\n\nLors de la quatrième séance, l'acupuncteur évalue la posture et les muscles du patient, cherchant à identifier d'éventuels déséquilibres pouvant contribuer à la lombosciatalgie. Les aiguilles sont insérées dans des points qui aident à rééquilibrer les muscles et à améliorer la posture. Le patient peut également recevoir des conseils sur les exercices d'étirement ou de renforcement à faire chez lui.",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 20,
								"m": "GV",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "20.GV"
							},
							{
								"n": 7,
								"m": "HT",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "7.HT"
							},
							{
								"n": 20,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "Point Shu de la Rate",
								"s": "20.BL"
							},
							{
								"n": 40,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "40.BL"
							},
							{
								"n": 60,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "60.BL"
							},
							{
								"n": 37,
								"m": "BL",
								"e": "",
								"z": "coppetta",
								"t": "",
								"s": "37.BL"
							},
							{
								"n": 38,
								"m": "BL",
								"e": "",
								"z": "coppetta",
								"t": "",
								"s": "38.BL"
							},
							{
								"n": 41,
								"m": "BL",
								"e": "",
								"z": "coppetta",
								"t": "",
								"s": "41.BL"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Vessie urinaire",
								"valEnergetica": "D"
							},
							{
								"siglaMeridiano": "ST",
								"NomeMeridiano": "Estomac",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "CV",
								"NomeMeridiano": "Vaisseau conception",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Douleur lombaire",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Picotements et engourdissements",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Faiblesse musculaire",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Aggravation avec le mouvement",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Limitation du mouvement",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Douleur pendant la séance",
								"score": 3
							}
						],
						"gallery": [
							{
								"idFile": "file_2674427069354",
								"Dida": ""
							},
							{
								"idFile": "file_2674469901174",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1676242800,
						"oraInizio": 132,
						"oraFine": 144,
						"DataModifica": 1692183366,
						"LabelCiclo": "Cycle d'acupuncture pour la sciatique",
						"TipoTrattamento": "B",
						"CostoTrattamento": 150,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*8
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Séance 5 : Maintenance et planification future",
						"TestoTrattamento": "Durée : 40 minutes\n\nLors de la dernière séance du cycle, l'acupuncteur discute avec le patient des progrès réalisés pendant le traitement. L'accent est mis sur le maintien des résultats et il peut proposer un plan de traitement à long terme, avec des visites périodiques pour gérer les symptômes de la lombosciatalgie au fil du temps. Le patient est encouragé à continuer à suivre les conseils de posture, d'exercice et d'habitudes saines.",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 23,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "Point Shu du Rein",
								"s": "23.BL"
							},
							{
								"n": 32,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "32.BL"
							},
							{
								"n": 30,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "30.BL"
							},
							{
								"n": 31,
								"m": "GB",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "31.GB"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Vessie urinaire",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Vésicule biliaire",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "ST",
								"NomeMeridiano": "Estomac",
								"valEnergetica": "D"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Douleur lombaire",
								"score": 2
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Picotements et engourdissements",
								"score": 1
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Faiblesse musculaire",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Aggravation avec le mouvement",
								"score": 2
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Limitation du mouvement",
								"score": 5
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Douleur pendant la séance",
								"score": 3
							}
						],
						"gallery": [
							{
								"idFile": "file_2674475391556",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1676847600,
						"oraInizio": 132,
						"oraFine": 144,
						"DataModifica": 1692183387,
						"LabelCiclo": "Cycle d'acupuncture pour la sciatique",
						"TipoTrattamento": "B",
						"CostoTrattamento": 150,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*9
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Premier Traitement de l'Anxiété",
						"TestoTrattamento": "Le patient semble nerveux et méfiant.\nN'a pas dormi depuis deux nuits et est très préoccupé par les conséquences de la pandémie de COVID-19.\n\nPression Shiatsu sur le méridien de la Vessie de 11BL à 28BL, tonifiant les points 15BL et 20BL, respectivement points Shu du Cœur et de la Rate.\n\n- Pression Shiatsu sur tout le méridien de la Rate, en faisant une pause aux points 6SP et 10SP, puis en continuant le long de tout le méridien jusqu'à la poitrine.\n\n- Pression Shiatsu sur tout le méridien du Cœur, en faisant une pause au point 7HT et en continuant jusqu'au point 9HT.\n\n- Pression Shiatsu sur le méridien du Péricarde.",
						"Prescrizione": "Pression Shiatsu sur le méridien de la Vessie de 11BL à 28BL, tonifiant les points 15BL et 20BL, respectivement points Shu du Cœur et de la Rate.\n\n- Pression Shiatsu sur tout le méridien de la Rate, en faisant une pause aux points 6SP et 10SP, puis en continuant le long de tout le méridien jusqu'à la poitrine.\n\n- Pression Shiatsu sur tout le méridien du Cœur, en faisant une pause au point 7HT et en continuant jusqu'au point 9HT.\n\n- Pression Shiatsu sur le méridien du Péricarde.",
						"puntiMTC": [
							{
								"n": 7,
								"m": "HT",
								"e": "",
								"z": "dito",
								"t": "",
								"s": "7.HT"
							},
							{
								"n": 6,
								"m": "PC",
								"e": "",
								"z": "dito",
								"t": "",
								"s": "6.PC"
							},
							{
								"n": 7,
								"m": "PC",
								"e": "",
								"z": "dito",
								"t": "",
								"s": "7.PC"
							},
							{
								"n": 20,
								"m": "GV",
								"e": "",
								"z": "coppetta",
								"t": "",
								"s": "20.GV"
							},
							{
								"n": 1,
								"m": "SP",
								"e": "",
								"z": "dito",
								"t": "",
								"s": "1.SP"
							},
							{
								"n": 11,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "11.BL"
							},
							{
								"n": 28,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "Point Shu de la Vessie",
								"s": "28.BL"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Vessie urinaire",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "SP",
								"NomeMeridiano": "Rate",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "HT",
								"NomeMeridiano": "Cœur",
								"valEnergetica": "V"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "HYPOCHONDRIE",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "STRESS",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "MAIN FROIDES ",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "MAUX DE TÊTE",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "INSOMNIE",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANXIÉTÉ",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "BOUCHE SÈCHE",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "GOÛT AMER DANS LA BOUCHE",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "CAUCHEMARS ET PENSÉES RÉCURRENTES",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "DOULEUR EN URINANT",
								"score": 6
							}
						],
						"gallery": [
							{
								"idFile": "file_2674478724650",
								"Dida": ""
							},
							{
								"idFile": "file_2674478728149",
								"Dida": ""
							},
							{
								"idFile": "file_2674478731260",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1674514800,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692049984,
						"LabelCiclo": "Cycle Shiatsu - Anxiété",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*10
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Deuxième Traitement de l'Anxiété",
						"TestoTrattamento": "ILe client signale avoir vécu un changement émotionnel par rapport à la semaine précédente, cependant, les symptômes indiqués dans l'anamnèse restent persistants. Il se plaint de palpitations nocturnes gênantes et fréquentes, précédées de cauchemars et de pensées obsessionnelles.\n\nJe décide également d'incorporer des techniques d'étirement et de rééquilibrage du Qi.\n\nTraitement :\nPalpation Shiatsu sur le méridien de la Vessie de 11BL à 28BL, en tonifiant les points 15BL et 20BL, respectivement points Shu du Cœur et de la Rate.\n\nPression Shiatsu sur tout le méridien du Rein, en s'arrêtant aux points 1KI et 3KI.\n\nPression Shiatsu sur tout le méridien du Cœur et du Péricarde, en s'arrêtant au point 8PC.\n\nÉgalement traité le méridien du Gros Intestin pour la régulation du Midi Minuit et pour la tonification des Liquides Jin.",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 7,
								"m": "HT",
								"e": "P",
								"z": "dito",
								"t": "",
								"s": "7.HT"
							},
							{
								"n": 6,
								"m": "PC",
								"e": "D",
								"z": "dito",
								"t": "",
								"s": "6.PC"
							},
							{
								"n": 7,
								"m": "PC",
								"e": "D",
								"z": "dito",
								"t": "",
								"s": "7.PC"
							},
							{
								"n": 20,
								"m": "GV",
								"e": "V",
								"z": "moxa",
								"t": "",
								"s": "20.GV"
							},
							{
								"n": 6,
								"m": "SP",
								"e": "V",
								"z": "moxa",
								"t": "",
								"s": "6.SP"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Vessie urinaire",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "SP",
								"NomeMeridiano": "Milza-pancreas",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "HT",
								"NomeMeridiano": "Cuore",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "HYPOCHONDRIE",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "STRESS",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "MAIN FROIDES ",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "MAUX DE TÊTE",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "INSOMNIE",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANXIÉTÉ",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "BOUCHE SÈCHE",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "GOÛT AMER DANS LA BOUCHE",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "CAUCHEMARS ET PENSÉES RÉCURRENTES",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "DOULEUR EN URINANT",
								"score": 4
							}
						],
						"gallery": [
							{
								"idFile": "file_2674478724650",
								"Dida": ""
							},
							{
								"idFile": "file_2674478728149",
								"Dida": ""
							},
							{
								"idFile": "file_2674478731260",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1675119600,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692049984,
						"LabelCiclo": "Cycle Shiatsu - Anxiété",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*11
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Troisième Traitement de l'Anxiété",
						"TestoTrattamento": "Le client de démonstration Iaomai signale avoir apporté des améliorations substantielles. Il est maintenant capable de s'endormir paisiblement et ne se réveille plus pendant la nuit. Les rêves ont considérablement diminué, et le sommeil est paisible et réparateur. La douleur du bas du dos a disparu. Les autres symptômes se sont également améliorés.",
						"Prescrizione": "Traitement:\n\nDisperser le Feu du Foie et de la Vésicule Biliaire et tonifier les organes respectifs. Pression Shiatsu sur le méridien de la Vessie de 11BL à 28BL, en s'arrêtant à 18BL et 19BL comme les points Shu du Foie et de la Vésicule Biliaire.\n\nPression Shiatsu le long de tout le méridien de la Vésicule Biliaire, en s'arrêtant à GB20 et GB21.\nPression Shiatsu sur tout le méridien du Foie. Le méridien du Cœur a également été traité pour la régulation du Midi-Minuit.",
						"puntiMTC": [
							{
								"n": 11,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "",
								"s": "11.BL"
							},
							{
								"n": 18,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "Point Shu du Foie",
								"s": "18.BL"
							},
							{
								"n": 19,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "PuntoShu de Vésicule biliaire",
								"s": "19.BL"
							},
							{
								"n": 28,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "Point Shu de la Vessie",
								"s": "28.BL"
							},
							{
								"n": 20,
								"m": "GB",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "20.GB"
							},
							{
								"n": 21,
								"m": "GB",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "21.GB"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Vessie urinaire",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Vésicule biliaire",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "LR",
								"NomeMeridiano": "Foie",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "HYPOCHONDRIE",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "STRESS",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "MAIN FROIDES ",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "MAUX DE TÊTE",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "INSOMNIE",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANXIÉTÉ",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "BOUCHE SÈCHE",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "GOÛT AMER DANS LA BOUCHE",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "CAUCHEMARS ET PENSÉES RÉCURRENTES",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "DOULEUR EN URINANT",
								"score": 3
							}
						],
						"gallery": [
							{
								"idFile": "file_2674478724650",
								"Dida": ""
							},
							{
								"idFile": "file_2674478728149",
								"Dida": ""
							},
							{
								"idFile": "file_2674478731260",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1676329200,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692049984,
						"LabelCiclo": "Cycle Shiatsu - Anxiété",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*12
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Quatrième Traitement de l'Anxiété",
						"TestoTrattamento": "Le destinataire signale ne plus se réveiller la nuit, le sommeil est paisible et réparateur, et les cauchemars ont disparu. Il signale également être moins irritable et ne présente aucun épisode de maux de tête. Il a retrouvé de l'énergie physique, et l'humeur générale s'est améliorée. L'aspect anxieux reste présent, bien qu'il semble avoir diminué depuis la première rencontre. Il se plaint toujours d'une sensation d'amertume dans la bouche, notamment aux premières heures de la journée. Traitement:\nDisperser le Feu du Foie et de la Vésicule Biliaire et tonifier les organes respectifs. Pression Shiatsu sur le méridien de la Vessie de 11BL à 28BL, en s'arrêtant à 18BL et 19BL comme les points Shu du Foie et de la Vésicule Biliaire.",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 11,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "",
								"s": "11.BL"
							},
							{
								"n": 18,
								"m": "BL",
								"e": "V",
								"z": "moxa",
								"t": "Point Shu du Foie",
								"s": "18.BL"
							},
							{
								"n": 19,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "Point Shu de la Vésicule biliaire",
								"s": "19.BL"
							},
							{
								"n": 28,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "Point Shu de la Vessie",
								"s": "28.BL"
							},
							{
								"n": 13,
								"m": "LR",
								"e": "V",
								"z": "moxa",
								"t": "Point BO de la Rate",
								"s": "13.LR"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Vessie urinaire",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Vésicule biliaire",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "LR",
								"NomeMeridiano": "Foie",
								"valEnergetica": "P",
								"descrizione": ""
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "HYPOCHONDRIE",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "STRESS",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "MAIN FROIDES ",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "MAUX DE TÊTE",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "INSOMNIE",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANXIÉTÉ",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "BOUCHE SÈCHE",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "GOÛT AMER DANS LA BOUCHE",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "CAUCHEMARS ET PENSÉES RÉCURRENTES",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "DOULEUR EN URINANT",
								"score": 5
							}
						],
						"gallery": [
							{
								"idFile": "file_2674478724650",
								"Dida": ""
							},
							{
								"idFile": "file_2674478728149",
								"Dida": ""
							},
							{
								"idFile": "file_2674478731260",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1676934000,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692049984,
						"LabelCiclo": "Cycle Shiatsu - Anxiété",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*13
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Cinquième Traitement de l'Anxiété",
						"TestoTrattamento": "Le destinataire signale non seulement se sentir mieux, mais aussi se sentir changé à l'intérieur. Il s'endort facilement, et les pensées obsessionnelles se sont transformées en une leçon de vie. La fatigue matinale a presque disparu, et il se réveille avec beaucoup plus d'énergie physique et mentale. Ceci également en conjonction avec le choix de reprendre l'habitude depuis longtemps perdue de faire une promenade après le dîner. Le stress est toujours présent, mais il affirme lui-même être meilleur pour le gérer et le libérer avant de rentrer chez lui. Il est convenu de procéder à un traitement d'entretien EAU-BOIS associé à des techniques d'étirement.",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "KI",
								"NomeMeridiano": "Rein",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Vésicule biliaire",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "LR",
								"NomeMeridiano": "Foie",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "HYPOCHONDRIE",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "STRESS",
								"score": 5
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "MAIN FROIDES ",
								"score": 1
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "MAUX DE TÊTE",
								"score": 2
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "INSOMNIE",
								"score": 1
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANXIÉTÉ",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "BOUCHE SÈCHE",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "GOÛT AMER DANS LA BOUCHE",
								"score": 2
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "CAUCHEMARS ET PENSÉES RÉCURRENTES",
								"score": 1
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "DOULEUR EN URINANT",
								"score": 0
							}
						],
						"gallery": [
							{
								"idFile": "file_2674478724650",
								"Dida": ""
							},
							{
								"idFile": "file_2674478728149",
								"Dida": ""
							},
							{
								"idFile": "file_2674478731260",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1677452400,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692049984,
						"LabelCiclo": "Cycle Shiatsu - Anxiété",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*14
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Guide de la session individuelle",
						"TestoTrattamento": "Dans cette section, vous avez la possibilité d'ajouter une session individuelle au dossier de votre patient / destinataire.\nCela vous permettra de conserver une trace du traitement tant sur le plan clinique qu'économique.\n\nVous pouvez également ajouter une prescription, des symptômes, des points ou des méridiens traités.",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [],
						"gallery": [],
						"TimeTrattamento": 1674601200,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1693846663,
						"LabelCiclo": "",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*15
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Anamnèse",
						"TestoTrattamento": "{\"AnamnesiMotivo\":\"QUESTIONNAIRE D'ANAMNÈSE (à des fins de démonstration)\\n\\nDepuis combien de temps avez-vous des problèmes d'insomnie ? Environ 6 mois.\\nQuels sont les principaux symptômes de l'insomnie que vous rencontrez ? Difficulté à s'endormir le soir et réveils nocturnes fréquents.\\nAvez-vous remarqué des facteurs spécifiques qui déclenchent ou aggravent votre insomnie ? Principalement le stress lié au travail et l'anxiété.\\n\\nAntécédents Médicaux :\\nAvez-vous déjà eu des problèmes de santé mentale ou des troubles de l'humeur ? Aucun diagnostic antérieur de troubles de l'humeur. A eu des épisodes sporadiques d'anxiété.\\nPrenez-vous des médicaments ou des compléments alimentaires qui pourraient affecter votre sommeil ? Vous ne prenez actuellement aucun médicament.\\nAvez-vous déjà suivi des traitements précédents pour l'insomnie ? A essayé des techniques de relaxation et des tisanes apaisantes, mais sans succès durable.\\n\\nMode de Vie et Habitudes :\\nDécrivez votre mode de vie général. Maria travaille à plein temps et se sent souvent stressée en raison des délais et des responsabilités professionnelles. Elle boit du café le matin et occasionnellement une tasse l'après-midi.\\nComment gérez-vous le stress dans la vie quotidienne ? Pratique le yoga et la méditation, mais ces derniers temps, elle a eu du mal à trouver le temps.\\nQuelles sont vos habitudes avant de vous coucher ? Elle regarde souvent la télévision ou utilise son téléphone juste avant de se coucher.\\n\\nObjectifs du Traitement :\\nQuel est l'objectif principal que vous souhaitez atteindre grâce à l'auriculothérapie pour l'insomnie ?\\nMaria souhaite améliorer la qualité de son sommeil, réduire l'anxiété et apprendre des techniques pour mieux gérer le stress.\\n\\nNotes Additionnelles :\\nMaria s'intéresse particulièrement aux traitements naturels et souhaite explorer l'auriculothérapie comme option.\",\"AnamnesiDiagnosiOccidentale\":\"Diagnostic en Médecine Occidentale : Trouble Primaire de l'Insomnie\\n\\nExplication :\\nLe trouble primaire de l'insomnie est une condition dans laquelle le patient a des difficultés à initier ou à maintenir le sommeil malgré les opportunités de le faire. Cela peut être causé par des facteurs tels que l'anxiété, le stress, la dépression, de mauvaises habitudes de sommeil, une consommation excessive de caféine ou d'alcool, et des perturbations du rythme circadien.\\n\\nSymptômes Associés :\\n\\nDifficulté à s'endormir\\nRéveils nocturnes fréquents\\nSensation de sommeil non réparateur au réveil\\nFatigue pendant la journée\\nIrritabilité et difficulté de concentration\\nTraitement en Médecine Occidentale :\\nLe traitement en médecine occidentale pour le trouble de l'insomnie peut varier en fonction de la cause sous-jacente. Il peut inclure des interventions comportementales, telles que la thérapie cognitivo-comportementale pour l'insomnie (CBT-I), qui vise à améliorer l'hygiène du sommeil et à changer les habitudes néfastes. Dans certains cas, des médicaments hypnotiques à court terme peuvent être prescrits pour aider à stabiliser le sommeil.\\n\\nPlan de Traitement :\\nUn plan de traitement peut impliquer une combinaison de thérapies comportementales, telles que la CBT-I, le contrôle de l'environnement de sommeil, l'éducation sur la réduction de l'anxiété et du stress, et l'adoption de stratégies de relaxation. Dans certains cas, le médecin peut envisager de prescrire des médicaments à court terme, mais avec prudence en ce qui concerne les effets secondaires potentiels et la dépendance.\",\"AnamnesiDiagnosiMTC\":\"Stagnation de Qi et Sang avec Déficience de Shen (Esprit)\\n\\nExplication :\\nDu point de vue de la MTC, l'insomnie peut être perçue comme le résultat d'un blocage de l'énergie (Qi) et de la circulation sanguine, ce qui peut entraîner tension et agitation. Le \\\"Shen\\\", qui représente l'aspect mental et spirituel, peut être affaibli en raison du stress et de l'anxiété et peut affecter la capacité à s'endormir et à maintenir un sommeil réparateur.\\n\\nSymptômes Associés :\\n\\nDifficulté à s'endormir\\nRéveils nocturnes fréquents\\nAgitation et agitation mentale\\nFatigue matinale\\nAnxiété\\nTraitement en MTC :\\nL'objectif du traitement en MTC serait de rétablir le flux harmonieux de Qi et de Sang, de réduire la tension mentale et de renforcer le Shen. Cela pourrait être obtenu grâce à l'auriculothérapie, à l'utilisation de l'acupuncture et à une thérapie à base de plantes spécifique. La thérapie viserait à débloquer l'énergie stagnante, à promouvoir la relaxation et à améliorer la qualité du sommeil.\\n\\nPlan de Traitement :\\nUn plan de traitement peut inclure des séances régulières d'auriculothérapie, des traitements d'acupuncture ciblés, des conseils sur la gestion du stress tels que la méditation et la relaxation, ainsi que des prescriptions d'herbes chinoises personnalisées pour renforcer le Qi, le Sang et le Shen.\"}",
						"Prescrizione": "Auriculothérapie :\nSuivre des séances hebdomadaires d'auriculothérapie pendant un total de 6 à 8 semaines. Au cours de ces séances, les points auriculaires liés à la relaxation, au sommeil et à la réduction de l'anxiété seront stimulés. L'auriculothérapeute évaluera la réponse du corps et ajustera le traitement en conséquence.\n\nThérapie Cognitivo-Comportementale pour l'Insomnie (TCC-I) :\nParticiper à un programme de thérapie cognitivo-comportementale pour l'insomnie. Ce programme comprend des séances hebdomadaires pendant les 4 à 6 premières semaines, suivies de séances de suivi tous les quinze jours. La TCC-I vise à améliorer l'hygiène du sommeil, à aborder les pensées négatives liées au sommeil et à établir un horaire régulier de sommeil-réveil.\n\nStratégies de Gestion du Stress :\nPratiquer des techniques de relaxation telles que la méditation et la respiration profonde pendant au moins 10 à 15 minutes par jour, de préférence avant de se coucher. Ces pratiques peuvent aider à réduire l'anxiété et à préparer le corps au sommeil.\n\nRecommandations de Style de Vie :\n\nÉviter de consommer de la caféine et de l'alcool l'après-midi et le soir.\nLimitez l'utilisation d'appareils électroniques avant de vous coucher.\nMaintenir un environnement de sommeil confortable, avec un éclairage tamisé et une température adéquate.\nÉviter les repas copieux juste avant de se coucher.\nSuivi :\nUn suivi sera programmé après 8 semaines pour évaluer la réponse au traitement et apporter les ajustements nécessaires. Veuillez tenir un journal de sommeil et noter toute amélioration ou changement.\n\nNotes Additionnelles :\nVeuillez suivre les instructions fournies par l'auriculothérapeute et le thérapeute TCC-I. En cas d'effets secondaires ou de préoccupations, veuillez contacter immédiatement le médecin.",
						"puntiMTC": [],
						"puntiAuricolari": [
							{
								"s": "003",
								"n": "Sommet du Pavillon Auriculaire",
								"z": "",
								"e": "",
								"t": ""
							},
							{
								"s": "013",
								"n": "Anxiété de Romoli",
								"z": "",
								"e": "",
								"t": ""
							},
							{
								"s": "230",
								"n": "Master Cerebral Point",
								"z": "",
								"e": "",
								"t": ""
							},
							{
								"s": "195",
								"n": "Épiphyse",
								"z": "",
								"e": "",
								"t": ""
							}
						],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Difficulté à s'endormir",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Éveils Nocturnes Fréquents",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Agitation et Agitation Mentale",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Fatigue au Réveil",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANXIÉTÉ",
								"score": 10
							}
						],
						"gallery": [
							{
								"idFile": "file_1692134504542",
								"Dida": ""
							}
						],
						"TimeTrattamento": 0,
						"oraInizio": -1,
						"oraFine": -1,
						"DataModifica": 1692134508,
						"LabelCiclo": "Cycle de Thérapie Auriculaire pour l'Insomnie",
						"TipoTrattamento": "A",
						"CostoTrattamento": 0,
						"ordine": 2,
						"Cancellato": 0,
						"frv": true
					},
					{//*16
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Session 1: Évaluation initiale et relaxation",
						"TestoTrattamento": "Durée : 45 minutes\n\nAu cours de la première séance, le patient est accueilli et soumis à une brève évaluation de son historique médical et des symptômes liés à l'insomnie. L'auriculothérapeute explique le processus de traitement et place délicatement de petites aiguilles ou des graines sur la carte auriculaire correspondant aux points pouvant influencer le sommeil et la relaxation. Le patient est ensuite laissé à se détendre pendant 20 à 30 minutes, pendant lesquelles il est encouragé à se concentrer sur une respiration profonde et à vider son esprit.",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [
							{
								"s": "045",
								"n": "Insomnie 1",
								"z": "ago",
								"e": "D",
								"t": ""
							},
							{
								"s": "245",
								"n": "Insomnie 2",
								"z": "ago",
								"e": "D",
								"t": ""
							}
						],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Difficulté à s'endormir",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Éveils Nocturnes Fréquents",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Agitation et Agitation Mentale",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Fatigue au Réveil",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANXIÉTÉ",
								"score": 9
							}
						],
						"gallery": [],
						"TimeTrattamento": 1692050400,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692177913,
						"LabelCiclo": "Cycle de Thérapie Auriculaire pour l'Insomnie",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*17
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Séance 2 : Stimulation des Points de Sommeil",
						"TestoTrattamento": "Lors de la deuxième séance, l'auriculothérapeute examine l'évolution du patient depuis la séance précédente et procède à une stimulation plus ciblée des points auriculaires liés au sommeil. Les aiguilles ou les graines sont placées plus précisément, en se concentrant sur des points spécifiques associés à l'amélioration de l'insomnie. Le patient est à nouveau laissé à se détendre pendant que les aiguilles agissent.",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [
							{
								"s": "045",
								"n": "Insomnie 1",
								"z": "ago",
								"e": "",
								"t": ""
							},
							{
								"s": "245",
								"n": "Insomnie 2",
								"z": "ago",
								"e": "",
								"t": ""
							}
						],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Difficulté à s'endormir",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Éveils Nocturnes Fréquents",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Agitation et Agitation Mentale",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Fatigue au Réveil",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANXIÉTÉ",
								"score": 9
							}
						],
						"gallery": [],
						"TimeTrattamento": 1692568800,
						"oraInizio": 132,
						"oraFine": 144,
						"DataModifica": 1692177897,
						"LabelCiclo": "Cycle de Thérapie Auriculaire pour l'Insomnie",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*18
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": " Séance 3 : Équilibre Énergétique",
						"TestoTrattamento": "Durée : 50 minutes\n\nLors de la troisième séance, l'auriculothérapeute continue d'ajuster la stimulation des points auriculaires, en se concentrant sur l'équilibre énergétique du patient. Les facteurs de stress ou d'anxiété pouvant contribuer à l'insomnie sont également pris en compte. Au cours de cette séance, le patient peut également recevoir des conseils sur les techniques de gestion du stress et de relaxation à appliquer chez lui.",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [
							{
								"s": "045",
								"n": "Insomnie 1",
								"z": "ago",
								"e": "D",
								"t": ""
							},
							{
								"s": "245",
								"n": "Insomnie 2",
								"z": "ago",
								"e": "D",
								"t": ""
							},
							{
								"s": "000",
								"n": "Point Zéro",
								"z": "seme_vaccaria",
								"e": "",
								"t": ""
							}
						],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Difficulté à s'endormir",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Éveils Nocturnes Fréquents",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Agitation et Agitation Mentale",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Fatigue au Réveil",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANXIÉTÉ",
								"score": 7
							}
						],
						"gallery": [],
						"TimeTrattamento": 1692914400,
						"oraInizio": 126,
						"oraFine": 144,
						"DataModifica": 1692177857,
						"LabelCiclo": "Cycle de Thérapie Auriculaire pour l'Insomnie",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*19
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Séance 4: Consolidation des progrès",
						"TestoTrattamento": "Durée : 45 minutes\n\nLors de la quatrième séance, le patient et l'auriculothérapeute évaluent ensemble les progrès réalisés jusqu'à présent. Le patient peut signaler une amélioration de la qualité du sommeil, une durée accrue du sommeil ou une fréquence moindre des réveils nocturnes. L'auriculothérapeute adapte le traitement en fonction de ces résultats et continue de stimuler les points auriculaires impliqués dans l'amélioration du sommeil.",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [
							{
								"s": "045",
								"n": "Insomnie 1",
								"z": "ago",
								"e": "",
								"t": ""
							},
							{
								"s": "245",
								"n": "Insomnie 2",
								"z": "ago",
								"e": "",
								"t": ""
							},
							{
								"s": "000",
								"n": "Point Zéro",
								"z": "seme_vaccaria",
								"e": "",
								"t": ""
							}
						],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Difficulté à s'endormir",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Éveils Nocturnes Fréquents",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Agitation et Agitation Mentale",
								"score": 5
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Fatigue au Réveil",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANXIÉTÉ",
								"score": 7
							}
						],
						"gallery": [],
						"TimeTrattamento": 1693432800,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692178254,
						"LabelCiclo": "Cycle de Thérapie Auriculaire pour l'Insomnie",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*20
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Séance 5 : Maintenance et conclusions",
						"TestoTrattamento": "Lors de la dernière séance du cycle, l'accent est mis sur le maintien des progrès réalisés. L'auriculothérapeute pourrait suggérer un plan de traitement à long terme, comprenant éventuellement des visites régulières pour maintenir les bénéfices obtenus. Le patient est encouragé à continuer à pratiquer des techniques de relaxation et à gérer le stress dans la vie quotidienne.",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [
							{
								"s": "045",
								"n": "Insomnie 1",
								"z": "ago",
								"e": "",
								"t": ""
							},
							{
								"s": "245",
								"n": "Insomnie 2",
								"z": "dito",
								"e": "",
								"t": ""
							},
							{
								"s": "000",
								"n": "Point Zéro",
								"z": "seme_vaccaria",
								"e": "",
								"t": ""
							}
						],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Difficulté à s'endormir",
								"score": 2
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Éveils Nocturnes Fréquents",
								"score": 0
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Agitation et Agitation Mentale",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Fatigue au Réveil",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANXIÉTÉ",
								"score": 5
							}
						],
						"gallery": [],
						"TimeTrattamento": 1693864800,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692178379,
						"LabelCiclo": "Cycle de Thérapie Auriculaire pour l'Insomnie",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					}
				],
				"saldi": [
					{
						"idSaldo": 0,
						"idPaziente": 0,
						"MotivoSaldo": "Traitement d'Acupuncture",
						"RicevutaSaldo": "2",
						"ValoreSaldo": 150,
						"DataSaldo": 1674860400,
						"DataModifica": 1691909111,
						"Cancellato": 0,
						"frv": true
					},
					{
						"idSaldo": 0,
						"idPaziente": 0,
						"MotivoSaldo": "Traitement Shiatsu",
						"RicevutaSaldo": "1",
						"ValoreSaldo": 50,
						"DataSaldo": 1674428400,
						"DataModifica": 1691909111,
						"Cancellato": 0,
						"frv": true
					},
					{
						"idSaldo": 0,
						"idPaziente": 0,
						"MotivoSaldo": "Traitement d'Acupuncture, Avancé",
						"RicevutaSaldo": "3",
						"ValoreSaldo": 150,
						"DataSaldo": 1675119600,
						"DataModifica": 1691909111,
						"Cancellato": 0,
						"frv": true
					},
					{
						"idSaldo": 0,
						"idPaziente": 0,
						"MotivoSaldo": "Traitement d'Équilibre",
						"RicevutaSaldo": "5",
						"ValoreSaldo": 150,
						"DataSaldo": 1692136800,
						"DataModifica": 1692183527,
						"Cancellato": 0,
						"frv": true
					}
				],
				"Cancellato": 0,
				"frv": true
			}
		],
		servizi: [
			{//*
				"idServizio": 0,
				"NomeServizio": "Cycle d'auriculothérapie pour arrêter de fumer",
				"DescrizioneServizio": "L'acupuncture est efficace pour rompre la dépendance à la nicotine.\n\nLe traitement est basé sur une analyse complète des symptômes de sevrage et vise à équilibrer les énergies du corps pour améliorer la santé.\n\nL'acupuncture peut aider ceux qui souhaitent arrêter de fumer en réduisant les envies de cigarette, l'anxiété et le besoin du rituel de fumer. Le traitement peut également provoquer une sensation de dégoût pour le goût et l'odeur des cigarettes.\n\nSi la personne est déterminée à arrêter de fumer, les effets bénéfiques peuvent être observés dès la troisième ou quatrième séance.\n\nLe protocole classique, développé par P. Nogier, dure de 15 à 20 minutes lors d'une seule séance et nécessite une abstinence d'au moins 6 heures avant le traitement.\n",
				"CostoServizio": 150,
				"NumeroSedute": 5,
				"DataModifica": 1674490894,
				"DataCreazione": 1674490810,
				"Cancellato": 0,
				"frv": true
			},
			{//*
				"idServizio": 0,
				"NomeServizio": "Cycle de Shiatsu pour l'Anxiété",
				"DescrizioneServizio": "L'émotivité de chaque personne est subjective et se manifeste de manières les plus inattendues; une faible estime de soi sous-jacente peut amener une personne à croire qu'elle ne peut pas surmonter les épreuves que la vie lui présente. Un stress accentué qui mine notre calme peut nous amener à basculer et c'est ainsi que l'anxiété, la peur, la fameuse crise de panique apparaissent. En tant que symptômes en phase aiguë, on peut avoir une tachycardie, une respiration haletante, de la peur avec une libération d'adrénaline, une sensation très désagréable surtout car les crises surviennent parfois soudainement, sans préavis, et ceux qui en souffrent vivent dans la terreur d'entrer dans la phase de 'Terreur'.\n\nSi l'état d'angoisse est profond, grave et permanent, il nécessite l'intervention d'un spécialiste.\n",
				"CostoServizio": 50,
				"NumeroSedute": 5,
				"DataModifica": 1674490934,
				"DataCreazione": 1674490895,
				"Cancellato": 0,
				"frv": true
			},
			{//*
				"idServizio": 0,
				"NomeServizio": "Cycle d'Acupuncture pour le Bruxisme",
				"DescrizioneServizio": "Le bruxisme fait référence à une condition dans laquelle les dents se serrent et se frottent, frottant l'arcade supérieure contre l'inférieure tout en serrant les mâchoires avec une certaine force.\n\nLe bruxisme est une condition assez courante qui dépend de la contraction involontaire des muscles de la mastication.\n\nIl se produit principalement la nuit et peut entraîner toute une série de conséquences : usure des dents, douleur à la mâchoire, maux de tête.",
				"CostoServizio": 100,
				"NumeroSedute": 5,
				"DataModifica": 1674491088,
				"DataCreazione": 1674490935,
				"Cancellato": 0,
				"frv": true
			},
			{//*
				"idServizio": 0,
				"NomeServizio": "Guía de Servicio",
				"DescrizioneServizio": "En esta sección tienes la opción de precargar los servicios que ofreces habitualmente a tus clientes/pacientes.\n\nAl agregar el precio y el número de sesiones del servicio, acelerarás el proceso de inserción.\n\nPor ejemplo, el paquete \"Anti-Tabaco\", insomnio, alergias, reequilibrio de Qi....\nCosto por sesión: 150€\nNúmero de sesiones: 5\n\n",
				"CostoServizio": 1,
				"NumeroSedute": 1,
				"DataModifica": 1674491592,
				"DataCreazione": 1674491089,
				"Cancellato": 0,
				"frv": true
			}
		],
		fornitori: [
			{
				"idFornitore": 0,
				"RagioneSociale": "Aiguilles et Points",
				"Intestazione": "Aiguilles et Points Srl\nvia Italia 96\nRoma",
				"PartitaIva": "0698765432",
				"CodiceFiscale": "ghagha84r16d200r",
				"Indirizzo": "via Italia 96",
				"CAP": "10000",
				"Citta": "Roma",
				"Provincia": "Roma",
				"Stato": "it",
				"Telefono": "06123456",
				"Email": "aghi@mail.com",
				"NoteFornitore": "Fournisseur d'aiguilles pour l'acupuncture.\nConsultant pour les commandes M. Angelo Spinoso\nCommandes supérieures à 100 €, remise de 20 %",
				"etichette": [],
				"DataModifica": 1629780089,
				"DataCreazione": 1629779932,
				"Cancellato": 0,
				"frv": true
			},
			{
				"idFornitore": 0,
				"RagioneSociale": "Meubles pour Cabinets Médicaux Srl",
				"Intestazione": "A l'Attention de Meubles pour Cabinets Médicaux Srl\nVia Milano 113\nMilan",
				"PartitaIva": "06987653245",
				"CodiceFiscale": "RRDMBL84R16D111A",
				"Indirizzo": "Via Milano 113",
				"CAP": "10000",
				"Citta": "Milano",
				"Provincia": "MI",
				"Stato": "it",
				"Telefono": "3486851418",
				"Email": "arredamentiambulatori@mail.com",
				"NoteFornitore": "Fournisseur de gros de matériel pour les cabinets médicaux.\nContact de l'agent M. Rossi Mario\nFacture à 90 jours.\nPrix et qualité excellents",
				"etichette": [
					{
						"idEtichetta": 0,
						"NomeEtichetta": "Facebook",
						"ValoreEtichetta": "@arredamentiambulatori",
						"sezione": "contatti"
					},
					{
						"idEtichetta": 0,
						"NomeEtichetta": "Instagram",
						"ValoreEtichetta": "@arreda_abulatori",
						"sezione": "contatti"
					}
				],
				"DataModifica": 1629780672,
				"DataCreazione": 1629780090,
				"Cancellato": 0,
				"frv": true
			}
		]
	},	
	por: {
		pazienti: [
			{
				"idPaziente": 0,
				"Nome": "Cliente de demonstração",
				"Cognome": "IAOMAI",
				"Indirizzo": "Praça da Figueira",
				"CAP": "1100-241",
				"Citta": "Lisboa",
				"Provincia": "Lisboa",
				"Stato": "pt",
				"Telefono": "",
				"Cellulare": "3486851418",
				"paeseCellulare": "pt",
				"Email": "app@iaomai.app",
				"sesso": "m",
				"NotePaziente": "Foi admitido em 23 de janeiro de 20xx por um princípio de infarto.\nPostura semi-cifótica.\nViaja muito a trabalho, o que muitas vezes causa estados de estresse agudo.\nTendência hipocondríaca.",
				"DataNascita": "1984-10-16",
				"LuogoNascita": "Lisboa",
				"tags": [
					{
						"idTag": 0,
						"NomeTag": "1ª Shiatsu",
						"colore": "d7dafb"
					},
					{
						"idTag": 0,
						"NomeTag": "Acupuntura",
						"colore": "fbd7d7"
					},
					{
						"idTag": 0,
						"NomeTag": "Auriculoterapia",
						"colore": "d7f5fb"
					}
				],
				"etichette": [
					{
						"idEtichetta": 0,
						"NomeEtichetta": "Esporte praticado:",
						"ValoreEtichetta": "Nuoto",
						"sezione": "aggiuntive"
					},
					{
						"idEtichetta": 0,
						"NomeEtichetta": "Contactar preferencialmente:",
						"ValoreEtichetta": "Dopo le ore 17.",
						"sezione": "aggiuntive"
					},
					{
						"idEtichetta": 0,
						"NomeEtichetta": "Site",
						"ValoreEtichetta": "www.iaomai.app",
						"sezione": "contatti"
					},
					{
						"idEtichetta": 0,
						"NomeEtichetta": "Socialnetwork:",
						"ValoreEtichetta": "https://www.facebook.com/profile.php?id=100089849462315",
						"sezione": "contatti"
					}
				],
				"medicine": [
					{
						"idMedicina": 0,
						"NomeMedicina": "Ibuprofeno"
					},
					{
						"idMedicina": 0,
						"NomeMedicina": "Cetoprofeno"
					},
					{
						"idMedicina": 0,
						"NomeMedicina": "Naproxeno"
					}
				],
				"allergie": [
					{
						"idAllergia": 0,
						"NomeAllergia": "Intolerante ao glúten"
					},
					{
						"idAllergia": 0,
						"NomeAllergia": "Alimentos com níquel"
					},
					{
						"idAllergia": 0,
						"NomeAllergia": "Pelo de gato"
					}
				],
				"patologie": [
					{
						"idPatologia": 0,
						"NomePatologia": "ANSIEDADE"
					},
					{
						"idPatologia": 0,
						"NomePatologia": "Protusão L4-L5"
					},
					{
						"idPatologia": 0,
						"NomePatologia": "Hipertensão"
					},
					{
						"idPatologia": 0,
						"NomePatologia": "Artrite reumatoide"
					},
					{
						"idPatologia": 0,
						"NomePatologia": "Alergia"
					},
					{
						"idPatologia": 0,
						"NomePatologia": "Asma brônquica"
					}
				],
				"interventi": [
					{
						"idIntervento": 0,
						"NomeIntervento": "MENISCO E LIGAMENTOS ESQUERDOS"
					},
					{
						"idIntervento": 0,
						"NomeIntervento": "MASTOPLASTIA ADITIVA"
					},
					{
						"idIntervento": 0,
						"NomeIntervento": "Aguardando cirurgia de hérnia L4-L5"
					}
				],
				"gallery": [
					{
						"idFile": "file_2674427029613",
						"Dida": ""
					},
					{
						"idFile": "file_2674427069354",
						"Dida": ""
					}
				],
				"Provenienza": "Boca a boca",
				"Professione": "Empregada",
				"Intestazione": "",
				"CodiceFiscale": "",
				"PartitaIva": "",
				"Social": "Facebook",
				"avatar": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABsSFBcUERsXFhceHBsgKEIrKCUlKFE6PTBCYFVlZF9VXVtqeJmBanGQc1tdhbWGkJ6jq62rZ4C8ybqmx5moq6T/2wBDARweHigjKE4rK06kbl1upKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKT/wAARCADIAMgDASIAAhEBAxEB/8QAGgABAAMBAQEAAAAAAAAAAAAAAAMEBQIBBv/EAEEQAAIBAwIDBQUFBgUCBwAAAAECAwAEERIhBTFBE1FhcYEUIpGhsTJCwdHwBhUjUmJyJDNDU5KC8TQ1Y3OisuH/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/EAB8RAQEAAgICAwEAAAAAAAAAAAABAhEDIRIxE0FRYf/aAAwDAQACEQMRAD8A+mpSlApSlApSlArl3SNC7sFUDJZjgCoL+8SxtjM4LHOlVHNmPICsqPhU/FH9q4pJIqscpbqcBB40Fmb9obFHEcPaXLnbESZ+v4VwL7jFxpMHDo4FPNp3z8hgitC1tLe0j0W8Sxr1wNz5nrU1E2y0tuNSMTLxCKEdFiiDD50HCrlh/F4rdMf6DorUpVTbMXhEinI4nfesua7PD7obxcUuAf61Vh8MVoUobZ62vFEyRxNJD0D24A+RojcYQkyR2UoHIIzKT8Qa0KUNstuL3EBPtfC7hABnVERIPUjGKlt+O8OnwBcCNjzEg049TtV+oZ7O1uCTNbxSNjGWQE/Gou04IIyDkV7WQeBQxEtYzzWj/wBDkg+YPOumbi9pg/wr+Mc8Ds3/ACobatKz7XjNpcSdk7NbzDnHMNJrQopSlKBSlKBSlKBSlKBSlU+LXPsvDZ5QSG06Uxz1HYfOgqRK3EeMPcOP8PaEpFt9p/vH0/KtWoLG2Wzs4rdd9C4J7z1Pxqeqy8LAEAkAk4Gete14QGBDAEHmDVSeO6hJktH7UczBIef9rdPXI8qC5SobS6ivIBLC2QdiDzU9xHQ1FdcQit5OxUNNOf8ASj3I8T3DlzoLdKwbm6vZW0zSm3DDIgthqlI8W6efKoJ7UOVWUvJLj3UeR5WI8cEAfHFYucbnHX0ayxs5jWRS45qDuPSuq+Vk4UBbl3SOFv6FLk92B0Pqa5trLiNvIqQXzpJu+gnKgcsnmMnu35HekzheOvrKViKOMoCfbopD0VogB55AqROMvbsI+Jwdlk4E0eTGfxFWZS+kuFjXpXiOsiB0YMp3BU5Br2tMK93Y216oW5hWTHI8iPUb1RWx4hw9f8BddvEP9G43+DD6bCtalFZ0fGYkcRX0UlnITgdoMqfJhtWijq6h0YMpGQQcg1zJGkqFJEV0PNWGQazTwg2zmXhk7WzHcxn3o28x086i7a1KzIeLrFIIOIp7LNyDH/LfxDfnSitOlKUClKUCs7i69o9jFjJNyrY8ACTWjWfff+acN/uk/wDoaC9SlKrBSlKDI4lJLZ3Siz0CS8Gkg/dI+/8AAnPkKW1ottGyox1vu8p3Zj31jcTS6vuMXSkFREpGkdUHL48/WvoUZXRWQgqRkEdRXDlr0cUchBGrFFyefPdjjqaQx9mmGYu53Zj1NEk1ySKBtGQpPecA/iKRSCVSRthipGe44ri6uQpedmcbJsgPlufnj0PfXjKsc7XBOFKBW8MHY/M1KAFGB35r2mwrx0WRCjqGU7EEZBr2lFZAaTgFwJIyz2Mre8nMofD9efSvo0dZEV0IZWAII6is64jjuI2t5ASrqf19Kj/Z2V1hnspN2tX0g45qc4/H5V6OPLc1Xm5Mddxr0pSurkUpSgjngiuImimQOjDBBpUlKK6pSlRopSlArIurkS/tFZ2yDPYqzue7KkAfT41oXlytpayTuMhRsB949B6mqHC+GS291Le3MuueZdwB9nJyR9B6UStSlKVWSleO6xoXdgqqMkk4AFZcnE5pQrWyRQxscLJckrr/ALV5935UWTajA8xvb54yrTS3BiUMNlVep9D9KuW/DWgj0peTjJycBcZ64BG3lVPhPa/vi8WZQrDLYByAWIJx54FadxcNHqCRkkc3f3UXzPX0zXKzt3npELGSOVpYbg63AD9ogYNjkcDG9eLa3aSmQTw4O7IIiAx785ODS3dYRJPLJcOHALO6EKMdy4yB+s1dqaisy7muIgJChjkj3IJJjde7V0PicfCvbbicNypZElIHPSur5DJHqBVq6W4DpNb4fQCGiLYD58e/br30g9nudF0kYD7jJXDDoQanhDdeLcRNII9WlzuFYaSfQ1JXAkhupprZ0VxHpJyMg5z9MVxoa3uFHaFopMgKxJKtz2PdgH4Vi4a9NTJ7ckoqSatKo2W8Rgj8c+lQWh7L9o5F1YE1uGx3kHH0Bqe6ZVtZWfGkIc57sVnm9trb9ojJcthY4dIOPsnn9CfjV4/bPJ6fR1HNcQW+O3mjizy1sBn41RSS+v3yitZ2uNmYDtX8h9361bhsreFtaRAydZG95j/1HevS87qC5iuBqhbWv8wBwfI9alpSiFKUoOqUpUbKUqC+uVs7OW4fcIuQO89B8aClITe8YWLGYLMB225yEbfAb1pVU4Xata2YEpzNITJKe9zz/KrdVmlKUojL4+f4NorH3HukVweRG+x8Kq8ThiR5Lm5AmYsiwRYBJAI90DxOc89vhWtxGOCSxmF0paJVLMBz232+FY/A4XmX26dixOVhDHUUXJ6+f0rNdMPxd4fBJEjyzhe3mbU+Pu9AvoKXaNLdW6GZYo8k5Izqf7o7u8+Yq3XLokilXUMp5hhkVl010zWmM08tpBc3hljYIzFECDvOdOeh+XnU95NJa26xxLLNK2wKpqIHU4GOWfpXcVvKrSYZYULe4kaj4nbmaR+0qEmKBpotSFcgCRT1HdnAPyonciB5VtVecXMsrLpMkTkAgEgfZwNJ3q+qKmdKhcnJwMZPfWTJ20lvGnFigcuQpRQ0jjoowNt/136dvMs0QdCxG4OoYORscilWUigjhZmRcFySSSTzOevLcmo73BWFMbtKuPDG5+QNWaxr/iLNIxtULiLMav0Lnu7yO7xPdUva9RNxO5jjgKHDjnIueSjc/HYetScJ4UUka9vVV7mQ6gDv2Y7t+v0xWJFYxXLIGvz2jEKxERZC/PGrOCedfScNu555Z4LmMLJAQNQ5ODnBx05VcMZi5521epSldHIpSlApSlB1SlKjZWRxdjPxLh9kGGlnMsi94XcemxrXrGuXEf7VW2oHD25UHpnLGg16UpVYKUpQZ/H0Z+DXIQZOkH0BBPyqS3VVt4lTGgIAuO7FW3VXRkcBlYYIPUVl2TNbSHh832ox/CYn/MTp6gbGs5OmFXaUqtPewwv2Y1Sy8+zjXU3r3etYdVmql7eC3xFGA9wwyqZ2A/mbuFRT3d/gi34cx22Z5FGD5A/jVa0jlNy0eWWYjXLI43znY468tvurtzNUd28khkYRfxL5zh52X3YU8B064HM8z3VpQQrBEsaZwOp5k9SfGkEEcCaI1wM5J6k95PU1JTZoqJlhijDsqokYJBxstS1T4sWNk0KYMk5ESA95/wDzNQriVLFovaGlQRAqVZGwBpzjGPMiuLKxTiFzNfXUOY3wIFYkZUdSPHnvV+PhdjGEC2kOVAAJQE/96t10k043LaG3tILUMIIhHq54qalKrBSlVuI30XD7Vppd8bKud2PdRXnEbwWkI0gPPIdEMf8AM35UqOxspO29tvSHumGFHSJe4ePef0VRdNClKUUrL49YPd26TW5Iubc648de8eew+FSXPFoYpjbwxyXM6nDJGNl8zyFRe28TlUhLKGA9DLNqHwUVdJt3ZcYtLmEGSVIJRs8cjaSp9avI6SKGRlZT1U5FYEHC7qNpHkNpcSSnUzTRlj9aiu+HXBaM9nbQqGAMtshVlB6kZ5VdVnb6auFljZyiyIXXmoIyKyl4TbkL7Q81yV5GaQnHkKlPDrIrp9khx/YM/Gr40206gu7OG8jCSqcjdXU4ZD3g9KoiKex9+y1SIAAbd3OMf0k8j8q5PE571zbW0D2zlcs84wVB2yq9fOpqjyCeS24geH3E6zHRqjk5N/afGrscaRjTGioM5woxvWDxDhdvaQQSlpSwlHazAktjfJ8N8VoxtfxJlOxvIsZRtelyPE4INc8pp2wy3GhSs9ZOKTH/ACYLZeR1trbzGNqpXk9xw7VIOJrPJneFkG+3gdvlU01tu0qgsnFVjDGzgn1bgxTaRj1r0PxWT3VsYoD/ADSTah8BvTVTyi3NLHBE0srhEUZJNVuHJJeXHt8yFIwNNujc8Hmx8/pXsPCjJL23EJvaWByseMRr6dT51p1qTTGWW+oUpStOZSlKBWPf2jT8fsiXMiqGcodggGMH1P4VsVQsv8RxO7use7Hi3Q+W7fM/Kixo0pSo0VR4zdNa2LGMEyynsowDg6jyrJm4zeXOp4GW1gH2WZQzHxOdhVKZbuS8tJ7iaSQdsgGsYAyRyXpyqbm9M+U9N6xtVs7VIl5jdj/M3U0vo5JbcxxRwyFjuJs6celT0ruwz7eDiFrpRHgli5lW1KV8FO+3nU6X8JZ0lJgdNyJcLtnGQeRGaskgDJ2FZiW44rcG4uFzaptCm41d7H8Kzb4xrGeVWG4lAciASXJHPsV1Y9eVcveXUfvvYMIsgZ7VdW/h3+GauxxpEgSNFRRyCjAFRXsKTWzh4RNgFlQ9T0rn8ldfjjy3u4rjKqSsgGWjcYZfMVXv8w3tncAbazC+OZDcs+AIrMeP2Z0laCaxaMHQ2oyx79D3c6upxS1vLUi5hlRGX3i0ZKnyIrcy25XHSze3kcR9nCdtPICFiHXz7hWZFFxXh0EVuHhETuFDgaimTWjw5OHxKRZNGS27EPlvzru4ns50kt3uYct7pGsZB/OrZv2S69IxwqGTDXjyXT88uxAHkBsKXq2lrYzRDsbftY2UbYyceG5op4ky9kVhU4x2+rPqFxz+VTQ2UUcnbMDJPjBkc5Pp3elXX4m/1VseJ3/s0cR4Y5dRgszaBgcuY51b/e6RlRc208A2DOygop/uB5eNT14yh1KsAVIwQetTxNp4Z4bhNcMqSKDjKMDvUlYicIgWQkLpxgxvGdDp4ZHPzO/fVpZ7mzVRKpuogcF1H8RR4j73mPhWdVdtGlRW1zDdxCW3kWROWR0Pj3VLUClKUFTil37HYySj/MI0xjqWPKpOHW3sdlFBkkqMsSc5Y7n51mwn968bM32rSz2TuaTv9PwHfW3UahSlKK+S7M6wyHs1ByE+0M+v0Fe3HbTwtHI8Wk8yEIx/8qj7WbOlUjl72Rzj5j6Zr1NYIeaASupyoD7D0Nce3n72tWfELyGPTcW7zxrsJU+0R5HnWha39vdMVjfEgG6MNLD0NZvtE7/cSMeeo/h+NVpoTc/wmLzP0J2CeJwNq6Tlv215Rr8Tcv2Nmhw1w2k/2Ddvlt61dVVRQqgKoGAByArBezYaNT3E7ouFOsDQdtx1HLxqeGbisa6Wkt2GebglsemKZZeVdcM8ZGzXEqq6FGYqD1VtJ+NYMk93cHHtkgjznVGAgPl1x45qKS0gbLyhnbG7MxJNY3It5sY12guLRS0Uj3MI+1DJgtjwP4Gsm3nVbBI1OkbliT9lSTj1I/XKpLPiL2mUSGWSDGwY6dGO4npVMlmjWSS2kWAz9owA20Zzjv8AWr7TKzKTTuO1fiEitFag26ndyQmr1xy9K17aGB5BB7JY6VG4WQOwx3grvVSKf95TECEzomNMIbTGg6Fj1Phvirqx8QiXTbwWMQ7st+AFX06YySdPRwmGKQyWjyWznnoOQfMHNdBr+AgSRpdJ/PGdDeqnb4GrFt7R2X+KEQkz/pk4x61NVmVi3GVmfviMyMiWl45XGdMXL510OL24z28dxb/+7ERn4ZqaT3eKQ4H2oXB8cFcfU/GrNdsbbNuGUkulReIRTMEtCs7YyfewF8+vwBq0urSNQAbG4ByM1BJYWkr63tomY8yVG9dRQGEgRu3Z/wAjHOPI86rKvcWcsM7XlgwSY/bjP2ZfPuPjVjh3GbS/Cqj6JcZMbcx5HrU1Z0VjbTXl7DLCjoSsg23BYHO//TWcprtdtuqPFrl4oVt7fJubjKRAdO9vDArMjs76xuRb2/EWjhl/yi6hhkfd35HHxxWpYcONvK9xcTtcXLjBdhgKO4DpWGp2nsLRLGzjt49wg3P8x6mrFKUaKUpQfJLPDkKsiHoApzUgErj3IW8290fPf5VeqtPMWGmFwDnBbnjy8a4ajzairKJQezEydp1CLnQPEn8q6jWSJdKTuAN9wpz57V0iKgwo5nJPUnvr07DJqb/E3+PTcXCjJ7IgcyQRXmLm8TfTHFnbKn3/AEzyr2GBpmWSTKxg5VOrHvPhV2tRuKgtpwd5YyO4IR+NRyiSCMvIg0jmVbOB64q67rGhdzhRzNUmLTuJHBUL9lD08T41Okunlusd2T2nJTtEdifEj9fledQ6Mh5MMGqTKrY1AHByPA13HM8OA2ZE7+bD8/r50lSV3FdScOgjtxBCATpEpfSuehYAfrvqB5bm4vDFLdFHQkBoiQme4d57871JdTRzRmFMPrHvdyj89qiESCLs8ZTuJzWrk6XkutLltxcxP2HEV7JxylH2X/L9cqlm4vCBptUa5kPIIMD1blVFZWRRHMhmi78ZI8x1+tdy3SSL2cD5ZhuV+6PwNNt/LdObHi0VxdtPdSLAUTQkZzjc5JzjwA9K1VvbVzhbmEnwkFY3ZR4A0DYYB6gedRtbwoucAAd6hvqCa3jyydac7nLW97ZbawntEWo7Aaxk1I8scYzJIiAnGWIG9YEfDiV1MIVZtypiB0+GxFcvY9iHkaO3ZAM5II/OtfL/AA21rri1nbRlu2SRhyRDkk/hUnC4XCSXcxHa3JD4U5Crj3R8KxbWG2LM08KqzDCqyjSB9M1eju24Y0au2q0Y6ADzi8Qeo+lS5+R79NDiAXsoi2MieIrnv1j8M1o1kS4vuKW8KNmKAC4YruCfujPxPlWvVdMJ0UpSjRSlKD5qeYyZjjbC8mYfQfn+hGoCgADAGwFbH7i4bt/hzt/6r/nXUfBuHRvrW0Qn+vLfWudw25Xj39sN5I0OHdV8ziuIJoJmDyTxrGOSMwy3iR3V9YqIq6VVQvcBtXVJhpZxyMGORJBmN1cd6nNd1qTWltOpE0Ebg/zKDVJ/2f4eUKxpJCTzZJGz88ir4Hgy5ZBO4xvGp93+o9/l+u6vKuS8GuYf/DSpNGOSSe6w8MgYPwFU2DRvoljeN9/dcYzju7/SueWNjnljYV4SSwjQZduXh4nwo7aQMDUx2VR1NWbaExJl8GRvtMPoPCpIzI49jVV9xir9WO+o+IqFxJEffiYjvQah+fyq/UVxL2aYXHaNso/HyFaa1tTjftzpgIY9T0Xz/KrC2UIQArlxuXGzE+Y+lVlhCEMhKyLnD8yc8899WYrtSuJ8RONjk+6fI/hSfwmvp4bVxukxPg6g/TFVYZWaVZHiLRr9kIQcnv3xt3VPPcLcEwxHUg+245H+kfjXlS3SW6TC8ix7yyKe7QTj4VVnvYZZghfSi7jWCuo9+/d9fKpMFnWMEgt1HQdT+u8VcRFjRUQYVRgCrFncUlZXXKkMp6jcVGI2EXbY1Q7gKfur1Plty7qmvbeMLqjQrI506k2x3k1yk08pWxjjCzv7qONl09T4YHSkhJ9L/wCzEDrDPclspK2mPJz7qkgfl6Vt1FbwR20CQxLpRBgCpa7PQUpSgUpSgUpSgUpSgUpSgVXvLKC9i0TLnG6sNmU94NWKUHzM8TcJuM3IMkUmy3AHL+kjp6c/pZR1kUMjBlPIg5rbdVdSjqGVhggjIIrHuP2fCyNLw+4a2Y7lOaE+XT51m4sXD8RySLEhduQ+dUhrkcyygByMADfSO6pLm04nE4ae27dEGxgOd+/TzzUDziJczxzQ+EkZFc7K55Y1LXOkzSdipI2yzdw/OojdwnSElTLHGScAeJq3FPaRJpW4i3OSS4yTUkZmNdex2+AFj0D+glfpXhs4Vy2uQAd8hwPjUi3ED/ZmjbyYGq13co8nYhwEUanbIwe4fj/3qtI4kOTIGdS3LfcDoK7/AIgOVnkHhsR8xXHtEH+9H/yFelu0wkTAs+wI3x4+lTtntyJZnBnkUPGmVDqOnU4/XLlWhwEJJxCeUHJWJVBB2wST+Ar2NFijWNRhVGBU/ALdUjuLpSMTyHAByAFJHzOTW8Z3t0xne2tSlK6OpSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKCPsYtevsk1ZznSM5r14o5Ma0VsctQzSlBwLS2XOLeIZ3OEG9e+zQf7Ef/AUpQPZrf/Yj/wCAqvPwjh9wAHtIxjqg0n5UpQVk4Gsbe5e3IQjGkkE+hI2rTijSGJYo10oowB4UpQd0pSgUpSgUpSg//9k=",
				"Altezza": "175",
				"Peso": "65",
				"DataModifica": 1694960504,
				"trattamenti": [
					{//*1
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Tratamento Shiatsu - Rigidez dos membros inferiores",
						"TestoTrattamento": "Chegando à instalação, CLIENTE DEMO opta por passar por um tratamento de Shiatsu para aliviar a dor nos membros inferiores.\n\nApós uma entrevista inicial, muitos aspectos interessantes da personalidade do CLIENTE emergem. \nO que mais me chama a atenção é a tolerância à dor. O limiar da dor está bem acima da média.\n\nA avaliação parcial dos Meridianos Tendino-Musculares destaca:\nVazio de VU;\nVazio de R;\nVB doloroso na perna direita.\n\nA avaliação da zona Shu mostra:\nVazio de P;\nCheio de F;\nÁrea do Rim dura;\nDor em VU.\n\n---------------\n\nApós o tratamento, o CLIENTE DEMO se sente significativamente melhor ao ponto de não sentir a necessidade de reproduzir um novo tratamento. Vamos manter contato para qualquer possível recaída.\n",
						"Prescrizione": "Possibilidade de trabalho para uma compreensão pessoal do corpo e de suas dinâmicas em termos de MTC.",
						"puntiMTC": [
							{
								"n": 13,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Ponto Shu do Pulmão",
								"s": "13.BL"
							},
							{
								"n": 14,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Ponto Shu do Mestre do coração",
								"s": "14.BL"
							},
							{
								"n": 15,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Ponto Shu do Coração",
								"s": "15.BL"
							},
							{
								"n": 18,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Ponto Shu do Fígado",
								"s": "18.BL"
							},
							{
								"n": 19,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Ponto Shu da Vesícula biliar",
								"s": "19.BL"
							},
							{
								"n": 20,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Ponto Shu do Baço",
								"s": "20.BL"
							},
							{
								"n": 21,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Ponto Shu do Estômago",
								"s": "21.BL"
							},
							{
								"n": 22,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Ponto Shu do Triplo aquecedor",
								"s": "22.BL"
							},
							{
								"n": 23,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Ponto Shu do Rim",
								"s": "23.BL"
							},
							{
								"n": 25,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Ponto Shu do Intestino grosso",
								"s": "25.BL"
							},
							{
								"n": 27,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Ponto Shu do Intestino delgado",
								"s": "27.BL"
							},
							{
								"n": 28,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Ponto Shu da Bexiga",
								"s": "28.BL"
							},
							{
								"n": 1,
								"m": "LU",
								"e": "",
								"z": "",
								"t": "Ponto BO do Pulmão",
								"s": "1.LU"
							},
							{
								"n": 17,
								"m": "CV",
								"e": "",
								"z": "",
								"t": "Ponto BO do Mestre do coração",
								"s": "17.CV"
							},
							{
								"n": 14,
								"m": "LR",
								"e": "",
								"z": "",
								"t": "Ponto BO do Fígado",
								"s": "14.LR"
							},
							{
								"n": 24,
								"m": "GB",
								"e": "D",
								"z": "",
								"t": "Ponto BO da Vesícula biliar",
								"s": "24.GB"
							},
							{
								"n": 14,
								"m": "CV",
								"e": "",
								"z": "",
								"t": "Ponto BO do Coração",
								"s": "14.CV"
							},
							{
								"n": 12,
								"m": "CV",
								"e": "",
								"z": "",
								"t": "Ponto BO do Estômago",
								"s": "12.CV"
							},
							{
								"n": 13,
								"m": "LR",
								"e": "P",
								"z": "",
								"t": "Ponto BO do Baço",
								"s": "13.LR"
							},
							{
								"n": 25,
								"m": "GB",
								"e": "",
								"z": "",
								"t": "Ponto BO do Rim",
								"s": "25.GB"
							},
							{
								"n": 25,
								"m": "ST",
								"e": "P",
								"z": "",
								"t": "PONTO DIREITO MAIS HIPERATIVO",
								"s": "25.ST"
							},
							{
								"n": 5,
								"m": "CV",
								"e": "V",
								"z": "",
								"t": "Ponto BO do Triplo aquecedor",
								"s": "5.CV"
							},
							{
								"n": 4,
								"m": "CV",
								"e": "",
								"z": "",
								"t": "Ponto BO do Intestino delgado",
								"s": "4.CV"
							},
							{
								"n": 3,
								"m": "CV",
								"e": "V",
								"z": "",
								"t": "Ponto BO da Bexiga",
								"s": "3.CV"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "KI",
								"NomeMeridiano": "Rim",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Vesícula biliar",
								"valEnergetica": "D"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "RIGIDEZ NOS MEMBROS INFERIORES",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "MÃOS FRIAS ",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ESTRESSE",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "HIPOCONDRÍACO",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "DOR DE CABEÇA",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "QUALIDADE DO SONO",
								"score": 4
							}
						],
						"gallery": [
							{
								"idFile": "file_2674467779004",
								"Dida": ""
							},
							{
								"idFile": "file_2674467791995",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1672527600,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1691909111,
						"LabelCiclo": "",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//2
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Anamnese",
						"TestoTrattamento": "{\"AnamnesiMotivo\": \"O Cliente Demo Iaomai vem até mim para iniciar um ciclo de tratamentos de shiatsu para tentar resolver uma série de distúrbios relacionados à ansiedade dos quais ele sofre há anos.\\n\\nEle reclama de dificuldade em adormecer há algum tempo e acorda muito cansado pela manhã.\\nOs sintomas pioram em proporção ao estresse relacionado ao trabalho.\\nSudorese, pensamentos recorrentes e obsessivos e ruminação muitas vezes ocorrem durante a noite.\\n\\nDurante o dia, o acúmulo de estresse se manifesta somaticamente na região lombar, especialmente no nível dos rins.\\nHá algumas semanas, a urina está escassa e escura, ele reclama de boca seca e sensação de peso na cabeça; ocasionalmente, surgem zumbidos leves.\\n\\nO gosto amargo na boca é recorrente\\n\",\"AnamnesiDiagnosiOccidentale\": \"O estado emocional de cada pessoa é subjetivo e se manifesta nas formas mais improváveis, a falta básica de autoestima pode levar uma pessoa a pensar que não consegue superar os desafios que a vida nos coloca. O estresse pronunciado que prejudica nossa calma pode nos levar a entrar em \\\"tilt\\\" e aqui surge a ansiedade, o medo, o famoso ataque de pânico. Como sintoma na fase aguda, pode haver taquicardia, dificuldade para respirar, medo com consequente descarga de adrenalina, uma sensação muito desagradável também porque as crises às vezes vêm de repente, sem aviso, e quem é afetado vive aterrorizado de entrar na fase de \\\"Terror\\\".\\nSe o estado de angústia for profundo, grave e permanente, então é necessária a intervenção de um especialista. \",\"AnamnesiDiagnosiMTC\": \"T.C.M.\\nA ansiedade, o medo, a angústia e a hiperemotividade são considerados um excesso de Qi nos meridianos do Coração e do Mestre do coração, que devem regular o tom do plexo cardíaco.\\nSe a patologia for crônica, também pode estar relacionada a outros meridianos.\\n\\n\"}",
						"Prescrizione": "Terapia\nDispersar e regular o Qi nos meridianos do Coração e do Mestre do coração,\nRestaurar a comunicação entre Coração e Rim - Nível Energético Shao Yin -\nAcalmar o Shen",
						"puntiMTC": [
							{
								"n": "03",
								"m": "KI",
								"e": "V",
								"z": "",
								"t": "",
								"s": "3.KI"
							},
							{
								"n": "36",
								"m": "ST",
								"e": "P",
								"z": "",
								"t": "na perna direita mais interativa do que na perna esquerda. ",
								"s": "36.ST"
							},
							{
								"n": "04",
								"m": "LI",
								"e": "D",
								"z": "coppetta",
								"t": "",
								"s": "04.LI"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "KI",
								"NomeMeridiano": "Rim",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "ST",
								"NomeMeridiano": "Estômago",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Bexiga urinária",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Vesícula biliar",
								"valEnergetica": "V"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "HIPCONDRIA",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ESTRESSE",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "MÃOS FRIAS ",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "CEFALEA",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "INSÔNIA",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANSIEDADE",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "BOCA SECA",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "SABOR AMARGO NA BOCA",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Pesadelos e pensamentos recorrentes",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "DOR AO URINAR",
								"score": 7
							}
						],
						"gallery": [
							{
								"idFile": "file_2674478724650",
								"Dida": ""
							},
							{
								"idFile": "file_2674478728149",
								"Dida": ""
							},
							{
								"idFile": "file_2674478731260",
								"Dida": ""
							}
						],
						"TimeTrattamento": 0,
						"oraInizio": -1,
						"oraFine": -1,
						"DataModifica": 1694960504,
						"LabelCiclo": "Ciclo de Shiatsu - Ansiedade ",
						"TipoTrattamento": "A",
						"CostoTrattamento": 0,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*3
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Anamnese",
						"TestoTrattamento": "{\"AnamnesiMotivo\":\"Histórico clínico:\\n\\n-Sintomas atuais:\\n\\nO paciente relatou sintomas de lombociatalgia, incluindo dor lancinante na região lombar e formigamento ao longo da perna direita.\\nOs sintomas começaram há cerca de 6 semanas.\\n\\n- Eventos desencadeantes:\\n\\nO paciente indicou um levantamento inadequado de objetos pesados como possível causa dos sintomas.\\n\\n-Histórico médico:\\n\\nO paciente relatou problemas espinhais pré-existentes, como uma leve hérnia de disco na região lombar.\\nRecebeu tratamentos quiropráticos no passado para controlar os sintomas.\\n\\n-Medicamentos e suplementos:\\n\\nO paciente está atualmente tomando ibuprofeno para aliviar a dor.\\n\\n-Histórico cirúrgico:\\n\\nO paciente não passou por cirurgias nas costas ou na região lombar no passado.\\n\\n-Alergias e intolerâncias:\\n\\nO paciente declarou ser alérgico à penicilina.\\n\\n>Estilo de vida e fatores de risco:\\n\\n- Atividade física:\\n\\nO paciente descreveu seu nível de atividade física como moderado, com caminhadas regulares.\\n\\n- Postura e hábitos diários:\\n\\nO paciente trabalha principalmente no computador e está ciente de ter uma postura não ideal durante o trabalho.\\n\\n- Estresse e fatores psicológicos:\\n\\nO paciente mencionou níveis de estresse relacionados ao trabalho que podem afetar a lombociatalgia.\\n\\n- Objetivos de tratamento:\\n\\nO paciente expressou o desejo de reduzir a dor na região lombar e melhorar a mobilidade.\\n\\n- Notas adicionais:\\n\\nDurante a consulta, o paciente enfatizou a importância de encontrar um tratamento com uma abordagem mais natural do que o uso a longo prazo de medicamentos.\\n\",\"AnamnesiDiagnosiOccidentale\":\"O CLIENTE DEMO IAOMAI apresenta uma condição de lombociatalgia, caracterizada por dor na região lombar e formigamento ao longo do curso do nervo ciático. A condição parece estar relacionada a uma possível irritação do nervo ciático, provavelmente desencadeada por um levantamento inadequado e agravada pela presença de uma hérnia de disco lombar.\",\"AnamnesiDiagnosiMTC\":\"Com base na análise dos sintomas e fatores de risco, a lombociatalgia de CLIENTE DEMO IAOMAI pode estar relacionada a uma 'Obstrução de Qi e Sangue na Região Lombar' de acordo com os princípios da Medicina Tradicional Chinesa. O acúmulo de estresse, a postura incorreta e o levantamento inadequado podem ter contribuído para esta condição, obstruindo o fluxo harmonioso de Qi e Sangue ao longo dos meridianos da região lombar.\\n\\nDo ponto de vista da MTC, o objetivo do tratamento será eliminar o obstáculo, promover a circulação de Qi e Sangue e restabelecer o equilíbrio energético nos meridianos envolvidos.\\n\"}",
						"Prescrizione": "• Evidencia-se uma estase no meridiano da vesícula biliar porque movimenta o Qi sendo o nível shaoyang que permite o movimento da energia tanto yang como yin. \n• Moxa em 25VB, ponto Mu do Rim que permite o nascimento do yang. \n• Moxa em 31VB, ponto do vento indicado para a estase. \n• 34VB, ponto de encontro muscular, segundo Leung KwokPo trata o músculo como capaz de induzir o 'movimento'. \n• Pontos importantes que mobilizam o sangue no meridiano da vesícula biliar 17BL, 40BL, 32 BL e 53BL \n• LV3, ponto shu de terra e yuan que movimenta o sangue. \n• Yao fa para mobilizar a região lombar.",
						"puntiMTC": [
							{
								"n": 31,
								"m": "GB",
								"e": "D",
								"z": "",
								"t": "Sensível ao toque",
								"s": "31.GB"
							},
							{
								"n": 25,
								"m": "KI",
								"e": "D",
								"z": "",
								"t": "Sensível ao toque",
								"s": "25.KI"
							},
							{
								"n": 21,
								"m": "GB",
								"e": "P",
								"z": "",
								"t": "",
								"s": "21.GB.."
							},
							{
								"n": 30,
								"m": "GB",
								"e": "P",
								"z": "",
								"t": "",
								"s": "30.GB.."
							},
							{
								"n": 34,
								"m": "GB",
								"e": "D",
								"z": "",
								"t": "Sensível ao toque",
								"s": "34.GB"
							},
							{
								"n": 43,
								"m": "GB",
								"e": "D",
								"z": "",
								"t": "Sensível ao toque",
								"s": "43.GB"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Vesícula biliar",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "KI",
								"NomeMeridiano": "Rim",
								"valEnergetica": "D"
							},
							{
								"siglaMeridiano": "ST",
								"NomeMeridiano": "Estômago",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Dor lombar",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Formigamento e dormência",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Fraqueza muscular",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Agravamento com o movimento",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Movimento limitado",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Dor durante a sessão",
								"score": 8
							}
						],
						"gallery": [
							{
								"idFile": "file_2674469901174",
								"Dida": ""
							},
							{
								"idFile": "file_2674469904750",
								"Dida": ""
							},
							{
								"idFile": "file_2674469909751",
								"Dida": ""
							}
						],
						"TimeTrattamento": 0,
						"oraInizio": -1,
						"oraFine": -1,
						"DataModifica": 1692183228,
						"LabelCiclo": "Ciclo de Acupuntura para a Ciática",
						"TipoTrattamento": "A",
						"CostoTrattamento": 0,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*4
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Sessão 1: Avaliação inicial e relaxamento",
						"TestoTrattamento": "Duração: 45 minutos\n\nDurante a primeira sessão, o paciente é recebido e submetido a uma avaliação detalhada de seu histórico médico e dos sintomas associados à ciática. O acupunturista explica o processo de tratamento e identifica os pontos-chave de acupuntura a serem tratados. O acupunturista insere agulhas finas em pontos específicos ao longo dos meridianos relacionados à ciática. O paciente é então deixado para relaxar por aproximadamente 20-30 minutos.",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 23,
								"m": "BL",
								"e": "D",
								"z": "ago",
								"t": "Ponto Shu do Rim",
								"s": "23.BL"
							},
							{
								"n": 32,
								"m": "BL",
								"e": "P",
								"z": "ago",
								"t": "",
								"s": "32.BL"
							},
							{
								"n": 8,
								"m": "BL",
								"e": "D",
								"z": "ago",
								"t": "",
								"s": "8.BL"
							},
							{
								"n": 30,
								"m": "BL",
								"e": "P",
								"z": "ago",
								"t": "",
								"s": "30.BL"
							},
							{
								"n": 4,
								"m": "CV",
								"e": "V",
								"z": "ago",
								"t": "Ponto BO do Intestino Delgado",
								"s": "4.CV"
							},
							{
								"n": 4,
								"m": "SP",
								"e": "V",
								"z": "ago",
								"t": "",
								"s": "4.SP"
							},
							{
								"n": 31,
								"m": "GB",
								"e": "D",
								"z": "ago",
								"t": "",
								"s": "31.GB"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Bexiga urinária",
								"valEnergetica": "D",
								"descrizione": "Sensível ao toque"
							},
							{
								"siglaMeridiano": "KI",
								"NomeMeridiano": "Rim",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Vesícula biliar",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Dor lombar",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Formigamento e dormência",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Fraqueza muscular",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Agravamento com o movimento",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Movimento limitado",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Dor durante a sessão",
								"score": 10
							}
						],
						"gallery": [
							{
								"idFile": "file_2674427029613",
								"Dida": ""
							},
							{
								"idFile": "file_2674427069354",
								"Dida": ""
							},
							{
								"idFile": "file_2674469909751",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1674428400,
						"oraInizio": 132,
						"oraFine": 144,
						"DataModifica": 1692183278,
						"LabelCiclo": "Ciclo de Acupuntura para a Ciática",
						"TipoTrattamento": "B",
						"CostoTrattamento": 150,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*5
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Sessão 2: Redução da Inflamação e da Dor",
						"TestoTrattamento": "Duração: 40 minutos\n\nNa segunda sessão, o acupunturista avalia o progresso do paciente desde a sessão anterior e concentra-se na redução da inflamação e da dor associadas à ciática. As agulhas são colocadas para estimular pontos que podem ajudar a aliviar a inflamação dos nervos ciáticos e a dor associada. O paciente é novamente deixado para relaxar enquanto as agulhas fazem efeito.",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 23,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "Ponto Shu do Rim",
								"s": "23.BL"
							},
							{
								"n": 32,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "32.BL"
							},
							{
								"n": 8,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "8.BL"
							},
							{
								"n": 30,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "30.BL"
							},
							{
								"n": 4,
								"m": "CV",
								"e": "",
								"z": "ago",
								"t": "Ponto BO do Intestino Delgado",
								"s": "4.CV"
							},
							{
								"n": 4,
								"m": "SP",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "4.SP"
							},
							{
								"n": 31,
								"m": "GB",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "31.GB"
							},
							{
								"n": 12,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "12.BL"
							},
							{
								"n": 40,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "40.BL"
							},
							{
								"n": 60,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "60.BL"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Bexiga urinária",
								"valEnergetica": "D"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Vesícula biliar",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "ST",
								"NomeMeridiano": "Estômago",
								"valEnergetica": "P",
								"descrizione": "Trattamento palmare per pensieri ossessivi"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Dor lombar",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Formigamento e dormência",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Fraqueza muscular",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Agravamento com o movimento",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Movimento limitado",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Dor durante a sessão",
								"score": 9
							}
						],
						"gallery": [
							{
								"idFile": "file_2674467779004",
								"Dida": ""
							},
							{
								"idFile": "file_2674469909751",
								"Dida": ""
							},
							{
								"idFile": "file_2674475331170",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1675033200,
						"oraInizio": 132,
						"oraFine": 144,
						"DataModifica": 1692183307,
						"LabelCiclo": "Ciclo de Acupuntura para a Ciática",
						"TipoTrattamento": "B",
						"CostoTrattamento": 150,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*6
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Duração: 50 minutos\n\nNa terceira sessão, o acupunturista continua a trabalhar na redução da dor e inflamação, mas também foca no aumento da circulação sanguínea e do fluxo energético na área afetada. As agulhas são colocadas para estimular o fluxo de energia ao longo dos meridianos conectados à região lombar e ciática.",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 8,
								"m": "GB",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "8.GB"
							},
							{
								"n": 20,
								"m": "GB",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "20.GB"
							},
							{
								"n": 22,
								"m": "GV",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "22.GV"
							},
							{
								"n": 10,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "10.BL"
							},
							{
								"n": 30,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "30.BL"
							},
							{
								"n": 23,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "Ponto Shu do Rim",
								"s": "23.BL"
							},
							{
								"n": 32,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "32.BL"
							},
							{
								"n": 4,
								"m": "SP",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "4.SP"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Bexiga urinária",
								"valEnergetica": "D"
							},
							{
								"siglaMeridiano": "ST",
								"NomeMeridiano": "Estômago",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Dor lombar",
								"score": 5
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Formigamento e dormência",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Fraqueza muscular",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Agravamento com o movimento",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Movimento limitado",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Dor durante a sessão",
								"score": 7
							}
						],
						"gallery": [
							{
								"idFile": "file_2674469904750",
								"Dida": ""
							},
							{
								"idFile": "file_2674475331170",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1675638000,
						"oraInizio": 132,
						"oraFine": 144,
						"DataModifica": 1692183339,
						"LabelCiclo": "Ciclo de Acupuntura para a Ciática",
						"TipoTrattamento": "B",
						"CostoTrattamento": 150,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*7
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Sessão 4: Reequilíbrio Muscular e Postural",
						"TestoTrattamento": "Duração: 45 minutos\n\nNa quarta sessão, o acupunturista avalia a postura e os músculos do paciente, procurando identificar desequilíbrios que possam contribuir para a lombociatalgia. As agulhas são inseridas em pontos que ajudam a reequilibrar os músculos e a melhorar a postura. O paciente também pode receber conselhos sobre exercícios de alongamento ou fortalecimento para fazer em casa.",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 20,
								"m": "GV",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "20.GV"
							},
							{
								"n": 7,
								"m": "HT",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "7.HT"
							},
							{
								"n": 20,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "Ponto Shu do Baço",
								"s": "20.BL"
							},
							{
								"n": 40,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "40.BL"
							},
							{
								"n": 60,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "60.BL"
							},
							{
								"n": 37,
								"m": "BL",
								"e": "",
								"z": "coppetta",
								"t": "",
								"s": "37.BL"
							},
							{
								"n": 38,
								"m": "BL",
								"e": "",
								"z": "coppetta",
								"t": "",
								"s": "38.BL"
							},
							{
								"n": 41,
								"m": "BL",
								"e": "",
								"z": "coppetta",
								"t": "",
								"s": "41.BL"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Bexiga urinária",
								"valEnergetica": "D"
							},
							{
								"siglaMeridiano": "ST",
								"NomeMeridiano": "Estômago",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "CV",
								"NomeMeridiano": "Vaso de concepção",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Dor lombar",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Formigamento e dormência",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Fraqueza muscular",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Agravamento com o movimento",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Movimento limitado",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Dor durante a sessão",
								"score": 3
							}
						],
						"gallery": [
							{
								"idFile": "file_2674427069354",
								"Dida": ""
							},
							{
								"idFile": "file_2674469901174",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1676242800,
						"oraInizio": 132,
						"oraFine": 144,
						"DataModifica": 1692183366,
						"LabelCiclo": "Ciclo de Acupuntura para a Ciática",
						"TipoTrattamento": "B",
						"CostoTrattamento": 150,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*8
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Sessão 5: Manutenção e Planejamento Futuro",
						"TestoTrattamento": "Duração: 40 minutos\n\nNa última sessão do ciclo, o acupunturista discute com o paciente o progresso feito durante o tratamento. O foco está na manutenção dos resultados e pode propor um plano de tratamento a longo prazo, com visitas periódicas para gerenciar os sintomas da lombociatalgia ao longo do tempo. O paciente é incentivado a continuar seguindo conselhos de postura, exercícios e hábitos saudáveis.",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 23,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "Ponto Shu do Rim",
								"s": "23.BL"
							},
							{
								"n": 32,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "32.BL"
							},
							{
								"n": 30,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "30.BL"
							},
							{
								"n": 31,
								"m": "GB",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "31.GB"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Bexiga urinária",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Vesícula biliar",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "ST",
								"NomeMeridiano": "Estômago",
								"valEnergetica": "D"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Dor lombar",
								"score": 2
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Formigamento e dormência",
								"score": 1
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Fraqueza muscular",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Agravamento com o movimento",
								"score": 2
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Movimento limitado",
								"score": 5
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Dor durante a sessão",
								"score": 3
							}
						],
						"gallery": [
							{
								"idFile": "file_2674475391556",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1676847600,
						"oraInizio": 132,
						"oraFine": 144,
						"DataModifica": 1692183387,
						"LabelCiclo": "Ciclo de Acupuntura para a Ciática",
						"TipoTrattamento": "B",
						"CostoTrattamento": 150,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*9
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Primeiro Tratamento de Ansiedade",
						"TestoTrattamento": "O paciente parece nervoso e desconfiado.\nNão dormiu por duas noites e está muito preocupado com as consequências da pandemia de COVID-19.\n\nPressão de Shiatsu no meridiano da Bexiga de 11BL a 28BL, tonificando os pontos 15BL e 20BL, respectivamente pontos Shu do Coração e do Baço.\n\n- Pressão de Shiatsu em todo o meridiano do Baço, fazendo uma pausa nos pontos 6SP e 10SP e depois continuando ao longo de todo o meridiano até o peito.\n\n- Pressão de Shiatsu em todo o meridiano do Coração, fazendo uma pausa no ponto 7HT e continuando até o ponto 9HT.\n\n- Pressão de Shiatsu no meridiano do Pericárdio.",
						"Prescrizione": "Pressão de Shiatsu no meridiano da Bexiga de 11BL a 28BL, tonificando os pontos 15BL e 20BL, respectivamente pontos Shu do Coração e do Baço.\n\n- Pressão de Shiatsu em todo o meridiano do Baço, fazendo uma pausa nos pontos 6SP e 10SP e depois continuando ao longo de todo o meridiano até o peito.\n\n- Pressão de Shiatsu em todo o meridiano do Coração, fazendo uma pausa no ponto 7HT e continuando até o ponto 9HT.\n\n- Pressão de Shiatsu no meridiano do Pericárdio.",
						"puntiMTC": [
							{
								"n": 7,
								"m": "HT",
								"e": "",
								"z": "dito",
								"t": "",
								"s": "7.HT"
							},
							{
								"n": 6,
								"m": "PC",
								"e": "",
								"z": "dito",
								"t": "",
								"s": "6.PC"
							},
							{
								"n": 7,
								"m": "PC",
								"e": "",
								"z": "dito",
								"t": "",
								"s": "7.PC"
							},
							{
								"n": 20,
								"m": "GV",
								"e": "",
								"z": "coppetta",
								"t": "",
								"s": "20.GV"
							},
							{
								"n": 1,
								"m": "SP",
								"e": "",
								"z": "dito",
								"t": "",
								"s": "1.SP"
							},
							{
								"n": 11,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "11.BL"
							},
							{
								"n": 28,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "Ponto Shu do Baço",
								"s": "28.BL"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Bexiga urinária",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "SP",
								"NomeMeridiano": "Baço",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "HT",
								"NomeMeridiano": "Coração",
								"valEnergetica": "V"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "HIPCONDRIA",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ESTRESSE",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "MÃOS FRIAS ",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "CEFALEA",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "INSÔNIA",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANSIEDADE",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "BOCA SECA",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "SABOR AMARGO NA BOCA",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Pesadelos e pensamentos recorrentes",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "DOR AO URINAR",
								"score": 6
							}
						],
						"gallery": [
							{
								"idFile": "file_2674478724650",
								"Dida": ""
							},
							{
								"idFile": "file_2674478728149",
								"Dida": ""
							},
							{
								"idFile": "file_2674478731260",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1674514800,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692049984,
						"LabelCiclo": "Ciclo de Shiatsu - Ansiedade",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*10
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Segundo Tratamento de Ansiedade",
						"TestoTrattamento": "O cliente relata ter experimentado uma mudança emocional em comparação com a semana anterior, no entanto, os sintomas indicados na anamnese persistem. Ele se queixa de palpitações noturnas incômodas e frequentes, precedidas por pesadelos e pensamentos obsessivos.\n\nDecido também incorporar técnicas de alongamento e reequilíbrio do Qi.\n\nTratamento:\nPalpação de Shiatsu no meridiano da Bexiga de 11BL a 28BL, tonificando os pontos 15BL e 20BL, respectivamente pontos Shu do Coração e do Baço.\n\nPressão de Shiatsu em todo o meridiano do Rim, parando em 1KI e 3KI.\n\nPressão de Shiatsu em todo o meridiano do Coração e Mestre do Coração, parando em 8PC.\n\nTambém tratou o meridiano do Intestino Grosso para a regulação do Meio-Dia Meia-Noite e para a tonificação dos Fluidos Jin.",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 7,
								"m": "HT",
								"e": "P",
								"z": "dito",
								"t": "",
								"s": "7.HT"
							},
							{
								"n": 6,
								"m": "PC",
								"e": "D",
								"z": "dito",
								"t": "",
								"s": "6.PC"
							},
							{
								"n": 7,
								"m": "PC",
								"e": "D",
								"z": "dito",
								"t": "",
								"s": "7.PC"
							},
							{
								"n": 20,
								"m": "GV",
								"e": "V",
								"z": "moxa",
								"t": "",
								"s": "20.GV"
							},
							{
								"n": 6,
								"m": "SP",
								"e": "V",
								"z": "moxa",
								"t": "",
								"s": "6.SP"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Bexiga urinária",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "SP",
								"NomeMeridiano": "Milza-pancreas",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "HT",
								"NomeMeridiano": "Cuore",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "HIPCONDRIA",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ESTRESSE",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "MÃOS FRIAS ",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "CEFALEA",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "INSÔNIA",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANSIEDADE",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "BOCA SECA",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "SABOR AMARGO NA BOCA",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Pesadelos e pensamentos recorrentes",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "DOR AO URINAR",
								"score": 4
							}
						],
						"gallery": [
							{
								"idFile": "file_2674478724650",
								"Dida": ""
							},
							{
								"idFile": "file_2674478728149",
								"Dida": ""
							},
							{
								"idFile": "file_2674478731260",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1675119600,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692049984,
						"LabelCiclo": "Ciclo de Shiatsu - Ansiedade",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*11
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Terceiro Tratamento de Ansiedade",
						"TestoTrattamento": "O Cliente Demo Iaomai relata ter feito melhorias substanciais. Agora consegue adormecer pacificamente e já não acorda durante a noite. Os sonhos diminuíram significativamente, e o sono é tranquilo e repousante. A dor lombar desapareceu. Os outros sintomas também melhoraram.",
						"Prescrizione": "Tratamento:\n\nDispersar o Fogo do Fígado e da Vesícula Biliar e tonificar os respectivos órgãos. Pressão de Shiatsu no meridiano da Bexiga de 11BL a 28BL, pausando em 18BL e 19BL como os pontos Shu do Fígado e da Vesícula Biliar.\n\nPressão de Shiatsu ao longo de todo o meridiano da Vesícula Biliar, pausando em GB20 e GB21.\nPressão de Shiatsu em todo o meridiano do Fígado. O meridiano do Coração também foi tratado para a regulação do Meio-Dia-Meia-Noite.",
						"puntiMTC": [
							{
								"n": 11,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "",
								"s": "11.BL"
							},
							{
								"n": 18,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "Ponto Shu do Fígado",
								"s": "18.BL"
							},
							{
								"n": 19,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "Ponto Shu da Vesícula biliar",
								"s": "19.BL"
							},
							{
								"n": 28,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "Ponto Shu da Bexiga",
								"s": "28.BL"
							},
							{
								"n": 20,
								"m": "GB",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "20.GB"
							},
							{
								"n": 21,
								"m": "GB",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "21.GB"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Bexiga urinária",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Vesícula biliar",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "LR",
								"NomeMeridiano": "Fígado",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "HIPCONDRIA",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ESTRESSE",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "MÃOS FRIAS ",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "CEFALEA",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "INSÔNIA",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANSIEDADE",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "BOCA SECA",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "SABOR AMARGO NA BOCA",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Pesadelos e pensamentos recorrentes",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "DOR AO URINAR",
								"score": 3
							}
						],
						"gallery": [
							{
								"idFile": "file_2674478724650",
								"Dida": ""
							},
							{
								"idFile": "file_2674478728149",
								"Dida": ""
							},
							{
								"idFile": "file_2674478731260",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1676329200,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692049984,
						"LabelCiclo": "Ciclo de Shiatsu - Ansiedade",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*12
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Quarto Tratamento de Ansiedade",
						"TestoTrattamento": "O destinatário relata não acordar mais durante a noite, o sono é tranquilo e reparador, e os pesadelos desapareceram. Eles também relatam estar menos irritados e sem episódios de dores de cabeça. Eles recuperaram energia física, e o tom geral do humor melhorou. O aspecto ansioso permanece, embora pareça ter diminuído desde o primeiro encontro. Eles ainda reclamam de um gosto amargo na boca, especialmente nas primeiras horas do dia. Tratamento:\nDispersar o Fogo do Fígado e da Vesícula Biliar e tonificar os respectivos órgãos. Pressão de Shiatsu no meridiano da Bexiga de 11BL a 28BL, pausando em 18BL e 19BL como os pontos Shu do Fígado e da Vesícula Biliar.",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 11,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "",
								"s": "11.BL"
							},
							{
								"n": 18,
								"m": "BL",
								"e": "V",
								"z": "moxa",
								"t": "Ponto Shu do Fígado",
								"s": "18.BL"
							},
							{
								"n": 19,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "Ponto Shu da Vesícula biliar",
								"s": "19.BL"
							},
							{
								"n": 28,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "Ponto Shu da Bexiga",
								"s": "28.BL"
							},
							{
								"n": 13,
								"m": "LR",
								"e": "V",
								"z": "moxa",
								"t": "Ponto BO do Baço",
								"s": "13.LR"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Bexiga urinária",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Vesícula biliar",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "LR",
								"NomeMeridiano": "Fígado",
								"valEnergetica": "P",
								"descrizione": ""
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "HIPCONDRIA",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ESTRESSE",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "MÃOS FRIAS ",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "CEFALEA",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "INSÔNIA",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANSIEDADE",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "BOCA SECA",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "SABOR AMARGO NA BOCA",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Pesadelos e pensamentos recorrentes",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "DOR AO URINAR",
								"score": 5
							}
						],
						"gallery": [
							{
								"idFile": "file_2674478724650",
								"Dida": ""
							},
							{
								"idFile": "file_2674478728149",
								"Dida": ""
							},
							{
								"idFile": "file_2674478731260",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1676934000,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692049984,
						"LabelCiclo": "Ciclo de Shiatsu - Ansiedade",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*13
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Quinto Tratamento de Ansiedade",
						"TestoTrattamento": "O destinatário relata não apenas se sentir melhor, mas também se sentir mudado por dentro. Ele adormece facilmente, e os pensamentos obsessivos se transformaram em uma lição de vida. O cansaço matinal quase desapareceu, e ele acorda com muito mais energia física e mental. Isso também em conjunto com a escolha de retomar o hábito perdido há muito tempo de fazer uma caminhada após o jantar. O estresse ainda está presente, mas ele afirma saber lidar melhor com ele e liberá-lo antes de voltar para casa. Fica acordado proceder com um tratamento de manutenção ÁGUA-MADEIRA junto com técnicas de alongamento.",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "KI",
								"NomeMeridiano": "Rim",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Vesícula biliar",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "LR",
								"NomeMeridiano": "Fígado",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "HIPCONDRIA",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ESTRESSE",
								"score": 5
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "MÃOS FRIAS ",
								"score": 1
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "CEFALEA",
								"score": 2
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "INSÔNIA",
								"score": 1
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANSIEDADE",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "BOCA SECA",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "SABOR AMARGO NA BOCA",
								"score": 2
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Pesadelos e pensamentos recorrentes",
								"score": 1
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "DOR AO URINAR",
								"score": 0
							}
						],
						"gallery": [
							{
								"idFile": "file_2674478724650",
								"Dida": ""
							},
							{
								"idFile": "file_2674478728149",
								"Dida": ""
							},
							{
								"idFile": "file_2674478731260",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1677452400,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692049984,
						"LabelCiclo": "Ciclo de Shiatsu - Ansiedade",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*14
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Guia para a sessão única",
						"TestoTrattamento": "Nesta seção, você tem a possibilidade de adicionar uma sessão única à pasta do seu paciente / destinatário.\nIsso permitirá que você mantenha um registro do tratamento tanto do ponto de vista clínico quanto econômico.\n\nVocê também pode adicionar uma prescrição, sintomas, pontos ou meridianos tratados.",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [],
						"gallery": [],
						"TimeTrattamento": 1674601200,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1693846663,
						"LabelCiclo": "",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*15
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Anamnese",
						"TestoTrattamento": "{\"AnamnesiMotivo\":\"QUESTIONÁRIO DE ANAMNESE (para fins demonstrativos)\\n\\nHá quanto tempo você vem enfrentando problemas de insônia? Cerca de 6 meses.\\nQuais são os principais sintomas da insônia que você está vivenciando? Dificuldade para adormecer à noite e despertares noturnos frequentes.\\nVocê notou fatores específicos que desencadeiam ou pioram sua insônia? Principalmente estresse relacionado ao trabalho e ansiedade.\\n\\nHistórico Médico Anterior:\\nVocê já teve algum problema de saúde mental ou distúrbios de humor? Nenhum diagnóstico prévio de distúrbios de humor. Teve episódios esporádicos de ansiedade.\\nVocê está tomando algum medicamento ou suplemento que possa afetar o seu sono? Atualmente, não está tomando nenhum medicamento.\\nVocê já passou por algum tratamento anterior para a insônia? Tentou técnicas de relaxamento e chás calmantes, mas sem sucesso duradouro.\\n\\nEstilo de Vida e Hábitos:\\nDescreva seu estilo de vida geral. Maria trabalha em tempo integral e frequentemente se sente estressada devido a prazos e responsabilidades no trabalho. Ela toma café de manhã e ocasionalmente uma xícara à tarde.\\nComo você lida com o estresse no dia a dia? Pratica yoga e meditação, mas ultimamente tem tido dificuldade para encontrar tempo.\\nQuais são seus hábitos antes de dormir? Frequentemente assiste TV ou usa o telefone pouco antes de ir para a cama.\\n\\nObjetivos do Tratamento:\\nQual é o principal objetivo que você deseja alcançar através da auriculoterapia para a insônia?\\nMaria deseja melhorar a qualidade do sono, reduzir a ansiedade e aprender técnicas para lidar com o estresse de forma mais eficaz.\\n\\nNotas Adicionais:\\nMaria está particularmente interessada em tratamentos naturais e deseja explorar a auriculoterapia como uma opção.\",\"AnamnesiDiagnosiOccidentale\":\"Diagnóstico na Medicina Ocidental: Distúrbio Primário do Sono\\n\\nExplicação:\\nO distúrbio primário do sono é uma condição em que o paciente tem dificuldade em iniciar ou manter o sono, apesar das oportunidades para fazê-lo. Isso pode ser causado por fatores como ansiedade, estresse, depressão, maus hábitos de sono, consumo excessivo de cafeína ou álcool, e distúrbios do ritmo circadiano.\\n\\nSintomas Associados:\\n\\nDificuldade para adormecer\\nDespertares noturnos frequentes\\nSensação de sono não restaurador ao acordar\\nFadiga durante o dia\\nIrritabilidade e dificuldade de concentração\\nTratamento na Medicina Ocidental:\\nO tratamento na medicina ocidental para o distúrbio do sono pode variar dependendo da causa subjacente. Pode incluir intervenções comportamentais, como a terapia cognitivo-comportamental para a insônia (CBT-I), que visa melhorar a higiene do sono e mudar hábitos prejudiciais. Em alguns casos, podem ser prescritos medicamentos hipnóticos a curto prazo para ajudar a estabilizar o sono.\\n\\nPlano de Tratamento:\\nUm plano de tratamento pode envolver uma combinação de terapias comportamentais, como CBT-I, controle do ambiente do sono, educação sobre a redução da ansiedade e do estresse, e adoção de estratégias de relaxamento. Em casos selecionados, o médico pode considerar a prescrição de medicamentos a curto prazo, mas com cuidado em relação a possíveis efeitos colaterais e dependência.\",\"AnamnesiDiagnosiMTC\":\"Estagnação de Qi e Sangue com Deficiência de Shen (Mente)\\n\\nExplicação:\\nNa perspectiva da MTC, a insônia pode ser vista como o resultado de um bloqueio da energia (Qi) e da circulação sanguínea, o que pode causar tensão e agitação. O \\\"Shen\\\", que representa o aspecto mental e espiritual, pode ser enfraquecido devido ao estresse e à ansiedade e pode afetar a capacidade de adormecer e manter um sono restaurador.\\n\\nSintomas Associados:\\n\\nDificuldade para adormecer\\nDespertares noturnos frequentes\\nInquietação e agitação mental\\nFadiga matinal\\nAnsiedade\\nTratamento na MTC:\\nO objetivo do tratamento na MTC seria restabelecer o fluxo harmonioso de Qi e Sangue, reduzir a tensão mental e fortalecer o Shen. Isso poderia ser alcançado através da auriculoterapia, uso de acupuntura e terapia herbal específica. A terapia visaria desbloquear a energia estagnada, promover o relaxamento e melhorar a qualidade do sono.\\n\\nPlano de Tratamento:\\nUm plano de tratamento pode incluir sessões regulares de auriculoterapia, tratamentos de acupuntura direcionados, aconselhamento sobre o manejo do estresse como meditação e relaxamento, bem como prescrições personalizadas de ervas chinesas para fortalecer o Qi, Sangue e Shen.\"}",
						"Prescrizione": "Auriculoterapia:\nPassar por sessões semanais de auriculoterapia por um total de 6-8 semanas. Durante essas sessões, os pontos auriculares relacionados ao relaxamento, sono e redução da ansiedade serão estimulados. O auriculoterapeuta avaliará a resposta do corpo e ajustará o tratamento conforme necessário.\n\nTerapia Cognitivo-Comportamental para a Insônia (TCC-I):\nParticipar de um programa de terapia cognitivo-comportamental para a insônia. Este programa inclui sessões semanais durante as primeiras 4-6 semanas, seguidas de sessões de acompanhamento a cada duas semanas. A TCC-I tem como objetivo melhorar a higiene do sono, abordar os pensamentos negativos relacionados ao sono e estabelecer uma rotina regular de sono-vigília.\n\nEstratégias de Gerenciamento do Estresse:\nPraticar técnicas de relaxamento, como meditação e respiração profunda, por pelo menos 10-15 minutos por dia, preferencialmente antes de dormir. Essas práticas podem ajudar a reduzir a ansiedade e preparar o corpo para o sono.\n\nRecomendações de Estilo de Vida:\n\nEvitar o consumo de cafeína e álcool à tarde e à noite.\nLimitar o uso de dispositivos eletrônicos antes de dormir.\nManter um ambiente de sono confortável, com iluminação suave e temperatura adequada.\nEvitar refeições pesadas logo antes de dormir.\nAcompanhamento:\nSerá agendado um acompanhamento após 8 semanas para avaliar a resposta ao tratamento e fazer os ajustes necessários. Por favor, mantenha um diário de sono e anote quaisquer melhorias ou mudanças.\n\nNotas Adicionais:\nSiga as instruções fornecidas pelo auriculoterapeuta e pelo terapeuta de TCC-I. Em caso de efeitos colaterais ou preocupações, entre em contato imediatamente com o médico.\"",
						"puntiMTC": [],
						"puntiAuricolari": [
							{
								"s": "003",
								"n": "Ápice do Pavilhão Auricular",
								"z": "",
								"e": "",
								"t": ""
							},
							{
								"s": "013",
								"n": "Ansiedade de Romoli",
								"z": "",
								"e": "",
								"t": ""
							},
							{
								"s": "230",
								"n": "Master Cerebral Point",
								"z": "",
								"e": "",
								"t": ""
							},
							{
								"s": "195",
								"n": "Epífise",
								"z": "",
								"e": "",
								"t": ""
							}
						],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Dificuldade em Adormecer",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Despertares Noturnos Frequentes",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Inquietação e Agitação Mental",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Cansaço ao Acordar",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANSIEDADE",
								"score": 10
							}
						],
						"gallery": [
							{
								"idFile": "file_1692134504542",
								"Dida": ""
							}
						],
						"TimeTrattamento": 0,
						"oraInizio": -1,
						"oraFine": -1,
						"DataModifica": 1692134508,
						"LabelCiclo": "Ciclo de Terapia Auricular para Insônia",
						"TipoTrattamento": "A",
						"CostoTrattamento": 0,
						"ordine": 2,
						"Cancellato": 0,
						"frv": true
					},
					{//*16
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Sessão 1: Avaliação inicial e relaxamento",
						"TestoTrattamento": "Duração: 45 minutos\n\nDurante a primeira sessão, o paciente é recebido e submetido a uma breve avaliação de seu histórico médico e dos sintomas relacionados à insônia. O auriculoterapeuta explica o processo de tratamento e coloca delicadamente pequenas agulhas ou sementes no mapa auricular correspondente aos pontos que podem influenciar o sono e o relaxamento. Em seguida, o paciente é deixado para relaxar por 20-30 minutos, durante os quais é incentivado a se concentrar na respiração profunda e a esvaziar a mente.",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [
							{
								"s": "045",
								"n": "Insônia 1",
								"z": "ago",
								"e": "D",
								"t": ""
							},
							{
								"s": "245",
								"n": "Insônia 2",
								"z": "ago",
								"e": "D",
								"t": ""
							}
						],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Dificuldade em Adormecer",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Despertares Noturnos Frequentes",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Inquietação e Agitação Mental",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Cansaço ao Acordar",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANSIEDADE",
								"score": 9
							}
						],
						"gallery": [],
						"TimeTrattamento": 1692050400,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692177913,
						"LabelCiclo": "Ciclo de Terapia Auricular para Insônia",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*17
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Sessão 2: Estimulação dos Pontos de Sono",
						"TestoTrattamento": "Na segunda sessão, o auriculoterapeuta examina o progresso do paciente desde a sessão anterior e procede com uma estimulação mais direcionada dos pontos auriculares relacionados ao sono. Agulhas ou sementes são colocadas com mais precisão, focando em pontos específicos associados à melhora da insônia. O paciente é novamente deixado para relaxar enquanto as agulhas fazem efeito.",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [
							{
								"s": "045",
								"n": "Insônia 1",
								"z": "ago",
								"e": "",
								"t": ""
							},
							{
								"s": "245",
								"n": "Insônia 2",
								"z": "ago",
								"e": "",
								"t": ""
							}
						],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Dificuldade em Adormecer",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Despertares Noturnos Frequentes",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Inquietação e Agitação Mental",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Cansaço ao Acordar",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANSIEDADE",
								"score": 9
							}
						],
						"gallery": [],
						"TimeTrattamento": 1692568800,
						"oraInizio": 132,
						"oraFine": 144,
						"DataModifica": 1692177897,
						"LabelCiclo": "Ciclo de Terapia Auricular para Insônia",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*18
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Sessão 3: Equilíbrio Energético",
						"TestoTrattamento": "Duração: 50 minutos\n\nNa terceira sessão, o auriculoterapeuta continua a ajustar a estimulação dos pontos auriculares, focando no equilíbrio energético do paciente. Também são considerados os fatores de estresse ou ansiedade que podem contribuir para a insônia. Durante esta sessão, o paciente também pode receber orientações sobre técnicas de gerenciamento do estresse e de relaxamento para aplicar em casa.",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [
							{
								"s": "045",
								"n": "Insônia 1",
								"z": "ago",
								"e": "D",
								"t": ""
							},
							{
								"s": "245",
								"n": "Insônia 2",
								"z": "ago",
								"e": "D",
								"t": ""
							},
							{
								"s": "000",
								"n": "Ponto Zero",
								"z": "seme_vaccaria",
								"e": "",
								"t": ""
							}
						],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Dificuldade em Adormecer",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Despertares Noturnos Frequentes",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Inquietação e Agitação Mental",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Cansaço ao Acordar",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANSIEDADE",
								"score": 7
							}
						],
						"gallery": [],
						"TimeTrattamento": 1692914400,
						"oraInizio": 126,
						"oraFine": 144,
						"DataModifica": 1692177857,
						"LabelCiclo": "Ciclo de Terapia Auricular para Insônia",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*19
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Sessão 4: Consolidação do progresso",
						"TestoTrattamento": "Duração: 45 minutos\n\nNa quarta sessão, o paciente e o auriculoterapeuta avaliam juntos os progressos até então obtidos. O paciente pode relatar uma melhoria na qualidade do sono, uma maior duração do sono ou uma menor frequência de despertares noturnos. O auriculoterapeuta adapta o tratamento com base nesses resultados e continua a estimular os pontos auriculares envolvidos na melhoria do sono.",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [
							{
								"s": "045",
								"n": "Insônia 1",
								"z": "ago",
								"e": "",
								"t": ""
							},
							{
								"s": "245",
								"n": "Insônia 2",
								"z": "ago",
								"e": "",
								"t": ""
							},
							{
								"s": "000",
								"n": "Ponto Zero",
								"z": "seme_vaccaria",
								"e": "",
								"t": ""
							}
						],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Dificuldade em Adormecer",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Despertares Noturnos Frequentes",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Inquietação e Agitação Mental",
								"score": 5
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Cansaço ao Acordar",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANSIEDADE",
								"score": 7
							}
						],
						"gallery": [],
						"TimeTrattamento": 1693432800,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692178254,
						"LabelCiclo": "Ciclo de Terapia Auricular para Insônia",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*20
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Sessão 5: Manutenção e conclusões",
						"TestoTrattamento": "Na última sessão do ciclo, a ênfase é dada à manutenção dos progressos alcançados. O auriculoterapeuta pode sugerir um plano de tratamento a longo prazo, que pode incluir visitas periódicas para manter os benefícios obtidos. O paciente é incentivado a continuar a praticar técnicas de relaxamento e a lidar com o estresse no dia a dia.",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [
							{
								"s": "045",
								"n": "Insônia 1",
								"z": "ago",
								"e": "",
								"t": ""
							},
							{
								"s": "245",
								"n": "Insônia 2",
								"z": "dito",
								"e": "",
								"t": ""
							},
							{
								"s": "000",
								"n": "Ponto Zero",
								"z": "seme_vaccaria",
								"e": "",
								"t": ""
							}
						],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Dificuldade em Adormecer",
								"score": 2
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Despertares Noturnos Frequentes",
								"score": 0
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Inquietação e Agitação Mental",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Cansaço ao Acordar",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANSIEDADE",
								"score": 5
							}
						],
						"gallery": [],
						"TimeTrattamento": 1693864800,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692178379,
						"LabelCiclo": "Ciclo de Terapia Auricular para Insônia",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					}
				],
				"saldi": [
					{
						"idSaldo": 0,
						"idPaziente": 0,
						"MotivoSaldo": "Tratamento de Acupuntura",
						"RicevutaSaldo": "2",
						"ValoreSaldo": 150,
						"DataSaldo": 1674860400,
						"DataModifica": 1691909111,
						"Cancellato": 0,
						"frv": true
					},
					{
						"idSaldo": 0,
						"idPaziente": 0,
						"MotivoSaldo": "Tratamento Shiatsu",
						"RicevutaSaldo": "1",
						"ValoreSaldo": 50,
						"DataSaldo": 1674428400,
						"DataModifica": 1691909111,
						"Cancellato": 0,
						"frv": true
					},
					{
						"idSaldo": 0,
						"idPaziente": 0,
						"MotivoSaldo": "Tratamento de Acupuntura, Antecipado",
						"RicevutaSaldo": "3",
						"ValoreSaldo": 150,
						"DataSaldo": 1675119600,
						"DataModifica": 1691909111,
						"Cancellato": 0,
						"frv": true
					},
					{
						"idSaldo": 0,
						"idPaziente": 0,
						"MotivoSaldo": "Tratamento de Equilíbrio",
						"RicevutaSaldo": "5",
						"ValoreSaldo": 150,
						"DataSaldo": 1692136800,
						"DataModifica": 1692183527,
						"Cancellato": 0,
						"frv": true
					}
				],
				"Cancellato": 0,
				"frv": true
			}
		],
		servizi: [
			{//*
				"idServizio": 0,
				"NomeServizio": "Ciclo de Auriculoterapia para parar de fumar",
				"DescrizioneServizio": "A acupuntura é eficaz para quebrar a dependência da nicotina.\n\nO tratamento é baseado em uma análise abrangente dos sintomas de abstinência e visa equilibrar as energias do corpo para melhorar a saúde.\n\nA acupuntura pode ajudar aqueles que desejam parar de fumar, reduzindo o desejo por cigarros, a ansiedade e a necessidade do ritual de fumar. O tratamento também pode levar a uma sensação de repulsa pelo sabor e cheiro do cigarro.\n\nSe o indivíduo estiver determinado a parar de fumar, os efeitos benéficos podem ser observados já na terceira ou quarta sessão.\n\nO protocolo clássico, desenvolvido por P. Nogier, dura de 15 a 20 minutos em uma única sessão e requer abstinência de pelo menos 6 horas antes do tratamento.\n",
				"CostoServizio": 150,
				"NumeroSedute": 5,
				"DataModifica": 1674490894,
				"DataCreazione": 1674490810,
				"Cancellato": 0,
				"frv": true
			},
			{//*
				"idServizio": 0,
				"NomeServizio": "Ciclo de Shiatsu para Ansiedade",
				"DescrizioneServizio": "A emotividade de cada pessoa é subjetiva e se manifesta de maneiras mais improváveis; uma baixa autoestima subjacente pode levar uma pessoa a acreditar que não é capaz de superar os desafios que a vida apresenta. Um estresse acentuado que mina nossa calma pode nos levar a entrar em colapso e é assim que a ansiedade, o medo, o famoso ataque de pânico aparecem. Como sintomas em fase aguda, pode-se ter taquicardia, respiração ofegante, medo com consequente liberação de adrenalina, uma sensação muito desagradável também porque as crises às vezes surgem repentinamente, sem aviso prévio, e aqueles que as sofrem vivem com medo de entrar na fase de 'Terror'.\n\nSe o estado de angústia é profundo, grave e permanente, ele requer a intervenção de um especialista.\n",
				"CostoServizio": 50,
				"NumeroSedute": 5,
				"DataModifica": 1674490934,
				"DataCreazione": 1674490895,
				"Cancellato": 0,
				"frv": true
			},
			{//*
				"idServizio": 0,
				"NomeServizio": "Ciclo de Acupuntura para Bruxismo",
				"DescrizioneServizio": "O bruxismo refere-se a uma condição na qual os dentes rangem e se esfregam, friccionando a arcada superior contra a inferior enquanto as mandíbulas estão cerradas com certa força.\n\nO bruxismo é uma condição bastante comum que depende da contração involuntária dos músculos mastigatórios.\n\nEle ocorre principalmente durante a noite e pode causar uma série de consequências: desgaste dos dentes, dor na mandíbula, dores de cabeça.",
				"CostoServizio": 100,
				"NumeroSedute": 5,
				"DataModifica": 1674491088,
				"DataCreazione": 1674490935,
				"Cancellato": 0,
				"frv": true
			},
			{//*
				"idServizio": 0,
				"NomeServizio": "Guia de Serviço",
				"DescrizioneServizio": "Nesta seção, você tem a possibilidade de pré-carregar os serviços que você oferece regularmente aos seus clientes/pacientes.\n\nAo adicionar o preço e o número de sessões do serviço, você agilizará o processo de inserção.\n\nPor exemplo, o pacote \"Anti-Tabagismo\", insônia, alergia, reequilíbrio do Qi....\nPreço por sessão: 150€\nNúmero de sessões: 5\n\n",
				"CostoServizio": 1,
				"NumeroSedute": 1,
				"DataModifica": 1674491592,
				"DataCreazione": 1674491089,
				"Cancellato": 0,
				"frv": true
			}
		],
		fornitori: [
			{
				"idFornitore": 0,
				"RagioneSociale": "Agulhas e Pontos",
				"Intestazione": "Agulhas e Pontos Srl\nvia Italia 96\nRoma",
				"PartitaIva": "0698765432",
				"CodiceFiscale": "ghagha84r16d200r",
				"Indirizzo": "via Italia 96",
				"CAP": "10000",
				"Citta": "Roma",
				"Provincia": "Roma",
				"Stato": "it",
				"Telefono": "06123456",
				"Email": "aghi@mail.com",
				"NoteFornitore": "Fornecedor de Agulhas para acupuntura.\nConsultor para pedidos Sr. Angelo Spinoso\nPedidos acima de 100 €, desconto de 20%",
				"etichette": [],
				"DataModifica": 1629780089,
				"DataCreazione": 1629779932,
				"Cancellato": 0,
				"frv": true
			},
			{
				"idFornitore": 0,
				"RagioneSociale": "Mobiliário para Consultórios Srl",
				"Intestazione": "Sr. Mobiliário para Consultórios Srl\nVia Milano 113\nMilão",
				"PartitaIva": "06987653245",
				"CodiceFiscale": "RRDMBL84R16D111A",
				"Indirizzo": "Via Milano 113",
				"CAP": "10000",
				"Citta": "Milano",
				"Provincia": "MI",
				"Stato": "it",
				"Telefono": "3486851418",
				"Email": "arredamentiambulatori@mail.com",
				"NoteFornitore": "Fornecedor de material em grosso para consultórios.\nContato do agente Sr. Rossi Mario\nFatura a 90 dias\nExcelentes preços e qualidade",
				"etichette": [
					{
						"idEtichetta": 0,
						"NomeEtichetta": "Facebook",
						"ValoreEtichetta": "@arredamentiambulatori",
						"sezione": "contatti"
					},
					{
						"idEtichetta": 0,
						"NomeEtichetta": "Instagram",
						"ValoreEtichetta": "@arreda_abulatori",
						"sezione": "contatti"
					}
				],
				"DataModifica": 1629780672,
				"DataCreazione": 1629780090,
				"Cancellato": 0,
				"frv": true
			}
		]
	},	
	deu: {
		pazienti: [
			{
				"idPaziente": 0,
				"Nome": "Cliente Demo",
				"Cognome": "IAOMAI",
				"Indirizzo": "Rathausstraße 15",
				"CAP": "10178",
				"Citta": "Berlin",
				"Provincia": "B",
				"Stato": "de",
				"Telefono": "",
				"Cellulare": "3486851418",
				"paeseCellulare": "de",
				"Email": "app@iaomai.app",
				"sesso": "m",
				"NotePaziente": "Er wurde am 23. Januar 20xx wegen eines anfänglichen Herzinfarkts aufgenommen.\nSemi-kyphotische Haltung.\nReist viel aus geschäftlichen Gründen, was oft zu akuten Stresszuständen führt.\nHypochondrische Tendenz.",
				"DataNascita": "1984-10-16",
				"LuogoNascita": "Berlin",
				"tags": [
					{
						"idTag": 0,
						"NomeTag": "1ª Shiatsu",
						"colore": "d7dafb"
					},
					{
						"idTag": 0,
						"NomeTag": "Akupunktur",
						"colore": "fbd7d7"
					},
					{
						"idTag": 0,
						"NomeTag": "Ohrakupunktur",
						"colore": "d7f5fb"
					}
				],
				"etichette": [
					{
						"idEtichetta": 0,
						"NomeEtichetta": "Ausgeübter Sport:",
						"ValoreEtichetta": "Nuoto",
						"sezione": "aggiuntive"
					},
					{
						"idEtichetta": 0,
						"NomeEtichetta": "Vorzugsweise kontaktieren:",
						"ValoreEtichetta": "Dopo le ore 17.",
						"sezione": "aggiuntive"
					},
					{
						"idEtichetta": 0,
						"NomeEtichetta": "Webseite",
						"ValoreEtichetta": "www.iaomai.app",
						"sezione": "contatti"
					},
					{
						"idEtichetta": 0,
						"NomeEtichetta": "Socialnetwork:",
						"ValoreEtichetta": "https://www.facebook.com/profile.php?id=100089849462315",
						"sezione": "contatti"
					}
				],
				"medicine": [
					{
						"idMedicina": 0,
						"NomeMedicina": "Ibuprofen"
					},
					{
						"idMedicina": 0,
						"NomeMedicina": "Ketoprofen"
					},
					{
						"idMedicina": 0,
						"NomeMedicina": "Naproxen"
					}
				],
				"allergie": [
					{
						"idAllergia": 0,
						"NomeAllergia": "Glutenintolerant"
					},
					{
						"idAllergia": 0,
						"NomeAllergia": "Nickelhaltige Lebensmittel"
					},
					{
						"idAllergia": 0,
						"NomeAllergia": "Katzenhaar"
					}
				],
				"patologie": [
					{
						"idPatologia": 0,
						"NomePatologia": "ANGST"
					},
					{
						"idPatologia": 0,
						"NomePatologia": "Protrusion L4-L5"
					},
					{
						"idPatologia": 0,
						"NomePatologia": "Hypertonie"
					},
					{
						"idPatologia": 0,
						"NomePatologia": "Rheumatoide Arthritis"
					},
					{
						"idPatologia": 0,
						"NomePatologia": "Allergie"
					},
					{
						"idPatologia": 0,
						"NomePatologia": "Bronchiales Asthma"
					}
				],
				"interventi": [
					{
						"idIntervento": 0,
						"NomeIntervento": "MENISKUS UND BÄNDER LINKS"
					},
					{
						"idIntervento": 0,
						"NomeIntervento": "ADDITIVE BRUSTVERGRÖßERUNG"
					},
					{
						"idIntervento": 0,
						"NomeIntervento": "In Erwartung der Operation eines Bandscheibenvorfalls L4-L5"
					}
				],
				"gallery": [
					{
						"idFile": "file_2674427029613",
						"Dida": ""
					},
					{
						"idFile": "file_2674427069354",
						"Dida": ""
					}
				],
				"Provenienza": "Mundpropaganda",
				"Professione": "Angestellte",
				"Intestazione": "",
				"CodiceFiscale": "",
				"PartitaIva": "",
				"Social": "Facebook",
				"avatar": "data:image/jpeg;base64,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",
				"Altezza": "175",
				"Peso": "65",
				"DataModifica": 1694960504,
				"trattamenti": [
					{//*1
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Shiatsu-Behandlung - Steifheit der unteren Gliedmaßen",
						"TestoTrattamento": "Bei der Ankunft in der Einrichtung wählt CLIENT DEMO eine Shiatsu-Behandlung, um Schmerzen in den unteren Gliedmaßen zu lindern.\n\nNach einem ersten Gespräch kommen viele interessante Aspekte der Persönlichkeit des KUNDEN zum Vorschein. \nWas mich am meisten beeindruckt, ist seine Schmerztoleranz. Die Schmerzschwelle liegt deutlich über dem Durchschnitt.\n\nDie teilweise Bewertung der Tendino-Muskulären Meridiane hebt hervor:\nLeer VU;\nLeer R;\nSchmerzhaftes VB am rechten Bein.\n\nDie Shu-Zonenbewertung zeigt:\nLeer P;\nVoll F;\nHarter Nierenbereich;\nSchmerzen auf VU.\n\n---------------\n\nNach der Behandlung fühlt sich CLIENT DEMO deutlich besser, sodass er keinen Bedarf für eine neue Behandlung verspürt. Wir bleiben für eventuelle Rückfälle in Kontakt.\n",
						"Prescrizione": "Möglichkeit der Arbeit für ein persönliches Verständnis des Körpers und seiner Dynamik im Sinne der TCM.",
						"puntiMTC": [
							{
								"n": 13,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Lungen Shu Punkt",
								"s": "13.BL"
							},
							{
								"n": 14,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Herz Master Shu Punkt",
								"s": "14.BL"
							},
							{
								"n": 15,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Herz Shu Punkt",
								"s": "15.BL"
							},
							{
								"n": 18,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Leber Shu Punkt",
								"s": "18.BL"
							},
							{
								"n": 19,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Gallenblasen Shu Punkt",
								"s": "19.BL"
							},
							{
								"n": 20,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Milz Shu Punkt",
								"s": "20.BL"
							},
							{
								"n": 21,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Magen Shu Punkt",
								"s": "21.BL"
							},
							{
								"n": 22,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Dreifacher Erwärmer Shu Punkt",
								"s": "22.BL"
							},
							{
								"n": 23,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Nieren Shu Punkt",
								"s": "23.BL"
							},
							{
								"n": 25,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Dickdarm Shu Punkt",
								"s": "25.BL"
							},
							{
								"n": 27,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Dünndarm Shu Punkt",
								"s": "27.BL"
							},
							{
								"n": 28,
								"m": "BL",
								"e": "",
								"z": "",
								"t": "Blasen Shu Punkt",
								"s": "28.BL"
							},
							{
								"n": 1,
								"m": "LU",
								"e": "",
								"z": "",
								"t": "Lungen BO Punkt",
								"s": "1.LU"
							},
							{
								"n": 17,
								"m": "CV",
								"e": "",
								"z": "",
								"t": "Herz Master BO Punkt",
								"s": "17.CV"
							},
							{
								"n": 14,
								"m": "LR",
								"e": "",
								"z": "",
								"t": "Leber BO Punkt",
								"s": "14.LR"
							},
							{
								"n": 24,
								"m": "GB",
								"e": "D",
								"z": "",
								"t": "Gallenblasen BO Punkt",
								"s": "24.GB"
							},
							{
								"n": 14,
								"m": "CV",
								"e": "",
								"z": "",
								"t": "Herz BO Punkt",
								"s": "14.CV"
							},
							{
								"n": 12,
								"m": "CV",
								"e": "",
								"z": "",
								"t": "Magen BO Punkt",
								"s": "12.CV"
							},
							{
								"n": 13,
								"m": "LR",
								"e": "P",
								"z": "",
								"t": "Milz BO Punkt",
								"s": "13.LR"
							},
							{
								"n": 25,
								"m": "GB",
								"e": "",
								"z": "",
								"t": "Nieren BO Punkt",
								"s": "25.GB"
							},
							{
								"n": 25,
								"m": "ST",
								"e": "P",
								"z": "",
								"t": "MEHR HYPERAKTIVER PUNKT RECHTS",
								"s": "25.ST"
							},
							{
								"n": 5,
								"m": "CV",
								"e": "V",
								"z": "",
								"t": "Dreifacher Erwärmer BO Punkt",
								"s": "5.CV"
							},
							{
								"n": 4,
								"m": "CV",
								"e": "",
								"z": "",
								"t": "Dünndarm BO Punkt",
								"s": "4.CV"
							},
							{
								"n": 3,
								"m": "CV",
								"e": "V",
								"z": "",
								"t": "Blasen BO Punkt",
								"s": "3.CV"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "KI",
								"NomeMeridiano": "Niere",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Gallenblase",
								"valEnergetica": "D"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "UNTERE GLIEDERSTEIFHEIT",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "KALTE HÄNDE ",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "STRESS",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "HYPOCHONDRIE",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "KOPFSCHMERZ",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "SCHLAFQUALITÄT",
								"score": 4
							}
						],
						"gallery": [
							{
								"idFile": "file_2674467779004",
								"Dida": ""
							},
							{
								"idFile": "file_2674467791995",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1672527600,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1691909111,
						"LabelCiclo": "",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*2
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Anamnese",
						"TestoTrattamento": "{\"AnamnesiMotivo\": \"Der Client Demo Iaomai kommt zu mir, um eine Reihe von Shiatsu-Behandlungen zu beginnen, um eine Reihe von mit jahrelangen Ängsten verbundenen Störungen zu lösen.\\n\\nEr klagt seit einiger Zeit über Einschlafprobleme und wacht morgens sehr müde auf.\\nDie Symptome verschlimmern sich im Verhältnis zum arbeitsbedingten Stress.\\nSchwitzen, wiederkehrende und zwanghafte Gedanken und Grübeleien treten oft nachts auf.\\n\\nWährend des Tages manifestiert sich die Ansammlung von Stress somatisch im unteren Rückenbereich, insbesondere auf Nierenhöhe.\\nSeit einigen Wochen ist der Urin knapp und dunkel, er klagt über Mundtrockenheit und ein Gefühl der Kopfschwere; gelegentlich treten leichte Ohrgeräusche auf.\\n\\nDer bittere Geschmack im Mund tritt wiederholt auf\\n\",\"AnamnesiDiagnosiOccidentale\": \"Der emotionale Zustand eines jeden Menschen ist subjektiv und zeigt sich auf die unwahrscheinlichsten Arten, ein grundlegendes Selbstwertgefühl kann einen Menschen glauben machen, dass er die Prüfungen, die das Leben uns stellt, nicht bewältigen kann. Ausgeprägter Stress, der unsere Ruhe beeinträchtigt, kann uns in ein \\\"Tilt\\\" bringen, und hier kommen Angst, Furcht, der berühmte Panikanfall. Als Symptom in der akuten Phase können Tachykardie, erschwertes Atmen, Angst mit anschließendem Adrenalinschub auftreten, eine sehr unangenehme Empfindung auch, weil die Krisen manchmal plötzlich, ohne Vorwarnung kommen und die Betroffenen in Angst leben, in die \\\"Terror\\\"-Phase zu geraten.\\nWenn der Zustand der Angst tiefgreifend, schwerwiegend und dauerhaft ist, ist der Eingriff eines Fachmanns erforderlich.\",\"AnamnesiDiagnosiMTC\": \"T.C.M.\\nAngst, Furcht, Angst und Hyperemotivität gelten als ein Übermaß an Qi in den Meridianen des Herzens und des Meisters des Herzens, das den Tonus des Herzplexus regulieren muss.\\nWenn die Pathologie chronisch ist, kann sie auch mit anderen Meridianen in Verbindung stehen.\\n\\n\"}",
						"Prescrizione": "Therapie\nDas Qi in den Meridianen des Herzens und des Meisters des Herzens verteilen und regulieren,\nDie Kommunikation zwischen Herz und Niere wiederherstellen - Shao Yin Energetisches Niveau -\nDen Shen beruhigen",
						"puntiMTC": [
							{
								"n": "03",
								"m": "KI",
								"e": "V",
								"z": "",
								"t": "",
								"s": "3.KI"
							},
							{
								"n": "36",
								"m": "ST",
								"e": "P",
								"z": "",
								"t": "am rechten Bein interaktiver als am linken Bein. ",
								"s": "36.ST"
							},
							{
								"n": "04",
								"m": "LI",
								"e": "D",
								"z": "coppetta",
								"t": "",
								"s": "04.LI"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "KI",
								"NomeMeridiano": "Niere",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "ST",
								"NomeMeridiano": "Magen",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Harnblase",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Gallenblase",
								"valEnergetica": "V"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "HYPOCHONDRIE",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "STRESS",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "KALTE HÄNDE ",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "KOPFSCHMERZ",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "SCHLAFLOSIGKEIT",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANGST",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "TROCKENER MUND",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "BITTERER GESCHMACK IM MUND",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "WIEDERKEHRENDE ALBTRÄUME UND GEDANKEN",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "SCHMERZ BEIM WASSERLASSEN",
								"score": 7
							}
						],
						"gallery": [
							{
								"idFile": "file_2674478724650",
								"Dida": ""
							},
							{
								"idFile": "file_2674478728149",
								"Dida": ""
							},
							{
								"idFile": "file_2674478731260",
								"Dida": ""
							}
						],
						"TimeTrattamento": 0,
						"oraInizio": -1,
						"oraFine": -1,
						"DataModifica": 1694960504,
						"LabelCiclo": "Shiatsu-Zyklus - Angst ",
						"TipoTrattamento": "A",
						"CostoTrattamento": 0,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*3
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Anamnese",
						"TestoTrattamento": "{\"AnamnesiMotivo\":\"Krankengeschichte:\\n\\n-Aktuelle Symptome:\\n\\nDer Patient berichtete über Symptome einer Lumbalgie, einschließlich stechender Schmerzen im Lendenbereich und Kribbeln entlang des rechten Beins.\\nDie Symptome begannen vor etwa 6 Wochen.\\n\\n-Auslösende Ereignisse:\\n\\nDer Patient gab an, unsachgemäß schwere Gegenstände gehoben zu haben, was möglicherweise die Symptome verursacht hat.\\n\\n-Medizinische Vorgeschichte:\\n\\nDer Patient berichtete von bestehenden Wirbelsäulenproblemen wie einem leichten Bandscheibenvorfall im Lendenbereich.\\nEr erhielt in der Vergangenheit chiropraktische Behandlungen zur Symptomkontrolle.\\n\\n-Medikamente und Nahrungsergänzungsmittel:\\n\\nDer Patient nimmt derzeit Ibuprofen zur Schmerzlinderung ein.\\n\\n-Chirurgische Vorgeschichte:\\n\\nDer Patient unterzog sich in der Vergangenheit keiner Operation am Rücken oder im Lendenbereich.\\n\\n-Allergien und Unverträglichkeiten:\\n\\nDer Patient gab an, allergisch gegen Penicillin zu sein.\\n\\n>Lebensstil und Risikofaktoren:\\n\\n-Körperliche Aktivität:\\n\\nDer Patient beschrieb sein Aktivitätsniveau als moderat mit regelmäßigen Spaziergängen.\\n\\n-Haltung und tägliche Gewohnheiten:\\n\\nDer Patient arbeitet hauptsächlich am Computer und ist sich bewusst, dass seine Haltung während der Arbeit nicht optimal ist.\\n\\n-Stress und psychologische Faktoren:\\n\\nDer Patient erwähnte Stresslevel, die mit der Arbeit verbunden sind und sich auf die Lumbalgie auswirken könnten.\\n\\n-Behandlungsziele:\\n\\nDer Patient äußerte den Wunsch, die Schmerzen im Lendenbereich zu reduzieren und die Mobilität zu verbessern.\\n\\n-Zusätzliche Anmerkungen:\\n\\nWährend der Konsultation betonte der Patient die Bedeutung, eine Behandlung zu finden, die im Vergleich zur langfristigen Einnahme von Medikamenten einen natürlicheren Ansatz hat.\\n\",\"AnamnesiDiagnosiOccidentale\":\"Der Kunde DEMO IAOMAI hat eine Lumbalgie, die sich durch Schmerzen im Lendenbereich und Kribbeln entlang des Verlaufs des Ischiasnervs auszeichnet. Der Zustand scheint mit einer möglichen Reizung des Ischiasnervs verbunden zu sein, die wahrscheinlich durch unsachgemäßes Heben ausgelöst und durch das Vorhandensein eines Bandscheibenvorfalls im Lendenbereich verschlimmert wurde.\",\"AnamnesiDiagnosiMTC\":\"Basierend auf der Analyse der Symptome und Risikofaktoren könnte die Lumbalgie des Kunden DEMO IAOMAI nach den Prinzipien der Traditionellen Chinesischen Medizin mit einer 'Blockade von Qi und Blut im Lendenbereich' verbunden sein. Die Ansammlung von Stress, die falsche Haltung und das unsachgemäße Heben könnten zu diesem Zustand beigetragen haben und den harmonischen Fluss von Qi und Blut entlang der Meridiane im Lendenbereich behindern.\\n\\nAus Sicht der TCM wird das Ziel der Behandlung sein, das Hindernis zu beseitigen, den Fluss von Qi und Blut zu fördern und das energetische Gleichgewicht in den beteiligten Meridianen wiederherzustellen.\\n\"}",
						"Prescrizione": "• Es zeigt sich eine Stagnation im Gallenblasenmeridian, weil es das Qi in Bewegung bringt und der Shaoyang-Level ist, der die Bewegung von sowohl Yang als auch Yin ermöglicht. \n• Moxa auf 25VB, Ren Mu Punkt, der die Geburt des Yang ermöglicht. \n• Moxa auf 31VB, Windpunkt, der für die Stagnation angezeigt ist. \n• 34VB, Muskeltreffpunkt, laut Leung KwokPo behandelt den Muskel, der in der Lage ist, 'Bewegung' zu induzieren. \n• Wichtige Punkte, die das Blut im Gallenblasenmeridian mobilisieren 17BL, 40BL, 32 BL und 53BL \n• LV3, Erde Shu Punkt und Yuan, der das Blut bewegt. \n• Yao fa zur Mobilisierung der Lendenwirbelsäule.",
						"puntiMTC": [
							{
								"n": 31,
								"m": "GB",
								"e": "D",
								"z": "",
								"t": "Empfindlich bei Berührung",
								"s": "31.GB"
							},
							{
								"n": 25,
								"m": "KI",
								"e": "D",
								"z": "",
								"t": "Empfindlich bei Berührung",
								"s": "25.KI"
							},
							{
								"n": 21,
								"m": "GB",
								"e": "P",
								"z": "",
								"t": "",
								"s": "21.GB.."
							},
							{
								"n": 30,
								"m": "GB",
								"e": "P",
								"z": "",
								"t": "",
								"s": "30.GB.."
							},
							{
								"n": 34,
								"m": "GB",
								"e": "D",
								"z": "",
								"t": "Empfindlich bei Berührung",
								"s": "34.GB"
							},
							{
								"n": 43,
								"m": "GB",
								"e": "D",
								"z": "",
								"t": "Empfindlich bei Berührung",
								"s": "43.GB"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Gallenblase",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "KI",
								"NomeMeridiano": "Niere",
								"valEnergetica": "D"
							},
							{
								"siglaMeridiano": "ST",
								"NomeMeridiano": "Magen",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Rückenschmerzen",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Kribbeln und Taubheit",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Muskelschwäche",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Verschlimmerung bei Bewegung",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Bewegungseinschränkung",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Schmerzen während der Sitzung",
								"score": 8
							}
						],
						"gallery": [
							{
								"idFile": "file_2674469901174",
								"Dida": ""
							},
							{
								"idFile": "file_2674469904750",
								"Dida": ""
							},
							{
								"idFile": "file_2674469909751",
								"Dida": ""
							}
						],
						"TimeTrattamento": 0,
						"oraInizio": -1,
						"oraFine": -1,
						"DataModifica": 1692183228,
						"LabelCiclo": "Ciclo de Acupuntura para a Ciática",
						"TipoTrattamento": "A",
						"CostoTrattamento": 0,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*4
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Sitzung 1: Erstbewertung und Entspannung",
						"TestoTrattamento": "Dauer: 45 Minuten\n\nWährend der ersten Sitzung wird der Patient begrüßt und einer ausführlichen Bewertung seiner Krankengeschichte und der mit Ischias verbundenen Symptome unterzogen. Der Akupunkteur erläutert den Behandlungsprozess und identifiziert wichtige Akupunkturpunkte, die behandelt werden sollen. Der Akupunkteur setzt feine Nadeln an bestimmten Punkten entlang der mit Ischias verbundenen Meridiane ein. Der Patient wird dann etwa 20-30 Minuten lang zum Entspannen gelassen.",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 23,
								"m": "BL",
								"e": "D",
								"z": "ago",
								"t": "Nieren-Shu-Punkt",
								"s": "23.BL"
							},
							{
								"n": 32,
								"m": "BL",
								"e": "P",
								"z": "ago",
								"t": "",
								"s": "32.BL"
							},
							{
								"n": 8,
								"m": "BL",
								"e": "D",
								"z": "ago",
								"t": "",
								"s": "8.BL"
							},
							{
								"n": 30,
								"m": "BL",
								"e": "P",
								"z": "ago",
								"t": "",
								"s": "30.BL"
							},
							{
								"n": 4,
								"m": "CV",
								"e": "V",
								"z": "ago",
								"t": "Dünndarm-BO-Punkt",
								"s": "4.CV"
							},
							{
								"n": 4,
								"m": "SP",
								"e": "V",
								"z": "ago",
								"t": "",
								"s": "4.SP"
							},
							{
								"n": 31,
								"m": "GB",
								"e": "D",
								"z": "ago",
								"t": "",
								"s": "31.GB"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Harnblase",
								"valEnergetica": "D",
								"descrizione": "Empfindlich bei Berührung"
							},
							{
								"siglaMeridiano": "KI",
								"NomeMeridiano": "Niere",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Gallenblase",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Rückenschmerzen",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Kribbeln und Taubheit",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Muskelschwäche",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Verschlimmerung mit Bewegung",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Bewegungseinschränkung",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Schmerzen während der Sitzung",
								"score": 10
							}
						],
						"gallery": [
							{
								"idFile": "file_2674427029613",
								"Dida": ""
							},
							{
								"idFile": "file_2674427069354",
								"Dida": ""
							},
							{
								"idFile": "file_2674469909751",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1674428400,
						"oraInizio": 132,
						"oraFine": 144,
						"DataModifica": 1692183278,
						"LabelCiclo": "Akupunkturzyklus für Ischias",
						"TipoTrattamento": "B",
						"CostoTrattamento": 150,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*5
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Sitzung 2: Reduzierung von Entzündungen und Schmerzen",
						"TestoTrattamento": "Dauer: 40 Minuten\n\nIn der zweiten Sitzung bewertet der Akupunkteur den Fortschritt des Patienten seit der vorherigen Sitzung und konzentriert sich auf die Reduzierung von Entzündungen und Schmerzen, die mit Ischias verbunden sind. Die Nadeln werden so platziert, dass sie Punkte stimulieren, die zur Linderung von Entzündungen des Ischiasnervs und damit verbundenen Schmerzen beitragen können. Der Patient wird erneut entspannt, während die Nadeln ihre Wirkung entfalten.",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 23,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "Nieren-Shu-Punkt",
								"s": "23.BL"
							},
							{
								"n": 32,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "32.BL"
							},
							{
								"n": 8,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "8.BL"
							},
							{
								"n": 30,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "30.BL"
							},
							{
								"n": 4,
								"m": "CV",
								"e": "",
								"z": "ago",
								"t": "Dünndarm-BO-Punkt",
								"s": "4.CV"
							},
							{
								"n": 4,
								"m": "SP",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "4.SP"
							},
							{
								"n": 31,
								"m": "GB",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "31.GB"
							},
							{
								"n": 12,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "12.BL"
							},
							{
								"n": 40,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "40.BL"
							},
							{
								"n": 60,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "60.BL"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Harnblase",
								"valEnergetica": "D"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Gallenblase",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "ST",
								"NomeMeridiano": "Magen",
								"valEnergetica": "P",
								"descrizione": "Handflächenbehandlung gegen zwanghafte Gedanken"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Rückenschmerzen",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Kribbeln und Taubheit",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Muskelschwäche",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Verschlimmerung mit Bewegung",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Bewegungseinschränkung",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Schmerzen während der Sitzung",
								"score": 9
							}
						],
						"gallery": [
							{
								"idFile": "file_2674467779004",
								"Dida": ""
							},
							{
								"idFile": "file_2674469909751",
								"Dida": ""
							},
							{
								"idFile": "file_2674475331170",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1675033200,
						"oraInizio": 132,
						"oraFine": 144,
						"DataModifica": 1692183307,
						"LabelCiclo": "Akupunkturzyklus für Ischias",
						"TipoTrattamento": "B",
						"CostoTrattamento": 150,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*6
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Sitzung 3: Verbesserung der Durchblutung und des Energieflusses",
						"TestoTrattamento": "Dauer: 50 Minuten\n\nIn der dritten Sitzung arbeitet der Akupunkteur weiterhin an der Schmerz- und Entzündungsreduktion, konzentriert sich jedoch auch auf die Verbesserung der Blutzirkulation und des Energieflusses im betroffenen Bereich. Nadeln werden platziert, um den Energiefluss entlang der Meridiane zu stimulieren, die mit dem unteren Rücken und dem Ischiasbereich verbunden sind.",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 8,
								"m": "GB",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "8.GB"
							},
							{
								"n": 20,
								"m": "GB",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "20.GB"
							},
							{
								"n": 22,
								"m": "GV",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "22.GV"
							},
							{
								"n": 10,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "10.BL"
							},
							{
								"n": 30,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "30.BL"
							},
							{
								"n": 23,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "Nieren-Shu-Punkt",
								"s": "23.BL"
							},
							{
								"n": 32,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "32.BL"
							},
							{
								"n": 4,
								"m": "SP",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "4.SP"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Harnblase",
								"valEnergetica": "D"
							},
							{
								"siglaMeridiano": "ST",
								"NomeMeridiano": "Magen",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Rückenschmerzen",
								"score": 5
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Kribbeln und Taubheit",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Muskelschwäche",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Verschlimmerung mit Bewegung",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Bewegungseinschränkung",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Schmerzen während der Sitzung",
								"score": 7
							}
						],
						"gallery": [
							{
								"idFile": "file_2674469904750",
								"Dida": ""
							},
							{
								"idFile": "file_2674475331170",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1675638000,
						"oraInizio": 132,
						"oraFine": 144,
						"DataModifica": 1692183339,
						"LabelCiclo": "Akupunkturzyklus für Ischias",
						"TipoTrattamento": "B",
						"CostoTrattamento": 150,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*7
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Dauer: 45 Minuten\n\nIn der vierten Sitzung bewertet der Akupunkteur die Haltung und Muskeln des Patienten und versucht, etwaige Ungleichgewichte zu identifizieren, die zur Lumbosciatalgia beitragen können. Nadeln werden an Stellen eingeführt, die dazu beitragen, die Muskeln auszugleichen und die Haltung zu verbessern. Der Patient kann auch Ratschläge zu Dehnungs- oder Kräftigungsübungen für zu Hause erhalten.",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 20,
								"m": "GV",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "20.GV"
							},
							{
								"n": 7,
								"m": "HT",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "7.HT"
							},
							{
								"n": 20,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "Milz Shu Punkt",
								"s": "20.BL"
							},
							{
								"n": 40,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "40.BL"
							},
							{
								"n": 60,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "60.BL"
							},
							{
								"n": 37,
								"m": "BL",
								"e": "",
								"z": "coppetta",
								"t": "",
								"s": "37.BL"
							},
							{
								"n": 38,
								"m": "BL",
								"e": "",
								"z": "coppetta",
								"t": "",
								"s": "38.BL"
							},
							{
								"n": 41,
								"m": "BL",
								"e": "",
								"z": "coppetta",
								"t": "",
								"s": "41.BL"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Harnblase",
								"valEnergetica": "D"
							},
							{
								"siglaMeridiano": "ST",
								"NomeMeridiano": "Magen",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "CV",
								"NomeMeridiano": "Konzeptionsgefäß",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Rückenschmerzen",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Kribbeln und Taubheit",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Muskelschwäche",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Verschlimmerung mit Bewegung",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Bewegungseinschränkung",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Schmerzen während der Sitzung",
								"score": 3
							}
						],
						"gallery": [
							{
								"idFile": "file_2674427069354",
								"Dida": ""
							},
							{
								"idFile": "file_2674469901174",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1676242800,
						"oraInizio": 132,
						"oraFine": 144,
						"DataModifica": 1692183366,
						"LabelCiclo": "Akupunkturzyklus für Ischias",
						"TipoTrattamento": "B",
						"CostoTrattamento": 150,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*8
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Sitzung 5: Wartung und zukünftige Planung",
						"TestoTrattamento": "Dauer: 40 Minuten\n\nIn der letzten Sitzung des Zyklus bespricht der Akupunkteur mit dem Patienten den während der Behandlung erzielten Fortschritt. Der Fokus liegt auf der Aufrechterhaltung der Ergebnisse und es kann ein Langzeitbehandlungsplan vorgeschlagen werden, mit regelmäßigen Besuchen zur Behandlung der lumbosciatalgie-Symptome im Laufe der Zeit. Der Patient wird ermutigt, weiterhin Ratschläge zur Haltung, Übungen und gesunden Gewohnheiten zu befolgen.",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 23,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "Nieren-Shu-Punkt",
								"s": "23.BL"
							},
							{
								"n": 32,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "32.BL"
							},
							{
								"n": 30,
								"m": "BL",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "30.BL"
							},
							{
								"n": 31,
								"m": "GB",
								"e": "",
								"z": "ago",
								"t": "",
								"s": "31.GB"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Harnblase",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Gallenblase",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "ST",
								"NomeMeridiano": "Magen",
								"valEnergetica": "D"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Rückenschmerzen",
								"score": 2
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Kribbeln und Taubheit",
								"score": 1
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Muskelschwäche",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Verschlimmerung mit Bewegung",
								"score": 2
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Bewegungseinschränkung",
								"score": 5
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Schmerzen während der Sitzung",
								"score": 3
							}
						],
						"gallery": [
							{
								"idFile": "file_2674475391556",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1676847600,
						"oraInizio": 132,
						"oraFine": 144,
						"DataModifica": 1692183387,
						"LabelCiclo": "Akupunkturzyklus für Ischias",
						"TipoTrattamento": "B",
						"CostoTrattamento": 150,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*9
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Erstbehandlung von Angstzuständen",
						"TestoTrattamento": "Der Patient wirkt nervös und misstrauisch.\nHat seit zwei Nächten nicht geschlafen und ist sehr besorgt über die Folgen der COVID-19-Pandemie.\n\nShiatsu-Druck auf dem Blasenmeridian von 11BL bis 28BL, tonisierende Punkte 15BL und 20BL, jeweils Herz- und Milz-Shu-Punkte.\n\n- Shiatsu-Druck auf dem gesamten Milzmeridian, mit Pausen an den Punkten 6SP und 10SP, dann entlang des gesamten Meridians bis zur Brust fortsetzen.\n\n- Shiatsu-Druck auf dem gesamten Herzmeridian, mit Pausen am Punkt 7HT und Fortsetzung bis zum Punkt 9HT.\n\n- Shiatsu-Druck auf dem Perikardmeridian.",
						"Prescrizione": "Shiatsu-Druck auf dem Blasenmeridian von 11BL bis 28BL, tonisierende Punkte 15BL und 20BL, jeweils Herz- und Milz-Shu-Punkte.\n\n- Shiatsu-Druck auf dem gesamten Milzmeridian, mit Pausen an den Punkten 6SP und 10SP, dann entlang des gesamten Meridians bis zur Brust fortsetzen.\n\n- Shiatsu-Druck auf dem gesamten Herzmeridian, mit Pausen am Punkt 7HT und Fortsetzung bis zum Punkt 9HT.\n\n- Shiatsu-Druck auf dem Perikardmeridian.",
						"puntiMTC": [
							{
								"n": 7,
								"m": "HT",
								"e": "",
								"z": "dito",
								"t": "",
								"s": "7.HT"
							},
							{
								"n": 6,
								"m": "PC",
								"e": "",
								"z": "dito",
								"t": "",
								"s": "6.PC"
							},
							{
								"n": 7,
								"m": "PC",
								"e": "",
								"z": "dito",
								"t": "",
								"s": "7.PC"
							},
							{
								"n": 20,
								"m": "GV",
								"e": "",
								"z": "coppetta",
								"t": "",
								"s": "20.GV"
							},
							{
								"n": 1,
								"m": "SP",
								"e": "",
								"z": "dito",
								"t": "",
								"s": "1.SP"
							},
							{
								"n": 11,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "11.BL"
							},
							{
								"n": 28,
								"m": "BL",
								"e": "",
								"z": "moxa",
								"t": "Milz Shu Punkt",
								"s": "28.BL"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Harnblase",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "SP",
								"NomeMeridiano": "Milz",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "HT",
								"NomeMeridiano": "Herz",
								"valEnergetica": "V"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "HYPOCHONDRIE",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "STRESS",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "KALTE HÄNDE ",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "KOPFSCHMERZ",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "SCHLAFLOSIGKEIT",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANGST",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "TROCKENER MUND",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "BITTERER GESCHMACK IM MUND",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "WIEDERKEHRENDE ALBTRÄUME UND GEDANKEN",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "SCHMERZ BEIM WASSERLASSEN",
								"score": 6
							}
						],
						"gallery": [
							{
								"idFile": "file_2674478724650",
								"Dida": ""
							},
							{
								"idFile": "file_2674478728149",
								"Dida": ""
							},
							{
								"idFile": "file_2674478731260",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1674514800,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692049984,
						"LabelCiclo": "Shiatsu-Zyklus - Angst",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*10
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Zweite Behandlung von Angstzuständen",
						"TestoTrattamento": "Der Kunde berichtet von einer emotionalen Veränderung im Vergleich zur Vorwoche, jedoch bleiben die in der Anamnese angegebenen Symptome bestehen. Er klagt über lästige und häufige nächtliche Herzschlag, die von Alpträumen und obsessiven Gedanken begleitet werden.\n\nIch beschließe auch, Dehnungs- und Qi-Ausgleichstechniken einzubeziehen.\n\nBehandlung:\nShiatsu-Palpation am Blasenmeridian von 11BL bis 28BL, tonisierend die Punkte 15BL und 20BL, jeweils Herz- und Milz-Shu-Punkte.\n\nShiatsu-Druck auf dem gesamten Nierenmeridian, Halt an 1KI und 3KI.\n\nShiatsu-Druck auf dem gesamten Herz- und Herzbeutelmeridian, Halt an 8PC.\n\nAuch der Dickdarmmeridian für die Mittags-Mitternachts-Regulierung und die Tonisierung der Jin-Flüssigkeiten wurde behandelt.",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 7,
								"m": "HT",
								"e": "P",
								"z": "dito",
								"t": "",
								"s": "7.HT"
							},
							{
								"n": 6,
								"m": "PC",
								"e": "D",
								"z": "dito",
								"t": "",
								"s": "6.PC"
							},
							{
								"n": 7,
								"m": "PC",
								"e": "D",
								"z": "dito",
								"t": "",
								"s": "7.PC"
							},
							{
								"n": 20,
								"m": "GV",
								"e": "V",
								"z": "moxa",
								"t": "",
								"s": "20.GV"
							},
							{
								"n": 6,
								"m": "SP",
								"e": "V",
								"z": "moxa",
								"t": "",
								"s": "6.SP"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Harnblase",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "SP",
								"NomeMeridiano": "Milza-pancreas",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "HT",
								"NomeMeridiano": "Cuore",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "HYPOCHONDRIE",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "STRESS",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "KALTE HÄNDE ",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "KOPFSCHMERZ",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "SCHLAFLOSIGKEIT",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANGST",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "TROCKENER MUND",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "BITTERER GESCHMACK IM MUND",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "WIEDERKEHRENDE ALBTRÄUME UND GEDANKEN",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "SCHMERZ BEIM WASSERLASSEN",
								"score": 4
							}
						],
						"gallery": [
							{
								"idFile": "file_2674478724650",
								"Dida": ""
							},
							{
								"idFile": "file_2674478728149",
								"Dida": ""
							},
							{
								"idFile": "file_2674478731260",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1675119600,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692049984,
						"LabelCiclo": "Shiatsu-Zyklus - Angst",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*11
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Dritte Angstbehandlung",
						"TestoTrattamento": "Der Demo-Kunde Iaomai berichtet von wesentlichen Verbesserungen. Er kann jetzt friedlich einschlafen und wacht nachts nicht mehr auf. Die Träume haben sich deutlich verringert, und der Schlaf ist ruhig und erholsam. Die Schmerzen im unteren Rücken sind verschwunden. Auch die anderen Symptome haben sich verbessert.",
						"Prescrizione": "Behandlung:\n\nFeuerleitbahnen der Leber und Gallenblase zerstreuen und die entsprechenden Organe stärken. Shiatsu-Druck auf dem Blasenmeridian von 11BL bis 28BL, Halt an 18BL und 19BL als die Shu-Punkte der Leber und Gallenblase.\n\nShiatsu-Druck entlang des gesamten Gallenblasenmeridians, Halt an GB20 und GB21.\nShiatsu-Druck auf dem gesamten Lebermeridian. Auch der Herzmeridian wurde zur Mittags-Mitternacht-Regulierung behandelt.",
						"puntiMTC": [
							{
								"n": 11,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "",
								"s": "11.BL"
							},
							{
								"n": 18,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "Leber Shu Punkt",
								"s": "18.BL"
							},
							{
								"n": 19,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "Gallenblasen Shu Punkt",
								"s": "19.BL"
							},
							{
								"n": 28,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "Blasen Shu Punkt",
								"s": "28.BL"
							},
							{
								"n": 20,
								"m": "GB",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "20.GB"
							},
							{
								"n": 21,
								"m": "GB",
								"e": "",
								"z": "moxa",
								"t": "",
								"s": "21.GB"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Harnblase",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Gallenblase",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "LR",
								"NomeMeridiano": "Leber",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "HYPOCHONDRIE",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "STRESS",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "KALTE HÄNDE ",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "KOPFSCHMERZ",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "SCHLAFLOSIGKEIT",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANGST",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "TROCKENER MUND",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "BITTERER GESCHMACK IM MUND",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "WIEDERKEHRENDE ALBTRÄUME UND GEDANKEN",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "SCHMERZ BEIM WASSERLASSEN",
								"score": 3
							}
						],
						"gallery": [
							{
								"idFile": "file_2674478724650",
								"Dida": ""
							},
							{
								"idFile": "file_2674478728149",
								"Dida": ""
							},
							{
								"idFile": "file_2674478731260",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1676329200,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692049984,
						"LabelCiclo": "Shiatsu-Zyklus - Angst",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*12
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Vierte Angstbehandlung",
						"TestoTrattamento": "Der Empfänger berichtet, nachts nicht mehr aufzuwachen, der Schlaf ist ruhig und erholsam, und die Albträume sind verschwunden. Er berichtet auch, dass er weniger reizbar ist und keine Kopfschmerzepisoden hat. Er hat körperliche Energie zurückgewonnen, und insgesamt hat sich die Stimmung verbessert. Der ängstliche Aspekt bleibt bestehen, obwohl es seit dem ersten Treffen zu verringern scheint. Er beschwert sich immer noch über einen bitteren Geschmack im Mund, besonders in den frühen Stunden des Tages. Behandlung:\nDispergieren Sie das Feuer der Leber und der Gallenblase und stärken Sie die entsprechenden Organe. Shiatsu-Druck auf dem Blasenmeridian von 11BL bis 28BL, Halt an 18BL und 19BL als die Shu-Punkte der Leber und Gallenblase.",
						"Prescrizione": "",
						"puntiMTC": [
							{
								"n": 11,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "",
								"s": "11.BL"
							},
							{
								"n": 18,
								"m": "BL",
								"e": "V",
								"z": "moxa",
								"t": "Leber Shu Punkt",
								"s": "18.BL"
							},
							{
								"n": 19,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "Gallenblasen Shu Punkt",
								"s": "19.BL"
							},
							{
								"n": 28,
								"m": "BL",
								"e": "",
								"z": "dito",
								"t": "Blasen Shu Punkt",
								"s": "28.BL"
							},
							{
								"n": 13,
								"m": "LR",
								"e": "V",
								"z": "moxa",
								"t": "Milz BO Punkt",
								"s": "13.LR"
							}
						],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "BL",
								"NomeMeridiano": "Harnblase",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Gallenblase",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "LR",
								"NomeMeridiano": "Leber",
								"valEnergetica": "P",
								"descrizione": ""
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "HYPOCHONDRIE",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "STRESS",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "KALTE HÄNDE ",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "KOPFSCHMERZ",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "SCHLAFLOSIGKEIT",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANGST",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "TROCKENER MUND",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "BITTERER GESCHMACK IM MUND",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "WIEDERKEHRENDE ALBTRÄUME UND GEDANKEN",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "SCHMERZ BEIM WASSERLASSEN",
								"score": 5
							}
						],
						"gallery": [
							{
								"idFile": "file_2674478724650",
								"Dida": ""
							},
							{
								"idFile": "file_2674478728149",
								"Dida": ""
							},
							{
								"idFile": "file_2674478731260",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1676934000,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692049984,
						"LabelCiclo": "Shiatsu-Zyklus - Angst",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*13
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Fünfte Angstbehandlung",
						"TestoTrattamento": "Der Empfänger berichtet nicht nur, sich besser zu fühlen, sondern sich auch innerlich verändert zu fühlen. Er schläft leicht ein, und die obsessiven Gedanken haben sich zu einer Lebenslektion entwickelt. Die morgendliche Müdigkeit ist fast verschwunden, und er wacht mit viel mehr körperlicher und geistiger Energie auf. Dies auch in Verbindung mit der Entscheidung, die lange verlorene Gewohnheit, nach dem Abendessen spazieren zu gehen, wieder aufzunehmen. Der Stress ist immer noch vorhanden, aber er gibt an, besser damit umgehen und ihn vor der Rückkehr nach Hause loslassen zu können. Es wird vereinbart, mit einer WASSER-HOLZ-Erhaltungstherapie zusammen mit Dehntechniken fortzufahren.",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [
							{
								"siglaMeridiano": "KI",
								"NomeMeridiano": "Nieren",
								"valEnergetica": "V"
							},
							{
								"siglaMeridiano": "GB",
								"NomeMeridiano": "Gallenblase",
								"valEnergetica": "P"
							},
							{
								"siglaMeridiano": "LR",
								"NomeMeridiano": "Leber",
								"valEnergetica": "P"
							}
						],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "HYPOCHONDRIE",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "STRESS",
								"score": 5
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "KALTE HÄNDE ",
								"score": 1
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "KOPFSCHMERZ",
								"score": 2
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "SCHLAFLOSIGKEIT",
								"score": 1
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANGST",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "TROCKENER MUND",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "BITTERER GESCHMACK IM MUND",
								"score": 2
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "WIEDERKEHRENDE ALBTRÄUME UND GEDANKEN",
								"score": 1
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "SCHMERZ BEIM WASSERLASSEN",
								"score": 0
							}
						],
						"gallery": [
							{
								"idFile": "file_2674478724650",
								"Dida": ""
							},
							{
								"idFile": "file_2674478728149",
								"Dida": ""
							},
							{
								"idFile": "file_2674478731260",
								"Dida": ""
							}
						],
						"TimeTrattamento": 1677452400,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692049984,
						"LabelCiclo": "Shiatsu-Zyklus - Angst",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*14
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Leitfaden zur Einzelsitzung",
						"TestoTrattamento": "In diesem Abschnitt haben Sie die Möglichkeit, eine einzelne Sitzung in den Ordner Ihres Patienten / Empfängers aufzunehmen.\nDies ermöglicht es Ihnen, die Behandlung sowohl aus klinischer als auch aus wirtschaftlicher Sicht zu erfassen.\n\nSie können auch eine Verschreibung, Symptome, Punkte oder behandelte Meridiane hinzufügen.",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [],
						"gallery": [],
						"TimeTrattamento": 1674601200,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1693846663,
						"LabelCiclo": "",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*15
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Anamnese",
						"TestoTrattamento": "{\"AnamnesiMotivo\":\"FRAGEBOGEN ZUR ANAMNESE (zu Demonstrationszwecken)\\n\\nSeit wann haben Sie Schlafprobleme? Etwa 6 Monate.\\nWas sind die Hauptsymptome des Schlaflosigkeit, die Sie erleben? Schwierigkeiten beim Einschlafen abends und häufiges nächtliches Aufwachen.\\nHaben Sie spezifische Auslöser für Schlaflosigkeit bemerkt? Vor allem arbeitsbezogener Stress und Angst.\\n\\nFrühere medizinische Vorgeschichte:\\nHatten Sie jemals psychische Probleme oder Stimmungsstörungen? Keine frühere Diagnose von Stimmungsstörungen. Es gab sporadische Episoden von Angstzuständen.\\nNehmen Sie derzeit Medikamente oder Nahrungsergänzungsmittel ein, die Ihren Schlaf beeinflussen könnten? Nehme derzeit keine Medikamente.\\nHaben Sie in der Vergangenheit bereits Behandlungen gegen Schlaflosigkeit erhalten? Hat Entspannungstechniken und beruhigende Kräutertees ausprobiert, aber ohne dauerhaften Erfolg.\\n\\nLebensstil und Gewohnheiten:\\nBeschreiben Sie Ihren allgemeinen Lebensstil. Maria arbeitet Vollzeit und fühlt sich oft aufgrund von Fristen und Arbeitsverantwortlichkeiten gestresst. Sie trinkt morgens Kaffee und gelegentlich eine Tasse am Nachmittag.\\nWie bewältigen Sie Stress im Alltag? Praktiziert Yoga und Meditation, hat aber in letzter Zeit Schwierigkeiten gehabt, Zeit zu finden.\\nWas sind Ihre Gewohnheiten vor dem Schlafengehen? Schaut oft fern oder benutzt kurz vor dem Schlafengehen das Telefon.\\n\\nBehandlungsziele:\\nWas ist das Hauptziel, das Sie durch die Aurikulotherapie bei Schlaflosigkeit erreichen möchten?\\nMaria möchte die Schlafqualität verbessern, die Angst reduzieren und effektivere Stressbewältigungstechniken erlernen.\\n\\nZusätzliche Anmerkungen:\\nMaria ist besonders an natürlichen Behandlungen interessiert und möchte die Aurikulotherapie als Option erkunden.\",\"AnamnesiDiagnosiOccidentale\":\"Diagnose in der westlichen Medizin: Primäre Insomnie\\n\\nErklärung:\\nDie primäre Insomnie ist ein Zustand, bei dem der Patient Schwierigkeiten hat, einzuschlafen oder den Schlaf zu halten, obwohl er die Möglichkeit dazu hat. Dies kann durch Faktoren wie Angst, Stress, Depression, schlechte Schlafgewohnheiten, übermäßigen Koffein- oder Alkoholkonsum und Störungen des zirkadianen Rhythmus verursacht werden.\\n\\nZugehörige Symptome:\\n\\nSchwierigkeiten beim Einschlafen\\nHäufiges nächtliches Aufwachen\\nGefühl von nicht erholsamem Schlaf beim Aufwachen\\nMüdigkeit während des Tages\\nReizbarkeit und Schwierigkeiten, sich zu konzentrieren\\nBehandlung in der westlichen Medizin:\\nDie Behandlung der Insomnie in der westlichen Medizin kann je nach zugrunde liegender Ursache variieren. Sie kann Verhaltenseingriffe wie die kognitive Verhaltenstherapie für Insomnie (CBT-I) umfassen, die darauf abzielt, die Schlafhygiene zu verbessern und schädliche Gewohnheiten zu ändern. In einigen Fällen können zur Stabilisierung des Schlafs kurzfristig Hypnotika verschrieben werden.\\n\\nBehandlungsplan:\\nEin Behandlungsplan könnte die Kombination von Verhaltenstherapien wie CBT-I, Schlafumgebungskontrolle, Bildung zur Angst- und Stressreduktion und die Einführung von Entspannungsstrategien umfassen. In ausgewählten Fällen kann der Arzt eine kurzfristige Medikation in Betracht ziehen, jedoch mit Vorsicht in Bezug auf mögliche Nebenwirkungen und Abhängigkeit.\",\"AnamnesiDiagnosiMTC\":\"Qi- und Blutstagnation mit Shen-Mangel (Geist)\\n\\nErklärung:\\nAus der Sicht der TCM könnte Schlaflosigkeit als Ergebnis einer Blockade von Energie (Qi) und Blutzirkulation angesehen werden, die Spannung und Unruhe verursachen kann. Der \\\"Shen\\\", der den mentalen und spirituellen Aspekt darstellt, kann aufgrund von Stress und Angst geschwächt sein und die Fähigkeit, einzuschlafen und einen erholsamen Schlaf zu haben, beeinflussen.\\n\\nZugehörige Symptome:\\n\\nSchwierigkeiten beim Einschlafen\\nHäufiges nächtliches Aufwachen\\nUnruhe und mentale Unruhe\\nMorgendliche Müdigkeit\\nAngst\\nBehandlung in der TCM:\\nDas Ziel der Behandlung in der TCM wäre die Wiederherstellung des harmonischen Flusses von Qi und Blut, die Reduzierung der geistigen Anspannung und die Stärkung des Shen. Dies könnte durch Aurikulotherapie, Akupunkturanwendung und spezifische Kräutermedizin erreicht werden. Die Therapie würde darauf abzielen, die stagnierende Energie zu lösen, Entspannung zu fördern und die Schlafqualität zu verbessern.\\n\\nBehandlungsplan:\\nEin Behandlungsplan könnte regelmäßige Sitzungen zur Aurikulotherapie, gezielte Akupunkturbehandlungen, Ratschläge zur Stressbewältigung wie Meditation und Entspannung sowie maßgeschneiderte chinesische Kräuterrezepte zur Stärkung von Qi, Blut und Shen umfassen.\"}",
						"Prescrizione": "Aurikulotherapie:\nWöchentliche Sitzungen zur Aurikulotherapie über einen Zeitraum von 6-8 Wochen durchführen. Während dieser Sitzungen werden die am Entspannung, Schlaf und der Reduzierung von Angstzuständen beteiligten Ohrpunkte stimuliert. Der Aurikulotherapeut wird die Reaktion des Körpers bewerten und die Behandlung entsprechend anpassen.\n\nKognitive Verhaltenstherapie für Insomnie (CBT-I):\nTeilnahme an einem Programm zur kognitiven Verhaltenstherapie für Insomnie. Dieses Programm umfasst wöchentliche Sitzungen während der ersten 4-6 Wochen, gefolgt von alle zwei Wochen stattfindenden Folgeterminen. CBT-I zielt darauf ab, die Schlafhygiene zu verbessern, negative Gedanken im Zusammenhang mit dem Schlaf anzugehen und einen regelmäßigen Schlaf-Wach-Rhythmus einzurichten.\n\nStressbewältigungsstrategien:\nTäglich mindestens 10-15 Minuten Entspannungstechniken wie Meditation und tiefe Atmung praktizieren, vorzugsweise vor dem Zubettgehen. Diese Praktiken können dazu beitragen, Angstzustände zu reduzieren und den Körper auf den Schlaf vorzubereiten.\n\nEmpfehlungen für den Lebensstil:\n\nDen Konsum von Koffein und Alkohol am Nachmittag und Abend vermeiden.\nDie Verwendung von elektronischen Geräten vor dem Schlafengehen einschränken.\nEine komfortable Schlafumgebung mit gedämpftem Licht und angemessener Temperatur aufrechterhalten.\nDas Essen von schweren Mahlzeiten kurz vor dem Schlafengehen vermeiden.\nFollow-up:\nEin Follow-up-Termin wird nach 8 Wochen vereinbart, um die Reaktion auf die Behandlung zu bewerten und gegebenenfalls Anpassungen vorzunehmen. Bitte führen Sie ein Schlaftagebuch und notieren Sie etwaige Verbesserungen oder Veränderungen.\n\nZusätzliche Hinweise:\nBitte befolgen Sie die Anweisungen des Aurikulotherapie-Therapeuten und des CBT-I-Therapeuten. Bei auftretenden Nebenwirkungen oder Bedenken wenden Sie sich bitte sofort an Ihren Arzt.",
						"puntiMTC": [],
						"puntiAuricolari": [
							{
								"s": "003",
								"n": "Apex des Ohrpavillons",
								"z": "",
								"e": "",
								"t": ""
							},
							{
								"s": "013",
								"n": "Romolis Angst",
								"z": "",
								"e": "",
								"t": ""
							},
							{
								"s": "230",
								"n": "Master Cerebral Point",
								"z": "",
								"e": "",
								"t": ""
							},
							{
								"s": "195",
								"n": "Epiphyse",
								"z": "",
								"e": "",
								"t": ""
							}
						],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Schwierigkeiten beim Einschlafen",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Häufiges nächtliches Erwachen",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Unruhe und mentale Unruhe",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Müdigkeit beim Erwachen",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANGST",
								"score": 10
							}
						],
						"gallery": [
							{
								"idFile": "file_1692134504542",
								"Dida": ""
							}
						],
						"TimeTrattamento": 0,
						"oraInizio": -1,
						"oraFine": -1,
						"DataModifica": 1692134508,
						"LabelCiclo": "Ohrtherapiezyklus bei Schlaflosigkeit",
						"TipoTrattamento": "A",
						"CostoTrattamento": 0,
						"ordine": 2,
						"Cancellato": 0,
						"frv": true
					},
					{//*16
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Sitzung 1: Erstbewertung und Entspannung",
						"TestoTrattamento": "Dauer: 45 Minuten\n\nWährend der ersten Sitzung wird der Patient begrüßt und einer kurzen Bewertung seiner Krankengeschichte und der mit Schlaflosigkeit verbundenen Symptome unterzogen. Der Aurikulotherapeut erklärt den Behandlungsprozess und platziert sanft kleine Nadeln oder Samen auf der entsprechenden Ohrkartenpunkte, die den Schlaf und die Entspannung beeinflussen können. Der Patient wird dann 20-30 Minuten lang zum Entspannen gelassen, während er dazu ermutigt wird, sich auf tiefe Atmung zu konzentrieren und den Geist zu leeren.",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [
							{
								"s": "045",
								"n": "Schlaflosigkeit 1",
								"z": "ago",
								"e": "D",
								"t": ""
							},
							{
								"s": "245",
								"n": "Schlaflosigkeit 2",
								"z": "ago",
								"e": "D",
								"t": ""
							}
						],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Schwierigkeiten beim Einschlafen",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Häufiges nächtliches Erwachen",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Unruhe und mentale Unruhe",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Müdigkeit beim Erwachen",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANGST",
								"score": 9
							}
						],
						"gallery": [],
						"TimeTrattamento": 1692050400,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692177913,
						"LabelCiclo": "Ohrtherapiezyklus bei Schlaflosigkeit",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*17
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Sitzung 2: Stimulation der Schlafpunkte",
						"TestoTrattamento": "In der zweiten Sitzung prüft der Aurikulotherapeut den Fortschritt des Patienten seit der vorherigen Sitzung und geht mit einer gezielteren Stimulation der Ohrpunkte, die mit dem Schlaf zusammenhängen, vor. Nadeln oder Samen werden präziser platziert und konzentrieren sich auf spezifische Punkte, die mit der Verbesserung von Schlaflosigkeit verbunden sind. Der Patient wird erneut zum Entspannen gelassen, während die Nadeln wirken.",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [
							{
								"s": "045",
								"n": "Schlaflosigkeit 1",
								"z": "ago",
								"e": "",
								"t": ""
							},
							{
								"s": "245",
								"n": "Schlaflosigkeit 2",
								"z": "ago",
								"e": "",
								"t": ""
							}
						],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Schwierigkeiten beim Einschlafen",
								"score": 10
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Häufiges nächtliches Erwachen",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Unruhe und mentale Unruhe",
								"score": 9
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Müdigkeit beim Erwachen",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANGST",
								"score": 9
							}
						],
						"gallery": [],
						"TimeTrattamento": 1692568800,
						"oraInizio": 132,
						"oraFine": 144,
						"DataModifica": 1692177897,
						"LabelCiclo": "Ohrtherapiezyklus bei Schlaflosigkeit",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*18
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Sitzung 3: Energieausgleich",
						"TestoTrattamento": "Dauer: 50 Minuten\n\nIn der dritten Sitzung passt der Aurikulotherapeut weiterhin die Stimulation der Ohrpunkte an und konzentriert sich auf das Energiegleichgewicht des Patienten. Auch Stress- oder Angstfaktoren, die zur Schlaflosigkeit beitragen können, werden berücksichtigt. Während dieser Sitzung kann der Patient auch Ratschläge zur Stressbewältigung und Entspannungstechniken erhalten, die er auch zu Hause anwenden kann.",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [
							{
								"s": "045",
								"n": "Schlaflosigkeit 1",
								"z": "ago",
								"e": "D",
								"t": ""
							},
							{
								"s": "245",
								"n": "Schlaflosigkeit 2",
								"z": "ago",
								"e": "D",
								"t": ""
							},
							{
								"s": "000",
								"n": "Nullpunkt",
								"z": "seme_vaccaria",
								"e": "",
								"t": ""
							}
						],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Schwierigkeiten beim Einschlafen",
								"score": 8
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Häufiges nächtliches Erwachen",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Unruhe und mentale Unruhe",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Müdigkeit beim Erwachen",
								"score": 7
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANGST",
								"score": 7
							}
						],
						"gallery": [],
						"TimeTrattamento": 1692914400,
						"oraInizio": 126,
						"oraFine": 144,
						"DataModifica": 1692177857,
						"LabelCiclo": "Ohrtherapiezyklus bei Schlaflosigkeit",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*19
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Sitzung 4: Konsolidierung des Fortschritts",
						"TestoTrattamento": "Dauer: 45 Minuten\n\nIn der vierten Sitzung bewerten der Patient und der Aurikulotherapeut gemeinsam die bisher erzielten Fortschritte. Der Patient kann eine Verbesserung der Schlafqualität, eine längere Schlafdauer oder eine geringere Häufigkeit nächtlicher Wachphasen berichten. Der Aurikulotherapeut passt die Behandlung entsprechend diesen Ergebnissen an und fährt fort, die am Schlaf verbesserten beteiligten Ohrpunkte zu stimulieren.",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [
							{
								"s": "045",
								"n": "Schlaflosigkeit 1",
								"z": "ago",
								"e": "",
								"t": ""
							},
							{
								"s": "245",
								"n": "Schlaflosigkeit 2",
								"z": "ago",
								"e": "",
								"t": ""
							},
							{
								"s": "000",
								"n": "Nullpunkt",
								"z": "seme_vaccaria",
								"e": "",
								"t": ""
							}
						],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Schwierigkeiten beim Einschlafen",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Häufiges nächtliches Erwachen",
								"score": 6
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Unruhe und mentale Unruhe",
								"score": 5
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Müdigkeit beim Erwachen",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANGST",
								"score": 7
							}
						],
						"gallery": [],
						"TimeTrattamento": 1693432800,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692178254,
						"LabelCiclo": "Ohrtherapiezyklus bei Schlaflosigkeit",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					},
					{//*20
						"idTrattamento": 0,
						"idPaziente": 0,
						"TitoloTrattamento": "Sitzung 5: Wartung und Abschluss",
						"TestoTrattamento": "In der letzten Sitzung des Zyklus liegt der Fokus auf der Aufrechterhaltung der erzielten Fortschritte. Der Aurikulotherapeut kann einen langfristigen Behandlungsplan vorschlagen, der regelmäßige Besuche zur Aufrechterhaltung der erzielten Vorteile beinhalten könnte. Der Patient wird ermutigt, weiterhin Entspannungstechniken zu praktizieren und den Stress im Alltag zu bewältigen.",
						"Prescrizione": "",
						"puntiMTC": [],
						"puntiAuricolari": [
							{
								"s": "045",
								"n": "Schlaflosigkeit 1",
								"z": "ago",
								"e": "",
								"t": ""
							},
							{
								"s": "245",
								"n": "Schlaflosigkeit 2",
								"z": "dito",
								"e": "",
								"t": ""
							},
							{
								"s": "000",
								"n": "Nullpunkt",
								"z": "seme_vaccaria",
								"e": "",
								"t": ""
							}
						],
						"puntiNamikoshi": [],
						"meridiani": [],
						"sintomi": [
							{
								"idSintomo": 0,
								"NomeSintomo": "Schwierigkeiten beim Einschlafen",
								"score": 2
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Häufiges nächtliches Erwachen",
								"score": 0
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Unruhe und mentale Unruhe",
								"score": 3
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "Müdigkeit beim Erwachen",
								"score": 4
							},
							{
								"idSintomo": 0,
								"NomeSintomo": "ANGST",
								"score": 5
							}
						],
						"gallery": [],
						"TimeTrattamento": 1693864800,
						"oraInizio": 120,
						"oraFine": 132,
						"DataModifica": 1692178379,
						"LabelCiclo": "Ohrtherapiezyklus bei Schlaflosigkeit",
						"TipoTrattamento": "B",
						"CostoTrattamento": 50,
						"ordine": 0,
						"Cancellato": 0,
						"frv": true
					}
				],
				"saldi": [
					{
						"idSaldo": 0,
						"idPaziente": 0,
						"MotivoSaldo": "Akupunkturbehandlung",
						"RicevutaSaldo": "2",
						"ValoreSaldo": 150,
						"DataSaldo": 1674860400,
						"DataModifica": 1691909111,
						"Cancellato": 0,
						"frv": true
					},
					{
						"idSaldo": 0,
						"idPaziente": 0,
						"MotivoSaldo": "Shiatsu-Behandlung",
						"RicevutaSaldo": "1",
						"ValoreSaldo": 50,
						"DataSaldo": 1674428400,
						"DataModifica": 1691909111,
						"Cancellato": 0,
						"frv": true
					},
					{
						"idSaldo": 0,
						"idPaziente": 0,
						"MotivoSaldo": "Akupunkturbehandlung, Fortgeschritten",
						"RicevutaSaldo": "3",
						"ValoreSaldo": 150,
						"DataSaldo": 1675119600,
						"DataModifica": 1691909111,
						"Cancellato": 0,
						"frv": true
					},
					{
						"idSaldo": 0,
						"idPaziente": 0,
						"MotivoSaldo": "Ausgleichsbehandlung",
						"RicevutaSaldo": "5",
						"ValoreSaldo": 150,
						"DataSaldo": 1692136800,
						"DataModifica": 1692183527,
						"Cancellato": 0,
						"frv": true
					}
				],
				"Cancellato": 0,
				"frv": true
			}
		],
		servizi: [
			{//*
				"idServizio": 0,
				"NomeServizio": "Aurikulotherapiezyklus zum Aufhören mit dem Rauchen",
				"DescrizioneServizio": "Akupunktur ist wirksam, um die Nikotinsucht zu überwinden.\n\nDie Behandlung basiert auf einer umfassenden Analyse der Entzugssymptome und zielt darauf ab, die Energien des Körpers auszugleichen, um die Gesundheit zu verbessern.\n\nAkupunktur kann denjenigen helfen, die mit dem Rauchen aufhören möchten, indem sie das Verlangen nach Zigaretten, die Angst und die Notwendigkeit des mit dem Rauchen verbundenen Rituals reduziert. Die Behandlung kann auch ein Gefühl des Ekelns gegenüber dem Geschmack und Geruch von Zigaretten hervorrufen.\n\nWenn die Person fest entschlossen ist, mit dem Rauchen aufzuhören, können die positiven Effekte bereits nach der dritten oder vierten Behandlung beobachtet werden.\n\nDas klassische Protokoll, das von P. Nogier entwickelt wurde, dauert 15-20 Minuten in einer einzigen Sitzung und erfordert einen Verzicht von mindestens 6 Stunden vor der Behandlung.\n",
				"CostoServizio": 150,
				"NumeroSedute": 5,
				"DataModifica": 1674490894,
				"DataCreazione": 1674490810,
				"Cancellato": 0,
				"frv": true
			},
			{//*
				"idServizio": 0,
				"NomeServizio": "Shiatsu-Zyklus gegen Angst",
				"DescrizioneServizio": "Die Emotionalität eines jeden Menschen ist subjektiv und zeigt sich auf die unwahrscheinlichsten Weisen, ein zugrunde liegendes geringes Selbstwertgefühl kann eine Person glauben lassen, dass sie nicht in der Lage ist, die Herausforderungen zu meistern, die das Leben uns stellt. Ein starkes Stressgefühl, das unsere Ruhe stört, kann uns dazu bringen, in einen Zustand der 'Überlastung' zu geraten, und so treten Angst, Angst und die berühmten Panikattacken auf. Als Symptome in der akuten Phase können Herzrasen, keuchende Atmung, Angst mit anschließender Adrenalinfreisetzung auftreten, ein sehr unangenehmes Gefühl, auch weil die Krisen manchmal plötzlich und ohne Vorwarnung auftreten und die Betroffenen in ständiger Angst leben, in die 'Schreckensphase' zu geraten.\n\nWenn der Zustand der Angst tiefgreifend, schwerwiegend und dauerhaft ist, erfordert er das Eingreifen eines Spezialisten.\n",
				"CostoServizio": 50,
				"NumeroSedute": 5,
				"DataModifica": 1674490934,
				"DataCreazione": 1674490895,
				"Cancellato": 0,
				"frv": true
			},
			{//*
				"idServizio": 0,
				"NomeServizio": "Akupunkturzyklus bei Bruxismus",
				"DescrizioneServizio": "Bruxismus bezieht sich auf einen Zustand, bei dem die Zähne knirschen und reiben, wobei der obere Bogen gegen den unteren gedrückt wird, während die Kiefer mit einer gewissen Kraft zusammengepresst werden.\n\nBruxismus ist ein ziemlich häufiges Problem, das von der unwillkürlichen Kontraktion der Kaumuskulatur abhängt.\n\nEr tritt hauptsächlich nachts auf und kann eine Reihe von Folgen verursachen: Zahnabnutzung, Kieferschmerzen, Kopfschmerzen.",
				"CostoServizio": 100,
				"NumeroSedute": 5,
				"DataModifica": 1674491088,
				"DataCreazione": 1674490935,
				"Cancellato": 0,
				"frv": true
			},
			{//*
				"idServizio": 0,
				"NomeServizio": "Leitfaden für den Service",
				"DescrizioneServizio": "In diesem Abschnitt haben Sie die Möglichkeit, die Dienstleistungen vorab zu laden, die Sie Ihren Kunden/Patienten regelmäßig anbieten.\n\nDurch Hinzufügen des Preises und der Anzahl der Sitzungen des Dienstes beschleunigen Sie den Eingabevorgang.\n\nZum Beispiel das Paket \"Raucherentwöhnung\", Schlaflosigkeit, Allergie, Qi-Ausgleich....\nKosten pro Sitzung: 150€\nAnzahl der Sitzungen: 5\n\n",
				"CostoServizio": 1,
				"NumeroSedute": 1,
				"DataModifica": 1674491592,
				"DataCreazione": 1674491089,
				"Cancellato": 0,
				"frv": true
			}
		],
		fornitori: [
			{
				"idFornitore": 0,
				"RagioneSociale": "Nadeln & Punkte",
				"Intestazione": "Nadeln & Punkte Srl\nvia Italia 96\nRoma",
				"PartitaIva": "0698765432",
				"CodiceFiscale": "ghagha84r16d200r",
				"Indirizzo": "via Italia 96",
				"CAP": "10000",
				"Citta": "Roma",
				"Provincia": "Roma",
				"Stato": "it",
				"Telefono": "06123456",
				"Email": "aghi@mail.com",
				"NoteFornitore": "Lieferant für Nadeln für Akupunktur.\nBerater für Bestellungen Herr Angelo Spinoso\nBestellungen über 100 €, 20% Rabatt",
				"etichette": [],
				"DataModifica": 1629780089,
				"DataCreazione": 1629779932,
				"Cancellato": 0,
				"frv": true
			},
			{
				"idFornitore": 0,
				"RagioneSociale": "Arztpraxis Einrichtungen GmbH",
				"Intestazione": "Herrn Arztpraxis Einrichtungen GmbH\nVia Milano 113\nMailand",
				"PartitaIva": "06987653245",
				"CodiceFiscale": "RRDMBL84R16D111A",
				"Indirizzo": "Via Milano 113",
				"CAP": "10000",
				"Citta": "Milano",
				"Provincia": "MI",
				"Stato": "it",
				"Telefono": "3486851418",
				"Email": "arredamentiambulatori@mail.com",
				"NoteFornitore": "Großhändler für Materialien für Arztpraxen.\nKontaktagent Herr Rossi Mario\nRechnung 90 Tage\nAusgezeichnete Preise und Qualität",
				"etichette": [
					{
						"idEtichetta": 0,
						"NomeEtichetta": "Facebook",
						"ValoreEtichetta": "@arredamentiambulatori",
						"sezione": "contatti"
					},
					{
						"idEtichetta": 0,
						"NomeEtichetta": "Instagram",
						"ValoreEtichetta": "@arreda_abulatori",
						"sezione": "contatti"
					}
				],
				"DataModifica": 1629780672,
				"DataCreazione": 1629780090,
				"Cancellato": 0,
				"frv": true
			}
		]
	},
	files:[
		{
			"idFile": "file_1692134504542",
			"imgMini": "data:image/jpeg;base64,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",
			"name": null,
			"frv": false
		},
		{
			"idFile": "file_2674467779004",
			"imgMini": "data:image/jpeg;base64,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",
			"name": null,
			"frv": false
		},
		{
			"idFile": "file_2674467791995",
			"imgMini": "data:image/jpeg;base64,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",
			"name": null,
			"frv": false
		},
		{
			"idFile": "file_2674478731260",
			"imgMini": "data:image/jpeg;base64,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",
			"name": null,
			"frv": false
		},
		{
			"idFile": "file_2674478728149",
			"imgMini": "data:image/jpeg;base64,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",
			"name": null,
			"frv": false
		},
		{
			"idFile": "file_2674478724650",
			"imgMini": "data:image/jpeg;base64,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",
			"name": null,
			"frv": false
		},
		{
			"idFile": "file_2674475391556",
			"imgMini": "data:image/jpeg;base64,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",
			"name": null,
			"frv": false
		},
		{
			"idFile": "file_2674469901174",
			"imgMini": "data:image/jpeg;base64,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",
			"name": null,
			"frv": false
		},
		{
			"idFile": "file_2674427069354",
			"imgMini": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABsSFBcUERsXFhceHBsgKEIrKCUlKFE6PTBCYFVlZF9VXVtqeJmBanGQc1tdhbWGkJ6jq62rZ4C8ybqmx5moq6T/2wBDARweHigjKE4rK06kbl1upKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKT/wAARCADIAMgDASIAAhEBAxEB/8QAGgAAAgMBAQAAAAAAAAAAAAAAAAMCBAUBBv/EADgQAAEEAQIEBQAJBAEFAQAAAAEAAgMRIQQxBRJBURMiMmFxBhQjM1KBkaGxJCVCwWIVNJKi0fD/xAAXAQEBAQEAAAAAAAAAAAAAAAAAAQID/8QAIREBAQACAgICAwEAAAAAAAAAAAECERIxAyEiUTJBYXH/2gAMAwEAAhEDEQA/APPUhCEAg7IQRhBzohANIQdZ6gpAc035rjd0Hm5iQDhBY1XIQyiCRhM0wqyVTY0ucAAVciBMjI277lBHUGV32QbQJsD4S4SxhIewj3q1c1LwdRG3ZzWm0NGMhBCNmncNmE97IQ6JrQXMkcyv+VhNLWEekfolmFpHpCCudTIw7seFtQeXhjSd3C/1Wf8AVmPLWBgsmsLU1YDNOGAUMAIKGnHNI0e4SdRKcE55nl374TWOEYLuoGFU1dB7Wj/EAIHSOAzea2VE8ziXOyTlNlth818539lBzQAMoHxOa2I83bZXOEu+xOLsbLJe4iOt7/ZbXDWBkbRtmj7oG8Z5homjpzDdead6j8r0vGiRoLFVzDB7LzKAQhCBi6uLv5oAI6LlroPRBEhCkVFBKPLwrzAG5IGcKlELervISGj3QTtgHlaAeqIAG6nn6VaS6T7V+MJ2lIfMS4+UDKDk1P1XORRLbXT7oafEe6T8W3wmFvdBBpKY01vsohtKRP6ILGkBdM0kbWQrGr/xB6AlJ4eeZ7yelAJmrNyAf8UGXqH8haPe0mE/WJS8jA3Tp4xNI8bBotRhhDLAPl7dygTqiXvLhddEp52+E/UMLGb2eqrWbygngcl7XZW9oWACKxd2aWAwF1C9yvQ6Nj6FkAgUgr8dcfqzW9za88t/6QEeHGKINE2FgIBCEIJrq4uoOIQuhB3ooqTVysoJwHzrQOG2s+H7wfKuz2G0grOPmcbUjL4cDmj1OwomMuzS66Eu8PpdklARSTEAMIod1Za6cVcQd7gpLYpGektc33TmvkbvHj2KAdK4ZdG5o+ENlYcB4/NSbOQcMkVfUl0pzAfkoNbhRBEpG1gLurP2rj2S+CRGPRknHO4kfx/pGsNOdZ6/6QUublZK7vj/AGpNdlpSpnVAxv4iXf8AxQbIQKO4QR1LuZ5AOAk1ZRZsk9VJlbHdARDztFbFej0BJaT0wvOtNahre7gV6PQAhpzugzfpCftGC9m7LEWx9ISDO0dgsdAIQhBNCEIBAQgIJDdcO6Ah26BmnFzBP1DsgWlaUeYnsETOt4QOh5skZFJkrSzwBeSHH+EaUGw3vgrkj/E1TiNmANCCbSpNIOOq5VBdbVhAxoAaSokUKA3UrrdM07eaZl90GhCwRwtb1AorM1zvXfdapOCSsDispLg0GrKBU7+eUNbs0ABTdG2IF7jeMKGhj55rds0ZVnUhsotoptYQUHG3UuN9bT7odvtsus79soOxm9UCe69NpCACvMxj+qae5XptDfhk+6DE484HV0M0BlZa0eOG9c4Dp1WcgEIQgmhdGy4gEIQgk3cIIHMV1pooZl5QOhHLCT1KVZL+5UpHFg5VBhIcDuUFvTymNry4XQsIhYQy3bnKhqOZunBcKLjgeyVE6R2GvIAQaH+K5jCS1k9etp+VPknA9DXfDkEw6xhWdCb1IB6tJ/hUDMGGpGuYfcK1oJGv1TOR10DdINOc8sRP5LE1ETZpXNJ9LbWvrDULR1JWNO8tfI5h68t//vlByOPw43MDrF5xumlpMGTVnKXHJy0471RTtQQ2FtfKDOJXBdoI7KTmkRc1dkE9MObVA9AvT6Xl8NuegXmtGftgf1Xp9KB4Qrrug81xkj6+/wCaVBXuL/8AfyAgg3m1RQCEIQMpFIXUEaQpIIQANC06Jg9SSBilZZ5WD2QJmcCT3XIsuC5IQ55RGCTjdBb14JMTW58pP8JULXssGPmvsU2WxOy/wAfymsOcoIMkcMGF36qfjVtE+1IUeiOXKCvK6V4oRGvcqxwOJ3jySFtAABdpaWij5IAerjZQL17wG5PpWIXc4a3vbir3FpcOzuaWfES83+SCZBxSbqSS5rR0Cg8iwOq7PKC4uCCuBb6KtaiPl0rWXtm1Uaf8vzTpHuMQcTveOyDmkoy9gSvT6PMDa6LzOiZzTtb+a9TpgBAzFYQeY4ySeISWOqoLQ44f7lJjqs9AIQhAxdCN0dUHQF0hcCmBYQEQt1JjjTiOlKMXrUpzTCfyQVibKdpS0SC8AJCfpmB0ov0g5QNfIJdQXAHlCaCbSW+aV56XSeBjCCTN8pqW2qC6DfVBIC3LVFMhHs0LJYadfYrVlNsaO9fwgwuKEucB7pOkie+UNb6RurOoa2bVBjuoJXYmCB9XzNIsexQK1MPhuJKTykt9lf1URfGHWqpjLWHKCu0Ys9FN2dNZGeZR5hzV+6dMB4JO+EDeEC9SXHpsvRadpbE0HsvN8LJbK74teni9Ivsg8txw/wBxk+VnrR46P7i/3WcgEIQgaF1cC7hB0Kbdq6qACYEE4guar7ofKlHta7qRcOEFIK1pxTXH2VcAk0rkTeRryerCgrxzOZYAuyrDHSuGIv3VRtincpNHorcczerXj8kDKmr7r/2Cj4j2ZdE8DvuptnYDs/8ARcfqHltRwuPu4oIfWogN89lsB3NA15O0YA/RYD2SvcAY6s0t2Rvh6VkfXAQY+p+/ebIrYqTXlzACdgkyv55H11dSczDMhBf058aAAhVtS2mmk/RHyV3UdWy9kGQcZTnuJhbexTNdpzCyP90p5AhjaOyB3DM6h3wvUNwF5jhY/qCfZeljsNbe9Wg8zx0f3Fyzlpcev/qDr7BZqAQhCBq6MrgUggkBSlsFwUflSaEDGCmpkg+yK40BPihdMCGjHcolymPus+JhL9tlahidL4jAx23lNKwBp9KDyjxX1knYKqNdLI8W7laDsNlN1jlcvxh8Wke1lPLG/LkwQxt3mb+iqRE5vOSmbnsns45XunuhhIxOP/ErogadpmJTN8rpAJpPZxy+1iDTkTNLqLRmwU7Vnp0a0kpGk8szR3sfwnufYmJALW4AT2nz/wBedDqcSflOa6XUODIwa7q59Ug1TeaG2O6tOytwM8FjWECyM4ym2pnL6UvGdp2iMNr37pmmke4lzjbQLsqetj5gHVsqkpcAY2uodlW1riXLJpy4EEg4pZcnbtQVxuNGAcnIVE5BPfKC7wkc2od8L0UZFDPwsHgoPiuIW5H6Aw9EHn+Pj+ucb6DCzFq/SEf1TSOoWUgEIQgaF0mlFBQTafMnBIZlWG7IH6aIzSNZt3Psrk8gaPBiw0YJ7qHDKMjyNwMJTbs2bNrPdcL8s9XqFyj7N1dlRiJBWk9txuWY3y33tad9Lkd8pUw291Xj1DQ2i0qX1rswlBYGF0ZKqnUO/BXyVD6zIMgNQaUMjY3ssn1WE9/3U491iSaiRxGwA6BaUcxfBZOSKPygowzvjl5OnRa+nl+sMs+tm3wsQ/ffmtLhxI1ArasqZfbj5Z65TtdFStpV54A6QDY900XHK4k+UlTtrqPVV0xu5tlzuIIjA6Km4FrB8kLQ4iw8olGLKoONwgHcFGl/g1gOrclbbHYFH5WJwZ9FwAshbUZAABzfUIMX6RD7WM+yx1t/SJv3TvaliIBCEIJrq4F20HQd6ViI+QWqqsM6C8ILekkMOoBvy7FWtRFyu52+l2QVSjq05msMRDHN54z07LNn7cc8bLyxNABBCyZmOZI4EYu1tiJrvNE6x2Kr6iBpB5gRe6u25nKyrBwMfCmyJ7tmn8yrELGsc5mLHVNVbVvq79zy0pN0jT6nk+wT6sUu0RjugrSaQCnMuvdPjaWtDffKsNA+U9kIMooeXl3RLlJ2xHg8xIHVavDo3QROmmwTsFDwYdG9z3EyvslrBsF2LVvlEgkaLOw7LPbllvyep0bzOMjmON8wu/dV2TOa12DY6dgrDYy5jXmyVEjlnBIx37rTrJojXuLomgb3n3WcBhzSrmscebe3A2fcqmRm+qKv8Gsap1dAtqPy3jF4WNwc+d5Aytppo817hBQ+kDQdI09nLzq9LxpnPoTn0m/leaQCEIQTQhCDoCY05UOikNkFhjhSbE0PsnoqrXYVjTvp1ILsZo4OycZHVmnD3CQ0ix7po2pTUZuMvcL1Bhjeznh8zsczTVKP9ORvIF3XUYmE/iFJAF/CaZ4fVOA0/wCN/wCi7enHR7vbZKqspb3tBy4BNHD+rjZo24ZEB8m1bhJc5jrFFt0Bjt/pYjtSL8jC4j9Fb4XrXPe6KTPVoH8JqLPHi7r4nEPkj3DiqkEwf5iQJB0PVa7Bzxm/xFZkmnZBrCx7AWv2JVaW4NS0jldWE/lY8UCCs2QxxB0ZiDSOq5C+RjrB+Cio8RZ4bwRZB6qmVo8QPPECOhv4WcfSCg0OCZmkC2L5XV0BtY3AT9u/4WydwQgjrh4mklAr0ndeSODS9jL543itwQvHyD7R3yg4hCEE0WhCDoUkIQSGVOF9OsIQguBxc0Z2Kswv5wUIQR1tN0pJ2BCqfWGNoAFxOwCEIOtD5D5zyN7DddcI4gXU1o7nJKEIK555rryD9yn6RjIZQ8XYwbQhBrsH2j29xzBL4jpzNCC31NyEIQZwkbqYwJQWStxfdM07GtAa6r6IQghM4MGTbXYIWe8US3sUIQXeCGtQ/wCFuO2Fd0IQTArbK8jqxy6mQVXmQhAlCEIP/9k=",
			"name": null,
			"frv": false
		},
		{
			"idFile": "file_2674475331170",
			"imgMini": "data:image/jpeg;base64,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",
			"name": null,
			"frv": false
		},
		{
			"idFile": "file_2674469904750",
			"imgMini": "data:image/jpeg;base64,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",
			"name": null,
			"frv": false
		},
		{
			"idFile": "file_2674469909751",
			"imgMini": "data:image/jpeg;base64,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",
			"name": null,
			"frv": false
		},
		{
			"idFile": "file_2674427029613",
			"imgMini": "data:image/jpeg;base64,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",
			"name": null,
			"frv": false
		}
	]
};