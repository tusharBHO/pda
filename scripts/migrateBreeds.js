// scripts/migrateBreeds.js
import dotenv from "dotenv";
dotenv.config(); // Load environment variables

import { supabase } from "../lib/supabaseClient.js";
import { breedsData } from "../util/data.js";

async function migrate() {
    try {
        for (const species in breedsData) {
            const breeds = breedsData[species];
            for (const breed of breeds) {
                const { error } = await supabase.from("breeds").upsert([
                    {
                        species: species,
                        name: breed.name,
                        origin: breed.origin || null,
                        originInIndia: breed.originInIndia || null,
                        use: breed.Use || null,
                        characteristics: Array.isArray(breed.characteristics)
                            ? breed.characteristics
                            : [breed.characteristics],
                        temperament: breed.temperament || null,
                        adaptability: breed.adaptability || null,
                        features: breed.Features || null,
                        importance: breed.Importance || null,
                        weight: breed.weight || null,
                        milkYield: breed.milkYield || null,
                        diet: breed.diet || null,
                        image: breed.image || null,
                        region: breed.region || null,
                        useF: breed.useF || null,
                        charactF: breed.charactF || null,
                    },
                ], { onConflict: ["name", "species"] });

                if (error) console.log("Error inserting", breed.name, error);
                else console.log("Inserted/Updated", breed.name);
            }
        }
        console.log("Migration completed!");
    } catch (err) {
        console.error(err);
    }
}

migrate();