// Bangladesh Administrative Hierarchy Data extracted from official Unions & City Corporation Wards Directory
// Supporting Barishal, Chattogram, Dhaka, Khulna, Mymensingh, Rajshahi, Rangpur, Sylhet
const BD_GEOLOCATION_DATA = {
  "Barishal": {
    "Barguna": {
      "Amtali": {
        "Union Parishad": ["Atharogachhia", "Kukua", "Gulishakhali", "Haldia", "Chawra", "Arpangashia", "Barguna/Amtali Paurashava"]
      },
      "Bamna": {
        "Union Parishad": ["Bukabunia", "Bamna", "Ramna", "Dauatala"]
      },
      "Barguna Sadar": {
        "Union Parishad": ["Badarkhali", "Gaurichanna", "Fuljhuri", "Keorabunia", "Ayalapatakata", "Burirchar", "Dhalua", "Barguna", "M. Baliatali", "Naltona"]
      },
      "Betagi": {
        "Union Parishad": ["Bibi Chini", "Betagi", "Hosnabad", "Mokamia", "Buramajumdar", "Kazirabad", "Sarishamuri"]
      },
      "Patharghata": {
        "Union Parishad": ["Raihanpur", "Nachnapara", "Char Duanti", "Patharghata", "Kalmegha", "Kakchira", "Kathaltali"]
      },
      "Taltali": {
        "Union Parishad": ["Pachakoralia", "Chhotobogi", "Karibaria", "Barobogi", "Nishanbaria", "Sonakata", "Sarikkhali"]
      }
    },
    "Barishal": {
      "Agailjhara": {
        "Union Parishad": ["Rajiher", "Bakal", "Bagdha", "Goila", "Ratnapur"]
      },
      "Babuganj": {
        "Union Parishad": ["Birshreshtha Jahangir Nagar", "Kedarpur", "Dehergati", "Chandpasha", "Rahmatpur", "Madhabpasha"]
      },
      "Bakerganj": {
        "Union Parishad": ["Charamaddi", "Charadi", "Durgapasha", "Dudhal", "Faridpur", "Kabai", "Nalua", "Kalaskati", "Garuria", "Bharapasha", "Rangasri", "Padrishibpur", "Niamati", "Darial"]
      },
      "Banaripara": {
        "Union Parishad": ["Bisharkandi", "Iluhar", "Syedkathi", "Chakhhar", "Saliabakpur", "Baishari", "Banaripara", "Udaykathi"]
      },
      "Barishal Sadar": {
        "Union Parishad": ["Raipasha-Karapur", "Kashipur", "Charbaria", "Shoulia", "Charkaua", "Jagua", "Chandramohan", "Tungibaria", "Chandpura", "Shayestabad"],
        "City Corporation Wards": Array.from({length: 30}, (_, i) => `Ward ${i + 1}`)
      },
      "Gaurnadi": {
        "Union Parishad": ["Khanjapur", "Barthi", "Chadshi", "Nalchira", "Mahilara", "Batauor", "Sarikal"]
      },
      "Hizla": {
        "Union Parishad": ["Barajalia", "Guabaria", "Dhulkhola", "Hizla-Gourabdi", "Memania", "Harinathpur"]
      },
      "Mehendiganj": {
        "Union Parishad": ["Andharmanik", "Lata", "Char Ekkaria", "Ulania (North)", "Ulania (South)", "Mehendiganj", "Bidyanandapur", "Bhasanchar", "Char Gopalpur", "Jangalia", "Alimabad", "Chanpur", "Dori Char Khajuria", "Gobindapur", "Sreepur", "Joynagar"]
      },
      "Muladi": {
        "Union Parishad": ["Batamara", "Nazirpur", "Safipur", "Gachhua", "Char Kalekhan", "Muladi", "Kazirchar"]
      },
      "Wazirpur": {
        "Union Parishad": ["Satla", "Harta", "Jalla", "Otra", "Sholak", "Bamrail", "Barakotha", "Shikarpur", "Guthia"]
      }
    },
    "Bhola": {
      "Bhola Sadar": {
        "Union Parishad": ["Rajapur", "Ilisha", "Paschim Ilisha", "Kachia", "Bapta", "Dhania", "Shibpur", "Alinagar", "Char Samaiya", "Bhelumia", "Bheduria", "Uttar Dighaldi", "Dakshin Dighaldi"]
      },
      "Burhanuddin": {
        "Union Parishad": ["Gangapur", "Sachra", "Kachia", "Hasan Nagar", "Tabgi", "Pakshia", "Bara Manika", "Kunjerhat", "Deula"]
      },
      "Char Fasson": {
        "Union Parishad": ["Aslampur", "Char Madraj", "Jinnaghar", "Nilkamal", "Nurabad", "Osmanganj", "Rasulpur", "Aminabad", "Jahanpur", "Ewajpur", "Char Manika", "Hazariganj", "Char Kalmi", "Dhalchar", "Kukri Mukri", "Mujibnagar", "Nazrulnagar", "Abu Bakarpur", "Abdullahpur", "Ahammadpur", "Madanpur"]
      },
      "Daulatkhan": {
        "Union Parishad": ["Madanpur", "Medua", "Charpata", "Uttar Joynagar", "Dakshin Joynagar", "Bhabanipur", "Syedpur", "Hajipur", "Char Khalifa"]
      },
      "Lalmohan": {
        "Union Parishad": ["Badarpur", "Kalma", "Charbhuta", "Lalmohan", "Farazganj", "Lord Hardinge", "Ramaganj", "Dhaligournagar", "Paschim Char Umed"]
      },
      "Manpura": {
        "Union Parishad": ["Manpura", "Hajirhat", "Uttar Sakuchia", "Dakshin Sakuchia", "Kalatali"]
      },
      "Tazumuddin": {
        "Union Parishad": ["Bara Malancha", "Sonapur", "Chanchra", "Shambhupur", "Chadpur"]
      }
    },
    "Jhalokati": {
      "Jhalokati Sadar": {
        "Union Parishad": ["Gava Ramchandrapur", "Binaykati", "Nabagram", "Keora", "Kirtipasha", "Basanda", "Ponabalia", "Gabkhan Dhansiri", "Sheikhpur", "Natullabad"]
      },
      "Kathalia": {
        "Union Parishad": ["Chechri Rampur", "Patikhalghata", "Amua", "Kathalia", "Shoulajalia", "Aurabunia"]
      },
      "Nalchity": {
        "Union Parishad": ["Bhairabpasha", "Magar", "Kulkathi", "Ranapasha", "Subidpur", "Kushangal", "Siddhakati", "Dapdapia", "Nachanmahal", "Mollahat"]
      },
      "Rajapur": {
        "Union Parishad": ["Saturia", "Shuktagarh", "Rajapur", "Galua", "Baraia", "Mathbari"]
      }
    },
    "Patuakhali": {
      "Bauphal": {
        "Union Parishad": ["Kachipara", "Kalaiya", "Kanakdia", "Keshabpur", "Chandra Dwip", "Adabaria", "Daspara", "Dhulia", "Nazirpur", "Nowmala", "Baga", "Bauphal", "Madanpura", "Surjamoni", "Konakdia"]
      },
      "Dashmina": {
        "Union Parishad": ["Alipura", "Baharampur", "Banshbaria", "Betagi Sankipura", "Char Borhan", "Dashmina", "Ranggopaldi"]
      },
      "Dumki": {
        "Union Parishad": ["Angaria", "Lebukhali", "Muradia", "Pangashia", "Srirampur"]
      },
      "Galachipa": {
        "Union Parishad": ["Amkhola", "Bakulbaria", "Char Biswas", "Char Kajol", "Chiknikandi", "Dakua", "Galachipa", "Golkhali", "Panpatti", "Ratandi Taltali", "Gazalia", "Kalan"]
      },
      "Kalapara": {
        "Union Parishad": ["Chakamaia", "Tiakhali", "Lalua", "Mithaganj", "Nilganj", "Mahipur", "Latachapli", "Dhulasar", "Baliatali", "Champapur", "Dalbuganj", "Khaprabhanga"]
      },
      "Mirzaganj": {
        "Union Parishad": ["Madhabkhali", "Mirzaganj", "Amragachhia", "Deuli Subidkhali", "Kakrabunia", "Majidbaria"]
      },
      "Patuakhali Sadar": {
        "Union Parishad": ["Lohalia", "Kalikapur", "Kamalapur", "Jainkati", "Madarbunia", "Marichbunia", "Badarpur", "Chhoto Bighai", "Bara Bighai", "Itbaria", "Auliapur", "Laukathi"]
      },
      "Rangabali": {
        "Union Parishad": ["Rangabali", "Barabaishdia", "Chhotobaishdia", "Char Montaz", "Chalitabunia", "Maudhupi"]
      }
    },
    "Pirojpur": {
      "Bhandaria": {
        "Union Parishad": ["Bhitabaria", "Nadmulla", "Telikhali", "Ikri", "Dhaoa", "Gauripur"]
      },
      "Indurkani (Zianagar)": {
        "Union Parishad": ["Parerhat", "Pattashi", "Balipara", "Chandipur", "Baniari"]
      },
      "Kawkhali": {
        "Union Parishad": ["Sayna Raghunathpur", "Amrajuri", "Kawkhali Sadar", "Chirapara Par-Saturia", "Shialkathi"]
      },
      "Mathbaria": {
        "Union Parishad": ["Tushkhali", "Dhanisafa", "Mirukhali", "Daudkhali", "Mathbaria", "Tikikata", "Betmore Rajpara", "Amragachhia", "Sapleza", "Halta Gulishakhali", "Bara Machhua"]
      },
      "Nazirpur": {
        "Union Parishad": ["Matibhanga", "Malikhali", "Deulbari Dobra", "Dirgha", "Shriramkathi", "Nazirpur Sadar", "Sekhmatia", "Kalaradoania", "Shankharikathi"]
      },
      "Nesarabad (Swarupkati)": {
        "Union Parishad": ["Baldia", "Sohagdal", "Swarupkati", "Atghar Kuriana", "Jalabari", "Daihari", "Guarekha", "Samudaykathi", "Sarengkathi", "Maheswarpur"]
      },
      "Pirojpur Sadar": {
        "Union Parishad": ["Sikdar Mallik", "Kadamtala", "Durgapur", "Kalakhali", "Tona", "Shariktala-Dumritala", "Shankarpasha"]
      }
    }
  },
  "Chattogram": {
    "Bandarban": {
      "Alikadam": { "Union Parishad": ["Alikadam", "Choilong", "Nayapara", "Kurukpata"] },
      "Bandarban Sadar": { "Union Parishad": ["Rajbila", "Kuhalong", "Bandarban", "Sualok", "Tankabati", "Jamchhari"] },
      "Lama": { "Union Parishad": ["Gajalia", "Lama", "Fasiakhali", "Aziznagar", "Sarai", "Rupasipara", "Faitong"] },
      "Naikhongchhari": { "Union Parishad": ["Naikhongchhari", "Baishari", "Ghumdhum", "Dochhari", "Sonaichhari"] },
      "Rowangchhari": { "Union Parishad": ["Rowangchhari", "Taracha", "Alekhyong", "Noapatang"] },
      "Ruma": { "Union Parishad": ["Paindu", "Ruma", "Remakripransa", "Galengya"] },
      "Thanchi": { "Union Parishad": ["Remakri", "Tindu", "Thanchi", "Balipara"] }
    },
    "Chattogram": {
      "Chattogram City Corporation (CCC)": {
        "City Corporation Wards": Array.from({length: 41}, (_, i) => `Ward ${i + 1}`)
      },
      "Anwara": { "Union Parishad": ["Bairag", "Barasat", "Raipur", "Battali", "Barakhain", "Anwara", "Haildhar", "Chatari", "Paraikora", "Juidandi"] },
      "Banshkhali": { "Union Parishad": ["Pukuria", "Sadhanpur", "Khanchanabad", "Bailchhari", "Kalipur", "Gunagari", "Katharia", "Saral", "Gondamara", "Sheikhorkhil", "Chambal", "Puichhari", "Chhanua", "Baharchhara"] },
      "Boalkhali": { "Union Parishad": ["Kadhurkhil", "Paschim Gomdandi", "Purba Gomdandi", "Shakpura", "Saroatali", "Popadia", "Charandwip", "Sripur Kharandwip", "Amuchia", "Ahla Karaldenga"] },
      "Chandanaish": { "Union Parishad": ["Kanchanabad", "Joara", "Harla", "Barama", "Bailtali", "Satbaria", "Hashimpur", "Dohazari", "Dhopachhari"] },
      "Fatikchhari": { "Union Parishad": ["Bagachhatar", "Dantmara", "Narayanhat", "Bhujpur", "Harualchhari", "Paikchhari", "Kanchanagar", "Rangamatia", "Dhurung", "Sundarpur", "Suabil", "Daulatpur", "Dharmapur", "Nanupur", "Roshanagiri", "Baktapur", "Jafarnagar", "Samitirhat", "Lelang", "Khiram", "Abdullahpur"] },
      "Hathazari": { "Union Parishad": ["Farhadabad", "Dhalai", "Mirzapur", "Gumanmardan", "Nangalmora", "Chhibatali", "Mekhal", "Garduara", "Uttar Madarsha", "Fatehpur", "Chikan Dandi", "Dakshin Madarsha", "Shikarpur", "Burischar"] },
      "Karnaphuli": { "Union Parishad": ["Char Lakshya", "Juldha", "Char Patharghata", "Barauthan", "Shikalbaha"] },
      "Lohagara": { "Union Parishad": ["Barahatia", "Amirabad", "Padwa", "Charamba", "Kala Uzan", "Lohagara", "Putibila", "Chunati", "Adhunagar"] },
      "Mirsharai": { "Union Parishad": ["Karerhat", "Hinguli", "Zorarganj", "Dhum", "Osmanpur", "Ichhakhali", "Katachhara", "Durgapur", "Mirsharai", "Mithanala", "Maghadia", "Khaiyachhara", "Mayani", "Haitkandi", "Wahedpur", "Saherkhali"] },
      "Patiya": { "Union Parishad": ["Kachuai", "Kharana", "Bhatikhain", "Baralia", "Jungalkhain", "Dhalghat", "Kelishahar", "Highdkandi", "South Bhurshi", "Kusumpura", "Jirir", "Kasiash", "Ashia", "Habilashdwip", "Chanhara", "Shovandandi", "Kolagaon"] },
      "Rangunia": { "Union Parishad": ["Rajanagar", "Hosnabad", "Swadeshpur", "Mariamnagar", "Parua", "Pomra", "Betagi", "Sarafbhata", "Shilak", "Padwa", "Chandraghona Kadamtali", "Islampur", "Dakshin Rajanagar", "Lalanagar", "Kodala"] },
      "Raozan": { "Union Parishad": ["Hingala", "Chikdair", "Dabua", "Gahira", "Sultanpur", "Binajuri", "Raozan", "Kadalpur", "Pahartali", "Purba Gujara", "Paschim Gujara", "Urkirchar", "Noapara", "Bagowan"] },
      "Sandwip": { "Union Parishad": ["Urirchar", "Santoshpur", "Kalapania", "Horishpur", "Bauria", "Gachhua", "Amanullah", "Rahmatpur", "Azimpur", "Musapur", "Maitbhanga", "Sarikait", "Magdhara", "Haramia"] },
      "Satkania": { "Union Parishad": ["Charati", "Khagaria", "Nalua", "Kanchana", "Amilaish", "Eochia", "Madarsha", "Dhemsa", "Paschim Dhemsa", "Keochia", "Kaliash", "Dharmapur", "Bajalia", "Puranagar", "Sonakania", "Satkania", "Sadaha"] },
      "Sitakunda": { "Union Parishad": ["Syedpur", "Muradpur", "Barabkunda", "Banshbaria", "Kumira", "Sonaichhari", "Bhatiari", "Salimpur", "Baraiyadhala"] }
    },
    "Cox's Bazar": {
      "Chakaria": { "Union Parishad": ["Harbang", "Baraitali", "Kaiyarbil", "Bheola Manikchar", "Paschim Bara Bheola", "Purba Bara Bheola", "Saharbil", "Chiringa", "Fasiakhali", "Dulahazara", "Khuntakhali", "Badarkhali", "Dhemushia", "Konakhali", "Lakhyarchar", "Kakara", "Surajpur-Manikpur", "Bamu Bilchhari"] },
      "Cox's Bazar Sadar": { "Union Parishad": ["Bharuakhali", "Patali Machhuakhali", "Khurushkul", "Jhilongja", "Choufaldandi"] },
      "Eidgaon": { "Union Parishad": ["Islampur", "Islamabad", "Eidgaon", "Jalalabad", "Pokkhali"] },
      "Kutubdia": { "Union Parishad": ["Uttar Dhurung", "Dakshin Dhurung", "Lemshikhali", "Kaiyarbil", "Baraghop", "Ali Akbar Deil"] },
      "Maheshkhali": { "Union Parishad": ["Matarbari", "Dhalghata", "Kalarmarchhara", "Shaplapur", "Hoanak", "Bara Maheshkhali", "Chhoto Maheshkhali", "Kutubjom"] },
      "Pekua": { "Union Parishad": ["Raja Khali", "Taitong", "Barabakia", "Pekua", "Magnama", "Ujantia", "Shilkhali"] },
      "Ramu": { "Union Parishad": ["Idgar", "Garjania", "Kachhapia", "Kauarkhop", "Fatekharkul", "Joarianala", "Rajarkul", "Dakshin Mithachhari", "Khuniapalong", "Chakmarkul", "Rashidnagar"] },
      "Teknaf": { "Union Parishad": ["Whykong", "Hnila", "Teknaf Sadar", "Sabrang", "Baharchhara", "St. Martin's Island"] },
      "Ukhia": { "Union Parishad": ["Jalia Palong", "Ratna Palong", "Haldia Palong", "Raja Palong", "Palong Khali"] }
    },
    "Cumilla": {
      "Cumilla Adarsha Sadar": {
        "Union Parishad": ["Kalirbazar", "Durgapur Uttar", "Durgapur Dakshin", "Amratali", "Panchthubi", "Jagannathpur"],
        "City Corporation Wards": Array.from({length: 27}, (_, i) => `Ward ${i + 1}`)
      },
      "Barura": { "Union Parishad": ["Agalchhara", "Bhabanipur", "Uttar Khoshbas", "Dakshin Khoshbas", "Jalam", "Chitadda", "Jhalam", "Adra", "Lakshmipur", "Payalgachha", "Galimpur", "Shilmuri Uttar", "Shilmuri Dakshin", "Vauksar", "Addaa"] },
      "Brahmanpara": { "Union Parishad": ["Madhabpur", "Shidlai", "Chandla", "Shashidal", "Dulalpur", "Brahmanpara Sadar", "Sahebabad", "Malapara"] },
      "Burichang": { "Union Parishad": ["Rajapur", "Bakshimul", "Burichang Sadar", "Sholanal", "Pirjatrapur", "Moynamoti", "Mokam", "Bharella", "Bharella Dakshin"] },
      "Chandina": { "Union Parishad": ["Suhilpur", "Bataichhari", "Madhaiya", "Mahichail", "KeranKhal", "Barera", "Etbarpur", "Barkarar", "Maijkhar", "Gallai", "Dollai Nawabpur", "Barkarar Paschim", "Joag"] },
      "Chauddagram": { "Union Parishad": ["Kashinagar", "Ujirpur", "Kalikapur", "Shreepur", "Shubhopur", "Gholpasha", "Munshirhat", "Kankapait", "Batisa", "Chiara", "Gunabati", "Jagannath Dighi", "Alkara"] },
      "Daudkandi": { "Union Parishad": ["Daudkandi Uttar", "Sundalpur", "Gauripur", "Eliotganj Uttar", "Eliotganj Dakshin", "Maligaon", "Mohammadpur Paschim", "Mohammadpur Purba", "Maruka", "Biteshwar", "Goalmaribazar", "Padma", "Panchgachhia Paschim", "Jinglatali", "Daulatpur"] }
    }
  },
  "Dhaka": {
    "Dhaka": {
      "Dhaka North City Corporation (DNCC)": {
        "City Corporation Wards": Array.from({length: 54}, (_, i) => `Ward ${i + 1}`)
      },
      "Dhaka South City Corporation (DSCC)": {
        "City Corporation Wards": Array.from({length: 75}, (_, i) => `Ward ${i + 1}`)
      },
      "Dhamrai": { "Union Parishad": ["Amta", "Baisakanda", "Balia", "Bhararia", "Chouhat", "Dhamrai", "Gangutia", "Jadabpur", "Kulla", "Kushura", "Nannar", "Roail", "Sanora", "Sombhag", "Suapur", "Suti Para"] },
      "Dohar": { "Union Parishad": ["Bilaspur", "Kushumhati", "Mahmudpur", "Muksudpur", "Narisha", "Nayabari", "Raipara", "Sutarpara"] },
      "Keraniganj": { "Union Parishad": ["Aganagar", "Basta", "Hazratpur", "Kalatia", "Kalindi", "Konda", "Ruhitpur", "Shakta", "Subhadya", "Taranagar", "Tegharia", "Zinjira"] },
      "Nawabganj": { "Union Parishad": ["Agla", "Bahra", "Bakshanagar", "Bandura", "Baruakhali", "Churamainkathi", "Galimpur", "Jantrail", "Joykrishnapur", "Kailail", "Kalakopa", "Nayansree", "Shikaripara", "Sholla"] },
      "Savar": { "Union Parishad": ["Aminbazar", "Ashulia", "Banagram", "Bhakurta", "Birulia", "Dhamsona", "Kaundia", "Pathalia", "Savar", "Shimulia", "Tetuljhora", "Yearpur"] }
    },
    "Gazipur": {
      "Gazipur Sadar": {
        "Union Parishad": ["Baria", "Bhawal Garh", "Mirzapur", "Pirujali"],
        "City Corporation Wards": Array.from({length: 57}, (_, i) => `Ward ${i + 1}`)
      },
      "Kaliakair": { "Union Parishad": ["Atabaha", "Boali", "Chapair", "Dhaljora", "Fulbaria", "Madhya Para", "Mouchak", "Sreefaltali", "Sutrapur"] },
      "Kaliganj": { "Union Parishad": ["Bahadursadi", "Baktarpur", "Jamalpur", "Jangalia", "Moktarpur", "Nagari", "Tumulia"] },
      "Kapasia": { "Union Parishad": ["Barishaba", "Chandpur", "Durgapur", "Ghagtia", "Kapasia", "Karihata", "Rayed", "Sanmania", "Singhashree", "Targaon", "Tok"] },
      "Sreepur": { "Union Parishad": ["Barmi", "Gazipur", "Goshinga", "Kaoraid", "Maona", "Prahladpur", "Rajabari", "Telihati"] }
    },
    "Narayanganj": {
      "Narayanganj Sadar": {
        "Union Parishad": ["Alirtek", "Baktabali", "Enayetnagar", "Fatullah", "Gognagar", "Kashipur", "Kutubpur"],
        "City Corporation Wards": Array.from({length: 27}, (_, i) => `Ward ${i + 1}`)
      },
      "Araihazar": { "Union Parishad": ["Araihazar", "Brahmandi", "Duptara", "Fatehpur", "Gopaldi", "Haizadi", "Kalapaharia", "Khagkanda", "Mahmudpur", "Satgram", "Uchitpura", "Bishnandi"] },
      "Bandar": { "Union Parishad": ["Bandar", "Dhamgarh", "Kalagachhia", "Madanpur", "Musapur"] },
      "Rupganj": { "Union Parishad": ["Bholabo", "Bhulta", "Daudpur", "Golakandail", "Kayetpara", "Murapara", "Rupganj"] },
      "Sonargaon": { "Union Parishad": ["Aminpur", "Baidyer Bazar", "Baradi", "Jampur", "Kachpur", "Mograpara", "Noagaon", "Pirojpur", "Sadi Pur", "Shambhupura"] }
    },
    "Tangail": {
      "Basail": { "Union Parishad": ["Basail", "Fulki", "Habla", "Kanchanpur", "Kauljani", "Kashil"] },
      "Bhuapur": { "Union Parishad": ["Arjuna", "Falda", "Gabshara", "Gobindasi", "Nikrail", "Aloa"] },
      "Delduar": { "Union Parishad": ["Atia", "Delduar", "Deuli", "Dubail", "Elasin", "Fazilhati", "Lauhati", "Pathrail"] },
      "Dhanbari": { "Union Parishad": ["Baniajan", "Bir tara", "Dhopakhali", "Jadu Nathpur", "Mushuddi", "Paikpara", "Bolivhadra"] },
      "Ghatail": { "Union Parishad": ["Anehola", "Deolabari", "Deopara", "Dhalapara", "Digalkandi", "Digar", "Ghatail", "Jamuria", "Lokerpara", "Rasulpur", "Sagardighi", "Sandhanpur", "Sangrampur", "Shahpur"] },
      "Gopalpur": { "Union Parishad": ["Alamnagar", "Dhopakandi", "Hadira", "Hemnagar", "Jhawail", "Mirzapur", "Nagda Simla"] },
      "Kalihati": { "Union Parishad": ["Balla", "Bangra", "Birbashinda", "Durgapur", "Elenga", "Gohaliabari", "Kokdahara", "Nagbari", "Narandia", "Paikara", "Parkhi", "Salla", "Shahadebpur"] },
      "Madhupur": { "Union Parishad": ["Alokdia", "Aronkhola", "Ausnara", "Beribaid", "Fulbagchala", "Golabari", "Kuragachha", "Mahishmara", "Sholakuri"] },
      "Mirzapur": { "Union Parishad": ["Ajgana", "Anaitara", "Bahuria", "Banail", "Banshtail", "Bhatgram", "Fatehpur", "Gorai", "Jamurki", "Latifpur", "Mahera", "Mirzapur", "Tarafpur", "Uarsi"] },
      "Nagarpur": { "Union Parishad": ["Bhadra", "Bekra Atgram", "Bharra", "Daptiar", "Dhulbari", "Gayhata", "Mamudnagar", "Mokna", "Nagarpur", "Pakutia", "Sahabatpur", "Salimabad"] },
      "Sakhipur": { "Union Parishad": ["Baheratali", "Dariapur", "Gazaria", "Hatibandha", "Jadabpur", "Kakrajan", "Kalia", "Mahanandapur"] },
      "Tangail Sadar": { "Union Parishad": ["Baghil", "Charabari", "Danya", "Gala", "Gharinda", "Hugra", "Kakua", "Katuli", "Magra", "Mahmudnagar", "Porabari", "Silimpur"] }
    }
  },
  "Khulna": {
    "Bagerhat": {
      "Bagerhat Sadar": { "Union Parishad": ["Baraipara", "Bemarta", "Bishnupur", "Dema", "Gotapara", "Jatrapur", "Karapara", "Khanpur", "Rakhalgachhi", "Shatgambuj"] },
      "Chitalmari": { "Union Parishad": ["Barabaria", "Char Baniari", "Chitalmari", "Hizla", "Kalatala", "Santoshpur", "Shibpur"] },
      "Fakirhat": { "Union Parishad": ["Bahirdia-Mansa", "Betaga", "Fakirhat", "Lakhpur", "Mulghar", "Naldha-Maubhog", "Piljanga", "Shubhadia"] },
      "Kachua (Bagerhat)": { "Union Parishad": ["Badhal", "Dhopakhali", "Gazalia", "Gopalpur", "Kachua", "Maghia", "Raripara"] },
      "Mollahat": { "Union Parishad": ["Atjuri", "Chunkhola", "Gangni", "Gaola", "Kulia", "Udaypur"] },
      "Mongla": { "Union Parishad": ["Burirdanga", "Chandpai", "Chila", "Mithakhali", "Sonailtala", "Sundarban"] },
      "Morrelganj": { "Union Parishad": ["Baharbunia", "Balaibunia", "Banagram", "Baroikhali", "Chingrakhali", "Daibagnyahati", "Hoglabunia", "Hoglapasha", "Jiudhara", "Khaulia", "Morrelganj", "Nishanbaria", "Panchakaran", "Putikhali", "Ramchandrapur", "Teligati"] },
      "Rampal": { "Union Parishad": ["Baintala", "Banshtali", "Bhojpatia", "Gaurambha", "Hurka", "Mallikerber", "Perikhali", "Rajnagar", "Rampal", "Ujalkur"] },
      "Sarankhola": { "Union Parishad": ["Dhansagar", "Khontakata", "Rayenda", "Southkhali"] }
    },
    "Jashore": {
      "Jashore Sadar": { "Union Parishad": ["Arabpur", "Basundia", "Chachra", "Churamankathi", "Deapara", "Fatehpur", "Haibatpur", "Ichhali", "Kachua", "Kashimpur", "Lebutala", "Narendrapur", "Noapara", "Ramnagar", "Upashahar"] },
      "Abhaynagar": { "Union Parishad": ["Baghutia", "Chalishia", "Payra", "Prembag", "Siddhipasha", "Sridharpur", "Subharara", "Sundali"] },
      "Bagherpara": { "Union Parishad": ["Bandabila", "Basuari", "Darajhat", "Dohakula", "Jamdia", "Jashore", "Narikelbaria", "Roypur", "Mathurapur"] },
      "Chaugachha": { "Union Parishad": ["Chaugachha", "Dhuliani", "Fullsara", "Hakimpur", "Jagadishpur", "Narayanpur", "Pashapole", "Patibila", "Singajhuli", "Sukpukuria", "Swaroopdah"] },
      "Jhikargachha": { "Union Parishad": ["Bankra", "Gadkhali", "Ganga Nandapur", "Hajirbag", "Jhikargachha", "Magura", "Nabharan", "Nirbashkhola", "Panisara", "Shankarpur", "Shimulia"] },
      "Keshabpur": { "Union Parishad": ["Bidyandakati", "Gaurighona", "Hasanpur", "Keshabpur", "Majitpur", "Mangal Kot", "Panjia", "Sagardari", "Satbaria", "Sufalakati", "Trimohini"] },
      "Manirampur": { "Union Parishad": ["Bhojgati", "Chalua Hati", "Dhakuria", "Durbadanga", "Haridaskati", "Harinagar", "Jhanpa", "Khedapara", "Khanpur", "Kultia", "Manirampur", "Manoharpur", "Mashwimnagar", "Nehalpur", "Rohita", "Shamkur", "Shyamkur"] },
      "Sharsha": { "Union Parishad": ["Bagachra", "Bahadurpur", "Benapole", "Dihi", "Goga", "Kayba", "Lakshmanpur", "Nizampur", "Putkhali", "Sharsha", "Ulashi"] }
    },
    "Khulna": {
      "Batiaghata": { "Union Parishad": ["Amirpur", "Baliadanga", "Batiaghata", "Bhandarkote", "Gangarampur", "Jalma", "Surkhali"] },
      "Dacope": { "Union Parishad": ["Bajua", "Banishanta", "Dacope", "Kailashganj", "Kamarkhola", "Laudobe", "Pankhali", "Sutarkhali", "Tildanga"] },
      "Dighalia": { "Union Parishad": ["Arongghata", "Barakpur", "Dighalia", "Gazirhat", "Jogipole", "Senhati"] },
      "Dumuria": { "Union Parishad": ["Atlai", "Bhandarpara", "Dhamalia", "Dumuria", "Gutudia", "Khornia", "Maguraghona", "Magurkhali", "Raghunathpur", "Rangpur", "Rudaghara", "Sahas", "Sarappur", "Shovna"] },
      "Koyra": { "Union Parishad": ["Amadi", "Bagali", "Dakshin Bedkashi", "Koyra", "Maharajpur", "Maheshwaripur", "Uttar Bedkashi"] },
      "Paikgachha": { "Union Parishad": ["Chandkhali", "Deluti", "Gadaipur", "Garuikhali", "Haridhali", "Kapilmuni", "Laskar", "Lata", "Raruli", "Soladana"] },
      "Phultala": { "Union Parishad": ["Atra Gilatala", "Damodar", "Jamira", "Phultala"] },
      "Rupsha": { "Union Parishad": ["Aijganti", "Ghatbhog", "Naihati", "Sreefaltala", "T S Bahirdia"] },
      "Terokhada": { "Union Parishad": ["Ajogara", "Barasat", "Chhagladaha", "Madhupur", "Sachiadaha", "Terokhada"] }
    }
  },
  "Mymensingh": {
    "Mymensingh": {
      "Mymensingh Sadar": {
        "Union Parishad": ["Akua", "Ashtadhar", "Baera", "Bhabakhali", "Borar Char", "Char Ishwardia", "Char Nilakshmia", "Dapunia", "Ghagra", "Khagdahar", "Kustia", "Paranganj", "Sirta"],
        "City Corporation Wards": Array.from({length: 33}, (_, i) => `Ward ${i + 1}`)
      },
      "Bhaluka": { "Union Parishad": ["Bhaluka", "Bharadoba", "Birunia", "Dakatia", "Dhitpur", "Habirbari", "Kachina", "Mallikbari", "Meduari", "Rajoi", "Uthura"] },
      "Dhobaura": { "Union Parishad": ["Baghber", "Dakshin Maijpara", "Dhobaura", "Gamaritola", "Ghoshgaon", "Goai-tala", "Porakandolia"] },
      "Fulbaria": { "Union Parishad": ["Achna", "Bakta", "Balian", "Bhabanipur", "Deokhola", "Enayetpur", "Fulbaria", "Kaladaha", "Kushmail", "Naogaon", "Putijana", "Radhakanai", "Rangamatia"] },
      "Gaffargaon": { "Union Parishad": ["Barabaria", "Char Algi", "Datterbazar", "Gaffargaon", "Jasra", "Kandipara", "Longair", "Mashakhali", "Niguary", "Panchbagh", "Rasulpur", "Raona", "Saltia", "Tangabo", "Usthi"] },
      "Gauripur": { "Union Parishad": ["Achintapur", "Bhangnamari", "Bokainagar", "Douhakhola", "Gauripur", "Maoha", "Mayna", "Ramgopalpur", "Sahaganj", "Sidhla"] },
      "Haluaghat": { "Union Parishad": ["Amtaile", "Bhuban Kura", "Bilaspur", "Dhara", "Dhurail", "Gazirbhita", "Haluaghat", "Jugli", "Kaichapur", "Naguadanga", "Narail", "Swadeshi"] },
      "Ishwarganj": { "Union Parishad": ["Atharabari", "Barahit", "Ishwarganj", "Jatia", "Magtula", "Maijbagh", "Rajibpur", "Sarisha", "Sohagi", "Tarundia", "Uchakhila"] },
      "Muktagachha": { "Union Parishad": ["Baragram", "Basati", "Dapunia", "Dulla", "Ghoga", "Kheruajani", "Kumarghata", "Mankon", "Tarati", "Kashimpur"] },
      "Nandail": { "Union Parishad": ["Achargaon", "Baniapara", "Betagair", "Chandipasha", "Char Betagair", "Gangail", "Jahangirpur", "Kharua", "Moazzempur", "Musulli", "Nandail", "Rajgati", "Sherpur", "Singrail"] },
      "Phulpur": { "Union Parishad": ["Balia", "Bhaia", "Bhaika", "Chhota Sunai", "Dhakua", "Fulpur", "Payari", "Rahimgonj", "Ramvadrapur", "Rupasi", "Shingheshwar"] },
      "Tarakanda": { "Union Parishad": ["Bishka", "Baniapara", "Dhakua", "Gachihata", "Kakni", "Kamargaon", "Kamaria", "Rampur", "Tarakanda", "Balia"] },
      "Trishal": { "Union Parishad": ["Amirabari", "Bailor", "Balipara", "Dhanikhola", "Harirampur", "Kanihari", "Kanthal", "Mathbari", "Mokshapur", "Rampur", "Sakhua", "Trishal"] }
    },
    "Jamalpur": {
      "Bakshiganj": { "Union Parishad": ["Bakshiganj", "Battajore", "Dhanua Kamalpur", "Merur Char", "Nilakhia", "Sadhurpara", "Bogarchar"] },
      "Dewanganj": { "Union Parishad": ["Bahadurabad", "Char Aomkhawa", "Chikajani", "Chukaibari", "Dangdhara", "Dewanganj", "Hatiabhanga", "Par Ramrampur"] },
      "Islampur": { "Union Parishad": ["Belgachha", "Char Goalini", "Char Putimari", "Chinaduli", "Gaibandha", "Islampur", "Kulkandi", "Noarpara", "Palbandha", "Patharshi", "Sapdhari", "Sindurtali"] },
      "Jamalpur Sadar": { "Union Parishad": ["Banschara", "Digpait", "Ghoradhap", "Itail", "Kendua", "Lakshmirchar", "Meshta", "Narundi", "Ranagachha", "Rashidpur", "Sahabajpur", "Sharifpur", "Sreenagar", "Titpalla", "Tulshirchar"] },
      "Madarganj": { "Union Parishad": ["Adarbhita", "Balijuri", "Char Pakerdaha", "Gunaritala", "Jorekhali", "Karaichara", "Sidhuli"] },
      "Melandaha": { "Union Parishad": ["Adra", "Char Banipakuria", "Dhurmut", "Fulkocha", "Ghosherpara", "Jhaugara", "Kulia", "Mahmudpur", "Nangla", "Nayanagar", "Shyampur"] },
      "Sarishabari": { "Union Parishad": ["Aona", "Bhatara", "Doail", "Kamrabad", "Mahadan", "Pingna", "Pogaldigha", "Satpoa"] }
    }
  },
  "Rajshahi": {
    "Rajshahi": {
      "Paba": {
        "Union Parishad": ["Baragachhi", "Damkura", "Darshanpara", "Haragram", "Harian", "Haripur", "Huzuripara", "Parila"],
        "City Corporation Wards": Array.from({length: 30}, (_, i) => `Ward ${i + 1}`)
      },
      "Bagha": { "Union Parishad": ["Arani", "Bajubagha", "Bausa", "Chakrajapur", "Gargari", "Manigram", "Pakuria"] },
      "Bagmara": { "Union Parishad": ["Auchpara", "Barabihanali", "Basupara", "Dwippur", "Ganipur", "Goalkandi", "Gobindapara", "Hamirkutsa", "Jhikra", "Jogipara", "Kachari Koalipara", "Maria", "Nardas", "Shreepur", "Subhadanga", "Taherpur"] },
      "Charghat": { "Union Parishad": ["Bhaya Lakshmipur", "Charghat", "Nimpara", "Salua", "Sardah", "Yusufpur"] },
      "Durgapur (Rajshahi)": { "Union Parishad": ["Deluabari", "Jhaluka", "Joynagar", "Kishmat Gankair", "Maogachhi", "Naopara", "Pananagar"] },
      "Godagari": { "Union Parishad": ["Basudebpur", "Char Ashariadaha", "Deopara", "Gogram", "Godagari", "Matikata", "Mohanpur", "Pakri", "Rishikul"] },
      "Mohanpur": { "Union Parishad": ["Bakshimail", "Dhurail", "Ghasigram", "Jahanabad", "Mougachhi", "Rayghati"] },
      "Puthia": { "Union Parishad": ["Baneshwar", "Belpukuria", "Bhalukgachhi", "Jeopara", "Puthia", "Shilmaria"] },
      "Tanore": { "Union Parishad": ["Badhair", "Chanduria", "Kalma", "Kamargaon", "Pachandar", "Saranjai", "Talanda"] }
    },
    "Bogura": {
      "Bogura Sadar": { "Union Parishad": ["Erulia", "Fapore", "Gokul", "Lahiripara", "Namuja", "Nishindara", "Noongola", "Rajapur", "Sabgram", "Sekherkola", "Shakharia"] },
      "Adamdighi": { "Union Parishad": ["Adamdighi", "Chhatiangram", "Kundagram", "Nasharatpur", "Santahar", "Shawal"] },
      "Dhunat": { "Union Parishad": ["Bhandarbari", "Chaumuhani", "Chikaishi", "Dhunat", "Elangi", "Gopalnagar", "Gosainbari", "Kalerpara", "Mathurapur", "Nimgachhi"] },
      "Dupchanchia": { "Union Parishad": ["Chamrul", "Dupchanchia", "Gobindapur", "Gunahar", "Talora", "Zianagar"] },
      "Gabtali": { "Union Parishad": ["Baliadighi", "Dakhinpara", "Durgahata", "Gabtali", "Kagail", "Mahishaban", "Naruamala", "Nasipur", "Nepaltali", "Rameshwarpur", "Sonaray"] },
      "Kahaloo": { "Union Parishad": ["Bir Kedar", "Durgapur", "Jamgram", "Kahaloo", "Kalai", "Malancha", "Murail", "Narahatta", "Paikor"] },
      "Nandigram": { "Union Parishad": ["Bhatgram", "Bhatra", "Burail", "Nandigram", "Thalta Majhgram"] },
      "Sariakandi": { "Union Parishad": ["Bhelabari", "Bohail", "Chaluabari", "Chandanbaisha", "Fulbari", "Hatsherpur", "Kamalpur", "Karnibari", "Kazla", "Kutubpur", "Narchi", "Sariakandi"] },
      "Shajahanpur": { "Union Parishad": ["Amrul", "Aria", "Ashakpur", "Chopinagar", "Gohail", "Kharna", "Khotta Para", "Madla", "Majhira"] },
      "Sherpur (Bogura)": { "Union Parishad": ["Bhabanipur", "Bishalpur", "Garidaha", "Khanpur", "Khoshbas", "Kusumbi", "Mirzapur", "Shah Bandegi", "Sughat", "Simabari"] },
      "Shibganj (Bogura)": { "Union Parishad": ["Atmul", "Bihari", "Buriganj", "Deuli", "Kichak", "Maidanhata", "Majhihatta", "Mokamtala", "Pirab", "Raynagar", "Saidpur", "Shibganj"] },
      "Sonatala": { "Union Parishad": ["Balua", "Digdair", "Jorgachha", "Madhupur", "Pakulla", "Sonatala", "Tekani Chukainagar"] }
    }
  },
  "Rangpur": {
    "Rangpur": {
      "Rangpur Sadar": {
        "Union Parishad": ["Chandanpat", "Darshana", "Haridebpur", "Kholeya", "Mominpur", "Pashuram", "Sadyapushkarini", "Uttam"],
        "City Corporation Wards": Array.from({length: 33}, (_, i) => `Ward ${i + 1}`)
      },
      "Badarganj": { "Union Parishad": ["Bishnupur", "Damodarpur", "Gopalpur", "Kalupara", "Kutubpur", "Lohanipara", "Madhupur", "Radhanagar", "Ramnathpur", "Shamserhat"] },
      "Gangachara": { "Union Parishad": ["Alambiditar", "Barabil", "Betgari", "Gajaghanta", "Gangachara", "Kolkonda", "Lakshmitari", "Marnea", "Nohali"] },
      "Kaunia": { "Union Parishad": ["Balapara", "Haragachh", "Kursha", "Sarai", "Shahidbagh", "Tepamadhupur"] },
      "Mithapukur": { "Union Parishad": ["Balarpukur", "Balua Masimpur", "Barahazratpur", "Baraipara", "Bhangni", "Chengmari", "Durgapur", "Emadpur", "Gopalpur", "Kafrikhal", "Khoragachh", "Latifpur", "Mayenpur", "Milanpur", "Mirzapur", "Pairaband", "Ranipukur"] },
      "Pirgachha": { "Union Parishad": ["Annadanagar", "Chhaola", "Itakumari", "Kaikuri", "Kalyani", "Kandhi", "Parul", "Pirgachha", "Tambulpur"] },
      "Pirganj (Rangpur)": { "Union Parishad": ["Bara Alampur", "Bara Dargah", "Bhendabari", "Chaitrakol", "Chatra", "Kabilpur", "Kumedpur", "Madankhali", "Mithipur", "Panchgachhi", "Pirganj", "Ramnathpur", "Raypur", "Shanerhat", "Tukuria"] },
      "Taraganj": { "Union Parishad": ["Alampur", "Ekarchali", "Hariarkuthi", "Kursha", "Sayar"] }
    },
    "Dinajpur": {
      "Biral": { "Union Parishad": ["Azimpur", "Bhandara", "Bijora", "Biral", "Dharmapur", "Dhamoir", "Farakkabad", "Mangalpur", "Palashbari", "Rajarampur", "Shahargram"] },
      "Birampur": { "Union Parishad": ["Binail", "Deor", "Jotbani", "Katla", "Khanpur", "Mukundapur", "Pali Prayagpur"] },
      "Birganj": { "Union Parishad": ["Bhognagar", "Maricha", "Mohammadpur", "Nijpara", "Palashbari", "Paltapur", "Shatagram", "Shibrampur", "Sujalpur", "Sundarpur"] },
      "Bochaganj": { "Union Parishad": ["Atgaon", "Chhatoil", "Ishania", "Mushidhat", "Nafanagar", "Rangaon"] },
      "Chirirbandar": { "Union Parishad": ["Abdulpur", "Alokdihi", "Auliapukur", "Bhiai", "Fatehjangpur", "Isabpur", "Nasratpur", "Punatti", "Saitara", "Satnala", "Tentulia", "Viyail"] },
      "Dinajpur Sadar": { "Union Parishad": ["Askarpur", "Auliapur", "Chehelgazi", "Fazilpur", "Kamalpur", "Koshba", "Sekhpura", "Shashara", "Sundarban", "Uthrail"] }
    }
  },
  "Sylhet": {
    "Sylhet": {
      "Sylhet Sadar": {
        "Union Parishad": ["Hatkhola", "Jalalabad", "Kandigaon", "Khadimnagar", "Khadimpara", "Mogalgaon", "Tultikar", "Tukerbazar"],
        "City Corporation Wards": Array.from({length: 42}, (_, i) => `Ward ${i + 1}`)
      },
      "Balaganj": { "Union Parishad": ["Balaganj", "Boaljur", "Dewan Bazar", "Paschim Gauripur", "Purba Gauripur", "Purba Pailanpur"] },
      "Beanibazar": { "Union Parishad": ["Alinagar", "Charkhai", "Dubag", "Kurarbazar", "Lauta", "Mathiura", "Mollahpur", "Muria", "Sheola", "Tilpara"] },
      "Bishwanath": { "Union Parishad": ["Alankari", "Bishwanath", "Daulatpur", "Deokalas", "Doshghar", "Khajanchi", "Lamakazi", "Rampasha"] },
      "Companiganj (Sylhet)": { "Union Parishad": ["Ichhakalas", "Islampur Paschim", "Islampur Purba", "Ranikhai Dakshin", "Ranikhai Uttar", "Telikhal"] },
      "Fenchuganj": { "Union Parishad": ["Fenchuganj", "Ghilachhara", "Maijgaon", "North Fenchuganj", "North Kushiara"] },
      "Golapganj": { "Union Parishad": ["Amura", "Badepasha", "Bagha", "Bhadeshwar", "Budhbaribazar", "Dhaka Dakshin", "Fulbari", "Golapganj", "Lakshmanaband", "Lakshanabanda", "Uttar Badepasha"] },
      "Gowainghat": { "Union Parishad": ["Alirgaon", "Bichnakandi", "Dakhin Bag", "Fatehpur", "Lengura", "Nandirgaon", "Paschim Jaflong", "Purba Jaflong", "Rustampur", "Towakul"] },
      "Jaintiapur": { "Union Parishad": ["Charikatha", "Chiknagul", "Darbast", "Fatehpur", "Jaintiapur", "Nijpat"] },
      "Kanaighat": { "Union Parishad": ["Bara Chatul", "Dakshin Banigram", "Dighirpar Purba", "Jhingabari", "Kanaighat", "Lakshmiprasad Paschim", "Lakshmiprasad Purba", "Rajaganj", "Satbank"] },
      "Osmani Nagar": { "Union Parishad": ["Burunga Bazar", "Dayamir", "Goala Bazar", "Osmanpur", "Sadipur", "Tajpur", "Umorpur", "Paschim Pailanpur"] },
      "South Surma": { "Union Parishad": ["Baraikandi", "Daudpur", "Jalalpur", "Kuchai", "Lalabazar", "Moglabazar", "Mollargao", "Silam", "Tetli"] },
      "Zakiganj": { "Union Parishad": ["Barahal", "Barathakuri", "Birasree", "Kajalshar", "Kaskanakpur", "Khilagram", "Manikpur", "Sultanpur", "Zakiganj"] }
    },
    "Habiganj": {
      "Ajmiriganj": { "Union Parishad": ["Ajmiriganj", "Badolpur", "Jalsuka", "Kakailsheo", "Shibpasha"] },
      "Bahubal": { "Union Parishad": ["Bahubal", "Bhadeshwar", "Lamatashi", "Mirpur", "Putijuri", "Satkapon", "Snanghat"] },
      "Baniachang": { "Union Parishad": ["Baniachang North-East", "Baniachang North-West", "Baniachang South-East", "Baniachang South-West", "Baraiuri", "Daulatpur", "Kagapasha", "Khagaura", "Makrampur", "Mandari", "Muradpur", "Pailarkandi", "Pukra", "Subidpur", "Sujatpur"] },
      "Chunarughat": { "Union Parishad": ["Ahammadabad", "Chunarughat", "Deorgachh", "Gazipur", "Mirashi", "Paikpara", "Ranigaon", "Sadekpur", "Shankhola", "Ubahata"] },
      "Habiganj Sadar": { "Union Parishad": ["Gopaya", "Laskarpur", "Lukra", "Nizampur", "Poil", "Rajiura", "Richi", "Tegharia"] }
    }
  }
};
