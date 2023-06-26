const fs = require('fs')
const { fileWrite, fileRead, fileDelete } = require("./funkcii");
const { json } = require('stream/consumers');

(async () => {
    try {
        const dataString = await fileRead("studenti.json");
        let studenti = JSON.parse(dataString);

        const sortProsek = studenti.sort((a, b) => {
            if (a.prosek < b.prosek) {
                return -1;
            } else if (a.prosek > b.prosek) {
                return 1;
            }
            return 0;
        });

        console.log(sortProsek);
        const najnizokProsek = sortProsek[0];
        console.log(najnizokProsek);
        const najvisokProsek = sortProsek[sortProsek.length - 1];
        console.log(najvisokProsek);

        const sredenProsek =
            studenti.reduce((acc, student) => {
                return acc + student.prosek;
            }, 0) / studenti.length;

        await fileWrite("prosek.txt", JSON.stringify(sredenProsek));
        await fileDelete("prosek.txt");



        // ======================== DODADVANJE NA STUDENT VO FAJLOT ============================
        //! 1. Treba da dodademe student vo fajlot
        //? Da ja vcitate celata sodrzina od fajlot | fs.readFile

        fs.readFile('studenti.json', 'utf-8', (err, data) => {
            if (err) {
                console.error('Nastana greska');
            } else {
                console.log('Fajlot e uspesno procitan');

                //? Da ja konvertirate sodrzinata od obichen tekst vo js niza/ JSON.parse

                const parsedData = JSON.parse(data);
                console.log(parsedData);

                //? Treba da gi dodadete podatocite na studentot vo nizata | Array.push

                const novStudent = {
                    ime: "Boban",
                    prezime: 'Kostov',
                    prosek: 8.1,
                    grad: "Gevgelija"
                };

                studenti.push(novStudent);

                //? Nizata od js niza / objekt treba da e konvertirana vo tekst | JSON.stringify

                const updatedStudentsArr = JSON.stringify(studenti, null, 2)

                //? Tekstot treba da bide zacuvan vo fajlot | fs.writeFile
                fs.writeFile('studenti.json', updatedStudentsArr, (err) => {
                    if (err) console.error('Nastana greska')
                    console.log('Studentot e uspesno dodaden vo nizata');
                });
            };
        });


        // ======================== MENUVANJE NA IMETO NA STUDENTOT ============================

        //! 2. Imeto na studentot treba da bide smeneto od AAA vo AAB
        //? Da ja vchitate celata sodrzina od fajlot | fs.readFile
        fs.readFile('studenti.json', 'utf-8', (err, data) => {
            if (err) {
                console.error('Nastana greska');
            } else {
                console.log('Fajlot e uspesno procitan');


                //? Da ja konvertira sodrzinata od obichniot tekst vo js niza ili objekt | JSON.parse

                let parsedData = JSON.parse(data)
                console.log(parsedData);

                //? Da gi izminite site elementi vo nizata i da napravite promena samo na soodvetniot clen | Array.map

                const izminatiElementi = studenti.map(student => {
                    console.log('Promena na imeto od Jovan vo Ivan');
                    if (student.ime === 'Jovan') {
                        return {
                            ...student, ime: 'Ivan'
                        }
                    }
                    return student;
                })

                //? Nizata od js niza/objekt treba da bide konvertirana vo tekst | JSON.stringify

                const dodadenoIME = JSON.stringify(izminatiElementi, null, 2)


                //? tekstot treba da bide zachuvan vo fajlot | fs.writeFile
                fs.writeFile('studenti.json', dodadenoIME, (err) => {
                    if (err) console.error('Nastana greska');
                    console.log('Imeto na studentot e uspesno promeneto');
                });
            };
        });

        // ======================== BRISENJE NA STUDENT ============================
        //3. Treba da she izbrtishe studen od fajlot

        //? Da ja vchitate celata sodrzina od fajlot
        fs.readFile('studenti.json', 'utf-8', (err, data) => {
            if (err) {
                console.error('Nastana greska');
            } else {
                console.log('Fajlor e uspesno vcitan');

                //? Da ja konvertirate sodrzinata od obicen tekst vo js niza | JSON.parse

                const parsedData = JSON.parse(data);
                console.log(parsedData);


                //? Da gi izminite site elementi vo nizata i da go izbrishite soodvetniot clen | Array,filter
                const filtrirani = studenti.filter(student => student.grad !== 'Vinica')

                //? Nizata od js treba da bidde konvertirana vo tekst | JSON.stringify
                const updatedData = JSON.stringify(filtrirani, null, 2)

                //? Tekstot treba da bide zachuvan vo fajlot

                fs.writeFile('studenti.json', updatedData, (err) => {
                    if (err) console.error('Nastana greska');
                    console.log('Fajlot e uspesno zapisan');
                });
            };
        });




































    } catch (err) {
        console.log(err);
    }
})();





// CRUD - CREATE READ UPDATE DELETE
//? Student ime prezime prosek grad
//? Dodavanja student vo fajlot
//? Brishenje na student od fajlot
//? Menuvanje na podatoci na student od fajlot
//? Chitanje na site studenti od fajlot






