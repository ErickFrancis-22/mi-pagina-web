// Agregá un objeto por cada proyecto.
// image: ruta de una captura, por ejemplo "assets/lachelona.png".
// repo y demo: enlace HTTPS o null si todavía no existe.

window.portfolioProjects = [
  {
    title: {
      es: "LaChelona",
      en: "LaChelona"
    },
    description: {
      es: "Proyecto académico colaborativo de un sistema web y móvil para una distribuidora de bebidas. Participo en la coordinación del equipo, el diseño de la base de datos y el backend.",
      en: "A collaborative academic project for a beverage distributor, with web and mobile applications. I contribute to team coordination, database design and backend development."
    },
    status: {
      es: "EN DESARROLLO",
      en: "IN DEVELOPMENT"
    },
    technologies: ["Laravel", "Vue", "Ionic", "Angular"],
    repo: "https://github.com/ErickFrancis-22/LaChelona/tree/develop",
    demo: null,
    image: null
  },
  {
    title: {
      es: "Lo que viene",
      en: "What's next"
    },
    description: {
      es: "Este espacio está reservado para un próximo proyecto. Cada nuevo reto tendrá su lugar aquí.",
      en: "A space reserved for an upcoming project. Every new challenge will have a place here."
    },
    status: {
      es: "PRÓXIMAMENTE",
      en: "COMING SOON"
    },
    technologies: [],
    repo: null,
    demo: null,
    image: null,
    placeholder: true
  }
];