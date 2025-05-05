// Base de datos simulada
const database = {
    users: [],
    events: [],
    currentUser: null
  };
  
  // Estados de México
  const estadosMexico = [
    "Aguascalientes",
    "Baja California",
    "Baja California Sur",
    "Campeche",
    "Chiapas",
    "Chihuahua",
    "Ciudad de México",
    "Coahuila",
    "Colima",
    "Durango",
    "Estado de México",
    "Guanajuato",
    "Guerrero",
    "Hidalgo",
    "Jalisco",
    "Michoacán",
    "Morelos",
    "Nayarit",
    "Nuevo León",
    "Oaxaca",
    "Puebla",
    "Querétaro",
    "Quintana Roo",
    "San Luis Potosí",
    "Sinaloa",
    "Sonora",
    "Tabasco",
    "Tamaulipas",
    "Tlaxcala",
    "Veracruz",
    "Yucatán",
    "Zacatecas"
  ];
  
  // Tipos de eventos
  const eventTypes = {
    hiking: "Senderismo",
    skating: "Patinaje Callejero",
    cycling: "Cycling Callejero",
    running: "Running"
  };
  
  // Precios por tamaño de evento
  const eventPricing = [
    { min: 2, max: 49, price: 0 },
    { min: 50, max: 99, price: 180 },
    { min: 100, max: 149, price: 320 },
    { min: 150, max: 199, price: 450 }
  ];
  
  // DOM Elements
  const eventsContainer = document.getElementById("events-container");
  const tabButtons = document.querySelectorAll(".tab-button");
  const loginBtn = document.getElementById("login-btn");
  const registerBtn = document.getElementById("register-btn");
  const hostBtn = document.getElementById("host-btn");
  const logoutBtn = document.getElementById("logout-btn");
  const loginModal = document.getElementById("login-modal");
  const registerModal = document.getElementById("register-modal");
  const createEventModal = document.getElementById("create-event-modal");
  const eventDetailsModal = document.getElementById("event-details-modal");
  const qrModal = document.getElementById("qr-modal");
  const closeButtons = document.querySelectorAll(".close");
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const createEventForm = document.getElementById("create-event-form");
  const showRegisterLink = document.getElementById("show-register");
  const registerStateSelect = document.getElementById("register-state");
  const eventStateSelect = document.getElementById("event-state");
  const eventMinInput = document.getElementById("event-min");
  const eventMaxInput = document.getElementById("event-max");
  const eventCostDisplay = document.getElementById("event-cost-display");
  const eventCostSpan = document.getElementById("event-cost");
  
  // Variables de estado
  let currentTab = "all";
  let selectedEvent = null;
  
  // Inicialización
  document.addEventListener("DOMContentLoaded", () => {
    // Llenar selects de estados
    fillStateSelects();
  
    // Cargar datos de prueba
    loadSampleData();
  
    // Mostrar eventos
    displayEvents();
  
    // Configurar event listeners
    setupEventListeners();
  });
  
  function fillStateSelects() {
    estadosMexico.forEach((state) => {
      const option1 = document.createElement("option");
      option1.value = state;
      option1.textContent = state;
      registerStateSelect.appendChild(option1);
  
      const option2 = document.createElement("option");
      option2.value = state;
      option2.textContent = state;
      eventStateSelect.appendChild(option2);
    });
  }
  
  function loadSampleData() {
    // Usuarios de prueba
    database.users.push({
      id: 1,
      name: "Juan Pérez",
      email: "juan@example.com",
      password: "123456",
      gender: "masculino",
      state: "Ciudad de México",
      city: "CDMX",
      isHost: true,
      verified: true
    });
  
    database.users.push({
      id: 2,
      name: "María García",
      email: "maria@example.com",
      password: "123456",
      gender: "femenino",
      state: "Jalisco",
      city: "Guadalajara",
      isHost: false,
      verified: true
    });
  
    // Eventos de prueba
    database.events.push({
      id: 1,
      type: "hiking",
      title: "Senderismo en el Ajusco",
      description:
        "Ruta de senderismo de dificultad media en el Parque Nacional Cumbres del Ajusco.",
      state: "Ciudad de México",
      city: "CDMX",
      address:
        "Parque Nacional Cumbres del Ajusco, Carretera Picacho-Ajusco Km 11.5",
      date: "2023-12-15",
      time: "08:00",
      minParticipants: 5,
      maxParticipants: 20,
      currentParticipants: 8,
      hostId: 1,
      participants: [2],
      cost: 0
    });
  
    database.events.push({
      id: 2,
      type: "cycling",
      title: "Recorrido en bici por Reforma",
      description:
        "Recorrido dominical por Paseo de la Reforma. Traer tu propia bicicleta.",
      state: "Ciudad de México",
      city: "CDMX",
      address: "Ángel de la Independencia, Paseo de la Reforma",
      date: "2023-12-10",
      time: "09:00",
      minParticipants: 10,
      maxParticipants: 50,
      currentParticipants: 35,
      hostId: 1,
      participants: [],
      cost: 0
    });
  
    database.events.push({
      id: 3,
      type: "running",
      title: "Carrera 5K en Guadalajara",
      description:
        "Carrera recreativa de 5 kilómetros en el Parque Metropolitano.",
      state: "Jalisco",
      city: "Guadalajara",
      address: "Parque Metropolitano, Av. Parque Metropolitano 1",
      date: "2023-12-20",
      time: "07:30",
      minParticipants: 20,
      maxParticipants: 100,
      currentParticipants: 95,
      hostId: 1,
      participants: [],
      cost: 180
    });
  }
  
  function setupEventListeners() {
    // Pestañas de tipos de eventos
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        tabButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        currentTab = button.dataset.tab;
        displayEvents();
      });
    });
  
    // Botones de usuario
    loginBtn.addEventListener(
      "click",
      () => (loginModal.style.display = "block")
    );
    registerBtn.addEventListener(
      "click",
      () => (registerModal.style.display = "block")
    );
    hostBtn.addEventListener(
      "click",
      () => (createEventModal.style.display = "block")
    );
    logoutBtn.addEventListener("click", logout);
  
    // Cerrar modales
    closeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const modal = button.closest(".modal");
        modal.style.display = "none";
      });
    });
  
    // Alternar entre login y registro
    showRegisterLink.addEventListener("click", (e) => {
      e.preventDefault();
      loginModal.style.display = "none";
      registerModal.style.display = "block";
    });
  
    // Formularios
    loginForm.addEventListener("submit", handleLogin);
    registerForm.addEventListener("submit", handleRegister);
    createEventForm.addEventListener("submit", handleCreateEvent);
  
    // Cambios en número de participantes para calcular costo
    eventMinInput.addEventListener("change", calculateEventCost);
    eventMaxInput.addEventListener("change", calculateEventCost);
  
    // Cerrar modales al hacer clic fuera
    window.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        e.target.style.display = "none";
      }
    });
  }
  
  function displayEvents() {
    eventsContainer.innerHTML = "";
  
    let eventsToShow = database.events;
  
    // Filtrar por pestaña seleccionada
    if (currentTab !== "all") {
      eventsToShow = eventsToShow.filter((event) => event.type === currentTab);
    }
  
    // Ordenar por fecha más cercana
    eventsToShow.sort((a, b) => new Date(a.date) - new Date(b.date));
  
    if (eventsToShow.length === 0) {
      eventsContainer.innerHTML =
        "<p>No hay eventos disponibles en esta categoría.</p>";
      return;
    }
  
    eventsToShow.forEach((event) => {
      const eventCard = document.createElement("div");
      eventCard.className = `event-card ${event.type}`;
  
      const host = database.users.find((user) => user.id === event.hostId);
  
      eventCard.innerHTML = `
              <div class="event-image"></div>
              <div class="event-info">
                  <h3>${event.title}</h3>
                  <div class="event-meta">
                      <span>${eventTypes[event.type]}</span>
                      <span>${formatDate(event.date)} ${event.time}</span>
                  </div>
                  <div class="event-location">
                      <p><strong>Ubicación:</strong> ${event.city}, ${
        event.state
      }</p>
                  </div>
                  <div class="event-participants">
                      <span>${event.currentParticipants}/${
        event.maxParticipants
      }</span>
                      <div class="progress">
                          <div class="progress-bar" style="width: ${
                            (event.currentParticipants / event.maxParticipants) *
                            100
                          }%"></div>
                      </div>
                      <span>${
                        event.currentParticipants >= event.maxParticipants
                          ? "Completo"
                          : "Disponible"
                      }</span>
                  </div>
              </div>
          `;
  
      eventCard.addEventListener("click", () => showEventDetails(event.id));
      eventsContainer.appendChild(eventCard);
    });
  }
  
  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("es-MX", options);
  }
  
  function showEventDetails(eventId) {
    const event = database.events.find((e) => e.id === eventId);
    if (!event) return;
  
    selectedEvent = event;
    const host = database.users.find((user) => user.id === event.hostId);
  
    // Llenar detalles del evento
    document.getElementById("detail-event-title").textContent = event.title;
    document.getElementById("detail-event-type").textContent =
      eventTypes[event.type];
    document.getElementById("detail-event-state").textContent = event.state;
    document.getElementById("detail-event-city").textContent = event.city;
    document.getElementById("detail-event-address").textContent = event.address;
    document.getElementById("detail-event-datetime").textContent = `${formatDate(
      event.date
    )} a las ${event.time}`;
    document.getElementById("detail-event-description").textContent =
      event.description;
    document.getElementById("detail-event-participants").textContent =
      event.currentParticipants;
    document.getElementById("detail-event-max").textContent =
      event.maxParticipants;
    document.getElementById("detail-event-host").textContent = host.name;
  
    // Mostrar/ocultar controles según el usuario
    const joinSection = document.getElementById("join-event-section");
    const hostControls = document.getElementById("host-controls");
    const fullMessage = document.getElementById("event-full-message");
  
    if (database.currentUser && database.currentUser.id === host.id) {
      // Es el anfitrión
      joinSection.style.display = "none";
      hostControls.style.display = "block";
      document.getElementById("host-participants-count").textContent =
        event.currentParticipants;
    } else {
      // No es el anfitrión
      joinSection.style.display = "block";
      hostControls.style.display = "none";
  
      if (event.currentParticipants >= event.maxParticipants) {
        document.getElementById("join-event-btn").style.display = "none";
        fullMessage.style.display = "block";
      } else {
        document.getElementById("join-event-btn").style.display = "block";
        fullMessage.style.display = "none";
      }
    }
  
    // Configurar botón de unirse
    const joinBtn = document.getElementById("join-event-btn");
    joinBtn.onclick = null; // Limpiar eventos anteriores
  
    if (database.currentUser) {
      const isParticipating = event.participants.includes(
        database.currentUser.id
      );
  
      if (isParticipating) {
        joinBtn.textContent = "Ya estás inscrito";
        joinBtn.disabled = true;
        joinBtn.style.backgroundColor = "#95a5a6";
      } else {
        joinBtn.textContent = "Unirse al Evento";
        joinBtn.disabled = false;
        joinBtn.style.backgroundColor = "";
        joinBtn.addEventListener("click", () => joinEvent(eventId));
      }
    } else {
      joinBtn.textContent = "Inicia sesión para unirte";
      joinBtn.disabled = true;
      joinBtn.style.backgroundColor = "#95a5a6";
    }
  
    // Configurar botón de cancelar evento
    const cancelBtn = document.getElementById("cancel-event-btn");
    cancelBtn.onclick = null;
    cancelBtn.addEventListener("click", () => cancelEvent(eventId));
  
    eventDetailsModal.style.display = "block";
  }
  
  function joinEvent(eventId) {
    const event = database.events.find((e) => e.id === eventId);
    if (!event || !database.currentUser) return;
  
    // Verificar si ya está inscrito
    if (event.participants.includes(database.currentUser.id)) {
      alert("Ya estás inscrito en este evento.");
      return;
    }
  
    // Verificar si hay espacio
    if (event.currentParticipants >= event.maxParticipants) {
      alert("Este evento ha alcanzado su capacidad máxima.");
      return;
    }
  
    // Inscribir usuario
    event.participants.push(database.currentUser.id);
    event.currentParticipants++;
  
    // Mostrar QR
    showQRConfirmation(event);
  
    // Actualizar vista
    displayEvents();
    eventDetailsModal.style.display = "none";
  
    // Enviar "correo" de confirmación
    sendConfirmationEmail(database.currentUser.email, event);
  }
  
  function showQRConfirmation(event) {
    const qrContainer = document.getElementById("qrcode");
    qrContainer.innerHTML = "";
  
    const qrData = `ActiveHub|${event.id}|${
      database.currentUser.id
    }|${Date.now()}`;
    new QRCode(qrContainer, {
      text: qrData,
      width: 200,
      height: 200,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  
    qrModal.style.display = "block";
  }
  
  function sendConfirmationEmail(email, event) {
    console.log(
      `Enviando correo a ${email} con confirmación del evento "${event.title}"`
    );
    // En una aplicación real, aquí se haría una llamada a un servicio de correo
  }
  
  function cancelEvent(eventId) {
    if (
      !confirm(
        "¿Estás seguro de que deseas cancelar este evento? Todos los participantes serán notificados."
      )
    ) {
      return;
    }
  
    const eventIndex = database.events.findIndex((e) => e.id === eventId);
    if (eventIndex === -1) return;
  
    // Notificar participantes (simulado)
    const event = database.events[eventIndex];
    event.participants.forEach((userId) => {
      const user = database.users.find((u) => u.id === userId);
      if (user) {
        console.log(
          `Notificando a ${user.email} sobre la cancelación del evento "${event.title}"`
        );
      }
    });
  
    // Eliminar evento
    database.events.splice(eventIndex, 1);
  
    // Actualizar vista
    displayEvents();
    eventDetailsModal.style.display = "none";
    alert("Evento cancelado exitosamente.");
  }
  
  function handleLogin(e) {
    e.preventDefault();
  
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
  
    const user = database.users.find(
      (u) => u.email === email && u.password === password
    );
  
    if (user) {
      if (!user.verified) {
        alert(
          "Por favor verifica tu correo electrónico antes de iniciar sesión."
        );
        return;
      }
  
      database.currentUser = user;
      updateUIAfterLogin();
      loginModal.style.display = "none";
      alert(`Bienvenido ${user.name}!`);
    } else {
      alert("Correo electrónico o contraseña incorrectos.");
    }
  }
  
  function handleRegister(e) {
    e.preventDefault();
  
    const name = document.getElementById("register-name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const gender = document.getElementById("register-gender").value;
    const state = document.getElementById("register-state").value;
    const city = document.getElementById("register-city").value;
    const isHost = document.getElementById("register-host").checked;
  
    // Validar que el correo no esté registrado
    if (database.users.some((u) => u.email === email)) {
      alert("Este correo electrónico ya está registrado.");
      return;
    }
    // Crear nuevo usuario
    const newUser = {
      id: database.users.length + 1,
      name,
      email,
      password,
      gender,
      state,
      city,
      isHost,
      verified: false // En una app real, se enviaría un correo de verificación
    };
  
    database.users.push(newUser);
  
    // Simular envío de correo de verificación
    console.log(`Enviando correo de verificación a ${email}`);
  
    database.users.push(newUser);
  
    // Simular envío de correo de verificación
    console.log(`Enviando correo de verificación a ${email}`);
  
    // Cerrar modal y mostrar mensaje
    registerModal.style.display = "none";
    alert("Registro exitoso! Por favor verifica tu correo electrónico.");
  }
  
  function updateUIAfterLogin() {
    loginBtn.style.display = "none";
    registerBtn.style.display = "none";
    logoutBtn.style.display = "block";
  
    if (database.currentUser.isHost) {
      hostBtn.style.display = "block";
    } else {
      hostBtn.style.display = "none";
    }
  }
  
  function calculateEventCost() {
    const min = parseInt(eventMinInput.value) || 0;
    const max = parseInt(eventMaxInput.value) || 0;
  
    if (min >= 50 || max >= 50) {
      const pricing = eventPricing.find((p) => max >= p.min && max <= p.max);
      if (pricing) {
        eventCostDisplay.style.display = "block";
        eventCostSpan.textContent = `$${pricing.price}`;
        return;
      }
    }
  
    eventCostDisplay.style.display = "none";
  }
  
  function handleCreateEvent(e) {
    e.preventDefault();
  
    if (!database.currentUser || !database.currentUser.isHost) {
      alert("Solo los anfitriones pueden crear eventos.");
      return;
    }
  
    // Verificar si ya tiene un evento activo
    const hasActiveEvent = database.events.some(
      (event) =>
        event.hostId === database.currentUser.id &&
        new Date(event.date) >= new Date()
    );
  
    if (hasActiveEvent) {
      alert(
        "No puedes crear más de un evento simultáneamente. Espera a que termine tu evento actual."
      );
      return;
    }
  
    const type = document.getElementById("event-type").value;
    const title = document.getElementById("event-title").value;
    const description = document.getElementById("event-description").value;
    const state = document.getElementById("event-state").value;
    const city = document.getElementById("event-city").value;
    const address = document.getElementById("event-address").value;
    const date = document.getElementById("event-date").value;
    const time = document.getElementById("event-time").value;
    const minParticipants = parseInt(document.getElementById("event-min").value);
    const maxParticipants = parseInt(document.getElementById("event-max").value);
  
    // Validaciones
    if (minParticipants >= maxParticipants) {
      alert("El mínimo de participantes debe ser menor al máximo.");
      return;
    }
  
    // Calcular costo
    let cost = 0;
    const pricing = eventPricing.find(
      (p) => maxParticipants >= p.min && maxParticipants <= p.max
    );
    if (pricing) {
      cost = pricing.price;
    }
  
    // Crear nuevo evento
    const newEvent = {
      id: database.events.length + 1,
      type,
      title,
      description,
      state,
      city,
      address,
      date,
      time,
      minParticipants,
      maxParticipants,
      currentParticipants: 0,
      hostId: database.currentUser.id,
      participants: [],
      cost
    };
  
    database.events.push(newEvent);
    createEventModal.style.display = "none";
    displayEvents();
    alert("Evento creado exitosamente!");
  }
  
  function logout() {
    database.currentUser = null;
    loginBtn.style.display = "block";
    registerBtn.style.display = "block";
    hostBtn.style.display = "none";
    logoutBtn.style.display = "none";
    alert("Has cerrado sesión correctamente.");
  }