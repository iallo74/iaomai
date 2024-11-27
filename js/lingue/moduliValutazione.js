
var moduliValutazione = {
    /*
    ogni modello ha 3 campi:

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
        - v: in caso di checkbox è il valore di data-v="valore"
        - h: se presente e true indica che non deve essere inviato all'AI

    - html: il modello di rappresentazione del modulo
        gli elementi [n] saranno sostituiti in automatico dagli elementi di data dove n è il numero sequenziale dell'elemento
    - funct: la funzione che viene eseguita ad ogni cambio di opzione del modulo (es. cambio di select o click su una checkbox)

    se "data.l" è un valore stringa (es. "lista") vuol dire che lista è una variabile riferita in moduliValutazione.list.lista


    
    IMPORTANTE: PER EVITARE ERRORI!!!!!
    se si decide di eliminare un elemento dai modelli è necessario lasciare il sottoelemento "html"
    se si decide di non utilizzare più un elemento da "liste" lasciarlo comunque


    */
    categorie: {
        mtc: {
            ct: {
                ita: "MTC",
                eng: "TCM",
                esp: "MTC",
                fra: "MTC",
                por: "MTC",
                deu: "TCM"
            },
            sc: {
                osservazione: {
                    ita: "Osservazione (望诊, Wàng Zhěn)",
                    eng: "Observation (望诊, Wàng Zhěn)",
                    esp: "Observación (望诊, Wàng Zhěn)",
                    fra: "Observation (望诊, Wàng Zhěn)",
                    por: "Observação (望诊, Wàng Zhěn)",
                    deu: "Beobachtung (望诊, Wàng Zhěn)"
                },
                ascolto: {
                    ita: "Ascolto e olfatto (闻诊, Wén Zhěn)",
                    eng: "Listening and Smell (闻诊, Wén Zhěn)",
                    esp: "Escucha y olfato (闻诊, Wén Zhěn)",
                    fra: "Écoute et odorat (闻诊, Wén Zhěn)",
                    por: "Escuta e olfato (闻诊, Wén Zhěn)",
                    deu: "Hören und Riechen (闻诊, Wén Zhěn)"
                },
                interrogazione: {
                    ita: "Interrogatorio (问诊, Wèn Zhěn)",
                    eng: "Interrogation (问诊, Wèn Zhěn)",
                    esp: "Interrogatorio (问诊, Wèn Zhěn)",
                    fra: "Interrogatoire (问诊, Wèn Zhěn)",
                    por: "Interrogatório (问诊, Wèn Zhěn)",
                    deu: "Befragung (问诊, Wèn Zhěn)"
                },
                palpazione: {
                    ita: "Palpazione (切诊, Qiè Zhěn)",
                    eng: "Palpation (切诊, Qiè Zhěn)",
                    esp: "Palpación (切诊, Qiè Zhěn)",
                    fra: "Palpation (切诊, Qiè Zhěn)",
                    por: "Palpação (切诊, Qiè Zhěn)",
                    deu: "Palpation (切诊, Qiè Zhěn)"
                }                
            }
        },
        shiatsu: {
            ct: {
                ita: "Shiatsu",
                eng: "Shiatsu",
                esp: "Shiatsu",
                fra: "Shiatsu",
                por: "Shiatsu",
                deu: "Shiatsu"
            }
        },
        pain: {
            ct: {
                ita: "Dolore",
                eng: "Pain",
                esp: "Dolor",
                fra: "Douleur",
                por: "Dor",
                deu: "Schmerz"
            }
        },
        auriculo:  {
            ct: {
                ita: "Auricolo-terapia",
                eng: "Auriculotherapy",
                esp: "Auriculoterapia",
                fra: "Auriculothérapie",
                por: "Auriculoterapia",
                deu: "Auriculotherapie"
            }
        } ,
        custom:  { // per i moduli personali
            ct: {
                ita: "I tuoi moduli",
                eng: "Your forms",
                esp: "Tus formularios",
                fra: "Vos formulaires",
                por: "Seus formulários",
                deu: "Ihre Formulare"
            }
        }        
    },
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
                ita: "PIENO",
                eng: "EXCESS",
                esp: "EXCESO",
                fra: "EXCÈS",
                por: "EXCESSO",
                deu: "ÜBERFLUSS"
            },
            {
                ita: "VUOTO",
                eng: "DEFICIENCY",
                esp: "DEFICIENCIA",
                fra: "DÉFICIT",
                por: "DEFICIÊNCIA",
                deu: "MANGEL"
            },
            {
                ita: "DOLORANTE",
                eng: "PAINFUL",
                esp: "DOLOROSO",
                fra: "DOULEUREUX",
                por: "DOLOROSO",
                deu: "SCHMERZHAFT"
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
        ],
        rates_perc: [
            "",
            "0%",
            "10%",
            "20%",
            "30%",
            "40%",
            "50%",
            "60%",
            "70%",
            "80%",
            "90%",
            "10"
        ],
        mpq_scala_dolore: [
            {
                ita: "",
                eng: "",
                esp: "",
                fra: "",
                por: "",
                deu: ""
            },
            {
                ita: "0 (nessuno)",
                eng: "0 (none)",
                esp: "0 (ninguno)",
                fra: "0 (aucun)",
                por: "0 (nenhum)",
                deu: "0 (keiner)"
            },
            {
                ita: "1 (lieve)",
                eng: "1 (mild)",
                esp: "1 (leve)",
                fra: "1 (léger)",
                por: "1 (leve)",
                deu: "1 (leicht)"
            },
            {
                ita: "2 (moderato)",
                eng: "2 (moderate)",
                esp: "2 (moderado)",
                fra: "2 (modéré)",
                por: "2 (moderado)",
                deu: "2 (mäßig)"
            },
            {
                ita: "3 (grave)",
                eng: "3 (severe)",
                esp: "3 (grave)",
                fra: "3 (grave)",
                por: "3 (grave)",
                deu: "3 (schwer)"
            }
        ],
        si_no: [
            {
                ita: "",
                eng: "",
                esp: "",
                fra: "",
                por: "",
                deu: ""
            },
            {
                ita: "Sì",
                eng: "Yes",
                esp: "Sí",
                fra: "Oui",
                por: "Sim",
                deu: "Ja"
            },
            {
                ita: "No",
                eng: "No",
                esp: "No",
                fra: "Non",
                por: "Não",
                deu: "Nein"
            },
        ],
        ris_motivazione: [
            {
				ita: "Scarsa motivazione",
                eng: "Poor motivation",
                esp: "Escasa motivación",
                fra: "Motivation faible",
                por: "Baixa motivação",
                deu: "Schlechte Motivation"
            },
			{
				ita: "Discreta motivazione",
                eng: "Reasonable motivation",
                esp: "Motivación decente",
                fra: "Motivation modérée",
                por: "Motivação razoável",
                deu: "Vernünftige Motivation"
            },
			{
				ita: "Buona motivazione",
                eng: "Good motivation",
                esp: "Buena motivación",
                fra: "Bonne motivation",
                por: "Boa motivação",
                deu: "Gute Motivation"
            },
			{
				ita: "Alta motivazione",
                eng: "High motivation",
                esp: "Alta motivación",
                fra: "Motivation élevée",
                por: "Alta motivação",
                deu: "Hohe Motivation"
            }
        ],
        ris_dipendenza: [
            {
				ita: "Dipendenza bassa",
                eng: "Low addiction",
                esp: "Baja dependencia",
                fra: "Dépendance faible",
                por: "Baixo vício",
                deu: "Niedrige Sucht"
            },
			{
				ita: "Dipendenza media",
                eng: "Average addiction",
                esp: "Dependencia media",
                fra: "Dépendance modérée",
                por: "Vício médio",
                deu: "Durchschnittliche Sucht"
            },
			{
				ita: "Dipendenza alta",
                eng: "High addiction",
                esp: "Alta dependencia",
                fra: "Dépendance élevée",
                por: "Alta dependência",
                deu: "Hohe Sucht"
            },
			{
				ita: "Dipendenza molto alta",
                eng: "Very high addiction",
                esp: "Adicción muy alta",
                fra: "Dépendance très élevée",
                por: "Muito alta dependência",
                deu: "Sehr hohe Sucht"
            }
        ],
        ris_intensita: [
            {
                ita: "Nessun dolore",
                eng: "No pain",
                esp: "Sin dolor",
                fra: "Pas de douleur",
                por: "Sem dor",
                deu: "Kein Schmerz"
            },
            {
                ita: "Dolore lieve",
                eng: "Mild pain",
                esp: "Dolor leve",
                fra: "Douleur légère",
                por: "Dor leve",
                deu: "Leichter Schmerz"
            },
            {
                ita: "Dolore moderato",
                eng: "Moderate pain",
                esp: "Dolor moderado",
                fra: "Douleur modérée",
                por: "Dor moderada",
                deu: "Moderater Schmerz"
            },
            {
                ita: "Dolore grave",
                eng: "Severe pain",
                esp: "Dolor grave",
                fra: "Douleur sévère",
                por: "Dor grave",
                deu: "Schwerer Schmerz"
            }
        ],
        ris_impatto: [
            {
                ita: "Nessuna interferenza",
                eng: "No interference",
                esp: "Sin interferencia",
                fra: "Pas d'interférence",
                por: "Sem interferência",
                deu: "Keine Beeinträchtigung"
            },
            {
                ita: "Interferenza lieve",
                eng: "Mild interference",
                esp: "Interferencia leve",
                fra: "Interférence légère",
                por: "Interferência leve",
                deu: "Leichte Beeinträchtigung"
            },
            {
                ita: "Interferenza moderata",
                eng: "Moderate interference",
                esp: "Interferencia moderada",
                fra: "Interférence modérée",
                por: "Interferência moderada",
                deu: "Mäßige Beeinträchtigung"
            },
            {
                ita: "Interferenza grave",
                eng: "Severe interference",
                esp: "Interferencia grave",
                fra: "Interférence sévère",
                por: "Interferência grave",
                deu: "Schwere Beeinträchtigung"
            }
        ]    
    },
    modelli: {
        mtc_lingua_sintetica: {
            category: "mtc",
            subcategory: "osservazione",
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
        mtc_lingua_analitica: {
            category: "mtc",
            subcategory: "osservazione",
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
        mtc_polsi: {
            category: "mtc",
            subcategory: "palpazione",
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
                        ita: "CUN sinistro",
                        eng: "Left CUN",
                        esp: "CUN izquierdo",
                        fra: "CUN gauche",
                        por: "CUN esquerdo",
                        deu: "Linkes CUN"
                    },
                    l: "stati_polsi"
                },
                {
                    t: "s",
                    d: {
                        ita: "CUN sinistro 2",
                        eng: "Left CUN 2",
                        esp: "CUN izquierdo 2",
                        fra: "CUN gauche 2",
                        por: "CUN esquerdo 2",
                        deu: "Linkes CUN 2"
                    },
                    l: "stati_polsi"
                },
                {
                    t: "s",
                    d: {
                        ita: "CUN sinistro 3",
                        eng: "Left CUN 3",
                        esp: "CUN izquierdo 3",
                        fra: "CUN gauche 3",
                        por: "CUN esquerdo 3",
                        deu: "Linkes CUN 3"
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
                        ita: "CUN destro",
                        eng: "Right CUN",
                        esp: "CUN derecho",
                        fra: "CUN droit",
                        por: "CUN direito",
                        deu: "Rechter CUN"
                    },
                    l: "stati_polsi"
                },
                {
                    t: "s",
                    d: {
                        ita: "CUN destro 2",
                        eng: "Right CUN 2",
                        esp: "CUN derecho 2",
                        fra: "CUN droit 2",
                        por: "CUN direito 2",
                        deu: "Rechter CUN 2"
                    },
                    l: "stati_polsi"
                },
                {
                    t: "s",
                    d: {
                        ita: "CUN destro 3",
                        eng: "Right CUN 3",
                        esp: "CUN derecho 3",
                        fra: "CUN droit 3",
                        por: "CUN direito 3",
                        deu: "Rechter CUN 3"
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
                    '           <div id="md_CHI_dx">[15][16][17]</div>' +
                    '           <div id="md_GUAN_dx">[12][13][14]</div>' +
                    '           <div id="md_CUN_dx">[9][10][11]</div>' +
                    '       </div>' +
                    '       <div id="md_polsoDX">' +
                    '           <div id="md_CHI_sx">[6][7][8]</div>' +
                    '           <div id="md_GUAN_sx">[3][4][5]</div>' +
                    '           <div id="md_CUN_sx">[0][1][2]</div>' +
                    '       </div>' +
                    '   </div>' +
                    '</div>' +
                    '</div>'
        },
        mtc_viso: {
            category: "mtc",
            subcategory: "osservazione",
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
        mtc_occhi: {
            category: "mtc",
            subcategory: "osservazione",
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
        mtc_capelli: {
            category: "mtc",
            subcategory: "osservazione",
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
        mtc_pelle: {
            category: "mtc",
            subcategory: "osservazione",
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
        mtc_postura: {
            category: "mtc",
            subcategory: "osservazione",
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
        mtc_mani: {
            category: "mtc",
            subcategory: "osservazione",
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
        mtc_denti: {
            category: "mtc",
            subcategory: "osservazione",
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
        mtc_secrezioni: {
            category: "mtc",
            subcategory: "osservazione",
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
        mtc_mushu: {
            category: "mtc",
            subcategory: "palpazione",
            title: {
                ita: "Valutazione MTC punti MU e SHU (schema)",
                eng: "TCM Assessment of MU and SHU Points (schema)",
                esp: "Evaluación MTC de los puntos MU y SHU (esquema)",
                fra: "Évaluation MTC des points MU et SHU (schéma)",
                por: "Avaliação MTC dos pontos MU e SHU (esquema)",
                deu: "TCM-Bewertung der MU- und SHU-Punkte (Schema)"
            },
            data: [
                {
                    t: "s",
                    d: {
                        ita: "MU - Fegato (destra)",
                        eng: "MU - Liver (right)",
                        esp: "MU - Hígado (derecha)",
                        fra: "MU - Foie (droite)",
                        por: "MU - Fígado (direita)",
                        deu: "MU - Leber (rechte)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "MU - Fegato (sinistra)",
                        eng: "MU - Liver (left)",
                        esp: "MU - Hígado (izquierda)",
                        fra: "MU - Foie (gauche)",
                        por: "MU - Fígado (esquerda)",
                        deu: "MU - Leber (linke)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "MU - Cistifellea (destra)",
                        eng: "MU - Gallbladder (right)",
                        esp: "MU - Vesícula biliar (derecha)",
                        fra: "MU - Vésicule biliaire (droite)",
                        por: "MU - Vesícula biliar (direita)",
                        deu: "MU - Gallenblase (rechte)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "MU - Cistifellea (sinistra)",
                        eng: "MU - Gallbladder (left)",
                        esp: "MU - Vesícula biliar (izquierda)",
                        fra: "MU - Vésicule biliaire (gauche)",
                        por: "MU - Vesícula biliar (esquerda)",
                        deu: "MU - Gallenblase (linke)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "MU - Cuore",
                        eng: "MU - Heart",
                        esp: "MU - Corazón",
                        fra: "MU - Cœur",
                        por: "MU - Coração",
                        deu: "MU - Herzens"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "MU - Intestino tenue",
                        eng: "MU - Small Intestine",
                        esp: "MU - Intestino delgado",
                        fra: "MU - Intestin grêle",
                        por: "MU - Intestino delgado",
                        deu: "MU - Dünndarm"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "MU - Mastro del cuore",
                        eng: "MU - Master of the Heart",
                        esp: "MU - Maestro del corazón",
                        fra: "MU - Maître du cœur",
                        por: "MU - Mestre do coração",
                        deu: "MU - Meister des Herzens"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Triplo riscaldatore",
                        eng: "SHU - Triple Warmer",
                        esp: "SHU - Triple calentador",
                        fra: "SHU - Triple réchauffeur",
                        por: "SHU - Triplo aquecedor",
                        deu: "SHU - Dreifacher Erwärmer"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "MU - Milza-pancreas (destra)",
                        eng: "MU - Spleen-Pancreas (right)",
                        esp: "MU - Bazo-páncreas (derecha)",
                        fra: "MU - Rate-pancréas (droite)",
                        por: "MU - Baço-pâncreas (direita)",
                        deu: "MU - Milz-Bauchspeicheldrüse (rechte)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "MU - Milza-pancreas (sinistra)",
                        eng: "MU - Spleen-Pancreas (left)",
                        esp: "MU - Bazo-páncreas (izquierda)",
                        fra: "MU - Rate-pancréas (gauche)",
                        por: "MU - Baço-pâncreas (esquerda)",
                        deu: "MU - Milz-Bauchspeicheldrüse (linke)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "MU - Stomaco",
                        eng: "MU - Stomach",
                        esp: "MU - Estómago",
                        fra: "MU - Estomac",
                        por: "MU - Estômago",
                        deu: "MU - Magen"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "MU - Polmone (destra)",
                        eng: "MU - Lung (right)",
                        esp: "MU - Pulmón (derecha)",
                        fra: "MU - Poumon (droite)",
                        por: "MU - Pulmão (direita)",
                        deu: "MU - Lunge (rechte)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "MU - Polmone (sinistra)",
                        eng: "MU - Lung (left)",
                        esp: "MU - Pulmón (izquierda)",
                        fra: "MU - Poumon (gauche)",
                        por: "MU - Pulmão (esquerda)",
                        deu: "MU - Lunge (linke)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "MU - Intestino crasso (destra)",
                        eng: "MU - Large Intestine (right)",
                        esp: "MU - Intestino grueso (derecha)",
                        fra: "MU - Gros intestin (droite)",
                        por: "MU - Intestino grosso (direita)",
                        deu: "MU - Dickdarm (rechte)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "MU - Intestino crasso (sinistra)",
                        eng: "MU - Large Intestine (left)",
                        esp: "MU - Intestino grueso (izquierda)",
                        fra: "MU - Gros intestin (gauche)",
                        por: "MU - Intestino grosso (esquerda)",
                        deu: "MU - Dickdarm (linke)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "MU - Rene (destra)",
                        eng: "MU - Kidney (right)",
                        esp: "MU - Riñón (derecha)",
                        fra: "MU - Rein (droite)",
                        por: "MU - Rim (direita)",
                        deu: "MU - Niere (rechte)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "MU - Rene (sinistra)",
                        eng: "MU - Kidney (left)",
                        esp: "MU - Riñón (izquierda)",
                        fra: "MU - Rein (gauche)",
                        por: "MU - Rim (esquerda)",
                        deu: "MU - Niere (linke)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "MU - Vescica",
                        eng: "MU - Bladder",
                        esp: "MU - Vejiga",
                        fra: "MU - Vésicule urinaire",
                        por: "MU - Bexiga",
                        deu: "MU - Blase"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Fegato (sinistra)",
                        eng: "SHU - Liver (left)",
                        esp: "SHU - Hígado (izquierda)",
                        fra: "SHU - Foie (gauche)",
                        por: "SHU - Fígado (esquerda)",
                        deu: "SHU - Leber (linke)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Fegato (destra)",
                        eng: "SHU - Liver (right)",
                        esp: "SHU - Hígado (derecha)",
                        fra: "SHU - Foie (droite)",
                        por: "SHU - Fígado (direita)",
                        deu: "SHU - Leber (rechte)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Cistifellea (sinistra)",
                        eng: "SHU - Gallbladder (left)",
                        esp: "SHU - Vesícula biliar (izquierda)",
                        fra: "SHU - Vésicule biliaire (gauche)",
                        por: "SHU - Vesícula biliar (esquerda)",
                        deu: "SHU - Gallenblase (linke)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Cistifellea (destra)",
                        eng: "SHU - Gallbladder (right)",
                        esp: "SHU - Vesícula biliar (derecha)",
                        fra: "SHU - Vésicule biliaire (droite)",
                        por: "SHU - Vesícula biliar (direita)",
                        deu: "SHU - Gallenblase (rechte)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Cuore (sinistra)",
                        eng: "SHU - Heart (left)",
                        esp: "SHU - Corazón (izquierda)",
                        fra: "SHU - Cœur (gauche)",
                        por: "SHU - Coração (esquerda)",
                        deu: "SHU - Herz (linke)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Cuore (destra)",
                        eng: "SHU - Heart (right)",
                        esp: "SHU - Corazón (derecha)",
                        fra: "SHU - Cœur (droite)",
                        por: "SHU - Coração (direita)",
                        deu: "SHU - Herz (rechte)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Intestino tenue (sinistra)",
                        eng: "SHU - Small Intestine (left)",
                        esp: "SHU - Intestino delgado (izquierda)",
                        fra: "SHU - Intestin grêle (gauche)",
                        por: "SHU - Intestino delgado (esquerda)",
                        deu: "SHU - Dünndarm (linke)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Intestino tenue (destra)",
                        eng: "SHU - Small Intestine (right)",
                        esp: "SHU - Intestino delgado (derecha)",
                        fra: "SHU - Intestin grêle (droite)",
                        por: "SHU - Intestino delgado (direita)",
                        deu: "SHU - Dünndarm (rechte)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Mastro del cuore (sinistra)",
                        eng: "SHU - Master of the Heart (left)",
                        esp: "SHU - Maestro del corazón (izquierda)",
                        fra: "SHU - Maître du cœur (gauche)",
                        por: "SHU - Mestre do coração (esquerda)",
                        deu: "SHU - Meister des Herzens (linke)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Mastro del cuore (destra)",
                        eng: "SHU - Master of the Heart (right)",
                        esp: "SHU - Maestro del corazón (derecha)",
                        fra: "SHU - Maître du cœur (droite)",
                        por: "SHU - Mestre do coração (direita)",
                        deu: "SHU - Meister des Herzens (rechte)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Triplo riscaldatore (sinistra)",
                        eng: "SHU - Triple Warmer (left)",
                        esp: "SHU - Triple calentador (izquierda)",
                        fra: "SHU - Triple réchauffeur (gauche)",
                        por: "SHU - Triplo aquecedor (esquerda)",
                        deu: "SHU - Dreifacher Erwärmer (linke)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Triplo riscaldatore (destra)",
                        eng: "SHU - Triple Warmer (right)",
                        esp: "SHU - Triple calentador (derecha)",
                        fra: "SHU - Triple réchauffeur (droite)",
                        por: "SHU - Triplo aquecedor (direita)",
                        deu: "SHU - Dreifacher Erwärmer (rechte)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Milza-pancreas (sinistra)",
                        eng: "SHU - Spleen-Pancreas (left)",
                        esp: "SHU - Bazo-páncreas (izquierda)",
                        fra: "SHU - Rate-pancréas (gauche)",
                        por: "SHU - Baço-pâncreas (esquerda)",
                        deu: "SHU - Milz-Bauchspeicheldrüse (linke)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Milza-pancreas (destra)",
                        eng: "SHU - Spleen-Pancreas (right)",
                        esp: "SHU - Bazo-páncreas (derecha)",
                        fra: "SHU - Rate-pancréas (droite)",
                        por: "SHU - Baço-pâncreas (direita)",
                        deu: "SHU - Milz-Bauchspeicheldrüse (rechte)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Stomaco (sinistra)",
                        eng: "SHU - Stomach (left)",
                        esp: "SHU - Estómago (izquierda)",
                        fra: "SHU - Estomac (gauche)",
                        por: "SHU - Estômago (esquerda)",
                        deu: "SHU - Magen (linke)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Stomaco (destra)",
                        eng: "SHU - Stomach (right)",
                        esp: "SHU - Estómago (derecha)",
                        fra: "SHU - Estomac (droite)",
                        por: "SHU - Estômago (direita)",
                        deu: "SHU - Magen (rechte)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Polmone (sinistra)",
                        eng: "SHU - Lung (left)",
                        esp: "SHU - Pulmón (izquierda)",
                        fra: "SHU - Poumon (gauche)",
                        por: "SHU - Pulmão (esquerda)",
                        deu: "SHU - Lunge (linke)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Polmone (destra)",
                        eng: "SHU - Lung (right)",
                        esp: "SHU - Pulmón (derecha)",
                        fra: "SHU - Poumon (droite)",
                        por: "SHU - Pulmão (direita)",
                        deu: "SHU - Lunge (rechte)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Intestino crasso (sinistra)",
                        eng: "SHU - Large Intestine (left)",
                        esp: "SHU - Intestino grueso (izquierda)",
                        fra: "SHU - Gros intestin (gauche)",
                        por: "SHU - Intestino grosso (esquerda)",
                        deu: "SHU - Dickdarm (linke)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Intestino crasso (destra)",
                        eng: "SHU - Large Intestine (right)",
                        esp: "SHU - Intestino grueso (derecha)",
                        fra: "SHU - Gros intestin (droite)",
                        por: "SHU - Intestino grosso (direita)",
                        deu: "SHU - Dickdarm (rechte)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Rene (sinistra)",
                        eng: "SHU - Kidney (left)",
                        esp: "SHU - Riñón (izquierda)",
                        fra: "SHU - Rein (gauche)",
                        por: "SHU - Rim (esquerda)",
                        deu: "SHU - Niere (linke)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Rene (destra)",
                        eng: "SHU - Kidney (right)",
                        esp: "SHU - Riñón (derecha)",
                        fra: "SHU - Rein (droite)",
                        por: "SHU - Rim (direita)",
                        deu: "SHU - Niere (rechte)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Vescica urinaria (sinistra)",
                        eng: "SHU - Urinary Bladder (left)",
                        esp: "SHU - Vejiga urinaria (izquierda)",
                        fra: "SHU - Vésicule urinaire (gauche)",
                        por: "SHU - Bexiga urinária (esquerda)",
                        deu: "SHU - Harnblase (linke)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Vescica urinaria (destra)",
                        eng: "SHU - Urinary Bladder (right)",
                        esp: "SHU - Vejiga urinaria (derecha)",
                        fra: "SHU - Vésicule urinaire (droite)",
                        por: "SHU - Bexiga urinária (direita)",
                        deu: "SHU - Harnblase (rechte)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "e",
                    d: {
                        ita: "V = VUOTO",
                        eng: "D = DEFICIENCY",
                        esp: "D = DEFICIENCIA",
                        fra: "D = DÉFICIT",
                        por: "D = DEFICIÊNCIA",
                        deu: "M = MANGEL"
                    },
                    h: true
                },
                {
                    t: "e",
                    d: {
                        ita: "P = PIENO",
                        eng: "E = EXCESS",
                        esp: "E = EXCESO",
                        fra: "E = EXCÈS",
                        por: "E = EXCESSO",
                        deu: "Ü = ÜBERFLUSS"
                    },
                    h: true
                },
                {
                    t: "e",
                    d: {
                        ita: "X = DOLORANTE",
                        eng: "X = PAINFUL",
                        esp: "X = DOLOROSO",
                        fra: "X = DOULEUREUX",
                        por: "X = DOLOROSO",
                        deu: "X = SCHMERZHAFT"
                    },
                    h: true
                }  
            ],
            html:   '<div id="moduloMUSHU">' +
                    '   <div>' +
                    '       <div class="mushu_header">' +
                    '           <div></div>' +
                    '           <div>MU</div>' +
                    '           <div>SHU</div>' +
                    '           <div class="mushu_left_right">' +
                    '               <div><div>R</div><div>L</div></div>' +
                    '               <div><div>L</div><div>R</div></div>' +
                    '           </div>' +
                    '       </div>' +
                    '       <div>' +
                    '           <div id="mushuLR">LR</div>' +
                    '           <div>' +
                    '               <div><span></span>[0]</div>' +
                    '               <div><span></span>[1]</div>' +
                    '           </div>' +
                    '           <div>' +
                    '               <div><span></span>[18]</div>' +
                    '               <div><span></span>[19]</div>' +
                    '           </div>' +
                    '       </div>' +
                    '       <div>' +
                    '           <div id="mushuGB">GB</div>' +
                    '           <div>' +
                    '               <div><span></span>[2]</div>' +
                    '               <div><span></span>[3]</div>' +
                    '           </div>' +
                    '           <div>' +
                    '               <div><span></span>[20]</div>' +
                    '               <div><span></span>[21]</div>' +
                    '           </div>' +
                    '       </div>' +
                    '       <div>' +
                    '           <div id="mushuHT">HT</div>' +
                    '           <div>' +
                    '               <div><span></span>[4]</div>' +
                    '           </div>' +
                    '           <div>' +
                    '               <div><span></span>[22]</div>' +
                    '               <div><span></span>[23]</div>' +
                    '           </div>' +
                    '       </div>' +
                    '       <div>' +
                    '           <div id="mushuSI">SI</div>' +
                    '           <div>' +
                    '               <div><span></span>[5]</div>' +
                    '           </div>' +
                    '           <div>' +
                    '               <div><span></span>[24]</div>' +
                    '               <div><span></span>[25]</div>' +
                    '           </div>' +
                    '       </div>' +
                    '       <div>' +
                    '           <div id="mushuPC">PC</div>' +
                    '           <div>' +
                    '               <div><span></span>[6]</div>' +
                    '           </div>' +
                    '           <div>' +
                    '               <div><span></span>[26]</div>' +
                    '               <div><span></span>[27]</div>' +
                    '           </div>' +
                    '       </div>' +
                    '       <div>' +
                    '           <div id="mushuTE">TE</div>' +
                    '           <div>' +
                    '               <div><span></span>[7]</div>' +
                    '           </div>' +
                    '           <div>' +
                    '               <div><span></span>[28]</div>' +
                    '               <div><span></span>[29]</div>' +
                    '           </div>' +
                    '       </div>' +
                    '   </div>' +
                    '   <div>' +
                    '       <div class="mushu_header" id="second_header">' +
                    '           <div></div>' +
                    '           <div>MU</div>' +
                    '           <div>SHU</div>' +
                    '           <div class="mushu_left_right">' +
                    '               <div><div>R</div><div>L</div></div>' +
                    '               <div><div>L</div><div>R</div></div>' +
                    '           </div>' +
                    '       </div>' +
                    '       <div>' +
                    '           <div id="mushuSP">SP</div>' +
                    '           <div>' +
                    '               <div><span></span>[8]</div>' +
                    '               <div><span></span>[9]</div>' +
                    '           </div>' +
                    '           <div>' +
                    '               <div><span></span>[30]</div>' +
                    '               <div><span></span>[31]</div>' +
                    '           </div>' +
                    '       </div>' +
                    '       <div>' +
                    '           <div id="mushuST">ST</div>' +
                    '           <div>' +
                    '               <div><span></span>[10]</div>' +
                    '           </div>' +
                    '           <div>' +
                    '               <div><span></span>[32]</div>' +
                    '               <div><span></span>[33]</div>' +
                    '           </div>' +
                    '       </div>' +
                    '       <div>' +
                    '           <div id="mushuLU">LU</div>' +
                    '           <div>' +
                    '               <div><span></span>[11]</div>' +
                    '               <div><span></span>[12]</div>' +
                    '           </div>' +
                    '           <div>' +
                    '               <div><span></span>[34]</div>' +
                    '               <div><span></span>[35]</div>' +
                    '           </div>' +
                    '       </div>' +
                    '       <div>' +
                    '           <div id="mushuLI">LI</div>' +
                    '           <div>' +
                    '               <div><span></span>[13]</div>' +
                    '               <div><span></span>[14]</div>' +
                    '           </div>' +
                    '           <div>' +
                    '               <div><span></span>[36]</div>' +
                    '               <div><span></span>[37]</div>' +
                    '           </div>' +
                    '       </div>' +
                    '       <div>' +
                    '           <div id="mushuKI">KI</div>' +
                    '           <div>' +
                    '               <div><span></span>[15]</div>' +
                    '               <div><span></span>[16]</div>' +
                    '           </div>' +
                    '           <div>' +
                    '               <div><span></span>[38]</div>' +
                    '               <div><span></span>[39]</div>' +
                    '           </div>' +
                    '       </div>' +
                    '       <div>' +
                    '           <div id="mushuBL">BL</div>' +
                    '           <div>' +
                    '               <div><span></span>[17]</div>' +
                    '           </div>' +
                    '           <div>' +
                    '               <div><span></span>[40]</div>' +
                    '               <div><span></span>[41]</div>' +
                    '           </div>' +
                    '       </div>' +
                    '   </div>' +
                    '   <div>' +
                    '       <span id="mushu_legenda">[42][43][44]</span>' +
                    '   </div>' +
                    '</div>',
            funct: function(){
                let els = '';
                els = document.getElementById("moduloMUSHU").getElementsByTagName("SELECT");
                for(let e=0;e<els.length;e++){
                    let val = '';
                    if(els[e].selectedIndex==3)val = 'X';
                    else if(els[e].selectedIndex>0)val = els[e].options[els[e].selectedIndex].innerText.substr(0,1);
                    els[e].parentElement.parentElement.parentElement.getElementsByTagName("SPAN")[0].innerHTML = val;
                }
            }
        },
        mtc_mushu_vis: {
            category: "mtc",
            subcategory: "palpazione",
            title: {
                ita: "Valutazione MTC punti MU e SHU (grafica)",
                eng: "TCM Assessment of MU and SHU Points (graphic)",
                esp: "Evaluación MTC de los puntos MU y SHU (gráfica)",
                fra: "Évaluation MTC des points MU et SHU (graphique)",
                por: "Avaliação MTC dos pontos MU e SHU (gráfica)",
                deu: "TCM-Bewertung der MU- und SHU-Punkte (grafisch)"
            },
            data: [
                {
                    t: "s",
                    d: {
                        ita: "MU - Fegato (destra)",
                        eng: "MU - Liver (right)",
                        esp: "MU - Hígado (derecha)",
                        fra: "MU - Foie (droite)",
                        por: "MU - Fígado (direita)",
                        deu: "MU - Leber (rechte)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "MU - Fegato (sinistra)",
                        eng: "MU - Liver (left)",
                        esp: "MU - Hígado (izquierda)",
                        fra: "MU - Foie (gauche)",
                        por: "MU - Fígado (esquerda)",
                        deu: "MU - Leber (linke)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "MU - Cistifellea (destra)",
                        eng: "MU - Gallbladder (right)",
                        esp: "MU - Vesícula biliar (derecha)",
                        fra: "MU - Vésicule biliaire (droite)",
                        por: "MU - Vesícula biliar (direita)",
                        deu: "MU - Gallenblase (rechte)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "MU - Cistifellea (sinistra)",
                        eng: "MU - Gallbladder (left)",
                        esp: "MU - Vesícula biliar (izquierda)",
                        fra: "MU - Vésicule biliaire (gauche)",
                        por: "MU - Vesícula biliar (esquerda)",
                        deu: "MU - Gallenblase (linke)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "MU - Cuore",
                        eng: "MU - Heart",
                        esp: "MU - Corazón",
                        fra: "MU - Cœur",
                        por: "MU - Coração",
                        deu: "MU - Herzens"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "MU - Intestino tenue",
                        eng: "MU - Small Intestine",
                        esp: "MU - Intestino delgado",
                        fra: "MU - Intestin grêle",
                        por: "MU - Intestino delgado",
                        deu: "MU - Dünndarm"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "MU - Mastro del cuore",
                        eng: "MU - Master of the Heart",
                        esp: "MU - Maestro del corazón",
                        fra: "MU - Maître du cœur",
                        por: "MU - Mestre do coração",
                        deu: "MU - Meister des Herzens"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Triplo riscaldatore",
                        eng: "SHU - Triple Warmer",
                        esp: "SHU - Triple calentador",
                        fra: "SHU - Triple réchauffeur",
                        por: "SHU - Triplo aquecedor",
                        deu: "SHU - Dreifacher Erwärmer"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "MU - Milza-pancreas (destra)",
                        eng: "MU - Spleen-Pancreas (right)",
                        esp: "MU - Bazo-páncreas (derecha)",
                        fra: "MU - Rate-pancréas (droite)",
                        por: "MU - Baço-pâncreas (direita)",
                        deu: "MU - Milz-Bauchspeicheldrüse (rechte)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "MU - Milza-pancreas (sinistra)",
                        eng: "MU - Spleen-Pancreas (left)",
                        esp: "MU - Bazo-páncreas (izquierda)",
                        fra: "MU - Rate-pancréas (gauche)",
                        por: "MU - Baço-pâncreas (esquerda)",
                        deu: "MU - Milz-Bauchspeicheldrüse (linke)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "MU - Stomaco",
                        eng: "MU - Stomach",
                        esp: "MU - Estómago",
                        fra: "MU - Estomac",
                        por: "MU - Estômago",
                        deu: "MU - Magen"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "MU - Polmone (destra)",
                        eng: "MU - Lung (right)",
                        esp: "MU - Pulmón (derecha)",
                        fra: "MU - Poumon (droite)",
                        por: "MU - Pulmão (direita)",
                        deu: "MU - Lunge (rechte)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "MU - Polmone (sinistra)",
                        eng: "MU - Lung (left)",
                        esp: "MU - Pulmón (izquierda)",
                        fra: "MU - Poumon (gauche)",
                        por: "MU - Pulmão (esquerda)",
                        deu: "MU - Lunge (linke)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "MU - Intestino crasso (destra)",
                        eng: "MU - Large Intestine (right)",
                        esp: "MU - Intestino grueso (derecha)",
                        fra: "MU - Gros intestin (droite)",
                        por: "MU - Intestino grosso (direita)",
                        deu: "MU - Dickdarm (rechte)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "MU - Intestino crasso (sinistra)",
                        eng: "MU - Large Intestine (left)",
                        esp: "MU - Intestino grueso (izquierda)",
                        fra: "MU - Gros intestin (gauche)",
                        por: "MU - Intestino grosso (esquerda)",
                        deu: "MU - Dickdarm (linke)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "MU - Rene (destra)",
                        eng: "MU - Kidney (right)",
                        esp: "MU - Riñón (derecha)",
                        fra: "MU - Rein (droite)",
                        por: "MU - Rim (direita)",
                        deu: "MU - Niere (rechte)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "MU - Rene (sinistra)",
                        eng: "MU - Kidney (left)",
                        esp: "MU - Riñón (izquierda)",
                        fra: "MU - Rein (gauche)",
                        por: "MU - Rim (esquerda)",
                        deu: "MU - Niere (linke)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "MU - Vescica",
                        eng: "MU - Bladder",
                        esp: "MU - Vejiga",
                        fra: "MU - Vésicule urinaire",
                        por: "MU - Bexiga",
                        deu: "MU - Blase"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Fegato (sinistra)",
                        eng: "SHU - Liver (left)",
                        esp: "SHU - Hígado (izquierda)",
                        fra: "SHU - Foie (gauche)",
                        por: "SHU - Fígado (esquerda)",
                        deu: "SHU - Leber (linke)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Fegato (destra)",
                        eng: "SHU - Liver (right)",
                        esp: "SHU - Hígado (derecha)",
                        fra: "SHU - Foie (droite)",
                        por: "SHU - Fígado (direita)",
                        deu: "SHU - Leber (rechte)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Cistifellea (sinistra)",
                        eng: "SHU - Gallbladder (left)",
                        esp: "SHU - Vesícula biliar (izquierda)",
                        fra: "SHU - Vésicule biliaire (gauche)",
                        por: "SHU - Vesícula biliar (esquerda)",
                        deu: "SHU - Gallenblase (linke)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Cistifellea (destra)",
                        eng: "SHU - Gallbladder (right)",
                        esp: "SHU - Vesícula biliar (derecha)",
                        fra: "SHU - Vésicule biliaire (droite)",
                        por: "SHU - Vesícula biliar (direita)",
                        deu: "SHU - Gallenblase (rechte)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Cuore (sinistra)",
                        eng: "SHU - Heart (left)",
                        esp: "SHU - Corazón (izquierda)",
                        fra: "SHU - Cœur (gauche)",
                        por: "SHU - Coração (esquerda)",
                        deu: "SHU - Herz (linke)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Cuore (destra)",
                        eng: "SHU - Heart (right)",
                        esp: "SHU - Corazón (derecha)",
                        fra: "SHU - Cœur (droite)",
                        por: "SHU - Coração (direita)",
                        deu: "SHU - Herz (rechte)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Intestino tenue (sinistra)",
                        eng: "SHU - Small Intestine (left)",
                        esp: "SHU - Intestino delgado (izquierda)",
                        fra: "SHU - Intestin grêle (gauche)",
                        por: "SHU - Intestino delgado (esquerda)",
                        deu: "SHU - Dünndarm (linke)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Intestino tenue (destra)",
                        eng: "SHU - Small Intestine (right)",
                        esp: "SHU - Intestino delgado (derecha)",
                        fra: "SHU - Intestin grêle (droite)",
                        por: "SHU - Intestino delgado (direita)",
                        deu: "SHU - Dünndarm (rechte)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Mastro del cuore (sinistra)",
                        eng: "SHU - Master of the Heart (left)",
                        esp: "SHU - Maestro del corazón (izquierda)",
                        fra: "SHU - Maître du cœur (gauche)",
                        por: "SHU - Mestre do coração (esquerda)",
                        deu: "SHU - Meister des Herzens (linke)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Mastro del cuore (destra)",
                        eng: "SHU - Master of the Heart (right)",
                        esp: "SHU - Maestro del corazón (derecha)",
                        fra: "SHU - Maître du cœur (droite)",
                        por: "SHU - Mestre do coração (direita)",
                        deu: "SHU - Meister des Herzens (rechte)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Triplo riscaldatore (sinistra)",
                        eng: "SHU - Triple Warmer (left)",
                        esp: "SHU - Triple calentador (izquierda)",
                        fra: "SHU - Triple réchauffeur (gauche)",
                        por: "SHU - Triplo aquecedor (esquerda)",
                        deu: "SHU - Dreifacher Erwärmer (linke)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Triplo riscaldatore (destra)",
                        eng: "SHU - Triple Warmer (right)",
                        esp: "SHU - Triple calentador (derecha)",
                        fra: "SHU - Triple réchauffeur (droite)",
                        por: "SHU - Triplo aquecedor (direita)",
                        deu: "SHU - Dreifacher Erwärmer (rechte)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Milza-pancreas (sinistra)",
                        eng: "SHU - Spleen-Pancreas (left)",
                        esp: "SHU - Bazo-páncreas (izquierda)",
                        fra: "SHU - Rate-pancréas (gauche)",
                        por: "SHU - Baço-pâncreas (esquerda)",
                        deu: "SHU - Milz-Bauchspeicheldrüse (linke)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Milza-pancreas (destra)",
                        eng: "SHU - Spleen-Pancreas (right)",
                        esp: "SHU - Bazo-páncreas (derecha)",
                        fra: "SHU - Rate-pancréas (droite)",
                        por: "SHU - Baço-pâncreas (direita)",
                        deu: "SHU - Milz-Bauchspeicheldrüse (rechte)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Stomaco (sinistra)",
                        eng: "SHU - Stomach (left)",
                        esp: "SHU - Estómago (izquierda)",
                        fra: "SHU - Estomac (gauche)",
                        por: "SHU - Estômago (esquerda)",
                        deu: "SHU - Magen (linke)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Stomaco (destra)",
                        eng: "SHU - Stomach (right)",
                        esp: "SHU - Estómago (derecha)",
                        fra: "SHU - Estomac (droite)",
                        por: "SHU - Estômago (direita)",
                        deu: "SHU - Magen (rechte)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Polmone (sinistra)",
                        eng: "SHU - Lung (left)",
                        esp: "SHU - Pulmón (izquierda)",
                        fra: "SHU - Poumon (gauche)",
                        por: "SHU - Pulmão (esquerda)",
                        deu: "SHU - Lunge (linke)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Polmone (destra)",
                        eng: "SHU - Lung (right)",
                        esp: "SHU - Pulmón (derecha)",
                        fra: "SHU - Poumon (droite)",
                        por: "SHU - Pulmão (direita)",
                        deu: "SHU - Lunge (rechte)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Intestino crasso (sinistra)",
                        eng: "SHU - Large Intestine (left)",
                        esp: "SHU - Intestino grueso (izquierda)",
                        fra: "SHU - Gros intestin (gauche)",
                        por: "SHU - Intestino grosso (esquerda)",
                        deu: "SHU - Dickdarm (linke)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Intestino crasso (destra)",
                        eng: "SHU - Large Intestine (right)",
                        esp: "SHU - Intestino grueso (derecha)",
                        fra: "SHU - Gros intestin (droite)",
                        por: "SHU - Intestino grosso (direita)",
                        deu: "SHU - Dickdarm (rechte)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Rene (sinistra)",
                        eng: "SHU - Kidney (left)",
                        esp: "SHU - Riñón (izquierda)",
                        fra: "SHU - Rein (gauche)",
                        por: "SHU - Rim (esquerda)",
                        deu: "SHU - Niere (linke)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Rene (destra)",
                        eng: "SHU - Kidney (right)",
                        esp: "SHU - Riñón (derecha)",
                        fra: "SHU - Rein (droite)",
                        por: "SHU - Rim (direita)",
                        deu: "SHU - Niere (rechte)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Vescica urinaria (sinistra)",
                        eng: "SHU - Urinary Bladder (left)",
                        esp: "SHU - Vejiga urinaria (izquierda)",
                        fra: "SHU - Vésicule urinaire (gauche)",
                        por: "SHU - Bexiga urinária (esquerda)",
                        deu: "SHU - Harnblase (linke)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "s",
                    d: {
                        ita: "SHU - Vescica urinaria (destra)",
                        eng: "SHU - Urinary Bladder (right)",
                        esp: "SHU - Vejiga urinaria (derecha)",
                        fra: "SHU - Vésicule urinaire (droite)",
                        por: "SHU - Bexiga urinária (direita)",
                        deu: "SHU - Harnblase (rechte)"
                    },
                    l: "stati_energetici"
                },
                {
                    t: "e",
                    d: {
                        ita: "V = VUOTO",
                        eng: "D = DEFICIENCY",
                        esp: "D = DEFICIENCIA",
                        fra: "D = DÉFICIT",
                        por: "D = DEFICIÊNCIA",
                        deu: "M = MANGEL"
                    },
                    h: true
                },
                {
                    t: "e",
                    d: {
                        ita: "P = PIENO",
                        eng: "E = EXCESS",
                        esp: "E = EXCESO",
                        fra: "E = EXCÈS",
                        por: "E = EXCESSO",
                        deu: "Ü = ÜBERFLUSS"
                    },
                    h: true
                },
                {
                    t: "e",
                    d: {
                        ita: "X = DOLORANTE",
                        eng: "X = PAINFUL",
                        esp: "X = DOLOROSO",
                        fra: "X = DOULEUREUX",
                        por: "X = DOLOROSO",
                        deu: "X = SCHMERZHAFT"
                    },
                    h: true
                }  
            ],
            html:   '<div id="moduloMUSHUVIS">' +
                    '   <div id="mushuvis_davanti">' +
                    '       <div>' +
                    '           <div id="muLUdx"><span></span>[11]</div>' + // LU
                    '           <div id="muLRdx"><span></span>[0]</div>' + // LR
                    '           <div id="muGBdx"><span></span>[2]</div>' + // GB
                    '           <div id="muKIdx"><span></span>[15]</div>' + // KI
                    '           <div id="muSPdx"><span></span>[8]</div>' + // SP
                    '           <div id="muLIdx"><span></span>[13]</div>' + // LI
                    '       </div>' +
                    '       <div>' +
                    '           <div id="muPC"><span></span>[6]</div>' + // PC
                    '           <div id="muHT"><span></span>[4]</div>' + // HT
                    '           <div id="muST"><span></span>[10]</div>' + // ST
                    '           <div id="muTE"><span></span>[7]</div>' + // TE
                    '           <div id="muSI"><span></span>[5]</div>' + // SI
                    '           <div id="muBL"><span></span>[17]</div>' + // BL
                    '       </div>' +
                    '       <div>' +
                    '           <div id="muLUsx"><span></span>[12]</div>' + // LU
                    '           <div id="muLRsx"><span></span>[1]</div>' + // LR
                    '           <div id="muGBsx"><span></span>[3]</div>' + // GB
                    '           <div id="muKIsx"><span></span>[16]</div>' + // KI
                    '           <div id="muSPsx"><span></span>[9]</div>' + // SP
                    '           <div id="muLIsx"><span></span>[14]</div>' + // LI
                    '       </div>' +
                    '   </div>' +
                    '   <div id="mushuvis_dietro">' +
                    '       <div>' +
                    '           <div id="shuLUsx"><span></span>[34]</div>' + // LU
                    '           <div id="shuPCsx"><span></span>[26]</div>' + // PC
                    '           <div id="shuHTsx"><span></span>[22]</div>' + // HT
                    '           <div id="shuLRsx"><span></span>[18]</div>' + // LR
                    '           <div id="shuGBsx"><span></span>[20]</div>' + // GB
                    '           <div id="shuSPsx"><span></span>[30]</div>' + // SP
                    '           <div id="shuSTsx"><span></span>[32]</div>' + // ST
                    '           <div id="shuTEsx"><span></span>[28]</div>' + // TE
                    '           <div id="shuKIsx"><span></span>[38]</div>' + // KI
                    '           <div id="shuLIsx"><span></span>[36]</div>' + // LI
                    '           <div id="shuSIsx"><span></span>[24]</div>' + // SI
                    '           <div id="shuBLsx"><span></span>[40]</div>' + // BL
                    '       </div>' +
                    '       <div>' +
                    '           <div id="shuLUdx"><span></span>[35]</div>' + // LU
                    '           <div id="shuPCdx"><span></span>[27]</div>' + // PC
                    '           <div id="shuHTdx"><span></span>[23]</div>' + // HT
                    '           <div id="shuLRdx"><span></span>[19]</div>' + // LR
                    '           <div id="shuGBdx"><span></span>[21]</div>' + // GB
                    '           <div id="shuSPdx"><span></span>[31]</div>' + // SP
                    '           <div id="shuSTdx"><span></span>[33]</div>' + // ST
                    '           <div id="shuTEdx"><span></span>[29]</div>' + // TE
                    '           <div id="shuKIdx"><span></span>[39]</div>' + // KI
                    '           <div id="shuLIdx"><span></span>[37]</div>' + // LI
                    '           <div id="shuSIdx"><span></span>[25]</div>' + // SI
                    '           <div id="shuBLdx"><span></span>[41]</div>' + // BL
                    '       </div>' +
                    '   </div>' +
                    '   <div>' +
                    '       <span id="mushu_legenda">[43][42][44]</span>' +
                    '       <span id="mushu_grafico">' +
                    '           <svg width="230" height="61" xmlns="http://www.w3.org/2000/svg">' +
                    '               <line x1="0" y1="30" x2="230" y2="30" style="stroke:rgba(0,0,0,0.4);stroke-width:1" />' +
                    '               <line x1="0" y1="0" x2="0" y2="61" style="stroke:rgba(0,0,0,0.2);stroke-width:1" />' +
                    '               <line x1="46" y1="0" x2="46" y2="61" style="stroke:rgba(0,0,0,0.2);stroke-width:1" />' +
                    '               <line x1="92" y1="0" x2="92" y2="61" style="stroke:rgba(0,0,0,0.2);stroke-width:1" />' +
                    '               <line x1="138" y1="0" x2="138" y2="61" style="stroke:rgba(0,0,0,0.2);stroke-width:1" />' +
                    '               <line x1="184" y1="0" x2="184" y2="61" style="stroke:rgba(0,0,0,0.2);stroke-width:1" />' +
                    '               <line x1="230" y1="0" x2="230" y2="61" style="stroke:rgba(0,0,0,0.2);stroke-width:1" />' +
                    '               <rect x="2" y="30" width="42" height="1" style="fill:#339a16;" id="md_val_0" />' +
                    '               <rect x="48" y="30" width="42" height="1" style="fill:#F00;" id="md_val_1" />' +
                    '               <rect x="94" y="30" width="42" height="1" style="fill:#eb9b13;" id="md_val_2" />' +
                    '               <rect x="140" y="30" width="42" height="1" style="fill:#FFF;" id="md_val_3" />' +
                    '               <rect x="186" y="30" width="42" height="1" style="fill:#000;" id="md_val_4" />' +
                    '           </svg>' +
                    '       </span>' +
                    '   </div>' +
                    '</div>',
            funct: function(){
                let els = '',
                    fasi = [
                        ["LR","GB"],
                        ["HT","SI","PC","TE"],
                        ["ST","SP"],
                        ["LI","LU"],
                        ["BL","KI"]
                    ],
                    stati = [ 0,0,0,0,0 ],
                    maxs = [ 8,12,7,8,7 ];
                els = document.getElementById("moduloMUSHUVIS").getElementsByTagName("SELECT");
                for(let e=0;e<els.length;e++){
                    let val = '',
                        cont = els[e].parentElement.parentElement.parentElement,
                        sigla = cont.id.replace("mu","").replace("shu","").substr(0,2);
                    if(els[e].selectedIndex==3)val = 'X';
                    else if(els[e].selectedIndex>0)val = els[e].options[els[e].selectedIndex].innerText.substr(0,1);
                    cont.getElementsByTagName("SPAN")[0].innerHTML = val;
                    for(f in fasi){
                        if(fasi[f].indexOf(sigla)>-1){
                            if(els[e].selectedIndex == 1)stati[f]++;
                            if(els[e].selectedIndex == 2)stati[f]--;
                        }
                    } 
                }
                for(s in stati){
                    let h = (stati[s]*30)/maxs[s],
                        y = 30;
                    if(h>0){
                        y-=h;
                    }
                    if(h<0){
                        h=0-h;
                    }
                    if(h==0)h=1;
                    document.getElementById("md_val_"+s).style.y = y;
                    document.getElementById("md_val_"+s).style.height = h;
                }
            }
        },
        mtc_generale: {
            category: "mtc",
            subcategory: "interrogazione",
            title: {
                ita: "Valutazione MTC Condizione generale",
                eng: "TCM Assessment of General Condition",
                esp: "Evaluación MTC de la Condición General",
                fra: "Évaluation MTC de l'État Général",
                por: "Avaliação MTC da Condição Geral",
                deu: "TCM-Bewertung des Allgemeinzustands"
            },
            data: [
                {
                    t: "d",
                    d: {
                        ita: "Come si sente in generale?",
                        eng: "How do you feel in general?",
                        esp: "¿Cómo se siente en general?",
                        fra: "Comment vous sentez-vous en général?",
                        por: "Como você se sente em geral?",
                        deu: "Wie fühlen Sie sich im Allgemeinen?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Da quanto tempo ha questo disturbo?",
                        eng: "How long have you had this condition?",
                        esp: "¿Cuánto tiempo ha tenido este problema?",
                        fra: "Depuis combien de temps avez-vous ce trouble?",
                        por: "Há quanto tempo você tem esse distúrbio?",
                        deu: "Seit wann haben Sie dieses Problem?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Ha avuto episodi simili in passato?",
                        eng: "Have you had similar episodes in the past?",
                        esp: "¿Ha tenido episodios similares en el pasado?",
                        fra: "Avez-vous eu des épisodes similaires dans le passé?",
                        por: "Você já teve episódios semelhantes no passado?",
                        deu: "Hatten Sie in der Vergangenheit ähnliche Episoden?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Ha subito traumi o interventi recenti?",
                        eng: "Have you undergone any recent injuries or surgeries?",
                        esp: "¿Ha sufrido alguna lesión o cirugía reciente?",
                        fra: "Avez-vous subi des traumatismes ou des interventions récentes?",
                        por: "Você sofreu lesões ou fez cirurgias recentes?",
                        deu: "Haben Sie kürzlich Verletzungen oder Operationen gehabt?"
                    }
                }
            ],
            html: '<div id="moduloGENERALE">[0][1][2][3]</div>'
        },
        mtc_energia: {
            category: "mtc",
            subcategory: "interrogazione",
            title: {
                ita: "Valutazione MTC Energia e affaticamento",
                eng: "TCM Assessment of Energy and Fatigue",
                esp: "Evaluación MTC de Energía y Fatiga",
                fra: "Évaluation MTC de l'Énergie et de la Fatigue",
                por: "Avaliação MTC da Energia e Fadiga",
                deu: "TCM-Bewertung von Energie und Müdigkeit"
            },
            data: [
                {
                    t: "d",
                    d: {
                        ita: "Si sente stanco o debole durante il giorno?",
                        eng: "Do you feel tired or weak during the day?",
                        esp: "¿Se siente cansado o débil durante el día?",
                        fra: "Vous sentez-vous fatigué ou faible pendant la journée?",
                        por: "Você se sente cansado ou fraco durante o dia?",
                        deu: "Fühlen Sie sich tagsüber müde oder schwach?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "La sua energia è peggiore al mattino, al pomeriggio o alla sera?",
                        eng: "Is your energy worse in the morning, afternoon, or evening?",
                        esp: "¿Su energía es peor por la mañana, por la tarde o por la noche?",
                        fra: "Votre énergie est-elle pire le matin, l'après-midi ou le soir?",
                        por: "Sua energia é pior pela manhã, à tarde ou à noite?",
                        deu: "Ist Ihre Energie morgens, nachmittags oder abends schlechter?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Ha notato una diminuzione della resistenza fisica o mentale?",
                        eng: "Have you noticed a decrease in physical or mental stamina?",
                        esp: "¿Ha notado una disminución de la resistencia física o mental?",
                        fra: "Avez-vous remarqué une diminution de l'endurance physique ou mentale?",
                        por: "Você notou uma diminuição da resistência física ou mental?",
                        deu: "Haben Sie einen Rückgang der körperlichen oder geistigen Ausdauer bemerkt?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Si sente meglio o peggio dopo aver mangiato?",
                        eng: "Do you feel better or worse after eating?",
                        esp: "¿Se siente mejor o peor después de comer?",
                        fra: "Vous sentez-vous mieux ou pire après avoir mangé?",
                        por: "Você se sente melhor ou pior depois de comer?",
                        deu: "Fühlen Sie sich nach dem Essen besser oder schlechter?"
                    }
                }
            ],
            html: '<div id="moduloENERGIA">[0][1][2][3]</div>'
        },
        mtc_temperatura: {
            category: "mtc",
            subcategory: "interrogazione",
            title: {
                ita: "Valutazione MTC Temperatura e sudorazione",
                eng: "TCM Assessment of Temperature and Sweating",
                esp: "Evaluación MTC de Temperatura y Sudoración",
                fra: "Évaluation MTC de la Température et de la Transpiration",
                por: "Avaliação MTC da Temperatura e Sudorese",
                deu: "TCM-Bewertung von Temperatur und Schwitzen"
            },
            data: [
                {
                    t: "d",
                    d: {
                        ita: "Sente spesso freddo o calore?",
                        eng: "Do you often feel cold or hot?",
                        esp: "¿A menudo siente frío o calor?",
                        fra: "Ressentez-vous souvent du froid ou de la chaleur?",
                        por: "Você sente frequentemente frio ou calor?",
                        deu: "Fühlen Sie sich oft kalt oder heiß?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Qual è la sua tolleranza al freddo e al caldo?",
                        eng: "What is your tolerance to cold and heat?",
                        esp: "¿Cuál es su tolerancia al frío y al calor?",
                        fra: "Quelle est votre tolérance au froid et à la chaleur?",
                        por: "Qual é a sua tolerância ao frio e ao calor?",
                        deu: "Wie ist Ihre Toleranz gegenüber Kälte und Wärme?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Suda facilmente? Se sì, in quali momenti o zone del corpo?",
                        eng: "Do you sweat easily? If so, at what times or body areas?",
                        esp: "¿Suda fácilmente? Si es así, en qué momentos o áreas del cuerpo?",
                        fra: "Transpirez-vous facilement? Si oui, à quels moments ou sur quelles zones du corps?",
                        por: "Você sua facilmente? Se sim, em quais momentos ou áreas do corpo?",
                        deu: "Schwitzen Sie leicht? Wenn ja, zu welchen Zeiten oder an welchen Körperstellen?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Ha sudorazione notturna o sudorazione spontanea durante il giorno?",
                        eng: "Do you experience night sweats or spontaneous sweating during the day?",
                        esp: "¿Experimenta sudores nocturnos o sudoración espontánea durante el día?",
                        fra: "Avez-vous des sueurs nocturnes ou de la transpiration spontanée pendant la journée?",
                        por: "Você tem sudorese noturna ou sudorese espontânea durante o dia?",
                        deu: "Haben Sie Nachtschweiß oder spontane Schweißausbrüche während des Tages?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "La sudorazione è accompagnata da una sensazione di calore o freddo?",
                        eng: "Is the sweating accompanied by a sensation of heat or cold?",
                        esp: "¿La sudoración va acompañada de una sensación de calor o frío?",
                        fra: "La transpiration est-elle accompagnée d'une sensation de chaleur ou de froid?",
                        por: "A sudore é acompanhada de uma sensação de calor ou frio?",
                        deu: "Ist das Schwitzen von einem Gefühl von Hitze oder Kälte begleitet?"
                    }
                }
            ],
            html: '<div id="moduloTEMPERATURA">[0][1][2][3][4]</div>'
        },
        mtc_sonno: {
            category: "mtc",
            subcategory: "interrogazione",
            title: {
                ita: "Valutazione MTC Sonno",
                eng: "TCM Assessment of Sleep",
                esp: "Evaluación MTC del Sueño",
                fra: "Évaluation MTC du Sommeil",
                por: "Avaliação MTC do Sono",
                deu: "TCM-Bewertung des Schlafs"
            },
            data: [
                {
                    t: "d",
                    d: {
                        ita: "Come dorme di notte?",
                        eng: "How do you sleep at night?",
                        esp: "¿Cómo duerme por la noche?",
                        fra: "Comment dormez-vous la nuit?",
                        por: "Como você dorme à noite?",
                        deu: "Wie schlafen Sie in der Nacht?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Si sveglia facilmente o fa fatica a dormire?",
                        eng: "Do you wake up easily or have trouble sleeping?",
                        esp: "¿Se despierta fácilmente o tiene problemas para dormir?",
                        fra: "Vous réveillez-vous facilement ou avez-vous des problèmes pour dormir?",
                        por: "Você acorda facilmente ou tem dificuldade para dormir?",
                        deu: "Wachen Sie leicht auf oder haben Sie Schwierigkeiten beim Schlafen?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Si sveglia spesso durante la notte? A che ora?",
                        eng: "Do you often wake up during the night? At what time?",
                        esp: "¿Se despierta a menudo durante la noche? ¿A qué hora?",
                        fra: "Vous réveillez-vous souvent pendant la nuit? À quelle heure?",
                        por: "Você se acorda frequentemente durante a noite? A que horas?",
                        deu: "Wachen Sie nachts oft auf? Um wie viel Uhr?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Sogna molto? Se sì, sono sogni agitati o disturbanti?",
                        eng: "Do you dream a lot? If so, are they restless or disturbing dreams?",
                        esp: "¿Sueña mucho? Si es así, son sueños inquietos o perturbadores?",
                        fra: "Rêvez-vous beaucoup? Si oui, ce sont des rêves agités ou troublants?",
                        por: "Você sonha muito? Se sim, são sonhos agitados ou perturbadores?",
                        deu: "Träumen Sie viel? Wenn ja, sind es unruhige oder störende Träume?"
                    }
                }
            ],
            html: '<div id="moduloSONNO">[0][1][2][3]</div>'
        },
        mtc_emozioni: {
            category: "mtc",
            subcategory: "interrogazione",
            title: {
                ita: "Valutazione MTC Emozioni",
                eng: "TCM Assessment of Emotions",
                esp: "Evaluación MTC de las Emociones",
                fra: "Évaluation MTC des Émotions",
                por: "Avaliação MTC das Emoções",
                deu: "TCM-Bewertung der Emotionen"
            },
            data: [
                {
                    t: "d",
                    d: {
                        ita: "Come si sente emotivamente?",
                        eng: "How do you feel emotionally?",
                        esp: "¿Cómo se siente emocionalmente?",
                        fra: "Comment vous sentez-vous émotionnellement?",
                        por: "Como você se sente emocionalmente?",
                        deu: "Wie fühlen Sie sich emotional?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Ha avuto sbalzi d'umore recenti?",
                        eng: "Have you had recent mood swings?",
                        esp: "¿Ha tenido cambios de humor recientes?",
                        fra: "Avez-vous eu des sautes d'humeur récentes?",
                        por: "Você teve mudanças de humor recentes?",
                        deu: "Hatten Sie in letzter Zeit Stimmungsschwankungen?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Si sente irritabile o impaziente?",
                        eng: "Do you feel irritable or impatient?",
                        esp: "¿Se siente irritable o impaciente?",
                        fra: "Vous sentez-vous irritable ou impatient?",
                        por: "Você se sente irritado ou impaciente?",
                        deu: "Fühlen Sie sich gereizt oder ungeduldig?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Si preoccupa molto?",
                        eng: "Do you worry a lot?",
                        esp: "¿Se preocupa mucho?",
                        fra: "Vous inquiétez-vous beaucoup?",
                        por: "Você se preocupa muito?",
                        deu: "Machen Sie sich viele Sorgen?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Ha avuto episodi di tristezza o depressione senza motivo apparente?",
                        eng: "Have you experienced episodes of sadness or depression without apparent reason?",
                        esp: "¿Ha tenido episodios de tristeza o depresión sin motivo aparente?",
                        fra: "Avez-vous eu des épisodes de tristesse ou de dépression sans raison apparente?",
                        por: "Você teve episódios de tristeza ou depressão sem motivo aparente?",
                        deu: "Hatten Sie Episoden von Traurigkeit oder Depression ohne ersichtlichen Grund?"
                    }
                }
            ],
            html: '<div id="moduloEMOZIONI">[0][1][2][3][4]</div>'
        },
        mtc_digestione: {
            category: "mtc",
            subcategory: "interrogazione",
            title: {
                ita: "Valutazione MTC Appetito e digestione",
                eng: "",
                esp: "",
                fra: "",
                por: "",
                deu: ""
            },
            data: [
                {
                    t: "d",
                    d: {
                        ita: "Ha fame regolarmente? Se no, quando si riduce l’appetito?",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Sente sazietà o pesantezza dopo aver mangiato?",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Ha avuto episodi di nausea o vomito?",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Ha eruttazioni frequenti?",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Ha un sapore amaro o acido in bocca?",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Soffre di bruciore di stomaco o reflusso gastrico?",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Ha desiderio di particolari tipi di cibo?",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    }
                }
            ],
            html: '<div id="moduloDIGESTIONE">[0][1][2][3][4][5][6]</div>'
        },
        mtc_sete: {
            category: "mtc",
            subcategory: "interrogazione",
            title: {
                ita: "Valutazione MTC Sete e liquidi corporei",
                eng: "TCM Assessment of Thirst and Body Fluids",
                esp: "Evaluación MTC de Sed y Líquidos Corporales",
                fra: "Évaluation MTC de la Soif et des Liquides Corporels",
                por: "Avaliação MTC da Sede e Líquidos Corporais",
                deu: "TCM-Bewertung von Durst und Körperflüssigkeiten"
            },
            data: [
                {
                    t: "d",
                    d: {
                        ita: "Ha sete spesso?",
                        eng: "Do you often feel thirsty?",
                        esp: "¿Tiene sed a menudo?",
                        fra: "Avez-vous souvent soif?",
                        por: "Você sente sede com frequência?",
                        deu: "Haben Sie oft Durst?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Beve molti liquidi o poca acqua?",
                        eng: "Do you drink a lot of fluids or little water?",
                        esp: "¿Bebe muchos líquidos o poca agua?",
                        fra: "Buvez-vous beaucoup de liquides ou peu d'eau?",
                        por: "Você bebe muitos líquidos ou pouca água?",
                        deu: "Trinken Sie viele Flüssigkeiten oder wenig Wasser?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Preferisce bevande fredde o calde?",
                        eng: "Do you prefer cold or hot drinks?",
                        esp: "¿Prefiere bebidas frías o calientes?",
                        fra: "Préférez-vous les boissons froides ou chaudes?",
                        por: "Você prefere bebidas frias ou quentes?",
                        deu: "Bevorzugen Sie kalte oder heiße Getränke?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Ha bocca secca o sensazione di calore interno?",
                        eng: "Do you have a dry mouth or a sensation of internal heat?",
                        esp: "¿Tiene la boca seca o sensación de calor interno?",
                        fra: "Avez-vous la bouche sèche ou une sensation de chaleur interne?",
                        por: "Você tem boca seca ou sensação de calor interno?",
                        deu: "Haben Sie einen trockenen Mund oder ein Gefühl von innerer Hitze?"
                    }
                }
            ],
            html: '<div id="moduloSETE">[0][1][2][3]</div>'
        },
        mtc_urine: {
            category: "mtc",
            subcategory: "interrogazione",
            title: {
                ita: "Valutazione MTC Urine",
                eng: "TCM Assessment of Urine",
                esp: "Evaluación MTC de la Orina",
                fra: "Évaluation MTC des Urines",
                por: "Avaliação MTC da Urina",
                deu: "TCM-Bewertung des Urins"
            },
            data: [
                {
                    t: "d",
                    d: {
                        ita: "La frequenza della minzione è normale, aumentata o ridotta?",
                        eng: "Is your urination frequency normal, increased, or decreased?",
                        esp: "¿Es normal, aumentada o reducida la frecuencia de micción?",
                        fra: "La fréquence des mictions est-elle normale, augmentée ou diminuée?",
                        por: "A frequência da micção é normal, aumentada ou reduzida?",
                        deu: "Ist Ihre Urinfrequenz normal, erhöht oder verringert?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Il colore dell'urina è chiaro, scuro, o torbido?",
                        eng: "Is the color of your urine clear, dark, or cloudy?",
                        esp: "¿Es el color de su orina claro, oscuro o turbio?",
                        fra: "La couleur de votre urine est-elle claire, foncée ou trouble?",
                        por: "A cor da sua urina é clara, escura ou turva?",
                        deu: "Ist Ihre Urinfarbe klar, dunkel oder trüb?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Hai dolori o fastidi durante la minzione?",
                        eng: "Do you experience pain or discomfort during urination?",
                        esp: "¿Siente dolor o molestias al orinar?",
                        fra: "Ressentez-vous de la douleur ou de l'inconfort pendant la miction?",
                        por: "Você sente dor ou desconforto ao urinar?",
                        deu: "Haben Sie Schmerzen oder Beschwerden beim Urinieren?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Si alza di notte per urinare?",
                        eng: "Do you get up at night to urinate?",
                        esp: "¿Se levanta por la noche para orinar?",
                        fra: "Vous levez-vous la nuit pour uriner?",
                        por: "Você se levanta à noite para urinar?",
                        deu: "Stehen Sie nachts auf, um zu urinieren?"
                    }
                }
            ],
            html: '<div id="moduloURINE">[0][1][2][3]</div>'
        },
        mtc_feci: {
            category: "mtc",
            subcategory: "interrogazione",
            title: {
                ita: "Valutazione MTC Feci e intestino",
                eng: "TCM Assessment of Feces and Intestine",
                esp: "Evaluación MTC de las Heces y el Intestino",
                fra: "Évaluation MTC des Selles et de l'Intestin",
                por: "Avaliação MTC das Fezes e do Intestino",
                deu: "TCM-Bewertung von Stuhl und Darm"
            },
            data: [
                {
                    t: "d",
                    d: {
                        ita: "Ha problemi di stitichezza o diarrea?",
                        eng: "Do you have issues with constipation or diarrhea?",
                        esp: "¿Tiene problemas de estreñimiento o diarrea?",
                        fra: "Avez-vous des problèmes de constipation ou de diarrhée?",
                        por: "Você tem problemas de constipação ou diarreia?",
                        deu: "Haben Sie Probleme mit Verstopfung oder Durchfall?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Quanto spesso evacua?",
                        eng: "How often do you have bowel movements?",
                        esp: "¿Con qué frecuencia evacua?",
                        fra: "À quelle fréquence évacuez-vous?",
                        por: "Com que frequência você evacua?",
                        deu: "Wie oft haben Sie Stuhlgang?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Le feci sono dure, molli o acquose?",
                        eng: "Are your stools hard, soft, or watery?",
                        esp: "¿Las heces son duras, blandas o acuosas?",
                        fra: "Les selles sont-elles dures, molles ou aqueuses?",
                        por: "As fezes são duras, moles ou aquosas?",
                        deu: "Sind Ihre Stühle hart, weich oder wässrig?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Nota muco o sangue nelle feci?",
                        eng: "Do you notice mucus or blood in your stools?",
                        esp: "¿Nota moco o sangre en las heces?",
                        fra: "Remarquez-vous des mucus ou du sang dans vos selles?",
                        por: "Você nota muco ou sangue nas fezes?",
                        deu: "Bemerkten Sie Schleim oder Blut in Ihrem Stuhl?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Ha gonfiore addominale o crampi?",
                        eng: "Do you have abdominal bloating or cramps?",
                        esp: "¿Tiene hinchazón abdominal o calambres?",
                        fra: "Avez-vous des ballonnements abdominaux ou des crampes?",
                        por: "Você tem inchaço abdominal ou cólicas?",
                        deu: "Haben Sie Bauchschwellungen oder Krämpfe?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Le evacuazioni sono accompagnate da un odore molto forte?",
                        eng: "Are your bowel movements accompanied by a very strong odor?",
                        esp: "¿Las evacuaciones vienen acompañadas de un olor muy fuerte?",
                        fra: "Les selles sont-elles accompagnées d'une odeur très forte?",
                        por: "As evacuações são acompanhadas de um odor muito forte?",
                        deu: "Sind Ihre Stuhlgänge von einem sehr starken Geruch begleitet?"
                    }
                }
            ],
            html: '<div id="moduloFECI">[0][1][2][3][4][5]</div>'
        },
        mtc_dolori: {
            category: "mtc",
            subcategory: "interrogazione",
            title: {
                ita: "Valutazione MTC Dolori e tensioni",
                eng: "TCM Assessment of Pain and Tension",
                esp: "Evaluación MTC del Dolor y la Tensión",
                fra: "Évaluation MTC de la Douleur et de la Tension",
                por: "Avaliação MTC da Dor e da Tensão",
                deu: "TCM-Bewertung von Schmerz und Spannung"
            },
            data: [
                {
                    t: "d",
                    d: {
                        ita: "Ha dolori o fastidi in qualche parte del corpo?",
                        eng: "Do you have pain or discomfort in any part of your body?",
                        esp: "¿Tiene dolor o molestias en alguna parte del cuerpo?",
                        fra: "Avez-vous des douleurs ou des inconforts dans une partie de votre corps?",
                        por: "Você tem dor ou desconforto em alguma parte do corpo?",
                        deu: "Haben Sie Schmerzen oder Beschwerden in irgendeinem Teil Ihres Körpers?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Il dolore è fisso o si sposta?",
                        eng: "Is the pain constant or does it move?",
                        esp: "¿El dolor es fijo o se mueve?",
                        fra: "La douleur est-elle fixe ou se déplace-t-elle?",
                        por: "A dor é constante ou se move?",
                        deu: "Ist der Schmerz konstant oder bewegt er sich?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Il dolore è acuto, sordo, pulsante, o bruciante?",
                        eng: "Is the pain sharp, dull, throbbing, or burning?",
                        esp: "¿El dolor es agudo, sordo, pulsante o ardiente?",
                        fra: "La douleur est-elle aiguë, sourde, lancinante ou brûlante?",
                        por: "A dor é aguda, surda, latejante ou ardente?",
                        deu: "Ist der Schmerz stechend, dumpf, pulsierend oder brennend?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Il dolore è peggiore al freddo, al caldo o con il movimento?",
                        eng: "Is the pain worse in the cold, heat, or with movement?",
                        esp: "¿El dolor empeora con el frío, el calor o el movimiento?",
                        fra: "La douleur est-elle pire au froid, à la chaleur ou avec le mouvement?",
                        por: "A dor é pior com frio, calor ou movimento?",
                        deu: "Ist der Schmerz bei Kälte, Wärme oder Bewegung schlimmer?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Ci sono particolari momenti della giornata in cui il dolore aumenta?",
                        eng: "Are there specific times of the day when the pain increases?",
                        esp: "¿Hay momentos específicos del día en los que el dolor aumenta?",
                        fra: "Y a-t-il des moments spécifiques de la journée où la douleur augmente?",
                        por: "Há momentos específicos do dia em que a dor aumenta?",
                        deu: "Gibt es bestimmte Tageszeiten, zu denen der Schmerz zunimmt?"
                    }
                }
            ],
            html: '<div id="moduloDOLORI">[0][1][2][3][4]</div>'
        },
        mtc_respirazione: {
            category: "mtc",
            subcategory: "interrogazione",
            title: {
                ita: "Valutazione MTC Respirazione",
                eng: "TCM Assessment of Breathing",
                esp: "Evaluación MTC de la Respiración",
                fra: "Évaluation MTC de la Respiration",
                por: "Avaliação MTC da Respiração",
                deu: "TCM-Bewertung der Atmung"
            },
            data: [
                {
                    t: "d",
                    d: {
                        ita: "Ha problemi a respirare profondamente?",
                        eng: "Do you have trouble taking deep breaths?",
                        esp: "¿Tiene problemas para respirar profundamente?",
                        fra: "Avez-vous des problèmes pour respirer profondément?",
                        por: "Você tem dificuldade para respirar profundamente?",
                        deu: "Haben Sie Schwierigkeiten, tief zu atmen?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Ha episodi di dispnea o affanno?",
                        eng: "Do you have episodes of shortness of breath?",
                        esp: "¿Tiene episodios de disnea o falta de aliento?",
                        fra: "Avez-vous des épisodes d'essoufflement?",
                        por: "Você tem episódios de falta de ar?",
                        deu: "Haben Sie Atemnot-Episoden?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Soffre di tosse frequente? Se sì, è secca o con espettorato?",
                        eng: "Do you suffer from frequent coughing? If so, is it dry or with phlegm?",
                        esp: "¿Sufre de tos frecuente? Si es así, ¿es seca o con esputo?",
                        fra: "Souffrez-vous de toux fréquente? Si oui, est-elle sèche ou avec des mucosités?",
                        por: "Você sofre de tosse frequente? Se sim, é seca ou com muco?",
                        deu: "Haben Sie häufigen Husten? Wenn ja, ist er trocken oder mit Schleim?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Ha sensazione di costrizione toracica o respiro sibilante?",
                        eng: "Do you feel tightness in your chest or wheezing?",
                        esp: "¿Siente opresión en el pecho o sibilancias?",
                        fra: "Ressentez-vous une oppression dans la poitrine ou un wheezing?",
                        por: "Você sente aperto no peito ou chiado?",
                        deu: "Fühlen Sie ein Engegefühl in der Brust oder Pfeifen?"
                    }
                }
            ],
            html: '<div id="moduloRESPIRAZIONE">[0][1][2][3]</div>'
        },
        mtc_mestruazioni: {
            category: "mtc",
            subcategory: "interrogazione",
            title: {
                ita: "Valutazione MTC Mestruazioni",
                eng: "TCM Assessment of Menstruation",
                esp: "Evaluación MTC de la Menstruación",
                fra: "Évaluation MTC de la Ménstruation",
                por: "Avaliação MTC da Menstruação",
                deu: "TCM-Bewertung der Menstruation"
            },
            data: [
                {
                    t: "d",
                    d: {
                        ita: "Il ciclo mestruale è regolare?",
                        eng: "Is your menstrual cycle regular?",
                        esp: "¿Es regular su ciclo menstrual?",
                        fra: "Votre cycle menstruel est-il régulier?",
                        por: "Seu ciclo menstrual é regular?",
                        deu: "Ist Ihr Menstruationszyklus regelmäßig?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Quanto dura il ciclo?",
                        eng: "How long does your cycle last?",
                        esp: "¿Cuánto dura su ciclo?",
                        fra: "Combien de temps dure votre cycle?",
                        por: "Quanto tempo dura seu ciclo?",
                        deu: "Wie lange dauert Ihr Zyklus?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Il flusso è abbondante o scarso?",
                        eng: "Is your flow heavy or light?",
                        esp: "¿Es su flujo abundante o escaso?",
                        fra: "Votre flux est-il abondant ou léger?",
                        por: "Seu fluxo é abundante ou leve?",
                        deu: "Ist Ihr Fluss schwer oder leicht?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Ha dolori mestruali? Se sì, quando compaiono?",
                        eng: "Do you have menstrual pain? If so, when does it occur?",
                        esp: "¿Tiene dolor menstrual? Si es así, ¿cuándo aparece?",
                        fra: "Avez-vous des douleurs menstruelles? Si oui, quand apparaissent-elles?",
                        por: "Você sente dor menstrual? Se sim, quando aparece?",
                        deu: "Haben Sie Menstruationsschmerzen? Wenn ja, wann treten sie auf?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Ha notato coaguli nel sangue mestruale?",
                        eng: "Have you noticed clots in your menstrual blood?",
                        esp: "¿Ha notado coágulos en su sangre menstrual?",
                        fra: "Avez-vous remarqué des caillots dans votre sang menstruel?",
                        por: "Você notou coágulos em seu sangue menstrual?",
                        deu: "Haben Sie Klumpen in Ihrem Menstruationsblut bemerkt?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Ha sintomi premestruali (PMS)?",
                        eng: "Do you have premenstrual symptoms (PMS)?",
                        esp: "¿Tiene síntomas premenstruali (PMS)?",
                        fra: "Avez-vous des symptômes prémenstruels (PMS)?",
                        por: "Você tem sintomas pré-menstruais (PMS)?",
                        deu: "Haben Sie prämenstruelle Symptome (PMS)?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Ha mai avuto irregolarità mestruali o amenorrea?",
                        eng: "Have you ever had menstrual irregularities or amenorrhea?",
                        esp: "¿Alguna vez ha tenido irregularidades menstruali o amenorrea?",
                        fra: "Avez-vous déjà eu des irrégularités menstruelles ou une aménorrhée?",
                        por: "Você já teve irregularidades menstruais ou amenorreia?",
                        deu: "Hatten Sie jemals Menstruationsunregelmäßigkeiten oder Amenorrhoe?"
                    }
                }
            ],
            html: '<div id="moduloMESTRUAZIONI">[0][1][2][3][4][5][6]</div>'
        },
        mtc_gravidanza: {
            category: "mtc",
            subcategory: "interrogazione",
            title: {
                ita: "Valutazione MTC Gravidanza e fertilità",
                eng: "TCM Assessment of Pregnancy and Fertility",
                esp: "Evaluación MTC del Embarazo y la Fertilidad",
                fra: "Évaluation MTC de la Grossesse et de la Fertilité",
                por: "Avaliação MTC da Gravidez e Fertilidade",
                deu: "TCM-Bewertung von Schwangerschaft und Fruchtbarkeit"
            },
            data: [
                {
                    t: "d",
                    d: {
                        ita: "Ha difficoltà a rimanere incinta?",
                        eng: "Do you have difficulty getting pregnant?",
                        esp: "¿Tiene dificultad para quedar embarazada?",
                        fra: "Avez-vous des difficultés à tomber enceinte?",
                        por: "Você tem dificuldade para engravidar?",
                        deu: "Haben Sie Schwierigkeiten, schwanger zu werden?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Ha avuto aborti spontanei?",
                        eng: "Have you had any miscarriages?",
                        esp: "¿Ha tenido abortos espontáneos?",
                        fra: "Avez-vous eu des fausses couches?",
                        por: "Você teve abortos espontâneos?",
                        deu: "Hatten Sie Fehlgeburten?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Ha sintomi particolari durante la gravidanza?",
                        eng: "Do you have any particular symptoms during pregnancy?",
                        esp: "¿Tiene síntomas particulares durante el embarazo?",
                        fra: "Avez-vous des symptômes particuliers pendant la grossesse?",
                        por: "Você tem sintomas específicos durante a gravidez?",
                        deu: "Haben Sie während der Schwangerschaft besondere Symptome?"
                    }
                }
            ],
            html: '<div id="moduloGRAVIDANZA">[0][1][2]</div>'
        },
        mtc_menopausa: {
            category: "mtc",
            subcategory: "interrogazione",
            title: {
                ita: "Valutazione MTC Menopausa",
                eng: "TCM Assessment of Menopause",
                esp: "Evaluación MTC de la Menopausia",
                fra: "Évaluation MTC de la Ménopause",
                por: "Avaliação MTC da Menopausa",
                deu: "TCM-Bewertung der Menopause"
            },
            data: [
                {
                    t: "d",
                    d: {
                        ita: "Ha avuto vampate di calore o sudorazioni notturne?",
                        eng: "Have you experienced hot flashes or night sweats?",
                        esp: "¿Ha tenido sofocos o sudores nocturnos?",
                        fra: "Avez-vous eu des bouffées de chaleur ou des sueurs nocturnes?",
                        por: "Você teve ondas de calor ou suores noturnos?",
                        deu: "Hatten Sie Hitzewallungen oder Nachtschweiß?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Ha irritabilità, ansia o insonnia?",
                        eng: "Do you experience irritability, anxiety, or insomnia?",
                        esp: "¿Siente irritabilidad, ansiedad o insomnio?",
                        fra: "Ressentez-vous de l'irritabilité, de l'anxiété ou de l'insomnie?",
                        por: "Você sente irritabilidade, ansiedade ou insônia?",
                        deu: "Haben Sie Reizbarkeit, Angst oder Schlaflosigkeit?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Ha avuto secchezza vaginale o altri sintomi fisici?",
                        eng: "Do you have vaginal dryness or other physical symptoms?",
                        esp: "¿Tiene sequedad vaginal u otros síntomas físicos?",
                        fra: "Avez-vous une sécheresse vaginale ou d'autres symptômes physiques?",
                        por: "Você tem secura vaginal ou outros sintomas físicos?",
                        deu: "Haben Sie vaginale Trockenheit oder andere körperliche Symptome?"
                    }
                }
            ],
            html: '<div id="moduloMENOPAUSA">[0][1][2]</div>'
        },
        mtc_sesso: {
            category: "mtc",
            subcategory: "interrogazione",
            title: {
                ita: "Valutazione MTC Stato sessuale",
                eng: "TCM Assessment of Sexual Health",
                esp: "Evaluación MTC de la Salud Sexual",
                fra: "Évaluation MTC de la Santé Sexuelle",
                por: "Avaliação MTC da Saúde Sexual",
                deu: "TCM-Bewertung der sexuellen Gesundheit"
            },
            data: [
                {
                    t: "d",
                    d: {
                        ita: "Ha avuto cambiamenti nella libido?",
                        eng: "Have you experienced changes in libido?",
                        esp: "¿Ha tenido cambios en la libido?",
                        fra: "Avez-vous eu des changements dans la libido?",
                        por: "Você teve mudanças na libido?",
                        deu: "Hatten Sie Veränderungen in der Libido?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Ha problemi di disfunzione sessuale?",
                        eng: "Do you have any sexual dysfunction issues?",
                        esp: "¿Tiene problemas de disfunción sexual?",
                        fra: "Avez-vous des problèmes de dysfonction sexuelle?",
                        por: "Você tem problemas de disfunção sexual?",
                        deu: "Haben Sie Probleme mit sexueller Dysfunktion?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Soffre di impotenza o eiaculazione precoce?",
                        eng: "Do you suffer from impotence or premature ejaculation?",
                        esp: "¿Sufre de impotencia o eyaculación precoz?",
                        fra: "Souffrez-vous d'impuissance ou d'éjaculation précoce?",
                        por: "Você sofre de impotência ou ejaculação precoce?",
                        deu: "Leiden Sie unter Impotenz oder vorzeitiger Ejakulation?"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Ha avuto dolore durante i rapporti sessuali?",
                        eng: "Have you experienced pain during sexual intercourse?",
                        esp: "¿Ha tenido dolor durante las relaciones sexuales?",
                        fra: "Avez-vous ressenti de la douleur pendant les rapports sexuels?",
                        por: "Você sentiu dor durante as relações sexuais?",
                        deu: "Hatten Sie Schmerzen beim Geschlechtsverkehr?"
                    }
                }
            ],
            html: '<div id="moduloSESSO">[0][1][2][3]</div>'
        },
        mtc_suoni: {
            category: "mtc",
            subcategory: "ascolto",
            title: {
                ita: "Valutazione MTC Ascolto",
                eng: "MTC Listening Assessment",
                esp: "Evaluación MTC de Escucha",
                fra: "Évaluation MTC de l'Écoute",
                por: "Avaliação MTC de Escuta",
                deu: "MTC Hörbewertung"
            },
            data: [
                {
                    t: "s",
                    d: {
                        ita: "Voce",
                        eng: "Voice",
                        esp: "Voz",
                        fra: "Voix",
                        por: "Voz",
                        deu: "Stimme"
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
                            ita: "Forte e alta",
                            eng: "Loud and high",
                            esp: "Fuerte y alta",
                            fra: "Fort et élevé",
                            por: "Forte e alto",
                            deu: "Laut und hoch"
                        },
                        {
                            ita: "Debole e bassa",
                            eng: "Weak and low",
                            esp: "Débil y baja",
                            fra: "Faible et bas",
                            por: "Fraco e baixo",
                            deu: "Schwach und niedrig"
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
                            ita: "Rauca",
                            eng: "Hoarse",
                            esp: "Ronca",
                            fra: "Enrouée",
                            por: "Rouca",
                            deu: "Heiser"
                        }
                    ]
                },
                {
                    t: "s",
                    d: {
                        ita: "Respiro",
                        eng: "Breath",
                        esp: "Respiración",
                        fra: "Respiration",
                        por: "Respiração",
                        deu: "Atmung"
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
                            ita: "Profondo e rapido",
                            eng: "Deep and rapid",
                            esp: "Profundo y rápido",
                            fra: "Profond et rapide",
                            por: "Profundo e rápido",
                            deu: "Tief und schnell"
                        },
                        {
                            ita: "Superficiale e debole",
                            eng: "Shallow and weak",
                            esp: "Superficial y débil",
                            fra: "Superficiel et faible",
                            por: "Superficial e fraco",
                            deu: "Oberflächlich und schwach"
                        },
                        {
                            ita: "Affannoso",
                            eng: "Labored",
                            esp: "Con dificultad",
                            fra: "Laborieux",
                            por: "Difícil",
                            deu: "Mühsam"
                        },
                        {
                            ita: "Sibilante",
                            eng: "Wheezing",
                            esp: "Sibilante",
                            fra: "Sibilant",
                            por: "Sibilante",
                            deu: "Pfeifendes Geräusch"
                        }
                    ]
                },
                {
                    t: "s",
                    d: {
                        ita: "Tosse",
                        eng: "Cough",
                        esp: "Tos",
                        fra: "Toux",
                        por: "Tosse",
                        deu: "Husten"
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
                            ita: "Secca",
                            eng: "Dry",
                            esp: "Seca",
                            fra: "Sèche",
                            por: "Seca",
                            deu: "Trocken"
                        },
                        {
                            ita: "Con espettorato",
                            eng: "With sputum",
                            esp: "Con esputo",
                            fra: "Avec expectoration",
                            por: "Com escarro",
                            deu: "Mit Auswurf"
                        },
                        {
                            ita: "Con suono profondo e pensante",
                            eng: "With a deep and heavy sound",
                            esp: "Con sonido profundo y pesado",
                            fra: "Avec un son profond et lourd",
                            por: "Com um som profundo e pesado",
                            deu: "Mit tiefem und schwerem Klang"
                        },
                        {
                            ita: "Con suono acuto e forte",
                            eng: "With a sharp and loud sound",
                            esp: "Con sonido agudo y fuerte",
                            fra: "Avec un son aigu et fort",
                            por: "Com um som agudo e alto",
                            deu: "Mit scharfem und lautem Klang"
                        }
                    ]
                },
                {
                    t: "s",
                    d: {
                        ita: "Rantoli e respiri anomali",
                        eng: "Rattles and abnormal breaths",
                        esp: "Estertores y respiraciones anormales",
                        fra: "Ronflements et respirations anormales",
                        por: "Roncos e respirações anormais",
                        deu: "Rasseln und abnormale Atemgeräusche"
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
                            ita: "Rantoli umidi",
                            eng: "Moist rattles",
                            esp: "Estertores húmedos",
                            fra: "Ronflements humides",
                            por: "Roncos úmidos",
                            deu: "Feuchte Rasselgeräusche"
                        },
                        {
                            ita: "Sibili",
                            eng: "Wheezes",
                            esp: "Sibilancias",
                            fra: "Sibilances",
                            por: "Sibilos",
                            deu: "Pfeifen"
                        },
                        {
                            ita: "Rantoli secchi",
                            eng: "Dry rattles",
                            esp: "Estertores secos",
                            fra: "Ronflements secs",
                            por: "Roncos secos",
                            deu: "Trockene Rasselgeräusche"
                        }
                    ]
                },
                {
                    t: "s",
                    d: {
                        ita: "Singhiozzo",
                        eng: "Hiccup",
                        esp: "Hipo",
                        fra: "Hoquet",
                        por: "Arrotos",
                        deu: "Schluckauf"
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
                            ita: "Forte e continuo",
                            eng: "Strong and continuous",
                            esp: "Fuerte y continuo",
                            fra: "Fort et continu",
                            por: "Forte e contínuo",
                            deu: "Stark und kontinuierlich"
                        },
                        {
                            ita: "Debole e intermittente",
                            eng: "Weak and intermittent",
                            esp: "Débil e intermitente",
                            fra: "Faible et intermittent",
                            por: "Fraco e intermitente",
                            deu: "Schwach und intermittierend"
                        }
                    ]
                },
                {
                    t: "s",
                    d: {
                        ita: "Vomito",
                        eng: "Vomiting",
                        esp: "Vómito",
                        fra: "Vomissement",
                        por: "Vômito",
                        deu: "Erbrechen"
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
                            ita: "Rumoroso e violento",
                            eng: "Noisy and violent",
                            esp: "Ruidoso y violento",
                            fra: "Bruyant et violent",
                            por: "Barulhento e violento",
                            deu: "Laut und gewalttätig"
                        },
                        {
                            ita: "Debole e silenzioso",
                            eng: "Weak and silent",
                            esp: "Débil y silencioso",
                            fra: "Faible et silencieux",
                            por: "Fraco e silencioso",
                            deu: "Schwach und leise"
                        }
                    ]
                },
                {
                    t: "s",
                    d: {
                        ita: "Eruttazione",
                        eng: "Belching",
                        esp: "Eructo",
                        fra: "Rôt",
                        por: "Arrotos",
                        deu: "Rülpsen"
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
                            ita: "Rumorosa",
                            eng: "Noisy",
                            esp: "Ruidosa",
                            fra: "Bruyante",
                            por: "Barulhenta",
                            deu: "Laut"
                        },
                        {
                            ita: "Rilensiosa e debole",
                            eng: "Silent and weak",
                            esp: "Silenciosa y débil",
                            fra: "Silencieuse et faible",
                            por: "Silenciosa e fraca",
                            deu: "Leise und schwach"
                        }
                    ]
                },
                {
                    t: "s",
                    d: {
                        ita: "Borbottii addominali",
                        eng: "Abdominal borborygmi",
                        esp: "Borborigmos abdominales",
                        fra: "Borborygmes abdominaux",
                        por: "Borborygmos abdominais",
                        deu: "Borborygmi im Bauch"
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
                            ita: "Forti e frequenti",
                            eng: "Strong and frequent",
                            esp: "Fuertes y frecuentes",
                            fra: "Forts et fréquents",
                            por: "Fortes e frequentes",
                            deu: "Stark und häufig"
                        },
                        {
                            ita: "Deboli o assenti",
                            eng: "Weak or absent",
                            esp: "Débiles o ausentes",
                            fra: "Faibles ou absents",
                            por: "Fracos ou ausentes",
                            deu: "Schwach oder nicht vorhanden"
                        }
                    ]
                },
                {
                    t: "s",
                    d: {
                        ita: "Flatulenza",
                        eng: "Flatulence",
                        esp: "Flatulencia",
                        fra: "Flatulences",
                        por: "Flatulência",
                        deu: "Blähungen"
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
                            ita: "Rumorosa e frequente",
                            eng: "Noisy and frequent",
                            esp: "Ruidosa y frecuente",
                            fra: "Bruyante et fréquente",
                            por: "Barulhenta e frequente",
                            deu: "Laut und häufig"
                        },
                        {
                            ita: "Debole e rara",
                            eng: "Weak and rare",
                            esp: "Débil y rara",
                            fra: "Faible et rare",
                            por: "Fraca e rara",
                            deu: "Schwach und selten"
                        }
                    ]
                },
                {
                    t: "s",
                    d: {
                        ita: "Pianto o riso anomali",
                        eng: "Abnormal crying or laughing",
                        esp: "Llanto o risa anormales",
                        fra: "Pleurs ou rires anormaux",
                        por: "Choro ou riso anormais",
                        deu: "Anormales Weinen oder Lachen"
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
                            ita: "Pianto continuo e forte",
                            eng: "Continuous and loud crying",
                            esp: "Llanto continuo y fuerte",
                            fra: "Pleurs continus et forts",
                            por: "Choro contínuo e alto",
                            deu: "Kontinuierliches und lautes Weinen"
                        },
                        {
                            ita: "Risate incontrollabili",
                            eng: "Uncontrollable laughter",
                            esp: "Risas incontrolables",
                            fra: "Rires incontrôlables",
                            por: "Risos incontroláveis",
                            deu: "Unkontrollierbares Lachen"
                        }
                    ]
                }
            ],
            html: '<div id="moduloASCOLTO" class="md_lists">[0][1][2][3][4][5][6][7][8][9]</div>'
        },
        mtc_odori: {
            category: "mtc",
            subcategory: "ascolto",
            title: {
                ita: "Valutazione MTC Odori",
                eng: "MTC Smell Assessment",
                esp: "Evaluación MTC de Olores",
                fra: "Évaluation MTC des Odeurs",
                por: "Avaliação MTC de Cheiros",
                deu: "MTC Geruchsbewertung"
            },
            data: [
                {
                    t: "r",
                    d: {
                        ita: "Ha notato cambiamenti nell'odore del suo corpo o del sudore?",
                        eng: "Have you noticed changes in the smell of your body or sweat?",
                        esp: "¿Ha notado cambios en el olor de su cuerpo o sudor?",
                        fra: "Avez-vous remarqué des changements dans l'odeur de votre corps ou de votre sueur?",
                        por: "Você notou mudanças no cheiro do seu corpo ou do suor?",
                        deu: "Haben Sie Veränderungen im Geruch Ihres Körpers oder Schweißes bemerkt?"
                    },
                    l: [
                        {
                            ita: "Nessun cambiamento",
                            eng: "No change",
                            esp: "Ningún cambio",
                            fra: "Aucun changement",
                            por: "Nenhuma mudança",
                            deu: "Keine Änderung"
                        },
                        {
                            ita: "Odore dolce",
                            eng: "Sweet smell",
                            esp: "Olor dulce",
                            fra: "Odeur douce",
                            por: "Cheiro doce",
                            deu: "Süßer Geruch"
                        },
                        {
                            ita: "Odore acido",
                            eng: "Sour smell",
                            esp: "Olor ácido",
                            fra: "Odeur acide",
                            por: "Cheiro azedo",
                            deu: "Saurer Geruch"
                        },
                        {
                            ita: "Odore forte e pungente",
                            eng: "Strong and pungent smell",
                            esp: "Olor fuerte y penetrante",
                            fra: "Odeur forte et piquante",
                            por: "Cheiro forte e pungente",
                            deu: "Starker und stechender Geruch"
                        },
                        {
                            ita: "Odore metallico",
                            eng: "Metallic smell",
                            esp: "Olor metálico",
                            fra: "Odeur métallique",
                            por: "Cheiro metálico",
                            deu: "Metallischer Geruch"
                        },
                        {
                            ita: "Odore fetido",
                            eng: "Fetid smell",
                            esp: "Olor fétido",
                            fra: "Odeur fétide",
                            por: "Cheiro fétido",
                            deu: "Fauliger Geruch"
                        },
                        {
                            ita: "Odore putrido",
                            eng: "Putrid smell",
                            esp: "Olor putrefacto",
                            fra: "Odeur putride",
                            por: "Cheiro podre",
                            deu: "Verdorbener Geruch"
                        },
                        {
                            ita: "Odore rancido",
                            eng: "Rancid smell",
                            esp: "Olor rancio",
                            fra: "Odeur rance",
                            por: "Cheiro rançoso",
                            deu: "Ranziger Geruch"
                        }
                    ]
                },
                {
                    t: "r",
                    d: {
                        ita: "Altri ti hanno segnalato cambiamenti nell'odore del suo alito?",
                        eng: "Have others reported changes in your breath smell?",
                        esp: "¿Otros han señalado cambios en el olor de su aliento?",
                        fra: "D'autres ont signalé des changements dans l'odeur de votre haleine?",
                        por: "Outros relataram mudanças no cheiro do seu hálito?",
                        deu: "Haben andere Veränderungen im Geruch Ihres Atems bemerkt?"
                    },
                    l: [
                        {
                            ita: "Nessun cambiamento",
                            eng: "No change",
                            esp: "Ningún cambio",
                            fra: "Aucun changement",
                            por: "Nenhuma mudança",
                            deu: "Keine Änderung"
                        },
                        {
                            ita: "Odore dolce",
                            eng: "Sweet smell",
                            esp: "Olor dulce",
                            fra: "Odeur douce",
                            por: "Cheiro doce",
                            deu: "Süßer Geruch"
                        },
                        {
                            ita: "Odore acido",
                            eng: "Sour smell",
                            esp: "Olor ácido",
                            fra: "Odeur acide",
                            por: "Cheiro azedo",
                            deu: "Saurer Geruch"
                        },
                        {
                            ita: "Odore forte e pungente",
                            eng: "Strong and pungent smell",
                            esp: "Olor fuerte y penetrante",
                            fra: "Odeur forte et piquante",
                            por: "Cheiro forte e pungente",
                            deu: "Starker und stechender Geruch"
                        },
                        {
                            ita: "Odore di carne bruciata",
                            eng: "Burnt meat smell",
                            esp: "Olor a carne quemada",
                            fra: "Odeur de viande brûlée",
                            por: "Cheiro de carne queimada",
                            deu: "Geruch von verbranntem Fleisch"
                        }
                    ]
                },
                {
                    t: "r",
                    d: {
                        ita: "L'odore delle sue urine è diverso dal solito?",
                        eng: "Is the smell of your urine different from usual?",
                        esp: "¿El olor de su orina es diferente al habitual?",
                        fra: "L'odeur de votre urine est-elle différente de d'habitude?",
                        por: "O cheiro da sua urina é diferente do habitual?",
                        deu: "Riecht Ihr Urin anders als sonst?"
                    },
                    l: [
                        {
                            ita: "Nessun cambiamento",
                            eng: "No change",
                            esp: "Ningún cambio",
                            fra: "Aucun changement",
                            por: "Nenhuma mudança",
                            deu: "Keine Änderung"
                        },
                        {
                            ita: "Forte e penetrante",
                            eng: "Strong and penetrating",
                            esp: "Fuerte y penetrante",
                            fra: "Fort et pénétrant",
                            por: "Forte e penetrante",
                            deu: "Stark und durchdringend"
                        },
                        {
                            ita: "Ammoniacale",
                            eng: "Ammoniacal",
                            esp: "Amoniacal",
                            fra: "Ammoniacal",
                            por: "Amoníaco",
                            deu: "Ammoniakartig"
                        },
                        {
                            ita: "Dolciastro",
                            eng: "Sweetish",
                            esp: "Dulce",
                            fra: "Sucré",
                            por: "Adoçado",
                            deu: "Süßlich"
                        }
                    ]
                },
                {
                    t: "r",
                    d: {
                        ita: "Hai notato cambiamenti nell'odore delle feci?",
                        eng: "Have you noticed changes in the smell of your stool?",
                        esp: "¿Ha notado cambios en el olor de sus heces?",
                        fra: "Avez-vous remarqué des changements dans l'odeur de vos selles?",
                        por: "Você notou mudanças no cheiro das suas fezes?",
                        deu: "Haben Sie Veränderungen im Geruch Ihres Stuhls bemerkt?"
                    },
                    l: [
                        {
                            ita: "Nessun cambiamento",
                            eng: "No change",
                            esp: "Ningún cambio",
                            fra: "Aucun changement",
                            por: "Nenhuma mudança",
                            deu: "Keine Änderung"
                        },
                        {
                            ita: "Odore molto forte e pungente",
                            eng: "Very strong and pungent smell",
                            esp: "Olor muy fuerte y penetrante",
                            fra: "Odeur très forte et piquante",
                            por: "Cheiro muito forte e pungente",
                            deu: "Sehr starker und stechender Geruch"
                        },
                        {
                            ita: "Odore putrido",
                            eng: "Putrid smell",
                            esp: "Olor putrefacto",
                            fra: "Odeur putride",
                            por: "Cheiro podre",
                            deu: "Fauliger Geruch"
                        }
                    ]
                },
                {
                    t: "r",
                    d: {
                        ita: "Ha notato un odore particolare nelle secrezioni vaginali o genitali?",
                        eng: "Have you noticed any particular smell in vaginal or genital secretions?",
                        esp: "¿Ha notado un olor particular en las secreciones vaginales o genitales?",
                        fra: "Avez-vous remarqué une odeur particulière dans les sécrétions vaginales ou génitales?",
                        por: "Você notou um cheiro particular nas secreções vaginais ou genitais?",
                        deu: "Haben Sie einen besonderen Geruch in vaginalen oder genitalen Sekreten bemerkt?"
                    },
                    l: [
                        {
                            ita: "Nessun cambiamento",
                            eng: "No change",
                            esp: "Ningún cambio",
                            fra: "Aucun changement",
                            por: "Nenhuma mudança",
                            deu: "Keine Änderung"
                        },
                        {
                            ita: "Odore di pesce marcio",
                            eng: "Rotten fish smell",
                            esp: "Olor a pescado podrido",
                            fra: "Odeur de poisson pourri",
                            por: "Cheiro de peixe podre",
                            deu: "Geruch von fauligem Fisch"
                        },
                        {
                            ita: "Dolciastro",
                            eng: "Sweetish",
                            esp: "Dulce",
                            fra: "Sucré",
                            por: "Adoçado",
                            deu: "Süßlich"
                        },
                        {
                            ita: "Forte e pungente",
                            eng: "Strong and pungent",
                            esp: "Fuerte y penetrante",
                            fra: "Fort et piquant",
                            por: "Forte e pungente",
                            deu: "Stark und stechend"
                        }
                    ]
                }
            ],
            html: '<div id="moduloODORI">' +
                  '   <div>[0,d][0,0][0,1][0,2][0,3][0,4][0,5][0,6][0,7]</div>' +
                  '   <div>[1,d][1,0][1,1][1,2][1,3][1,4]</div>' +
                  '   <div>[2,d][2,0][2,1][2,2][2,3]</div>' +
                  '   <div>[3,d][3,0][3,1][3,2]</div>' +
                  '   <div>[4,d][4,0][4,1][4,2][4,3]</div>' +
                  '</div>'
        },
        shiatsu_hara_schiena: {
            category: "shiatsu",
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
                        ita: "SCHIENA - Rene",
                        eng: "BACK - Kidney",
                        esp: "ESPALDA - Riñón",
                        fra: "DOS - Rein",
                        por: "COSTAS - Rim",
                        deu: "RÜCKEN - Niere"
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
                },
                {
                    t: "e",
                    d: {
                        ita: "V = VUOTO",
                        eng: "D = DEFICIENCY",
                        esp: "D = DEFICIENCIA",
                        fra: "D = DÉFICIT",
                        por: "D = DEFICIÊNCIA",
                        deu: "M = MANGEL"
                    },
                    h: true
                },
                {
                    t: "e",
                    d: {
                        ita: "P = PIENO",
                        eng: "E = EXCESS",
                        esp: "E = EXCESO",
                        fra: "E = EXCÈS",
                        por: "E = EXCESSO",
                        deu: "Ü = ÜBERFLUSS"
                    },
                    h: true
                },
                {
                    t: "e",
                    d: {
                        ita: "X = DOLORANTE",
                        eng: "X = PAINFUL",
                        esp: "X = DOLOROSO",
                        fra: "X = DOULEUREUX",
                        por: "X = DOLOROSO",
                        deu: "X = SCHMERZHAFT"
                    },
                    h: true
                }                
            ],
            html:   '<div id="moduloHaraSchienaShiatsu">' +
                    '   <div id="shiatsu_legenda">[30][31][32]</div>' +
                    '   <div id="md_hara">' +
                    '       <div>' +
                    '           <div class="md_HT"><span></span>[0]</div>' +
                    '       </div>' +
                    '       <div>' +
                    '           <div class="md_GB"><span></span>[4]</div>' +
                    '           <div class="md_ST"><span></span>[6]</div>' +
                    '       </div>' +
                    '       <div>' +
                    '           <div class="md_LR"><span></span>[5]</div>' +
                    '           <div class="md_PC"><span></span>[1]</div>' +
                    '           <div class="md_TE"><span></span>[7]</div>' +
                    '       </div>' +
                    '       <div>' +
                    '           <div class="md_LUdx"><span></span>[8]</div>' +
                    '           <div class="md_LUsx"><span></span>[9]</div>' +
                    '       </div>' +
                    '       <div>' +
                    '           <div class="md_SPup"><span></span>[2]</div>' +
                    '       </div>' +
                    '       <div>' +
                    '           <div class="md_LIdx"><span></span>[10]</div>' +
                    '           <div class="md_SPdown"><span></span>[3]</div>' +
                    '           <div class="md_LIsx"><span></span>[11]</div>' +
                    '       </div>' +
                    '       <div>' +
                    '           <div class="md_SIdx"><span></span>[14]</div>' +
                    '           <div class="md_KI"><span></span>[13]</div>' +
                    '           <div class="md_SIsx"><span></span>[15]</div>' +
                    '       </div>' +
                    '       <div>' +
                    '           <div class="md_BL"><span></span>[12]</div>' +
                    '       </div>' +
                    '   </div>' +
                    '   <div id="md_schiena">' +
                    '       <div>' +
                    '           <div class="md_LU"><span></span>[16]</div>' +
                    '       </div>' +
                    '       <div>' +
                    '           <div class="md_HT"><span></span>[17]</div>' +
                    '       </div>' +
                    '       <div>' +
                    '           <div class="md_ST"><span></span>[24]</div>' +
                    '           <div class="md_LR"><span></span>[27]</div>' +
                    '       </div>' +
                    '       <div>' +
                    '           <div class="md_TE"><span></span>[25]</div>' +
                    '           <div class="md_PC"><span></span>[18]</div>' +
                    '           <div class="md_GB"><span></span>[26]</div>' +
                    '       </div>' +
                    '       <div>' +
                    '           <div class="md_SP"><span></span>[19]</div>' +
                    '       </div>' +
                    '       <div>' +
                    '           <div class="md_SIsx"><span></span>[20]</div>' +
                    '           <div class="md_SIdx"><span></span>[21]</div>' +
                    '       </div>' +
                    '       <div>' +
                    '           <div class="md_LIsx"><span></span>[28]</div>' +
                    '           <div class="md_KI"><span></span>[22]</div>' +
                    '           <div class="md_LIdx"><span></span>[29]</div>' +
                    '       </div>' +
                    '       <div>' +
                    '           <div class="md_BL"><span></span>[23]</div>' +
                    '       </div>' +
                    '   </div>' +
                    '   <div>' +
                    '       <span id="mushu_grafico">' +
                    '           <svg width="230" height="61" xmlns="http://www.w3.org/2000/svg">' +
                    '               <line x1="0" y1="30" x2="230" y2="30" style="stroke:rgba(0,0,0,0.4);stroke-width:1" />' +
                    '               <line x1="0" y1="0" x2="0" y2="61" style="stroke:rgba(0,0,0,0.2);stroke-width:1" />' +
                    '               <line x1="46" y1="0" x2="46" y2="61" style="stroke:rgba(0,0,0,0.2);stroke-width:1" />' +
                    '               <line x1="92" y1="0" x2="92" y2="61" style="stroke:rgba(0,0,0,0.2);stroke-width:1" />' +
                    '               <line x1="138" y1="0" x2="138" y2="61" style="stroke:rgba(0,0,0,0.2);stroke-width:1" />' +
                    '               <line x1="184" y1="0" x2="184" y2="61" style="stroke:rgba(0,0,0,0.2);stroke-width:1" />' +
                    '               <line x1="230" y1="0" x2="230" y2="61" style="stroke:rgba(0,0,0,0.2);stroke-width:1" />' +
                    '               <rect x="2" y="30" width="42" height="1" style="fill:#339a16;" id="md_shi_0" />' +
                    '               <rect x="48" y="30" width="42" height="1" style="fill:#F00;" id="md_shi_1" />' +
                    '               <rect x="94" y="30" width="42" height="1" style="fill:#eb9b13;" id="md_shi_2" />' +
                    '               <rect x="140" y="30" width="42" height="1" style="fill:#FFF;" id="md_shi_3" />' +
                    '               <rect x="186" y="30" width="42" height="1" style="fill:#000;" id="md_shi_4" />' +
                    '           </svg>' +
                    '       </span>' +
                    '   </div>' +
                    '</div>',
            funct: function(){
                let els = '',
                fasi = [
                    ["LR","GB"],
                    ["HT","SI","PC","TE"],
                    ["ST","SP"],
                    ["LI","LU"],
                    ["BL","KI"]
                ],
                stati = [ 0,0,0,0,0 ],
                maxs = [ 4,10,5,4,7 ];
                for(let d of ["hara","schiena"]){
                    els = document.getElementById("md_"+d).getElementsByTagName("SELECT");
                    for(let e=0;e<els.length;e++){
                        let val = '',
                            cont = els[e].parentElement.parentElement.parentElement,
                            sigla = cont.className.substr(3,2);
                        if(els[e].selectedIndex==3)val = 'X';
                        else if(els[e].selectedIndex>0)val = els[e].options[els[e].selectedIndex].innerText.substr(0,1);
                        cont.getElementsByTagName("SPAN")[0].innerHTML = val;
                        for(f in fasi){
                            if(fasi[f].indexOf(sigla)>-1){
                                if(els[e].selectedIndex == 1)stati[f]++;
                                if(els[e].selectedIndex == 2)stati[f]--;
                            }
                        } 
                    }
                }
                for(s in stati){
                    let h = (stati[s]*30)/maxs[s],
                        y = 30;
                    if(h>0){
                        y-=h;
                    }
                    if(h<0){
                        h=0-h;
                    }
                    if(h==0)h=1;
                    document.getElementById("md_shi_"+s).style.y = y;
                    document.getElementById("md_shi_"+s).style.height = h;
                }
            }
        },
        pdi: {
            category: "pain",
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
                    t: "t",
                    d: {
                        ita: "Il Pain Disability Index (PDI) è uno strumento di autovalutazione progettato per misurare l'impatto del dolore cronico sulle attività quotidiane e sul funzionamento del paziente. Il PDI è utilizzato per monitorare l'impatto funzionale del dolore cronico nel tempo e per personalizzare i piani di trattamento.",
                        eng: "The Pain Disability Index (PDI) is a self-assessment tool designed to measure the impact of chronic pain on daily activities and patient functioning. The PDI is used to monitor the functional impact of chronic pain over time and to customize treatment plans.",
                        esp: "El Índice de Discapacidad por Dolor (PDI) es una herramienta de autoevaluación diseñada para medir el impacto del dolor crónico en las actividades diarias y en el funcionamiento del paciente. El PDI se utiliza para monitorear el impacto funcional del dolor crónico a lo largo del tiempo y para personalizar los planes de tratamiento.",
                        fra: "L'Indice de Discapacité par la Douleur (PDI) est un outil d'auto-évaluation conçu pour mesurer l'impact de la douleur chronique sur les activités quotidiennes et le fonctionnement du patient. Le PDI est utilisé pour surveiller l'impact fonctionnel de la douleur chronique dans le temps et pour personnaliser les plans de traitement.",
                        por: "O Índice de Discapacidade por Dor (PDI) é uma ferramenta de autoavaliação projetada para medir o impacto da dor crônica nas atividades diárias e no funcionamento do paciente. O PDI é utilizado para monitorar o impacto funcional da dor crônica ao longo do tempo e para personalizar os planos de tratamento.",
                        deu: "Der Pain Disability Index (PDI) ist ein Selbstbewertungsinstrument, das entwickelt wurde, um die Auswirkungen von chronischen Schmerzen auf die täglichen Aktivitäten und die Funktionsfähigkeit des Patienten zu messen. Der PDI wird verwendet, um die funktionalen Auswirkungen chronischer Schmerzen im Laufe der Zeit zu überwachen und um Behandlungspläne anzupassen."
                    },
                    h: true
                },
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
                },
                {
                    t: "e",
                    d: {
                        ita: "Indice generale di disabilità",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    }
                },
                {
                    t: "t",
                    d: {
                        ita: "<b>Nessuna o lieve disabilità</b><br>Il dolore ha un impatto minimo sulle attività quotidiane. Il paziente può continuare a svolgere la maggior parte delle attività senza problemi significativi.",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    h: true
                },
                {
                    t: "t",
                    d: {
                        ita: "<b>Disabilità moderata</b><br>Il dolore inizia a influire su alcune aree della vita del paziente. L'individuo può avere difficoltà a svolgere alcune attività quotidiane, ma non è completamente debilitato.",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    h: true
                },
                {
                    t: "t",
                    d: {
                        ita: "<b>Disabilità grave</b><br>Il dolore influisce notevolmente sulla maggior parte delle aree della vita del paziente, limitando molte attività. Potrebbero esserci difficoltà significative nello svolgimento delle attività lavorative, sociali e domestiche.",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    h: true
                },
                {
                    t: "t",
                    d: {
                        ita: "<b>Disabilità molto grave</b><br>Il dolore è debilitante e impedisce di svolgere quasi tutte le attività quotidiane. Il paziente potrebbe avere bisogno di assistenza per molte delle sue funzioni quotidiane.",
                        eng: "",
                        esp: "",
                        fra: "",
                        por: "",
                        deu: ""
                    },
                    h: true
                },                    
            ],
            html:   '<div id="moduloPDI">' +
                    '   <div class="md_dida">[0]</div>' +
                    '   <div class="md_lists"><div>[1][2][3][4][5][6][7]</div></div>' +
                    '   <div class="md_cont_total">' +
                    '       <div class="md_label_total">[8]</div>' +
                    '       <div id="pdi_total" class="md_total"></div>' +
                    '   </div>' +
                    '   <div id="pdi_descr" class="md_descr">' +
                    '       <span id="pdi_1">[9]</span>' +
                    '       <span id="pdi_2">[10]</span>' +
                    '       <span id="pdi_3">[11]</span>' +
                    '       <span id="pdi_4">[12]</span>' +
                    '   </div>' +
                    '</div>',
            funct: function(){
                // aggiorno il totale dei valori
                let tot = 0,
                    els = document.getElementById("moduloPDI").getElementsByTagName("select");
                for(e in els){
                    if(els[e].selectedIndex>0)tot += parseInt(els[e].selectedIndex)-1;
                }
                document.getElementById("pdi_total").innerHTML = tot;
                for(let o=1;o<=4;o++)document.getElementById("pdi_descr").classList.remove("vis"+o);
                if(tot<=10)document.getElementById("pdi_descr").classList.add("vis1");
                if(tot>10 && tot<=30)document.getElementById("pdi_descr").classList.add("vis2");
                if(tot>30 && tot<=50)document.getElementById("pdi_descr").classList.add("vis3");
                if(tot>50)document.getElementById("pdi_descr").classList.add("vis4");
            }
        },
        mpq: {
            category: "pain",
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
                    t: "t",
                    d: {
                        ita: "Il McGill Pain Questionnaire (MPQ) è uno strumento di valutazione del dolore utilizzato per misurare la qualità e l'intensità del dolore percepito dai pazienti. Sviluppato nel 1971 da Ronald Melzack, il questionario aiuta a comprendere meglio l'esperienza soggettiva del dolore. Il MPQ è utilizzato per comprendere meglio l'esperienza soggettiva del dolore in pazienti affetti da dolore cronico o acuto, aiutando clinici e ricercatori a valutare il tipo e l'impatto del dolore e a monitorarne l'evoluzione nel tempo.",
                        eng: "The McGill Pain Questionnaire (MPQ) is a pain assessment tool used to measure the quality and intensity of pain perceived by patients. Developed in 1971 by Ronald Melzack, the questionnaire helps to better understand the subjective experience of pain. The MPQ is used to gain insight into the subjective experience of pain in patients suffering from chronic or acute pain, assisting clinicians and researchers in evaluating the type and impact of pain and monitoring its evolution over time.",
                        esp: "El Cuestionario de Dolor de McGill (MPQ) es una herramienta de evaluación del dolor utilizada para medir la calidad y la intensidad del dolor percibido por los pacientes. Desarrollado en 1971 por Ronald Melzack, el cuestionario ayuda a comprender mejor la experiencia subjetiva del dolor. El MPQ se utiliza para comprender mejor la experiencia subjetiva del dolor en pacientes que sufren de dolor crónico o agudo, ayudando a clínicos e investigadores a evaluar el tipo y el impacto del dolor y a monitorear su evolución a lo largo del tiempo.",
                        fra: "Le Questionnaire de douleur de McGill (MPQ) est un outil d'évaluation de la douleur utilisé pour mesurer la qualité et l'intensité de la douleur perçue par les patients. Développé en 1971 par Ronald Melzack, le questionnaire aide à mieux comprendre l'expérience subjective de la douleur. Le MPQ est utilisé pour mieux comprendre l'expérience subjective de la douleur chez les patients souffrant de douleur chronique ou aiguë, aidant les cliniciens et les chercheurs à évaluer le type et l'impact de la douleur et à en suivre l'évolution dans le temps.",
                        por: "O Questionário de Dor de McGill (MPQ) é uma ferramenta de avaliação da dor usada para medir a qualidade e a intensidade da dor percebida pelos pacientes. Desenvolvido em 1971 por Ronald Melzack, o questionário ajuda a entender melhor a experiência subjetiva da dor. O MPQ é usado para entender melhor a experiência subjetiva da dor em pacientes que sofrem de dor crônica ou aguda, ajudando clínicos e pesquisadores a avaliar o tipo e o impacto da dor e a monitorar sua evolução ao longo do tempo.",
                        deu: "Das McGill Schmerzfragebogen (MPQ) ist ein Schmerzbewertungsinstrument, das verwendet wird, um die Qualität und Intensität des von den Patienten wahrgenommenen Schmerzes zu messen. Entwickelt im Jahr 1971 von Ronald Melzack, hilft der Fragebogen, das subjektive Schmerzempfinden besser zu verstehen. Der MPQ wird verwendet, um das subjektive Schmerzempfinden bei Patienten mit chronischen oder akuten Schmerzen besser zu verstehen und Clinicians und Forschern dabei zu helfen, die Art und die Auswirkungen von Schmerzen zu bewerten und deren Entwicklung im Laufe der Zeit zu überwachen."
                    },
                    h: true                  
                },
                {
                    t: "e",
                    d: {
                        ita: "Descrittori sensoriali",
                        eng: "Sensory descriptors",
                        esp: "Descriptores sensoriales",
                        fra: "Descripteurs sensoriels",
                        por: "Descritores sensoriais",
                        deu: "Sinnesbeschreibungen"
                    }
                },
                {
                    t: "e",
                    d: {
                        ita: "Gruppo 1 (temporale)",
                        eng: "Group 1 (temporal)",
                        esp: "Grupo 1 (temporal)",
                        fra: "Groupe 1 (temporel)",
                        por: "Grupo 1 (temporal)",
                        deu: "Gruppe 1 (zeitlich)"
                    }
                },
                {
                    t: "c",
                    d: {
                        ita: "Tremolante",
                        eng: "Trembling",
                        esp: "Tembloroso",
                        fra: "Tremblant",
                        por: "Tremulante",
                        deu: "Zitternd"
                    },
                    v: 1
                },
                {
                    t: "c",
                    d: {
                        ita: "Fremente",
                        eng: "Quivering",
                        esp: "Tembloroso",
                        fra: "Vibrant",
                        por: "Vibrante",
                        deu: "Vibrierend"
                    },
                    v: 2
                },
                {
                    t: "c",
                    d: {
                        ita: "Pulsante",
                        eng: "Pulsating",
                        esp: "Palpitante",
                        fra: "Pulsant",
                        por: "Pulsante",
                        deu: "Pulsierend"
                    },
                    v: 3
                },
                {
                    t: "c",
                    d: {
                        ita: "Palpitante",
                        eng: "Throbbing",
                        esp: "Palpitante",
                        fra: "Palpitant",
                        por: "Palpitante",
                        deu: "Pochen"
                    },
                    v: 4
                },
                {
                    t: "c",
                    d: {
                        ita: "Battente",
                        eng: "Beating",
                        esp: "Latido",
                        fra: "Battant",
                        por: "Batendo",
                        deu: "Schlagend"
                    },
                    v: 5
                },
                {
                    t: "c",
                    d: {
                        ita: "Calpestante",
                        eng: "Stamping",
                        esp: "Pisoteante",
                        fra: "Piétinement",
                        por: "Pisoteante",
                        deu: "Stampfend"
                    },
                    v: 6
                },
                {
                    t: "e",
                    d: {
                        ita: "Gruppo 2 (spaziale)",
                        eng: "Group 2 (spatial)",
                        esp: "Grupo 2 (espacial)",
                        fra: "Groupe 2 (spatial)",
                        por: "Grupo 2 (espacial)",
                        deu: "Gruppe 2 (räumlich)"
                    }
                },
                {
                    t: "c",
                    d: {
                        ita: "Saltellante",
                        eng: "Bouncing",
                        esp: "Rebotante",
                        fra: "Sautillant",
                        por: "Saltitante",
                        deu: "Springend"
                    },
                    v: 1
                },
                {
                    t: "c",
                    d: {
                        ita: "Fulmineo",
                        eng: "Lightning",
                        esp: "Fulminante",
                        fra: "Fulgurant",
                        por: "Relâmpago",
                        deu: "Blitzartig"
                    },
                    v: 2
                },
                {
                    t: "c",
                    d: {
                        ita: "Tirante",
                        eng: "Tightening",
                        esp: "Tirante",
                        fra: "Tirant",
                        por: "Tensionando",
                        deu: "Ziehen"
                    },
                    v: 3
                },
                {
                    t: "e",
                    d: {
                        ita: "Gruppo 3 (pressione puntiforme)",
                        eng: "Group 3 (point pressure)",
                        esp: "Grupo 3 (presión puntual)",
                        fra: "Groupe 3 (pression ponctuelle)",
                        por: "Grupo 3 (pressão pontual)",
                        deu: "Gruppe 3 (Punktdruck)"
                    }
                },
                {
                    t: "c",
                    d: {
                        ita: "Pizzicante",
                        eng: "Pinching",
                        esp: "Punzante",
                        fra: "Pinçant",
                        por: "Beliscante",
                        deu: "Zwickend"
                    },
                    v: 1
                },
                {
                    t: "c",
                    d: {
                        ita: "Tediante",
                        eng: "Dull",
                        esp: "Sordo",
                        fra: "Sourd",
                        por: "Surdo",
                        deu: "Dumpf"
                    },
                    v: 2
                },
                {
                    t: "c",
                    d: {
                        ita: "Perforante",
                        eng: "Piercing",
                        esp: "Perforante",
                        fra: "Perçant",
                        por: "Perfurante",
                        deu: "Durchdringend"
                    },
                    v: 3
                },
                {
                    t: "c",
                    d: {
                        ita: "Fitta",
                        eng: "Stitching",
                        esp: "Punzante",
                        fra: "Coupure",
                        por: "Corte",
                        deu: "Stechen"
                    },
                    v: 4
                },
                {
                    t: "c",
                    d: {
                        ita: "Lacrimante",
                        eng: "Tearing",
                        esp: "Lacrimoso",
                        fra: "Larmoyant",
                        por: "Lacrime",
                        deu: "Tränen"
                    },
                    v: 5
                },
                {
                    t: "e",
                    d: {
                        ita: "Gruppo 4 (tipo di pressione)",
                        eng: "Group 4 (type of pressure)",
                        esp: "Grupo 4 (tipo de presión)",
                        fra: "Groupe 4 (type de pression)",
                        por: "Grupo 4 (tipo de pressão)",
                        deu: "Gruppe 4 (Druckart)"
                    }
                },
                {
                    t: "c",
                    d: {
                        ita: "Definito",
                        eng: "Defined",
                        esp: "Definido",
                        fra: "Défini",
                        por: "Definido",
                        deu: "Definiert"
                    },
                    v: 1
                },
                {
                    t: "c",
                    d: {
                        ita: "Tagliente",
                        eng: "Cutting",
                        esp: "Cortante",
                        fra: "Coupant",
                        por: "Cortante",
                        deu: "Schneidend"
                    },
                    v: 2
                },
                {
                    t: "c",
                    d: {
                        ita: "Lacerante",
                        eng: "Lacerating",
                        esp: "Desgarrador",
                        fra: "Déchirant",
                        por: "Rasgando",
                        deu: "Reißend"
                    },
                    v: 3
                },
                {
                    t: "e",
                    d: {
                        ita: "Gruppo 5 (pressione costrittiva)",
                        eng: "Group 5 (constrictive pressure)",
                        esp: "Grupo 5 (presión constrictiva)",
                        fra: "Groupe 5 (pression restrictive)",
                        por: "Grupo 5 (pressão constritiva)",
                        deu: "Gruppe 5 (kontrahierender Druck)"
                    }
                },
                {
                    t: "c",
                    d: {
                        ita: "Pizzicante",
                        eng: "Pinching",
                        esp: "Punzante",
                        fra: "Pinçant",
                        por: "Beliscante",
                        deu: "Zwickend"
                    },
                    v: 1
                },
                {
                    t: "c",
                    d: {
                        ita: "Pressante",
                        eng: "Pressing",
                        esp: "Presionando",
                        fra: "Pressant",
                        por: "Pressionando",
                        deu: "Drückend"
                    },
                    v: 2
                },
                {
                    t: "c",
                    d: {
                        ita: "Rodente",
                        eng: "Gnawing",
                        esp: "Roedor",
                        fra: "Rongeant",
                        por: "Roupedor",
                        deu: "Nagen"
                    },
                    v: 3
                },
                {
                    t: "c",
                    d: {
                        ita: "Crampiforme",
                        eng: "Cramplike",
                        esp: "Cólico",
                        fra: "Crampes",
                        por: "Cãibras",
                        deu: "Krampfartig"
                    },
                    v: 4
                },
                {
                    t: "c",
                    d: {
                        ita: "Stritolante",
                        eng: "Squeezing",
                        esp: "Apertura",
                        fra: "Serrer",
                        por: "Esmagar",
                        deu: "Zerdrücken"
                    },
                    v: 5
                },
                {
                    t: "e",
                    d: {
                        ita: "Gruppo 6 (pressione di trazione)",
                        eng: "Group 6 (traction pressure)",
                        esp: "Grupo 6 (presión de tracción)",
                        fra: "Groupe 6 (pression de traction)",
                        por: "Grupo 6 (pressão de tração)",
                        deu: "Gruppe 6 (Zugdruck)"
                    }
                },
                {
                    t: "c",
                    d: {
                        ita: "Strattonante",
                        eng: "Yanking",
                        esp: "Tirante",
                        fra: "Tirant",
                        por: "Puxando",
                        deu: "Ziehen"
                    },
                    v: 1
                },
                {
                    t: "c",
                    d: {
                        ita: "Tirante",
                        eng: "Tightening",
                        esp: "Tirante",
                        fra: "Tirant",
                        por: "Tensionando",
                        deu: "Ziehen"
                    },
                    v: 2
                },
                {
                    t: "c",
                    d: {
                        ita: "Straziante",
                        eng: "Wrenching",
                        esp: "Desgarrador",
                        fra: "Déchirant",
                        por: "Rasgador",
                        deu: "Zerrend"
                    },
                    v: 3
                },
                {
                    t: "e",
                    d: {
                        ita: "Gruppo 7 (termale)",
                        eng: "Group 7 (thermal)",
                        esp: "Grupo 7 (térmico)",
                        fra: "Groupe 7 (thermique)",
                        por: "Grupo 7 (térmico)",
                        deu: "Gruppe 7 (thermisch)"
                    }
                },
                {
                    t: "c",
                    d: {
                        ita: "Caldo",
                        eng: "Warm",
                        esp: "Caliente",
                        fra: "Chaud",
                        por: "Quente",
                        deu: "Warm"
                    },
                    v: 1
                },
                {
                    t: "c",
                    d: {
                        ita: "Secco",
                        eng: "Dry",
                        esp: "Seco",
                        fra: "Sec",
                        por: "Seco",
                        deu: "Trocken"
                    },
                    v: 2
                },
                {
                    t: "c",
                    d: {
                        ita: "Scottante",
                        eng: "Scalding",
                        esp: "Escaldante",
                        fra: "Brûlant",
                        por: "Escaldante",
                        deu: "Sengend"
                    },
                    v: 3
                },
                {
                    t: "c",
                    d: {
                        ita: "Bruciante",
                        eng: "Burning",
                        esp: "Ardor",
                        fra: "Brûlant",
                        por: "Ardente",
                        deu: "Brennend"
                    },
                    v: 4
                },
                {
                    t: "e",
                    d: {
                        ita: "Gruppo 8 (movimento)",
                        eng: "Group 8 (movement)",
                        esp: "Grupo 8 (movimiento)",
                        fra: "Groupe 8 (mouvement)",
                        por: "Grupo 8 (movimento)",
                        deu: "Gruppe 8 (Bewegung)"
                    }
                },
                {
                    t: "c",
                    d: {
                        ita: "Formicolio",
                        eng: "Tingling",
                        esp: "Hormigueo",
                        fra: "Picotement",
                        por: "Formigamento",
                        deu: "Kribbeln"
                    },
                    v: 1
                },
                {
                    t: "c",
                    d: {
                        ita: "Pruriginoso",
                        eng: "Itchy",
                        esp: "Picazón",
                        fra: "Démangeaison",
                        por: "Coceira",
                        deu: "Juckend"
                    },
                    v: 2
                },
                {
                    t: "c",
                    d: {
                        ita: "Frizzante",
                        eng: "Fizzing",
                        esp: "Burbujeante",
                        fra: "Frémissant",
                        por: "Borbulhante",
                        deu: "Sprudelnd"
                    },
                    v: 3
                },
                {
                    t: "c",
                    d: {
                        ita: "Pungente",
                        eng: "Stinging",
                        esp: "Punzante",
                        fra: "Piquant",
                        por: "Picante",
                        deu: "Stechend"
                    },
                    v: 4
                },
                {
                    t: "e",
                    d: {
                        ita: "Gruppo 9 (durezza)",
                        eng: "Group 9 (hardness)",
                        esp: "Grupo 9 (dureza)",
                        fra: "Groupe 9 (dureté)",
                        por: "Grupo 9 (dureza)",
                        deu: "Gruppe 9 (Härte)"
                    }
                },
                {
                    t: "c",
                    d: {
                        ita: "Torpido",
                        eng: "Dull",
                        esp: "Sordo",
                        fra: "Sourd",
                        por: "Surdo",
                        deu: "Dumpf"
                    },
                    v: 1
                },
                {
                    t: "c",
                    d: {
                        ita: "Ulceroso",
                        eng: "Ulcerous",
                        esp: "Ulceroso",
                        fra: "Ulcéreux",
                        por: "Ulceroso",
                        deu: "Ulkus"
                    },
                    v: 2
                },
                {
                    t: "c",
                    d: {
                        ita: "Dolente",
                        eng: "Sore",
                        esp: "Doloroso",
                        fra: "Douloureux",
                        por: "Doloroso",
                        deu: "Schmerzhaft"
                    },
                    v: 3
                },
                {
                    t: "c",
                    d: {
                        ita: "Indolenzito",
                        eng: "Sore",
                        esp: "Adolorido",
                        fra: "Endolori",
                        por: "Dói",
                        deu: "Schmerzhaft"
                    },
                    v: 4
                },
                {
                    t: "c",
                    d: {
                        ita: "Gravoso",
                        eng: "Heavy",
                        esp: "Pesado",
                        fra: "Lourd",
                        por: "Pesado",
                        deu: "Schwer"
                    },
                    v: 5
                },
                {
                    t: "e",
                    d: {
                        ita: "Gruppo 10 (differenze sensoriali)",
                        eng: "Group 10 (sensory differences)",
                        esp: "Grupo 10 (diferencias sensoriales)",
                        fra: "Groupe 10 (différences sensorielles)",
                        por: "Grupo 10 (diferenças sensoriais)",
                        deu: "Gruppe 10 (sensorische Unterschiede)"
                    }
                },
                {
                    t: "c",
                    d: {
                        ita: "Lieve",
                        eng: "Mild",
                        esp: "Leve",
                        fra: "Léger",
                        por: "Leve",
                        deu: "Leicht"
                    },
                    v: 1
                },
                {
                    t: "c",
                    d: {
                        ita: "Teso",
                        eng: "Tight",
                        esp: "Tenso",
                        fra: "Tendu",
                        por: "Tenso",
                        deu: "Spannend"
                    },
                    v: 2
                },
                {
                    t: "c",
                    d: {
                        ita: "Stridente",
                        eng: "Shrill",
                        esp: "Agudo",
                        fra: "Strident",
                        por: "Estridente",
                        deu: "Schrill"
                    },
                    v: 3
                },
                {
                    t: "c",
                    d: {
                        ita: "Fendente",
                        eng: "Cutting",
                        esp: "Cortante",
                        fra: "Tranchant",
                        por: "Cortante",
                        deu: "Schneidend"
                    },
                    v: 4
                },
                {
                    t: "e",
                    d: {
                        ita: "Descrittori emotivi",
                        eng: "Emotional descriptors",
                        esp: "Descriptores emocionales",
                        fra: "Descripteurs émotionnels",
                        por: "Descritores emocionais",
                        deu: "Emotionale Beschreibungen"
                    }
                },
                {
                    t: "e",
                    d: {
                        ita: "Gruppo 11 (tensione)",
                        eng: "Group 11 (tension)",
                        esp: "Grupo 11 (tensión)",
                        fra: "Groupe 11 (tension)",
                        por: "Grupo 11 (tensão)",
                        deu: "Gruppe 11 (Spannung)"
                    }
                },
                {
                    t: "c",
                    d: {
                        ita: "Faticoso",
                        eng: "Tiring",
                        esp: "Cansado",
                        fra: "Fatigant",
                        por: "Cansativo",
                        deu: "Ermüdend"
                    },
                    v: 1
                },
                {
                    t: "c",
                    d: {
                        ita: "Spossante",
                        eng: "Exhausting",
                        esp: "Agotador",
                        fra: "Épuisant",
                        por: "Esgotante",
                        deu: "Erschöpfend"
                    },
                    v: 2
                },
                {
                    t: "e",
                    d: {
                        ita: "Gruppo 12 (autonomo)",
                        eng: "Group 12 (autonomous)",
                        esp: "Grupo 12 (autónomo)",
                        fra: "Groupe 12 (autonome)",
                        por: "Grupo 12 (autônomo)",
                        deu: "Gruppe 12 (autonom)"
                    }
                },
                {
                    t: "c",
                    d: {
                        ita: "Nauseabondo",
                        eng: "Nauseating",
                        esp: "Nauseabundo",
                        fra: "Nauséabond",
                        por: "Nauseante",
                        deu: "Übelkeit"
                    },
                    v: 1
                },
                {
                    t: "c",
                    d: {
                        ita: "Soffocante",
                        eng: "Suffocating",
                        esp: "Sofocante",
                        fra: "Étouffant",
                        por: "Sufocante",
                        deu: "Erstickend"
                    },
                    v: 2
                },
                {
                    t: "e",
                    d: {
                        ita: "Gruppo 13 (paura)",
                        eng: "Group 13 (fear)",
                        esp: "Grupo 13 (miedo)",
                        fra: "Groupe 13 (peur)",
                        por: "Grupo 13 (medo)",
                        deu: "Gruppe 13 (Angst)"
                    }
                },
                {
                    t: "c",
                    d: {
                        ita: "Pauroso",
                        eng: "Fearful",
                        esp: "Miedoso",
                        fra: "Craintif",
                        por: "Medroso",
                        deu: "Ängstlich"
                    },
                    v: 1
                },
                {
                    t: "c",
                    d: {
                        ita: "Spaventevole",
                        eng: "Scary",
                        esp: "Espeluznante",
                        fra: "Effrayant",
                        por: "Assustador",
                        deu: "Angsteinflößend"
                    },
                    v: 2
                },
                {
                    t: "c",
                    d: {
                        ita: "Terrificante",
                        eng: "Terrifying",
                        esp: "Atormentador",
                        fra: "Terrifiant",
                        por: "Aterrorizante",
                        deu: "Schrecklich"
                    },
                    v: 3
                },
                {
                    t: "e",
                    d: {
                        ita: "Gruppo 14 (persecutorio)",
                        eng: "Group 14 (persecutory)",
                        esp: "Grupo 14 (persecutorio)",
                        fra: "Groupe 14 (persécuteur)",
                        por: "Grupo 14 (persecutório)",
                        deu: "Gruppe 14 (verfolgungsartig)"
                    }
                },
                {
                    t: "c",
                    d: {
                        ita: "Punitivo",
                        eng: "Punitive",
                        esp: "Punitivo",
                        fra: "Punitif",
                        por: "Punitivo",
                        deu: "Strafend"
                    },
                    v: 1
                },
                {
                    t: "c",
                    d: {
                        ita: "Estenuante",
                        eng: "Exhausting",
                        esp: "Agotador",
                        fra: "Éreintant",
                        por: "Esgotante",
                        deu: "Erschöpfend"
                    },
                    v: 2
                },
                {
                    t: "c",
                    d: {
                        ita: "Crudele",
                        eng: "Cruel",
                        esp: "Cruel",
                        fra: "Cruel",
                        por: "Cruel",
                        deu: "Grausam"
                    },
                    v: 3
                },
                {
                    t: "c",
                    d: {
                        ita: "Feroce",
                        eng: "Fierce",
                        esp: "Feroz",
                        fra: "Féroce",
                        por: "Feroz",
                        deu: "Heftig"
                    },
                    v: 4
                },
                {
                    t: "c",
                    d: {
                        ita: "Micidiale",
                        eng: "Deadly",
                        esp: "Mortal",
                        fra: "Mortel",
                        por: "Mortal",
                        deu: "Tödlich"
                    },
                    v: 5
                },
                {
                    t: "e",
                    d: {
                        ita: "Gruppo 15 (affettivo-valutativo-sensoriale)",
                        eng: "Group 15 (affective-evaluative-sensory)",
                        esp: "Grupo 15 (afectivo-evaluativo-sensorial)",
                        fra: "Groupe 15 (affectif-évaluatif-sensoriel)",
                        por: "Grupo 15 (afetivo-avaliativo-sensorial)",
                        deu: "Gruppe 15 (affektiv-evaluativ-sensorisch)"
                    }
                },
                {
                    t: "c",
                    d: {
                        ita: "Infelice",
                        eng: "Unhappy",
                        esp: "Infeliz",
                        fra: "Malheureux",
                        por: "Infeliz",
                        deu: "Unglücklich"
                    },
                    v: 1
                },
                {
                    t: "c",
                    d: {
                        ita: "Accecante",
                        eng: "Blinding",
                        esp: "Cegador",
                        fra: "Éblouissant",
                        por: "Cegante",
                        deu: "Blendend"
                    },
                    v: 2
                },
                {
                    t: "e",
                    d: {
                        ita: "Descrittori valutativi",
                        eng: "Evaluative descriptors",
                        esp: "Descriptores evaluativos",
                        fra: "Descripteurs évaluatifs",
                        por: "Descritores avaliativos",
                        deu: "Bewertende Beschreibungen"
                    }
                },
                {
                    t: "e",
                    d: {
                        ita: "Gruppo 16 (valutativo)",
                        eng: "Group 16 (evaluative)",
                        esp: "Grupo 16 (evaluativo)",
                        fra: "Groupe 16 (évaluatif)",
                        por: "Grupo 16 (avaliativo)",
                        deu: "Gruppe 16 (bewertend)"
                    }
                },
                {
                    t: "c",
                    d: {
                        ita: "Noioso",
                        eng: "Boring",
                        esp: "Aburrido",
                        fra: "Ennuyeux",
                        por: "Chato",
                        deu: "Langweilig"
                    },
                    v: 1
                },
                {
                    t: "c",
                    d: {
                        ita: "Problematico",
                        eng: "Problematic",
                        esp: "Problemático",
                        fra: "Problématique",
                        por: "Problemático",
                        deu: "Problematisch"
                    },
                    v: 2
                },
                {
                    t: "c",
                    d: {
                        ita: "Misero",
                        eng: "Miserable",
                        esp: "Miserable",
                        fra: "Misérable",
                        por: "Miserável",
                        deu: "Elend"
                    },
                    v: 3
                },
                {
                    t: "c",
                    d: {
                        ita: "Intenso",
                        eng: "Intense",
                        esp: "Intenso",
                        fra: "Intense",
                        por: "Intenso",
                        deu: "Intensiv"
                    },
                    v: 4
                },
                {
                    t: "c",
                    d: {
                        ita: "Insopportabile",
                        eng: "Unbearable",
                        esp: "Insoportable",
                        fra: "Insupportable",
                        por: "Insuportável",
                        deu: "Unerträglich"
                    },
                    v: 5
                },
                {
                    t: "e",
                    d: {
                        ita: "Varie",
                        eng: "Various",
                        esp: "Varios",
                        fra: "Divers",
                        por: "Vários",
                        deu: "Verschiedene"
                    }
                },
                {
                    t: "e",
                    d: {
                        ita: "Gruppo 17 (sensoriale: varie)",
                        eng: "Group 17 (sensory: various)",
                        esp: "Grupo 17 (sensorial: varios)",
                        fra: "Groupe 17 (sensoriel : divers)",
                        por: "Grupo 17 (sensorial: vários)",
                        deu: "Gruppe 17 (sensorisch: verschiedene)"
                    }
                },
                {
                    t: "c",
                    d: {
                        ita: "Diffuso",
                        eng: "Diffuse",
                        esp: "Difuso",
                        fra: "Diffuse",
                        por: "Difuso",
                        deu: "Diffuse"
                    },
                    v: 1
                },
                {
                    t: "c",
                    d: {
                        ita: "Radiante",
                        eng: "Radiating",
                        esp: "Radiante",
                        fra: "Rayonnant",
                        por: "Radiante",
                        deu: "Ausstrahlend"
                    },
                    v: 2
                },
                {
                    t: "c",
                    d: {
                        ita: "Penetrante",
                        eng: "Penetrating",
                        esp: "Penetrante",
                        fra: "Pénétrant",
                        por: "Penetrante",
                        deu: "Durchdringend"
                    },
                    v: 3
                },
                {
                    t: "c",
                    d: {
                        ita: "Pungente",
                        eng: "Stinging",
                        esp: "Punzante",
                        fra: "Piquant",
                        por: "Picante",
                        deu: "Stechend"
                    },
                    v: 4
                },
                {
                    t: "e",
                    d: {
                        ita: "Gruppo 18 (sensoriale: varie)",
                        eng: "Group 18 (sensory: various)",
                        esp: "Grupo 18 (sensorial: varios)",
                        fra: "Groupe 18 (sensoriel : divers)",
                        por: "Grupo 18 (sensorial: vários)",
                        deu: "Gruppe 18 (sensorisch: verschiedene)"
                    }
                },
                {
                    t: "c",
                    d: {
                        ita: "Stretto",
                        eng: "Narrow",
                        esp: "Estrecho",
                        fra: "Étroite",
                        por: "Estreito",
                        deu: "Eng"
                    },
                    v: 1
                },
                {
                    t: "c",
                    d: {
                        ita: "Intorpidito",
                        eng: "Numb",
                        esp: "Adormecido",
                        fra: "Engourdi",
                        por: "Dormido",
                        deu: "Taub"
                    },
                    v: 2
                },
                {
                    t: "c",
                    d: {
                        ita: "Tirante",
                        eng: "Tight",
                        esp: "Tenso",
                        fra: "Tendu",
                        por: "Tenso",
                        deu: "Spannend"
                    },
                    v: 3
                },
                {
                    t: "c",
                    d: {
                        ita: "Strizzante",
                        eng: "Squeezing",
                        esp: "Estrangulante",
                        fra: "Serrer",
                        por: "Apertura",
                        deu: "Zerdrücken"
                    },
                    v: 4
                },
                {
                    t: "c",
                    d: {
                        ita: "Lacerante",
                        eng: "Lacerating",
                        esp: "Desgarrador",
                        fra: "Déchirant",
                        por: "Rasgador",
                        deu: "Reißend"
                    },
                    v: 5
                },
                {
                    t: "e",
                    d: {
                        ita: "Gruppo 19 (sensoriale)",
                        eng: "Group 19 (sensory)",
                        esp: "Grupo 19 (sensorial)",
                        fra: "Groupe 19 (sensoriel)",
                        por: "Grupo 19 (sensorial)",
                        deu: "Gruppe 19 (sensorisch)"
                    }
                },
                {
                    t: "c",
                    d: {
                        ita: "Fresco",
                        eng: "Cool",
                        esp: "Fresco",
                        fra: "Frais",
                        por: "Fresco",
                        deu: "Kühl"
                    },
                    v: 1
                },
                {
                    t: "c",
                    d: {
                        ita: "Freddo",
                        eng: "Cold",
                        esp: "Frío",
                        fra: "Froid",
                        por: "Frio",
                        deu: "Kalt"
                    },
                    v: 2
                },
                {
                    t: "c",
                    d: {
                        ita: "Ghiacciante",
                        eng: "Icy",
                        esp: "Helado",
                        fra: "Glacial",
                        por: "Gelado",
                        deu: "Eisig"
                    },
                    v: 3
                },
                {
                    t: "e",
                    d: {
                        ita: "Gruppo 20 (affettivo-valutativo: varie)",
                        eng: "Group 20 (affective-evaluative: various)",
                        esp: "Grupo 20 (afectivo-evaluativo: varios)",
                        fra: "Groupe 20 (affectif-évaluatif : divers)",
                        por: "Grupo 20 (afetivo-avaliativo: vários)",
                        deu: "Gruppe 20 (affektiv-evaluativ: verschiedene)"
                    }
                },
                {
                    t: "c",
                    d: {
                        ita: "Fastidioso",
                        eng: "Annoying",
                        esp: "Molesto",
                        fra: "Ennuyeux",
                        por: "Chato",
                        deu: "Lästig"
                    },
                    v: 1
                },
                {
                    t: "c",
                    d: {
                        ita: "Nauseabondo",
                        eng: "Nauseating",
                        esp: "Nauseabundo",
                        fra: "Nauséabond",
                        por: "Nauseante",
                        deu: "Übelkeit"
                    },
                    v: 2
                },
                {
                    t: "c",
                    d: {
                        ita: "Agonizzante",
                        eng: "Agonizing",
                        esp: "Agonizante",
                        fra: "Agonisant",
                        por: "Agonizante",
                        deu: "Qualvoll"
                    },
                    v: 3
                },
                {
                    t: "c",
                    d: {
                        ita: "Terribile",
                        eng: "Terrible",
                        esp: "Terrible",
                        fra: "Terrible",
                        por: "Terrível",
                        deu: "Schrecklich"
                    },
                    v: 4
                },
                {
                    t: "c",
                    d: {
                        ita: "Torturante",
                        eng: "Torturing",
                        esp: "Torturante",
                        fra: "Torturant",
                        por: "Torturante",
                        deu: "Folternd"
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
                {
                    t: "t",
                    d: {
                        ita: "<b>Dolore lieve</b><br>Il paziente sperimenta un dolore che è percepito ma non influisce in modo significativo sulla vita quotidiana. Il dolore è descritto come \"gestibile\" o \"lieve\".",
                        eng: "<b>Mild pain</b><br>The patient experiences pain that is noticeable but does not significantly impact daily life. The pain is described as \"manageable\" or \"mild.\"",
                        esp: "<b>Dolor leve</b><br>El paciente experimenta un dolor que es percibido pero no afecta significativamente la vida diaria. El dolor se describe como \"manejable\" o \"leve.\"",
                        fra: "<b>Douleur légère</b><br>Le patient ressent une douleur qui est perçue mais n'affecte pas de manière significative la vie quotidienne. La douleur est décrite comme \"gérable\" ou \"légère.\"",
                        por: "<b>Dor leve</b><br>O paciente experimenta uma dor que é percebida, mas não afeta significativamente a vida diária. A dor é descrita como \"gerenciável\" ou \"leve.\"",
                        deu: "<b>Leichter Schmerz</b><br>Der Patient erfährt Schmerzen, die wahrgenommen werden, aber keinen wesentlichen Einfluss auf das tägliche Leben haben. Der Schmerz wird als \"handhabbar\" oder \"mild\" beschrieben."
                    },
                    h: true
                },
                {
                    t: "t",
                    d: {
                        ita: "<b>Dolore moderato</b><br>Il dolore inizia a interferire con le attività quotidiane del paziente, che potrebbe descriverlo come fastidioso o persistente. Può essere più difficile ignorare il dolore, ma è ancora possibile svolgere molte attività con qualche limitazione.",
                        eng: "<b>Moderate pain</b><br>The pain begins to interfere with the patient's daily activities, which they may describe as annoying or persistent. It may become more difficult to ignore the pain, but it is still possible to perform many activities with some limitations.",
                        esp: "<b>Dolor moderado</b><br>El dolor comienza a interferir con las actividades diarias del paciente, que puede describirlo como molesto o persistente. Puede ser más difícil ignorar el dolor, pero aún es posible realizar muchas actividades con algunas limitaciones.",
                        fra: "<b>Douleur modérée</b><br>La douleur commence à interférer avec les activités quotidiennes du patient, qu'il pourrait décrire comme gênantes ou persistantes. Il peut devenir plus difficile d'ignorer la douleur, mais il est encore possible d'effectuer de nombreuses activités avec quelques limitations.",
                        por: "<b>Dor moderada</b><br>A dor começa a interferir nas atividades diárias do paciente, que pode descrevê-la como incômoda ou persistente. Pode ser mais difícil ignorar a dor, mas ainda é possível realizar muitas atividades com algumas limitações.",
                        deu: "<b>Moderater Schmerz</b><br>Der Schmerz beginnt, die täglichen Aktivitäten des Patienten zu stören, die ihn als lästig oder anhaltend beschreiben könnten. Es kann schwieriger werden, den Schmerz zu ignorieren, aber es ist immer noch möglich, viele Aktivitäten mit einigen Einschränkungen auszuführen."
                    },
                    h: true
                },
                {
                    t: "t",
                    d: {
                        ita: "<b>Dolore forte</b><br>Il paziente riferisce un dolore che ha un impatto significativo sulle attività quotidiane e la qualità della vita. Il dolore è difficile da ignorare e richiede spesso interventi medici più intensivi. È descritto come \"intenso\" o \"debilitante\".",
                        eng: "<b>Severe pain</b><br>The patient reports pain that has a significant impact on daily activities and quality of life. The pain is difficult to ignore and often requires more intensive medical interventions. It is described as \"intense\" or \"debilitating.\"",
                        esp: "<b>Dolor fuerte</b><br>El paciente informa de un dolor que tiene un impacto significativo en las actividades diarias y en la calidad de vida. El dolor es difícil de ignorar y a menudo requiere intervenciones médicas más intensivas. Se describe como \"intenso\" o \"debilitante.\"",
                        fra: "<b>Douleur forte</b><br>Le patient signale une douleur qui a un impact significatif sur les activités quotidiennes et la qualité de vie. La douleur est difficile à ignorer et nécessite souvent des interventions médicales plus intensives. Elle est décrite comme \"intense\" ou \"débilitante.\"",
                        por: "<b>Dor forte</b><br>O paciente relata uma dor que tem um impacto significativo nas atividades diárias e na qualidade de vida. A dor é difícil de ignorar e muitas vezes requer intervenções médicas mais intensivas. É descrita como \"intensa\" ou \"debilitante.\"",
                        deu: "<b>Starker Schmerz</b><br>Der Patient berichtet von Schmerzen, die erhebliche Auswirkungen auf die täglichen Aktivitäten und die Lebensqualität haben. Der Schmerz ist schwer zu ignorieren und erfordert oft intensivere medizinische Interventionen. Er wird als \"intensiv\" oder \"debilitierend\" beschrieben."
                    },
                    h: true
                },
                {
                    t: "t",
                    d: {
                        ita: "<b>Dolore molto forte o insopportabile</b><br>Il dolore è estremamente grave e limita fortemente la capacità del paziente di svolgere qualsiasi attività quotidiana. Viene spesso descritto come \"intollerabile\" o \"insopportabile\", influenzando sia il benessere fisico che emotivo.",
                        eng: "<b>Very severe or unbearable pain</b><br>The pain is extremely severe and greatly limits the patient's ability to perform any daily activities. It is often described as \"unbearable\" or \"intolerable,\" affecting both physical and emotional well-being.",
                        esp: "<b>Dolor muy fuerte o insoportable</b><br>El dolor es extremadamente grave y limita en gran medida la capacidad del paciente para realizar cualquier actividad diaria. A menudo se describe como \"insoportable\" o \"intolerable\", afectando tanto el bienestar físico como el emocional.",
                        fra: "<b>Douleur très forte ou insupportable</b><br>La douleur est extrêmement grave et limite fortement la capacité du patient à effectuer toute activité quotidienne. Elle est souvent décrite comme \"insupportable\" ou \"intolérable\", affectant à la fois le bien-être physique et émotionnel.",
                        por: "<b>Dor muito forte ou insuportável</b><br>A dor é extremamente grave e limita muito a capacidade do paciente de realizar qualquer atividade diária. Muitas vezes é descrita como \"insuportável\" ou \"intolerável\", afetando tanto o bem-estar físico quanto emocional.",
                        deu: "<b>Sehr starker oder unerträglicher Schmerz</b><br>Der Schmerz ist extrem stark und schränkt die Fähigkeit des Patienten, irgendwelche täglichen Aktivitäten auszuführen, erheblich ein. Er wird oft als \"unerträglich\" oder \"intolerabel\" beschrieben und beeinträchtigt sowohl das körperliche als auch das emotionale Wohlbefinden."
                    },
                    h: true
                }                
            ],
            html:   '<div id="moduloMPQ">' +
                    '   <div>' +
                    '       <div class="md_dida">[0]</div>' +
                    '       <div>[1]</div>' +
                    '       <div class="mpq_lists">' +
                    '           <div id="mpq_sez01" class="mpq_sez">[2] [3][4][5][6][7][8]</div>' +
                    '           <div id="mpq_sez02" class="mpq_sez">[9] [10][11][12]</div>' +
                    '           <div id="mpq_sez03" class="mpq_sez">[13] [14][15][16][17][18]</div>' +
                    '           <div id="mpq_sez04" class="mpq_sez">[19] [20][21][22]</div>' +
                    '           <div id="mpq_sez05" class="mpq_sez">[23] [24][25][26][27][28]</div>' +
                    '           <div id="mpq_sez06" class="mpq_sez">[29] [30][31][32]</div>' +
                    '           <div id="mpq_sez07" class="mpq_sez">[33] [34][35][36][37]</div>' +
                    '           <div id="mpq_sez08" class="mpq_sez">[38] [39][40][41][42]</div>' +
                    '           <div id="mpq_sez09" class="mpq_sez">[43] [44][45][46][47][48]</div>' +
                    '           <div id="mpq_sez10" class="mpq_sez">[49] [50][51][52][53]</div>' +
                    '       </div>' +
                    '   </div>' +
                    '   <div>' +
                    '       <div>[54]</div>' +
                    '       <div class="mpq_lists">' +
                    '           <div id="mpq_sez11" class="mpq_sez">[55] [56][57]</div>' +
                    '           <div id="mpq_sez12" class="mpq_sez">[58] [59][60]</div>' +
                    '           <div id="mpq_sez13" class="mpq_sez">[61] [62][63][64]</div>' +
                    '           <div id="mpq_sez14" class="mpq_sez">[65] [66][67][68][69][70]</div>' +
                    '           <div id="mpq_sez15" class="mpq_sez">[71] [72][73]</div>' +
                    '       </div>' +
                    '   </div>' +
                    '   <div>' +
                    '       <div>[74]</div>' +
                    '       <div class="mpq_lists">' +
                    '           <div id="mpq_sez16" class="mpq_sez">[75] [76][77][78][79][80]</div>' +
                    '       </div>' +
                    '   </div>' +
                    '   <div>' +
                    '       <div>[81]</div>' +
                    '       <div class="mpq_lists">' +
                    '           <div id="mpq_sez17" class="mpq_sez">[82] [83][84][85][86]</div>' +
                    '           <div id="mpq_sez18" class="mpq_sez">[87] [88][89][90][91][92]</div>' +
                    '           <div id="mpq_sez19" class="mpq_sez">[93] [94][95][96]</div>' +
                    '           <div id="mpq_sez20" class="mpq_sez">[97] [98][99][100][101][102]</div>' +
                    '       </div>' +
                    '   </div>' +
                    '   <div class="md_cont_total">' +
                    '       <div class="md_label_total">[103]</div>' +
                    '       <div id="mpq_total" class="md_total"></div>' +
                    '   </div>' +
                    '   <div id="mpq_descr" class="md_descr">' +
                    '       <span id="mpq_1">[104]</span>' +
                    '       <span id="mpq_2">[105]</span>' +
                    '       <span id="mpq_3">[106]</span>' +
                    '       <span id="mpq_4">[107]</span>' +
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
                for(let o=1;o<=4;o++)document.getElementById("mpq_descr").classList.remove("vis"+o);
                if(tot<=15)document.getElementById("mpq_descr").classList.add("vis1");
                if(tot>15 && tot<=30)document.getElementById("mpq_descr").classList.add("vis2");
                if(tot>30 && tot<=45)document.getElementById("mpq_descr").classList.add("vis3");
                if(tot>45)document.getElementById("mpq_descr").classList.add("vis4");
            }
        },
        sf_mpq: {
            category: "pain",
            title: {
                ita: "Short-form McGill Pain Questionaire (SF-MPQ)",
                eng: "Short-form McGill Pain Questionaire (SF-MPQ)",
                esp: "Short-form McGill Pain Questionaire (SF-MPQ)",
                fra: "Short-form McGill Pain Questionaire (SF-MPQ)",
                por: "Short-form McGill Pain Questionaire (SF-MPQ)",
                deu: "Short-form McGill Pain Questionaire (SF-MPQ)"
            },
            data:[
                {
                    t: "t",
                    d: {
                        ita: "Il Short-Form McGill Pain Questionnaire (SF-MPQ) è una versione abbreviata del McGill Pain Questionnaire, progettata per valutare rapidamente la qualità e l'intensità del dolore percepito dai pazienti. Il SF-MPQ fornisce un modo rapido e pratico per valutare il dolore in contesti clinici, mantenendo una buona precisione diagnostica pur riducendo il tempo di compilazione.",
                        eng: "The Short-Form McGill Pain Questionnaire (SF-MPQ) is a shortened version of the McGill Pain Questionnaire, designed to quickly assess the quality and intensity of pain perceived by patients. The SF-MPQ provides a quick and practical way to evaluate pain in clinical settings, maintaining good diagnostic accuracy while reducing completion time.",
                        esp: "El Cuestionario de Dolor de McGill en su forma corta (SF-MPQ) es una versión abreviada del Cuestionario de Dolor de McGill, diseñado para evaluar rápidamente la calidad y la intensidad del dolor percibido por los pacientes. El SF-MPQ proporciona una forma rápida y práctica de evaluar el dolor en contextos clínicos, manteniendo una buena precisión diagnóstica mientras se reduce el tiempo de finalización.",
                        fra: "Le Questionnaire de douleur de McGill au format abrégé (SF-MPQ) est une version raccourcie du Questionnaire de douleur de McGill, conçue pour évaluer rapidement la qualité et l'intensité de la douleur perçue par les patients. Le SF-MPQ offre un moyen rapide et pratique d'évaluer la douleur dans les contextes cliniques, tout en maintenant une bonne précision diagnostique et en réduisant le temps de complétion.",
                        por: "O Questionário de Dor de McGill em formato abreviado (SF-MPQ) é uma versão encurtada do Questionário de Dor de McGill, projetada para avaliar rapidamente a qualidade e a intensidade da dor percebida pelos pacientes. O SF-MPQ fornece uma maneira rápida e prática de avaliar a dor em contextos clínicos, mantendo uma boa precisão diagnóstica enquanto reduz o tempo de preenchimento.",
                        deu: "Der Short-Form McGill Schmerzfragebogen (SF-MPQ) ist eine verkürzte Version des McGill Schmerzfragebogens, die entwickelt wurde, um schnell die Qualität und Intensität des von den Patienten wahrgenommenen Schmerzes zu bewerten. Der SF-MPQ bietet eine schnelle und praktische Möglichkeit, Schmerzen in klinischen Kontexten zu bewerten, während er eine gute diagnostische Genauigkeit aufrechterhält und die Ausfüllzeit verkürzt."
                    },
                    h: true
                },
                {
                    t: "t",
                    d: {
                        ita: "Indicare l'intensità di ognuno dei seguenti aspetti del dolore.",
                        eng: "Indicate the intensity of each of the following aspects of pain.",
                        esp: "Indique la intensidad de cada uno de los siguientes aspectos del dolor.",
                        fra: "Indiquez l'intensité de chacun des aspects suivants de la douleur.",
                        por: "Indique a intensidade de cada um dos seguintes aspectos da dor.",
                        deu: "Geben Sie die Intensität jedes der folgenden Schmerzmerkmale an."
                    },
                    h: true
                },
                {
                    t: "s",
                    d: {
                        ita: "Pulsante",
                        eng: "Pulsating",
                        esp: "Palpitante",
                        fra: "Pulsant",
                        por: "Pulsante",
                        deu: "Pulsierend"
                    },
                    l: "mpq_scala_dolore"
                },
                {
                    t: "s",
                    d: {
                        ita: "Pungente",
                        eng: "Stabbing",
                        esp: "Punzante",
                        fra: "Perçant",
                        por: "Aguçado",
                        deu: "Stechend"
                    },
                    l: "mpq_scala_dolore"
                },
                {
                    t: "s",
                    d: {
                        ita: "Acuto",
                        eng: "Sharp",
                        esp: "Agudo",
                        fra: "Aigu",
                        por: "Afiado",
                        deu: "Scharf"
                    },
                    l: "mpq_scala_dolore"
                },
                {
                    t: "s",
                    d: {
                        ita: "Lacerante",
                        eng: "Tearing",
                        esp: "Desgarrador",
                        fra: "Déchirant",
                        por: "Rasgando",
                        deu: "Reißend"
                    },
                    l: "mpq_scala_dolore"
                },
                {
                    t: "s",
                    d: {
                        ita: "Crampo",
                        eng: "Cramplike",
                        esp: "Cólico",
                        fra: "Crampes",
                        por: "Cãibras",
                        deu: "Krampfartig"
                    },
                    l: "mpq_scala_dolore"
                },
                {
                    t: "s",
                    d: {
                        ita: "Fastidioso",
                        eng: "Annoying",
                        esp: "Molesto",
                        fra: "Ennuyeux",
                        por: "Incômodo",
                        deu: "Lästig"
                    },
                    l: "mpq_scala_dolore"
                },
                {
                    t: "s",
                    d: {
                        ita: "Pesante",
                        eng: "Heavy",
                        esp: "Pesado",
                        fra: "Lourd",
                        por: "Pesado",
                        deu: "Schwer"
                    },
                    l: "mpq_scala_dolore"
                },
                {
                    t: "s",
                    d: {
                        ita: "Doloroso",
                        eng: "Painful",
                        esp: "Doloroso",
                        fra: "Douloureux",
                        por: "Doloroso",
                        deu: "Schmerzhaft"
                    },
                    l: "mpq_scala_dolore"
                },
                {
                    t: "s",
                    d: {
                        ita: "Scossa elettrica",
                        eng: "Electric shock",
                        esp: "Descarga eléctrica",
                        fra: "Choc électrique",
                        por: "Choque elétrico",
                        deu: "Stromschlag"
                    },
                    l: "mpq_scala_dolore"
                },
                {
                    t: "s",
                    d: {
                        ita: "Bruciore",
                        eng: "Burning",
                        esp: "Ardor",
                        fra: "Brûlant",
                        por: "Ardente",
                        deu: "Brennend"
                    },
                    l: "mpq_scala_dolore"
                },
                {
                    t: "s",
                    d: {
                        ita: "Formicolio",
                        eng: "Tingling",
                        esp: "Hormigueo",
                        fra: "Picotement",
                        por: "Formigamento",
                        deu: "Kribbeln"
                    },
                    l: "mpq_scala_dolore"
                },
                {
                    t: "s",
                    d: {
                        ita: "Stanco",
                        eng: "Fatigued",
                        esp: "Cansado",
                        fra: "Fatigué",
                        por: "Cansado",
                        deu: "Müde"
                    },
                    l: "mpq_scala_dolore"
                },
                {
                    t: "s",
                    d: {
                        ita: "Spaventoso",
                        eng: "Fearful",
                        esp: "Espeluznante",
                        fra: "Effrayant",
                        por: "Assustador",
                        deu: "Angsteinflößend"
                    },
                    l: "mpq_scala_dolore"
                },
                {
                    t: "s",
                    d: {
                        ita: "Angosciante",
                        eng: "Distressing",
                        esp: "Angustiante",
                        fra: "Douloureux",
                        por: "Angustiante",
                        deu: "Quälend"
                    },
                    l: "mpq_scala_dolore"
                },
                {
                    t: "s",
                    d: {
                        ita: "Punizione terribile",
                        eng: "Terrible punishment",
                        esp: "Castigo terrible",
                        fra: "Punition terrible",
                        por: "Punição terrível",
                        deu: "Schreckliche Bestrafung"
                    },
                    l: "mpq_scala_dolore"
                },
                {
                    t: "r",
                    d: {
                        ita: "Present Pain Intensity (PPI)",
                        eng: "Present Pain Intensity (PPI)",
                        esp: "Present Pain Intensity (PPI)",
                        fra: "Present Pain Intensity (PPI)",
                        por: "Present Pain Intensity (PPI)",
                        deu: "Present Pain Intensity (PPI)"
                    },
                    l: [
                        {
                            ita: "0 - Nessun dolore",
                            eng: "0 - No pain",
                            esp: "0 - Ningún dolor",
                            fra: "0 - Aucune douleur",
                            por: "0 - Nenhuma dor",
                            deu: "0 - Kein Schmerz"
                        },
                        {
                            ita: "1 - Lieve",
                            eng: "1 - Mild",
                            esp: "1 - Leve",
                            fra: "1 - Léger",
                            por: "1 - Leve",
                            deu: "1 - Leicht"
                        },
                        {
                            ita: "2 - Disagio lieve",
                            eng: "2 - Mild discomfort",
                            esp: "2 - Malestar leve",
                            fra: "2 - Inconfort léger",
                            por: "2 - Desconforto leve",
                            deu: "2 - Leichtes Unbehagen"
                        },
                        {
                            ita: "3 - Moderato",
                            eng: "3 - Moderate",
                            esp: "3 - Moderado",
                            fra: "3 - Modéré",
                            por: "3 - Moderado",
                            deu: "3 - Mäßig"
                        },
                        {
                            ita: "4 - Grave",
                            eng: "4 - Severe",
                            esp: "4 - Grave",
                            fra: "4 - Grave",
                            por: "4 - Grave",
                            deu: "4 - Schwer"
                        },
                        {
                            ita: "5 - Molto grave",
                            eng: "5 - Very severe",
                            esp: "5 - Muy grave",
                            fra: "5 - Très grave",
                            por: "5 - Muito grave",
                            deu: "5 - Sehr schwer"
                        },
                        {
                            ita: "6 - Insopportabile",
                            eng: "6 - Unbearable",
                            esp: "6 - Insoportable",
                            fra: "6 - Insupportable",
                            por: "6 - Insuportável",
                            deu: "6 - Unerträglich"
                        }
                    ]
                },
                {
                    t: "e",
                    d: {
                        ita: "Indice generale del dolore",
                        eng: "General pain index",
                        esp: "Índice general del dolor",
                        fra: "Indice général de la douleur",
                        por: "Índice geral da dor",
                        deu: "Allgemeiner Schmerzindex"
                    }
                },
                {
                    t: "t",
                    d: {
                        ita: "<b>Dolore lieve</b><br>Il paziente può gestire il dolore senza che esso interferisca gravemente con la sua vita quotidiana.",
                        eng: "<b>Mild pain</b><br>The patient can manage the pain without it significantly interfering with their daily life.",
                        esp: "<b>Dolor leve</b><br>El paciente puede manejar el dolor sin que interfiera gravemente en su vida diaria.",
                        fra: "<b>Douleur légère</b><br>Le patient peut gérer la douleur sans qu'elle n'interfère gravement avec sa vie quotidienne.",
                        por: "<b>Dor leve</b><br>O paciente pode gerenciar a dor sem que ela interfira gravemente em sua vida diária.",
                        deu: "<b>Leichter Schmerz</b><br>Der Patient kann den Schmerz bewältigen, ohne dass er erheblich in sein tägliches Leben eingreift."
                    },
                    h: true
                },
                {
                    t: "t",
                    d: {
                        ita: "<b>Dolore moderato</b><br>Il dolore è presente in modo significativo e influisce su varie attività quotidiane e sulla qualità della vita.",
                        eng: "<b>Moderate pain</b><br>The pain is significantly present and affects various daily activities and quality of life.",
                        esp: "<b>Dolor moderado</b><br>El dolor está presente de manera significativa e influye en varias actividades diarias y en la calidad de vida.",
                        fra: "<b>Douleur modérée</b><br>La douleur est significativement présente et affecte diverses activités quotidiennes et la qualité de vie.",
                        por: "<b>Dor moderada</b><br>A dor está presente de maneira significativa e afeta várias atividades diárias e a qualidade de vida.",
                        deu: "<b>Moderater Schmerz</b><br>Der Schmerz ist signifikant vorhanden und beeinträchtigt verschiedene tägliche Aktivitäten und die Lebensqualität."
                    },
                    h: true
                },
                {
                    t: "t",
                    d: {
                        ita: "<b>Dolore forte o grave</b><br>Il dolore ha un impatto sostanziale sulla vita del paziente, limitando le attività e causando disagio emotivo e fisico.",
                        eng: "<b>Severe pain</b><br>The pain has a substantial impact on the patient's life, limiting activities and causing emotional and physical distress.",
                        esp: "<b>Dolor fuerte o grave</b><br>El dolor tiene un impacto sustancial en la vida del paciente, limitando las actividades y causando angustia emocional y física.",
                        fra: "<b>Douleur forte ou grave</b><br>La douleur a un impact substantiel sur la vie du patient, limitant les activités et causant une détresse émotionnelle et physique.",
                        por: "<b>Dor forte ou grave</b><br>A dor tem um impacto substancial na vida do paciente, limitando as atividades e causando desconforto emocional e físico.",
                        deu: "<b>Starker oder schwerer Schmerz</b><br>Der Schmerz hat erhebliche Auswirkungen auf das Leben des Patienten, schränkt die Aktivitäten ein und verursacht emotionale und körperliche Belastung."
                    },
                    h: true
                },
                {
                    t: "t",
                    d: {
                        ita: "<b>Dolore molto grave o insopportabile</b><br>Il paziente percepisce un dolore debilitante che limita la capacità di svolgere le attività quotidiane. Potrebbe essere descritto come un dolore estremo o distruttivo.",
                        eng: "<b>Very severe or unbearable pain</b><br>The patient perceives debilitating pain that limits their ability to perform daily activities. It may be described as extreme or destructive pain.",
                        esp: "<b>Dolor muy grave o insoportable</b><br>El paciente percibe un dolor debilitante que limita su capacidad para realizar actividades diarias. Podría describirse como un dolor extremo o destructivo.",
                        fra: "<b>Douleur très grave ou insupportable</b><br>Le patient ressent une douleur débilitante qui limite sa capacité à effectuer des activités quotidiennes. Cela peut être décrit comme une douleur extrême ou destructrice.",
                        por: "<b>Dor muito grave ou insuportável</b><br>O paciente percebe uma dor debilitante que limita sua capacidade de realizar atividades diárias. Pode ser descrita como uma dor extrema ou destrutiva.",
                        deu: "<b>Sehr starker oder unerträglicher Schmerz</b><br>Der Patient empfindet debilitating Schmerzen, die seine Fähigkeit einschränken, tägliche Aktivitäten auszuführen. Es kann als extrem oder zerstörerisch beschrieben werden."
                    },
                    h: true
                }                
            ],
            html:   '<div id="moduloSFMPQ">' +
                    '   <div class="md_dida">[0]</div>' +
                    '   <div id="sfmpq_lists" class="md_lists"><div>[1][2][3][4][5][6][7][8][9][10][11][12][13][14][15][16]</div></div>' +
                    '   <div id="sfmpq_ppi">[17,d][17,0][17,1][17,2][17,3][17,4][17,5][17,6]</div>' +
                    '   <div class="md_cont_total">' +
                    '       <div class="md_label_total">[18]</div>' +
                    '       <div id="sfmpq_total" class="md_total"></div>' +
                    '   </div>' +
                    '   <div id="sfmpq_descr" class="md_descr">' +
                    '       <span id="sfmpq_1">[19]</span>' +
                    '       <span id="sfmpq_2">[20]</span>' +
                    '       <span id="sfmpq_3">[21]</span>' +
                    '       <span id="sfmpq_4">[22]</span>' +
                    '   </div>' +
                    '</div>',
            funct: function(){
                // aggiorno il totale dei valori
                let tot = 0,
                    els = document.getElementById("moduloSFMPQ").getElementsByTagName("select");
                for(e in els){
                    if(els[e].selectedIndex>0)tot += parseInt(els[e].selectedIndex)-1;
                }
                els = document.getElementById("moduloSFMPQ").getElementsByTagName("input");
                for(e in els){
                    if(els[e].name == 'risposta17'){
                        if(els[e].checked)tot += parseInt(e);
                    }
                }
                document.getElementById("sfmpq_total").innerHTML = tot;
                for(let o=1;o<=4;o++)document.getElementById("sfmpq_descr").classList.remove("vis"+o);
                if(tot<=15)document.getElementById("sfmpq_descr").classList.add("vis1");
                if(tot>15 && tot<=30)document.getElementById("sfmpq_descr").classList.add("vis2");
                if(tot>30 && tot<=45)document.getElementById("sfmpq_descr").classList.add("vis3");
                if(tot>45)document.getElementById("sfmpq_descr").classList.add("vis4");
            }
        },
        odi: {
            category: "pain",
            title: {
                ita: "Oswestry Disability Index (ODI)",
                eng: "Oswestry Disability Index (ODI)",
                esp: "Oswestry Disability Index (ODI)",
                fra: "Oswestry Disability Index (ODI)",
                por: "Oswestry Disability Index (ODI)",
                deu: "Oswestry Disability Index (ODI)"
            },
            data: [
                {
                    t: "t",
                    d: {
                        ita: "Questo questionario è stato progettato per raccogliere informazioni su quanto i problemi alla schiena (o alla gamba) del paziente influenzino la sua capacità di svolgere le attività quotidiane. Si raccomanda al medico di assicurarsi che il paziente risponda a tutte le domande del questionario.",
                        eng: "This questionnaire is designed to gather information on how the patient's back (or leg) issues affect their ability to perform daily activities. The physician is advised to ensure that the patient answers all the questions in the questionnaire.",
                        esp: "Este cuestionario está diseñado para recopilar información sobre cómo los problemas de espalda (o de pierna) del paciente afectan su capacidad para realizar actividades diarias. Se recomienda al médico asegurarse de que el paciente responda a todas las preguntas del cuestionario.",
                        fra: "Ce questionnaire a été conçu pour recueillir des informations sur la mesure dans laquelle les problèmes de dos (ou de jambe) du patient affectent sa capacité à effectuer des activités quotidiennes. Il est recommandé au médecin de s'assurer que le patient répond à toutes les questions du questionnaire.",
                        por: "Este questionário foi projetado para coletar informações sobre como os problemas nas costas (ou na perna) do paciente afetam sua capacidade de realizar atividades diárias. O médico é aconselhado a garantir que o paciente responda a todas as perguntas do questionário.",
                        deu: "Dieser Fragebogen wurde entwickelt, um Informationen darüber zu sammeln, wie die Rücken- (oder Bein-)Probleme des Patienten seine Fähigkeit beeinträchtigen, alltägliche Aktivitäten auszuführen. Es wird empfohlen, dass der Arzt sicherstellt, dass der Patient alle Fragen des Fragebogens beantwortet."
                    }
                },
                {
                    t: "r",
                    d: {
                        ita: "Intensità del dolore attuale",
                        eng: "Current pain intensity",
                        esp: "Intensidad del dolor actual",
                        fra: "Intensité de la douleur actuelle",
                        por: "Intensidade da dor atual",
                        deu: "Aktuelle Schmerzintensität"
                    },
                    l: [
                        {
                            ita: "Nessuna",
                            eng: "None",
                            esp: "Ninguna",
                            fra: "Aucune",
                            por: "Nenhuma",
                            deu: "Keine"
                        },
                        {
                            ita: "Lieve",
                            eng: "Mild",
                            esp: "Leve",
                            fra: "Léger",
                            por: "Leve",
                            deu: "Leicht"
                        },
                        {
                            ita: "Media",
                            eng: "Moderate",
                            esp: "Moderado",
                            fra: "Modéré",
                            por: "Moderada",
                            deu: "Mittel"
                        },
                        {
                            ita: "Abbastanza forte",
                            eng: "Fairly strong",
                            esp: "Bastante fuerte",
                            fra: "Assez fort",
                            por: "Bastante forte",
                            deu: "Ziemlich stark"
                        },
                        {
                            ita: "Molto forte",
                            eng: "Very strong",
                            esp: "Muy fuerte",
                            fra: "Très fort",
                            por: "Muito forte",
                            deu: "Sehr stark"
                        },
                        {
                            ita: "Massima immaginabile",
                            eng: "Maximum imaginable",
                            esp: "Máximo imaginable",
                            fra: "Maximum imaginable",
                            por: "Máximo imaginável",
                            deu: "Maximal vorstellbar"
                        }
                    ]
                },
                {
                    t: "r",
                    d: {
                        ita: "Cura personale (lavarsi, vestirsi, ecc.)",
                        eng: "Personal care (washing, dressing, etc.)",
                        esp: "Cuidado personal (lavarse, vestirse, etc.)",
                        fra: "Soins personnels (se laver, s'habiller, etc.)",
                        por: "Cuidados pessoais (lavar-se, vestir-se, etc.)",
                        deu: "Persönliche Pflege (Waschen, Ankleiden usw.)"
                    },
                    l: [
                        {
                            ita: "Riesce a prendersi cura di sé senza aumentare il dolore",
                            eng: "Can take care of themselves without increasing pain",
                            esp: "Puede cuidarse sin aumentar el dolor",
                            fra: "Peut s'occuper de lui-même sans aggraver la douleur",
                            por: "Consegue cuidar de si mesmo sem aumentar a dor",
                            deu: "Kann sich selbst versorgen, ohne den Schmerz zu verstärken"
                        },
                        {
                            ita: "Riesce a prendersi cura di sé ma ha molto dolore",
                            eng: "Can take care of themselves but has a lot of pain",
                            esp: "Puede cuidarse pero tiene mucho dolor",
                            fra: "Peut s'occuper de lui-même mais a beaucoup de douleur",
                            por: "Consegue cuidar de si mesmo, mas tem muita dor",
                            deu: "Kann sich selbst versorgen, hat aber viel Schmerz"
                        },
                        {
                            ita: "Fa male prendersi cura di sé, quindi è lento e prudente",
                            eng: "It hurts to take care of oneself, so is slow and careful",
                            esp: "Duele cuidarse, por lo que es lento y cuidadoso",
                            fra: "Cela fait mal de prendre soin de soi, donc il est lent et prudent",
                            por: "Dói cuidar de si mesmo, então é lento e cuidadoso",
                            deu: "Es tut weh, sich selbst zu versorgen, also ist er langsam und vorsichtig"
                        },
                        {
                            ita: "Ha bisogno di aiuto ma riesce per lo più a prendersi cura di sé",
                            eng: "Needs help but mostly can take care of themselves",
                            esp: "Necesita ayuda pero principalmente puede cuidarse",
                            fra: "A besoin d'aide mais peut principalement s'occuper de lui-même",
                            por: "Precisa de ajuda, mas na maioria das vezes consegue cuidar de si mesmo",
                            deu: "Braucht Hilfe, kann sich aber größtenteils selbst versorgen"
                        },
                        {
                            ita: "Ha bisogno di aiuto costante nel prendersi cura di sé",
                            eng: "Needs constant help in taking care of themselves",
                            esp: "Necesita ayuda constante para cuidarse",
                            fra: "A besoin d'une aide constante pour s'occuper de lui-même",
                            por: "Precisa de ajuda constante para cuidar de si mesmo",
                            deu: "Braucht ständige Hilfe bei der Selbstversorgung"
                        },
                        {
                            ita: "Non si veste, si lava con difficoltà e sta a letto",
                            eng: "Does not dress, washes with difficulty, and stays in bed",
                            esp: "No se viste, se lava con dificultad y permanece en la cama",
                            fra: "Ne s'habille pas, se lave avec difficulté et reste au lit",
                            por: "Não se veste, se lava com dificuldade e fica na cama",
                            deu: "Zieht sich nicht an, wäscht sich mit Schwierigkeiten und bleibt im Bett"
                        }
                    ]
                },
                {
                    t: "r",
                    d: {
                        ita: "Alzare pesi",
                        eng: "Lifting weights",
                        esp: "Levantamiento de pesas",
                        fra: "Soulever des poids",
                        por: "Levantamento de pesos",
                        deu: "Gewichte heben"
                    },
                    l: [
                        {
                            ita: "Solleva oggetti pesanti senza accusare più dolore del solito",
                            eng: "Lifts heavy objects without experiencing more pain than usual",
                            esp: "Levanta objetos pesados sin experimentar más dolor de lo habitual",
                            fra: "Soulève des objets lourds sans ressentir plus de douleur que d'habitude",
                            por: "Levanta objetos pesados sem sentir mais dor do que o habitual",
                            deu: "Hebt schwere Gegenstände, ohne mehr Schmerz als üblich zu verspüren"
                        },
                        {
                            ita: "Solleva oggetti pesanti ma accusa più dolore del solito",
                            eng: "Lifts heavy objects but feels more pain than usual",
                            esp: "Levanta objetos pesados, pero siente más dolor de lo habitual",
                            fra: "Soulève des objets lourds mais ressent plus de douleur que d'habitude",
                            por: "Levanta objetos pesados, mas sente mais dor do que o habitual",
                            deu: "Hebt schwere Gegenstände, verspürt aber mehr Schmerz als üblich"
                        },
                        {
                            ita: "Il dolore gli impedisce di sollevare oggetti pesanti da terra",
                            eng: "Pain prevents them from lifting heavy objects from the ground",
                            esp: "El dolor le impide levantar objetos pesados del suelo",
                            fra: "La douleur l'empêche de soulever des objets lourds du sol",
                            por: "A dor impede-o de levantar objetos pesados do chão",
                            deu: "Schmerzen hindern ihn daran, schwere Gegenstände vom Boden zu heben"
                        },
                        {
                            ita: "Non riesce a sollevare da terra oggetti pesanti, solo quelli leggeri e ben posizionati",
                            eng: "Cannot lift heavy objects from the ground, only light and well-positioned ones",
                            esp: "No puede levantar objetos pesados del suelo, solo los ligeros y bien colocados",
                            fra: "Ne peut pas soulever des objets lourds du sol, seulement ceux légers et bien placés",
                            por: "Não consegue levantar objetos pesados do chão, apenas os leves e bem posicionados",
                            deu: "Kann schwere Gegenstände vom Boden nicht heben, nur leichte und gut platzierte"
                        },
                        {
                            ita: "Riesce a sollevare solo oggetti leggeri",
                            eng: "Can only lift light objects",
                            esp: "Solo puede levantar objetos ligeros",
                            fra: "Ne peut soulever que des objets légers",
                            por: "Só consegue levantar objetos leves",
                            deu: "Kann nur leichte Gegenstände heben"
                        },
                        {
                            ita: "Non riesce a trasportare praticamente niente",
                            eng: "Can hardly carry anything",
                            esp: "Prácticamente no puede transportar nada",
                            fra: "Ne peut pratiquement rien porter",
                            por: "Mal consegue carregar praticamente nada",
                            deu: "Kann praktisch nichts tragen"
                        }
                    ]
                },
                {
                    t: "r",
                    d: {
                        ita: "Camminare",
                        eng: "Walking",
                        esp: "Caminar",
                        fra: "Marcher",
                        por: "Caminhando",
                        deu: "Gehen"
                    },
                    l: [
                        {
                            ita: "Percorre qualsiasi distanza",
                            eng: "Can walk any distance",
                            esp: "Puede caminar cualquier distancia",
                            fra: "Peut marcher n'importe quelle distance",
                            por: "Consegue caminhar qualquer distância",
                            deu: "Kann jede Entfernung gehen"
                        },
                        {
                            ita: "Non riesce a camminare per più di un chilometro",
                            eng: "Cannot walk more than one kilometer",
                            esp: "No puede caminar más de un kilómetro",
                            fra: "Ne peut pas marcher plus d'un kilomètre",
                            por: "Não consegue caminhar mais de um quilômetro",
                            deu: "Kann nicht mehr als einen Kilometer gehen"
                        },
                        {
                            ita: "Non riesce a camminare per più di 500 metri",
                            eng: "Cannot walk more than 500 meters",
                            esp: "No puede caminar más de 500 metros",
                            fra: "Ne peut pas marcher plus de 500 mètres",
                            por: "Não consegue caminhar mais de 500 metros",
                            deu: "Kann nicht mehr als 500 Meter gehen"
                        },
                        {
                            ita: "Non riesce a camminare per più di 100 metri",
                            eng: "Cannot walk more than 100 meters",
                            esp: "No puede caminar más de 100 metros",
                            fra: "Ne peut pas marcher plus de 100 mètres",
                            por: "Não consegue caminhar mais de 100 metros",
                            deu: "Kann nicht mehr als 100 Meter gehen"
                        },
                        {
                            ita: "Riesce a camminare solo con un supporto (bastone o stampelle)",
                            eng: "Can walk only with support (cane or crutches)",
                            esp: "Solo puede caminar con apoyo (bastón o muletas)",
                            fra: "Ne peut marcher qu'avec un support (cane ou béquilles)",
                            por: "Consegue caminhar apenas com suporte (bastão ou muletas)",
                            deu: "Kann nur mit Unterstützung (Stock oder Krücken) gehen"
                        },
                        {
                            ita: "Sta per lo più a letto e si trascina per andare in bagno",
                            eng: "Mostly stays in bed and drags to the bathroom",
                            esp: "Principalmente se queda en la cama y se arrastra al baño",
                            fra: "Reste principalement au lit et se traîne jusqu'aux toilettes",
                            por: "Fica principalmente na cama e se arrasta para ir ao banheiro",
                            deu: "Verbringt die meiste Zeit im Bett und zieht sich ins Bad"
                        }
                    ]
                },
                {
                    t: "r",
                    d: {
                        ita: "Stare seduto",
                        eng: "Sitting",
                        esp: "Sentado",
                        fra: "Assis",
                        por: "Sentado",
                        deu: "Sitzend"
                    },
                    l: [
                        {
                            ita: "Sta seduto su qualsiasi sedia senza problemi",
                            eng: "Sits on any chair without problems",
                            esp: "Se sienta en cualquier silla sin problemas",
                            fra: "S'assoit sur n'importe quelle chaise sans problème",
                            por: "Senta-se em qualquer cadeira sem problemas",
                            deu: "Sitzt auf jedem Stuhl ohne Probleme"
                        },
                        {
                            ita: "Sta seduto senza problemi sulla sedia preferita",
                            eng: "Sits comfortably in their preferred chair",
                            esp: "Se sienta cómodamente en su silla favorita",
                            fra: "S'assoit confortablement sur sa chaise préférée",
                            por: "Senta-se confortavelmente na sua cadeira favorita",
                            deu: "Sitzt bequem in seinem Lieblingsstuhl"
                        },
                        {
                            ita: "Non riesce a stare seduto per più di un'ora",
                            eng: "Cannot sit for more than one hour",
                            esp: "No puede estar sentado más de una hora",
                            fra: "Ne peut pas rester assis plus d'une heure",
                            por: "Não consegue ficar sentado por mais de uma hora",
                            deu: "Kann nicht länger als eine Stunde sitzen"
                        },
                        {
                            ita: "Non riesce a stare seduto per più di mezz'ora",
                            eng: "Cannot sit for more than half an hour",
                            esp: "No puede estar sentado más de media hora",
                            fra: "Ne peut pas rester assis plus de trente minutes",
                            por: "Não consegue ficar sentado por mais de meia hora",
                            deu: "Kann nicht länger als eine halbe Stunde sitzen"
                        },
                        {
                            ita: "Non riesce a stare seduto per più di 10 minuti",
                            eng: "Cannot sit for more than 10 minutes",
                            esp: "No puede estar sentado más de 10 minutos",
                            fra: "Ne peut pas rester assis plus de dix minutes",
                            por: "Não consegue ficar sentado por mais de 10 minutos",
                            deu: "Kann nicht länger als zehn Minuten sitzen"
                        },
                        {
                            ita: "Il dolore impedisce del tutto di stare seduto",
                            eng: "Pain completely prevents sitting",
                            esp: "El dolor impide completamente sentarse",
                            fra: "La douleur empêche complètement de s'asseoir",
                            por: "A dor impede completamente de sentar-se",
                            deu: "Schmerzen hindern ihn vollständig daran, zu sitzen"
                        }
                    ]
                },
                {
                    t: "r",
                    d: {
                        ita: "Stare in piedi",
                        eng: "Standing",
                        esp: "De pie",
                        fra: "Debout",
                        por: "De pé",
                        deu: "Stehen"
                    },
                    l: [
                        {
                            ita: "Sta in piedi per tutto il tempo desiderato senza problemi",
                            eng: "Stands for as long as desired without issues",
                            esp: "Se mantiene de pie todo el tiempo que desea sin problemas",
                            fra: "Reste debout aussi longtemps qu'il le souhaite sans problème",
                            por: "Fica em pé o tempo que desejar sem problemas",
                            deu: "Steht so lange, wie er möchte, ohne Probleme"
                        },
                        {
                            ita: "Sta in piedi per tutto il tempo desiderato, ma accusando dolore",
                            eng: "Stands for as long as desired, but with pain",
                            esp: "Se mantiene de pie todo el tiempo que desea, pero con dolor",
                            fra: "Reste debout aussi longtemps qu'il le souhaite, mais avec douleur",
                            por: "Fica em pé o tempo que desejar, mas com dor",
                            deu: "Steht so lange, wie er möchte, aber mit Schmerz"
                        },
                        {
                            ita: "Non riesce a stare in piedi per più di un'ora",
                            eng: "Cannot stand for more than one hour",
                            esp: "No puede estar de pie más de una hora",
                            fra: "Ne peut pas rester debout plus d'une heure",
                            por: "Não consegue ficar em pé por mais de uma hora",
                            deu: "Kann nicht länger als eine Stunde stehen"
                        },
                        {
                            ita: "Non riesce a stare in piedi per più di mezz'ora",
                            eng: "Cannot stand for more than half an hour",
                            esp: "No puede estar de pie más de media hora",
                            fra: "Ne peut pas rester debout plus de trente minutes",
                            por: "Não consegue ficar em pé por mais de meia hora",
                            deu: "Kann nicht länger als eine halbe Stunde stehen"
                        },
                        {
                            ita: "Non riesce a stare in piedi per più di 10 minuti",
                            eng: "Cannot stand for more than 10 minutes",
                            esp: "No puede estar de pie más de 10 minutos",
                            fra: "Ne peut pas rester debout plus de dix minutes",
                            por: "Não consegue ficar em pé por mais de 10 minutos",
                            deu: "Kann nicht länger als zehn Minuten stehen"
                        },
                        {
                            ita: "Il dolore impedisce del tutto di stare in piedi",
                            eng: "Pain completely prevents standing",
                            esp: "El dolor impide completamente estar de pie",
                            fra: "La douleur empêche complètement de rester debout",
                            por: "A dor impede completamente de ficar em pé",
                            deu: "Schmerzen hindern ihn vollständig daran, zu stehen"
                        }
                    ]
                },
                {
                    t: "r",
                    d: {
                        ita: "Dormire",
                        eng: "Sleeping",
                        esp: "Durmiendo",
                        fra: "Dormir",
                        por: "Dormindo",
                        deu: "Schlafen"
                    },
                    l: [
                        {
                            ita: "Il dolore non disturba mai il sonno",
                            eng: "Pain never disturbs sleep",
                            esp: "El dolor nunca interfiere con el sueño",
                            fra: "La douleur ne dérange jamais le sommeil",
                            por: "A dor nunca atrapalha o sono",
                            deu: "Schmerzen stören nie den Schlaf"
                        },
                        {
                            ita: "Il dolore disturba il sonno ogni tanto",
                            eng: "Pain occasionally disturbs sleep",
                            esp: "El dolor interfiere con el sueño de vez en cuando",
                            fra: "La douleur dérange le sommeil de temps en temps",
                            por: "A dor atrapalha o sono de vez em quando",
                            deu: "Schmerzen stören gelegentlich den Schlaf"
                        },
                        {
                            ita: "Dorme meno di 6 ore a causa del dolore",
                            eng: "Sleeps less than 6 hours due to pain",
                            esp: "Duerme menos de 6 horas debido al dolor",
                            fra: "Dort moins de 6 heures à cause de la douleur",
                            por: "Dorme menos de 6 horas devido à dor",
                            deu: "Schläft wegen Schmerzen weniger als 6 Stunden"
                        },
                        {
                            ita: "Dorme meno di 4 ore a causa del dolore",
                            eng: "Sleeps less than 4 hours due to pain",
                            esp: "Duerme menos de 4 horas debido al dolor",
                            fra: "Dort moins de 4 heures à cause de la douleur",
                            por: "Dorme menos de 4 horas devido à dor",
                            deu: "Schläft wegen Schmerzen weniger als 4 Stunden"
                        },
                        {
                            ita: "Dorme meno di 2 ore a causa del dolore",
                            eng: "Sleeps less than 2 hours due to pain",
                            esp: "Duerme menos de 2 horas debido al dolor",
                            fra: "Dort moins de 2 heures à cause de la douleur",
                            por: "Dorme menos de 2 horas devido à dor",
                            deu: "Schläft wegen Schmerzen weniger als 2 Stunden"
                        },
                        {
                            ita: "Il dolore impedisce del tutto di dormire",
                            eng: "Pain completely prevents sleeping",
                            esp: "El dolor impide completamente dormir",
                            fra: "La douleur empêche complètement de dormir",
                            por: "A dor impede completamente de dormir",
                            deu: "Schmerzen hindern ihn vollständig daran, zu schlafen"
                        }
                    ]
                },
                {
                    t: "r",
                    d: {
                        ita: "Attività sessuale",
                        eng: "Sexual activity",
                        esp: "Actividad sexual",
                        fra: "Activité sexuelle",
                        por: "Atividade sexual",
                        deu: "Sexuelle Aktivität"
                    },
                    l: [
                        {
                            ita: "Il dolore non disturba l'attività sessuale",
                            eng: "Pain does not disturb sexual activity",
                            esp: "El dolor no interfiere con la actividad sexual",
                            fra: "La douleur ne dérange pas l'activité sexuelle",
                            por: "A dor não atrapalha a atividade sexual",
                            deu: "Schmerzen stören die sexuelle Aktivität nicht"
                        },
                        {
                            ita: "Durante l'attività sessuale accusa dolore",
                            eng: "Experiences pain during sexual activity",
                            esp: "Siente dolor durante la actividad sexual",
                            fra: "Ressent de la douleur pendant l'activité sexuelle",
                            por: "Sente dor durante a atividade sexual",
                            deu: "Hat Schmerzen während der sexuellen Aktivität"
                        },
                        {
                            ita: "Durante l'attività sessuale accusa molto dolore",
                            eng: "Experiences a lot of pain during sexual activity",
                            esp: "Siente mucho dolor durante la actividad sexual",
                            fra: "Ressent beaucoup de douleur pendant l'activité sexuelle",
                            por: "Sente muita dor durante a atividade sexual",
                            deu: "Hat während der sexuellen Aktivität sehr starke Schmerzen"
                        },
                        {
                            ita: "L'attività è molto limitata dal dolore",
                            eng: "Activity is greatly limited by pain",
                            esp: "La actividad está muy limitada por el dolor",
                            fra: "L'activité est fortement limitée par la douleur",
                            por: "A atividade é muito limitada pela dor",
                            deu: "Die Aktivität ist stark durch Schmerzen eingeschränkt"
                        },
                        {
                            ita: "Il dolore impedisce quasi l'attività sessuale",
                            eng: "Pain almost prevents sexual activity",
                            esp: "El dolor casi impide la actividad sexual",
                            fra: "La douleur empêche presque l'activité sexuelle",
                            por: "A dor quase impede a atividade sexual",
                            deu: "Schmerzen verhindern fast die sexuelle Aktivität"
                        },
                        {
                            ita: "Il dolore impedisce del tutto l'attività sessuale",
                            eng: "Pain completely prevents sexual activity",
                            esp: "El dolor impide completamente la actividad sexual",
                            fra: "La douleur empêche complètement l'activité sexuelle",
                            por: "A dor impede completamente a atividade sexual",
                            deu: "Schmerzen hindern ihn vollständig daran, sexuelle Aktivitäten durchzuführen"
                        }
                    ]
                },
                {
                    t: "r",
                    d: {
                        ita: "Vita sociale",
                        eng: "Social life",
                        esp: "Vida social",
                        fra: "Vie sociale",
                        por: "Vida social",
                        deu: "Soziales Leben"
                    },
                    l: [
                        {
                            ita: "La vita sociale non è disturbata dal dolore",
                            eng: "Social life is not disturbed by pain",
                            esp: "La vida social no se ve perturbada por el dolor",
                            fra: "La vie sociale n'est pas perturbée par la douleur",
                            por: "A vida social não é afetada pela dor",
                            deu: "Das soziale Leben wird nicht durch Schmerzen gestört"
                        },
                        {
                            ita: "La vita sociale è normale ma accusa dolore",
                            eng: "Social life is normal but has pain",
                            esp: "La vida social es normal pero siente dolor",
                            fra: "La vie sociale est normale mais ressent de la douleur",
                            por: "A vida social é normal, mas sente dor",
                            deu: "Das soziale Leben ist normal, hat aber Schmerzen"
                        },
                        {
                            ita: "Solo alcune attività che richiedono più energie vengono limitate dal dolore",
                            eng: "Only some activities that require more energy are limited by pain",
                            esp: "Solo algunas actividades que requieren más energía están limitadas por el dolor",
                            fra: "Seules quelques activités nécessitant plus d'énergie sont limitées par la douleur",
                            por: "Apenas algumas atividades que requerem mais energia são limitadas pela dor",
                            deu: "Nur einige Aktivitäten, die mehr Energie erfordern, werden durch Schmerzen eingeschränkt"
                        },
                        {
                            ita: "Il dolore limita la vita sociale e non esce quanto vorrebbe",
                            eng: "Pain limits social life and does not go out as much as wanted",
                            esp: "El dolor limita la vida social y no sale tanto como quisiera",
                            fra: "La douleur limite la vie sociale et ne sort pas autant qu'il le souhaiterait",
                            por: "A dor limita a vida social e não sai tanto quanto gostaria",
                            deu: "Schmerzen schränken das soziale Leben ein und er kann nicht so oft ausgehen, wie er möchte"
                        },
                        {
                            ita: "Il dolore limita la vita sociale all'ambiente domestico",
                            eng: "Pain limits social life to the home environment",
                            esp: "El dolor limita la vida social al entorno doméstico",
                            fra: "La douleur limite la vie sociale à l'environnement domestique",
                            por: "A dor limita a vida social ao ambiente doméstico",
                            deu: "Schmerzen schränken das soziale Leben auf das häusliche Umfeld ein"
                        },
                        {
                            ita: "Il dolore limita totalmente la vita sociale",
                            eng: "Pain completely limits social life",
                            esp: "El dolor limita completamente la vida social",
                            fra: "La douleur limite complètement la vie sociale",
                            por: "A dor limita totalmente a vida social",
                            deu: "Schmerzen schränken das soziale Leben vollständig ein"
                        }
                    ]
                },
                {
                    t: "r",
                    d: {
                        ita: "Viaggiare",
                        eng: "Traveling",
                        esp: "Viajar",
                        fra: "Voyager",
                        por: "Viajando",
                        deu: "Reisen"
                    },
                    l: [
                        {
                            ita: "Riesce a viaggiare senza accusare dolore",
                            eng: "Can travel without feeling pain",
                            esp: "Puede viajar sin sentir dolor",
                            fra: "Peut voyager sans ressentir de douleur",
                            por: "Consegue viajar sem sentir dor",
                            deu: "Kann reisen, ohne Schmerzen zu empfinden"
                        },
                        {
                            ita: "Riesce a viaggiare ma accusa dolore",
                            eng: "Can travel but feels pain",
                            esp: "Puede viajar pero siente dolor",
                            fra: "Peut voyager mais ressent de la douleur",
                            por: "Consegue viajar, mas sente dor",
                            deu: "Kann reisen, fühlt aber Schmerzen"
                        },
                        {
                            ita: "Nonostante il dolore riesce a viaggiare per più di 2 ore",
                            eng: "Can travel for more than 2 hours despite the pain",
                            esp: "A pesar del dolor, puede viajar durante más de 2 horas",
                            fra: "Peut voyager plus de 2 heures malgré la douleur",
                            por: "Apesar da dor, consegue viajar por mais de 2 horas",
                            deu: "Kann trotz Schmerzen mehr als 2 Stunden reisen"
                        },
                        {
                            ita: "Il dolore non consente di viaggiare per più di un'ora",
                            eng: "Pain does not allow traveling for more than one hour",
                            esp: "El dolor no permite viajar más de una hora",
                            fra: "La douleur ne permet pas de voyager plus d'une heure",
                            por: "A dor não permite viajar por mais de uma hora",
                            deu: "Schmerzen erlauben es nicht, mehr als eine Stunde zu reisen"
                        },
                        {
                            ita: "Il dolore limita i viaggi a quelli necessari e di meno di 30 minuti",
                            eng: "Pain limits travel to necessary trips of less than 30 minutes",
                            esp: "El dolor limita los viajes a aquellos necesarios y de menos de 30 minutos",
                            fra: "La douleur limite les voyages à ceux nécessaires et de moins de 30 minutes",
                            por: "A dor limita as viagens às necessárias e de menos de 30 minutos",
                            deu: "Schmerzen beschränken Reisen auf notwendige Reisen von weniger als 30 Minuten"
                        },
                        {
                            ita: "Il dolore impedisce di viaggiare se non per le cure necessarie",
                            eng: "Pain prevents traveling except for necessary medical care",
                            esp: "El dolor impide viajar, excepto para cuidados médicos necesarios",
                            fra: "La douleur empêche de voyager sauf pour des soins médicaux nécessaires",
                            por: "A dor impede viajar, exceto para cuidados médicos necessários",
                            deu: "Schmerzen hindern daran zu reisen, es sei denn, es handelt sich um notwendige medizinische Versorgung"
                        }
                    ]
                },
                {
                    t: "e",
                    d: {
                        ita: "Risultato del test",
                        eng: "Test result",
                        esp: "Resultado del test",
                        fra: "Résultat du test",
                        por: "Resultado do teste",
                        deu: "Testergebnis"
                    },
                    h: true
                },
                {
                    t: "t",
                    d: {
                        ita: "Minima disabilità",
                        eng: "Minimal disability",
                        esp: "Discapacidad mínima",
                        fra: "Handicap minimal",
                        por: "Deficiência mínima",
                        deu: "Minimale Behinderung"
                    },
                    h: true
                },
                {
                    t: "t",
                    d: {
                        ita: "Moderata disabilità",
                        eng: "Moderate disability",
                        esp: "Discapacidad moderada",
                        fra: "Handicap modéré",
                        por: "Deficiência moderada",
                        deu: "Mäßige Behinderung"
                    },
                    h: true
                },
                {
                    t: "t",
                    d: {
                        ita: "Severa disabilità",
                        eng: "Severe disability",
                        esp: "Discapacidad severa",
                        fra: "Handicap sévère",
                        por: "Deficiência severa",
                        deu: "Schwere Behinderung"
                    },
                    h: true
                },
                {
                    t: "t",
                    d: {
                        ita: "Grave disabilità",
                        eng: "Profound disability",
                        esp: "Discapacidad grave",
                        fra: "Handicap grave",
                        por: "Deficiência grave",
                        deu: "Schwerste Behinderung"
                    },
                    h: true
                },
                {
                    t: "t",
                    d: {
                        ita: "Completa disabilità",
                        eng: "Total disability",
                        esp: "Discapacidad total",
                        fra: "Handicap total",
                        por: "Deficiência total",
                        deu: "Vollständige Behinderung"
                    },
                    h: true
                }                
            ],
            html:   '<div id="moduloODI">' +
                    '   <div class="md_dida">[0]</div>' +
                    '   <div id="odi_lists">' +
                    '       <div class="odi_sez" id="odi_sez01">[1,d][1,0][1,1][1,2][1,3][1,4][1,5]</div>' +
                    '       <div class="odi_sez" id="odi_sez02">[2,d][2,0][2,1][2,2][2,3][2,4][2,5]</div>' +
                    '       <div class="odi_sez" id="odi_sez03">[3,d][3,0][3,1][3,2][3,3][3,4][3,5]</div>' +
                    '       <div class="odi_sez" id="odi_sez04">[4,d][4,0][4,1][4,2][4,3][4,4][4,5]</div>' +
                    '       <div class="odi_sez" id="odi_sez05">[5,d][5,0][5,1][5,2][5,3][5,4][5,5]</div>' +
                    '       <div class="odi_sez" id="odi_sez06">[6,d][6,0][6,1][6,2][6,3][6,4][6,5]</div>' +
                    '       <div class="odi_sez" id="odi_sez07">[7,d][7,0][7,1][7,2][7,3][7,4][7,5]</div>' +
                    '       <div class="odi_sez" id="odi_sez08">[8,d][8,0][8,1][8,2][8,3][8,4][8,5]</div>' +
                    '       <div class="odi_sez" id="odi_sez09">[9,d][9,0][9,1][9,2][9,3][9,4][9,5]</div>' +
                    '       <div class="odi_sez" id="odi_sez10">[10,d][10,0][10,1][10,2][10,3][10,4][10,5]</div>' +
                    '   </div>' +
                    '   <div class="md_cont_total largo">' +
                    '       <div class="md_label_total">[11]</div>' +
                    '       <div id="odi_total" class="md_total">' +
                    '           <span id="odi_ris_1">[12]</span>' +
                    '           <span id="odi_ris_2">[13]</span>' +
                    '           <span id="odi_ris_3">[14]</span>' +
                    '           <span id="odi_ris_4">[15]</span>' +
                    '           <span id="odi_ris_5">[16]</span>' +
                    '       </div>' +
                    '   </div>' +
                    '</div>',
            funct: function(){
                // aggiorno il totale dei valori
                let tot = 0,
                    sezs = document.getElementById("moduloODI").getElementsByClassName("odi_sez"),
                    cmpls = 0;
                    html = '';
                for(let s=0;s<sezs.length;s++){
                    let els = sezs[s].getElementsByTagName("INPUT");
                    for(let e=0;e<els.length;e++){
                        if(els[e].checked){
                            tot += e;
                            cmpls++;
                        }
                    }
                }
                if(cmpls>=9){
                    let max = cmpls*5,
                        perc = (tot/max)*100;
                    for(let o=1;o<=5;o++)document.getElementById("odi_total").classList.remove("odi_ris"+o);
                    if(perc<=20)document.getElementById("odi_total").classList.add("odi_ris1");
                    if(perc>20 && perc<=40)document.getElementById("odi_total").classList.add("odi_ris2");
                    if(perc>40 && perc<=60)document.getElementById("odi_total").classList.add("odi_ris3");
                    if(perc>60 && perc<=80)document.getElementById("odi_total").classList.add("odi_ris4");
                    if(perc>80)document.getElementById("odi_total").classList.add("odi_ris5");
                }
                
            }
        },
        bpi: {
            category: "pain",
            title: {
                ita: "Brief Pain Inventory (BPI)",
                eng: "Brief Pain Inventory (BPI)",
                esp: "Brief Pain Inventory (BPI)",
                fra: "Brief Pain Inventory (BPI)",
                por: "Brief Pain Inventory (BPI)",
                deu: "Brief Pain Inventory (BPI)"
            },
            data: [
                {
                    t: "t",
                    d: {
                        ita: "La Brief Pain Inventory (BPI) è uno strumento utilizzato per misurare l'intensità del dolore e l'impatto che il dolore ha sulla vita quotidiana del paziente. Originariamente sviluppato per i pazienti oncologici, è ampiamente utilizzato anche per altre condizioni dolorose croniche. Il BPI consente ai medici di comprendere non solo la gravità del dolore, ma anche come esso interferisce con diverse aree funzionali.",
                        eng: "The Brief Pain Inventory (BPI) is a tool used to measure pain intensity and the impact that pain has on a patient's daily life. Originally developed for cancer patients, it is widely used for other chronic pain conditions as well. The BPI allows healthcare providers to understand not only the severity of pain but also how it interferes with various functional areas.",
                        esp: "El Inventario Breve de Dolor (BPI) es una herramienta utilizada para medir la intensidad del dolor y el impacto que el dolor tiene en la vida diaria del paciente. Originalmente desarrollado para pacientes con cáncer, también se utiliza ampliamente para otras condiciones de dolor crónico. El BPI permite a los proveedores de atención médica comprender no solo la gravedad del dolor, sino también cómo interfiere con diversas áreas funcionales.",
                        fra: "L'Inventaire de la douleur abrégé (BPI) est un outil utilisé pour mesurer l'intensité de la douleur et l'impact que la douleur a sur la vie quotidienne du patient. À l'origine développé pour les patients atteints de cancer, il est également largement utilisé pour d'autres affections douloureuses chroniques. Le BPI permet aux professionnels de santé de comprendre non seulement la gravité de la douleur, mais aussi comment elle interfère avec différentes zones fonctionnelles.",
                        por: "O Inventário Breve da Dor (BPI) é uma ferramenta usada para medir a intensidade da dor e o impacto que a dor tem na vida diária do paciente. Originalmente desenvolvido para pacientes com câncer, é amplamente utilizado também para outras condições de dor crônica. O BPI permite que os profissionais de saúde compreendam não apenas a gravidade da dor, mas também como ela interfere em várias áreas funcionais.",
                        deu: "Das Brief Pain Inventory (BPI) ist ein Instrument zur Messung der Schmerzintensität und der Auswirkungen, die der Schmerz auf das tägliche Leben des Patienten hat. Ursprünglich für Krebspatienten entwickelt, wird es auch häufig für andere chronische Schmerzzustände verwendet. Das BPI ermöglicht es den Gesundheitsdienstleistern, nicht nur die Schwere des Schmerzes zu verstehen, sondern auch, wie dieser in verschiedenen Funktionsbereichen interferiert."
                    }
                },
                {
                    t: "e",
                    d: {
                        ita: "Valutazione dell'intensità del dolore",
                        eng: "Pain intensity assessment",
                        esp: "Evaluación de la intensidad del dolor",
                        fra: "Évaluation de l'intensité de la douleur",
                        por: "Avaliação da intensidade da dor",
                        deu: "Schmerzmessung"
                    }
                },
                {
                    t: "s",
                    d: {
                        ita: "Il più forte nelle ultime 24 ore",
                        eng: "The worst in the last 24 hours",
                        esp: "El más fuerte en las últimas 24 horas",
                        fra: "Le plus fort au cours des dernières 24 heures",
                        por: "O mais forte nas últimas 24 horas",
                        deu: "Der stärkste Schmerz in den letzten 24 Stunden"
                    },
                    l: "rates"
                },
                {
                    t: "s",
                    d: {
                        ita: "Il più lieve nelle ultime 24 ore",
                        eng: "The mildest in the last 24 hours",
                        esp: "El más leve en las últimas 24 horas",
                        fra: "Le plus léger au cours des dernières 24 heures",
                        por: "O mais leve nas últimas 24 horas",
                        deu: "Der mildeste Schmerz in den letzten 24 Stunden"
                    },
                    l: "rates"
                },
                {
                    t: "s",
                    d: {
                        ita: "Intensità media nelle ultime 24 ore",
                        eng: "Average intensity in the last 24 hours",
                        esp: "Intensidad media en las últimas 24 horas",
                        fra: "Intensité moyenne au cours des dernières 24 heures",
                        por: "Intensidade média nas últimas 24 horas",
                        deu: "Durchschnittliche Intensität in den letzten 24 Stunden"
                    },
                    l: "rates"
                },
                {
                    t: "s",
                    d: {
                        ita: "Quantità di dolore in questo momento",
                        eng: "Amount of pain right now",
                        esp: "Cantidad de dolor en este momento",
                        fra: "Quantité de douleur en ce moment",
                        por: "Quantidade de dor neste momento",
                        deu: "Schmerzmenge gerade jetzt"
                    },
                    l: "rates"
                },
                {
                    t: "e",
                    d: {
                        ita: "Localizzazione del dolore",
                        eng: "Location of pain",
                        esp: "Localización del dolor",
                        fra: "Localisation de la douleur",
                        por: "Localização da dor",
                        deu: "Schmerzlokalisierung"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Localizzazione",
                        eng: "Location",
                        esp: "Localización",
                        fra: "Localisation",
                        por: "Localização",
                        deu: "Standort"
                    }
                },
                {
                    t: "e",
                    d: {
                        ita: "Impatto del dolore sulle attività quotidiane",
                        eng: "Impact of pain on daily activities",
                        esp: "Impacto del dolor en las actividades diarias",
                        fra: "Impact de la douleur sur les activités quotidiennes",
                        por: "Impacto da dor nas atividades diárias",
                        deu: "Auswirkungen von Schmerz auf tägliche Aktivitäten"
                    }
                },
                {
                    t: "s",
                    d: {
                        ita: "Attività generali",
                        eng: "General activities",
                        esp: "Actividades generales",
                        fra: "Activités générales",
                        por: "Atividades gerais",
                        deu: "Allgemeine Aktivitäten"
                    },
                    l: "rates"
                },
                {
                    t: "s",
                    d: {
                        ita: "Umore",
                        eng: "Mood",
                        esp: "Estado de ánimo",
                        fra: "Humeur",
                        por: "Humor",
                        deu: "Stimmung"
                    },
                    l: "rates"
                },
                {
                    t: "s",
                    d: {
                        ita: "Capacità di camminare o muoversi",
                        eng: "Ability to walk or move",
                        esp: "Capacidad para caminar o moverse",
                        fra: "Capacité à marcher ou à bouger",
                        por: "Capacidade de andar ou se mover",
                        deu: "Fähigkeit zu gehen oder sich zu bewegen"
                    },
                    l: "rates"
                },
                {
                    t: "s",
                    d: {
                        ita: "Lavoro o attività scolastiche",
                        eng: "Work or school activities",
                        esp: "Trabajo o actividades escolares",
                        fra: "Travail ou activités scolaires",
                        por: "Trabalho ou atividades escolares",
                        deu: "Arbeit oder Schulaktivitäten"
                    },
                    l: "rates"
                },
                {
                    t: "s",
                    d: {
                        ita: "Relazioni personali",
                        eng: "Personal relationships",
                        esp: "Relaciones personales",
                        fra: "Relations personnelles",
                        por: "Relações pessoais",
                        deu: "Persönliche Beziehungen"
                    },
                    l: "rates"
                },
                {
                    t: "s",
                    d: {
                        ita: "Sonno",
                        eng: "Sleep",
                        esp: "Sueño",
                        fra: "Sommeil",
                        por: "Sono",
                        deu: "Schlaf"
                    },
                    l: "rates"
                },
                {
                    t: "s",
                    d: {
                        ita: "Provare piacere o godersi la vita",
                        eng: "Enjoying life or having fun",
                        esp: "Disfrutar de la vida o divertirse",
                        fra: "Profiter de la vie ou s'amuser",
                        por: "Aproveitar a vida ou divertir-se",
                        deu: "Das Leben genießen oder Spaß haben"
                    },
                    l: "rates"
                },
                {
                    t: "e",
                    d: {
                        ita: "Terapie o farmaci",
                        eng: "Therapies or medications",
                        esp: "Terapias o medicamentos",
                        fra: "Thérapies ou de médicaments",
                        por: "Terapias ou medicamentos",
                        deu: "Therapien oder Medikamenten"
                    }
                },
                {
                    t: "d",
                    d: {
                        ita: "Terapie o farmaci assunti nelle ultime 24 ore",
                        eng: "Therapies or medications taken in the last 24 hours",
                        esp: "Terapias o medicamentos tomados en las últimas 24 horas",
                        fra: "Thérapies ou médicaments pris au cours des dernières 24 heures",
                        por: "Terapias ou medicamentos tomados nas últimas 24 horas",
                        deu: "In den letzten 24 Stunden eingenommene Therapien oder Medikamente"
                    }
                },
                {
                    t: "s",
                    d: {
                        ita: "Sollievo avuto",
                        eng: "Relief obtained",
                        esp: "Alivio obtenido",
                        fra: "Soulagement obtenu",
                        por: "Alívio obtido",
                        deu: "Erzielte Erleichterung"
                    },
                    l: "rates_perc"
                },
                {
                    t: "e",
                    d: {
                        ita: "Risultato del test",
                        eng: "Test result",
                        esp: "Resultado del test",
                        fra: "Résultat du test",
                        por: "Resultado do teste",
                        deu: "Testergebnis"
                    },
                    h: true
                }
            ],
            html:   '<div id="moduloBPI">' +
                    '   <div class="md_dida">[0]</div>' +
                    '   <div id="bpi_lists" class="md_lists">' +
                    '       <div id="bpi_intensita">[1][2][3][4][5]</div>' +
                    '       <div id="bpi_impatto">[8][9][10][11][12][13][14][15]</div>' +
                    '       <div id="bpi_farmaci">[16][17][18]</div>' +
                    '       <div id="bpi_localizzazione">[6][7]</div>' +
                    '   </div>' +
                    '   <div class="md_cont_total">' +
                    '       <div class="md_label_total">[19]</div>' +
                    '       <div id="bpi_total" class="md_total">' +
                    '           <div><span id="bpi_ris_intensita"></span></div>' +
                    '           <div><span id="bpi_ris_impatto"></span></div>' +
                    '       </div>' +
                    '   </div>' +
                    '</div>',
            funct: function(){
                // aggiorno il totale dei valori
                let tot = 0,
                    totIntensita = 0,
                    totImpatto = 0,
                    nIntensita = 0,
                    nImpatto = 0,
                    mediaIntensita = 0,
                    mediaImpatto = 0,
                    risIntensita = 0,
                    risImpatto = 0,
                    els = document.getElementById("bpi_intensita").getElementsByTagName("SELECT"),
                    htmlIntensita = '-',
                    htmlImpatto = '-';
                for(let e=0;e<els.length;e++){
                    if(els[e].selectedIndex>0){
                        totIntensita += els[e].selectedIndex-1;
                        nIntensita++;
                    }
                }
                els = document.getElementById("bpi_impatto").getElementsByTagName("SELECT");
                for(let e=0;e<els.length;e++){
                    if(els[e].selectedIndex>0){
                        totImpatto += els[e].selectedIndex-1;
                        nImpatto++;
                    }
                }
                mediaIntensita = parseInt(totIntensita/nIntensita);
                if(mediaIntensita<2)risIntensita = 0;
                if(mediaIntensita>=2 && mediaIntensita<5)risIntensita = 1;
                if(mediaIntensita>=5 && mediaIntensita<8)risIntensita = 2;
                if(mediaIntensita>=8)risIntensita = 3;
                if(nIntensita)htmlIntensita = moduliValutazione.liste.ris_intensita[risIntensita][globals.siglaLingua];
                mediaImpatto = parseInt(totImpatto/nImpatto);
                if(mediaImpatto<2)risImpatto = 0;
                if(mediaImpatto>=2 && mediaImpatto<5)risImpatto = 1;
                if(mediaImpatto>=5 && mediaImpatto<8)risImpatto = 2;
                if(mediaImpatto>=8)risImpatto = 3;
                if(nImpatto)htmlImpatto = moduliValutazione.liste.ris_impatto[risImpatto][globals.siglaLingua];
                document.getElementById("bpi_ris_intensita").innerHTML = htmlIntensita;
                document.getElementById("bpi_ris_impatto").innerHTML = htmlImpatto;
                
            }
        },
        mondor: {
            category: "auriculo",
            title: {
                ita: "Test antitabacco di Mondor (motivazione)",
                eng: "Mondor Anti-Smoking Test (motivation)",
                esp: "Prueba antitabaco de Mondor (motivación)",
                fra: "Test anti-tabac de Mondor (motivation)",
                por: "Teste Antifumo de Mondor (motivação)",
                deu: "Mondor-Anti-Raucher-Test (Motivation) "
            },
            data: [
                {
                    t: "t",
                    d: {
                        ita: "Questo test è utile a valutare il livello di motivazione a smettere di fumare.",
                        eng: "This test is useful to assess the level of motivation to quit smoking.",
                        esp: "Esta prueba es útil para evaluar el nivel de motivación para dejar de fumar.",
                        fra: "Ce test est utile pour évaluer le niveau de motivation à arrêter de fumer.",
                        por: "Este teste é útil para avaliar o nível de motivação para parar de fumar.",
                        deu: "Dieser Test ist nützlich, um den Grad der Motivation, mit dem Rauchen aufzuhören, zu beurteilen."
                    }
                },
                {
                    t: "s",
                    d: {
                        ita: "Ho deciso di presentarmi spontaneamente",
                        eng: "I have decided to undergo spontaneously",
                        esp: "Decidí presentarme voluntariamente",
                        fra: "J'ai décidé de subir spontanément",
                        por: "Eu decidi me submeter espontaneamente",
                        deu: "Ich habe mich spontan dazu entschieden, mich zu unterziehen"
                    },
                    l: "si_no"
                },
                {
                    t: "s",
                    d: {
                        ita: "Ho già smesso di fumare per più di una settimana",
                        eng: "I have already quit smoking for more than a week",
                        esp: "Ya dejé de fumar por más de una semana",
                        fra: "J'ai déjà arrêté de fumer depuis plus d'une semaine",
                        por: "Eu já parei de fumar por mais de uma semana",
                        deu: "Ich habe bereits seit mehr als einer Woche mit dem Rauchen aufgehört"
                    },
                    l: "si_no"
                },
                {
                    t: "s",
                    d: {
                        ita: "Attualmente non ho problemi sul lavoro",
                        eng: "Currently, I have no problems at work",
                        esp: "Actualmente no tengo problemas en el trabajo",
                        fra: "Actuellement, je n'ai aucun problème au travail",
                        por: "Atualmente, não tenho problemas no trabalho",
                        deu: "Derzeit habe ich keine Probleme bei der Arbeit"
                    },
                    l: "si_no"
                },
                {
                    t: "s",
                    d: {
                        ita: "Attualmente non ho problemi sul piano familiare",
                        eng: "Currently, I have no problems on the family front",
                        esp: "Actualmente no tengo problemas en el ámbito familiar",
                        fra: "Actuellement, je n'ai aucun problème sur le plan familial",
                        por: "Atualmente, não tenho problemas na frente familiar",
                        deu: "Derzeit habe ich keine familiären Probleme"
                    },
                    l: "si_no"
                },
                {
                    t: "s",
                    d: {
                        ita: "Mi voglio liberare da questa schiavitù",
                        eng: "I want to free myself from this addiction",
                        esp: "Quiero liberarme de esta esclavitud",
                        fra: "Je veux me libérer de cette dépendance",
                        por: "Eu quero me livrar desse vício",
                        deu: "Ich möchte mich von dieser Sucht befreien"
                    },
                    l: "si_no"
                },
                {
                    t: "s",
                    d: {
                        ita: "Pratico dello sport/ho intenzione di praticarlo",
                        eng: "I practice sports/have the intention to practice",
                        esp: "Practico deporte/tengo intención de practicarlo",
                        fra: "Je fais du sport/ai l'intention de pratiquer",
                        por: "Pratico esportes/tenho a intenção de praticar",
                        deu: "Ich treibe Sport/habe die Absicht, Sport zu treiben"
                    },
                    l: "si_no"
                },
                {
                    t: "s",
                    d: {
                        ita: "Voglio raggiungere una forma fisica migliore",
                        eng: "I want to improve my physical fitness",
                        esp: "Quiero alcanzar una mejor forma física",
                        fra: "Je veux améliorer ma condition physique",
                        por: "Quero melhorar meu condicionamento físico",
                        deu: "Ich möchte meine körperliche Fitness verbessern"
                    },
                    l: "si_no"
                },
                {
                    t: "s",
                    d: {
                        ita: "Voglio curare il mio aspetto fisico",
                        eng: "I want to take care of my physical appearance",
                        esp: "Quiero cuidar mi apariencia física",
                        fra: "Je veux prendre soin de mon apparence physique",
                        por: "Quero cuidar da minha aparência física",
                        deu: "Ich möchte auf mein äußeres Erscheinungsbild achten"
                    },
                    l: "si_no"
                },
                {
                    t: "s",
                    d: {
                        ita: "Sono incinta/Mia moglie è incinta",
                        eng: "I am pregnant/My wife is pregnant",
                        esp: "Estoy embarazada/Mi esposa está embarazada",
                        fra: "Je suis enceinte/Ma femme est enceinte",
                        por: "Estou grávida/minha esposa está grávida",
                        deu: "Ich bin schwanger/Meine Frau ist schwanger"
                    },
                    l: "si_no"
                },
                {
                    t: "s",
                    d: {
                        ita: "Ho dei bambini piccoli",
                        eng: "I have young children",
                        esp: "Tengo hijos pequeños",
                        fra: "J'ai de jeunes enfants",
                        por: "Eu tenho filhos pequenos",
                        deu: "Ich habe kleine Kinder"
                    },
                    l: "si_no"
                },
                {
                    t: "s",
                    d: {
                        ita: "Attualmente sono di buon umore",
                        eng: "Currently, I am in a good mood",
                        esp: "Actualmente estoy de buen humor",
                        fra: "Actuellement, je suis de bonne humeur",
                        por: "Atualmente, estou de bom humor",
                        deu: "Momentan bin ich gut gelaunt"
                    },
                    l: "si_no"
                },
                {
                    t: "s",
                    d: {
                        ita: "Di solito porto a termine quello che intraprendo",
                        eng: "I usually follow through on what I start",
                        esp: "Normalmente termino lo que comienzo",
                        fra: "Je suis généralement ce que je commence",
                        por: "Eu costumo seguir o que eu começo",
                        deu: "Normalerweise folge ich dem, was ich anfange"
                    },
                    l: "si_no"
                },
                {
                    t: "s",
                    d: {
                        ita: "Sono di temperamento calmo e disteso",
                        eng: "I have a calm and relaxed temperament",
                        esp: "Soy de temperamento tranquilo y relajado",
                        fra: "J'ai un tempérament calme et détendu",
                        por: "Eu tenho um temperamento calmo e relaxado",
                        deu: "Ich habe ein ruhiges und entspanntes Temperament"
                    },
                    l: "si_no"
                },
                {
                    t: "s",
                    d: {
                        ita: "Il mio peso è abitualmente stabile",
                        eng: "My weight is usually stable",
                        esp: "Mi peso suele mantenerse estable",
                        fra: "Mon poids est généralement stable",
                        por: "Meu peso geralmente é estável",
                        deu: "Mein Gewicht ist normalerweise stabil"
                    },
                    l: "si_no"
                },
                {
                    t: "s",
                    d: {
                        ita: "Voglio migliorare la qualità della mia vita",
                        eng: "I want to improve the quality of my life",
                        esp: "Quiero mejorar la calidad de mi vida",
                        fra: "Je veux améliorer ma qualité de vie",
                        por: "Quero melhorar a qualidade da minha vida",
                        deu: "Ich möchte meine Lebensqualität verbessern"
                    },
                    l: "si_no"
                },
                {
                    t: "e",
                    d: {
                        ita: "Risultato del test",
                        eng: "Test result",
                        esp: "Resultado del test",
                        fra: "Résultat du test",
                        por: "Resultado do teste",
                        deu: "Testergebnis"
                    },
                    h: true
                }
            ],
            html:   '<div id="moduloMONDOR">' +
                    '   <div class="md_dida">[0]</div>' +
                    '   <div id="mondor_lists" class="md_lists"><div>[1][2][3][4][5][6][7][8][9][10][11][12][13][14][15]</div></div>' +
                    '   <div class="md_cont_total largo">' +
                    '       <div class="md_label_total">[16]</div>' +
                    '       <div id="mondor_total" class="md_total"></div>' +
                    '   </div>' +
                    '</div>',
            funct: function(){
                // aggiorno il totale dei valori
                let tot = 0,
                    els = document.getElementById("moduloMONDOR").getElementsByTagName("select"),
                    vals = [2,1,1,1,2,1,1,1,2,2,1,1,1,1,1],
                    ris = -1,
                    html = '';
                for(let e=0;e<els.length;e++){
                    if(els[e].selectedIndex==1)tot += vals[e];
                }
                if(tot){
                    if(tot<6)ris = 0;
                    if(tot>=6 && tot<12)ris = 1;
                    if(tot>=12 && tot<16)ris = 2;
                    if(tot>=16)ris = 3;
                    for(let e in moduliValutazione.liste.ris_motivazione){
                        if(e == ris)html = moduliValutazione.liste.ris_motivazione[e][globals.siglaLingua]
                    }
                }
                document.getElementById("mondor_total").innerHTML = html;
            }
        },
        fagerstrom: {
            category: "auriculo",
            title: {
                ita: "Test antitabacco di Fagerström (dipendenza)",
                eng: "Fagerström Anti-Smoking Test (dependence)",
                esp: "Prueba antitabaco de Fagerström (dependencia)",
                fra: "Test anti-tabac de Fagerström (dépendance)",
                por: "Teste Antifumo de Fagerström (dependência)",
                deu: "Fagerström-Anti-Raucher-Test (Abhängigkeit) "
            },
            data: [
                {
                    t: "t",
                    d: {
                        ita: "Questo test è necessario per definire il grado di dipendenza dal fumo.",
                        eng: "This test is necessary to determine the degree of dependence on smoking.",
                        esp: "Esta prueba es necesaria para determinar el grado de dependencia del tabaco.",
                        fra: "Ce test est nécessaire pour déterminer le degré de dépendance au tabagisme.",
                        por: "Este teste é necessário para determinar o grau de dependência do tabagismo.",
                        deu: "Dieser Test ist notwendig, um den Grad der Rauchabhängigkeit festzustellen."
                    }
                },
                {
                    t: "s",
                    d: {
                        ita: "Quanto tempo dopo il risveglio accende la prima sigaretta?",
                        eng: "How soon after waking up do you smoke your first cigarette?",
                        esp: "¿Cuánto tiempo después de despertar enciende su primer cigarrillo?",
                        fra: "Combien de temps après le réveil fumez-vous votre première cigarette ?",
                        por: "Quanto tempo depois de acordar você fuma seu primeiro cigarro?",
                        deu: "Wie kurz nach dem Aufwachen rauchen Sie Ihre erste Zigarette?"
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
                            ita: "Entro 5 minuti",
                            eng: "Within 5 minutes",
                            esp: "En menos de 5 minutos",
                            fra: "Dans les 5 minutes",
                            por: "Dentro de 5 minutos",
                            deu: "Innerhalb von 5 Minuten"
                        },
                        {
                            ita: "Dopo 6-30 minuti",
                            eng: "After 6-30 minutes",
                            esp: "Después de 6-30 minutos",
                            fra: "Après 6-30 minutes",
                            por: "Após 6-30 minutos",
                            deu: "Nach 6-30 Minuten"
                        },
                        {
                            ita: "Dopo 31-60 minuti",
                            eng: "After 31-60 minutes",
                            esp: "Después de 31-60 minutos",
                            fra: "Après 31-60 minutes",
                            por: "Após 31-60 minutos",
                            deu: "Nach 31-60 Minuten"
                        },
                        {
                            ita: "Dopo 60 minuti",
                            eng: "After 60 minutes",
                            esp: "Después de 60 minutos",
                            fra: "Après 60 minutes",
                            por: "Após 60 minutos",
                            deu: "Nach 60 Minuten"
                        }
                    ]
                },
                {
                    t: "s",
                    d: {
                        ita: "Fa fatica a non fumare nei luoghi in cui è proibito?",
                        eng: "Do you have difficulty not smoking in places where it is prohibited?",
                        esp: "¿Le cuesta no fumar en lugares donde está prohibido?",
                        fra: "Vous avez de la difficulté à ne pas fumer dans les endroits où c'est interdit ?",
                        por: "Você tem dificuldade em não fumar em locais onde é proibido?",
                        deu: "Fällt es Ihnen schwer, an Orten, an denen es verboten ist, nicht zu rauchen?"
                    },
                    l: "si_no"
                },
                {
                    t: "s",
                    d: {
                        ita: "A quale sigaretta le costa di più rinunciare?",
                        eng: "Which cigarette would you find the hardest to give up?",
                        esp: "¿A qué cigarrillo le cuesta más renunciar?",
                        fra: "Quelle cigarette auriez-vous le plus de mal à abandonner?",
                        por: "Qual cigarro você acharia mais difícil de largar?",
                        deu: "Auf welche Zigarette würden Sie am schwersten verzichten?"
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
                            ita: "La prima del mattino",
                            eng: "The first one in the morning",
                            esp: "Al primero de la mañana",
                            fra: "Le premier du matin",
                            por: "A primeira da manhã",
                            deu: "Der Erste am Morgen"
                        },
                        {
                            ita: "Tutte le altre",
                            eng: "All the others",
                            esp: "A todos los demás",
                            fra: "Tous les autres",
                            por: "Todos os outros",
                            deu: "All die anderen"
                        }
                    ]
                },
                {
                    t: "s",
                    d: {
                        ita: "Quante sigarette fuma al giorno?",
                        eng: "How many cigarettes do you smoke per day?",
                        esp: "¿Cuántos cigarrillos fuma al día?",
                        fra: "Combien de cigarettes fumez-vous par jour ?",
                        por: "Quantos cigarros você fuma por dia?",
                        deu: "Wie viele Zigaretten rauchen Sie pro Tag?"
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
                            ita: "10 o meno",
                            eng: "10 or less",
                            esp: "Menos de 11",
                            fra: "10 ou moins",
                            por: "10 ou menos",
                            deu: "10 oder weniger"
                        },
                        {
                            ita: "Da 11 a 20",
                            eng: "From 11 to 20",
                            esp: "De 11 a 20",
                            fra: "De 11 à 20",
                            por: "De 11 a 20",
                            deu: "Von 11 bis 20"
                        },
                        {
                            ita: "Da 21 a 30",
                            eng: "From 21 to 30",
                            esp: "De 21 a 30",
                            fra: "Du 21 au 30",
                            por: "De 21 a 30",
                            deu: "Von 21 bis 30"
                        },
                        {
                            ita: "31 o più",
                            eng: "31 or more",
                            esp: "31 o más",
                            fra: "31 ou plus",
                            por: "31 ou mais",
                            deu: "31 oder mehr"
                        }
                    ]
                },
                {
                    t: "s",
                    d: {
                        ita: "Fuma più frequentemente durante la prima ora dal risveglio che durante il resto del giorno?",
                        eng: "Do you smoke more frequently during the first hour after waking up than during the rest of the day?",
                        esp: "¿Fuma con mayor frecuencia durante la primera hora después de despertar que durante el resto del día?",
                        fra: "Fumez-vous plus fréquemment pendant la première heure après le réveil que pendant le reste de la journée?",
                        por: "Você fuma com mais frequência na primeira hora depois de acordar do que no resto do dia?",
                        deu: "Rauchen Sie in der ersten Stunde nach dem Aufwachen häufiger als im Rest des Tages?"
                    },
                    l: "si_no"
                },
                {
                    t: "s",
                    d: {
                        ita: "Fuma anche quando è così malato da passare a letto la maggior parte del giorno?",
                        eng: "Do you smoke even when you are so sick that you are confined to bed for most of the day?",
                        esp: "¿Fuma incluso cuando está tan enfermo/a que pasa la mayor parte del día en la cama?",
                        fra: "Fumez-vous même lorsque vous êtes tellement malade que vous êtes confiné au lit la majeure partie de la journée?",
                        por: "Você fuma mesmo quando está tão doente que fica confinado à cama a maior parte do dia?",
                        deu: "Rauchen Sie, auch wenn Sie so krank sind, dass Sie den größten Teil des Tages ans Bett gefesselt sind?"
                    },
                    l: "si_no"
                },
                {
                    t: "e",
                    d: {
                        ita: "Risultato del test",
                        eng: "Test result",
                        esp: "Resultado del test",
                        fra: "Résultat du test",
                        por: "Resultado do teste",
                        deu: "Testergebnis"
                    },
                    h: true
                }
            ],
            html:   '<div id="moduloFAGERSTROM">' +
                    '   <div class="md_dida">[0]</div>' +
                    '   <div id="fagerstrom_lists" class="md_lists"><div>[1][2][3][4][5][6]</div></div>' +
                    '   <div class="md_cont_total largo">' +
                    '       <div class="md_label_total">[7]</div>' +
                    '       <div id="fagerstrom_total" class="md_total"></div>' +
                    '   </div>' +
                    '</div>',
            funct: function(){
                // aggiorno il totale dei valori
                let tot = 0,
                    els = document.getElementById("moduloFAGERSTROM").getElementsByTagName("select"),
                    vals = [
                        [3,2,1,0],
                        [1,0],
                        [1,0],
                        [0,1,2,3],
                        [1,0],
                        [1,0]
                    ],
                    ris = -1,
                    html = '';
                for(let e=0;e<els.length;e++){
                    if(els[e].selectedIndex>0)tot += vals[e][els[e].selectedIndex-1];
                }
                if(tot){
                    if(tot<3)ris = 0;
                    if(tot>=3 && tot<6)ris = 0;
                    if(tot>=6 && tot<8)ris = 2;
                    if(tot>=8)ris = 3;
                    for(let e in moduliValutazione.liste.ris_dipendenza){
                        if(e == ris)html = moduliValutazione.liste.ris_dipendenza[e][globals.siglaLingua]
                    }
                }
                document.getElementById("fagerstrom_total").innerHTML = html;
            }
        }
    }

};