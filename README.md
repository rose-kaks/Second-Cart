# 🛒 SecondCart – Sustainable Resale Powered by AI

**SecondCart** is an AI-powered resale mode for slightly damaged or returned-but-usable products.  
It promotes zero-waste retail by classifying product damage and rewarding eco-conscious buyers with **redeemable points** — encouraging repeat sustainable shopping.

---

## 🚀 Features

- ♿ **Accessibility-First UI**  
  Supports dark mode, text resizing, and voice search to ensure inclusive shopping for all users.

- 🧠 **AI-Based Damage Detection**  
  - Custom dataset of real-world product images  
  - Trained using **Teachable Machine** with **MobileNetV1** + shallow dense layers  
  - Damage levels: `Slight` and `Severe`  
  - Deployed using **TensorFlow.js** for real-time browser inference

- 🌱 **Reward Points System**  
  - Each classified product shows the eco-points it earns  
  - Points can be redeemed on future purchases  
  - Encourages repeat eco-conscious buying behavior

- ⚛️ **Frontend-Only Prototype**  
  - Built entirely using **React.js**  
  - Lightweight and fast  
  - Ideal for demos and PWA-like performance

---

## 🧰 Tech Stack

| Layer         | Tools                            |
|---------------|----------------------------------|
| Frontend      | React.js, HTML, CSS, JavaScript  |
| ML Model      | Teachable Machine (MobileNetV1)  |
| Deployment    | TensorFlow.js                    |

---


---

## 🎬 How It Works

1. User uploads or captures a product image  
2. AI model classifies it as **Slight** or **Severe Damage**  
3. System assigns **reward-points** accordingly  
4. Product added to cart with reward tag  
5. Points are stored for redemption on future purchases

---

## 🌍 Impact

- Reduces retail waste by reselling returned-but-usable items
- Promotes sustainable habits through gamified eco-points
- Expands Walmart’s accessibility and sustainability goals
---

## 🙌 Team
Built with 💚 by **Team GreenTale**
(Part of Walmart Sparkathon 2024)

---
## 🛠 Run Locally

```bash
git clone https://github.com/rose-kaks/Second-Cart.git
cd Second-Cart
npm install
npm start
