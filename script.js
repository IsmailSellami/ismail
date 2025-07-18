const produits = {
  cafe: [
    {
      nom: "Expresso",
      prix: "3,200 DT",
      image: "expresso.jpeg",
      options: ["Expresso", "Bien serré", "Demi allongé", "Allongé", "Allongé ++"]
    },
    {
      nom: "Cappuccino",
      prix: "3,500 DT",
      image: "capussin.jpeg",
      options: ["Cappuccino", "Sans mousse", "Bien serré", "Lait"]
    },
    {
      nom: "Café Direct",
      prix: "3,700 DT",
      image: "direct.jpeg",
      options: ["Direct", "Sans mousse", "خفيفة"]
    },
    {
      nom: "Café glacer",
      prix: "4,000 DT",
      image: "glacer.jpeg",
      options: ["Direct", "Sans mousse", "خفيفة"]
    },
    
  ],
  crepe: [
    {
      nom: "Crêpe Chocolat",
      prix: "8,000 DT",
      image: "crepe.jpeg",
      options: []
    },
    {
      nom: "Crêpe Chocolat + Fruit Sec",
      prix: "9,000 DT",
      image: "fruit.jpeg",
      options: []
    },
    {
      nom: "Crêpe Chocolat Oreo",
      prix: "9,000 DT",
      image: "oro.jpeg",
      options: []
    },
        {
      nom: "Crêpe thon fromage",
      prix: "8,000 DT",
      image: "thon.jpeg",
      options: []
    },
  ],
  jus: [
    {
      nom: "Jus Frais",
      prix: "6,000 DT",
      image: "fraise.jpeg",
      options: []
    },
    {
      nom: "Jus Orange",
      prix: "6,000 DT",
      image: "orange.jpeg",
      options: []
    },
    {
      nom: "Jus Banane",
      prix: "6,000 DT",
      image: "bannen.jpeg",
      options: []
    },
    {
      nom: "Jus Cocktail",
      prix: "6,500 DT",
      image: "coktail.jpeg",
      options: []
    },
  ],
  gazeuse: [
    {
      nom: "joy",
      prix: "4,000 DT",
      image: "joy.jpeg",
      options: []
    },
    {
      nom: "Fanta",
      prix: "4,000 DT",
      image: "fanta.jpeg",
      options: []
    },
    {
      nom: "Coca Cola",
      prix: "4,000 DT",
      image: "coca.jpg.jpeg",
      options: []
    },
    {
      nom: "Sprite",
      prix: "4,000 DT",
      image: "sprit.jpeg",
      options: []
    },
  ],
  chicha: [
    {
      nom: "Chicha Love",
      prix: "9,000 DT",
      image: "chicha love.jpg",
      options: []
    },
    {
      nom: "Chicha Menthe",
      prix: "8,000 DT",
      image: "monte.jpeg",
      options: []
    },
    {
      nom: "Chicha raisin-menthe",
      prix: "8,500 DT",
      image: "3nib.jpeg",
      options: []
    },
  ],
 
};



// جلب العناصر من الـ DOM
const categoriesDiv = document.getElementById("categories");
const productsDiv = document.getElementById("products");
const productsList = document.getElementById("productsList");
const backBtn = document.getElementById("backBtn");

const modal = document.getElementById("modal");
const modalProductName = document.getElementById("modalProductName");
const modalProductPrice = document.getElementById("modalProductPrice");
const acceptBtn = document.getElementById("acceptBtn");
const cancelBtn = document.getElementById("cancelBtn");

const openOrderBtn = document.getElementById("openOrderBtn");
const orderModal = document.getElementById("orderModal");
const orderList = document.getElementById("orderList");
const confirmOrderBtn = document.getElementById("confirmOrderBtn");
const cancelOrderBtn = document.getElementById("cancelOrderBtn");

let panier = []; // قائمة المنتجات المختارة (السلة)

// الاستماع لاختيار صنف (category)
categoriesDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("category")) {
    const cat = e.target.getAttribute("data-cat");
    showProducts(cat);
  }
});

// زر الرجوع من المنتجات للصنف الرئيسي
backBtn.addEventListener("click", () => {
  productsDiv.style.display = "none";
  categoriesDiv.style.display = "flex";
});

// عرض المنتجات حسب الصنف المختار
function showProducts(cat) {
  categoriesDiv.style.display = "none";
  productsDiv.style.display = "block";
  productsList.innerHTML = "";

  produits[cat].forEach((p) => {
    const div = document.createElement("div");
    div.className = "produit";
    div.innerHTML = `
      <img src="${p.image}" alt="${p.nom}" />
      <h3>${p.nom}</h3>
      <p style="color:#aaa; font-size:14px;">Prix: ${p.prix}</p>
      <button class="btn-demander">Demander</button>
    `;

    div.querySelector(".btn-demander").addEventListener("click", () => {
      showModal(p);
    });

    productsList.appendChild(div);
  });
}

// عرض مودال تأكيد الطلب
function showModal(produit) {
  modalProductName.textContent = produit.nom;
  modalProductPrice.textContent = `Prix: ${produit.prix}`;
  modal.style.display = "flex";

  acceptBtn.onclick = () => {
    addToPanier(produit);
    modal.style.display = "none";
  };

  cancelBtn.onclick = () => {
    modal.style.display = "none";
  };
}

// إضافة منتج إلى السلة أو زيادة الكمية
function addToPanier(produit) {
  const index = panier.findIndex(item => item.nom === produit.nom);
  if (index !== -1) {
    panier[index].quantite++;
  } else {
    panier.push({...produit, quantite: 1});
  }
}

// فتح مودال عرض الطلبات
openOrderBtn.addEventListener("click", () => {
  renderOrderList();
  orderModal.style.display = "flex";
});

// عرض قائمة الطلبات داخل المودال
function renderOrderList() {
  if (panier.length === 0) {
    orderList.innerHTML = "<p>Votre panier est vide.</p>";
    return;
  }

  let html = `<ul style="list-style:none; padding:0;">`;
  panier.forEach((item, idx) => {
    html += `
      <li style="margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
        <span>${item.nom} - ${item.prix} x ${item.quantite}</span>
        <button onclick="removeFromPanier(${idx})" style="background:#f44336; border:none; color:#fff; border-radius:5px; cursor:pointer; padding:2px 8px;">Supprimer</button>
      </li>
    `;
  });
  html += "</ul>";

  // حساب المجموع الكلي
  const total = panier.reduce((acc, cur) => {
    // إزالة الرموز غير الرقمية لتحويل السعر إلى رقم
    const prixNum = Number(cur.prix.replace(/[^\d]/g, ""));
    return acc + prixNum * cur.quantite;
  }, 0);

  html += `<p><strong>Total: ${total.toLocaleString('fr-FR')} DT</strong></p>`;

  orderList.innerHTML = html;
}

// حذف منتج من السلة
window.removeFromPanier = function(index) {
  panier.splice(index, 1);
  renderOrderList();
};

// زر تأكيد الطلب


// زر إلغاء الطلب (إغلاق المودال)
cancelOrderBtn.onclick = () => {
  orderModal.style.display = "none";
};
