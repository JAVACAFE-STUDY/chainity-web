/**
 * The app structure:
 *
 * {
 *   title: string;
 *   description: string;
 *   image?: string;
 *   link: string;
 *   source?: string;
 *   similarWebVisits?: number;
 *   index: number; // Order added
 * }
 */
const appList = [
  {
    title: 'Bethesda.net',
    description:
      'The official site for Bethesda, publisher of Fallout, DOOM, Dishonored, ' +
      'Skyrim, Wolfenstein, The Elder Scrolls, more. Your source for news, features & community.',
    image: 'bethesda.jpg',
    link: 'https://bethesda.net/',
    similarWebVisits: 18600,
    index: 30,
  },
  {
    title: 'Serasa Consumidor',
    description:
      'Consulte seu CPF e Score grátis rápido e fácil. Simule e consiga empréstimo com taxas que ' +
      'cabem no seu bolso. Saiba como limpar seu nome, acompanhe dicas sobre finanças pessoais e ' +
      'monitore seu CPF 24h por dia. 🇧🇷',
    image: 'serasaconsumidor.jpg',
    link: 'https://www.serasaconsumidor.com.br/',
    similarWebVisits: 18100,
    index: 34,
  },
  {
    title: 'Better Business Bureau',
    description:
      'Better Business Bureau helps United States consumers find businesses and charities they ' +
      'can trust.',
    image: 'bbb.jpg',
    link: 'https://bbb.org/',
    similarWebVisits: 11000,
    index: 30,
  },
  {
    title: 'OpenClassrooms',
    description:
      'OpenClassrooms is an online platform offering top quality, ' +
      'education-to-employment programs and career coaching services for students worldwide. ',
    image: 'openclassrooms.jpg',
    link: 'https://openclassrooms.com/en/',
    similarWebVisits: 10190,
    index: 34,
  },
  {
    title: 'Leroy Merlin',
    description:
      'Per i vostri progetti di bricolage, giardinaggio e miglioramento della casa, ' +
      'Leroy Merlin propone una grande scelta di marche al prezzo migliore. ' +
      'Tanti prodotti per tutta la casa: bagno, cucina, giardino, riscaldamento, elettricità, ' +
      'idraulica… Ritira in negozio o ricevi comodamente a casa. 🇮🇹',
    image: 'leroymerlin.jpg',
    link: 'https://www.leroymerlin.it/',
    similarWebVisits: 4400,
    index: 30,
  },
  {
    title: 'Codementor',
    description:
      'Codementor is the largest community for developer mentorship and an on-demand marketplace ' +
      'for software developers. Get instant coding help, build projects faster, ' +
      'and read programming tutorials from our community of developers.',
    image: 'codementor.jpg',
    link: 'https://www.codementor.io/',
    similarWebVisits: 2980,
    index: 34,
  },
  {
    title: 'BARKS',
    description: 'Japan Music Network. 🇯🇵',
    image: 'barks.jpg',
    link: 'https://www.barks.jp/',
    similarWebVisits: 2700,
    index: 30,
  },
  {
    title: 'GovX',
    description:
      'Current & former uniformed professionals get exclusive access to deals ' +
      'on gear, apparel, tickets, travel and more.',
    image: 'govx.jpg',
    link: 'https://www.govx.com/',
    similarWebVisits: 1200,
    index: 31,
  },
  {
    title: 'SFR Presse',
    description:
      'SFR Presse provides the best access to french newspapers, ' +
      'magazines and real time streams, personalized for you. 🇫🇷',
    image: 'sfrpresse.jpg',
    link: 'https://sfrpresse.sfr.fr/',
    similarWebVisits: 710,
    index: 25,
  },
  {
    title: 'AospExtended Download center',
    description:
      'A download center that hosts all the official builds of AospExtended ROM, ' +
      'for supported devices for different android versions.',
    image: 'aexdownloadcenter.jpg',
    link: 'https://downloads.aospextended.com/',
    similarWebVisits: 730,
    index: 28,
  },
  {
    title: 'Onepixel',
    description: 'Beautiful Stock Photos for $1.',
    image: 'onepixel.jpg',
    link: 'https://www.onepixel.com/',
    similarWebVisits: 552,
    index: 26,
  },
  {
    title: 'Sweek',
    description:
      'Read thousands of free books, stories and serials on Sweek. ' +
      'Challenge yourself in writing. Turn your stories into books via Sweek Publishing. ' +
      'Join the global community of readers and writers!',
    image: 'sweek.jpg',
    link: 'https://sweek.com/',
    similarWebVisits: 383,
    index: 30,
  },
  {
    title: 'Hijup',
    description: 'A pioneering Muslim Fashion e-commerce site.',
    image: 'hijup.jpg',
    link: 'https://www.hijup.com/',
    similarWebVisits: 328,
    index: 18,
  },
  {
    title: 'iFit',
    description:
      'Get the best personal training, right at home. Access hundreds of training programs, ' +
      'unique health tips, and expert advice that will lead you to a healthier lifestyle.',
    image: 'ifit.jpg',
    link: 'https://www.ifit.com/',
    similarWebVisits: 304,
    index: 30,
  },
  {
    title: 'NEO Tracker',
    description: 'NEO blockchain explorer and wallet.',
    image: 'neotracker.jpg',
    link: 'https://neotracker.io/',
    similarWebVisits: 350,
    index: 30,
  },
  {
    title: 'EQ3',
    description: 'Modern Furniture & Accessories, designed in Canada, for everyday living.',
    image: 'eq3.jpg',
    link: 'https://www.eq3.com/ca/en/',
    similarWebVisits: 256,
    index: 34,
  },
  {
    title: 'Housecall Pro',
    description:
      'The #1 rated mobile software to run your home service business. ' +
      'Schedule, dispatch, GPS track employees, invoice, accept credit cards and get booked ' +
      'online. The marketing website is also built with Material-UI: https://www.housecallpro.com/',
    image: 'housecall.jpg',
    link: 'https://pro.housecall.io/pro/log_in',
    similarWebVisits: 214,
    index: 30,
  },
  {
    title: 'BitCambio',
    description:
      'A BitCambio oferece a facilidade de comprar e vender a moeda virtual bitcoin ' +
      'de forma direta e segura no Brasil. 🇧🇷',
    image: 'bitcambio.jpg',
    link: 'https://bitcambio.com.br/',
    similarWebVisits: 148,
    index: 30,
  },
  {
    title: 'VMware CloudHealth',
    description:
      'The most trusted cloud management platform that enables users to analyze and manage cloud ' +
      'cost, usage and performance in one place. ' +
      '(Used for the business application, but not the marketing website.)',
    image: 'cloudhealth.jpg',
    link: 'https://www.cloudhealthtech.com/',
    similarWebVisits: 132,
    index: 37,
  },
  {
    title: 'CityAds',
    description:
      'CityAds Media: global technology platform for online performance marketing ' +
      'powered by big data',
    image: 'cityads.jpg',
    link: 'https://cityads.com/main',
    similarWebVisits: 132,
    index: 30,
  },
  {
    title: 'EOS Toolkit',
    description:
      'EOSToolkit is the premier free, open source interface for managing EOS ' +
      'accounts. Create, transfer, stake, vote and more with Scatter!',
    image: 'eostoolkit.jpg',
    link: 'https://www.eostoolkit.io/',
    source: 'https://github.com/generEOS/eostoolkit',
    similarWebVisits: 123,
    index: 30,
  },
  {
    title: 'The Media Ant',
    description:
      "India's Largest online marketing service provider, " +
      'with more than 200K advertising options, and more than 1M satisfied customers.',
    image: 'themediaant.jpg',
    link: 'https://themediaant.com/',
    similarWebVisits: 112,
    index: 30,
  },
  {
    title: 'Forex Bank',
    description:
      'Vi kan tilby kjapp og enkel valutaveksling, pengeoverføringer, samt kjøp av norsk veksel. ' +
      '🇳🇴',
    image: 'forex.jpg',
    link: 'https://www.forex.no/',
    similarWebVisits: 95,
    index: 34,
  },
  {
    title: 'Numerai',
    description: ' Earn cryptocurrency in weekly data science competitions.',
    image: 'numerai.jpg',
    link: 'https://numer.ai/homepage',
    similarWebVisits: 65,
    index: 30,
  },
  {
    title: 'LocalMonero',
    description:
      'A safe and easy-to-use person-to-person platform to allow anyone ' +
      'to trade their local currency for Monero, anywhere.',
    image: 'localmonero.jpg',
    link: 'https://localmonero.co/?rc=ogps',
    index: 4,
  },
  {
    title: 'LessWrong',
    description: 'LessWrong is a community blog devoted to the art of human rationality.',
    image: 'lesswrong.jpg',
    link: 'https://lesswrong.com/',
    index: 30,
  },
  {
    title: 'Fizix',
    description: 'Coaching sportif à domicile. 🇫🇷',
    image: 'fizix.jpg',
    link: 'https://www.fizix.io/',
    index: 30,
  },
  {
    title: 'Venuemob',
    description:
      'A platform for individuals and businesses to find and book the perfect venue for any event.',
    image: 'venuemob.jpg',
    link: 'https://venuemob.com.au/',
    index: 2,
  },
  {
    title: 'ODIGEO Connect',
    description:
      'Connect your hotel, B&B and apartment with Europe’s #1 flight OTA ' +
      'and distribute it to millions of travellers.',
    image: 'odigeo.jpg',
    link: 'https://odigeoconnect.com/',
    index: 30,
  },
  {
    title: 'comet',
    description:
      'Comet lets you track code, experiments, and results on ML projects. ' +
      'It’s fast, simple, and free for open source projects.',
    image: 'comet.jpg',
    link: 'https://www.comet.ml/',
    index: 30,
  },
  {
    title: 'Pointer',
    description:
      'Revestimentos cerâmicos para pisos e paredes com qualidade e design acessível. ' +
      'A Pointer faz parte da Portobello e atua no Nordeste do Brasil. 🇧🇷',
    image: 'pointer.jpg',
    link: 'https://www.pointer.com.br/',
    index: 30,
  },
  {
    title: 'Oneplanetcrowd',
    description:
      'Oneplanetcrowd is Europe’s leading sustainable crowdfunding platform for People & Planet.',
    image: 'oneplanetcrowd.jpg',
    link: 'https://oneplanetcrowd.com/en',
    index: 30,
  },
  {
    title: 'CollegeAI',
    description:
      'Get a college recommendation and your chances using the best college predictor. ' +
      "Answer some questions and we'll calculate where you fit in best with our college finder " +
      'and college matching tools. CollegeAI is an admissions and college counselor, college ' +
      'planner, and college chance calculator.',
    image: 'collegeai.jpg',
    link: 'https://collegeai.com',
    index: 30,
  },
  {
    title: 'react-admin',
    description:
      'The admin of an imaginary poster shop, used as a demo for the react-admin framework. ' +
      'Uses many material-ui components, including tables, forms, snackbars, buttons, and ' +
      'theming. The UI is responsive. The code is open-source!',
    image: 'posters-galore.jpg',
    link: 'https://marmelab.com/react-admin-demo/',
    source:
      'https://github.com/marmelab/react-admin/tree/be23a1a8ebc4e2293b57898adcb2f359e836f0fd/examples/demo',
    index: 21,
  },
  {
    title: 'Builder Book',
    description:
      'An open source web app to write and host documentation or sell books. ' +
      'Built with React, Material-UI, Next, Express, Mongoose, MongoDB.',
    image: 'builderbook.jpg',
    link: 'https://builderbook.org/',
    source: 'https://github.com/builderbook/builderbook',
    index: 5,
  },
  {
    title: 'Commit Swimming',
    description: 'The #1 workout journal for coaches and swimmers.',
    image: 'commitswimming.jpg',
    link: 'https://www.commitswimming.com/',
    index: 30,
  },
  {
    title: 'EventHi',
    description:
      'Cannabis event platform to create and coordinate Cannabis events for the Cannabis ' +
      'community. Use our easy ticketing system, sponsor, and sell merchandise.',
    image: 'eventhi.jpg',
    link: 'https://eventhi.io/',
    index: 30,
  },
  {
    title: 'Cryptoverview: A friendly Dashboard for your cryptocurrency portfolio',
    description:
      "Cryptoverview is a responsive webapp that displays a user's Bittrex portfolio, " +
      'trending currencies and market caps. It provides some fancy charts, ' +
      'news related to cryptocurrencies, and more. (demo:demo)',
    image: 'cryptoverview.jpg',
    link: 'https://cryptoverview.com/',
    index: 9,
  },
  {
    title: 'TuDiscovery',
    description: 'Discovery Channel Latin America. 🇪🇸',
    image: 'tudiscovery.jpg',
    link: 'https://www.tudiscovery.com/',
    index: 30,
  },
  {
    title: 'Iceberg Finder',
    description:
      'Whether spotting them from outer space, or standing on our coastline, ' +
      'IcebergFinder.com is your premier place for finding bergs in Newfoundland and Labrador.',
    image: 'icebergfinder.jpg',
    link: 'https://icebergfinder.com/',
    index: 30,
  },
  {
    title: 'Rare Bits',
    description: 'Rare Bits is a marketplace where users can buy, sell and discover crypto assets.',
    image: 'rarebits.jpg',
    link: 'https://rarebits.io/',
    index: 30,
  },
  {
    title: 'Roast',
    description: 'Roast.io makes web hosting HTML and JS single-page apps fast, secure, and easy.',
    image: 'roast.jpg',
    link: 'https://roast.io/',
    index: 30,
  },
  {
    title: 'Melbourne Mint',
    description:
      'The Melbourne Mint has been synonymous with precious metals and currency ' +
      'for over 100 years.',
    image: 'melbournemint.jpg',
    link: 'https://melbournemint.com.au/',
    index: 30,
  },
  {
    title: 'Pilcro',
    description: 'A free brand management software for the Google Suite.',
    image: 'pilcro.jpg',
    link: 'https://www.pilcro.com/',
    index: 17,
  },
  {
    title: 'Rung - Exceptionality Management',
    description:
      'Rung alerts you about the exceptionalities of your personal and professional life.',
    image: 'rung.jpg',
    link: 'https://app.rung.com.br/',
    index: 12,
  },
  {
    title: 'MetaFact',
    description:
      'Metafact is a place to verify knowledge via the world’s top experts. ' +
      'It’s a platform to ask questions, learn the facts and share the truth.',
    image: 'metafact.jpg',
    link: 'metafact.io/',
    index: 30,
  },
  {
    title: 'Arkopharma',
    description: 'Arkopharma Laboritories customer loyalty site. 🇫🇷',
    image: 'arkoclub.jpg',
    link: 'https://www.arkoclub.com/',
    index: 30,
  },
  {
    title: 'Modole Language Exchange',
    description:
      "Web app that allows users to write in the language they're learning " +
      'and have it corrected by native speakers.',
    image: 'modole.jpg',
    link: 'https://en.modole.io/',
    index: 6,
  },
  {
    title: 'Manty Vision',
    description:
      'An Open Data tool showing financial and demographic data for all the towns in France.',
    image: 'manty.jpg',
    link: 'https://app.manty.eu/',
    index: 1,
  },
  {
    title: 'Johnny Metrics',
    description: 'Upload your trades, and analyze your crypto portfolio.',
    link: 'https://app.johnnymetrics.com/demo',
    image: 'johnnymetrics.jpg',
    index: 14,
  },
  {
    title: 'AudioNodes',
    description:
      'Modular audio production suite with multi-track audio mixing, audio effects, ' +
      'parameter automation, MIDI editing, synthesis, cloud production, and more.',
    image: 'audionodes.jpg',
    link: 'https://audionodes.com/',
    index: 7,
  },
  {
    title: 'SlidesUp',
    description: 'SlidesUp is a platform to help conference organizers plan their events.',
    image: 'slidesup.jpg',
    link: 'https://slidesup.com/',
    index: 3,
  },
  {
    title: 'Trafikito',
    description:
      'Free servers monitoring solution which can track any output of any command and do ' +
      'automated action. By default it tracks average load, CPU, HDD, RAM and sends email when ' +
      'something is going wrong.',
    image: 'trafikito-monitoring.jpg',
    link: 'https://trafikito.com/',
    index: 20,
  },
  {
    title: 'Hokan',
    description:
      'Customer management and contract management we service for the insurance industry. 🇯🇵',
    image: 'hkn.jpg',
    link: 'https://hkn.jp/',
    index: 30,
  },
  {
    title: 'One Shot Move',
    description: 'An LA based moving company.',
    image: 'oneshotmove.jpg',
    link: 'https://oneshotmove.com/',
    index: 30,
  },
  {
    title: 'Fluxguard',
    description:
      'Fluxguard monitors Web site changes for defacement & tamper protection, visual ' +
      'regression testing, synthetic transaction monitoring, and more.',
    image: 'fluxguard.jpg',
    link: 'https://www.fluxguard.com/',
    index: 30,
  },
  {
    title: 'Magic Mondayz',
    description:
      'A company that focuses on providing an honest and efficient recruitment service, ' +
      'the human way.',
    image: 'magicmondayz.jpg',
    link: 'https://magicmondayz.com/',
    index: 30,
  },
  {
    title: 'Typekev',
    description:
      'The personal website of a React and Blockchain developer. The code is open-source.',
    image: 'typekev.jpg',
    link: 'https://typekev.com/',
    source: 'https://github.com/typekev/typekev-site',
    index: 23,
  },
  {
    title: 'Flink',
    description:
      'We revolutionized the insurance contract and developed new products that are ' +
      'ahead of their time: MyThings and MyDamages. With only half a page of text and simple ' +
      'illustrations, we have developed the shortest insurance contracts worldwide. ' +
      'And the simplest.',
    image: 'flink.jpg',
    link: 'https://goflink.ch/',
    index: 30,
  },
  {
    title: 'DropDesk',
    description:
      'DropDesk creates unique workspaces & experiences by converting unused space into vibrant ' +
      'coworking spaces. Meet, work and gain a sense of community.',
    image: 'dropdesk.jpg',
    link: 'https://drop-desk.com/',
    index: 30,
  },
  {
    title: 'Tentu',
    description:
      'A web app built with Material-UI v1 and Firebase that offers the user news and events ' +
      'of interest. 🇪🇸',
    link: 'https://tentu.eus/',
    image: 'tentu.jpg',
    index: 22,
  },
  {
    title: 'Misheneye',
    description:
      'Creates custom brand guides for companies. It walks you through creating your ' +
      'mission, vision, values, colors, typography and imagery choices, then displays them in ' +
      'a beautiful brand guide for your organization.',
    image: 'misheneye.jpg',
    link: 'https://www.misheneye.com',
    index: 36,
  },
  {
    title: 'Swimmy',
    description: 'An open source forum PWA. 🇯🇵 (Github docs are in English)',
    image: 'swimmy.jpg',
    link: 'https://swimmy.io/',
    source: 'https://github.com/swimmy/swimmy.io',
    stars: 3,
    index: 27,
  },
  {
    title: 'Planalyze',
    description:
      'Planalyze is a real-time daily planning & task tracking tool that keeps teams connected ' +
      "& ahead of each day's workload.",
    image: 'planalyze.jpg',
    link: 'https://www.planalyze.io/',
    index: 10,
  },
  {
    title: 'PhotoUtils',
    description: 'Online photo editor. 6 simple and free image editing tools.',
    image: 'photoutils.jpg',
    link: 'https://photoutils.com/',
    index: 32,
  },
  {
    title: 'Local Insights',
    description:
      'A real estate data provider that aggregates and analyzes property records, ' +
      'permits, and tax documents.',
    image: 'localinsights.jpg',
    link: 'https://localinsights.io/',
    index: 16,
  },
  {
    title: 'Code Typing Tutor',
    description: 'Keyboard simulator that helps to write code quickly and without errors.',
    image: 'code-typing-tutor.png',
    link: 'https://code-typing-tutor.com/',
    index: 29,
  },
  {
    title: 'Team SC',
    description:
      'The site of a cognitive neuroscience research group, ' +
      'with a carefully designed interface and animation. 🇨🇳',
    image: 'sc.bnu.edu.cn.jpg',
    link: 'http://sc.bnu.edu.cn/',
    index: 13,
  },
  {
    title: 'npm registry browser',
    description:
      'An open source web app that lets you search the npm registry ' +
      'and browse packages details.',
    image: 'npm-registry-browser.jpg',
    link: 'https://topheman.github.io/npm-registry-browser/',
    source: 'https://github.com/topheman/npm-registry-browser',
    stars: 78,
    index: 15,
  },
  {
    title: 'Snippets Chrome Extension',
    description:
      'An open source Chrome extension allowing you to import and execute JavaScript code ' +
      'snippets from GitHub.',
    image: 'snippets.jpg',
    link: 'https://chrome.google.com/webstore/detail/snippets/dcibnkkafifbanoclgjbkmkbogijndin',
    source: 'https://github.com/richardscarrott/snippets',
    stars: 36,
    index: 19,
  },
  {
    title: 'Material Blog',
    description:
      'An open source blog with a UI built entirely using material-ui v1. ' +
      'Check out the theming page, which leverages `MuiThemeProvider` ' +
      'to allow for live theme changes.',
    link: 'https://jdupont.github.io/',
    source: 'https://github.com/jdupont/jdupont.github.io',
    stars: 14,
    index: 11,
  },
  {
    title: 'Tree',
    description:
      'An open source top 100 documentaries (personal opinion) app ' +
      'with React Hooks and Material-UI.',
    link: 'https://tree.valleyease.me/',
    image: 'tree.jpg',
    source: 'https://github.com/ValleyZw/tree',
    stars: 7,
    index: 35,
  },
  {
    title: 'Componofy: Spotify Playlist Combination',
    description:
      'An open source web app that allows a Spotify user to combine private and public playlists ' +
      'and either create a new one or merge with existing playlist. ' +
      'You can also reorder your playlist tracks and upload new playlist cover images.',
    link: 'https://componofy.herokuapp.com/',
    source: 'https://github.com/DalerAsrorov/componofy',
    stars: 5,
    index: 8,
  },
  {
    title: 'Insights',
    description:
      '"Insights" by Just Ask Users helps user experience research teams ' +
      "make sense of their user study findings. Teams can see their users' pains and needs " +
      'easily so that they can enhance the product that they are designing. ' +
      'Material-UI is used both on the website (with server-side rendering) and ' +
      'within the interactive app itself.',
    link: 'https://justaskusers.com/',
    index: 24,
  },
  {
    title: 'Gadr',
    description:
      'Follow top performing crypto traders. ' +
      'Get notifications from your favorite traders. Get a full overview of your crypto assets.' +
      'Share your portfolio with the world and see how you stack up to the best',
    link: 'https://gadr.io/',
    index: 33,
  },
  {
    title: 'Persona',
    description: 'Zero knowledge digital identity management system built on blockchain.',
    link: 'https://persona.im/',
    image: 'persona.jpg',
  },
];

export default appList;
