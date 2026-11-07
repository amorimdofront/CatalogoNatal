/*
  PERSONALIZE AQUI PARA CADA CLIENTE:
  - Nome da profissional
  - WhatsApp com DDI + DDD, apenas números
  - Instagram
  - Serviços, valores, descrições e fotos
*/
const CONFIG = {
  name: "Nail Designer",
  whatsapp: "5571999784507", // Ex.: 5511999999999
  instagram: "https://instagram.com/amorimdeveloper",
  generalMessage: "Olá! Vi seu catálogo de Natal e gostaria de agendar um horário."
};

const SERVICES = [
  {
    name: "Blindagem de Unhas",
    description: "Unhas mais fortes e naturais por mais tempo.",
    price: 90,
    image: "https://claudia.abril.com.br/wp-content/uploads/2024/05/blindagem-de-unhas-funciona.jpg?crop=1&resize=1212,909"
  },
  {
    name: "Francesinha",
    description: "Clássica, elegante e sempre em alta.",
    price: 45,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA-U0-6p-_iM1YhRcNIwGAU1TyseDRkgmGwL1A_DJa4TGNnQShpaZc3yg&s=10"
  },
  {
    name: "Nail Art Natalina",
    description: "Deixe seu Natal ainda mais especial!",
    price: 70,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNsI2AnOpuppPfRRaE4Kg-tq9WnmqWs4x2cWg3Ix9GLDsJ_6CT5iRojbrJ&s=10"
  },
  {
    name: "Alongamento em Gel",
    description: "Unhas longas, resistentes e impecáveis.",
    price: 99.90,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoOkEfanHFjQe0rffE4zfzIdHtxMM9O5fyjx3vBRRIffzfo8nz-KA9hQg&s=10"
  },
  {
    name: "Manicure e Pedicure",
    description: "Cuidados essenciais para suas unhas.",
    price: 35,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpGDriXcwG41gkG1SWVXKmS9VyCMXd3e_8m7p-q5RRIHRKnUcHkrNa4vXz&s=10"
  }
];

const REVIEWS = [
  { name: "Ana Souza", text: "Amei meu atendimento! Minhas unhas ficaram perfeitas e o cuidado foi incrível.", initial: "A" },
  { name: "Mariana Lima", text: "Ficou simplesmente maravilhoso! Atendimento delicado e resultado impecável.", initial: "M" },
  { name: "Juliana Costa", text: "Adorei cada detalhe. Já estou ansiosa para marcar meu próximo horário!", initial: "J" }
];

const formatPrice = value => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const waLink = message => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;

function renderBrand() {
  document.querySelectorAll("[data-brand]").forEach(el => el.textContent = CONFIG.name);
  document.title = `${CONFIG.name} | Catálogo de Natal`;
  document.getElementById("year").textContent = new Date().getFullYear();
  document.querySelectorAll("[data-whatsapp]").forEach(link => link.href = waLink(CONFIG.generalMessage));
}

function renderServices() {
  const list = document.getElementById("serviceList");
  list.innerHTML = SERVICES.map((service, index) => {
    const message = `Olá! Quero esse serviço: ${service.name}. Valor: ${formatPrice(service.price)}. Gostaria de agendar um horário.`;
    return `
      <article class="service-row">
        <div class="service-photo">
          <img src="${service.image}" alt="${service.name}" loading="lazy">
        </div>
        <div class="service-details">
          <h3>${service.name}</h3>
          <p>${service.description}</p>
          <strong class="price">${formatPrice(service.price)}</strong>
          <a class="order-button" href="${waLink(message)}" target="_blank" rel="noopener">
            <span class="wa-small">◉</span> Quero esse!
          </a>
        </div>
      </article>`;
  }).join("");
}

let reviewIndex = 0;
function renderReview() {
  const review = REVIEWS[reviewIndex];
  document.getElementById("reviewText").textContent = `“${review.text}”`;
  document.getElementById("reviewAuthor").textContent = `– ${review.name}`;
  document.getElementById("reviewAvatar").textContent = review.initial;
}
function moveReview(step) {
  reviewIndex = (reviewIndex + step + REVIEWS.length) % REVIEWS.length;
  renderReview();
}

document.getElementById("prevReview").addEventListener("click", () => moveReview(-1));
document.getElementById("nextReview").addEventListener("click", () => moveReview(1));

renderBrand();
renderServices();
renderReview();
