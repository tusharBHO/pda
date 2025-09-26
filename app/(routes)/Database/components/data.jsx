// app/(routes)/Database/components/data.jsx
export const breedsData = {
    Cow: [
        {
            name: "Brown Swiss",
            origin: "Switzerland",
            originInIndia: "Punjab, Haryana, Uttar Pradesh, and Maharashtra",
            Use: "Mainly for milk production",
            characteristics: "Known for high milk production with good fat content.",
            Features: "Large size, docile temperament, strong adaptability to various climates.",
            temperament: "Docile, calm, easy to handle",
            adaptability:
                "Good adaptability — tolerates cold and temperate climates well; adapts to moderate tropical conditions when managed",
            image: "/cow_picture.png",
            Importance:
                "Known for high butterfat content and strong legs, suitable for both dairy and crossbreeding",
            weight: { male: "900–1,200 kg", female: "600–700 kg" },
            milkYield: {
                averagePerDay: "20–25 L",
                fatPercent: "4.0–4.5%",
                proteinPercent: "3.2–3.8%",
                snfPercent: "8.5–8.8%",
                lactationYield: "6,000–7,500 L",
                lactationLength: "280–300 days",
                a2Milk: true,
            },
            diet: {
                mainFeeds: [
                    "Temperate grasses (Timothy, Ryegrass, Fescue)",
                    "Leguminous fodders (Alfalfa, Clover)",
                    "High-quality hay",
                    "Concentrates (Maize, Barley, Soybean meal)",
                ],
                feedingHabits:
                    "Mostly stall-fed with good quality forage and concentrates; grazing in appropriate climate areas.",
                nutritionalNeeds: {
                    crudeProtein: "14-18%",
                    energyContent: "2.8–3.1 Mcal/kg",
                    fiberContent: "28–34%",
                    mineralNeeds: ["Calcium", "Phosphorus", "Magnesium"],
                },
                specialNotes:
                    "Requires balanced nutrients to maintain high milk yield and body condition; cold climate preference.",
            },
        },
        {
            name: "Deoni",
            origin: "Maharashtra, India",
            originInIndia: "Maharashtra (Latur, Osmanabad, Parbhani)",
            Use: "Dual-purpose, used for both milk and draught.",
            characteristics: "Medium to heavy build, dual-purpose with robust disease resistance.",
            Features:
                "Distinctive black-and-white or black-spotted coat; medium thick horns; broad head with alert eyes.",
            temperament: "Calm, steady, suited for smallholder handling",
            adaptability:
                "Highly adaptable to semi-arid and low-input systems; tolerates heat and poor forage.",
            image: "/cow_picture.png",
            Importance:
                "Valued for endurance in ploughing and moderate milk yield with good fat content.",
            weight: { male: "500–650 kg", female: "400–500 kg" },
            milkYield: {
                averagePerDay: "3–5 L",
                fatPercent: "4.49%",
                proteinPercent: "3.16%",
                snfPercent: "8.18%",
                lactationYield: "800–1,200 L",
                lactationLength: "290–300 days",
                a2Milk: true,
            },
            diet: {
                mainFeeds: [
                    "Tropical grasses (Guinea grass, Para grass)",
                    "Crop residues (wheat straw, maize stover)",
                    "Leguminous fodders (Cowpea, Berseem)",
                    "Local oilseed cakes and bran as concentrates",
                ],
                feedingHabits:
                    "Grazes extensively on native and crop residue pastures, supplemented with concentrates during dry periods and lactation.",
                nutritionalNeeds: {
                    crudeProtein: "12-15%",
                    energyContent: "2.3–2.7 Mcal/kg",
                    fiberContent: "30–35%",
                    mineralNeeds: ["Calcium", "Phosphorus", "Sodium"],
                },
                specialNotes:
                    "Adapted to low-quality feeding; good disease resistance aids survival on poor forage.",
            },
        },
        {
            name: "Gir",
            origin: "Gujarat, India",
            originInIndia: "Saurashtra region of Gujarat",
            Use: "Mainly dairy, premium milk rich in A2 protein",
            characteristics:
                "Hardy, disease resistant, well adapted to tropical climates.",
            Features:
                "Long, curving horns; pendulous ears; red/white spotted coat.",
            temperament: "Docile, friendly, easy to handle",
            adaptability:
                "Highly tolerant to heat, humidity, and tropical parasites; low to moderate input systems.",
            image: "/cow_picture.png",
            Importance: "Top indigenous dairy breed known worldwide for A2 milk production.",
            weight: { male: "500–600 kg", female: "380–475 kg" },
            milkYield: {
                averagePerDay: "10–15 L",
                fatPercent: "4.5–5.5%",
                proteinPercent: "3.2–4%",
                snfPercent: "8.5–9%",
                lactationYield: "3,000–4,200 L",
                lactationLength: "280–320 days",
                a2Milk: true,
            },
            diet: {
                mainFeeds: [
                    "Native grasses (Buffel grass, Dicanthium)",
                    "Leguminous forage (Desmanthus, Sesbania)",
                    "Crop residues (Paddy straw, groundnut haulms)",
                    "Concentrates (Local oilseed cakes, cereal bran)",
                ],
                feedingHabits:
                    "Predominantly grazes with some stall feeding during harsh seasons; concentrates added for lactating cows.",
                nutritionalNeeds: {
                    crudeProtein: "13-16%",
                    energyContent: "2.5–2.9 Mcal/kg",
                    fiberContent: "28–33%",
                    mineralNeeds: ["Calcium", "Phosphorus", "Magnesium"],
                },
                specialNotes:
                    "Efficient in converting low quality roughages; heat and parasite tolerant.",
            },
        },
        {
            name: "Holstein Friesian",
            origin: "Netherlands",
            originInIndia: "Widely present across India, mainly Punjab, Haryana, Maharashtra",
            Use: "Highest milk yield among dairy breeds",
            characteristics: "World’s highest milk producing breed.",
            Features: "Large body size, black-and-white or red-and-white coat pattern.",
            temperament:
                "Generally docile but can be high-strung in intensive systems; requires careful handling",
            adaptability:
                "Best suited to temperate and well-managed intensive systems; less tolerant to heat and low-input conditions.",
            image: "/cow_picture.png",
            Importance:
                "Commercial dairy backbone, unmatched milk yield though lower fat percentage.",
            weight: { male: "850–1,100 kg", female: "580–750 kg" },
            milkYield: {
                averagePerDay: "22–30 L",
                fatPercent: "3.5–3.8%",
                proteinPercent: "3.0–3.2%",
                snfPercent: "8.2–8.5%",
                lactationYield: "7,000–9,000 L",
                lactationLength: "300–305 days",
                a2Milk: false,
            },
            diet: {
                mainFeeds: [
                    "Pasture grasses",
                    "High quality hay",
                    "Concentrates (corn, soybean meal, barley)",
                    "Silage and green fodders",
                ],
                feedingHabits:
                    "Primarily stall-fed in intensive systems with balanced roughage and concentrate to support high milk production.",
                nutritionalNeeds: {
                    crudeProtein: "16-20%",
                    energyContent: "3.0–3.3 Mcal/kg",
                    fiberContent: "25–30%",
                    mineralNeeds: ["Calcium", "Phosphorus", "Magnesium", "Sodium"],
                },
                specialNotes:
                    "Requires high energy and protein feed to maintain peak lactation yields; sensitive to heat stress.",
            },
        },
        {
            name: "Kangayam",
            origin: "Tamil Nadu, India",
            originInIndia: "Coimbatore, Erode, Karur, Dindigul (Tamil Nadu)",
            Use: "Primarily draught purposes, moderate milk yield",
            characteristics: "Robust breed, drought tolerant.",
            Features: "Medium size, compact body, grey/white coat.",
            temperament: "Active and energetic, well-suited for farm work.",
            adaptability: "Highly adapted to dry and semi-arid conditions.",
            image: "/cow_picture.png",
            Importance:
                "Traditional South Indian draught cattle, supports agriculture in semi-arid zones.",
            weight: { male: "500–600 kg", female: "325–425 kg" },
            milkYield: {
                averagePerDay: "2–4 L",
                fatPercent: "4.0–4.5%",
                proteinPercent: "3.0–3.3%",
                snfPercent: "8.0–8.5%",
                lactationYield: "600–800 L",
                lactationLength: "250–280 days",
                a2Milk: true,
            },
            diet: {
                mainFeeds: [
                    "Dry fodders (Cumbu straw, maize stover)",
                    "Native grasses",
                    "Leguminous crop residues",
                    "Limited concentrates",
                ],
                feedingHabits:
                    "Mainly grazes in drylands; stall-fed during dry seasons with limited forage.",
                nutritionalNeeds: {
                    crudeProtein: "10-12%",
                    energyContent: "2.0–2.4 Mcal/kg",
                    fiberContent: "35–40%",
                    mineralNeeds: ["Calcium", "Phosphorus"],
                },
                specialNotes:
                    "Extremely drought tolerant; requires low maintenance feed with focus on fiber.",
            },
        },
        {
            name: "Kankrej",
            origin: "Rajasthan & Gujarat, India",
            originInIndia: "Kutch and Banaskantha districts of Gujarat, Barmer in Rajasthan",
            Use: "Dual-purpose, milk and draught",
            characteristics: "Large size, disease resistant, hardy in arid conditions.",
            Features: "Lyre-shaped horns, grey to white coat, powerful frame.",
            temperament: "Calm to moderately active; manageable but strong",
            adaptability: "Well-adapted to arid and semi-arid climates; tolerates heat and sparse grazing",
            image: "/cow_picture.png",
            Importance: "Well known for endurance and good milk production in harsh climates.",
            weight: { male: "525–575 kg", female: "400–450 kg" },
            description: "Kankrej cattle have strong drought tolerance with milk production and draught utility, thriving under low input in desert areas.",
            milkYield: {
                averagePerDay: "6–8 L",
                fatPercent: "4.0–4.5%",
                proteinPercent: "3.2–3.5%",
                snfPercent: "8.2–8.6%",
                lactationYield: "1,800–2,200 L",
                lactationLength: "270–300 days",
                a2Milk: true,
            },
            diet: {
                mainFeeds: [
                    "Dry grasses and scrub vegetation",
                    "Crop residues (millet straw, sorghum stover)",
                    "Leguminous fodders (guar, cluster beans)",
                    "Locally available concentrates"
                ],
                feedingHabits: "Primarily grazes on hardy vegetation and crop residues; supplemented during lean periods with locally available feed concentrates.",
                nutritionalNeeds: {
                    crudeProtein: "10-13%",
                    energyContent: "2.0–2.4 Mcal/kg",
                    fiberContent: "35–40%",
                    mineralNeeds: ["Calcium", "Phosphorus"]
                },
                specialNotes: "Highly efficient in dry, sparse forage environments; suitable for harsh climates."
            }
        },

        {
            name: "Khillari",
            origin: "Maharashtra, India",
            originInIndia: "Sangli, Satara, Solapur districts of Maharashtra",
            Use: "Mainly draught, sturdy and drought resistant.",
            characteristics: "Medium to large, compact muscular build, strong in dry rugged zones.",
            Features: "Grey-white coat, dark shading on face and neck.",
            temperament: "Active and hardy; bred for stamina.",
            adaptability: "Exceptional adaptation to drought and rough terrain.",
            image: "/cow_picture.png",
            Importance: "Important traditional draught breed, supports dryland farming.",
            weight: { male: "500–600 kg", female: "325–400 kg" },
            description: "Khillari cattle are robust draught animals with low milk production, adapted for long hours of work under harsh conditions.",
            milkYield: {
                averagePerDay: "1–3 L",
                fatPercent: "4.0–4.5%",
                proteinPercent: "3.0–3.3%",
                snfPercent: "8.0–8.3%",
                lactationYield: "400–800 L",
                lactationLength: "220–250 days",
                a2Milk: true,
            },
            diet: {
                mainFeeds: [
                    "Dry grasses and scrub",
                    "Crop residues (ragi and jowar stover)",
                    "Minimal concentrates"
                ],
                feedingHabits: "Feeds mostly on coarse vegetation and crop leftovers; low concentrate needs.",
                nutritionalNeeds: {
                    crudeProtein: "8-11%",
                    energyContent: "1.8–2.2 Mcal/kg",
                    fiberContent: "40-45%",
                    mineralNeeds: ["Calcium"]
                },
                specialNotes: "Very low maintenance feed requirement; suited to drought-prone areas."
            }
        },

        {
            name: "Pandharpuri",
            origin: "Maharashtra, India",
            originInIndia: "Solapur, Kolhapur, Sangli (Maharashtra)",
            Use: "Dual-purpose, moderate milk and draught",
            characteristics: "Medium size, hardy, drought tolerant.",
            Features: "Long horns curving backward; grey/white coat.",
            temperament: "Calm and manageable.",
            adaptability: "Adapted to semi-arid regions with high heat tolerance.",
            image: "/cow_picture.png",
            Importance: "Good for farmers requiring draught and milk in dry areas.",
            weight: { male: "400–500 kg", female: "300–400 kg" },
            description: "Pandharpuri cattle efficiently use low quality feed in dry, hot climates providing draught power with moderate milk.",
            milkYield: {
                averagePerDay: "4–6 L",
                fatPercent: "4.2–4.8%",
                proteinPercent: "3.2–3.5%",
                snfPercent: "8.3–8.7%",
                lactationYield: "1,200–1,500 L",
                lactationLength: "270–290 days",
                a2Milk: true,
            },
            diet: {
                mainFeeds: [
                    "Native dryland grasses",
                    "Crop residues (millet and sorghum straw)",
                    "Legumes (cowpea, vigna)",
                    "Local feed supplements"
                ],
                feedingHabits: "Grazes dry grasslands supplemented with crop residues and seasonal concentrates.",
                nutritionalNeeds: {
                    crudeProtein: "10-12%",
                    energyContent: "2.0–2.4 Mcal/kg",
                    fiberContent: "35-38%",
                    mineralNeeds: ["Calcium", "Phosphorus"]
                },
                specialNotes: "Good feed conversion efficiency on low-nutrient roughages."
            }
        },
        {
            name: "Sahiwal",
            origin: "Punjab region (India and Pakistan)",
            originInIndia: "Punjab, Haryana, Rajasthan",
            Use: "High milk yield, dairy specialization",
            characteristics: "Heat and tick resistant, disease resistant, known for high milk yield and quality.",
            Features: "Reddish-brown coat varying from mahogany to pale red, smaller horns, well developed udder.",
            temperament: "Docile, placid, easy to handle and milk",
            adaptability: "Excellent tolerance to heat, ticks, and low-quality forage; suited to tropical climates",
            image: "/cow_picture.png",
            Importance: "One of the best dairy breeds in India and Pakistan; popular in tropical regions worldwide.",
            weight: { male: "500–600 kg", female: "350–450 kg" },
            description:
                "The Sahiwal is a premier indigenous dairy breed known for its high milk production, heat tolerance, and resistance to parasites. It originated in the Punjab region, and is widely used in India and Pakistan. Sahiwals have contributed to crossbreeding programs globally due to their productivity and resilience.",
            milkYield: {
                averagePerDay: "8–12 L",
                fatPercent: "4.5–5.5%",
                proteinPercent: "3.3–3.6%",
                snfPercent: "8.5–9%",
                lactationYield: "2,500–3,000 L",
                lactationLength: "280–300 days",
                a2Milk: true,
            },
            diet: {
                mainFeeds: [
                    "Dry tropical grasses",
                    "Leguminous fodders like berseem and cowpea",
                    "Crop residues such as wheat straw and maize stover",
                    "Concentrates including oilseed meals and cereal bran",
                ],
                feedingHabits:
                    "Primarily grazes on native pastures, supplemented by crop residues and concentrated feeds during peak lactation.",
                nutritionalNeeds: {
                    crudeProtein: "12-16%",
                    energyContent: "2.5–2.8 Mcal/kg",
                    fiberContent: "30–35%",
                    mineralNeeds: ["Calcium", "Phosphorus", "Magnesium"],
                },
                specialNotes:
                    "Highly efficient with moderate feed inputs; requires balanced minerals to support high milk production and heat resilience.",
            },
        },
        {
            name: "Toda",
            origin: "Nilgiri Hills, Tamil Nadu, India",
            originInIndia: "Nilgiri Hills (Tamil Nadu)",
            Use: "Primarily dairy, culturally significant.",
            characteristics: "Small-sized, rare breed with unique dairy value.",
            Features: "Dark coat with white markings, medium horns.",
            temperament: "Docile and closely managed by tribal handlers.",
            adaptability: "Adapted to cool, hilly climatic conditions.",
            image: "/cow_picture.png",
            Importance: "Endangered breed, vital for Toda tribal cultural practices.",
            weight: { male: "350–400 kg", female: "280–350 kg" },
            description: "Toda cattle are small, distinct dairy cattle prized for their rich milk used in local traditions.",
            milkYield: {
                averagePerDay: "1.5–3 L",
                fatPercent: "5.0–5.5%",
                proteinPercent: "3.5–3.8%",
                snfPercent: "9.0–9.3%",
                lactationYield: "350–600 L",
                lactationLength: "270–280 days",
                a2Milk: true,
            },
            diet: {
                mainFeeds: [
                    "Natural pasture grasses rich in nutrients",
                    "Supplemental green fodder",
                    "Forest vegetation and locally collected feed",
                ],
                feedingHabits:
                    "Free-grazing in cooler hills with supplemental feeding during lean seasons.",
                nutritionalNeeds: {
                    crudeProtein: "12-15%",
                    energyContent: "2.3–2.7 Mcal/kg",
                    fiberContent: "28-32%",
                    mineralNeeds: ["Calcium", "Magnesium"],
                },
                specialNotes:
                    "Feed quality varies seasonally; sensitive to low quality feed due to small size.",
            }
        }

    ],
    Buffalo: [
        {
            name: "Murrah",
            originInIndia: "Haryana, India",
            characteristics: "World’s best dairy buffalo, high butterfat content.",
            Features: "Jet-black coat, tightly curled horns, compact body.",
            temperament: "Generally docile but active during breeding season.",
            adaptability:
                "Performs well under improved management; tolerant to tropical climates.",
            image: "/buffalo_picture.png",
            Importance:
                "Renowned for very high butterfat milk, backbone of buffalo dairying.",
            weight: { male: "550–750 kg", female: "450–600 kg" },
            milkYield: {
                averagePerDay: "10–15 L",
                fatPercent: "6.5–7.5%",
                proteinPercent: "3.8–4.0%",
                snfPercent: "9.0–9.5%",
                lactationYield: "2,200–3,000 L",
                lactationLength: "280–300 days",
                a2Milk: true,
            },
            diet: {
                mainFeeds: [
                    "Green fodder (Napier grass, maize fodder)",
                    "Crop residues (Paddy straw, wheat straw)",
                    "Concentrates (Maize, wheat bran, oilseed cakes)",
                ],
                feedingHabits:
                    "Grazes on green fodder and crop residues with added concentrates during lactation for high milk production.",
                nutritionalNeeds: {
                    crudeProtein: "12-16%",
                    energyContent: "2.5–3.0 Mcal/kg",
                    fiberContent: "30–35%",
                    mineralNeeds: ["Calcium", "Phosphorus", "Magnesium"],
                },
                specialNotes:
                    "Needs high energy diet for breeding efficiency and milk yield.",
            },
        },
        {
            name: "Jaffrabadi",
            originInIndia: "Gujarat, India",
            characteristics: "Largest and heaviest Indian buffalo breed, high milk yield.",
            Features: "Massive curved horns, robust build, black coat.",
            temperament: "Generally docile but powerful",
            adaptability: "Adapted to semi-arid coastal and inland conditions; tolerates heat",
            image: "/buffalo_picture.png",
            Importance: "High milk yield with rich fat, powerful draught animal.",
            weight: { male: "700–800 kg", female: "650–700 kg" },
            milkYield: {
                averagePerDay: "8–12 L",
                fatPercent: "7.5–8.5%",
                proteinPercent: "3.5–4.0%",
                snfPercent: "9.0–9.5%",
                lactationYield: "2,000–2,500 L",
                lactationLength: "270–300 days",
                a2Milk: true,
            },
            diet: {
                mainFeeds: [
                    "Coastal grasses and green fodder",
                    "Crop residues (paddy and wheat straw)",
                    "Concentrates (Maize, wheat bran, oilseed cakes)",
                ],
                feedingHabits:
                    "Adapted to coastal semi-arid regions grazing with supplementary feeding during dry seasons.",
                nutritionalNeeds: {
                    crudeProtein: "12-15%",
                    energyContent: "2.4–2.8 Mcal/kg",
                    fiberContent: "30–34%",
                    mineralNeeds: ["Calcium", "Phosphorus", "Magnesium"],
                },
                specialNotes:
                    "Powerful draught animal with strong milk production capability.",
            },
        },
    ],
};