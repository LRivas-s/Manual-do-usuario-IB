document
    .querySelectorAll("[data-tabs-control] .accordion-collapse")
    .forEach((collapse) => {
        collapse.addEventListener("show.bs.collapse", function () {
            document.querySelectorAll(".nav-link").forEach((btn) => {
                btn.classList.remove("active");
            });

            document.querySelectorAll(".tab-pane").forEach((tab) => {
                tab.classList.remove("show", "active");
            });
        });
    });

document.querySelectorAll(".accordion-collapse").forEach((collapse) => {
    collapse.addEventListener("shown.bs.collapse", function () {
        const firstBtn = this.querySelector(".nav-link");
        if (firstBtn) {
            new bootstrap.Tab(firstBtn).show();
        }
    });
});

const wrappers = document.querySelectorAll(".star-rating-wrapper");
// Definição das legendas
const labels = {
    0: "Toque para votar",
    1: "Péssimo",
    2: "Ruim",
    3: "Regular",
    4: "Bom",
    5: "Excelente"
};

// Função para definir a cor do texto de feedback
function getColor(val) {
    const colors = {
        1: "#ff4d4d", // Vermelho
        2: "#ffae42", // Laranja
        3: "#ffc107", // Amarelo
        4: "#8bc34a", // Verde claro
        5: "#4caf50"  // Verde
    };
    return colors[val] || "#adb5bd";
}

wrappers.forEach((wrapper) => {
    const stars = wrapper.querySelectorAll(".star-icon-custom");
    const input = wrapper.querySelector('input[type="hidden"]');
    const feedback = wrapper.querySelector(".feedback-text");

    // MODIFICAÇÃO: Lê o valor que veio preenchido do backend (caso seja edição)
    let currentVal = parseInt(input.value) || 0;

    // Se já tiver um valor (edição), pinta as estrelas e o texto logo no início
    if (currentVal > 0) {
        highlightStars(stars, currentVal);
        feedback.innerText = labels[currentVal];
        feedback.style.color = getColor(currentVal);
    }

    stars.forEach((star) => {
        star.addEventListener("mouseenter", () => {
            const val = parseInt(star.getAttribute("data-value"));
            highlightStars(stars, val);
        });

        star.addEventListener("click", () => {
            currentVal = parseInt(star.getAttribute("data-value"));
            input.value = String(currentVal);
            input.setAttribute("value", String(currentVal)); // garante valor no atributo
            highlightStars(stars, currentVal);

            // Remove erro visual se o usuário clicar
            const card = wrapper.closest(".criteria-card");
            if (card) card.style.border = "1px solid #eee";
            star.style.transform = "scale(1.3)";
            setTimeout(() => (star.style.transform = "scale(1)"), 200);
        });
    });

    wrapper.addEventListener("mouseleave", () => {
        highlightStars(stars, currentVal);
        if (currentVal === 0) {
            feedback.innerText = "Toque para votar";
            feedback.style.color = "#adb5bd";
        } else {
            feedback.innerText = labels[currentVal];
            feedback.style.color = getColor(currentVal);
        }
    });
});

function highlightStars(stars, limit) {
    stars.forEach((s) => {
        const val = parseInt(s.getAttribute("data-value"));
        if (val <= limit) s.classList.add("active");
        else s.classList.remove("active");
    });
}


