# SettleOne Protocol

SettleOne is an upgradeable, yield-aware escrow protocol for milestone-based digital and physical deliveries. A buyer locks ETH or whitelisted ERC20 funds, a seller submits verifiable delivery proof, and the deal closes through buyer acceptance, automation, refund, or modular dispute resolution.

This repository contains the production smart contracts in `src/`, deployment wiring in `script/`, tests in `test/`, and protocol documentation in `docs/`.

## What SettleOne Provides

- **Escrowed settlement:** Buyer funds are held by `EscrowVault`; business logic contracts never custody funds directly.
- **Partial funding support:** A deal can be fully funded in one step or funded in two stages using the protocol's 60/40 flow.
- **Delivery verification:** Delivery proof can be verified synchronously through EIP-712 validator signatures or asynchronously through an oracle-style verifier.
- **Buyer review workflow:** Verified delivery enters an acceptance window where the buyer may accept, request revision, or raise a dispute.
- **Dispute resolution:** Disputes are resolved by modular resolver contracts and normalized into seller-wins, buyer-wins, or split outcomes.
- **Yield-aware custody:** ERC20 escrow pools can be routed into strategy contracts such as `AaveStrategy`; settlement distributes principal and yield according to protocol rules.
- **Automation:** `AutomationHandler` can execute deadline-driven actions such as auto-acceptance, expiry refunds, and seller release.

## Architecture

SettleOne is split into focused contracts with explicit trust boundaries.

| Contract | Responsibility |
| --- | --- |
| `DealManager` | Canonical deal state, deal creation, funding, seller acceptance/rejection, expiry refunds, release/refund settlement paths, and restricted delivery callbacks. |
| `DeliveryManager` | Delivery proof submission, delivery finalization, buyer acceptance, revision requests, dispute open/cancel, and dispute-resolution execution. |
| `EscrowVault` | ETH/ERC20 custody, pooled share accounting, strategy investment/divestment, and settlement payouts. |
| `Settlement` | One-shot payout executor called by `DealManager`; computes seller, buyer, and treasury payouts. |
| `DeliveryVerifier` | Synchronous EIP-712 verifier for validator-approved delivery proof. |
| `ChainlinkVerifier` | Asynchronous verifier with requester/oracle roles and request replacement support. |
| `DisputeManager` | Stores active dispute context and accepts lifecycle calls only from `DeliveryManager`. |
| `SimpleResolver` | Arbiter-driven resolver that returns normalized dispute outcomes. |
| `EvidenceManager` | Tamper-evident registry of evidence hashes and CIDs. |
| `AutomationHandler` | Chainlink Automation-compatible registry and dispatcher for deadline-driven actions. |
| `SettleOneToken` | Hard-capped ERC20 utility token (`SETL`) with mint/burn roles and ERC20 permit support. |

Core call boundaries:

```text
Users -> DealManager       -> EscrowVault / Settlement
Users -> DeliveryManager   -> Verifiers / DisputeManager / EvidenceManager
DeliveryManager            -> DealManager callbacks protected by DELIVERY_MANAGER_ROLE
Settlement                 -> EscrowVault payouts protected by SETTLEMENT_ROLE
```

For a deeper flow-level view, see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Deal Lifecycle

A standard deal uses `DealStructs.DealState`:

1. **`AwaitingFunding`**: Buyer created the deal; no funds are deposited.
2. **`PendingSellerAcceptance`**: Buyer provided the required first funding stage, either full funding or the initial 60%.
3. **`Active`**: Seller accepted the deal and delivery work is in progress.
4. **`DeliverySubmitted`**: Seller submitted proof through `DeliveryManager`; verifier approval is pending.
5. **`AwaitingAcceptance`**: Proof was approved and finalized; buyer review window is open.
6. **`Accepted`**: Buyer accepted or automation auto-accepted after the review window.
7. **`Disputed`**: Buyer or seller opened a dispute within the allowed window.
8. **`Released` / `Refunded` / `Settled` / `Cancelled`**: Terminal outcomes.

Detailed transition rules and invariants are documented in [docs/STATE_MACHINE.md](docs/STATE_MACHINE.md).

## Funding And Yield

`EscrowVault` keeps custody and accounting separate from deal logic:

- Native ETH deals are held directly by the vault.
- ERC20 deals are pooled by token and represented internally with vault shares.
- The vault can invest idle ERC20 liquidity into configured `IStrategy` implementations.
- `AaveStrategy` is included as the current strategy implementation for Aave V3-style pools.
- On settlement, principal is paid according to the deal outcome; positive yield is split between buyer and platform treasury.
- The default platform yield fee is `1,500` bps, or 15%, configurable up to the contract cap.

## Access Control

SettleOne uses OpenZeppelin `AccessControlUpgradeable` across upgradeable protocol contracts. Main roles include:

- `CONFIG_ROLE`: Deal-manager configuration such as tokens and linked modules.
- `DELIVERY_MANAGER_ROLE`: Callback authority granted by `DealManager` only to the configured `DeliveryManager`.
- `FUNDING_ROLE`: Vault deposit authority, expected to be held by `DealManager`.
- `SETTLEMENT_ROLE`: Vault payout authority, expected to be held by `Settlement`.
- `RESOLVER_ROLE`: Dispute-resolution execution authority on `DeliveryManager`.
- `REQUESTER_ROLE` / `ORACLE_ROLE`: Async verification request and fulfillment roles.
- `VALIDATOR_ROLE`: EIP-712 delivery approval signer role.
- `RECORDER_ROLE`: Evidence-writing role for lifecycle-aware managers.
- `UPGRADER_ROLE`: UUPS upgrade authorization role.

The full role matrix is in [docs/ROLES.md](docs/ROLES.md).

## Repository Layout

```text
src/
  automation/       Chainlink Automation dispatcher
  core/             DealManager, DeliveryManager, structs, errors
  dispute/          DisputeManager and resolver implementation
  evidence/         Evidence registry
  interfaces/       Protocol interfaces
  libraries/        Validation, math, state, and time helpers
  payment/          Settlement and SETL token
  verification/     Delivery and async verifier contracts
  vault/            EscrowVault and strategy contracts
script/
  Deploy.s.sol      Role-safe deployment and wiring script
test/
  *.t.sol           Integration, unit, edge, and coverage-focused tests
docs/
  ARCHITECTURE.md   Component and call-flow documentation
  STATE_MACHINE.md  Lifecycle states and invariants
  ROLES.md          Role matrix
```

## Build And Test

This project uses Foundry.

```bash
forge build
forge test -v --summary
```

Coverage can be generated with:

```bash
forge coverage --summary --ir-minimum --no-match-coverage '^(script|test)/'
```

`--ir-minimum` is used because this project can hit stack-depth limits during default coverage instrumentation. Foundry may also warn that `coverage_exclude` is unknown depending on the installed Foundry version.

Latest local verification from this repository state:

- `forge build`: passing
- `forge test -v --summary`: 47 passing, 0 failing
- Protocol-only coverage: 84.23% lines, 79.73% statements, 54.11% branches, 85.27% functions

Coverage is strong on lifecycle and integration behavior, but it is not claimed as 100%. Remaining gaps are mainly branch-heavy edge paths in vault, deal, automation, and resolver logic.

## Deployment

Deployment is handled by [script/Deploy.s.sol](script/Deploy.s.sol). The script:

- Deploys UUPS proxies for the upgradeable protocol contracts.
- Deploys `SettleOneToken`.
- Wires `DealManager`, `DeliveryManager`, `DisputeManager`, `Settlement`, `EscrowVault`, `EvidenceManager`, verifiers, resolver, and automation.
- Grants runtime roles to protocol contracts.
- Grants admin roles to the final admin.
- Revokes temporary deployer admin roles when `ADMIN_ADDRESS` differs from the deployer.

Common environment variables:

| Variable | Required | Description |
| --- | --- | --- |
| `PRIVATE_KEY` | Yes | Broadcast key used by Foundry. |
| `ADMIN_ADDRESS` | Optional | Final protocol admin. Defaults to deployer. |
| `VALIDATOR_ADDRESS` | Optional | Initial EIP-712 delivery validator. Defaults to admin. |
| `ORACLE_ADDRESS` | Optional | Initial async verifier oracle. Defaults to validator. |
| `ARBITER_ADDRESS` | Optional | Initial `SimpleResolver` arbiter. Defaults to admin. |
| `PLATFORM_TREASURY` | Optional | Treasury receiving platform yield fees. Defaults to admin. |
| `PLATFORM_YIELD_FEE_BPS` | Optional | Platform yield fee. Defaults to 1500. |
| `AUTOMATION_MAX_SCAN` | Optional | Max deals scanned per upkeep check. Defaults to 25. |
| `VAULT_MIN_INVEST_AMOUNT` | Optional | Minimum ERC20 strategy investment amount. Defaults to `100e6`. |
| `SETL_INITIAL_SUPPLY` | Optional | Initial SETL supply minted to final admin. Defaults to 0. |
| `ALLOWED_TOKEN_ADDRESS` | Optional | Extra ERC20 token to whitelist at deployment. |
| `ALLOWED_TOKEN_MIN` | Optional | Minimum deal amount for the extra token. |
| `ALLOWED_TOKEN_MAX` | Optional | Maximum deal amount for the extra token. `0` means uncapped. |
| `AAVE_UNDERLYING_TOKEN` | Optional | ERC20 token for optional Aave strategy deployment. |
| `AAVE_POOL` | Optional | Aave V3 pool address for optional strategy deployment. |
| `AAVE_ATOKEN` | Optional | Matching aToken for optional strategy deployment. |

Example:

```bash
forge script script/Deploy.s.sol:Deploy \
  --rpc-url "$SEPOLIA_RPC_URL" \
  --broadcast \
  --verify
```

Review all environment values before running on a live network.

## Audit Scope

Primary audit scope is the protocol code under `src/`, including:

- Core lifecycle contracts
- Vault, settlement, and strategy integrations
- Verification and dispute modules
- Evidence and automation modules
- Shared libraries and interfaces

`src/external/` contains local external interface/helper code used by the protocol. Treat integrations with external systems such as OpenZeppelin, Chainlink Automation, and Aave as in scope where SettleOne-specific assumptions or wiring are involved.

The deployment script and tests are not production runtime contracts, but they are important for reviewing deployment safety, role wiring, and expected behavior.

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [State Machine](docs/STATE_MACHINE.md)
- [Roles](docs/ROLES.md)

## License

This repository is licensed under the Business Source License (BSL) 1.1.

The source code is available for viewing, auditing, research, and non-commercial use. Commercial use, production deployment, operation of competing services, or monetization of derivative works is prohibited without prior permission from SettleOne.

See [LICENSE](LICENSE) for the complete terms.
