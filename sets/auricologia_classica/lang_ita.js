DB.set = {
    punti: {
        "500": {
            NomePunto: "Punto ZERO",
            AzioniPunto: "Xxx",
            ChiaviPunto: ""
        }
    },
    apparati: {
		1: "Apparato locomotore",
		2: "Capo",
		3: "Clinica neurologica",
		4: "Clinica psichiatrica",
		5: "Clinica endocrinologica e apparato urogenitale",
		6: "Clinica gastroenterologica",
		7: "Apparato cardiocircolatorio e linfatico",
		8: "Apparato respiratorio, fonetico e otovestibolare",
		9: "Clinica dermatologica",
		10: "Clinica oculistica",
		11: "Dipendenze"
	},
	schede: {
		1: {
			g: {
				dp: {
					p: [
						"003",
						"268",
						"155"
					]
				},
				ds: {
					p: [
						"180"
					]
				},
				np: {
					p: [
						"000",
						"001"
					]
				},
				ns: {
					p: [
						"192"
					]
				},
			},
			s: [
				{
					t: "Infiammazione",
					p: [
						"165",
						"026",
						{
							t: "Triade antinfiammatoria",
							p: [
								"003",
								"165",
								"039"
							],
							l: "TAN"
						}
					]
				},
				{
					t: "Contrattura muscolare",
					p: [
						"124"
					]
				},
				{
					t: "Componente ansiosa",
					p: [
						{
							t: "Triade di relax",
							p: [
								"001",
								"222",
								"254"
							],
							l: "TRE"
						},
						"137",
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						}
					]
				},
				{
					t: "Componente depressiva",
					p: [
						"173",
						"184"
					]
				}
			]
		},
		2: {
			g: {
				dp: {
					p: [
						"003",
						["277","069"],
						"155"
					]
				},
				ds: {
					p: [
						"268",
						"291"
					]
				},
				np: {
					p: [
						"000",
						"001"
					]
				},
				ns: {
					p: [
						"192"
					]
				},
			},
			s: [
				{
					t: "Dolore unilaterale",
					d: "Trattare preferibilmente il padiglione omolaterale al dolore",
					p: [
						"003",
						"291",
						"120",
						["277","069"]
					]
				},
				{
					t: "Contrattura muscolare",
					p: [
						"124",
						"285",
						"288"
					]
				}
			]
		},
		3: {
			g: {
				dp: {
					p: [
						"003",
						["278","070"],
						"155"
					]
				},
				ds: {
					p: [
						"268",
						"291",
						"260"
					]
				},
				np: {
					p: [
						"000",
						"001"
					]
				},
				ns: {
					p: [
						"192"
					]
				},
			},
			s: [
				{
					t: "Dolore unilaterale",
					d: "Trattare preferibilmente il padiglione omolaterale al dolore",
					p: [
						"003",
						"291",
						"260",
						["278","070"]
					]
				},
				{
					t: "Contrattura muscolare",
					p: [
						"124",
						"286",
						"289"
					]
				}
			]
		},
		4: {
			g: {
				dp: {
					p: [
						"003",
						["279","071"],
						"072",
						"155"
					]
				},
				ds: {
					p: [
						"268",
						"067",
						"261"
					]
				},
				np: {
					p: [
						"000",
						"001"
					]
				},
				ns: {
					p: [
						"192",
						"199"
					]
				},
			},
			s: [
				{
					t: "Dolore unilaterale",
					d: "Trattare preferibilmente il padiglione omolaterale al dolore",
					p: [
						"003",
						"067",
						["279","071"],
						"072",
						"058",
						"261"
					]
				},
				{
					t: "Contrattura muscolare",
					p: [
						"124",
						"287",
						"282"
					]
				}
			]
		},
		5: {
			g: {
				dp: {
					p: [
						"003",
						"124",
						"155"
					]
				},
				ds: {
					p: [
						"222",
						"180"
					]
				},
				np: {
					p: [
						"000",
						"001"
					]
				},
				ns: {
					p: [
						"192",
						"199"
					]
				},
			},
			s: [
				{
					t: "Infiammazione",
					p: [
						"165",
						"026",
						{
							t: "Triade antinfiammatoria",
							p: [
								"003",
								"165",
								"039"
							],
							l: "TAN"
						}
					]
				},
				{
					t: "Componente ansiosa",
					p: [
						{
							t: "Triade di relax",
							p: [
								"001",
								"222",
								"254"
							],
							l: "TRE"
						},
						"137",
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						}
					]
				},
				{
					t: "Dolore unilaterale",
					d: "Trattare preferibilmente il padiglione omolaterale al dolore",
					p: [
						"000",
						"003",
						"124",
						"222",
						"155"
					]
				}
			]
		},
		6: {
			g: {
				dp: {
					p: [
						"003",
						"124",
						"155"
					]
				},
				ds: {
					p: [
						"000",
						"291",
						"180",
						"285",
						"288"
					]
				},
				np: {
					p: [
						"000",
						"001"
					]
				},
				ns: {
					p: [
						"192",
						"199",
						"222"
					]
				},
			},
			s: [
				{
					t: "Dolore unilaterale",
					d: "Trattare preferibilmente il padiglione omolaterale al dolore",
					p: [
						"000",
						"003",
						"291",
						"285",
						"288",
						"124",
						"180",
						"155"
					]
				},
				{
					t: "Sindrome vertiginosa",
					p: [
						{
							t: "Linea delle vertigini",
							p: [
								"148",
								"000",
								"272"
							],
							l: "LIN_VERT"
						}
					]
				},
				{
					t: "Dolore irradiato all'arto superiore",
					p: [
						"230",
						"148",
						"147",
						"120",
						"272",
						"273",
						"222"
					]
				}
			]
		},
		7: {
			g: {
				dp: {
					p: [
						"003",
						"124",
						"155"
					]
				},
				ds: {
					p: [
						"000",
						"180",
						"286",
						"289"
					]
				},
				np: {
					p: [
						"000",
						"001"
					]
				},
				ns: {
					p: [
						"192",
						"199",
						"222"
					]
				},
			},
			s: [
				{
					t: "Dolore unilaterale",
					d: "Trattare preferibilmente il padiglione omolaterale al dolore",
					p: [
						"000",
						"003",
						"286",
						"289",
						"124",
						"180",
						"155"
					]
				}
			]
		},
		8: {
			g: {
				dp: {
					p: [
						"003",
						"124",
						"155"
					]
				},
				ds: {
					p: [
						"000",
						"067",
						"180",
						"287",
						"282",
						"261"
					]
				},
				np: {
					p: [
						"000",
						"001"
					]
				},
				ns: {
					p: [
						"192",
						"199",
						"222"
					]
				},
			},
			s: [
				{
					t: "Dolore unilaterale",
					d: "Trattare preferibilmente il padiglione omolaterale al dolore",
					p: [
						"000",
						"003",
						"067",
						"287",
						"282",
						"124",
						"180",
						"155"
					]
				},
				{
					t: "Irradiazione alle natiche",
					p: [
						"058",
						"222"
					]
				},
				{
					t: "Infiammazione",
					p: [
						"165",
						"026",
						{
							t: "Triade antinfiammatoria",
							p: [
								"003",
								"165",
								"039"
							],
							l: "TAN"
						}
					]
				}
			]
		},
		9: {
			g: {
				dp: {
					p: [
						"003",
						"000",
						"155"
					]
				},
				ds: {
					p: [
						"124",
						"254",
						"[]Punti neuroriflessi sulle superfici anteriore mediale corrispondenti alle aree di maggior dolore *"
					]
				},
				np: {
					p: [
						"001",
						"124",
						"254"
					]
				},
				ns: {
					p: [
						"170"
					]
				},
				d: "* Per individuare la zona più sensibile utilizzare la palpazione manuale utilizzando indice e pollice e in seguito il Palpeur azzurro sulla superficie laterale e quello nero sulla superficie mediale. Per la detezione inizialmente si deve effettuare la manovra di strisciamento e in seguito la manovra barestesica, fino a trovare i punti più sensibili."
			},
			s: [
				{
					t: "Dolore unilaterale",
					d: "Trattare preferibilmente il padiglione omolaterale al dolore",
					p: [
						"001",
						"003",
						"124",
						"254",
						"[]Punti neuroriflessi sulle superfici anteriore mediale corrispondenti alle aree di maggior dolore.",
						"155"
					]
				},
				{
					t: "Componente depressiva",
					d: "Scegliere uno dei due punti, preferibilmente sul lato non dominante.",
					p: [
						"173",
						"184"
					]
				}
			]
		},
		10: {
			g: {
				dp: {
					p: [
						"000",
						"003",
						"155"
					]
				},
				ds: {
					p: [
						"039",
						"072",
						"284",
						"261"
					]
				},
				np: {
					p: [
						"001",
						"192"
					]
				},
				ns: {
					p: [
						"199"
					]
				},
			},
			s: [
				{
					t: "Infiammazione",
					p: [
						"165",
						"026",
						{
							t: "Triade antinfiammatoria",
							p: [
								"003",
								"165",
								"039"
							],
							l: "TAN"
						}
					]
				},
				{
					t: "Componente ansiosa",
					p: [
						{
							t: "Triade di relax",
							p: [
								"001",
								"222",
								"254"
							],
							l: "TRE"
						},
						"137",
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						}
					]
				}
			]
		},
		11: {
			g: {
				dp: {
					p: [
						"003",
						"049",
						"155"
					]
				},
				ds: {
					p: [
						"120",
						"048",
						"047",
						"273"
					]
				},
				np: {
					p: [
						"001",
						"000"
					]
				},
				ns: {
					p: [
						"268"
					]
				},
			},
			s: [
				{
					t: "Dolore unilaterale",
					d: "Trattare preferibilmente il padiglione omolaterale al dolore",
					p: [
						"000",
						"003",
						"049",
						"048",
						"047",
						"273",
						"155"
					]
				},
				{
					t: "Infiammazione / capsulite adesiva",
					p: [
						"165",
						"026",
						{
							t: "Triade antinfiammatoria",
							p: [
								"003",
								"165",
								"039"
							],
							l: "TAN"
						}
					]
				},
				{
					t: "Componente ansiosa",
					p: [
						{
							t: "Triade di relax",
							p: [
								"001",
								"222",
								"254"
							],
							l: "TRE"
						},
						"137",
						"192",
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						}
					]
				},
				{
					t: "Contrattura muscolare",
					p: [
						"124",
						"246"
					]
				},
				{
					t: "Componente depressiva",
					p: [
						"173"
					]
				}
			]
		},
		12: {
			g: {
				dp: {
					p: [
						"003",
						"054",
						"155"
					]
				},
				ds: {
					p: [
						"120",
						"257",
						"053"
					]
				},
				np: {
					p: [
						"001",
						"000"
					]
				},
				ns: {
					p: [
						
					]
				},
			},
			s: [
				{
					t: "Dolore unilaterale",
					d: "Trattare preferibilmente il padiglione omolaterale al dolore",
					p: [
						"000",
						"003",
						"054",
						"053",
						"120",
						"273",
						"155"
					]
				},
				{
					t: "Infiammazione",
					p: [
						"165",
						"026",
						{
							t: "Triade antinfiammatoria",
							p: [
								"003",
								"165",
								"039"
							],
							l: "TAN"
						}
					]
				},
				{
					t: "Componente ansiosa",
					p: [
						{
							t: "Triade di relax",
							p: [
								"001",
								"222",
								"254"
							],
							l: "TRE"
						},
						"137",
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						}
					]
				}
			]
		},
		13: {
			g: {
				dp: {
					p: [
						"003",
						"065",
						"073",
						"155"
					]
				},
				ds: {
					p: [
						"268",
						["084","083"],
						"017"
					]
				},
				np: {
					p: [
						"001",
						"000"
					]
				},
				ns: {
					p: [
						"262",
						"192"
					]
				},
			},
			s: [
				{
					t: "Dolore unilaterale",
					d: "Trattare preferibilmente il padiglione omolaterale al dolore",
					p: [
						"000",
						"003",
						"065",
						"073",
						["084","083"],
						"017",
						"039",
						"155"
					]
				},
				{
					t: "Infiammazione",
					p: [
						"165",
						"026",
						{
							t: "Triade antinfiammatoria",
							p: [
								"003",
								"165",
								"039"
							],
							l: "TAN"
						}
					]
				},
				{
					t: "Componente ansiosa",
					p: [
						{
							t: "Triade di relax",
							p: [
								"001",
								"222",
								"254"
							],
							l: "TRE"
						},
						"137",
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						}
					]
				}
			]
		},
		14: {
			g: {
				dp: {
					p: [
						"003",
						["060","075"],
						"155"
					]
				},
				ds: {
					p: [
						"268",
						"254",
						["264","265"]
					]
				},
				np: {
					p: [
						"001",
						"000"
					]
				},
				ns: {
					p: [
						"254"
					]
				},
			},
			s: [
				{
					t: "Dolore unilaterale",
					d: "Trattare preferibilmente il padiglione omolaterale al dolore",
					p: [
						"000",
						"003",
						["060","075"],
						["264","265"],
						"039",
						"155"
					]
				},
				{
					t: "Infiammazione",
					p: [
						"165",
						"026",
						{
							t: "Triade antinfiammatoria",
							p: [
								"003",
								"165",
								"039"
							],
							l: "TAN"
						}
					]
				},
				{
					t: "Contrattura muscolare",
					p: [
						"124",
						["264","265"]
					]
				},
				{
					t: "Componente ansiosa",
					p: [
						{
							t: "Triade di relax",
							p: [
								"001",
								"222",
								"254"
							],
							l: "TRE"
						},
						"137",
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						}
					]
				}
			]
		},
		15: {
			g: {
				dp: {
					p: [
						"003",
						["068","033"],
						"155"
					]
				},
				ds: {
					p: [
						"268",
						"254",
						["256","255"]
					]
				},
				np: {
					p: [
						"001",
						"000"
					]
				},
				ns: {
					p: [
						"254"
					]
				},
			},
			s: [
				{
					t: "Dolore unilaterale",
					d: "Trattare preferibilmente il padiglione omolaterale al dolore",
					p: [
						"000",
						"003",
						["068","033"],
						["256","255"],
						"039",
						"155"
					]
				},
				{
					t: "Infiammazione",
					p: [
						"165",
						"026",
						{
							t: "Triade antinfiammatoria",
							p: [
								"003",
								"165",
								"039"
							],
							l: "TAN"
						}
					]
				},
				{
					t: "Contrattura muscolare",
					p: [
						"124",
						["256","255"]
					]
				},
				{
					t: "Componente ansiosa",
					p: [
						{
							t: "Triade di relax",
							p: [
								"001",
								"222",
								"254"
							],
							l: "TRE"
						},
						"137",
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						}
					]
				}
			]
		},
		16: {
			g: {
				dp: {
					p: [
						"003",
						["081","032"],
						["029","040"],
						["028","038"],
						"155"
					]
				},
				ds: {
					p: [
						"268",
						["248","247"]
					]
				},
				np: {
					p: [
						"001",
						"000"
					]
				},
				ns: {
					p: [
						"124"
					]
				},
			},
			s: [
				{
					t: "Dolore unilaterale",
					d: "Trattare preferibilmente il padiglione omolaterale al dolore",
					p: [
						"000",
						"003",
						["081","032"],
						["029","040"],
						["028","038"],
						["248","247"],
						"039",
						"155"
					]
				},
				{
					t: "Infiammazione",
					p: [
						"165",
						"026",
						{
							t: "Triade antinfiammatoria",
							p: [
								"003",
								"165",
								"039"
							],
							l: "TAN"
						}
					]
				},
				{
					t: "Distorsione",
					p: [
						"253"
					]
				},
				{
					t: "Componente ansiosa",
					p: [
						{
							t: "Triade di relax",
							p: [
								"001",
								"222",
								"254"
							],
							l: "TRE"
						},
						"137",
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						}
					]
				}
			]
		},
		17: {
			g: {
				dp: {
					p: [
						"230",
						"276",
						"155"
					]
				},
				ds: {
					p: [
						"120",
						"222",
						["277","069"],
						"273",
						"272",
						"270",
						"269"
					]
				},
				np: {
					p: [
						"001",
						"000"
					]
				},
				ns: {
					p: [
						"003",
						"170"
					]
				},
			},
			s: [
				{
					t: "Dolore unilaterale",
					d: "Trattare preferibilmente il padiglione omolaterale al dolore",
					p: [
						"000",
						"230",
						["277","069"],
						"273",
						"272",
						"270",
						"269",
						"222",
						"155"
					]
				},
				{
					t: "Infiammazione",
					p: [
						"165",
						"026",
						{
							t: "Triade antinfiammatoria",
							p: [
								"003",
								"165",
								"039"
							],
							l: "TAN"
						}
					]
				},
				{
					t: "Contrattura muscolare",
					p: [
						"124",
						"288",
						"285"
					]
				},
				{
					t: "Componente ansiosa",
					p: [
						{
							t: "Triade di relax",
							p: [
								"001",
								"222",
								"254"
							],
							l: "TRE"
						},
						"137",
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						}
					]
				},
				{
					t: "Componente depressiva",
					p: [
						"173",
						"184"
					]
				}
			]
		},
		18: {
			g: {
				dp: {
					p: [
						"230",
						"120",
						"222"
					]
				},
				ds: {
					p: [
						"155",
						"065",
						"258",
						"055",
						"259",
						["277","069"],
						"273"
					]
				},
				np: {
					p: [
						"001",
						"000"
					]
				},
				ns: {
					p: [
						"262"
					]
				},
			},
			s: [
				{
					t: "Dolore unilaterale",
					d: "Trattare preferibilmente il padiglione omolaterale al dolore",
					p: [
						"000",
						"230",
						"120",
						"222",
						"065",
						"258",
						"055",
						["277","069"],
						"273"
					]
				},
				{
					t: "Infiammazione",
					p: [
						"165",
						"026",
						{
							t: "Triade antinfiammatoria",
							p: [
								"003",
								"165",
								"039"
							],
							l: "TAN"
						}
					]
				},
				{
					t: "Componente ansiosa",
					p: [
						{
							t: "Triade di relax",
							p: [
								"001",
								"222",
								"254"
							],
							l: "TRE"
						},
						"137",
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						}
					]
				}
			]
		},
		19: {
			g: {
				dp: {
					p: [
						"230",
						"155",
						"276"
					]
				},
				ds: {
					p: [
						"261",
						["279","071"],
						"072",
						"274",
						"271"
					]
				},
				np: {
					p: [
						"001",
						"000"
					]
				},
				ns: {
					p: [
						"003",
						"170",
						"222"
					]
				},
			},
			s: [
				{
					t: "Dolore unilaterale",
					d: "Trattare preferibilmente il padiglione omolaterale al dolore",
					p: [
						"000",
						"230",
						["279","071"],
						"072",
						"274",
						"271",
						"155"
					]
				},
				{
					t: "Disestesie/parestesie",
					p: [
						"222"
					]
				},
				{
					t: "Infiammazione",
					p: [
						"165",
						"026",
						{
							t: "Triade antinfiammatoria",
							p: [
								"003",
								"165",
								"039"
							],
							l: "TAN"
						}
					]
				},
				{
					t: "Contrattura muscolare",
					p: [
						"124",
						"287",
						"282"
					]
				},
				{
					t: "Componente ansiosa",
					p: [
						{
							t: "Triade di relax",
							p: [
								"001",
								"222",
								"254"
							],
							l: "TRE"
						},
						"137",
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						}
					]
				},
				{
					t: "Componente depressiva",
					p: [
						"173",
						"184"
					]
				}
			]
		},
		20: {
			g: {
				dp: {
					p: [
						"003",
						"165",
						"155"
					]
				},
				ds: {
					p: [
						"229",
						"[]Area riflessa corrispondente alla zona di maggior dolore*"
					]
				},
				np: {
					p: [
						"001",
						"000"
					]
				},
				ns: {
					p: [
						"003"
					]
				},
				d: "*In base alla somatotopia, ricercare l'area corrispondente più sensibile alla detezione barestesica."
			},
			s: [
				{
					t: "Dolore unilaterale",
					d: "Trattare preferibilmente il padiglione omolaterale al dolore",
					p: [
						"000",
						"003",
						"[]Area riflessa corrispondente alla zona di maggior dolore",
						"039",
						"155"
					]
				},
				{
					t: "Riacutizzazione",
					d: "Sul lato dominante",
					p: [
						{
							t: "Triade antinfiammatoria",
							p: [
								"003",
								"165",
								"039"
							],
							l: "TAN"
						}
					]
				},
				{
					t: "Contrattura muscolare",
					p: [
						"124",
						"[]Punti muscolari corrispondenti alla zona interessata",
					]
				},
				{
					t: "Componente ansiosa",
					p: [
						{
							t: "Triade di relax",
							p: [
								"001",
								"222",
								"254"
							],
							l: "TRE"
						},
						"137",
						"192",
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						}
					]
				},
				{
					t: "Componente depressiva",
					p: [
						"173",
						"184"
					]
				}
			]
		},
		21: {
			g: {
				dp: {
					p: [
						"003",
						"165",
						"155"
					]
				},
				ds: {
					p: [
						"000",
						"004",
						"039",
						"[]Area riflessa corrispondente alla zona di maggior dolore*"
					]
				},
				np: {
					p: [
						"001",
						"000"
					]
				},
				ns: {
					p: [
						"230",
						"003",
						"104",
						"137",
						"192"
					]
				},
				d: "*In base alla somatotopia, ricercare l'area corrispondente più sensibile alla detezione barestesica."
			},
			s: [
				{
					t: "Dolore unilaterale",
					d: "Trattare preferibilmente il padiglione omolaterale al dolore",
					p: [
						"000",
						"230",
						"003",
						"[]Area riflessa corrispondente alla zona di maggior dolore",
						"039",
						"155"
					]
				},
				{
					t: "Riacutizzazione",
					d: "Sul lato dominante",
					p: [
						"165",
						"229",
						{
							t: "Triade antinfiammatoria",
							p: [
								"003",
								"165",
								"039"
							],
							l: "TAN"
						}
					]
				},
				{
					t: "Contrattura muscolare",
					p: [
						"124",
						"[]Punti muscolari corrispondenti alla zona interessata",
					]
				},
				{
					t: "Componente ansiosa",
					p: [
						{
							t: "Rilassamento neurovegetativo",
							p: [
								"001",
								"222",
								"000",
								"254"
							],
							l: "RIL_NEUR"
						},
						{
							t: "Triade di relax",
							p: [
								"001",
								"222",
								"254"
							],
							l: "TRE"
						}
					]
				},
				{
					t: "Componente depressiva",
					p: [
						"173",
						"184"
					]
				}
			]
		},
		22: {
			g: {
				dp: {
					p: [
						"230",
						"291",
						"155"
					]
				},
				ds: {
					p: [
						"000",
						"180",
						"285",
						"288",
						["277","069"],
						"A seconda della localizzazione del dolore:",
						"177",
						"179",
						"202"
					]
				},
				np: {
					p: [
						"001",
						"000"
					]
				},
				ns: {
					p: [
						"004"
					]
				},
			},
			s: [
				{
					t: "Dolore unilaterale",
					d: "Trattare preferibilmente il padiglione omolaterale al dolore",
					p: [
						"000",
						"230",
						"291",
						"180",
						"177",
						"179",
						"202",
						"155"
					]
				},
				{
					t: "Contrattura muscolare",
					p: [
						"124",
						"288"
					]
				},
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"137",
						"192",
						{
							t: "Triade di relax",
							p: [
								"001",
								"222",
								"254"
							],
							l: "TRE"
						}
					]
				},
				{
					t: "Componente depressiva",
					d: "Lato non dominante",
					p: [
						"173"
					]
				}
			]
		},
		23: {
			g: {
				dp: {
					p: [
						"230",
						"180",
						"155"
					]
				},
				ds: {
					p: [
						"001",
						"003",
						"014",
						"A seconda della localizzazione del dolore:",
						"179",
						"202",
						"151"
					]
				},
				np: {
					p: [
						"001",
						"000"
					]
				},
				ns: {
					p: [
						"039",
						"170"
					]
				},
			},
			s: [
				{
					t: "Dolore bilaterale diffuso",
					d: "Se sensibili, eseguire su entrambi i lati.",
					p: [
						"001",
						"180",
						"230"
					]
				},
				{
					t: "Contrattura muscolare",
					p: [
						"124",
						"288"
					]
				},
				{
					t: "Componente ansiosa e stress",
					p: [
						{
							t: "Triade di relax",
							p: [
								"001",
								"222",
								"254"
							],
							l: "TRE"
						},
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						},
						"199"
					]
				},
				{
					t: "Componente endocrina/ormonale",
					p: [
						"164",
						"262"
					]
				}
			]
		},
		24: {
			g: {
				dp: {
					p: [
						"230",
						"180",
						"155"
					]
				},
				ds: {
					p: [
						"000",
						"165",
						"003",
						"283",
						"014",
						"A seconda della localizzazione del dolore:",
						"179",
						"202",
						"151"
					]
				},
				np: {
					p: [
						"001",
						"000"
					]
				},
				ns: {
					p: [
						"039",
						"199"
					]
				},
			},
			s: [
				{
					t: "Componente ansiosa e stress",
					d: "Trattare preferibilmente il padiglione controlaterale al dolore",
					p: [
						"137",
						{
							t: "Triade di relax",
							p: [
								"001",
								"222",
								"254"
							],
							l: "TRE"
						},
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						},
						"004"
					]
				}
			]
		},
		25: {
			g: {
				dp: {
					p: [
						"230",
						"215",
						"003"
					]
				},
				ds: {
					p: [
						"165",
						"268",
						"154",
						"003",
						"281",
						"280",
						"266"
					]
				},
				np: {
					p: [
						"001",
						"000"
					]
				},
				ns: {
					p: [
						"230"
					]
				},
			},
			s: [
				{
					t: "Infiammazione",
					d: "Sul lato dominante",
					p: [
						"026"
					]
				},
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						{
							t: "Triade di relax",
							p: [
								"001",
								"222",
								"254"
							],
							l: "TRE"
						},
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						}
					]
				}
			]
		},
		26: {
			g: {
				dp: {
					p: [
						"003",
						"202",
						"155"
					]
				},
				ds: {
					p: [
						"002",
						"165",
						"039",
						"166",
						"275"
					]
				},
				np: {
					p: [
						"001",
						"000"
					]
				},
				ns: {
					p: [
						"137",
						"003"
					]
				},
			},
			s: [
				{
					t: "Componente allergica",
					d: "Sul lato dominante",
					p: [
						"078",
						"180"
					]
				},
				{
					t: "Miscellanea",
					d: "Sul lato non dominante",
					p: [
						["244","249"],
						"195"
					]
				}
			]
		},
		27: {
			g: {
				dp: {
					p: [
						"003",
						"174",
						"155"
					]
				},
				ds: {
					p: [
						"039",
						"268",
						"281",
						"179"
					]
				},
				np: {
					p: [
						"001",
						"000"
					]
				},
				ns: {
					p: [
						"222",
						"254"
					]
				},
			},
			s: [
				{
					t: "Contrattura muscolare",
					d: "Sul lato dominante",
					p: [
						"124"
					]
				},
				{
					t: "Se associata a patologia cervicale",
					d: "Sul lato dominante",
					p: [
						["277","069"],
						"291"
					]
				},
				{
					t: "Componente depressiva/ansiosa",
					d: "Sul lato non dominante",
					p: [
						"173",
						{
							t: "Triade modificata",
							p: [
								"001",
								"174",
								"254"
							]
						},
						{
							t: "Triade adattata",
							p: [
								"001",
								"222",
								"254",
								"174"
							]
						}
					]
				}
			]
		},
		28: {
			g: {
				dp: {
					p: [
						{
							t: "Rilassamento neurovegetativo",
							p: [
								"001",
								"222",
								"000",
								"254"
							],
							l: "RIL_NEUR"
						},
						"001",
						"222",
						"000",
						"254"
					]
				},
				ds: {
					p: [
						"230",
						"030",
						"174",
						"281",
						"179",
						"283"
					]
				},
				np: {
					p: [
						"001",
						"137",
						"173"
					]
				},
				ns: {
					p: [
						"192"
					]
				},
			},
			s: [
				{
					t: "Contrattura muscolare",
					d: "Sul lato dominante",
					p: [
						"124"
					]
				},
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						},
						"045",
						"245",
						"195"
					]
				}
			]
		},
		29: {
			g: {
				dp: {
					p: [
						"230",
						"215",
						"003"
					]
				},
				ds: {
					p: [
						"004",
						"030",
						"039",
						"266",
						"283",
						"213"
					]
				},
				np: {
					p: [
						"001",
						"137"
					]
				},
				ns: {
					p: [
						"000",
						"222",
						"199",
						"173"
					]
				},
			},
			s: [
				{
					t: "Contrattura muscolare",
					d: "Sul lato dominante",
					p: [
						"124"
					]
				},
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"192",
						"137"
					]
				}
			]
		},
		30: {
			g: {
				dp: {
					p: [
						"230",
						"283",
						"155"
					]
				},
				ds: {
					p: [
						"000",
						"039",
						"215",
						"202",
						"281",
						"280"
					]
				},
				np: {
					p: [
						"001",
						"222"
					]
				},
				ns: {
					p: [
						"137"
					]
				},
				d: "In caso di resistenza alla terapia, la Linea trigeminale può essere elettrostimolata. Se il problema non si attenua entro 2 o 3 sedute, applicare 2 aghi omolateralmente al dolore, uno sulla superficie laterale (lato sensitivo) e l'altro sulla superficie mediale (lato motorio) del lobulo ed elettrostimolarli a 15Hz per 20 minuti."
			},
			s: [
				{
					t: "Contrattura muscolare",
					d: "Sul lato dominante",
					p: [
						"291"
					]
				},
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						}
					]
				},
				{
					t: "Componente depressiva",
					d: "Sul lato non dominante",
					p: [
						"173"
					]
				},
				{
					t: "Infiammazione",
					d: "Sul lato dominante",
					p: [
						"165",
						"026"
					]
				}
			]
		},
		31: {
			g: {
				dp: {
					p: [
						"230",
						"039",
						"155"
					]
				},
				ds: {
					p: [
						"164",
						"[]Avanmuro*",
						"[]Radice sensitiva *"
					]
				},
				np: {
					p: [
						"001",
						"222",
						"276"
					]
				},
				ns: {
					p: [
						"000",
						"137"
					]
				},
				d: "* Individuare il metamero dov'è rilevata la nevralgia, ispezionando preferibilmente il padiglione omolaterale e delimitare la possibile sede di rappresentazione della nevralgia (con il metodo della staffa sull'antelice). Ricercarne punti sensibili nell'avanmuro e le radici sensitive nell'elice. Se dopo 2 sedute la nevralgia non è migliorata si consiglia il trattamento con l'elettrostimolazione a 15Hz per almeno 20 minuti, collegando l'ago dell'avanmuro con l'ago della radice sensitiva, regolando l'intensità sulla soglia di dolore del paziente."
			},
			s: [
				{
					t: "Infiammazione",
					d: "Sul lato dominante",
					p: [
						"026"
					]
				},
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"230",
						{
							t: "Triade di relax",
							p: [
								"001",
								"222",
								"254"
							],
							l: "TRE"
						}
					]
				},
				{
					t: "Componente depressiva",
					d: "Sul lato non dominante",
					p: [
						"045",
						"245"
					]
				}
			]
		},
		32: {
			g: {
				dp: {
					p: [
						"000",
						"039",
						"155"
					]
				},
				ds: {
					p: [
						"154",
						"222",
						"165",
						"151",
						"[]Radice motoria e sensitiva corrispondenti*",
						"[]Ganglio corrispondente**"
					]
				},
				np: {
					p: [
						"001",
						"230",
						"137"
					]
				},
				ns: {
					p: [
						"039",
						"154"
					]
				},
				d: "* Ricercare sull'elice i punti sensibili.<br>** A seconda del livello metamerico della nevralgia periferica, ricercare un punto dolente alla palpazione barestesica nell'avanmuro dell'antelice."
			},
			s: [
				{
					t: "Infiammazione",
					d: "Sul lato dominante",
					p: [
						"229",
						"165",
						"026"
					]
				},
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						{
							t: "Triade adattata",
							p: [
								"001",
								"222",
								"254",
								"[]Radice sensitiva interessata"
							]
						}
					]
				}
			]
		},
		33: {
			g: {
				dp: {
					p: [
						"000",
						"215",
						"155"
					]
				},
				ds: {
					p: [
						"230",
						"165",
						"104",
						"283",
						"266",
						["209","211"]
					]
				},
				np: {
					p: [
						"001",
						"230",
						"004"
					]
				},
				ns: {
					p: [
						"222",
						"192"
					]
				},
			},
			s: [
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						{
							t: "Triade di relax",
							p: [
								"001",
								"222",
								"254"
							],
							l: "TRE"
						},
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						},
						{
							t: "Rilassamento neurovegetativo bilaterale",
							p: [
								"001",
								"222",
								"000",
								"254"
							],
							l: "RIL_NEUR"
						}
					]
				}
			]
		},
		34: {
			g: {
				dp: {
					p: [
						"230",
						"039",
						"104"
					]
				},
				ds: {
					p: [
						"003",
						"165",
						"232",
						"166",
						"185"
					]
				},
				np: {
					p: [
						"001",
						"000"
					]
				},
				ns: {
					p: [
						"230"
					]
				},
				d: "Se alla stimolazione del punto Omega 2 non si trae beneficio, trasfiggere l'elice in modo da andare a stimolare anche la superficie interna dove si trova il punto Allergia 2"
			},
			s: [
				{
					t: "Componente allergica/infiammatoria",
					d: "Sul lato dominante",
					p: [
						"026",
						"078"
					]
				},
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						}
					]
				},
				{
					t: "Miscellanea",
					p: [
						"157"
					]
				}
			]
		},
		35: {
			g: {
				dp: {
					p: [
						"003",
						"276",
						"155"
					]
				},
				ds: {
					p: [
						"268",
						"170",
						"120",
						"273",
						"270"
					]
				},
				np: {
					p: [
						"001",
						"000",
						"039"
					]
				},
				ns: {
					p: [
						"192",
						"261",
						"274",
						"271"
					]
				}
			},
			s: [
				{
					t: "Infiammazione",
					d: "Sul lato dominante",
					p: [
						"165",
						"229"
					]
				},
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						}
					]
				},
				{
					t: "Miscellanea",
					p: [
						"222",
						"157",
						"143"
					],
					"a": "Bernard Leclerc descrive la bandelletta neurovegetativa inserendo questi 3 punti, che si trovano posizionati in senso antero-posteriore nell'area di passaggio tra emiconca inferiore e faccia interna dell'antitrago."
				}
			]
		},
		36: {
			g: {
				dp: {
					p: [
						"003",
						"276",
						"155"
					]
				},
				ds: {
					p: [
						"230",
						"039",
						"165",
						"[]Area somatotopica corrispondente al dolore",
						"120",
						"273",
						"270"
					]
				},
				np: {
					p: [
						"001",
						"000"
					]
				},
				ns: {
					p: [
						"180",
						"222",
						"[]Area somatotopica corrispondente al dolore",
						"261",
						"274",
						"271"
					]
				},
			},
			s: [
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"192",
						{
							t: "Triade di relax",
							p: [
								"001",
								"222",
								"254"
							],
							l: "TRE"
						},
						{
							t: "Triade modificata",
							p: [
								"001",
								"[]Area somatotopica corrispondente al dolore",
								"254"
							]
						},
						"199"
					]
				},
				{
					t: "Componente depressiva",
					p: [
						"173"
					]
				}
			]
		},
		37: {
			g: {
				dp: {
					p: [
						"230",
						"004",
						"003"
					]
				},
				ds: {
					p: [
						"155",
						"039",
						"170",
						"[]Aree corrispondente alle zone di maggior dolore"
					]
				},
				np: {
					p: [
						"000",
						"030",
						"184"
					]
				},
				ns: {
					p: [
						"001",
						"137",
						"170"
					]
				},
			},
			s: [
				{
					t: "Contrattura muscolare",
					d: "Sul lato dominante",
					p: [
						"124"
					]
				},
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						{
							t: "Triade di relax",
							p: [
								"001",
								"222",
								"254"
							],
							l: "TRE"
						},
						"192",
						{
							t: "Rilassamento neurovegetativo",
							p: [
								"001",
								"222",
								"000",
								"254"
							],
							l: "RIL_NEUR"
						}
					]
				},
				{
					t: "Componente depressiva",
					d: "Sul lato non dominante",
					p: [
						"173"
					]
				},
				{
					t: "Disturbi vegetativi",
					p: [
						"039",
						"157",
						"143"
					],
					"a": "N.B. Schema da applicare come protocollo completo su un padiglione al posto delle proposte precedenti. Eseguirlo ciclicamente ogni 2 o 3 sedute."
				}
			]
		},
		38: {
			g: {
				dp: {
					p: [
						"230",
						"004",
						"254"
					]
				},
				ds: {
					p: [
						"154",
						"207",
						"142",
						"291",
						"151"
					]
				},
				np: {
					p: [
						"000",
						"030",
						"254"
					]
				},
				ns: {
					p: [
						"001",
						"154",
						"170",
						"199"
					]
				},
			},
			s: [
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						{
							t: "Triade modificata bilaterale",
							p: [
								"001",
								"[]Punto sensibile *",
								"254"
							],
							l: "TRE"
						},
						"* Ispezionare tutta l'area e individuare quella più sensibile"
					]
				},
				{
					t: "Miscellanea",
					p: [
						{
							t: "Linea delle commessure",
							p: [
								"254"
							]
						}
					],
					"a": "N.B. Schema da applicare come protocollo completo su entrambi i padiglioni ed eseguito ciclicamente"
				}
			]
		},
		39: {
			g: {
				dp: {
					p: [
						"003",
						"039",
						"268"
					]
				},
				ds: {
					p: [
						"195",
						"165",
						"151",
						"273",
						"270",
						"274",
						"271"
					]
				},
				np: {
					p: [
						"030",
						"000",
						"222"
					]
				},
				ns: {
					p: [
						"001",
						"195"
					]
				},
			},
			s: [
				{
					t: "Contrattura muscolare",
					d: "Sul lato dominante",
					p: [
						"124"
					]
				},
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						{
							t: "Triade adattata",
							p: [
								"001",
								"222",
								"254",
								"[]Area sensibile*"
							]
						}
					],
					"a": "* Ispezionare tutta l'area e individuare l'area più sensibile"
				}
			]
		},
		40: {
			g: {
				dp: {
					p: [
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						}
					]
				},
				ds: {
					p: [
						"039",
						"154",
						"151",
						"184",
						"117",
						"150"
					]
				},
				np: {
					p: [
						{
							t: "Rilassamento neurovegetativo",
							p: [
								"001",
								"222",
								"000",
								"254"
							],
							l: "RIL_NEUR"
						}
					]
				},
				ns: {
					p: [
						"000",
						"154",
						"230"
					]
				},
				d: "N.B L'affaticamento è il sintomo per il quale i pazienti si sottopongono ad agopuntura, la quale risulta molto efficace nel ridurne l'intensità."
			},
			s: [
				{
					t: "Contrattura muscolare",
					d: "Sul lato dominante",
					p: [
						"124"
					]
				},
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"030",
						"137",
						"192",
						"173"
					]
				},
				{
					t: "Miscellanea",
					p: [
						"268",
						"165"
					]
				}
			]
		},
		41: {
			g: {
				dp: {
					p: [
						"003",
						"039",
						"165"
					]
				},
				ds: {
					p: [
						"154",
						"151"
					]
				},
				np: {
					p: [
						"000",
						"001",
						"230"
					]
				},
				ns: {
					p: [
						"142"
					]
				}
			},
			s: [
				{
					t: "In caso di ipertensione",
					d: "Sul lato dominante",
					p: [
						"030",
						"192",
						"243",
						"056"
					]
				},
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						{
							t: "Triade adattata",
							p: [
								"001",
								"222",
								"254",
								"056"
							]
						}
					]
				}
			]
		},
		42: {
			g: {
				dp: {
					p: [
						"230",
						"030",
						"192"
					]
				},
				ds: {
					p: [
						"142",
						"199",
						"111",
						"003"
					]
				},
				np: {
					p: [
						"000",
						"001",
						"137"
					]
				},
				ns: {
					p: [
						"230",
						"030"
					]
				}
			},
			s: [
				{
					t: "Componente depressiva",
					d: "Sul lato non dominante",
					p: [
						"173",
						"184"
					]
				},
				{
					t: "Miscellanea",
					p: [
						{
							t: "Triade di relax",
							p: [
								"001",
								"222",
								"254"
							],
							l: "TRE"
						},
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						}
					]
				}
			]
		},
		43: {
			g: {
				dp: {
					p: [
						"230",
						"129",
						"192"
					]
				},
				ds: {
					p: [
						"030",
						"137",
						"173",
						"199"
					]
				},
				np: {
					p: [
						"030",
						"000",
						"137"
					]
				},
				ns: {
					p: [
						"001",
						"013",
						"129"
					]
				}
			},
			s: [
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						{
							t: "Triade di relax",
							p: [
								"001",
								"222",
								"254"
							],
							l: "TRE"
						}
					]
				},
				{
					t: "Miscellanea",
					p: [
						"150",
						"039",
						"004"
					]
				}
			]
		},
		44: {
			g: {
				dp: {
					p: [
						"137",
						"001",
						"230"
					]
				},
				ds: {
					p: [
						"192",
						"039",
						"030",
						"121",
						"In uno studio sullo stress, Marco Romoli ha notato che i punti che si evidenziano maggiormente nel padiglione, e che quindi sono sensibili alla detezione, sono SanJiao e il punto Fegato, quest'ultimo posizionato sul solo padiglione destro."
					]
				},
				np: {
					p: [
						"030",
						"000",
						"013"
					]
				},
				ns: {
					p: [
						"001"
					]
				}
			},
			s: [
				{
					t: "Componente depressiva",
					d: "Sul lato dominante",
					p: [
						"111",
						"173"
					]
				},
				{
					t: "Componente ansiosa / somatizzazione",
					d: "Sul lato non dominante",
					p: [
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						},
						{
							t: "Triade di relax",
							p: [
								"001",
								"222",
								"254"
							],
							l: "TRE"
						},
						{
							t: "Rilassamento neurovegetativo",
							p: [
								"001",
								"222",
								"000",
								"254"
							],
							l: "RIL_NEUR"
						}
					]
				}
			]
		},
		45: {
			g: {
				dp: {
					p: [
						"030",
						"013",
						"184"
					]
				},
				ds: {
					p: [
						"230",
						"195",
						"137",
						"111",
						"121",
						"150"
					]
				},
				np: {
					p: [
						"001",
						"137",
						"173"
					]
				},
				ns: {
					p: [
						"000",
						"030"
					]
				}
			},
			s: [
				{
					t: "Insonnia",
					d: "Sul lato non dominante",
					p: [
						"045",
						"245"
					]
				},
				{
					t: "Miscellanea",
					p: [
						{
							t: "Schema di miglioramento dell'umore",
							p: [
								"030",
								"001",
								"137",
								"173"
							]
						}
					],
					a: "Proposto da Antonello Lovato, si tratta di un semplice schema molto utile per controllare l'ansia sia di stato sia di tratto e migliora l'umore. Dopo qualche seduta su entrambi i lati è possibile mantenere gli effetti trattando un solo lato, per lasciare spazio ad altri aspetti terapeutici. In alternativa lo si può ripetere a sedute alterne in maniera bilaterale."
				}
			]
		},
		46: {
			g: {
				dp: {
					p: [
						"003",
						"013",
						"230"
					]
				},
				ds: {
					p: [
						"195",
						"045",
						"245",
						"179",
						"202",
						"Tempia e Fronte sono ritenuti indicati in caso di insonnia dalla China Accademy, analogamente al punto Occipite per la depressione"
					]
				},
				np: {
					p: [
						"001",
						"195",
						"142"
					]
				},
				ns: {
					p: [
						"000",
						"030",
						"245"
					]
				}
			},
			s: [
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"030"
					],
					"a": "Essendo indicato per l'ansia di stato, questo punto può ricoprire il primo posto nello schema terapeutico come anche non essere preso in considerazione. Tutto dipende dall'anamnesi."
				},
				{
					t: "Miscellanea",
					p: [
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						},
						"150",
						{
							t: "Triade di relax",
							p: [
								"001",
								"222",
								"254"
							],
							l: "TRE"
						},
						{
							t: "Rilassamento neurovegetativo",
							p: [
								"001",
								"222",
								"000",
								"254"
							],
							l: "RIL_NEUR"
						}
					]
				}
			]
		},
		47: {
			g: {
				dp: {
					p: [
						"230",
						"137",
						"267"
					]
				},
				ds: {
					p: [
						"192",
						"142"
					]
				},
				np: {
					p: [
						"000",
						"001",
						"030"
					]
				},
				ns: {
					p: [
						"191"
					]
				}
			},
			s: [
				{
					t: "Componente depressiva",
					p: [
						"173",
						"184",
						"111"
					]
				},
				{
					t: "Disturbo da attacchi di panico (DAP)",
					p: [
						"129",
						"013"
					]
				},
				{
					t: "Somatizzazione dell'ansia",
					p: [
						"004",
						{
							t: "Triade di relax",
							p: [
								"001",
								"222",
								"254"
							],
							l: "TRE"
						},
						{
							t: "Rilassamento neurovegetativo",
							p: [
								"001",
								"222",
								"000",
								"254"
							],
							l: "RIL_NEUR"
						},
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						}
					]
				}
			]
		},
		48: {
			g: {
				dp: {
					p: [
						"104",
						"041",
						"164"
					]
				},
				ds: {
					p: [
						"039",
						"135",
						"142"
					]
				},
				np: {
					p: [
						"041",
						"000"
					]
				},
				ns: {
					p: [
						"001",
						"230"
					]
				}
			},
			s: [
				{
					t: "Ipotiroidismo",
					p: [
						"268",
						"154"
					]
				},
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						},
						{
							t: "Triade di relax",
							p: [
								"001",
								"222",
								"254"
							],
							l: "TRE"
						},
						"137"
					]
				}
			]
		},
		49: {
			g: {
				dp: {
					p: [
						"230",
						"215",
						"195"
					]
				},
				ds: {
					p: [
						"104",
						"164",
						"165",
						"041",
						"159",
						"097"
					]
				},
				np: {
					p: [
						"000",
						"001"
					]
				},
				ns: {
					p: [
						"039",
						"230"
					]
				}
			},
			s: [
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"137",
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						}
					]
				},
				{
					t: "Miscellanea",
					p: [
						"039",
						"157",
						"143"
					]
				}
			]
		},
		50: {
			g: {
				dp: {
					p: [
						"230",
						"061",
						"155"
					]
				},
				ds: {
					p: [
						"003",
						"104",
						"039",
						"222",
						"067",
						"108",
						["031","085"],
						"106"
					]
				},
				np: {
					p: [
						"000",
						"001"
					]
				},
				ns: {
					p: [
						"180",
						"039"
					]
				}
			},
			s: [
				{
					t: "Contrattura muscolare",
					d: "Sul lato dominante",
					p: [
						"124"
					]
				},
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"013",
						"030",
						{
							t: "Rilassamento neurovegetativo",
							p: [
								"001",
								"222",
								"000",
								"254"
							],
							l: "RIL_NEUR"
						}
					]
				},
				{
					t: "Miscellanea",
					p: [
						"165",
						"222"
					]
				}
			]
		},
		51: {
			g: {
				dp: {
					p: [
						"000",
						"003",
						"164"
					]
				},
				ds: {
					p: [
						"155",
						"039",
						"180",
						["031","085"],
						"262",
						"159",
						"097"
					]
				},
				np: {
					p: [
						"001",
						"104"
					]
				},
				ns: {
					p: [
						"000",
						"039"
					]
				}
			},
			s: [
				{
					t: "Contrattura muscolare",
					d: "Sul lato dominante",
					p: [
						"124"
					]
				},
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"173",
						"030",
						"013",
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						}
					]
				},
				{
					t: "Miscellanea",
					p: [
						"165",
						"195"
					]
				}
			]
		},
		52: {
			g: {
				dp: {
					p: [
						"003",
						"039",
						"157"
					]
				},
				ds: {
					p: [
						"164",
						"039",
						"230",
						"104",
						"262",
						"159",
						"097",
						"031",
						"085"
					]
				},
				np: {
					p: [
						{
							t: "Triade modificata",
							p: [
								"001",
								"262",
								"254"
							]
						}
					]
				},
				ns: {
					p: [
						"000",
						"039",
						"199"
					]
				}
			},
			s: [
				{
					t: "Contrattura muscolare",
					d: "Sul lato dominante",
					p: [
						"124"
					]
				},
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"199",
						"030",
						"137"
					]
				},
				{
					t: "Miscellanea",
					p: [
						"143",
						"157",
						"195",
						"045",
						"245"
					]
				}
			]
		},
		53: {
			g: {
				dp: {
					p: [
						"104",
						"159",
						"097",
						"155"
					]
				},
				ds: {
					p: [
						"164",
						"039",
						"230",
						"004",
						"031",
						"085",
						"159",
						"097"
					]
				},
				np: {
					p: [
						"000",
						"001",
						"164"
					]
				},
				ns: {
					p: [
						"104",
						"262"
					]
				}
			},
			s: [
				{
					t: "Contrattura muscolare",
					d: "Sul lato dominante",
					p: [
						"124",
						"067"
					]
				},
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"199",
						"137",
						"192",
						"151"
					]
				},
				{
					t: "Miscellanea",
					p: [
						"262",
						"195"
					]
				}
			]
		},
		54: {
			g: {
				dp: {
					p: [
						"000",
						"030",
						"155"
					]
				},
				ds: {
					p: [
						"164",
						"039",
						"004",
						"031",
						"085",
						"159",
						"097",
						"009",
						"089",
						"061"
					]
				},
				np: {
					p: [
						"001",
						"104",
						"180"
					]
				},
				ns: {
					p: [
						"000",
						"222"
					]
				}
			},
			s: [
				{
					t: "Contrattura muscolare",
					d: "Sul lato dominante",
					p: [
						"124",
						"067"
					]
				},
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"199",
						"013",
						"192"
					]
				},
				{
					t: "Miscellanea",
					p: [
						"262",
						"195",
						"229"
					]
				}
			]
		},
		55: {
			g: {
				dp: {
					p: [
						"000",
						"093"
					]
				},
				ds: {
					p: [
						"221",
						"170",
						["092","123"]
					]
				},
				np: {
					p: [
						"000",
						"093"
					]
				},
				ns: {
					p: [
						"001",
						"013"
					]
				}
			},
			s: [
				{
					t: "Contrattura muscolare",
					d: "Sul lato dominante",
					p: [
						"124"
					]
				},
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"199",
						"137",
						"192"
					]
				},
				{
					t: "Miscellanea",
					p: [
						{
							t: "Rilassamento neurovegetativo",
							p: [
								"001",
								"222",
								"000",
								"254"
							],
							l: "RIL_NEUR"
						},
						"039",
						{
							t: "Triade di relax",
							p: [
								"001",
								"222",
								"254"
							],
							l: "TRE"
						},
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						}
					]
				}
			]
		},
		56: {
			g: {
				dp: {
					p: [
						"000",
						"061"
					]
				},
				ds: {
					p: [
						"039",
						"155",
						"195",
						"164",
						"031",
						"085"
					]
				},
				np: {
					p: [
						"001",
						"124"
					]
				},
				ns: {
					p: [
						"000",
						"155",
						"222"
					]
				}
			},
			s: [
				{
					t: "Contrattura muscolare",
					d: "Sul lato dominante",
					p: [
						"067"
					]
				},
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"030",
						"013"
					]
				},
				{
					t: "Miscellanea",
					p: [
						"003",
						"262",
						"229"
					]
				}
			]
		},
		57: {
			g: {
				dp: {
					p: [
						"104",
						"164",
						"230"
					]
				},
				ds: {
					p: [
						"003",
						"004",
						"031",
						"085",
						"159",
						"097"
					]
				},
				np: {
					p: [
						"001",
						"039",
						"013"
					]
				},
				ns: {
					p: [
						"000"
					]
				}
			},
			s: [
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"137",
						"199",
						"192"
					]
				},
				{
					t: "Miscellanea",
					p: [
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						},
						{
							t: "Triade modificata",
							p: [
								"001",
								"159",
								"097",
								"254"
							]
						}
					]
				}
			]
		},
		58: {
			g: {
				dp: {
					p: [
						"000",
						"089"
					]
				},
				ds: {
					p: [
						"164",
						"230",
						"039",
						"155",
						"009",
						"159",
						"097",
						"031",
						"085"
					]
				},
				np: {
					p: [
						"001",
						"089",
						"137"
					]
				},
				ns: {
					p: [
						"000"
					]
				}
			},
			s: [
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"199"
					]
				},
				{
					t: "Miscellanea",
					p: [
						"154",
						"151",
						"262"
					]
				}
			]
		},
		59: {
			g: {
				dp: {
					p: [
						"155",
						"222",
						"230"
					]
				},
				ds: {
					p: [
						"164",
						"023",
						"159",
						"097",
						"009",
						"089"
					]
				},
				np: {
					p: [
						"030",
						"137",
						"192"
					]
				},
				ns: {
					p: [
						"001",
						"000"
					]
				}
			},
			s: [
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						{
							t: "Triade di relax",
							p: [
								"001",
								"222",
								"254"
							],
							l: "TRE"
						},
						{
							t: "Triade adattata",
							p: [
								"001",
								"009",
								"089",
								"254"
							]
						},
						{
							t: "Rilassamento neurovegetativo",
							p: [
								"001",
								"222",
								"000",
								"254"
							],
							l: "RIL_NEUR"
						}
					]
				},
				{
					t: "Miscellanea",
					p: [
						"262"
					]
				}
			]
		},
		60: {
			g: {
				dp: {
					p: [
						"001",
						"106",
						"180"
					]
				},
				ds: {
					p: [
						"039",
						"111",
						"104",
						"008",
						"109",
						"251",
						"105"
					]
				},
				np: {
					p: [
						"000",
						"030",
						"117"
					]
				},
				ns: {
					p: [
						"003",
						"180"
					]
				}
			},
			s: [
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"013",
						"129",
						"199"
					]
				},
				{
					t: "Miscellanea",
					p: [
						"165",
						"262",
						"004"
					]
				}
			]
		},
		61: {
			g: {
				dp: {
					p: [
						"003",
						"111",
						"155"
					]
				},
				ds: {
					p: [
						"039",
						"104",
						"251",
						"105",
						"061"
					]
				},
				np: {
					p: [
						"001",
						"111",
						"124"
					]
				},
				ns: {
					p: [
						"000"
					]
				}
			},
			s: [
				{
					t: "Contrattura muscolare",
					d: "Sul lato dominante",
					p: [
						"067"
					]
				},
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"137",
						"030",
						"013",
						{
							t: "Triade di relax",
							p: [
								"001",
								"222",
								"254"
							],
							l: "TRE"
						},
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						}
					]
				}
			]
		},
		62: {
			g: {
				dp: {
					p: [
						"003",
						"106",
						"039"
					]
				},
				ds: {
					p: [
						"104",
						"157",
						"143",
						"230",
						"008",
						"109"
					]
				},
				np: {
					p: [
						"030",
						"106",
						"222"
					]
				},
				ns: {
					p: [
						"001",
						"000",
						"155"
					]
				}
			},
			s: [
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"030",
						"137",
						"192"
					]
				},
				{
					t: "Miscellanea",
					p: [
						"061",
						"039"
					]
				}
			]
		},
		63: {
			g: {
				dp: {
					p: [
						"003",
						"230",
						"106"
					]
				},
				ds: {
					p: [
						"039",
						"030",
						"108",
						"008",
						"109"
					]
				},
				np: {
					p: [
						"230",
						"030",
						"106"
					]
				},
				ns: {
					p: [
						"001",
						"000",
						"039"
					]
				}
			},
			s: [
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"137",
						"192",
						"013",
						{
							t: "Rilassamento neurovegetativo",
							p: [
								"001",
								"222",
								"000",
								"254"
							],
							l: "RIL_NEUR"
						}
					]
				},
				{
					t: "Miscellanea",
					p: [
						"262",
						"157",
						"143"
					]
				}
			]
		},
		64: {
			g: {
				dp: {
					p: [
						"001",
						"108",
						"155"
					]
				},
				ds: {
					p: [
						"164",
						"104",
						"061",
						"008",
						"109",
						"106"
					]
				},
				np: {
					p: [
						"000",
						"003",
						"108"
					]
				},
				ns: {
					p: [
						"001",
						"222",
						"180"
					]
				}
			},
			s: [
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"030",
						"137",
						"192",
						"013"
					]
				},
				{
					t: "Miscellanea",
					p: [
						"165",
						"262",
						"039"
					]
				}
			]
		},
		65: {
			g: {
				dp: {
					p: [
						"104",
						"093",
						"039"
					]
				},
				ds: {
					p: [
						"154",
						"222",
						"127",
						"101",
						"121"
					]
				},
				np: {
					p: [
						"001",
						"000",
						"137"
					]
				},
				ns: {
					p: [
						"192",
						"093"
					]
				}
			},
			s: [
				{
					t: "Contrattura muscolare",
					d: "Sul lato dominante",
					p: [
						"067"
					]
				},
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"137",
						"013"
					]
				},
				{
					t: "Miscellanea",
					p: [
						"026",
						"098",
						"114",
						"135"
					]
				}
			]
		},
		66: {
			g: {
				dp: {
					p: [
						"104",
						"127",
						"039"
					]
				},
				ds: {
					p: [
						"004",
						"180",
						"093",
						"099",
						"101"
					]
				},
				np: {
					p: [
						"001",
						"000",
						"135"
					]
				},
				ns: {
					p: [
						"154",
						"192"
					]
				}
			},
			s: [
				{
					t: "Contrattura muscolare",
					d: "Sul lato dominante",
					p: [
						"067"
					]
				},
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"030",
						"137",
						"013"
					]
				},
				{
					t: "Miscellanea",
					p: [
						"135",
						"116",
						"121"
					]
				}
			]
		},
		67: {
			g: {
				dp: {
					p: [
						"104",
						"127",
						"039"
					]
				},
				ds: {
					p: [
						"000",
						"003",
						"093",
						"128"
					]
				},
				np: {
					p: [
						"001",
						"000",
						"128"
					]
				},
				ns: {
					p: [
						"154",
						"195"
					]
				}
			},
			s: [
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"192",
						"030",
						"137",
						"173"
					]
				},
				{
					t: "Miscellanea",
					p: [
						{
							t: "Rilassamento neurovegetativo",
							p: [
								"001",
								"222",
								"000",
								"254"
							],
							l: "RIL_NEUR"
						},
						"135"
					]
				}
			]
		},
		68: {
			g: {
				dp: {
					p: [
						"230",
						"093",
						"104"
					]
				},
				ds: {
					p: [
						"039",
						"000",
						"221",
						"127",
						"128",
						"114"
					]
				},
				np: {
					p: [
						"000",
						"030",
						"221"
					]
				},
				ns: {
					p: [
						"039",
						"001",
						"154"
					]
				}
			},
			s: [
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"030",
						"137",
						"192"
					]
				},
				{
					t: "Miscellanea",
					p: [
						"121",
						"291"
					]
				}
			]
		},
		69: {
			g: {
				dp: {
					p: [
						"000",
						"098",
						"154"
					]
				},
				ds: {
					p: [
						"104",
						"039",
						"037",
						"157",
						"143",
						"093",
						"007",
						"095"
					]
				},
				np: {
					p: [
						"001",
						"098",
						"137"
					]
				},
				ns: {
					p: [
						"000",
						"004",
						"013",
						"093"
					]
				}
			},
			s: [
				{
					t: "Contrattura muscolare",
					d: "Sul lato dominante",
					p: [
						"067"
					]
				},
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"137",
						"173",
						"030",
						"199"
					]
				},
				{
					t: "Miscellanea",
					p: [
						"155",
						"222",
						"195"
					]
				}
			]
		},
		70: {
			g: {
				dp: {
					p: [
						"003",
						"037",
						["007","095"]
					]
				},
				ds: {
					p: [
						"104",
						"039",
						"122",
						"195",
						"098",
						"121",
						"115"
					]
				},
				np: {
					p: [
						"230",
						"001",
						"098"
					]
				},
				ns: {
					p: [
						"000",
						"154",
						"037"
					]
				}
			},
			s: [
				{
					t: "Contrattura muscolare",
					d: "Sul lato dominante",
					p: [
						"067"
					]
				},
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"137",
						"030",
						"013",
						"004"
					]
				}
			]
		},
		71: {
			g: {
				dp: {
					p: [
						"001",
						"098",
						"154"
					]
				},
				ds: {
					p: [
						"000",
						"039",
						"104",
						"004",
						"121",
						"114",
						"115",
						"007",
						"095"
					]
				},
				np: {
					p: [
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						}
					]
				},
				ns: {
					p: [
						"001",
						"154",
						"137"
					]
				}
			},
			s: [
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"192",
						"013",
						"030",
						"199"
					]
				},
				{
					t: "Miscellanea",
					p: [
						"195"
					]
				}
			]
		},
		72: {
			g: {
				dp: {
					p: [
						"003",
						"165",
						["007","095"]
					]
				},
				ds: {
					p: [
						"039",
						"037",
						"098",
						"121",
						"115"
					]
				},
				np: {
					p: [
						"003",
						"037",
						"000"
					]
				},
				ns: {
					p: [
						"001",
						"230"
					]
				}
			},
			s: [
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"199",
						"137",
						"013",
						"192"
					]
				}
			]
		},
		73: {
			g: {
				dp: {
					p: [
						"001",
						"003",
						"192"
					]
				},
				ds: {
					p: [
						"039",
						"030",
						"192",
						"243",
						"056",
						"147"
					]
				},
				np: {
					p: [
						"030",
						"000",
						"137"
					]
				},
				ns: {
					p: [
						"001",
						"142"
					]
				}
			},
			s: [
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"004",
						"013"
					]
				},
				{
					t: "Miscellanea",
					p: [
						"135",
						"002",
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						}
					]
				}
			]
		},
		74: {
			g: {
				dp: {
					p: [
						"000",
						"003",
						"165"
					]
				},
				ds: {
					p: [
						"198",
						"147",
						"039",
						"056",
						"143",
						"157"
					]
				},
				np: {
					p: [
						"003",
						"039",
						"137"
					]
				},
				ns: {
					p: [
						"000",
						"001"
					]
				}
			},
			s: [
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"013",
						"199",
						"004"
					]
				},
				{
					t: "Miscellanea",
					p: [
						"135",
						"026",
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						}
					]
				}
			]
		},
		75: {
			g: {
				dp: {
					p: [
						"230",
						"039",
						"056"
					]
				},
				ds: {
					p: [
						"195",
						"135",
						"043",
						"120",
						"157",
						"143"
					]
				},
				np: {
					p: [
						"000",
						"030",
						"142"
					]
				},
				ns: {
					p: [
						"001",
						"137"
					]
				}
			},
			s: [
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"030",
						"013",
						"121"
					]
				},
				{
					t: "Miscellanea",
					p: [
						"148",
						"147",
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						}
					]
				}
			]
		},
		76: {
			g: {
				dp: {
					p: [
						"039",
						"056",
						"195"
					]
				},
				ds: {
					p: [
						"043",
						"104",
						"030",
						"120",
						"157",
						"143"
					]
				},
				np: {
					p: [
						"000",
						"030",
						"142"
					]
				},
				ns: {
					p: [
						"001",
						"195"
					]
				}
			},
			s: [
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"137",
						"199",
						"013",
						{
							t: "Triade di relax",
							p: [
								"001",
								"222",
								"254"
							],
							l: "TRE"
						}
					]
				},
				{
					t: "Miscellanea",
					p: [
						{
							t: "Triade modificata",
							p: [
								"001",
								"056",
								"254"
							]
						}
					]
				}
			]
		},
		77: {
			g: {
				dp: {
					p: [
						"001",
						"056",
						"111"
					]
				},
				ds: {
					p: [
						"003",
						"039",
						"184",
						"268",
						"117",
						"122",
						"115"
					]
				},
				np: {
					p: [
						"003",
						"000",
						"154"
					]
				},
				ns: {
					p: [
						"001",
						"111"
					]
				}
			},
			s: [
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						}
					]
				},
				{
					t: "Miscellanea",
					p: [
						"165",
						"026"
					]
				}
			]
		},
		78: {
			g: {
				dp: {
					p: [
						"003",
						"056",
						"154"
					]
				},
				ds: {
					p: [
						"039",
						"230",
						"268",
						"143",
						"157",
						"120",
						"043"
					]
				},
				np: {
					p: [
						"000",
						"142",
						"111"
					]
				},
				ns: {
					p: [
						"001"
					]
				}
			},
			s: [
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"030",
						"137",
						"192"
					]
				},
				{
					t: "Miscellanea",
					p: [
						"165",
						"195"
					]
				}
			]
		},
		79: {
			g: {
				dp: {
					p: [
						"000",
						"002",
						"253",
						"207"
					]
				},
				ds: {
					p: [
						"039",
						"111",
						"154",
						"182",
						"302",
						"110",
						"169"
					]
				},
				np: {
					p: [
						"001",
						"137",
						"207"
					]
				},
				ns: {
					p: [
						"222",
						"230"
					]
				},
				d: "N.B. La Linea dei suoni (o Corteccia temporale) va eseguita sul padiglione omolaterale al problema. In caso di problema bilaterale può essere eseguita su entrambi i padiglioni o su quello maggiormente interessato."
			},
			s: [
				{
					t: "Contrattura muscolare",
					d: "Sul lato dominante",
					p: [
						"285",
						"288"
					]
				},
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"030",
						"192",
						"013"
					]
				},
				{
					t: "Miscellanea",
					p: [
						{
							t: "Rilassamento neurovegetativo",
							p: [
								"001",
								"222",
								"000",
								"254"
							],
							l: "RIL_NEUR"
						},
						"165",
						"026"
					]
				}
			]
		},
		80: {
			g: {
				dp: {
					p: [
						"030",
						{
							t: "Linea delle vertigini",
							p: [
								"000",
								"148",
								"272"
							],
							l: "LIN_VERT"
						}
					]
				},
				ds: {
					p: [
						"230",
						"039",
						"291",
						"169",
						"147"
					]
				},
				np: {
					p: [
						"001",
						"013",
						"230"
					]
				},
				ns: {
					p: [
						"000",
						"150",
						"004"
					]
				}
			},
			s: [
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"137",
						"013",
						"199",
						{
							t: "Triade di relax",
							p: [
								"001",
								"222",
								"254"
							],
							l: "TRE"
						}
					]
				},
				{
					t: "Miscellanea",
					p: [
						"222"
					]
				}
			]
		},
		81: {
			g: {
				dp: {
					p: [
						"001",
						"169",
						{
							t: "Linea delle vertigini",
							p: [
								"000",
								"148",
								"272"
							],
							l: "LIN_VERT"
						}
					]
				},
				ds: {
					p: [
						"170",
						"003",
						"111",
						"291",
						"120",
						"182"
					]
				},
				np: {
					p: [
						"000",
						"003",
						"111"
					]
				},
				ns: {
					p: [
						"039",
						"002",
						"253",
						"137"
					]
				}
			},
			s: [
				{
					t: "Contrattura muscolare",
					d: "Sul lato dominante",
					p: [
						"285",
						"288"
					]
				},
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"030",
						"013",
						{
							t: "Triade modificata",
							p: [
								"001",
								"148",
								"254"
							]
						}
					]
				},
				{
					t: "Miscellanea",
					p: [
						"148"
					]
				}
			]
		},
		82: {
			g: {
				dp: {
					p: [
						"230",
						"211",
						"170"
					]
				},
				ds: {
					p: [
						"254",
						"195",
						"003",
						"129",
						"209"
					]
				},
				np: {
					p: [
						"001",
						"137",
						"173"
					]
				},
				ns: {
					p: [
						"000",
						"230",
						"222"
					]
				}
			},
			s: [
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"030",
						"137",
						"199"
					]
				},
				{
					t: "Miscellanea",
					p: [
						{
							t: "Linea delle commessure",
							p: [
								"113",
								"254",
								"112"
							],
							l: "LIN_COMM"
						},
						"207"
					]
				}
			]
		},
		83: {
			g: {
				dp: {
					p: [
						"002",
						"165",
						"104"
					]
				},
				ds: {
					p: [
						"003",
						"078",
						"039",
						"166",
						"185"
					]
				},
				np: {
					p: [
						"000",
						"003",
						"166"
					]
				},
				ns: {
					p: [
						"001",
						"026"
					]
				}
			},
			s: [
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"137"
					]
				},
				{
					t: "Miscellanea",
					p: [
						"026",
						"157",
						"143"
					]
				}
			]
		},
		84: {
			g: {
				dp: {
					p: [
						"001",
						"104",
						"185"
					]
				},
				ds: {
					p: [
						"003",
						"039",
						"165",
						"104",
						"157",
						"164",
						"166",
						"143"
					]
				},
				np: {
					p: [
						"000",
						"166",
						"165"
					]
				},
				ns: {
					p: [
						"001",
						"137",
						"199"
					]
				}
			},
			s: [
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"192",
						"199",
						"013",
						{
							t: "Rilassamento neurovegetativo",
							p: [
								"001",
								"222",
								"000",
								"254"
							],
							l: "RIL_NEUR"
						}
					]
				},
				{
					t: "Miscellanea",
					p: [
						"026",
						"078",
						"305"
					]
				}
			]
		},
		85: {
			g: {
				dp: {
					p: [
						"001",
						"002",
						"249"
					]
				},
				ds: {
					p: [
						"003",
						"039",
						"180",
						"078",
						"244",
						"126",
						"134"
					]
				},
				np: {
					p: [
						"000",
						"003",
						"135"
					]
				},
				ns: {
					p: [
						"002",
						"001",
						"192"
					]
				}
			},
			s: [
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"004",
						"173",
						"192"
					]
				},
				{
					t: "Miscellanea",
					p: [
						"043",
						"026"
					]
				}
			]
		},
		86: {
			g: {
				dp: {
					p: [
						"104",
						"002",
						"126"
					]
				},
				ds: {
					p: [
						"039",
						"180",
						"078",
						"134",
						"249",
						"244"
					]
				},
				np: {
					p: [
						"000",
						"003",
						"134"
					]
				},
				ns: {
					p: [
						"001",
						"165"
					]
				}
			},
			s: [
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"030",
						"199",
						"173"
					]
				},
				{
					t: "Miscellanea",
					p: [
						"026",
						"118",
						"184"
					]
				}
			]
		},
		87: {
			g: {
				dp: {
					p: [
						"230",
						"268",
						"039"
					]
				},
				ds: {
					p: [
						"078",
						"249",
						"244",
						"126",
						"134"
					]
				},
				np: {
					p: [
						"000",
						"001",
						"195"
					]
				},
				ns: {
					p: [
						"180"
					]
				}
			},
			s: [
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"030",
						"199",
						{
							t: "Triade di relax",
							p: [
								"001",
								"222",
								"254"
							],
							l: "TRE"
						}
					]
				},
				{
					t: "Miscellanea",
					p: [
						"043",
						"026",
						"165"
					]
				}
			]
		},
		88: {
			g: {
				dp: {
					p: [
						"164",
						"074",
						"215"
					]
				},
				ds: {
					p: [
						"039",
						"262",
						"018",
						"159",
						"097",
						"009",
						"089"
					]
				},
				np: {
					p: [
						"000",
						"001",
						"230"
					]
				},
				ns: {
					p: [
						"165"
					]
				}
			},
			s: [
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"137",
						"192",
						"199"
					]
				},
				{
					t: "Miscellanea",
					p: [
						"121",
						"098"
					]
				}
			]
		},
		89: {
			g: {
				dp: {
					p: [
						"230",
						"177",
						"179",
						"202",
						"268"
					]
				},
				ds: {
					p: [
						"039",
						"157",
						"143",
						"159",
						"097",
						"262"
					]
				},
				np: {
					p: [
						"000",
						"001",
						"164"
					]
				},
				ns: {
					p: [
						"004"
					]
				},
				d: "N.B. Tra Occipite, Tempia e Fronte, scegliere 1-2 punti più sensibili"
			},
			s: [
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						{
							t: "Rilassamento neurovegetativo",
							p: [
								"001",
								"222",
								"000",
								"254"
							],
							l: "RIL_NEUR"
						},
						{
							t: "Triade di relax",
							p: [
								"001",
								"222",
								"254"
							],
							l: "TRE"
						}
					]
				},
				{
					t: "Miscellanea",
					p: [
						"114"
					]
				}
			]
		},
		90: {
			g: {
				dp: {
					p: [
						"230",
						"039",
						"165"
					]
				},
				ds: {
					p: [
						"026",
						"004",
						"[]Area somatotopica nel padiglione corrispondente alla zona interessata o maggiormente interessata."
					]
				},
				np: {
					p: [
						"000",
						"001",
						"074"
					]
				},
				ns: {
					p: [
						"252"
					]
				}
			},
			s: [
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						}
					]
				},
				{
					t: "Infiammazione cronica",
					p: [
						"118",
						{
							t: "Triade antinfiammatoria",
							p: [
								"003",
								"165",
								"039"
							],
							l: "TAN"
						}
					]
				}
			]
		},
		91: {
			g: {
				dp: {
					p: [
						"230",
						"003",
						"002",
						"165"
					]
				},
				ds: {
					p: [
						"164",
						"018",
						"[]Area somatotopica nel padiglione corrispondente alla zona interessata."
					]
				},
				np: {
					p: [
						"000",
						"001",
						"252"
					]
				},
				ns: {
					p: [
						"074"
					]
				},
			},
			s: [
				{
					t: "Ansia e stress",
					d: "Lato non dominante",
					p: [
						"004",
						{
							t: "Triade adattata",
							p: [
								"001",
								"222",
								"254",
								"[]Area di rappresentazione della zona interessata"
							]
						},
						"252"
					]
				},
				{
					t: "Infiammazione",
					p: [
						"026",
						"118",
						{
							t: "Triade antinfiammatoria",
							p: [
								"003",
								"165",
								"039"
							],
							l: "TAN"
						}
					]
				},
				{
					t: "Ipotrofia cutanea",
					p: [
						"268"
					]
				}
			]
		},
		92: {
			g: {
				dp: {
					p: [
						"230",
						"003",
						"026"
					]
				},
				ds: {
					p: [
						"078",
						"039",
						"118",
						"018"
					]
				},
				np: {
					p: [
						"000",
						"001",
						"074"
					]
				},
				ns: {
					p: [
						"165"
					]
				}
			},
			s: [
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						{
							t: "Triade di relax",
							p: [
								"001",
								"222",
								"254"
							],
							l: "TRE"
						},
						{
							t: "Rilassamento neurovegetativo",
							p: [
								"001",
								"222",
								"000",
								"254"
							],
							l: "RIL_NEUR"
						}
					]
				},
				{
					t: "Allergia",
					p: [
						"078",
						"003",
						"002"
					],
					"a": "Apice del padiglione auricolare e il punto Allergia 2 vanno punti in trasfissione."
				}
			]
		},
		93: {
			g: {
				dp: {
					p: [
						"003",
						"165",
						"230"
					]
				},
				ds: {
					p: [
						"026",
						"074",
						"018",
						"[]Area somatotopica nel padiglione corrispondente alla zona interessata."
					]
				},
				np: {
					p: [
						"000",
						"001",
						"004"
					]
				},
				ns: {
					p: [
						"252"
					]
				}
			},
			s: [
				{
					t: "Ipotrofia cutanea",
					p: [
						"268"
					]
				},
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"030",
						"137",
						{
							t: "Triade modificata",
							p: [
								"001",
								"018",
								"254"
							]
						}
					]
				},
				{
					t: "Infiammazione",
					p: [
						{
							t: "Triade antinfiammatoria",
							p: [
								"003",
								"165",
								"039"
							],
							l: "TAN"
						}
					]
				},
				{
					t: "Artrite psoriasica",
					p: [
						"[]Articolazione interessata dal dolore"
					]
				}
			]
		},
		94: {
			g: {
				dp: {
					p: [
						"230",
						"215",
						"165"
					]
				},
				ds: {
					p: [
						"039",
						"157",
						"003",
						"185"
					]
				},
				np: {
					p: [
						"000",
						"001",
						"252"
					]
				},
				ns: {
					p: [
						"074"
					]
				}
			},
			s: [
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"137",
						{
							t: "Triade di relax",
							p: [
								"001",
								"222",
								"254"
							],
							l: "TRE"
						},
						{
							t: "Triade modificata",
							p: [
								"001",
								"Uno dei seguenti 2 punti:",
								"215",
								"185",
								"254"
							]
						},
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						}
					]
				},
				{
					t: "Infiammazione",
					p: [
						"026",
						"118",
						{
							t: "Triade antinfiammatoria",
							p: [
								"003",
								"165",
								"039"
							],
							l: "TAN"
						}
					]
				},
				{
					t: "Dismetabolismo",
					p: [
						"121"
					]
				}
			]
		},
		95: {
			g: {
				dp: {
					p: [
						"222",
						"111",
						"003"
					]
				},
				ds: {
					p: [
						"121",
						"291",
						"132",
						"130",
						"131",
						"231"
					]
				},
				np: {
					p: [
						"000",
						"001",
						"039"
					]
				},
				ns: {
					p: [
						"268"
					]
				}
			},
			s: [
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						{
							t: "Triade di relax",
							p: [
								"001",
								"222",
								"254"
							],
							l: "TRE"
						},
						{
							t: "Rilassamento neurovegetativo",
							p: [
								"001",
								"222",
								"000",
								"254"
							],
							l: "RIL_NEUR"
						}
					]
				},
				{
					t: "Miscellanea",
					p: [
						"148",
						"157",
						"143"
					]
				}
			]
		},
		96: {
			g: {
				dp: {
					p: [
						"104",
						"222",
						"268"
					]
				},
				ds: {
					p: [
						"003",
						"164",
						"118",
						"132",
						"130",
						"131",
						"231"
					]
				},
				np: {
					p: [
						"000",
						"001",
						"268"
					]
				},
				ns: {
					p: [
						"154"
					]
				}
			},
			s: [
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						}
					]
				}
			]
		},
		97: {
			g: {
				dp: {
					p: [
						"104",
						"118",
						"117"
					]
				},
				ds: {
					p: [
						"164",
						"222",
						"132",
						"130",
						"131"
					]
				},
				np: {
					p: [
						"000",
						"001",
						"026"
					]
				},
				ns: {
					p: [
						"154"
					]
				}
			},
			s: [
				{
					t: "Infiammazione",
					d: "Sul lato dominante",
					p: [
						"165"
					]
				},
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						}
					]
				},
				{
					t: "Allergia",
					p: [
						"078",
						"003",
						"002"
					]
				}
			]
		},
		98: {
			g: {
				dp: {
					p: [
						"222",
						"111",
						"002",
						"253"
					]
				},
				ds: {
					p: [
						"154",
						"148",
						"132",
						"130",
						"131",
						"231"
					]
				},
				np: {
					p: [
						"000",
						"001",
						"002",
						"253"
					]
				},
				ns: {
					p: [
						"192"
					]
				}
			},
			s: [
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						"137",
						"013"
					]
				},
				{
					t: "Miscellanea",
					p: [
						"030",
						"192",
						"243"
					]
				}
			]
		},
		99: {
			g: {
				dp: {
					p: [
						"039",
						"222",
						"154"
					]
				},
				ds: {
					p: [
						"104",
						"231",
						"132",
						"130",
						"131"
					]
				},
				np: {
					p: [
						"000",
						"001",
						"003"
					]
				},
				ns: {
					p: [
						"230"
					]
				}
			},
			s: [
				{
					t: "Componente ansiosa e stress",
					d: "Sul lato non dominante",
					p: [
						{
							t: "Linea degli omega",
							p: [
								"230",
								"104",
								"003"
							],
							l: "LIN_OMEG"
						},
						{
							t: "Rilassamento neurovegetativo",
							p: [
								"001",
								"222",
								"000",
								"254"
							],
							l: "RIL_NEUR"
						}
					]
				},
				{
					t: "Miscellanea",
					p: [
						"121",
						"122",
						"157",
						"143"
					]
				}
			]
		},
		100: { // programma antitabacco classico di Nogier
			"tit": "TRATTAMENTO",
			g: {
				dp: {
					p: [
						"015",
						"000",
						"199",
						"195"
					]
				},
				np: {
					p: [
						"000"
					]
				}
			},
			d: "Per valutare il grado di intensità e il tipo di terapia antifumo, effettuare i due test che si trovano negli approfondimenti: ",
			t: true
		},
		101: { // programma antitabacco di Rossato
			"tit": "TRATTAMENTO",
			g: {
				dp: {
					p: [
						"015",
						"000",
						"199",
						"195"
					]
				},
				np: {
					p: [
						"000"
					]
				},
				d: "PUNTO EXTRA: ai punti auricolari, va aggiunto il punto dell'agopuntura somatica Tim Mee, punto extra meridiano posizionato lateralmente al punto LU.7, dove è palpabile una cresta ossea.<br><br><b>Sequenza di infissione</b><br>I punti vengono infissi seguendo uno schema predefinito e secondo una modalità di stimolazione.<br><b>D</b> dispersione, con ago in inspirazione e rotazione in senso antiorario.<br><b>T</b> tonificazione, con ago in espirazione e rotazione in senso orario.<br><br>- <b>Tin Mee (D)</b>: bilaterale<br>- <b>P1 e P2 (D)</b>: pungere verso il lobo<br>- <b>P3</b>: indifferente<br>- <b>P4, P5, P6 e P7 (T)</b>: pungere verso l'alto<br>- <b>Aggressività (D)</b><br>- <b>Epifisi (D)</b><br>- <b>Punto Zero (D)</b>: lato dominante<br>- <b>Punto Zero (T)</b>: lato non dominante<br><br><b>Elettrostimolazione</b><br>Quando gli agi sono infissi, vanno elettrostimolati a 15Hz per 30 minuti, aumentando l'intensità ogni 5 minuti, per consentire l'adattamento del paziente. L'elettrostimolazione va effettuata in quattro coppie:<br>1(-) Punto Zero dominante<br>1(+) Punto Zero non dominante<br>2(-)Aggressività<br>2(+)Epifisi<br>3(-)P7<br>3(+)P4<br>4(-)P2<br>4(+)P1<br><br><b>Prescrizioni extra trattamento</b><br>- Vitamina C come disintossicante<br>- Bere 2-3 litri d'acqua al giorno<br>- Bastoncini di liquirizia per compensazione orale<br>- Polvere di peperoncino integrale come condimento agli alimenti<br>- Il medico può consigliare un ansiolitico all'occorrenza"//- Alprazolam 0,25mg, 2 volte al giorno<br>N.B. Alprazolam deve essere preso solo sotto prescrizione medica e solo se non è controindicato."
			},
			d: "Per valutare il grado di intensità e il tipo di terapia antifumo, effettuare i due test che si trovano negli approfondimenti: ",
			t: true
		},
		102: { // programma antitabacco Lovato
			"tit": "RIDUZIONE GRADUALE",
			g: {
				"sx": {
					p: [
						"001",
						"137",
						"030",
						"267",
						"230"
					]
				},
				"dx": {
					p: [
						"000",
						"004",
						"192",
						"267"
					]
				},
				d: "Il protocollo va eseguito una volta a settimana con diminuzione di 3 sigarette a seduta. Si utilizzano aghi estemporanei.<br><br><b>Trattamento pazienti ansiosi</b><br>Su pazienti particolarmente ansiosi si consiglia di applicare una Triade di relax sul padiglione sinistro per 5 giorni con <i>aghi a semipermanenza</i>. Tali aghi vanno rimossi 2 giorni prima della seduta successiva, nella quale può venire applicata nuovamente la Triade di relax o in alternanza con la Linea degli Omega."
			},
			s: [
				{
					t: "Sospensione improvvisa",
					d: "Su entrambi i padiglioni",
					p: [
						"000",
						"267",
						"230",
						"137"
					],
					"a": "Per la sospensione improvvisa del fumo è richiesta un'astinenza di almeno 12 ore prima della seduta. In caso il paziente non riesca a rispettare l'astinenza, evitare di applicare il protocollo perché da una parte ciò vuol dire che non è motivato e dall'altra i punti saranno meno sensibili al trattamento.<br><br><b>Modalità di esecuzione</b><br>Eseguire l'elettroagopuntura in seduta unica seguendo lo scheda indicato, con una frequenza di 15Hz e per 25 minuti, in particolare San Jiao e il punto del Craving.<br><br><b>Recidiva e difficoltà a smettere</b><br>In caso di recidiva o difficoltà a mantenere l'astinenza è possibile ripetere la seduta ad una settimana di distanza.<br><br><b>Integrazione con il protocollo di riduzione graduale</b><br>Questo protocollo è indicato anche per i soggetti che abbiamo effettuato la riduzione graduale e abbiamo difficoltà a togliere le ultime 2-3 sigarette."
				}
			],
			d: "Per valutare il grado di intensità e il tipo di terapia antifumo, effettuare i due test che si trovano negli approfondimenti: ",
			t: true
		},
		103: { // protocollo NADA
			"tit": "TRATTAMENTO",
			g: {
				"sx": {
					p: [
						"001",
						"039",
						"111",
						"121",
						"244"
					]
				},
				"dx": {
					p: [
						"001",
						"039",
						"111",
						"121",
						"244"
					]
				},
				d: "<b>ALCOLISMO</b><br><b>Fase 1</b>: trattare ogni giorno, per 5 giorni alla settimana più 2 (weekend) con i semi di vaccaria, per 2 settimane. Fase adatta a curare i sintomi di astinenza.<br><b>Fase 2</b>: trattare 3 volte a settimana, per 2 settimane, per curare sintomi di origine psicologica, ansia, insonnia e desiderio di alcol o droga.<br><b>Fase 3</b>: una volta stabilizzata la sobrietà, si eseguono 2 sedute alla settimana, per una settimana o più, per continuare e consolidare la sensazione di benessere e controllo.<br><br><b>TABAGISMO</b><br><b>Fase 1</b>: trattare ogni giorno, per 5 giorni alla settimana più 2 (weekend) con i semi di vaccaria, per 2 settimane. Fase adatta a contrastare i sintomi di astinenza da tabacco.<br><b>Fase 2</b>: quando il consumo di sigarette si riduce a zero (o quasi), si eseguono 3 sedute a settimana per 2 settimane. Questa fase contrasta i sintomi psicologici, ansia, insonnia e desiderio di tabacco.<br><b>Follow-up</b>: a 15 giorni, 3 mesi e 6 mesi.<br><br><b>RICADUTE</b><br>In qualsiasi momento lo desideri, il paziente può decidere di usufruire della fase 1 di qualsiasi protocollo con il fine di arrestare repentinamente le ricadute. Acudetox è risultato particolarmente efficace in questa fase dove altre terapie hanno fallito." 
			},
			d: "Per valutare il grado di intensità e il tipo di terapia antifumo, effettuare i due test che si trovano negli approfondimenti: ",
			t: true
		}
	},
	protocolliAuriculo: {
		"0": {
			NomePatologia: "Acne",
			schedaPatologia: "133",
			scheda: 88,
			apparato: 9
		},
		"1": {
			NomePatologia: "Acufeni/tinnitus",
			schedaPatologia: "001",
			scheda: 79,
			apparato: 8
		},
		"2": {
			NomePatologia: "Adenomiosi",
			schedaPatologia: "134",
			scheda: 51,
			apparato: 5
		},
		"3": {
			NomePatologia: "Adenosi benigna",
			schedaPatologia: "135",
			scheda: 51,
			apparato: 5
		},
		"4": {
			NomePatologia: "Ageusia",
			schedaPatologia: "136",
			scheda: 33,
			apparato: 3
		},
		"5": {
			NomePatologia: "Algie pelviche femminili",
			schedaPatologia: "137",
			scheda: 50,
			apparato: 5
		},
		"6": {
			NomePatologia: "Algodistrofia",
			schedaPatologia: "138",
			scheda: 35,
			apparato: 3
		},
		"7": {
			NomePatologia: "Alopecia",
			schedaPatologia: "139",
			scheda: 89,
			apparato: 9
		},
		"8": {
			NomePatologia: "Anoressia",
			schedaPatologia: "140",
			scheda: 47,
			apparato: 5
		},
		"9": {
			NomePatologia: "Anosmia",
			schedaPatologia: "141",
			scheda: 34,
			apparato: 3
		},
		"10": {
			NomePatologia: "Ansia",
			schedaPatologia: "011",
			scheda: 42,
			apparato: 4
		},
		"11": {
			NomePatologia: "Aritmie cardiache",
			schedaPatologia: "090",
			scheda: 75,
			apparato: 7
		},
		"12": {
			NomePatologia: "Arto fantasma",
			schedaPatologia: "143",
			scheda: 36,
			apparato: 3
		},
		"13": {
			NomePatologia: "Artrite psoriasica",
			schedaPatologia: "144",
			scheda: 21,
			apparato: 1
		},
		"14": {
			NomePatologia: "Artrite reumatoide",
			schedaPatologia: "014",
			scheda: 20,
			apparato: 1
		},
		"15": {
			NomePatologia: "Artrosi - Schema generale",
			schedaPatologia: "015",
			scheda: 1,
			apparato: 1
		},
		"16": {
			NomePatologia: "Artrosi del ginocchio",
			schedaPatologia: "231",
			scheda: 15,
			apparato: 1
		},
		"17": {
			NomePatologia: "Artrosi del gomito",
			schedaPatologia: "232",
			scheda: 12,
			apparato: 1
		},
		"18": {
			NomePatologia: "Artrosi della caviglia",
			schedaPatologia: "233",
			scheda: 16,
			apparato: 1
		},
		"19": {
			NomePatologia: "Artrosi della colonna cervicale",
			schedaPatologia: "234",
			scheda: 2,
			apparato: 1
		},
		"20": {
			NomePatologia: "Artrosi della colonna dorsale",
			schedaPatologia: "235",
			scheda: 3,
			apparato: 1
		},
		"21": {
			NomePatologia: "Artrosi della colonna lombosacrale",
			schedaPatologia: "236",
			scheda: 4,
			apparato: 1
		},
		"22": {
			NomePatologia: "Artrosi della mano",
			schedaPatologia: "237",
			scheda: 13,
			apparato: 1
		},
		"23": {
			NomePatologia: "Artrosi del piede",
			schedaPatologia: "238",
			scheda: 16,
			apparato: 1
		},
		"24": {
			NomePatologia: "Artrosi del polso",
			schedaPatologia: "239",
			scheda: 13,
			apparato: 1
		},
		"25": {
			NomePatologia: "Asma bronchiale",
			schedaPatologia: "016",
			scheda: 85,
			apparato: 8
		},
		"26": {
			NomePatologia: "Astigmatismo",
			schedaPatologia: "145",
			scheda: 95,
			apparato: 10
		},
		"27": {
			NomePatologia: "Balbuzie",
			schedaPatologia: "146",
			scheda: 82,
			apparato: 8
		},
		"28": {
			NomePatologia: "Broncopneumopatia cronica ostruttiva (BPCO)",
			schedaPatologia: "147",
			scheda: 86,
			apparato: 8
		},
		"29": {
			NomePatologia: "Bradicardia",
			schedaPatologia: "090",
			scheda: 76,
			apparato: 7
		},
		"30": {
			NomePatologia: "Bronchite cronica ostruttiva",
			schedaPatologia: "148",
			scheda: 86,
			apparato: 8
		},
		"31": {
			NomePatologia: "Bruxismo",
			schedaPatologia: "149",
			scheda: 28,
			apparato: 2
		},
		"32": {
			NomePatologia: "Bulimia",
			schedaPatologia: "150",
			scheda: 47,
			apparato: 5
		},
		"33": {
			NomePatologia: "Calcolosi renale",
			schedaPatologia: "022",
			scheda: 61,
			apparato: 5
		},
		"34": {
			NomePatologia: "Capsulite adesiva",
			schedaPatologia: "151",
			scheda: 11,
			apparato: 1
		},
		"35": {
			NomePatologia: "Cardiopalmo",
			schedaPatologia: "090",
			scheda: 76,
			apparato: 7
		},
		"36": {
			NomePatologia: "Cataratta",
			schedaPatologia: "024",
			scheda: 96,
			apparato: 10
		},
		"37": {
			NomePatologia: "Cefalea a grappolo",
			schedaPatologia: "026",
			scheda: 24,
			apparato: 2
		},
		"38": {
			NomePatologia: "Cefalea catameniale",
			schedaPatologia: "026",
			scheda: 23,
			apparato: 2
		},
		"39": {
			NomePatologia: "Cefalea muscolotensiva",
			schedaPatologia: "026",
			scheda: 22,
			apparato: 2
		},
		"40": {
			NomePatologia: "Cefalea tensiva",
			schedaPatologia: "026",
			scheda: 22,
			apparato: 2
		},
		"41": {
			NomePatologia: "Cervicalgia su base artrosica",
			schedaPatologia: "152",
			scheda: 2,
			apparato: 1
		},
		"42": {
			NomePatologia: "Cervicalgia su base muscolare",
			schedaPatologia: "153",
			scheda: 6,
			apparato: 1
		},
		"43": {
			NomePatologia: "Cervicobrachialgia",
			schedaPatologia: "154",
			scheda: 17,
			apparato: 1
		},
		"44": {
			NomePatologia: "Cistite",
			schedaPatologia: "155",
			scheda: 60,
			apparato: 5
		},
		"45": {
			NomePatologia: "Cistite interstiziale",
			schedaPatologia: "156",
			scheda: 60,
			apparato: 5
		},
		"46": {
			NomePatologia: "Coccigodinia",
			schedaPatologia: "157",
			scheda: 10,
			apparato: 1
		},
		"47": {
			NomePatologia: "Colica renale",
			schedaPatologia: "158",
			scheda: 61,
			apparato: 5
		},
		"48": {
			NomePatologia: "Colon irritabile",
			schedaPatologia: "082",
			scheda: 69,
			apparato: 6
		},
		"49": {
			NomePatologia: "Colpo di frusta",
			schedaPatologia: "159",
			scheda: 6,
			apparato: 1
		},
		"50": {
			NomePatologia: "Congiuntivite",
			schedaPatologia: "030",
			scheda: 97,
			apparato: 10
		},
		"51": {
			NomePatologia: "Contrattura muscolare della colonna cervicale",
			schedaPatologia: "160",
			scheda: 6,
			apparato: 1
		},
		"52": {
			NomePatologia: "Contrattura muscolare della colonna dorsale",
			schedaPatologia: "160",
			scheda: 7,
			apparato: 1
		},
		"53": {
			NomePatologia: "Contrattura muscolare della colonna lombosacrale",
			schedaPatologia: "160",
			scheda: 8,
			apparato: 1
		},
		"54": {
			NomePatologia: "Contrattura muscolare della colonna - Schema generale",
			schedaPatologia: "160",
			scheda: 5,
			apparato: 1
		},
		"55": {
			NomePatologia: "Corioblastoma dell'utero",
			schedaPatologia: "161",
			scheda: 51,
			apparato: 5
		},
		"56": {
			NomePatologia: "Coxalgia",
			schedaPatologia: "162",
			scheda: 14,
			apparato: 1
		},
		"57": {
			NomePatologia: "Coxartrosi",
			schedaPatologia: "163",
			scheda: 14,
			apparato: 1
		},
		"58": {
			NomePatologia: "Depressione",
			schedaPatologia: "034",
			scheda: 45,
			apparato: 4
		},
		"59": {
			NomePatologia: "Dermatite",
			schedaPatologia: "035",
			scheda: 90,
			apparato: 9
		},
		"60": {
			NomePatologia: "Diarrea",
			schedaPatologia: "038",
			scheda: 71,
			apparato: 6
		},
		"61": {
			NomePatologia: "Dimagrimento",
			schedaPatologia: "140",
			scheda: 47,
			apparato: 6
		},
		"62": {
			NomePatologia: "Disartria funzionale",
			schedaPatologia: "166",
			scheda: 82,
			apparato: 8
		},
		"63": {
			NomePatologia: "Disfunzione erettile",
			schedaPatologia: "063",
			scheda: 58,
			apparato: 5
		},
		"64": {
			NomePatologia: "Dislalia",
			schedaPatologia: "167",
			scheda: 82,
			apparato: 8
		},
		"65": {
			NomePatologia: "Dismenorrea primaria",
			schedaPatologia: "041",
			scheda: 54,
			apparato: 5
		},
		"66": {
			NomePatologia: "Dispepsia gastrica",
			schedaPatologia: "025",
			scheda: 66,
			apparato: 6
		},
		"67": {
			NomePatologia: "Distonia facciale",
			schedaPatologia: "168",
			scheda: 29,
			apparato: 2
		},
		"68": {
			NomePatologia: "Distress",
			schedaPatologia: "169",
			scheda: 44,
			apparato: 4
		},
		"69": {
			NomePatologia: "Disturbi alimentari",
			schedaPatologia: "170",
			scheda: 47,
			apparato: 5
		},
		"70": {
			NomePatologia: "Disturbi del circolo periferico",
			schedaPatologia: "171",
			scheda: 78,
			apparato: 7
		},
		"71": {
			NomePatologia: "Disturbi dell'articolazione temporornandibolare",
			schedaPatologia: "172",
			scheda: 27,
			apparato: 2
		},
		"72": {
			NomePatologia: "Disturbi del sonno",
			schedaPatologia: "067",
			scheda: 46,
			apparato: 4
		},
		"73": {
			NomePatologia: "Disturbi depressivi",
			schedaPatologia: "034",
			scheda: 45,
			apparato: 4
		},
		"74": {
			NomePatologia: "Disturbi linfatici",
			schedaPatologia: "173",
			scheda: 77,
			apparato: 7
		},
		"75": {
			NomePatologia: "Disturbo da attacchi di panico (DAP)",
			schedaPatologia: "018",
			scheda: 43,
			apparato: 4
		},
		"76": {
			NomePatologia: "Dolore al gomito",
			schedaPatologia: "174",
			scheda: 12,
			apparato: 1
		},
		"77": {
			NomePatologia: "Dolore articolazione temporomandibolare",
			schedaPatologia: "175",
			scheda: 27,
			apparato: 2
		},
		"78": {
			NomePatologia: "Dolore cervicale su base artrosica",
			schedaPatologia: "176",
			scheda: 2,
			apparato: 1
		},
		"79": {
			NomePatologia: "Dolore cervicale su base muscolare",
			schedaPatologia: "177",
			scheda: 6,
			apparato: 1
		},
		"80": {
			NomePatologia: "Dolore coccigeo",
			schedaPatologia: "178",
			scheda: 10,
			apparato: 1
		},
		"81": {
			NomePatologia: "Dolore della caviglia",
			schedaPatologia: "179",
			scheda: 16,
			apparato: 1
		},
		"82": {
			NomePatologia: "Dolore dell'anca",
			schedaPatologia: "180",
			scheda: 14,
			apparato: 1
		},
		"83": {
			NomePatologia: "Dolore del piede",
			schedaPatologia: "285",
			scheda: 16,
			apparato: 1
		},
		"84": {
			NomePatologia: "Dolore dorsale su base muscolare",
			schedaPatologia: "181",
			scheda: 7,
			apparato: 1
		},
		"85": {
			NomePatologia: "Dolore lombare su base muscolare",
			schedaPatologia: "182",
			scheda: 8,
			apparato: 1
		},
		"86": {
			NomePatologia: "Dolore muscolare",
			schedaPatologia: "183",
			scheda: 9,
			apparato: 1
		},
		"87": {
			NomePatologia: "Dolore muscolare della colonna - Schema generale",
			schedaPatologia: "184",
			scheda: 5,
			apparato: 1
		},
		"88": {
			NomePatologia: "Dorsalgia su base artrosica",
			schedaPatologia: "185",
			scheda: 3,
			apparato: 1
		},
		"89": {
			NomePatologia: "Dorsalgia su base muscolare",
			schedaPatologia: "186",
			scheda: 7,
			apparato: 1
		},
		"90": {
			NomePatologia: "Duodenite",
			schedaPatologia: "187",
			scheda: 65,
			apparato: 6
		},
		"91": {
			NomePatologia: "Eczema",
			schedaPatologia: "043",
			scheda: 91,
			apparato: 9
		},
		"92": {
			NomePatologia: "Eiaculazione precoce",
			schedaPatologia: "044",
			scheda: 59,
			apparato: 5
		},
		"93": {
			NomePatologia: "Emesi gravidica",
			schedaPatologia: "284",
			scheda: 55,
			apparato: 5
		},
		"94": {
			NomePatologia: "Emicrania",
			schedaPatologia: "026",
			scheda: 23,
			apparato: 2
		},
		"95": {
			NomePatologia: "Emicrania con aura",
			schedaPatologia: "188",
			scheda: 23,
			apparato: 2
		},
		"96": {
			NomePatologia: "Emicrania mestruale",
			schedaPatologia: "189",
			scheda: 23,
			apparato: 2
		},
		"97": {
			NomePatologia: "Emicrania senz'aura",
			schedaPatologia: "190",
			scheda: 23,
			apparato: 2
		},
		"98": {
			NomePatologia: "Emorragia cerebrale",
			schedaPatologia: "191",
			scheda: 41,
			apparato: 3
		},
		"99": {
			NomePatologia: "Emorroidi",
			schedaPatologia: "047",
			scheda: 72,
			apparato: 6
		},
		"100": {
			NomePatologia: "Endometrioma",
			schedaPatologia: "192",
			scheda: 51,
			apparato: 5
		},
		"101": {
			NomePatologia: "Endometriosi",
			schedaPatologia: "193",
			scheda: 51,
			apparato: 5
		},
		"102": {
			NomePatologia: "Enfisema polmonare",
			schedaPatologia: "194",
			scheda: 87,
			apparato: 8
		},
		"103": {
			NomePatologia: "Enuresi",
			schedaPatologia: "048",
			scheda: 62,
			apparato: 5
		},
		"104": {
			NomePatologia: "Epicondilite",
			schedaPatologia: "195",
			scheda: 12,
			apparato: 1
		},
		"105": {
			NomePatologia: "Epilessia",
			schedaPatologia: "051",
			scheda: 38,
			apparato: 3
		},
		"106": {
			NomePatologia: "Epitrocleite",
			schedaPatologia: "196",
			scheda: 12,
			apparato: 1
		},
		"107": {
			NomePatologia: "Ernia discale della colonna cervicale",
			schedaPatologia: "053",
			scheda: 17,
			apparato: 1
		},
		"108": {
			NomePatologia: "Ernia discale della colonna lombosacrale",
			schedaPatologia: "053",
			scheda: 19,
			apparato: 1
		},
		"109": {
			NomePatologia: "Fibromialgia",
			schedaPatologia: "197",
			scheda: 37,
			apparato: 3
		},
		"110": {
			NomePatologia: "Gastrite",
			schedaPatologia: "058",
			scheda: 65,
			apparato: 6
		},
		"111": {
			NomePatologia: "Gastroduodenite",
			schedaPatologia: "198",
			scheda: 65,
			apparato: 6
		},
		"112": {
			NomePatologia: "Gastroesophageal reflux disease (GERD)",
			schedaPatologia: "263",
			scheda: 67,
			apparato: 6
		},
		"113": {
			NomePatologia: "Glaucoma",
			schedaPatologia: "199",
			scheda: 98,
			apparato: 10
		},
		"114": {
			NomePatologia: "Gonalgia",
			schedaPatologia: "200",
			scheda: 15,
			apparato: 1
		},
		"115": {
			NomePatologia: "Gonartrosi",
			schedaPatologia: "201",
			scheda: 15,
			apparato: 1
		},
		"116": {
			NomePatologia: "Gonfiore addominale",
			schedaPatologia: "202",
			scheda: 66,
			apparato: 6
		},
		"117": {
			NomePatologia: "Ictus cerebrale",
			schedaPatologia: "062",
			scheda: 41,
			apparato: 3
		},
		"118": {
			NomePatologia: "Frigidità",
			schedaPatologia: "055",
			scheda: 58,
			apparato: 5
		},
		"119": {
			NomePatologia: "Impotenza sessuale",
			schedaPatologia: "063",
			scheda: 58,
			apparato: 5
		},
		"120": {
			NomePatologia: "Incontinenza da sforzo",
			schedaPatologia: "064",
			scheda: 62,
			apparato: 5
		},
		"121": {
			NomePatologia: "Incontinenza urinaria",
			schedaPatologia: "064",
			scheda: 62,
			apparato: 5
		},
		"122": {
			NomePatologia: "Infezione delle vie urinarie (IVU)",
			schedaPatologia: "205",
			scheda: 60,
			apparato: 5
		},
		"123": {
			NomePatologia: "Insonnia",
			schedaPatologia: "067",
			scheda: 46,
			apparato: 4
		},
		"124": {
			NomePatologia: "Insulto cerebrovascolare",
			schedaPatologia: "062",
			scheda: 41,
			apparato: 3
		},
		"125": {
			NomePatologia: "Iperemesi gravidica",
			schedaPatologia: "284",
			scheda: 55,
			apparato: 5
		},
		"126": {
			NomePatologia: "Ipertensione arteriosa",
			schedaPatologia: "068",
			scheda: 73,
			apparato: 7
		},
		"127": {
			NomePatologia: "Ipertiroidismo autoimmune",
			schedaPatologia: "208",
			scheda: 48,
			apparato: 5
		},
		"128": {
			NomePatologia: "Ipertricosi",
			schedaPatologia: "209",
			scheda: 49,
			apparato: 5
		},
		"129": {
			NomePatologia: "Ipertrofia prostatica benigna (IPB)",
			schedaPatologia: "210",
			scheda: 64,
			apparato: 5
		},
		"130": {
			NomePatologia: "Ipotensione arteriosa",
			schedaPatologia: "069",
			scheda: 74,
			apparato: 7
		},
		"131": {
			NomePatologia: "Ipotiroidismo e ipertiroidismo",
			schedaPatologia: "211",
			scheda: 48,
			apparato: 5
		},
		"132": {
			NomePatologia: "Ipotricosi",
			schedaPatologia: "212",
			scheda: 49,
			apparato: 5
		},
		"133": {
			NomePatologia: "Irritable bowel syndrome (IBS)",
			schedaPatologia: "082",
			scheda: 69,
			apparato: 7
		},
		"134": {
			NomePatologia: "Irsutismo",
			schedaPatologia: "213",
			scheda: 49,
			apparato: 5
		},
		"135": {
			NomePatologia: "Labirintite",
			schedaPatologia: "214",
			scheda: 81,
			apparato: 8
		},
		"136": {
			NomePatologia: "Litiasi renale",
			schedaPatologia: "022",
			scheda: 61,
			apparato: 5
		},
		"137": {
			NomePatologia: "Lombalgia su base artrosica",
			schedaPatologia: "215",
			scheda: 4,
			apparato: 1
		},
		"138": {
			NomePatologia: "Lombalgia su base muscolare",
			schedaPatologia: "216",
			scheda: 8,
			apparato: 1
		},
		"139": {
			NomePatologia: "Lombosciatalgia",
			schedaPatologia: "217",
			scheda: 19,
			apparato: 1
		},
		"140": {
			NomePatologia: "Malattia di Ménière",
			schedaPatologia: "218",
			scheda: 81,
			apparato: 8
		},
		"141": {
			NomePatologia: "Malattia infiammatoria pelvica",
			schedaPatologia: "219",
			scheda: 50,
			apparato: 5
		},
		"142": {
			NomePatologia: "Menometrorragia",
			schedaPatologia: "220",
			scheda: 52,
			apparato: 5
		},
		"143": {
			NomePatologia: "Menopausa",
			schedaPatologia: "221",
			scheda: 52,
			apparato: 5
		},
		"144": {
			NomePatologia: "Mestruazioni dolorose",
			schedaPatologia: "041",
			scheda: 54,
			apparato: 5
		},
		"145": {
			NomePatologia: "Miopia",
			schedaPatologia: "222",
			scheda: 99,
			apparato: 10
		},
		"146": {
			NomePatologia: "Morbo di Parkinson",
			schedaPatologia: "223",
			scheda: 39,
			apparato: 3
		},
		"147": {
			NomePatologia: "Nausea e/o vomito",
			schedaPatologia: "224",
			scheda: 68,
			apparato: 6
		},
		"148": {
			NomePatologia: "Neuropatia periferica",
			schedaPatologia: "225",
			scheda: 32,
			apparato: 3
		},
		"149": {
			NomePatologia: "Nevralgia del trigemino",
			schedaPatologia: "226",
			scheda: 30,
			apparato: 3
		},
		"150": {
			NomePatologia: "Nevralgia periferica",
			schedaPatologia: "227",
			scheda: 32,
			apparato: 3
		},
		"151": {
			NomePatologia: "Nevralgia posterpetica",
			schedaPatologia: "228",
			scheda: 31,
			apparato: 3
		},
		"152": {
			NomePatologia: "Obesità",
			schedaPatologia: "229",
			scheda: 47,
			apparato: 5
		},
		"153": {
			NomePatologia: "Oligomenorrea",
			schedaPatologia: "230",
			scheda: 52,
			apparato: 5
		},
		"154": {
			NomePatologia: "Orticaria",
			schedaPatologia: "087",
			scheda: 92,
			apparato: 9
		},
		"155": {
			NomePatologia: "Osteoartrosi del ginocchio",
			schedaPatologia: "231",
			scheda: 15,
			apparato: 1
		},
		"156": {
			NomePatologia: "Osteoartrosi del gomito",
			schedaPatologia: "232",
			scheda: 12,
			apparato: 1
		},
		"157": {
			NomePatologia: "Osteoartrosi della caviglia",
			schedaPatologia: "233",
			scheda: 16,
			apparato: 1
		},
		"158": {
			NomePatologia: "Osteoartrosi della colonna cervicale",
			schedaPatologia: "234",
			scheda: 2,
			apparato: 1
		},
		"159": {
			NomePatologia: "Osteoartrosi della colonna dorsale",
			schedaPatologia: "235",
			scheda: 3,
			apparato: 1
		},
		"160": {
			NomePatologia: "Osteoartrosi della colonna lombosacrale",
			schedaPatologia: "236",
			scheda: 4,
			apparato: 1
		},
		"161": {
			NomePatologia: "Osteoartrosi della mano",
			schedaPatologia: "237",
			scheda: 13,
			apparato: 1
		},
		"162": {
			NomePatologia: "Osteoartrosi del piede",
			schedaPatologia: "238",
			scheda: 16,
			apparato: 1
		},
		"163": {
			NomePatologia: "Osteoartrosi del polso",
			schedaPatologia: "239",
			scheda: 13,
			apparato: 1
		},
		"164": {
			NomePatologia: "Osteoartrosi - Schema generale",
			schedaPatologia: "015",
			scheda: 1,
			apparato: 1
		},
		"165": {
			NomePatologia: "Otolitopatia",
			schedaPatologia: "241",
			scheda: 81,
			apparato: 8
		},
		"166": {
			NomePatologia: "Panic disorder (PD)",
			schedaPatologia: "018",
			scheda: 43,
			apparato: 4
		},
		"167": {
			NomePatologia: "Paresi a frigore",
			schedaPatologia: "242",
			scheda: 25,
			apparato: 2
		},
		"168": {
			NomePatologia: "Paresi del nervo facciale",
			schedaPatologia: "242",
			scheda: 25,
			apparato: 2
		},
		"169": {
			NomePatologia: "Paresi di Bell",
			schedaPatologia: "242",
			scheda: 25,
			apparato: 2
		},
		"170": {
			NomePatologia: "Patologia dell'articolazione temporomandibolare",
			schedaPatologia: "243",
			scheda: 27,
			apparato: 2
		},
		"171": {
			NomePatologia: "Patologia dolorosa caviglia-piede",
			schedaPatologia: "244",
			scheda: 16,
			apparato: 1
		},
		"172": {
			NomePatologia: "Patologia dolorosa del ginocchio",
			schedaPatologia: "245",
			scheda: 15,
			apparato: 1
		},
		"173": {
			NomePatologia: "Patologia dolorosa del gomito",
			schedaPatologia: "246",
			scheda: 12,
			apparato: 1
		},
		"174": {
			NomePatologia: "Patologia dolorosa dell'anca",
			schedaPatologia: "247",
			scheda: 14,
			apparato: 1
		},
		"175": {
			NomePatologia: "Patologia dolorosa polso-mano (su base artrosica)",
			schedaPatologia: "248",
			scheda: 13,
			apparato: 1
		},
		"176": {
			NomePatologia: "Patologie muscolari della colonna - Schema generale",
			schedaPatologia: "249",
			scheda: 5,
			apparato: 1
		},
		"177": {
			NomePatologia: "Pelvic inflammatory disease (PID)",
			schedaPatologia: "250",
			scheda: 50,
			apparato: 5
		},
		"178": {
			NomePatologia: "Periartrite scapolo-omerale",
			schedaPatologia: "094",
			scheda: 11,
			apparato: 1
		},
		"179": {
			NomePatologia: "Perimenopausa",
			schedaPatologia: "251",
			scheda: 52,
			apparato: 5
		},
		"180": {
			NomePatologia: "Polimenorrea",
			schedaPatologia: "252",
			scheda: 52,
			apparato: 5
		},
		"181": {
			NomePatologia: "Polisclerosi",
			schedaPatologia: "269",
			scheda: 40,
			apparato: 3
		},
		"182": {
			NomePatologia: "Postmenopausa",
			schedaPatologia: "254",
			scheda: 52,
			apparato: 5
		},
		"183": {
			NomePatologia: "Premenopausa",
			schedaPatologia: "255",
			scheda: 52,
			apparato: 5
		},
		"184": {
			NomePatologia: "Preparazione/aiuto al parto",
			schedaPatologia: "256",
			scheda: 56,
			apparato: 5
		},
		"185": {
			NomePatologia: "Programma antitabacco classico di Nogier",
			schedaPatologia: "257",
			scheda: 100,
			apparato: 11
		},
		"186": {
			NomePatologia: "Programma antitabacco di G. Rossato",
			schedaPatologia: "258",
			scheda: 101,
			apparato: 11
		},
		"187": {
			NomePatologia: "Programma antitabacco di A. Lovato",
			schedaPatologia: "259",
			scheda: 102,
			apparato: 11
		},
		"188": {
			NomePatologia: "Protocollo NADA per le dipendenze",
			schedaPatologia: "260",
			scheda: 103,
			apparato: 11
		},
		"189": {
			NomePatologia: "Psoriasi",
			schedaPatologia: "099",
			scheda: 93,
			apparato: 9
		},
		"190": {
			NomePatologia: "Radicolopatia cervicale",
			schedaPatologia: "261",
			scheda: 17,
			apparato: 1
		},
		"191": {
			NomePatologia: "Radicolopatia lombosacrale",
			schedaPatologia: "262",
			scheda: 19,
			apparato: 1
		},
		"192": {
			NomePatologia: "Reflusso gastroesofageo",
			schedaPatologia: "263",
			scheda: 67,
			apparato: 6
		},
		"193": {
			NomePatologia: "Reumatismo extra-articolare non infiammatorio, a eziologia incerta",
			schedaPatologia: "264",
			scheda: 37,
			apparato: 3
		},
		"194": {
			NomePatologia: "Rinite acuta",
			schedaPatologia: "101",
			scheda: 83,
			apparato: 8
		},
		"195": {
			NomePatologia: "Rinite allergica",
			schedaPatologia: "105",
			scheda: 83,
			apparato: 8
		},
		"196": {
			NomePatologia: "Rinite catarrale cronica",
			schedaPatologia: "265",
			scheda: 84,
			apparato: 8
		},
		"197": {
			NomePatologia: "Rinite cronica",
			schedaPatologia: "266",
			scheda: 84,
			apparato: 8
		},
		"198": {
			NomePatologia: "Rinite vasomotoria",
			schedaPatologia: "267",
			scheda: 84,
			apparato: 8
		},
		"199": {
			NomePatologia: "Ritenzione urinaria",
			schedaPatologia: "106",
			scheda: 63,
			apparato: 5
		},
		"200": {
			NomePatologia: "Rosacea",
			schedaPatologia: "268",
			scheda: 94,
			apparato: 9
		},
		"201": {
			NomePatologia: "Sciatica",
			schedaPatologia: "070",
			scheda: 19,
			apparato: 1
		},
		"202": {
			NomePatologia: "Sclerosi a placche",
			schedaPatologia: "269",
			scheda: 40,
			apparato: 3
		},
		"203": {
			NomePatologia: "Sclerosi disseminata",
			schedaPatologia: "269",
			scheda: 40,
			apparato: 3
		},
		"204": {
			NomePatologia: "Sclerosi multipla",
			schedaPatologia: "269",
			scheda: 40,
			apparato: 3
		},
		"205": {
			NomePatologia: "Sindrome ansiosa",
			schedaPatologia: "011",
			scheda: 42,
			apparato: 4
		},
		"206": {
			NomePatologia: "Sindrome cervicobrachiale",
			schedaPatologia: "154",
			scheda: 17,
			apparato: 1
		},
		"207": {
			NomePatologia: "Sindrome climaterica",
			schedaPatologia: "270",
			scheda: 52,
			apparato: 5
		},
		"208": {
			NomePatologia: "Sindrome complessa da dolore regionale (CRPS)",
			schedaPatologia: "164",
			scheda: 35,
			apparato: 3
		},
		"209": {
			NomePatologia: "Sindrome da ipersensibilizzazione centrale",
			schedaPatologia: "271",
			scheda: 37,
			apparato: 6
		},
		"210": {
			NomePatologia: "Sindrome del colon irritabile",
			schedaPatologia: "082",
			scheda: 69,
			apparato: 6
		},
		"211": {
			NomePatologia: "Sindrome del tunnel carpale",
			schedaPatologia: "272",
			scheda: 18,
			apparato: 1
		},
		"212": {
			NomePatologia: "Sindrome depressiva",
			schedaPatologia: "034",
			scheda: 45,
			apparato: 4
		},
		"213": {
			NomePatologia: "Sindrome extrapiramidale",
			schedaPatologia: "223",
			scheda: 39,
			apparato: 3
		},
		"214": {
			NomePatologia: "Sindrome iperfollicolinica",
			schedaPatologia: "273",
			scheda: 53,
			apparato: 5
		},
		"215": {
			NomePatologia: "Sindrome miofasciale",
			schedaPatologia: "274",
			scheda: 9,
			apparato: 1
		},
		"216": {
			NomePatologia: "Sindrome premestruale",
			schedaPatologia: "273",
			scheda: 53,
			apparato: 5
		},
		"217": {
			NomePatologia: "Sinusite",
			schedaPatologia: "114",
			scheda: 26,
			apparato: 2
		},
		"218": {
			NomePatologia: "Sovrappeso/obesità e disturbi alimentari.",
			schedaPatologia: "229",
			scheda: 47,
			apparato: 5
		},
		"219": {
			NomePatologia: "Spalla congelata",
			schedaPatologia: "151",
			scheda: 11,
			apparato: 1
		},
		"220": {
			NomePatologia: "Spasmo facciate funzionale",
			schedaPatologia: "275",
			scheda: 29,
			apparato: 2
		},
		"221": {
			NomePatologia: "Spondiloartrosi della colonna lombosacrale",
			schedaPatologia: "276",
			scheda: 4,
			apparato: 1
		},
		"222": {
			NomePatologia: "Stato d'ansia",
			schedaPatologia: "011",
			scheda: 42,
			apparato: 4
		},
		"223": {
			NomePatologia: "Stipsi",
			schedaPatologia: "032",
			scheda: 70,
			apparato: 6
		},
		"224": {
			NomePatologia: "Sterilità di coppia",
			schedaPatologia: "065",
			scheda: 57,
			apparato: 5
		},
		"225": {
			NomePatologia: "Stress",
			schedaPatologia: "277",
			scheda: 44,
			apparato: 4
		},
		"226": {
			NomePatologia: "Stroke",
			schedaPatologia: "062",
			scheda: 41,
			apparato: 3
		},
		"227": {
			NomePatologia: "Tachicardia, bradicardia e cardiopalmo",
			schedaPatologia: "090",
			scheda: 76,
			apparato: 7
		},
		"228": {
			NomePatologia: "Tendinite della cuffia dei rotatori",
			schedaPatologia: "278",
			scheda: 11,
			apparato: 1
		},
		"229": {
			NomePatologia: "Tic facciale",
			schedaPatologia: "279",
			scheda: 29,
			apparato: 2
		},
		"230": {
			NomePatologia: "Tinnitus",
			schedaPatologia: "001",
			scheda: 79,
			apparato: 8
		},
		"231": {
			NomePatologia: "Tireotossicosi",
			schedaPatologia: "280",
			scheda: 48,
			apparato: 5
		},
		"232": {
			NomePatologia: "Tiroidite autoimmune",
			schedaPatologia: "123",
			scheda: 48,
			apparato: 5
		},
		"233": {
			NomePatologia: "Tiroidite di Hashimoto",
			schedaPatologia: "123",
			scheda: 48,
			apparato: 5
		},
		"234": {
			NomePatologia: "Tunnel carpale",
			schedaPatologia: "272",
			scheda: 18,
			apparato: 1
		},
		"235": {
			NomePatologia: "Vertigini centrali",
			schedaPatologia: "281",
			scheda: 80,
			apparato: 8
		},
		"236": {
			NomePatologia: "Vertigini periferiche",
			schedaPatologia: "282",
			scheda: 81,
			apparato: 8
		},
		"237": {
			NomePatologia: "Vertigini posizionali benigne (VPB)",
			schedaPatologia: "283",
			scheda: 81,
			apparato: 8
		},
		"238": {
			NomePatologia: "Vomito",
			schedaPatologia: "224",
			scheda: 68,
			apparato: 6
		},
		"239": {
			NomePatologia: "Vomito gravidico",
			schedaPatologia: "284",
			scheda: 55,
			apparato: 5
		}
	},
    teoria: [
        { // anatomia dell'orecchio
            TitoloSezione: "Il padiglione auricolare",
            contenuti: [
                {
                    TitoloTeoria: "Strutture anatomiche",
                    TestoTeoria: "La struttura del padiglione auricolare comprende:<br><br><b>La lamina cartillaginea</b><br>Il padiglione auricolare si divide macroscopicamente in lobulo e lobo auricolare. Contrariamente alla comune conoscenza la parte inferiore del padiglione auricolare non sostenuto dalla cartilagine è il lobulo auricolare. La struttura cartilagine determina la forma del padiglione auricolare ad esclusione del lobulo. <br><br><b>Anatomia Macroscopica</b><br>La superficie laterale del padiglione auricolare è più ampia rispetto a quella mediale ed i suoi reperi anatomici più evidenti. Sulla superficie laterale possiamo riconoscere quattro salienze: il trago, l’antitrago, l’elice e l’antelice. Le depressioni o concavità sono: la conca, la fossa triangolare e la fossa scafa. La superficie mediale rappresenta un “negativo” della superficie laterale, ovvero tutto quello che eminenza della superficie laterale sarà tramutato in depressione sulla superficie mediale ed analogamente tutto quello che è depressione della superficie laterale in prominenza della superficie mediale. Nella superficie mediale possiamo reperire tre eminenze: l’eminenza scafoidea, l’eminenza della conca e triangolare. Le depressioni della superficie mediale sono quattro: solco cefalo auricolare, solco longitudinale posteriore, la fossa della radice inferiore dell’antelice ed il solco della radice superiore dell’antelice<br><br><b>La cute</b><br>La cute del padiglione auricolare è dal punto di vista diagnostico e terapeutico la più importante in quanto riccamente vascolarizzata ed innervata. La cute consta di tre strati suddivisi in Ipoderma, Derma ed Epidermide. L’Epidermide in particolare contiene oltre alle terminazioni libere le di cellule di Markel, queste ultime sono strutture ovoidali che sono parte integrante del sistema nervoso sensitivo della pelle ed hanno la peculiarità di registrare la pressione esercitata sulla cute. "
                },
                {
                    TitoloTeoria: "Mappa e aree",
                    TestoTeoria: "Per la mappatura del padiglione auricolare e la classificazione delle aree andremo ad utilizzare il microsistema elaborato da Terry Oleson nel 1983 e decretato ufficiale durante la riunione del WHO di Pechino nel 2010.<br> La mappa di Oleson ha il grande vantaggio di non avere aree fisse. Queste infatti non sono altro che delle proporzioni che ben si adattano a qualsivoglia padiglione auricolare. La ricostruzione in 3D ha fatto sì che alcuni punti, in particolare della superficie mediale, essendo loro proiettati dalla superficie laterale a quella mediale, hanno subito delle modifiche nella nomenclatura acquisendo però una classificazione molto più realistica. <br><br><b>La nomenclatura delle aree</b><br>Il padiglione auricolare è stato diviso in 19 aree, indicate qui di seguito con i rispettivi codici tra parentesi:<br>- Elice (HX)<br>- Superficie interna dell'elice (IH)<br>- Fossa triangolare (TF)<br>- Antelice (AH)<br>- Fossa scafoide (SF)<br>- Avanmuro (CW)<br>- Emiconca superiore (SC)<br>- Emiconca inferiore (IC)<br>- Conca rigida (CR)<br>- Trago (TG)<br>- Superficie interna del trago (ST)<br>- Incisura intertragica (IT)<br>- Antitrago (AT)<br>- Lobulo (LO)<br>- Elice posteriore (PP)<br>- Solco longitudinale posteriore (PG)<br>- Eminenza triangolare posteriore (PT)<br>- Conca posteriore (PC)<br>- Lobulo posteriore (PL)<br><br>Ogni area è a sua volta divisa in settori numerati in progressione caudo-craniale e antero-posteriore.<br><br>Nella scheda di ogni punto o area, sotto la voce 'ubicazione', è indicato un codice che rappresenta l'area e il settore di uno punto (es. AH1).",
					mappa: "COL"
                },
				{
					TitoloTeoria: "Zone di frequenza",
					TestoTeoria: "Come sosteneva Paul Nogier, esistono sette regioni distinte del corpo, che risuonano con altrettante frequenze di base e che sono state classificate con le lettere da A a G. Le lettere indicano anche alcune condizioni di salute legate al tipo di tessuto di una specifica regione d'organo.<br>Ogni colore corrisponde a una frequenza di fotoni oscillanti di luce: si va dalla più bassa frequenza del rosso a frequenze gradualmente più elevate del prisma. Gli stessi effetti prodotti dalle lunghezze d'onda progressivamente più corte, di diversi filtri luminosi colorati sul tessuto corporeo, si possono riscontrare anche con frequenze gradualmente più alte di luce lampeggiante (frequenze più veloci di impulsi elettrici o frequenze più alte di stimolazione laser).<br><br><br><b>Zona A - Vitalità cellulare</b><br><i>Colore: </i><span style='color:#e3a15d;'>Arancio</span><br><i>Frequenza elettrica: </i>2.3Hz<br> <i>Frequenza laser: </i>292Hz<br><br>Questa zona corrisponde alla linea mediana del corpo fisico, come avviene nella MTC per i meridiani dell'agopuntura Vaso Concezione e Vaso Governatore, e influisce sull'energia reticolare primitiva e le forze primordiali che condizionano l'organizzazione cellulare.<br>Tale frequenza è spesso individuabile sui tessuti segnati da cicatrici o disturbi e riguarda l'organizzazione embrionale del tessuto cellulare. Viene utilizzata per trattare l'iperattività e la proliferazione cellulare, le infiammazioni o i processi neoplastici.<br><br><br><b>Zona B - Metabolismo nutrizionale</b><br><i>Colore: </i><span style='color:#da554d;'>Rosso</span><br><i>Frequenza elettrica: </i>5.0Hz<br> <i>Frequenza laser: </i>584Hz<br><br>Questa zona corrisponde agli organi interni. La velocità ideale per stimolare i punti nel padiglione auricolare è la frequenza di 5Hz: è utilizzata per trattare disturbi nutrizionali e dell'assimilazione, malnutrizione dei tessuti, disfunzioni neurovegetative, allergie organiche, anomalie costituzionali, squilibrio parasimpatico, nel trattamento endodermico di organi viscerali collegati con la seconda e terza fase Nogier.<br><br><br><b>Zona C - Movimenti cinetici</b><br><i>Colore: </i><span style='color:#dfbc4e;'>Giallo</span><br><i>Frequenza elettrica: </i>10.0Hz<br> <i>Frequenza laser: </i>1168Hz<br><br>Questa zona riguarda la propriocezione, ovvero i movimenti cinetici dell'apparato muscolo-scheletrico. La frequenza è di 10 Hz, utilizzata per trattare i punti auricolari sull'antielice e le aree circostanti del padiglione, come la fossa scafoide e la fossa triangolare, quando si presentano dolore miofasciale, eccitazione del sistema nervoso simpatico, disturbi della somatizzazione, allergie cutanee, spasmi motori, patologie muscolari e qualsiasi problema aggravato dal movimento cinetico o nei trattamenti muscolo-scheletrici mesodermici legati alla seconda e terza fase di Nogier.<br><br><br><b>Zona D - Coordinamento globale</b><br><i>Colore: </i><span style='color:#df8b5c;'>Rosso-arancio</span><br><i>Frequenza elettrica: </i>20.0Hz<br> <i>Frequenza laser: </i>2336Hz<br><br>Questa zona corrisponde al corpo calloso e le commessure anteriori, che connettono le associazioni tra i due lati del cervello, e si trova sul trago esterno del padiglione auricolare. La frequenza è utilizzata in casi di disfunzioni trasversali, problemi di simmetria cerebrale, contro divergenza, disturbi di coordinazione dei due lati del corpo, disfunzioni bilaterali, dolori mediani.<br>In un individuo destrorso, il trago destro corrisponde al Vaso Concezione e il trago sinistro al Vaso Governatore della MTC e viceversa in un mancino.<br><br><br><b>Zona E - Interazioni neurologiche</b><br> <i>Colore: </i><span style='color:#86a050;'>Verde</span><br><i>Frequenza elettrica: </i>40.0Hz<br> <i>Frequenza laser: </i>4672Hz<br><br>Questa zona corrisponde al midollo spinale e ai nervi periferici e si colloca sulla coda elicoidale del padiglione auricolare.<br>La frequenza viene utilizzata in caso di disturbi spinali, della pelle, dermatiti, cicatrici cutanee, neuropatie, nevralgie, herpes zoster.<br><br><br><b>Zona F - Reazioni emotive</b><br><i>Colore: </i><span style='color:#a287b0;'>Blu</span><br><i>Frequenza elettrica: </i>80.0Hz<br><i>Frequenza laser: </i>9334Hz<br><br>Questa zona è collegata al tronco cerebrale, al talamo, al sistema limbico e allo striato e si trova sul lobo periferico del padiglione auricolare. <br>La frequenza viene utilizzata per trattare problematiche legate a posture inconsce, riflessi incondizionati, tic, spasmi muscolari, balbuzie, mal di testa, dolore facciale, depressione clinica e disturbi emotivi, nella terapia ai punti neuroendocrini ectodermici, collegati alla seconda e terza fase di Nogier.<br><br><br><b>Zona G - Organizzazione intellettuale</b><br><i>Colore: </i><span style='color:#bb5eae;'>Viola</span><br><i>Frequenza elettrica: </i>160.0Hz<br> <i>Frequenza laser: </i>18688Hz<br><br>Questa zona corrisponde alle funzioni psicologiche correlate alla corteccia frontale. Si trova sulla parte mediale del lobulo.<br>La frequenza viene usata per disturbi del sistema piramidale, disturbi della memoria, disfunzioni intellettuali, reazioni psicosomatiche, nervosismo ossessivo, preoccupazione cronica, riflessi condizionati malfunzionanti, psicopatologia profonda, nel trattamento dei punti della corteccia cerebrale ectodermica correlati alla seconda e terza fase di Nogier.",
					mappa: "FREQ"
				},
				{
					TitoloTeoria: "Innervazione",
					TestoTeoria: "Nell'auricolopuntura è molto importante conoscere l'innervazione del padiglione auricolare: esso, infatti, è un organo ricco di nervi e si stima la presenza di circa 10000 recettori sensoriali, localizzati tra epidermide e derma. I rami motori, che giungono al padiglione auricolare e alla sua muscolatura intrinseca, provengono dal VII nervo facciale o faciale. Almeno quattro nervi del padiglione auricolare, inoltre, giungono da nervi cranici e spinali.<br>Il padiglione auricolare è interamente coperto da un sottile strato cutaneo che contiene una fitta ramificazione di nervi, motivo per cui le aree anatomiche dell'orecchio esterno sono in parte collegate al tessuto ectodermico.<br>Il padiglione auricolare ha la particolarità di possedere un fitto intreccio di fibre nervose nella sua cute. Questa caratteristica conduce al fatto che non possiamo parlare di un’area come innervata da un singolo ramo nervoso ma dovremmo parlare piuttosto di prevalenza d’innervazione. <br><br><b style='color:#ff9900;'>•</b> <b style='text-decoration:underline;text-decoration-color:#ff9900;'>Nervo auricolotemporale</b><br>Il nervo auricolotemporale è un ramo del nervo mandibolare del trigemino e innerva soprattutto il trago, una parte dell'antitrago, la radice e il ginocchio dell'elice, l'apice del padiglione auricolare, la fossa triangolare, la radice inferiore e una parte della radice superiore dell'antelice.<br><br><b style='color:#0073cc;'>•</b> <b style='text-decoration:underline;text-decoration-color:#0073cc;'>Ramo auricolare del nervo vago</b><br>Il ramo auricolare del nervo vago (ABVN – Auricular Branch of Vagus Nerve), o branca auricolare, è l'unica innervazione cutanea da parte del nervo vago. Il nervo vago innerva in grandissima parte l’emiconca superiore, ed in buona parte l’emiconca inferiore, la superficie interna dell’antitrago ed in parte anche il trago.<br><br><b style='color:#cc5331;'>•</b> <b style='text-decoration:underline;text-decoration-color:#cc5331;'>Nervo occipitale minore</b><br>Il nervo occipitale minore giunge dal plesso cervicale superficiale (PCS, C2-C3) ed è responsabile dell'innervazione del corpo dell'antelice, della sua radice superiore, della fossa scafoidea, dell'area dell'elice, che va dall'apice del padiglione alla coda dell'elice, e della fossa triangolare.<br><br><b style='color:#049241;'>•</b> <b style='text-decoration:underline;text-decoration-color:#049241;'>Il grande nervo auricolare</b><br>Come il nervo occipitale minore, anche il grande nervo auricolare deriva dal plesso cervicale superficiale (PCS, C2-C3) e innerva principalmente il lobulo e una parte del corpo dell'antelice.",
                    anatomia: {
						"Pelle": 0.5,
						"Ossa": 0.7,
						"Visceri": 1
					}
				},
				{
					TitoloTeoria: "Derivazione embriologica",
					TestoTeoria: "Gli organismi vertebrati nascono a partire dall'unione di un ovulo e di uno spermatozoo: la prima cellula che si viene a formare immediatamente si divide per diventare un organismo multicellulare. Questa cellula si ripiega infine su se stessa e si suddivide in tre differenti strati di tessuto embriologico, dai quali successivamente si formano tutti gli organi. Tali organi sono proiettati su alcune regioni del padiglione auricolare.<br><br> <b style='color:#a77b8d;'>•</b> <b style='text-decoration:underline;text-decoration-color:#a77b8d;'>Tessuto endodermico</b><br>A partire dall'endoderma si formano il tratto digestivo gastrointestinale, il sistema respiratorio, gli organi addominali, quali fegato, pancreas, uretra e vescica. Gli organi di origine endodermica sono tutti sostanzialmente rappresentati nella conca. L’orecchio la forma di un feto con la testa verso il basso, questo comporta che gli organi sovra-diaframmatici sono rappresentati nell’emiconca inferiore mentre quelli sotto-diaframmatici nell’emiconca superiore.<br><br> <b style='color:#f0bf43;'>•</b> <b style='text-decoration:underline;text-decoration-color:#f0bf43;'>Tessuto mesodermico</b><br>Dal mesoderma si formano i muscoli scheletrici, i muscoli cardiaci, i muscoli lisci, il tessuto connettivo, le articolazioni, le ossa, le cellule del sangue dal midollo osseo, il sistema circolatorio e il sistema linfatico. Gli organi di derivazione mesodermica sono rappresentati nel padiglione auricolare storicamente e principalmente nell’antelice. Altri organi di origine mesodermica li troviamo rappresentati nella fossa scafa, nella fossetta triangolare ed in parte anche nella branca montante e nel ginocchio dell’elice. <br><br> <b style='color:#d68750;'>•</b> <b style='text-decoration:underline;text-decoration-color:#d68750;'>Tessuto ectodermico</b><br>Dall'ectoderma dell'embrione si genera lo strato superficiale, ovvero la pelle esterna, la cornea, il cristallino, l'epitelio nasale, i denti, i nervi periferici, il midollo spinale, il cervello, le ghiandole endocrine del midollo pituitario, pineale e surrenale.<br>Gli organi di derivazione ectodermica sono rappresentati nel padiglione auricolare prevalentemente nel lobulo auricolare e nell’elice. In quest’ultimo troviamo la rappresentazione ectodermica a partire dall’apice del padiglione auricolare, passando attraverso il Tubercolo di Darwin per finire nella coda dell’elice la quale senza soluzione di continuità va a confluire nel lobulo auricolare.",
					mappa: "NERVI"
				}
            ],
            noList: true
        },
        {
            TitoloSezione: "Concetti di terapia auricolare",
            contenuti: [
                {
                    TitoloTeoria: "Cenni storici",
                    TestoTeoria: "Le prime nozioni di riflessologia, basata sulla corrispondenza tra alcune aree dell'orecchio e determinate regioni del corpo umano, si trovano già nel “Huang Di Nei Jing”, il “Libro di medicina interna dell'Imperatore Giallo”, ovvero l'opera fondamentale della medicina cinese, compilata presumibilmente attorno al 200 a.C.<br>Ippocrate stesso ha descritto delle tecniche di puntura dell'orecchio per curare molte malattie, in particolare l'impotenza e per aiutare l'espletamento del parto. I Turchi, nel XIII sec., insegnavano una pratica dell'Auricoloterapia sia con dei bastoncini per il massaggio sia con piccole cauterizzazioni per il trattamento di numerose patologie.<br>Nel XIV sec. Hieronymus Bosch, pittore fiammingo, dipinse il celebre Giardino delle Delizie, nel quale si riconosce distintamente l'impiego di tecniche di auricoloterapia per il trattamento dell' impotenza e della frigidità con un punto che da lui prese il nome.<br>Nel XV sec. i corsari avevano notato che ponendo un anello d'oro al centro del lobulo dell'orecchio dominante si migliorava l'acuità visiva ed infatti quando lo si stimola in RMF (Risonanza Magnetica Funzionale) si ottiene un'eccitazione delle zone cerebrali occipitali che notoriamente rappresentano una delle 7 aree visive del nostro cervello. <br>Il medico italiano Antonio Valsalva nel 1717 riportava notizie sulla cauterizzazione (trattamento eseguito con un ferro rovente) dell'orecchio per la cura del mal di denti. In particolare descrisse un punto, detto H, che la RMF ha dimostrato corrispondere al legamento odonto-alveolare che comprende una guaina che, se edemizzata, provoca dolore: pungendo il punto H si risolve l'edema e quindi il dolore.<br><br><b>Le intuizioni di Paul Nogier</b><br>La storia moderna dell'Auricoloterapia e Agopuntura auricolare è strettamente legata al nome di Paul Nogier, medico francese di Lione che, partendo dall'osservazione di come alcuni suoi pazienti affetti da sciatalgia fossero guariti grazie a una curiosa pratica terapeutica che prevedeva la cauterizzazione dell'orecchio esterno, si avvicinò a questa metodo, iniziando egli stesso a cauterizzare e poi stimolare con aghi il padiglione auricolare.<br>Nel 1956 Nogier ipotizzò che a livello dell'antelice esistesse la rappresentazione del rachide e più in generale che ci fosse una corrispondenza tra i punti auricolari e le diverse parti del corpo, nel padiglione si poteva riconoscere l'immagine di un feto rovesciato. <br><br>Nella sua mappa il corpo umano era proiettato nel padiglione, con una forma di feto capovolto, facendo così il dottor Nogier, fece una prima sistematizzazione del sistema auricolare che fu chiamata <i>terapia di auricolo-agopuntura</i> <br>Da questa scoperta Nogier iniziò uno studio sistematico, trattando differenti patologie e, usando varie combinazioni di punti, individuò con precisione le localizzazioni, comprendendo il meccanismo d'azione del nuovo metodo terapeutico.<br><br><b>L'incontro con l'Oriente e la Scuola Cinese</b><br>Nel 1957 Paul Nogier propone la prima mappa contenente 40 punti, pubblicando i suoi lavori dapprima su una rivista in lingua tedesca, per poi essere successivamente tradotti in diverse lingue tra cui il cinese. <br>La mappa di Nogier viene introdotta molto presto in Cina, dove conosce un notevole sviluppo. <br>Già nel 1959 il Prof. Xu Zuolin pubblica un lavoro su 255 casi di applicazione clinica in auricoloterapia. <br>Negli anni seguenti la mappa viene arricchita di oltre 100 punti e intorno agli anni 70 si raggiunge l'apice con diverse centinaia di agopunti auricolari, diffondendosi in modo rapido e capillare, tra i primi a praticarla furono i medici militari dell'Armata Popolare di Nanchino che pubblicarono una guida tascabile sull'Agopuntura Auricolare, comprensiva di una semplice mappa auricolare, chiaramente derivata da quella elaborata da Nogier. <br>Da quel momento francesi e cinesi hanno percorso strade differenti, la scuola francese è sfociata nell'Auricolomedicina, di contro la scuola cinese ha sviluppato quegli aspetti della MTC (Medicina Tradizionale Cinese). Nel tempo le due principali scuole di Auricoloterapia, francese e cinese, hanno sviluppato mappe che per alcune localizzazioni divergono anche in maniera sostanziale, con una contemporanea crescita tumultuosa del numero degli agopunti auricolari sui cui nomi non esiste piena concordanza. <br>Per ovviare a questi problemi, il WHO ha creato una commissione di esperti con il compito di raggiungere la standardizzazione nella nomenclatura dei punti e proporre infine una mappa condivisa. Dopo anni di lavoro i risultati raggiunti dalla commissione sono meno che modesti, principalmente a causa delle tensioni esistenti tra i membri delle due scuole. Nella riunione di Seoul del 1987 su 90 punti proposti dalla scuola cinese solo per 43 si è raggiunto il consenso su tre criteri (punti conosciuti a livello internazionale, efficacia terapeutica, sede generalmente accettata), per altri 36 si è ottenuto il consenso solo sui primi due requisiti. Ai primi 43 punti è stato assegnato un numero di codice, un nome in Pinyin, un carattere cinese e un nome in inglese. <br><br><b>Standardizzazione e metodo</b><br>Dalla riunione del 1990 in poi non ci sono stati rilevanti progressi nella standardizzazione e classificazione dei punti auricolari. Attualmente oltre alla scuola Francese e Cinese sono attive altre scuole sviluppatesi in Germania, Russia, USA, Italia, scuole che hanno portato nuovi contributi sia alla ricerca di base che a quella clinica, favorendo l'ulteriore diffusione di questa metodica in tutto il mondo.<br>Il merito di Nogier rimane quello di essere stato il primo a riconoscere nell'orecchio una somatotopia che ha cercato di sistematizzare; non ha certo inventato l'auricoloterapia, ma è stato il primo ad immaginare un feto rappresentato sull'orecchio, da cui dedusse una somatotopia che cercò di sistematizzare dando corpo ad una pratica vecchia di 3000 anni.  <br>I mezzi di ricerca più moderni hanno permesso poi di sottoporre a verifica quanto Nogier aveva intuito, di correggere ciò che non era perfetto e di stabilire scientificamente i criteri di una nuova neuro-agopuntura dell'orecchio.<ul><li>1963 J.Boyer, agopuntore, descrive le proprietà elettriche dei punti di agopuntura, compresi quelli dei meridiani che passano per l'orecchio.</li><li>1969 R. Jarricot, studiando i metameri, osserva la corrispondenza tra aree metameriche e localizzazioni dei punti auricolari.</li><li>1972 Jean Begue, elettrofisiologo, studia i dermo-potenziali e lavorando sull'orecchio dimostra che esiste una d.d.p. tra un punto e l'alto di circa 8mV.</li><li>1975 J.Bossy, neuroanatomico di Montpellier, studia l'orecchio da un punto di vista neuroanatomico.</li><li>1972-1983 R.Bourdiol lavora sulla spiegazione neuroscientifica dei punto dell'orecchio.</li><li>1980 Pierre Rabichong, neurochirurgo del midollo, lavora sulle caratteristiche fisiche dei punti dell'orecchio.</li><li>1979 Robert Covertat conferma i lavori di Rabichong </li><li>1980-85 René Kovacs lavora sulla neurologia dell'orecchio ponendo le basi neurofisiologiche per lo studio dell'auricoloterapia.</li><li>1980 Tourignan conferma numerosi punti auricolari e Kruger lavora in medicina veterinaria sul cavallo e sul cane.</li><li>1985 Odine Hausach, istologo a Montpellier, presenta un lavoro sull'istologia dei punti dell'orecchio.</li><li>1986 L'O.M.S. riconosce l'efficacia dell'auricoloterapia.</li><li>1990 Si stabilisce la prima nomenclatura internazionale dei punti auricolari.</li><li>1994 Si svolge a Lione il I° Congresso Internazionale di Auricoloterapia.</li><li>1994 David Alimì, neurofisiologo, dimostra che le variazioni del campo elettrico dei punti dell'orecchio seguono il ritmo circadiano del cortisolo con un picco alle ore 8 seguito da una discesa ed un nuovo picco alle ore 17, seguito da una nuova discesa; la secrezione di cortisolo è praticamente assente durante la notte, per riprendere un'ora circa prima del risveglio, con un seguente picco verso le ore 8.</li><li>1997 Michel Marignan, posturologo allievo di P.Nogier, dimostra che attivando termicamente dei punti sull'avambraccio si ottenevano variazioni termiche a livello di punti precisi dell'orecchio e viceversa.</li><li>1997 David Alimì dimostra l'efficacia dell'auricoloterapia nel trattamento del dolore nocicettivo e neuropatico oncologico resistente a terapia, dimostrandone la supremazia rispetto alla terapia farmacologica.</li><li>2002 David Alimì con RMF dimostra la corrispondenza tra la cartografia cerebrale e quella auricolare. </li><li>2003 David Alimì conferma l'efficacia dell'auricoloterapia nei dolori oncologici in doppio cieco con doppio placebo.</li></ul><br><br><b>Auricoloterapia e Università</b><br>La Facoltà di Medicina di Parigi 13 Bobigny, nata nel 1968, istituì nel 1982 grazie al Prof. Carnillot, il Diploma Universitario in Medicina Naturale comprendente l'Agopuntura,la Fitoterapia, la Mesoterapia, l'Osteopatia, l'Omeopatia e l'Auricolo-terapia (aggiunta all'ultimo momento all'elenco delle Medicine Naturali). <br>Nel 1992 Carnillot, biochimico di formazione, propose di istituire il Diploma Universitario di Auricoloterapia e nel 1995 ci furono 2 iscritti.<br>Attualmente si è costituito il Dipartimento Universitario di Medicina Naturale (D.U.ME.NAT.), diretto da Antoine Lazarus, nel cui ambito si attua il Diploma Inter- Universitario di Auricoloterapia (D.I.U.) <br>Il solo modo per sopravvivere era di iniziare una ricerca seria sull'Auricoloterapia e si cominciò nel 2000 con il lavoro pubblicato due anni dopo, nel 2002, sulla corrispondenza tra la cartografia auricolare e quella cerebrale. I primi esperimenti furono fatti sul pollice in quanto, unitamente alle labbra e agli organi genitali, sono le strutture che hanno una più ampia rappresentazione corticale; si evidenziò una corrispondenza perfetta tra la stimolazione diretta del pollice e la stimolazione del punto auricolare corrispondente al pollice che eccitano la medesima area corticale con una precisione millimetrica. Nel 15% degli individui la rappresentazione corticale è bilaterale (pollice dx nell'emisfero sx e anche dx e viceversa per il pollice sx) il che si spiega agevolmente conoscendo il ruolo del corpo calloso che ha il compito di smistare i segnali che gli arrivano tra i due emisferi.<br>Oggi, grazie ai lavori di RMF di perfusione si sa che il corpo calloso funge da direttore tra dx e sx del traffico delle stimolazioni che gli afferiscono. Tutto ciò è molto importante in quanto spiega il motivo per cui in alcune strategie terapeutiche risulterà di grande utilità la stimolazione del corpo calloso. Il ruolo del corpo calloso spiega anche il perché abbiamo la predisposizione ad essere ambidestri pur essendo noto che la bidestria neurologicamente non esiste: o si è destri o si è mancini.<br>Nei cosiddetti ambidestri i circuiti del corpo calloso sono deviati per cui queste persone hanno facilità ad utilizzare più o meno entrambe le mani. Nella rieducazione post-ictus è utile indurre i pazienti ad utilizzare la mano non dominante al fine di attivare tali deviazioni che possono aiutare le rieducazione e la ripresa motoria. La cartografia auricolare e corticale sono omotetiche (omotesia cartografica).<br>L'auricoloterapia è quindi un microsistema, cioè un'area ristretta del corpo dove si proiettano e riflettono funzioni e strutture del corpo. <br>La teoria sui microsistemi è anche alla base della:<br>- Medicina Tradizionale Cinese, <br>- del Modello Riflesso-neurofisiologico attraverso i foglietti embrionali, <br>- del Modello olografico (chiamato anche ECIWO), secondo cui ogni parte relativamente indipendente del corpo, esempio gli organi zang-fu, gli arti, le ossa, le orecchie il naso etc etc contiene le informazioni dell'intero organismo come ne fosse una sua miniatura; da ciò si deduce che un microsistema può ricevere e/o inviare segnali al resto dell'organismo. <br>- del Modello Neuroendocrino, per cui la risposta viscere-agopunto auricolare risenta dell'azione combinata svolta dal sistema simpatico e dalle ghiandole surrenali. <br>L'auricoloterapia va utilizzata in supporto al Tuina e all'agopuntura, anche se è importante dire che spesso per le patologie acute, l'auricoloterapia è un ottimo e validissimo metodo di cura, mentre per i problemi che si sono cronicizzati è molto più incisivo e risolutivo il massaggio Tuina o l'agopuntura."
                },
                {
                    TitoloTeoria: "Introduzione alla terapia auricolare",
                    TestoTeoria: "L'agopuntura auricolare o auricoloterapia, come del resto tutti i microsistemi, si differenzia dall'agopuntura somatica o tradizionale in quanto può essere utilizzata sia a scopo diagnostico che terapeutico.<br><br>L'esame semeiologico del padiglione auricolare risulta indispensabile sia per la diagnosi auricolare quanto per ricercare e selezionare i punti auricolare al di là, delle seppur indispensabili, definizioni della loro localizzazione ed indicazione terapeutica.<br>La semeiologia auricolare consta delle seguenti tappe che debbono essere eseguite rispettando l'ordine cronologico anche se, non tutte le tappe debbono obbligatoriamente essere eseguite e sono:<ol><li>Ispezione</li><li>Detezione elettrica</li><li>Palpazione manuale del padiglione auricolare</li><li>Test della sensibilità barestesica mediante bastoncino di vetro</li><li>Test del dolore alla pressione o PPT (Pain Pressure Test) mediante il Palpeur</li><li>Test del contatto dell'ago o NCT (Needle Contact Test).</li></ol>"
                },
                {
                    TitoloTeoria: "Dominanza e lateralità",
                    TestoTeoria: "Il cervello umano è composto da due emisferi i quali pur appartenendo ad un'unica unità funzionale hanno compiti diversi e complementari. <br>L'emisfero sinistro è quello della razionalità. È l'emisfero deputato alla logica, alla matematica ed al linguaggio.<br>L'emisfero destro è quello della fantasia dell'ideazione e delle emozioni. <br>Naturalmente non possiamo parlare di distinzioni così nette ma di prevalenza. Spesso gli artisti sono infatti mancini come spesso gli scienziati e matematici sono destrosi.<br><br>La scuola Francese, diversamente da quella Orientale, ha sempre dato molta importanza alla lateralità del paziente per la scelta dei punti di Auricoloterapia. <br>Dobbiamo subito dire che praticamente non esiste (o quasi) il paziente completamente destro o quello esclusivamente mancino ma avremmo un soggetto prevalentemente destro o prevalentemente mancino.  Dovremmo quindi valutare vari distretti corporei quali: mano, piede occhio.<br>Questo ci darà il grado di prevalenza di una o l'altra lateralità ma anche la sua armonia. Il medico quindi valuterà con delle semplici domande o manovre i tre singoli distretti.<br>Ad esempio:<ul><li><i>Mano:</i> quale mano utilizzi per lavarti i denti? Quale mano utilizzi per scrivere?</li><li><i>Piede:</i> su quale gamba rimani fermo su un piede? Quale gamba è sopra quando le accavalli?</li><li><i>Occhio:</i> quale occhio preferisci utilizzare per scattare una foto? E per mirare?</li></ul>"
                },
                {
                    TitoloTeoria: "Scelta dei punti",
                    TestoTeoria: "La scelta dei punti è un momento delicato dell'auricoloterapia. La scelta infatti, condiziona inesorabilmente il risultato finale. Riassumendo potremmo dire che la scelta viene fatta secondo questi criteri:<ul><li>Indicazioni dei Punti auricolari<br>Alla classe d'appartenenza del Punto di auricoloterapia ovvero se è un Punto funzionale (I o II Livello) oppure un Punto neuroriflesso.</li><li>Sensibilità delle aree/punti di agopuntura auricolare alle fasi semeiologiche del padiglione auricolare</li><li>Lateralità del soggetto</li></ul><br>Tutti questi concetti vanno tra loro integrati. La regola aurea che ci deve guidare nella scelta che non possiamo prescindere dalla semeiologia auricolare e che pertanto non andremmo mai a pungere un punto che non sia sensibile alla detezione elettrica, oppure alla sensibilità barestesica."
                },
                {
                    TitoloTeoria: "Tecniche di stimolazione e strumenti",
                    TestoTeoria: "La stimolazione del padiglione auricolare si possono classificare in base a vari criteri. Quello più semplice si basa sulla sua durata. Avremmo quindi:<ul><li>Stimolazione breve</li><li>Stimolazione Prolungata</li></ul><br>La stimolazione breve è consuetudine farla durare circa 20/30 minuti. In questo caso potremmo utilizzare strumenti idonei allo scopo quali l'ago estemporaneo ma anche tecniche più dolci quali il massaggio auricolare può rientrare in questa classificazione.<br>La stimolazione prolungata, invece, si avvale prevalentemente di aghi a semi-permanenza. Sono aghi che, come dice la parola stessa, possono essere lasciati in loco per alcuni giorni. Debbono poi essere rimossi e prima di essere riposizionati nello stesso punto necessitano un periodo di wash out. Altre tecniche comunque possono dare una stimolazione prolungata del padiglione auricolare quali: semi di vaccaria, le sfere, la cryoterapia e la TENS del nervo vago auricolare (taVNS).<br><br>Un altro modo di classificare la stimolazione del punto auricolare è basato sua entità. Ovvero abbiamo tecniche d:<ul><li>Modulazione del punto auricolare</li><li>Disorganizzazione del punto auricolare</li></ul><br><br>La scelta del tipo di stimolazione va fatta tenendo conto, della classificazione del punto auricolare (Funzionale o Neuroriflesso) della soglia del paziente, dell'età del paziente e della problematica del soggetto.<br><br>La modulazione del punto di agopuntura la si può ottenere con il massaggio del punto auricolare, con le sferette metalliche, i semi di vaccaria, il laser e la stimolazione taVNS.<br><br>La disorganizzazione del punto auricolare la possiamo ottenere con l'ago semplice o estemporaneo in tutte le sue sfaccettature (Infissione semplice, trasfissione, imbastitura, criblege ecc..) ma anche ovviamente con gli aghi a semi-permanenza, con l'elettro agopuntura e la cryoterapia auricolare."
                },
                {
                    TitoloTeoria: "Svolgimento della seduta",
                    TestoTeoria: "La seduta terapeutica non è altro che la risultante delle scelte precedentemente fatte ovvero dei punti scelti e quale modalità di stimolazione vogliamo utilizzare.<br>La seduta deve tenere anche e soprattutto conto del soggetto e della patologia che andremo a trattare.<br>Uno schema di agopuntura auricolare deve avere le seguenti caratteristiche:<ul><li>Punto Funzionale di I livello</li><li>Punto Funzionale di II livello</li><li>Punto Neuro-riflesso</li></ul>La frequenza delle sedute sarà all'incirca settimanale nel caso di stimolazione breve nel caso di invece di stimolazione prolungata sarà ogni 2/3 settimane.<br>Il numero delle sedute può variare, all'incirca 6-10 sedute in caso di stimolazione breve; 4-5 sedute in caso di stimolazione prolungata.<br><br>Il numero degli aghi viene fortemente condizionato da vari fattori quali:<ul><li>Sensibilità del paziente</li><li>Età del paziente</li><li>Modalità di stimolazione</li></ul><br>Nel momento in cui viene infisso il primo ago subito abbiamo la percezione del grado di sensibilità del soggetto. In caso di soggetti con alta soglia possiamo/dobbiamo utilizzare qualche ago in più, viceversa in un paziente con bassa soglia di tolleranza agli aghi. <br><br>Normalmente quanto più è giovane il paziente tanti meno aghi sono necessari per la seduta terapeutica, viceversa in una persona adulta/anziana sono necessari più aghi.<br><br>La modalità di stimolazione condiziona fortemente il numero degli aghi. È chiaramente possibile utilizzare più aghi se tutti sono in infissione semplice, mentre se utilizziamo l'imbastitura o la trasfissione il numero degli aghi cala fortemente<br><br>Il numero degli aghi complessivi è circa 6-8 aghi divisi nei due padiglioni. Molta attenzione va posta a non creare l'over stimulation. Nel caso in cui si sia scelto di fare una stimolazione prolungata con degli aghi a semi-permanenza è probabilmente utile stimolare un solo padiglione auricolare per favorire la compliance del paziente."
                },
                {
                    TitoloTeoria: "Precauzioni e deontologia",
                    TestoTeoria: "L'agopuntura, in molti paesei, è considerato un atto Medico. Il tal caso il suo utilizzo e la sua prescrizione deve quindi fare riferimento al Codice Deontologico.<br><br>Altre modalità di stimolazione del padiglione auricolare, ad esclusione quindi dell'ago, potranno essere fatte anche da altri professionisti.<br>Il problema principale è la diagnosi. Una terapia corretta non si può e non si deve limitare al solo trattamento del sintomo ma anche della causa. Solo la Terapia Palliativa, per definizione, cura esclusivamente il sintomo. In tutte le altre si può e si deve cercare di curare la causa. <br>Il Medico che effettua e propone l'agopuntura al paziente \"non deve sottrarre il cittadino a trattamenti specifici e scientificamente consolidati...\" (Art 15 codice deontologico).<br><br>Prima di eseguire l'agopuntura auricolare è indispensabile rendere il padiglione auricolare idoneo per poter essere sottoposto all'agopuntura. Questo per evitare le infezioni che nel caso del padiglione sono infezioni molto serie che portano alla condrite. La preparazione della cute consta di due momenti.<br><br><b>Detersione:</b> è la pulizia del padiglione e consiste nel rimuovere le impurità e le secrezioni anche con un semplice batuffolo di cotone.<br><br><b>Disinfezione:</b> operazione che viene effettuata mediante disinfettanti organici o inorganici per la distruzione di germi patogeni. Nel caso di aghi estemporanei è consigliabile utilizzare disinfettanti a base di ammonio quaternario, clorexidina. Nel caso di utilizzo di aghi a semi-permanenza od in pazienti immunodepressi è consigliabile l'uso di disinfettanti a base di iodopovidone."
                }
            ],
            noList: true
        },
        { // crediti
            TitoloSezione: "Autori e bibliografia",
            contenuti: [
                {
                    TitoloTeoria: "Curatore scientifico",
                    TestoTeoria: "<img class='autore' src='sets/auricologia/img/autore_antonello_lovato.jpg'><b>Antonello Lovato</b><br>Medico Chirurgo, Direttore del Corso di Agopuntura Auricolare presso A.I.R.A.S. di Padova.<br>Nel 2001 si diploma alla Fondazione Matteo Ricci in Agopuntura Auricolare nel corso diretto dal dott. Romoli che conosce già dal 1998.<br>Nel 2002 si diploma all’AIRAS nel corso quadriennale di Riflessoterapia e Tecniche Complementari e consegue l’attestato Italiano di Agopuntura della F.I.S.A.<br>Nel 2012 consegue il Diploma Interuniversitario di Auricoloterapia presso l’Università di Parigi, diretto dal prof Aimì.<br>Nel 2012 consegue il Master di II livello in Fitoterapia Applicata presso l’Università di Siena.<br>Nel 2018 consegue il Master di II livello presso l’Università di Sassari in Neuromodulazione auricolare-Auricoloterapia.<br>già Consigliere nazionale e delegato regionale per il Veneto e docente ufficiale F.I.S.A.<br>Consigliere nazionale della S.I.R.A.A.<br><br><b>A.I.R.A.S.</b> (Associazione Italiana per la Ricerca e l'Aggiornamento Scientifico) Padova<br>È un’associazione senza fini di profitto fondata il 6 novembre 1986 per lo studio e la ricerca nelle tecniche terapeutiche non convenzionali.<br>È la culla scientifico-didattica dove viene proposta una formazione basata sulle conoscenze della Medicina Scientifica, collabora e finanzia la ricerca scientifica e la divulgazione di un punto di vista complementare delle tecniche trattate.<br><b>&raquo;</b> <a class='ext_link' onClick=\"CONN.openUrl('https://www.airas.it/');\">https://www.airas.it/</a><br><br><b>Pubblicazioni</b><br>- Agopuntura Auricolare. Teoria e Clinica<br>ed. NOI Edizioni<br>Anno 2019<br><b>&raquo;</b> <a class='ext_link' onClick=\"CONN.openUrl('https://www.noiedizioni.com/prodotto/agopuntura-auricolare/');\">https://www.noiedizioni.com/prodotto/agopuntura-auricolare/</a><br><br>- The Medial Surface of che Auriche: historical and Recent Maps. What Are the Possible Expectation of the 'Thumb-Index Technique'.<br><i>Lovato, Ceccherelli, Gagliardi, Postiglione.</i><br>Anno 2022<br><b>&raquo;</b> <a class='ext_link' onClick=\"CONN.openUrl('https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8879682/' );\">https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8879682/</a><br><br>- Acupuncture in the treatment of Dry Eye Syndrome with anxiety symptoms. A case report.<br><i>Pesavento, Lovato, Cappello, Postiglione.</i><br>Anno 2022<br><b>&raquo;</b> <a class='ext_link' onClick=\"CONN.openUrl('https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9295179/');\">https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9295179/</a><br><br>- Somatic acupuncture versus ear acupuncture in migraine therapy: a randomized, controlled, blind study.<br><i>Ceccherelli F, Lovato A, Piana E, Gagliardi G, Roveri A.</i><br>Anno 2022<br><b>&raquo;</b> <a class='ext_link' onClick=\"CONN.openUrl('https://pubmed.ncbi.nlm.nih.gov/23409612/');\">https://pubmed.ncbi.nlm.nih.gov/23409612/</a>"
                },
                {
                    TitoloTeoria: "Riferimenti bibliografici",
                    TestoTeoria: "<p class='cont_libri'><img class='libro' src='sets/auricologia/img/libro_antonello_lovato.png'><b>1. Agopuntura Auricolare. Teoria e Clinica</b><br><i>di Antonello Lovato</i><br>ed. NOI Edizioni<br>Anno 2019<br><b>&raquo;</b> <a class='ext_link' onClick=\"CONN.openUrl('https://www.noiedizioni.com/prodotto/agopuntura-auricolare/');\">Scopri di più</a><br><br>Il testo si propone come guida teorica e pratica dell'agopuntura auricolare. Descrive la nascita e l'evoluzione dell'agopuntura auricolare in Francia ed in Oriente, analizza le varie aree del padiglione auricolare alla luce delle intuizioni di P. Nogier, confronta e analizza le mappe Francesi e Cinesi e le inserisce nella mappa di T. Oleson. L'anima del libro sono le 99 schede terapeutiche. ll testo si dimostra esaustivo, flessibile e funzionale, adattandosi sia a medici neofiti che esperti.<span style='display: block;' class='l'></span></p><p class='cont_libri'><b>2. Auriculotherapy Manual, Chinese and Western Systems or Ear Acupuncture</b><br><i>di Terry Oleson</i><br>ed. Elsevier<br>Anno 2003</p><p class='cont_libri'><b>3. La diagnosi in agopuntura auricolare</b><br><i>di Marco Romoli</i><br>ed. NOI edizioni<br>Anno 2015</p><p class='cont_libri'><b>4. Auriculotherapy</b><br><i>di Raphael Nogier, MD</i><br>ed. Thiemme<br>Anno 2008</p><p class='cont_libri'><b>5. Nozioni di Auricoloterapia</b><br><i>di Alfredo Gaito</i><br>ed. Libreria Cortina Torino</p><p class='cont_libri'><b>6. Agopuntura Auricolare</b><br><i>di Marco Romoli</i><br>ed. UTET<br>Anno 2003</p><p class='cont_libri'><b>7. L'auricolotherapie medicale</b><br><i>di David Alimì</i><br>ed. Elsevier<br>Anno 2017</p><p class='cont_libri'><b>8. Elements d'auricolotherapie</b><br><i>di R. J. Bourdiol</i><br>ed. Maisonneuve<br>Anno 1980</p><p class='cont_libri'><b>9. Introduzione pratica all'auricoloterapia</b><br><i>di Paul Nogier</i><br>ed. Librerie Cortina Torino<br>Anno 1999</p><p class='cont_libri'><b>10. Conoscere l'auricoloterapia</b><br><i>di Giancarlo Bazzoni</i><br>ed. Menin<br>Anno 2009</p><p class='cont_libri'><b>11. Ear Acupuncture</b><br><i>di Beate Strittmatter</i><br>ed. Thiemme<br>Anno 2002</p>"
                },
                {
                    TitoloTeoria: "Crediti",
                    TestoTeoria: "Ringraziamo per il prezioso contributo allo sviluppo dell'applicazione, sia sotto il profilo contenutistico, nelle loro specifiche competenze, sia per quel che riguarda l'ottimizzazione e il funzionamento:<br><br><img class='autore_mini' src='sets/auricologia/img/autore_zion_levy.jpg'><b>dr. Zion Levy</b><br>Medico specializzato in anestesia e rianimazione, Agopuntore, Auricolopuntore e referente per la medicina complementare presso l'ospedale di Siena<div class='l separatorePulsanti'></div><img class='autore_mini' src='sets/auricologia/img/autore_giorgio_bertani.jpg'><b>dr. Giorgio Eugenio Bertani</b><br>Medico di medicina integrata, specializzato in Iridologia Medica e Medicina termale, Agopuntore, Fitoterapeuta, Omeopata, Sessuologo e operatore del riequilibrio Cranio Sacrale."
                }
            ],
            noList: true
        }
    ]
}