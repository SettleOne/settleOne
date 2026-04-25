# 🚀 SettleOne — Payment Commitment Layer (PCL)

## 🧠 Overview

**SettleOne** is a programmable payment infrastructure designed to eliminate delayed payments and trust issues in business transactions—especially for MSMEs.

> **Core Principle:**
> *No transaction begins unless payment is already guaranteed on-chain.*

SettleOne ensures:

* upfront payment commitment
* automated settlement
* verifiable delivery conditions
* zero reliance on trust between parties

---

## 💡 Problem Statement

In traditional systems:

* payments are delayed
* enforcement is weak
* disputes are messy
* trust is required

For MSMEs, this leads to:

* cash flow issues
* defaults
* operational risk

---

## ✅ Solution

SettleOne introduces a **Payment Commitment Layer (PCL)**:

* Buyer locks funds upfront
* Funds are held in smart contract escrow
* Delivery is verified
* Funds are released automatically or via dispute resolution

---

## 🧱 System Architecture

```text
Frontend (Public)
    ↓
Smart Contracts (Public)
    ↓
Backend (Private APIs)
```

---

## 📦 Repository Structure

### 🌐 `settleone-main` (Public — Integrator Repo)

```bash
settleone-main/
├── contracts/   # submodule → settleone-protocol
├── backend/     # submodule → settleone-backend (private)
├── frontend/
├── sdk/
├── .gitmodules
```

---

### 🌐 `settleone-protocol` (Public)

Smart contracts (Foundry-based)

```bash
src/
test/
script/
abi/
```

---

### 🔒 `settleone-backend` (Private)

Backend services and verification logic

```bash
src/
services/
routes/
db/
```

---

## 🔄 Core Flow

### 1. Deal Creation

Seller creates a deal:

```solidity
Deal {
    buyer,
    seller,
    amount,
    deadline,
    disputeWindow
}
```

---

### 2. Payment Commitment (Critical Step)

Buyer deposits funds:

```solidity
require(msg.value == amount);
```

Funds are locked in escrow.

---

### 3. Delivery

Seller:

* delivers off-chain
* submits proof (hash/IPFS)

---

### 4. Verification

* Backend / Chainlink verifies delivery
* Marks deal as delivered

---

### 5. Dispute Window

Buyer can:

* ✅ accept → funds released
* ❌ dispute → dispute flow
* ⏳ do nothing → auto-release

---

### 6. Settlement

* seller receives funds
* or buyer refunded
* or partial resolution

---

## ⚙️ Smart Contract Modules

### `DealManager`

* creates deals
* tracks state
* orchestrates flow

### `EscrowVault`

* holds funds
* releases/refunds

### `Settlement`

* executes final transfer

### `DisputeManager`

* handles disputes

### `Verifier`

* integrates Chainlink / backend proof

---

## 🔗 Chainlink Integration

### Used Components:

* **Functions** → delivery verification
* **Automation** → time-based execution

---

## 🖥️ Frontend

Features:

* wallet connection
* deal creation
* payment UI
* status tracking

---

## 🔐 Backend (Private)

Responsibilities:

* delivery verification APIs
* fraud detection
* scoring logic
* dispute support

---

## 🧩 SDK Layer

Located in:

```bash
sdk/
```

Used by:

* frontend
* backend

Provides:

* contract interaction wrappers
* reusable logic

---

## 🛠️ Setup Instructions

### Clone Repository

```bash
git clone <repo>
cd settleone-main
```

---

### Initialize Submodules

```bash
git submodule update --init contracts
```

> ⚠️ Backend is private and requires access

---

### Install Dependencies

#### Contracts

```bash
cd contracts
forge install
forge build
```

---

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

#### Backend

```bash
cd backend
npm install
npm run dev
```

---

## 🔄 Development Workflow

### Contracts

```bash
cd contracts
forge build
git commit -am "update"
git push

cd ..
git add contracts
git commit -m "update submodule"
```

---

### Backend

```bash
cd backend
git commit -am "update"
git push

cd ..
git add backend
git commit -m "update submodule"
```

---

### Frontend

```bash
cd frontend
npm run dev
```

---

## ⚠️ Important Notes

* Submodules are **not cloned by default**
* Backend is **private**
* Always commit submodule pointer updates
* Frontend must not depend on local backend

---

## 🧪 Demo Flow

1. Seller creates deal
2. Buyer deposits funds
3. UI shows: **Funds Locked**
4. Seller submits delivery
5. Wait (or simulate)
6. Auto-release triggers

---

## 🔥 Key Features

* upfront guaranteed payments
* automated settlement
* dispute handling
* optional yield on locked funds
* modular architecture

---

## 🚀 Future Enhancements

* milestone-based payments
* recurring agreements
* invoice tokenization
* reputation scoring
* yield optimization strategies

---

## 🧭 Vision

SettleOne aims to become:

> **The default settlement layer for trustless business transactions**

---

## ⚡ Pitch

> “SettleOne ensures every transaction begins only when payment is already guaranteed, and automatically executes settlement based on verifiable conditions—eliminating delays and trust issues.”

---

## 📜 License

(To be decided — recommend BSL or MIT + commercial restrictions)

---

## 🤝 Contribution

* contracts → open for audit
* frontend → open contributions
* backend → restricted

---

## 🧠 Final Note

This is not just an escrow system.

> **This is programmable settlement infrastructure.**

---
