
var moduliValutazione = {
    /*
    ogni modello ha3 campi:

    - title: il nome del modello

    - data:
        - t: il tipo di rappresentazione e può avere i seguenti valori
            b: titoletto
            e: etichetta
            d: domanda e risposta testuale
            s: select con risposte multiple, indicate in l
            c: checkbox, i cui valori sono indicati in l
            r: radio, i cui valori sono indicati in l
            t: textarea
        - d: il contenuto della domanda
        - l: lista delle risposte in caso di select, checkbox o radio

    - html: il modello di rappresentazione del modulo
        gli elementi [n] saranno sostituiti in automatico dagli elementi di data dove n è il numero sequenziale dell'elemento

    se "data.l" è un valore stringa (es. "lista") vuol dire che lista è una variabile riferita in moduliValutazione.list.lista


    
    IMPORTANTE: PER EVITARE ERRORI!!!!!
    se si decide di eliminare un elemento dai modelli è necessario lasciare il sottoelemento "html"
    se si decide di non utilizzare più un elemento da "liste" lasciarlo comunque


    */

    liste: {
        stati_polsi: [
            {
                ita: "",
                eng: "",
                esp: "",
                fra: "",
                por: "",
                deu: ""
            },
            {
                ita: "Fluttuante (Fu Mai)",
                eng: "Floating (Fu Mai)",
                esp: "Flotante (Fu Mai)",
                fra: "Flottant (Fu Mai)",
                por: "Flutuante (Fu Mai)",
                deu: "Schwebend (Fu Mai)"
            },
            {
                ita: "Profondo (Chen Mai)",
                eng: "Deep (Chen Mai)",
                esp: "Profundo (Chen Mai)",
                fra: "Profond (Chen Mai)",
                por: "Profundo (Chen Mai)",
                deu: "Tief (Chen Mai)"
            },
            {
                ita: "Lento (Chi Mai)",
                eng: "Slow (Chi Mai)",
                esp: "Lento (Chi Mai)",
                fra: "Lent (Chi Mai)",
                por: "Lento (Chi Mai)",
                deu: "Langsam (Chi Mai)"
            },
            {
                ita: "Rapido (Shu Mai)",
                eng: "Rapid (Shu Mai)",
                esp: "Rápido (Shu Mai)",
                fra: "Rapide (Shu Mai)",
                por: "Rápido (Shu Mai)",
                deu: "Schnell (Shu Mai)"
            },
            {
                ita: "Vuoto (Xu Mai)",
                eng: "Empty (Xu Mai)",
                esp: "Vacío (Xu Mai)",
                fra: "Vide (Xu Mai)",
                por: "Vazio (Xu Mai)",
                deu: "Leer (Xu Mai)"
            },
            {
                ita: "Pieno (Shi Mai)",
                eng: "Full (Shi Mai)",
                esp: "Lleno (Shi Mai)",
                fra: "Plein (Shi Mai)",
                por: "Cheio (Shi Mai)",
                deu: "Voll (Shi Mai)"
            },
            {
                ita: "Scivoloso (Hua Mai)",
                eng: "Slippery (Hua Mai)",
                esp: "Resbaladizo (Hua Mai)",
                fra: "Glissant (Hua Mai)",
                por: "Escorregadio (Hua Mai)",
                deu: "Glatt (Hua Mai)"
            },
            {
                ita: "Ruvido (Se Mai)",
                eng: "Rough (Se Mai)",
                esp: "Áspero (Se Mai)",
                fra: "Rugueux (Se Mai)",
                por: "Áspero (Se Mai)",
                deu: "Rauh (Se Mai)"
            },
            {
                ita: "Sottile (Xi Mai)",
                eng: "Thin (Xi Mai)",
                esp: "Fino (Xi Mai)",
                fra: "Mince (Xi Mai)",
                por: "Fino (Xi Mai)",
                deu: "Dünn (Xi Mai)"
            },
            {
                ita: "Ampio (Hong Mai)",
                eng: "Wide (Hong Mai)",
                esp: "Amplio (Hong Mai)",
                fra: "Large (Hong Mai)",
                por: "Largo (Hong Mai)",
                deu: "Breit (Hong Mai)"
            },
            {
                ita: "Stretto (Xian Mai)",
                eng: "Tight (Xian Mai)",
                esp: "Apretado (Xian Mai)",
                fra: "Tendu (Xian Mai)",
                por: "Tenso (Xian Mai)",
                deu: "Straff (Xian Mai)"
            },
            {
                ita: "Morente (Ge Mai)",
                eng: "Dying (Ge Mai)",
                esp: "Moribundo (Ge Mai)",
                fra: "Mourant (Ge Mai)",
                por: "Morrendo (Ge Mai)",
                deu: "Sterbend (Ge Mai)"
            },
            {
                ita: "Debole (Ruo Mai)",
                eng: "Weak (Ruo Mai)",
                esp: "Débil (Ruo Mai)",
                fra: "Faible (Ruo Mai)",
                por: "Fraco (Ruo Mai)",
                deu: "Schwach (Ruo Mai)"
            },
            {
                ita: "Rapido-Irregolare (Cu Mai)",
                eng: "Rapid-Irregular (Cu Mai)",
                esp: "Rápido-Irregular (Cu Mai)",
                fra: "Rapide-Irrégulier (Cu Mai)",
                por: "Rápido-Irregular (Cu Mai)",
                deu: "Schnell-Unregelmäßig (Cu Mai)"
            },
            {
                ita: "Lento-Irregolare (Jie Mai)",
                eng: "Slow-Irregular (Jie Mai)",
                esp: "Lento-Irregular (Jie Mai)",
                fra: "Lent-Irrégulier (Jie Mai)",
                por: "Lento-Irregular (Jie Mai)",
                deu: "Langsam-Unregelmäßig (Jie Mai)"
            },
            {
                ita: "Regolare-Irregolare (Dai Mai)",
                eng: "Regular-Irregular (Dai Mai)",
                esp: "Regular-Irregular (Dai Mai)",
                fra: "Régulier-Irrégulier (Dai Mai)",
                por: "Regular-Irregular (Dai Mai)",
                deu: "Regelmäßig-Unregelmäßig (Dai Mai)"
            },
            {
                ita: "Bagnato (Shi Mai)",
                eng: "Wet (Shi Mai)",
                esp: "Húmedo (Shi Mai)",
                fra: "Humide (Shi Mai)",
                por: "Úmido (Shi Mai)",
                deu: "Nass (Shi Mai)"
            },
            {
                ita: "Allagato (Da Mai)",
                eng: "Flooded (Da Mai)",
                esp: "Inundado (Da Mai)",
                fra: "Inondé (Da Mai)",
                por: "Inundado (Da Mai)",
                deu: "Überflutet (Da Mai)"
            },
            {
                ita: "Sommerso (Fu Mai)",
                eng: "Submerged (Fu Mai)",
                esp: "Sumergido (Fu Mai)",
                fra: "Submergé (Fu Mai)",
                por: "Submerso (Fu Mai)",
                deu: "Untergetaucht (Fu Mai)"
            },
            {
                ita: "Pulsante (Dong Mai)",
                eng: "Pulsating (Dong Mai)",
                esp: "Pulsante (Dong Mai)",
                fra: "Pulsant (Dong Mai)",
                por: "Pulsante (Dong Mai)",
                deu: "Pulsierend (Dong Mai)"
            },
            {
                ita: "Debole-Superficiale (Wei Mai)",
                eng: "Weak-Superficial (Wei Mai)",
                esp: "Débil-Superficial (Wei Mai)",
                fra: "Faible-Superficiel (Wei Mai)",
                por: "Fraco-Superficial (Wei Mai)",
                deu: "Schwach-Oberflächlich (Wei Mai)"
            },
            {
                ita: "Cavo (Kou Mai)",
                eng: "Hollow (Kou Mai)",
                esp: "Hueco (Kou Mai)",
                fra: "Creux (Kou Mai)",
                por: "Oco (Kou Mai)",
                deu: "Hohl (Kou Mai)"
            },
            {
                ita: "Sospeso (San Mai)",
                eng: "Suspended (San Mai)",
                esp: "Suspendido (San Mai)",
                fra: "Suspendu (San Mai)",
                por: "Suspenso (San Mai)",
                deu: "Schwebend (San Mai)"
            },
            {
                ita: "Lungo (Chang Mai)",
                eng: "Long (Chang Mai)",
                esp: "Largo (Chang Mai)",
                fra: "Long (Chang Mai)",
                por: "Longo (Chang Mai)",
                deu: "Lang (Chang Mai)"
            },
            {
                ita: "Corto (Duan Mai)",
                eng: "Short (Duan Mai)",
                esp: "Corto (Duan Mai)",
                fra: "Court (Duan Mai)",
                por: "Curto (Duan Mai)",
                deu: "Kurz (Duan Mai)"
            },
            {
                ita: "Teso (Jin Mai)",
                eng: "Tight (Jin Mai)",
                esp: "Tenso (Jin Mai)",
                fra: "Tendu (Jin Mai)",
                por: "Esticado (Jin Mai)",
                deu: "Stramm (Jin Mai)"
            },
            {
                ita: "Moderato (Huan Mai)",
                eng: "Moderate (Huan Mai)",
                esp: "Moderado (Huan Mai)",
                fra: "Modéré (Huan Mai)",
                por: "Moderado (Huan Mai)",
                deu: "Mäßig (Huan Mai)"
            },
            {
                ita: "Disperso (San Mai)",
                eng: "Scattered (San Mai)",
                esp: "Disperso (San Mai)",
                fra: "Dispersé (San Mai)",
                por: "Disperso (San Mai)",
                deu: "Zerstreut (San Mai)"
            }            
        ],
        colori_pelle: [
            {
                ita: "",
                eng: "",
                esp: "",
                fra: "",
                por: "",
                deu: ""
            },
            {
                "ita": "Rosso",
                "eng": "Red",
                "esp": "Rojo",
                "fra": "Rouge",
                "por": "Vermelho",
                "deu": "Rot"
            },
            {
                "ita": "Pallido",
                "eng": "Pale",
                "esp": "Pálido",
                "fra": "Pâle",
                "por": "Pálido",
                "deu": "Blass"
            },
            {
                "ita": "Giallo",
                "eng": "Yellow",
                "esp": "Amarillo",
                "fra": "Jaune",
                "por": "Amarelo",
                "deu": "Gelb"
            },
            {
                "ita": "Verde-bluastro",
                "eng": "Greenish-blue",
                "esp": "Verdoso-azulado",
                "fra": "Vert-bleuâtre",
                "por": "Esverdeado-azulado",
                "deu": "Grünlich-bläulich"
            },
            {
                "ita": "Nero-grigiastro",
                "eng": "Blackish-gray",
                "esp": "Negruzco-grisáceo",
                "fra": "Noir-grisâtre",
                "por": "Enegrecido-acinzentado",
                "deu": "Schwarz-grau"
            }                                                   
        ],
        stati_energetici: [
            {
                ita: "",
                eng: "",
                esp: "",
                fra: "",
                por: "",
                deu: ""
            },
            {
                ita: "P",
                eng: "E",
                esp: "E",
                fra: "E",
                por: "E",
                deu: "Ü"
            },
            {
                ita: "V",
                eng: "D",
                esp: "D",
                fra: "D",
                por: "D",
                deu: "M"
            }                      
        ],
        rates: [
            "",
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10"
        ]
    },
    modelli: {
        "mtc_lingua_sintetica": {
            title: {
                "ita": "Valutazione MTC Lingua (sintetica)",
                "eng": "TCM Tongue Assessment (concise)",
                "esp": "Evaluación de lengua MTC (concisa)",
                "fra": "Évaluation de la langue MTC (synthétique)",
                "por": "Avaliação de língua MTC (concisa)",
                "deu": "MTC Zungenbewertung (kurz)"
            },
            data: [
                {
                    t: 'r',
                    d: {
                        ita: "Situazione della lingua",
                        eng: "Tongue Condition",
                        esp: "Situación de la lengua",
                        fra: "État de la langue",
                        por: "Situação da língua",
                        deu: "Zustand der Zunge"
                    },
                    l: [
                        {
                            ita: "Normale",
                            eng: "Normal",
                            esp: "Normal",
                            fra: "Normal",
                            por: "Normal",
                            deu: "Normal"
                        },
                        {
                            ita: "Vuoto di Qi",
                            eng: "Qi Deficiency",
                            esp: "Deficiencia de Qi",
                            fra: "Vide de Qi",
                            por: "Deficiência de Qi",
                            deu: "Qi-Mangel"
                        },
                        {
                            ita: "Caldo",
                            eng: "Heat",
                            esp: "Calor",
                            fra: "Chaleur",
                            por: "Calor",
                            deu: "Hitze"
                        },
                        {
                            ita: "Stagnazione di Qi",
                            eng: "Qi Stagnation",
                            esp: "Estancamiento de Qi",
                            fra: "Stagnation du Qi",
                            por: "Estagnação de Qi",
                            deu: "Qi-Stagnation"
                        },
                        {
                            ita: "Stasi di Sangue",
                            eng: "Blood Stasis",
                            esp: "Estasis de Sangre",
                            fra: "Stase de Sang",
                            por: "Estase de Sangue",
                            deu: "Blutstase"
                        },
                        {
                            ita: "Vuoto di Yang",
                            eng: "Yang Deficiency",
                            esp: "Deficiencia de Yang",
                            fra: "Vide de Yang",
                            por: "Deficiência de Yang",
                            deu: "Yang-Mangel"
                        },
                        {
                            ita: "Vuoto di Yin",
                            eng: "Yin Deficiency",
                            esp: "Deficiencia de Yin",
                            fra: "Vide de Yin",
                            por: "Deficiência de Yin",
                            deu: "Yin-Mangel"
                        },
                        {
                            ita: "Caldo umido",
                            eng: "Damp-Heat",
                            esp: "Calor Humedad",
                            fra: "Chaleur Humide",
                            por: "Calor Umidade",
                            deu: "Feuchte Hitze"
                        },
                        {
                            ita: "Ritenzione di umidità",
                            eng: "Damp Retention",
                            esp: "Retención de Humedad",
                            fra: "Rétention d'Humidité",
                            por: "Retenção de Umidade",
                            deu: "Feuchtigkeitsretention"
                        },
                        {
                            ita: "Carenza di Sangue",
                            eng: "Blood Deficiency",
                            esp: "Deficiencia de Sangre",
                            fra: "Déficience de Sang",
                            por: "Deficiência de Sangue",
                            deu: "Blutmangel"
                        }                        
                    ]
                },
                {
                    t: 'd',
                    d: {
                        ita: "Commenti",
                        eng: "Comments",
                        esp: "Comentarios",
                        fra: "Commentaires",
                        por: "Comentários",
                        deu: "Kommentare"
                    }
                }
            ],
            html:   '<div id="moduloLinguaSinteticaMTC">' +
                    '   <div class="md_contRadioExp"><div>' +
                    '       <div id="md_lingua0" class="md_radioExp">[0,0]</div>' +
                    '       <div id="md_lingua1" class="md_radioExp">[0,1]</div>' +
                    '       <div id="md_lingua2" class="md_radioExp">[0,2]</div>' +
                    '       <div id="md_lingua3" class="md_radioExp">[0,3]</div>' +
                    '       <div id="md_lingua4" class="md_radioExp">[0,4]</div>' +
                    '       <div id="md_lingua5" class="md_radioExp">[0,5]</div>' +
                    '       <div id="md_lingua6" class="md_radioExp">[0,6]</div>' +
                    '       <div id="md_lingua7" class="md_radioExp">[0,7]</div>' +
                    '       <div id="md_lingua8" class="md_radioExp">[0,8]</div>' +
                    '       <div id="md_lingua9" class="md_radioExp">[0,9]</div>' +
                    '   </div></div>' +
                    '<div>[1]</div>' +
                    '</div>'
        },
        "mtc_lingua_analitica": {
            title: {
                "ita": "Valutazione MTC Lingua (analitica)",
                "eng": "TCM Tongue Assessment (analytical)",
                "esp": "Evaluación de lengua MTC (analítica)",
                "fra": "Évaluation de la langue MTC (analytique)",
                "por": "Avaliação de língua MTC (analítica)",
                "deu": "MTC Zungenbewertung (analytisch)"
            },
            data: [
                {
                    t: "s",
                    d: {
                        ita: "Colore",
                        eng: "Color",
                        esp: "Color",
                        fra: "Couleur",
                        por: "Cor",
                        deu: "Farbe"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Rossa",
                            eng: "Red",
                            esp: "Roja",
                            fra: "Rouge",
                            por: "Vermelha",
                            deu: "Rot"
                        }, 
                        {
                            ita: "Pallida",
                            eng: "Pale",
                            esp: "Pálida",
                            fra: "Pâle",
                            por: "Pálida",
                            deu: "Blass"
                        }, 
                        {
                            ita: "Viola",
                            eng: "Purple",
                            esp: "Violeta",
                            fra: "Violette",
                            por: "Roxa",
                            deu: "Lila"
                        },     
                        {
                            ita: "Giallastra",
                            eng: "Yellowish",
                            esp: "Amarillenta",
                            fra: "Jaunâtre",
                            por: "Amarelada",
                            deu: "Gelblich"
                        }                                         
                    ]
                },
                {
                    t: "s",
                    d: {
                        ita: "Dimensioni",
                        eng: "Size",
                        esp: "Tamaño",
                        fra: "Taille",
                        por: "Tamanho",
                        deu: "Größe"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Normale",
                            eng: "Normal",
                            esp: "Normal",
                            fra: "Normale",
                            por: "Normal",
                            deu: "Normal"
                        }, 
                        {
                            ita: "Gonfia",
                            eng: "Swollen",
                            esp: "Hinchada",
                            fra: "Gonflée",
                            por: "Inchada",
                            deu: "Geschwollen"
                        }, 
                        {
                            ita: "Sottile",
                            eng: "Thin",
                            esp: "Delgada",
                            fra: "Fine",
                            por: "Fina",
                            deu: "Dünn"
                        }, 
                        {
                            ita: "Larga",
                            eng: "Wide",
                            esp: "Ancha",
                            fra: "Large",
                            por: "Larga",
                            deu: "Breit"
                        }, 
                        {
                            ita: "Stretta",
                            eng: "Narrow",
                            esp: "Estrecha",
                            fra: "Étroit",
                            por: "Estreita",
                            deu: "Schmal"
                        }                                    
                    ]
                },
                {
                    t: "s",
                    d: {
                        ita: "Patina",
                        eng: "Coating",
                        esp: "Capa",
                        fra: "Enduit",
                        por: "Revestimento",
                        deu: "Belag"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Bianca sottile",
                            eng: "Thin white",
                            esp: "Blanca fina",
                            fra: "Blanche fine",
                            por: "Branca fina",
                            deu: "Dünn weiß"
                        }, 
                        {
                            ita: "Bianca spessa",
                            eng: "Thick white",
                            esp: "Blanca gruesa",
                            fra: "Blanche épaisse",
                            por: "Branca espessa",
                            deu: "Dick weiß"
                        }, 
                        {
                            ita: "Gialla",
                            eng: "Yellow",
                            esp: "Amarilla",
                            fra: "Jaune",
                            por: "Amarela",
                            deu: "Gelb"
                        }, 
                        {
                            ita: "Nera",
                            eng: "Black",
                            esp: "Negra",
                            fra: "Noire",
                            por: "Preta",
                            deu: "Schwarz"
                        }                                   
                    ]
                },
                {
                    t: "s",
                    d: {
                        ita: "Umidità",
                        eng: "Moisture",
                        esp: "Humedad",
                        fra: "Humidité",
                        por: "Umidade",
                        deu: "Feuchtigkeit"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Umida",
                            eng: "Moist",
                            esp: "Húmeda",
                            fra: "Humide",
                            por: "Úmida",
                            deu: "Feucht"
                        }, 
                        {
                            ita: "Secca",
                            eng: "Dry",
                            esp: "Seca",
                            fra: "Sèche",
                            por: "Seca",
                            deu: "Trocken"
                        }, 
                        {
                            ita: "Con saliva che gocciola",
                            eng: "Dripping with saliva",
                            esp: "Con saliva goteando",
                            fra: "Avec de la salive qui goutte",
                            por: "Com saliva pingando",
                            deu: "Speichel tropfend"
                        }                                      
                    ]
                },
                {
                    t: "s",
                    d: {
                        ita: "Mobilità",
                        eng: "Mobility",
                        esp: "Movilidad",
                        fra: "Mobilité",
                        por: "Mobilidade",
                        deu: "Beweglichkeit"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Tremolante",
                            eng: "Trembling",
                            esp: "Temblorosa",
                            fra: "Tremblante",
                            por: "Tremendo",
                            deu: "Zitternd"
                        }, 
                        {
                            ita: "Rigida",
                            eng: "Stiff",
                            esp: "Rígida",
                            fra: "Rigide",
                            por: "Rígida",
                            deu: "Steif"
                        }, 
                        {
                            ita: "Flaccida",
                            eng: "Flaccid",
                            esp: "Flácida",
                            fra: "Flasque",
                            por: "Flácida",
                            deu: "Schlaff"
                        }, 
                        {
                            ita: "Deviata",
                            eng: "Deviated",
                            esp: "Desviada",
                            fra: "Déviée",
                            por: "Desviada",
                            deu: "Abgewichen"
                        }, 
                        {
                            ita: "Protrusa",
                            eng: "Protruded",
                            esp: "Protrusa",
                            fra: "Protrus",
                            por: "Protrusa",
                            deu: "Vorgewölbt"
                        }                        
                    ]
                },
                {
                    t: "s",
                    d: {
                        ita: "Crepe",
                        eng: "Cracks",
                        esp: "Grietas",
                        fra: "Fissures",
                        por: "Rachaduras",
                        deu: "Risse"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Lunghe e profonde",
                            eng: "Long and deep",
                            esp: "Largas y profundas",
                            fra: "Longues et profondes",
                            por: "Longas e profundas",
                            deu: "Lang und tief"
                        }, 
                        {
                            ita: "Superficiali",
                            eng: "Superficial",
                            esp: "Superficiales",
                            fra: "Superficielles",
                            por: "Superficiais",
                            deu: "Oberflächlich"
                        }, 
                        {
                            ita: "A forma di fessure",
                            eng: "Slit-shaped",
                            esp: "En forma de hendidura",
                            fra: "En forme de fente",
                            por: "Em forma de fenda",
                            deu: "Schlitzförmig"
                        }                        
                    ]
                },
                {
                    t: "s",
                    d: {
                        ita: "Vene inferiori",
                        eng: "Lower veins",
                        esp: "Venas inferiores",
                        fra: "Veines inférieures",
                        por: "Veias inferiores",
                        deu: "Untere Venen"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Normali",
                            eng: "Normal",
                            esp: "Normales",
                            fra: "Normales",
                            por: "Normais",
                            deu: "Normal"
                        }, 
                        {
                            ita: "Gonfie",
                            eng: "Swollen",
                            esp: "Hinchadas",
                            fra: "Gonflées",
                            por: "Inchadas",
                            deu: "Geschwollen"
                        }                        
                    ]
                },
                {
                    t: "s",
                    d: {
                        ita: "Bordi",
                        eng: "Edges",
                        esp: "Bordes",
                        fra: "Bords",
                        por: "Bordas",
                        deu: "Ränder"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Rossi",
                            eng: "Red",
                            esp: "Rojos",
                            fra: "Rouges",
                            por: "Vermelhos",
                            deu: "Rot"
                        }, 
                        {
                            ita: "Gonfiati",
                            eng: "Swollen",
                            esp: "Hinchados",
                            fra: "Gonflés",
                            por: "Inchados",
                            deu: "Geschwollen"
                        }, 
                        {
                            ita: "Segnati dai denti",
                            eng: "Teeth-marked",
                            esp: "Marcados por los dientes",
                            fra: "Marqués par les dents",
                            por: "Marcados pelos dentes",
                            deu: "Zahnabdrücke"
                        }                        
                    ]
                }
            ],
            html:   '<div class="moduloAnaliticoMTC moduloImg" id="moduloLinguaAnaliticaMTC">' +
                    '   <div>[0][1][2][3][4][5][6][7]</div>' +
                    '</div>'
        },
        "mtc_polsi": {
            title: {
                ita: "Valutazione MTC Polsi",
                eng: "TCM Pulse Assessment",
                esp: "Evaluación de pulsos MTC",
                fra: "Évaluation des pouls MTC",
                por: "Avaliação de pulsos MTC",
                deu: "MTC Pulsbewertung"
            },
            data: [
                {
                    t: "s",
                    d: {
                        ita: "CIN sinistro",
                        eng: "Left CIN",
                        esp: "CIN izquierdo",
                        fra: "CIN gauche",
                        por: "CIN esquerdo",
                        deu: "Linkes CIN"
                    },
                    l: "stati_polsi"
                },
                {
                    t: "s",
                    d: {
                        ita: "CIN sinistro 2",
                        eng: "Left CIN 2",
                        esp: "CIN izquierdo 2",
                        fra: "CIN gauche 2",
                        por: "CIN esquerdo 2",
                        deu: "Linkes CIN 2"
                    },
                    l: "stati_polsi"
                },
                {
                    t: "s",
                    d: {
                        ita: "CIN sinistro 3",
                        eng: "Left CIN 3",
                        esp: "CIN izquierdo 3",
                        fra: "CIN gauche 3",
                        por: "CIN esquerdo 3",
                        deu: "Linkes CIN 3"
                    },
                    l: "stati_polsi"
                },
                {
                    t: "s",
                    d: {
                        ita: "GUAN sinistro",
                        eng: "Left GUAN",
                        esp: "GUAN izquierdo",
                        fra: "GUAN gauche",
                        por: "GUAN esquerdo",
                        deu: "Linkes GUAN"
                    },
                    l: "stati_polsi"
                },
                {
                    t: "s",
                    d: {
                        ita: "GUAN sinistro 2",
                        eng: "Left GUAN 2",
                        esp: "GUAN izquierdo 2",
                        fra: "GUAN gauche 2",
                        por: "GUAN esquerdo 2",
                        deu: "Linkes GUAN 2"
                    },
                    l: "stati_polsi"
                },
                {
                    t: "s",
                    d: {
                        ita: "GUAN sinistro 3",
                        eng: "Left GUAN 3",
                        esp: "GUAN izquierdo 3",
                        fra: "GUAN gauche 3",
                        por: "GUAN esquerdo 3",
                        deu: "Linkes GUAN 3"
                    },
                    l: "stati_polsi"
                },
                {
                    t: "s",
                    d: {
                        ita: "CHI sinistro",
                        eng: "Left CHI",
                        esp: "CHI izquierdo",
                        fra: "CHI gauche",
                        por: "CHI esquerdo",
                        deu: "Linkes CHI"
                    },
                    l: "stati_polsi"
                },
                {
                    t: "s",
                    d: {
                        ita: "CHI sinistro 2",
                        eng: "Left CHI 2",
                        esp: "CHI izquierdo 2",
                        fra: "CHI gauche 2",
                        por: "CHI esquerdo 2",
                        deu: "Linkes CHI 2"
                    },
                    l: "stati_polsi"
                },
                {
                    t: "s",
                    d: {
                        ita: "CHI sinistro 3",
                        eng: "Left CHI 3",
                        esp: "CHI izquierdo 3",
                        fra: "CHI gauche 3",
                        por: "CHI esquerdo 3",
                        deu: "Linkes CHI 3"
                    },
                    l: "stati_polsi"
                },
                {
                    t: "s",
                    d: {
                        ita: "CIN destro",
                        eng: "Right CIN",
                        esp: "CIN derecho",
                        fra: "CIN droit",
                        por: "CIN direito",
                        deu: "Rechter CIN"
                    },
                    l: "stati_polsi"
                },
                {
                    t: "s",
                    d: {
                        ita: "CIN destro 2",
                        eng: "Right CIN 2",
                        esp: "CIN derecho 2",
                        fra: "CIN droit 2",
                        por: "CIN direito 2",
                        deu: "Rechter CIN 2"
                    },
                    l: "stati_polsi"
                },
                {
                    t: "s",
                    d: {
                        ita: "CIN destro 3",
                        eng: "Right CIN 3",
                        esp: "CIN derecho 3",
                        fra: "CIN droit 3",
                        por: "CIN direito 3",
                        deu: "Rechter CIN 3"
                    },
                    l: "stati_polsi"
                },
                {
                    t: "s",
                    d: {
                        ita: "GUAN destro",
                        eng: "Right GUAN",
                        esp: "GUAN derecho",
                        fra: "GUAN droit",
                        por: "GUAN direito",
                        deu: "Rechter GUAN"
                    },
                    l: "stati_polsi"
                },
                {
                    t: "s",
                    d: {
                        ita: "GUAN destro 2",
                        eng: "Right GUAN 2",
                        esp: "GUAN derecho 2",
                        fra: "GUAN droit 2",
                        por: "GUAN direito 2",
                        deu: "Rechter GUAN 2"
                    },
                    l: "stati_polsi"
                },
                {
                    t: "s",
                    d: {
                        ita: "GUAN destro 3",
                        eng: "Right GUAN 3",
                        esp: "GUAN derecho 3",
                        fra: "GUAN droit 3",
                        por: "GUAN direito 3",
                        deu: "Rechter GUAN 3"
                    },
                    l: "stati_polsi"
                },
                {
                    t: "s",
                    d: {
                        ita: "CHI destro",
                        eng: "Right CHI",
                        esp: "CHI derecho",
                        fra: "CHI droit",
                        por: "CHI direito",
                        deu: "Rechter CHI"
                    },
                    l: "stati_polsi"
                },
                {
                    t: "s",
                    d: {
                        ita: "CHI destro 2",
                        eng: "Right CHI 2",
                        esp: "CHI derecho 2",
                        fra: "CHI droit 2",
                        por: "CHI direito 2",
                        deu: "Rechter CHI 2"
                    },
                    l: "stati_polsi"
                },
                {
                    t: "s",
                    d: {
                        ita: "CHI destro 3",
                        eng: "Right CHI 3",
                        esp: "CHI derecho 3",
                        fra: "CHI droit 3",
                        por: "CHI direito 3",
                        deu: "Rechter CHI 3"
                    },
                    l: "stati_polsi"
                }
            ],
            html:   '<div id="moduloPolsiMTC">' +
                    '   <div>' +
                    '       <div id="md_polsoSX">' +
                    '           <div id="md_CIN_sx">[0][1][2]</div>' +
                    '           <div id="md_GUAN_sx">[3][4][5]</div>' +
                    '           <div id="md_CHI_sx">[6][7][8]</div>' +
                    '       </div>' +
                    '       <div id="md_polsoDX">' +
                    '           <div id="md_CIN_dx">[9][10][11]</div>' +
                    '           <div id="md_GUAN_dx">[12][13][14]</div>' +
                    '           <div id="md_CHI_dx">[15][16][17]</div>' +
                    '       </div>' +
                    '   </div>' +
                    '</div>' +
                    '</div>'
        },
        "mtc_viso": {
            title: {
                ita: "Valutazione MTC Viso",
                eng: "TCM Face Assessment",
                esp: "Evaluación de rostro MTC",
                fra: "Évaluation du visage MTC",
                por: "Avaliação de rosto MTC",
                deu: "MTC Gesichtsbewertung"
            },
            data: [
                {
                    t: 'e',
                    d: {
                        ita: "Colore",
                        eng: "Color",
                        esp: "Color",
                        fra: "Couleur",
                        por: "Cor",
                        deu: "Farbe"
                    }                    
                },
                {
                    t: "s",
                    d: {
                        ita: "Fronte",
                        eng: "Forehead",
                        esp: "Frente",
                        fra: "Front",
                        por: "Testa",
                        deu: "Stirn"
                    },
                    l: "colori_pelle"
                },
                {
                    t: "s",
                    d: {
                        ita: "Guance",
                        eng: "Cheeks",
                        esp: "Mejillas",
                        fra: "Joues",
                        por: "Bochechas",
                        deu: "Wangen"
                    },
                    l: "colori_pelle"
                },
                {
                    t: "s",
                    d: {
                        ita: "Naso",
                        eng: "Nose",
                        esp: "Nariz",
                        fra: "Nez",
                        por: "Nariz",
                        deu: "Nase"
                    },
                    l: "colori_pelle"
                },
                {
                    t: "s",
                    d: {
                        ita: "Mento",
                        eng: "Chin",
                        esp: "Barbilla",
                        fra: "Menton",
                        por: "Queixo",
                        deu: "Kinn"
                    },
                    l: "colori_pelle"
                },
                {
                    t: 'e',
                    d: {
                        ita: "Altri caratteri",
                        eng: "Other characteristics",
                        esp: "Otros caracteres",
                        fra: "Autres caractères",
                        por: "Outros caracteres",
                        deu: "Andere Merkmale"
                    }                    
                },
                {
                    t: "s",
                    d: {
                        ita: "Gonfiore",
                        eng: "Swelling",
                        esp: "Hinchazón",
                        fra: "Gonflement",
                        por: "Inchaço",
                        deu: "Schwellung"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Gonfiore generale",
                            eng: "General swelling",
                            esp: "Hinchazón general",
                            fra: "Gonflement général",
                            por: "Inchaço geral",
                            deu: "Allgemeine Schwellung"
                        },
                        {
                            ita: "Gonfiore sotto gli occhi",
                            eng: "Swelling under the eyes",
                            esp: "Hinchazón debajo de los ojos",
                            fra: "Gonflement sous les yeux",
                            por: "Inchaço sob os olhos",
                            deu: "Schwellung unter den Augen"
                        },
                        {
                            ita: "Gonfiore delle guance",
                            eng: "Swelling of the cheeks",
                            esp: "Hinchazón de las mejillas",
                            fra: "Gonflement des joues",
                            por: "Inchaço das bochechas",
                            deu: "Schwellung der Wangen"
                        }                        
                    ]
                },
                {
                    t: "s",
                    d: {
                        ita: "Espressione",
                        eng: "Expression",
                        esp: "Expresión",
                        fra: "Expression",
                        por: "Expressão",
                        deu: "Ausdruck"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Rigida e immobile",
                            eng: "Rigid and motionless",
                            esp: "Rígida e inmóvil",
                            fra: "Rigide et immobile",
                            por: "Rígida e imóvel",
                            deu: "Starr und unbeweglich"
                        },
                        {
                            ita: "Agitata",
                            eng: "Restless",
                            esp: "Agitada",
                            fra: "Agitée",
                            por: "Agitada",
                            deu: "Unruhig"
                        }                        
                    ]
                }
            ],
            html:   '<div class="moduloAnaliticoMTC moduloImg" id="moduloVisoMTC">' +
                    '   <div>[0][1][2][3][4][5][6][7]</div>' +
                    '</div>'
        },
        "mtc_occhi": {
            title: {
                ita: "Valutazione MTC Occhi",
                eng: "TCM Eye Assessment",
                esp: "Evaluación de ojos MTC",
                fra: "Évaluation des yeux MTC",
                por: "Avaliação de olhos MTC",
                deu: "MTC Augenbewertung"
            },
            data: [
                {
                    t: "s",
                    d: {
                        ita: "Chiarezza e luminosità",
                        eng: "Clarity and brightness",
                        esp: "Claridad y luminosidad",
                        fra: "Clarté et luminosité",
                        por: "Clareza e luminosidade",
                        deu: "Klarheit und Helligkeit"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Lucidi",
                            eng: "Bright",
                            esp: "Brillantes",
                            fra: "Brillants",
                            por: "Brilhantes",
                            deu: "Glänzend"
                        },
                        {
                            ita: "Opachi",
                            eng: "Dull",
                            esp: "Opacos",
                            fra: "Mats",
                            por: "Opacos",
                            deu: "Matt"
                        }                        
                    ]
                },
                {
                    t: "s",
                    d: {
                        ita: "Sclera",
                        eng: "Sclera",
                        esp: "Esclerótica",
                        fra: "Sclérotique",
                        por: "Esclerótica",
                        deu: "Sklera"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Bianca chiara",
                            eng: "Clear white",
                            esp: "Blanca clara",
                            fra: "Blanche claire",
                            por: "Branca clara",
                            deu: "Klar weiß"
                        },
                        {
                            ita: "Giallastra",
                            eng: "Yellowish",
                            esp: "Amarillenta",
                            fra: "Jaunâtre",
                            por: "Amarelada",
                            deu: "Gelblich"
                        },
                        {
                            ita: "Rossa",
                            eng: "Red",
                            esp: "Roja",
                            fra: "Rouge",
                            por: "Vermelha",
                            deu: "Rot"
                        }                        
                    ]
                },
                {
                    t: "s",
                    d: {
                        ita: "Iride",
                        eng: "Iris",
                        esp: "Iris",
                        fra: "Iris",
                        por: "Íris",
                        deu: "Iris"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Offuscato",
                            eng: "Blurred",
                            esp: "Borroso",
                            fra: "Flou",
                            por: "Embaçado",
                            deu: "Verschwommen"
                        },
                        {
                            ita: "Opaco",
                            eng: "Dull",
                            esp: "Opaco",
                            fra: "Mat",
                            por: "Opaco",
                            deu: "Matt"
                        }                        
                    ]
                },
                {
                    t: 'c',
                    d: {
                        ita: "Palpebre gonfie",
                        eng: "Swollen eyelids",
                        esp: "Párpados hinchados",
                        fra: "Paupières gonflées",
                        por: "Pálpebras inchadas",
                        deu: "Geschwollene Augenlider"
                    }                    
                },
                {
                    t: 'c',
                    d: {
                        ita: "Pupille dilatate",
                        eng: "Dilated pupils",
                        esp: "Pupilas dilatadas",
                        fra: "Pupilles dilatées",
                        por: "Pupilas dilatadas",
                        deu: "Erweiterte Pupillen"
                    }                    
                },
                {
                    t: 'c',
                    d: {
                        ita: "Occhi asciutti",
                        eng: "Dry eyes",
                        esp: "Ojos secos",
                        fra: "Yeux secs",
                        por: "Olhos secos",
                        deu: "Trockene Augen"
                    }                    
                }
            ],
            html:   '<div class="moduloAnaliticoMTC moduloImg" id="moduloOcchiMTC">' +
                    '   <div>[0][1][2][3][4][5]</div>' +
                    '</div>'
        },
        "mtc_capelli": {
            title: {
                ita: "Valutazione MTC Capelli",
                eng: "TCM Hair Assessment",
                esp: "Evaluación de cabello MTC",
                fra: "Évaluation des cheveux MTC",
                por: "Avaliação de cabelo MTC",
                deu: "MTC Haarbewertung"
            },
            data: [
                {
                    t: "s",
                    d: {
                        ita: "Secchezza",
                        eng: "Dryness",
                        esp: "Sequedad",
                        fra: "Sécheresse",
                        por: "Secura",
                        deu: "Trockenheit"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Grassi, untuosi",
                            eng: "Greasy, oily",
                            esp: "Grasos, aceitosos",
                            fra: "Gras, huileux",
                            por: "Gordurosos, oleosos",
                            deu: "Fettig, ölig"
                        },
                        {
                            ita: "Secchi, fragili",
                            eng: "Dry, brittle",
                            esp: "Secos, frágiles",
                            fra: "Secs, fragiles",
                            por: "Secos, frágeis",
                            deu: "Trocken, brüchig"
                        }                       
                    ]
                },
                {
                    t: "s",
                    d: {
                        ita: "Foltezza",
                        eng: "Thickness",
                        esp: "Densidad",
                        fra: "Épaisseur",
                        por: "Espessura",
                        deu: "Dichte"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Folti",
                            eng: "Thick",
                            esp: "Abundantes",
                            fra: "Épais",
                            por: "Grossos",
                            deu: "Dicht"
                        },
                        {
                            ita: "Radi",
                            eng: "Sparse",
                            esp: "Ralos",
                            fra: "Clairs",
                            por: "Ralos",
                            deu: "Dünn"
                        },
                        {
                            ita: "Assenti sulla parte superiore",
                            eng: "Absent on the top",
                            esp: "Ausentes en la parte superior",
                            fra: "Absents sur le dessus",
                            por: "Ausentes na parte superior",
                            deu: "Fehlend oben"
                        },
                        {
                            ita: "Assenti sui lati",
                            eng: "Absent on the sides",
                            esp: "Ausentes en los lados",
                            fra: "Absents sur les côtés",
                            por: "Ausentes nos lados",
                            deu: "Fehlend an den Seiten"
                        }                                               
                    ]
                },
                {
                    t: "s",
                    d: {
                        ita: "Diradamento",
                        eng: "Thinning",
                        esp: "Aclareo",
                        fra: "Densité réduite",
                        por: "Afinamento",
                        deu: "Ausdünnung"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Repentino",
                            eng: "Sudden",
                            esp: "Repentino",
                            fra: "Soudain",
                            por: "Repentino",
                            deu: "Plötzlich"
                        },
                        {
                            ita: "Graduale",
                            eng: "Gradual",
                            esp: "Gradual",
                            fra: "Graduel",
                            por: "Gradual",
                            deu: "Allmählich"
                        },
                        {
                            ita: "A seguito di uno shock",
                            eng: "Following a shock",
                            esp: "A raíz de un shock",
                            fra: "À la suite d'un choc",
                            por: "Após um choque",
                            deu: "Nach einem Schock"
                        },
                        {
                            ita: "Alopecia",
                            eng: "Alopecia",
                            esp: "Alopecia",
                            fra: "Alopécie",
                            por: "Alopecia",
                            deu: "Alopecia"
                        }                                              
                    ]
                },
                {
                    t: "s",
                    d: {
                        ita: "Imbiancamento",
                        eng: "Whitening",
                        esp: "Blanqueamiento",
                        fra: "Blanchiment",
                        por: "Desbranquecimento",
                        deu: "Erbleichung"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Giovanile",
                            eng: "Youthful",
                            esp: "Juvenil",
                            fra: "Juvenile",
                            por: "Juvenil",
                            deu: "Jugendlich"
                        },
                        {
                            ita: "A seguito di uno shock",
                            eng: "Following a shock",
                            esp: "A raíz de un shock",
                            fra: "À la suite d'un choc",
                            por: "Após um choque",
                            deu: "Nach einem Schock"
                        }                                            
                    ]
                }
            ],
            html:   '<div class="moduloAnaliticoMTC moduloImg" id="moduloCapelliMTC">' +
                    '   <div>[0][1][2][3]</div>' +
                    '</div>'
        },
        "mtc_pelle": {
            title: {
                ita: "Valutazione MTC Pelle",
                eng: "TCM Skin Assessment",
                esp: "Evaluación de piel MTC",
                fra: "Évaluation de la peau MTC",
                por: "Avaliação de pele MTC",
                deu: "MTC Hautbewertung"
            },
            data: [
                {
                    t: "s",
                    d: {
                        ita: "Qualità",
                        eng: "Quality",
                        esp: "Calidad",
                        fra: "Qualité",
                        por: "Qualidade",
                        deu: "Qualität"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Secca e desquamata",
                            eng: "Dry and flaky",
                            esp: "Seca y escamosa",
                            fra: "Sèche et squameuse",
                            por: "Seca e escamosa",
                            deu: "Trocken und schuppig"
                        },
                        {
                            ita: "Lucida/Oleosa",
                            eng: "Shiny/Oily",
                            esp: "Brillante/Aceitosa",
                            fra: "Brillante/Grasse",
                            por: "Brilhante/Oleosa",
                            deu: "Glänzend/Ölig"
                        } ,
                        {
                            ita: "Rugosa",
                            eng: "Rough",
                            esp: "Rugosa",
                            fra: "Rugueuse",
                            por: "Rugosa",
                            deu: "Rau"
                        }                                                
                    ]
                },
                {
                    t: "s",
                    d: {
                        ita: "Elasticità",
                        eng: "Elasticity",
                        esp: "Elasticidad",
                        fra: "Élasticité",
                        por: "Elasticidade",
                        deu: "Elastizität"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Elastica",
                            eng: "Elastic",
                            esp: "Elástica",
                            fra: "Élastique",
                            por: "Elástica",
                            deu: "Elastisch"
                        },
                        {
                            ita: "Rigida",
                            eng: "Rigid",
                            esp: "Rígida",
                            fra: "Rigide",
                            por: "Rígida",
                            deu: "Rigid"
                        }                                                
                    ]
                },
                {
                    t: "s",
                    d: {
                        ita: "Temperatura",
                        eng: "Temperature",
                        esp: "Temperatura",
                        fra: "Température",
                        por: "Temperatura",
                        deu: "Temperatur"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Calda",
                            eng: "Warm",
                            esp: "Caliente",
                            fra: "Chaude",
                            por: "Quente",
                            deu: "Warm"
                        },
                        {
                            ita: "Fredda",
                            eng: "Cold",
                            esp: "Fría",
                            fra: "Froide",
                            por: "Fria",
                            deu: "Kalt"
                        },
                        {
                            ita: "Variabile a zone",
                            eng: "Variable in zones",
                            esp: "Variable en zonas",
                            fra: "Variable par zones",
                            por: "Variável por zonas",
                            deu: "Zonenweise variabel"
                        }                                                 
                    ]
                },
                {
                    t: 'c',
                    d: {
                        ita: "Pelle macchiata",
                        eng: "Blotchy skin",
                        esp: "Piel manchada",
                        fra: "Peau tachée",
                        por: "Pele manchada",
                        deu: "Fleckige Haut"
                    }                    
                },
                {
                    t: 'c',
                    d: {
                        ita: "Pelle con edemi",
                        eng: "Skin with edema",
                        esp: "Piel con edemas",
                        fra: "Peau avec œdèmes",
                        por: "Pele com edemas",
                        deu: "Haut mit Ödemen"
                    }                    
                },
                {
                    t: 'c',
                    d: {
                        ita: "Pelle con lividi facili",
                        eng: "Skin that bruises easily",
                        esp: "Piel que se magulla fácilmente",
                        fra: "Peau qui se marque facilement",
                        por: "Pele que machuca facilmente",
                        deu: "Haut mit leichter Blutergussbildung"
                    }                    
                }
            ],
            html:   '<div class="moduloAnaliticoMTC moduloImg" id="moduloPelleMTC">' +
                    '   <div>[0][1][2][3][4][5]</div>' +
                    '</div>'
        },
        "mtc_postura": {
            title: {
                ita: "Valutazione MTC Corpo e Postura",
                eng: "TCM Body and Posture Assessment",
                esp: "Evaluación de cuerpo y postura MTC",
                fra: "Évaluation du corps et de la posture MTC",
                por: "Avaliação de corpo e postura MTC",
                deu: "MTC Körper- und Haltungsbewertung"
            },
            data: [
                {
                    t: "s",
                    d: {
                        ita: "Movimenti",
                        eng: "Movements",
                        esp: "Movimientos",
                        fra: "Mouvements",
                        por: "Movimentos",
                        deu: "Bewegungen"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Lenti e letargici",
                            eng: "Slow and lethargic",
                            esp: "Lentos y letárgicos",
                            fra: "Lents et léthargiques",
                            por: "Lentos e letárgicos",
                            deu: "Langsam und lethargisch"
                        },
                        {
                            ita: "Nervosi o agitati",
                            eng: "Nervous or restless",
                            esp: "Nerviosos o agitados",
                            fra: "Nerveux ou agités",
                            por: "Nervosos ou agitados",
                            deu: "Nervös oder unruhig"
                        },
                        {
                            ita: "Tremori",
                            eng: "Tremors",
                            esp: "Temblores",
                            fra: "Tremblements",
                            por: "Tremores",
                            deu: "Zittern"
                        },
                        {
                            ita: "Rigidità nei movimenti",
                            eng: "Rigidity in movements",
                            esp: "Rigidez en los movimientos",
                            fra: "Raideur dans les mouvements",
                            por: "Rigidez nos movimentos",
                            deu: "Steifheit in den Bewegungen"
                        },
                        {
                            ita: "Movimenti irregolari o scoordinati",
                            eng: "Irregular or uncoordinated movements",
                            esp: "Movimientos irregulares o descoordinados",
                            fra: "Mouvements irréguliers ou désordonnés",
                            por: "Movimentos irregulares ou descoordenados",
                            deu: "Unregelmäßige oder unkoordinierte Bewegungen"
                        }                                                
                    ]
                },
                {
                    t: "s",
                    d: {
                        ita: "Postura",
                        eng: "Posture",
                        esp: "Postura",
                        fra: "Posture",
                        por: "Postura",
                        deu: "Haltung"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Curvata o inclinata",
                            eng: "Curved or tilted",
                            esp: "Curvada o inclinada",
                            fra: "Courbée ou inclinée",
                            por: "Curvada ou inclinada",
                            deu: "Gekrümmt oder geneigt"
                        },
                        {
                            ita: "Eretta ma rigida",
                            eng: "Upright but rigid",
                            esp: "Erguida pero rígida",
                            fra: "Droit mais rigide",
                            por: "Ereta mas rígida",
                            deu: "Aufrecht, aber steif"
                        },
                        {
                            ita: "Inclinata lateralmente",
                            eng: "Tilted to the side",
                            esp: "Inclinada lateralmente",
                            fra: "Incliné latéralement",
                            por: "Inclinada lateralmente",
                            deu: "Zur Seite geneigt"
                        },
                        {
                            ita: "Inclinata in avanti",
                            eng: "Tilted forward",
                            esp: "Inclinada hacia adelante",
                            fra: "Incliné en avant",
                            por: "Inclinada para a frente",
                            deu: "Nach vorne geneigt"
                        }                                        
                    ]
                },
                {
                    t: "s",
                    d: {
                        ita: "Debolezza",
                        eng: "Weakness",
                        esp: "Debilidad",
                        fra: "Faiblesse",
                        por: "Fraqueza",
                        deu: "Schwäche"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Difficoltà a stare in piedi o a camminare",
                            eng: "Difficulty standing or walking",
                            esp: "Dificultad para estar de pie o caminar",
                            fra: "Difficulté à se tenir debout ou à marcher",
                            por: "Dificuldade para ficar em pé ou caminhar",
                            deu: "Schwierigkeiten beim Stehen oder Gehen"
                        },
                        {
                            ita: "Gambe deboli o tremolanti",
                            eng: "Weak or trembling legs",
                            esp: "Piernas débiles o temblorosas",
                            fra: "Jambes faibles ou tremblantes",
                            por: "Pernas fracas ou trêmulas",
                            deu: "Schwache oder zitternde Beine"
                        },
                        {
                            ita: "Corpo pesante e lento",
                            eng: "Heavy and slow body",
                            esp: "Cuerpo pesado y lento",
                            fra: "Corps lourd et lent",
                            por: "Corpo pesado e lento",
                            deu: "Schwerer und langsamer Körper"
                        }                                      
                    ]
                },
                {
                    t: "s",
                    d: {
                        ita: "Tensione muscolare",
                        eng: "Muscle tension",
                        esp: "Tensión muscular",
                        fra: "Tension musculaire",
                        por: "Tensão muscular",
                        deu: "Muskelspannung"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Tensione dei muscoli di collo/spalle",
                            eng: "Tension in neck/shoulder muscles",
                            esp: "Tensión en los músculos del cuello/hombros",
                            fra: "Tension dans les muscles du cou/des épaules",
                            por: "Tensão nos músculos do pescoço/ombros",
                            deu: "Spannung in Nacken-/Schultermuskeln"
                        },
                        {
                            ita: "Rigidità generale",
                            eng: "General stiffness",
                            esp: "Rigidez general",
                            fra: "Raideur générale",
                            por: "Rigidez geral",
                            deu: "Allgemeine Steifheit"
                        }                                      
                    ]
                },
                {
                    t: "s",
                    d: {
                        ita: "Arti",
                        eng: "Limbs",
                        esp: "Extremidades",
                        fra: "Membres",
                        por: "Membros",
                        deu: "Gliedmaßen"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Mani che si muovono frequentemente",
                            eng: "Hands that move frequently",
                            esp: "Manos que se mueven con frecuencia",
                            fra: "Mains qui bougent fréquemment",
                            por: "Mãos que se movem frequentemente",
                            deu: "Hände, die sich häufig bewegen"
                        },
                        {
                            ita: "Gambe e piedi agitati",
                            eng: "Restless legs and feet",
                            esp: "Piernas y pies inquietos",
                            fra: "Jambes et pieds agités",
                            por: "Pernas e pés inquietos",
                            deu: "Unruhige Beine und Füße"
                        },
                        {
                            ita: "Mani e piedi freddi",
                            eng: "Cold hands and feet",
                            esp: "Manos y pies fríos",
                            fra: "Mains et pieds froids",
                            por: "Mãos e pés frios",
                            deu: "Kaltes Hände und Füße"
                        }                        
                    ]
                }
            ],
            html:   '<div class="moduloAnaliticoMTC moduloImg" id="moduloPosturaMTC">' +
                    '   <div>[0][1][2][3][4]</div>' +
                    '</div>'
        },
        "mtc_mani": {
            title: {
                ita: "Valutazione MTC Mani e Unghie",
                eng: "TCM Hands and Nails Assessment",
                esp: "Evaluación de manos y uñas MTC",
                fra: "Évaluation des mains et des ongles MTC",
                por: "Avaliação de mãos e unhas MTC",
                deu: "MTC Hand- und Nagelbewertung"
            },
            data: [
                {
                    t: "e",
                    d: {
                        ita: "Mani",
                        eng: "Hands",
                        esp: "Manos",
                        fra: "Mains",
                        por: "Mãos",
                        deu: "Hände"
                    }                    
                },
                {
                    t: "s",
                    d: {
                        ita: "Colore",
                        eng: "Color",
                        esp: "Color",
                        fra: "Couleur",
                        por: "Cor",
                        deu: "Farbe"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Rosse",
                            eng: "Red",
                            esp: "Rojas",
                            fra: "Rouges",
                            por: "Vermelhas",
                            deu: "Rot"
                        },
                        {
                            ita: "Pallide",
                            eng: "Pale",
                            esp: "Pálidas",
                            fra: "Pâles",
                            por: "Pálidas",
                            deu: "Blass"
                        },
                        {
                            ita: "Bluastre",
                            eng: "Bluish",
                            esp: "Azuladas",
                            fra: "Bleutées",
                            por: "Azuladas",
                            deu: "Bläulich"
                        }                        
                    ]
                },
                {
                    t: "s",
                    d: {
                        ita: "Temperatura",
                        eng: "Temperature",
                        esp: "Temperatura",
                        fra: "Température",
                        por: "Temperatura",
                        deu: "Temperatur"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Calde",
                            eng: "Warm",
                            esp: "Calientes",
                            fra: "Chaudes",
                            por: "Quentes",
                            deu: "Warm"
                        },
                        {
                            ita: "Fredde",
                            eng: "Cold",
                            esp: "Frías",
                            fra: "Froides",
                            por: "Frias",
                            deu: "Kalt"
                        }                        
                    ]
                },
                {
                    t: "s",
                    d: {
                        ita: "Sudorazione",
                        eng: "Sweating",
                        esp: "Sudoración",
                        fra: "Transpiration",
                        por: "Suor",
                        deu: "Schwitzen"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Eccessiva sudorazione",
                            eng: "Excessive sweating",
                            esp: "Sudoración excesiva",
                            fra: "Transpiration excessive",
                            por: "Suor excessivo",
                            deu: "Übermäßiges Schwitzen"
                        },
                        {
                            ita: "Asciutte o secche",
                            eng: "Dry",
                            esp: "Secas",
                            fra: "Sèches",
                            por: "Secas",
                            deu: "Trocken"
                        }                        
                    ]
                },
                {
                    t: "c",
                    d: {
                        ita: "Mani gonfie",
                        eng: "Swollen hands",
                        esp: "Manos hinchadas",
                        fra: "Mains gonflées",
                        por: "Mãos inchadas",
                        deu: "Geschwollene Hände"
                    }                    
                },
                {
                    t: "e",
                    d: {
                        ita: "Unghie",
                        eng: "Nails",
                        esp: "Uñas",
                        fra: "Ongles",
                        por: "Unhas",
                        deu: "Nägel"
                    }                    
                },
                {
                    t: "s",
                    d: {
                        ita: "Colore",
                        eng: "Color",
                        esp: "Color",
                        fra: "Couleur",
                        por: "Cor",
                        deu: "Farbe"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Pallide",
                            eng: "Pale",
                            esp: "Pálidas",
                            fra: "Pâles",
                            por: "Pálidas",
                            deu: "Blass"
                        },
                        {
                            ita: "Viola/bluastre",
                            eng: "Purple/bluish",
                            esp: "Violetas/azuladas",
                            fra: "Violettes/bleutées",
                            por: "Roxas/azuladas",
                            deu: "Violett/bläulich"
                        },
                        {
                            ita: "Rosse",
                            eng: "Red",
                            esp: "Rojas",
                            fra: "Rouges",
                            por: "Vermelhas",
                            deu: "Rot"
                        },
                        {
                            ita: "Giallastre",
                            eng: "Yellowish",
                            esp: "Amarillentas",
                            fra: "Jaunâtres",
                            por: "Amareladas",
                            deu: "Gelblich"
                        }                        
                    ]
                },
                {
                    t: "s",
                    d: {
                        ita: "Striatura",
                        eng: "Streaking",
                        esp: "Estrías",
                        fra: "Stries",
                        por: "Estrias",
                        deu: "Streifen"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Verticale",
                            eng: "Vertical",
                            esp: "Vertical",
                            fra: "Verticale",
                            por: "Vertical",
                            deu: "Vertikal"
                        },
                        {
                            ita: "Orizzontale",
                            eng: "Horizontal",
                            esp: "Horizontal",
                            fra: "Horizontale",
                            por: "Horizontal",
                            deu: "Horizontal"
                        }                        
                    ]
                },
                {
                    t: 'e',
                    d: {
                        ita: "Condizione",
                        eng: "Condition",
                        esp: "Condición",
                        fra: "Condition",
                        por: "Condição",
                        deu: "Zustand"
                    }                    
                },
                {
                    t: "c",
                    d: {
                        ita: "Fragili o secche",
                        eng: "Brittle or dry",
                        esp: "Frágiles o secas",
                        fra: "Fragiles ou sèches",
                        por: "Frágeis ou secas",
                        deu: "Brüchig oder trocken"
                    }                    
                },
                {
                    t: "c",
                    d: {
                        ita: "Crescita lenta",
                        eng: "Slow growth",
                        esp: "Crecimiento lento",
                        fra: "Croissance lente",
                        por: "Crescimento lento",
                        deu: "Langsames Wachstum"
                    }                    
                },
                {
                    t: "c",
                    d: {
                        ita: "Macchie bianche",
                        eng: "White spots",
                        esp: "Manchas blancas",
                        fra: "Taches blanches",
                        por: "Manchas brancas",
                        deu: "Weiße Flecken"
                    }                    
                }
            ],
            html:   '<div class="moduloAnaliticoMTC moduliImg" id="moduloManiMTC">' +
                    '   <div>[0][1][2][3][4][5][6][7][8][9][10][11]</div>' +
                    '</div>'
        },
        "mtc_denti": {
            title: {
                ita: "Valutazione MTC Gengive e Denti",
                eng: "TCM Gums and Teeth Assessment",
                esp: "Evaluación de encías y dientes MTC",
                fra: "Évaluation des gencives et des dents MTC",
                por: "Avaliação de gengivas e dentes MTC",
                deu: "MTC Zahnfleisch- und Zahnbeurteilung"
            },
            data: [
                {
                    t: "c",
                    d: {
                        ita: "Gengive gonfie",
                        eng: "Swollen gums",
                        esp: "Encías hinchadas",
                        fra: "Gencives enflées",
                        por: "Gengivas inchadas",
                        deu: "Geschwollenes Zahnfleisch"
                    }                    
                },
                {
                    t: "c",
                    d: {
                        ita: "Denti che cadono",
                        eng: "Falling teeth",
                        esp: "Dientes que se caen",
                        fra: "Dents qui tombent",
                        por: "Dentes que caem",
                        deu: "Ausfallende Zähne"
                    }                    
                },
                {
                    t: "c",
                    d: {
                        ita: "Denti con crepe",
                        eng: "Cracked teeth",
                        esp: "Dientes con grietas",
                        fra: "Dents fissurées",
                        por: "Dentes rachados",
                        deu: "Rissige Zähne"
                    }                    
                },
                {
                    t: "c",
                    d: {
                        ita: "Dolore gengivale",
                        eng: "Gum pain",
                        esp: "Dolor en las encías",
                        fra: "Douleur gingivale",
                        por: "Dor nas gengivas",
                        deu: "Zahnfleischschmerzen"
                    }                    
                }
            ],
            html:   '<div class="moduloAnaliticoMTC moduloImg" id="moduloDentiMTC">' +
                    '   <div>[0][1][2][3]</div>' +
                    '</div>'
        },
        "mtc_secrezioni": {
            title: {
                ita: "Valutazione MTC Secrezioni corporee",
                eng: "TCM Body Secretions Assessment",
                esp: "Evaluación de secreciones corporales MTC",
                fra: "Évaluation des sécrétions corporelles MTC",
                por: "Avaliação de secreções corporais MTC",
                deu: "MTC Bewertung der Körpersekrete"
            },
            data: [
                {
                    t: 'e',
                    d: {
                        ita: "Urine",
                        eng: "Urine",
                        esp: "Orina",
                        fra: "Urine",
                        por: "Urina",
                        deu: "Urin"
                    }                    
                },
                {
                    t: "s",
                    d: {
                        ita: "Colore",
                        eng: "Color",
                        esp: "Color",
                        fra: "Couleur",
                        por: "Cor",
                        deu: "Farbe"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Chiare e abbondanti",
                            eng: "Clear and abundant",
                            esp: "Claras y abundantes",
                            fra: "Claires et abondantes",
                            por: "Claras e abundantes",
                            deu: "Klar und reichlich"
                        },
                        {
                            ita: "Scure o giallo intenso",
                            eng: "Dark or deep yellow",
                            esp: "Oscuras o amarillo intenso",
                            fra: "Foncées ou jaune intense",
                            por: "Escuras ou amarelo intenso",
                            deu: "Dunkel oder tiefgelb"
                        },
                        {
                            ita: "Torbide",
                            eng: "Cloudy",
                            esp: "Turbias",
                            fra: "Troubles",
                            por: "Turvas",
                            deu: "Trüb"
                        }                        
                    ]
                },
                {
                    t: "s",
                    d: {
                        ita: "Frequenza",
                        eng: "Frequency",
                        esp: "Frecuencia",
                        fra: "Fréquence",
                        por: "Frequência",
                        deu: "Frequenz"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Frequenti e abbondanti",
                            eng: "Frequent and abundant",
                            esp: "Frecuentes y abundantes",
                            fra: "Fréquentes et abondantes",
                            por: "Frequentes e abundantes",
                            deu: "Häufig und reichlich"
                        },
                        {
                            ita: "Rare e scarse",
                            eng: "Rare and scant",
                            esp: "Raras y escasas",
                            fra: "Rares et peu abondantes",
                            por: "Raras e escassas",
                            deu: "Selten und spärlich"
                        }                        
                    ]
                },
                {
                    t: "s",
                    d: {
                        ita: "Odore",
                        eng: "Odor",
                        esp: "Olor",
                        fra: "Odeur",
                        por: "Odor",
                        deu: "Geruch"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Forte e pungente",
                            eng: "Strong and pungent",
                            esp: "Fuerte y penetrante",
                            fra: "Fort et piquant",
                            por: "Forte e pungente",
                            deu: "Stark und stechend"
                        },
                        {
                            ita: "Debole o assente",
                            eng: "Weak or absent",
                            esp: "Débil o ausente",
                            fra: "Faible ou absent",
                            por: "Fraco ou ausente",
                            deu: "Schwach oder abwesend"
                        }                        
                    ]
                },
                {
                    t: 'e',
                    d: {
                        ita: "Feci",
                        eng: "Stools",
                        esp: "Heces",
                        fra: "Selles",
                        por: "Fezes",
                        deu: "Stuhl"
                    }                    
                },
                {
                    t: "s",
                    d: {
                        ita: "Consistenza",
                        eng: "Consistency",
                        esp: "Consistencia",
                        fra: "Consistance",
                        por: "Consistência",
                        deu: "Konsistenz"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Molli o diarrea",
                            eng: "Loose or diarrhea",
                            esp: "Blandas o diarrea",
                            fra: "Molles ou diarrhée",
                            por: "Moles ou diarreia",
                            deu: "Weich oder Durchfall"
                        },
                        {
                            ita: "Dure o stitichezza",
                            eng: "Hard or constipation",
                            esp: "Duras o estreñimiento",
                            fra: "Dures ou constipation",
                            por: "Duras ou constipação",
                            deu: "Hart oder Verstopfung"
                        }                        
                    ]
                },
                {
                    t: "s",
                    d: {
                        ita: "Colore",
                        eng: "Color",
                        esp: "Color",
                        fra: "Couleur",
                        por: "Cor",
                        deu: "Farbe"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Giallastre o marroni chiare",
                            eng: "Yellowish or light brown",
                            esp: "Amarillentas o marrón claro",
                            fra: "Jaunâtres ou marron clair",
                            por: "Amareladas ou marrom claro",
                            deu: "Gelblich oder hellbraun"
                        },
                        {
                            ita: "Scure o nere",
                            eng: "Dark or black",
                            esp: "Oscuras o negras",
                            fra: "Foncées ou noires",
                            por: "Escuras ou pretas",
                            deu: "Dunkel oder schwarz"
                        }                        
                    ]
                },
                {
                    t: 'e',
                    d: {
                        ita: "Sudore",
                        eng: "Sweat",
                        esp: "Sudor",
                        fra: "Sueur",
                        por: "Suor",
                        deu: "Schweiß"
                    }                    
                },
                {
                    t: "s",
                    d: {
                        ita: "Quantità",
                        eng: "Quantity",
                        esp: "Cantidad",
                        fra: "Quantité",
                        por: "Quantidade",
                        deu: "Menge"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Sudorazione abbondante",
                            eng: "Excessive sweating",
                            esp: "Sudoración abundante",
                            fra: "Transpiration abondante",
                            por: "Sudore abundante",
                            deu: "Übermäßiges Schwitzen"
                        },
                        {
                            ita: "Sudorazione assente",
                            eng: "Absent sweating",
                            esp: "Sudoración ausente",
                            fra: "Transpiration absente",
                            por: "Suor ausente",
                            deu: "Fehlendes Schwitzen"
                        }                        
                    ]
                },
                {
                    t: "s",
                    d: {
                        ita: "Localizzazione",
                        eng: "Localization",
                        esp: "Localización",
                        fra: "Localisation",
                        por: "Localização",
                        deu: "Lokalisation"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Sudore notturno",
                            eng: "Night sweats",
                            esp: "Sudores nocturnos",
                            fra: "Sueurs nocturnes",
                            por: "Suores noturnos",
                            deu: "Nachtschweiß"
                        },
                        {
                            ita: "Sudore spontaneo (durante il giorno)",
                            eng: "Spontaneous sweating (during the day)",
                            esp: "Sudoración espontánea (durante el día)",
                            fra: "Transpiration spontanée (pendant la journée)",
                            por: "Suor espontâneo (durante o dia)",
                            deu: "Spontanes Schwitzen (tagsüber)"
                        },
                        {
                            ita: "Sudore sulla fronte o sul torace",
                            eng: "Sweating on the forehead or chest",
                            esp: "Sudor en la frente o en el pecho",
                            fra: "Transpiration sur le front ou la poitrine",
                            por: "Suor na testa ou no peito",
                            deu: "Schwitzen auf der Stirn oder der Brust"
                        }                        
                    ]
                },
                {
                    t: "s",
                    d: {
                        ita: "Odore",
                        eng: "Odor",
                        esp: "Olor",
                        fra: "Odeur",
                        por: "Odor",
                        deu: "Geruch"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Forte e acido",
                            eng: "Strong and acidic",
                            esp: "Fuerte y ácido",
                            fra: "Fort et acide",
                            por: "Forte e ácido",
                            deu: "Stark und sauer"
                        },
                        {
                            ita: "Debole o assente",
                            eng: "Weak or absent",
                            esp: "Débil o ausente",
                            fra: "Faible ou absent",
                            por: "Fraco ou ausente",
                            deu: "Schwach oder abwesend"
                        }                        
                    ]
                },
                {
                    t: 'e',
                    d: {
                        ita: "Saliva e muco",
                        eng: "Saliva and mucus",
                        esp: "Saliva y moco",
                        fra: "Salive et mucus",
                        por: "Saliva e muco",
                        deu: "Speichel und Schleim"
                    }                    
                },
                {
                    t: "s",
                    d: {
                        ita: "Saliva",
                        eng: "Saliva",
                        esp: "Saliva",
                        fra: "Salive",
                        por: "Saliva",
                        deu: "Speichel"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Salivazione eccessiva",
                            eng: "Excessive salivation",
                            esp: "Salivación excesiva",
                            fra: "Salivation excessive",
                            por: "Salivação excessiva",
                            deu: "Übermäßiger Speichelfluss"
                        },
                        {
                            ita: "Bocca asciutta",
                            eng: "Dry mouth",
                            esp: "Boca seca",
                            fra: "Bouche sèche",
                            por: "Boca seca",
                            deu: "Trockener Mund"
                        }                        
                    ]
                },
                {
                    t: "s",
                    d: {
                        ita: "Muco",
                        eng: "Mucus",
                        esp: "Moco",
                        fra: "Mucus",
                        por: "Muco",
                        deu: "Schleim"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Trasparente e fluido",
                            eng: "Clear and fluid",
                            esp: "Transparente y fluido",
                            fra: "Transparent et fluide",
                            por: "Transparente e fluido",
                            deu: "Transparent und flüssig"
                        },
                        {
                            ita: "Bianco e denso",
                            eng: "White and thick",
                            esp: "Blanco y espeso",
                            fra: "Blanc et épais",
                            por: "Branco e espesso",
                            deu: "Weiß und dick"
                        },
                        {
                            ita: "Giallo e denso",
                            eng: "Yellow and thick",
                            esp: "Amarillo y espeso",
                            fra: "Jaune et épais",
                            por: "Amarelo e espesso",
                            deu: "Gelb und dick"
                        }                        
                    ]
                },
                {
                    t: 'c',
                    d: {
                        ita: "Espettorato maleodorante e fetido",
                        eng: "Foul-smelling and fetid sputum",
                        esp: "Esputo maloliente y fétido",
                        fra: "Expectoration malodorante et fétide",
                        por: "Espectoração fétida e malcheirosa",
                        deu: "Übelriechender und fauliger Auswurf"
                    }                    
                },
                {
                    t: 'c',
                    d: {
                        ita: "Secrezioni nasali abbondanti",
                        eng: "Abundant nasal secretions",
                        esp: "Secreciones nasales abundantes",
                        fra: "Sécrétions nasales abondantes",
                        por: "Secreções nasais abundantes",
                        deu: "Übermäßige Nasensekrete"
                    }                    
                },
                {
                    t: 'e',
                    d: {
                        ita: "Secrezioni genitali (femminili)",
                        eng: "Genital secretions (female)",
                        esp: "Secreciones genitales (femeninas)",
                        fra: "Sécrétions génitales (féminines)",
                        por: "Secreções genitais (femininas)",
                        deu: "Genitale Sekrete (weiblich)"
                    }                    
                },
                {
                    t: "s",
                    d: {
                        ita: "Perdite vaginali",
                        eng: "Vaginal discharge",
                        esp: "Flujo vaginal",
                        fra: "Perte vaginale",
                        por: "Corrimento vaginal",
                        deu: "Vaginaler Ausfluss"
                    },
                    l: [
                        {
                            ita: "",
                            eng: "",
                            esp: "",
                            fra: "",
                            por: "",
                            deu: ""
                        },
                        {
                            ita: "Bianche e abbondanti",
                            eng: "White and abundant",
                            esp: "Blancas y abundantes",
                            fra: "Blanches et abondantes",
                            por: "Brancas e abundantes",
                            deu: "Weiß und reichlich"
                        },
                        {
                            ita: "Gialle e dense",
                            eng: "Yellow and thick",
                            esp: "Amarillas y densas",
                            fra: "Jaunes et épaisses",
                            por: "Amarelas e espessas",
                            deu: "Gelb und dick"
                        },
                        {
                            ita: "Acquose e trasparenti",
                            eng: "Watery and clear",
                            esp: "Acuosas y transparentes",
                            fra: "Aqueuses et transparentes",
                            por: "Aquosas e transparentes",
                            deu: "Wässrig und klar"
                        }                        
                    ]
                }
            ],
            html:   '<div class="moduloAnaliticoMTC">' +
                    '   <div>[0][1][2][3][4][5][6][7][8][9][10][11][12][13][14][15][16][17]</div>' +
                    '</div>'
        },
        "shiatsu_hara_schiena": {
            title: {
                ita: "Valutazione Shiatsu Zone HARA e SCHIENA",
                eng: "Shiatsu Assessment of HARA and BACK Areas",
                esp: "Evaluación de Shiatsu de las Zonas HARA y ESPALDA",
                fra: "Évaluation Shiatsu des zones HARA et DOS",
                por: "Avaliação Shiatsu das Zonas HARA e COSTAS",
                deu: "Shiatsu-Bewertung der HARA- und RÜCKEN-Zonen"
            }
            ,
            data: [
                {
                    t: "s",
                    d: {
                        ita: "HARA - Cuore",
                        eng: "HARA - Heart",
                        esp: "HARA - Corazón",
                        fra: "HARA - Cœur",
                        por: "HARA - Coração",
                        deu: "HARA - Herzens"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "HARA - Mastro del cuore",
                        eng: "HARA - Master of the Heart",
                        esp: "HARA - Maestro del Corazón",
                        fra: "HARA - Maître du Cœur",
                        por: "HARA - Mestre do Coração",
                        deu: "HARA - Meister des Herzens"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "HARA - Milza-pancreas (zona superiore)",
                        eng: "HARA - Spleen-Pancreas (upper area)",
                        esp: "HARA - Bazo-páncreas (zona superior)",
                        fra: "HARA - Rate-pancréas (zone supérieure)",
                        por: "HARA - Baço-pâncreas (zona superior)",
                        deu: "HARA - Milz-Bauchspeicheldrüse (obere Zone)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "HARA - Milza-pancreas (zona inferiore)",
                        eng: "HARA - Spleen-Pancreas (lower area)",
                        esp: "HARA - Bazo-páncreas (zona inferior)",
                        fra: "HARA - Rate-pancréas (zone inférieure)",
                        por: "HARA - Baço-pâncreas (zona inferior)",
                        deu: "HARA - Milz-Bauchspeicheldrüse (untere Zone)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "HARA - Cistifellea",
                        eng: "HARA - Gallbladder",
                        esp: "HARA - Vesícula biliar",
                        fra: "HARA - Vésicule biliaire",
                        por: "HARA - Vesícula biliar",
                        deu: "HARA - Gallenblase"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "HARA - Fegato",
                        eng: "HARA - Liver",
                        esp: "HARA - Hígado",
                        fra: "HARA - Foie",
                        por: "HARA - Fígado",
                        deu: "HARA - Leber"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "HARA - Stomaco",
                        eng: "HARA - Stomach",
                        esp: "HARA - Estómago",
                        fra: "HARA - Estomac",
                        por: "HARA - Estômago",
                        deu: "HARA - Magen"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "HARA - Triplo riscaldatore",
                        eng: "HARA - Triple Warmer",
                        esp: "HARA - Triple calentador",
                        fra: "HARA - Triple réchauffeur",
                        por: "HARA - Triplo aquecedor",
                        deu: "HARA - Dreifacher Erwärmer"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "HARA - Polmone (zona destra)",
                        eng: "HARA - Lung (right area)",
                        esp: "HARA - Pulmón (zona derecha)",
                        fra: "HARA - Poumon (zone droite)",
                        por: "HARA - Pulmão (zona direita)",
                        deu: "HARA - Lunge (rechte Zone)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "HARA - Polmone (zona sinistra)",
                        eng: "HARA - Lung (left area)",
                        esp: "HARA - Pulmón (zona izquierda)",
                        fra: "HARA - Poumon (zone gauche)",
                        por: "HARA - Pulmão (zona esquerda)",
                        deu: "HARA - Lunge (linke Zone)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "HARA - Intestino crasso (zona destra)",
                        eng: "HARA - Large Intestine (right area)",
                        esp: "HARA - Intestino grueso (zona derecha)",
                        fra: "HARA - Gros intestin (zone droite)",
                        por: "HARA - Intestino grosso (zona direita)",
                        deu: "HARA - Dickdarm (rechte Zone)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "HARA - Intestino crasso (zona sinistra)",
                        eng: "HARA - Large Intestine (left area)",
                        esp: "HARA - Intestino grueso (zona izquierda)",
                        fra: "HARA - Gros intestin (zone gauche)",
                        por: "HARA - Intestino grosso (zona esquerda)",
                        deu: "HARA - Dickdarm (linke Zone)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "HARA - Vescica",
                        eng: "HARA - Bladder",
                        esp: "HARA - Vejiga",
                        fra: "HARA - Vésicule urinaire",
                        por: "HARA - Bexiga",
                        deu: "HARA - Blase"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "HARA - Rene",
                        eng: "HARA - Kidney",
                        esp: "HARA - Riñón",
                        fra: "HARA - Rein",
                        por: "HARA - Rim",
                        deu: "HARA - Niere"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "HARA - Intestino tenue (zona destra)",
                        eng: "HARA - Small Intestine (right area)",
                        esp: "HARA - Intestino delgado (zona derecha)",
                        fra: "HARA - Intestin grêle (zone droite)",
                        por: "HARA - Intestino delgado (zona direita)",
                        deu: "HARA - Dünndarm (rechte Zone)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "HARA - Intestino tenue (zona sinistra)",
                        eng: "HARA - Small Intestine (left area)",
                        esp: "HARA - Intestino delgado (zona izquierda)",
                        fra: "HARA - Intestin grêle (zone gauche)",
                        por: "HARA - Intestino delgado (zona esquerda)",
                        deu: "HARA - Dünndarm (linke Zone)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SCHIENA - Polmone",
                        eng: "BACK - Lung",
                        esp: "ESPALDA - Pulmón",
                        fra: "DOS - Poumon",
                        por: "COSTAS - Pulmão",
                        deu: "RÜCKEN - Lunge"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SCHIENA - Cuore",
                        eng: "BACK - Heart",
                        esp: "ESPALDA - Corazón",
                        fra: "DOS - Cœur",
                        por: "COSTAS - Coração",
                        deu: "RÜCKEN - Herz"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SCHIENA - Mastro del cuore",
                        eng: "BACK - Master of the Heart",
                        esp: "ESPALDA - Maestro del corazón",
                        fra: "DOS - Maître du cœur",
                        por: "COSTAS - Mestre do coração",
                        deu: "RÜCKEN - Meister des Herzens"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SCHIENA - Milza-pancreas",
                        eng: "BACK - Spleen-Pancreas",
                        esp: "ESPALDA - Bazo-páncreas",
                        fra: "DOS - Rate-pancréas",
                        por: "COSTAS - Baço-pâncreas",
                        deu: "RÜCKEN - Milz-Bauchspeicheldrüse"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SCHIENA - Intestino tenue (zona sinistra)",
                        eng: "BACK - Small Intestine (left area)",
                        esp: "ESPALDA - Intestino delgado (zona izquierda)",
                        fra: "DOS - Intestin grêle (zone gauche)",
                        por: "COSTAS - Intestino delgado (zona esquerda)",
                        deu: "RÜCKEN - Dünndarm (linke Zone)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SCHIENA - Intestino tenue (zona destra)",
                        eng: "BACK - Small Intestine (right area)",
                        esp: "ESPALDA - Intestino delgado (zona derecha)",
                        fra: "DOS - Intestin grêle (zone droite)",
                        por: "COSTAS - Intestino delgado (zona direita)",
                        deu: "RÜCKEN - Dünndarm (rechte Zone)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SCHIENA - Rene (zona sinistra)",
                        eng: "BACK - Kidney (left area)",
                        esp: "ESPALDA - Riñón (zona izquierda)",
                        fra: "DOS - Rein (zone gauche)",
                        por: "COSTAS - Rim (zona esquerda)",
                        deu: "RÜCKEN - Niere (linke Zone)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SCHIENA - Rene (zona destra)",
                        eng: "BACK - Kidney (right area)",
                        esp: "ESPALDA - Riñón (zona derecha)",
                        fra: "DOS - Rein (zone droite)",
                        por: "COSTAS - Rim (zona direita)",
                        deu: "RÜCKEN - Niere (rechte Zone)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SCHIENA - Vescica urinaria",
                        eng: "BACK - Urinary Bladder",
                        esp: "ESPALDA - Vejiga urinaria",
                        fra: "DOS - Vésicule urinaire",
                        por: "COSTAS - Bexiga urinária",
                        deu: "RÜCKEN - Harnblase"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SCHIENA - Stomaco",
                        eng: "BACK - Stomach",
                        esp: "ESPALDA - Estómago",
                        fra: "DOS - Estomac",
                        por: "COSTAS - Estômago",
                        deu: "RÜCKEN - Magen"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SCHIENA - Triplo riscaldatore",
                        eng: "BACK - Triple Warmer",
                        esp: "ESPALDA - Triple calentador",
                        fra: "DOS - Triple réchauffeur",
                        por: "COSTAS - Triplo aquecedor",
                        deu: "RÜCKEN - Dreifacher Erwärmer"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SCHIENA - Cistifellea",
                        eng: "BACK - Gallbladder",
                        esp: "ESPALDA - Vesícula biliar",
                        fra: "DOS - Vésicule biliaire",
                        por: "COSTAS - Vesícula biliar",
                        deu: "RÜCKEN - Gallenblase"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SCHIENA - Fegato",
                        eng: "BACK - Liver",
                        esp: "ESPALDA - Hígado",
                        fra: "DOS - Foie",
                        por: "COSTAS - Fígado",
                        deu: "RÜCKEN - Leber"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SCHIENA - Intestino crasso (zona sinistra)",
                        eng: "BACK - Large Intestine (left area)",
                        esp: "ESPALDA - Intestino grueso (zona izquierda)",
                        fra: "DOS - Gros intestin (zone gauche)",
                        por: "COSTAS - Intestino grosso (zona esquerda)",
                        deu: "RÜCKEN - Dickdarm (linke Zone)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SCHIENA - Intestino crasso (zona destra)",
                        eng: "BACK - Large Intestine (right area)",
                        esp: "ESPALDA - Intestino grueso (zona derecha)",
                        fra: "DOS - Gros intestin (zone droite)",
                        por: "COSTAS - Intestino grosso (zona direita)",
                        deu: "RÜCKEN - Dickdarm (rechte Zone)"
                    },
                    l: "stati_energetici"
                }                
            ],
            html:   '<div id="moduloHaraSchienaShiatsu">' +
                    '   <div id="md_hara">' +
                    '       <div>' +
                    '           <div class="md_HT">[0]</div>' +
                    '       </div>' +
                    '       <div>' +
                    '           <div class="md_GB">[4]</div>' +
                    '           <div class="md_ST">[6]</div>' +
                    '       </div>' +
                    '       <div>' +
                    '           <div class="md_LR">[5]</div>' +
                    '           <div class="md_PC">[1]</div>' +
                    '           <div class="md_TE">[7]</div>' +
                    '       </div>' +
                    '       <div>' +
                    '           <div class="md_LUdx">[8]</div>' +
                    '           <div class="md_LUsx">[9]</div>' +
                    '       </div>' +
                    '       <div>' +
                    '           <div class="md_SPup">[2]</div>' +
                    '       </div>' +
                    '       <div>' +
                    '           <div class="md_LIdx">[10]</div>' +
                    '           <div class="md_SPdown">[3]</div>' +
                    '           <div class="md_LIsx">[11]</div>' +
                    '       </div>' +
                    '       <div>' +
                    '           <div class="md_SIdx">[14]</div>' +
                    '           <div class="md_KI">[13]</div>' +
                    '           <div class="md_SIsx">[15]</div>' +
                    '       </div>' +
                    '       <div>' +
                    '           <div class="md_BL">[12]</div>' +
                    '       </div>' +
                    '   </div>' +
                    '   <div id="md_schiena">' +
                    '       <div>' +
                    '           <div class="md_LU">[16]</div>' +
                    '       </div>' +
                    '       <div>' +
                    '           <div class="md_HT">[17]</div>' +
                    '       </div>' +
                    '       <div>' +
                    '           <div class="md_ST">[24]</div>' +
                    '           <div class="md_PC">[18]</div>' +
                    '       </div>' +
                    '       <div>' +
                    '           <div class="md_LR">[27]</div>' +
                    '           <div class="md_TE">[25]</div>' +
                    '           <div class="md_GB">[26]</div>' +
                    '       </div>' +
                    '       <div>' +
                    '           <div class="md_SP">[19]</div>' +
                    '       </div>' +
                    '       <div>' +
                    '           <div class="md_SIsx">[20]</div>' +
                    '           <div class="md_SIdx">[21]</div>' +
                    '       </div>' +
                    '       <div>' +
                    '           <div class="md_LIsx">[28]</div>' +
                    '           <div class="md_KI">[22]</div>' +
                    '           <div class="md_LIdx">[29]</div>' +
                    '       </div>' +
                    '       <div>' +
                    '           <div class="md_BL">[23]</div>' +
                    '       </div>' +
                    '   </div>' +
                    '</div>'
        },
        "pdi": {
            title: {
                ita: "Pain Disability Index (PDI)",
                eng: "Pain Disability Index (PDI)",
                esp: "Pain Disability Index (PDI)",
                fra: "Pain Disability Index (PDI)",
                por: "Pain Disability Index (PDI)",
                deu: "Pain Disability Index (PDI)"
            },
            data: [
                {
                    t: "s",
                    d: {
                        ita: "Cura personale",
                        eng: "Personal care",
                        esp: "Cuidado personal",
                        fra: "Soins personnels",
                        por: "Cuidados pessoais",
                        deu: "Persönliche Pflege"
                    },
                    l: "rates"
                },
                {
                    t: "s",
                    d: {
                        ita: "Attività domestiche",
                        eng: "Household activities",
                        esp: "Actividades domésticas",
                        fra: "Activités domestiques",
                        por: "Atividades domésticas",
                        deu: "Haushaltsaktivitäten"
                    },
                    l: "rates"
                },
                {
                    t: "s",
                    d: {
                        ita: "Attività ricreative",
                        eng: "Recreational activities",
                        esp: "Actividades recreativas",
                        fra: "Activités récréatives",
                        por: "Atividades recreativas",
                        deu: "Freizeitaktivitäten"
                    },
                    l: "rates"
                },
                {
                    t: "s",
                    d: {
                        ita: "Lavoro",
                        eng: "Work",
                        esp: "Trabajo",
                        fra: "Travail",
                        por: "Trabalho",
                        deu: "Arbeit"
                    },
                    l: "rates"
                },
                {
                    t: "s",
                    d: {
                        ita: "Relazioni sociali",
                        eng: "Social relationships",
                        esp: "Relaciones sociales",
                        fra: "Relations sociales",
                        por: "Relações sociais",
                        deu: "Soziale Beziehungen"
                    },
                    l: "rates"
                },
                {
                    t: "s",
                    d: {
                        ita: "Attività sessuale",
                        eng: "Sexual activity",
                        esp: "Actividad sexual",
                        fra: "Activité sexuelle",
                        por: "Atividade sexual",
                        deu: "Sexuelle Aktivität"
                    },
                    l: "rates"
                },
                {
                    t: "s",
                    d: {
                        ita: "Attività di vita generale",
                        eng: "General life activities",
                        esp: "Actividades de vida general",
                        fra: "Activités de la vie générale",
                        por: "Atividades de vida geral",
                        deu: "Allgemeine Lebensaktivitäten"
                    },
                    l: "rates"
                }                         
            ],
            html:   '<div id="moduloPDI">[0][1][2][3][4][5][6]</div>'
        },
        "mpq": {
            title: {
                ita: "McGill Pain Questionnaire (MPQ)",
                eng: "McGill Pain Questionnaire (MPQ)",
                esp: "McGill Pain Questionnaire (MPQ)",
                fra: "McGill Pain Questionnaire (MPQ)",
                por: "McGill Pain Questionnaire (MPQ)",
                deu: "McGill Pain Questionnaire (MPQ)"
            },
            data: [
                {
                    t: "e",
                    d: {
                        ita: "Descrittori sensoriali",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    }
                },
                {
                    t: "e",
                    d: {
                        ita: "Gruppo 1 (temporale)",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    }
                },
                {
                    t: "c",
                    d: {
                        ita: "Tremolante",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 1
                },
                {
                    t: "c",
                    d: {
                        ita: "Fremente",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 2
                },
                {
                    t: "c",
                    d: {
                        ita: "Pulsante",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 3
                },
                {
                    t: "c",
                    d: {
                        ita: "Palpitante",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 4
                },
                {
                    t: "c",
                    d: {
                        ita: "Battente",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 5
                },
                {
                    t: "c",
                    d: {
                        ita: "Calpestante",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 6
                },
                {
                    t: "e",
                    d: {
                        ita: "Gruppo 2 (spaziale)",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    }
                },
                {
                    t: "c",
                    d: {
                        ita: "Saltellante",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 1
                },
                {
                    t: "c",
                    d: {
                        ita: "Fulmineo",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 2
                },
                {
                    t: "c",
                    d: {
                        ita: "Tirante",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 3
                },
                {
                    t: "e",
                    d: {
                        ita: "Gruppo 3 (pressione puntiforme)",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    }
                },
                {
                    t: "c",
                    d: {
                        ita: "Pizzicante",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 1
                },
                {
                    t: "c",
                    d: {
                        ita: "Tediante",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 2
                },
                {
                    t: "c",
                    d: {
                        ita: "Perforante",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 3
                },
                {
                    t: "c",
                    d: {
                        ita: "Fitta",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 4
                },
                {
                    t: "c",
                    d: {
                        ita: "Lacrimante",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 5
                },
                {
                    t: "e",
                    d: {
                        ita: "Gruppo 4 (tipo di pressione)",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    }
                },
                {
                    t: "c",
                    d: {
                        ita: "Definito",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 1
                },
                {
                    t: "c",
                    d: {
                        ita: "Tagliente",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 2
                },
                {
                    t: "c",
                    d: {
                        ita: "Lacerante",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 3
                },
                {
                    t: "e",
                    d: {
                        ita: "Gruppo 5(pressione costrittiva)",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    }
                },
                {
                    t: "c",
                    d: {
                        ita: "Pizzicante",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 1
                },
                {
                    t: "c",
                    d: {
                        ita: "Pressante",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 2
                },
                {
                    t: "c",
                    d: {
                        ita: "Rodente",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 3
                },
                {
                    t: "c",
                    d: {
                        ita: "Crampiforme",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 4
                },
                {
                    t: "c",
                    d: {
                        ita: "Stritolante",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 5
                },
                {
                    t: "e",
                    d: {
                        ita: "Gruppo 6 (pressione di trazione)",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                },
                {
                    t: "c",
                    d: {
                        ita: "Strattonante",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 1
                },
                {
                    t: "c",
                    d: {
                        ita: "Tirante",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 2
                },
                {
                    t: "c",
                    d: {
                        ita: "Straziante",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 3
                },
                {
                    t: "e",
                    d: {
                        ita: "Gruppo 7 (termale)",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    }
                },
                {
                    t: "c",
                    d: {
                        ita: "Caldo",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 1
                },
                {
                    t: "c",
                    d: {
                        ita: "Secco",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 2
                },
                {
                    t: "c",
                    d: {
                        ita: "Scottante",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 3
                },
                {
                    t: "c",
                    d: {
                        ita: "Bruciante",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 4
                },
                {
                    t: "e",
                    d: {
                        ita: "Gruppo 8 (movimento)",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    }
                },
                {
                    t: "c",
                    d: {
                        ita: "Formicolio",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 1
                },
                {
                    t: "c",
                    d: {
                        ita: "Pruriginoso",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 2
                },
                {
                    t: "c",
                    d: {
                        ita: "Frizzante",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 3
                },
                {
                    t: "c",
                    d: {
                        ita: "Pungente",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 4
                },
                {
                    t: "e",
                    d: {
                        ita: "Gruppo 9 (durezza)",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    }
                },
                {
                    t: "c",
                    d: {
                        ita: "Torpido",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 1
                },
                {
                    t: "c",
                    d: {
                        ita: "Ulceroso",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 2
                },
                {
                    t: "c",
                    d: {
                        ita: "Dolente",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 3
                },
                {
                    t: "c",
                    d: {
                        ita: "Indolenzito",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 4
                },
                {
                    t: "c",
                    d: {
                        ita: "Gravoso",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 5
                },
                {
                    t: "e",
                    d: {
                        ita: "Gruppo 10 (differenze sensoriali)",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    }
                },
                {
                    t: "c",
                    d: {
                        ita: "Lieve",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 1
                },
                {
                    t: "c",
                    d: {
                        ita: "Teso",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 2
                },
                {
                    t: "c",
                    d: {
                        ita: "Stridente",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 3
                },
                {
                    t: "c",
                    d: {
                        ita: "Fendente",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 4
                },
                {
                    t: "e",
                    d: {
                        ita: "Descrittori emotivi",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    }
                },
                {
                    t: "e",
                    d: {
                        ita: "Gruppo 11 (tensione)",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    }
                },
                {
                    t: "c",
                    d: {
                        ita: "Faticoso",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 1
                },
                {
                    t: "c",
                    d: {
                        ita: "Spossante",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 2
                },
                {
                    t: "e",
                    d: {
                        ita: "Gruppo 12 (autonomo)",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    }
                },
                {
                    t: "c",
                    d: {
                        ita: "Nauseabondo",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 1
                },
                {
                    t: "c",
                    d: {
                        ita: "Soffocante",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 2
                },
                {
                    t: "e",
                    d: {
                        ita: "Gruppo 13 (paura)",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    }
                },
                {
                    t: "c",
                    d: {
                        ita: "Pauroso",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 1
                },
                {
                    t: "c",
                    d: {
                        ita: "Spaventevole",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 2
                },
                {
                    t: "c",
                    d: {
                        ita: "Terrificante",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 3
                },
                {
                    t: "e",
                    d: {
                        ita: "Gruppo 14 (persecutorio)",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    }
                },
                {
                    t: "c",
                    d: {
                        ita: "Punitivo",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 1
                },
                {
                    t: "c",
                    d: {
                        ita: "Estenuante",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 2
                },
                {
                    t: "c",
                    d: {
                        ita: "Crudele",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 3
                },
                {
                    t: "c",
                    d: {
                        ita: "Feroce",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 4
                },
                {
                    t: "c",
                    d: {
                        ita: "Micidiale",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 5
                },
                {
                    t: "e",
                    d: {
                        ita: "Gruppo 15 (affettivo-valutativo-sensoriale)",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    }
                },
                {
                    t: "c",
                    d: {
                        ita: "Infelice",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 1
                },
                {
                    t: "c",
                    d: {
                        ita: "Accecante",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 2
                },
                {
                    t: "e",
                    d: {
                        ita: "Descrittori valutativi",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    }
                },
                {
                    t: "e",
                    d: {
                        ita: "Gruppo 16 (valutativo)",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    }
                },
                {
                    t: "c",
                    d: {
                        ita: "Noioso",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 1
                },
                {
                    t: "c",
                    d: {
                        ita: "Problematico",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 2
                },
                {
                    t: "c",
                    d: {
                        ita: "Misero",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 3
                },
                {
                    t: "c",
                    d: {
                        ita: "Intenso",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 4
                },
                {
                    t: "c",
                    d: {
                        ita: "Insopportabile",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 5
                },
                {
                    t: "e",
                    d: {
                        ita: "Varie",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    }
                },
                {
                    t: "e",
                    d: {
                        ita: "Gruppo 17 (sensoriale: varie)",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    }
                },
                {
                    t: "c",
                    d: {
                        ita: "Diffuso",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 1
                },
                {
                    t: "c",
                    d: {
                        ita: "Radiante",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 2
                },
                {
                    t: "c",
                    d: {
                        ita: "Penetrante",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 3
                },
                {
                    t: "c",
                    d: {
                        ita: "Pungente",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 4
                },
                {
                    t: "e",
                    d: {
                        ita: "Gruppo 18 (sensoriale: varie)",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    }
                },
                {
                    t: "c",
                    d: {
                        ita: "Stretto",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 1
                },
                {
                    t: "c",
                    d: {
                        ita: "Intorpidito",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 2
                },
                {
                    t: "c",
                    d: {
                        ita: "Tirante",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 3
                },
                {
                    t: "c",
                    d: {
                        ita: "Strizzante",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 4
                },
                {
                    t: "c",
                    d: {
                        ita: "Lacerante",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 5
                },
                {
                    t: "e",
                    d: {
                        ita: "Gruppo 19 (sensoriale)",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    }
                },
                {
                    t: "c",
                    d: {
                        ita: "Fresco",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 1
                },
                {
                    t: "c",
                    d: {
                        ita: "Freddo",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 2
                },
                {
                    t: "c",
                    d: {
                        ita: "Ghiacciante",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 3
                },
                {
                    t: "e",
                    d: {
                        ita: "Gruppo 20 (affettivo-valutativo: varie)",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    }
                },
                {
                    t: "c",
                    d: {
                        ita: "Fastidioso",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 1
                },
                {
                    t: "c",
                    d: {
                        ita: "Nauseabondo",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 2
                },
                {
                    t: "c",
                    d: {
                        ita: "Agonizzante",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 3
                },
                {
                    t: "c",
                    d: {
                        ita: "Terribile",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 4
                },
                {
                    t: "c",
                    d: {
                        ita: "Torturante",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    v: 5
                },
                {
                    t: "e",
                    d: {
                        ita: "Pain Rating Index (PRI)",
                        eng: "Pain Rating Index (PRI)",
                        esp: "Pain Rating Index (PRI)",
                        fra: "Pain Rating Index (PRI)",
                        por: "Pain Rating Index (PRI)",
                        deu: "Pain Rating Index (PRI)"
                    }
                },
            ],
            html:   '<div id="moduloMPQ">' +
                    '   <div>' +
                    '       <div>[0]</div>' +
                    '       <div class="mpq_lists">' +
                    '           <div id="mpq_sez01" class="mpq_sez">[1] [2][3][4][5][6][7]</div>' +
                    '           <div id="mpq_sez02" class="mpq_sez">[8] [9][10][11]</div>' +
                    '           <div id="mpq_sez03" class="mpq_sez">[12] [13][14][15][16][17]</div>' +
                    '           <div id="mpq_sez04" class="mpq_sez">[18] [19][20][21]</div>' +
                    '           <div id="mpq_sez05" class="mpq_sez">[22] [23][24][25][26][27]</div>' +
                    '           <div id="mpq_sez06" class="mpq_sez">[28] [29][30][31]</div>' +
                    '           <div id="mpq_sez07" class="mpq_sez">[32] [33][34][35][36]</div>' +
                    '           <div id="mpq_sez08" class="mpq_sez">[37] [38][39][40][41]</div>' +
                    '           <div id="mpq_sez09" class="mpq_sez">[42] [43][44][45][46][47]</div>' +
                    '           <div id="mpq_sez10" class="mpq_sez">[48] [49][50][51][52]</div>' +
                    '       </div>' +
                    '   </div>' +
                    '   <div>' +
                    '       <div>[53]</div>' +
                    '       <div class="mpq_lists">' +
                    '           <div id="mpq_sez11" class="mpq_sez">[54] [55][56]</div>' +
                    '           <div id="mpq_sez12" class="mpq_sez">[57] [58][59]</div>' +
                    '           <div id="mpq_sez13" class="mpq_sez">[60] [61][62][63]</div>' +
                    '           <div id="mpq_sez14" class="mpq_sez">[64] [65][66][67][68][69]</div>' +
                    '           <div id="mpq_sez15" class="mpq_sez">[70] [71][72]</div>' +
                    '       </div>' +
                    '   </div>' +
                    '   <div>' +
                    '       <div>[73]</div>' +
                    '       <div class="mpq_lists">' +
                    '           <div id="mpq_sez16" class="mpq_sez">[74] [75][76][77][78][79]</div>' +
                    '       </div>' +
                    '   </div>' +
                    '   <div>' +
                    '       <div>[80]</div>' +
                    '       <div class="mpq_lists">' +
                    '           <div id="mpq_sez17" class="mpq_sez">[81] [82][83][84][85]</div>' +
                    '           <div id="mpq_sez18" class="mpq_sez">[86] [87][88][89][90][91]</div>' +
                    '           <div id="mpq_sez19" class="mpq_sez">[92] [93][94][95]</div>' +
                    '           <div id="mpq_sez20" class="mpq_sez">[96] [97][98][99][100][101]</div>' +
                    '       </div>' +
                    '   </div>' +
                    '   <div id="mpq_cont_total">' +
                    '       <div id="mpq_label_total">[102]</div>' +
                    '       <div id="mpq_total"></div>' +
                    '   </div>' +
                    '</div>',
            funct: function(){
                // aggiorno il totale dei valori
                let tot = 0,
                    sezs = document.getElementById("moduloMPQ").getElementsByClassName("mpq_sez");
                for(s=0;s<sezs.length;s++){
                    let els = sezs[s].getElementsByTagName("input"),
                        max = 0;
                    for(e in els){
                        if(els[e].checked){
                            let val = parseInt(els[e].dataset.v);
                            if(val>max)max = val;
                        }
                    }
                    tot += max;
                }
                document.getElementById("mpq_total").innerHTML = tot;
            }
        }

    }

};